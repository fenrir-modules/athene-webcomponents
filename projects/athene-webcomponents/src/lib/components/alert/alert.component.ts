import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Alert variant types
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Athene Alert Component
 *
 * Display feedback messages.
 *
 * @example
 * <ath-alert variant="error" message="Something went wrong" />
 * <ath-alert variant="success" message="Saved successfully" [dismissible]="true" />
 */
@Component({
  selector: 'ath-alert',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AthAlertComponent {
  /** Alert variant */
  @Input() variant: AlertVariant = 'info';

  /** Alert message */
  @Input({ required: true }) message = '';

  /** Show dismiss button */
  @Input() dismissible = false;

  /** Dismiss event */
  @Output() dismissed = new EventEmitter<void>();

  get alertClasses(): string {
    return ['ath-alert', `ath-alert--${this.variant}`].join(' ');
  }

  dismiss(): void {
    this.dismissed.emit();
  }
}
