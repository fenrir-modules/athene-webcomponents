import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthAvatarComponent, AvatarSize } from '../avatar';

export interface StackedUser {
  /**
   * Stable id (the user's id): the key of the avatar's colour tone, so one
   * person has the same colour here as in every other `ath-avatar` (DS-09).
   */
  id: string;
  /** Display name (also used for initials). */
  name: string;
  /** Optional avatar image URL. */
  src?: string;
}

/**
 * Overlapping avatars with a `+N` chip when the list exceeds `max`.
 *
 * @example
 * <ath-avatar-stack [users]="[{ id: 'u1', name: 'Joel' }, { id: 'u2', name: 'Mira' }]" />
 * <ath-avatar-stack [users]="watchers" [max]="5" size="md" />
 */
@Component({
  selector: 'ath-avatar-stack',
  standalone: true,
  imports: [CommonModule, AthAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar-stack.component.html',
  styleUrl: './avatar-stack.component.scss',
  host: {
    '[attr.data-size]': 'size()',
  },
})
export class AthAvatarStackComponent {
  /** The people to show; `null`/`undefined` count as none. */
  readonly users = input<StackedUser[], StackedUser[] | null | undefined>([], {
    transform: (value) => value ?? [],
  });

  readonly max = input(4, { transform: numberAttribute });
  readonly size = input<AvatarSize>('sm');

  protected readonly visible = computed<StackedUser[]>(() => this.users().slice(0, this.max()));
  protected readonly overflowCount = computed<number>(() => {
    const total = this.users().length;
    const max = this.max();
    return total > max ? total - max : 0;
  });

  trackById = (_: number, user: StackedUser): string => user.id;
}
