// Stylelint for the lib's SCSS (npm run lint:styles).
//
// Guardrails from the token pipeline (quality step 1.5):
//  - every var(--x) must be a generated token (or declared in the same file);
//    the list comes from tokens.custom-properties.json, written by
//    scripts/tokens/build.mjs — so an undefined or misspelt token fails,
//    with or without a fallback, and tokens carry no (drifting) fallbacks.
//  - component styles use tokens, not raw colours.
//  - components carry no theme selectors (under emulated encapsulation
//    `[data-theme='dark'] .x` never matches; themes live in tokens only).
//  - z-index comes from the one scale (--z-*).
//
// Existing violations are recorded in stylelint-suppressions.json (bulk
// suppressions); only new ones fail. Shrink it with
// `npm run lint:styles:baseline` after fixing — never grow it by hand.

const TOKENS = 'projects/athene-webcomponents/src/lib/styles/tokens.custom-properties.json';

export default {
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-value-no-unknown-custom-properties', './scripts/stylelint/athene-tokens.mjs'],
  ignoreFiles: [
    // Generated from tokens/*.json — edit the JSON, not this file.
    'projects/athene-webcomponents/src/lib/styles/_tokens.scss',
    '**/node_modules/**',
    'dist/**',
    'storybook-static/**',
  ],
  rules: {
    'csstools/value-no-unknown-custom-properties': [true, { importFrom: [TOKENS] }],
    // csstools accepts var(--unknown, x) once a fallback exists; these don't.
    'athene/no-unknown-custom-property-with-fallback': [true, { importFrom: [TOKENS] }],
    'athene/no-fallback-on-token': [true, { importFrom: [TOKENS] }],
    'declaration-property-value-allowed-list': [
      { 'z-index': ['auto', '0', '/^var\\(--z-[a-z]+\\)$/', '/^calc\\(var\\(--z-[a-z]+\\)/'] },
      { message: (prop, value) => `${prop}: ${value} — use the z-index scale (var(--z-*)), see tokens/base.json` },
    ],
  },
  overrides: [
    {
      // Component styles: no raw colours, no theme selectors.
      files: ['projects/athene-webcomponents/src/lib/components/**/*.scss', 'projects/athene-webcomponents/core/**/*.scss'],
      rules: {
        'color-no-hex': [true, { message: (hex) => `Unexpected hex colour "${hex}" — use a colour token` }],
        'color-named': ['never', { message: (name) => `Unexpected named colour "${name}" — use a colour token` }],
        'function-disallowed-list': [
          ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch'],
          { message: (fn) => `Unexpected ${fn}() — use a colour token (color-mix() over tokens is fine)` },
        ],
        'selector-disallowed-list': [
          ['/data-theme/', '/\\.ath-(light|dark)\\b/'],
          { message: (sel) => `Theme selector "${sel}" in a component — put the theme difference in a token` },
        ],
      },
    },
  ],
};
