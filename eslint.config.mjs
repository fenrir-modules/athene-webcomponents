// @ts-check
// ESLint for @athene/webcomponents. The rules live in config/eslint.shared.mjs
// (canonical copy; athene-web holds a byte-identical one, drift-checked by
// `npm run lint:shared`). This file only says what is lib-specific.
// Baseline: eslint-suppressions.json — see artifacts/quality/phase1/LINT.md.
import { atheneEslint } from './config/eslint.shared.mjs';

const nonSpec = ['**/*.spec.ts', '**/*.stories.ts'];

export default atheneEslint({
  rootDir: import.meta.dirname,
  prefix: 'ath',
  selectorSeverity: 'error',
  files: ['projects/**/*.ts'],
  templates: ['projects/**/*.html'],
  restrictedSyntax: [
    { files: ['projects/**/*.ts'], ignores: nonSpec, use: ['allowSignalWrites', 'asUnknownAs'] },
    { files: nonSpec, use: ['allowSignalWrites'] },
  ],
  // The light `core` entry point is built on its own (ng-packagr secondary
  // entry): it must not reach into the main entry's sources.
  elements: [
    { type: 'core', pattern: 'projects/athene-webcomponents/core' },
    { type: 'lib', pattern: 'projects/athene-webcomponents/src' },
  ],
  policies: [
    {
      from: { element: { type: 'core' } },
      disallow: { to: { element: { type: 'lib' } } },
      message:
        '@athene/webcomponents/core must not import from the main entry point (secondary entry builds alone).',
    },
  ],
});
