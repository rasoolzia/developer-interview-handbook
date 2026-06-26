export interface Frontmatter {
  topic: string;
  language: 'fa' | 'en';
  version: string;
}

export interface Question {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  content: string;
  number: number;
  lineStart?: number;
  lineEnd?: number;
}

export interface MDDocument {
  frontmatter: Frontmatter;
  categories: string[];
  difficulties: string[];
  questions: Question[];
  rawContent: string;
  filePath: string;
}

export interface ValidationError {
  type: 'error' | 'warning';
  code: string;
  message: string;
  file?: string;
  questionId?: string;
  suggestion?: string;
  line?: number;
}

export interface ValidationResult {
  filePath: string;
  isValid: boolean;
  errors: ValidationError[];
  questionsCount: number;
  categoriesCount: number;
  difficultiesCount: number;
  topic?: string;
  language?: string;
}

export interface TopicComparison {
  topic: string;
  languages: string[];
  files: ValidationResult[];
  isConsistent: boolean;
  differences: {
    questionsCount: boolean;
    categoriesCount: boolean;
    difficultiesCount: boolean;
    categoriesMatch: boolean;
    difficultiesMatch: boolean;
    questionCountsMatch: boolean;
    structureMatch: boolean;
  };
}

export interface ValidatorConfig {
  allowedDifficulties: {
    fa: string[];
    en: string[];
  };
  requiredFields: string[];
  strictMode: boolean;
  checkConsistency: boolean;
}
