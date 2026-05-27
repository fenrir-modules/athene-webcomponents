import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthSparklineComponent } from '../sparkline';

export type KpiDeltaDirection = 'up' | 'down' | 'neutral';

/**
 * Compact KPI widget for dashboards. Shows label + value + optional delta + sparkline.
 *
 * @example
 * <ath-kpi-tile label="Assigned" [value]="3" delta="+1" deltaDirection="up"
 *               [sparkData]="[12,14,13,18,22,20,24]" sparkColor="var(--accent)" />
 */
@Component({
  selector: 'ath-kpi-tile',
  standalone: true,
  imports: [CommonModule, AthSparklineComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kpi-tile.component.html',
  styleUrl: './kpi-tile.component.scss',
})
export class AthKpiTileComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: number | string;

  /** Free-form delta text (e.g., `+12`, `-2`, ` 0`). */
  @Input() delta: string | null = null;

  /** Influences color of the delta badge. */
  @Input() deltaDirection: KpiDeltaDirection | null = null;

  /** Optional sparkline data — at least 2 points. */
  @Input() sparkData: number[] | null = null;

  /** Sparkline color (any CSS color). */
  @Input() sparkColor = 'var(--accent)';

  /** Hides the value's color emphasis (useful for empty/loading state). */
  @Input() muted = false;

  @HostBinding('attr.data-muted') get hostMuted(): string | null {
    return this.muted ? 'true' : null;
  }
}
