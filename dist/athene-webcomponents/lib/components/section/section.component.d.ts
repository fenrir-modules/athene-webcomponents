import * as i0 from "@angular/core";
/**
 * Athene Section Component
 *
 * Card-based section with title, description and content.
 *
 * @example
 * <ath-section title="General" description="Basic settings">
 *   <form>...</form>
 * </ath-section>
 */
export declare class AthSectionComponent {
    /** Section title */
    title: string;
    /** Section description */
    description: string;
    /** Collapsible state */
    collapsible: boolean;
    /** Expanded state (for collapsible) */
    expanded: boolean;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSectionComponent, "ath-section", never, { "title": { "alias": "title"; "required": true; }; "description": { "alias": "description"; "required": false; }; "collapsible": { "alias": "collapsible"; "required": false; }; "expanded": { "alias": "expanded"; "required": false; }; }, {}, never, ["[slot=actions]", "*"], true, never>;
}
