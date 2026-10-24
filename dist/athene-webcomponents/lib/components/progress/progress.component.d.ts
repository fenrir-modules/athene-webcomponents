import * as i0 from "@angular/core";
export type ProgressTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';
export type ProgressSize = 'xs' | 'sm' | 'md';
/**
 * Generic progress bar. Used for milestones, subtasks, sprint burn,
 * upload progress, etc.
 *
 * @example
 * <ath-progress [value]="62" />
 * <ath-progress [value]="80" tone="warning" size="md" [showLabel]="true" />
 * <ath-progress [value]="40" [total]="50" [showLabel]="true" />
 */
export declare class AthProgressComponent {
    /** Current value. When `total` is unset, treated as a percentage (0..100). Negative counts as 0. */
    readonly value: import("@angular/core").InputSignalWithTransform<number, unknown>;
    /** Total (denominator). If unset, `value` is a percent. */
    readonly total: import("@angular/core").InputSignal<number | null>;
    readonly tone: import("@angular/core").InputSignal<ProgressTone>;
    readonly size: import("@angular/core").InputSignal<ProgressSize>;
    /** Show a small `X / Y` (or `X%`) label next to the bar. */
    readonly showLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Optional aria-label for screen readers. */
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    protected readonly pct: import("@angular/core").Signal<number>;
    protected readonly label: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthProgressComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthProgressComponent, "ath-progress", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "total": { "alias": "total"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "showLabel": { "alias": "showLabel"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
