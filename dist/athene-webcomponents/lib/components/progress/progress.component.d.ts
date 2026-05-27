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
    private readonly _value;
    /** Current value. When `total` is unset, treated as a percentage (0..100). */
    set value(v: number);
    get value(): number;
    /** Total (denominator). If unset, `value` is a percent. */
    total: number | null;
    tone: ProgressTone;
    size: ProgressSize;
    /** Show a small `X / Y` (or `X%`) label next to the bar. */
    showLabel: boolean;
    /** Optional aria-label for screen readers. */
    ariaLabel: string | null;
    get hostTone(): ProgressTone;
    get hostSize(): ProgressSize;
    protected readonly pct: import("@angular/core").Signal<number>;
    protected readonly label: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthProgressComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthProgressComponent, "ath-progress", never, { "value": { "alias": "value"; "required": false; }; "total": { "alias": "total"; "required": false; }; "tone": { "alias": "tone"; "required": false; }; "size": { "alias": "size"; "required": false; }; "showLabel": { "alias": "showLabel"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; }, {}, never, never, true, never>;
}
