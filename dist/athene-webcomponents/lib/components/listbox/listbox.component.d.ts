import { TemplateRef } from '@angular/core';
import type { AthIconData } from '../floating/icon';
import * as i0 from "@angular/core";
/** One choice of an `ath-listbox`. */
export interface ListboxOption<T = string> {
    value: T;
    label: string;
    /** Second line, e.g. the e-mail under a name. */
    sublabel?: string;
    /**
     * A Lucide icon shown before the label, or a name your own option
     * template resolves (strings are not rendered by the default template).
     */
    icon?: AthIconData | string;
    disabled?: boolean;
    /** Options with the same group are listed together under that heading. */
    group?: string;
    /** Extra text the search matches but does not show (key, alias, e-mail). */
    keywords?: string;
}
/** Context of a custom option template (`<ng-template let-option let-selected="selected">`). */
export interface ListboxOptionContext<T = string> {
    $implicit: ListboxOption<T>;
    selected: boolean;
    active: boolean;
}
interface OptionRow<T> {
    kind: 'option';
    option: ListboxOption<T>;
    index: number;
    id: string;
    selected: boolean;
}
interface CreateRow {
    kind: 'create';
    index: number;
    id: string;
    label: string;
}
type Row<T> = OptionRow<T> | CreateRow;
interface Section<T> {
    key: string;
    label: string | null;
    labelId: string;
    rows: Row<T>[];
}
/**
 * Athene Listbox: the WAI-ARIA listbox pattern, single or multi-select.
 *
 * Optional search field (`role="combobox"` with `aria-activedescendant`;
 * focus stays in the field), groups, an optional "create" row, typeahead
 * when there is no search field. Rendering stays cheap for a few hundred
 * options: one element per option, filtering in a `computed`, the active row
 * marked by id, offscreen rows skipped by `content-visibility`.
 *
 * Keyboard: ArrowDown/ArrowUp, Home/End (without search field),
 * PageDown/PageUp, Enter chooses (toggles in multi-select), Space too
 * without search field, typeahead without search field.
 *
 * @example
 * <ath-listbox [options]="labels" multiple searchable [(values)]="selected"
 *              creatable (create)="addLabel($event)" ariaLabel="Labels" />
 */
export declare class AthListboxComponent<T = string> {
    protected readonly labels: import("@athene/webcomponents").AthLabels;
    readonly options: import("@angular/core").InputSignal<readonly ListboxOption<T>[]>;
    readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** The selected value (single-select). Two-way: `[(value)]`. */
    readonly value: import("@angular/core").ModelSignal<T | null>;
    /** The selected values (multi-select). Two-way: `[(values)]`. */
    readonly values: import("@angular/core").ModelSignal<readonly T[]>;
    /** Show a search field above the options. */
    readonly searchable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** The search text. Two-way: `[(query)]`, e.g. for server-side search. */
    readonly query: import("@angular/core").ModelSignal<string>;
    /** Filter `options` by the query here; turn off when the server filters. */
    readonly localFilter: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Offer a "Create …" row for a query without an exact match. */
    readonly creatable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly loading: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly searchPlaceholder: import("@angular/core").InputSignal<string | null>;
    /** Text when nothing matches; defaults to `ATH_LABELS.listboxNoMatches`. */
    readonly emptyLabel: import("@angular/core").InputSignal<string | null>;
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    readonly ariaLabelledby: import("@angular/core").InputSignal<string | null>;
    /** Custom option rendering; see `ListboxOptionContext`. */
    readonly optionTemplate: import("@angular/core").InputSignal<TemplateRef<ListboxOptionContext<T>> | null>;
    /** Height of the option list before it scrolls, in px. */
    readonly maxHeight: import("@angular/core").InputSignal<number | null>;
    /** Equality of values; `Object.is` by default. */
    readonly compareWith: import("@angular/core").InputSignal<((a: T, b: T) => boolean) | null>;
    /** The user chose (single) or toggled (multi) an option. */
    readonly picked: import("@angular/core").OutputEmitterRef<ListboxOption<T>>;
    /** The user chose the "create" row; carries the trimmed query. */
    readonly create: import("@angular/core").OutputEmitterRef<string>;
    readonly listId: string;
    protected readonly checkIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly plusIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly searchIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    private readonly searchRef;
    private readonly listRef;
    private readonly activeRaw;
    private readonly typeahead;
    protected readonly searchText: import("@angular/core").Signal<string>;
    protected readonly emptyText: import("@angular/core").Signal<string>;
    private readonly folded;
    private readonly filtered;
    private readonly showCreate;
    private readonly isSelected;
    /** Sections in display order; row indexes run across all of them. */
    protected readonly sections: import("@angular/core").Signal<Section<T>[]>;
    protected readonly rows: import("@angular/core").Signal<Row<T>[]>;
    /** Index of the highlighted row, -1 for none. */
    readonly activeIndex: import("@angular/core").Signal<number>;
    protected readonly activeId: import("@angular/core").Signal<string>;
    /** Focuses the search field, or the list itself. */
    focus(): void;
    /** Highlights the first selected option, else the first enabled one. */
    resetActive(): void;
    /** Chooses the row at `index` as if the user had clicked it. */
    choose(index: number): void;
    protected optionIcon(option: ListboxOption<T>): AthIconData | null;
    protected onQueryInput(event: Event): void;
    protected onKeydown(event: KeyboardEvent): void;
    protected onListClick(event: MouseEvent): void;
    protected onListMousedown(event: MouseEvent): void;
    protected onListHover(event: MouseEvent): void;
    private readonly usable;
    private jump;
    private rowLabels;
    private rowIndexAt;
    private scrollToActive;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthListboxComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthListboxComponent<any>, "ath-listbox", ["athListbox"], { "options": { "alias": "options"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "values": { "alias": "values"; "required": false; "isSignal": true; }; "searchable": { "alias": "searchable"; "required": false; "isSignal": true; }; "query": { "alias": "query"; "required": false; "isSignal": true; }; "localFilter": { "alias": "localFilter"; "required": false; "isSignal": true; }; "creatable": { "alias": "creatable"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; "isSignal": true; }; "emptyLabel": { "alias": "emptyLabel"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "ariaLabelledby": { "alias": "ariaLabelledby"; "required": false; "isSignal": true; }; "optionTemplate": { "alias": "optionTemplate"; "required": false; "isSignal": true; }; "maxHeight": { "alias": "maxHeight"; "required": false; "isSignal": true; }; "compareWith": { "alias": "compareWith"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; "values": "valuesChange"; "query": "queryChange"; "picked": "picked"; "create": "create"; }, never, never, true, never>;
}
export {};
