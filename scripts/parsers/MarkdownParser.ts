export interface ParsedQuestionSection {
  order: number;
  headingNumber: number;
  startIndex: number;
  endIndex: number;
  lineStart: number;
  lineEnd: number;
  content: string;
  fields: Record<string, string>;
}

// ─── Persian digits ─────────────────────────────────────────────────────────

const PERSIAN_DIGITS: Record<string, string> = {
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

export function persianDigitsToEnglish(str: string): string {
  return str.replace(/[۰-۹]/g, (d) => PERSIAN_DIGITS[d] ?? d);
}

// ─── Raw content helpers ────────────────────────────────────────────────────

export function stripBOM(content: string): string {
  return content.replace(/^\uFEFF/, '');
}

export function extractFrontmatterBlock(content: string): string | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

export function stripFrontmatter(content: string): string {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n)?/, '');
}

export function parseFrontmatterFields(
  frontmatterText: string,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const line of frontmatterText.split(/\r?\n/)) {
    const match = line.match(/^([\w-]+):\s*(.+)/);
    if (match) result[match[1]] = match[2].trim();
  }
  return result;
}

// ─── List sections (## Categories / ## Difficulty Levels) ─────────────────

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractListSection(
  content: string,
  headings: string[],
): string[] | null {
  const headingPattern = headings.map(escapeRegExp).join('|');
  const pattern = new RegExp(
    `##\\s*(?:${headingPattern})\\s*\\r?\\n([\\s\\S]*?)(?=\\r?\\n##|$)`,
  );
  const match = content.match(pattern);
  if (!match) return null;

  const items = match[1]
    .split(/\r?\n/)
    .filter((line) => line.trim().startsWith('- '))
    .map((line) => line.replace(/^-\s*/, '').trim())
    .filter((v) => v.length > 0);

  return items.length > 0 ? items : null;
}

export function extractCategories(content: string): string[] | null {
  return extractListSection(content, ['دسته‌بندی‌ها', 'Available Categories']);
}

export function extractDifficulties(content: string): string[] | null {
  return extractListSection(content, ['سطح سوال‌ها', 'Difficulty Levels']);
}

// ─── Question sections ──────────────────────────────────────────────────────

const QUESTION_HEADING_REGEX =
  /##\s*(?:🧠\s*)?(?:سوال|Question)\s*([۰-۹0-9]+)/g;

/**
 * Splits content into question sections using heading *positions*, not a
 * single greedy regex with a lookahead terminator. This is deliberate:
 * a lookahead-based single-pass split has no reliable way to say "end of
 * string" in JS (there's no \Z), so the last section either gets cut off
 * early or dropped. Index-based slicing avoids that entirely.
 */
export function extractQuestionSections(
  content: string,
): ParsedQuestionSection[] {
  const headings: { index: number; number: string }[] = [];
  const regex = new RegExp(QUESTION_HEADING_REGEX);
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    headings.push({ index: match.index, number: match[1] });
  }

  return headings.map((heading, i) => {
    const startIndex = heading.index;
    const endIndex = headings[i + 1] ? headings[i + 1].index : content.length;
    const sectionContent = content.substring(startIndex, endIndex);

    return {
      order: i,
      headingNumber: parseInt(persianDigitsToEnglish(heading.number), 10),
      startIndex,
      endIndex,
      lineStart: content.substring(0, startIndex).split(/\r?\n/).length,
      lineEnd: content.substring(0, endIndex).split(/\r?\n/).length,
      content: sectionContent,
      fields: extractFields(sectionContent),
    };
  });
}

// ─── Field extraction (**Key**: value) ──────────────────────────────────────

export function extractFields(content: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const regex = /\*\*(.+?)\*\*:\s*(.+?)(?:\r?\n|$)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(content)) !== null) {
    fields[m[1].trim()] = m[2].trim();
  }
  return fields;
}

/**
 * Canonical field aliases. This is the single source of truth for what
 * counts as "the ID field" etc. — previously validator.ts and generator.ts
 * disagreed on the Persian alias for ID (آیدی vs شناسه), so a file using
 * one convention silently failed extraction in whichever script didn't
 * recognize it. Both aliases are now accepted everywhere.
 */
export const FIELD_ALIASES = {
  id: ['ID', 'شناسه'],
  title: ['Title', 'عنوان'],
  difficulty: ['Difficulty', 'سطح دشواری'],
  category: ['Category', 'دسته‌بندی'],
  tags: ['Tags', 'برچسب‌ها'],
} as const;

export function getField(
  fields: Record<string, string>,
  key: keyof typeof FIELD_ALIASES,
): string | null {
  for (const alias of FIELD_ALIASES[key]) {
    if (fields[alias] !== undefined) return fields[alias];
  }
  return null;
}

// ─── Answer extraction ───────────────────────────────────────────────────────

const ANSWER_HEADING_REGEX = /###\s*(?:Answer|پاسخ)\s*(?:📄\s*)?/i;

export function hasAnswer(sectionContent: string): boolean {
  return ANSWER_HEADING_REGEX.test(sectionContent);
}

export function extractAnswer(sectionContent: string): string | null {
  const match = sectionContent.match(ANSWER_HEADING_REGEX);
  if (!match || match.index === undefined) return null;

  const afterHeading = sectionContent.slice(match.index + match[0].length);
  // Stop at the next ## or ### heading, so a later section (e.g. ### Notes)
  // inside the same question isn't folded into the answer body.
  const nextHeading = afterHeading.match(/\r?\n#{2,3}\s/);
  const answerBody = nextHeading
    ? afterHeading.slice(0, nextHeading.index)
    : afterHeading;

  return answerBody.trim();
}

// ─── Slug ────────────────────────────────────────────────────────────────────

export function slugify(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[ـ]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
    .replace(/-+$/g, '');
}
