#!/usr/bin/env node
// Token report for a consuming app (reporting only — never edits, exits 0
// unless --strict). Runs the same Stylelint rule the lib uses
// (csstools/value-no-unknown-custom-properties, fed by the generated token
// list) over the app's SCSS and its components' inline `styles`, and a
// regex pass over templates / TS strings (`[style.x]="'var(--y)'"` etc.).
//
//   node scripts/tokens/report-app.mjs [appSrc] [--json out.json] [--strict]
//   npm run tokens:report-app            (defaults to ../athene-web/src)
//
// A custom property counts as defined when it is a lib token or the app
// declares it somewhere (`--x:` in styles, `[style.--x]`, setProperty('--x'),
// `{'--x': …}`), so component-local variables are not reported as undefined.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import stylelint from 'stylelint';

const ROOT = resolve(fileURLToPath(import.meta.url), '../../..');
const STYLES = join(ROOT, 'projects/athene-webcomponents/src/lib/styles');
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const positional = args.filter(
  (a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--json'))
);
const APP = resolve(positional[0] ?? join(ROOT, '../athene-web/src'));

const tokens = JSON.parse(
  readFileSync(join(STYLES, 'tokens.custom-properties.json'), 'utf8')
).customProperties;
const inventory = JSON.parse(readFileSync(join(STYLES, 'tokens.inventory.json'), 'utf8')).tokens;
const deprecated = new Set(inventory.filter((t) => t.deprecated).map((t) => t.name));

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (e === 'node_modules' || e.startsWith('.')) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (['.scss', '.css', '.ts', '.html'].includes(extname(p)) && !p.endsWith('.spec.ts'))
      out.push(p);
  }
  return out;
}

const lineAt = (text, index) => text.slice(0, index).split('\n').length;

/** Inline component styles: styles: `…` or styles: [`…`, `…`]. */
function inlineStyles(src) {
  const out = [];
  const re = /styles\s*:\s*\[?\s*`/g;
  let m;
  while ((m = re.exec(src))) {
    let i = m.index + m[0].length;
    for (;;) {
      const start = i;
      const end = src.indexOf('`', start);
      if (end < 0) break;
      out.push({ start, end, code: src.slice(start, end) });
      const rest = src.slice(end + 1).match(/^\s*,\s*`/);
      if (!rest) break;
      i = end + 1 + rest[0].length;
    }
  }
  return out;
}

const files = walk(APP);
const sources = files.map((f) => ({
  file: f,
  rel: relative(APP, f),
  text: readFileSync(f, 'utf8'),
}));

// --- 1. what the app declares itself
const declared = new Map(); // name → first place
const declare = (name, where) => declared.has(name) || declared.set(name, where);
for (const s of sources) {
  const ext = extname(s.file);
  const styleParts =
    ext === '.ts' ? inlineStyles(s.text).map((p) => ({ ...p, offset: p.start })) : [];
  const styleTexts = ext === '.scss' || ext === '.css' ? [{ code: s.text, offset: 0 }] : styleParts;
  for (const p of styleTexts) {
    for (const m of p.code.matchAll(/(?<![\w-])(--[A-Za-z0-9_-]+)\s*:/g))
      declare(m[1], `${s.rel}:${lineAt(s.text, p.offset + m.index)}`);
  }
  if (ext === '.ts' || ext === '.html') {
    for (const m of s.text.matchAll(/\[style\.(--[A-Za-z0-9_-]+)/g))
      declare(m[1], `${s.rel}:${lineAt(s.text, m.index)}`);
    for (const m of s.text.matchAll(/setProperty\(\s*['"`](--[A-Za-z0-9_-]+)/g))
      declare(m[1], `${s.rel}:${lineAt(s.text, m.index)}`);
    for (const m of s.text.matchAll(/['"](--[A-Za-z0-9_-]+)['"]\s*:/g))
      declare(m[1], `${s.rel}:${lineAt(s.text, m.index)}`);
    for (const m of s.text.matchAll(/style="[^"]*?(--[A-Za-z0-9_-]+)\s*:/g))
      declare(m[1], `${s.rel}:${lineAt(s.text, m.index)}`);
  }
}
const isKnown = (name) => name in tokens || declared.has(name);

// --- 2. Stylelint: the lib's rule, over SCSS + inline styles
const importFile = join(tmpdir(), `athene-app-declared-${process.pid}.json`);
writeFileSync(
  importFile,
  JSON.stringify({
    customProperties: Object.fromEntries([...declared.keys()].map((n) => [n, 'app'])),
  })
);
const config = {
  customSyntax: 'postcss-scss',
  plugins: [
    'stylelint-value-no-unknown-custom-properties',
    join(ROOT, 'scripts/stylelint/athene-tokens.mjs'),
  ],
  rules: {
    'csstools/value-no-unknown-custom-properties': [
      true,
      { importFrom: [join(STYLES, 'tokens.custom-properties.json'), importFile] },
    ],
    // csstools lets var(--unknown, x) pass; the lib's strict rule does not.
    'athene/no-unknown-custom-property-with-fallback': [
      true,
      { importFrom: [join(STYLES, 'tokens.custom-properties.json'), importFile] },
    ],
  },
};
const undefinedUses = [];
const lintOne = async (code, codeFilename, rel, baseLine) => {
  const r = await stylelint.lint({ code, codeFilename, config, configBasedir: ROOT });
  for (const res of r.results) {
    for (const w of res.warnings) {
      const name =
        w.text.match(/"(--[^"]+)"/)?.[1] ?? w.text.match(/^(--[A-Za-z0-9_-]+) is not a token/)?.[1];
      if (!name || /#\{|\$\{/.test(name)) continue; // interpolated names (--avatar-#{$i}-bg) are dynamic
      undefinedUses.push({ name, where: `${rel}:${baseLine + w.line - 1}`, via: w.rule });
    }
  }
};
for (const s of sources) {
  const ext = extname(s.file);
  if (ext === '.scss' || ext === '.css') await lintOne(s.text, s.file, s.rel, 1);
  else if (ext === '.ts')
    for (const p of inlineStyles(s.text))
      await lintOne(
        p.code,
        s.file.replace(/\.ts$/, '.inline.scss'),
        s.rel,
        lineAt(s.text, p.start)
      );
}

