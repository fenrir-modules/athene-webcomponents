import { TemplateRef } from '@angular/core';
import type { FloatingAlign } from '../floating/floating';
import { type FloatingAnchor } from '../floating/floating.directive';
import type { AthOverlayCloseReason } from '../floating/overlay-stack';
import { type PopoverSize } from '../popover/popover.component';
import { type ListboxOption, type ListboxOptionContext } from './listbox.component';
import * as i0 from "@angular/core";
/**
 * Athene Option Picker: `ath-popover` + `ath-listbox` behind a select-style
 * trigger. The base for person, label, filter and relation pickers.
 *
 * `trigger="none"` drops the built-in button: the panel hangs from `anchor`
 * (or the host) and opens through `[(open)]` or `show()`.
 *
 * @example
 * <ath-option-picker [options]="labels" multiple [(values)]="selected"
 *                    creatable (create)="addLabel($event)" ariaLabel="Labels" />
 */
export declare class AthOptionPickerComponent<T = string> {
    protected readonly labels: import("@athene/webcomponents").AthLabels;
    private readonly host;
    readonly options: import("@angular/core").InputSignal<readonly ListboxOption<T>[]>;
    readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly value: import("@angular/core").ModelSignal<T | null>;
    readonly values: import("@angular/core").ModelSignal<readonly T[]>;
    /** Search text; `(queryChange)` drives server-side search. */
    readonly query: import("@angular/core").ModelSignal<string>;
    readonly searchable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly localFilter: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly creatable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly loading: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly searchPlaceholder: import("@angular/core").InputSignal<string | null>;
    readonly emptyLabel: import("@angular/core").InputSignal<string | null>;
    readonly optionTemplate: import("@angular/core").InputSignal<TemplateRef<ListboxOptionContext<T>> | null>;
    readonly compareWith: import("@angular/core").InputSignal<((a: T, b: T) => boolean) | null>;
    readonly maxHeight: import("@angular/core").InputSignal<number | null>;
    /** `button`: built-in select-style trigger; `none`: you provide `anchor` and open it. */
    readonly trigger: import("@angular/core").InputSignal<"button" | "none">;
    /** Trigger text without a selection; defaults to `ATH_LABELS.pickerPlaceholder`. */
    readonly placeholder: import("@angular/core").InputSignal<string | null>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** A clear button next to the trigger while something is selected. */
    readonly clearable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** What is being picked ("Assignee"): names the trigger and the popup. */
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    readonly open: import("@angular/core").ModelSignal<boolean>;
    readonly anchor: import("@angular/core").InputSignal<FloatingAnchor>;
    readonly size: import("@angular/core").InputSignal<PopoverSize>;
    readonly align: import("@angular/core").InputSignal<FloatingAlign>;
    readonly matchWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Close after a pick; default: single-select yes, multi-select no. */
    readonly closeOnPick: import("@angular/core").InputSignal<boolean | null>;
    /** Empty the search when the popup opens. */
    readonly resetQueryOnOpen: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly picked: import("@angular/core").OutputEmitterRef<ListboxOption<T>>;
    readonly create: import("@angular/core").OutputEmitterRef<string>;
    readonly opened: import("@angular/core").OutputEmitterRef<void>;
    readonly closed: import("@angular/core").OutputEmitterRef<AthOverlayCloseReason>;
    protected readonly chevronIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly clearIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly labelId: string;
    protected readonly valueId: string;
    private readonly popover;
    private readonly triggerButton;
    private readonly listbox;
    protected readonly popupAnchor: import("@angular/core").Signal<HTMLElement | null>;
    protected readonly placeholderText: import("@angular/core").Signal<string>;
    private readonly selectedOptions;
    protected readonly hasValue: import("@angular/core").Signal<boolean>;
    /** The trigger text: the selection, "N selected", or the placeholder. */
    readonly summary: import("@angular/core").Signal<string>;
    show(): void;
    hide(): void;
    toggle(): void;
    /** Empties the selection. */
    clear(): void;
    protected onOpened(): void;
    protected onPicked(option: ListboxOption<T>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthOptionPickerComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthOptionPickerComponent<any>, "ath-option-picker", ["athOptionPicker"], { "options": { "alias": "options"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "values": { "alias": "values"; "required": false; "isSignal": true; }; "query": { "alias": "query"; "required": false; "isSignal": true; }; "searchable": { "alias": "searchable"; "required": false; "isSignal": true; }; "localFilter": { "alias": "localFilter"; "required": false; "isSignal": true; }; "creatable": { "alias": "creatable"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; "isSignal": true; }; "emptyLabel": { "alias": "emptyLabel"; "required": false; "isSignal": true; }; "optionTemplate": { "alias": "optionTemplate"; "required": false; "isSignal": true; }; "compareWith": { "alias": "compareWith"; "required": false; "isSignal": true; }; "maxHeight": { "alias": "maxHeight"; "required": false; "isSignal": true; }; "trigger": { "alias": "trigger"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "clearable": { "alias": "clearable"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "open": { "alias": "open"; "required": false; "isSignal": true; }; "anchor": { "alias": "anchor"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; "matchWidth": { "alias": "matchWidth"; "required": false; "isSignal": true; }; "closeOnPick": { "alias": "closeOnPick"; "required": false; "isSignal": true; }; "resetQueryOnOpen": { "alias": "resetQueryOnOpen"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; "values": "valuesChange"; "query": "queryChange"; "open": "openChange"; "picked": "picked"; "create": "create"; "opened": "opened"; "closed": "closed"; }, never, never, true, never>;
}
