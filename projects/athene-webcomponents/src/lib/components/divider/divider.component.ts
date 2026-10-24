import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

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
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
})
export class AthDividerComponent {
  /** Orientation */
  readonly orientation = input<DividerOrientation>('horizontal');

  /** Spacing around the divider */
  readonly spacing = input<DividerSpacing>('md');

  protected readonly dividerClasses = computed(() =>
    [
      'ath-divider',
      `ath-divider--${this.orientation()}`,
      `ath-divider--spacing-${this.spacing()}`,
    ].join(' ')
  );
}
