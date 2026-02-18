import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';

/**
 * Chip variant types
 */
export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';

/**
 * Athene Chip Component
 *
 * Tags and categories with optional remove action.
 *
 * @example
 * <ath-chip>authentication</ath-chip>
 * <ath-chip variant="primary" [removable]="true" (removed)="onRemove()">beta</ath-chip>
 */
@Component({
  selector: 'ath-chip',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class AthChipComponent {
  /** Chip variant */
  @Input() variant: ChipVariant = 'default';

  /** Whether the chip can be removed */
  @Input() removable = false;

  /** Remove event */
  @Output() removed = new EventEmitter<void>();

  protected readonly removeIcon = X;

  get chipClasses(): string {
    return `ath-chip ath-chip--${this.variant}`;
  }

  remove(event: MouseEvent): void {
    event.stopPropagation();
    this.removed.emit();
  }
}
