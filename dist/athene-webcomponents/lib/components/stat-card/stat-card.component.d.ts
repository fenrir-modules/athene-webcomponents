import { type KpiDeltaDirection } from '../kpi-tile';
import * as i0 from "@angular/core";
/**
 * A single label/value card.
 *
 * @deprecated One KPI API: use `ath-kpi-tile` inside `ath-kpi-strip`. This
 * renders exactly that (a strip of one tile) and maps the old inputs:
 * `subValue` → `note`, `sparkData` → `spark`, `trend` → a "↑"/"↓" delta.
 * Removed in quality step 2.7.
 *
 * @example
 * <ath-stat-card label="Open" value="42" delta="+5" deltaDirection="up" />
 */
export declare class AthStatCardComponent {
    readonly label: import("@angular/core").InputSignal<string>;
    readonly value: import("@angular/core").InputSignal<string | number>;
    readonly subValue: import("@angular/core").InputSignal<string>;
    readonly trend: import("@angular/core").InputSignal<"up" | "down" | null>;
    readonly delta: import("@angular/core").InputSignal<string | null>;
    readonly deltaDirection: import("@angular/core").InputSignal<KpiDeltaDirection | null>;
    readonly sparkData: import("@angular/core").InputSignal<readonly number[] | null>;
    readonly sparkColor: import("@angular/core").InputSignal<string | null>;
    protected readonly shownDelta: import("@angular/core").Signal<string | null>;
    protected readonly shownDirection: import("@angular/core").Signal<KpiDeltaDirection | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthStatCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthStatCardComponent, "ath-stat-card", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "subValue": { "alias": "subValue"; "required": false; "isSignal": true; }; "trend": { "alias": "trend"; "required": false; "isSignal": true; }; "delta": { "alias": "delta"; "required": false; "isSignal": true; }; "deltaDirection": { "alias": "deltaDirection"; "required": false; "isSignal": true; }; "sparkData": { "alias": "sparkData"; "required": false; "isSignal": true; }; "sparkColor": { "alias": "sparkColor"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
