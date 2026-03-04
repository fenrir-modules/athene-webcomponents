import * as i0 from "@angular/core";
/**
 * Breadcrumb item definition
 */
export interface BreadcrumbItem {
    label: string;
    link?: string;
}
/**
 * Athene Breadcrumb Component
 *
 * Page navigation breadcrumbs.
 *
 * @example
 * <ath-breadcrumb [items]="[{ label: 'Admin', link: '/admin' }, { label: 'Settings' }]" />
 */
export declare class AthBreadcrumbComponent {
    /** Breadcrumb items */
    items: BreadcrumbItem[];
    protected readonly separatorIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthBreadcrumbComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthBreadcrumbComponent, "ath-breadcrumb", never, { "items": { "alias": "items"; "required": false; }; }, {}, never, never, true, never>;
}
