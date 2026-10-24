import * as i0 from "@angular/core";
export type KbdSize = 'sm' | 'md' | 'lg';
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
    readonly size: import("@angular/core").InputSignal<KbdSize>;
    /**
     * Keys as text, for a self-closing tag. Callers wrote `label="⌘K"`
     * before this input existed, which rendered an empty chip.
     */
    readonly label: import("@angular/core").InputSignal<string>;
    protected readonly kbdClasses: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthKbdComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthKbdComponent, "ath-kbd", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
