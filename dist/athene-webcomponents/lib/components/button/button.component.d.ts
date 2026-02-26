import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';
/**
 * Athene Button Component
 *
 * @example
 * <ath-button variant="primary" (clicked)="handleClick()">Click me</ath-button>
 * <ath-button variant="outline" size="sm" [loading]="true">Loading...</ath-button>
 */
export declare class AthButtonComponent {
    /** Button variant */
    variant: ButtonVariant;
    /** Button size */
    size: ButtonSize;
    /** Button type attribute */
    type: 'button' | 'submit' | 'reset';
    /** Disabled state */
    disabled: boolean;
    /** Loading state */
    loading: boolean;
    /** Full width button */
    fullWidth: boolean;
    /** Click event emitter */
    clicked: EventEmitter<MouseEvent>;
    protected readonly loaderIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    get buttonClasses(): string;
    handleClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthButtonComponent, "ath-button", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "type": { "alias": "type"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "fullWidth": { "alias": "fullWidth"; "required": false; }; }, { "clicked": "clicked"; }, never, ["*"], true, never>;
}
