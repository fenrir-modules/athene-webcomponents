import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProjectKeySize = 'sm' | 'md' | 'lg';

/**
 * Colored project-key badge (e.g., `FNR`, `WEB`, `AUT`).
 *
 * Colors are tinted from the provided `color` (project's brand color).
 *
 * @example
 * <ath-project-key-badge projectKey="WEB" color="#e9b864" />
 * <ath-project-key-badge projectKey="FNR" color="#7aa9f5" size="lg" />
 */
@Component({
  selector: 'ath-project-key-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-key-badge.component.html',
  styleUrl: './project-key-badge.component.scss',
})
export class AthProjectKeyBadgeComponent {
  @Input({ required: true }) projectKey!: string;

  /** Hex color (e.g., `#e9b864`). Used to tint border + background. */
  @Input() color = '#6b7280';

  @Input() size: ProjectKeySize = 'md';

  @HostBinding('attr.data-size') get hostSize(): ProjectKeySize {
    return this.size;
  }

  @HostBinding('style.--pkey-color')
  get cssColor(): string {
    return this.color;
  }

  @HostBinding('style.--pkey-border')
  get cssBorder(): string {
    // 25% alpha
    return this.color + '40';
  }

  @HostBinding('style.--pkey-bg')
  get cssBg(): string {
    // ~7% alpha
    return this.color + '12';
  }
}
