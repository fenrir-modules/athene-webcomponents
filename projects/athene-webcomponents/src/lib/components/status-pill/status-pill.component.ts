import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TicketStatus = 'open' | 'prog' | 'review' | 'done' | 'blocked' | 'closed';
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

  /** Optional override label (otherwise the default label for the status is used). */
  @Input() label: string | null = null;

  @HostBinding('attr.data-status') get hostStatus(): TicketStatus {
    return this.status;
  }

  @HostBinding('attr.data-size') get hostSize(): StatusPillSize {
    return this.size;
  }

  protected get computedLabel(): string {
    return this.label ?? LABELS[this.status] ?? this.status;
  }
}
