import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timer-pill.component.html',
  styleUrl: './timer-pill.component.scss',
})
export class AthTimerPillComponent {
  private readonly _seconds = signal(0);

  @Input() active = false;

  @Input()
  set seconds(value: number) {
    this._seconds.set(Math.max(0, Math.floor(value)));
  }
  get seconds(): number {
    return this._seconds();
  }

  @Input() ticketKey: string | null = null;

  /** Tooltip override; otherwise auto-built from state. */
  @Input() tooltip: string | null = null;

  @Output() toggled = new EventEmitter<void>();

  @HostBinding('attr.data-active') get hostActive(): string {
    return this.active ? 'true' : 'false';
  }

  @HostBinding('attr.data-warning') get hostWarning(): string | null {
    // After 8h surfaces a warn color; after 24h, an alert color
    return this._seconds() >= 24 * 3600 ? 'alert'
         : this._seconds() >= 8 * 3600 ? 'warn'
         : null;
  }

  protected readonly time = computed<string>(() => {
    const total = this._seconds();
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

  protected get effectiveTooltip(): string {
    if (this.tooltip) return this.tooltip;
    if (!this.active) return 'Click to resume timer';
    if (this.ticketKey) return `Tracking ${this.ticketKey} · click to pause`;
    return 'Click to pause timer';
  }

  onToggle(): void {
    this.toggled.emit();
  }
}
