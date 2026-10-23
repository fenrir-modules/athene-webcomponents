import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener, ElementRef, inject, } from '@angular/core';
import { ATH_DEFAULT_LABELS, ATH_LABELS } from '../../i18n/labels';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { AthButtonComponent } from '../button/button.component';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
let nextDialogId = 0;
/**
 * Athene Dialog Component
 *
 * Modal dialog for confirmations, forms, and content overlays.
 *
 * @example
 * <ath-dialog [open]="isOpen" title="Create Item" (closed)="isOpen = false">
 *   <p>Dialog content here</p>
 *   <div slot="footer">
 *     <ath-button variant="secondary" (clicked)="isOpen = false">Cancel</ath-button>
 *     <ath-button (clicked)="save()">Save</ath-button>
 *   </div>
 * </ath-dialog>
 */
export class AthDialogComponent {
    constructor() {
        this.host = inject(ElementRef);
        this.returnFocus = null;
        /** Ids that name and describe the dialog (`aria-labelledby/-describedby`). */
        this.titleId = `ath-dialog-title-${++nextDialogId}`;
        this.descriptionId = `ath-dialog-desc-${nextDialogId}`;
        /** Whether the dialog is open */
        this.labels = inject(ATH_LABELS, { optional: true });
        /** Accessible name of the close controls; defaults to `ATH_LABELS`. */
        this.closeLabel = null;
        this.open = false;
        /** Dialog title */
        this.title = '';
        /** Dialog description */
        this.description = '';
        /** Dialog size */
        this.size = 'md';
        /** Whether clicking the backdrop closes the dialog */
        this.closeOnBackdrop = true;
        /** Whether pressing Escape closes the dialog */
        this.closeOnEscape = true;
        /** Close event */
        this.closed = new EventEmitter();
        this.closeIcon = X;
    }
    get closeText() {
        return this.closeLabel ?? (this.labels?.closeDialog ?? ATH_DEFAULT_LABELS.closeDialog)();
    }
    onEscapeKey() {
        if (this.open && this.closeOnEscape) {
            this.close();
        }
    }
    ngOnChanges(changes) {
        if (!changes['open'])
            return;
        if (this.open) {
            // Move focus into the dialog once it has rendered; remember where it was.
            this.returnFocus = document.activeElement;
            setTimeout(() => {
                const panel = this.panel();
                if (!panel || panel.contains(document.activeElement))
                    return;
                (this.focusables()[0] ?? panel).focus();
            });
        }
        else if (this.returnFocus && document.contains(this.returnFocus)) {
            this.returnFocus.focus();
            this.returnFocus = null;
        }
    }
    /** Keep Tab inside the open dialog. */
    onPanelKeydown(event) {
        if (event.key !== 'Tab')
            return;
        const items = this.focusables();
        if (items.length === 0)
            return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        }
        else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
    panel() {
        return this.host.nativeElement.querySelector('.ath-dialog__panel');
    }
    focusables() {
        const panel = this.panel();
        if (!panel)
            return [];
        return Array.from(panel.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    }
    get dialogClasses() {
        return `ath-dialog__panel ath-dialog__panel--${this.size}`;
    }
    close() {
        this.closed.emit();
    }
    onBackdropClick() {
        if (this.closeOnBackdrop) {
            this.close();
        }
    }
    onBackdropKeydown(event) {
        if (!this.closeOnBackdrop) {
            return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.close();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDialogComponent, isStandalone: true, selector: "ath-dialog", inputs: { closeLabel: "closeLabel", open: "open", title: "title", description: "description", size: "size", closeOnBackdrop: "closeOnBackdrop", closeOnEscape: "closeOnEscape" }, outputs: { closed: "closed" }, host: { listeners: { "document:keydown.escape": "onEscapeKey()" } }, usesOnChanges: true, ngImport: i0, template: "@if (open) {\n  <div\n    class=\"ath-dialog__backdrop\"\n    (click)=\"onBackdropClick()\"\n    (keydown)=\"onBackdropKeydown($event)\"\n    role=\"button\"\n    tabindex=\"0\"\n    [attr.aria-label]=\"closeText\"\n  ></div>\n  <div class=\"ath-dialog__container\">\n    <div\n      [class]=\"dialogClasses\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      tabindex=\"-1\"\n      [attr.aria-labelledby]=\"title ? titleId : null\"\n      [attr.aria-describedby]=\"description ? descriptionId : null\"\n      (keydown)=\"onPanelKeydown($event)\"\n    >\n      <!-- Header -->\n      <div class=\"ath-dialog__header\">\n        <div class=\"ath-dialog__header-text\">\n          @if (title) {\n            <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title }}</h2>\n          }\n          @if (description) {\n            <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description }}</p>\n          }\n        </div>\n        <button\n          class=\"ath-dialog__close\"\n          type=\"button\"\n          [attr.aria-label]=\"closeText\"\n          (click)=\"close()\"\n        >\n          <lucide-icon [img]=\"closeIcon\" [size]=\"18\" />\n        </button>\n      </div>\n\n      <!-- Body -->\n      <div class=\"ath-dialog__body\">\n        <ng-content />\n      </div>\n\n      <!-- Footer -->\n      <div class=\"ath-dialog__footer\">\n        <ng-content select=\"[slot=footer]\" />\n      </div>\n    </div>\n  </div>\n}\n", styles: [".ath-dialog__backdrop{position:fixed;inset:0;z-index:var(--z-overlay);background-color:var(--ath-bg-overlay);animation:ath-dialog-backdrop-in .2s ease}.ath-dialog__container{position:fixed;inset:0;z-index:var(--z-modal);display:flex;align-items:center;justify-content:center;padding:var(--ath-space-4);pointer-events:none}.ath-dialog__panel{position:relative;display:flex;flex-direction:column;width:100%;max-height:calc(100vh - var(--ath-space-16));background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-xl);box-shadow:var(--ath-shadow-xl);pointer-events:auto;animation:ath-dialog-panel-in .2s ease}.ath-dialog__panel--sm{max-width:400px}.ath-dialog__panel--md{max-width:520px}.ath-dialog__panel--lg{max-width:680px}.ath-dialog__panel--xl{max-width:860px}.ath-dialog__header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-4);padding:var(--ath-space-6);padding-bottom:0}.ath-dialog__header-text{display:flex;flex-direction:column;gap:var(--ath-space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--ath-font-size-lg);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight)}.ath-dialog__description{margin:0;font-size:var(--ath-font-size-sm);color:var(--ath-text-secondary);line-height:var(--ath-line-height-normal)}.ath-dialog__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-dialog__close:hover{color:var(--ath-text-primary);background-color:var(--ath-bg-tertiary)}.ath-dialog__close:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-dialog__body{flex:1;overflow-y:auto;padding:var(--ath-space-6)}.ath-dialog__footer{display:flex;align-items:center;justify-content:flex-end;gap:var(--ath-space-3);padding:var(--ath-space-4) var(--ath-space-6);border-top:1px solid var(--ath-border-color)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}to{opacity:1}}@keyframes ath-dialog-panel-in{0%{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}.ath-dialog__panel:focus{outline:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dialog', standalone: true, imports: [CommonModule, LucideAngularModule, AthButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (open) {\n  <div\n    class=\"ath-dialog__backdrop\"\n    (click)=\"onBackdropClick()\"\n    (keydown)=\"onBackdropKeydown($event)\"\n    role=\"button\"\n    tabindex=\"0\"\n    [attr.aria-label]=\"closeText\"\n  ></div>\n  <div class=\"ath-dialog__container\">\n    <div\n      [class]=\"dialogClasses\"\n      role=\"dialog\"\n      aria-modal=\"true\"\n      tabindex=\"-1\"\n      [attr.aria-labelledby]=\"title ? titleId : null\"\n      [attr.aria-describedby]=\"description ? descriptionId : null\"\n      (keydown)=\"onPanelKeydown($event)\"\n    >\n      <!-- Header -->\n      <div class=\"ath-dialog__header\">\n        <div class=\"ath-dialog__header-text\">\n          @if (title) {\n            <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title }}</h2>\n          }\n          @if (description) {\n            <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description }}</p>\n          }\n        </div>\n        <button\n          class=\"ath-dialog__close\"\n          type=\"button\"\n          [attr.aria-label]=\"closeText\"\n          (click)=\"close()\"\n        >\n          <lucide-icon [img]=\"closeIcon\" [size]=\"18\" />\n        </button>\n      </div>\n\n      <!-- Body -->\n      <div class=\"ath-dialog__body\">\n        <ng-content />\n      </div>\n\n      <!-- Footer -->\n      <div class=\"ath-dialog__footer\">\n        <ng-content select=\"[slot=footer]\" />\n      </div>\n    </div>\n  </div>\n}\n", styles: [".ath-dialog__backdrop{position:fixed;inset:0;z-index:var(--z-overlay);background-color:var(--ath-bg-overlay);animation:ath-dialog-backdrop-in .2s ease}.ath-dialog__container{position:fixed;inset:0;z-index:var(--z-modal);display:flex;align-items:center;justify-content:center;padding:var(--ath-space-4);pointer-events:none}.ath-dialog__panel{position:relative;display:flex;flex-direction:column;width:100%;max-height:calc(100vh - var(--ath-space-16));background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-xl);box-shadow:var(--ath-shadow-xl);pointer-events:auto;animation:ath-dialog-panel-in .2s ease}.ath-dialog__panel--sm{max-width:400px}.ath-dialog__panel--md{max-width:520px}.ath-dialog__panel--lg{max-width:680px}.ath-dialog__panel--xl{max-width:860px}.ath-dialog__header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-4);padding:var(--ath-space-6);padding-bottom:0}.ath-dialog__header-text{display:flex;flex-direction:column;gap:var(--ath-space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--ath-font-size-lg);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight)}.ath-dialog__description{margin:0;font-size:var(--ath-font-size-sm);color:var(--ath-text-secondary);line-height:var(--ath-line-height-normal)}.ath-dialog__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-dialog__close:hover{color:var(--ath-text-primary);background-color:var(--ath-bg-tertiary)}.ath-dialog__close:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-dialog__body{flex:1;overflow-y:auto;padding:var(--ath-space-6)}.ath-dialog__footer{display:flex;align-items:center;justify-content:flex-end;gap:var(--ath-space-3);padding:var(--ath-space-4) var(--ath-space-6);border-top:1px solid var(--ath-border-color)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}to{opacity:1}}@keyframes ath-dialog-panel-in{0%{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}.ath-dialog__panel:focus{outline:none}\n"] }]
        }], propDecorators: { closeLabel: [{
                type: Input
            }], open: [{
                type: Input
            }], title: [{
                type: Input
            }], description: [{
                type: Input
            }], size: [{
                type: Input
            }], closeOnBackdrop: [{
                type: Input
            }], closeOnEscape: [{
                type: Input
            }], closed: [{
                type: Output
            }], onEscapeKey: [{
                type: HostListener,
                args: ['document:keydown.escape']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaWFsb2cvZGlhbG9nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLFlBQVksRUFDWixVQUFVLEVBR1YsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUFPaEUsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFTSCxNQUFNLE9BQU8sa0JBQWtCO0lBUi9CO1FBU21CLFNBQUksR0FBRyxNQUFNLENBQTBCLFVBQVUsQ0FBQyxDQUFDO1FBQzVELGdCQUFXLEdBQXVCLElBQUksQ0FBQztRQUUvQyw4RUFBOEU7UUFDM0QsWUFBTyxHQUFHLG9CQUFvQixFQUFFLFlBQVksRUFBRSxDQUFDO1FBQy9DLGtCQUFhLEdBQUcsbUJBQW1CLFlBQVksRUFBRSxDQUFDO1FBRXJFLGlDQUFpQztRQUNoQixXQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFF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LHVCQUF1QixDQUFDLE1BQU07OEJBZ0J0QyxVQUFVO3NCQUFsQixLQUFLO2dCQU1HLElBQUk7c0JBQVosS0FBSztnQkFHRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csV0FBVztzQkFBbkIsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csZUFBZTtzQkFBdkIsS0FBSztnQkFHRyxhQUFhO3NCQUFyQixLQUFLO2dCQUdJLE1BQU07c0JBQWYsTUFBTTtnQkFLUCxXQUFXO3NCQURWLFlBQVk7dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBIb3N0TGlzdGVuZXIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFUSF9ERUZBVUxUX0xBQkVMUywgQVRIX0xBQkVMUyB9IGZyb20gJy4uLy4uL2kxOG4vbGFiZWxzJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMdWNpZGVBbmd1bGFyTW9kdWxlLCBYIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuaW1wb3J0IHsgQXRoQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQnO1xuXG4vKipcbiAqIERpYWxvZyBzaXplIHZhcmlhbnRzXG4gKi9cbmV4cG9ydCB0eXBlIERpYWxvZ1NpemUgPSAnc20nIHwgJ21kJyB8ICdsZycgfCAneGwnO1xuXG5sZXQgbmV4dERpYWxvZ0lkID0gMDtcblxuLyoqXG4gKiBBdGhlbmUgRGlhbG9nIENvbXBvbmVudFxuICpcbiAqIE1vZGFsIGRpYWxvZyBmb3IgY29uZmlybWF0aW9ucywgZm9ybXMsIGFuZCBjb250ZW50IG92ZXJsYXlzLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWRpYWxvZyBbb3Blbl09XCJpc09wZW5cIiB0aXRsZT1cIkNyZWF0ZSBJdGVtXCIgKGNsb3NlZCk9XCJpc09wZW4gPSBmYWxzZVwiPlxuICogICA8cD5EaWFsb2cgY29udGVudCBoZXJlPC9wPlxuICogICA8ZGl2IHNsb3Q9XCJmb290ZXJcIj5cbiAqICAgICA8YXRoLWJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgKGNsaWNrZWQpPVwiaXNPcGVuID0gZmFsc2VcIj5DYW5jZWw8L2F0aC1idXR0b24+XG4gKiAgICAgPGF0aC1idXR0b24gKGNsaWNrZWQpPVwic2F2ZSgpXCI+U2F2ZTwvYXRoLWJ1dHRvbj5cbiAqICAgPC9kaXY+XG4gKiA8L2F0aC1kaWFsb2c+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1kaWFsb2cnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBMdWNpZGVBbmd1bGFyTW9kdWxlLCBBdGhCdXR0b25Db21wb25lbnRdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2RpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9kaWFsb2cuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBwcml2YXRlIHJlYWRvbmx5IGhvc3QgPSBpbmplY3Q8RWxlbWVudFJlZjxIVE1MRWxlbWVudD4+KEVsZW1lbnRSZWYpO1xuICBwcml2YXRlIHJldHVybkZvY3VzOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBJZHMgdGhhdCBuYW1lIGFuZCBkZXNjcmliZSB0aGUgZGlhbG9nIChgYXJpYS1sYWJlbGxlZGJ5Ly1kZXNjcmliZWRieWApLiAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdGl0bGVJZCA9IGBhdGgtZGlhbG9nLXRpdGxlLSR7KytuZXh0RGlhbG9nSWR9YDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc2NyaXB0aW9uSWQgPSBgYXRoLWRpYWxvZy1kZXNjLSR7bmV4dERpYWxvZ0lkfWA7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGRpYWxvZyBpcyBvcGVuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgbGFiZWxzID0gaW5qZWN0KEFUSF9MQUJFTFMsIHsgb3B0aW9uYWw6IHRydWUgfSk7XG5cbiAgLyoqIEFjY2Vzc2libGUgbmFtZSBvZiB0aGUgY2xvc2UgY29udHJvbHM7IGRlZmF1bHRzIHRvIGBBVEhfTEFCRUxTYC4gKi9cbiAgQElucHV0KCkgY2xvc2VMYWJlbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgcHJvdGVjdGVkIGdldCBjbG9zZVRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jbG9zZUxhYmVsID8/ICh0aGlzLmxhYmVscz8uY2xvc2VEaWFsb2cgPz8gQVRIX0RFRkFVTFRfTEFCRUxTLmNsb3NlRGlhbG9nKSgpO1xuICB9XG5cbiAgQElucHV0KCkgb3BlbiA9IGZhbHNlO1xuXG4gIC8qKiBEaWFsb2cgdGl0bGUgKi9cbiAgQElucHV0KCkgdGl0bGUgPSAnJztcblxuICAvKiogRGlhbG9nIGRlc2NyaXB0aW9uICovXG4gIEBJbnB1dCgpIGRlc2NyaXB0aW9uID0gJyc7XG5cbiAgLyoqIERpYWxvZyBzaXplICovXG4gIEBJbnB1dCgpIHNpemU6IERpYWxvZ1NpemUgPSAnbWQnO1xuXG4gIC8qKiBXaGV0aGVyIGNsaWNraW5nIHRoZSBiYWNrZHJvcCBjbG9zZXMgdGhlIGRpYWxvZyAqL1xuICBASW5wdXQoKSBjbG9zZU9uQmFja2Ryb3AgPSB0cnVlO1xuXG4gIC8qKiBXaGV0aGVyIHByZXNzaW5nIEVzY2FwZSBjbG9zZXMgdGhlIGRpYWxvZyAqL1xuICBASW5wdXQoKSBjbG9zZU9uRXNjYXBlID0gdHJ1ZTtcblxuICAvKiogQ2xvc2UgZXZlbnQgKi9cbiAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2xvc2VJY29uID0gWDtcblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLmVzY2FwZScpXG4gIG9uRXNjYXBlS2V5KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wZW4gJiYgdGhpcy5jbG9zZU9uRXNjYXBlKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghY2hhbmdlc1snb3BlbiddKSByZXR1cm47XG4gICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgLy8gTW92ZSBmb2N1cyBpbnRvIHRoZSBkaWFsb2cgb25jZSBpdCBoYXMgcmVuZGVyZWQ7IHJlbWVtYmVyIHdoZXJlIGl0IHdhcy5cbiAgICAgIHRoaXMucmV0dXJuRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMucGFuZWwoKTtcbiAgICAgICAgaWYgKCFwYW5lbCB8fCBwYW5lbC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgICAodGhpcy5mb2N1c2FibGVzKClbMF0gPz8gcGFuZWwpLmZvY3VzKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucmV0dXJuRm9jdXMgJiYgZG9jdW1lbnQuY29udGFpbnModGhpcy5yZXR1cm5Gb2N1cykpIHtcbiAgICAgIHRoaXMucmV0dXJuRm9jdXMuZm9jdXMoKTtcbiAgICAgIHRoaXMucmV0dXJuRm9jdXMgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBLZWVwIFRhYiBpbnNpZGUgdGhlIG9wZW4gZGlhbG9nLiAqL1xuICBvblBhbmVsS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5rZXkgIT09ICdUYWInKSByZXR1cm47XG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLmZvY3VzYWJsZXMoKTtcbiAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgY29uc3QgZmlyc3QgPSBpdGVtc1swXTtcbiAgICBjb25zdCBsYXN0ID0gaXRlbXNbaXRlbXMubGVuZ3RoIC0gMV07XG4gICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGZpcnN0KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGFzdC5mb2N1cygpO1xuICAgIH0gZWxzZSBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGxhc3QpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBmaXJzdC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGFuZWwoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oJy5hdGgtZGlhbG9nX19wYW5lbCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c2FibGVzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5wYW5lbCgpO1xuICAgIGlmICghcGFuZWwpIHJldHVybiBbXTtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcbiAgICAgIHBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFxuICAgICAgICAnYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJ1xuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBnZXQgZGlhbG9nQ2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgYXRoLWRpYWxvZ19fcGFuZWwgYXRoLWRpYWxvZ19fcGFuZWwtLSR7dGhpcy5zaXplfWA7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XG4gIH1cblxuICBvbkJhY2tkcm9wQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xvc2VPbkJhY2tkcm9wKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgb25CYWNrZHJvcEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2xvc2VPbkJhY2tkcm9wKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICcgJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cbiIsIkBpZiAob3Blbikge1xuICA8ZGl2XG4gICAgY2xhc3M9XCJhdGgtZGlhbG9nX19iYWNrZHJvcFwiXG4gICAgKGNsaWNrKT1cIm9uQmFja2Ryb3BDbGljaygpXCJcbiAgICAoa2V5ZG93bik9XCJvbkJhY2tkcm9wS2V5ZG93bigkZXZlbnQpXCJcbiAgICByb2xlPVwiYnV0dG9uXCJcbiAgICB0YWJpbmRleD1cIjBcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY2xvc2VUZXh0XCJcbiAgPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiYXRoLWRpYWxvZ19fY29udGFpbmVyXCI+XG4gICAgPGRpdlxuICAgICAgW2NsYXNzXT1cImRpYWxvZ0NsYXNzZXNcIlxuICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJ0aXRsZSA/IHRpdGxlSWQgOiBudWxsXCJcbiAgICAgIFthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiZGVzY3JpcHRpb24gPyBkZXNjcmlwdGlvbklkIDogbnVsbFwiXG4gICAgICAoa2V5ZG93bik9XCJvblBhbmVsS2V5ZG93bigkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8IS0tIEhlYWRlciAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJhdGgtZGlhbG9nX19oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF0aC1kaWFsb2dfX2hlYWRlci10ZXh0XCI+XG4gICAgICAgICAgQGlmICh0aXRsZSkge1xuICAgICAgICAgICAgPGgyIGNsYXNzPVwiYXRoLWRpYWxvZ19fdGl0bGVcIiBbaWRdPVwidGl0bGVJZFwiPnt7IHRpdGxlIH19PC9oMj5cbiAgICAgICAgICB9XG4gICAgICAgICAgQGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgPHAgY2xhc3M9XCJhdGgtZGlhbG9nX19kZXNjcmlwdGlvblwiIFtpZF09XCJkZXNjcmlwdGlvbklkXCI+e3sgZGVzY3JpcHRpb24gfX08L3A+XG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzPVwiYXRoLWRpYWxvZ19fY2xvc2VcIlxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiY2xvc2VUZXh0XCJcbiAgICAgICAgICAoY2xpY2spPVwiY2xvc2UoKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bHVjaWRlLWljb24gW2ltZ109XCJjbG9zZUljb25cIiBbc2l6ZV09XCIxOFwiIC8+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDwhLS0gQm9keSAtLT5cbiAgICAgIDxkaXYgY2xhc3M9XCJhdGgtZGlhbG9nX19ib2R5XCI+XG4gICAgICAgIDxuZy1jb250ZW50IC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBGb290ZXIgLS0+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXRoLWRpYWxvZ19fZm9vdGVyXCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWZvb3Rlcl1cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxufVxuIl19