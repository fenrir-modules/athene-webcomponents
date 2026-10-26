import { type AthAction } from './button.action';
import * as i0 from "@angular/core";
/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'danger-ghost' | 'create';
/**
 * Button size types
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
/** The native button's `type`. */
export type ButtonType = 'button' | 'submit' | 'reset';
/**
 * Athene Button Component
 *
 * `[action]` makes the button track its own work: pass a function that
 * returns a Promise or an Observable and the button is busy until it
 * settles: disabled, a spinner, `aria-busy`, and a second click (or a
 * double click) does nothing. No hand-kept `saving` signal (QA-13).
 *
 * @example
 * <ath-button variant="primary" (clicked)="handleClick()">Click me</ath-button>
 * <ath-button variant="primary" [action]="save">Save</ath-button>
 *   // in the component: protected readonly save = () => this.sprints.create(this.draft());
 * <ath-button variant="outline" size="sm" [loading]="true">Loading...</ath-button>
 */
export declare class AthButtonComponent {
    private readonly errorHandler;
    /**
     * The action may remove the button before it settles (it navigates
     * away, or hides the button it was started from): then nothing is left
     * to update or to emit from (NG0953). Failures still reach the handler.
     */
    private destroyed;
    constructor();
    readonly variant: import("@angular/core").InputSignal<ButtonVariant>;
    readonly size: import("@angular/core").InputSignal<ButtonSize>;
    /** Button type attribute. */
    readonly type: import("@angular/core").InputSignal<ButtonType>;
    readonly disabled: import("@angular/core").InputSignal<boolean>;
    /** Busy from outside (an action started elsewhere). `[action]` sets its own. */
    readonly loading: import("@angular/core").InputSignal<boolean>;
    readonly fullWidth: import("@angular/core").InputSignal<boolean>;
    /**
     * Toggle state. `null` (default) renders a plain button; `true`/`false`
     * make it a toggle button with `aria-pressed` and a sunken pressed look.
     */
    readonly pressed: import("@angular/core").InputSignal<boolean | null>;
    /**
     * Disclosure state for a button that opens a panel or menu. `null`
     * (default) omits `aria-expanded`. Set this instead of
     * `[attr.aria-expanded]` on the host: host attributes do not reach the
     * focusable inner `<button>`.
     */
    readonly expanded: import("@angular/core").InputSignal<boolean | null>;
    /** Id of the element this button controls (`aria-controls`). */
    readonly controls: import("@angular/core").InputSignal<string | null>;
    /** Optional aria-label for icon-only usage. */
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    /** Work to run on click; the button is busy until it settles. */
    readonly action: import("@angular/core").InputSignal<AthAction | null>;
    /** Every accepted click (also with `[action]`, before it runs). */
    readonly clicked: import("@angular/core").OutputEmitterRef<MouseEvent>;
    /** The action settled successfully. */
    readonly done: import("@angular/core").OutputEmitterRef<unknown>;
    /** The action failed; the error also goes to Angular's `ErrorHandler`. */
    readonly failed: import("@angular/core").OutputEmitterRef<unknown>;
    private readonly running;
    /** Busy: an `[action]` is running or `[loading]` is set. */
    readonly busy: import("@angular/core").Signal<boolean>;
    protected readonly loaderIcon: import("lucide").IconNode;
    protected readonly buttonClasses: import("@angular/core").Signal<string>;
    handleClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthButtonComponent, "ath-button", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; "fullWidth": { "alias": "fullWidth"; "required": false; "isSignal": true; }; "pressed": { "alias": "pressed"; "required": false; "isSignal": true; }; "expanded": { "alias": "expanded"; "required": false; "isSignal": true; }; "controls": { "alias": "controls"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "action": { "alias": "action"; "required": false; "isSignal": true; }; }, { "clicked": "clicked"; "done": "done"; "failed": "failed"; }, never, ["*"], true, never>;
}
