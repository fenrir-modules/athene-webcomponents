#!/usr/bin/env node
// i18n check for @athenos/webcomponents (quality step 1.3). Part of `npm run lint`.
//
// The lib ships no translation files: the few words it puts on screen are
// `AthLabels` in core/src/labels.ts, with English defaults the app overrides
// through ATH_LABELS (athenos-web: core/i18n/ath-labels.provider.ts, whose keys
// the app's own i18n check verifies). This check fails when
//   - an AthLabels member has no default, or a default has no AthLabels member
//   - a default is empty
// and reports (warning only, input for step 1.8a) template attributes with
// hard-coded text that bypass ATH_LABELS: aria-label / title / placeholder / alt.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LABELS = join(ROOT, 'projects/athenos-webcomponents/core/src/labels.ts');
const COMPONENTS = join(ROOT, 'projects/athenos-webcomponents/src/lib/components');

const src = readFileSync(LABELS, 'utf8');
const block = (re) => src.match(re)?.[1] ?? '';
const iface = [
  ...block(/interface AthLabels\s*\{([\s\S]*?)\n\}/).matchAll(/^\s*(\w+)\??\s*:/gm),
].map((m) => m[1]);
const defaultsSrc = block(/ATH_DEFAULT_LABELS\s*:\s*AthLabels\s*=\s*\{([\s\S]*?)\n\};/);
const defaults = new Map(
  [...defaultsSrc.matchAll(/^\s*(\w+)\s*:\s*\(\)\s*=>\s*(['"`])(.*?)\2/gm)].map((m) => [m[1], m[3]])
);

const errors = [];
if (!iface.length) errors.push(`could not read interface AthLabels from ${relative(ROOT, LABELS)}`);
for (const k of iface)
  if (!defaults.has(k))
    errors.push(`AthLabels.${k} has no (literal) default in ATH_DEFAULT_LABELS`);
for (const k of defaults.keys())
  if (!iface.includes(k)) errors.push(`ATH_DEFAULT_LABELS.${k} is not an AthLabels member`);
for (const [k, v] of defaults) if (!v.trim()) errors.push(`ATH_DEFAULT_LABELS.${k} is empty`);

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
};
const literals = [];
for (const file of walk(COMPONENTS)) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(
    /(?<![\w.[-])(aria-label|title|placeholder|alt)="([^"{}]*[A-Za-z][^"{}]*)"/g
  )) {
    literals.push(
      `${relative(ROOT, file)}:${text.slice(0, m.index).split('\n').length} ${m[1]}="${m[2]}"`
    );
  }
}

console.log(`i18n check: ${iface.length} AthLabels, ${defaults.size} defaults`);
for (const e of errors) console.log(`  ERROR ${e}`);
console.log(
  `  warning: ${literals.length} hard-coded text attribute(s) in lib templates (bypass ATH_LABELS, step 1.8a)`
);
for (const l of literals) console.log(`    ${l}`);
if (errors.length) {
  console.error('i18n check failed.');
  process.exit(1);
}
