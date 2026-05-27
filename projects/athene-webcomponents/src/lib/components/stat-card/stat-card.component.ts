import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthSparklineComponent } from '../sparkline';

/**
 * Stat card with label + value, optional trend arrow, optional delta badge,
 * optional sparkline.
 *
 * For dashboard-style KPI tiles prefer `<ath-kpi-tile>`. This stays as the
 * simpler label/value/sub primitive.
 *
 * @example
 * <ath-stat-card label="Total Users" value="1,234" />
 * <ath-stat-card label="Active" value="89%" trend="up" />
 * <ath-stat-card label="Open" value="42" delta="+5" deltaDirection="up"
 *                [sparkData]="[10,12,15,18,22,28,30]" />
 */
@Component({
  selector: 'ath-stat-card',
  standalone: true,
  imports: [CommonModule, AthSparklineComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class AthStatCardComponent {
  @Input({ required: true }) label = '';
  @Input({ required: true }) value: string | number = '';
  @Input() subValue = '';

  /** Quick up/down arrow. Use delta+deltaDirection for richer badges. */
  @Input() trend: 'up' | 'down' | null = null;

  /** Delta text (e.g., `+12`, `-3`). Displayed as colored badge. */
  @Input() delta: string | null = null;

  /** Color cue for the delta badge. */
  @Input() deltaDirection: 'up' | 'down' | 'neutral' | null = null;

  /** Optional sparkline data — min 2 points. */
  @Input() sparkData: number[] | null = null;
  @Input() sparkColor = 'var(--accent)';
}
