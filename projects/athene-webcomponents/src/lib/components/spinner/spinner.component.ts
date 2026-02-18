import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Spinner size variants
 */
export type SpinnerSize = 'sm' | 'md' | 'lg';

/**
 * Athene Spinner Component
 *
 * Loading indicator for async operations.
 *
 * @example
 * <ath-spinner />
 * <ath-spinner size="lg" />
 */
@Component({
  selector: 'ath-spinner',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class AthSpinnerComponent {
  /** Spinner size */
  @Input() size: SpinnerSize = 'md';

  get spinnerClasses(): string {
    return `ath-spinner ath-spinner--${this.size}`;
  }
}
