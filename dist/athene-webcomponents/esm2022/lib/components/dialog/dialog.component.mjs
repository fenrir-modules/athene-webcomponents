import { ChangeDetectionStrategy, Component, booleanAttribute, computed, effect, inject, input, output, untracked, viewChild, } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { injectAthLabels } from '../../i18n/label-utils';
import { AthOverlayStack } from '../floating/overlay-stack';
import { focusSafely, tabbables, trapTab } from '../floating/focus';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
let nextDialogId = 0;
/**
 * Athene Dialog: the one modal of the library, on a native `<dialog>`
 * opened with `showModal()`. That puts it in the top layer (no z-index, no
 * clipping), makes the rest of the page inert and gives a `::backdrop`
 * (`--scrim`). On top: Tab stays inside, page scroll is locked, Escape and
 * backdrop clicks follow `closeOnEscape` / `closeOnBackdrop`, and focus goes
 * back to where it was when the dialog closes.
 *
 * Controlled: a close request (✕, Escape, backdrop) emits `closed` and
 * `openChange(false)`; the dialog closes when `open` becomes false, so a
 * parent can refuse (unsaved changes). `[(open)]` works.
 *
 * Content: the default slot is the scrolling body; `[slot=header]` (or
 * `[athDialogHeader]`) goes into the header under the title,
 * `[slot=footer]` (or `[athDialogFooter]`) into the footer. Initial focus:
 * an element with `autofocus`, else the first control in the body/footer,
 * else the close button.
 *
 * `bare`: no header, footer, close button or surface. The dialog is a
 * transparent layer over the viewport and the content draws and places its
 * own surface (a palette at the top, a bottom sheet, a composer with its own
 * head); a click on the layer around it counts as a backdrop click. Top
 * layer, inert page, scrim, focus trap, Escape and focus return stay. Name it
 * with `ariaLabel`.
 *
 * @example
 * <ath-dialog [(open)]="isOpen" title="Create item" (closed)="onClose()">
 *   <p>Dialog content here</p>
 *   <div slot="footer">
 *     <ath-button variant="secondary" (clicked)="isOpen = false">Cancel</ath-button>
 *     <ath-button (clicked)="save()">Save</ath-button>
 *   </div>
 * </ath-dialog>
 */
