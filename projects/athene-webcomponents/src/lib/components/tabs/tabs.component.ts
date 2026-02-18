import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Tab item definition
 */
export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

/**
 * Athene Tabs Component
 *
 * Tab navigation for switching between content sections.
 *
 * @example
 * <ath-tabs [tabs]="tabs" [activeTab]="activeTab" (tabChanged)="activeTab = $event" />
 */
@Component({
  selector: 'ath-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class AthTabsComponent {
  /** Tab items */
  @Input() tabs: TabItem[] = [];

  /** Currently active tab ID */
  @Input() activeTab = '';

  /** Tab change event */
  @Output() tabChanged = new EventEmitter<string>();

  selectTab(tab: TabItem): void {
    if (!tab.disabled && tab.id !== this.activeTab) {
      this.tabChanged.emit(tab.id);
    }
  }

  getTabClasses(tab: TabItem): string {
    return [
      'ath-tabs__tab',
      tab.id === this.activeTab ? 'ath-tabs__tab--active' : '',
      tab.disabled ? 'ath-tabs__tab--disabled' : '',
    ].filter(Boolean).join(' ');
  }
}
