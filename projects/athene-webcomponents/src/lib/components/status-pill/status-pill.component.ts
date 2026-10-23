import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  inject,
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
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-pill.component.html',
  styleUrl: './status-pill.component.scss',
})
export class AthStatusPillComponent {
  @Input() status: TicketStatus = 'open';
  @Input() showDot = true;
  @Input() showLabel = true;
  @Input() size: StatusPillSize = 'md';

  /** Optional override label (otherwise the app's resolver, then the English default). */
  @Input() label: string | null = null;

  private readonly resolveLabel = inject(ATH_STATUS_LABELS, { optional: true });

  @HostBinding('attr.data-status') get hostStatus(): TicketStatus {
    return this.status;
  }

  @HostBinding('attr.data-size') get hostSize(): StatusPillSize {
    return this.size;
  }

  protected get computedLabel(): string {
    return this.label ?? this.resolveLabel?.(this.status) ?? LABELS[this.status] ?? this.status;
  }
}
