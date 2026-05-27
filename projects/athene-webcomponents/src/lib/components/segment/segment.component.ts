import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SegmentOption<T = string> {
  value: T;
  label: string;
  /** Optional inline count badge (e.g., "12"). */
  count?: number | string;
  /** Optional `disabled` state per option. */
  disabled?: boolean;
}

export type SegmentSize = 'sm' | 'md';

/**
 * iOS-style segmented control. Multiple options, exactly one active.
 *
 * @example
 * <ath-segment
 *   [options]="[{value:'list', label:'List'}, {value:'kanban', label:'Kanban'}]"
 *   [value]="view"
 *   (valueChange)="view = $event" />
 */
@Component({
  selector: 'ath-segment',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './segment.component.html',
  styleUrl: './segment.component.scss',
})
export class AthSegmentComponent<T = string> {
  @Input({ required: true }) options: SegmentOption<T>[] = [];
  @Input() value!: T;
  @Input() size: SegmentSize = 'md';

  /** Optional aria-label for the group (for screen readers). */
  @Input() ariaLabel: string | null = null;

  @Output() valueChange = new EventEmitter<T>();

  @HostBinding('attr.role') readonly role = 'tablist';
  @HostBinding('attr.aria-label') get hostAriaLabel(): string | null {
    return this.ariaLabel;
  }

  @HostBinding('attr.data-size') get hostSize(): SegmentSize {
    return this.size;
  }

  trackByValue = (_: number, item: SegmentOption<T>): unknown => item.value;

  select(option: SegmentOption<T>): void {
    if (option.disabled) return;
    if (option.value !== this.value) {
      this.valueChange.emit(option.value);
    }
  }

  isActive(option: SegmentOption<T>): boolean {
    return option.value === this.value;
  }
}
