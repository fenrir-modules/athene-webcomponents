import { ChangeDetectionStrategy, Component, HostBinding, InjectionToken, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TicketPriority = 'low' | 'medium' | 'high' | 'crit';

const LABELS: Readonly<Record<TicketPriority, string>> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  crit: 'Critical',
};

/** Returns the label for a priority in the app's language, or null for the default. */
export type PriorityLabelResolver = (priority: TicketPriority) => string | null;

/**
 * Optional resolver for priority labels. The app provides it once at the
 * root (with its translations); without it the labels are English.
 */
export const ATH_PRIORITY_LABELS = new InjectionToken<PriorityLabelResolver>('ATH_PRIORITY_LABELS');

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
