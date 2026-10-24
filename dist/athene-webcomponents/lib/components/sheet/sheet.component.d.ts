import { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
/** Where focus goes when the sheet opens. */
export type SheetAutoFocus = 'panel' | 'first' | 'none';
/**
 * Athene Sheet: a non-modal side sheet at the inline end of the viewport
 * (the right in LTR), for detail that sits beside the page instead of over
 * it — a ticket's peek view next to the list it was opened from.
 *
 * - **Non-modal:** no scrim, no focus trap, no scroll lock. The page beside
 *   it stays usable; a click there does not close the sheet.
 * - **Top layer:** the panel is promoted with `popover="manual"`, so no
 *   ancestor's `overflow`, `transform` or `z-index` clips or covers it.
 *   Menus, pickers and dialogs opened later lie above it; the toast
 *   container is raised above it too. Without the Popover API it falls back
 *   to `position: fixed` at `--z-fixed`.
 * - **Escape** (topmost overlay only, via `AthOverlayStack`) asks to close:
 *   it emits `closed` and `openChange(false)`. The sheet is controlled and
 *   closes when `open` turns false, so a parent may refuse (an edit to
 *   cancel first).
 * - **Focus:** on open it moves into the sheet (`autoFocus`: the panel
 *   itself by default, or the first control); on close it returns to where
 *   it was before, when it was inside the sheet or would otherwise be lost.
 *   Tab moves on through the page as usual.
 *
 * The panel stays where the template puts it in the DOM (encapsulated
 * styles, event bubbling and tab order keep working) and inherits text
 * styles from there. `top` keeps a shell's top bar uncovered.
 *
 * @example
 * <ath-sheet [open]="!!ticket()" [ariaLabel]="ticket()?.title" width="560px" top="48px"
 *            (closed)="ticket.set(null)">
 *   …detail…
 * </ath-sheet>
 */
export declare class AthSheetComponent implements OnChanges, OnDestroy {
    private readonly stack;
    /** Whether the sheet is shown. Controlled; pair with `(openChange)` or `(closed)`. */
    readonly open: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Width (a CSS length); capped at the viewport. Default 480px. */
    readonly width: import("@angular/core").InputSignal<string | null>;
    /** Distance from the viewport's top (a CSS length), e.g. a top bar's height. Default 0. */
    readonly top: import("@angular/core").InputSignal<string | null>;
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    readonly ariaLabelledby: import("@angular/core").InputSignal<string | null>;
    readonly autoFocus: import("@angular/core").InputSignal<SheetAutoFocus>;
    /** Return focus to where it was before opening (see the class comment). */
    readonly restoreFocus: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Whether Escape asks to close. */
    readonly closeOnEscape: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Extra classes on the panel (it lives in this component's view). */
    readonly panelClass: import("@angular/core").InputSignal<string>;
    readonly panelId: import("@angular/core").InputSignal<string>;
    /** The user asked to close (Escape). */
    readonly closed: import("@angular/core").OutputEmitterRef<void>;
    /** Two-way partner of `open`; emits `false` on a close request. */
    readonly openChange: import("@angular/core").OutputEmitterRef<boolean>;
    /** The sheet is shown (in the top layer, focus placed). */
    readonly opened: import("@angular/core").OutputEmitterRef<void>;
    private panelEl;
    private returnFocus;
    private readonly entry;
    /** The panel element while open. */
    get panel(): HTMLElement | null;
    private set panelRef(value);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** Asks to close, as Escape does. */
    close(): void;
    private requestClose;
    private present;
    private focusInitial;
    private teardown;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSheetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSheetComponent, "ath-sheet", never, { "open": { "alias": "open"; "required": false; "isSignal": true; }; "width": { "alias": "width"; "required": false; "isSignal": true; }; "top": { "alias": "top"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "ariaLabelledby": { "alias": "ariaLabelledby"; "required": false; "isSignal": true; }; "autoFocus": { "alias": "autoFocus"; "required": false; "isSignal": true; }; "restoreFocus": { "alias": "restoreFocus"; "required": false; "isSignal": true; }; "closeOnEscape": { "alias": "closeOnEscape"; "required": false; "isSignal": true; }; "panelClass": { "alias": "panelClass"; "required": false; "isSignal": true; }; "panelId": { "alias": "panelId"; "required": false; "isSignal": true; }; }, { "closed": "closed"; "openChange": "openChange"; "opened": "opened"; }, never, ["*"], true, never>;
}
