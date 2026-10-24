import * as i0 from "@angular/core";
/**
 * Athene Sidebar Component
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
export declare class AthSidebarComponent {
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    /** Collapsed state. Two-way: `[(collapsed)]` (`collapsedChange`). */
    readonly collapsed: import("@angular/core").ModelSignal<boolean>;
    protected readonly collapseIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly expandIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly sidebarClasses: import("@angular/core").Signal<string>;
    toggleCollapse(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSidebarComponent, "ath-sidebar", never, { "collapsed": { "alias": "collapsed"; "required": false; "isSignal": true; }; }, { "collapsed": "collapsedChange"; }, never, ["[slot=header]", "*", "[slot=footer]"], true, never>;
}
