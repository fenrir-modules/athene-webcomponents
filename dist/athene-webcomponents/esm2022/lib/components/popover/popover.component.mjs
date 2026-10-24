import { ChangeDetectionStrategy, Component, Directive, TemplateRef, booleanAttribute, computed, contentChild, inject, input, model, output, signal, viewChild, } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AthFloatingDirective, resolveAnchor, resolveFloatingTarget, } from '../floating/floating.directive';
import { AthOverlayStack, } from '../floating/overlay-stack';
import { focusSafely, focusTarget, tabbables, trapTab } from '../floating/focus';
import * as i0 from "@angular/core";
let nextPopoverId = 0;
/**
 * Lazy panel content: rendered only while the popover is open.
 *
 * @example
 * <ath-popover>
 *   <ng-template athPopoverContent>…</ng-template>
 * </ath-popover>
 */
export class AthPopoverContentDirective {
    constructor() {
        this.template = inject(TemplateRef);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverContentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.14", type: AthPopoverContentDirective, isStandalone: true, selector: "ng-template[athPopoverContent]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[athPopoverContent]',
                    standalone: true,
                }]
        }] });
/**
 * Athene Popover
 *
 * An anchored panel in the top layer: no container's overflow or z-index
 * clips it. Opens from `athPopoverTrigger`, `show()` or `[(open)]`; closes on
 * Escape (topmost overlay only), outside click and Tab-out, and returns focus
 * to the trigger. `role="dialog"` by default; `trapFocus` keeps Tab inside.
 *
 * @example
 * <ath-button [athPopoverTrigger]="info">Details</ath-button>
 * <ath-popover #info ariaLabel="Details" arrow>
 *   <p>Content</p>
 * </ath-popover>
 */
