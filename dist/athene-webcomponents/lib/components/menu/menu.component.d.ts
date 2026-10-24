import type { FloatingAlign, FloatingSide } from '../floating/floating';
import { type FloatingAnchor } from '../floating/floating.directive';
import type { AthOverlayCloseReason } from '../floating/overlay-stack';
import { type AthMenuParent } from './menu-parent';
import * as i0 from "@angular/core";
/** Which item gets focus when the menu opens. */
export type MenuFocus = 'first' | 'last' | 'none';
/**
 * Athene Menu: the WAI-ARIA menu button pattern for row actions, `⋯` menus
 * and toolbars.
 *
 * Keyboard: on the trigger Enter, Space and ArrowDown open on the first
 * item, ArrowUp on the last. In the menu: ArrowDown/ArrowUp (wrapping),
 * Home/End, typeahead, Enter/Space activate, Escape closes and returns
 * focus to the trigger, Tab closes and moves on.
 *
 * @example
 * <ath-button variant="ghost" [athMenuTrigger]="rowMenu" ariaLabel="Actions">⋯</ath-button>
 * <ath-menu #rowMenu>
 *   <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 *   <ath-menu-separator />
 *   <button athMenuItem variant="danger" (triggered)="remove()">Delete</button>
 * </ath-menu>
 */
export declare class AthMenuComponent implements AthMenuParent {
    /** Whether the menu is shown. Two-way: `[(open)]`. */
    readonly open: import("@angular/core").ModelSignal<boolean>;
    /** Anchor for programmatic use; `athMenuTrigger` sets it on its own. */
    readonly anchor: import("@angular/core").InputSignal<FloatingAnchor>;
    readonly align: import("@angular/core").InputSignal<FloatingAlign>;
    readonly side: import("@angular/core").InputSignal<FloatingSide>;
    readonly maxHeight: import("@angular/core").InputSignal<number | null>;
    /** Accessible name; by default the menu is labelled by its trigger. */
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    readonly panelClass: import("@angular/core").InputSignal<string>;
    readonly opened: import("@angular/core").OutputEmitterRef<void>;
    readonly closed: import("@angular/core").OutputEmitterRef<AthOverlayCloseReason>;
    readonly panelId: string;
    protected readonly labelledBy: import("@angular/core").WritableSignal<string | null>;
    private readonly popover;
    private readonly items;
    private readonly typeahead;
    private pendingFocus;
    isOpen(): boolean;
    /** Opens the menu from `anchor`, focusing the first or last item. */
    show(anchor?: FloatingAnchor, focus?: MenuFocus): void;
    /** Closes the menu; focus returns to the trigger unless `restoreFocus` is false. */
    hide(restoreFocus?: boolean): void;
    toggle(anchor?: FloatingAnchor, focus?: MenuFocus): void;
    /** Called by `athMenuTrigger`: the trigger names the menu. */
    labelFrom(triggerId: string): void;
    itemActivated(item: {
        keepOpen(): boolean;
    }): void;
    protected onOpened(): void;
    protected onKeydown(event: KeyboardEvent): void;
    private focusEdge;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthMenuComponent, "ath-menu", ["athMenu"], { "open": { "alias": "open"; "required": false; "isSignal": true; }; "anchor": { "alias": "anchor"; "required": false; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; "side": { "alias": "side"; "required": false; "isSignal": true; }; "maxHeight": { "alias": "maxHeight"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "panelClass": { "alias": "panelClass"; "required": false; "isSignal": true; }; }, { "open": "openChange"; "opened": "opened"; "closed": "closed"; }, ["items"], ["*"], true, never>;
}
