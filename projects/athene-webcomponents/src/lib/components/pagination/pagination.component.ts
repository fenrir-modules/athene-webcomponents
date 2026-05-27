import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-angular';

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
@Component({
  selector: 'ath-pagination',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class AthPaginationComponent {
  @Input() mode: PaginationMode = 'numbered';

  // --- Numbered mode ---
  private readonly _page = signal(1);

  @Input()
  set page(v: number) {
    this._page.set(Math.max(1, v));
  }
  get page(): number {
    return this._page();
  }

  @Input() totalPages = 1;

  /** How many siblings of the current page to always show (default 1). */
  @Input() siblingCount = 1;

  @Output() pageChange = new EventEmitter<number>();

  // --- Cursor mode ---
  @Input() hasPrev = false;
  @Input() hasNext = false;

  /** Caption shown between prev/next in cursor mode (e.g., "1–30 of 412"). */
  @Input() summary = '';

  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  protected readonly prevIcon = ChevronLeft;
  protected readonly nextIcon = ChevronRight;
  protected readonly firstIcon = ChevronsLeft;
  protected readonly lastIcon = ChevronsRight;
  protected readonly ellipsisIcon = MoreHorizontal;

  protected readonly pages = computed<(number | 'ellipsis')[]>(() => {
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

    const result: (number | 'ellipsis')[] = [1];
    if (showLeftEllipsis) {
      result.push('ellipsis');
    } else {
      for (let i = 2; i < leftSibling; i++) result.push(i);
    }
    for (let i = leftSibling; i <= rightSibling; i++) result.push(i);
    if (showRightEllipsis) {
      result.push('ellipsis');
    } else {
      for (let i = rightSibling + 1; i < total; i++) result.push(i);
    }
    result.push(total);
    return result;
  });

  goTo(page: number): void {
    if (page < 1 || page > this.totalPages || page === this._page()) return;
    this.pageChange.emit(page);
  }

  goPrev(): void {
    if (this.mode === 'cursor') {
      if (this.hasPrev) this.previous.emit();
    } else {
      this.goTo(this._page() - 1);
    }
  }

  goNext(): void {
    if (this.mode === 'cursor') {
      if (this.hasNext) this.next.emit();
    } else {
      this.goTo(this._page() + 1);
    }
  }

  goFirst(): void {
    this.goTo(1);
  }

  goLast(): void {
    this.goTo(this.totalPages);
  }
}

function range(from: number, to: number): number[] {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
}
