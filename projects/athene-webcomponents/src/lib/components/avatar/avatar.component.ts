import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { avatarInitials, avatarTone } from './avatar-tone';

/**
 * Avatar size variants
 */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Athene Avatar Component
 *
 * User avatar with initials fallback.
 *
 * @example
 * <ath-avatar name="John Doe" />
 * <ath-avatar name="Admin" size="lg" />
 */
@Component({
  selector: 'ath-avatar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AthAvatarComponent {
  /** User display name (used for initials) */
  @Input() name = '';

  /** Optional image URL */
  @Input() src = '';

  /** Avatar size */
  @Input() size: AvatarSize = 'md';

  get avatarClasses(): string {
    return `ath-avatar ath-avatar--${this.size}`;
  }

  get initials(): string {
    return avatarInitials(this.name);
  }

  /** Per-person colour tone; '?' (no name) stays on the neutral tone. */
  get tone(): number | null {
    return this.name.trim() ? avatarTone(this.name) : null;
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
