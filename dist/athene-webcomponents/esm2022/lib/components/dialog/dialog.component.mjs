import { ChangeDetectionStrategy, Component, ViewChild, booleanAttribute, computed, inject, input, output, } from '@angular/core';
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
    /** A press on the `::backdrop`: it targets the dialog, outside its box. */
    isBackdropEvent(event) {
        const el = this.dialogEl;
        if (!el || event.target !== el)
            return false;
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
        const parts = el.querySelectorAll('.ath-dialog__body, .ath-dialog__footer');
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDialogComponent, isStandalone: true, selector: "ath-dialog", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, closeOnBackdrop: { classPropertyName: "closeOnBackdrop", publicName: "closeOnBackdrop", isSignal: true, isRequired: false, transformFunction: null }, closeOnEscape: { classPropertyName: "closeOnEscape", publicName: "closeOnEscape", isSignal: true, isRequired: false, transformFunction: null }, showClose: { classPropertyName: "showClose", publicName: "showClose", isSignal: true, isRequired: false, transformFunction: null }, closeLabel: { classPropertyName: "closeLabel", publicName: "closeLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, role: { classPropertyName: "role", publicName: "role", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closed: "closed", openChange: "openChange", opened: "opened" }, host: { listeners: { "pointerdown": "onPointerDown($event)", "click": "onClick($event)" } }, viewQueries: [{ propertyName: "dialogRef", first: true, predicate: ["dialog"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"'ath-dialog--' + size()\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() ? titleId : null\"\n    [attr.aria-label]=\"title() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    <div class=\"ath-dialog__surface\">\n      <header class=\"ath-dialog__header\">\n        <div class=\"ath-dialog__header-text\">\n          @if (title()) {\n            <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n          }\n          @if (description()) {\n            <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n          }\n          <ng-content select=\"[slot=header],[athDialogHeader]\" />\n        </div>\n        @if (showClose()) {\n          <button\n            class=\"ath-dialog__close\"\n            type=\"button\"\n            [attr.aria-label]=\"closeText()\"\n            (click)=\"close()\"\n          >\n            <lucide-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n          </button>\n        }\n      </header>\n\n      <div class=\"ath-dialog__body\">\n        <ng-content />\n      </div>\n\n      <footer class=\"ath-dialog__footer\">\n        <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n      </footer>\n    </div>\n  </dialog>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dialog', standalone: true, imports: [LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(pointerdown)': 'onPointerDown($event)',
                        '(click)': 'onClick($event)',
                    }, template: "@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"'ath-dialog--' + size()\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() ? titleId : null\"\n    [attr.aria-label]=\"title() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    <div class=\"ath-dialog__surface\">\n      <header class=\"ath-dialog__header\">\n        <div class=\"ath-dialog__header-text\">\n          @if (title()) {\n            <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n          }\n          @if (description()) {\n            <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n          }\n          <ng-content select=\"[slot=header],[athDialogHeader]\" />\n        </div>\n        @if (showClose()) {\n          <button\n            class=\"ath-dialog__close\"\n            type=\"button\"\n            [attr.aria-label]=\"closeText()\"\n            (click)=\"close()\"\n          >\n            <lucide-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n          </button>\n        }\n      </header>\n\n      <div class=\"ath-dialog__body\">\n        <ng-content />\n      </div>\n\n      <footer class=\"ath-dialog__footer\">\n        <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n      </footer>\n    </div>\n  </dialog>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"] }]
        }], propDecorators: { dialogRef: [{
                type: ViewChild,
                args: ['dialog']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUtULFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLE1BQU0sRUFDTixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBd0IsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRixPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBUXBFLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUVyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFhSCxNQUFNLE9BQU8sa0JBQWtCO0lBWi9CO1FBYW1CLFVBQUssR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEMsV0FBTSxHQUFHLGVBQWUsRUFBRSxDQUFDO1FBRTVDLDhFQUE4RTtRQUMzRCxZQUFPLEdBQUcsb0JBQW9CLEVBQUUsWUFBWSxFQUFFLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxtQkFBbUIsWUFBWSxFQUFFLENBQUM7UUFFckUsdURBQXVEO1FBQzlDLFNBQUksR0FB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QztRQUM3QixJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsRUFBRSxJQUFJO2dCQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1AsbUJBQW1CO1FBQ3JCLENBQUM7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDOytHQXBLVSxrQkFBa0I7bUdBQWxCLGtCQUFrQiwwb0RDbEUvQix1aERBK0NBLHV2RURVWSxtQkFBbUI7OzRGQVNsQixrQkFBa0I7a0JBWjlCLFNBQVM7K0JBQ0UsWUFBWSxjQUNWLElBQUksV0FDUCxDQUFDLG1CQUFtQixDQUFDLG1CQUNiLHVCQUF1QixDQUFDLE1BQU0sUUFHekM7d0JBQ0osZUFBZSxFQUFFLHVCQUF1Qjt3QkFDeEMsU0FBUyxFQUFFLGlCQUFpQjtxQkFDN0I7OEJBdURXLFNBQVM7c0JBRHBCLFNBQVM7dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG4gIGNvbXB1dGVkLFxuICBpbmplY3QsXG4gIGlucHV0LFxuICBvdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSwgWCB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcbmltcG9ydCB7IGluamVjdEF0aExhYmVscyB9IGZyb20gJy4uLy4uL2kxOG4vbGFiZWwtdXRpbHMnO1xuaW1wb3J0IHsgQXRoT3ZlcmxheVN0YWNrLCB0eXBlIEF0aE92ZXJsYXlFbnRyeSB9IGZyb20gJy4uL2Zsb2F0aW5nL292ZXJsYXktc3RhY2snO1xuaW1wb3J0IHsgZm9jdXNTYWZlbHksIHRhYmJhYmxlcywgdHJhcFRhYiB9IGZyb20gJy4uL2Zsb2F0aW5nL2ZvY3VzJztcblxuLyoqXG4gKiBEaWFsb2cgc2l6ZSB2YXJpYW50czogbWF4IHdpZHRocyA0MDAgLyA1MjAgLyA2ODAgLyA4NjBweCwgYGZ1bGxgID0gdGhlXG4gKiB2aWV3cG9ydCBtaW51cyBhIG1hcmdpbi5cbiAqL1xuZXhwb3J0IHR5cGUgRGlhbG9nU2l6ZSA9ICdzbScgfCAnbWQnIHwgJ2xnJyB8ICd4bCcgfCAnZnVsbCc7XG5cbmxldCBuZXh0RGlhbG9nSWQgPSAwO1xuXG4vKipcbiAqIEF0aGVuZSBEaWFsb2c6IHRoZSBvbmUgbW9kYWwgb2YgdGhlIGxpYnJhcnksIG9uIGEgbmF0aXZlIGA8ZGlhbG9nPmBcbiAqIG9wZW5lZCB3aXRoIGBzaG93TW9kYWwoKWAuIFRoYXQgcHV0cyBpdCBpbiB0aGUgdG9wIGxheWVyIChubyB6LWluZGV4LCBub1xuICogY2xpcHBpbmcpLCBtYWtlcyB0aGUgcmVzdCBvZiB0aGUgcGFnZSBpbmVydCBhbmQgZ2l2ZXMgYSBgOjpiYWNrZHJvcGBcbiAqIChgLS1zY3JpbWApLiBPbiB0b3A6IFRhYiBzdGF5cyBpbnNpZGUsIHBhZ2Ugc2Nyb2xsIGlzIGxvY2tlZCwgRXNjYXBlIGFuZFxuICogYmFja2Ryb3AgY2xpY2tzIGZvbGxvdyBgY2xvc2VPbkVzY2FwZWAgLyBgY2xvc2VPbkJhY2tkcm9wYCwgYW5kIGZvY3VzIGdvZXNcbiAqIGJhY2sgdG8gd2hlcmUgaXQgd2FzIHdoZW4gdGhlIGRpYWxvZyBjbG9zZXMuXG4gKlxuICogQ29udHJvbGxlZDogYSBjbG9zZSByZXF1ZXN0ICjinJUsIEVzY2FwZSwgYmFja2Ryb3ApIGVtaXRzIGBjbG9zZWRgIGFuZFxuICogYG9wZW5DaGFuZ2UoZmFsc2UpYDsgdGhlIGRpYWxvZyBjbG9zZXMgd2hlbiBgb3BlbmAgYmVjb21lcyBmYWxzZSwgc28gYVxuICogcGFyZW50IGNhbiByZWZ1c2UgKHVuc2F2ZWQgY2hhbmdlcykuIGBbKG9wZW4pXWAgd29ya3MuXG4gKlxuICogQ29udGVudDogdGhlIGRlZmF1bHQgc2xvdCBpcyB0aGUgc2Nyb2xsaW5nIGJvZHk7IGBbc2xvdD1oZWFkZXJdYCAob3JcbiAqIGBbYXRoRGlhbG9nSGVhZGVyXWApIGdvZXMgaW50byB0aGUgaGVhZGVyIHVuZGVyIHRoZSB0aXRsZSxcbiAqIGBbc2xvdD1mb290ZXJdYCAob3IgYFthdGhEaWFsb2dGb290ZXJdYCkgaW50byB0aGUgZm9vdGVyLiBJbml0aWFsIGZvY3VzOlxuICogYW4gZWxlbWVudCB3aXRoIGBhdXRvZm9jdXNgLCBlbHNlIHRoZSBmaXJzdCBjb250cm9sIGluIHRoZSBib2R5L2Zvb3RlcixcbiAqIGVsc2UgdGhlIGNsb3NlIGJ1dHRvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1kaWFsb2cgWyhvcGVuKV09XCJpc09wZW5cIiB0aXRsZT1cIkNyZWF0ZSBpdGVtXCIgKGNsb3NlZCk9XCJvbkNsb3NlKClcIj5cbiAqICAgPHA+RGlhbG9nIGNvbnRlbnQgaGVyZTwvcD5cbiAqICAgPGRpdiBzbG90PVwiZm9vdGVyXCI+XG4gKiAgICAgPGF0aC1idXR0b24gdmFyaWFudD1cInNlY29uZGFyeVwiIChjbGlja2VkKT1cImlzT3BlbiA9IGZhbHNlXCI+Q2FuY2VsPC9hdGgtYnV0dG9uPlxuICogICAgIDxhdGgtYnV0dG9uIChjbGlja2VkKT1cInNhdmUoKVwiPlNhdmU8L2F0aC1idXR0b24+XG4gKiAgIDwvZGl2PlxuICogPC9hdGgtZGlhbG9nPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtZGlhbG9nJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0x1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2RpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9kaWFsb2cuY29tcG9uZW50LnNjc3MnLFxuICBob3N0OiB7XG4gICAgJyhwb2ludGVyZG93biknOiAnb25Qb2ludGVyRG93bigkZXZlbnQpJyxcbiAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBdGhEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhY2sgPSBpbmplY3QoQXRoT3ZlcmxheVN0YWNrKTtcbiAgcHJpdmF0ZSByZWFkb25seSBsYWJlbHMgPSBpbmplY3RBdGhMYWJlbHMoKTtcblxuICAvKiogSWRzIHRoYXQgbmFtZSBhbmQgZGVzY3JpYmUgdGhlIGRpYWxvZyAoYGFyaWEtbGFiZWxsZWRieS8tZGVzY3JpYmVkYnlgKS4gKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHRpdGxlSWQgPSBgYXRoLWRpYWxvZy10aXRsZS0keysrbmV4dERpYWxvZ0lkfWA7XG4gIHByb3RlY3RlZCByZWFkb25seSBkZXNjcmlwdGlvbklkID0gYGF0aC1kaWFsb2ctZGVzYy0ke25leHREaWFsb2dJZH1gO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBkaWFsb2cgaXMgb3Blbi4gVHdvLXdheTogYFsob3BlbildYC4gKi9cbiAgcmVhZG9ubHkgb3BlbiA9IGlucHV0KGZhbHNlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgLyoqIERpYWxvZyB0aXRsZSAobmFtZXMgdGhlIGRpYWxvZykuICovXG4gIHJlYWRvbmx5IHRpdGxlID0gaW5wdXQoJycpO1xuICAvKiogRGlhbG9nIGRlc2NyaXB0aW9uIChkZXNjcmliZXMgdGhlIGRpYWxvZykuICovXG4gIHJlYWRvbmx5IGRlc2NyaXB0aW9uID0gaW5wdXQoJycpO1xuICByZWFkb25seSBzaXplID0gaW5wdXQ8RGlhbG9nU2l6ZT4oJ21kJyk7XG4gIC8qKiBXaGV0aGVyIGNsaWNraW5nIHRoZSBiYWNrZHJvcCByZXF1ZXN0cyBjbG9zaW5nLiAqL1xuICByZWFkb25seSBjbG9zZU9uQmFja2Ryb3AgPSBpbnB1dCh0cnVlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgLyoqIFdoZXRoZXIgRXNjYXBlIHJlcXVlc3RzIGNsb3NpbmcuICovXG4gIHJlYWRvbmx5IGNsb3NlT25Fc2NhcGUgPSBpbnB1dCh0cnVlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgLyoqIFNob3cgdGhlIOKclSBidXR0b24gaW4gdGhlIGhlYWRlci4gKi9cbiAgcmVhZG9ubHkgc2hvd0Nsb3NlID0gaW5wdXQodHJ1ZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBBY2Nlc3NpYmxlIG5hbWUgb2YgdGhlIGNsb3NlIGJ1dHRvbjsgZGVmYXVsdHMgdG8gYEFUSF9MQUJFTFMuY2xvc2VEaWFsb2dgLiAqL1xuICByZWFkb25seSBjbG9zZUxhYmVsID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIC8qKiBBY2Nlc3NpYmxlIG5hbWUgd2hlbiB0aGVyZSBpcyBubyB2aXNpYmxlIGB0aXRsZWAuICovXG4gIHJlYWRvbmx5IGFyaWFMYWJlbCA9IGlucHV0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICAvKiogYGFsZXJ0ZGlhbG9nYCBmb3IgY29uZmlybWF0aW9ucyB0aGF0IGludGVycnVwdC4gKi9cbiAgcmVhZG9ubHkgcm9sZSA9IGlucHV0PCdkaWFsb2cnIHwgJ2FsZXJ0ZGlhbG9nJz4oJ2RpYWxvZycpO1xuXG4gIC8qKiBUaGUgdXNlciBhc2tlZCB0byBjbG9zZSAo4pyVLCBFc2NhcGUsIGJhY2tkcm9wKS4gKi9cbiAgcmVhZG9ubHkgY2xvc2VkID0gb3V0cHV0PHZvaWQ+KCk7XG4gIC8qKiBUd28td2F5IHBhcnRuZXIgb2YgYG9wZW5gOyBlbWl0cyBgZmFsc2VgIG9uIGEgY2xvc2UgcmVxdWVzdC4gKi9cbiAgcmVhZG9ubHkgb3BlbkNoYW5nZSA9IG91dHB1dDxib29sZWFuPigpO1xuICAvKiogVGhlIGRpYWxvZyBpcyBzaG93biAoYWZ0ZXIgYHNob3dNb2RhbCgpYCkuICovXG4gIHJlYWRvbmx5IG9wZW5lZCA9IG91dHB1dDx2b2lkPigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBjbG9zZUljb24gPSBYO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2xvc2VUZXh0ID0gY29tcHV0ZWQoKCkgPT4gdGhpcy5jbG9zZUxhYmVsKCkgPz8gdGhpcy5sYWJlbHMuY2xvc2VEaWFsb2coKSk7XG5cbiAgcHJpdmF0ZSBkaWFsb2dFbDogSFRNTERpYWxvZ0VsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSByZXR1cm5Gb2N1czogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBwcmVzc2VkT25CYWNrZHJvcCA9IGZhbHNlO1xuICBwcml2YXRlIGxvY2tlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZW50cnk6IEF0aE92ZXJsYXlFbnRyeSA9IHtcbiAgICBtb2RhbDogdHJ1ZSxcbiAgICBwYW5lbDogKCkgPT4gdGhpcy5kaWFsb2dFbCxcbiAgICBhbmNob3I6ICgpID0+IG51bGwsXG4gICAgY2xvc2VPbkVzY2FwZTogKCkgPT4gdGhpcy5jbG9zZU9uRXNjYXBlKCksXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogKCkgPT4gZmFsc2UsXG4gICAgZGlzbWlzczogKCkgPT4gdGhpcy5yZXF1ZXN0Q2xvc2UoKSxcbiAgfTtcblxuICBAVmlld0NoaWxkKCdkaWFsb2cnKVxuICBwcml2YXRlIHNldCBkaWFsb2dSZWYocmVmOiBFbGVtZW50UmVmPEhUTUxEaWFsb2dFbGVtZW50PiB8IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGVsID0gcmVmPy5uYXRpdmVFbGVtZW50ID8/IG51bGw7XG4gICAgaWYgKGVsID09PSB0aGlzLmRpYWxvZ0VsKSByZXR1cm47XG4gICAgaWYgKHRoaXMuZGlhbG9nRWwpIHRoaXMudGVhcmRvd24oKTtcbiAgICB0aGlzLmRpYWxvZ0VsID0gZWw7XG4gICAgaWYgKGVsKSB0aGlzLnByZXNlbnQoZWwpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIC8vIFJlbWVtYmVyIHRoZSBmb2N1cyBiZWZvcmUgdGhlIGRpYWxvZyByZW5kZXJzIGFuZCB0YWtlcyBpdC5cbiAgICBpZiAoY2hhbmdlc1snb3BlbiddICYmIHRoaXMub3BlbigpICYmICF0aGlzLmRpYWxvZ0VsKSB7XG4gICAgICBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgdGhpcy5yZXR1cm5Gb2N1cyA9IGFjdGl2ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGFjdGl2ZSAhPT0gZG9jdW1lbnQuYm9keSA/IGFjdGl2ZSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlhbG9nRWwpIHRoaXMudGVhcmRvd24oKTtcbiAgfVxuXG4gIC8qKiBSZXF1ZXN0cyBjbG9zaW5nLCBhcyB0aGUg4pyVIGJ1dHRvbiBkb2VzLiAqL1xuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3RDbG9zZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpYWxvZ0VsKSB0cmFwVGFiKGV2ZW50LCB0aGlzLmRpYWxvZ0VsKTtcbiAgfVxuXG4gIC8qKiBFc2NhcGU6IHRoZSBicm93c2VyJ3MgY2xvc2UgcmVxdWVzdC4gQWx3YXlzIHByZXZlbnRlZDsgdGhlIHBhcmVudCBkZWNpZGVzLiAqL1xuICBwcm90ZWN0ZWQgb25DYW5jZWwoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRoaXMuY2xvc2VPbkVzY2FwZSgpIHx8IHRoaXMuc3RhY2suZXNjYXBlQ29uc3VtZWQoKSB8fCAhdGhpcy5zdGFjay5pc1RvcCh0aGlzLmVudHJ5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlcXVlc3RDbG9zZSgpO1xuICB9XG5cbiAgLyoqIFRoZSBicm93c2VyIGNsb3NlZCBpdCBhbnl3YXkgKGUuZy4gYSBmb3JjZWQgY2xvc2UgcmVxdWVzdCkuICovXG4gIHByb3RlY3RlZCBvbk5hdGl2ZUNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wZW4oKSAmJiB0aGlzLmRpYWxvZ0VsICYmICF0aGlzLmRpYWxvZ0VsLm9wZW4pIHRoaXMucmVxdWVzdENsb3NlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25Qb2ludGVyRG93bihldmVudDogUG9pbnRlckV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5wcmVzc2VkT25CYWNrZHJvcCA9IHRoaXMuaXNCYWNrZHJvcEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qgb25CYWNrZHJvcCA9IHRoaXMucHJlc3NlZE9uQmFja2Ryb3AgJiYgdGhpcy5pc0JhY2tkcm9wRXZlbnQoZXZlbnQpO1xuICAgIHRoaXMucHJlc3NlZE9uQmFja2Ryb3AgPSBmYWxzZTtcbiAgICBpZiAob25CYWNrZHJvcCAmJiB0aGlzLmNsb3NlT25CYWNrZHJvcCgpICYmIHRoaXMuc3RhY2suaXNUb3AodGhpcy5lbnRyeSkpIHRoaXMucmVxdWVzdENsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RDbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XG4gICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgLyoqIEEgcHJlc3Mgb24gdGhlIGA6OmJhY2tkcm9wYDogaXQgdGFyZ2V0cyB0aGUgZGlhbG9nLCBvdXRzaWRlIGl0cyBib3guICovXG4gIHByaXZhdGUgaXNCYWNrZHJvcEV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50KTogYm9vbGVhbiB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmRpYWxvZ0VsO1xuICAgIGlmICghZWwgfHwgZXZlbnQudGFyZ2V0ICE9PSBlbCkgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHIgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4gKFxuICAgICAgZXZlbnQuY2xpZW50WCA8IHIubGVmdCB8fFxuICAgICAgZXZlbnQuY2xpZW50WCA+IHIucmlnaHQgfHxcbiAgICAgIGV2ZW50LmNsaWVudFkgPCByLnRvcCB8fFxuICAgICAgZXZlbnQuY2xpZW50WSA+IHIuYm90dG9tXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlc2VudChlbDogSFRNTERpYWxvZ0VsZW1lbnQpOiB2b2lkIHtcbiAgICB0aGlzLnN0YWNrLm9wZW4odGhpcy5lbnRyeSk7XG4gICAgdGhpcy5zdGFjay5sb2NrU2Nyb2xsKCk7XG4gICAgdGhpcy5sb2NrZWQgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWVsLm9wZW4pIGVsLnNob3dNb2RhbCgpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gTm90IGNvbm5lY3RlZCAoeWV0KTogc2hvdyBpdCBub24tbW9kYWxseSByYXRoZXIgdGhhbiBub3QgYXQgYWxsLlxuICAgICAgZWwuc2V0QXR0cmlidXRlKCdvcGVuJywgJycpO1xuICAgIH1cbiAgICB0aGlzLnN0YWNrLnJhaXNlVG9wTGF5ZXIoKTtcbiAgICB0aGlzLmZvY3VzSW5pdGlhbChlbCk7XG4gICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c0luaXRpYWwoZWw6IEhUTUxEaWFsb2dFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgYXV0byA9IGVsLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCdbYXV0b2ZvY3VzXScpO1xuICAgIGlmIChhdXRvICYmIGZvY3VzU2FmZWx5KGF1dG8pKSByZXR1cm47XG4gICAgY29uc3QgcGFydHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PignLmF0aC1kaWFsb2dfX2JvZHksIC5hdGgtZGlhbG9nX19mb290ZXInKTtcbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgQXJyYXkuZnJvbShwYXJ0cykpIHtcbiAgICAgIGNvbnN0IGZpcnN0ID0gdGFiYmFibGVzKHBhcnQpWzBdO1xuICAgICAgaWYgKGZpcnN0ICYmIGZvY3VzU2FmZWx5KGZpcnN0KSkgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWZvY3VzU2FmZWx5KHRhYmJhYmxlcyhlbClbMF0pKSBmb2N1c1NhZmVseShlbCk7XG4gIH1cblxuICBwcml2YXRlIHRlYXJkb3duKCk6IHZvaWQge1xuICAgIGNvbnN0IGVsID0gdGhpcy5kaWFsb2dFbDtcbiAgICB0aGlzLmRpYWxvZ0VsID0gbnVsbDtcbiAgICB0aGlzLnN0YWNrLmNsb3NlKHRoaXMuZW50cnkpO1xuICAgIGlmICh0aGlzLmxvY2tlZCkgdGhpcy5zdGFjay51bmxvY2tTY3JvbGwoKTtcbiAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZWw/Lm9wZW4pIGVsLmNsb3NlKCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBBbHJlYWR5IHJlbW92ZWQuXG4gICAgfVxuICAgIGNvbnN0IGJhY2sgPSB0aGlzLnJldHVybkZvY3VzO1xuICAgIHRoaXMucmV0dXJuRm9jdXMgPSBudWxsO1xuICAgIGZvY3VzU2FmZWx5KGJhY2spO1xuICB9XG59XG4iLCJAaWYgKG9wZW4oKSkge1xuICA8ZGlhbG9nXG4gICAgI2RpYWxvZ1xuICAgIGNsYXNzPVwiYXRoLWRpYWxvZ1wiXG4gICAgdGFiaW5kZXg9XCItMVwiXG4gICAgW2NsYXNzXT1cIidhdGgtZGlhbG9nLS0nICsgc2l6ZSgpXCJcbiAgICBbYXR0ci5yb2xlXT1cInJvbGUoKSA9PT0gJ2FsZXJ0ZGlhbG9nJyA/ICdhbGVydGRpYWxvZycgOiBudWxsXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwidGl0bGUoKSA/IHRpdGxlSWQgOiBudWxsXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInRpdGxlKCkgPyBudWxsIDogYXJpYUxhYmVsKClcIlxuICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiZGVzY3JpcHRpb24oKSA/IGRlc2NyaXB0aW9uSWQgOiBudWxsXCJcbiAgICAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiXG4gICAgKGNhbmNlbCk9XCJvbkNhbmNlbCgkZXZlbnQpXCJcbiAgICAoY2xvc2UpPVwib25OYXRpdmVDbG9zZSgpXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJhdGgtZGlhbG9nX19zdXJmYWNlXCI+XG4gICAgICA8aGVhZGVyIGNsYXNzPVwiYXRoLWRpYWxvZ19faGVhZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdGgtZGlhbG9nX19oZWFkZXItdGV4dFwiPlxuICAgICAgICAgIEBpZiAodGl0bGUoKSkge1xuICAgICAgICAgICAgPGgyIGNsYXNzPVwiYXRoLWRpYWxvZ19fdGl0bGVcIiBbaWRdPVwidGl0bGVJZFwiPnt7IHRpdGxlKCkgfX08L2gyPlxuICAgICAgICAgIH1cbiAgICAgICAgICBAaWYgKGRlc2NyaXB0aW9uKCkpIHtcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiYXRoLWRpYWxvZ19fZGVzY3JpcHRpb25cIiBbaWRdPVwiZGVzY3JpcHRpb25JZFwiPnt7IGRlc2NyaXB0aW9uKCkgfX08L3A+XG4gICAgICAgICAgfVxuICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWhlYWRlcl0sW2F0aERpYWxvZ0hlYWRlcl1cIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgQGlmIChzaG93Q2xvc2UoKSkge1xuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiYXRoLWRpYWxvZ19fY2xvc2VcIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImNsb3NlVGV4dCgpXCJcbiAgICAgICAgICAgIChjbGljayk9XCJjbG9zZSgpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bHVjaWRlLWljb24gW2ltZ109XCJjbG9zZUljb25cIiBbc2l6ZV09XCIxOFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIH1cbiAgICAgIDwvaGVhZGVyPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiYXRoLWRpYWxvZ19fYm9keVwiPlxuICAgICAgICA8bmctY29udGVudCAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxmb290ZXIgY2xhc3M9XCJhdGgtZGlhbG9nX19mb290ZXJcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9Zm9vdGVyXSxbYXRoRGlhbG9nRm9vdGVyXVwiIC8+XG4gICAgICA8L2Zvb3Rlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaWFsb2c+XG59XG4iXX0=