import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown, X } from 'lucide-angular';

/**
 * Filter chip in the style `Label : Value ▾`. Optional clearable.
 * Typically used in toolbars to compose query filters.
 *
 * @example
 * <ath-filter-chip label="Status" value="Any" (clicked)="openMenu()" />
 * <ath-filter-chip label="Assignee" value="Mira Voss" [active]="true" [clearable]="true"
 *                  (clicked)="open()" (cleared)="reset()" />
 */
@Component({
  selector: 'ath-filter-chip',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filter-chip.component.html',
  styleUrl: './filter-chip.component.scss',
})
export class AthFilterChipComponent {
  @Input({ required: true }) label!: string;
  @Input() value = '';

  /** Visually highlights the chip when a filter value is set. */
  @Input() active = false;

  /** Shows a small `×` button to clear the filter. */
  @Input() clearable = false;

  @Input() disabled = false;

  @Output() clicked = new EventEmitter<void>();
  @Output() cleared = new EventEmitter<void>();

  protected readonly chevronIcon = ChevronDown;
  protected readonly clearIcon = X;

  @HostBinding('attr.data-active') get hostActive(): string | null {
    return this.active ? 'true' : null;
  }

  @HostBinding('attr.data-disabled') get hostDisabled(): string | null {
    return this.disabled ? 'true' : null;
  }

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }

  onClear(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.cleared.emit();
    }
  }
}
