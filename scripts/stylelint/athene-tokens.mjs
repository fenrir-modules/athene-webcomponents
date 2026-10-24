// Local Stylelint rules for the token pipeline.
//
// csstools/value-no-unknown-custom-properties accepts `var(--unknown, x)` as
// soon as a fallback exists — exactly how --r-md / --scrim / --bg hid (DS-14).
// These two rules close that gap:
//
//   athene/no-unknown-custom-property-with-fallback
//     var(--x, …) where --x is neither a token nor declared in the file.
//   athene/no-fallback-on-token
//     var(--token, …) on a generated token: tokens are always defined, so a
//     fallback is dead code that drifts (var(--z-popover, 1200) vs 1060, DS-13).
//
// Options for both: { importFrom: ['…/tokens.custom-properties.json', …] }
import { readFileSync } from 'node:fs';
import stylelint from 'stylelint';

const { createPlugin, utils } = stylelint;

const cache = new Map();
function loadNames(files = []) {
  const key = files.join('|');
  if (!cache.has(key)) {
    const names = new Set();
    for (const f of files) {
      const json = JSON.parse(readFileSync(f, 'utf8'));
      for (const n of Object.keys(json.customProperties ?? json['custom-properties'] ?? {}))
        names.add(n);
    }
    cache.set(key, names);
  }
  return cache.get(key);
}

/** var() calls with a fallback: [{ name, fallback, index }] — handles nesting. */
export function varsWithFallback(value) {
  const out = [];
  const re = /var\(\s*(--[A-Za-z0-9_-]+)\s*(,)?/g;
  let m;
  while ((m = re.exec(value))) {
    if (!m[2]) continue;
    let depth = 1;
    let i = m.index + m[0].length;
    const start = i;
    for (; i < value.length && depth; i++) {
      if (value[i] === '(') depth++;
      else if (value[i] === ')') depth--;
    }
    out.push({ name: m[1], fallback: value.slice(start, i - 1).trim(), index: m.index });
  }
  return out;
}

function makeRule(ruleName, check) {
  const messages = utils.ruleMessages(ruleName, { rejected: (msg) => msg });
  const rule =
    (primary, options = {}) =>
    (root, result) => {
      if (!utils.validateOptions(result, ruleName, { actual: primary })) return;
      if (!primary) return;
      const tokens = loadNames(options.importFrom);
      const local = new Set();
      root.walkDecls((d) => d.prop.startsWith('--') && local.add(d.prop));
      root.walkDecls((decl) => {
        for (const v of varsWithFallback(decl.value)) {
          if (/[#$]\{?$/.test(v.name)) continue;
          const msg = check(v, { tokens, local });
          if (msg) {
            utils.report({
              ruleName,
              result,
              node: decl,
              message: messages.rejected(msg),
              word: v.name,
            });
          }
        }
      });
    };
  rule.ruleName = ruleName;
  rule.messages = messages;
  return createPlugin(ruleName, rule);
}

export default [
  makeRule('athene/no-unknown-custom-property-with-fallback', (v, { tokens, local }) =>
    tokens.has(v.name) || local.has(v.name)
      ? null
      : `${v.name} is not a token — the fallback "${v.fallback}" hides it (DS-14)`
  ),
  makeRule('athene/no-fallback-on-token', (v, { tokens, local }) =>
    tokens.has(v.name) && !local.has(v.name)
      ? `${v.name} is a token and always defined — drop the fallback "${v.fallback}"`
      : null
  ),
];
