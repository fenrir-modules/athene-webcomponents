#!/usr/bin/env node
// Generate the token outputs from the DTCG sources.
//
//   node scripts/tokens/build.mjs           write _tokens.scss + JSON outputs
//   node scripts/tokens/build.mjs --check   fail if an output is stale or a
//                                           contrast rule is violated (CI/lint)
//
// Zero dependencies on purpose — see README "Design tokens".
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadConfig,
  buildBlocks,
  renderScss,
  renderCustomProperties,
  renderInventory,
  checkContrast,
  TokenError,
} from './lib.mjs';

const ROOT = resolve(fileURLToPath(import.meta.url), '../../..');
const CONFIG = resolve(ROOT, 'projects/athenos-webcomponents/tokens/tokens.config.json');

export function generate(configPath = CONFIG) {
  const { config, dir, loadJson } = loadConfig(configPath);
  const built = buildBlocks(config, loadJson);
  const sourceLabel = relative(ROOT, dir) + '/*.json';
  const files = {
    [resolve(dir, config.outputs.scss)]: renderScss(built, { sourceLabel }),
    [resolve(dir, config.outputs.customProperties)]: renderCustomProperties(built),
    [resolve(dir, config.outputs.inventory)]: renderInventory(built),
  };
  const contrast = checkContrast(config, built.blocks);
  return { files, contrast, built };
}

function main() {
  const check = process.argv.includes('--check');
  let result;
  try {
    result = generate();
  } catch (e) {
    if (e instanceof TokenError) {
      console.error(`tokens: ${e.message}`);
      process.exit(1);
    }
    throw e;
  }
  const failures = result.contrast.filter((r) => !r.ok);
  for (const f of failures) {
    console.error(
      `tokens: contrast ${f.ratio.toFixed(2)}:1 < ${f.min}:1 — --${f.fg} on --${f.bg}${f.over ? ` over --${f.over}` : ''} (theme=${f.theme}, accent=${f.accent ?? 'default'})${f.why ? ' — ' + f.why : ''}`
    );
  }
  let stale = 0;
  for (const [file, content] of Object.entries(result.files)) {
    const current = existsSync(file) ? readFileSync(file, 'utf8') : null;
    if (current === content) continue;
    if (check) {
      console.error(
        `tokens: ${relative(ROOT, file)} is out of date — run \`npm run tokens:build\``
      );
      stale++;
    } else {
      writeFileSync(file, content);
      console.log(`tokens: wrote ${relative(ROOT, file)}`);
    }
  }
  if (failures.length || stale) process.exit(1);
  const n = result.built.baseTokens.length;
  console.log(
    `tokens: ${n} tokens, ${result.built.blocks.length} blocks, ${result.contrast.length} contrast checks ok${check ? ', outputs up to date' : ''}`
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
