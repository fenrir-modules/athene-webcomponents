import * as i0 from "@angular/core";
export type SlaStatus = 'met' | 'pending' | 'breached';
export interface SlaTarget {
    /** Display label (e.g., "Response", "Resolution"). */
    label: string;
    /** Status of this SLA. */
    status: SlaStatus;
    /** Pre-formatted detail text (e.g., "met · 24m", "6h 12m left"). */
    text: string;
}
/**
 * SLA progress widget. Two rows (response + resolution) and a progress bar
 * for the active (pending) one.
 *
 * The color of the bar transitions:
 *   < 80% → green / accent
 *   80-95% → amber (warn)
 *   ≥ 95% → red (breach)
 *
 * @example
 * <ath-sla-bar
 *   [response]="{label:'Response',  status:'met',     text:'met · 24m'}"
 *   [resolution]="{label:'Resolution', status:'pending', text:'6h 12m left'}"
 *   [progressPct]="68" />
 */
export declare class AthSlaBarComponent {
    readonly response: import("@angular/core").InputSignal<SlaTarget | null>;
    readonly resolution: import("@angular/core").InputSignal<SlaTarget | null>;
    /** 0..100 (clamped). The progress bar reflects the most "at risk" target. */
    readonly progressPct: import("@angular/core").InputSignalWithTransform<number, unknown>;
    protected readonly severity: import("@angular/core").Signal<SlaStatus>;
    /** The target the bar is labelled by: resolution, else response. */
    protected readonly barTarget: import("@angular/core").Signal<SlaTarget | null>;
    protected statusColor(s: SlaStatus): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSlaBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSlaBarComponent, "ath-sla-bar", never, { "response": { "alias": "response"; "required": false; "isSignal": true; }; "resolution": { "alias": "resolution"; "required": false; "isSignal": true; }; "progressPct": { "alias": "progressPct"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
