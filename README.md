# @athene/webcomponents

Athene's Angular component library: design tokens, global styles and the `ath-*` presentational primitives. No HTTP, no domain words. `athene-web` uses it through `npm run deps:sync`.

```sh
npm run build:lib      # tokens:build, then ng build athene-webcomponents → dist/
npm test               # Karma unit tests
npm run test:tokens    # token pipeline tests (node --test)
npm run lint           # tsc, a11y, tokens:check, Stylelint
npm run storybook      # component catalogue on :6006
```

## Design tokens

### One source of truth

All design tokens live in **DTCG JSON** under `projects/athene-webcomponents/tokens/`:

| File | Contents |
|---|---|
| `base.json` | Every token with its light/default value: colour, focus, radius, shadow, type, density, size, space, motion, z-index, plus the deprecated `--ath-*` aliases |
| `themes/dark.json` | Values for `[data-theme="dark"]`. It may only re-value tokens from `base.json`. |
| `accents/<name>.light.json`, `accents/<name>.dark.json` | Accent presets for `[data-accent]` and `[data-theme="dark"][data-accent]` |
| `tokens.config.json` | Output paths, block order (which is the cascade order), the theme × accent contexts and the **contrast gate** |

`scripts/tokens/build.mjs` (`npm run tokens:build`) generates these files:

- `src/lib/styles/_tokens.scss` holds the CSS custom properties for `:root, [data-theme="light"]`, `[data-theme="dark"]` and the 10 accent blocks. **Never edit this file by hand.**
- `src/lib/styles/tokens.custom-properties.json` is the list of names for Stylelint's `importFrom`. It ships in `dist/…/styles/`, so the app's Stylelint can use it too.
- `src/lib/styles/tokens.inventory.json` lists each name with its path, type and deprecation, for scripts.

`npm run build:lib` runs the generator first. `npm run lint` runs `tokens:check`, which fails when an output is stale or a contrast rule is broken.

### Format rules

- DTCG structure: groups, `$value`, `$type` (inherited from the group), `$description`, `$deprecated` (inherited), and aliases written as `{group.sub.token}`. Values are CSS strings, not the spec's object forms, so the output stays byte-exact. Style Dictionary 4+ reads the same files.
- **The CSS name is the leaf key**, so `color.surface.bg-0` becomes `--bg-0`. Groups only organise the tokens. Leaf keys are unique, and the build fails on duplicates.
- Aliases are emitted as `var(--leaf)`, not resolved, so dark and accent overrides still flow through the cascade. If a `$value` contains `var(--…)` instead of an alias, the build fails, and so it does for unknown aliases, alias cycles in any theme × accent context and overrides of tokens that don't exist.
- Light also matches an explicit `data-theme="light"` (DS-15). Components never carry theme selectors; a difference between themes belongs in a token.

### Contrast gate

`tokens.config.json → contrast` lists foreground/background pairs with a minimum ratio. The build resolves them in all 12 theme × accent contexts using WCAG 2.x maths; translucent values are composited, and `color-mix()` is evaluated. Today that is 576 checks, among them:

- `--focus-ring-color` at ≥ 3:1 on all surfaces (WCAG 1.4.11)
- `--fg` through `--fg-4`, `--fg-label` and `--amber-text` at ≥ 4.5:1
- the labels of "+ New", the primary button and the avatars at ≥ 4.5:1

### Using tokens

- **Focus:** `@include focus-ring` (from `_mixins.scss`), or `outline: none; box-shadow: var(--focus-ring-shadow)`. The global `:focus-visible` uses `--focus-ring-color`. `--accent-ring` is only a decorative halo next to an `--accent` border.
- **Status text:** `--amber` is for icons, dots and fills; text uses `--amber-text`.
- **z-index:** only the scale `--z-base`, `--z-raised`, `--z-dropdown`, `--z-sticky`, `--z-fixed`, `--z-overlay`, `--z-modal`, `--z-popover`, `--z-tooltip`, `--z-toast` (or a `calc()` on one of them).
- **No fallbacks on tokens:** tokens are always defined, so a fallback is dead code that drifts.
- `--ath-*` and `--gold` are **deprecated** aliases. They are still generated, will be removed in quality step 2.7, and must not be used in new code.

### Guardrails

- `npm run lint:styles` runs Stylelint (`stylelint.config.mjs`) with these rules:
  - `csstools/value-no-unknown-custom-properties`, fed by the generated list
  - `athene/no-unknown-custom-property-with-fallback` and `athene/no-fallback-on-token` (`scripts/stylelint/athene-tokens.mjs`). The csstools rule lets `var(--unknown, x)` through; these two don't.
  - z-index only from the scale
  - in component styles: no hex, named or `rgb()`/`hsl()` colours, and no `data-theme`/`.ath-light|dark` selectors
- Existing violations are recorded in `stylelint-suppressions.json` (Stylelint bulk suppressions), so only new ones fail. After fixing something, run `npm run lint:styles:baseline` to shrink the file. Never grow it by hand.
- `npm run tokens:report-app [path/to/app/src]` reports on `athene-web` (default `../athene-web/src`) and never edits it. It runs the same rules over the app's SCSS and inline `styles`, plus a pass over templates and TS strings. It reports undefined tokens, fallbacks that disagree with the token value, dead theme selectors and use of deprecated aliases. With `--strict` it exits 1 when it finds undefined tokens.
- `npm run tokens:parity [-- --ref <git-ref>]` compiles `main.scss` at a ref and in the working tree and diffs every custom property per selector, plus all other rules. Any difference that is not listed in `scripts/tokens/parity-expected.json` fails.

### Why a small generator instead of Style Dictionary

Style Dictionary 5 brings 13 runtime dependencies: prettier, colorjs.io, tinycolor2, chalk, commander, change-case, json5, a zip library, a bundled memfs/glob and others. We would still need custom formats for what we need here:

- leaf-key naming
- aliases kept as `var()`
- several selector blocks in cascade order
- byte-exact values
- comments carried over from `$description`
- a contrast gate over theme × accent

The generator is about 450 lines of plain Node with no dependencies and is covered by `scripts/tokens/tokens.test.mjs`. The sources follow DTCG, so switching to Style Dictionary later only means writing a format; the JSON doesn't change.
