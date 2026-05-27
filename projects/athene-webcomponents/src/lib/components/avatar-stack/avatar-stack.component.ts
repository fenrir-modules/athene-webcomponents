import { ChangeDetectionStrategy, Component, HostBinding, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthAvatarComponent, AvatarSize } from '../avatar';

export interface StackedUser {
  /** Display name (also used for initials). */
  name: string;
  /** Optional avatar image URL. */
  src?: string;
}

/**
 * Overlapping avatars with a `+N` chip when the list exceeds `max`.
 *
 * @example
 * <ath-avatar-stack [users]="[{name:'Joel'},{name:'Mira'},{name:'Tom'},{name:'Sara'}]" />
 * <ath-avatar-stack [users]="watchers" [max]="5" size="md" />
 */
@Component({
  selector: 'ath-avatar-stack',
  standalone: true,
  imports: [CommonModule, AthAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar-stack.component.html',
  styleUrl: './avatar-stack.component.scss',
})
export class AthAvatarStackComponent {
  private readonly _users = signal<StackedUser[]>([]);

  @Input()
  set users(value: StackedUser[] | null | undefined) {
    this._users.set(value ?? []);
  }
  get users(): StackedUser[] {
    return this._users();
  }

  @Input() max = 4;
  @Input() size: AvatarSize = 'sm';

  @HostBinding('attr.data-size') get hostSize(): AvatarSize {
    return this.size;
  }

  protected readonly visible = computed<StackedUser[]>(() => this._users().slice(0, this.max));
  protected readonly overflowCount = computed<number>(() => {
    const total = this._users().length;
    return total > this.max ? total - this.max : 0;
  });

  trackByName = (_: number, user: StackedUser): string => user.name;
}
