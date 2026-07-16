import fs from 'fs';
import path from 'path';
import * as MarkdownParser from '../parsers/MarkdownParser.js';
import {
  Frontmatter,
  MDDocument,
  Question,
  TopicComparison,
  ValidationError,
  ValidationResult,
  ValidatorConfig,
} from '../types/types.js';

export class MDValidator {
  private config: ValidatorConfig;
  private errors: ValidationError[] = [];
  private warnings: ValidationError[] = [];
  private isQuiet: boolean = false;
  private isVerbose: boolean = false;

  constructor(
    configPath?: string,
    options?: { quiet?: boolean; verbose?: boolean },
  ) {
    const defaultConfig = path.join(
      process.cwd(),
      'scripts/config/validator.config.json',
    );
    const configFile = configPath || defaultConfig;

    if (fs.existsSync(configFile)) {
      this.config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    } else {
      throw new Error(`Config file not found: ${configFile}`);
    }

    if (options) {
      this.isQuiet = options.quiet || false;
      this.isVerbose = options.verbose || false;
    }
  }

  // ============================================
  // one file validation
  // ============================================

  validateFile(filePath: string): ValidationResult | null {
    this.errors = [];
    this.warnings = [];

    const doc = this.parseFile(filePath);
    if (!doc) {
      return null;
    }

    return this.validateDocument(doc);
  }

  // ============================================
  // one topic validation
  // ============================================

  validateTopic(topicPath: string): TopicComparison | null {
    this.log(`\n🔍 Scanning: ${topicPath}`);

    const files = fs
      .readdirSync(topicPath)
      .filter((file) => file.endsWith('.md'))
      .map((file) => path.join(topicPath, file));

    this.log(`   Found ${files.length} MD files:`);
    files.forEach((f) => this.log(`      - ${path.basename(f)}`));

    if (files.length === 0) {
      console.error(`❌ No MD files found in ${topicPath}`);
      return null;
    }

    const results: ValidationResult[] = [];
    for (const file of files) {
      const result = this.validateFile(file);
      if (result) {
        results.push(result);
      }
    }

    const topic = path.basename(topicPath);
    const languages = results.map((r) => r.language || 'unknown');
    const consistency = this.checkConsistency(results);

    return {
      topic,
      languages: [...new Set(languages)],
      files: results,
      isConsistent: Object.values(consistency).every((v) => v === true),
      differences: consistency,
    };
  }

  // ============================================
  // parsing (delegates to MarkdownParser for shared logic)
  // ============================================

  private parseFile(filePath: string): MDDocument | null {
    try {
      this.log(`\n📖 Parsing: ${path.basename(filePath)}`);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const cleanContent = MarkdownParser.stripBOM(raw);

      const frontmatterBlock =
        MarkdownParser.extractFrontmatterBlock(cleanContent);
      if (!frontmatterBlock) {
        this.log(`   ❌ No frontmatter found`);
        this.addError('FRONTMATTER_MISSING', 'Frontmatter not found', filePath);
        return null;
      }
      this.log(`   ✅ Frontmatter found`);

      const frontmatter = this.parseFrontmatter(frontmatterBlock);
      if (!frontmatter) {
        this.log(`   ❌ Invalid frontmatter`);
        this.addError(
          'FRONTMATTER_INVALID',
          'Invalid frontmatter format',
          filePath,
        );
        return null;
      }
      this.log(`   ✅ Frontmatter valid: ${JSON.stringify(frontmatter)}`);

      const content = MarkdownParser.stripFrontmatter(cleanContent);

      const categories = MarkdownParser.extractCategories(content);
      if (!categories) {
        this.log(`   ❌ No categories found`);
        this.addError(
          'CATEGORIES_MISSING',
          'Categories section not found',
          filePath,
        );
        return null;
      }
      this.log(`   ✅ Categories found: ${categories.length}`);

      const difficulties = MarkdownParser.extractDifficulties(content);
      if (!difficulties) {
        this.log(`   ❌ No difficulties found`);
        this.addError(
          'DIFFICULTIES_MISSING',
          'Difficulties section not found',
          filePath,
        );
        return null;
      }
      this.log(`   ✅ Difficulties found: ${difficulties.length}`);

      this.log(`   🔍 Extracting questions...`);
      const sections = MarkdownParser.extractQuestionSections(content);
      this.log(`   🔍 Found ${sections.length} question headings`);
      const questions = this.buildQuestions(sections);
      if (questions.length === 0) {
        this.log(`   ❌ No questions found`);
        this.addError('QUESTIONS_MISSING', 'No questions found', filePath);
        return null;
      }
      this.log(`   ✅ Questions found: ${questions.length}`);

      return {
        frontmatter,
        categories,
        difficulties,
        questions,
        rawContent: content,
        filePath,
      };
    } catch (error) {
      this.log(`   ❌ Error: ${error}`);
      this.addError(
        'FILE_READ_ERROR',
        `Error reading file: ${error}`,
        filePath,
      );
      return null;
    }
  }

