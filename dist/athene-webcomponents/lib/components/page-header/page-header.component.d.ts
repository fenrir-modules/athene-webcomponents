import * as i0 from "@angular/core";
/**
 * Athene Page Header Component
 *
 * Consistent page header with title, description and action slot.
 *
 * @example
 * <ath-page-header title="Settings" description="Manage your preferences">
 *   <ath-button variant="outline" size="sm">Refresh</ath-button>
 * </ath-page-header>
 */
export declare class AthPageHeaderComponent {
    /** Page title */
    title: string;
    /** Page description */
    description: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPageHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPageHeaderComponent, "ath-page-header", never, { "title": { "alias": "title"; "required": true; }; "description": { "alias": "description"; "required": false; }; }, {}, never, ["*"], true, never>;
}
