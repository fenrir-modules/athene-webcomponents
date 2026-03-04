import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Loader2 } from 'lucide-angular';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Athene Button Component
 *
 * @example
 * <ath-button variant="primary" (clicked)="handleClick()">Click me</ath-button>
 * <ath-button variant="outline" size="sm" [loading]="true">Loading...</ath-button>
 */
@Component({
  selector: 'ath-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class AthButtonComponent {
  /** Button variant */
  @Input() variant: ButtonVariant = 'primary';

  /** Button size */
  @Input() size: ButtonSize = 'md';

  /** Button type attribute */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Disabled state */
  @Input() disabled = false;

  /** Loading state */
  @Input() loading = false;

  /** Full width button */
  @Input() fullWidth = false;

  /** Optional aria-label for icon-only usage */
  @Input() ariaLabel: string | null = null;

  /** Click event emitter */
  @Output() clicked = new EventEmitter<MouseEvent>();

  protected readonly loaderIcon = Loader2;

  get buttonClasses(): string {
    return [
      'ath-button',
      `ath-button--${this.variant}`,
      `ath-button--${this.size}`,
      this.fullWidth ? 'ath-button--full-width' : '',
      this.loading ? 'ath-button--loading' : '',
    ].filter(Boolean).join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
