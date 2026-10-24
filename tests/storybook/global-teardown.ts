import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * `SB_A11Y_BASELINE=update`: merges the per-story results the tests wrote
 * into a11y-baseline.json (sorted, stories without violations dropped).
 * Every baselined rule needs an entry in `reasons`; the update fails
 * otherwise, so nothing is frozen without a written reason.
 */
export default function globalTeardown(): void {
  if (process.env['SB_A11Y_BASELINE'] !== 'update') return;
  const dir = resolve(__dirname, '../../test-results/storybook-a11y');
  const file = resolve(__dirname, 'a11y-baseline.json');
  const current = JSON.parse(readFileSync(file, 'utf8')) as { reasons: Record<string, string> };
  if (!existsSync(dir)) return;

  const violations: Record<string, Record<string, Record<string, number>>> = {};
  for (const name of readdirSync(dir).sort()) {
    const entry = JSON.parse(readFileSync(resolve(dir, name), 'utf8')) as Record<
      string,
      Record<string, number>
    >;
    if (Object.keys(entry).length) violations[name.replace(/\.json$/, '')] = entry;
  }
  const rules = new Set(
    Object.values(violations).flatMap((t) => Object.values(t).flatMap((r) => Object.keys(r)))
  );
  const missing = [...rules].filter((r) => !current.reasons[r]);
  const reasons = Object.fromEntries(
    Object.entries(current.reasons).filter(([rule]) => rules.has(rule))
  );
  writeFileSync(file, `${JSON.stringify({ reasons, violations }, null, 2)}\n`);
  rmSync(dir, { recursive: true, force: true });
  if (missing.length) {
    throw new Error(`a11y-baseline.json: add a reason for ${missing.join(', ')} under "reasons"`);
  }
}
