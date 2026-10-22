import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  InjectionToken,
  Input,
  inject,
} from '@angular/core';
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
 * Names a status in the reader's language.
 *
 * The library stays free of any translation framework: the app provides
 * this once at the root, and every pill without an explicit `label` asks
 * it. Return `null` to fall back to the English default. A resolver that
 * reads a signal (the current language) keeps OnPush pills current when
 * the language changes.
 */
export type StatusLabelResolver = (status: TicketStatus) => string | null;

export const ATH_STATUS_LABELS = new InjectionToken<StatusLabelResolver>('ATH_STATUS_LABELS');

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
