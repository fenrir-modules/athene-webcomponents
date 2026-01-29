import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Athene Toggle Component
 *
 * @example
 * <ath-toggle label="Maintenance" [checked]="enabled" (toggled)="onToggle($event)" />
 */
@Component({
  selector: 'ath-toggle',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
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

  /** Toggle event emitter */
  @Output() toggled = new EventEmitter<boolean>();

  toggle(): void {
    if (!this.disabled) {
      this.toggled.emit(!this.checked);
    }
  }
}
