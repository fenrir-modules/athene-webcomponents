import * as i0 from "@angular/core";
/**
 * Badge variant types
 */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'muted';
/**
 * Athene Badge Component
 *
 * Status badges for tables, lists and inline indicators.
 *
 * @example
 * <ath-badge variant="success">Active</ath-badge>
 * <ath-badge variant="error">Revoked</ath-badge>
 */
export declare class AthBadgeComponent {
    /** Badge variant */
    readonly variant: import("@angular/core").InputSignal<BadgeVariant>;
    /** Show dot indicator */
    readonly dot: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected readonly badgeClasses: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthBadgeComponent, "ath-badge", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "dot": { "alias": "dot"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
