import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test, type Page } from '@playwright/test';

/**
 * One test per story of the built catalogue (storybook-static/index.json):
 *
 * - **axe**: the story is loaded once per theme; `@storybook/addon-a11y` runs
 *   axe in the story's `afterEach` with the story's `parameters.a11y` (the
 *   same run the Accessibility panel shows). Every violation fails the test
 *   unless `a11y-baseline.json` lists it (story × theme × rule, node count);
 *   a baseline entry that no longer occurs fails too, so the file only
 *   shrinks (`npm run test:storybook:a11y-baseline` rewrites it).
 *   `a11y.test: 'todo'` turns a story's violations into warnings, `'off'`
 *   skips it.
 * - **visual**: light and dark × 375/768/1280 px, `toHaveScreenshot` against
 *   the baselines in `__screenshots__/<platform>/<story-id>/`.
 * - a render error, a play-function exception or an uncaught page error
 *   fails the test.
 *
 * Opt-outs per story: `tags: ['!visual']` (no screenshots),
 * `parameters.visual: { mode: 'viewport' }` (whole viewport instead of the
 * content box, e.g. pages and modal dialogs), `parameters.visual.viewports`.
 * `SB_A11Y=off` / `SB_VISUAL=off` switch a whole part off (CI runs them on
 * different runners).
 */

interface IndexEntry {
  id: string;
  title: string;
  name: string;
  type: 'story' | 'docs';
  tags?: string[];
}

interface A11yViolation {
  id: string;
  impact: string | null;
  help: string;
  /** Number of failing nodes. */
  nodes: number;
  targets: string[];
  /** axe's explanation for the first node, e.g. the measured contrast ratio and colours. */
  detail: string;
}

interface StoryOutcome {
  status: 'success' | 'error';
  error?: string;
  a11y?: { status: 'passed' | 'warning' | 'failed'; violations: A11yViolation[]; error?: string };
  layout?: string;
  visual?: { mode?: 'content' | 'viewport'; viewports?: number[] };
}

const STATIC_DIR = resolve(__dirname, '../../storybook-static');
const THEMES = ['light', 'dark'] as const;
const VIEWPORTS = [375, 768, 1280] as const;
const HEIGHT = 800;
const RUN_A11Y = process.env['SB_A11Y'] !== 'off';
const RUN_VISUAL = process.env['SB_VISUAL'] !== 'off';
/** `update`: record the current violations instead of comparing (see global-teardown.ts). */
const BASELINE_MODE = process.env['SB_A11Y_BASELINE'] === 'update' ? 'update' : 'check';
const BASELINE_FRAGMENTS = resolve(__dirname, '../../test-results/storybook-a11y');

/** storyId → theme → rule → failing node count. */
type Baseline = Record<string, Partial<Record<string, Record<string, number>>>>;
const baseline = (
  JSON.parse(readFileSync(resolve(__dirname, 'a11y-baseline.json'), 'utf8')) as {
    violations: Baseline;
  }
).violations;

const index = JSON.parse(readFileSync(resolve(STATIC_DIR, 'index.json'), 'utf8')) as {
  entries: Record<string, IndexEntry>;
};
const stories = Object.values(index.entries).filter((e) => e.type === 'story');

