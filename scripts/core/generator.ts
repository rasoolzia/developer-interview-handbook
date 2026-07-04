import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { GeneratedQuestion, GeneratorConfig } from '../types/types.js';

// ─── Types ──────────────────────────────────────────────────────────────────

type Accumulator = {
  languages: Set<string>;
  domains: Record<
    string,
    {
      topics: Record<
        string,
        {
          languages: Record<
            string,
            {
              path: string;
              total: number;
              hash: string;
            }
          >;
        }
      >;
    }
  >;
  searchIndex: any[];
};

// ─── Main Class ────────────────────────────────────────────────────────────

export class MDGenerator {
  private config: GeneratorConfig;
  private errors: string[] = [];
  private warnings: string[] = [];
  private strictMode: boolean;

  // ─── Constructor ──────────────────────────────────────────────────────────

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
    const SCHEMA_VERSION = 2;

    console.log(`\n🚀 Interview Playbook — API Generator v${SCHEMA_VERSION}`);
    if (this.strictMode) console.log('   STRICT mode — warnings are errors');
    console.log('');

    if (!fs.existsSync(CONTENT_DIR)) {
      console.error(`❌ content/ not found: ${CONTENT_DIR}`);
      process.exit(1);
    }

    // Clean output
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

      // Write topic file
      const outDir = path.join(OUTPUT_DIR, meta.domain, topic);
      this.ensureDir(outDir);
      fs.writeFileSync(
        path.join(outDir, `${language}.json`),
        JSON.stringify(
          {
            version: 2,
            meta: {
              domain: meta.domain,
              topic,
              language,
              label: this.getLabel(topic),
            },
            hash: output.hash,
            stats: output.stats,
            questions: output.questions,
          },
          null,
          2,
        ),
        'utf-8',
      );

      const d = output.stats.byDifficulty;
      console.log(
        `     ✅ ${output.stats.total} questions (easy ${d.easy} · medium ${d.medium} · hard ${d.hard})`,
      );

      // Accumulate manifest
      accumulator.languages.add(language);

      if (!accumulator.domains[meta.domain]) {
        accumulator.domains[meta.domain] = { topics: {} };
      }
      if (!accumulator.domains[meta.domain].topics[topic]) {
        accumulator.domains[meta.domain].topics[topic] = { languages: {} };
      }

      accumulator.domains[meta.domain].topics[topic].languages[language] = {
        path: `${meta.domain}/${topic}/${language}.json`,
        total: output.stats.total,
        hash: output.hash,
      };

