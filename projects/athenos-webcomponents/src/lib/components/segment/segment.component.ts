import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './segment.component.html',
  styleUrl: './segment.component.scss',
  host: {
    role: 'tablist',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.data-size]': 'size()',
  },
})
export class AthSegmentComponent<T = string> {
  readonly options = input.required<SegmentOption<T>[]>();
  /** The active option's value. Controlled: pair with `(valueChange)` or `[(value)]`. */
  readonly value = input.required<T>();
  readonly size = input<SegmentSize>('md');

  /** Optional aria-label for the group (for screen readers). */
  readonly ariaLabel = input<string | null>(null);

  readonly valueChange = output<T>();

  trackByValue = (_: number, item: SegmentOption<T>): unknown => item.value;

  select(option: SegmentOption<T>): void {
    if (option.disabled) return;
    if (option.value !== this.value()) {
      this.valueChange.emit(option.value);
    }
  }

  isActive(option: SegmentOption<T>): boolean {
    return option.value === this.value();
  }
}
