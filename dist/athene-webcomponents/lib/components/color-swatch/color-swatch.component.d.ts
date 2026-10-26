import { type AthDecoColor } from './deco-color';
import * as i0 from "@angular/core";
/**
 * A colour from the decorative palette, as a radio group (WAI-ARIA radio
 * pattern): one tab stop, the arrow keys move and pick, Home/End jump.
 * Each swatch is named for screen readers ("Blue"), the selected one also
 * carries a check, so the choice does not rest on colour alone.
 *
 * @example
 * <ath-color-swatch [(value)]="role.color" label="Rollenfarbe" />
 */
export declare class AthColorSwatchComponent {
    private readonly labels;
    private readonly host;
    /** The picked token; `null`: none yet (the first swatch takes the tab stop). */
    readonly value: import("@angular/core").ModelSignal<string | null>;
    /** The group's accessible name; defaults to the "Colour" label. */
    readonly label: import("@angular/core").InputSignal<string | null>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** The tokens offered, in order (default: the whole palette). */
    readonly colors: import("@angular/core").InputSignal<readonly AthDecoColor[]>;
    protected readonly checkIcon: import("lucide").IconNode;
    protected readonly groupLabel: import("@angular/core").Signal<string>;
    protected readonly options: import("@angular/core").Signal<{
        color: AthDecoColor;
        name: string;
    }[]>;
    /** The index holding the tab stop: the picked swatch, else the first. */
    protected readonly stop: import("@angular/core").Signal<number>;
    protected pick(color: AthDecoColor): void;
    protected onKey(event: KeyboardEvent, index: number): void;
    private focusAt;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthColorSwatchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthColorSwatchComponent, "ath-color-swatch", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "colors": { "alias": "colors"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}
