import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import * as MarkdownParser from '../parsers/MarkdownParser.js';
import {
  Accumulator,
  GeneratedQuestion,
  GeneratedSearchItem,
  GeneratedTopic,
  GeneratorConfig,
} from '../types/types.js';
import { MDValidator } from './validator.js';

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'),
);

const GENERATOR = {
  version: packageJson.version,
  schemaVersion: packageJson.schemaVersion,
} as const;

export class MDGenerator {
  private config: GeneratorConfig;
  private errors: string[] = [];
  private warnings: string[] = [];
  private strictMode: boolean;

  constructor(configPath?: string, strictMode: boolean = false) {
    this.strictMode = strictMode;

    const defaultConfig = path.join(
      process.cwd(),
      'scripts/config/generator.config.json',
    );
    const configFile = configPath || defaultConfig;

    if (fs.existsSync(configFile)) {
      this.config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    } else {
      throw new Error(`Config file not found: ${configFile}`);
    }
  }

  // ─── Main Generate ──────────────────────────────────────────────────────

  generate(): void {
    const startMs = Date.now();
    const CONTENT_DIR = path.resolve(process.cwd(), 'content');
    const OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'api');

    console.log(
      `\n🚀 Interview Playbook — API Generator v${GENERATOR.schemaVersion}`,
    );
    if (this.strictMode) console.log('   STRICT mode — warnings are errors');
    console.log('');

    if (!fs.existsSync(CONTENT_DIR)) {
      console.error(`❌ content/ not found: ${CONTENT_DIR}`);
      process.exit(1);
    }

    if (this.config.validation?.validateBeforeGenerate) {
      this.runPreGenerationValidation(CONTENT_DIR);
    }

    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    this.ensureDir(OUTPUT_DIR);

    const accumulator: Accumulator = {
      languages: new Set<string>(),
      domains: {},
      searchIndex: [],
    };

    this.walk(CONTENT_DIR, accumulator, OUTPUT_DIR);
    this.printIssues();

    if (this.errors.length > 0) {
      console.log(
        `\n❌ Build failed — ${this.errors.length} error(s) must be fixed.\n`,
      );
      process.exit(1);
    }

    this.writeManifest(accumulator, OUTPUT_DIR);
    this.writeSearchIndex(accumulator, OUTPUT_DIR);

