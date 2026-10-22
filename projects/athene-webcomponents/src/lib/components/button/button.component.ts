import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Loader2 } from 'lucide-angular';

/**
 * Button variant types
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  // Quiet destructive: reads as a neutral ghost until hovered, for
  // per-row actions where a solid red button would shout.
  | 'danger-ghost'
  // The global create action (topbar "+ New") — green, distinct from the
  // page's own ink primary.
  | 'create';

/**
 * Button size types
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

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

  /**
   * Toggle state. `null` (default) renders a plain button; `true`/`false`
   * make it a toggle button with `aria-pressed` and a sunken pressed look.
   */
  @Input() pressed: boolean | null = null;

  /**
   * Disclosure state for a button that opens a panel or menu. `null`
   * (default) omits `aria-expanded`. Set this instead of
   * `[attr.aria-expanded]` on the host: host attributes do not reach the
   * focusable inner `<button>`.
   */
  @Input() expanded: boolean | null = null;

  /** Id of the element this button controls (`aria-controls`). */
  @Input() controls: string | null = null;

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
      this.pressed ? 'ath-button--pressed' : '',
    ].filter(Boolean).join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
