import fs from 'fs';
import path from 'path';
import { MDGenerator } from './core/generator.js';
import { MDValidator } from './core/validator.js';

const args = process.argv.slice(2);
const isVerbose = args.includes('--verbose') || args.includes('-v');
const isQuiet = args.includes('--quiet') || args.includes('-q');

function getArgValue(flags: string[]): string | undefined {
  for (const flag of flags) {
    const idx = args.indexOf(flag);
    if (idx !== -1) return args[idx + 1];
  }
  return undefined;
}

function showHelp() {
  console.log(`
📋 MD Validator & Generator

Usage:
  node dist/cli.js <command> <path> [options]

Commands:
  file <path>      Validate a single MD file
  topic <path>     Validate all MD files in a topic directory
  generate         Generate JSON API from all MD files

Options:
  --help, -h       Show this help message
  --config, -c     Path to config file
  --strict         Treat warnings as errors (for generate)
  --quiet, -q      Suppress debug output
  --verbose, -v    Show detailed debug output

Examples:
  node dist/cli.js file content/frontend/css/css.fa.md
  node dist/cli.js topic content/frontend/css
  node dist/cli.js generate
  node dist/cli.js generate --strict --config ./custom-config.json
  `);
}

function main() {
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    showHelp();
    return;
  }

  const command = args[0];
  const pathArg = args[1];
  const configArg = getArgValue(['--config', '-c']);
  const strictMode = args.includes('--strict');

  // ─── Generate command ────────────────────────────────────────────────────
  if (command === 'generate') {
    const generator = new MDGenerator(configArg, strictMode);
    generator.generate();
    return;
  }

  // ─── Validate commands ──────────────────────────────────────────────────
  if (!pathArg) {
    console.error('❌ Path is required for validate commands');
    showHelp();
    process.exit(1);
  }

  const fullPath = path.resolve(process.cwd(), 'content', pathArg);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Path does not exist: ${fullPath}`);
    process.exit(1);
  }

  const validator = new MDValidator(configArg, {
    quiet: isQuiet,
    verbose: isVerbose,
  });
  let result;

  switch (command) {
    case 'file':
      if (!fullPath.endsWith('.md')) {
        console.error('❌ File must be .md');
        process.exit(1);
      }
      result = validator.validateFile(fullPath);
      if (result) {
        validator.printResult(result);
        if (!result.isValid) process.exit(1);
      } else {
        process.exit(1);
      }
      break;

    case 'topic':
      if (!fs.statSync(fullPath).isDirectory()) {
        console.error('❌ Path must be a directory');
        process.exit(1);
      }
      result = validator.validateTopic(fullPath);
      if (result) {
        validator.printResult(result);
        if (!result.isConsistent) process.exit(1);
      } else {
        process.exit(1);
      }
      break;

    default:
      console.error(`❌ Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main();
