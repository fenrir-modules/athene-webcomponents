import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import { injectAthLabels } from '../../i18n/labels';
import { AthDropdownComponent, type DropdownItem } from '../dropdown/dropdown.component';

/** One step of the trail. The last item is the current page. */
export interface BreadcrumbItem {
  label: string;
  /** Router path of the step; omitted on the current page. */
  route?: string;
  /** @deprecated Use `route`. */
  link?: string;
  /** Query of `route` (a list with its filters, say). */
  queryParams?: Record<string, string>;
  /** A key (`ATL`, `ATL-12`), drawn as a mono chip before the label. */
  key?: string;
  /** Tooltip, when it says more than the label. */
  title?: string;
}

type Shown =
  | { kind: 'crumb'; crumb: BreadcrumbItem; last: boolean }
  | { kind: 'more'; hidden: BreadcrumbItem[]; items: DropdownItem[] };

/** Below this width only the parent and the current page show. */
const NARROW_QUERY = '(max-width: 640px)';

/**
 * Athene Breadcrumb Component
 *
 * Ancestors are links (to `route` with `queryParams`), the last item is the
 * page (`aria-current`). A trail longer than `maxVisible` keeps its first
 * step and its last two and folds the rest into "…", a menu of the hidden
 * steps; on a phone only parent › current show. Long labels end in an
 * ellipsis with the full text as tooltip.
 *
 * @example
 * <ath-breadcrumb [items]="[{ label: 'Projects', route: '/projects' }, { label: 'Atlas', key: 'ATL' }]" />
 */
@Component({
  selector: 'ath-breadcrumb',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, AthDropdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class AthBreadcrumbComponent {
  private readonly labels = injectAthLabels();
  private readonly router = inject(Router);

  readonly items = input<readonly BreadcrumbItem[]>([]);
  /** Accessible name of the landmark; defaults to `ATH_LABELS.breadcrumb`. */
  readonly ariaLabel = input<string | null>(null);
  /** More steps than this fold their middle into "…". */
  readonly maxVisible = input(4);

  protected readonly navLabel = computed(() => this.ariaLabel() ?? this.labels.breadcrumb());
  protected readonly moreLabel = computed(() => this.labels.breadcrumbMore());
  protected readonly separatorIcon = ChevronRight;

  private readonly narrow = signal(false);

  protected readonly shown = computed<Shown[]>(() => {
    const all = this.items();
    const lastIndex = all.length - 1;
    const asCrumb = (crumb: BreadcrumbItem, i: number): Shown => ({
      kind: 'crumb',
      crumb,
      last: i === lastIndex,
    });
    if (this.narrow()) {
      return all.slice(-2).map((c, i, arr) => asCrumb(c, i === arr.length - 1 ? lastIndex : -1));
    }
    if (all.length <= this.maxVisible()) return all.map(asCrumb);
    const hidden = all.slice(1, -2);
    return [
      asCrumb(all[0], 0),
      {
        kind: 'more',
        hidden,
        items: hidden.map((c, i) => ({
          id: String(i),
          label: c.key ? `${c.key} · ${c.label}` : c.label,
        })),
      },
      asCrumb(all[lastIndex - 1], lastIndex - 1),
      asCrumb(all[lastIndex], lastIndex),
    ];
  });

  constructor() {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia(NARROW_QUERY);
    this.narrow.set(query.matches);
    const onChange = (e: MediaQueryListEvent) => this.narrow.set(e.matches);
    query.addEventListener('change', onChange);
    inject(DestroyRef).onDestroy(() => query.removeEventListener('change', onChange));
  }

  /** Where a step links to, if anywhere. */
  protected target(crumb: BreadcrumbItem): string | null {
    return crumb.route ?? crumb.link ?? null;
  }

  protected openHidden(hidden: readonly BreadcrumbItem[], id: string): void {
    const crumb = hidden[Number(id)];
    const route = crumb ? this.target(crumb) : null;
    if (route) void this.router.navigate([route], { queryParams: crumb?.queryParams ?? {} });
  }
}
