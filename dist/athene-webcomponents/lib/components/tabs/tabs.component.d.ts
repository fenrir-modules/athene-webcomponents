import * as i0 from "@angular/core";
/**
 * Tab item definition
 */
export interface TabItem {
    id: string;
    label: string;
    /** Optional inline count badge after the label (e.g., `12`, `'3/5'`). */
    count?: number | string;
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
    readonly tabs: import("@angular/core").InputSignal<TabItem[]>;
    /** Currently active tab ID. Controlled: pair with `(tabChanged)`. */
    readonly activeTab: import("@angular/core").InputSignal<string>;
    /** Tab change event */
    readonly tabChanged: import("@angular/core").OutputEmitterRef<string>;
    selectTab(tab: TabItem): void;
    getTabClasses(tab: TabItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTabsComponent, "ath-tabs", never, { "tabs": { "alias": "tabs"; "required": false; "isSignal": true; }; "activeTab": { "alias": "activeTab"; "required": false; "isSignal": true; }; }, { "tabChanged": "tabChanged"; }, never, never, true, never>;
}
