import { EventEmitter, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export interface ComboboxOption<T = string> {
    value: T;
    label: string;
    /** Optional sub-label shown below the main label (e.g., email under name). */
    sublabel?: string;
    /** Optional icon-name (Lucide) or arbitrary string handled by `optionTpl`. */
    icon?: string;
    disabled?: boolean;
    /** Free-form group label — items with the same group are grouped together. */
    group?: string;
}
/**
 * Searchable single-select dropdown. The foundation for UserPicker,
 * LabelPicker, ProjectPicker, AssigneePicker, etc.
 *
 * For custom rendering pass an `optionTpl` template.
 *
 * @example
 * <ath-combobox
 *   [options]="users"
 *   [(value)]="selected"
 *   placeholder="Pick assignee"
 *   (queryChange)="search($event)" />
 */
export declare class AthComboboxComponent<T = string> {
    private readonly host;
    options: ComboboxOption<T>[];
    value: T | null;
    placeholder: string;
    searchPlaceholder: string;
    disabled: boolean;
    clearable: boolean;
    loading: boolean;
    /** Hide the trigger's button styling; render only the popup (controlled mode). */
    bare: boolean;
    /** Optional custom template for each option (`<ng-template let-option>`). */
    optionTpl: TemplateRef<unknown> | null;
    valueChange: EventEmitter<T | null>;
    /** Emits the search query when it changes (for async/server search). */
    queryChange: EventEmitter<string>;
    opened: EventEmitter<void>;
    closed: EventEmitter<void>;
    private searchInput;
    protected readonly chevronIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly checkIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly searchIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly clearIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly open: import("@angular/core").WritableSignal<boolean>;
    protected readonly query: import("@angular/core").WritableSignal<string>;
    protected readonly highlighted: import("@angular/core").WritableSignal<number>;
    protected readonly filtered: import("@angular/core").Signal<ComboboxOption<T>[]>;
    /** Result with `null` separators inserted between groups. */
    protected readonly grouped: import("@angular/core").Signal<(ComboboxOption<T> | {
        _group: string;
    })[]>;
    protected readonly selectedOption: import("@angular/core").Signal<ComboboxOption<T> | null>;
    toggle(): void;
    openPanel(): void;
    close(): void;
    select(option: ComboboxOption<T>): void;
    clearValue(event: MouseEvent): void;
    onQueryInput(value: string): void;
    isOption(item: ComboboxOption<T> | {
        _group: string;
    }): item is ComboboxOption<T>;
    isHighlighted(index: number, item: ComboboxOption<T> | {
        _group: string;
    }): boolean;
    trackByValue: (index: number, item: ComboboxOption<T> | {
        _group: string;
    }) => unknown;
    onSearchKey(event: KeyboardEvent): void;
    onDocumentMouseDown(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthComboboxComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthComboboxComponent<any>, "ath-combobox", never, { "options": { "alias": "options"; "required": false; }; "value": { "alias": "value"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "clearable": { "alias": "clearable"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "bare": { "alias": "bare"; "required": false; }; "optionTpl": { "alias": "optionTpl"; "required": false; }; }, { "valueChange": "valueChange"; "queryChange": "queryChange"; "opened": "opened"; "closed": "closed"; }, never, never, true, never>;
}
