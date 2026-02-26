import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Athene Toggle Component
 *
 * @example
 * <ath-toggle label="Maintenance" [checked]="enabled" (toggled)="onToggle($event)" />
 */
export declare class AthToggleComponent {
    /** Checked state */
    checked: boolean;
    /** Disabled state */
    disabled: boolean;
    /** Label text */
    label: string;
    /** Description text */
    description: string;
    /** Toggle event emitter */
    toggled: EventEmitter<boolean>;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthToggleComponent, "ath-toggle", never, { "checked": { "alias": "checked"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "label": { "alias": "label"; "required": false; }; "description": { "alias": "description"; "required": false; }; }, { "toggled": "toggled"; }, never, never, true, never>;
}
