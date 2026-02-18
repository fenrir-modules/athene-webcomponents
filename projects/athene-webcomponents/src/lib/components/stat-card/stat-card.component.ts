import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Athene Stat Card Component
 *
 * Display metrics and statistics with label and value.
 *
 * @example
 * <ath-stat-card label="Total Users" value="1,234" />
 * <ath-stat-card label="Active" value="89%" trend="up" />
 */
@Component({
  selector: 'ath-stat-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class AthStatCardComponent {
  /** Stat label */
  @Input({ required: true }) label = '';

  /** Stat value */
  @Input({ required: true }) value: string | number = '';

  /** Optional sub-value or additional info */
  @Input() subValue = '';

  /** Trend direction */
  @Input() trend: 'up' | 'down' | null = null;
}