  private parseFrontmatter(frontmatterText: string): Frontmatter | null {
    const result = MarkdownParser.parseFrontmatterFields(frontmatterText);

    if (!result.topic || !result.language || !result.version) {
      return null;
    }
    if (!['fa', 'en'].includes(result.language)) {
      return null;
    }
    return result as unknown as Frontmatter;
  }

  private buildQuestions(
    sections: MarkdownParser.ParsedQuestionSection[],
  ): Question[] {
    return sections.map((section) => ({
      id: MarkdownParser.getField(section.fields, 'id') || '',
      title: MarkdownParser.getField(section.fields, 'title') || '',
      difficulty: MarkdownParser.getField(section.fields, 'difficulty') || '',
      category: MarkdownParser.getField(section.fields, 'category') || '',
      content: section.content.trim(),
      number: section.headingNumber,
      lineStart: section.lineStart,
      lineEnd: section.lineEnd,
    }));
  }

  // ============================================
  // document validation
  // ============================================

  private validateDocument(doc: MDDocument): ValidationResult {
    const language = doc.frontmatter.language;

    this.validateCategories(doc);
    this.validateDifficulties(doc, language);
    for (const question of doc.questions) {
      this.validateQuestion(question, doc, language);
    }
    this.validateQuestionNumbers(doc);
    this.validateDuplicateIds(doc);
    this.validateStructure(doc);
    this.validateCodeBlocks(doc);
    this.validateAnswerContent(doc);
    this.validateDuplicateTitles(doc);
    this.validateIdSequential(doc);

    return {
      filePath: doc.filePath,
      isValid: this.errors.length === 0,
      errors: [...this.errors, ...this.warnings],
      questionsCount: doc.questions.length,
      categoriesCount: doc.categories.length,
      difficultiesCount: doc.difficulties.length,
      topic: doc.frontmatter.topic,
      language: doc.frontmatter.language,
    };
  }

  private validateCategories(doc: MDDocument) {
    const allUsedCategories: string[] = [];
    for (const question of doc.questions) {
      allUsedCategories.push(
        ...question.category
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean),
      );
    }
    const uniqueCategoriesUsed = [...new Set(allUsedCategories)];

