import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
  output,
  type Signal,
} from '@angular/core';

/** Long-running timer: `warn` after 8h, `alert` after 24h. */
export type TimerPillWarning = 'warn' | 'alert';

/**
 * Live time-tracking pill for the topbar. **Stateless about ticking** —
 * the consumer (TimeTrackingService) feeds `seconds` and reacts to `toggled`.
 *
 * This keeps the component pure (testable) while letting the service stay
 * authoritative about the real running time.
 *
 * @example
 * <ath-timer-pill
 *   [active]="timer.running()"
 *   [seconds]="timer.elapsed()"
 *   [ticketKey]="timer.ticketKey()"
 *   (toggled)="timer.toggle()" />
 */
@Component({
  selector: 'ath-timer-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timer-pill.component.html',
  styleUrl: './timer-pill.component.scss',
  host: {
    '[attr.data-active]': "active() ? 'true' : 'false'",
    '[attr.data-warning]': 'warning()',
  },
})
export class AthTimerPillComponent {
  readonly active = input(false, { transform: booleanAttribute });

  /** Elapsed time in seconds; fractions are dropped, negative counts as 0. */
  readonly seconds = input(0, {
    transform: (value: unknown) => Math.max(0, Math.floor(numberAttribute(value, 0))),
  });

  readonly ticketKey = input<string | null>(null);

  /** Tooltip override; otherwise auto-built from state. */
  readonly tooltip = input<string | null>(null);

  readonly toggled = output<void>();

  /** After 8h surfaces a warn color; after 24h, an alert color. */
  protected readonly warning: Signal<TimerPillWarning | null> = computed(() => {
    const s = this.seconds();
    return s >= 24 * 3600 ? 'alert' : s >= 8 * 3600 ? 'warn' : null;
  });

  protected readonly time = computed<string>(() => {
    const total = this.seconds();
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    if (hours > 0) {
      return `${hours}:${mm}:${ss}`;
    }
    return `${mm}:${ss}`;
  });

  protected readonly effectiveTooltip = computed<string>(() => {
    const tooltip = this.tooltip();
    if (tooltip) return tooltip;
    if (!this.active()) return 'Click to resume timer';
    const ticketKey = this.ticketKey();
    if (ticketKey) return `Tracking ${ticketKey} · click to pause`;
    return 'Click to pause timer';
  });

  onToggle(): void {
    this.toggled.emit();
  }
}