export class AthDialogComponent {
    constructor() {
        this.stack = inject(AthOverlayStack);
        this.labels = injectAthLabels();
        /** Ids that name and describe the dialog (`aria-labelledby/-describedby`). */
        this.titleId = `ath-dialog-title-${++nextDialogId}`;
        this.descriptionId = `ath-dialog-desc-${nextDialogId}`;
        /** Whether the dialog is open. Two-way: `[(open)]`. */
        this.open = input(false, { transform: booleanAttribute });
        /** Dialog title (names the dialog). */
        this.title = input('');
        /** Dialog description (describes the dialog). */
        this.description = input('');
        this.size = input('md');
        /** Whether clicking the backdrop requests closing. */
        this.closeOnBackdrop = input(true, { transform: booleanAttribute });
        /** Whether Escape requests closing. */
        this.closeOnEscape = input(true, { transform: booleanAttribute });
        /** Show the ✕ button in the header. */
        this.showClose = input(true, { transform: booleanAttribute });
        /** Accessible name of the close button; defaults to `ATH_LABELS.closeDialog`. */
        this.closeLabel = input(null);
        /** Accessible name when there is no visible `title`. */
        this.ariaLabel = input(null);
        /** `alertdialog` for confirmations that interrupt. */
        this.role = input('dialog');
        /**
         * Only the content, on a transparent full-viewport layer: the content is
         * the surface and places itself (see the class comment). `title`,
         * `description`, `size` and `showClose` do not apply.
         */
        this.bare = input(false, { transform: booleanAttribute });
        /** The user asked to close (✕, Escape, backdrop). */
        this.closed = output();
        /** Two-way partner of `open`; emits `false` on a close request. */
        this.openChange = output();
        /** The dialog is shown (after `showModal()`). */
        this.opened = output();
        this.closeIcon = X;
        this.closeText = computed(() => this.closeLabel() ?? this.labels.closeDialog());
        this.dialogEl = null;
        this.returnFocus = null;
        this.pressedOnBackdrop = false;
        this.locked = false;
        this.entry = {
            modal: true,
            panel: () => this.dialogEl,
            anchor: () => null,
            closeOnEscape: () => this.closeOnEscape(),
            closeOnOutsideClick: () => false,
            dismiss: () => this.requestClose(),
        };
        /** The `<dialog>`; rendered while `open` is true. */
        this.dialogRef = viewChild('dialog');
        // DOM sync, no state: `showModal()`, the overlay stack and focus follow
        // the `<dialog>` element as `@if (open())` adds and removes it.
        effect(() => {
            const el = this.dialogRef()?.nativeElement ?? null;
            untracked(() => this.attach(el));
        });
    }
    ngOnChanges(changes) {
        // Remember the focus before the dialog renders and takes it.
        if (changes['open'] && this.open() && !this.dialogEl) {
            const active = document.activeElement;
            this.returnFocus = active instanceof HTMLElement && active !== document.body ? active : null;
        }
    }
    ngOnDestroy() {
        if (this.dialogEl)
            this.teardown();
    }
    attach(el) {
        if (el === this.dialogEl)
            return;
        if (this.dialogEl)
            this.teardown();
        this.dialogEl = el;
        if (el)
            this.present(el);
    }
    /** Requests closing, as the ✕ button does. */
    close() {
        this.requestClose();
    }
    onKeydown(event) {
        if (this.dialogEl)
            trapTab(event, this.dialogEl);
    }
    /** Escape: the browser's close request. Always prevented; the parent decides. */
    onCancel(event) {
        event.preventDefault();
        if (!this.closeOnEscape() || this.stack.escapeConsumed() || !this.stack.isTop(this.entry)) {
            return;
        }
        this.requestClose();
    }
    /** The browser closed it anyway (e.g. a forced close request). */
    onNativeClose() {
        if (this.open() && this.dialogEl && !this.dialogEl.open)
            this.requestClose();
    }
    onPointerDown(event) {
        this.pressedOnBackdrop = this.isBackdropEvent(event);
    }
    onClick(event) {
        const onBackdrop = this.pressedOnBackdrop && this.isBackdropEvent(event);
        this.pressedOnBackdrop = false;
        if (onBackdrop && this.closeOnBackdrop() && this.stack.isTop(this.entry))
            this.requestClose();
    }
    requestClose() {
        this.closed.emit();
        this.openChange.emit(false);
    }
    /**
     * A press on the `::backdrop`: it targets the dialog, outside its box. In
     * `bare` mode the dialog is the transparent layer around the content, so
     * any press on the dialog element itself is one.
     */
    isBackdropEvent(event) {
        const el = this.dialogEl;
        if (!el || event.target !== el)
            return false;
        if (this.bare())
            return true;
        const r = el.getBoundingClientRect();
        return (event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom);
    }
    present(el) {
        this.stack.open(this.entry);
        this.stack.lockScroll();
        this.locked = true;
        try {
            if (!el.open)
                el.showModal();
        }
        catch {
            // Not connected (yet): show it non-modally rather than not at all.
            el.setAttribute('open', '');
        }
        this.stack.raiseTopLayer();
        this.focusInitial(el);
        this.opened.emit();
    }
    focusInitial(el) {
        const auto = el.querySelector('[autofocus]');
        if (auto && focusSafely(auto))
            return;
        const parts = el.querySelectorAll('.ath-dialog__bare, .ath-dialog__body, .ath-dialog__footer');
        for (const part of Array.from(parts)) {
            const first = tabbables(part)[0];
            if (first && focusSafely(first))
                return;
        }
        if (!focusSafely(tabbables(el)[0]))
            focusSafely(el);
    }
    teardown() {
        const el = this.dialogEl;
        this.dialogEl = null;
        this.stack.close(this.entry);
        if (this.locked)
            this.stack.unlockScroll();
        this.locked = false;
        try {
            if (el?.open)
                el.close();
        }
        catch {
            // Already removed.
        }
        const back = this.returnFocus;
        this.returnFocus = null;
        focusSafely(back);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDialogComponent, isStandalone: true, selector: "ath-dialog", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, closeOnBackdrop: { classPropertyName: "closeOnBackdrop", publicName: "closeOnBackdrop", isSignal: true, isRequired: false, transformFunction: null }, closeOnEscape: { classPropertyName: "closeOnEscape", publicName: "closeOnEscape", isSignal: true, isRequired: false, transformFunction: null }, showClose: { classPropertyName: "showClose", publicName: "showClose", isSignal: true, isRequired: false, transformFunction: null }, closeLabel: { classPropertyName: "closeLabel", publicName: "closeLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, role: { classPropertyName: "role", publicName: "role", isSignal: true, isRequired: false, transformFunction: null }, bare: { classPropertyName: "bare", publicName: "bare", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closed: "closed", openChange: "openChange", opened: "opened" }, host: { listeners: { "pointerdown": "onPointerDown($event)", "click": "onClick($event)" } }, viewQueries: [{ propertyName: "dialogRef", first: true, predicate: ["dialog"], descendants: true, isSignal: true }], usesOnChanges: true, ngImport: i0, template: "<!-- One default slot, shown in the body or, when bare, on its own. -->\n<ng-template #content><ng-content /></ng-template>\n\n@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"bare() ? 'ath-dialog--bare' : 'ath-dialog--' + size()\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() && !bare() ? titleId : null\"\n    [attr.aria-label]=\"title() && !bare() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() && !bare() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    @if (bare()) {\n      <div class=\"ath-dialog__bare\">\n        <ng-container [ngTemplateOutlet]=\"content\" />\n      </div>\n    } @else {\n      <div class=\"ath-dialog__surface\">\n        <header class=\"ath-dialog__header\">\n          <div class=\"ath-dialog__header-text\">\n            @if (title()) {\n              <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n            }\n            @if (description()) {\n              <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n            }\n            <ng-content select=\"[slot=header],[athDialogHeader]\" />\n          </div>\n          @if (showClose()) {\n            <button\n              class=\"ath-dialog__close\"\n              type=\"button\"\n              [attr.aria-label]=\"closeText()\"\n              (click)=\"close()\"\n            >\n              <lucide-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n            </button>\n          }\n        </header>\n\n        <div class=\"ath-dialog__body\">\n          <ng-container [ngTemplateOutlet]=\"content\" />\n        </div>\n\n        <footer class=\"ath-dialog__footer\">\n          <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n        </footer>\n      </div>\n    }\n  </dialog>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog--bare{width:100%;height:100%;max-width:none;max-height:none;margin:0;overflow:hidden;background:transparent;border:0;border-radius:0;box-shadow:none}.ath-dialog--bare[open]{display:block;animation:none}.ath-dialog__bare{display:contents}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dialog', standalone: true, imports: [LucideAngularModule, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(pointerdown)': 'onPointerDown($event)',
                        '(click)': 'onClick($event)',
                    }, template: "<!-- One default slot, shown in the body or, when bare, on its own. -->\n<ng-template #content><ng-content /></ng-template>\n\n@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"bare() ? 'ath-dialog--bare' : 'ath-dialog--' + size()\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() && !bare() ? titleId : null\"\n    [attr.aria-label]=\"title() && !bare() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() && !bare() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    @if (bare()) {\n      <div class=\"ath-dialog__bare\">\n        <ng-container [ngTemplateOutlet]=\"content\" />\n      </div>\n    } @else {\n      <div class=\"ath-dialog__surface\">\n        <header class=\"ath-dialog__header\">\n          <div class=\"ath-dialog__header-text\">\n            @if (title()) {\n              <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n            }\n            @if (description()) {\n              <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n            }\n            <ng-content select=\"[slot=header],[athDialogHeader]\" />\n          </div>\n          @if (showClose()) {\n            <button\n              class=\"ath-dialog__close\"\n              type=\"button\"\n              [attr.aria-label]=\"closeText()\"\n              (click)=\"close()\"\n            >\n              <lucide-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n            </button>\n          }\n        </header>\n\n        <div class=\"ath-dialog__body\">\n          <ng-container [ngTemplateOutlet]=\"content\" />\n        </div>\n\n        <footer class=\"ath-dialog__footer\">\n          <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n        </footer>\n      </div>\n    }\n  </dialog>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog--bare{width:100%;height:100%;max-width:none;max-height:none;margin:0;overflow:hidden;background:transparent;border:0;border-radius:0;box-shadow:none}.ath-dialog--bare[open]{display:block;animation:none}.ath-dialog__bare{display:contents}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUtULGdCQUFnQixFQUNoQixRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUF3QixNQUFNLDJCQUEyQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFXcEUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFhSCxNQUFNLE9BQU8sa0JBQWtCO0lBNkQ3QjtRQTVEaUIsVUFBSyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoQyxXQUFNLEdBQUcsZUFBZSxFQUFFLENBQUM7UUFFNUMsOEVBQThFO1FBQzNELFlBQU8sR0FBRyxvQkFBb0IsRUFBRSxZQUFZLEVB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LEVBQUUsZ0JBQWdCLENBQUMsbUJBQy9CLHVCQUF1QixDQUFDLE1BQU0sUUFHekM7d0JBQ0osZUFBZSxFQUFFLHVCQUF1Qjt3QkFDeEMsU0FBUyxFQUFFLGlCQUFpQjtxQkFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgY29tcHV0ZWQsXG4gIGVmZmVjdCxcbiAgaW5qZWN0LFxuICBpbnB1dCxcbiAgb3V0cHV0LFxuICB1bnRyYWNrZWQsXG4gIHZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1RlbXBsYXRlT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUsIFggfSBmcm9tICdsdWNpZGUtYW5ndWxhcic7XG5pbXBvcnQgeyBpbmplY3RBdGhMYWJlbHMgfSBmcm9tICcuLi8uLi9pMThuL2xhYmVsLXV0aWxzJztcbmltcG9ydCB7IEF0aE92ZXJsYXlTdGFjaywgdHlwZSBBdGhPdmVybGF5RW50cnkgfSBmcm9tICcuLi9mbG9hdGluZy9vdmVybGF5LXN0YWNrJztcbmltcG9ydCB7IGZvY3VzU2FmZWx5LCB0YWJiYWJsZXMsIHRyYXBUYWIgfSBmcm9tICcuLi9mbG9hdGluZy9mb2N1cyc7XG5cbi8qKlxuICogRGlhbG9nIHNpemUgdmFyaWFudHM6IG1heCB3aWR0aHMgNDAwIC8gNTIwIC8gNjgwIC8gODYwcHgsIGBmdWxsYCA9IHRoZVxuICogdmlld3BvcnQgbWludXMgYSBtYXJnaW4uXG4gKi9cbmV4cG9ydCB0eXBlIERpYWxvZ1NpemUgPSAnc20nIHwgJ21kJyB8ICdsZycgfCAneGwnIHwgJ2Z1bGwnO1xuXG4vKiogQVJJQSByb2xlIG9mIHRoZSBkaWFsb2c6IGBhbGVydGRpYWxvZ2AgZm9yIGNvbmZpcm1hdGlvbnMgdGhhdCBpbnRlcnJ1cHQuICovXG5leHBvcnQgdHlwZSBEaWFsb2dSb2xlID0gJ2RpYWxvZycgfCAnYWxlcnRkaWFsb2cnO1xuXG5sZXQgbmV4dERpYWxvZ0lkID0gMDtcblxuLyoqXG4gKiBBdGhlbmUgRGlhbG9nOiB0aGUgb25lIG1vZGFsIG9mIHRoZSBsaWJyYXJ5LCBvbiBhIG5hdGl2ZSBgPGRpYWxvZz5gXG4gKiBvcGVuZWQgd2l0aCBgc2hvd01vZGFsKClgLiBUaGF0IHB1dHMgaXQgaW4gdGhlIHRvcCBsYXllciAobm8gei1pbmRleCwgbm9cbiAqIGNsaXBwaW5nKSwgbWFrZXMgdGhlIHJlc3Qgb2YgdGhlIHBhZ2UgaW5lcnQgYW5kIGdpdmVzIGEgYDo6YmFja2Ryb3BgXG4gKiAoYC0tc2NyaW1gKS4gT24gdG9wOiBUYWIgc3RheXMgaW5zaWRlLCBwYWdlIHNjcm9sbCBpcyBsb2NrZWQsIEVzY2FwZSBhbmRcbiAqIGJhY2tkcm9wIGNsaWNrcyBmb2xsb3cgYGNsb3NlT25Fc2NhcGVgIC8gYGNsb3NlT25CYWNrZHJvcGAsIGFuZCBmb2N1cyBnb2VzXG4gKiBiYWNrIHRvIHdoZXJlIGl0IHdhcyB3aGVuIHRoZSBkaWFsb2cgY2xvc2VzLlxuICpcbiAqIENvbnRyb2xsZWQ6IGEgY2xvc2UgcmVxdWVzdCAo4pyVLCBFc2NhcGUsIGJhY2tkcm9wKSBlbWl0cyBgY2xvc2VkYCBhbmRcbiAqIGBvcGVuQ2hhbmdlKGZhbHNlKWA7IHRoZSBkaWFsb2cgY2xvc2VzIHdoZW4gYG9wZW5gIGJlY29tZXMgZmFsc2UsIHNvIGFcbiAqIHBhcmVudCBjYW4gcmVmdXNlICh1bnNhdmVkIGNoYW5nZXMpLiBgWyhvcGVuKV1gIHdvcmtzLlxuICpcbiAqIENvbnRlbnQ6IHRoZSBkZWZhdWx0IHNsb3QgaXMgdGhlIHNjcm9sbGluZyBib2R5OyBgW3Nsb3Q9aGVhZGVyXWAgKG9yXG4gKiBgW2F0aERpYWxvZ0hlYWRlcl1gKSBnb2VzIGludG8gdGhlIGhlYWRlciB1bmRlciB0aGUgdGl0bGUsXG4gKiBgW3Nsb3Q9Zm9vdGVyXWAgKG9yIGBbYXRoRGlhbG9nRm9vdGVyXWApIGludG8gdGhlIGZvb3Rlci4gSW5pdGlhbCBmb2N1czpcbiAqIGFuIGVsZW1lbnQgd2l0aCBgYXV0b2ZvY3VzYCwgZWxzZSB0aGUgZmlyc3QgY29udHJvbCBpbiB0aGUgYm9keS9mb290ZXIsXG4gKiBlbHNlIHRoZSBjbG9zZSBidXR0b24uXG4gKlxuICogYGJhcmVgOiBubyBoZWFkZXIsIGZvb3RlciwgY2xvc2UgYnV0dG9uIG9yIHN1cmZhY2UuIFRoZSBkaWFsb2cgaXMgYVxuICogdHJhbnNwYXJlbnQgbGF5ZXIgb3ZlciB0aGUgdmlld3BvcnQgYW5kIHRoZSBjb250ZW50IGRyYXdzIGFuZCBwbGFjZXMgaXRzXG4gKiBvd24gc3VyZmFjZSAoYSBwYWxldHRlIGF0IHRoZSB0b3AsIGEgYm90dG9tIHNoZWV0LCBhIGNvbXBvc2VyIHdpdGggaXRzIG93blxuICogaGVhZCk7IGEgY2xpY2sgb24gdGhlIGxheWVyIGFyb3VuZCBpdCBjb3VudHMgYXMgYSBiYWNrZHJvcCBjbGljay4gVG9wXG4gKiBsYXllciwgaW5lcnQgcGFnZSwgc2NyaW0sIGZvY3VzIHRyYXAsIEVzY2FwZSBhbmQgZm9jdXMgcmV0dXJuIHN0YXkuIE5hbWUgaXRcbiAqIHdpdGggYGFyaWFMYWJlbGAuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtZGlhbG9nIFsob3BlbildPVwiaXNPcGVuXCIgdGl0bGU9XCJDcmVhdGUgaXRlbVwiIChjbG9zZWQpPVwib25DbG9zZSgpXCI+XG4gKiAgIDxwPkRpYWxvZyBjb250ZW50IGhlcmU8L3A+XG4gKiAgIDxkaXYgc2xvdD1cImZvb3RlclwiPlxuICogICAgIDxhdGgtYnV0dG9uIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIiAoY2xpY2tlZCk9XCJpc09wZW4gPSBmYWxzZVwiPkNhbmNlbDwvYXRoLWJ1dHRvbj5cbiAqICAgICA8YXRoLWJ1dHRvbiAoY2xpY2tlZCk9XCJzYXZlKClcIj5TYXZlPC9hdGgtYnV0dG9uPlxuICogICA8L2Rpdj5cbiAqIDwvYXRoLWRpYWxvZz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWRpYWxvZycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtMdWNpZGVBbmd1bGFyTW9kdWxlLCBOZ1RlbXBsYXRlT3V0bGV0XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vZGlhbG9nLmNvbXBvbmVudC5zY3NzJyxcbiAgaG9zdDoge1xuICAgICcocG9pbnRlcmRvd24pJzogJ29uUG9pbnRlckRvd24oJGV2ZW50KScsXG4gICAgJyhjbGljayknOiAnb25DbGljaygkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQXRoRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IHN0YWNrID0gaW5qZWN0KEF0aE92ZXJsYXlTdGFjayk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGFiZWxzID0gaW5qZWN0QXRoTGFiZWxzKCk7XG5cbiAgLyoqIElkcyB0aGF0IG5hbWUgYW5kIGRlc2NyaWJlIHRoZSBkaWFsb2cgKGBhcmlhLWxhYmVsbGVkYnkvLWRlc2NyaWJlZGJ5YCkuICovXG4gIHByb3RlY3RlZCByZWFkb25seSB0aXRsZUlkID0gYGF0aC1kaWFsb2ctdGl0bGUtJHsrK25leHREaWFsb2dJZH1gO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVzY3JpcHRpb25JZCA9IGBhdGgtZGlhbG9nLWRlc2MtJHtuZXh0RGlhbG9nSWR9YDtcblxuICAvKiogV2hldGhlciB0aGUgZGlhbG9nIGlzIG9wZW4uIFR3by13YXk6IGBbKG9wZW4pXWAuICovXG4gIHJlYWRvbmx5IG9wZW4gPSBpbnB1dChmYWxzZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBEaWFsb2cgdGl0bGUgKG5hbWVzIHRoZSBkaWFsb2cpLiAqL1xuICByZWFkb25seSB0aXRsZSA9IGlucHV0KCcnKTtcbiAgLyoqIERpYWxvZyBkZXNjcmlwdGlvbiAoZGVzY3JpYmVzIHRoZSBkaWFsb2cpLiAqL1xuICByZWFkb25seSBkZXNjcmlwdGlvbiA9IGlucHV0KCcnKTtcbiAgcmVhZG9ubHkgc2l6ZSA9IGlucHV0PERpYWxvZ1NpemU+KCdtZCcpO1xuICAvKiogV2hldGhlciBjbGlja2luZyB0aGUgYmFja2Ryb3AgcmVxdWVzdHMgY2xvc2luZy4gKi9cbiAgcmVhZG9ubHkgY2xvc2VPbkJhY2tkcm9wID0gaW5wdXQodHJ1ZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBXaGV0aGVyIEVzY2FwZSByZXF1ZXN0cyBjbG9zaW5nLiAqL1xuICByZWFkb25seSBjbG9zZU9uRXNjYXBlID0gaW5wdXQodHJ1ZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBTaG93IHRoZSDinJUgYnV0dG9uIGluIHRoZSBoZWFkZXIuICovXG4gIHJlYWRvbmx5IHNob3dDbG9zZSA9IGlucHV0KHRydWUsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogQWNjZXNzaWJsZSBuYW1lIG9mIHRoZSBjbG9zZSBidXR0b247IGRlZmF1bHRzIHRvIGBBVEhfTEFCRUxTLmNsb3NlRGlhbG9nYC4gKi9cbiAgcmVhZG9ubHkgY2xvc2VMYWJlbCA9IGlucHV0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICAvKiogQWNjZXNzaWJsZSBuYW1lIHdoZW4gdGhlcmUgaXMgbm8gdmlzaWJsZSBgdGl0bGVgLiAqL1xuICByZWFkb25seSBhcmlhTGFiZWwgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgLyoqIGBhbGVydGRpYWxvZ2AgZm9yIGNvbmZpcm1hdGlvbnMgdGhhdCBpbnRlcnJ1cHQuICovXG4gIHJlYWRvbmx5IHJvbGUgPSBpbnB1dDxEaWFsb2dSb2xlPignZGlhbG9nJyk7XG4gIC8qKlxuICAgKiBPbmx5IHRoZSBjb250ZW50LCBvbiBhIHRyYW5zcGFyZW50IGZ1bGwtdmlld3BvcnQgbGF5ZXI6IHRoZSBjb250ZW50IGlzXG4gICAqIHRoZSBzdXJmYWNlIGFuZCBwbGFjZXMgaXRzZWxmIChzZWUgdGhlIGNsYXNzIGNvbW1lbnQpLiBgdGl0bGVgLFxuICAgKiBgZGVzY3JpcHRpb25gLCBgc2l6ZWAgYW5kIGBzaG93Q2xvc2VgIGRvIG5vdCBhcHBseS5cbiAgICovXG4gIHJlYWRvbmx5IGJhcmUgPSBpbnB1dChmYWxzZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG5cbiAgLyoqIFRoZSB1c2VyIGFza2VkIHRvIGNsb3NlICjinJUsIEVzY2FwZSwgYmFja2Ryb3ApLiAqL1xuICByZWFkb25seSBjbG9zZWQgPSBvdXRwdXQ8dm9pZD4oKTtcbiAgLyoqIFR3by13YXkgcGFydG5lciBvZiBgb3BlbmA7IGVtaXRzIGBmYWxzZWAgb24gYSBjbG9zZSByZXF1ZXN0LiAqL1xuICByZWFkb25seSBvcGVuQ2hhbmdlID0gb3V0cHV0PGJvb2xlYW4+KCk7XG4gIC8qKiBUaGUgZGlhbG9nIGlzIHNob3duIChhZnRlciBgc2hvd01vZGFsKClgKS4gKi9cbiAgcmVhZG9ubHkgb3BlbmVkID0gb3V0cHV0PHZvaWQ+KCk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNsb3NlSWNvbiA9IFg7XG4gIHByb3RlY3RlZCByZWFkb25seSBjbG9zZVRleHQgPSBjb21wdXRlZCgoKSA9PiB0aGlzLmNsb3NlTGFiZWwoKSA/PyB0aGlzLmxhYmVscy5jbG9zZURpYWxvZygpKTtcblxuICBwcml2YXRlIGRpYWxvZ0VsOiBIVE1MRGlhbG9nRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHJldHVybkZvY3VzOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHByZXNzZWRPbkJhY2tkcm9wID0gZmFsc2U7XG4gIHByaXZhdGUgbG9ja2VkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbnRyeTogQXRoT3ZlcmxheUVudHJ5ID0ge1xuICAgIG1vZGFsOiB0cnVlLFxuICAgIHBhbmVsOiAoKSA9PiB0aGlzLmRpYWxvZ0VsLFxuICAgIGFuY2hvcjogKCkgPT4gbnVsbCxcbiAgICBjbG9zZU9uRXNjYXBlOiAoKSA9PiB0aGlzLmNsb3NlT25Fc2NhcGUoKSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiAoKSA9PiBmYWxzZSxcbiAgICBkaXNtaXNzOiAoKSA9PiB0aGlzLnJlcXVlc3RDbG9zZSgpLFxuICB9O1xuXG4gIC8qKiBUaGUgYDxkaWFsb2c+YDsgcmVuZGVyZWQgd2hpbGUgYG9wZW5gIGlzIHRydWUuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgZGlhbG9nUmVmID0gdmlld0NoaWxkPEVsZW1lbnRSZWY8SFRNTERpYWxvZ0VsZW1lbnQ+PignZGlhbG9nJyk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gRE9NIHN5bmMsIG5vIHN0YXRlOiBgc2hvd01vZGFsKClgLCB0aGUgb3ZlcmxheSBzdGFjayBhbmQgZm9jdXMgZm9sbG93XG4gICAgLy8gdGhlIGA8ZGlhbG9nPmAgZWxlbWVudCBhcyBgQGlmIChvcGVuKCkpYCBhZGRzIGFuZCByZW1vdmVzIGl0LlxuICAgIGVmZmVjdCgoKSA9PiB7XG4gICAgICBjb25zdCBlbCA9IHRoaXMuZGlhbG9nUmVmKCk/Lm5hdGl2ZUVsZW1lbnQgPz8gbnVsbDtcbiAgICAgIHVudHJhY2tlZCgoKSA9PiB0aGlzLmF0dGFjaChlbCkpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIC8vIFJlbWVtYmVyIHRoZSBmb2N1cyBiZWZvcmUgdGhlIGRpYWxvZyByZW5kZXJzIGFuZCB0YWtlcyBpdC5cbiAgICBpZiAoY2hhbmdlc1snb3BlbiddICYmIHRoaXMub3BlbigpICYmICF0aGlzLmRpYWxvZ0VsKSB7XG4gICAgICBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgdGhpcy5yZXR1cm5Gb2N1cyA9IGFjdGl2ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGFjdGl2ZSAhPT0gZG9jdW1lbnQuYm9keSA/IGFjdGl2ZSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlhbG9nRWwpIHRoaXMudGVhcmRvd24oKTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoKGVsOiBIVE1MRGlhbG9nRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoZWwgPT09IHRoaXMuZGlhbG9nRWwpIHJldHVybjtcbiAgICBpZiAodGhpcy5kaWFsb2dFbCkgdGhpcy50ZWFyZG93bigpO1xuICAgIHRoaXMuZGlhbG9nRWwgPSBlbDtcbiAgICBpZiAoZWwpIHRoaXMucHJlc2VudChlbCk7XG4gIH1cblxuICAvKiogUmVxdWVzdHMgY2xvc2luZywgYXMgdGhlIOKclSBidXR0b24gZG9lcy4gKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0Q2xvc2UoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaWFsb2dFbCkgdHJhcFRhYihldmVudCwgdGhpcy5kaWFsb2dFbCk7XG4gIH1cblxuICAvKiogRXNjYXBlOiB0aGUgYnJvd3NlcidzIGNsb3NlIHJlcXVlc3QuIEFsd2F5cyBwcmV2ZW50ZWQ7IHRoZSBwYXJlbnQgZGVjaWRlcy4gKi9cbiAgcHJvdGVjdGVkIG9uQ2FuY2VsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCF0aGlzLmNsb3NlT25Fc2NhcGUoKSB8fCB0aGlzLnN0YWNrLmVzY2FwZUNvbnN1bWVkKCkgfHwgIXRoaXMuc3RhY2suaXNUb3AodGhpcy5lbnRyeSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZXF1ZXN0Q2xvc2UoKTtcbiAgfVxuXG4gIC8qKiBUaGUgYnJvd3NlciBjbG9zZWQgaXQgYW55d2F5IChlLmcuIGEgZm9yY2VkIGNsb3NlIHJlcXVlc3QpLiAqL1xuICBwcm90ZWN0ZWQgb25OYXRpdmVDbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuKCkgJiYgdGhpcy5kaWFsb2dFbCAmJiAhdGhpcy5kaWFsb2dFbC5vcGVuKSB0aGlzLnJlcXVlc3RDbG9zZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uUG9pbnRlckRvd24oZXZlbnQ6IFBvaW50ZXJFdmVudCk6IHZvaWQge1xuICAgIHRoaXMucHJlc3NlZE9uQmFja2Ryb3AgPSB0aGlzLmlzQmFja2Ryb3BFdmVudChldmVudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IG9uQmFja2Ryb3AgPSB0aGlzLnByZXNzZWRPbkJhY2tkcm9wICYmIHRoaXMuaXNCYWNrZHJvcEV2ZW50KGV2ZW50KTtcbiAgICB0aGlzLnByZXNzZWRPbkJhY2tkcm9wID0gZmFsc2U7XG4gICAgaWYgKG9uQmFja2Ryb3AgJiYgdGhpcy5jbG9zZU9uQmFja2Ryb3AoKSAmJiB0aGlzLnN0YWNrLmlzVG9wKHRoaXMuZW50cnkpKSB0aGlzLnJlcXVlc3RDbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0Q2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZWQuZW1pdCgpO1xuICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHByZXNzIG9uIHRoZSBgOjpiYWNrZHJvcGA6IGl0IHRhcmdldHMgdGhlIGRpYWxvZywgb3V0c2lkZSBpdHMgYm94LiBJblxuICAgKiBgYmFyZWAgbW9kZSB0aGUgZGlhbG9nIGlzIHRoZSB0cmFuc3BhcmVudCBsYXllciBhcm91bmQgdGhlIGNvbnRlbnQsIHNvXG4gICAqIGFueSBwcmVzcyBvbiB0aGUgZGlhbG9nIGVsZW1lbnQgaXRzZWxmIGlzIG9uZS5cbiAgICovXG4gIHByaXZhdGUgaXNCYWNrZHJvcEV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmRpYWxvZ0VsO1xuICAgIGlmICghZWwgfHwgZXZlbnQudGFyZ2V0ICE9PSBlbCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGlzLmJhcmUoKSkgcmV0dXJuIHRydWU7XG4gICAgY29uc3QgciA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiAoXG4gICAgICBldmVudC5jbGllbnRYIDwgci5sZWZ0IHx8XG4gICAgICBldmVudC5jbGllbnRYID4gci5yaWdodCB8fFxuICAgICAgZXZlbnQuY2xpZW50WSA8IHIudG9wIHx8XG4gICAgICBldmVudC5jbGllbnRZID4gci5ib3R0b21cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVzZW50KGVsOiBIVE1MRGlhbG9nRWxlbWVudCk6IHZvaWQge1xuICAgIHRoaXMuc3RhY2sub3Blbih0aGlzLmVudHJ5KTtcbiAgICB0aGlzLnN0YWNrLmxvY2tTY3JvbGwoKTtcbiAgICB0aGlzLmxvY2tlZCA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghZWwub3BlbikgZWwuc2hvd01vZGFsKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBOb3QgY29ubmVjdGVkICh5ZXQpOiBzaG93IGl0IG5vbi1tb2RhbGx5IHJhdGhlciB0aGFuIG5vdCBhdCBhbGwuXG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ29wZW4nLCAnJyk7XG4gICAgfVxuICAgIHRoaXMuc3RhY2sucmFpc2VUb3BMYXllcigpO1xuICAgIHRoaXMuZm9jdXNJbml0aWFsKGVsKTtcbiAgICB0aGlzLm9wZW5lZC5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIGZvY3VzSW5pdGlhbChlbDogSFRNTERpYWxvZ0VsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBhdXRvID0gZWwucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJ1thdXRvZm9jdXNdJyk7XG4gICAgaWYgKGF1dG8gJiYgZm9jdXNTYWZlbHkoYXV0bykpIHJldHVybjtcbiAgICBjb25zdCBwYXJ0cyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFxuICAgICAgJy5hdGgtZGlhbG9nX19iYXJlLCAuYXRoLWRpYWxvZ19fYm9keSwgLmF0aC1kaWFsb2dfX2Zvb3RlcidcbiAgICApO1xuICAgIGZvciAoY29uc3QgcGFydCBvZiBBcnJheS5mcm9tKHBhcnRzKSkge1xuICAgICAgY29uc3QgZmlyc3QgPSB0YWJiYWJsZXMocGFydClbMF07XG4gICAgICBpZiAoZmlyc3QgJiYgZm9jdXNTYWZlbHkoZmlyc3QpKSByZXR1cm47XG4gICAgfVxuICAgIGlmICghZm9jdXNTYWZlbHkodGFiYmFibGVzKGVsKVswXSkpIGZvY3VzU2FmZWx5KGVsKTtcbiAgfVxuXG4gIHByaXZhdGUgdGVhcmRvd24oKTogdm9pZCB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmRpYWxvZ0VsO1xuICAgIHRoaXMuZGlhbG9nRWwgPSBudWxsO1xuICAgIHRoaXMuc3RhY2suY2xvc2UodGhpcy5lbnRyeSk7XG4gICAgaWYgKHRoaXMubG9ja2VkKSB0aGlzLnN0YWNrLnVubG9ja1Njcm9sbCgpO1xuICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChlbD8ub3BlbikgZWwuY2xvc2UoKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEFscmVhZHkgcmVtb3ZlZC5cbiAgICB9XG4gICAgY29uc3QgYmFjayA9IHRoaXMucmV0dXJuRm9jdXM7XG4gICAgdGhpcy5yZXR1cm5Gb2N1cyA9IG51bGw7XG4gICAgZm9jdXNTYWZlbHkoYmFjayk7XG4gIH1cbn1cbiIsIjwhLS0gT25lIGRlZmF1bHQgc2xvdCwgc2hvd24gaW4gdGhlIGJvZHkgb3IsIHdoZW4gYmFyZSwgb24gaXRzIG93bi4gLS0+XG48bmctdGVtcGxhdGUgI2NvbnRlbnQ+PG5nLWNvbnRlbnQgLz48L25nLXRlbXBsYXRlPlxuXG5AaWYgKG9wZW4oKSkge1xuICA8ZGlhbG9nXG4gICAgI2RpYWxvZ1xuICAgIGNsYXNzPVwiYXRoLWRpYWxvZ1wiXG4gICAgdGFiaW5kZXg9XCItMVwiXG4gICAgW2NsYXNzXT1cImJhcmUoKSA/ICdhdGgtZGlhbG9nLS1iYXJlJyA6ICdhdGgtZGlhbG9nLS0nICsgc2l6ZSgpXCJcbiAgICBbYXR0ci5yb2xlXT1cInJvbGUoKSA9PT0gJ2FsZXJ0ZGlhbG9nJyA/ICdhbGVydGRpYWxvZycgOiBudWxsXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwidGl0bGUoKSAmJiAhYmFyZSgpID8gdGl0bGVJZCA6IG51bGxcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwidGl0bGUoKSAmJiAhYmFyZSgpID8gbnVsbCA6IGFyaWFMYWJlbCgpXCJcbiAgICBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cImRlc2NyaXB0aW9uKCkgJiYgIWJhcmUoKSA/IGRlc2NyaXB0aW9uSWQgOiBudWxsXCJcbiAgICAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiXG4gICAgKGNhbmNlbCk9XCJvbkNhbmNlbCgkZXZlbnQpXCJcbiAgICAoY2xvc2UpPVwib25OYXRpdmVDbG9zZSgpXCJcbiAgPlxuICAgIEBpZiAoYmFyZSgpKSB7XG4gICAgICA8ZGl2IGNsYXNzPVwiYXRoLWRpYWxvZ19fYmFyZVwiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgfSBAZWxzZSB7XG4gICAgICA8ZGl2IGNsYXNzPVwiYXRoLWRpYWxvZ19fc3VyZmFjZVwiPlxuICAgICAgICA8aGVhZGVyIGNsYXNzPVwiYXRoLWRpYWxvZ19faGVhZGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImF0aC1kaWFsb2dfX2hlYWRlci10ZXh0XCI+XG4gICAgICAgICAgICBAaWYgKHRpdGxlKCkpIHtcbiAgICAgICAgICAgICAgPGgyIGNsYXNzPVwiYXRoLWRpYWxvZ19fdGl0bGVcIiBbaWRdPVwidGl0bGVJZFwiPnt7IHRpdGxlKCkgfX08L2gyPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQGlmIChkZXNjcmlwdGlvbigpKSB7XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiYXRoLWRpYWxvZ19fZGVzY3JpcHRpb25cIiBbaWRdPVwiZGVzY3JpcHRpb25JZFwiPnt7IGRlc2NyaXB0aW9uKCkgfX08L3A+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1oZWFkZXJdLFthdGhEaWFsb2dIZWFkZXJdXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBAaWYgKHNob3dDbG9zZSgpKSB7XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzPVwiYXRoLWRpYWxvZ19fY2xvc2VcIlxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJjbG9zZVRleHQoKVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJjbG9zZSgpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiY2xvc2VJY29uXCIgW3NpemVdPVwiMThcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgfVxuICAgICAgICA8L2hlYWRlcj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXRoLWRpYWxvZ19fYm9keVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwiY29udGVudFwiIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxmb290ZXIgY2xhc3M9XCJhdGgtZGlhbG9nX19mb290ZXJcIj5cbiAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1mb290ZXJdLFthdGhEaWFsb2dGb290ZXJdXCIgLz5cbiAgICAgICAgPC9mb290ZXI+XG4gICAgICA8L2Rpdj5cbiAgICB9XG4gIDwvZGlhbG9nPlxufVxuIl19