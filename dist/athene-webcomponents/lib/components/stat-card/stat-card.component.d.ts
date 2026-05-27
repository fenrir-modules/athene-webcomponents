import * as i0 from "@angular/core";
/**
 * Stat card with label + value, optional trend arrow, optional delta badge,
 * optional sparkline.
 *
 * For dashboard-style KPI tiles prefer `<ath-kpi-tile>`. This stays as the
 * simpler label/value/sub primitive.
 *
 * @example
 * <ath-stat-card label="Total Users" value="1,234" />
 * <ath-stat-card label="Active" value="89%" trend="up" />
 * <ath-stat-card label="Open" value="42" delta="+5" deltaDirection="up"
 *                [sparkData]="[10,12,15,18,22,28,30]" />
 */
export declare class AthStatCardComponent {
    label: string;
    value: string | number;
    subValue: string;
    /** Quick up/down arrow. Use delta+deltaDirection for richer badges. */
    trend: 'up' | 'down' | null;
    /** Delta text (e.g., `+12`, `-3`). Displayed as colored badge. */
    delta: string | null;
    /** Color cue for the delta badge. */
    deltaDirection: 'up' | 'down' | 'neutral' | null;
    /** Optional sparkline data — min 2 points. */
    sparkData: number[] | null;
    sparkColor: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthStatCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthStatCardComponent, "ath-stat-card", never, { "label": { "alias": "label"; "required": true; }; "value": { "alias": "value"; "required": true; }; "subValue": { "alias": "subValue"; "required": false; }; "trend": { "alias": "trend"; "required": false; }; "delta": { "alias": "delta"; "required": false; }; "deltaDirection": { "alias": "deltaDirection"; "required": false; }; "sparkData": { "alias": "sparkData"; "required": false; }; "sparkColor": { "alias": "sparkColor"; "required": false; }; }, {}, never, never, true, never>;
}
