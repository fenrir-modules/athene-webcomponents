import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthKpiStripComponent, AthKpiTileComponent } from '../kpi-tile';
import { AthPageHeaderComponent } from '../page-header';
import { type PageMode, AthPageComponent } from './page.component';
import { AthPanelComponent } from './panel.component';
import { AthPanelGridComponent, panelGridColumns } from './panel-grid.component';

/**
 * Page-frame harness: the app shell's contract (a full-height column with
 * a topbar and an `.ath-stage` scroll container padded by the content
 * tokens), then pages shaped like the ones measured in
 * `artifacts/phase5/c/fill/numbers.json` (same panel and row counts).
 *
 * Measured like numbers.json:
 *  - dead: space between the lowest panel and the bottom of the stage,
 *    with the stage scrolled to its end (acceptance: ≤ 16)
 *  - mismatch: the largest height difference between panels that share a
 *    row (acceptance: 0)
 *  - scrolls: whether the stage scrolls
 */
interface PanelSpec {
  lines: number;
  span?: number;
}
interface Scenario {
  page: string;
  mode: PageMode;
  kpi?: boolean;
  columns: string;
  panels: PanelSpec[];
  before: { panels: number; rows: number; dead: number; mismatch: number };
}

const SCENARIOS: Scenario[] = [
  // numbers.json "before" values at 1440 (or 1110 where only that exists).
  {
    page: '/app',
    mode: 'scroll',
    kpi: true,
    columns: '2',
    panels: [{ lines: 4 }, { lines: 7 }, { lines: 5, span: 2 }],
    before: { panels: 4, rows: 3, dead: 94, mismatch: 0 },
  },
  {
    page: '/app/my-work',
    mode: 'scroll',
    kpi: true,
    columns: '1',
    panels: [{ lines: 5 }],
    before: { panels: 2, rows: 2, dead: 439, mismatch: 0 },
  },
  {
    page: '/app/work/projects',
    mode: 'scroll',
    columns: 'main-side',
    panels: [{ lines: 3 }, { lines: 6 }],
    before: { panels: 2, rows: 1, dead: 418, mismatch: 0 },
  },
  {
    page: '/app/docs',
    mode: 'fill',
    columns: 'side-main',
    panels: [{ lines: 8 }, { lines: 40 }],
    before: { panels: 2, rows: 2, dead: 488, mismatch: 0 },
  },
  {
    page: '/app/settings/profile',
    mode: 'scroll',
    columns: '2',
    panels: [{ lines: 6 }, { lines: 2 }, { lines: 3, span: 2 }],
    before: { panels: 3, rows: 2, dead: 173, mismatch: 264 },
  },
  {
    page: '/app/work/projects/:id',
    mode: 'scroll',
    columns: '2',
    panels: [{ lines: 3 }, { lines: 9 }, { lines: 4 }, { lines: 4 }, { lines: 12 }, { lines: 2 }],
    before: { panels: 6, rows: 5, dead: 0, mismatch: 312 },
  },
  {
    page: '/app/settings/workspace/members',
    mode: 'scroll',
    columns: '1',
    panels: [{ lines: 2 }, { lines: 6 }, { lines: 3 }],
    before: { panels: 3, rows: 3, dead: 33, mismatch: 0 },
  },
  {
    page: '/app/settings/workspace/teams',
    mode: 'scroll',
    columns: '1',
    panels: [{ lines: 3 }, { lines: 4 }],
    before: { panels: 2, rows: 2, dead: 33, mismatch: 0 },
  },
  {
    page: '/app/inbox (fill)',
    mode: 'fill',
    columns: 'side-main',
    panels: [{ lines: 10 }, { lines: 60 }],
    before: { panels: 2, rows: 1, dead: -1, mismatch: -1 },
  },
];

const VIEWPORTS = [
  { w: 1440, h: 900 },
  { w: 1110, h: 760 },
];

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AthPageComponent,
    AthPanelComponent,
    AthPanelGridComponent,
    AthPageHeaderComponent,
    AthKpiStripComponent,
    AthKpiTileComponent,
  ],
  template: `
    @if (scenario(); as s) {
      <div
        class="shell"
        [style.width.px]="width()"
        [style.height.px]="height()"
        style="display: flex; flex-direction: column; overflow: hidden"
      >
        <div style="flex: none; height: 48px">topbar</div>
        <main class="ath-stage" [style.padding]="padding()" style="flex: 1; min-height: 0">
          <div class="route-host">
            <ath-page [mode]="s.mode">
              <ath-page-header [title]="s.page" [subItems]="['meta']" />
              @if (s.kpi) {
                <ath-kpi-strip>
                  <ath-kpi-tile label="A" [value]="1" />
                  <ath-kpi-tile label="B" [value]="2" />
                  <ath-kpi-tile label="C" [value]="3" />
                  <ath-kpi-tile label="D" [value]="4" />
                </ath-kpi-strip>
              }
              <ath-panel-grid [columns]="s.columns">
                @for (p of s.panels; track $index) {
                  <ath-panel title="Panel" [count]="p.lines" [colSpan]="p.span ?? 1">
                    @for (l of lines(p.lines); track l) {
                      <div style="height: 36px; border-bottom: 1px solid var(--border)">row</div>
                    }
                  </ath-panel>
                }
              </ath-panel-grid>
            </ath-page>
          </div>
        </main>
      </div>
    }
  `,
})
class ShellHarnessComponent {
  readonly scenario = signal<Scenario | null>(null);
  readonly width = signal(1440);
  readonly height = signal(900);
  readonly padding = signal(
    'var(--content-pad-top) var(--content-pad-x) var(--content-pad-bottom)'
  );
  lines(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}

interface Measure {
  panels: number;
  rows: number;
  dead: number;
  mismatch: number;
  scrolls: boolean;
}

function measure(root: HTMLElement): Measure {
  const stage = root.querySelector<HTMLElement>('.ath-stage')!;
  stage.scrollTop = stage.scrollHeight;
  const boxes = Array.from(root.querySelectorAll<HTMLElement>('ath-panel, ath-kpi-strip')).map(
    (p) => p.getBoundingClientRect()
  );
  const rows = new Map<number, number[]>();
  for (const b of boxes) {
    const top = Math.round(b.top);
    rows.set(top, [...(rows.get(top) ?? []), b.height]);
  }
  let mismatch = 0;
  for (const heights of rows.values()) {
    mismatch = Math.max(mismatch, Math.round(Math.max(...heights) - Math.min(...heights)));
  }
  const lowest = Math.max(...boxes.map((b) => b.bottom));
  return {
    panels: boxes.length,
    rows: rows.size,
    dead: Math.round(stage.getBoundingClientRect().bottom - lowest),
    mismatch,
    scrolls: stage.scrollHeight > stage.clientHeight + 1,
  };
}

describe('Page frame (ath-page + ath-panel-grid + ath-panel)', () => {
  let fixture: ComponentFixture<ShellHarnessComponent>;
  const root = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({ imports: [ShellHarnessComponent] }).createComponent(
      ShellHarnessComponent
    );
    document.body.style.margin = '0';
  });

