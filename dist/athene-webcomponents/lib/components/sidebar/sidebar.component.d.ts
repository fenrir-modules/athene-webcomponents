import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
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
export declare class AthSidebarComponent {
    /** Collapsed state */
    collapsed: boolean;
    /** Collapsed change event */
    collapsedChange: EventEmitter<boolean>;
    protected readonly collapseIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly expandIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    get sidebarClasses(): string;
    toggleCollapse(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSidebarComponent, "ath-sidebar", never, { "collapsed": { "alias": "collapsed"; "required": false; }; }, { "collapsedChange": "collapsedChange"; }, never, ["[slot=header]", "*", "[slot=footer]"], true, never>;
}
