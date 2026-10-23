import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  booleanAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AthButtonComponent } from '../button/button.component';

/**
 * Lucide's icon data, mirrored exactly: `lucide-angular` does not export
 * `LucideIconData` from its public entry, so consumers pass `Inbox`,
 * `CheckCircle2`, … straight in without a cast.
 */
type LucideIconNode = readonly [string, { [key: string]: string | number }];
export type LucideIconDataLike = readonly LucideIconNode[];

/** A lucide icon (`import { Inbox } from 'lucide-angular'`) — no cast needed. */
export type EmptyStateIcon =
  | LucideIconDataLike
  | readonly (readonly [string, Record<string, string | number>])[];

/** One "what will appear here" row in a compact empty state. */
export interface EmptyStateHint {
  icon?: EmptyStateIcon | null;
  label: string;
  /** Muted one-line explanation under the label. */
  sub?: string;
}

/** `default`: centred block (existing look). `compact`: content-sized, icon tile left. */
export type EmptyStateSize = 'default' | 'compact';

/**
 * Athene Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 * <ath-empty-state [icon]="Inbox" message="Nothing here" subMessage="…" />
 *
 * Compact: content-sized, for a panel that should end with its content.
 * <ath-empty-state
 *   size="compact" bare
 *   [icon]="ic.inbox"
 *   message="You're all caught up"
 *   subMessage="Mentions, assignments and replies land here."
 *   actionLabel="Notification settings" (action)="openPrefs()"
 *   [hints]="[{ icon: ic.at, label: 'Mentions', sub: 'When someone @mentions you' }]"
 * />
 */
@Component({
  selector: 'ath-empty-state',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AthButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class AthEmptyStateComponent {
  /** Empty state message */
  @Input({ required: true }) message = '';

  /** Optional sub-message */
  @Input() subMessage = '';

  /** Optional lucide icon shown above the message. */
  @Input() icon: EmptyStateIcon | null = null;

  /**
   * No frame of its own, for an empty state that already sits inside a
   * panel; the dashed box inside a white panel drew a card in a card.
   */
  @Input({ transform: booleanAttribute }) bare = false;

  /** `compact`: icon tile left, auto height, optional hint rows. */
  @Input() size: EmptyStateSize = 'default';

  /** 2–4 rows describing what will appear here (compact layout). */
  @Input() hints: readonly EmptyStateHint[] = [];

  /** Primary action label; emits `action` when clicked. */
  @Input() actionLabel = '';
  @Input() actionIcon: EmptyStateIcon | null = null;
  /** Secondary (outline) action label; emits `secondaryAction`. */
  @Input() secondaryActionLabel = '';

  @Output() action = new EventEmitter<void>();
  @Output() secondaryAction = new EventEmitter<void>();
}
