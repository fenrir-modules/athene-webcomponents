import * as i0 from "@angular/core";
export type KpiDeltaDirection = 'up' | 'down' | 'neutral';
/**
 * Compact KPI widget for dashboards. Shows label + value + optional delta + sparkline.
 *
 * @example
 * <ath-kpi-tile label="Assigned" [value]="3" delta="+1" deltaDirection="up"
 *               [sparkData]="[12,14,13,18,22,20,24]" sparkColor="var(--accent)" />
 */
export declare class AthKpiTileComponent {
    label: string;
    value: number | string;
    /** Free-form delta text (e.g., `+12`, `-2`, ` 0`). */
    delta: string | null;
    /** Influences color of the delta badge. */
    deltaDirection: KpiDeltaDirection | null;
    /** Optional sparkline data — at least 2 points. */
    sparkData: number[] | null;
    /** Sparkline color (any CSS color). */
    sparkColor: string;
    /** Hides the value's color emphasis (useful for empty/loading state). */
    muted: boolean;
    get hostMuted(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthKpiTileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthKpiTileComponent, "ath-kpi-tile", never, { "label": { "alias": "label"; "required": true; }; "value": { "alias": "value"; "required": true; }; "delta": { "alias": "delta"; "required": false; }; "deltaDirection": { "alias": "deltaDirection"; "required": false; }; "sparkData": { "alias": "sparkData"; "required": false; }; "sparkColor": { "alias": "sparkColor"; "required": false; }; "muted": { "alias": "muted"; "required": false; }; }, {}, never, never, true, never>;
}
