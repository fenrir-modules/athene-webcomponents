import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-angular';
import { formatAthLabel, injectAthLabels } from '../../i18n/labels';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
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
export class AthPaginationComponent {
    constructor() {
        this.labels = injectAthLabels();
        this.mode = 'numbered';
        // --- Numbered mode ---
        this._page = signal(1);
        this.totalPages = 1;
        /** How many siblings of the current page to always show (default 1). */
        this.siblingCount = 1;
        this.pageChange = new EventEmitter();
        // --- Cursor mode ---
        this.hasPrev = false;
        this.hasNext = false;
        /** Caption shown between prev/next in cursor mode (e.g., "1–30 of 412"). */
        this.summary = '';
        this.previous = new EventEmitter();
        this.next = new EventEmitter();
        this.prevIcon = ChevronLeft;
        this.nextIcon = ChevronRight;
        this.firstIcon = ChevronsLeft;
        this.lastIcon = ChevronsRight;
        this.ellipsisIcon = MoreHorizontal;
        this.pages = computed(() => {
            const total = Math.max(1, this.totalPages);
            const current = this._page();
            const siblings = Math.max(0, this.siblingCount);
            // Always show first + last; show siblings around current; gaps → ellipsis
            if (total <= 5 + siblings * 2) {
                return range(1, total);
            }
            const leftSibling = Math.max(current - siblings, 2);
            const rightSibling = Math.min(current + siblings, total - 1);
            const showLeftEllipsis = leftSibling > 3;
            const showRightEllipsis = rightSibling < total - 2;
            const result = [1];
            if (showLeftEllipsis) {
                result.push('ellipsis');
            }
            else {
                for (let i = 2; i < leftSibling; i++)
                    result.push(i);
            }
            for (let i = leftSibling; i <= rightSibling; i++)
                result.push(i);
            if (showRightEllipsis) {
                result.push('ellipsis');
            }
            else {
                for (let i = rightSibling + 1; i < total; i++)
                    result.push(i);
            }
            result.push(total);
            return result;
        });
    }
    pageLabel(page) {
        return formatAthLabel(this.labels.pageNumber(), { page });
    }
    set page(v) {
        this._page.set(Math.max(1, v));
    }
    get page() {
        return this._page();
    }
    goTo(page) {
        if (page < 1 || page > this.totalPages || page === this._page())
            return;
        this.pageChange.emit(page);
    }
    goPrev() {
        if (this.mode === 'cursor') {
            if (this.hasPrev)
                this.previous.emit();
        }
        else {
            this.goTo(this._page() - 1);
        }
    }
    goNext() {
        if (this.mode === 'cursor') {
            if (this.hasNext)
                this.next.emit();
        }
        else {
            this.goTo(this._page() + 1);
        }
    }
    goFirst() {
        this.goTo(1);
    }
    goLast() {
        this.goTo(this.totalPages);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPaginationComponent, isStandalone: true, selector: "ath-pagination", inputs: { mode: "mode", page: "page", totalPages: "totalPages", siblingCount: "siblingCount", hasPrev: "hasPrev", hasNext: "hasNext", summary: "summary" }, outputs: { pageChange: "pageChange", previous: "previous", next: "next" }, ngImport: i0, template: "@if (mode === 'numbered') {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"labels.pageFirst()\"\n    (click)=\"goFirst()\"\n  >\n    <lucide-icon [img]=\"firstIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"labels.pagePrevious()\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n  </button>\n\n  @for (item of pages(); track $index) {\n    @if (item === 'ellipsis') {\n      <span class=\"ath-page__ellipsis\" aria-hidden=\"true\">\n        <lucide-icon [img]=\"ellipsisIcon\" [size]=\"12\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        class=\"ath-page__btn\"\n        [class.ath-page__btn--active]=\"item === page\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"pageLabel(item)\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"labels.pageNext()\"\n    (click)=\"goNext()\"\n  >\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"labels.pageLast()\"\n    (click)=\"goLast()\"\n  >\n    <lucide-icon [img]=\"lastIcon\" [size]=\"14\" />\n  </button>\n} @else {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasPrev\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n    <span>{{ labels.previous() }}</span>\n  </button>\n  @if (summary) {\n    <span class=\"ath-page__summary\">{{ summary }}</span>\n  }\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasNext\"\n    (click)=\"goNext()\"\n  >\n    <span>{{ labels.next() }}</span>\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans)}.ath-page__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:28px;height:28px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;font-feature-settings:\"tnum\";color:var(--fg-2);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast)}.ath-page__btn:hover:not(:disabled):not(.ath-page__btn--active){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-page__btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-page__btn:disabled{opacity:.4;cursor:not-allowed}.ath-page__btn--nav{padding:0;width:28px;color:var(--fg-3)}.ath-page__btn--cursor{padding:0 10px}.ath-page__btn--active{background:var(--action-primary-bg);border-color:var(--action-primary-bg);color:var(--action-primary-fg);cursor:default}.ath-page__ellipsis{display:inline-flex;align-items:center;justify-content:center;width:20px;color:var(--fg-4)}.ath-page__summary{margin:0 8px;font-size:12px;color:var(--fg-3);font-feature-settings:\"tnum\"}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-pagination', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (mode === 'numbered') {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"labels.pageFirst()\"\n    (click)=\"goFirst()\"\n  >\n    <lucide-icon [img]=\"firstIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"labels.pagePrevious()\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n  </button>\n\n  @for (item of pages(); track $index) {\n    @if (item === 'ellipsis') {\n      <span class=\"ath-page__ellipsis\" aria-hidden=\"true\">\n        <lucide-icon [img]=\"ellipsisIcon\" [size]=\"12\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        class=\"ath-page__btn\"\n        [class.ath-page__btn--active]=\"item === page\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"pageLabel(item)\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"labels.pageNext()\"\n    (click)=\"goNext()\"\n  >\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"labels.pageLast()\"\n    (click)=\"goLast()\"\n  >\n    <lucide-icon [img]=\"lastIcon\" [size]=\"14\" />\n  </button>\n} @else {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasPrev\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n    <span>{{ labels.previous() }}</span>\n  </button>\n  @if (summary) {\n    <span class=\"ath-page__summary\">{{ summary }}</span>\n  }\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasNext\"\n    (click)=\"goNext()\"\n  >\n    <span>{{ labels.next() }}</span>\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans)}.ath-page__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:28px;height:28px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;font-feature-settings:\"tnum\";color:var(--fg-2);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast)}.ath-page__btn:hover:not(:disabled):not(.ath-page__btn--active){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-page__btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-page__btn:disabled{opacity:.4;cursor:not-allowed}.ath-page__btn--nav{padding:0;width:28px;color:var(--fg-3)}.ath-page__btn--cursor{padding:0 10px}.ath-page__btn--active{background:var(--action-primary-bg);border-color:var(--action-primary-bg);color:var(--action-primary-fg);cursor:default}.ath-page__ellipsis{display:inline-flex;align-items:center;justify-content:center;width:20px;color:var(--fg-4)}.ath-page__summary{margin:0 8px;font-size:12px;color:var(--fg-3);font-feature-settings:\"tnum\"}\n"] }]
        }], propDecorators: { mode: [{
                type: Input
            }], page: [{
                type: Input
            }], totalPages: [{
                type: Input
            }], siblingCount: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], hasPrev: [{
                type: Input
            }], hasNext: [{
                type: Input
            }], summary: [{
                type: Input
            }], previous: [{
                type: Output
            }], next: [{
                type: Output
            }] } });
