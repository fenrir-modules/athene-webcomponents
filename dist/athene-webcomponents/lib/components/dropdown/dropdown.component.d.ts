import { AfterViewInit } from '@angular/core';
import type { AthIconData } from '../floating/icon';
import type { FloatingAlign } from '../floating/floating';
import { AthMenuComponent } from '../menu/menu.component';
import * as i0 from "@angular/core";
/** An action of the menu; choosing it emits its `id`. */
export interface DropdownAction {
    id: string;
    label: string;
    /** A Lucide icon (`import { Pencil } from 'lucide-angular'`). */
    icon?: AthIconData;
    variant?: 'default' | 'danger';
    disabled?: boolean;
    /** A tooltip — e.g. why a disabled item cannot be chosen (also read by screen readers). */
    title?: string;
    /** Shortcut hint at the end of the item, e.g. `⌘E`. */
    shortcut?: string;
}
/** A hairline between two groups of actions; use `DROPDOWN_SEPARATOR`. */
export interface DropdownSeparator {
    readonly separator: true;
}
/** One entry of `ath-dropdown`: an action or `DROPDOWN_SEPARATOR`. */
export type DropdownItem = DropdownAction | DropdownSeparator;
/**
 * The separator entry: `[edit, rename, DROPDOWN_SEPARATOR, remove]`. It
 * replaces the old pseudo-item `{ id: 'divider', label: '', divider: true }`
 * (quality step 2.7).
 */
export declare const DROPDOWN_SEPARATOR: DropdownSeparator;
export declare function isDropdownSeparator(item: DropdownItem): item is DropdownSeparator;
type Entry = {
    key: string;
    action: DropdownAction | null;
};
/**
 * Horizontal alignment hint.
 * `'auto'` picks left or right based on available viewport space.
 */
export type DropdownAlign = 'left' | 'right' | 'auto';
/**
 * Athene Dropdown: an action menu from a flat `items` list. A preset on
 * `ath-menu` (keyboard, focus and ARIA come from there); for custom rows use
 * `ath-menu` + `athMenuItem` directly.
 *
 * The projected content is the trigger. When it is (or contains) a button,
 * that button is the menu button: one tab stop, with `aria-haspopup`,
 * `aria-expanded` and `aria-controls` on it. Plain content (text, an icon)
 * gets a `role="button"` wrapper instead.
 *
 * @example
 * <ath-dropdown [items]="menuItems" (itemClicked)="onAction($event)">
 *   <ath-button variant="ghost">Actions</ath-button>
 * </ath-dropdown>
 */
export declare class AthDropdownComponent implements AfterViewInit {
    /** Menu entries: actions, and `DROPDOWN_SEPARATOR` between groups. */
    readonly items: import("@angular/core").InputSignal<readonly DropdownItem[]>;
    /** Separators are keyed by position, actions by id. */
    protected readonly entries: import("@angular/core").Signal<Entry[]>;
    /**
     * Horizontal alignment hint.
     * - `'left'`  – menu anchored to the left edge of trigger
     * - `'right'` – menu anchored to the right edge of trigger
     * - `'auto'`  – pick best side based on viewport space
     *
     * Vertical direction is always auto-detected.
     */
    readonly align: import("@angular/core").InputSignal<DropdownAlign>;
    /** Item click event */
    readonly itemClicked: import("@angular/core").OutputEmitterRef<string>;
    /** Emits `true` when the menu opens, `false` when it closes. */
    readonly openChange: import("@angular/core").OutputEmitterRef<boolean>;
    protected readonly menuAlign: () => FloatingAlign;
    protected readonly menu: import("@angular/core").Signal<AthMenuComponent>;
    private readonly triggerRef;
    private readonly menuQuery;
    private viewReady;
    constructor();
    ngAfterViewInit(): void;
    /** Opens or closes the menu (focus goes to the first item when opening). */
    toggle(): void;
    /** Emits the item's id, as a click on it does. */
    selectItem(item: DropdownAction): void;
    protected onOpenChange(open: boolean): void;
    protected onHostClick(event: MouseEvent): void;
    protected onHostKeydown(event: KeyboardEvent): void;
    /** The trigger's real control, or the wrapper when there is none. */
    private control;
    private inTrigger;
    private syncAria;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthDropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthDropdownComponent, "ath-dropdown", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; }, { "itemClicked": "itemClicked"; "openChange": "openChange"; }, never, ["*"], true, never>;
}
export {};
