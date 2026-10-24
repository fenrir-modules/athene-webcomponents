import { ChangeDetectionStrategy, Component, ViewChild, booleanAttribute, inject, input, output, } from '@angular/core';
import { supportsTopLayer } from '../floating/floating';
import { AthOverlayStack } from '../floating/overlay-stack';
import { focusSafely, tabbables } from '../floating/focus';
import * as i0 from "@angular/core";
let nextSheetId = 0;
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
export class AthSheetComponent {
    constructor() {
        this.stack = inject(AthOverlayStack);
        /** Whether the sheet is shown. Controlled; pair with `(openChange)` or `(closed)`. */
        this.open = input(false, { transform: booleanAttribute });
        /** Width (a CSS length); capped at the viewport. Default 480px. */
        this.width = input(null);
        /** Distance from the viewport's top (a CSS length), e.g. a top bar's height. Default 0. */
        this.top = input(null);
        this.ariaLabel = input(null);
        this.ariaLabelledby = input(null);
        this.autoFocus = input('panel');
        /** Return focus to where it was before opening (see the class comment). */
        this.restoreFocus = input(true, { transform: booleanAttribute });
        /** Whether Escape asks to close. */
        this.closeOnEscape = input(true, { transform: booleanAttribute });
        /** Extra classes on the panel (it lives in this component's view). */
        this.panelClass = input('');
        this.panelId = input(`ath-sheet-${++nextSheetId}`);
        /** The user asked to close (Escape). */
        this.closed = output();
        /** Two-way partner of `open`; emits `false` on a close request. */
        this.openChange = output();
        /** The sheet is shown (in the top layer, focus placed). */
        this.opened = output();
        this.panelEl = null;
        this.returnFocus = null;
        this.entry = {
            panel: () => this.panelEl,
            anchor: () => null,
            closeOnEscape: () => this.closeOnEscape(),
            // Non-modal: the page beside the sheet is for working in.
            closeOnOutsideClick: () => false,
            dismiss: () => this.requestClose(),
        };
    }
    /** The panel element while open. */
    get panel() {
        return this.panelEl;
    }
    set panelRef(ref) {
        const el = ref?.nativeElement ?? null;
        if (el === this.panelEl)
            return;
        if (this.panelEl)
            this.teardown();
        this.panelEl = el;
        if (el)
            this.present(el);
    }
    ngOnChanges(changes) {
        // Remember the focus before the panel renders and takes it.
        if (changes['open'] && this.open() && !this.panelEl) {
            const active = document.activeElement;
            this.returnFocus = active instanceof HTMLElement && active !== document.body ? active : null;
        }
    }
    ngOnDestroy() {
        if (this.panelEl)
            this.teardown();
    }
    /** Asks to close, as Escape does. */
    close() {
        this.requestClose();
    }
    requestClose() {
        this.closed.emit();
        this.openChange.emit(false);
    }
    present(el) {
        this.stack.open(this.entry);
        if (supportsTopLayer()) {
            el.setAttribute('popover', 'manual');
            try {
                el.showPopover();
            }
            catch {
                // Not connected (yet): stay a fixed layer.
                el.removeAttribute('popover');
            }
        }
        // Toasts stay visible above the sheet.
        this.stack.raiseTopLayer();
        this.focusInitial(el);
        this.opened.emit();
    }
    focusInitial(el) {
        const mode = this.autoFocus();
        if (mode === 'none')
            return;
        const active = el.ownerDocument.activeElement;
        if (active && active !== el && el.contains(active))
            return;
        if (mode === 'first' && focusSafely(tabbables(el)[0]))
            return;
        focusSafely(el);
    }
    teardown() {
        const el = this.panelEl;
        this.panelEl = null;
        this.stack.close(this.entry);
        if (!el)
            return;
        const doc = el.ownerDocument;
        // Removed from the document already (the parent closed it), focus is
        // on the body; still in it, focus may be inside.
        const lost = !doc.activeElement || doc.activeElement === doc.body || el.contains(doc.activeElement);
        try {
            if (el.matches(':popover-open'))
                el.hidePopover();
        }
        catch {
            // Already gone from the document.
        }
        const back = this.returnFocus;
        this.returnFocus = null;
        if (this.restoreFocus() && lost)
            focusSafely(back);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSheetComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSheetComponent, isStandalone: true, selector: "ath-sheet", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, top: { classPropertyName: "top", publicName: "top", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabelledby: { classPropertyName: "ariaLabelledby", publicName: "ariaLabelledby", isSignal: true, isRequired: false, transformFunction: null }, autoFocus: { classPropertyName: "autoFocus", publicName: "autoFocus", isSignal: true, isRequired: false, transformFunction: null }, restoreFocus: { classPropertyName: "restoreFocus", publicName: "restoreFocus", isSignal: true, isRequired: false, transformFunction: null }, closeOnEscape: { classPropertyName: "closeOnEscape", publicName: "closeOnEscape", isSignal: true, isRequired: false, transformFunction: null }, panelClass: { classPropertyName: "panelClass", publicName: "panelClass", isSignal: true, isRequired: false, transformFunction: null }, panelId: { classPropertyName: "panelId", publicName: "panelId", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closed: "closed", openChange: "openChange", opened: "opened" }, viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["panel"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "@if (open()) {\n  <section\n    #panel\n    class=\"ath-sheet\"\n    [class]=\"panelClass()\"\n    [id]=\"panelId()\"\n    role=\"dialog\"\n    aria-modal=\"false\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    tabindex=\"-1\"\n    [style.--sheet-width]=\"width()\"\n    [style.--sheet-top]=\"top()\"\n  >\n    <ng-content />\n  </section>\n}\n", styles: [":host{display:contents}.ath-sheet{--sheet-width: 480px;--sheet-top: 0px;--sheet-shadow-x: -12px;--sheet-enter-x: 24px;position:fixed;inset-block:var(--sheet-top) 0;inset-inline:auto 0;z-index:var(--z-fixed);display:flex;flex-direction:column;box-sizing:border-box;width:min(var(--sheet-width),100vw);height:auto;max-width:none;max-height:none;margin:0;padding:0;overflow:hidden;color:var(--fg);background:var(--surface);border:0;border-inline-start:1px solid var(--border);box-shadow:var(--sheet-shadow-x) 0 32px -20px color-mix(in srgb,var(--scrim) 55%,transparent);outline:none;animation:ath-sheet-in .22s cubic-bezier(.16,1,.3,1)}.ath-sheet:dir(rtl){--sheet-shadow-x: 12px;--sheet-enter-x: -24px}@media (prefers-reduced-motion: reduce){.ath-sheet{animation:ath-sheet-fade .12s ease-out}}@keyframes ath-sheet-in{0%{opacity:0;transform:translate(var(--sheet-enter-x))}}@keyframes ath-sheet-fade{0%{opacity:0}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSheetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sheet', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (open()) {\n  <section\n    #panel\n    class=\"ath-sheet\"\n    [class]=\"panelClass()\"\n    [id]=\"panelId()\"\n    role=\"dialog\"\n    aria-modal=\"false\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    tabindex=\"-1\"\n    [style.--sheet-width]=\"width()\"\n    [style.--sheet-top]=\"top()\"\n  >\n    <ng-content />\n  </section>\n}\n", styles: [":host{display:contents}.ath-sheet{--sheet-width: 480px;--sheet-top: 0px;--sheet-shadow-x: -12px;--sheet-enter-x: 24px;position:fixed;inset-block:var(--sheet-top) 0;inset-inline:auto 0;z-index:var(--z-fixed);display:flex;flex-direction:column;box-sizing:border-box;width:min(var(--sheet-width),100vw);height:auto;max-width:none;max-height:none;margin:0;padding:0;overflow:hidden;color:var(--fg);background:var(--surface);border:0;border-inline-start:1px solid var(--border);box-shadow:var(--sheet-shadow-x) 0 32px -20px color-mix(in srgb,var(--scrim) 55%,transparent);outline:none;animation:ath-sheet-in .22s cubic-bezier(.16,1,.3,1)}.ath-sheet:dir(rtl){--sheet-shadow-x: 12px;--sheet-enter-x: -24px}@media (prefers-reduced-motion: reduce){.ath-sheet{animation:ath-sheet-fade .12s ease-out}}@keyframes ath-sheet-in{0%{opacity:0;transform:translate(var(--sheet-enter-x))}}@keyframes ath-sheet-fade{0%{opacity:0}}\n"] }]
        }], propDecorators: { panelRef: [{
                type: ViewChild,
                args: ['panel']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3NoZWV0L3NoZWV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zaGVldC9zaGVldC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFLVCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQXdCLE1BQU0sMkJBQTJCLENBQUM7QUFDbEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFLM0QsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFRSCxNQUFNLE9BQU8saUJBQWlCO0lBUDlCO1FBUW1CLFVBQUssR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFakQsc0ZBQXNGO1FBQzdFLFNBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUM5RCxtRUFBbUU7UUFDMUQsVUFBSyxHQUFHLEtBQUssQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDNUMsMkZBQTJGO1FBQ2xGLFFBQUcsR0FBRyxLQUFLLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxLQUFLLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLG1CQUFjLEdBQUcsS0FBSyxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUM1QyxjQUFTLEdBQUcsS0FBSyxDQUFpQixPQUFPLENBQUMsQ0FBQztRQUNwRCwyRUFBMkU7UUFDbEUsaUJBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUNyRSxvQ0FBb0M7UUFDM0Isa0JBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQztRQUN0RSxzRUFBc0U7UUFDN0QsZUFBVSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixZQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXZELHdDQUF3QztRQUMvQixXQUFNLEdBQUcsTUFBTSxFQUFRLENBQUM7UUFDakMsbUVBQW1FO1FBQzFELGVBQVUsR0FBRyxNQUFNLEVBQVcsQ0FBQztRQUN4QywyREFBMkQ7UUFDbEQsV0FBTSxHQUFHLE1BQU0sRUFBUSxDQUFDO1FBRXpCLFlBQU8sR0FBdUIsSUFBSSxDQUFDO1FBQ25DLGdCQUFXLEdBQXVCLElBQUksQ0FBQztRQUU5QixVQUFLLEdBQW9CO1lBQ3hDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTztZQUN6QixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSTtZQUNsQixhQUFhLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN6QywwREFBMEQ7WUFDMUQsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSztZQUNoQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtTQUNuQyxDQUFDO0tBbUZIO0lBakZDLG9DQUFvQztJQUNwQyxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQ1ksUUFBUSxDQUFDLEdBQXdDO1FBQzNELE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBRSxhQUFhLElBQUksSUFBSSxDQUFDO1FBQ3RDLElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxPQUFPO1lBQUUsT0FBTztRQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksRUFBRTtZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyw0REFBNEQ7UUFDNUQsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLFlBQVksV0FBVyxJQUFJLE1BQU0sS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMvRixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxxQ0FBcUM7SUFDckMsS0FBSztRQUNILElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxPQUFPLENBQUMsRUFBZTtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7WUFDdkIsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDO2dCQUNILEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixDQUFDO1lBQUMsTUFBTSxDQUFDO2dCQUNQLDJDQUEyQztnQkFDM0MsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQztRQUNELHVDQUF1QztRQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU8sWUFBWSxDQUFDLEVBQWU7UUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLElBQUksSUFBSSxLQUFLLE1BQU07WUFBRSxPQUFPO1FBQzVCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1FBQzlDLElBQUksTUFBTSxJQUFJLE1BQU0sS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFBRSxPQUFPO1FBQzNELElBQUksSUFBSSxLQUFLLE9BQU8sSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUM5RCxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVPLFFBQVE7UUFDZCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsRUFBRTtZQUFFLE9BQU87UUFDaEIsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUM3QixxRUFBcUU7UUFDckUsaURBQWlEO1FBQ2pELE1BQU0sSUFBSSxHQUNSLENBQUMsR0FBRyxDQUFDLGFBQWEsSUFBSSxHQUFHLENBQUMsYUFBYSxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztnQkFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLGtDQUFrQztRQUNwQyxDQUFDO1FBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxJQUFJO1lBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7K0dBdkhVLGlCQUFpQjttR0FBakIsaUJBQWlCLGdqREM1RDlCLHlZQWlCQTs7NEZEMkNhLGlCQUFpQjtrQkFQN0IsU0FBUzsrQkFDRSxXQUFXLGNBQ1QsSUFBSSxtQkFDQyx1QkFBdUIsQ0FBQyxNQUFNOzhCQWlEbkMsUUFBUTtzQkFEbkIsU0FBUzt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgaW5qZWN0LFxuICBpbnB1dCxcbiAgb3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHN1cHBvcnRzVG9wTGF5ZXIgfSBmcm9tICcuLi9mbG9hdGluZy9mbG9hdGluZyc7XG5pbXBvcnQgeyBBdGhPdmVybGF5U3RhY2ssIHR5cGUgQXRoT3ZlcmxheUVudHJ5IH0gZnJvbSAnLi4vZmxvYXRpbmcvb3ZlcmxheS1zdGFjayc7XG5pbXBvcnQgeyBmb2N1c1NhZmVseSwgdGFiYmFibGVzIH0gZnJvbSAnLi4vZmxvYXRpbmcvZm9jdXMnO1xuXG4vKiogV2hlcmUgZm9jdXMgZ29lcyB3aGVuIHRoZSBzaGVldCBvcGVucy4gKi9cbmV4cG9ydCB0eXBlIFNoZWV0QXV0b0ZvY3VzID0gJ3BhbmVsJyB8ICdmaXJzdCcgfCAnbm9uZSc7XG5cbmxldCBuZXh0U2hlZXRJZCA9IDA7XG5cbi8qKlxuICogQXRoZW5lIFNoZWV0OiBhIG5vbi1tb2RhbCBzaWRlIHNoZWV0IGF0IHRoZSBpbmxpbmUgZW5kIG9mIHRoZSB2aWV3cG9ydFxuICogKHRoZSByaWdodCBpbiBMVFIpLCBmb3IgZGV0YWlsIHRoYXQgc2l0cyBiZXNpZGUgdGhlIHBhZ2UgaW5zdGVhZCBvZiBvdmVyXG4gKiBpdCDigJQgYSB0aWNrZXQncyBwZWVrIHZpZXcgbmV4dCB0byB0aGUgbGlzdCBpdCB3YXMgb3BlbmVkIGZyb20uXG4gKlxuICogLSAqKk5vbi1tb2RhbDoqKiBubyBzY3JpbSwgbm8gZm9jdXMgdHJhcCwgbm8gc2Nyb2xsIGxvY2suIFRoZSBwYWdlIGJlc2lkZVxuICogICBpdCBzdGF5cyB1c2FibGU7IGEgY2xpY2sgdGhlcmUgZG9lcyBub3QgY2xvc2UgdGhlIHNoZWV0LlxuICogLSAqKlRvcCBsYXllcjoqKiB0aGUgcGFuZWwgaXMgcHJvbW90ZWQgd2l0aCBgcG9wb3Zlcj1cIm1hbnVhbFwiYCwgc28gbm9cbiAqICAgYW5jZXN0b3IncyBgb3ZlcmZsb3dgLCBgdHJhbnNmb3JtYCBvciBgei1pbmRleGAgY2xpcHMgb3IgY292ZXJzIGl0LlxuICogICBNZW51cywgcGlja2VycyBhbmQgZGlhbG9ncyBvcGVuZWQgbGF0ZXIgbGllIGFib3ZlIGl0OyB0aGUgdG9hc3RcbiAqICAgY29udGFpbmVyIGlzIHJhaXNlZCBhYm92ZSBpdCB0b28uIFdpdGhvdXQgdGhlIFBvcG92ZXIgQVBJIGl0IGZhbGxzIGJhY2tcbiAqICAgdG8gYHBvc2l0aW9uOiBmaXhlZGAgYXQgYC0tei1maXhlZGAuXG4gKiAtICoqRXNjYXBlKiogKHRvcG1vc3Qgb3ZlcmxheSBvbmx5LCB2aWEgYEF0aE92ZXJsYXlTdGFja2ApIGFza3MgdG8gY2xvc2U6XG4gKiAgIGl0IGVtaXRzIGBjbG9zZWRgIGFuZCBgb3BlbkNoYW5nZShmYWxzZSlgLiBUaGUgc2hlZXQgaXMgY29udHJvbGxlZCBhbmRcbiAqICAgY2xvc2VzIHdoZW4gYG9wZW5gIHR1cm5zIGZhbHNlLCBzbyBhIHBhcmVudCBtYXkgcmVmdXNlIChhbiBlZGl0IHRvXG4gKiAgIGNhbmNlbCBmaXJzdCkuXG4gKiAtICoqRm9jdXM6Kiogb24gb3BlbiBpdCBtb3ZlcyBpbnRvIHRoZSBzaGVldCAoYGF1dG9Gb2N1c2A6IHRoZSBwYW5lbFxuICogICBpdHNlbGYgYnkgZGVmYXVsdCwgb3IgdGhlIGZpcnN0IGNvbnRyb2wpOyBvbiBjbG9zZSBpdCByZXR1cm5zIHRvIHdoZXJlXG4gKiAgIGl0IHdhcyBiZWZvcmUsIHdoZW4gaXQgd2FzIGluc2lkZSB0aGUgc2hlZXQgb3Igd291bGQgb3RoZXJ3aXNlIGJlIGxvc3QuXG4gKiAgIFRhYiBtb3ZlcyBvbiB0aHJvdWdoIHRoZSBwYWdlIGFzIHVzdWFsLlxuICpcbiAqIFRoZSBwYW5lbCBzdGF5cyB3aGVyZSB0aGUgdGVtcGxhdGUgcHV0cyBpdCBpbiB0aGUgRE9NIChlbmNhcHN1bGF0ZWRcbiAqIHN0eWxlcywgZXZlbnQgYnViYmxpbmcgYW5kIHRhYiBvcmRlciBrZWVwIHdvcmtpbmcpIGFuZCBpbmhlcml0cyB0ZXh0XG4gKiBzdHlsZXMgZnJvbSB0aGVyZS4gYHRvcGAga2VlcHMgYSBzaGVsbCdzIHRvcCBiYXIgdW5jb3ZlcmVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXNoZWV0IFtvcGVuXT1cIiEhdGlja2V0KClcIiBbYXJpYUxhYmVsXT1cInRpY2tldCgpPy50aXRsZVwiIHdpZHRoPVwiNTYwcHhcIiB0b3A9XCI0OHB4XCJcbiAqICAgICAgICAgICAgKGNsb3NlZCk9XCJ0aWNrZXQuc2V0KG51bGwpXCI+XG4gKiAgIOKApmRldGFpbOKAplxuICogPC9hdGgtc2hlZXQ+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1zaGVldCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vc2hlZXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vc2hlZXQuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhTaGVldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFjayA9IGluamVjdChBdGhPdmVybGF5U3RhY2spO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBzaGVldCBpcyBzaG93bi4gQ29udHJvbGxlZDsgcGFpciB3aXRoIGAob3BlbkNoYW5nZSlgIG9yIGAoY2xvc2VkKWAuICovXG4gIHJlYWRvbmx5IG9wZW4gPSBpbnB1dChmYWxzZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBXaWR0aCAoYSBDU1MgbGVuZ3RoKTsgY2FwcGVkIGF0IHRoZSB2aWV3cG9ydC4gRGVmYXVsdCA0ODBweC4gKi9cbiAgcmVhZG9ubHkgd2lkdGggPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgLyoqIERpc3RhbmNlIGZyb20gdGhlIHZpZXdwb3J0J3MgdG9wIChhIENTUyBsZW5ndGgpLCBlLmcuIGEgdG9wIGJhcidzIGhlaWdodC4gRGVmYXVsdCAwLiAqL1xuICByZWFkb25seSB0b3AgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgYXJpYUxhYmVsID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGFyaWFMYWJlbGxlZGJ5ID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGF1dG9Gb2N1cyA9IGlucHV0PFNoZWV0QXV0b0ZvY3VzPigncGFuZWwnKTtcbiAgLyoqIFJldHVybiBmb2N1cyB0byB3aGVyZSBpdCB3YXMgYmVmb3JlIG9wZW5pbmcgKHNlZSB0aGUgY2xhc3MgY29tbWVudCkuICovXG4gIHJlYWRvbmx5IHJlc3RvcmVGb2N1cyA9IGlucHV0KHRydWUsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogV2hldGhlciBFc2NhcGUgYXNrcyB0byBjbG9zZS4gKi9cbiAgcmVhZG9ubHkgY2xvc2VPbkVzY2FwZSA9IGlucHV0KHRydWUsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogRXh0cmEgY2xhc3NlcyBvbiB0aGUgcGFuZWwgKGl0IGxpdmVzIGluIHRoaXMgY29tcG9uZW50J3MgdmlldykuICovXG4gIHJlYWRvbmx5IHBhbmVsQ2xhc3MgPSBpbnB1dCgnJyk7XG4gIHJlYWRvbmx5IHBhbmVsSWQgPSBpbnB1dChgYXRoLXNoZWV0LSR7KytuZXh0U2hlZXRJZH1gKTtcblxuICAvKiogVGhlIHVzZXIgYXNrZWQgdG8gY2xvc2UgKEVzY2FwZSkuICovXG4gIHJlYWRvbmx5IGNsb3NlZCA9IG91dHB1dDx2b2lkPigpO1xuICAvKiogVHdvLXdheSBwYXJ0bmVyIG9mIGBvcGVuYDsgZW1pdHMgYGZhbHNlYCBvbiBhIGNsb3NlIHJlcXVlc3QuICovXG4gIHJlYWRvbmx5IG9wZW5DaGFuZ2UgPSBvdXRwdXQ8Ym9vbGVhbj4oKTtcbiAgLyoqIFRoZSBzaGVldCBpcyBzaG93biAoaW4gdGhlIHRvcCBsYXllciwgZm9jdXMgcGxhY2VkKS4gKi9cbiAgcmVhZG9ubHkgb3BlbmVkID0gb3V0cHV0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBwYW5lbEVsOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHJldHVybkZvY3VzOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZW50cnk6IEF0aE92ZXJsYXlFbnRyeSA9IHtcbiAgICBwYW5lbDogKCkgPT4gdGhpcy5wYW5lbEVsLFxuICAgIGFuY2hvcjogKCkgPT4gbnVsbCxcbiAgICBjbG9zZU9uRXNjYXBlOiAoKSA9PiB0aGlzLmNsb3NlT25Fc2NhcGUoKSxcbiAgICAvLyBOb24tbW9kYWw6IHRoZSBwYWdlIGJlc2lkZSB0aGUgc2hlZXQgaXMgZm9yIHdvcmtpbmcgaW4uXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogKCkgPT4gZmFsc2UsXG4gICAgZGlzbWlzczogKCkgPT4gdGhpcy5yZXF1ZXN0Q2xvc2UoKSxcbiAgfTtcblxuICAvKiogVGhlIHBhbmVsIGVsZW1lbnQgd2hpbGUgb3Blbi4gKi9cbiAgZ2V0IHBhbmVsKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxFbDtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3BhbmVsJylcbiAgcHJpdmF0ZSBzZXQgcGFuZWxSZWYocmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGVsID0gcmVmPy5uYXRpdmVFbGVtZW50ID8/IG51bGw7XG4gICAgaWYgKGVsID09PSB0aGlzLnBhbmVsRWwpIHJldHVybjtcbiAgICBpZiAodGhpcy5wYW5lbEVsKSB0aGlzLnRlYXJkb3duKCk7XG4gICAgdGhpcy5wYW5lbEVsID0gZWw7XG4gICAgaWYgKGVsKSB0aGlzLnByZXNlbnQoZWwpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIC8vIFJlbWVtYmVyIHRoZSBmb2N1cyBiZWZvcmUgdGhlIHBhbmVsIHJlbmRlcnMgYW5kIHRha2VzIGl0LlxuICAgIGlmIChjaGFuZ2VzWydvcGVuJ10gJiYgdGhpcy5vcGVuKCkgJiYgIXRoaXMucGFuZWxFbCkge1xuICAgICAgY29uc3QgYWN0aXZlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMucmV0dXJuRm9jdXMgPSBhY3RpdmUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBhY3RpdmUgIT09IGRvY3VtZW50LmJvZHkgPyBhY3RpdmUgOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhbmVsRWwpIHRoaXMudGVhcmRvd24oKTtcbiAgfVxuXG4gIC8qKiBBc2tzIHRvIGNsb3NlLCBhcyBFc2NhcGUgZG9lcy4gKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0Q2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdENsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VkLmVtaXQoKTtcbiAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIHByZXNlbnQoZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5zdGFjay5vcGVuKHRoaXMuZW50cnkpO1xuICAgIGlmIChzdXBwb3J0c1RvcExheWVyKCkpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgncG9wb3ZlcicsICdtYW51YWwnKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVsLnNob3dQb3BvdmVyKCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gTm90IGNvbm5lY3RlZCAoeWV0KTogc3RheSBhIGZpeGVkIGxheWVyLlxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3BvcG92ZXInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVG9hc3RzIHN0YXkgdmlzaWJsZSBhYm92ZSB0aGUgc2hlZXQuXG4gICAgdGhpcy5zdGFjay5yYWlzZVRvcExheWVyKCk7XG4gICAgdGhpcy5mb2N1c0luaXRpYWwoZWwpO1xuICAgIHRoaXMub3BlbmVkLmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNJbml0aWFsKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IG1vZGUgPSB0aGlzLmF1dG9Gb2N1cygpO1xuICAgIGlmIChtb2RlID09PSAnbm9uZScpIHJldHVybjtcbiAgICBjb25zdCBhY3RpdmUgPSBlbC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGFjdGl2ZSAmJiBhY3RpdmUgIT09IGVsICYmIGVsLmNvbnRhaW5zKGFjdGl2ZSkpIHJldHVybjtcbiAgICBpZiAobW9kZSA9PT0gJ2ZpcnN0JyAmJiBmb2N1c1NhZmVseSh0YWJiYWJsZXMoZWwpWzBdKSkgcmV0dXJuO1xuICAgIGZvY3VzU2FmZWx5KGVsKTtcbiAgfVxuXG4gIHByaXZhdGUgdGVhcmRvd24oKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLnBhbmVsRWw7XG4gICAgdGhpcy5wYW5lbEVsID0gbnVsbDtcbiAgICB0aGlzLnN0YWNrLmNsb3NlKHRoaXMuZW50cnkpO1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBjb25zdCBkb2MgPSBlbC5vd25lckRvY3VtZW50O1xuICAgIC8vIFJlbW92ZWQgZnJvbSB0aGUgZG9jdW1lbnQgYWxyZWFkeSAodGhlIHBhcmVudCBjbG9zZWQgaXQpLCBmb2N1cyBpc1xuICAgIC8vIG9uIHRoZSBib2R5OyBzdGlsbCBpbiBpdCwgZm9jdXMgbWF5IGJlIGluc2lkZS5cbiAgICBjb25zdCBsb3N0ID1cbiAgICAgICFkb2MuYWN0aXZlRWxlbWVudCB8fCBkb2MuYWN0aXZlRWxlbWVudCA9PT0gZG9jLmJvZHkgfHwgZWwuY29udGFpbnMoZG9jLmFjdGl2ZUVsZW1lbnQpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZWwubWF0Y2hlcygnOnBvcG92ZXItb3BlbicpKSBlbC5oaWRlUG9wb3ZlcigpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gQWxyZWFkeSBnb25lIGZyb20gdGhlIGRvY3VtZW50LlxuICAgIH1cbiAgICBjb25zdCBiYWNrID0gdGhpcy5yZXR1cm5Gb2N1cztcbiAgICB0aGlzLnJldHVybkZvY3VzID0gbnVsbDtcbiAgICBpZiAodGhpcy5yZXN0b3JlRm9jdXMoKSAmJiBsb3N0KSBmb2N1c1NhZmVseShiYWNrKTtcbiAgfVxufVxuIiwiQGlmIChvcGVuKCkpIHtcbiAgPHNlY3Rpb25cbiAgICAjcGFuZWxcbiAgICBjbGFzcz1cImF0aC1zaGVldFwiXG4gICAgW2NsYXNzXT1cInBhbmVsQ2xhc3MoKVwiXG4gICAgW2lkXT1cInBhbmVsSWQoKVwiXG4gICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgYXJpYS1tb2RhbD1cImZhbHNlXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbCgpXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkYnkoKVwiXG4gICAgdGFiaW5kZXg9XCItMVwiXG4gICAgW3N0eWxlLi0tc2hlZXQtd2lkdGhdPVwid2lkdGgoKVwiXG4gICAgW3N0eWxlLi0tc2hlZXQtdG9wXT1cInRvcCgpXCJcbiAgPlxuICAgIDxuZy1jb250ZW50IC8+XG4gIDwvc2VjdGlvbj5cbn1cbiJdfQ==