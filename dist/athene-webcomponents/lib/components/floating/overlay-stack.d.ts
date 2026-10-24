import * as i0 from "@angular/core";
/** Why an overlay closed. */
export type AthOverlayCloseReason = 'escape' | 'outside' | 'select' | 'tab' | 'programmatic';
/** What an open overlay tells the stack about itself. */
export interface AthOverlayEntry {
    /** The overlay's box; clicks inside it are not "outside". */
    panel(): HTMLElement | null;
    /** The trigger or anchor; clicks on it are left to its own toggle. */
    anchor(): HTMLElement | null;
    /** Modal overlays (dialogs) stop outside-click handling for everything below them. */
    readonly modal?: boolean;
    closeOnEscape(): boolean;
    closeOnOutsideClick(): boolean;
    dismiss(reason: 'escape' | 'outside'): void;
}
/**
 * The open overlays (popovers, menus, pickers, dialogs) in opening order.
 * One document listener each for Escape and outside pointer-downs, so only
 * the topmost overlay reacts to Escape and a click inside a nested overlay
 * does not close its parent. Also owns the page scroll lock of modal dialogs.
 */
export declare class AthOverlayStack {
    private readonly doc;
    private readonly entries;
    private listening;
    private escapeTask;
    private locks;
    private savedScroll;
    /** Registers an overlay as the new topmost one. */
    open(entry: AthOverlayEntry): void;
    /** Unregisters an overlay (idempotent). */
    close(entry: AthOverlayEntry): void;
    isTop(entry: AthOverlayEntry): boolean;
    /** How many overlays are open. */
    get size(): number;
    /**
     * True while the current Escape key press has already closed an overlay.
     * A native modal `<dialog>` checks this in its `cancel` event, which the
     * browser fires after the keydown, so one press closes one layer.
     */
    escapeConsumed(): boolean;
    /**
     * A modal dialog that opens goes on top of the top layer. Elements marked
     * `data-ath-top-layer` (the toast container) are moved back above it, so a
     * toast raised while a dialog is open is still seen.
     */
    raiseTopLayer(): void;
    /** Locks page scrolling while at least one lock is held (modal dialogs). */
    lockScroll(): void;
    unlockScroll(): void;
    private remove;
    private readonly onKeydown;
    private readonly onPointerDown;
    private markEscape;
    /**
     * Registered only while an overlay is open. No `NgZone`: in a zone.js app
     * the listeners run in the Angular zone like any template listener, so a
     * dismissal's handlers (the overlay's `closed`, the app's reaction) are
     * followed by change detection; zoneless, the signals and output
     * listeners they touch schedule it.
     */
    private listen;
    private unlisten;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthOverlayStack, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AthOverlayStack>;
}
