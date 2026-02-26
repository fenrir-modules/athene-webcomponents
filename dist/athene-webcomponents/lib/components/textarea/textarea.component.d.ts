import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
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
    label: string;
    /** Placeholder text */
    placeholder: string;
    /** Number of rows */
    rows: number;
    /** Error message */
    error: string;
    /** Hint text */
    hint: string;
    /** Disabled state */
    disabled: boolean;
    /** Required field */
    required: boolean;
    /** Allow resize */
    resize: 'none' | 'vertical' | 'both';
    /** Max length */
    maxLength: number | null;
    /** Unique textarea ID */
    textareaId: string;
    protected value: string;
    protected readonly alertIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    private onChange;
    protected onTouched: () => void;
    get characterCount(): number;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onInput(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTextareaComponent, "ath-textarea", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "error": { "alias": "error"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "resize": { "alias": "resize"; "required": false; }; "maxLength": { "alias": "maxLength"; "required": false; }; "textareaId": { "alias": "textareaId"; "required": false; }; }, {}, never, never, true, never>;
}
