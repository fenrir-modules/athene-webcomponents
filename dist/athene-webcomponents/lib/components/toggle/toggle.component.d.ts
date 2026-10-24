import * as i0 from "@angular/core";
/**
 * Athene Toggle Component
 *
 * @example
 * <ath-toggle label="Maintenance" [checked]="enabled" (toggled)="onToggle($event)" />
 * <ath-toggle [ariaLabel]="'Email on mention'" [checked]="on" (toggled)="set($event)" />
 */
export declare class AthToggleComponent {
    /** Checked state */
    readonly checked: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Disabled state */
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Label text */
    readonly label: import("@angular/core").InputSignal<string>;
    /** Description text */
    readonly description: import("@angular/core").InputSignal<string>;
    /**
     * Accessible name of the switch when no visible `label` is drawn (a switch
     * in a settings row or a table cell that its row already names).
     */
    readonly ariaLabel: import("@angular/core").InputSignal<string>;
    /** Emits the next state; the parent sets `checked`. */
    readonly toggled: import("@angular/core").OutputEmitterRef<boolean>;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthToggleComponent, "ath-toggle", never, { "checked": { "alias": "checked"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, { "toggled": "toggled"; }, never, never, true, never>;
}
