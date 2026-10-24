import * as i0 from "@angular/core";
/**
 * Shared part of `athPopoverTrigger` and `athMenuTrigger`: keeps
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control.
 * On a wrapper component such as `<ath-button>` that is its inner `<button>`,
 * so there is one tab stop and the state is announced where focus is.
 */
export declare abstract class AthOverlayTriggerBase {
    protected readonly host: HTMLElement;
    /** The value of `aria-haspopup`. */
    protected abstract popupKind(): string;
    protected abstract isOpen(): boolean;
    protected abstract popupId(): string;
    constructor();
    /** The focusable control the attributes go on. */
    get control(): HTMLElement;
    /** A stable id on the control, for `aria-labelledby` of the popup. */
    controlId(): string;
    private syncAria;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthOverlayTriggerBase, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AthOverlayTriggerBase, never, never, {}, {}, never, never, true, never>;
}
