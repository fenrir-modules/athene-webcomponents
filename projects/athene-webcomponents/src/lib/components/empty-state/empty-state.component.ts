import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

/**
 * A lucide icon's data payload.
 *
 * `lucide-angular` does not export its `LucideIconData` type publicly,
 * so this mirrors its shape rather than leaking `any` into the API.
 */
export type EmptyStateIcon = readonly (readonly [string, Record<string, string | number>])[];

/**
 * Athene Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 * <ath-empty-state [icon]="Inbox" message="Nothing here" subMessage="…" />
 */
@Component({
  selector: 'ath-empty-state',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
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
}
