#!/usr/bin/env node
// Knip with a baseline (quality step 1.3, FE-14). Shared between
// athene-webcomponents (canonical) and athene-web (copy, `npm run lint:shared`).
//
// Runs knip (config: knip.json) and compares every finding — unused file,
// export, type, enum member, dependency, unlisted/unresolved import — with
// config/knip.baseline.json. New findings fail; findings that are gone must
// be removed from the baseline (stale entries fail too, so it only shrinks).
//
//   npm run lint:knip                       check
//   npm run lint:knip -- --prune            drop gone entries from the baseline (never adds)
//   npm run lint:knip -- --update-baseline  rewrite the baseline to the current state (deliberate growth only)
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = join(ROOT, 'config/knip.baseline.json');
const update = process.argv.includes('--update-baseline');

const run = spawnSync(
  process.execPath,
  [join(ROOT, 'node_modules/knip/bin/knip.js'), '--reporter', 'json', '--no-exit-code'],
  {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  }
);
if (run.status !== 0) {
  process.stderr.write(run.stderr || run.stdout);
  process.exit(run.status ?? 2);
}
const { issues } = JSON.parse(run.stdout);

const TYPES = [
  'files',
  'dependencies',
  'devDependencies',
  'optionalPeerDependencies',
  'unlisted',
  'unresolved',
  'binaries',
  'exports',
  'types',
  'enumMembers',
  'namespaceMembers',
  'duplicates',
];
const current = Object.fromEntries(TYPES.map((t) => [t, []]));
for (const issue of issues) {
  for (const t of TYPES) {
    for (const item of issue[t] ?? []) {
      const name = Array.isArray(item) ? item.map((i) => i.name).join('|') : item.name;
      current[t].push(
        t === 'files'
          ? issue.file
          : `${issue.file}: ${item.parentSymbol ? `${item.parentSymbol}.` : ''}${name}`
      );
    }
  }
}
for (const t of TYPES) current[t] = [...new Set(current[t])].sort();

if (update) {
  const out = {
    $comment:
      'Frozen knip findings (scripts/knip-check.mjs). Only shrinks: fix, then `npm run lint:knip -- --prune`.',
  };
  for (const t of TYPES) if (current[t].length) out[t] = current[t];
  writeFileSync(BASELINE, JSON.stringify(out, null, 2) + '\n');
}
const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : {};
if (process.argv.includes('--prune')) {
  for (const t of TYPES)
    if (baseline[t]) baseline[t] = baseline[t].filter((x) => current[t].includes(x));
  writeFileSync(BASELINE, JSON.stringify(baseline, null, 2) + '\n');
}

let failed = false;
const lines = [];
for (const t of TYPES) {
  const known = new Set(baseline[t] ?? []);
  const fresh = current[t].filter((x) => !known.has(x));
  const stale = [...known].filter((x) => !current[t].includes(x));
  if (!current[t].length && !known.size) continue;
  lines.push(
    `  ${t.padEnd(24)} ${String(current[t].length).padStart(4)}  (baseline ${known.size}, new ${fresh.length}, fixed ${stale.length})`
  );
  for (const x of fresh) lines.push(`    NEW ${x}`);
  for (const x of stale) lines.push(`    gone, remove from baseline (--prune): ${x}`);
  if (fresh.length || stale.length) failed = true;
}
console.log(
  `knip${update ? ' (baseline written)' : process.argv.includes('--prune') ? ' (baseline pruned)' : ''}:`
);
console.log(lines.join('\n') || '  no findings');
if (failed && !update) {
  console.error('knip check failed.');
  process.exit(1);
}
