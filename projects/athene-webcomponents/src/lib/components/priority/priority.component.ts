import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
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
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.scss',
  host: {
    '[attr.data-priority]': 'priority()',
  },
})
export class AthPriorityComponent {
  private readonly resolveLabel = inject(ATH_PRIORITY_LABELS, { optional: true });

  readonly priority = input<TicketPriority>('medium');
  readonly showLabel = input(true, { transform: booleanAttribute });

  /** Optional override label. */
  readonly label = input<string | null>(null);

  /** The resolver reads a signal for the language (see `PriorityLabelResolver`), so this follows it. */
  protected readonly computedLabel = computed<string>(() => {
    const priority = this.priority();
    return this.label() ?? this.resolveLabel?.(priority) ?? LABELS[priority] ?? priority;
  });
}
