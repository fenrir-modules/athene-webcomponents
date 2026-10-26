import { type DropdownItem } from '../dropdown/dropdown.component';
import * as i0 from "@angular/core";
/** One step of the trail. The last item is the current page. */
export interface BreadcrumbItem {
    label: string;
    /** Router path of the step; omitted on the current page. */
    route?: string;
    /** Query of `route` (a list with its filters, say). */
    queryParams?: Record<string, string>;
    /** A key (`ATL`, `ATL-12`), drawn as a mono chip before the label. */
    key?: string;
    /** Tooltip, when it says more than the label. */
    title?: string;
}
type Shown = {
    kind: 'crumb';
    crumb: BreadcrumbItem;
    last: boolean;
} | {
    kind: 'more';
    hidden: BreadcrumbItem[];
    items: DropdownItem[];
};
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
export declare class AthBreadcrumbComponent {
    private readonly labels;
    private readonly router;
    readonly items: import("@angular/core").InputSignal<readonly BreadcrumbItem[]>;
    /** Accessible name of the landmark; defaults to `ATH_LABELS.breadcrumb`. */
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    /** More steps than this fold their middle into "…". */
    readonly maxVisible: import("@angular/core").InputSignal<number>;
    protected readonly navLabel: import("@angular/core").Signal<string>;
    protected readonly moreLabel: import("@angular/core").Signal<string>;
    protected readonly separatorIcon: import("lucide").IconNode;
    private readonly narrow;
    protected readonly shown: import("@angular/core").Signal<Shown[]>;
    constructor();
    /** Where a step links to, if anywhere. */
    protected target(crumb: BreadcrumbItem): string | null;
    protected openHidden(hidden: readonly BreadcrumbItem[], id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthBreadcrumbComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthBreadcrumbComponent, "ath-breadcrumb", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "maxVisible": { "alias": "maxVisible"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export {};
