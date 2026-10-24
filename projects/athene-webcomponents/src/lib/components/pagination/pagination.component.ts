import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from 'lucide-angular';
import { formatAthLabel, injectAthLabels } from '../../i18n/labels';

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
  protected readonly labels = injectAthLabels();

  protected pageLabel(page: number | string): string {
    return formatAthLabel(this.labels.pageNumber(), { page });
  }

  readonly mode = input<PaginationMode>('numbered');

  // --- Numbered mode ---
  /** Current page (1-based); values below 1 count as 1. */
  readonly page = input(1, { transform: (v: unknown) => Math.max(1, numberAttribute(v, 1)) });

  readonly totalPages = input(1, { transform: numberAttribute });

  /** How many siblings of the current page to always show (default 1). */
  readonly siblingCount = input(1, { transform: numberAttribute });

  readonly pageChange = output<number>();

  // --- Cursor mode ---
  readonly hasPrev = input(false, { transform: booleanAttribute });
  readonly hasNext = input(false, { transform: booleanAttribute });

  /** Caption shown between prev/next in cursor mode (e.g., "1–30 of 412"). */
  readonly summary = input('');

  readonly previous = output<void>();
  readonly next = output<void>();

  protected readonly prevIcon = ChevronLeft;
  protected readonly nextIcon = ChevronRight;
  protected readonly firstIcon = ChevronsLeft;
  protected readonly lastIcon = ChevronsRight;
  protected readonly ellipsisIcon = MoreHorizontal;

  protected readonly pages = computed<(number | 'ellipsis')[]>(() => {
    const total = Math.max(1, this.totalPages());
    const current = this.page();
    const siblings = Math.max(0, this.siblingCount());

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
    if (page < 1 || page > this.totalPages() || page === this.page()) return;
    this.pageChange.emit(page);
  }

  goPrev(): void {
    if (this.mode() === 'cursor') {
      if (this.hasPrev()) this.previous.emit();
    } else {
      this.goTo(this.page() - 1);
    }
  }

  goNext(): void {
    if (this.mode() === 'cursor') {
      if (this.hasNext()) this.next.emit();
    } else {
      this.goTo(this.page() + 1);
    }
  }

  goFirst(): void {
    this.goTo(1);
  }

  goLast(): void {
    this.goTo(this.totalPages());
  }
}

function range(from: number, to: number): number[] {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
}
