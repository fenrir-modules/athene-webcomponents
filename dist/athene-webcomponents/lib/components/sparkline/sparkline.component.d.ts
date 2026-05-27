import * as i0 from "@angular/core";
/**
 * Mini line chart, no axes, no labels.
 *
 * @example
 * <ath-sparkline [data]="[12, 14, 13, 18, 22, 20, 24]" color="var(--accent)" />
 * <ath-sparkline [data]="trend" [width]="86" [height]="28" [showArea]="false" />
 */
export declare class AthSparklineComponent {
    private readonly _data;
    /** Numeric values to plot. Minimum 2 points; fewer renders nothing. */
    set data(value: number[] | null | undefined);
    get data(): number[];
    /** Width in px. */
    width: number;
    /** Height in px. */
    height: number;
    /** Stroke color — any CSS color (e.g., `var(--accent)`, `#16a34a`). */
    color: string;
    /** Show a dot at the most recent value. */
    showDot: boolean;
    /** Render a translucent filled area below the line. */
    showArea: boolean;
    /** Stroke width in px. */
    strokeWidth: number;
    protected readonly geometry: import("@angular/core").Signal<{
        linePath: string;
        areaPath: string;
        lastX: number;
        lastY: number;
    } | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSparklineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSparklineComponent, "ath-sparkline", never, { "data": { "alias": "data"; "required": false; }; "width": { "alias": "width"; "required": false; }; "height": { "alias": "height"; "required": false; }; "color": { "alias": "color"; "required": false; }; "showDot": { "alias": "showDot"; "required": false; }; "showArea": { "alias": "showArea"; "required": false; }; "strokeWidth": { "alias": "strokeWidth"; "required": false; }; }, {}, never, never, true, never>;
}
