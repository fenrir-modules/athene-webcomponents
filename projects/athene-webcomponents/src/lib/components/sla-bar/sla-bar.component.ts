import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
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
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sla-bar.component.html',
  styleUrl: './sla-bar.component.scss',
  host: {
    '[attr.data-severity]': 'severity()',
  },
})
export class AthSlaBarComponent {
  readonly response = input<SlaTarget | null>(null);
  readonly resolution = input<SlaTarget | null>(null);

  /** 0..100 (clamped). The progress bar reflects the most "at risk" target. */
  readonly progressPct = input(0, {
    transform: (value: unknown) => Math.max(0, Math.min(100, numberAttribute(value, 0))),
  });

  protected readonly severity = computed<SlaStatus>(() => {
    const r = this.resolution()?.status;
    const rs = this.response()?.status;
    const progress = this.progressPct();
    if (r === 'breached' || rs === 'breached') return 'breached';
    if (progress >= 95) return 'breached';
    if (progress >= 80) return 'pending';
    if (r === 'met' && rs === 'met') return 'met';
    return 'pending';
  });

  /** The target the bar is labelled by: resolution, else response. */
  protected readonly barTarget = computed(() => this.resolution() ?? this.response());

  protected statusColor(s: SlaStatus): string {
    switch (s) {
      case 'met':
        return 'var(--green-text)';
      case 'breached':
        return 'var(--red-text)';
      case 'pending':
      default:
        return 'var(--amber-text)';
    }
  }
}
