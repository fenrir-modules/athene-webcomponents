import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'danger-ghost' | 'create';
/**
 * Button size types
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
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
    /**
     * Toggle state. `null` (default) renders a plain button; `true`/`false`
     * make it a toggle button with `aria-pressed` and a sunken pressed look.
     */
    pressed: boolean | null;
    /**
     * Disclosure state for a button that opens a panel or menu. `null`
     * (default) omits `aria-expanded`. Set this instead of
     * `[attr.aria-expanded]` on the host: host attributes do not reach the
     * focusable inner `<button>`.
     */
    expanded: boolean | null;
    /** Id of the element this button controls (`aria-controls`). */
    controls: string | null;
    /** Optional aria-label for icon-only usage */
    ariaLabel: string | null;
    /** Click event emitter */
    clicked: EventEmitter<MouseEvent>;
    protected readonly loaderIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    get buttonClasses(): string;
    handleClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthButtonComponent, "ath-button", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "type": { "alias": "type"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "fullWidth": { "alias": "fullWidth"; "required": false; }; "pressed": { "alias": "pressed"; "required": false; }; "expanded": { "alias": "expanded"; "required": false; }; "controls": { "alias": "controls"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; }, { "clicked": "clicked"; }, never, ["*"], true, never>;
}
