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
 * <ath-select [ariaLabel]="'Role for ' + member.name" [options]="roles" [(ngModel)]="role" />
 */
export declare class AthSelectComponent implements ControlValueAccessor {
    /** Select label */
    /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
    size: 'sm' | 'md';
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
    /**
     * Accessible name of the native select when no visible `label` is drawn
     * (a select in a settings row or a table cell that its row already names).
     */
    ariaLabel: string;
    /** Unique select ID */
    selectId: string;
    protected value: string;
    protected readonly chevronIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly alertIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    private onChange;
    protected onTouched: () => void;
    private readonly cdr;
    writeValue(value: string): void;
    registerOnChange(fn: (value: string) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    onSelectionChange(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSelectComponent, "ath-select", never, { "size": { "alias": "size"; "required": false; }; "label": { "alias": "label"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "options": { "alias": "options"; "required": false; }; "error": { "alias": "error"; "required": false; }; "hint": { "alias": "hint"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "required": { "alias": "required"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "selectId": { "alias": "selectId"; "required": false; }; }, {}, never, never, true, never>;
}
