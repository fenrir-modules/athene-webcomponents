#!/usr/bin/env node
// Packaging hygiene for git installs of @athene/webcomponents.
//
// The app installs this package from a git commit, and that commit carries
// the built dist/. npm (pacote) runs a full `npm install` with every
// devDependency (Storybook, ng-packagr, …) in the clone whenever package.json
// has one of the scripts below, so the package must have none of them. In
// return the committed dist/ must be exactly what the sources build to.
//
//   node scripts/check-package.mjs           no install-time scripts
//   node scripts/check-package.mjs --dist    … and dist/ equals the last build
//                                            (`npm run check:dist` builds first)
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Scripts that make pacote prepare a git dependency (npm/pacote lib/git.js). */
const GIT_PREPARE_SCRIPTS = ['preinstall', 'install', 'postinstall', 'build', 'prepack', 'prepare'];

const problems = [];

const { scripts = {} } = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
for (const name of GIT_PREPARE_SCRIPTS.filter((s) => s in scripts)) {
  problems.push(
    `package.json has a "${name}" script: a git install would run \`npm install\` with all devDependencies in the consumer. Use another name (build:lib).`
  );
}

if (process.argv.includes('--dist')) {
  const git = (...args) => spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' });
  const status = git('status', '--porcelain', '--untracked-files=all', '--', 'dist');
  if (status.status !== 0) {
    console.error(`check-package: git status failed: ${status.stderr.trim()}`);
    process.exit(2);
  }
  const changed = status.stdout.split('\n').filter(Boolean);
  if (changed.length) {
    problems.push(
      `dist/ differs from the build in ${changed.length} file(s); run \`npm run build:lib\` and commit dist/ with the source change:\n` +
        changed
          .slice(0, 20)
          .map((l) => `    ${l}`)
          .join('\n') +
        (changed.length > 20 ? `\n    … and ${changed.length - 20} more` : '')
    );
  }
}

if (problems.length) {
  for (const p of problems) console.error(`check-package: ${p}`);
  process.exit(1);
}
console.log(
  `check-package: no install-time scripts${process.argv.includes('--dist') ? ', dist/ matches the build' : ''}`
);
