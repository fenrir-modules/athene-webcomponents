import * as i0 from "@angular/core";
/** Path geometry of a sparkline, or `null` below two samples. */
export interface SparklineGeometry {
    linePath: string;
    areaPath: string;
    lastX: number;
    lastY: number;
}
/**
 * The line, area and last point for `values` in a `width` × `height` box
 * (1px inset, so the stroke is never clipped). Pure, for tests.
 */
export declare function sparklineGeometry(values: readonly number[], width: number, height: number): SparklineGeometry | null;
/**
 * Mini line chart: no axes, no labels, no charting library. A filled area
 * under a thin line and a dot on the latest value; nothing at all below
 * two samples (a cold-start dashboard has no trend yet). Decorative
 * (`aria-hidden`): the figure next to it carries the meaning.
 *
 * @example
 * <ath-sparkline [data]="[12, 14, 13, 18, 22, 20, 24]" color="var(--green)" />
 * <ath-sparkline [data]="trend" [width]="86" [height]="28" [showArea]="false" />
 */
export declare class AthSparklineComponent {
    /** Values to plot; fewer than two renders nothing. */
    readonly data: import("@angular/core").InputSignal<readonly number[] | null | undefined>;
    /** Width in px (the KPI tile's footprint by default). */
    readonly width: import("@angular/core").InputSignal<number>;
    /** Height in px. */
    readonly height: import("@angular/core").InputSignal<number>;
    /** Any CSS colour, e.g. `var(--green)`. */
    readonly color: import("@angular/core").InputSignal<string>;
    /** Dot on the most recent value. */
    readonly showDot: import("@angular/core").InputSignal<boolean>;
    /** Translucent area under the line. */
    readonly showArea: import("@angular/core").InputSignal<boolean>;
    /** Stroke width in px. */
    readonly strokeWidth: import("@angular/core").InputSignal<number>;
    protected readonly geometry: import("@angular/core").Signal<SparklineGeometry | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSparklineComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSparklineComponent, "ath-sparkline", never, { "data": { "alias": "data"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "showDot": { "alias": "showDot"; "required": false; "isSignal": true; }; "showArea": { "alias": "showArea"; "required": false; "isSignal": true; }; "strokeWidth": { "alias": "strokeWidth"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
