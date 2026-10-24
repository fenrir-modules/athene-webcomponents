import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AthSkeletonComponent } from '../skeleton';

/** Heading level of a panel's title. */
export type PanelLevel = 2 | 3;
/** How a panel clips what overflows it. */
export type PanelOverflow = 'hidden' | 'clip';

/**
 * A panel: surface, hairline border, `--panel-radius`, and an optional
 * head row (`--panel-head-h`) with title, projected head content, a count
 * and actions. The body takes the panel's height and scrolls inside it
 * when the panel is stretched by `ath-panel-grid` or a fill page.
 *
 * Slots: `[athPanelHead]` (after the title), `[athPanelActions]` (right),
 * default (body), `[athPanelFoot]` (under the body). The head row is drawn
 * only when it has something in it.
 *
 * @example
 * <ath-panel title="Active tickets" [count]="'5 open'">
 *   <ath-button athPanelActions variant="ghost" size="xs">Filter</ath-button>
 *   …rows…
 * </ath-panel>
 * <ath-panel title="Activity" [loading]="loading()" [padded]="true">…</ath-panel>
 * <ath-panel [scroll]="false" overflow="clip">…a sticky toolbar…</ath-panel>
 */
@Component({
  selector: 'ath-panel',
  imports: [AthSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-col-span]': 'colSpan() > 1 ? colSpan() : null',
    '[attr.data-row-span]': 'rowSpan() > 1 ? rowSpan() : null',
    '[attr.aria-busy]': 'loading() || null',
    '[attr.data-overflow]': "overflow() === 'clip' ? 'clip' : null",
  },
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class AthPanelComponent {
  readonly title = input<string | null | undefined>(null);
  /** Heading level of the title (2 under a page's h1). */
  readonly level = input<PanelLevel>(2);
  /** Quiet count at the head's right ("5 open", 12). */
  readonly count = input<string | number | null | undefined>(null);
  /** Pad the body with `--panel-pad-y` / `--panel-pad-x` (off for tables and lists). */
  readonly padded = input(false);
  /** Let the body scroll when the panel is shorter than its content. */
  readonly scroll = input(true);
  /**
   * How the panel cuts its content at the rounded frame. `hidden` (default)
   * makes the panel a scroll container; `clip` cuts the same way without
   * one, so `position: sticky` inside (an editor toolbar, an outline) sticks
   * to the page's scroller instead. Use `clip` with `[scroll]="false"`.
   */
  readonly overflow = input<PanelOverflow>('hidden');
  /** Rows placeholder instead of the content. */
  readonly loading = input(false);
  readonly skeletonRows = input(5);
  /** Columns / rows this panel spans in an `ath-panel-grid` (1–4). */
  readonly colSpan = input(1);
  readonly rowSpan = input(1);

  protected readonly rows = computed(() =>
    Array.from({ length: Math.max(1, Math.floor(this.skeletonRows())) }, (_, i) => i)
  );
}