      // Accumulate search index
      for (const q of output.questions) {
        accumulator.searchIndex.push({
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
          ...(q.tags?.length ? { tags: q.tags } : {}),
        });
      }
    }
  }

  // ─── File Processor ──────────────────────────────────────────────────────

  private processFile(
    filePath: string,
    meta: { domain: string; topic: string; language: string },
  ): {
    questions: GeneratedQuestion[];
    stats: {
      total: number;
      byDifficulty: Record<string, number>;
      categories: string[];
    };
    hash: string;
  } | null {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const cleanContent = raw.replace(/^\uFEFF/, '');
      const relPath = path.relative(process.cwd(), filePath);

      // Extract frontmatter
      const frontmatterMatch = cleanContent.match(
        /^---\r?\n([\s\S]*?)\r?\n---/,
      );
      if (!frontmatterMatch) {
        this.reportWarning(relPath, null, 'No frontmatter found');
        return null;
      }

      // Remove frontmatter from content
      const content = cleanContent.replace(
        /^---\r?\n[\s\S]*?\r?\n---\r?\n/,
        '',
      );

      const questions = this.parseQuestions(content, meta, relPath);

      if (!questions.length) {
        this.reportWarning(relPath, null, 'No valid questions found');
      }

      const byDifficulty = {
        easy: questions.filter((q) => q.difficulty === 'easy').length,
        medium: questions.filter((q) => q.difficulty === 'medium').length,
        hard: questions.filter((q) => q.difficulty === 'hard').length,
      };

      const categories = [
        ...new Set(questions.flatMap((q) => q.categories)),
      ].sort();

      return {
        questions,
        stats: { total: questions.length, byDifficulty, categories },
        hash: this.contentHash(content),
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

  private parseQuestions(
    markdown: string,
    meta: { domain: string; topic: string; language: string },
    relPath: string,
  ): GeneratedQuestion[] {
    const questionRegex =
      /^##\s+(?:🧠\s*)?(?:Question|سوال)\s+\d+[\s\S]*?(?=^##\s+(?:🧠\s*)?(?:Question|سوال)\s+\d+|\Z)/gim;
    const sections = markdown.match(questionRegex) ?? [];
    const localIds = new Set<string>();
    const localSlugs = new Set<string>();
    const questions: GeneratedQuestion[] = [];

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionLabel = `section ${i + 1}`;

      // Extract all metadata fields
      const fields = Object.fromEntries(
        [...section.matchAll(/\*\*(.+?)\*\*:\s*(.+)/g)].map(
          ([, key, value]) => [key.trim(), value.trim()],
        ),
      );

      // Title
      const headingText = section
        .split('\n')[0]
        .replace(/^[🧠💡🔥⚡️🎯✅📌\s]+/, '')
        .trim();
      const title = (fields.Title ?? fields['عنوان']) || headingText;

      if (!title) {
        this.reportError(relPath, sectionLabel, 'Missing title');
        continue;
      }

      // ID
      const idField = fields.ID ?? fields['شناسه'];
      const id =
        idField ||
        crypto
          .createHash('md5')
          .update(`${meta.domain}-${meta.topic}-${meta.language}-${title}`)
          .digest('hex')
          .slice(0, 12);

      if (localIds.has(id)) {
        this.reportError(relPath, title, `Duplicate ID: "${id}"`);
        continue;
      }

      // Slug
      const slug = this.slugify(title);
      if (localSlugs.has(slug)) {
        this.reportError(relPath, title, `Duplicate slug: "${slug}"`);
        continue;
      }

      localIds.add(id);
      localSlugs.add(slug);

      // Difficulty
      const rawDiff = fields.Difficulty ?? fields['سطح دشواری'] ?? null;
      const difficulty = this.normalizeDifficulty(rawDiff);

      if (this.config.validation?.requireDifficulty && !difficulty) {
        this.reportError(
          relPath,
          title,
          rawDiff
            ? `Unknown difficulty: "${rawDiff}" — must be easy / medium / hard`
            : 'Missing difficulty',
        );
        continue;
      }

      // Categories
      const rawCategory = fields.Category ?? fields['دسته‌بندی'] ?? null;
      const categories = this.parseCategories(rawCategory);

      if (this.config.validation?.requireCategory && categories.length === 0) {
        this.reportError(relPath, title, 'Missing category');
        continue;
      }

      // Tags (optional)
      const tagsRaw = fields.Tags ?? fields['برچسب‌ها'] ?? '';
      const tags = tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      // Answer
      const answerMarkdown = this.extractAnswer(section);

      if (this.config.validation?.requireAnswer && !answerMarkdown) {
        this.reportError(
          relPath,
          title,
          'Missing answer (expected ### Answer)',
        );
        continue;
      }

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
    }

    questions.sort((a, b) => a.id.localeCompare(b.id));
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

  private extractAnswer(section: string): string | null {
    const match = section.match(
      /^###\s*(?:Answer|پاسخ|جواب|Solution|Explanation|راه.?حل)/im,
    );
    if (!match) return null;
    const startIndex = section.indexOf(match[0]) + match[0].length;
    return section.slice(startIndex).trim();
  }

  private slugify(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .normalize('NFKC')
      .replace(/[ـ]/g, '')
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-');
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
          version: 2,
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
