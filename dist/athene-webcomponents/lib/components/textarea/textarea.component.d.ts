import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/** Which way the user may resize the field. */
export type TextareaResize = 'none' | 'vertical' | 'both';
/**
 * Athene Textarea Component
 *
 * Multi-line text input with ControlValueAccessor.
 *
 * @example
 * <ath-textarea label="Description" [(ngModel)]="description" />
 * <ath-textarea label="Message" [rows]="6" [error]="errorMsg" />
 */
export declare class AthTextareaComponent implements ControlValueAccessor {
    /** Textarea label */
    readonly label: import("@angular/core").InputSignal<string>;
    /** Placeholder text */
    readonly placeholder: import("@angular/core").InputSignal<string>;
    /** Number of rows */
    readonly rows: import("@angular/core").InputSignalWithTransform<number, unknown>;
    /** Error message */
    readonly error: import("@angular/core").InputSignal<string>;
    /** Hint text */
    readonly hint: import("@angular/core").InputSignal<string>;
    /** Disabled state (also set by the forms API, see `setDisabledState`). */
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Required field */
    readonly required: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Allow resize */
    readonly resize: import("@angular/core").InputSignal<TextareaResize>;
    /** Max length */
    readonly maxLength: import("@angular/core").InputSignal<number | null>;
    /** Unique textarea ID */
    readonly textareaId: import("@angular/core").InputSignal<string>;
    protected readonly fieldValue: import("@angular/core").WritableSignal<string>;
    private readonly formDisabled;
    protected readonly isDisabled: import("@angular/core").Signal<boolean>;
    protected readonly alertIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    private onChange;
    protected onTouched: () => void;
    readonly characterCount: import("@angular/core").Signal<number>;
    /** Past 90% of `maxLength`. */
    protected readonly nearLimit: import("@angular/core").Signal<boolean>;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onInput(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTextareaComponent, "ath-textarea", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "rows": { "alias": "rows"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "hint": { "alias": "hint"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "resize": { "alias": "resize"; "required": false; "isSignal": true; }; "maxLength": { "alias": "maxLength"; "required": false; "isSignal": true; }; "textareaId": { "alias": "textareaId"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
