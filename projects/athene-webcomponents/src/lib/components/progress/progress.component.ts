import { ChangeDetectionStrategy, Component, HostBinding, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
export type ProgressSize = 'xs' | 'sm' | 'md';

/**
 * Generic progress bar. Used for milestones, subtasks, sprint burn,
 * upload progress, etc.
 *
 * @example
 * <ath-progress [value]="62" />
 * <ath-progress [value]="80" tone="warning" size="md" [showLabel]="true" />
 * <ath-progress [value]="40" [total]="50" [showLabel]="true" />
 */
@Component({
  selector: 'ath-progress',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class AthProgressComponent {
  private readonly _value = signal(0);

  /** Current value. When `total` is unset, treated as a percentage (0..100). */
  @Input()
  set value(v: number) {
    this._value.set(Math.max(0, v));
  }
  get value(): number {
    return this._value();
  }

  /** Total (denominator). If unset, `value` is a percent. */
  @Input() total: number | null = null;

  @Input() tone: ProgressTone = 'accent';
  @Input() size: ProgressSize = 'sm';

  /** Show a small `X / Y` (or `X%`) label next to the bar. */
  @Input() showLabel = false;

  /** Optional aria-label for screen readers. */
  @Input() ariaLabel: string | null = null;

  @HostBinding('attr.data-tone') get hostTone(): ProgressTone {
    return this.tone;
  }

  @HostBinding('attr.data-size') get hostSize(): ProgressSize {
    return this.size;
  }

  protected readonly pct = computed<number>(() => {
    const v = this._value();
    if (this.total != null && this.total > 0) {
      return Math.min(100, (v / this.total) * 100);
    }
    return Math.min(100, v);
  });

  protected readonly label = computed<string>(() => {
    if (this.total != null) {
      return `${Math.round(this._value())} / ${this.total}`;
    }
    return `${Math.round(this.pct())}%`;
  });
}
