import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    if (!this.name) return '?';
    const parts = this.name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