export class AthPopoverComponent {
    constructor() {
        this.stack = inject(AthOverlayStack);
        /** Whether the panel is shown. Two-way: `[(open)]`. */
        this.open = model(false);
        /**
         * The element the panel hangs from (a trigger directive sets it on its
         * own), or a `FloatingVirtualAnchor` such as the spot the pointer rests on;
         * its `contextElement` then counts as the trigger.
         */
        this.anchor = input(null);
        this.size = input('md');
        this.padding = input('md');
        this.align = input('start');
        this.side = input('bottom');
        /** Gap to the anchor in px. */
        this.offset = input(6);
        this.matchWidth = input(false, { transform: booleanAttribute });
        /** Upper bound for the height in px (the viewport caps it anyway). */
        this.maxHeight = input(null);
        /** Show an arrow pointing at the anchor. */
        this.arrow = input(false, { transform: booleanAttribute });
        /** Keep Tab inside the panel (modal-like content); otherwise Tab out closes it. */
        this.trapFocus = input(false, { transform: booleanAttribute });
        this.autoFocus = input('first');
        /** Return focus to the trigger on Escape / selection / programmatic close. */
        this.restoreFocus = input(true, { transform: booleanAttribute });
        this.closeOnEscape = input(true, { transform: booleanAttribute });
        this.closeOnOutsideClick = input(true, { transform: booleanAttribute });
        this.panelRole = input('dialog');
        this.ariaLabel = input(null);
        this.ariaLabelledby = input(null);
        /** Extra classes on the panel (it lives in this component's view). */
        this.panelClass = input('');
        this.opened = output();
        this.closed = output();
        /** Id of the panel, for `aria-controls`. */
        this.panelId = input(`ath-popover-${++nextPopoverId}`);
        this.lazyContent = contentChild(AthPopoverContentDirective, {
            descendants: false,
        });
        this.panelRef = viewChild('panel');
        this.triggerAnchor = signal(null);
        /** The element the panel currently hangs from. */
        this.anchorElement = computed(() => resolveAnchor(this.anchor()) ?? this.triggerAnchor());
        /** What the panel is placed against: the anchor input (element or virtual) or the trigger. */
        this.floatTarget = computed(() => resolveFloatingTarget(this.anchor()) ?? this.triggerAnchor());
        this.panelClasses = computed(() => [
            `ath-popover__panel--${this.size()}`,
            `ath-popover__panel--pad-${this.padding()}`,
            this.panelClass(),
        ]
            .filter(Boolean)
            .join(' '));
        this.registered = false;
        this.returnFocus = null;
        this.entry = {
            panel: () => this.panel,
            anchor: () => this.anchorElement(),
            closeOnEscape: () => this.closeOnEscape(),
            closeOnOutsideClick: () => this.closeOnOutsideClick(),
            dismiss: (reason) => this.hide(reason),
        };
    }
    /** The panel element while open. */
    get panel() {
        return this.panelRef()?.nativeElement ?? null;
    }
    ngOnChanges(changes) {
        if (!changes['open'])
            return;
        if (this.open() && !this.registered)
            this.afterOpen();
        else if (!this.open() && this.registered)
            this.afterClose('programmatic');
    }
    ngOnDestroy() {
        clearTimeout(this.focusTimer);
        if (this.registered)
            this.stack.close(this.entry);
    }
    /** Opens the panel, optionally hanging it from `anchor`. */
    show(anchor) {
        if (anchor)
            this.triggerAnchor.set(anchor);
        if (this.open())
            return;
        this.open.set(true);
        this.afterOpen();
    }
    /**
     * Closes the panel. `restore` overrides whether focus goes back to the
     * trigger (default: yes when focus was inside or the user pressed Escape).
     */
    hide(reason = 'programmatic', restore) {
        if (!this.open())
            return;
        this.open.set(false);
        this.afterClose(reason, restore);
    }
    toggle(anchor) {
        if (this.open())
            this.hide();
        else
            this.show(anchor);
    }
    /** Moves focus into the panel according to `autoFocus` (or `mode`). */
    focusPanel(mode = this.autoFocus()) {
        const panel = this.panel;
        if (!panel || mode === 'none')
            return;
        const active = panel.ownerDocument.activeElement;
        if (active && panel.contains(active) && active !== panel)
            return;
        const target = mode === 'first' ? (tabbables(panel)[0] ?? panel) : panel;
        focusSafely(target);
    }
    onKeydown(event) {
        const panel = this.panel;
        if (panel && this.trapFocus())
            trapTab(event, panel);
    }
    onFocusOut(event) {
        if (this.trapFocus() || !this.open())
            return;
        const next = event.relatedTarget;
        const panel = this.panel;
        const anchor = this.anchorElement();
        if (!(next instanceof Node) || !panel)
            return;
        if (panel.contains(next) || anchor?.contains(next))
            return;
        this.hide('tab', false);
    }
    afterOpen() {
        this.registered = true;
        const doc = this.anchorElement()?.ownerDocument ?? document;
        const active = doc.activeElement;
        const anchor = this.anchorElement();
        this.returnFocus = anchor
            ? focusTarget(anchor)
            : active instanceof HTMLElement && active !== doc.body
                ? active
                : null;
        this.stack.open(this.entry);
        this.opened.emit();
        // After the panel has rendered and been positioned.
        clearTimeout(this.focusTimer);
        this.focusTimer = setTimeout(() => this.focusPanel());
    }
    afterClose(reason, restore) {
        this.registered = false;
        clearTimeout(this.focusTimer);
        this.stack.close(this.entry);
        const panel = this.panel;
        const doc = panel?.ownerDocument ?? document;
        const focusInside = !!panel && panel.contains(doc.activeElement);
        const back = this.returnFocus;
        this.returnFocus = null;
        const wanted = restore ??
            (this.restoreFocus() &&
                (reason === 'escape' || reason === 'select' || (reason !== 'tab' && focusInside)));
        if (wanted && reason !== 'outside') {
            focusSafely(back);
        }
        else if (reason === 'outside' && focusInside && this.restoreFocus()) {
            // The panel takes focus with it; if the click landed on nothing
            // focusable, put focus back on the trigger instead of the page.
            setTimeout(() => {
                if (doc.activeElement === doc.body || !doc.activeElement)
                    focusSafely(back);
            });
        }
        this.closed.emit(reason);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPopoverComponent, isStandalone: true, selector: "ath-popover", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, padding: { classPropertyName: "padding", publicName: "padding", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null }, side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null }, offset: { classPropertyName: "offset", publicName: "offset", isSignal: true, isRequired: false, transformFunction: null }, matchWidth: { classPropertyName: "matchWidth", publicName: "matchWidth", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, arrow: { classPropertyName: "arrow", publicName: "arrow", isSignal: true, isRequired: false, transformFunction: null }, trapFocus: { classPropertyName: "trapFocus", publicName: "trapFocus", isSignal: true, isRequired: false, transformFunction: null }, autoFocus: { classPropertyName: "autoFocus", publicName: "autoFocus", isSignal: true, isRequired: false, transformFunction: null }, restoreFocus: { classPropertyName: "restoreFocus", publicName: "restoreFocus", isSignal: true, isRequired: false, transformFunction: null }, closeOnEscape: { classPropertyName: "closeOnEscape", publicName: "closeOnEscape", isSignal: true, isRequired: false, transformFunction: null }, closeOnOutsideClick: { classPropertyName: "closeOnOutsideClick", publicName: "closeOnOutsideClick", isSignal: true, isRequired: false, transformFunction: null }, panelRole: { classPropertyName: "panelRole", publicName: "panelRole", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabelledby: { classPropertyName: "ariaLabelledby", publicName: "ariaLabelledby", isSignal: true, isRequired: false, transformFunction: null }, panelClass: { classPropertyName: "panelClass", publicName: "panelClass", isSignal: true, isRequired: false, transformFunction: null }, panelId: { classPropertyName: "panelId", publicName: "panelId", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", opened: "opened", closed: "closed" }, queries: [{ propertyName: "lazyContent", first: true, predicate: AthPopoverContentDirective, isSignal: true }], viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["panel"], descendants: true, isSignal: true }], exportAs: ["athPopover"], usesOnChanges: true, ngImport: i0, template: "@if (open()) {\n  <div\n    #panel\n    class=\"ath-popover__panel\"\n    [class]=\"panelClasses()\"\n    [id]=\"panelId()\"\n    [attr.role]=\"panelRole()\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    [attr.aria-modal]=\"trapFocus() && panelRole() === 'dialog' ? 'true' : null\"\n    tabindex=\"-1\"\n    [athFloating]=\"floatTarget()\"\n    [align]=\"align()\"\n    [side]=\"side()\"\n    [offset]=\"offset()\"\n    [matchWidth]=\"matchWidth()\"\n    [maxHeight]=\"maxHeight()\"\n    [arrow]=\"arrow() ? arrowEl : null\"\n    (keydown)=\"onKeydown($event)\"\n    (focusout)=\"onFocusOut($event)\"\n  >\n    <span #arrowEl class=\"ath-popover__arrow\" [hidden]=\"!arrow()\" aria-hidden=\"true\"></span>\n    @if (lazyContent(); as lazy) {\n      <ng-container [ngTemplateOutlet]=\"lazy.template\" />\n    } @else {\n      <ng-content />\n    }\n  </div>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:contents}.ath-popover__panel{box-sizing:border-box;max-width:calc(100vw - var(--space-4));font-family:var(--font-sans);font-size:var(--text-base);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);animation:ath-popover-in var(--t-base)}.ath-popover__panel:focus{outline:none}.ath-popover__panel:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-popover__panel--sm{width:220px}.ath-popover__panel--md{width:280px}.ath-popover__panel--lg{width:360px}.ath-popover__panel--auto{width:max-content;min-width:180px}.ath-popover__panel--pad-md{padding:var(--space-3)}.ath-popover__panel--pad-sm{padding:var(--space-1)}.ath-popover__panel--pad-none{padding:0}.ath-popover__panel[data-placement=top]{animation-name:ath-popover-in-up}.ath-popover__arrow{position:absolute;top:-6px;width:10px;height:10px;background:var(--surface);border-top:1px solid var(--border);border-left:1px solid var(--border);transform:translate(-50%) rotate(45deg);pointer-events:none}[data-placement=top]>.ath-popover__arrow{top:auto;bottom:-6px;transform:translate(-50%) rotate(225deg)}@keyframes ath-popover-in{0%{opacity:0;transform:translateY(-4px)}}@keyframes ath-popover-in-up{0%{opacity:0;transform:translateY(4px)}}\n"], dependencies: [{ kind: "directive", type: AthFloatingDirective, selector: "[athFloating]", inputs: ["athFloating", "align", "side", "offset", "matchWidth", "maxHeight", "topLayer", "arrow"], exportAs: ["athFloating"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-popover', standalone: true, imports: [AthFloatingDirective, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'athPopover', template: "@if (open()) {\n  <div\n    #panel\n    class=\"ath-popover__panel\"\n    [class]=\"panelClasses()\"\n    [id]=\"panelId()\"\n    [attr.role]=\"panelRole()\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    [attr.aria-modal]=\"trapFocus() && panelRole() === 'dialog' ? 'true' : null\"\n    tabindex=\"-1\"\n    [athFloating]=\"floatTarget()\"\n    [align]=\"align()\"\n    [side]=\"side()\"\n    [offset]=\"offset()\"\n    [matchWidth]=\"matchWidth()\"\n    [maxHeight]=\"maxHeight()\"\n    [arrow]=\"arrow() ? arrowEl : null\"\n    (keydown)=\"onKeydown($event)\"\n    (focusout)=\"onFocusOut($event)\"\n  >\n    <span #arrowEl class=\"ath-popover__arrow\" [hidden]=\"!arrow()\" aria-hidden=\"true\"></span>\n    @if (lazyContent(); as lazy) {\n      <ng-container [ngTemplateOutlet]=\"lazy.template\" />\n    } @else {\n      <ng-content />\n    }\n  </div>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:contents}.ath-popover__panel{box-sizing:border-box;max-width:calc(100vw - var(--space-4));font-family:var(--font-sans);font-size:var(--text-base);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);animation:ath-popover-in var(--t-base)}.ath-popover__panel:focus{outline:none}.ath-popover__panel:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-popover__panel--sm{width:220px}.ath-popover__panel--md{width:280px}.ath-popover__panel--lg{width:360px}.ath-popover__panel--auto{width:max-content;min-width:180px}.ath-popover__panel--pad-md{padding:var(--space-3)}.ath-popover__panel--pad-sm{padding:var(--space-1)}.ath-popover__panel--pad-none{padding:0}.ath-popover__panel[data-placement=top]{animation-name:ath-popover-in-up}.ath-popover__arrow{position:absolute;top:-6px;width:10px;height:10px;background:var(--surface);border-top:1px solid var(--border);border-left:1px solid var(--border);transform:translate(-50%) rotate(45deg);pointer-events:none}[data-placement=top]>.ath-popover__arrow{top:auto;bottom:-6px;transform:translate(-50%) rotate(225deg)}@keyframes ath-popover-in{0%{opacity:0;transform:translateY(-4px)}}@keyframes ath-popover-in-up{0%{opacity:0;transform:translateY(4px)}}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUtULFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGFBQWEsRUFDYixxQkFBcUIsR0FFdEIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV4QyxPQUFPLEVBQ0wsZUFBZSxHQUdoQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFhakYsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBRXRCOzs7Ozs7O0dBT0c7QUFLSCxNQUFNLE9BQU8sMEJBQTBCO0lBSnZDO1FBS1csYUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN6QzsrR0FGWSwwQkFBMEI7bUdBQTFCLDBCQUEwQjs7NEZBQTFCLDBCQUEwQjtrQkFKdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMx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cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBib29sZWFuQXR0cmlidXRlLFxuICBjb21wdXRlZCxcbiAgY29udGVudENoaWxkLFxuICBpbmplY3QsXG4gIGlucHV0LFxuICBtb2RlbCxcbiAgb3V0cHV0LFxuICBzaWduYWwsXG4gIHZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1RlbXBsYXRlT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEF0aEZsb2F0aW5nRGlyZWN0aXZlLFxuICByZXNvbHZlQW5jaG9yLFxuICByZXNvbHZlRmxvYXRpbmdUYXJnZXQsXG4gIHR5cGUgRmxvYXRpbmdBbmNob3IsXG59IGZyb20gJy4uL2Zsb2F0aW5nL2Zsb2F0aW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgdHlwZSB7IEZsb2F0aW5nQWxpZ24sIEZsb2F0aW5nU2lkZSB9IGZyb20gJy4uL2Zsb2F0aW5nL2Zsb2F0aW5nJztcbmltcG9ydCB7XG4gIEF0aE92ZXJsYXlTdGFjayxcbiAgdHlwZSBBdGhPdmVybGF5Q2xvc2VSZWFzb24sXG4gIHR5cGUgQXRoT3ZlcmxheUVudHJ5LFxufSBmcm9tICcuLi9mbG9hdGluZy9vdmVybGF5LXN0YWNrJztcbmltcG9ydCB7IGZvY3VzU2FmZWx5LCBmb2N1c1RhcmdldCwgdGFiYmFibGVzLCB0cmFwVGFiIH0gZnJvbSAnLi4vZmxvYXRpbmcvZm9jdXMnO1xuXG4vKiogUGFuZWwgd2lkdGg6IGBzbWAgMjIwcHgsIGBtZGAgMjgwcHggKGRlZmF1bHQpLCBgbGdgIDM2MHB4LCBgYXV0b2AgZml0cyB0aGUgY29udGVudC4gKi9cbmV4cG9ydCB0eXBlIFBvcG92ZXJTaXplID0gJ3NtJyB8ICdtZCcgfCAnbGcnIHwgJ2F1dG8nO1xuLyoqIElubmVyIHBhZGRpbmcgb2YgdGhlIHBhbmVsLiAqL1xuZXhwb3J0IHR5cGUgUG9wb3ZlclBhZGRpbmcgPSAnbWQnIHwgJ3NtJyB8ICdub25lJztcbi8qKiBXaGVyZSBmb2N1cyBnb2VzIHdoZW4gdGhlIHBhbmVsIG9wZW5zLiAqL1xuZXhwb3J0IHR5cGUgUG9wb3ZlckF1dG9Gb2N1cyA9ICdmaXJzdCcgfCAncGFuZWwnIHwgJ25vbmUnO1xuLyoqIEFSSUEgcm9sZSBvZiB0aGUgcGFuZWw7IGBudWxsYCBmb3IgYSBiYXJlIGNvbnRhaW5lciAodGhlIGNvbnRlbnQgYnJpbmdzIGl0cyBvd24gcm9sZSkuICovXG5leHBvcnQgdHlwZSBQb3BvdmVyUm9sZSA9ICdkaWFsb2cnIHwgJ21lbnUnIHwgJ2xpc3Rib3gnIHwgbnVsbDtcblxuZXhwb3J0IHR5cGUgeyBBdGhPdmVybGF5Q2xvc2VSZWFzb24gYXMgUG9wb3ZlckNsb3NlUmVhc29uIH0gZnJvbSAnLi4vZmxvYXRpbmcvb3ZlcmxheS1zdGFjayc7XG5cbmxldCBuZXh0UG9wb3ZlcklkID0gMDtcblxuLyoqXG4gKiBMYXp5IHBhbmVsIGNvbnRlbnQ6IHJlbmRlcmVkIG9ubHkgd2hpbGUgdGhlIHBvcG92ZXIgaXMgb3Blbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1wb3BvdmVyPlxuICogICA8bmctdGVtcGxhdGUgYXRoUG9wb3ZlckNvbnRlbnQ+4oCmPC9uZy10ZW1wbGF0ZT5cbiAqIDwvYXRoLXBvcG92ZXI+XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW2F0aFBvcG92ZXJDb250ZW50XScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFBvcG92ZXJDb250ZW50RGlyZWN0aXZlIHtcbiAgcmVhZG9ubHkgdGVtcGxhdGUgPSBpbmplY3QoVGVtcGxhdGVSZWYpO1xufVxuXG4vKipcbiAqIEF0aGVuZSBQb3BvdmVyXG4gKlxuICogQW4gYW5jaG9yZWQgcGFuZWwgaW4gdGhlIHRvcCBsYXllcjogbm8gY29udGFpbmVyJ3Mgb3ZlcmZsb3cgb3Igei1pbmRleFxuICogY2xpcHMgaXQuIE9wZW5zIGZyb20gYGF0aFBvcG92ZXJUcmlnZ2VyYCwgYHNob3coKWAgb3IgYFsob3BlbildYDsgY2xvc2VzIG9uXG4gKiBFc2NhcGUgKHRvcG1vc3Qgb3ZlcmxheSBvbmx5KSwgb3V0c2lkZSBjbGljayBhbmQgVGFiLW91dCwgYW5kIHJldHVybnMgZm9jdXNcbiAqIHRvIHRoZSB0cmlnZ2VyLiBgcm9sZT1cImRpYWxvZ1wiYCBieSBkZWZhdWx0OyBgdHJhcEZvY3VzYCBrZWVwcyBUYWIgaW5zaWRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWJ1dHRvbiBbYXRoUG9wb3ZlclRyaWdnZXJdPVwiaW5mb1wiPkRldGFpbHM8L2F0aC1idXR0b24+XG4gKiA8YXRoLXBvcG92ZXIgI2luZm8gYXJpYUxhYmVsPVwiRGV0YWlsc1wiIGFycm93PlxuICogICA8cD5Db250ZW50PC9wPlxuICogPC9hdGgtcG9wb3Zlcj5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLXBvcG92ZXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQXRoRmxvYXRpbmdEaXJlY3RpdmUsIE5nVGVtcGxhdGVPdXRsZXRdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vcG9wb3Zlci5jb21wb25lbnQuc2NzcycsXG4gIGV4cG9ydEFzOiAnYXRoUG9wb3ZlcicsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFBvcG92ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhY2sgPSBpbmplY3QoQXRoT3ZlcmxheVN0YWNrKTtcblxuICAvKiogV2hldGhlciB0aGUgcGFuZWwgaXMgc2hvd24uIFR3by13YXk6IGBbKG9wZW4pXWAuICovXG4gIHJlYWRvbmx5IG9wZW4gPSBtb2RlbChmYWxzZSk7XG4gIC8qKlxuICAgKiBUaGUgZWxlbWVudCB0aGUgcGFuZWwgaGFuZ3MgZnJvbSAoYSB0cmlnZ2VyIGRpcmVjdGl2ZSBzZXRzIGl0IG9uIGl0c1xuICAgKiBvd24pLCBvciBhIGBGbG9hdGluZ1ZpcnR1YWxBbmNob3JgIHN1Y2ggYXMgdGhlIHNwb3QgdGhlIHBvaW50ZXIgcmVzdHMgb247XG4gICAqIGl0cyBgY29udGV4dEVsZW1lbnRgIHRoZW4gY291bnRzIGFzIHRoZSB0cmlnZ2VyLlxuICAgKi9cbiAgcmVhZG9ubHkgYW5jaG9yID0gaW5wdXQ8RmxvYXRpbmdBbmNob3I+KG51bGwpO1xuICByZWFkb25seSBzaXplID0gaW5wdXQ8UG9wb3ZlclNpemU+KCdtZCcpO1xuICByZWFkb25seSBwYWRkaW5nID0gaW5wdXQ8UG9wb3ZlclBhZGRpbmc+KCdtZCcpO1xuICByZWFkb25seSBhbGlnbiA9IGlucHV0PEZsb2F0aW5nQWxpZ24+KCdzdGFydCcpO1xuICByZWFkb25seSBzaWRlID0gaW5wdXQ8RmxvYXRpbmdTaWRlPignYm90dG9tJyk7XG4gIC8qKiBHYXAgdG8gdGhlIGFuY2hvciBpbiBweC4gKi9cbiAgcmVhZG9ubHkgb2Zmc2V0ID0gaW5wdXQoNik7XG4gIHJlYWRvbmx5IG1hdGNoV2lkdGggPSBpbnB1dChmYWxzZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBVcHBlciBib3VuZCBmb3IgdGhlIGhlaWdodCBpbiBweCAodGhlIHZpZXdwb3J0IGNhcHMgaXQgYW55d2F5KS4gKi9cbiAgcmVhZG9ubHkgbWF4SGVpZ2h0ID0gaW5wdXQ8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIC8qKiBTaG93IGFuIGFycm93IHBvaW50aW5nIGF0IHRoZSBhbmNob3IuICovXG4gIHJlYWRvbmx5IGFycm93ID0gaW5wdXQoZmFsc2UsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogS2VlcCBUYWIgaW5zaWRlIHRoZSBwYW5lbCAobW9kYWwtbGlrZSBjb250ZW50KTsgb3RoZXJ3aXNlIFRhYiBvdXQgY2xvc2VzIGl0LiAqL1xuICByZWFkb25seSB0cmFwRm9jdXMgPSBpbnB1dChmYWxzZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIHJlYWRvbmx5IGF1dG9Gb2N1cyA9IGlucHV0PFBvcG92ZXJBdXRvRm9jdXM+KCdmaXJzdCcpO1xuICAvKiogUmV0dXJuIGZvY3VzIHRvIHRoZSB0cmlnZ2VyIG9uIEVzY2FwZSAvIHNlbGVjdGlvbiAvIHByb2dyYW1tYXRpYyBjbG9zZS4gKi9cbiAgcmVhZG9ubHkgcmVzdG9yZUZvY3VzID0gaW5wdXQodHJ1ZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIHJlYWRvbmx5IGNsb3NlT25Fc2NhcGUgPSBpbnB1dCh0cnVlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgcmVhZG9ubHkgY2xvc2VPbk91dHNpZGVDbGljayA9IGlucHV0KHRydWUsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICByZWFkb25seSBwYW5lbFJvbGUgPSBpbnB1dDxQb3BvdmVyUm9sZT4oJ2RpYWxvZycpO1xuICByZWFkb25seSBhcmlhTGFiZWwgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgYXJpYUxhYmVsbGVkYnkgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgLyoqIEV4dHJhIGNsYXNzZXMgb24gdGhlIHBhbmVsIChpdCBsaXZlcyBpbiB0aGlzIGNvbXBvbmVudCdzIHZpZXcpLiAqL1xuICByZWFkb25seSBwYW5lbENsYXNzID0gaW5wdXQoJycpO1xuXG4gIHJlYWRvbmx5IG9wZW5lZCA9IG91dHB1dDx2b2lkPigpO1xuICByZWFkb25seSBjbG9zZWQgPSBvdXRwdXQ8QXRoT3ZlcmxheUNsb3NlUmVhc29uPigpO1xuXG4gIC8qKiBJZCBvZiB0aGUgcGFuZWwsIGZvciBgYXJpYS1jb250cm9sc2AuICovXG4gIHJlYWRvbmx5IHBhbmVsSWQgPSBpbnB1dChgYXRoLXBvcG92ZXItJHsrK25leHRQb3BvdmVySWR9YCk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGxhenlDb250ZW50ID0gY29udGVudENoaWxkKEF0aFBvcG92ZXJDb250ZW50RGlyZWN0aXZlLCB7XG4gICAgZGVzY2VuZGFudHM6IGZhbHNlLFxuICB9KTtcbiAgcHJpdmF0ZSByZWFkb25seSBwYW5lbFJlZiA9IHZpZXdDaGlsZDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj4oJ3BhbmVsJyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgdHJpZ2dlckFuY2hvciA9IHNpZ25hbDxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIC8qKiBUaGUgZWxlbWVudCB0aGUgcGFuZWwgY3VycmVudGx5IGhhbmdzIGZyb20uICovXG4gIHJlYWRvbmx5IGFuY2hvckVsZW1lbnQgPSBjb21wdXRlZCgoKSA9PiByZXNvbHZlQW5jaG9yKHRoaXMuYW5jaG9yKCkpID8/IHRoaXMudHJpZ2dlckFuY2hvcigpKTtcblxuICAvKiogV2hhdCB0aGUgcGFuZWwgaXMgcGxhY2VkIGFnYWluc3Q6IHRoZSBhbmNob3IgaW5wdXQgKGVsZW1lbnQgb3IgdmlydHVhbCkgb3IgdGhlIHRyaWdnZXIuICovXG4gIHByb3RlY3RlZCByZWFkb25seSBmbG9hdFRhcmdldCA9IGNvbXB1dGVkKFxuICAgICgpID0+IHJlc29sdmVGbG9hdGluZ1RhcmdldCh0aGlzLmFuY2hvcigpKSA/PyB0aGlzLnRyaWdnZXJBbmNob3IoKVxuICApO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBwYW5lbENsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIFtcbiAgICAgIGBhdGgtcG9wb3Zlcl9fcGFuZWwtLSR7dGhpcy5zaXplKCl9YCxcbiAgICAgIGBhdGgtcG9wb3Zlcl9fcGFuZWwtLXBhZC0ke3RoaXMucGFkZGluZygpfWAsXG4gICAgICB0aGlzLnBhbmVsQ2xhc3MoKSxcbiAgICBdXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgICAuam9pbignICcpXG4gICk7XG5cbiAgcHJpdmF0ZSByZWdpc3RlcmVkID0gZmFsc2U7XG4gIHByaXZhdGUgcmV0dXJuRm9jdXM6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgZm9jdXNUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbnRyeTogQXRoT3ZlcmxheUVudHJ5ID0ge1xuICAgIHBhbmVsOiAoKSA9PiB0aGlzLnBhbmVsLFxuICAgIGFuY2hvcjogKCkgPT4gdGhpcy5hbmNob3JFbGVtZW50KCksXG4gICAgY2xvc2VPbkVzY2FwZTogKCkgPT4gdGhpcy5jbG9zZU9uRXNjYXBlKCksXG4gICAgY2xvc2VPbk91dHNpZGVDbGljazogKCkgPT4gdGhpcy5jbG9zZU9uT3V0c2lkZUNsaWNrKCksXG4gICAgZGlzbWlzczogKHJlYXNvbikgPT4gdGhpcy5oaWRlKHJlYXNvbiksXG4gIH07XG5cbiAgLyoqIFRoZSBwYW5lbCBlbGVtZW50IHdoaWxlIG9wZW4uICovXG4gIGdldCBwYW5lbCgpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnBhbmVsUmVmKCk/Lm5hdGl2ZUVsZW1lbnQgPz8gbnVsbDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIWNoYW5nZXNbJ29wZW4nXSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLm9wZW4oKSAmJiAhdGhpcy5yZWdpc3RlcmVkKSB0aGlzLmFmdGVyT3BlbigpO1xuICAgIGVsc2UgaWYgKCF0aGlzLm9wZW4oKSAmJiB0aGlzLnJlZ2lzdGVyZWQpIHRoaXMuYWZ0ZXJDbG9zZSgncHJvZ3JhbW1hdGljJyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mb2N1c1RpbWVyKTtcbiAgICBpZiAodGhpcy5yZWdpc3RlcmVkKSB0aGlzLnN0YWNrLmNsb3NlKHRoaXMuZW50cnkpO1xuICB9XG5cbiAgLyoqIE9wZW5zIHRoZSBwYW5lbCwgb3B0aW9uYWxseSBoYW5naW5nIGl0IGZyb20gYGFuY2hvcmAuICovXG4gIHNob3coYW5jaG9yPzogSFRNTEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGFuY2hvcikgdGhpcy50cmlnZ2VyQW5jaG9yLnNldChhbmNob3IpO1xuICAgIGlmICh0aGlzLm9wZW4oKSkgcmV0dXJuO1xuICAgIHRoaXMub3Blbi5zZXQodHJ1ZSk7XG4gICAgdGhpcy5hZnRlck9wZW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIHBhbmVsLiBgcmVzdG9yZWAgb3ZlcnJpZGVzIHdoZXRoZXIgZm9jdXMgZ29lcyBiYWNrIHRvIHRoZVxuICAgKiB0cmlnZ2VyIChkZWZhdWx0OiB5ZXMgd2hlbiBmb2N1cyB3YXMgaW5zaWRlIG9yIHRoZSB1c2VyIHByZXNzZWQgRXNjYXBlKS5cbiAgICovXG4gIGhpZGUocmVhc29uOiBBdGhPdmVybGF5Q2xvc2VSZWFzb24gPSAncHJvZ3JhbW1hdGljJywgcmVzdG9yZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3BlbigpKSByZXR1cm47XG4gICAgdGhpcy5vcGVuLnNldChmYWxzZSk7XG4gICAgdGhpcy5hZnRlckNsb3NlKHJlYXNvbiwgcmVzdG9yZSk7XG4gIH1cblxuICB0b2dnbGUoYW5jaG9yPzogSFRNTEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3BlbigpKSB0aGlzLmhpZGUoKTtcbiAgICBlbHNlIHRoaXMuc2hvdyhhbmNob3IpO1xuICB9XG5cbiAgLyoqIE1vdmVzIGZvY3VzIGludG8gdGhlIHBhbmVsIGFjY29yZGluZyB0byBgYXV0b0ZvY3VzYCAob3IgYG1vZGVgKS4gKi9cbiAgZm9jdXNQYW5lbChtb2RlOiBQb3BvdmVyQXV0b0ZvY3VzID0gdGhpcy5hdXRvRm9jdXMoKSk6IHZvaWQge1xuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5wYW5lbDtcbiAgICBpZiAoIXBhbmVsIHx8IG1vZGUgPT09ICdub25lJykgcmV0dXJuO1xuICAgIGNvbnN0IGFjdGl2ZSA9IHBhbmVsLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoYWN0aXZlICYmIHBhbmVsLmNvbnRhaW5zKGFjdGl2ZSkgJiYgYWN0aXZlICE9PSBwYW5lbCkgcmV0dXJuO1xuICAgIGNvbnN0IHRhcmdldCA9IG1vZGUgPT09ICdmaXJzdCcgPyAodGFiYmFibGVzKHBhbmVsKVswXSA/PyBwYW5lbCkgOiBwYW5lbDtcbiAgICBmb2N1c1NhZmVseSh0YXJnZXQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5wYW5lbDtcbiAgICBpZiAocGFuZWwgJiYgdGhpcy50cmFwRm9jdXMoKSkgdHJhcFRhYihldmVudCwgcGFuZWwpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uRm9jdXNPdXQoZXZlbnQ6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50cmFwRm9jdXMoKSB8fCAhdGhpcy5vcGVuKCkpIHJldHVybjtcbiAgICBjb25zdCBuZXh0ID0gZXZlbnQucmVsYXRlZFRhcmdldDtcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgY29uc3QgYW5jaG9yID0gdGhpcy5hbmNob3JFbGVtZW50KCk7XG4gICAgaWYgKCEobmV4dCBpbnN0YW5jZW9mIE5vZGUpIHx8ICFwYW5lbCkgcmV0dXJuO1xuICAgIGlmIChwYW5lbC5jb250YWlucyhuZXh0KSB8fCBhbmNob3I/LmNvbnRhaW5zKG5leHQpKSByZXR1cm47XG4gICAgdGhpcy5oaWRlKCd0YWInLCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGFmdGVyT3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdGVyZWQgPSB0cnVlO1xuICAgIGNvbnN0IGRvYyA9IHRoaXMuYW5jaG9yRWxlbWVudCgpPy5vd25lckRvY3VtZW50ID8/IGRvY3VtZW50O1xuICAgIGNvbnN0IGFjdGl2ZSA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuYW5jaG9yRWxlbWVudCgpO1xuICAgIHRoaXMucmV0dXJuRm9jdXMgPSBhbmNob3JcbiAgICAgID8gZm9jdXNUYXJnZXQoYW5jaG9yKVxuICAgICAgOiBhY3RpdmUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBhY3RpdmUgIT09IGRvYy5ib2R5XG4gICAgICAgID8gYWN0aXZlXG4gICAgICAgIDogbnVsbDtcbiAgICB0aGlzLnN0YWNrLm9wZW4odGhpcy5lbnRyeSk7XG4gICAgdGhpcy5vcGVuZWQuZW1pdCgpO1xuICAgIC8vIEFmdGVyIHRoZSBwYW5lbCBoYXMgcmVuZGVyZWQgYW5kIGJlZW4gcG9zaXRpb25lZC5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5mb2N1c1RpbWVyKTtcbiAgICB0aGlzLmZvY3VzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZm9jdXNQYW5lbCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJDbG9zZShyZWFzb246IEF0aE92ZXJsYXlDbG9zZVJlYXNvbiwgcmVzdG9yZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mb2N1c1RpbWVyKTtcbiAgICB0aGlzLnN0YWNrLmNsb3NlKHRoaXMuZW50cnkpO1xuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5wYW5lbDtcbiAgICBjb25zdCBkb2MgPSBwYW5lbD8ub3duZXJEb2N1bWVudCA/PyBkb2N1bWVudDtcbiAgICBjb25zdCBmb2N1c0luc2lkZSA9ICEhcGFuZWwgJiYgcGFuZWwuY29udGFpbnMoZG9jLmFjdGl2ZUVsZW1lbnQpO1xuICAgIGNvbnN0IGJhY2sgPSB0aGlzLnJldHVybkZvY3VzO1xuICAgIHRoaXMucmV0dXJuRm9jdXMgPSBudWxsO1xuICAgIGNvbnN0IHdhbnRlZCA9XG4gICAgICByZXN0b3JlID8/XG4gICAgICAodGhpcy5yZXN0b3JlRm9jdXMoKSAmJlxuICAgICAgICAocmVhc29uID09PSAnZXNjYXBlJyB8fCByZWFzb24gPT09ICdzZWxlY3QnIHx8IChyZWFzb24gIT09ICd0YWInICYmIGZvY3VzSW5zaWRlKSkpO1xuICAgIGlmICh3YW50ZWQgJiYgcmVhc29uICE9PSAnb3V0c2lkZScpIHtcbiAgICAgIGZvY3VzU2FmZWx5KGJhY2spO1xuICAgIH0gZWxzZSBpZiAocmVhc29uID09PSAnb3V0c2lkZScgJiYgZm9jdXNJbnNpZGUgJiYgdGhpcy5yZXN0b3JlRm9jdXMoKSkge1xuICAgICAgLy8gVGhlIHBhbmVsIHRha2VzIGZvY3VzIHdpdGggaXQ7IGlmIHRoZSBjbGljayBsYW5kZWQgb24gbm90aGluZ1xuICAgICAgLy8gZm9jdXNhYmxlLCBwdXQgZm9jdXMgYmFjayBvbiB0aGUgdHJpZ2dlciBpbnN0ZWFkIG9mIHRoZSBwYWdlLlxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCA9PT0gZG9jLmJvZHkgfHwgIWRvYy5hY3RpdmVFbGVtZW50KSBmb2N1c1NhZmVseShiYWNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlZC5lbWl0KHJlYXNvbik7XG4gIH1cbn1cbiIsIkBpZiAob3BlbigpKSB7XG4gIDxkaXZcbiAgICAjcGFuZWxcbiAgICBjbGFzcz1cImF0aC1wb3BvdmVyX19wYW5lbFwiXG4gICAgW2NsYXNzXT1cInBhbmVsQ2xhc3NlcygpXCJcbiAgICBbaWRdPVwicGFuZWxJZCgpXCJcbiAgICBbYXR0ci5yb2xlXT1cInBhbmVsUm9sZSgpXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbCgpXCJcbiAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkYnkoKVwiXG4gICAgW2F0dHIuYXJpYS1tb2RhbF09XCJ0cmFwRm9jdXMoKSAmJiBwYW5lbFJvbGUoKSA9PT0gJ2RpYWxvZycgPyAndHJ1ZScgOiBudWxsXCJcbiAgICB0YWJpbmRleD1cIi0xXCJcbiAgICBbYXRoRmxvYXRpbmddPVwiZmxvYXRUYXJnZXQoKVwiXG4gICAgW2FsaWduXT1cImFsaWduKClcIlxuICAgIFtzaWRlXT1cInNpZGUoKVwiXG4gICAgW29mZnNldF09XCJvZmZzZXQoKVwiXG4gICAgW21hdGNoV2lkdGhdPVwibWF0Y2hXaWR0aCgpXCJcbiAgICBbbWF4SGVpZ2h0XT1cIm1heEhlaWdodCgpXCJcbiAgICBbYXJyb3ddPVwiYXJyb3coKSA/IGFycm93RWwgOiBudWxsXCJcbiAgICAoa2V5ZG93bik9XCJvbktleWRvd24oJGV2ZW50KVwiXG4gICAgKGZvY3Vzb3V0KT1cIm9uRm9jdXNPdXQoJGV2ZW50KVwiXG4gID5cbiAgICA8c3BhbiAjYXJyb3dFbCBjbGFzcz1cImF0aC1wb3BvdmVyX19hcnJvd1wiIFtoaWRkZW5dPVwiIWFycm93KClcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgQGlmIChsYXp5Q29udGVudCgpOyBhcyBsYXp5KSB7XG4gICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxhenkudGVtcGxhdGVcIiAvPlxuICAgIH0gQGVsc2Uge1xuICAgICAgPG5nLWNvbnRlbnQgLz5cbiAgICB9XG4gIDwvZGl2PlxufVxuIl19