#!/usr/bin/env node
// Makes the committed dist/ independent of build order (quality package W4-A).
//
// ng-packagr builds the secondary entry points (core, icons) in parallel and
// lists their nested package.json files in dist's .npmignore in the order
// they finish, so two builds of the same source differed and
// `npm run check:dist` failed at random. The lines are sorted here, after
// every build (`npm run build:lib`).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = resolve(ROOT, 'dist/athene-webcomponents/.npmignore');

if (existsSync(file)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  const comments = lines.filter((line) => line.startsWith('#'));
  const entries = lines.filter((line) => line && !line.startsWith('#')).sort();
  writeFileSync(file, [...comments, ...entries].join('\n'));
}
