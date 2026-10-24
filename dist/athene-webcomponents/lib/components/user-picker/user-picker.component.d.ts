import type { ListboxOption } from '../listbox/listbox.component';
import * as i0 from "@angular/core";
export interface UserOption {
    id: string;
    name: string;
    email?: string;
    avatarSrc?: string;
}
/**
 * User picker — wraps `<ath-combobox>` with avatar rendering on the trigger
 * and in options. Use for Assignee, Reporter, Watchers, Mentions, etc.
 *
 * @example
 * <ath-user-picker
 *   [users]="workspaceMembers"
 *   [(value)]="assigneeId"
 *   placeholder="Unassigned" />
 */
export declare class AthUserPickerComponent {
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    /** The people to choose from; `null`/`undefined` count as none. */
    readonly users: import("@angular/core").InputSignalWithTransform<UserOption[], UserOption[] | null | undefined>;
    /** The chosen user's id. Two-way: `[(value)]`. */
    readonly value: import("@angular/core").ModelSignal<string | null>;
    readonly placeholder: import("@angular/core").InputSignal<string | null>;
    readonly searchPlaceholder: import("@angular/core").InputSignal<string | null>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly clearable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly allowUnassigned: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Show email under each name. */
    readonly showEmail: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected readonly options: import("@angular/core").Signal<ListboxOption<string>[]>;
    protected readonly selectedUser: import("@angular/core").Signal<UserOption | null>;
    onValueChange(v: string | null): void;
    protected readonly triggerLabel: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthUserPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthUserPickerComponent, "ath-user-picker", never, { "users": { "alias": "users"; "required": false; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "clearable": { "alias": "clearable"; "required": false; "isSignal": true; }; "allowUnassigned": { "alias": "allowUnassigned"; "required": false; "isSignal": true; }; "showEmail": { "alias": "showEmail"; "required": false; "isSignal": true; }; }, { "value": "valueChange"; }, never, never, true, never>;
}
