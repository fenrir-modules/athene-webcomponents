import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';
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
  host: { '[attr.data-bare]': "label() || description() ? null : ''" },
})
export class AthToggleComponent {
  /** Checked state */
  readonly checked = input(false, { transform: booleanAttribute });

  /** Disabled state */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Label text */
  readonly label = input('');

  /** Description text */
  readonly description = input('');

  /**
   * Accessible name of the switch when no visible `label` is drawn (a switch
   * in a settings row or a table cell that its row already names).
   */
  readonly ariaLabel = input('');

  /** Emits the next state; the parent sets `checked`. */
  readonly toggled = output<boolean>();

  toggle(): void {
    if (!this.disabled()) {
      this.toggled.emit(!this.checked());
    }
  }
}
