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
    /** Spinner size */
    size: SpinnerSize;
    get spinnerClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSpinnerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSpinnerComponent, "ath-spinner", never, { "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}
