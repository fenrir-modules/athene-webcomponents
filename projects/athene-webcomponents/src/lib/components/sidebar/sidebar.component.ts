import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, PanelLeftClose, PanelLeft } from 'lucide-angular';

/**
 * Athene Sidebar Component
 *
 * Navigation sidebar for admin and app layouts.
 *
 * @example
 * <ath-sidebar [collapsed]="isCollapsed" (collapsedChange)="isCollapsed = $event">
 *   <div slot="header">Logo</div>
 *   <ath-nav-item icon="home" label="Home" />
 *   <div slot="footer">User info</div>
 * </ath-sidebar>
 */
@Component({
  selector: 'ath-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class AthSidebarComponent {
  /** Collapsed state */
  @Input() collapsed = false;

  /** Collapsed change event */
  @Output() collapsedChange = new EventEmitter<boolean>();

  protected readonly collapseIcon = PanelLeftClose;
  protected readonly expandIcon = PanelLeft;

  get sidebarClasses(): string {
    return [
      'ath-sidebar',
      this.collapsed ? 'ath-sidebar--collapsed' : '',
    ].filter(Boolean).join(' ');
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}
