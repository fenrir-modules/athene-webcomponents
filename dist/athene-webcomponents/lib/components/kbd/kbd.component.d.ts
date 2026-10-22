import * as i0 from "@angular/core";
/**
 * Athene Kbd (Keyboard) Component
 *
 * Displays keyboard shortcuts in a styled badge
 *
 * @example
 * <ath-kbd>Ctrl</ath-kbd>
 * <ath-kbd>⌘</ath-kbd>
 * <ath-kbd size="sm">K</ath-kbd>
 * <ath-kbd label="⌘K" size="sm" />
 */
export declare class AthKbdComponent {
    /** Size variant */
    size: 'sm' | 'md' | 'lg';
    /**
     * Keys as text, for a self-closing tag. Callers wrote `label="⌘K"`
     * before this input existed, which rendered an empty chip.
     */
    label: string;
    get kbdClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthKbdComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthKbdComponent, "ath-kbd", never, { "size": { "alias": "size"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, ["*"], true, never>;
}
