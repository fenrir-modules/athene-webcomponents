import * as i0 from "@angular/core";
/**
 * Athene Stat Card Component
 *
 * Display metrics and statistics with label and value.
 *
 * @example
 * <ath-stat-card label="Total Users" value="1,234" />
 * <ath-stat-card label="Active" value="89%" trend="up" />
 */
export declare class AthStatCardComponent {
    /** Stat label */
    label: string;
    /** Stat value */
    value: string | number;
    /** Optional sub-value or additional info */
    subValue: string;
    /** Trend direction */
    trend: 'up' | 'down' | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthStatCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthStatCardComponent, "ath-stat-card", never, { "label": { "alias": "label"; "required": true; }; "value": { "alias": "value"; "required": true; }; "subValue": { "alias": "subValue"; "required": false; }; "trend": { "alias": "trend"; "required": false; }; }, {}, never, never, true, never>;
}
