import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';

import { AthAvatarComponent } from '../avatar';
import { injectAthLabels } from '../../i18n/labels';

/**
 * A full timeline item (comment, note, change-with-content).
 * Use inside <ath-timeline>.
 *
 * @example
 * <ath-timeline-entry
 *   author="Mira Voss"
 *   avatarName="Mira Voss"
 *   timeLabel="48m ago"
 *   [internal]="false">
 *   <p>Pushed first pass.</p>
 * </ath-timeline-entry>
 */
@Component({
  selector: 'ath-timeline-entry',
  imports: [AthAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline-entry.component.html',
  styleUrl: './timeline-entry.component.scss',
  host: {
    '[attr.data-internal]': "internal() ? 'true' : null",
  },
})
export class AthTimelineEntryComponent {
  protected readonly labels = injectAthLabels();

  readonly author = input.required<string>();

  /** Defaults to `author` for initials/colors. Override if avatar should differ. */
  readonly avatarName = input<string | null>(null);

  readonly avatarSrc = input('');

  /** Pre-formatted relative time (e.g., "5m ago"). */
  readonly timeLabel = input('');

  /** Marks the entry as internal (only visible to operators/admins). */
  readonly internal = input(false, { transform: booleanAttribute });

  protected readonly effectiveAvatarName = computed(() => this.avatarName() ?? this.author());
}
