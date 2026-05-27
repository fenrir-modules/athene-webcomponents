import { EventEmitter } from '@angular/core';
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
    mode: PaginationMode;
    private readonly _page;
    set page(v: number);
    get page(): number;
    totalPages: number;
    /** How many siblings of the current page to always show (default 1). */
    siblingCount: number;
    pageChange: EventEmitter<number>;
    hasPrev: boolean;
    hasNext: boolean;
    /** Caption shown between prev/next in cursor mode (e.g., "1–30 of 412"). */
    summary: string;
    previous: EventEmitter<void>;
    next: EventEmitter<void>;
    protected readonly prevIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly nextIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly firstIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly lastIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly ellipsisIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly pages: import("@angular/core").Signal<(number | "ellipsis")[]>;
    goTo(page: number): void;
    goPrev(): void;
    goNext(): void;
    goFirst(): void;
    goLast(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPaginationComponent, "ath-pagination", never, { "mode": { "alias": "mode"; "required": false; }; "page": { "alias": "page"; "required": false; }; "totalPages": { "alias": "totalPages"; "required": false; }; "siblingCount": { "alias": "siblingCount"; "required": false; }; "hasPrev": { "alias": "hasPrev"; "required": false; }; "hasNext": { "alias": "hasNext"; "required": false; }; "summary": { "alias": "summary"; "required": false; }; }, { "pageChange": "pageChange"; "previous": "previous"; "next": "next"; }, never, never, true, never>;
}
