import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ATH_STATUS_LABELS, type TicketStatus } from '@athene/webcomponents/core';

// The status type and label token live in `@athene/webcomponents/core`, so an
// app can provide the token at its root without loading the components.
export {
  ATH_STATUS_LABELS,
  type StatusLabelResolver,
  type TicketStatus,
} from '@athene/webcomponents/core';

export type StatusPillSize = 'sm' | 'md';

const LABELS: Readonly<Record<TicketStatus, string>> = {
  open: 'Open',
  prog: 'In Progress',
  review: 'In Review',
  done: 'Done',
  blocked: 'Blocked',
  closed: 'Closed',
};

/**
 * Status indicator for a ticket: colored inner-ring dot + label.
 *
 * @example
 * <ath-status-pill status="open" />
 * <ath-status-pill status="prog" [showLabel]="false" />
 * <ath-status-pill status="done" size="sm" />
 */
@Component({
  selector: 'ath-status-pill',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-pill.component.html',
  styleUrl: './status-pill.component.scss',
  host: {
    '[attr.data-status]': 'status()',
    '[attr.data-size]': 'size()',
  },
})
export class AthStatusPillComponent {
  readonly status = input<TicketStatus>('open');
  readonly showDot = input(true, { transform: booleanAttribute });
  readonly showLabel = input(true, { transform: booleanAttribute });
  readonly size = input<StatusPillSize>('md');

  /** Optional override label (otherwise the app's resolver, then the English default). */
  readonly label = input<string | null>(null);

  private readonly resolveLabel = inject(ATH_STATUS_LABELS, { optional: true });

  /** The resolver reads a signal for the language (see `StatusLabelResolver`), so this follows it. */
  protected readonly computedLabel = computed<string>(() => {
    const status = this.status();
    return this.label() ?? this.resolveLabel?.(status) ?? LABELS[status] ?? status;
  });
}