  function show(s: Scenario, w: number, h: number): Measure {
    fixture.componentInstance.scenario.set(s);
    fixture.componentInstance.width.set(w);
    fixture.componentInstance.height.set(h);
    fixture.detectChanges();
    return measure(root());
  }

  for (const vp of VIEWPORTS) {
    for (const s of SCENARIOS) {
      it(`${s.page} @${vp.w}×${vp.h} (${s.mode}): dead ≤ 16, mismatch 0`, () => {
        const m = show(s, vp.w, vp.h);
        console.log(
          `PAGE-FRAME ${JSON.stringify({ page: s.page, viewport: `${vp.w}x${vp.h}`, mode: s.mode, before: s.before, after: m })}`
        );
        expect(m.panels).toBe(s.panels.length + (s.kpi ? 1 : 0));
        expect(m.mismatch).toBe(0);
        expect(m.dead).toBeLessThanOrEqual(16);
        expect(m.dead).toBeGreaterThanOrEqual(0);
        if (s.mode === 'fill')
          expect(m.scrolls).withContext('fill pages never scroll the stage').toBeFalse();
      });
    }
  }

  it('fill: the stage keeps still and the long panel scrolls inside', () => {
    const inbox = SCENARIOS.find((s) => s.page.startsWith('/app/inbox'))!;
    const m = show(inbox, 1440, 900);
    expect(m.scrolls).toBeFalse();
    const bodies = root().querySelectorAll<HTMLElement>('.ath-panel__body');
    const feed = bodies[1];
    expect(feed.scrollHeight).toBeGreaterThan(feed.clientHeight);
    // Both panels share the full row.
    const [a, b] = Array.from(root().querySelectorAll('ath-panel')).map((p) =>
      p.getBoundingClientRect()
    );
    expect(a.height).toBe(b.height);
  });

  it('scroll: long content grows the page and the stage scrolls, rows still share height', () => {
    const long: Scenario = {
      ...SCENARIOS[5],
      panels: SCENARIOS[5].panels.map((p) => ({ lines: p.lines * 3 })),
    };
    const m = show(long, 1110, 760);
    expect(m.scrolls).toBeTrue();
    expect(m.mismatch).toBe(0);
    for (const body of Array.from(root().querySelectorAll<HTMLElement>('.ath-panel__body'))) {
      expect(body.scrollHeight).toBeLessThanOrEqual(body.clientHeight + 1);
    }
  });

  it('phone: the grid stacks into one column with natural heights, fill falls back to scroll', () => {
    fixture.componentInstance.padding.set('16px');
    const inbox = SCENARIOS.find((s) => s.page.startsWith('/app/inbox'))!;
    // A 390px wide shell inside a desktop test browser: the container query
    // (grid narrower than 720px) stacks the panels.
    const m = show(inbox, 390, 844);
    const panels = Array.from(root().querySelectorAll<HTMLElement>('ath-panel')).map((p) =>
      p.getBoundingClientRect()
    );
    expect(panels[0].left).toBe(panels[1].left);
    expect(panels[1].top).toBeGreaterThan(panels[0].bottom);
    expect(m.mismatch).toBe(0);
  });

  it('leaves a route host without ath-page in plain block flow', () => {
    const stage = document.createElement('main');
    stage.className = 'ath-stage';
    const host = document.createElement('div');
    stage.appendChild(host);
    document.body.appendChild(stage);
    expect(getComputedStyle(host).display).toBe('block');
    expect(getComputedStyle(host).flexGrow).toBe('0');
    stage.remove();
  });

  it('resolves column presets', () => {
    expect(panelGridColumns('3')).toBe('repeat(3, minmax(0, 1fr))');
    expect(panelGridColumns('main-side')).toBe('minmax(0, 1fr) minmax(280px, 360px)');
    expect(panelGridColumns('200px 1fr')).toBe('200px 1fr');
  });
});
