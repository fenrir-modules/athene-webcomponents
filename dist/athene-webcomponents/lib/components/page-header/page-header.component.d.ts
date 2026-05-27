import * as i0 from "@angular/core";
/**
 * Page header with optional eyebrow, title, sub-row chips, description, and action slot.
 *
 * Sub-rows: pass `subItems` as an array of strings; they render with bullet separators.
 *
 * @example
 * <ath-page-header eyebrow="Work" title="Tickets"
 *                  [subItems]="['12 of 45', 'across 6 projects']">
 *   <button ath-button variant="secondary" size="sm">Filter</button>
 *   <button ath-button variant="primary" size="sm">+ New ticket</button>
 * </ath-page-header>
 */
export declare class AthPageHeaderComponent {
    /** Small uppercase eyebrow above the title (e.g., "Work", "Personal"). */
    eyebrow: string;
    /** Page title. */
    title: string;
    /** Multi-segment sub-row, rendered with bullet (•) separators. */
    subItems: string[];
    /** Legacy free-form description (single paragraph). Falls back if subItems empty. */
    description: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPageHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPageHeaderComponent, "ath-page-header", never, { "eyebrow": { "alias": "eyebrow"; "required": false; }; "title": { "alias": "title"; "required": true; }; "subItems": { "alias": "subItems"; "required": false; }; "description": { "alias": "description"; "required": false; }; }, {}, never, ["*"], true, never>;
}