/** Collects the preview's verdict for the story on the page (set before any script runs). */
function hookPreview(): void {
  type Payload = Record<string, unknown>;
  type Channel = { on(event: string, cb: (p: Payload) => void): void };
  const w = window as unknown as {
    __STORYBOOK_ADDONS_CHANNEL__?: Channel;
    __STORYBOOK_PREVIEW__?: { currentRender?: { story?: { parameters?: Payload } } };
    __sbOutcome?: unknown;
  };
  const params = () => w.__STORYBOOK_PREVIEW__?.currentRender?.story?.parameters ?? {};
  const fail = (error: string) => {
    w.__sbOutcome ??= { status: 'error', error };
  };
  const attach = () => {
    const channel = w.__STORYBOOK_ADDONS_CHANNEL__;
    if (!channel) {
      setTimeout(attach, 5);
      return;
    }
    channel.on('storyFinished', (p) => {
      const reports = (p['reporters'] as Payload[] | undefined) ?? [];
      const a11y = reports.find((r) => r['type'] === 'a11y');
      const result = (a11y?.['result'] ?? {}) as {
        violations?: {
          id: string;
          impact: string | null;
          help: string;
          nodes: { target: unknown[]; failureSummary?: string }[];
        }[];
        error?: { message?: string };
      };
      const parameters = params();
      w.__sbOutcome ??= {
        status: p['status'],
        layout: parameters['layout'],
        visual: parameters['visual'],
        a11y: a11y && {
          status: a11y['status'],
          error: result.error ? String(result.error.message ?? result.error) : undefined,
          violations: (result.violations ?? []).map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            nodes: v.nodes.length,
            targets: v.nodes.slice(0, 6).map((n) => n.target.map(String).join(' ')),
            detail: (v.nodes[0]?.failureSummary ?? '').replace(/\s+/g, ' ').slice(0, 240),
          })),
        },
      };
    });
    channel.on('storyErrored', (p) => fail(`${String(p['title'])}: ${String(p['description'])}`));
    channel.on('storyThrewException', (p) => fail(String(p['message'])));
    channel.on('playFunctionThrewException', (p) => fail(`play: ${String(p['message'])}`));
    channel.on('storyMissing', () => fail('story missing'));
  };
  attach();
}

async function loadStory(page: Page, id: string, theme: string): Promise<StoryOutcome> {
  await page.goto(
    `/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=theme:${theme}`
  );
  const handle = await page.waitForFunction(
    () => (window as unknown as { __sbOutcome?: unknown }).__sbOutcome,
    null,
    { timeout: 20_000 }
  );
  const outcome = (await handle.jsonValue()) as StoryOutcome;
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  return outcome;
}

async function settle(page: Page): Promise<void> {
  await page.evaluate(
    () =>
      new Promise<void>((done) => requestAnimationFrame(() => requestAnimationFrame(() => done())))
  );
}

/** The content box (story root plus open popovers), full width; null = whole viewport. */
async function contentClip(page: Page) {
  return page.evaluate(() => {
    if (document.querySelector('dialog:modal')) return null;
    const root = document.getElementById('storybook-root');
    if (!root) return null;
    const rects = [root, ...document.querySelectorAll(':popover-open, dialog[open]')].map((el) =>
      el.getBoundingClientRect()
    );
    const top = Math.max(0, Math.floor(Math.min(...rects.map((r) => r.top)) + scrollY - 8));
    const bottom = Math.min(
      document.documentElement.scrollHeight,
      Math.ceil(Math.max(...rects.map((r) => r.bottom)) + scrollY + 8)
    );
    return { x: 0, y: top, width: window.innerWidth, height: Math.max(1, bottom - top) };
  });
}

/** Where focus is and where open panels sit: overlays move focus and position after a frame or a timer. */
async function overlayState(page: Page): Promise<string> {
  return page.evaluate(() => {
    const a = document.activeElement;
    const focus = a ? `${a.tagName}.${a.className}#${a.id}` : '';
    const panels = [...document.querySelectorAll(':popover-open, dialog[open]')].map((el) => {
      const r = el.getBoundingClientRect();
      return `${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.width)},${Math.round(r.height)}`;
    });
    return `${focus}|${panels.join(';')}`;
  });
}

/**
 * Waits until the page stops moving after a load or resize (container
 * queries, ResizeObserver-driven floating panels, wrapping headers, focus
 * moved into an overlay): content box, focus and panel positions must be
 * the same on three consecutive checks, 20 ms apart.
 */
async function stableClip(page: Page, wholeViewport: boolean) {
  // With a popover open, where focus lands after a synthetic open (play
  // function) is not reliable across runs: compare the panel, not the ring.
  await page.evaluate(() => {
    if (document.querySelector(':popover-open'))
      (document.activeElement as HTMLElement | null)?.blur();
  });
  let last = '';
  let same = 0;
  for (let i = 0; i < 40 && same < 2; i++) {
    await settle(page);
    await page.waitForTimeout(20);
    const clip = wholeViewport ? null : await contentClip(page);
    const key = JSON.stringify(clip) + (await overlayState(page));
    same = key === last ? same + 1 : 0;
    last = key;
  }
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  return wholeViewport ? null : await contentClip(page);
}

