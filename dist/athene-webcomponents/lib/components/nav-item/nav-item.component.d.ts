import * as i0 from "@angular/core";
/**
 * Athene Nav Item Component
 *
 * Navigation item for sidebar with icon, label and active state.
 *
 * @example
 * <ath-nav-item [icon]="homeIcon" label="Overview" link="/admin/overview" />
 * <ath-nav-item [icon]="flagIcon" label="Feature Flags" link="/admin/feature-flags" />
 */
export declare class AthNavItemComponent {
    /** Lucide icon */
    icon: any;
    /** Nav item label */
    label: string;
    /** Router link */
    link: string;
    /** Whether the sidebar is collapsed */
    collapsed: boolean;
    /** Badge count (optional) */
    badgeCount: number | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthNavItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthNavItemComponent, "ath-nav-item", never, { "icon": { "alias": "icon"; "required": false; }; "label": { "alias": "label"; "required": false; }; "link": { "alias": "link"; "required": false; }; "collapsed": { "alias": "collapsed"; "required": false; }; "badgeCount": { "alias": "badgeCount"; "required": false; }; }, {}, never, never, true, never>;
}