function range(from, to) {
    const out = [];
    for (let i = from; i <= to; i++)
        out.push(i);
    return out;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdILE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQUlwRTs7Ozs7Ozs7Ozs7O0dBWUc7QUFTSCxNQUFNLE9BQU8sc0JBQXNCO0lBUm5DO1FBU3FCLFdBQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQztRQU1yQyxTQUFJLEdBQW1CLFVBQVUsQ0FBQztRQUUzQyx3QkFBd0I7UUFDUCxVQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBVTFCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFeEIsd0VBQXdFO1FBQy9ELGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRWxELHNCQUFzQjtRQUNiLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUV6Qiw0RUFBNEU7UUFDbkUsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUVaLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3BDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXZCLGFBQVEsR0FBRyxXQUFXLENBQUM7UUFDdkIsYUFBUSxHQUFHLFlBQVksQ0FBQztRQUN4QixjQUFTLEdBQUcsWUFBWSxDQUFDO1FBQ3pCLGFBQVEsR0FBRyxhQUFhLENBQUM7UUFDekIsaUJBQVksR0FBRyxjQUFjLENBQUM7UUFFOUIsVUFBSyxHQUFHLFFBQVEsQ0FBMEIsR0FBRyxFQUFFO1lBQ2hFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRWhELDBFQUEwRTtZQUMxRSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUM5QixPQUFPLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekIsQ0FBQztZQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxRQUFRLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sZ0JBQWdCLEdBQUcsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUN6QyxNQUFNLGlCQUFpQixHQUFHLFlBQVksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBRW5ELE1BQU0sTUFBTSxHQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxQixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUU7b0JBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxJQUFJLFlBQVksRUFBRSxDQUFDLEVBQUU7Z0JBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLEtBQUssSUFBSSxDQUFDLEdBQUcsWUFBWSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRTtvQkFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0tBOEJKO0lBbkdXLFNBQVMsQ0FBQyxJQUFxQjtRQUN2QyxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBT0QsSUFDSSxJQUFJLENBQUMsQ0FBUztRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBd0RELElBQUksQ0FBQyxJQUFZO1FBQ2YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQUUsT0FBTztRQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUMzQixJQUFJLElBQUksQ0FBQyxPQUFPO2dCQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTztnQkFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JDLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNmLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0IsQ0FBQzsrR0FyR1Usc0JBQXNCO21HQUF0QixzQkFBc0IsaVRDNUJuQyx1ckVBZ0ZBLGd6Q0R6RFksWUFBWSw4QkFBRSxtQkFBbUI7OzRGQUtoQyxzQkFBc0I7a0JBUmxDLFNBQVM7K0JBQ0UsZ0JBQWdCLGNBQ2QsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDLG1CQUMzQix1QkFBdUIsQ0FBQyxNQUFNOzhCQVd0QyxJQUFJO3NCQUFaLEtBQUs7Z0JBTUYsSUFBSTtzQkFEUCxLQUFLO2dCQVFHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBR0csWUFBWTtzQkFBcEIsS0FBSztnQkFFSSxVQUFVO3NCQUFuQixNQUFNO2dCQUdFLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUVJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csSUFBSTtzQkFBYixNQUFNOztBQXFFVCxTQUFTLEtBQUssQ0FBQyxJQUFZLEVBQUUsRUFBVTtJQUNyQyxNQUFNLEdBQUcsR0FBYSxFQUFFLENBQUM7SUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUU7UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgY29tcHV0ZWQsIHNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUsIENoZXZyb25MZWZ0LCBDaGV2cm9uUmlnaHQsIENoZXZyb25zTGVmdCwgQ2hldnJvbnNSaWdodCwgTW9yZUhvcml6b250YWwgfSBmcm9tICdsdWNpZGUtYW5ndWxhcic7XG5pbXBvcnQgeyBmb3JtYXRBdGhMYWJlbCwgaW5qZWN0QXRoTGFiZWxzIH0gZnJvbSAnLi4vLi4vaTE4bi9sYWJlbHMnO1xuXG5leHBvcnQgdHlwZSBQYWdpbmF0aW9uTW9kZSA9ICdudW1iZXJlZCcgfCAnY3Vyc29yJztcblxuLyoqXG4gKiBQYWdpbmF0aW9uIGNvbnRyb2wuIFR3byBtb2RlczpcbiAqICAtIGBudW1iZXJlZGA6IFByZXYgLyAxIC8gMiAvIDMgLyDigKYgLyBOIC8gTmV4dCAgKHJlcXVpcmVzIGB0b3RhbFBhZ2VzYClcbiAqICAtIGBjdXJzb3JgOiAgIOKGkCBQcmV2aW91cyDCtyBcIlNob3dpbmcgWOKAk1kgb2YgWlwiIMK3IE5leHQg4oaSICAodXNlIGBoYXNQcmV2YC9gaGFzTmV4dGApXG4gKlxuICogQ3Vyc29yIG1vZGUgaXMgcHJlZmVycmVkIGZvciBsYXJnZSBkYXRhc2V0cyB3aGVyZSBgdG90YWxQYWdlc2AgaXMgdW5rbm93blxuICogKGUuZy4sIE1laWxpc2VhcmNoIHJlc3VsdHMsIGluZmluaXRlLXNjcm9sbCBhbHRlcm5hdGl2ZXMpLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXBhZ2luYXRpb24gW3BhZ2VdPVwicGFnZVwiIFt0b3RhbFBhZ2VzXT1cIjIwXCIgKHBhZ2VDaGFuZ2UpPVwicGFnZSA9ICRldmVudFwiIC8+XG4gKiA8YXRoLXBhZ2luYXRpb24gbW9kZT1cImN1cnNvclwiIFtoYXNQcmV2XT1cImZhbHNlXCIgW2hhc05leHRdPVwidHJ1ZVwiXG4gKiAgIHN1bW1hcnk9XCJTaG93aW5nIDHigJMzMCBvZiA0MTJcIiAocHJldmlvdXMpPVwibG9hZFByZXYoKVwiIChuZXh0KT1cImxvYWROZXh0KClcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtcGFnaW5hdGlvbicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vcGFnaW5hdGlvbi5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFBhZ2luYXRpb25Db21wb25lbnQge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbGFiZWxzID0gaW5qZWN0QXRoTGFiZWxzKCk7XG5cbiAgcHJvdGVjdGVkIHBhZ2VMYWJlbChwYWdlOiBudW1iZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBmb3JtYXRBdGhMYWJlbCh0aGlzLmxhYmVscy5wYWdlTnVtYmVyKCksIHsgcGFnZSB9KTtcbiAgfVxuXG4gIEBJbnB1dCgpIG1vZGU6IFBhZ2luYXRpb25Nb2RlID0gJ251bWJlcmVkJztcblxuICAvLyAtLS0gTnVtYmVyZWQgbW9kZSAtLS1cbiAgcHJpdmF0ZSByZWFkb25seSBfcGFnZSA9IHNpZ25hbCgxKTtcblxuICBASW5wdXQoKVxuICBzZXQgcGFnZSh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9wYWdlLnNldChNYXRoLm1heCgxLCB2KSk7XG4gIH1cbiAgZ2V0IHBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZSgpO1xuICB9XG5cbiAgQElucHV0KCkgdG90YWxQYWdlcyA9IDE7XG5cbiAgLyoqIEhvdyBtYW55IHNpYmxpbmdzIG9mIHRoZSBjdXJyZW50IHBhZ2UgdG8gYWx3YXlzIHNob3cgKGRlZmF1bHQgMSkuICovXG4gIEBJbnB1dCgpIHNpYmxpbmdDb3VudCA9IDE7XG5cbiAgQE91dHB1dCgpIHBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvLyAtLS0gQ3Vyc29yIG1vZGUgLS0tXG4gIEBJbnB1dCgpIGhhc1ByZXYgPSBmYWxzZTtcbiAgQElucHV0KCkgaGFzTmV4dCA9IGZhbHNlO1xuXG4gIC8qKiBDYXB0aW9uIHNob3duIGJldHdlZW4gcHJldi9uZXh0IGluIGN1cnNvciBtb2RlIChlLmcuLCBcIjHigJMzMCBvZiA0MTJcIikuICovXG4gIEBJbnB1dCgpIHN1bW1hcnkgPSAnJztcblxuICBAT3V0cHV0KCkgcHJldmlvdXMgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBuZXh0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBwcmV2SWNvbiA9IENoZXZyb25MZWZ0O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmV4dEljb24gPSBDaGV2cm9uUmlnaHQ7XG4gIHByb3RlY3RlZCByZWFkb25seSBmaXJzdEljb24gPSBDaGV2cm9uc0xlZnQ7XG4gIHByb3RlY3RlZCByZWFkb25seSBsYXN0SWNvbiA9IENoZXZyb25zUmlnaHQ7XG4gIHByb3RlY3RlZCByZWFkb25seSBlbGxpcHNpc0ljb24gPSBNb3JlSG9yaXpvbnRhbDtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcGFnZXMgPSBjb21wdXRlZDwobnVtYmVyIHwgJ2VsbGlwc2lzJylbXT4oKCkgPT4ge1xuICAgIGNvbnN0IHRvdGFsID0gTWF0aC5tYXgoMSwgdGhpcy50b3RhbFBhZ2VzKTtcbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5fcGFnZSgpO1xuICAgIGNvbnN0IHNpYmxpbmdzID0gTWF0aC5tYXgoMCwgdGhpcy5zaWJsaW5nQ291bnQpO1xuXG4gICAgLy8gQWx3YXlzIHNob3cgZmlyc3QgKyBsYXN0OyBzaG93IHNpYmxpbmdzIGFyb3VuZCBjdXJyZW50OyBnYXBzIOKGkiBlbGxpcHNpc1xuICAgIGlmICh0b3RhbCA8PSA1ICsgc2libGluZ3MgKiAyKSB7XG4gICAgICByZXR1cm4gcmFuZ2UoMSwgdG90YWwpO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZnRTaWJsaW5nID0gTWF0aC5tYXgoY3VycmVudCAtIHNpYmxpbmdzLCAyKTtcbiAgICBjb25zdCByaWdodFNpYmxpbmcgPSBNYXRoLm1pbihjdXJyZW50ICsgc2libGluZ3MsIHRvdGFsIC0gMSk7XG4gICAgY29uc3Qgc2hvd0xlZnRFbGxpcHNpcyA9IGxlZnRTaWJsaW5nID4gMztcbiAgICBjb25zdCBzaG93UmlnaHRFbGxpcHNpcyA9IHJpZ2h0U2libGluZyA8IHRvdGFsIC0gMjtcblxuICAgIGNvbnN0IHJlc3VsdDogKG51bWJlciB8ICdlbGxpcHNpcycpW10gPSBbMV07XG4gICAgaWYgKHNob3dMZWZ0RWxsaXBzaXMpIHtcbiAgICAgIHJlc3VsdC5wdXNoKCdlbGxpcHNpcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMjsgaSA8IGxlZnRTaWJsaW5nOyBpKyspIHJlc3VsdC5wdXNoKGkpO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gbGVmdFNpYmxpbmc7IGkgPD0gcmlnaHRTaWJsaW5nOyBpKyspIHJlc3VsdC5wdXNoKGkpO1xuICAgIGlmIChzaG93UmlnaHRFbGxpcHNpcykge1xuICAgICAgcmVzdWx0LnB1c2goJ2VsbGlwc2lzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSByaWdodFNpYmxpbmcgKyAxOyBpIDwgdG90YWw7IGkrKykgcmVzdWx0LnB1c2goaSk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKHRvdGFsKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcblxuICBnb1RvKHBhZ2U6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChwYWdlIDwgMSB8fCBwYWdlID4gdGhpcy50b3RhbFBhZ2VzIHx8IHBhZ2UgPT09IHRoaXMuX3BhZ2UoKSkgcmV0dXJuO1xuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHBhZ2UpO1xuICB9XG5cbiAgZ29QcmV2KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdjdXJzb3InKSB7XG4gICAgICBpZiAodGhpcy5oYXNQcmV2KSB0aGlzLnByZXZpb3VzLmVtaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nb1RvKHRoaXMuX3BhZ2UoKSAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIGdvTmV4dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5tb2RlID09PSAnY3Vyc29yJykge1xuICAgICAgaWYgKHRoaXMuaGFzTmV4dCkgdGhpcy5uZXh0LmVtaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nb1RvKHRoaXMuX3BhZ2UoKSArIDEpO1xuICAgIH1cbiAgfVxuXG4gIGdvRmlyc3QoKTogdm9pZCB7XG4gICAgdGhpcy5nb1RvKDEpO1xuICB9XG5cbiAgZ29MYXN0KCk6IHZvaWQge1xuICAgIHRoaXMuZ29Ubyh0aGlzLnRvdGFsUGFnZXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlcik6IG51bWJlcltdIHtcbiAgY29uc3Qgb3V0OiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gZnJvbTsgaSA8PSB0bzsgaSsrKSBvdXQucHVzaChpKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsIkBpZiAobW9kZSA9PT0gJ251bWJlcmVkJykge1xuICA8YnV0dG9uXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgY2xhc3M9XCJhdGgtcGFnZV9fYnRuIGF0aC1wYWdlX19idG4tLW5hdlwiXG4gICAgW2Rpc2FibGVkXT1cInBhZ2UgPD0gMVwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJsYWJlbHMucGFnZUZpcnN0KClcIlxuICAgIChjbGljayk9XCJnb0ZpcnN0KClcIlxuICA+XG4gICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiZmlyc3RJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvblxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNsYXNzPVwiYXRoLXBhZ2VfX2J0biBhdGgtcGFnZV9fYnRuLS1uYXZcIlxuICAgIFtkaXNhYmxlZF09XCJwYWdlIDw9IDFcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxzLnBhZ2VQcmV2aW91cygpXCJcbiAgICAoY2xpY2spPVwiZ29QcmV2KClcIlxuICA+XG4gICAgPGx1Y2lkZS1pY29uIFtpbWddPVwicHJldkljb25cIiBbc2l6ZV09XCIxNFwiIC8+XG4gIDwvYnV0dG9uPlxuXG4gIEBmb3IgKGl0ZW0gb2YgcGFnZXMoKTsgdHJhY2sgJGluZGV4KSB7XG4gICAgQGlmIChpdGVtID09PSAnZWxsaXBzaXMnKSB7XG4gICAgICA8c3BhbiBjbGFzcz1cImF0aC1wYWdlX19lbGxpcHNpc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICA8bHVjaWRlLWljb24gW2ltZ109XCJlbGxpcHNpc0ljb25cIiBbc2l6ZV09XCIxMlwiIC8+XG4gICAgICA8L3NwYW4+XG4gICAgfSBAZWxzZSB7XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cImF0aC1wYWdlX19idG5cIlxuICAgICAgICBbY2xhc3MuYXRoLXBhZ2VfX2J0bi0tYWN0aXZlXT1cIml0ZW0gPT09IHBhZ2VcIlxuICAgICAgICBbYXR0ci5hcmlhLWN1cnJlbnRdPVwiaXRlbSA9PT0gcGFnZSA/ICdwYWdlJyA6IG51bGxcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInBhZ2VMYWJlbChpdGVtKVwiXG4gICAgICAgIChjbGljayk9XCJnb1RvKGl0ZW0pXCJcbiAgICAgID5cbiAgICAgICAge3sgaXRlbSB9fVxuICAgICAgPC9idXR0b24+XG4gICAgfVxuICB9XG5cbiAgPGJ1dHRvblxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNsYXNzPVwiYXRoLXBhZ2VfX2J0biBhdGgtcGFnZV9fYnRuLS1uYXZcIlxuICAgIFtkaXNhYmxlZF09XCJwYWdlID49IHRvdGFsUGFnZXNcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxzLnBhZ2VOZXh0KClcIlxuICAgIChjbGljayk9XCJnb05leHQoKVwiXG4gID5cbiAgICA8bHVjaWRlLWljb24gW2ltZ109XCJuZXh0SWNvblwiIFtzaXplXT1cIjE0XCIgLz5cbiAgPC9idXR0b24+XG4gIDxidXR0b25cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImF0aC1wYWdlX19idG4gYXRoLXBhZ2VfX2J0bi0tbmF2XCJcbiAgICBbZGlzYWJsZWRdPVwicGFnZSA+PSB0b3RhbFBhZ2VzXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImxhYmVscy5wYWdlTGFzdCgpXCJcbiAgICAoY2xpY2spPVwiZ29MYXN0KClcIlxuICA+XG4gICAgPGx1Y2lkZS1pY29uIFtpbWddPVwibGFzdEljb25cIiBbc2l6ZV09XCIxNFwiIC8+XG4gIDwvYnV0dG9uPlxufSBAZWxzZSB7XG4gIDxidXR0b25cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImF0aC1wYWdlX19idG4gYXRoLXBhZ2VfX2J0bi0tY3Vyc29yXCJcbiAgICBbZGlzYWJsZWRdPVwiIWhhc1ByZXZcIlxuICAgIChjbGljayk9XCJnb1ByZXYoKVwiXG4gID5cbiAgICA8bHVjaWRlLWljb24gW2ltZ109XCJwcmV2SWNvblwiIFtzaXplXT1cIjE0XCIgLz5cbiAgICA8c3Bhbj57eyBsYWJlbHMucHJldmlvdXMoKSB9fTwvc3Bhbj5cbiAgPC9idXR0b24+XG4gIEBpZiAoc3VtbWFyeSkge1xuICAgIDxzcGFuIGNsYXNzPVwiYXRoLXBhZ2VfX3N1bW1hcnlcIj57eyBzdW1tYXJ5IH19PC9zcGFuPlxuICB9XG4gIDxidXR0b25cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImF0aC1wYWdlX19idG4gYXRoLXBhZ2VfX2J0bi0tY3Vyc29yXCJcbiAgICBbZGlzYWJsZWRdPVwiIWhhc05leHRcIlxuICAgIChjbGljayk9XCJnb05leHQoKVwiXG4gID5cbiAgICA8c3Bhbj57eyBsYWJlbHMubmV4dCgpIH19PC9zcGFuPlxuICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cIm5leHRJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICA8L2J1dHRvbj5cbn1cbiJdfQ==