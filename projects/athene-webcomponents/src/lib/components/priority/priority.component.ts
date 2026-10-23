import { ChangeDetectionStrategy, Component, HostBinding, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ATH_PRIORITY_LABELS, type TicketPriority } from '@athene/webcomponents/core';

// The priority type and label token live in `@athene/webcomponents/core`.
export {
  ATH_PRIORITY_LABELS,
  type PriorityLabelResolver,
  type TicketPriority,
} from '@athene/webcomponents/core';

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
  private readonly resolveLabel = inject(ATH_PRIORITY_LABELS, { optional: true });

  @Input() priority: TicketPriority = 'medium';
  @Input() showLabel = true;

  /** Optional override label. */
  @Input() label: string | null = null;

  @HostBinding('attr.data-priority') get hostPriority(): TicketPriority {
    return this.priority;
  }

  protected get computedLabel(): string {
    return (
      this.label ?? this.resolveLabel?.(this.priority) ?? LABELS[this.priority] ?? this.priority
    );
  }
}
