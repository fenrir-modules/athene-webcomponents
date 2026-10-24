import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AthKpiStripComponent, AthKpiTileComponent, type KpiDeltaDirection } from '../kpi-tile';

/**
 * A single label/value card.
 *
 * @deprecated One KPI API: use `ath-kpi-tile` inside `ath-kpi-strip`. This
 * renders exactly that (a strip of one tile) and maps the old inputs:
 * `subValue` → `note`, `sparkData` → `spark`, `trend` → a "↑"/"↓" delta.
 * Removed in quality step 2.7.
 *
 * @example
 * <ath-stat-card label="Open" value="42" delta="+5" deltaDirection="up" />
 */
@Component({
  selector: 'ath-stat-card',
  standalone: true,
  imports: [AthKpiStripComponent, AthKpiTileComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ath-kpi-strip [columns]="1">
      <ath-kpi-tile
        [label]="label()"
        [value]="value()"
        [delta]="shownDelta()"
        [deltaDirection]="shownDirection()"
        [note]="subValue() || null"
        [spark]="sparkData()"
        [sparkColor]="sparkColor()"
      />
    </ath-kpi-strip>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class AthStatCardComponent {
  readonly label = input.required<string>();
  readonly value = input<string | number>('');
  readonly subValue = input('');
  readonly trend = input<'up' | 'down' | null>(null);
  readonly delta = input<string | null>(null);
  readonly deltaDirection = input<KpiDeltaDirection | null>(null);
  readonly sparkData = input<readonly number[] | null>(null);
  readonly sparkColor = input<string | null>(null);

  protected readonly shownDelta = computed(() => {
    const delta = this.delta();
    if (delta != null) return delta;
    const trend = this.trend();
    return trend ? (trend === 'up' ? '↑' : '↓') : null;
  });

  protected readonly shownDirection = computed<KpiDeltaDirection | null>(
    () => this.deltaDirection() ?? this.trend() ?? null
  );
}
