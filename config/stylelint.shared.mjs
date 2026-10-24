// Shared Stylelint config for the Athene frontend (quality steps 1.5 + 1.3).
//
// CANONICAL COPY: athene-webcomponents/config/stylelint.shared.mjs
// athene-web keeps a byte-identical copy (drift check: `npm run lint:shared`).
//
// Guardrails from the token pipeline (1.5):
//  - every var(--x) must be a generated token (or declared in the same file /
//    in `importFrom`); an undefined or misspelt token fails, with or without a
//    fallback, and tokens carry no (drifting) fallbacks.
//  - component styles use tokens, not raw colours.
//  - components carry no theme selectors (under emulated encapsulation
//    `[data-theme='dark'] .x` never matches; themes live in tokens only).
//  - z-index comes from the one scale (--z-*).
//  - no --ath-* / --gold custom property, declared or read (the legacy
//    aliases were removed in quality step 2.7).
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inlineStyleRanges } from '../scripts/stylelint/angular-inline-styles.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const TOKEN_PLUGIN = join(here, '../scripts/stylelint/athene-tokens.mjs');
const INLINE_SYNTAX = join(here, '../scripts/stylelint/angular-inline-styles.mjs');

/**
 * @param {object} o
 * @param {string[]} o.tokens          the generated token list(s) (tokens.custom-properties.json)
 * @param {string[]} [o.importFrom]    further { customProperties } JSON files that count as defined
 *                                     (e.g. an app's own component-local variables); unlike tokens,
 *                                     these may carry a fallback
 * @param {string[]} o.componentFiles  globs that get the component-only rules
 * @param {string[]} [o.ignoreFiles]
 * @param {boolean} [o.inlineStyles]   also lint `styles: [`…`]` in *.ts (read-only syntax)
 */
export function atheneStylelint({
  tokens,
  importFrom = [],
  componentFiles,
  ignoreFiles = [],
  inlineStyles = false,
}) {
  const defined = [...tokens, ...importFrom];
  return {
    customSyntax: 'postcss-scss',
    plugins: ['stylelint-value-no-unknown-custom-properties', TOKEN_PLUGIN],
    ignoreFiles: ['**/node_modules/**', 'dist/**', ...ignoreFiles],
    rules: {
      'csstools/value-no-unknown-custom-properties': [true, { importFrom: defined }],
      // csstools accepts var(--unknown, x) once a fallback exists; these don't.
      'athene/no-unknown-custom-property-with-fallback': [true, { importFrom: defined }],
      'athene/no-fallback-on-token': [true, { importFrom: tokens }],
      'athene/no-retired-alias': true,
      'declaration-property-value-allowed-list': [
        { 'z-index': ['auto', '0', '/^var\\(--z-[a-z]+\\)$/', '/^calc\\(var\\(--z-[a-z]+\\)/'] },
        {
          message: (prop, value) =>
            `${prop}: ${value} — use the z-index scale (var(--z-*)), see tokens/base.json`,
        },
      ],
    },
    overrides: [
      ...(inlineStyles ? [{ files: ['**/*.ts'], customSyntax: INLINE_SYNTAX }] : []),
      {
        // Component styles: no raw colours, no theme selectors.
        files: componentFiles,
        rules: {
          'color-no-hex': [
            true,
            { message: (hex) => `Unexpected hex colour "${hex}" — use a colour token` },
          ],
          'color-named': [
            'never',
            { message: (name) => `Unexpected named colour "${name}" — use a colour token` },
          ],
          'function-disallowed-list': [
            ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch'],
            {
              message: (fn) =>
                `Unexpected ${fn}() — use a colour token (color-mix() over tokens is fine)`,
            },
          ],
          'selector-disallowed-list': [
            ['/data-theme/', '/\\.ath-(light|dark)\\b/'],
            {
              message: (sel) =>
                `Theme selector "${sel}" in a component — put the theme difference in a token`,
            },
          ],
        },
      },
    ],
  };
}

/**
 * Custom properties a consuming app declares itself (`--x:` in styles,
 * `[style.--x]`, setProperty('--x'), `{'--x': …}`), written to a JSON file
 * for `importFrom`, so component-local variables are not reported as
 * undefined. Same detection as scripts/tokens/report-app.mjs in the lib.
 * @returns {string} path of the written JSON file
 */
export function declaredCustomProperties(srcDir, outFile) {
  const names = new Set();
  const walk = (dir) => {
    for (const e of readdirSync(dir)) {
      if (e === 'node_modules' || e.startsWith('.')) continue;
      const p = join(dir, e);
      if (statSync(p).isDirectory()) walk(p);
      else if (['.scss', '.css', '.ts', '.html'].includes(extname(p)) && !p.endsWith('.spec.ts')) {
        const text = readFileSync(p, 'utf8');
        const ext = extname(p);
        const styleCode =
          ext === '.scss' || ext === '.css'
            ? [text]
            : ext === '.ts'
              ? inlineStyleRanges(text).map(({ start, end }) => text.slice(start, end))
              : [];
        for (const code of styleCode)
          for (const m of code.matchAll(/(?<![\w-])(--[A-Za-z0-9_-]+)\s*:/g)) names.add(m[1]);
        const patterns =
          ext === '.ts' || ext === '.html'
            ? [
                /\[style\.(--[A-Za-z0-9_-]+)/g,
                /setProperty\(\s*['"`](--[A-Za-z0-9_-]+)/g,
                /['"](--[A-Za-z0-9_-]+)['"]\s*:/g,
                /style="[^"]*?(--[A-Za-z0-9_-]+)\s*:/g,
              ]
            : [];
        for (const re of patterns) for (const m of text.matchAll(re)) names.add(m[1]);
      }
    }
  };
  walk(srcDir);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(
    outFile,
    JSON.stringify(
      { customProperties: Object.fromEntries([...names].sort().map((n) => [n, 'app'])) },
      null,
      2
    ) + '\n'
  );
  return outFile;
}