    const ms = Date.now() - startMs;
    console.log(`\n✅ manifest.json`);
    console.log(
      `✅ search-index.json — ${accumulator.searchIndex.length} questions`,
    );
    console.log(
      `\n   Languages : ${[...accumulator.languages].sort().join(', ')}`,
    );
    console.log(
      `   Domains   : ${Object.keys(accumulator.domains).join(', ')}`,
    );
    console.log(`   Built in  : ${ms}ms`);
    if (this.warnings.length)
      console.log(`   Warnings  : ${this.warnings.length}`);
    console.log('\n✨ Done! Output in public/api/\n');
  }

  // ─── Pre-generation validation ──────────────────────────────────────────
  // Content-quality rules (required fields, allowed difficulties, answer
  // presence, etc.) live in MDValidator now — the generator no longer
  // duplicates them. This just runs the validator over every .md file
  // before touching the filesystem, and refuses to build on failure.

  private runPreGenerationValidation(contentDir: string): void {
    console.log('🔎 Running pre-generation validation...\n');
    const validator = new MDValidator(undefined, { quiet: true });
    const invalidFiles: string[] = [];

    const scan = (dir: string) => {
      for (const entry of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, entry);
        if (fs.statSync(fullPath).isDirectory()) {
          scan(fullPath);
          continue;
        }
        if (!entry.endsWith('.md')) continue;

        const result = validator.validateFile(fullPath);
        if (!result || !result.isValid) {
          invalidFiles.push(path.relative(process.cwd(), fullPath));
        }
      }
    };
    scan(contentDir);

    if (invalidFiles.length > 0) {
      console.error(
        `❌ Validation failed for ${invalidFiles.length} file(s) — fix before generating:\n`,
      );
      invalidFiles.forEach((f) => console.error(`   - ${f}`));
      console.error('\n   Run the validator directly for details:');
      console.error('   node dist/cli.js file <path> --verbose\n');
      process.exit(1);
    }

    console.log('✅ Pre-generation validation passed\n');
  }

  // ─── Directory Walker ────────────────────────────────────────────────────

  private walk(
    dir: string,
    accumulator: Accumulator,
    OUTPUT_DIR: string,
    domain?: string,
  ): void {
    const entries = fs.readdirSync(dir).sort();

    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        this.walk(fullPath, accumulator, OUTPUT_DIR, domain || entry);
        continue;
      }

      if (!entry.endsWith('.md')) continue;

      const relPath = path.relative(process.cwd(), fullPath);
      const langMatch = entry.match(/^(.+)\.([a-z]{2})\.md$/);

      if (!langMatch) {
        this.reportWarning(
          relPath,
          null,
          'Filename must follow <topic>.<lang>.md convention',
        );
        continue;
      }

      const topic = langMatch[1];
      const language = langMatch[2];

      if (!this.config.supportedLanguages.includes(language)) {
        this.reportError(
          relPath,
          null,
          `Unsupported language: "${language}" — add to generator.config.json → supportedLanguages`,
        );
        continue;
      }

      const meta = { domain: domain || 'unknown', topic, language };
      console.log(`  📄 ${language}/${meta.domain}/${topic}`);

      const output = this.processFile(fullPath, meta);
      if (!output) continue;

      const outDir = path.join(OUTPUT_DIR, meta.domain, topic);
      this.ensureDir(outDir);

      fs.writeFileSync(
        path.join(outDir, `${language}.json`),
        JSON.stringify(output.topic, null, 2),
        'utf-8',
      );

      const d = output.topic.stats.byDifficulty;
      console.log(
        `     ✅ ${output.topic.stats.total} questions (easy ${d.easy} · medium ${d.medium} · hard ${d.hard})`,
      );

      accumulator.languages.add(language);
      if (!accumulator.domains[meta.domain])
        accumulator.domains[meta.domain] = { topics: {} };
      if (!accumulator.domains[meta.domain].topics[topic]) {
        accumulator.domains[meta.domain].topics[topic] = { languages: {} };
      }
      accumulator.domains[meta.domain].topics[topic].languages[language] = {
        path: `${meta.domain}/${topic}/${language}.json`,
        total: output.topic.stats.total,
        hash: output.topic.hash,
      };

      for (const q of output.topic.questions) {
        const searchItem: GeneratedSearchItem = {
          id: q.id,
          slug: q.slug,
          title: q.title,
          domain: meta.domain,
          topic,
          label: this.getLabel(topic),
          language,
          path: `${language}/${meta.domain}/${topic}/${q.slug}`,
          difficulty: q.difficulty,
          categories: q.categories,
          readingTime: q.answer.readingTime,
        };

        if (q.tags?.length) {
          searchItem.tags = q.tags;
        }

        accumulator.searchIndex.push(searchItem);
      }
    }
  }

  // ─── File Processor ──────────────────────────────────────────────────────

  private processFile(
    filePath: string,
    meta: { domain: string; topic: string; language: string },
  ): {
    topic: GeneratedTopic;
    hash: string;
  } | null {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const cleanContent = MarkdownParser.stripBOM(raw);
      const relPath = path.relative(process.cwd(), filePath);

      const frontmatterBlock =
        MarkdownParser.extractFrontmatterBlock(cleanContent);
      if (!frontmatterBlock) {
        this.reportWarning(relPath, null, 'No frontmatter found');
        return null;
      }

      const frontmatter =
        MarkdownParser.parseFrontmatterFields(frontmatterBlock);
      const version = parseFloat(frontmatter.version) || 1.0;

      const content = MarkdownParser.stripFrontmatter(cleanContent);

      const documentTitle =
        MarkdownParser.extractDocumentTitle(content) ??
        this.getLabel(meta.topic);

      const availableCategories =
        MarkdownParser.extractCategories(content) ?? [];

      const availableDifficulties =
        MarkdownParser.extractDifficulties(content) ?? [];

      const questions = this.parseQuestions(content, meta, relPath);

      if (!questions.length) {
        this.reportWarning(relPath, null, 'No valid questions found');
      }

      const byDifficulty = {
        easy: questions.filter((q) => q.difficulty === 'easy').length,
        medium: questions.filter((q) => q.difficulty === 'medium').length,
        hard: questions.filter((q) => q.difficulty === 'hard').length,
      };

      const topicData: GeneratedTopic = {
        version,

        meta: {
          domain: meta.domain,
          topic: meta.topic,
          language: meta.language,
          label: this.getLabel(meta.topic),
        },

        content: {
          title: documentTitle,
          categories: availableCategories,
          difficulties: availableDifficulties,
        },

        hash: this.contentHash(content),

        stats: {
          total: questions.length,
          byDifficulty,
        },

        questions,
      };

      return {
        topic: topicData,
        hash: topicData.hash,
      };
    } catch (err) {
      this.reportError(
        path.relative(process.cwd(), filePath),
        null,
        err instanceof Error ? err.message : String(err),
      );
      return null;
    }
  }

  // ─── Question Parser ─────────────────────────────────────────────────────
  // Structural/generation-invariant checks stay here (missing title,
  // duplicate id/slug — these would break the generated JSON's integrity).
  // Content-quality checks (missing difficulty/category/answer) were removed:
  // that's the validator's job now, run as a gate in runPreGenerationValidation.

  private parseQuestions(
    markdown: string,
    meta: { domain: string; topic: string; language: string },
    relPath: string,
  ): GeneratedQuestion[] {
    const sections = MarkdownParser.extractQuestionSections(markdown);
    const localIds = new Set<string>();
    const localSlugs = new Set<string>();
    const questions: GeneratedQuestion[] = [];

    sections.forEach((section, i) => {
      const sectionLabel = `section ${i + 1}`;
      const fields = section.fields;

      const headingText = section.content
        .split('\n')[0]
        .replace(/^[🧠💡🔥⚡️🎯✅📌\s]+/, '')
        .trim();
      const title = MarkdownParser.getField(fields, 'title') || headingText;

      if (!title) {
        this.reportError(relPath, sectionLabel, 'Missing title');
        return;
      }

      const idField = MarkdownParser.getField(fields, 'id');
      const id =
        idField ||
        crypto
          .createHash('md5')
          .update(`${meta.domain}-${meta.topic}-${meta.language}-${title}`)
          .digest('hex')
          .slice(0, 12);

      if (localIds.has(id)) {
        this.reportError(relPath, title, `Duplicate ID: "${id}"`);
        return;
      }

      const slug = MarkdownParser.slugify(title);
      if (localSlugs.has(slug)) {
        this.reportError(relPath, title, `Duplicate slug: "${slug}"`);
        return;
      }

      localIds.add(id);
      localSlugs.add(slug);

      const rawDiff = MarkdownParser.getField(fields, 'difficulty');
      const difficulty = this.normalizeDifficulty(rawDiff);

      const rawCategory = MarkdownParser.getField(fields, 'category');
      const categories = this.parseCategories(rawCategory);

      const rawTags = MarkdownParser.getField(fields, 'tags') || '';
      const tags = rawTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const answerMarkdown = MarkdownParser.extractAnswer(section.content);

      const question: GeneratedQuestion = {
        id,
        slug,
        title,
        difficulty: difficulty || 'unknown',
        categories,
        domain: meta.domain,
        topic: meta.topic,
        language: meta.language,
        answer: {
          markdown: answerMarkdown ?? '',
          readingTime: this.readingTime(answerMarkdown),
        },
      };

      if (tags.length > 0) question.tags = tags;
      questions.push(question);
    });

    return questions;
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  private normalizeDifficulty(raw: string | null): string | null {
    if (!raw) return null;
    const normalized = raw.trim().toLowerCase();
    const map: Record<string, string> = {
      easy: 'easy',
      beginner: 'easy',
      medium: 'medium',
      intermediate: 'medium',
      hard: 'hard',
      advanced: 'hard',
      ساده: 'easy',
      آسان: 'easy',
      مقدماتی: 'easy',
      متوسط: 'medium',
      سخت: 'hard',
      پیشرفته: 'hard',
    };
    return map[normalized] ?? null;
  }

  private parseCategories(raw: string | null): string[] {
    if (!raw) return [];
    return raw
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
  }

  private getLabel(slug: string): string {
    const labels: Record<string, string> = {
      css: 'CSS',
      html: 'HTML',
      javascript: 'JavaScript',
      react: 'React',
      typescript: 'TypeScript',
      node: 'Node.js',
      python: 'Python',
      java: 'Java',
      csharp: 'C#',
      php: 'PHP',
      ruby: 'Ruby',
      go: 'Go',
      rust: 'Rust',
      swift: 'Swift',
      kotlin: 'Kotlin',
    };
    return (
      labels[slug.toLowerCase()] ?? slug.charAt(0).toUpperCase() + slug.slice(1)
    );
  }

  private readingTime(markdown: string | null): number {
    if (!markdown) return 1;
    return Math.max(1, Math.round(markdown.trim().split(/\s+/).length / 200));
  }

  private contentHash(str: string): string {
    return crypto.createHash('md5').update(str).digest('hex').slice(0, 10);
  }

  private ensureDir(dir: string): void {
    fs.mkdirSync(dir, { recursive: true });
  }

  // ─── Error/Warning Handling ─────────────────────────────────────────────

  private reportError(
    file: string,
    question: string | null,
    message: string,
  ): void {
    this.errors.push(
      `${file}${question ? ` → "${question}"` : ''}: ${message}`,
    );
  }

  private reportWarning(
    file: string,
    question: string | null,
    message: string,
  ): void {
    if (this.strictMode) {
      this.errors.push(
        `${file}${question ? ` → "${question}"` : ''}: [strict] ${message}`,
      );
    } else {
      this.warnings.push(
        `${file}${question ? ` → "${question}"` : ''}: ${message}`,
      );
    }
  }

  private printIssues(): void {
    if (this.warnings.length) {
      console.log('\n⚠️  Warnings:');
      this.warnings.forEach((w) => console.log(`   ${w}`));
    }
    if (this.errors.length) {
      console.log('\n❌ Build errors:');
      this.errors.forEach((e) => console.log(`   ${e}`));
    }
  }

  // ─── Writers ─────────────────────────────────────────────────────────────

  private writeManifest(accumulator: Accumulator, OUTPUT_DIR: string): void {
    const domains: Record<string, any> = {};
    for (const [domainSlug, domainData] of Object.entries(
      accumulator.domains,
    )) {
      const topicsObj: Record<string, any> = {};
      for (const [topicSlug, topicData] of Object.entries(domainData.topics)) {
        topicsObj[topicSlug] = {
          label: this.getLabel(topicSlug),
          languages: topicData.languages,
        };
      }
      domains[domainSlug] = {
        label: this.getLabel(domainSlug),
        topics: topicsObj,
      };
    }

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'manifest.json'),
      JSON.stringify(
        {
          version: GENERATOR.version,
          schemaVersion: GENERATOR.schemaVersion,
          generatedAt: new Date().toISOString(),
          languages: [...accumulator.languages].sort(),
          domains,
        },
        null,
        2,
      ),
      'utf-8',
    );
  }

  private writeSearchIndex(accumulator: Accumulator, OUTPUT_DIR: string): void {
    accumulator.searchIndex.sort((a, b) => a.path.localeCompare(b.path));
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'search-index.json'),
      JSON.stringify(accumulator.searchIndex, null, 2),
      'utf-8',
    );
  }
}
