import * as i0 from "@angular/core";
/**
 * Skeleton variants.
 *
 * - `line`: one line of text, as tall as the surrounding text's line box
 * - `row`: one list or table row (`--row-h`), full width
 * - `card`: one compact card (64px)
 * - `text` / `circular` / `rectangular`: free-form shapes sized by `width` / `height`
 */
export type SkeletonVariant = 'line' | 'row' | 'card' | 'text' | 'circular' | 'rectangular';
/**
 * Athene Skeleton
 *
 * A loading placeholder shaped like the content it stands in for, so the
 * page does not jump when the data arrives. Pulses gently; still under
 * `prefers-reduced-motion`.
 *
 * @example
 * <ath-skeleton variant="line" width="60%" />
 * <ath-skeleton variant="row" />
 * <ath-skeleton variant="circular" width="22px" height="22px" />
 */
export declare class AthSkeletonComponent {
    readonly variant: import("@angular/core").InputSignal<SkeletonVariant>;
    /** Width (CSS value). */
    readonly width: import("@angular/core").InputSignal<string>;
    /** Height (CSS value); the variant's own height when empty. */
    readonly height: import("@angular/core").InputSignal<string>;
    /** Pulse; off is also forced by `prefers-reduced-motion`. */
    readonly animated: import("@angular/core").InputSignal<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSkeletonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSkeletonComponent, "ath-skeleton", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; "animated": { "alias": "animated"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
/** Layout of `ath-skeleton-list`. */
export type SkeletonListVariant = 'row' | 'card' | 'card-grid';
/**
 * A list's or grid's loading state: `count` placeholders the size of real
 * rows (`--row-h`), cards (64px) or grid cards (168px), in a panel-like
 * frame. Announced once as "Loading" to assistive tech.
 *
 * @example
 * <ath-skeleton-list variant="row" [count]="8" />
 * <ath-skeleton-list variant="card-grid" [count]="6" />
 */
export declare class AthSkeletonListComponent {
    private readonly labels;
    readonly variant: import("@angular/core").InputSignal<SkeletonListVariant>;
    readonly count: import("@angular/core").InputSignal<number>;
    /** Accessible text; default `ATH_LABELS.loading`. */
    readonly label: import("@angular/core").InputSignal<string | null>;
    protected readonly indexes: import("@angular/core").Signal<number[]>;
    protected readonly loadingLabel: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSkeletonListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSkeletonListComponent, "ath-skeleton-list", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "count": { "alias": "count"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
/**
 * Skeleton Table Component
 *
 * Pre-built skeleton for table loading states
 */
export declare class AthSkeletonTableComponent {
    /** Number of rows */
    rows: number;
    /** Column widths in percent */
    columns: number[];
    get rowsArray(): number[];
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSkeletonTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSkeletonTableComponent, "ath-skeleton-table", never, { "rows": { "alias": "rows"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * Skeleton Card Component
 *
 * Pre-built skeleton for card loading states
 */
export declare class AthSkeletonCardComponent {
    /** Show image placeholder */
    showImage: boolean;
    /** Show action buttons */
    showActions: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSkeletonCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSkeletonCardComponent, "ath-skeleton-card", never, { "showImage": { "alias": "showImage"; "required": false; }; "showActions": { "alias": "showActions"; "required": false; }; }, {}, never, never, true, never>;
}
