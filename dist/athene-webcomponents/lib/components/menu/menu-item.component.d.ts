import * as i0 from "@angular/core";
export type MenuItemVariant = 'default' | 'danger';
/**
 * One entry of an `ath-menu`: `<button athMenuItem>`, `<a athMenuItem>` or
 * `<ath-menu-item>`.
 *
 * Disabled items stay focusable (`aria-disabled`), so keyboard and screen
 * reader users can find them and hear `disabledReason`, which is also the
 * hover tooltip. Use `(triggered)` rather than `(click)`: it does not fire for
 * disabled items and closes the menu afterwards (unless `keepOpen`).
 *
 * @example
 * <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 * <button athMenuItem variant="danger" [disabled]="!canDelete" [disabledReason]="why"
 *         (triggered)="delete()">Delete</button>
 */
export declare class AthMenuItemComponent {
    private readonly menu;
    /** The item element (the `<button>` or `<a>`). */
    readonly element: HTMLElement;
    protected readonly isButton: boolean;
    protected readonly checkIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly reasonId: string;
    /** A Lucide icon before the label. */
    readonly icon: import("@angular/core").InputSignal<import("node_modules/lucide-angular/icons/types").LucideIconData | null | undefined>;
    /** Shortcut hint shown at the end, e.g. `⌘E`. */
    readonly shortcut: import("@angular/core").InputSignal<string | null>;
    /** `aria-keyshortcuts` value, e.g. `Meta+E` (the hint itself is hidden from AT). */
    readonly keyshortcuts: import("@angular/core").InputSignal<string | null>;
    readonly variant: import("@angular/core").InputSignal<MenuItemVariant>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Why the item is disabled: tooltip and accessible description. */
    readonly disabledReason: import("@angular/core").InputSignal<string | null | undefined>;
    /** Hover tooltip (for a disabled item `disabledReason` takes its place). */
    readonly tooltip: import("@angular/core").InputSignal<string | null | undefined>;
    /** `true`/`false` makes it a `menuitemcheckbox` with a check mark. */
    readonly checked: import("@angular/core").InputSignal<boolean | null>;
    /** Leave the menu open after activation. */
    readonly keepOpen: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** The item was chosen (click, Enter or Space) and is not disabled. */
    readonly triggered: import("@angular/core").OutputEmitterRef<void>;
    /** The visible label, for typeahead. */
    label(): string;
    focus(): void;
    protected onClick(event: MouseEvent): void;
    protected onKeydown(event: KeyboardEvent): void;
    protected onHover(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthMenuItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthMenuItemComponent, "ath-menu-item, button[athMenuItem], a[athMenuItem]", ["athMenuItem"], { "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "shortcut": { "alias": "shortcut"; "required": false; "isSignal": true; }; "keyshortcuts": { "alias": "keyshortcuts"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "disabledReason": { "alias": "disabledReason"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; "checked": { "alias": "checked"; "required": false; "isSignal": true; }; "keepOpen": { "alias": "keepOpen"; "required": false; "isSignal": true; }; }, { "triggered": "triggered"; }, never, ["*"], true, never>;
}
/** A divider between groups of menu items. */
export declare class AthMenuSeparatorComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<AthMenuSeparatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthMenuSeparatorComponent, "ath-menu-separator", never, {}, {}, never, never, true, never>;
}
