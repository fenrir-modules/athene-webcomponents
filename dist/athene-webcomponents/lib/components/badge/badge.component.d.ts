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
    variant: BadgeVariant;
    /** Show dot indicator */
    dot: boolean;
    get badgeClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthBadgeComponent, "ath-badge", never, { "variant": { "alias": "variant"; "required": false; }; "dot": { "alias": "dot"; "required": false; }; }, {}, never, ["*"], true, never>;
}
