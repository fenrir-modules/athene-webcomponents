import { EventEmitter } from '@angular/core';
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
    private readonly _users;
    set users(value: UserOption[] | null | undefined);
    get users(): UserOption[];
    value: string | null;
    placeholder: string | null;
    searchPlaceholder: string | null;
    disabled: boolean;
    clearable: boolean;
    allowUnassigned: boolean;
    /** Show email under each name. */
    showEmail: boolean;
    valueChange: EventEmitter<string | null>;
    protected readonly options: import("@angular/core").Signal<ListboxOption<string>[]>;
    protected readonly selectedUser: import("@angular/core").Signal<UserOption | null>;
    onValueChange(v: string | null): void;
    protected get triggerLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthUserPickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthUserPickerComponent, "ath-user-picker", never, { "users": { "alias": "users"; "required": false; }; "value": { "alias": "value"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "clearable": { "alias": "clearable"; "required": false; }; "allowUnassigned": { "alias": "allowUnassigned"; "required": false; }; "showEmail": { "alias": "showEmail"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
