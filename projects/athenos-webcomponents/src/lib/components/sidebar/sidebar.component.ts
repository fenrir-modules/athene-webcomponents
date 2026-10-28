import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';

import { AthIconComponent } from '../icon/icon.component';
import { PanelLeftClose, PanelLeft } from 'lucide';
import { injectAthLabels } from '../../i18n/labels';

/**
 * Athenos Sidebar Component
 *
 * Navigation sidebar for admin and app layouts.
 *
 * @example
 * <ath-sidebar [collapsed]="isCollapsed" (collapsedChange)="isCollapsed = $event">
 *   <div slot="header">Logo</div>
 *   <ath-nav-item [icon]="Home" label="Home" route="/home" [compact]="isCollapsed" />
 *   <div slot="footer">User info</div>
 * </ath-sidebar>
 */
@Component({
  selector: 'ath-sidebar',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class AthSidebarComponent {
  protected readonly labels = injectAthLabels();

  /** Collapsed state. Two-way: `[(collapsed)]` (`collapsedChange`). */
  readonly collapsed = model(false);

  protected readonly collapseIcon = PanelLeftClose;
  protected readonly expandIcon = PanelLeft;

  protected readonly sidebarClasses = computed(() =>
    ['ath-sidebar', this.collapsed() ? 'ath-sidebar--collapsed' : ''].filter(Boolean).join(' ')
  );

  toggleCollapse(): void {
    this.collapsed.update((collapsed) => !collapsed);
  }
}
