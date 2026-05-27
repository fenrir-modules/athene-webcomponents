import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TicketPriority = 'low' | 'medium' | 'high' | 'crit';

const LABELS: Readonly<Record<TicketPriority, string>> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  crit: 'Critical',
};

/**
 * Priority indicator with rising bars (low → critical).
 *
 * @example
 * <ath-priority priority="high" />
 * <ath-priority priority="crit" [showLabel]="false" />
 */
@Component({
  selector: 'ath-priority',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.scss',
})
export class AthPriorityComponent {
  @Input() priority: TicketPriority = 'medium';
  @Input() showLabel = true;

  /** Optional override label. */
  @Input() label: string | null = null;

  @HostBinding('attr.data-priority') get hostPriority(): TicketPriority {
    return this.priority;
  }

  protected get computedLabel(): string {
    return this.label ?? LABELS[this.priority] ?? this.priority;
  }
}
