import * as i0 from "@angular/core";
/**
 * Athene Divider Component
 *
 * Visual separator for content sections.
 *
 * @example
 * <ath-divider />
 * <ath-divider spacing="lg" />
 * <ath-divider orientation="vertical" />
 */
export declare class AthDividerComponent {
    /** Orientation */
    orientation: 'horizontal' | 'vertical';
    /** Spacing around the divider */
    spacing: 'none' | 'sm' | 'md' | 'lg';
    get dividerClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthDividerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthDividerComponent, "ath-divider", never, { "orientation": { "alias": "orientation"; "required": false; }; "spacing": { "alias": "spacing"; "required": false; }; }, {}, never, never, true, never>;
}
