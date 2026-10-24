import * as i0 from "@angular/core";
/**
 * Spinner size variants
 */
export type SpinnerSize = 'sm' | 'md' | 'lg';
/**
 * Athene Spinner Component
 *
 * Loading indicator for async operations.
 *
 * @example
 * <ath-spinner />
 * <ath-spinner size="lg" />
 */
export declare class AthSpinnerComponent {
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    /** Spinner size */
    readonly size: import("@angular/core").InputSignal<SpinnerSize>;
    protected readonly spinnerClasses: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSpinnerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSpinnerComponent, "ath-spinner", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
