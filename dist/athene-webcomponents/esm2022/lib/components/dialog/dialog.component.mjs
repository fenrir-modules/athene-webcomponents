import { ChangeDetectionStrategy, Component, ViewChild, booleanAttribute, computed, inject, input, output, } from '@angular/core';
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
    }
    set dialogRef(ref) {
        const el = ref?.nativeElement ?? null;
        if (el === this.dialogEl)
            return;
        if (this.dialogEl)
            this.teardown();
        this.dialogEl = el;
        if (el)
            this.present(el);
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDialogComponent, isStandalone: true, selector: "ath-dialog", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, closeOnBackdrop: { classPropertyName: "closeOnBackdrop", publicName: "closeOnBackdrop", isSignal: true, isRequired: false, transformFunction: null }, closeOnEscape: { classPropertyName: "closeOnEscape", publicName: "closeOnEscape", isSignal: true, isRequired: false, transformFunction: null }, showClose: { classPropertyName: "showClose", publicName: "showClose", isSignal: true, isRequired: false, transformFunction: null }, closeLabel: { classPropertyName: "closeLabel", publicName: "closeLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, role: { classPropertyName: "role", publicName: "role", isSignal: true, isRequired: false, transformFunction: null }, bare: { classPropertyName: "bare", publicName: "bare", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closed: "closed", openChange: "openChange", opened: "opened" }, host: { listeners: { "pointerdown": "onPointerDown($event)", "click": "onClick($event)" } }, viewQueries: [{ propertyName: "dialogRef", first: true, predicate: ["dialog"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<!-- One default slot, shown in the body or, when bare, on its own. -->\n<ng-template #content><ng-content /></ng-template>\n\n@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"bare() ? 'ath-dialog--bare' : 'ath-dialog--' + size()\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() && !bare() ? titleId : null\"\n    [attr.aria-label]=\"title() && !bare() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() && !bare() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    @if (bare()) {\n      <div class=\"ath-dialog__bare\">\n        <ng-container [ngTemplateOutlet]=\"content\" />\n      </div>\n    } @else {\n      <div class=\"ath-dialog__surface\">\n        <header class=\"ath-dialog__header\">\n          <div class=\"ath-dialog__header-text\">\n            @if (title()) {\n              <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n            }\n            @if (description()) {\n              <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n            }\n            <ng-content select=\"[slot=header],[athDialogHeader]\" />\n          </div>\n          @if (showClose()) {\n            <button\n              class=\"ath-dialog__close\"\n              type=\"button\"\n              [attr.aria-label]=\"closeText()\"\n              (click)=\"close()\"\n            >\n              <lucide-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n            </button>\n          }\n        </header>\n\n        <div class=\"ath-dialog__body\">\n          <ng-container [ngTemplateOutlet]=\"content\" />\n        </div>\n\n        <footer class=\"ath-dialog__footer\">\n          <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n        </footer>\n      </div>\n    }\n  </dialog>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog--bare{width:100%;height:100%;max-width:none;max-height:none;margin:0;overflow:hidden;background:transparent;border:0;border-radius:0;box-shadow:none}.ath-dialog--bare[open]{display:block;animation:none}.ath-dialog__bare{display:contents}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dialog', standalone: true, imports: [LucideAngularModule, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(pointerdown)': 'onPointerDown($event)',
                        '(click)': 'onClick($event)',
                    }, template: "<!-- One default slot, shown in the body or, when bare, on its own. -->\n<ng-template #content><ng-content /></ng-template>\n\n@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"bare() ? 'ath-dialog--bare' : 'ath-dialog--' + size()\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() && !bare() ? titleId : null\"\n    [attr.aria-label]=\"title() && !bare() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() && !bare() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    @if (bare()) {\n      <div class=\"ath-dialog__bare\">\n        <ng-container [ngTemplateOutlet]=\"content\" />\n      </div>\n    } @else {\n      <div class=\"ath-dialog__surface\">\n        <header class=\"ath-dialog__header\">\n          <div class=\"ath-dialog__header-text\">\n            @if (title()) {\n              <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n            }\n            @if (description()) {\n              <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n            }\n            <ng-content select=\"[slot=header],[athDialogHeader]\" />\n          </div>\n          @if (showClose()) {\n            <button\n              class=\"ath-dialog__close\"\n              type=\"button\"\n              [attr.aria-label]=\"closeText()\"\n              (click)=\"close()\"\n            >\n              <lucide-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n            </button>\n          }\n        </header>\n\n        <div class=\"ath-dialog__body\">\n          <ng-container [ngTemplateOutlet]=\"content\" />\n        </div>\n\n        <footer class=\"ath-dialog__footer\">\n          <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n        </footer>\n      </div>\n    }\n  </dialog>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog--bare{width:100%;height:100%;max-width:none;max-height:none;margin:0;overflow:hidden;background:transparent;border:0;border-radius:0;box-shadow:none}.ath-dialog--bare[open]{display:block;animation:none}.ath-dialog__bare{display:contents}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"] }]
        }], propDecorators: { dialogRef: [{
                type: ViewChild,
                args: ['dialog']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUtULFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBd0IsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBUXBFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNHO0FBYUgsTUFBTSxPQUFPLGtCQUFrQjtJQVovQjtRQWFtQixVQUFLLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hDLFdBQU0sR0FBRyxlQUFlLEVBQUUsQ0FBQztRQUU1Qyw4RUFBOEU7UUFDM0QsWUFBTyxHQUFHLG9CQUFvQixFQUFFLFlBQVksRUFBRSxDQUFDO1FBQy9DLGtCQUFhLEdB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QUFDO1lBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTyxRQUFRO1FBQ2QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLEVBQUUsSUFBSTtnQkFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLG1CQUFtQjtRQUNyQixDQUFDO1FBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQzsrR0FqTFUsa0JBQWtCO21HQUFsQixrQkFBa0IsK3ZEQzFFL0IseThEQXdEQSwybEZEU1ksbUJBQW1CLGdQQUFFLGdCQUFnQjs7NEZBU3BDLGtCQUFrQjtrQkFaOUIsU0FBUzsrQkFDRSxZQUFZLGNBQ1YsSUFBSSxXQUNQLENBQUMsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsbUJBQy9CLHVCQUF1QixDQUFDLE1BQU0sUUFHekM7d0JBQ0osZUFBZSxFQUFFLHVCQUF1Qjt3QkFDeEMsU0FBUyxFQUFFLGlCQUFpQjtxQkFDN0I7OEJBNkRXLFNBQVM7c0JBRHBCLFNBQVM7dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG4gIGNvbXB1dGVkLFxuICBpbmplY3QsXG4gIGlucHV0LFxuICBvdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdUZW1wbGF0ZU91dGxldCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMdWNpZGVBbmd1bGFyTW9kdWxlLCBYIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuaW1wb3J0IHsgaW5qZWN0QXRoTGFiZWxzIH0gZnJvbSAnLi4vLi4vaTE4bi9sYWJlbC11dGlscyc7XG5pbXBvcnQgeyBBdGhPdmVybGF5U3RhY2ssIHR5cGUgQXRoT3ZlcmxheUVudHJ5IH0gZnJvbSAnLi4vZmxvYXRpbmcvb3ZlcmxheS1zdGFjayc7XG5pbXBvcnQgeyBmb2N1c1NhZmVseSwgdGFiYmFibGVzLCB0cmFwVGFiIH0gZnJvbSAnLi4vZmxvYXRpbmcvZm9jdXMnO1xuXG4vKipcbiAqIERpYWxvZyBzaXplIHZhcmlhbnRzOiBtYXggd2lkdGhzIDQwMCAvIDUyMCAvIDY4MCAvIDg2MHB4LCBgZnVsbGAgPSB0aGVcbiAqIHZpZXdwb3J0IG1pbnVzIGEgbWFyZ2luLlxuICovXG5leHBvcnQgdHlwZSBEaWFsb2dTaXplID0gJ3NtJyB8ICdtZCcgfCAnbGcnIHwgJ3hsJyB8ICdmdWxsJztcblxubGV0IG5leHREaWFsb2dJZCA9IDA7XG5cbi8qKlxuICogQXRoZW5lIERpYWxvZzogdGhlIG9uZSBtb2RhbCBvZiB0aGUgbGlicmFyeSwgb24gYSBuYXRpdmUgYDxkaWFsb2c+YFxuICogb3BlbmVkIHdpdGggYHNob3dNb2RhbCgpYC4gVGhhdCBwdXRzIGl0IGluIHRoZSB0b3AgbGF5ZXIgKG5vIHotaW5kZXgsIG5vXG4gKiBjbGlwcGluZyksIG1ha2VzIHRoZSByZXN0IG9mIHRoZSBwYWdlIGluZXJ0IGFuZCBnaXZlcyBhIGA6OmJhY2tkcm9wYFxuICogKGAtLXNjcmltYCkuIE9uIHRvcDogVGFiIHN0YXlzIGluc2lkZSwgcGFnZSBzY3JvbGwgaXMgbG9ja2VkLCBFc2NhcGUgYW5kXG4gKiBiYWNrZHJvcCBjbGlja3MgZm9sbG93IGBjbG9zZU9uRXNjYXBlYCAvIGBjbG9zZU9uQmFja2Ryb3BgLCBhbmQgZm9jdXMgZ29lc1xuICogYmFjayB0byB3aGVyZSBpdCB3YXMgd2hlbiB0aGUgZGlhbG9nIGNsb3Nlcy5cbiAqXG4gKiBDb250cm9sbGVkOiBhIGNsb3NlIHJlcXVlc3QgKOKclSwgRXNjYXBlLCBiYWNrZHJvcCkgZW1pdHMgYGNsb3NlZGAgYW5kXG4gKiBgb3BlbkNoYW5nZShmYWxzZSlgOyB0aGUgZGlhbG9nIGNsb3NlcyB3aGVuIGBvcGVuYCBiZWNvbWVzIGZhbHNlLCBzbyBhXG4gKiBwYXJlbnQgY2FuIHJlZnVzZSAodW5zYXZlZCBjaGFuZ2VzKS4gYFsob3BlbildYCB3b3Jrcy5cbiAqXG4gKiBDb250ZW50OiB0aGUgZGVmYXVsdCBzbG90IGlzIHRoZSBzY3JvbGxpbmcgYm9keTsgYFtzbG90PWhlYWRlcl1gIChvclxuICogYFthdGhEaWFsb2dIZWFkZXJdYCkgZ29lcyBpbnRvIHRoZSBoZWFkZXIgdW5kZXIgdGhlIHRpdGxlLFxuICogYFtzbG90PWZvb3Rlcl1gIChvciBgW2F0aERpYWxvZ0Zvb3Rlcl1gKSBpbnRvIHRoZSBmb290ZXIuIEluaXRpYWwgZm9jdXM6XG4gKiBhbiBlbGVtZW50IHdpdGggYGF1dG9mb2N1c2AsIGVsc2UgdGhlIGZpcnN0IGNvbnRyb2wgaW4gdGhlIGJvZHkvZm9vdGVyLFxuICogZWxzZSB0aGUgY2xvc2UgYnV0dG9uLlxuICpcbiAqIGBiYXJlYDogbm8gaGVhZGVyLCBmb290ZXIsIGNsb3NlIGJ1dHRvbiBvciBzdXJmYWNlLiBUaGUgZGlhbG9nIGlzIGFcbiAqIHRyYW5zcGFyZW50IGxheWVyIG92ZXIgdGhlIHZpZXdwb3J0IGFuZCB0aGUgY29udGVudCBkcmF3cyBhbmQgcGxhY2VzIGl0c1xuICogb3duIHN1cmZhY2UgKGEgcGFsZXR0ZSBhdCB0aGUgdG9wLCBhIGJvdHRvbSBzaGVldCwgYSBjb21wb3NlciB3aXRoIGl0cyBvd25cbiAqIGhlYWQpOyBhIGNsaWNrIG9uIHRoZSBsYXllciBhcm91bmQgaXQgY291bnRzIGFzIGEgYmFja2Ryb3AgY2xpY2suIFRvcFxuICogbGF5ZXIsIGluZXJ0IHBhZ2UsIHNjcmltLCBmb2N1cyB0cmFwLCBFc2NhcGUgYW5kIGZvY3VzIHJldHVybiBzdGF5LiBOYW1lIGl0XG4gKiB3aXRoIGBhcmlhTGFiZWxgLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWRpYWxvZyBbKG9wZW4pXT1cImlzT3BlblwiIHRpdGxlPVwiQ3JlYXRlIGl0ZW1cIiAoY2xvc2VkKT1cIm9uQ2xvc2UoKVwiPlxuICogICA8cD5EaWFsb2cgY29udGVudCBoZXJlPC9wPlxuICogICA8ZGl2IHNsb3Q9XCJmb290ZXJcIj5cbiAqICAgICA8YXRoLWJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgKGNsaWNrZWQpPVwiaXNPcGVuID0gZmFsc2VcIj5DYW5jZWw8L2F0aC1idXR0b24+XG4gKiAgICAgPGF0aC1idXR0b24gKGNsaWNrZWQpPVwic2F2ZSgpXCI+U2F2ZTwvYXRoLWJ1dHRvbj5cbiAqICAgPC9kaXY+XG4gKiA8L2F0aC1kaWFsb2c+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1kaWFsb2cnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTHVjaWRlQW5ndWxhck1vZHVsZSwgTmdUZW1wbGF0ZU91dGxldF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2RpYWxvZy5jb21wb25lbnQuc2NzcycsXG4gIGhvc3Q6IHtcbiAgICAnKHBvaW50ZXJkb3duKSc6ICdvblBvaW50ZXJEb3duKCRldmVudCknLFxuICAgICcoY2xpY2spJzogJ29uQ2xpY2soJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIEF0aERpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFjayA9IGluamVjdChBdGhPdmVybGF5U3RhY2spO1xuICBwcml2YXRlIHJlYWRvbmx5IGxhYmVscyA9IGluamVjdEF0aExhYmVscygpO1xuXG4gIC8qKiBJZHMgdGhhdCBuYW1lIGFuZCBkZXNjcmliZSB0aGUgZGlhbG9nIChgYXJpYS1sYWJlbGxlZGJ5Ly1kZXNjcmliZWRieWApLiAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdGl0bGVJZCA9IGBhdGgtZGlhbG9nLXRpdGxlLSR7KytuZXh0RGlhbG9nSWR9YDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc2NyaXB0aW9uSWQgPSBgYXRoLWRpYWxvZy1kZXNjLSR7bmV4dERpYWxvZ0lkfWA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGRpYWxvZyBpcyBvcGVuLiBUd28td2F5OiBgWyhvcGVuKV1gLiAqL1xuICByZWFkb25seSBvcGVuID0gaW5wdXQoZmFsc2UsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogRGlhbG9nIHRpdGxlIChuYW1lcyB0aGUgZGlhbG9nKS4gKi9cbiAgcmVhZG9ubHkgdGl0bGUgPSBpbnB1dCgnJyk7XG4gIC8qKiBEaWFsb2cgZGVzY3JpcHRpb24gKGRlc2NyaWJlcyB0aGUgZGlhbG9nKS4gKi9cbiAgcmVhZG9ubHkgZGVzY3JpcHRpb24gPSBpbnB1dCgnJyk7XG4gIHJlYWRvbmx5IHNpemUgPSBpbnB1dDxEaWFsb2dTaXplPignbWQnKTtcbiAgLyoqIFdoZXRoZXIgY2xpY2tpbmcgdGhlIGJhY2tkcm9wIHJlcXVlc3RzIGNsb3NpbmcuICovXG4gIHJlYWRvbmx5IGNsb3NlT25CYWNrZHJvcCA9IGlucHV0KHRydWUsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogV2hldGhlciBFc2NhcGUgcmVxdWVzdHMgY2xvc2luZy4gKi9cbiAgcmVhZG9ubHkgY2xvc2VPbkVzY2FwZSA9IGlucHV0KHRydWUsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogU2hvdyB0aGUg4pyVIGJ1dHRvbiBpbiB0aGUgaGVhZGVyLiAqL1xuICByZWFkb25seSBzaG93Q2xvc2UgPSBpbnB1dCh0cnVlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgLyoqIEFjY2Vzc2libGUgbmFtZSBvZiB0aGUgY2xvc2UgYnV0dG9uOyBkZWZhdWx0cyB0byBgQVRIX0xBQkVMUy5jbG9zZURpYWxvZ2AuICovXG4gIHJlYWRvbmx5IGNsb3NlTGFiZWwgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgLyoqIEFjY2Vzc2libGUgbmFtZSB3aGVuIHRoZXJlIGlzIG5vIHZpc2libGUgYHRpdGxlYC4gKi9cbiAgcmVhZG9ubHkgYXJpYUxhYmVsID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIC8qKiBgYWxlcnRkaWFsb2dgIGZvciBjb25maXJtYXRpb25zIHRoYXQgaW50ZXJydXB0LiAqL1xuICByZWFkb25seSByb2xlID0gaW5wdXQ8J2RpYWxvZycgfCAnYWxlcnRkaWFsb2cnPignZGlhbG9nJyk7XG4gIC8qKlxuICAgKiBPbmx5IHRoZSBjb250ZW50LCBvbiBhIHRyYW5zcGFyZW50IGZ1bGwtdmlld3BvcnQgbGF5ZXI6IHRoZSBjb250ZW50IGlzXG4gICAqIHRoZSBzdXJmYWNlIGFuZCBwbGFjZXMgaXRzZWxmIChzZWUgdGhlIGNsYXNzIGNvbW1lbnQpLiBgdGl0bGVgLFxuICAgKiBgZGVzY3JpcHRpb25gLCBgc2l6ZWAgYW5kIGBzaG93Q2xvc2VgIGRvIG5vdCBhcHBseS5cbiAgICovXG4gIHJlYWRvbmx5IGJhcmUgPSBpbnB1dChmYWxzZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG5cbiAgLyoqIFRoZSB1c2VyIGFza2VkIHRvIGNsb3NlICjinJUsIEVzY2FwZSwgYmFja2Ryb3ApLiAqL1xuICByZWFkb25seSBjbG9zZWQgPSBvdXRwdXQ8dm9pZD4oKTtcbiAgLyoqIFR3by13YXkgcGFydG5lciBvZiBgb3BlbmA7IGVtaXRzIGBmYWxzZWAgb24gYSBjbG9zZSByZXF1ZXN0LiAqL1xuICByZWFkb25seSBvcGVuQ2hhbmdlID0gb3V0cHV0PGJvb2xlYW4+KCk7XG4gIC8qKiBUaGUgZGlhbG9nIGlzIHNob3duIChhZnRlciBgc2hvd01vZGFsKClgKS4gKi9cbiAgcmVhZG9ubHkgb3BlbmVkID0gb3V0cHV0PHZvaWQ+KCk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNsb3NlSWNvbiA9IFg7XG4gIHByb3RlY3RlZCByZWFkb25seSBjbG9zZVRleHQgPSBjb21wdXRlZCgoKSA9PiB0aGlzLmNsb3NlTGFiZWwoKSA/PyB0aGlzLmxhYmVscy5jbG9zZURpYWxvZygpKTtcblxuICBwcml2YXRlIGRpYWxvZ0VsOiBIVE1MRGlhbG9nRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHJldHVybkZvY3VzOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHByZXNzZWRPbkJhY2tkcm9wID0gZmFsc2U7XG4gIHByaXZhdGUgbG9ja2VkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbnRyeTogQXRoT3ZlcmxheUVudHJ5ID0ge1xuICAgIG1vZGFsOiB0cnVlLFxuICAgIHBhbmVsOiAoKSA9PiB0aGlzLmRpYWxvZ0VsLFxuICAgIGFuY2hvcjogKCkgPT4gbnVsbCxcbiAgICBjbG9zZU9uRXNjYXBlOiAoKSA9PiB0aGlzLmNsb3NlT25Fc2NhcGUoKSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiAoKSA9PiBmYWxzZSxcbiAgICBkaXNtaXNzOiAoKSA9PiB0aGlzLnJlcXVlc3RDbG9zZSgpLFxuICB9O1xuXG4gIEBWaWV3Q2hpbGQoJ2RpYWxvZycpXG4gIHByaXZhdGUgc2V0IGRpYWxvZ1JlZihyZWY6IEVsZW1lbnRSZWY8SFRNTERpYWxvZ0VsZW1lbnQ+IHwgdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgZWwgPSByZWY/Lm5hdGl2ZUVsZW1lbnQgPz8gbnVsbDtcbiAgICBpZiAoZWwgPT09IHRoaXMuZGlhbG9nRWwpIHJldHVybjtcbiAgICBpZiAodGhpcy5kaWFsb2dFbCkgdGhpcy50ZWFyZG93bigpO1xuICAgIHRoaXMuZGlhbG9nRWwgPSBlbDtcbiAgICBpZiAoZWwpIHRoaXMucHJlc2VudChlbCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgLy8gUmVtZW1iZXIgdGhlIGZvY3VzIGJlZm9yZSB0aGUgZGlhbG9nIHJlbmRlcnMgYW5kIHRha2VzIGl0LlxuICAgIGlmIChjaGFuZ2VzWydvcGVuJ10gJiYgdGhpcy5vcGVuKCkgJiYgIXRoaXMuZGlhbG9nRWwpIHtcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLnJldHVybkZvY3VzID0gYWN0aXZlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgYWN0aXZlICE9PSBkb2N1bWVudC5ib2R5ID8gYWN0aXZlIDogbnVsbDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaWFsb2dFbCkgdGhpcy50ZWFyZG93bigpO1xuICB9XG5cbiAgLyoqIFJlcXVlc3RzIGNsb3NpbmcsIGFzIHRoZSDinJUgYnV0dG9uIGRvZXMuICovXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdENsb3NlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlhbG9nRWwpIHRyYXBUYWIoZXZlbnQsIHRoaXMuZGlhbG9nRWwpO1xuICB9XG5cbiAgLyoqIEVzY2FwZTogdGhlIGJyb3dzZXIncyBjbG9zZSByZXF1ZXN0LiBBbHdheXMgcHJldmVudGVkOyB0aGUgcGFyZW50IGRlY2lkZXMuICovXG4gIHByb3RlY3RlZCBvbkNhbmNlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5jbG9zZU9uRXNjYXBlKCkgfHwgdGhpcy5zdGFjay5lc2NhcGVDb25zdW1lZCgpIHx8ICF0aGlzLnN0YWNrLmlzVG9wKHRoaXMuZW50cnkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVxdWVzdENsb3NlKCk7XG4gIH1cblxuICAvKiogVGhlIGJyb3dzZXIgY2xvc2VkIGl0IGFueXdheSAoZS5nLiBhIGZvcmNlZCBjbG9zZSByZXF1ZXN0KS4gKi9cbiAgcHJvdGVjdGVkIG9uTmF0aXZlQ2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3BlbigpICYmIHRoaXMuZGlhbG9nRWwgJiYgIXRoaXMuZGlhbG9nRWwub3BlbikgdGhpcy5yZXF1ZXN0Q2xvc2UoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvblBvaW50ZXJEb3duKGV2ZW50OiBQb2ludGVyRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnByZXNzZWRPbkJhY2tkcm9wID0gdGhpcy5pc0JhY2tkcm9wRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBvbkJhY2tkcm9wID0gdGhpcy5wcmVzc2VkT25CYWNrZHJvcCAmJiB0aGlzLmlzQmFja2Ryb3BFdmVudChldmVudCk7XG4gICAgdGhpcy5wcmVzc2VkT25CYWNrZHJvcCA9IGZhbHNlO1xuICAgIGlmIChvbkJhY2tkcm9wICYmIHRoaXMuY2xvc2VPbkJhY2tkcm9wKCkgJiYgdGhpcy5zdGFjay5pc1RvcCh0aGlzLmVudHJ5KSkgdGhpcy5yZXF1ZXN0Q2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdENsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VkLmVtaXQoKTtcbiAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQSBwcmVzcyBvbiB0aGUgYDo6YmFja2Ryb3BgOiBpdCB0YXJnZXRzIHRoZSBkaWFsb2csIG91dHNpZGUgaXRzIGJveC4gSW5cbiAgICogYGJhcmVgIG1vZGUgdGhlIGRpYWxvZyBpcyB0aGUgdHJhbnNwYXJlbnQgbGF5ZXIgYXJvdW5kIHRoZSBjb250ZW50LCBzb1xuICAgKiBhbnkgcHJlc3Mgb24gdGhlIGRpYWxvZyBlbGVtZW50IGl0c2VsZiBpcyBvbmUuXG4gICAqL1xuICBwcml2YXRlIGlzQmFja2Ryb3BFdmVudChldmVudDogTW91c2VFdmVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsID0gdGhpcy5kaWFsb2dFbDtcbiAgICBpZiAoIWVsIHx8IGV2ZW50LnRhcmdldCAhPT0gZWwpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5iYXJlKCkpIHJldHVybiB0cnVlO1xuICAgIGNvbnN0IHIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKFxuICAgICAgZXZlbnQuY2xpZW50WCA8IHIubGVmdCB8fFxuICAgICAgZXZlbnQuY2xpZW50WCA+IHIucmlnaHQgfHxcbiAgICAgIGV2ZW50LmNsaWVudFkgPCByLnRvcCB8fFxuICAgICAgZXZlbnQuY2xpZW50WSA+IHIuYm90dG9tXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlc2VudChlbDogSFRNTERpYWxvZ0VsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YWNrLm9wZW4odGhpcy5lbnRyeSk7XG4gICAgdGhpcy5zdGFjay5sb2NrU2Nyb2xsKCk7XG4gICAgdGhpcy5sb2NrZWQgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWVsLm9wZW4pIGVsLnNob3dNb2RhbCgpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gTm90IGNvbm5lY3RlZCAoeWV0KTogc2hvdyBpdCBub24tbW9kYWxseSByYXRoZXIgdGhhbiBub3QgYXQgYWxsLlxuICAgICAgZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgICB0aGlzLnN0YWNrLnJhaXNlVG9wTGF5ZXIoKTtcbiAgICB0aGlzLmZvY3VzSW5pdGlhbChlbCk7XG4gICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c0luaXRpYWwoZWw6IEhUTUxEaWFsb2dFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgYXV0byA9IGVsLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbYXV0b2ZvY3VzXScpO1xuICAgIGlmIChhdXRvICYmIGZvY3VzU2FmZWx5KGF1dG8pKSByZXR1cm47XG4gICAgY29uc3QgcGFydHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcbiAgICAgICcuYXRoLWRpYWxvZ19fYmFyZSwgLmF0aC1kaWFsb2dfX2JvZHksIC5hdGgtZGlhbG9nX19mb290ZXInXG4gICAgKTtcbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgQXJyYXkuZnJvbShwYXJ0cykpIHtcbiAgICAgIGNvbnN0IGZpcnN0ID0gdGFiYmFibGVzKHBhcnQpWzBdO1xuICAgICAgaWYgKGZpcnN0ICYmIGZvY3VzU2FmZWx5KGZpcnN0KSkgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWZvY3VzU2FmZWx5KHRhYmJhYmxlcyhlbClbMF0pKSBmb2N1c1NhZmVseShlbCk7XG4gIH1cblxuICBwcml2YXRlIHRlYXJkb3duKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5kaWFsb2dFbDtcbiAgICB0aGlzLmRpYWxvZ0VsID0gbnVsbDtcbiAgICB0aGlzLnN0YWNrLmNsb3NlKHRoaXMuZW50cnkpO1xuICAgIGlmICh0aGlzLmxvY2tlZCkgdGhpcy5zdGFjay51bmxvY2tTY3JvbGwoKTtcbiAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZWw/Lm9wZW4pIGVsLmNsb3NlKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBBbHJlYWR5IHJlbW92ZWQuXG4gICAgfVxuICAgIGNvbnN0IGJhY2sgPSB0aGlzLnJldHVybkZvY3VzO1xuICAgIHRoaXMucmV0dXJuRm9jdXMgPSBudWxsO1xuICAgIGZvY3VzU2FmZWx5KGJhY2spO1xuICB9XG59XG4iLCI8IS0tIE9uZSBkZWZhdWx0IHNsb3QsIHNob3duIGluIHRoZSBib2R5IG9yLCB3aGVuIGJhcmUsIG9uIGl0cyBvd24uIC0tPlxuPG5nLXRlbXBsYXRlICNjb250ZW50PjxuZy1jb250ZW50IC8+PC9uZy10ZW1wbGF0ZT5cblxuQGlmIChvcGVuKCkpIHtcbiAgPGRpYWxvZ1xuICAgICNkaWFsb2dcbiAgICBjbGFzcz1cImF0aC1kaWFsb2dcIlxuICAgIHRhYmluZGV4PVwiLTFcIlxuICAgIFtjbGFzc109XCJiYXJlKCkgPyAnYXRoLWRpYWxvZy0tYmFyZScgOiAnYXRoLWRpYWxvZy0tJyArIHNpemUoKVwiXG4gICAgW2F0dHIucm9sZV09XCJyb2xlKCkgPT09ICdhbGVydGRpYWxvZycgPyAnYWxlcnRkaWFsb2cnIDogbnVsbFwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cInRpdGxlKCkgJiYgIWJhcmUoKSA/IHRpdGxlSWQgOiBudWxsXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInRpdGxlKCkgJiYgIWJhcmUoKSA/IG51bGwgOiBhcmlhTGFiZWwoKVwiXG4gICAgW2F0dHIuYXJpYS1kZXNjcmliZWRieV09XCJkZXNjcmlwdGlvbigpICYmICFiYXJlKCkgPyBkZXNjcmlwdGlvbklkIDogbnVsbFwiXG4gICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIlxuICAgIChjYW5jZWwpPVwib25DYW5jZWwoJGV2ZW50KVwiXG4gICAgKGNsb3NlKT1cIm9uTmF0aXZlQ2xvc2UoKVwiXG4gID5cbiAgICBAaWYgKGJhcmUoKSkge1xuICAgICAgPGRpdiBjbGFzcz1cImF0aC1kaWFsb2dfX2JhcmVcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJjb250ZW50XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIH0gQGVsc2Uge1xuICAgICAgPGRpdiBjbGFzcz1cImF0aC1kaWFsb2dfX3N1cmZhY2VcIj5cbiAgICAgICAgPGhlYWRlciBjbGFzcz1cImF0aC1kaWFsb2dfX2hlYWRlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdGgtZGlhbG9nX19oZWFkZXItdGV4dFwiPlxuICAgICAgICAgICAgQGlmICh0aXRsZSgpKSB7XG4gICAgICAgICAgICAgIDxoMiBjbGFzcz1cImF0aC1kaWFsb2dfX3RpdGxlXCIgW2lkXT1cInRpdGxlSWRcIj57eyB0aXRsZSgpIH19PC9oMj5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEBpZiAoZGVzY3JpcHRpb24oKSkge1xuICAgICAgICAgICAgICA8cCBjbGFzcz1cImF0aC1kaWFsb2dfX2Rlc2NyaXB0aW9uXCIgW2lkXT1cImRlc2NyaXB0aW9uSWRcIj57eyBkZXNjcmlwdGlvbigpIH19PC9wPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9aGVhZGVyXSxbYXRoRGlhbG9nSGVhZGVyXVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgQGlmIChzaG93Q2xvc2UoKSkge1xuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBjbGFzcz1cImF0aC1kaWFsb2dfX2Nsb3NlXCJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY2xvc2VUZXh0KClcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwiY2xvc2UoKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cImNsb3NlSWNvblwiIFtzaXplXT1cIjE4XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIH1cbiAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF0aC1kaWFsb2dfX2JvZHlcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImNvbnRlbnRcIiAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8Zm9vdGVyIGNsYXNzPVwiYXRoLWRpYWxvZ19fZm9vdGVyXCI+XG4gICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9Zm9vdGVyXSxbYXRoRGlhbG9nRm9vdGVyXVwiIC8+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9kaXY+XG4gICAgfVxuICA8L2RpYWxvZz5cbn1cbiJdfQ==