import { TemplateRef } from '@angular/core';
import type { ListboxOption, ListboxOptionContext } from '../listbox/listbox.component';
import * as i0 from "@angular/core";
/**
 * Searchable single-select dropdown: a preset on `ath-option-picker`
 * (popover + listbox), kept for its established API. For multi-select,
 * "create" rows or a custom anchor use `ath-option-picker` directly.
 *
 * Options are `ListboxOption`s: `icon` may be a Lucide icon (rendered) or a
 * name your `optionTpl` resolves. For custom rendering pass an `optionTpl`
 * template (`let-option`). Clearing is built in (`clearable`); from code,
 * `value.set(null)`.
 *
 * @example
 * <ath-combobox
 *   [options]="users"
 *   [(value)]="selected"
 *   placeholder="Pick assignee"
 *   (queryChange)="search($event)" />
 */
export declare class AthComboboxComponent<T = string> {
    protected readonly host: HTMLElement;
    readonly options: import("@angular/core").InputSignal<ListboxOption<T>[]>;
    /** The selected value. Two-way: `[(value)]`. */
    readonly value: import("@angular/core").ModelSignal<T | null>;
    /** Trigger text without a value; defaults to `ATH_LABELS.pickerPlaceholder`. */
    readonly placeholder: import("@angular/core").InputSignal<string | null>;
    /** Search field placeholder; defaults to `ATH_LABELS.listboxSearch`. */
    readonly searchPlaceholder: import("@angular/core").InputSignal<string | null>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly clearable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly loading: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Hide the trigger; render only the popup (controlled mode, see `openPanel()`). */
    readonly bare: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Optional custom template for each option (`<ng-template let-option>`). */
    readonly optionTpl: import("@angular/core").InputSignal<TemplateRef<ListboxOptionContext<T>> | null>;
    /** Emits the search query when it changes (for async/server search). */
    readonly queryChange: import("@angular/core").OutputEmitterRef<string>;
    readonly opened: import("@angular/core").OutputEmitterRef<void>;
    readonly closed: import("@angular/core").OutputEmitterRef<void>;
    private readonly picker;
    toggle(): void;
    openPanel(): void;
    close(): void;
    select(option: ListboxOption<T>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthComboboxComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthComboboxComponent<any>, "ath-combobox", never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "clearable": { "alias": "clearable"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; "bare": { "alias": "bare"; "required": false; "isSignal": true; }; "optionTpl": { "alias": "optionTpl"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; "queryChange": "queryChange"; "opened": "opened"; "closed": "closed"; }, never, never, true, never>;
}
