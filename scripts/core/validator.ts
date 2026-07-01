import fs from 'fs';
import path from 'path';
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
      this.config = {
        allowedDifficulties: {
          fa: ['آسان', 'متوسط', 'سخت'],
          en: ['Easy', 'Medium', 'Hard'],
        },
        requiredFields: ['id', 'title', 'difficulty', 'category'],
        strictMode: true,
        checkConsistency: true,
      };
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

    const result = this.validateDocument(doc);
    return result;
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

    // Validate each file
    const results: ValidationResult[] = [];
    for (const file of files) {
      const result = this.validateFile(file);
      if (result) {
        results.push(result);
      }
    }

    // Extract topic name from path
    const topic = path.basename(topicPath);
    const languages = results.map((r) => r.language || 'unknown');

    // Check consistency between files
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
  // helpers
  // ============================================

  private parseFile(filePath: string): MDDocument | null {
    try {
      this.log(`\n📖 Parsing: ${path.basename(filePath)}`);
      const content = fs.readFileSync(filePath, 'utf-8');
      const cleanContent = content.replace(/^\uFEFF/, '');

      // Frontmatter
      const frontmatterMatch = cleanContent.match(
        /^---\r?\n([\s\S]*?)\r?\n---/,
      );
      if (!frontmatterMatch) {
        this.log(`   ❌ No frontmatter found`);
        this.addError('FRONTMATTER_MISSING', 'Frontmatter not found', filePath);
        return null;
      }
      this.log(`   ✅ Frontmatter found`);

      const frontmatter = this.parseFrontmatter(frontmatterMatch[1]);
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

      // Categories
      const categories = this.extractCategories(cleanContent);
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

      // Difficulties
      const difficulties = this.extractDifficulties(cleanContent);
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

      // Questions
      this.log(`   🔍 Extracting questions...`);
      const questions = this.extractQuestions(cleanContent);
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
        rawContent: cleanContent,
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
    const lines = frontmatterText.split(/\r?\n/);
    const result: any = {};

    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)/);
      if (match) {
        result[match[1]] = match[2].trim();
      }
    }

    if (!result.topic || !result.language || !result.version) {
      return null;
    }

    if (!['fa', 'en'].includes(result.language)) {
      return null;
    }

    return result as Frontmatter;
  }

  private extractCategories(content: string): string[] | null {
    const pattern =
      /##\s*(?:دسته‌بندی‌ها|Available Categories)\s*\r?\n([\s\S]*?)(?=\r?\n##|$)/;
    const match = content.match(pattern);

    if (!match) return null;

    const lines = match[1].split(/\r?\n/);
    const categories = lines
      .filter((line) => line.trim().startsWith('- '))
      .map((line) => line.replace('- ', '').trim())
      .filter((cat) => cat.length > 0);

    return categories.length > 0 ? categories : null;
  }

  private extractDifficulties(content: string): string[] | null {
    const pattern =
      /##\s*(?:سطح سوال‌ها|Difficulty Levels)\s*\r?\n([\s\S]*?)(?=\r?\n##|$)/;
    const match = content.match(pattern);

    if (!match) return null;

    const lines = match[1].split(/\r?\n/);
    const difficulties = lines
      .filter((line) => line.trim().startsWith('- '))
      .map((line) => line.replace('- ', '').trim())
      .filter((diff) => diff.length > 0);

    return difficulties.length > 0 ? difficulties : null;
  }

  private extractField(content: string, fieldMap: Record<string, string[]>) {
    for (const [key, variants] of Object.entries(fieldMap)) {
      for (const variant of variants) {
        const regex = new RegExp(
          `\\*\\*${variant}\\*\\*:\\s*(.+?)(?:\\r?\\n|$)`,
        );
        const match = content.match(regex);
        if (match) {
          return { key, value: match[1].trim() };
        }
      }
    }
    return null;
  }

  private extractQuestions(content: string): Question[] {
    const questions: Question[] = [];

    const questionRegex = /##\s*(?:🧠\s*)?(?:سوال|Question)\s*([۰-۹0-9]+)/g;

    const matches: { index: number; number: string }[] = [];
    let match;
    while ((match = questionRegex.exec(content)) !== null) {
      matches.push({
        index: match.index,
        number: match[1],
      });
    }

    if (matches.length === 0) {
      this.log(`   ❌ No questions found`);
      return questions;
    }

    this.log(`   🔍 Found ${matches.length} questions`);

    for (let i = 0; i < matches.length; i++) {
      const current = matches[i];
      const next = matches[i + 1];

      const startIndex = current.index;
      const endIndex = next ? next.index : content.length;

      const qContent = content.substring(startIndex, endIndex);

      // تبدیل عدد فارسی به انگلیسی
      const persianToEnglish: { [key: string]: string } = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
      };
      const numberStr = current.number.replace(
        /[۰-۹]/g,
        (d) => persianToEnglish[d] || d,
      );
      const number = parseInt(numberStr);

      const idResult = this.extractField(qContent, {
        id: ['آیدی', 'ID'],
      });
      const titleResult = this.extractField(qContent, {
        title: ['عنوان', 'Title'],
      });
      const diffResult = this.extractField(qContent, {
        difficulty: ['سطح دشواری', 'Difficulty'],
      });
      const catResult = this.extractField(qContent, {
        category: ['دسته‌بندی', 'Category'],
      });

      if (idResult && titleResult && diffResult && catResult) {
        questions.push({
          id: idResult.value,
          title: titleResult.value,
          difficulty: diffResult.value,
          category: catResult.value,
          content: qContent.trim(),
          number,
          lineStart: content.substring(0, startIndex).split(/\r?\n/).length,
          lineEnd: content.substring(0, endIndex).split(/\r?\n/).length,
        });
      } else {
        this.log(`   ⚠️ Question ${number} missing required fields`);
      }
    }

    this.log(`   ✅ Extracted ${questions.length} questions`);
    return questions;
  }

  private validateDocument(doc: MDDocument): ValidationResult {
    const language = doc.frontmatter.language;

    // 1. Check categories
    this.validateCategories(doc);

    // 2. Check difficulties
    this.validateDifficulties(doc, language);

    // 3. Check each question
    for (const question of doc.questions) {
      this.validateQuestion(question, doc, language);
    }

    // 4. Check question numbers
    this.validateQuestionNumbers(doc);

    // 5. Check duplicate IDs
    this.validateDuplicateIds(doc);

    // 6. Check structure (Farsi vs English)
    this.validateStructure(doc);

    // 7. Check for unbalanced code
    this.validateCodeBlocks(doc);

    // 8. Check short answers or placeholders
    this.validateAnswerContent(doc);

    // 9. Check for duplicate titles
    this.validateDuplicateTitles(doc);

    // 10. Check sequential IDs
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
      const categories = question.category
        .split(',')
        .map((cat) => cat.trim())
        .filter((cat) => cat.length > 0);
      allUsedCategories.push(...categories);
    }

    const uniqueCategoriesUsed = [...new Set(allUsedCategories)];

    // Check if all categories in the list are used
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

    // Check if all used categories are in the list
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
    const difficultiesUsed = doc.questions.map((q) => q.difficulty);
    const uniqueDifficultiesUsed = [...new Set(difficultiesUsed)];

    // Check if all defined difficulties are used
    for (const difficulty of doc.difficulties) {
      if (!uniqueDifficultiesUsed.includes(difficulty)) {
        this.addWarning(
          'DIFFICULTY_UNUSED',
          `Difficulty "${difficulty}" is defined but not used`,
          doc.filePath,
        );
      }
    }

    // Check if all used difficulties are valid
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

    // Check if difficulty is in allowed list for this language
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

    // Check required fields
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
      .map((cat) => cat.trim())
      .filter((cat) => cat.length > 0);

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

    // Check difficulty is allowed
    if (!allowedDifficulties.includes(question.difficulty)) {
      this.addError(
        'DIFFICULTY_INVALID',
        `Question "${question.id}" has invalid difficulty: "${question.difficulty}"`,
        doc.filePath,
        question.id,
        `Allowed: ${allowedDifficulties.join(', ')}`,
      );
    }

    // Check ID format
    const expectedPrefix = doc.frontmatter.topic;
    if (!question.id.startsWith(expectedPrefix)) {
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
    // Check if question sections are properly formatted
    const contentLines = doc.rawContent.split(/\r?\n/);

    for (const question of doc.questions) {
      const lineStart = question.lineStart || 0;
      const lineEnd = question.lineEnd || contentLines.length;

      // Check if there's a blank line before each question
      if (lineStart > 0 && contentLines[lineStart - 1]?.trim() !== '') {
        this.addWarning(
          'STRUCTURE_FORMAT',
          `No blank line before question ${question.number}`,
          doc.filePath,
          question.id,
          'Add a blank line before each question',
        );
      }

      // Check if question has an answer
      const answerPattern = /###\s*(?:پاسخ|Answer)/;
      if (!question.content.match(answerPattern)) {
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
      const answerMatch = question.content.match(
        /###\s*(?:پاسخ|Answer)\s*([\s\S]*?)(?=\n###|$)/,
      );
      if (answerMatch) {
        const answerContent = answerMatch[1].trim();
        if (answerContent.length < 10) {
          this.addWarning(
            'ANSWER_TOO_SHORT',
            `Question "${question.id}" has a very short answer (${answerContent.length} chars)`,
            doc.filePath,
            question.id,
            'Consider expanding the answer',
          );
        }
        if (answerContent.match(/TODO|FIXME|TBD|XXX/i)) {
          this.addWarning(
            'ANSWER_PLACEHOLDER',
            `Question "${question.id}" contains placeholder text (TODO/FIXME/TBD)`,
            doc.filePath,
            question.id,
            'Replace placeholder with actual content',
          );
        }
      }
    }
  }

  private validateDuplicateTitles(doc: MDDocument) {
    const titles = doc.questions.map((q) => q.title);
    const duplicateTitles = titles.filter(
      (title, index) => titles.indexOf(title) !== index,
    );
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
      .filter((n) => n !== null);

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

    const allSameLanguage = results.every((r) => r.language === first.language);

    let categoriesMatch = true;
    let difficultiesMatch = true;

    if (allSameLanguage && results.length > 1) {
      // اینجا باید دسته‌بندی‌های واقعی رو از فایل بخونیم
      // فعلاً همینجا میمونیم
    }

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
  // Error handling methods
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
  // Print report
  // ============================================

  printResult(result: ValidationResult | TopicComparison) {
    if ('files' in result) {
      // Topic comparison
      this.printTopicComparison(result);
    } else {
      // Single file
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
        if (error.suggestion) {
          this.log(`        💡 ${error.suggestion}`);
        }
        if (error.questionId) {
          this.log(`        📌 Question: ${error.questionId}`);
        }
      }
    }

    if (warnings.length > 0) {
      this.log(`\n   ⚠️ Warnings (${warnings.length}):`);
      for (const warning of warnings) {
        this.log(`      - ${warning.message}`);
        if (warning.suggestion) {
          this.log(`        💡 ${warning.suggestion}`);
        }
      }
    }

    this.log(
      `\n   Summary: ${errors.length} errors, ${warnings.length} warnings`,
    );
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

      if (!diffs.questionsCount) {
        this.log('      - Different number of questions between languages');
      }
      if (!diffs.categoriesCount) {
        this.log('      - Different number of categories between languages');
      }
      if (!diffs.difficultiesCount) {
        this.log('      - Different number of difficulties between languages');
      }
      if (!diffs.categoriesMatch) {
        this.log('      - Categories do not match between languages');
      }
      if (!diffs.difficultiesMatch) {
        this.log('      - Difficulties do not match between languages');
      }
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