// --- 3. regex pass for var() in templates and TS code outside inline styles
const allVarUses = []; // for deprecated + fallback stats
for (const s of sources) {
  const ext = extname(s.file);
  const inStyle = ext === '.ts' ? inlineStyles(s.text) : [];
  for (const m of s.text.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)([^)]*)\)?/g)) {
    const name = m[1];
    const next = s.text[m.index + m[0].indexOf(name) + name.length];
    if (next === '#' || next === '$') continue; // interpolated
    const where = `${s.rel}:${lineAt(s.text, m.index)}`;
    const fallback = m[2].match(/^\s*,\s*(.+)$/)?.[1]?.trim();
    allVarUses.push({ name, where, fallback });
    const styleCode =
      ext === '.scss' ||
      ext === '.css' ||
      inStyle.some((p) => m.index >= p.start && m.index < p.end);
    if (!styleCode && !isKnown(name)) undefinedUses.push({ name, where, via: 'template/ts' });
  }
}

// --- 4. dead theme selectors (light = no attribute; DS-15)
const themeSelectors = [];
for (const s of sources) {
  for (const m of s.text.matchAll(
    /(\[data-theme=['"]?light['"]?\]|\.ath-(?:light|dark)\b|:host-context\(\[data-theme=['"]?dark['"]?\]\)|(?:^|\n)\s*\[data-theme=['"]?dark['"]?\]\s+[.:#\w])/g
  )) {
    if (!['.scss', '.css', '.ts'].includes(extname(s.file))) continue;
    themeSelectors.push({
      selector: m[1].trim(),
      where: `${s.rel}:${lineAt(s.text, m.index + (m[0].startsWith('\n') ? 1 : 0))}`,
    });
  }
}

// --- 5. fallbacks that disagree with the token (DS-13)
const norm = (v) => v.replace(/\s+/g, ' ').trim().toLowerCase();
const mismatched = allVarUses.filter(
  (u) =>
    u.fallback &&
    u.name in tokens &&
    !/var\(/.test(u.fallback) &&
    norm(u.fallback) !== norm(tokens[u.name]) &&
    !/^var\(/.test(tokens[u.name])
);

// --- report
const byName = (list) =>
  list.reduce((m, u) => m.set(u.name, [...(m.get(u.name) ?? []), u.where]), new Map());
const undef = byName(undefinedUses);
const depUses = allVarUses.filter((u) => deprecated.has(u.name));
const depCounts = [...byName(depUses)].map(([n, w]) => [n, w.length]).sort((a, b) => b[1] - a[1]);

const out = [];
out.push(`Token report for ${APP}`);
out.push(
  `  ${sources.length} files · ${Object.keys(tokens).length} lib tokens · ${declared.size} custom properties declared by the app itself`
);
out.push('');
out.push(
  `UNDEFINED custom properties (not a lib token, not declared by the app): ${undef.size} names, ${undefinedUses.length} uses`
);
for (const [n, w] of [...undef].sort())
  out.push(`  ${n}  ×${w.length}  ${[...new Set(w)].join(', ')}`);
out.push('');
out.push(`FALLBACKS that disagree with the token value: ${mismatched.length}`);
for (const u of mismatched)
  out.push(`  var(${u.name}, ${u.fallback})  token = ${tokens[u.name]}  ${u.where}`);
out.push('');
out.push(
  `THEME SELECTORS in app styles (light has no attribute; ancestor theme selectors in emulated styles never match): ${themeSelectors.length}`
);
for (const t of themeSelectors) out.push(`  ${t.selector}  ${t.where}`);
out.push('');
out.push(
  `DEPRECATED aliases in use (removal = step 2.7): ${depUses.length} uses of ${depCounts.length} names`
);
out.push(
  '  ' +
    depCounts
      .slice(0, 15)
      .map(([n, c]) => `${n} ×${c}`)
      .join(' · ') +
    (depCounts.length > 15 ? ' · …' : '')
);
const text = out.join('\n');
console.log(text);

const jsonOut = opt('--json');
if (jsonOut) {
  writeFileSync(
    jsonOut,
    JSON.stringify(
      {
        app: APP,
        undefined: Object.fromEntries(undef),
        fallbackMismatches: mismatched,
        themeSelectors,
        deprecated: Object.fromEntries(depCounts),
      },
      null,
      2
    ) + '\n'
  );
}
if (flag('--strict') && undef.size) process.exit(1);
