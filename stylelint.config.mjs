// Stylelint for the lib's SCSS (npm run lint:styles).
//
// The rules live in config/stylelint.shared.mjs (shared with athenos-web, which
// extends the same factory against the shipped token list); see the comment
// there for what they guard (quality steps 1.5 and 1.3).
//
// Existing violations are recorded in stylelint-suppressions.json (bulk
// suppressions); only new ones fail. Shrink it with
// `npm run lint:styles:baseline` after fixing — never grow it by hand.
import { athenosStylelint } from './config/stylelint.shared.mjs';

const TOKENS = 'projects/athenos-webcomponents/src/lib/styles/tokens.custom-properties.json';

export default athenosStylelint({
  tokens: [TOKENS],
  componentFiles: [
    'projects/athenos-webcomponents/src/lib/components/**/*.scss',
    'projects/athenos-webcomponents/core/**/*.scss',
  ],
  ignoreFiles: [
    // Generated from tokens/*.json — edit the JSON, not this file.
    'projects/athenos-webcomponents/src/lib/styles/_tokens.scss',
    'storybook-static/**',
  ],
});
