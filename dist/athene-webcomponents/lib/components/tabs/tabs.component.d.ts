import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
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
export declare class AthTabsComponent {
    /** Tab items */
    tabs: TabItem[];
    /** Currently active tab ID */
    activeTab: string;
    /** Tab change event */
    tabChanged: EventEmitter<string>;
    selectTab(tab: TabItem): void;
    getTabClasses(tab: TabItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTabsComponent, "ath-tabs", never, { "tabs": { "alias": "tabs"; "required": false; }; "activeTab": { "alias": "activeTab"; "required": false; }; }, { "tabChanged": "tabChanged"; }, never, never, true, never>;
}
