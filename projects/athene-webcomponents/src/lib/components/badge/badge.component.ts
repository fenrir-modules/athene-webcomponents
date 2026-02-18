import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Badge variant types
 */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'muted';

/**
 * Athene Badge Component
 *
 * Status badges for tables, lists and inline indicators.
 *
 * @example
 * <ath-badge variant="success">Active</ath-badge>
 * <ath-badge variant="error">Revoked</ath-badge>
 */
@Component({
  selector: 'ath-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class AthBadgeComponent {
  /** Badge variant */
  @Input() variant: BadgeVariant = 'default';

  /** Show dot indicator */
  @Input() dot = false;

  get badgeClasses(): string {
    return [
      'ath-badge',
      `ath-badge--${this.variant}`,
      this.dot ? 'ath-badge--dot' : '',
    ].filter(Boolean).join(' ');
  }
}
