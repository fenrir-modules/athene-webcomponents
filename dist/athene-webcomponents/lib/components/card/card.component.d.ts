import * as i0 from "@angular/core";
/**
 * Card padding variants
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
/**
 * Athene Card Component
 *
 * @example
 * <ath-card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </ath-card>
 *
 * <ath-card [hoverable]="true" padding="lg">
 *   Hoverable card with large padding
 * </ath-card>
 */
export declare class AthCardComponent {
    /** Card padding */
    padding: CardPadding;
    /** Show border */
    bordered: boolean;
    /** Hoverable effect */
    hoverable: boolean;
    /** Show header slot */
    header: boolean;
    /** Show footer slot */
    footer: boolean;
    get cardClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthCardComponent, "ath-card", never, { "padding": { "alias": "padding"; "required": false; }; "bordered": { "alias": "bordered"; "required": false; }; "hoverable": { "alias": "hoverable"; "required": false; }; "header": { "alias": "header"; "required": false; }; "footer": { "alias": "footer"; "required": false; }; }, {}, never, ["[slot=header]", "*", "[slot=footer]"], true, never>;
}
