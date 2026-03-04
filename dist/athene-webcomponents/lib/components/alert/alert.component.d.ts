import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Alert variant types
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
/**
 * Athene Alert Component
 *
 * Display feedback messages.
 *
 * @example
 * <ath-alert variant="error" message="Something went wrong" />
 * <ath-alert variant="success" message="Saved successfully" [dismissible]="true" />
 */
export declare class AthAlertComponent {
    /** Alert variant */
    variant: AlertVariant;
    /** Alert message */
    message: string;
    /** Show dismiss button */
    dismissible: boolean;
    /** Dismiss event */
    dismissed: EventEmitter<void>;
    get alertClasses(): string;
    dismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthAlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthAlertComponent, "ath-alert", never, { "variant": { "alias": "variant"; "required": false; }; "message": { "alias": "message"; "required": true; }; "dismissible": { "alias": "dismissible"; "required": false; }; }, { "dismissed": "dismissed"; }, never, never, true, never>;
}
