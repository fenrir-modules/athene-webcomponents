import { ChangeDetectionStrategy, Component, booleanAttribute, effect, inject, input, output, untracked, viewChild, } from '@angular/core';
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
    /** The panel element while open. */
    get panel() {
        return this.panelEl;
    }
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
        /** The panel; rendered while `open` is true. */
        this.panelRef = viewChild('panel');
        // DOM sync, no state: the top layer, the overlay stack and focus follow
        // the panel element as `@if (open())` adds and removes it.
        effect(() => {
            const el = this.panelRef()?.nativeElement ?? null;
            untracked(() => this.attach(el));
        });
    }
    attach(el) {
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSheetComponent, isStandalone: true, selector: "ath-sheet", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, top: { classPropertyName: "top", publicName: "top", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabelledby: { classPropertyName: "ariaLabelledby", publicName: "ariaLabelledby", isSignal: true, isRequired: false, transformFunction: null }, autoFocus: { classPropertyName: "autoFocus", publicName: "autoFocus", isSignal: true, isRequired: false, transformFunction: null }, restoreFocus: { classPropertyName: "restoreFocus", publicName: "restoreFocus", isSignal: true, isRequired: false, transformFunction: null }, closeOnEscape: { classPropertyName: "closeOnEscape", publicName: "closeOnEscape", isSignal: true, isRequired: false, transformFunction: null }, panelClass: { classPropertyName: "panelClass", publicName: "panelClass", isSignal: true, isRequired: false, transformFunction: null }, panelId: { classPropertyName: "panelId", publicName: "panelId", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closed: "closed", openChange: "openChange", opened: "opened" }, viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["panel"], descendants: true, isSignal: true }], usesOnChanges: true, ngImport: i0, template: "@if (open()) {\n  <section\n    #panel\n    class=\"ath-sheet\"\n    [class]=\"panelClass()\"\n    [id]=\"panelId()\"\n    role=\"dialog\"\n    aria-modal=\"false\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    tabindex=\"-1\"\n    [style.--sheet-width]=\"width()\"\n    [style.--sheet-top]=\"top()\"\n  >\n    <ng-content />\n  </section>\n}\n", styles: [":host{display:contents}.ath-sheet{--sheet-width: 480px;--sheet-top: 0px;--sheet-shadow-x: -12px;--sheet-enter-x: 24px;position:fixed;inset-block:var(--sheet-top) 0;inset-inline:auto 0;z-index:var(--z-fixed);display:flex;flex-direction:column;box-sizing:border-box;width:min(var(--sheet-width),100vw);height:auto;max-width:none;max-height:none;margin:0;padding:0;overflow:hidden;color:var(--fg);background:var(--surface);border:0;border-inline-start:1px solid var(--border);box-shadow:var(--sheet-shadow-x) 0 32px -20px color-mix(in srgb,var(--scrim) 55%,transparent);outline:none;animation:ath-sheet-in .22s cubic-bezier(.16,1,.3,1)}.ath-sheet:dir(rtl){--sheet-shadow-x: 12px;--sheet-enter-x: -24px}@media (prefers-reduced-motion: reduce){.ath-sheet{animation:ath-sheet-fade .12s ease-out}}@keyframes ath-sheet-in{0%{opacity:0;transform:translate(var(--sheet-enter-x))}}@keyframes ath-sheet-fade{0%{opacity:0}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSheetComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sheet', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (open()) {\n  <section\n    #panel\n    class=\"ath-sheet\"\n    [class]=\"panelClass()\"\n    [id]=\"panelId()\"\n    role=\"dialog\"\n    aria-modal=\"false\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    tabindex=\"-1\"\n    [style.--sheet-width]=\"width()\"\n    [style.--sheet-top]=\"top()\"\n  >\n    <ng-content />\n  </section>\n}\n", styles: [":host{display:contents}.ath-sheet{--sheet-width: 480px;--sheet-top: 0px;--sheet-shadow-x: -12px;--sheet-enter-x: 24px;position:fixed;inset-block:var(--sheet-top) 0;inset-inline:auto 0;z-index:var(--z-fixed);display:flex;flex-direction:column;box-sizing:border-box;width:min(var(--sheet-width),100vw);height:auto;max-width:none;max-height:none;margin:0;padding:0;overflow:hidden;color:var(--fg);background:var(--surface);border:0;border-inline-start:1px solid var(--border);box-shadow:var(--sheet-shadow-x) 0 32px -20px color-mix(in srgb,var(--scrim) 55%,transparent);outline:none;animation:ath-sheet-in .22s cubic-bezier(.16,1,.3,1)}.ath-sheet:dir(rtl){--sheet-shadow-x: 12px;--sheet-enter-x: -24px}@media (prefers-reduced-motion: reduce){.ath-sheet{animation:ath-sheet-fade .12s ease-out}}@keyframes ath-sheet-in{0%{opacity:0;transform:translate(var(--sheet-enter-x))}}@keyframes ath-sheet-fade{0%{opacity:0}}\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3NoZWV0L3NoZWV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zaGVldC9zaGVldC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFLVCxnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBd0IsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUszRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFFcEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQVFILE1BQU0sT0FBTyxpQkFBaUI7SUF1QzVCLG9DQUFvQztJQUNwQyxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUtEO1FBOUNpQixVQUFLLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWpELHNGQUFzRjtRQUM3RSxTQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDOUQsbUVBQW1FO1FBQzFELFVBQUssR0FBRyxLQUFLLENBQWdCLElBQUksQ0FBQyxD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ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBib29sZWFuQXR0cmlidXRlLFxuICBlZmZlY3QsXG4gIGluamVjdCxcbiAgaW5wdXQsXG4gIG91dHB1dCxcbiAgdW50cmFja2VkLFxuICB2aWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc3VwcG9ydHNUb3BMYXllciB9IGZyb20gJy4uL2Zsb2F0aW5nL2Zsb2F0aW5nJztcbmltcG9ydCB7IEF0aE92ZXJsYXlTdGFjaywgdHlwZSBBdGhPdmVybGF5RW50cnkgfSBmcm9tICcuLi9mbG9hdGluZy9vdmVybGF5LXN0YWNrJztcbmltcG9ydCB7IGZvY3VzU2FmZWx5LCB0YWJiYWJsZXMgfSBmcm9tICcuLi9mbG9hdGluZy9mb2N1cyc7XG5cbi8qKiBXaGVyZSBmb2N1cyBnb2VzIHdoZW4gdGhlIHNoZWV0IG9wZW5zLiAqL1xuZXhwb3J0IHR5cGUgU2hlZXRBdXRvRm9jdXMgPSAncGFuZWwnIHwgJ2ZpcnN0JyB8ICdub25lJztcblxubGV0IG5leHRTaGVldElkID0gMDtcblxuLyoqXG4gKiBBdGhlbmUgU2hlZXQ6IGEgbm9uLW1vZGFsIHNpZGUgc2hlZXQgYXQgdGhlIGlubGluZSBlbmQgb2YgdGhlIHZpZXdwb3J0XG4gKiAodGhlIHJpZ2h0IGluIExUUiksIGZvciBkZXRhaWwgdGhhdCBzaXRzIGJlc2lkZSB0aGUgcGFnZSBpbnN0ZWFkIG9mIG92ZXJcbiAqIGl0IOKAlCBhIHRpY2tldCdzIHBlZWsgdmlldyBuZXh0IHRvIHRoZSBsaXN0IGl0IHdhcyBvcGVuZWQgZnJvbS5cbiAqXG4gKiAtICoqTm9uLW1vZGFsOioqIG5vIHNjcmltLCBubyBmb2N1cyB0cmFwLCBubyBzY3JvbGwgbG9jay4gVGhlIHBhZ2UgYmVzaWRlXG4gKiAgIGl0IHN0YXlzIHVzYWJsZTsgYSBjbGljayB0aGVyZSBkb2VzIG5vdCBjbG9zZSB0aGUgc2hlZXQuXG4gKiAtICoqVG9wIGxheWVyOioqIHRoZSBwYW5lbCBpcyBwcm9tb3RlZCB3aXRoIGBwb3BvdmVyPVwibWFudWFsXCJgLCBzbyBub1xuICogICBhbmNlc3RvcidzIGBvdmVyZmxvd2AsIGB0cmFuc2Zvcm1gIG9yIGB6LWluZGV4YCBjbGlwcyBvciBjb3ZlcnMgaXQuXG4gKiAgIE1lbnVzLCBwaWNrZXJzIGFuZCBkaWFsb2dzIG9wZW5lZCBsYXRlciBsaWUgYWJvdmUgaXQ7IHRoZSB0b2FzdFxuICogICBjb250YWluZXIgaXMgcmFpc2VkIGFib3ZlIGl0IHRvby4gV2l0aG91dCB0aGUgUG9wb3ZlciBBUEkgaXQgZmFsbHMgYmFja1xuICogICB0byBgcG9zaXRpb246IGZpeGVkYCBhdCBgLS16LWZpeGVkYC5cbiAqIC0gKipFc2NhcGUqKiAodG9wbW9zdCBvdmVybGF5IG9ubHksIHZpYSBgQXRoT3ZlcmxheVN0YWNrYCkgYXNrcyB0byBjbG9zZTpcbiAqICAgaXQgZW1pdHMgYGNsb3NlZGAgYW5kIGBvcGVuQ2hhbmdlKGZhbHNlKWAuIFRoZSBzaGVldCBpcyBjb250cm9sbGVkIGFuZFxuICogICBjbG9zZXMgd2hlbiBgb3BlbmAgdHVybnMgZmFsc2UsIHNvIGEgcGFyZW50IG1heSByZWZ1c2UgKGFuIGVkaXQgdG9cbiAqICAgY2FuY2VsIGZpcnN0KS5cbiAqIC0gKipGb2N1czoqKiBvbiBvcGVuIGl0IG1vdmVzIGludG8gdGhlIHNoZWV0IChgYXV0b0ZvY3VzYDogdGhlIHBhbmVsXG4gKiAgIGl0c2VsZiBieSBkZWZhdWx0LCBvciB0aGUgZmlyc3QgY29udHJvbCk7IG9uIGNsb3NlIGl0IHJldHVybnMgdG8gd2hlcmVcbiAqICAgaXQgd2FzIGJlZm9yZSwgd2hlbiBpdCB3YXMgaW5zaWRlIHRoZSBzaGVldCBvciB3b3VsZCBvdGhlcndpc2UgYmUgbG9zdC5cbiAqICAgVGFiIG1vdmVzIG9uIHRocm91Z2ggdGhlIHBhZ2UgYXMgdXN1YWwuXG4gKlxuICogVGhlIHBhbmVsIHN0YXlzIHdoZXJlIHRoZSB0ZW1wbGF0ZSBwdXRzIGl0IGluIHRoZSBET00gKGVuY2Fwc3VsYXRlZFxuICogc3R5bGVzLCBldmVudCBidWJibGluZyBhbmQgdGFiIG9yZGVyIGtlZXAgd29ya2luZykgYW5kIGluaGVyaXRzIHRleHRcbiAqIHN0eWxlcyBmcm9tIHRoZXJlLiBgdG9wYCBrZWVwcyBhIHNoZWxsJ3MgdG9wIGJhciB1bmNvdmVyZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtc2hlZXQgW29wZW5dPVwiISF0aWNrZXQoKVwiIFthcmlhTGFiZWxdPVwidGlja2V0KCk/LnRpdGxlXCIgd2lkdGg9XCI1NjBweFwiIHRvcD1cIjQ4cHhcIlxuICogICAgICAgICAgICAoY2xvc2VkKT1cInRpY2tldC5zZXQobnVsbClcIj5cbiAqICAg4oCmZGV0YWls4oCmXG4gKiA8L2F0aC1zaGVldD5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLXNoZWV0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaGVldC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9zaGVldC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFNoZWV0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0YWNrID0gaW5qZWN0KEF0aE92ZXJsYXlTdGFjayk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHNoZWV0IGlzIHNob3duLiBDb250cm9sbGVkOyBwYWlyIHdpdGggYChvcGVuQ2hhbmdlKWAgb3IgYChjbG9zZWQpYC4gKi9cbiAgcmVhZG9ubHkgb3BlbiA9IGlucHV0KGZhbHNlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgLyoqIFdpZHRoIChhIENTUyBsZW5ndGgpOyBjYXBwZWQgYXQgdGhlIHZpZXdwb3J0LiBEZWZhdWx0IDQ4MHB4LiAqL1xuICByZWFkb25seSB3aWR0aCA9IGlucHV0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICAvKiogRGlzdGFuY2UgZnJvbSB0aGUgdmlld3BvcnQncyB0b3AgKGEgQ1NTIGxlbmd0aCksIGUuZy4gYSB0b3AgYmFyJ3MgaGVpZ2h0LiBEZWZhdWx0IDAuICovXG4gIHJlYWRvbmx5IHRvcCA9IGlucHV0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBhcmlhTGFiZWwgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgYXJpYUxhYmVsbGVkYnkgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgYXV0b0ZvY3VzID0gaW5wdXQ8U2hlZXRBdXRvRm9jdXM+KCdwYW5lbCcpO1xuICAvKiogUmV0dXJuIGZvY3VzIHRvIHdoZXJlIGl0IHdhcyBiZWZvcmUgb3BlbmluZyAoc2VlIHRoZSBjbGFzcyBjb21tZW50KS4gKi9cbiAgcmVhZG9ubHkgcmVzdG9yZUZvY3VzID0gaW5wdXQodHJ1ZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBXaGV0aGVyIEVzY2FwZSBhc2tzIHRvIGNsb3NlLiAqL1xuICByZWFkb25seSBjbG9zZU9uRXNjYXBlID0gaW5wdXQodHJ1ZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBFeHRyYSBjbGFzc2VzIG9uIHRoZSBwYW5lbCAoaXQgbGl2ZXMgaW4gdGhpcyBjb21wb25lbnQncyB2aWV3KS4gKi9cbiAgcmVhZG9ubHkgcGFuZWxDbGFzcyA9IGlucHV0KCcnKTtcbiAgcmVhZG9ubHkgcGFuZWxJZCA9IGlucHV0KGBhdGgtc2hlZXQtJHsrK25leHRTaGVldElkfWApO1xuXG4gIC8qKiBUaGUgdXNlciBhc2tlZCB0byBjbG9zZSAoRXNjYXBlKS4gKi9cbiAgcmVhZG9ubHkgY2xvc2VkID0gb3V0cHV0PHZvaWQ+KCk7XG4gIC8qKiBUd28td2F5IHBhcnRuZXIgb2YgYG9wZW5gOyBlbWl0cyBgZmFsc2VgIG9uIGEgY2xvc2UgcmVxdWVzdC4gKi9cbiAgcmVhZG9ubHkgb3BlbkNoYW5nZSA9IG91dHB1dDxib29sZWFuPigpO1xuICAvKiogVGhlIHNoZWV0IGlzIHNob3duIChpbiB0aGUgdG9wIGxheWVyLCBmb2N1cyBwbGFjZWQpLiAqL1xuICByZWFkb25seSBvcGVuZWQgPSBvdXRwdXQ8dm9pZD4oKTtcblxuICBwcml2YXRlIHBhbmVsRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcmV0dXJuRm9jdXM6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbnRyeTogQXRoT3ZlcmxheUVudHJ5ID0ge1xuICAgIHBhbmVsOiAoKSA9PiB0aGlzLnBhbmVsRWwsXG4gICAgYW5jaG9yOiAoKSA9PiBudWxsLFxuICAgIGNsb3NlT25Fc2NhcGU6ICgpID0+IHRoaXMuY2xvc2VPbkVzY2FwZSgpLFxuICAgIC8vIE5vbi1tb2RhbDogdGhlIHBhZ2UgYmVzaWRlIHRoZSBzaGVldCBpcyBmb3Igd29ya2luZyBpbi5cbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiAoKSA9PiBmYWxzZSxcbiAgICBkaXNtaXNzOiAoKSA9PiB0aGlzLnJlcXVlc3RDbG9zZSgpLFxuICB9O1xuXG4gIC8qKiBUaGUgcGFuZWwgZWxlbWVudCB3aGlsZSBvcGVuLiAqL1xuICBnZXQgcGFuZWwoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbEVsO1xuICB9XG5cbiAgLyoqIFRoZSBwYW5lbDsgcmVuZGVyZWQgd2hpbGUgYG9wZW5gIGlzIHRydWUuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgcGFuZWxSZWYgPSB2aWV3Q2hpbGQ8RWxlbWVudFJlZjxIVE1MRWxlbWVudD4+KCdwYW5lbCcpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIERPTSBzeW5jLCBubyBzdGF0ZTogdGhlIHRvcCBsYXllciwgdGhlIG92ZXJsYXkgc3RhY2sgYW5kIGZvY3VzIGZvbGxvd1xuICAgIC8vIHRoZSBwYW5lbCBlbGVtZW50IGFzIGBAaWYgKG9wZW4oKSlgIGFkZHMgYW5kIHJlbW92ZXMgaXQuXG4gICAgZWZmZWN0KCgpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5wYW5lbFJlZigpPy5uYXRpdmVFbGVtZW50ID8/IG51bGw7XG4gICAgICB1bnRyYWNrZWQoKCkgPT4gdGhpcy5hdHRhY2goZWwpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZWwgPT09IHRoaXMucGFuZWxFbCkgcmV0dXJuO1xuICAgIGlmICh0aGlzLnBhbmVsRWwpIHRoaXMudGVhcmRvd24oKTtcbiAgICB0aGlzLnBhbmVsRWwgPSBlbDtcbiAgICBpZiAoZWwpIHRoaXMucHJlc2VudChlbCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgLy8gUmVtZW1iZXIgdGhlIGZvY3VzIGJlZm9yZSB0aGUgcGFuZWwgcmVuZGVycyBhbmQgdGFrZXMgaXQuXG4gICAgaWYgKGNoYW5nZXNbJ29wZW4nXSAmJiB0aGlzLm9wZW4oKSAmJiAhdGhpcy5wYW5lbEVsKSB7XG4gICAgICBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgdGhpcy5yZXR1cm5Gb2N1cyA9IGFjdGl2ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGFjdGl2ZSAhPT0gZG9jdW1lbnQuYm9keSA/IGFjdGl2ZSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFuZWxFbCkgdGhpcy50ZWFyZG93bigpO1xuICB9XG5cbiAgLyoqIEFza3MgdG8gY2xvc2UsIGFzIEVzY2FwZSBkb2VzLiAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3RDbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0Q2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xuICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlc2VudChlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YWNrLm9wZW4odGhpcy5lbnRyeSk7XG4gICAgaWYgKHN1cHBvcnRzVG9wTGF5ZXIoKSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdwb3BvdmVyJywgJ21hbnVhbCcpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZWwuc2hvd1BvcG92ZXIoKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBOb3QgY29ubmVjdGVkICh5ZXQpOiBzdGF5IGEgZml4ZWQgbGF5ZXIuXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgncG9wb3ZlcicpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBUb2FzdHMgc3RheSB2aXNpYmxlIGFib3ZlIHRoZSBzaGVldC5cbiAgICB0aGlzLnN0YWNrLnJhaXNlVG9wTGF5ZXIoKTtcbiAgICB0aGlzLmZvY3VzSW5pdGlhbChlbCk7XG4gICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c0luaXRpYWwoZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgbW9kZSA9IHRoaXMuYXV0b0ZvY3VzKCk7XG4gICAgaWYgKG1vZGUgPT09ICdub25lJykgcmV0dXJuO1xuICAgIGNvbnN0IGFjdGl2ZSA9IGVsLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoYWN0aXZlICYmIGFjdGl2ZSAhPT0gZWwgJiYgZWwuY29udGFpbnMoYWN0aXZlKSkgcmV0dXJuO1xuICAgIGlmIChtb2RlID09PSAnZmlyc3QnICYmIGZvY3VzU2FmZWx5KHRhYmJhYmxlcyhlbClbMF0pKSByZXR1cm47XG4gICAgZm9jdXNTYWZlbHkoZWwpO1xuICB9XG5cbiAgcHJpdmF0ZSB0ZWFyZG93bigpOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMucGFuZWxFbDtcbiAgICB0aGlzLnBhbmVsRWwgPSBudWxsO1xuICAgIHRoaXMuc3RhY2suY2xvc2UodGhpcy5lbnRyeSk7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGNvbnN0IGRvYyA9IGVsLm93bmVyRG9jdW1lbnQ7XG4gICAgLy8gUmVtb3ZlZCBmcm9tIHRoZSBkb2N1bWVudCBhbHJlYWR5ICh0aGUgcGFyZW50IGNsb3NlZCBpdCksIGZvY3VzIGlzXG4gICAgLy8gb24gdGhlIGJvZHk7IHN0aWxsIGluIGl0LCBmb2N1cyBtYXkgYmUgaW5zaWRlLlxuICAgIGNvbnN0IGxvc3QgPVxuICAgICAgIWRvYy5hY3RpdmVFbGVtZW50IHx8IGRvYy5hY3RpdmVFbGVtZW50ID09PSBkb2MuYm9keSB8fCBlbC5jb250YWlucyhkb2MuYWN0aXZlRWxlbWVudCk7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChlbC5tYXRjaGVzKCc6cG9wb3Zlci1vcGVuJykpIGVsLmhpZGVQb3BvdmVyKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBBbHJlYWR5IGdvbmUgZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAgfVxuICAgIGNvbnN0IGJhY2sgPSB0aGlzLnJldHVybkZvY3VzO1xuICAgIHRoaXMucmV0dXJuRm9jdXMgPSBudWxsO1xuICAgIGlmICh0aGlzLnJlc3RvcmVGb2N1cygpICYmIGxvc3QpIGZvY3VzU2FmZWx5KGJhY2spO1xuICB9XG59XG4iLCJAaWYgKG9wZW4oKSkge1xuICA8c2VjdGlvblxuICAgICNwYW5lbFxuICAgIGNsYXNzPVwiYXRoLXNoZWV0XCJcbiAgICBbY2xhc3NdPVwicGFuZWxDbGFzcygpXCJcbiAgICBbaWRdPVwicGFuZWxJZCgpXCJcbiAgICByb2xlPVwiZGlhbG9nXCJcbiAgICBhcmlhLW1vZGFsPVwiZmFsc2VcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsKClcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRieSgpXCJcbiAgICB0YWJpbmRleD1cIi0xXCJcbiAgICBbc3R5bGUuLS1zaGVldC13aWR0aF09XCJ3aWR0aCgpXCJcbiAgICBbc3R5bGUuLS1zaGVldC10b3BdPVwidG9wKClcIlxuICA+XG4gICAgPG5nLWNvbnRlbnQgLz5cbiAgPC9zZWN0aW9uPlxufVxuIl19