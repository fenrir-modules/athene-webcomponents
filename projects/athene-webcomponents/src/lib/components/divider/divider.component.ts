import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Athene Divider Component
 *
 * Visual separator for content sections.
 *
 * @example
 * <ath-divider />
 * <ath-divider spacing="lg" />
 * <ath-divider orientation="vertical" />
 */
@Component({
  selector: 'ath-divider',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
})
export class AthDividerComponent {
  /** Orientation */
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** Spacing around the divider */
  @Input() spacing: 'none' | 'sm' | 'md' | 'lg' = 'md';

  get dividerClasses(): string {
    return [
      'ath-divider',
      `ath-divider--${this.orientation}`,
      `ath-divider--spacing-${this.spacing}`,
    ].join(' ');
  }
}
