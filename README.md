# Developer Interview Handbook

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/rasoolzia/developer-interview-handbook?style=social)](https://github.com/rasoolzia/developer-interview-handbook)
[![GitHub forks](https://img.shields.io/github/forks/rasoolzia/developer-interview-handbook?style=social)](https://github.com/rasoolzia/developer-interview-handbook)

A practical, open-source handbook of **real-world interview questions** for **frontend, backend, and software engineering** roles — curated for modern web development.

This repository contains:

- A curated **question bank** (organized by topic)
- A **public JSON API** (under `public/api`) used by the website UI

Live site: **https://interview.mrzd.ir**

---

## Features

- Curated interview questions for frontend and backend developers
- Software engineering and architecture topics
- Searchable website powered by JSON files
- Public API for the companion UI
- Structured content organization
- Easily extensible format
- Open-source and community friendly

## What’s inside

Topics include (and will expand over time):

- **Frontend**: HTML, CSS, JavaScript, TypeScript, React, Next.js, Vite, tooling, performance
- **Backend**: APIs, databases, auth, caching, scalability fundamentals
- **Browser & Web Platform**: rendering, event loop, networking, storage, security basics
- **Software Engineering**: architecture, design principles, clean code, code review, maintainability
- **Testing**: unit/integration/e2e concepts and tooling
- **General**: fundamentals, debugging, CLI, Git, package managers, etc.

> Note: Content is organized for fast browsing and future growth. The website reads from `public/api` to provide a searchable and visual experience.

---

## Repository structure

High-level layout:

- `content/` — source content organized by domain/topic (frontend, backend, general, software-engineering, testing, …)
- `public/api/` — website-ready JSON files (what the web app fetches)

This separation keeps authoring/editing clean (`content/`) while serving a stable interface to the UI (`public/api/`).

---

## Data format (JSON)

Questions are stored as JSON objects and grouped by category/topic.  
Exact schemas may evolve, but each question typically includes fields like:

- `question`
- `answer` (or notes / key points)
- `difficulty` (optional: easy/medium/hard)
- `tags` (optional)
- `links` / `references` (optional)

If you’re adding content, please follow the existing patterns in the nearest topic file.

---

## Contributing

Contributions are welcome and encouraged.

### Best ways to contribute

- **Suggest new questions / topics**: open an **Issue**
- **Fix typos, improve answers, add questions**: open a **Pull Request**

### Guidelines (lightweight)

- Keep questions **practical** and aligned with real interview scenarios
- Prefer **clear, structured answers** (bullets > walls of text)
- Add references when helpful (official docs, specs, well-known articles)
- Avoid company-confidential or proprietary questions

---

## Roadmap (rough)

- Improve consistency of the JSON schema across categories
- Add difficulty ratings everywhere
- Add better tagging & cross-topic search
- Add more system-design and backend scalability content
- Expand multilingual support (where applicable)

---

## License

MIT — see [LICENSE](./LICENSE).

If you use this project in your own app/site, attribution is appreciated.