function describe(v: A11yViolation): string {
  return `${v.id} [${v.impact ?? '-'}] ${v.nodes}× ${v.help} → ${v.targets.join(' | ')} (${v.detail})`;
}

/** New violations (more nodes than the baseline allows) and baseline entries that went away. */
function compareToBaseline(id: string, theme: string, violations: A11yViolation[]) {
  const allowed = baseline[id]?.[theme] ?? {};
  const fresh = violations.filter((v) => v.nodes > (allowed[v.id] ?? 0)).map(describe);
  const stale = Object.entries(allowed)
    .filter(([rule, count]) => (violations.find((v) => v.id === rule)?.nodes ?? 0) < count)
    .map(
      ([rule, count]) =>
        `${rule}: baseline ${count}, now ${violations.find((v) => v.id === rule)?.nodes ?? 0}`
    );
  return { fresh, stale };
}

for (const story of stories) {
  test(`${story.title} › ${story.name}`, { tag: `@${story.id}` }, async ({ context }, info) => {
    const pageErrors: string[] = [];
    await context.addInitScript(hookPreview);
    const visual = RUN_VISUAL && (story.tags ?? []).includes('visual');
    const recorded: Record<string, Record<string, number>> = {};

    for (const theme of THEMES) {
      // A fresh page per theme: after a same-page navigation, focus moved by
      // an overlay's open timer was not reliably applied in headless Chromium.
      const page = await context.newPage();
      page.on('pageerror', (err) => pageErrors.push(err.message));
      await page.setViewportSize({ width: 1280, height: HEIGHT });
      const outcome = await loadStory(page, story.id, theme);

      expect(outcome.error, `${theme}: story failed to render`).toBeUndefined();
      if (RUN_A11Y && outcome.a11y) {
        const { violations } = outcome.a11y;
        expect.soft(outcome.a11y.error, `${theme}: axe run failed`).toBeUndefined();
        if (outcome.a11y.status === 'warning') {
          if (violations.length)
            info.annotations.push({
              type: 'a11y todo',
              description: `${theme}: ${violations.map(describe).join('; ')}`,
            });
        } else if (BASELINE_MODE === 'update') {
          if (violations.length)
            recorded[theme] = Object.fromEntries(violations.map((v) => [v.id, v.nodes]));
        } else {
          const { fresh, stale } = compareToBaseline(story.id, theme, violations);
          expect.soft(fresh, `${theme}: axe violations (not in a11y-baseline.json)`).toEqual([]);
          expect
            .soft(
              stale,
              `${theme}: fixed, remove from a11y-baseline.json (npm run test:storybook:a11y-baseline)`
            )
            .toEqual([]);
        }
      }
      if (outcome.status === 'error' && outcome.a11y?.status !== 'failed') {
        expect.soft(outcome.status, `${theme}: story reported an error`).toBe('success');
      }

      const viewports = visual ? (outcome.visual?.viewports ?? VIEWPORTS) : [];
      const wholeViewport = outcome.visual?.mode === 'viewport' || outcome.layout === 'fullscreen';
      for (const width of viewports) {
        await page.setViewportSize({ width, height: HEIGHT });
        const clip = await stableClip(page, wholeViewport);
        await expect
          .soft(page, `${theme} ${width}px`)
          .toHaveScreenshot(
            [story.id, `${theme}-${width}.png`],
            clip ? { clip, fullPage: true } : {}
          );
      }
      await page.close();
    }
    if (BASELINE_MODE === 'update' && RUN_A11Y) {
      mkdirSync(BASELINE_FRAGMENTS, { recursive: true });
      writeFileSync(resolve(BASELINE_FRAGMENTS, `${story.id}.json`), JSON.stringify(recorded));
    }
    expect(pageErrors, 'uncaught errors in the page').toEqual([]);
  });
}

test('no baseline folder without a story', () => {
  test.skip(!RUN_VISUAL, 'visual checks off');
  const dir = resolve(__dirname, '__screenshots__', process.platform);
  const visualIds = new Set(
    stories.filter((s) => (s.tags ?? []).includes('visual')).map((s) => s.id)
  );
  let folders: string[] = [];
  try {
    folders = readdirSync(dir);
  } catch {
    // no baselines yet for this platform
  }
  expect(
    folders.filter((f) => !visualIds.has(f)),
    `delete these from ${dir}`
  ).toEqual([]);
});
