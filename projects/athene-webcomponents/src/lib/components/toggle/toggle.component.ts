import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Athene Toggle Component
 *
 * @example
 * <ath-toggle label="Maintenance" [checked]="enabled" (toggled)="onToggle($event)" />
 * <ath-toggle [ariaLabel]="'Email on mention'" [checked]="on" (toggled)="set($event)" />
 */
@Component({
  selector: 'ath-toggle',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  host: { '[attr.data-bare]': "label || description ? null : ''" },
})
export class AthToggleComponent {
  /** Checked state */
  @Input() checked = false;

  /** Disabled state */
  @Input() disabled = false;

  /** Label text */
  @Input() label = '';

  /** Description text */
  @Input() description = '';

  /**
   * Accessible name of the switch when no visible `label` is drawn (a switch
   * in a settings row or a table cell that its row already names).
   */
  @Input() ariaLabel = '';

  /** Toggle event emitter */
  @Output() toggled = new EventEmitter<boolean>();

  toggle(): void {
    if (!this.disabled) {
      this.toggled.emit(!this.checked);
    }
  }
}