    for (const category of doc.categories) {
      if (!uniqueCategoriesUsed.includes(category)) {
        this.addWarning(
          'CATEGORY_UNUSED',
          `Category "${category}" is defined but not used in any question`,
          doc.filePath,
          undefined,
          `Either use this category or remove it from the list`,
        );
      }
    }
    for (const category of uniqueCategoriesUsed) {
      if (!doc.categories.includes(category)) {
        this.addError(
          'CATEGORY_NOT_DEFINED',
          `Category "${category}" is used but not defined in the category list`,
          doc.filePath,
          undefined,
          `Add "${category}" to the categories list`,
        );
      }
    }
  }

  private validateDifficulties(doc: MDDocument, language: string) {
    const allowedDifficulties =
      this.config.allowedDifficulties[language as 'fa' | 'en'] || [];
    const uniqueDifficultiesUsed = [
      ...new Set(doc.questions.map((q) => q.difficulty)),
    ];

    for (const difficulty of doc.difficulties) {
      if (!uniqueDifficultiesUsed.includes(difficulty)) {
        this.addWarning(
          'DIFFICULTY_UNUSED',
          `Difficulty "${difficulty}" is defined but not used`,
          doc.filePath,
        );
      }
    }
    for (const difficulty of uniqueDifficultiesUsed) {
      if (!doc.difficulties.includes(difficulty)) {
        this.addError(
          'DIFFICULTY_NOT_DEFINED',
          `Difficulty "${difficulty}" is used but not defined in the difficulty list`,
          doc.filePath,
          undefined,
          `Add "${difficulty}" to the difficulty list`,
        );
      }
    }
    for (const difficulty of uniqueDifficultiesUsed) {
      if (!allowedDifficulties.includes(difficulty)) {
        this.addError(
          'DIFFICULTY_INVALID',
          `"${difficulty}" is not allowed for ${language} language`,
          doc.filePath,
          undefined,
          `Allowed: ${allowedDifficulties.join(', ')}`,
        );
      }
    }
  }

  private validateQuestion(
    question: Question,
    doc: MDDocument,
    language: string,
  ) {
    const allowedDifficulties =
      this.config.allowedDifficulties[language as 'fa' | 'en'] || [];

    for (const field of this.config.requiredFields) {
      const fieldMap: { [key: string]: string } = {
        id: question.id,
        title: question.title,
        difficulty: question.difficulty,
        category: question.category,
      };
      if (!fieldMap[field]) {
        this.addError(
          'FIELD_MISSING',
          `Question ${question.number} is missing field: ${field}`,
          doc.filePath,
          question.id,
        );
      }
    }

    const categories = question.category
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    for (const category of categories) {
      if (!doc.categories.includes(category)) {
        this.addError(
          'CATEGORY_NOT_DEFINED',
          `Category "${category}" in question ${question.number} is not defined in the category list`,
          doc.filePath,
          question.id,
          `Add "${category}" to the categories list or use an existing category`,
        );
      }
    }

    // Only flag an invalid value if a value was actually provided —
    // an empty difficulty is already reported by FIELD_MISSING above.
    if (
      question.difficulty &&
      !allowedDifficulties.includes(question.difficulty)
    ) {
      this.addError(
        'DIFFICULTY_INVALID',
        `Question "${question.id}" has invalid difficulty: "${question.difficulty}"`,
        doc.filePath,
        question.id,
        `Allowed: ${allowedDifficulties.join(', ')}`,
      );
    }

    const expectedPrefix = doc.frontmatter.topic;
    if (question.id && !question.id.startsWith(expectedPrefix)) {
      this.addWarning(
        'ID_FORMAT_INVALID',
        `Question ID "${question.id}" should start with "${expectedPrefix}"`,
        doc.filePath,
        question.id,
        `Expected format: ${expectedPrefix}-XXX`,
      );
    }
  }

  private validateQuestionNumbers(doc: MDDocument) {
    const numbers = doc.questions.map((q) => q.number).sort((a, b) => a - b);
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] !== i + 1) {
        this.addWarning(
          'NUMBERS_NOT_SEQUENTIAL',
          `Question numbers are not sequential. Found: ${numbers.join(', ')}`,
          doc.filePath,
          undefined,
          'Should be 1, 2, 3, ...',
        );
        break;
      }
    }
  }

  private validateDuplicateIds(doc: MDDocument) {
    const ids = doc.questions.map((q) => q.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      this.addError(
        'DUPLICATE_IDS',
        `Duplicate question IDs: ${[...new Set(duplicateIds)].join(', ')}`,
        doc.filePath,
        undefined,
        'Each question must have a unique ID',
      );
    }
  }

  private validateStructure(doc: MDDocument) {
    const contentLines = doc.rawContent.split(/\r?\n/);

    for (const question of doc.questions) {
      const lineIndex = (question.lineStart || 1) - 1;

      if (lineIndex > 0) {
        const prevLine = contentLines[lineIndex - 1]?.trim() || '';
        if (prevLine !== '') {
          this.addWarning(
            'STRUCTURE_FORMAT',
            `No blank line before question ${question.number}`,
            doc.filePath,
            question.id,
            'Add a blank line before each question',
          );
        }
      }

      if (!MarkdownParser.hasAnswer(question.content)) {
        this.addError(
          'ANSWER_MISSING',
          `Question "${question.id}" has no answer section`,
          doc.filePath,
          question.id,
          'Add ### پاسخ or ### Answer section',
        );
      }
    }
  }

  private validateCodeBlocks(doc: MDDocument) {
    for (const question of doc.questions) {
      const codeFences = (question.content.match(/```/g) || []).length;
      if (codeFences % 2 !== 0) {
        this.addError(
          'UNBALANCED_CODE_FENCE',
          `Question "${question.id}" has unbalanced code fences (odd number of \`\`\`)`,
          doc.filePath,
          question.id,
          'Make sure every ``` has a closing ```',
        );
      }
    }
  }

  private validateAnswerContent(doc: MDDocument) {
    for (const question of doc.questions) {
      const answerContent = MarkdownParser.extractAnswer(question.content);
      if (answerContent === null) continue;

      if (answerContent.length < 10) {
        this.addWarning(
          'ANSWER_TOO_SHORT',
          `Question "${question.id}" has a very short answer (${answerContent.length} chars)`,
          doc.filePath,
          question.id,
          'Consider expanding the answer',
        );
      }
      if (answerContent.match(/TODO|FIXME|TBD|XXX/)) {
        this.addWarning(
          'ANSWER_PLACEHOLDER',
          `Question "${question.id}" contains placeholder text (TODO/FIXME/TBD/XXX)`,
          doc.filePath,
          question.id,
          'Replace placeholder with actual content',
        );
      }
    }
  }

  private validateDuplicateTitles(doc: MDDocument) {
    const titles = doc.questions.map((q) => q.title);
    const duplicateTitles = titles.filter((t, i) => titles.indexOf(t) !== i);
    if (duplicateTitles.length > 0) {
      this.addWarning(
        'DUPLICATE_TITLES',
        `Duplicate question titles found: ${[...new Set(duplicateTitles)].join(', ')}`,
        doc.filePath,
        undefined,
        'Each question should have a unique title',
      );
    }
  }

  private validateIdSequential(doc: MDDocument) {
    const ids = doc.questions.map((q) => q.id);
    const topic = doc.frontmatter.topic;

    const numbers = ids
      .map((id) => {
        const match = id.match(new RegExp(`${topic}-(\\d+)`));
        return match ? parseInt(match[1]) : null;
      })
      .filter((n): n is number => n !== null);

    if (numbers.length > 0) {
      const sorted = [...numbers].sort((a, b) => a - b);
      for (let i = 0; i < sorted.length; i++) {
        if (sorted[i] !== i + 1) {
          this.addWarning(
            'ID_NOT_SEQUENTIAL',
            `Question IDs are not sequential. Expected ${topic}-001, ${topic}-002, etc.`,
            doc.filePath,
            undefined,
            `Found: ${ids.join(', ')}`,
          );
          break;
        }
      }
    }
  }

  private checkConsistency(
    results: ValidationResult[],
  ): TopicComparison['differences'] {
    if (results.length < 2) {
      return {
        questionsCount: true,
        categoriesCount: true,
        difficultiesCount: true,
        categoriesMatch: true,
        difficultiesMatch: true,
        questionCountsMatch: true,
        structureMatch: true,
      };
    }

    const first = results[0];
    const allQuestionsCount = results.every(
      (r) => r.questionsCount === first.questionsCount,
    );
    const allCategoriesCount = results.every(
      (r) => r.categoriesCount === first.categoriesCount,
    );
    const allDifficultiesCount = results.every(
      (r) => r.difficultiesCount === first.difficultiesCount,
    );

    // NOTE: still a stub — count-only, doesn't compare actual category/
    // difficulty content across languages. Flagged in earlier review, not
    // touched in this refactor.
    const categoriesMatch = true;
    const difficultiesMatch = true;

    return {
      questionsCount: allQuestionsCount,
      categoriesCount: allCategoriesCount,
      difficultiesCount: allDifficultiesCount,
      categoriesMatch,
      difficultiesMatch,
      questionCountsMatch: allQuestionsCount,
      structureMatch: true,
    };
  }

  // ============================================
  // logging / error handling
  // ============================================

  private log(message: string, level: 'info' | 'debug' = 'info') {
    if (this.isQuiet) return;
    if (level === 'debug' && !this.isVerbose) return;
    console.log(message);
  }

  private addError(
    code: string,
    message: string,
    file?: string,
    questionId?: string,
    suggestion?: string,
  ) {
    this.errors.push({
      type: 'error',
      code,
      message,
      file,
      questionId,
      suggestion,
    });
  }

  private addWarning(
    code: string,
    message: string,
    file?: string,
    questionId?: string,
    suggestion?: string,
  ) {
    this.warnings.push({
      type: 'warning',
      code,
      message,
      file,
      questionId,
      suggestion,
    });
  }

  // ============================================
  // print report
  // ============================================

  printResult(result: ValidationResult | TopicComparison) {
    if ('files' in result) {
      this.printTopicComparison(result);
    } else {
      this.printFileResult(result);
    }
  }

  private printFileResult(result: ValidationResult) {
    const errors = result.errors.filter((e) => e.type === 'error');
    const warnings = result.errors.filter((e) => e.type === 'warning');

    this.log(`\n📄 ${result.filePath}`);
    this.log(`   Language: ${result.language}`);
    this.log(`   Questions: ${result.questionsCount}`);
    this.log(`   Categories: ${result.categoriesCount}`);
    this.log(`   Difficulties: ${result.difficultiesCount}`);
    this.log(`   Status: ${result.isValid ? '✅ PASSED' : '❌ FAILED'}`);

    if (errors.length > 0) {
      this.log(`\n   ❌ Errors (${errors.length}):`);
      for (const error of errors) {
        this.log(`      - ${error.message}`);
        if (error.suggestion) this.log(`        💡 ${error.suggestion}`);
        if (error.questionId)
          this.log(`        📌 Question: ${error.questionId}`);
      }
    }
    if (warnings.length > 0) {
      this.log(`\n   ⚠️ Warnings (${warnings.length}):`);
      for (const warning of warnings) {
        this.log(`      - ${warning.message}`);
        if (warning.suggestion) this.log(`        💡 ${warning.suggestion}`);
      }
    }
    if (errors.length > 0 || warnings.length > 0) {
      this.log(
        `\n   Summary:${errors.length > 0 ? ` ${errors.length} errors` : ''}${warnings.length > 0 ? ` ${warnings.length} warnings` : ''}`,
      );
    }
    this.log('-'.repeat(60));
  }

  private printTopicComparison(comparison: TopicComparison) {
    this.log(`\n📂 TOPIC: ${comparison.topic}`);
    this.log(`   Languages: ${comparison.languages.join(', ')}`);
    this.log(`   Files: ${comparison.files.length}`);
    this.log(`   Consistent: ${comparison.isConsistent ? '✅ YES' : '❌ NO'}`);

    if (!comparison.isConsistent) {
      this.log('\n   🔍 Differences found:');
      const diffs = comparison.differences;
      if (!diffs.questionsCount)
        this.log('      - Different number of questions between languages');
      if (!diffs.categoriesCount)
        this.log('      - Different number of categories between languages');
      if (!diffs.difficultiesCount)
        this.log('      - Different number of difficulties between languages');
      if (!diffs.categoriesMatch)
        this.log('      - Categories do not match between languages');
      if (!diffs.difficultiesMatch)
        this.log('      - Difficulties do not match between languages');
    }

    this.log('\n   📄 Individual file results:');
    for (const file of comparison.files) {
      const icon = file.isValid ? '✅' : '❌';
      this.log(
        `      ${icon} ${file.filePath} (${file.questionsCount} questions)`,
      );
    }
    this.log('-'.repeat(60));
  }
}
