import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * Input type variants
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
/** Field height: `md` 44px, `sm` 33px. */
export type InputSize = 'sm' | 'md';
/**
 * Athene Input Component
 *
 * @example
 * <ath-input label="Email" type="email" [(ngModel)]="email" />
 * <ath-input label="Password" type="password" [error]="errorMessage" />
 */
export declare class AthInputComponent implements ControlValueAccessor {
    private readonly labels;
    /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
    readonly size: import("@angular/core").InputSignal<InputSize>;
    /** Accessible names of the password reveal toggle; default `ATH_LABELS`. */
    readonly showPasswordLabel: import("@angular/core").InputSignal<string | null>;
    readonly hidePasswordLabel: import("@angular/core").InputSignal<string | null>;
    /** Input label */
    readonly label: import("@angular/core").InputSignal<string>;
    /** Input type */
    readonly type: import("@angular/core").InputSignal<InputType>;
    /** Placeholder text */
    readonly placeholder: import("@angular/core").InputSignal<string>;
    /** Error message */
    readonly error: import("@angular/core").InputSignal<string>;
    /** Hint text */
    readonly hint: import("@angular/core").InputSignal<string>;
    /** Disabled state (also set by the forms API, see `setDisabledState`). */
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Readonly state */
    readonly readonly: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Required field */
    readonly required: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Autocomplete attribute */
    readonly autocomplete: import("@angular/core").InputSignal<string>;
    /** Unique input ID */
    readonly inputId: import("@angular/core").InputSignal<string>;
    protected readonly fieldValue: import("@angular/core").WritableSignal<string>;
    private readonly formDisabled;
    protected readonly isDisabled: import("@angular/core").Signal<boolean>;
    protected readonly showPassword: import("@angular/core").WritableSignal<boolean>;
    protected readonly showPasswordText: import("@angular/core").Signal<string>;
    protected readonly hidePasswordText: import("@angular/core").Signal<string>;
    protected readonly eyeIcon: import("lucide").IconNode;
    protected readonly eyeOffIcon: import("lucide").IconNode;
    protected readonly alertIcon: import("lucide").IconNode;
    private onChange;
    protected onTouched: () => void;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onInput(event: Event): void;
    togglePassword(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthInputComponent, "ath-input", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "showPasswordLabel": { "alias": "showPasswordLabel"; "required": false; "isSignal": true; }; "hidePasswordLabel": { "alias": "hidePasswordLabel"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "hint": { "alias": "hint"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "readonly": { "alias": "readonly"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "autocomplete": { "alias": "autocomplete"; "required": false; "isSignal": true; }; "inputId": { "alias": "inputId"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
