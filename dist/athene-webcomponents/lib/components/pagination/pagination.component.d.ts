import * as i0 from "@angular/core";
export type PaginationMode = 'numbered' | 'cursor';
/**
 * Pagination control. Two modes:
 *  - `numbered`: Prev / 1 / 2 / 3 / … / N / Next  (requires `totalPages`)
 *  - `cursor`:   ← Previous · "Showing X–Y of Z" · Next →  (use `hasPrev`/`hasNext`)
 *
 * Cursor mode is preferred for large datasets where `totalPages` is unknown
 * (e.g., Meilisearch results, infinite-scroll alternatives).
 *
 * @example
 * <ath-pagination [page]="page" [totalPages]="20" (pageChange)="page = $event" />
 * <ath-pagination mode="cursor" [hasPrev]="false" [hasNext]="true"
 *   summary="Showing 1–30 of 412" (previous)="loadPrev()" (next)="loadNext()" />
 */
export declare class AthPaginationComponent {
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    protected pageLabel(page: number | string): string;
    readonly mode: import("@angular/core").InputSignal<PaginationMode>;
    /** Current page (1-based); values below 1 count as 1. */
    readonly page: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly totalPages: import("@angular/core").InputSignalWithTransform<number, unknown>;
    /** How many siblings of the current page to always show (default 1). */
    readonly siblingCount: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly pageChange: import("@angular/core").OutputEmitterRef<number>;
    readonly hasPrev: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly hasNext: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Caption shown between prev/next in cursor mode (e.g., "1–30 of 412"). */
    readonly summary: import("@angular/core").InputSignal<string>;
    readonly previous: import("@angular/core").OutputEmitterRef<void>;
    readonly next: import("@angular/core").OutputEmitterRef<void>;
    protected readonly prevIcon: import("lucide").IconNode;
    protected readonly nextIcon: import("lucide").IconNode;
    protected readonly firstIcon: import("lucide").IconNode;
    protected readonly lastIcon: import("lucide").IconNode;
    protected readonly ellipsisIcon: import("lucide").IconNode;
    protected readonly pages: import("@angular/core").Signal<(number | "ellipsis")[]>;
    goTo(page: number): void;
    goPrev(): void;
    goNext(): void;
    goFirst(): void;
    goLast(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPaginationComponent, "ath-pagination", never, { "mode": { "alias": "mode"; "required": false; "isSignal": true; }; "page": { "alias": "page"; "required": false; "isSignal": true; }; "totalPages": { "alias": "totalPages"; "required": false; "isSignal": true; }; "siblingCount": { "alias": "siblingCount"; "required": false; "isSignal": true; }; "hasPrev": { "alias": "hasPrev"; "required": false; "isSignal": true; }; "hasNext": { "alias": "hasNext"; "required": false; "isSignal": true; }; "summary": { "alias": "summary"; "required": false; "isSignal": true; }; }, { "pageChange": "pageChange"; "previous": "previous"; "next": "next"; }, never, never, true, never>;
}
