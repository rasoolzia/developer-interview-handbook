import fs from 'fs';
import path from 'path';
import { MDValidator } from './core/validator.js';

const args = process.argv.slice(2);

function showHelp() {
  console.log(`
📋 MD Validator - Validate Interview Questions

Usage:
  node dist/cli.js <command> <path> [options]

Commands:
  file <path>      Validate a single MD file
  topic <path>     Validate all MD files in a topic directory

Options:
  --help, -h       Show this help message
  --config, -c     Path to config file

Examples:
  node dist/cli.js file content/frontend/css/css.fa.md
  node dist/cli.js topic content/frontend/css
  `);
}

function getArgValue(flags: string[]): string | undefined {
  for (const flag of flags) {
    const idx = args.indexOf(flag);
    if (idx !== -1) return args[idx + 1];
  }
  return undefined;
}

function main() {
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    showHelp();
    return;
  }

  const command = args[0];
  const pathArg = args[1];
  const configArg = getArgValue(['--config', '-c']);

  if (!pathArg) {
    console.error('❌ Path is required');
    showHelp();
    process.exit(1);
  }

  const fullPath = path.resolve(process.cwd(), 'content', pathArg);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Path does not exist: ${fullPath}`);
    process.exit(1);
  }

  const validator = new MDValidator(configArg);

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
        if (!result.isValid) {
          process.exit(1);
        }
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
        if (!result.isConsistent) {
          process.exit(1);
        }
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
