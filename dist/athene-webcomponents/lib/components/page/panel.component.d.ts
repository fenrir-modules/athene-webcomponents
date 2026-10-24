import * as i0 from "@angular/core";
/**
 * A panel: surface, hairline border, `--panel-radius`, and an optional
 * head row (`--panel-head-h`) with title, projected head content, a count
 * and actions. The body takes the panel's height and scrolls inside it
 * when the panel is stretched by `ath-panel-grid` or a fill page.
 *
 * Slots: `[athPanelHead]` (after the title), `[athPanelActions]` (right),
 * default (body), `[athPanelFoot]` (under the body). The head row is drawn
 * only when it has something in it.
 *
 * @example
 * <ath-panel title="Active tickets" [count]="'5 open'">
 *   <ath-button athPanelActions variant="ghost" size="xs">Filter</ath-button>
 *   …rows…
 * </ath-panel>
 * <ath-panel title="Activity" [loading]="loading()" [padded]="true">…</ath-panel>
 */
export declare class AthPanelComponent {
    readonly title: import("@angular/core").InputSignal<string | null | undefined>;
    /** Heading level of the title (2 under a page's h1). */
    readonly level: import("@angular/core").InputSignal<2 | 3>;
    /** Quiet count at the head's right ("5 open", 12). */
    readonly count: import("@angular/core").InputSignal<string | number | null | undefined>;
    /** Pad the body with `--panel-pad-y` / `--panel-pad-x` (off for tables and lists). */
    readonly padded: import("@angular/core").InputSignal<boolean>;
    /** Let the body scroll when the panel is shorter than its content. */
    readonly scroll: import("@angular/core").InputSignal<boolean>;
    /** Rows placeholder instead of the content. */
    readonly loading: import("@angular/core").InputSignal<boolean>;
    readonly skeletonRows: import("@angular/core").InputSignal<number>;
    /** Columns / rows this panel spans in an `ath-panel-grid` (1–4). */
    readonly colSpan: import("@angular/core").InputSignal<number>;
    readonly rowSpan: import("@angular/core").InputSignal<number>;
    protected readonly rows: import("@angular/core").Signal<number[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPanelComponent, "ath-panel", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "level": { "alias": "level"; "required": false; "isSignal": true; }; "count": { "alias": "count"; "required": false; "isSignal": true; }; "padded": { "alias": "padded"; "required": false; "isSignal": true; }; "scroll": { "alias": "scroll"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; "skeletonRows": { "alias": "skeletonRows"; "required": false; "isSignal": true; }; "colSpan": { "alias": "colSpan"; "required": false; "isSignal": true; }; "rowSpan": { "alias": "rowSpan"; "required": false; "isSignal": true; }; }, {}, never, ["[athPanelHead]", "[athPanelActions]", "*", "[athPanelFoot]"], true, never>;
}
