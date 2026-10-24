#!/usr/bin/env node
// Parity proof: compile the lib's main.scss at a git ref (default: the last
// hand-written token commit) and in the working tree, extract every custom
// property per selector, and diff. Every difference must be listed in
// parity-expected.json (the deliberate fixes) — anything else fails.
//
//   node scripts/tokens/parity.mjs [--ref <git-ref>] [--json <out.json>]
//
// Needs `sass` and `postcss` (both come with @angular-devkit/build-angular).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = resolve(fileURLToPath(import.meta.url), '../../..');
const require = createRequire(join(ROOT, 'package.json'));
const sass = require('sass');
const postcss = require('postcss');
const STYLES = 'projects/athene-webcomponents/src/lib/styles';

const arg = (name, dflt) => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : dflt;
};
const REF = arg('--ref', 'b128fc7');
const JSON_OUT = arg('--json');

export function compileAtRef(ref) {
  const dir = mkdtempSync(join(tmpdir(), 'ath-tokens-'));
  try {
    const files = execFileSync('git', ['ls-tree', '--name-only', `${ref}:${STYLES}`], {
      cwd: ROOT,
      encoding: 'utf8',
    })
      .split('\n')
      .filter((f) => f.endsWith('.scss'));
    mkdirSync(dir, { recursive: true });
    for (const f of files) {
      writeFileSync(
        join(dir, f),
        execFileSync('git', ['show', `${ref}:${STYLES}/${f}`], { cwd: ROOT, encoding: 'utf8' })
      );
    }
    return sass.compile(join(dir, 'main.scss'), { style: 'expanded' }).css;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

export const compileWorkingTree = () =>
  sass.compile(join(ROOT, STYLES, 'main.scss'), { style: 'expanded' }).css;

/** { selector → { --prop → value } } plus a multiset of all other rules. */
export function extract(css) {
  const vars = {};
  const rules = [];
  postcss.parse(css).walkRules((rule) => {
    const atParent =
      rule.parent?.type === 'atrule' ? `@${rule.parent.name} ${rule.parent.params} ` : '';
    // Normalise selector lists so ":root, [x]" compares per selector.
    const selectors = rule.selectors.map((s) => atParent + s.replace(/\s+/g, ' ').trim());
    const other = [];
    rule.each((node) => {
      if (node.type !== 'decl') return;
      if (node.prop.startsWith('--')) {
        for (const sel of selectors) (vars[sel] ??= {})[node.prop] = node.value.trim();
      } else other.push(`${node.prop}: ${node.value}${node.important ? ' !important' : ''}`);
    });
    if (other.length) for (const sel of selectors) rules.push(`${sel} { ${other.join('; ')} }`);
  });
  return { vars, rules: rules.sort() };
}

export function diff(before, after) {
  const changes = [];
  const sels = new Set([...Object.keys(before.vars), ...Object.keys(after.vars)]);
  for (const sel of [...sels].sort()) {
    const a = before.vars[sel] ?? {};
    const b = after.vars[sel] ?? {};
    for (const p of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (a[p] === b[p]) continue;
      changes.push({ selector: sel, prop: p, before: a[p] ?? null, after: b[p] ?? null });
    }
  }
  const ra = new Map();
  for (const r of before.rules) ra.set(r, (ra.get(r) ?? 0) + 1);
  for (const r of after.rules) ra.set(r, (ra.get(r) ?? 0) - 1);
  const ruleChanges = [...ra]
    .filter(([, n]) => n !== 0)
    .map(([rule, n]) => ({ rule, change: n > 0 ? 'removed' : 'added' }));
  return { changes, ruleChanges };
}

function main() {
  const before = extract(compileAtRef(REF));
  const after = extract(compileWorkingTree());
  const expected = JSON.parse(
    readFileSync(join(ROOT, 'scripts/tokens/parity-expected.json'), 'utf8')
  );
  // A selector alias (e.g. "[data-theme=light]" added next to ":root") must
  // carry exactly the declarations of its target; it is then folded away.
  for (const [alias, target] of Object.entries(expected.selectorAliases ?? {})) {
    const same =
      JSON.stringify(after.vars[alias] ?? null) === JSON.stringify(after.vars[target] ?? null);
    const ar = after.rules
      .filter((r) => r.startsWith(alias + ' {'))
      .map((r) => r.slice(alias.length));
    const tr = after.rules
      .filter((r) => r.startsWith(target + ' {'))
      .map((r) => r.slice(target.length));
    if (!same || JSON.stringify(ar) !== JSON.stringify(tr)) {
      console.error(`parity: FAILED — ${alias} does not mirror ${target}`);
      process.exit(1);
    }
    console.log(
      `  alias ${alias} mirrors ${target}: ${Object.keys(after.vars[alias] ?? {}).length} declarations, identical`
    );
    delete after.vars[alias];
    after.rules = after.rules.filter((r) => !r.startsWith(alias + ' {'));
  }
  const { changes, ruleChanges } = diff(before, after);
  const key = (c) => `${c.selector} ${c.prop} ${c.before} → ${c.after}`;
  const expectedKeys = new Map(expected.changes.map((c) => [key(c), c]));
  const unexpected = changes.filter((c) => !expectedKeys.has(key(c)));
  const missing = expected.changes.filter((c) => !changes.some((x) => key(x) === key(c)));
  const expectedRules = new Set((expected.ruleChanges ?? []).map((r) => `${r.change} ${r.rule}`));
  const unexpectedRules = ruleChanges.filter((r) => !expectedRules.has(`${r.change} ${r.rule}`));

  const count = (x) => Object.values(x.vars).reduce((n, v) => n + Object.keys(v).length, 0);
  console.log(`parity: ${REF} → working tree`);
  console.log(
    `  before: ${Object.keys(before.vars).length} selectors, ${count(before)} custom-property declarations`
  );
  console.log(
    `  after:  ${Object.keys(after.vars).length} selectors, ${count(after)} custom-property declarations`
  );
  console.log(
    `  differences: ${changes.length} (all expected: ${unexpected.length === 0 && missing.length === 0})`
  );
  for (const c of changes) {
    const why = expectedKeys.get(key(c))?.why;
    console.log(
      `   ${expectedKeys.has(key(c)) ? '✓' : '✗'} ${c.selector}  ${c.prop}: ${c.before ?? '∅'} → ${c.after ?? '∅'}${why ? '  — ' + why : ''}`
    );
  }
  console.log(
    `  other rules: ${before.rules.length} before, ${after.rules.length} after, ${ruleChanges.length} differences`
  );
  for (const r of ruleChanges)
    console.log(`   ${unexpectedRules.includes(r) ? '✗' : '✓'} ${r.change}: ${r.rule}`);
  for (const m of missing) console.log(`   ✗ expected but not found: ${key(m)}`);
  if (JSON_OUT)
    writeFileSync(
      JSON_OUT,
      JSON.stringify(
        { ref: REF, changes, ruleChanges, unexpected, missing, unexpectedRules },
        null,
        2
      ) + '\n'
    );
  if (unexpected.length || missing.length || unexpectedRules.length) {
    console.error('parity: FAILED — undeclared differences');
    process.exit(1);
  }
  console.log('parity: OK');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
