import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * Input type variants
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
/**
 * Athene Input Component
 *
 * @example
 * <ath-input label="Email" type="email" [(ngModel)]="email" />
 * <ath-input label="Password" type="password" [error]="errorMessage" />
 */
export declare class AthInputComponent implements ControlValueAccessor {
    /** Input label */
    label: string;
    /** Input type */
    type: InputType;
    /** Placeholder text */
    placeholder: string;
    /** Error message */
    error: string;
    /** Hint text */
    hint: string;
    /** Disabled state */
    disabled: boolean;
    /** Readonly state */
    readonly: boolean;
    /** Required field */
    required: boolean;
    /** Autocomplete attribute */
    autocomplete: string;
    /** Unique input ID */
    inputId: string;
    protected value: string;
    protected showPassword: boolean;
    protected readonly eyeIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly eyeOffIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly alertIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    private onChange;
    protected onTouched: () => void;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onInput(event: Event): void;
    togglePassword(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthInputComponent, "ath-input", never, { "label": { "alias": "label"; "required": false; }; "type": { "alias": "type"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "error": { "alias": "error"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "required": { "alias": "required"; "required": false; }; "autocomplete": { "alias": "autocomplete"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; }, {}, never, never, true, never>;
}
