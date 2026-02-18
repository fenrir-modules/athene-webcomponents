import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

/**
 * Athene Nav Item Component
 *
 * Navigation item for sidebar with icon, label and active state.
 *
 * @example
 * <ath-nav-item [icon]="homeIcon" label="Overview" link="/admin/overview" />
 * <ath-nav-item [icon]="flagIcon" label="Feature Flags" link="/admin/feature-flags" />
 */
@Component({
  selector: 'ath-nav-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
})
export class AthNavItemComponent {
  /** Lucide icon */
  @Input() icon: any = null;

  /** Nav item label */
  @Input() label = '';

  /** Router link */
  @Input() link = '';

  /** Whether the sidebar is collapsed */
  @Input() collapsed = false;

  /** Badge count (optional) */
  @Input() badgeCount: number | null = null;
}
