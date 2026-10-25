import * as i0 from "@angular/core";
/** `ath-role-badge` sizes. */
export type RoleBadgeSize = 'sm' | 'md';
/**
 * A workspace role: a dot in the role's colour and its name. `locked`
 * adds a lock for the fixed roles (Owner, Admin), read out as "Fixed
 * role". An unknown colour draws the neutral dot.
 *
 * @example
 * <ath-role-badge name="Developer" color="blue" />
 * <ath-role-badge name="Owner" color="amber" [locked]="true" size="sm" />
 */
export declare class AthRoleBadgeComponent {
    private readonly labels;
    readonly name: import("@angular/core").InputSignal<string>;
    /** A palette token (`AthDecoColor`); anything else is neutral. */
    readonly color: import("@angular/core").InputSignal<string | null | undefined>;
    readonly size: import("@angular/core").InputSignal<RoleBadgeSize>;
    readonly locked: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected readonly lockIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly tone: import("@angular/core").Signal<import("../color-swatch/deco-color").AthDecoColor>;
    protected readonly lockedText: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthRoleBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthRoleBadgeComponent, "ath-role-badge", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "locked": { "alias": "locked"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
