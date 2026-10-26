import { ChangeDetectionStrategy, Component, booleanAttribute, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthIconComponent } from '../icon/icon.component';
import { ChevronDown, X } from 'lucide';
import { formatAthLabel, injectAthLabels } from '../../i18n/labels';

/**
 * Filter pill in the style `Label Value ▾`: quiet grey fill, muted label,
 * semibold value, no separator. Optional clearable.
 * Typically used in toolbars to compose query filters.
 *
 * @example
 * <ath-filter-chip label="Status" value="Any" (clicked)="openMenu()" />
 * <ath-filter-chip label="Assignee" value="Mira Voss" [active]="true" [clearable]="true"
 *                  (clicked)="open()" (cleared)="reset()" />
 */
@Component({
  selector: 'ath-filter-chip',
  imports: [CommonModule, AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-chip.component.html',
  styleUrl: './filter-chip.component.scss',
  host: {
    '[attr.data-active]': "active() ? 'true' : null",
    '[attr.data-disabled]': "disabled() ? 'true' : null",
  },
})
export class AthFilterChipComponent {
  protected readonly labels = injectAthLabels();

  readonly label = input.required<string>();
  readonly value = input('');

  /** Visually highlights the chip when a filter value is set. */
  readonly active = input(false, { transform: booleanAttribute });

  /** Shows a small `×` button to clear the filter. */
  readonly clearable = input(false, { transform: booleanAttribute });

  readonly disabled = input(false, { transform: booleanAttribute });

  readonly clicked = output<void>();
  readonly cleared = output<void>();

  protected readonly chevronIcon = ChevronDown;
  protected readonly clearIcon = X;

  protected clearLabel(): string {
    return formatAthLabel(this.labels.clearFilter(), { name: this.label() });
  }

  onClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }

  onClear(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled()) {
      this.cleared.emit();
    }
  }
}
