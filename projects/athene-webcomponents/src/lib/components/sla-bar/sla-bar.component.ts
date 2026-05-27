import { ChangeDetectionStrategy, Component, HostBinding, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SlaStatus = 'met' | 'pending' | 'breached';

export interface SlaTarget {
  /** Display label (e.g., "Response", "Resolution"). */
  label: string;
  /** Status of this SLA. */
  status: SlaStatus;
  /** Pre-formatted detail text (e.g., "met · 24m", "6h 12m left"). */
  text: string;
}

/**
 * SLA progress widget. Two rows (response + resolution) and a progress bar
 * for the active (pending) one.
 *
 * The color of the bar transitions:
 *   < 80% → green / accent
 *   80-95% → amber (warn)
 *   ≥ 95% → red (breach)
 *
 * @example
 * <ath-sla-bar
 *   [response]="{label:'Response',  status:'met',     text:'met · 24m'}"
 *   [resolution]="{label:'Resolution', status:'pending', text:'6h 12m left'}"
 *   [progressPct]="68" />
 */
@Component({
  selector: 'ath-sla-bar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sla-bar.component.html',
  styleUrl: './sla-bar.component.scss',
})
export class AthSlaBarComponent {
  @Input() response: SlaTarget | null = null;
  @Input() resolution: SlaTarget | null = null;

  /** 0..100. The progress bar reflects the most "at risk" target. */
  @Input()
  set progressPct(value: number) {
    this._progress.set(Math.max(0, Math.min(100, value)));
  }
  get progressPct(): number {
    return this._progress();
  }

  private readonly _progress = signal(0);

  protected readonly severity = computed<SlaStatus>(() => {
    const r = this.resolution?.status;
    const rs = this.response?.status;
    if (r === 'breached' || rs === 'breached') return 'breached';
    if (this._progress() >= 95) return 'breached';
    if (this._progress() >= 80) return 'pending';
    if (r === 'met' && rs === 'met') return 'met';
    return 'pending';
  });

  @HostBinding('attr.data-severity') get hostSeverity(): SlaStatus {
    return this.severity();
  }

  protected statusColor(s: SlaStatus): string {
    switch (s) {
      case 'met': return 'var(--green)';
      case 'breached': return 'var(--red)';
      case 'pending':
      default: return 'var(--amber)';
    }
  }
}
