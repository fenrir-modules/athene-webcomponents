import * as i0 from "@angular/core";
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';
/**
 * Athene Divider Component
 *
 * Visual separator for content sections.
 *
 * @example
 * <ath-divider />
 * <ath-divider spacing="lg" />
 * <ath-divider orientation="vertical" />
 */
export declare class AthDividerComponent {
    /** Orientation */
    readonly orientation: import("@angular/core").InputSignal<DividerOrientation>;
    /** Spacing around the divider */
    readonly spacing: import("@angular/core").InputSignal<DividerSpacing>;
    protected readonly dividerClasses: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthDividerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthDividerComponent, "ath-divider", never, { "orientation": { "alias": "orientation"; "required": false; "isSignal": true; }; "spacing": { "alias": "spacing"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
