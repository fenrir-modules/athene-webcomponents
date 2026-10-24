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
/** Field height: `md` 44px, `sm` 33px. */
export type SelectSize = 'sm' | 'md';
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
    /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
    readonly size: import("@angular/core").InputSignal<SelectSize>;
    /** Select label */
    readonly label: import("@angular/core").InputSignal<string>;
    /** Placeholder text */
    readonly placeholder: import("@angular/core").InputSignal<string>;
    /** Select options */
    readonly options: import("@angular/core").InputSignal<SelectOption[]>;
    /** Error message */
    readonly error: import("@angular/core").InputSignal<string>;
    /** Hint text */
    readonly hint: import("@angular/core").InputSignal<string>;
    /** Disabled state (also set by the forms API, see `setDisabledState`). */
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Required field */
    readonly required: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /**
     * Accessible name of the native select when no visible `label` is drawn
     * (a select in a settings row or a table cell that its row already names).
     */
    readonly ariaLabel: import("@angular/core").InputSignal<string>;
    /** Unique select ID */
    readonly selectId: import("@angular/core").InputSignal<string>;
    protected readonly fieldValue: import("@angular/core").WritableSignal<string>;
    private readonly formDisabled;
    protected readonly isDisabled: import("@angular/core").Signal<boolean>;
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
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSelectComponent, "ath-select", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "hint": { "alias": "hint"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "selectId": { "alias": "selectId"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
