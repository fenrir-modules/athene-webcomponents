import * as i0 from "@angular/core";
/**
 * Skeleton variant types
 */
export type SkeletonVariant = 'text' | 'circular' | 'rectangular';
/**
 * Athene Skeleton Component
 *
 * Loading placeholder for content
 *
 * @example
 * <ath-skeleton variant="text" width="200px" />
 * <ath-skeleton variant="circular" width="48px" height="48px" />
 * <ath-skeleton variant="rectangular" height="200px" />
 */
export declare class AthSkeletonComponent {
    /** Skeleton variant */
    variant: SkeletonVariant;
    /** Width (CSS value) */
    width: string;
    /** Height (CSS value) */
    height: string;
    /** Animation enabled */
    animated: boolean;
    get skeletonClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSkeletonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSkeletonComponent, "ath-skeleton", never, { "variant": { "alias": "variant"; "required": false; }; "width": { "alias": "width"; "required": false; }; "height": { "alias": "height"; "required": false; }; "animated": { "alias": "animated"; "required": false; }; }, {}, never, never, true, never>;
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
