import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
/**
 * Select option definition
 */
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
/**
 * Athene Select Component
 *
 * Form select with consistent styling and ControlValueAccessor.
 *
 * @example
 * <ath-select label="Role" [options]="roles" [(ngModel)]="selectedRole" />
 */
export declare class AthSelectComponent implements ControlValueAccessor {
    /** Select label */
    label: string;
    /** Placeholder text */
    placeholder: string;
    /** Select options */
    options: SelectOption[];
    /** Error message */
    error: string;
    /** Hint text */
    hint: string;
    /** Disabled state */
    disabled: boolean;
    /** Required field */
    required: boolean;
    /** Unique select ID */
    selectId: string;
    protected value: string;
    protected readonly chevronIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly alertIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    private onChange;
    protected onTouched: () => void;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onSelectionChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSelectComponent, "ath-select", never, { "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "options": { "alias": "options"; "required": false; }; "error": { "alias": "error"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "selectId": { "alias": "selectId"; "required": false; }; }, {}, never, never, true, never>;
}
