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
 */
export declare class AthKbdComponent {
    /** Size variant */
    size: 'sm' | 'md' | 'lg';
    get kbdClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthKbdComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthKbdComponent, "ath-kbd", never, { "size": { "alias": "size"; "required": false; }; }, {}, never, ["*"], true, never>;
}
