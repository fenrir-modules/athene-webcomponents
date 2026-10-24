import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

/**
 * Column presets of `ath-panel-grid`; any other string is used as
 * `grid-template-columns` as given.
 */
export type PanelGridColumns = '1' | '2' | '3' | '4' | 'main-side' | 'side-main' | (string & {});

/**
 * - `fill` (default): rows share the height. In a fill page each row gets
 *   an equal part and the panels scroll inside; in a scroll page rows are
 *   as tall as their content and stretch to the bottom when it is short.
 * - `auto`: natural row heights, no stretching.
 * - any other string: `grid-template-rows` as given (e.g. `auto minmax(0, 1fr)`).
 */
export type PanelGridRows = 'fill' | 'auto' | (string & {});

const PRESETS: Record<string, string> = {
  '1': 'minmax(0, 1fr)',
  '2': 'repeat(2, minmax(0, 1fr))',
  '3': 'repeat(3, minmax(0, 1fr))',
  '4': 'repeat(4, minmax(0, 1fr))',
  'main-side': 'minmax(0, 1fr) minmax(280px, 360px)',
  'side-main': 'minmax(220px, 280px) minmax(0, 1fr)',
};

/** The `grid-template-columns` for a preset or a custom template. */
export function panelGridColumns(columns: PanelGridColumns): string {
  return PRESETS[columns] ?? columns;
}

/**
 * Panels in rows that share their height: every panel in a row is as tall
 * as the row (no height mismatch between neighbours), the rows fill the
 * page body, and a panel's body scrolls inside it when the row is shorter.
 * Narrower than 720px (its own width, a container query) the grid stacks
 * into one column with natural heights, and the page scrolls.
 *
 * Panels span columns or rows with `ath-panel [colSpan]` / `[rowSpan]`.
 *
 * @example
 * <ath-panel-grid columns="main-side">
 *   <ath-panel title="Active tickets">…</ath-panel>
 *   <ath-panel title="Due this week">…</ath-panel>
 * </ath-panel-grid>
 * <ath-panel-grid columns="2" rows="auto minmax(0, 1fr)">…</ath-panel-grid>
 */
@Component({
  selector: 'ath-panel-grid',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Global (element-scoped) styles: the rules place projected panels.
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.data-rows]': 'rowsMode()',
  },
  template: `
    <div
      class="ath-panel-grid__track"
      [style.--ath-panel-grid-cols]="templateColumns()"
      [style.grid-template-rows]="templateRows()"
    >
      <ng-content />
    </div>
  `,
  styleUrl: './panel-grid.component.scss',
})
export class AthPanelGridComponent {
  readonly columns = input<PanelGridColumns>('2');
  readonly rows = input<PanelGridRows>('fill');

  protected readonly templateColumns = computed(() => panelGridColumns(this.columns()));
  protected readonly rowsMode = computed(() => {
    const rows = this.rows();
    return rows === 'fill' || rows === 'auto' ? rows : 'custom';
  });
  protected readonly templateRows = computed(() =>
    this.rowsMode() === 'custom' ? this.rows() : null
  );
}
