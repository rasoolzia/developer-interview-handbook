# Developer Interview Handbook

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/rasoolzia/developer-interview-handbook?style=social)](https://github.com/rasoolzia/developer-interview-handbook)
[![GitHub forks](https://img.shields.io/github/forks/rasoolzia/developer-interview-handbook?style=social)](https://github.com/rasoolzia/developer-interview-handbook)

A practical, open-source handbook of **real-world interview questions** for **frontend, backend, and software engineering** roles.

Instead of writing JSON by hand, all content is authored in structured **Markdown** files. A validation and generation pipeline converts those files into a public JSON API consumed by the website.

**Live website:** https://interview.mrzd.ir
**Website source:** [developer-interview-website](https://github.com/rasoolzia/developer-interview-website)

---

## Features

- Curated interview questions for modern software engineering
- Frontend, backend, architecture, testing, and general programming topics
- Markdown-first authoring experience
- Automatic validation before generation
- Public JSON API for the companion website
- Built-in search index generation
- Multilingual content support (currently English and Persian)
- Open-source and community friendly

---

## Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/rasoolzia/developer-interview-handbook.git
cd developer-interview-handbook

npm install
npm run build
npm run generate
```

Markdown files are the **single source of truth**.
The generated JSON should never be edited manually.

---

## Repository structure

```text
content/
    <domain>/
        .../<topic>.<lang>.md

scripts/
    config/
        generator.config.json
        validator.config.json
    core/
        generator.ts
        validator.ts
    parsers/
        MarkdownParser.ts
    types/
        types.ts

public/
    api/
```

- **content/** contains all interview questions. The top-level folder under `content/` is the _domain_ (e.g. `frontend`); everything below that can be nested as deeply as you like — the _topic_ is derived from the filename itself, following the `<topic>.<lang>.md` convention (e.g. `javascript.en.md`).
- **scripts/** contains the validation and generation pipeline.
- **public/api/** contains generated files consumed by the website.

---

## How it works

The project follows a simple content pipeline:

```text
Markdown files
        │
        ▼
   Validator
        │
        ▼
   Generator
        │
        ▼
public/api/*.json
        │
        ▼
Website UI
```

Markdown is the single source of truth. The generated files inside `public/api/` are build artifacts and should never be edited manually.

Generation runs validation first (when `validateBeforeGenerate` is enabled in `generator.config.json`) and aborts immediately if any content issues are found — nothing is written to `public/api/` on failure.

---

## Writing content

Every topic is written as a Markdown file, one per language:

```text
content/
    frontend/
        javascript/
            javascript.en.md
            javascript.fa.md
```

Questions include structured metadata such as:

- ID
- Title
- Difficulty
- Category
- Tags (optional)
- Answer

The parser extracts this information and generates normalized JSON automatically.

---

## Question format

Each Markdown file contains:

- Frontmatter metadata
- Category definitions
- Difficulty definitions
- Interview questions
- Markdown answers

Example:

```markdown
---
topic: css
language: en
version: 1.0
---

## Available Categories

- Fundamentals
- Layout

## Difficulty Levels

- Easy
- Medium
- Hard

## 🧠 Question 1

**ID**: css-001
**Title**: What is the CSS Box Model?
**Difficulty**: Easy
**Category**: Fundamentals
**Tags**: css, layout

### Answer

...
```

**Required fields** (as bolded `**Key**: value` pairs, except Answer which is its own heading section):

- ID
- Title
- Difficulty
- Category
- Answer (`### Answer` / `### پاسخ`)

**Optional fields**:

- Tags

---

## Validation

Before generating the API, every Markdown file is validated to ensure consistency and content quality.

**Per-file checks:**

- Required fields
- Missing answers
- Invalid or undefined difficulty values
- Undefined or unused categories
- Duplicate IDs and titles
- Sequential question numbering and ID numbering
- Broken Markdown structure (missing blank lines, unbalanced code fences)
- Placeholder content (`TODO`, `FIXME`, `TBD`, ...)
- Answers that are suspiciously short

**Cross-language checks** (running the `topic` command): compares each language's version of a topic for matching question counts, category counts, and difficulty counts.

Generation can optionally run validation first and abort immediately if any issues are found.

---

## JSON API

The generator produces:

```text
public/api/
    manifest.json
    search-index.json
    <domain>/
        <topic>/
            en.json
            fa.json
```

The API includes:

- Topic metadata
- Question metadata
- Reading time estimation
- Difficulty statistics
- Categories
- Content hash
- Search index

Example (`<domain>/<topic>/en.json`):

```json
{
  "version": 2,
  "meta": {
    "domain": "frontend",
    "topic": "css",
    "language": "en",
    "label": "CSS"
  },
  "hash": "a1b2c3d4e5",
  "stats": {
    "total": 22,
    "byDifficulty": { "easy": 5, "medium": 11, "hard": 6 },
    "categories": ["Fundamentals", "Layout"]
  },
  "questions": [
    {
      "id": "css-001",
      "slug": "what-is-the-css-box-model",
      "title": "What is the CSS Box Model?",
      "difficulty": "easy",
      "categories": ["Fundamentals"],
      "domain": "frontend",
      "topic": "css",
      "language": "en",
      "answer": {
        "markdown": "...",
        "readingTime": 2
      }
    }
  ]
}
```

The website consumes these files directly without requiring a backend server.

---

## CLI

Validate a single file:

```bash
npm run validate:file frontend/css/css.en.md
```

Validate an entire topic (checks cross-language consistency too):

```bash
npm run validate:topic frontend/css
```

Generate the JSON API:

```bash
npm run generate
```

Generate in strict mode (warnings are treated as errors):

```bash
npm run generate --strict
```

> These assume `validate:file`, `validate:topic`, and `generate` are defined as npm scripts in `package.json` wrapping `node dist/cli.js ...`. Adjust the exact script names if yours differ.

---

## Topics

Current topics include (and continue to grow):

- HTML
- CSS
- JavaScript
- TypeScript
- React
- Node.js
- Browser internals
- Web APIs
- Performance
- Security
- Databases
- Authentication
- Software Architecture
- Design Principles
- Testing
- Git
- CLI
- Package managers
- And more...

---

## Contributing

Contributions are always welcome! 🎉

### How to contribute

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Test your changes**:

```bash
   npm run validate:topic <domain>/<topic>
   npm run generate
```

5. **Commit your changes**: `git commit -m "Add your feature"`
6. **Push to your fork**: `git push origin feature/your-feature`
7. **Open a Pull Request**

### What you can contribute

- **New interview questions** — Add questions for any topic
- **Better answers** — Improve or clarify existing answers
- **Translations** — Add or improve language support
- **Validator improvements** — Add new validation rules
- **Generator improvements** — Optimize the generation pipeline
- **Documentation** — Improve this README or comments
- **New topics** — Suggest and add entirely new subjects

### Guidelines

- Keep contributions **practical, concise, and focused** on real interview scenarios
- Run validation before submitting
- Test generation locally
- Follow the existing question structure
- Keep Markdown formatting consistent

### Questions?

Feel free to open an issue for discussion before making major changes.

---

## Design Principles

This project is built around a few core ideas:

- Markdown is the single source of truth.
- Validation always happens before generation.
- Generated files should never be edited manually.
- Content should stay easy to write and review.
- The generated JSON API should remain deterministic and stable for consumers.

---

## Roadmap

- Expand frontend and backend coverage
- Add more software architecture topics
- Improve multilingual content
- Improve search metadata
- Add references to official documentation
- Increase automated validation rules, including deeper cross-language consistency checks

---

## License

MIT — see [LICENSE](./LICENSE).

If you build something using this project, attribution is appreciated.
