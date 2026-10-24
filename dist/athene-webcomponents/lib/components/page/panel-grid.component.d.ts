import * as i0 from "@angular/core";
/**
 * Column presets of `ath-panel-grid`; any other string is used as
 * `grid-template-columns` as given.
 */
export type PanelGridColumns = '1' | '2' | '3' | '4' | 'main-side' | 'side-main' | (string & {});
/**
 * - `fill` (default): rows share the height. In a fill page each row gets
 *   an equal part and the panels scroll inside; in a scroll page rows are
 *   as tall as their content and stretch to the bottom when it is short.
 * - `auto`: natural row heights, no stretching.
 * - any other string: `grid-template-rows` as given (e.g. `auto minmax(0, 1fr)`).
 */
export type PanelGridRows = 'fill' | 'auto' | (string & {});
/** The `grid-template-columns` for a preset or a custom template. */
export declare function panelGridColumns(columns: PanelGridColumns): string;
/**
 * Panels in rows that share their height: every panel in a row is as tall
 * as the row (no height mismatch between neighbours), the rows fill the
 * page body, and a panel's body scrolls inside it when the row is shorter.
 * Narrower than 720px (its own width, a container query) the grid stacks
 * into one column with natural heights, and the page scrolls.
 *
 * Panels span columns or rows with `ath-panel [colSpan]` / `[rowSpan]`.
 *
 * @example
 * <ath-panel-grid columns="main-side">
 *   <ath-panel title="Active tickets">…</ath-panel>
 *   <ath-panel title="Due this week">…</ath-panel>
 * </ath-panel-grid>
 * <ath-panel-grid columns="2" rows="auto minmax(0, 1fr)">…</ath-panel-grid>
 */
export declare class AthPanelGridComponent {
    readonly columns: import("@angular/core").InputSignal<PanelGridColumns>;
    readonly rows: import("@angular/core").InputSignal<PanelGridRows>;
    protected readonly templateColumns: import("@angular/core").Signal<string>;
    protected readonly rowsMode: import("@angular/core").Signal<PanelGridRows | "custom">;
    protected readonly templateRows: import("@angular/core").Signal<PanelGridRows | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPanelGridComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPanelGridComponent, "ath-panel-grid", never, { "columns": { "alias": "columns"; "required": false; "isSignal": true; }; "rows": { "alias": "rows"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
