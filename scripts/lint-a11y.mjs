import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const root = new URL('../projects/athene-webcomponents/src/lib/components/', import.meta.url);
const templateFiles = collectFiles(root.pathname).filter((file) => extname(file) === '.html');
const violations = [];

for (const file of templateFiles) {
  const content = readFileSync(file, 'utf8');

  const clickableDivWithoutRole = /<div[^>]*\(click\)=["'][^"']+["'][^>]*>/g;
  for (const match of content.match(clickableDivWithoutRole) ?? []) {
    if (!/\brole=/.test(match) || !/\btabindex=/.test(match)) {
      violations.push(`${file}: clickable <div> must define role + tabindex`);
    }
  }

  const buttonMatches = content.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g);
  for (const match of buttonMatches) {
    const attrs = match[1] ?? '';
    const inner = match[2] ?? '';
    const fullButton = match[0] ?? '';

    const hasIcon = /<lucide-icon\b[\s\S]*?\/?>/i.test(inner);
    if (!hasIcon) {
      continue;
    }

    if (/<ng-content\b/i.test(inner)) {
      continue;
    }

    const plainContent = inner
      .replace(/<lucide-icon\b[\s\S]*?\/?>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/@\w+\s*\([^)]*\)\s*\{/g, '')
      .replace(/[{}]/g, '')
      .trim();

    if (plainContent.length > 0) {
      continue;
    }

    if (!hasAccessibleName(attrs) && !hasAccessibleName(fullButton)) {
      violations.push(`${file}: icon-only button must define aria-label/aria-labelledby`);
    }
  }

  const menuButton = /<button[^>]*class="[^"]*ath-dropdown__item[^"]*"[^>]*>/g;
  for (const match of content.match(menuButton) ?? []) {
    if (!/\brole=/.test(match)) {
      violations.push(`${file}: dropdown menu button must define role`);
    }
  }
}

if (violations.length > 0) {
  console.error('Accessibility lint violations:');
  for (const line of violations) {
    console.error(`- ${line}`);
  }
  process.exit(1);
}

console.log(`a11y lint passed (${templateFiles.length} templates checked)`);

function hasAccessibleName(value) {
  return /\baria-label=/.test(value)
    || /\baria-labelledby=/.test(value)
    || /\[attr\.aria-label\]=/.test(value)
    || /\[attr\.aria-labelledby\]=/.test(value)
    || /\[aria-label\]=/.test(value)
    || /\[aria-labelledby\]=/.test(value);
}

function collectFiles(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const abs = join(dir, entry);
    const stat = statSync(abs);
    if (stat.isDirectory()) {
      files.push(...collectFiles(abs));
    } else {
      files.push(abs);
    }
  }
  return files;
}
