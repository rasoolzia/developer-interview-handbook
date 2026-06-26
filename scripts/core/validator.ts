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

  constructor(configPath?: string) {
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
    const files = fs
      .readdirSync(topicPath)
      .filter((file) => file.endsWith('.md'))
      .map((file) => path.join(topicPath, file));

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
      const content = fs.readFileSync(filePath, 'utf-8');

      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) {
        this.addError('FRONTMATTER_MISSING', 'Frontmatter not found', filePath);
        return null;
      }

      const frontmatter = this.parseFrontmatter(frontmatterMatch[1]);
      if (!frontmatter) {
        this.addError(
          'FRONTMATTER_INVALID',
          'Invalid frontmatter format',
          filePath,
        );
        return null;
      }

      // Extract categories
      const categories = this.extractCategories(content);
      if (!categories) {
        this.addError(
          'CATEGORIES_MISSING',
          'Categories section not found',
          filePath,
        );
        return null;
      }

      // Extract difficulties
      const difficulties = this.extractDifficulties(content);
      if (!difficulties) {
        this.addError(
          'DIFFICULTIES_MISSING',
          'Difficulties section not found',
          filePath,
        );
        return null;
      }

      // Extract questions
      const questions = this.extractQuestions(content);
      if (questions.length === 0) {
        this.addError('QUESTIONS_MISSING', 'No questions found', filePath);
        return null;
      }

      return {
        frontmatter,
        categories,
        difficulties,
        questions,
        rawContent: content,
        filePath,
      };
    } catch (error) {
      this.addError(
        'FILE_READ_ERROR',
        `Error reading file: ${error}`,
        filePath,
      );
      return null;
    }
  }

  private parseFrontmatter(frontmatterText: string): Frontmatter | null {
    const lines = frontmatterText.split('\n');
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
      /##\s*(?:دسته‌بندی‌ها|Available Categories)\s*\n([\s\S]*?)(?=\n##|$)/;
    const match = content.match(pattern);

    if (!match) return null;

    const lines = match[1].split('\n');
    const categories = lines
      .filter((line) => line.trim().startsWith('- '))
      .map((line) => line.replace('- ', '').trim())
      .filter((cat) => cat.length > 0);

    return categories.length > 0 ? categories : null;
  }

  private extractDifficulties(content: string): string[] | null {
    const pattern =
      /##\s*(?:سطح سوال‌ها|Difficulty Levels)\s*\n([\s\S]*?)(?=\n##|$)/;
    const match = content.match(pattern);

    if (!match) return null;

    const lines = match[1].split('\n');
    const difficulties = lines
      .filter((line) => line.trim().startsWith('- '))
      .map((line) => line.replace('- ', '').trim())
      .filter((diff) => diff.length > 0);

    return difficulties.length > 0 ? difficulties : null;
  }

  private extractQuestions(content: string): Question[] {
    const questions: Question[] = [];
    const lines = content.split('\n');

    // find questions
    const questionRegex = /##\s*🧠\s*(?:سوال|Question)\s*(\d+)/g;
    let match;
    let lastIndex = 0;

    while ((match = questionRegex.exec(content)) !== null) {
      const startIndex = match.index;
      const number = parseInt(match[1]);
      const startLine = content.substring(0, startIndex).split('\n').length;

      // Find the end of the question (start of the next question or end of the file)
      const nextMatch = questionRegex.exec(content);
      const endIndex = nextMatch ? nextMatch.index : content.length;
      const endLine = content.substring(0, endIndex).split('\n').length;

      const qContent = content.substring(startIndex, endIndex);

      // Extract fields
      const idMatch =
        qContent.match(/\*\*آیدی\*\*:\s*(.+?)(?:\n|$)/) ||
        qContent.match(/\*\*ID\*\*:\s*(.+?)(?:\n|$)/);
      const titleMatch =
        qContent.match(/\*\*عنوان\*\*:\s*(.+?)(?:\n|$)/) ||
        qContent.match(/\*\*Title\*\*:\s*(.+?)(?:\n|$)/);
      const diffMatch =
        qContent.match(/\*\*سطح دشواری\*\*:\s*(.+?)(?:\n|$)/) ||
        qContent.match(/\*\*Difficulty\*\*:\s*(.+?)(?:\n|$)/);
      const catMatch =
        qContent.match(/\*\*دسته‌بندی\*\*:\s*(.+?)(?:\n|$)/) ||
        qContent.match(/\*\*Category\*\*:\s*(.+?)(?:\n|$)/);

      if (idMatch && titleMatch && diffMatch && catMatch) {
        questions.push({
          id: idMatch[1].trim(),
          title: titleMatch[1].trim(),
          difficulty: diffMatch[1].trim(),
          category: catMatch[1].trim(),
          content: qContent.trim(),
          number,
          lineStart: startLine,
          lineEnd: endLine,
        });
      }

      // Revert index to previous state to find next question
      if (nextMatch) {
        questionRegex.lastIndex = nextMatch.index;
      }
    }

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
    const categoriesUsed = doc.questions.map((q) => q.category);
    const uniqueCategoriesUsed = [...new Set(categoriesUsed)];

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
    const contentLines = doc.rawContent.split('\n');

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

    // Check if categories match exactly
    const allCategoriesMatch = results.every((r) => {
      // This requires reading the actual categories from the document
      // For now, just check the count
      return true;
    });

    return {
      questionsCount: allQuestionsCount,
      categoriesCount: allCategoriesCount,
      difficultiesCount: allDifficultiesCount,
      categoriesMatch: allCategoriesMatch,
      difficultiesMatch: true,
      questionCountsMatch: allQuestionsCount,
      structureMatch: true,
    };
  }

  // ============================================
  // Error handling methods
  // ============================================

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

    console.log(`\n📄 ${result.filePath}`);
    console.log(`   Language: ${result.language}`);
    console.log(`   Questions: ${result.questionsCount}`);
    console.log(`   Categories: ${result.categoriesCount}`);
    console.log(`   Difficulties: ${result.difficultiesCount}`);
    console.log(`   Status: ${result.isValid ? '✅ PASSED' : '❌ FAILED'}`);

    if (errors.length > 0) {
      console.log(`\n   ❌ Errors (${errors.length}):`);
      for (const error of errors) {
        console.log(`      - ${error.message}`);
        if (error.suggestion) {
          console.log(`        💡 ${error.suggestion}`);
        }
        if (error.questionId) {
          console.log(`        📌 Question: ${error.questionId}`);
        }
      }
    }

    if (warnings.length > 0) {
      console.log(`\n   ⚠️ Warnings (${warnings.length}):`);
      for (const warning of warnings) {
        console.log(`      - ${warning.message}`);
        if (warning.suggestion) {
          console.log(`        💡 ${warning.suggestion}`);
        }
      }
    }

    console.log(
      `\n   Summary: ${errors.length} errors, ${warnings.length} warnings`,
    );
    console.log('-'.repeat(60));
  }

  private printTopicComparison(comparison: TopicComparison) {
    console.log(`\n📂 TOPIC: ${comparison.topic}`);
    console.log(`   Languages: ${comparison.languages.join(', ')}`);
    console.log(`   Files: ${comparison.files.length}`);
    console.log(
      `   Consistent: ${comparison.isConsistent ? '✅ YES' : '❌ NO'}`,
    );

    if (!comparison.isConsistent) {
      console.log('\n   🔍 Differences found:');
      const diffs = comparison.differences;

      if (!diffs.questionsCount) {
        console.log('      - Different number of questions between languages');
      }
      if (!diffs.categoriesCount) {
        console.log('      - Different number of categories between languages');
      }
      if (!diffs.difficultiesCount) {
        console.log(
          '      - Different number of difficulties between languages',
        );
      }
      if (!diffs.categoriesMatch) {
        console.log('      - Categories do not match between languages');
      }
      if (!diffs.difficultiesMatch) {
        console.log('      - Difficulties do not match between languages');
      }
    }

    console.log('\n   📄 Individual file results:');
    for (const file of comparison.files) {
      const icon = file.isValid ? '✅' : '❌';
      console.log(
        `      ${icon} ${file.filePath} (${file.questionsCount} questions)`,
      );
    }

    console.log('-'.repeat(60));
  }
}
