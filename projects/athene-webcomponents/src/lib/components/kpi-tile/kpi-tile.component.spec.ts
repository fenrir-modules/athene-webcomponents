import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AthKpiStripComponent, AthKpiTileComponent, hasKpiTrend } from './kpi-tile.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthKpiStripComponent, AthKpiTileComponent],
  template: `
    <div style="width: 1000px">
      <ath-kpi-strip>
        <ath-kpi-tile
          label="Due today"
          [value]="1"
          [alert]="true"
          delta="+1"
          deltaDirection="down"
          deltaTitle="1 overdue"
        />
        <ath-kpi-tile label="This week" [value]="3" tone="green" [spark]="[1, 2, 2, 3]" />
        <ath-kpi-tile label="In progress" value="–" [muted]="true" [spark]="[1, 2]" />
        <ath-kpi-tile
          label="Story points"
          [value]="24"
          note="3 done"
          noteTitle="3 of 24 done"
          link="/app/tickets"
          [linkParams]="{ status: 'done' }"
          linkLabel="Show done tickets"
        />
      </ath-kpi-strip>
    </div>
    <ath-kpi-strip class="status" [columns]="3">
      <ath-kpi-tile label="In progress" [value]="4" valueTone="amber" dot="rgb(1, 2, 3)" />
      <ath-kpi-tile label="Overdue" [value]="2" valueTone="green" [alert]="true" />
      <ath-kpi-tile label="Progress" value="62%"><span class="bar">bar</span></ath-kpi-tile>
    </ath-kpi-strip>
  `,
})
class HostComponent {}

describe('AthKpiTileComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const tiles = () =>
    Array.from(
      (fixture.nativeElement as HTMLElement)
        .querySelector('ath-kpi-strip')!
        .querySelectorAll<HTMLElement>('ath-kpi-tile')
    );

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideRouter([])],
    }).createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('draws a trend only for two or more samples that are not all zero', () => {
    expect(hasKpiTrend(null)).toBe(false);
    expect(hasKpiTrend([3])).toBe(false);
    expect(hasKpiTrend([0, 0, 0])).toBe(false);
    expect(hasKpiTrend([0, 1])).toBe(true);
  });

  it('sets the alert figure in red and explains the delta', () => {
    const [due] = tiles();
    expect(due.querySelector('.ath-kpi__value--alert')).not.toBeNull();
    const delta = due.querySelector<HTMLElement>('.ath-kpi__delta')!;
    expect(delta.dataset['direction']).toBe('down');
    expect(delta.getAttribute('aria-label')).toBe('1 overdue');
  });

  it('tints the trend by tone; a muted tile keeps the empty slot', () => {
    const [, week, progress] = tiles();
    expect(
      week.querySelector('ath-sparkline path.ath-sparkline__line')!.getAttribute('stroke')
    ).toBe('var(--green)');
    expect(progress.querySelector('ath-sparkline')).toBeNull();
    expect(progress.querySelector('.ath-kpi__spark-slot')!.getBoundingClientRect().width).toBe(70);
  });

  it('makes the whole linked tile the hit area', () => {
    const linked = tiles()[3];
    const a = linked.querySelector<HTMLAnchorElement>('a.ath-kpi__link')!;
    expect(a.getAttribute('href')).toBe('/app/tickets?status=done');
    expect(a.getAttribute('aria-label')).toBe('Show done tickets');
    expect(linked.querySelector('.ath-kpi__note')!.textContent).toBe('3 done');
    expect(getComputedStyle(a, '::after').position).toBe('absolute');
  });

  it('draws one card with hairlines between equal tiles', () => {
    const widths = tiles().map((t) => Math.round(t.getBoundingClientRect().width));
    expect(new Set(widths).size).toBe(1);
    expect(getComputedStyle(tiles()[0]).borderLeftWidth).toBe('0px');
    expect(getComputedStyle(tiles()[1]).borderLeftWidth).toBe('1px');
  });

  describe('status tiles', () => {
    const statusTiles = () =>
      Array.from(
        (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
          'ath-kpi-strip.status ath-kpi-tile'
        )
      );

    it('colours the figure from the --*-text tokens and draws the label dot', () => {
      const [prog] = statusTiles();
      const value = prog.querySelector<HTMLElement>('.ath-kpi__value')!;
      expect(value.dataset['tone']).toBe('amber');
      const probe = document.createElement('span');
      probe.style.color = 'var(--amber-text)';
      prog.appendChild(probe);
      expect(getComputedStyle(value).color).toBe(getComputedStyle(probe).color);
      probe.remove();
      const dot = prog.querySelector<HTMLElement>('.ath-kpi__label .ath-kpi__dot')!;
      expect(getComputedStyle(dot).backgroundColor).toBe('rgb(1, 2, 3)');
      expect(dot.getAttribute('aria-hidden')).toBe('true');
      expect(prog.querySelector('.ath-kpi__label')!.textContent.trim()).toBe('In progress');
    });

    it('lets alert win over a value tone', () => {
      const [, overdue] = statusTiles();
      const value = overdue.querySelector<HTMLElement>('.ath-kpi__value')!;
      expect(value.dataset['tone']).toBeUndefined();
      expect(value.classList).toContain('ath-kpi__value--alert');
    });

    it('projects content under the figure and drops the empty slot', () => {
      const [prog, , progress] = statusTiles();
      const extra = progress.querySelector<HTMLElement>('.ath-kpi__extra')!;
      expect(extra.querySelector('.bar')!.textContent).toBe('bar');
      expect(extra.getBoundingClientRect().top).toBeGreaterThanOrEqual(
        progress.querySelector('.ath-kpi__value')!.getBoundingClientRect().bottom
      );
      expect(getComputedStyle(prog.querySelector('.ath-kpi__extra')!).display).toBe('none');
    });
  });
});
