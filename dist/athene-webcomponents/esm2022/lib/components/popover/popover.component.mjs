import { ChangeDetectionStrategy, Component, Directive, TemplateRef, booleanAttribute, computed, contentChild, inject, input, model, output, signal, viewChild, } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AthFloatingDirective, resolveAnchor, } from '../floating/floating.directive';
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
        /** The element the panel hangs from. A trigger directive sets it on its own. */
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPopoverComponent, isStandalone: true, selector: "ath-popover", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, padding: { classPropertyName: "padding", publicName: "padding", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null }, side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null }, offset: { classPropertyName: "offset", publicName: "offset", isSignal: true, isRequired: false, transformFunction: null }, matchWidth: { classPropertyName: "matchWidth", publicName: "matchWidth", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, arrow: { classPropertyName: "arrow", publicName: "arrow", isSignal: true, isRequired: false, transformFunction: null }, trapFocus: { classPropertyName: "trapFocus", publicName: "trapFocus", isSignal: true, isRequired: false, transformFunction: null }, autoFocus: { classPropertyName: "autoFocus", publicName: "autoFocus", isSignal: true, isRequired: false, transformFunction: null }, restoreFocus: { classPropertyName: "restoreFocus", publicName: "restoreFocus", isSignal: true, isRequired: false, transformFunction: null }, closeOnEscape: { classPropertyName: "closeOnEscape", publicName: "closeOnEscape", isSignal: true, isRequired: false, transformFunction: null }, closeOnOutsideClick: { classPropertyName: "closeOnOutsideClick", publicName: "closeOnOutsideClick", isSignal: true, isRequired: false, transformFunction: null }, panelRole: { classPropertyName: "panelRole", publicName: "panelRole", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabelledby: { classPropertyName: "ariaLabelledby", publicName: "ariaLabelledby", isSignal: true, isRequired: false, transformFunction: null }, panelClass: { classPropertyName: "panelClass", publicName: "panelClass", isSignal: true, isRequired: false, transformFunction: null }, panelId: { classPropertyName: "panelId", publicName: "panelId", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", opened: "opened", closed: "closed" }, queries: [{ propertyName: "lazyContent", first: true, predicate: AthPopoverContentDirective, isSignal: true }], viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["panel"], descendants: true, isSignal: true }], exportAs: ["athPopover"], usesOnChanges: true, ngImport: i0, template: "@if (open()) {\n  <div\n    #panel\n    class=\"ath-popover__panel\"\n    [class]=\"panelClasses()\"\n    [id]=\"panelId()\"\n    [attr.role]=\"panelRole()\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    [attr.aria-modal]=\"trapFocus() && panelRole() === 'dialog' ? 'true' : null\"\n    tabindex=\"-1\"\n    [athFloating]=\"anchorElement()\"\n    [align]=\"align()\"\n    [side]=\"side()\"\n    [offset]=\"offset()\"\n    [matchWidth]=\"matchWidth()\"\n    [maxHeight]=\"maxHeight()\"\n    [arrow]=\"arrow() ? arrowEl : null\"\n    (keydown)=\"onKeydown($event)\"\n    (focusout)=\"onFocusOut($event)\"\n  >\n    <span #arrowEl class=\"ath-popover__arrow\" [hidden]=\"!arrow()\" aria-hidden=\"true\"></span>\n    @if (lazyContent(); as lazy) {\n      <ng-container [ngTemplateOutlet]=\"lazy.template\" />\n    } @else {\n      <ng-content />\n    }\n  </div>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:contents}.ath-popover__panel{box-sizing:border-box;max-width:calc(100vw - var(--space-4));font-family:var(--font-sans);font-size:var(--text-base);color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);animation:ath-popover-in var(--t-base)}.ath-popover__panel:focus{outline:none}.ath-popover__panel:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-popover__panel--sm{width:220px}.ath-popover__panel--md{width:280px}.ath-popover__panel--lg{width:360px}.ath-popover__panel--auto{width:max-content;min-width:180px}.ath-popover__panel--pad-md{padding:var(--space-3)}.ath-popover__panel--pad-sm{padding:var(--space-1)}.ath-popover__panel--pad-none{padding:0}.ath-popover__panel[data-placement=top]{animation-name:ath-popover-in-up}.ath-popover__arrow{position:absolute;top:-6px;width:10px;height:10px;background:var(--surface);border-top:1px solid var(--border);border-left:1px solid var(--border);transform:translate(-50%) rotate(45deg);pointer-events:none}[data-placement=top]>.ath-popover__arrow{top:auto;bottom:-6px;transform:translate(-50%) rotate(225deg)}@keyframes ath-popover-in{0%{opacity:0;transform:translateY(-4px)}}@keyframes ath-popover-in-up{0%{opacity:0;transform:translateY(4px)}}\n"], dependencies: [{ kind: "directive", type: AthFloatingDirective, selector: "[athFloating]", inputs: ["athFloating", "align", "side", "offset", "matchWidth", "maxHeight", "topLayer", "arrow"], exportAs: ["athFloating"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-popover', standalone: true, imports: [AthFloatingDirective, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'athPopover', template: "@if (open()) {\n  <div\n    #panel\n    class=\"ath-popover__panel\"\n    [class]=\"panelClasses()\"\n    [id]=\"panelId()\"\n    [attr.role]=\"panelRole()\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    [attr.aria-modal]=\"trapFocus() && panelRole() === 'dialog' ? 'true' : null\"\n    tabindex=\"-1\"\n    [athFloating]=\"anchorElement()\"\n    [align]=\"align()\"\n    [side]=\"side()\"\n    [offset]=\"offset()\"\n    [matchWidth]=\"matchWidth()\"\n    [maxHeight]=\"maxHeight()\"\n    [arrow]=\"arrow() ? arrowEl : null\"\n    (keydown)=\"onKeydown($event)\"\n    (focusout)=\"onFocusOut($event)\"\n  >\n    <span #arrowEl class=\"ath-popover__arrow\" [hidden]=\"!arrow()\" aria-hidden=\"true\"></span>\n    @if (lazyContent(); as lazy) {\n      <ng-container [ngTemplateOutlet]=\"lazy.template\" />\n    } @else {\n      <ng-content />\n    }\n  </div>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:contents}.ath-popover__panel{box-sizing:border-box;max-width:calc(100vw - var(--space-4));font-family:var(--font-sans);font-size:var(--text-base);color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);animation:ath-popover-in var(--t-base)}.ath-popover__panel:focus{outline:none}.ath-popover__panel:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-popover__panel--sm{width:220px}.ath-popover__panel--md{width:280px}.ath-popover__panel--lg{width:360px}.ath-popover__panel--auto{width:max-content;min-width:180px}.ath-popover__panel--pad-md{padding:var(--space-3)}.ath-popover__panel--pad-sm{padding:var(--space-1)}.ath-popover__panel--pad-none{padding:0}.ath-popover__panel[data-placement=top]{animation-name:ath-popover-in-up}.ath-popover__arrow{position:absolute;top:-6px;width:10px;height:10px;background:var(--surface);border-top:1px solid var(--border);border-left:1px solid var(--border);transform:translate(-50%) rotate(45deg);pointer-events:none}[data-placement=top]>.ath-popover__arrow{top:auto;bottom:-6px;transform:translate(-50%) rotate(225deg)}@keyframes ath-popover-in{0%{opacity:0;transform:translateY(-4px)}}@keyframes ath-popover-in-up{0%{opacity:0;transform:translateY(4px)}}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUtULFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLGFBQWEsR0FFZCxNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLE9BQU8sRUFDTCxlQUFlLEdBR2hCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQWFqRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFFdEI7Ozs7Ozs7R0FPRztBQUtILE1BQU0sT0FBTywwQkFBMEI7SUFKdkM7UUFLVyxhQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3pDOytHQUZZLDBCQUEwQjttR0FBMUIsMEJBQTBCOzs0RkFBMUIsMEJBQTBCO2tCQUp0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLFVBQVUsRUFBRSxJ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QUNsQixDQUFDLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksTUFBTSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQzthQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7WUFDdEUsZ0VBQWdFO1lBQ2hFLGdFQUFnRTtZQUNoRSxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksR0FBRyxDQUFDLGFBQWEsS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWE7b0JBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7K0dBNUtVLG1CQUFtQjttR0FBbkIsbUJBQW1CLHN2RkFxQ2dCLDBCQUEwQiwrTUMxSDFFLGc1QkE2QkEsczZDRGtEWSxvQkFBb0IseUxBQUUsZ0JBQWdCOzs0RkFNckMsbUJBQW1CO2tCQVQvQixTQUFTOytCQUNFLGFBQWEsY0FDWCxJQUFJLFdBQ1AsQ0FBQyxvQkFBb0IsRUFBRSxnQkFBZ0IsQ0FBQyxtQkFDaEMsdUJBQXVCLENBQUMsTUFBTSxZQUdyQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG4gIGNvbXB1dGVkLFxuICBjb250ZW50Q2hpbGQsXG4gIGluamVjdCxcbiAgaW5wdXQsXG4gIG1vZGVsLFxuICBvdXRwdXQsXG4gIHNpZ25hbCxcbiAgdmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nVGVtcGxhdGVPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXRoRmxvYXRpbmdEaXJlY3RpdmUsXG4gIHJlc29sdmVBbmNob3IsXG4gIHR5cGUgRmxvYXRpbmdBbmNob3IsXG59IGZyb20gJy4uL2Zsb2F0aW5nL2Zsb2F0aW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgdHlwZSB7IEZsb2F0aW5nQWxpZ24sIEZsb2F0aW5nU2lkZSB9IGZyb20gJy4uL2Zsb2F0aW5nL2Zsb2F0aW5nJztcbmltcG9ydCB7XG4gIEF0aE92ZXJsYXlTdGFjayxcbiAgdHlwZSBBdGhPdmVybGF5Q2xvc2VSZWFzb24sXG4gIHR5cGUgQXRoT3ZlcmxheUVudHJ5LFxufSBmcm9tICcuLi9mbG9hdGluZy9vdmVybGF5LXN0YWNrJztcbmltcG9ydCB7IGZvY3VzU2FmZWx5LCBmb2N1c1RhcmdldCwgdGFiYmFibGVzLCB0cmFwVGFiIH0gZnJvbSAnLi4vZmxvYXRpbmcvZm9jdXMnO1xuXG4vKiogUGFuZWwgd2lkdGg6IGBzbWAgMjIwcHgsIGBtZGAgMjgwcHggKGRlZmF1bHQpLCBgbGdgIDM2MHB4LCBgYXV0b2AgZml0cyB0aGUgY29udGVudC4gKi9cbmV4cG9ydCB0eXBlIFBvcG92ZXJTaXplID0gJ3NtJyB8ICdtZCcgfCAnbGcnIHwgJ2F1dG8nO1xuLyoqIElubmVyIHBhZGRpbmcgb2YgdGhlIHBhbmVsLiAqL1xuZXhwb3J0IHR5cGUgUG9wb3ZlclBhZGRpbmcgPSAnbWQnIHwgJ3NtJyB8ICdub25lJztcbi8qKiBXaGVyZSBmb2N1cyBnb2VzIHdoZW4gdGhlIHBhbmVsIG9wZW5zLiAqL1xuZXhwb3J0IHR5cGUgUG9wb3ZlckF1dG9Gb2N1cyA9ICdmaXJzdCcgfCAncGFuZWwnIHwgJ25vbmUnO1xuLyoqIEFSSUEgcm9sZSBvZiB0aGUgcGFuZWw7IGBudWxsYCBmb3IgYSBiYXJlIGNvbnRhaW5lciAodGhlIGNvbnRlbnQgYnJpbmdzIGl0cyBvd24gcm9sZSkuICovXG5leHBvcnQgdHlwZSBQb3BvdmVyUm9sZSA9ICdkaWFsb2cnIHwgJ21lbnUnIHwgJ2xpc3Rib3gnIHwgbnVsbDtcblxuZXhwb3J0IHR5cGUgeyBBdGhPdmVybGF5Q2xvc2VSZWFzb24gYXMgUG9wb3ZlckNsb3NlUmVhc29uIH0gZnJvbSAnLi4vZmxvYXRpbmcvb3ZlcmxheS1zdGFjayc7XG5cbmxldCBuZXh0UG9wb3ZlcklkID0gMDtcblxuLyoqXG4gKiBMYXp5IHBhbmVsIGNvbnRlbnQ6IHJlbmRlcmVkIG9ubHkgd2hpbGUgdGhlIHBvcG92ZXIgaXMgb3Blbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1wb3BvdmVyPlxuICogICA8bmctdGVtcGxhdGUgYXRoUG9wb3ZlckNvbnRlbnQ+4oCmPC9uZy10ZW1wbGF0ZT5cbiAqIDwvYXRoLXBvcG92ZXI+XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ25nLXRlbXBsYXRlW2F0aFBvcG92ZXJDb250ZW50XScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFBvcG92ZXJDb250ZW50RGlyZWN0aXZlIHtcbiAgcmVhZG9ubHkgdGVtcGxhdGUgPSBpbmplY3QoVGVtcGxhdGVSZWYpO1xufVxuXG4vKipcbiAqIEF0aGVuZSBQb3BvdmVyXG4gKlxuICogQW4gYW5jaG9yZWQgcGFuZWwgaW4gdGhlIHRvcCBsYXllcjogbm8gY29udGFpbmVyJ3Mgb3ZlcmZsb3cgb3Igei1pbmRleFxuICogY2xpcHMgaXQuIE9wZW5zIGZyb20gYGF0aFBvcG92ZXJUcmlnZ2VyYCwgYHNob3coKWAgb3IgYFsob3BlbildYDsgY2xvc2VzIG9uXG4gKiBFc2NhcGUgKHRvcG1vc3Qgb3ZlcmxheSBvbmx5KSwgb3V0c2lkZSBjbGljayBhbmQgVGFiLW91dCwgYW5kIHJldHVybnMgZm9jdXNcbiAqIHRvIHRoZSB0cmlnZ2VyLiBgcm9sZT1cImRpYWxvZ1wiYCBieSBkZWZhdWx0OyBgdHJhcEZvY3VzYCBrZWVwcyBUYWIgaW5zaWRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWJ1dHRvbiBbYXRoUG9wb3ZlclRyaWdnZXJdPVwiaW5mb1wiPkRldGFpbHM8L2F0aC1idXR0b24+XG4gKiA8YXRoLXBvcG92ZXIgI2luZm8gYXJpYUxhYmVsPVwiRGV0YWlsc1wiIGFycm93PlxuICogICA8cD5Db250ZW50PC9wPlxuICogPC9hdGgtcG9wb3Zlcj5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLXBvcG92ZXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQXRoRmxvYXRpbmdEaXJlY3RpdmUsIE5nVGVtcGxhdGVPdXRsZXRdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vcG9wb3Zlci5jb21wb25lbnQuc2NzcycsXG4gIGV4cG9ydEFzOiAnYXRoUG9wb3ZlcicsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFBvcG92ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhY2sgPSBpbmplY3QoQXRoT3ZlcmxheVN0YWNrKTtcblxuICAvKiogV2hldGhlciB0aGUgcGFuZWwgaXMgc2hvd24uIFR3by13YXk6IGBbKG9wZW4pXWAuICovXG4gIHJlYWRvbmx5IG9wZW4gPSBtb2RlbChmYWxzZSk7XG4gIC8qKiBUaGUgZWxlbWVudCB0aGUgcGFuZWwgaGFuZ3MgZnJvbS4gQSB0cmlnZ2VyIGRpcmVjdGl2ZSBzZXRzIGl0IG9uIGl0cyBvd24uICovXG4gIHJlYWRvbmx5IGFuY2hvciA9IGlucHV0PEZsb2F0aW5nQW5jaG9yPihudWxsKTtcbiAgcmVhZG9ubHkgc2l6ZSA9IGlucHV0PFBvcG92ZXJTaXplPignbWQnKTtcbiAgcmVhZG9ubHkgcGFkZGluZyA9IGlucHV0PFBvcG92ZXJQYWRkaW5nPignbWQnKTtcbiAgcmVhZG9ubHkgYWxpZ24gPSBpbnB1dDxGbG9hdGluZ0FsaWduPignc3RhcnQnKTtcbiAgcmVhZG9ubHkgc2lkZSA9IGlucHV0PEZsb2F0aW5nU2lkZT4oJ2JvdHRvbScpO1xuICAvKiogR2FwIHRvIHRoZSBhbmNob3IgaW4gcHguICovXG4gIHJlYWRvbmx5IG9mZnNldCA9IGlucHV0KDYpO1xuICByZWFkb25seSBtYXRjaFdpZHRoID0gaW5wdXQoZmFsc2UsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogVXBwZXIgYm91bmQgZm9yIHRoZSBoZWlnaHQgaW4gcHggKHRoZSB2aWV3cG9ydCBjYXBzIGl0IGFueXdheSkuICovXG4gIHJlYWRvbmx5IG1heEhlaWdodCA9IGlucHV0PG51bWJlciB8IG51bGw+KG51bGwpO1xuICAvKiogU2hvdyBhbiBhcnJvdyBwb2ludGluZyBhdCB0aGUgYW5jaG9yLiAqL1xuICByZWFkb25seSBhcnJvdyA9IGlucHV0KGZhbHNlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgLyoqIEtlZXAgVGFiIGluc2lkZSB0aGUgcGFuZWwgKG1vZGFsLWxpa2UgY29udGVudCk7IG90aGVyd2lzZSBUYWIgb3V0IGNsb3NlcyBpdC4gKi9cbiAgcmVhZG9ubHkgdHJhcEZvY3VzID0gaW5wdXQoZmFsc2UsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICByZWFkb25seSBhdXRvRm9jdXMgPSBpbnB1dDxQb3BvdmVyQXV0b0ZvY3VzPignZmlyc3QnKTtcbiAgLyoqIFJldHVybiBmb2N1cyB0byB0aGUgdHJpZ2dlciBvbiBFc2NhcGUgLyBzZWxlY3Rpb24gLyBwcm9ncmFtbWF0aWMgY2xvc2UuICovXG4gIHJlYWRvbmx5IHJlc3RvcmVGb2N1cyA9IGlucHV0KHRydWUsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICByZWFkb25seSBjbG9zZU9uRXNjYXBlID0gaW5wdXQodHJ1ZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIHJlYWRvbmx5IGNsb3NlT25PdXRzaWRlQ2xpY2sgPSBpbnB1dCh0cnVlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgcmVhZG9ubHkgcGFuZWxSb2xlID0gaW5wdXQ8UG9wb3ZlclJvbGU+KCdkaWFsb2cnKTtcbiAgcmVhZG9ubHkgYXJpYUxhYmVsID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGFyaWFMYWJlbGxlZGJ5ID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIC8qKiBFeHRyYSBjbGFzc2VzIG9uIHRoZSBwYW5lbCAoaXQgbGl2ZXMgaW4gdGhpcyBjb21wb25lbnQncyB2aWV3KS4gKi9cbiAgcmVhZG9ubHkgcGFuZWxDbGFzcyA9IGlucHV0KCcnKTtcblxuICByZWFkb25seSBvcGVuZWQgPSBvdXRwdXQ8dm9pZD4oKTtcbiAgcmVhZG9ubHkgY2xvc2VkID0gb3V0cHV0PEF0aE92ZXJsYXlDbG9zZVJlYXNvbj4oKTtcblxuICAvKiogSWQgb2YgdGhlIHBhbmVsLCBmb3IgYGFyaWEtY29udHJvbHNgLiAqL1xuICByZWFkb25seSBwYW5lbElkID0gaW5wdXQoYGF0aC1wb3BvdmVyLSR7KytuZXh0UG9wb3ZlcklkfWApO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBsYXp5Q29udGVudCA9IGNvbnRlbnRDaGlsZChBdGhQb3BvdmVyQ29udGVudERpcmVjdGl2ZSwge1xuICAgIGRlc2NlbmRhbnRzOiBmYWxzZSxcbiAgfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGFuZWxSZWYgPSB2aWV3Q2hpbGQ8RWxlbWVudFJlZjxIVE1MRWxlbWVudD4+KCdwYW5lbCcpO1xuICBwcml2YXRlIHJlYWRvbmx5IHRyaWdnZXJBbmNob3IgPSBzaWduYWw8SFRNTEVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICAvKiogVGhlIGVsZW1lbnQgdGhlIHBhbmVsIGN1cnJlbnRseSBoYW5ncyBmcm9tLiAqL1xuICByZWFkb25seSBhbmNob3JFbGVtZW50ID0gY29tcHV0ZWQoKCkgPT4gcmVzb2x2ZUFuY2hvcih0aGlzLmFuY2hvcigpKSA/PyB0aGlzLnRyaWdnZXJBbmNob3IoKSk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHBhbmVsQ2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgW1xuICAgICAgYGF0aC1wb3BvdmVyX19wYW5lbC0tJHt0aGlzLnNpemUoKX1gLFxuICAgICAgYGF0aC1wb3BvdmVyX19wYW5lbC0tcGFkLSR7dGhpcy5wYWRkaW5nKCl9YCxcbiAgICAgIHRoaXMucGFuZWxDbGFzcygpLFxuICAgIF1cbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5qb2luKCcgJylcbiAgKTtcblxuICBwcml2YXRlIHJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSByZXR1cm5Gb2N1czogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBmb2N1c1RpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIHJlYWRvbmx5IGVudHJ5OiBBdGhPdmVybGF5RW50cnkgPSB7XG4gICAgcGFuZWw6ICgpID0+IHRoaXMucGFuZWwsXG4gICAgYW5jaG9yOiAoKSA9PiB0aGlzLmFuY2hvckVsZW1lbnQoKSxcbiAgICBjbG9zZU9uRXNjYXBlOiAoKSA9PiB0aGlzLmNsb3NlT25Fc2NhcGUoKSxcbiAgICBjbG9zZU9uT3V0c2lkZUNsaWNrOiAoKSA9PiB0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2soKSxcbiAgICBkaXNtaXNzOiAocmVhc29uKSA9PiB0aGlzLmhpZGUocmVhc29uKSxcbiAgfTtcblxuICAvKiogVGhlIHBhbmVsIGVsZW1lbnQgd2hpbGUgb3Blbi4gKi9cbiAgZ2V0IHBhbmVsKCk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMucGFuZWxSZWYoKT8ubmF0aXZlRWxlbWVudCA/PyBudWxsO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghY2hhbmdlc1snb3BlbiddKSByZXR1cm47XG4gICAgaWYgKHRoaXMub3BlbigpICYmICF0aGlzLnJlZ2lzdGVyZWQpIHRoaXMuYWZ0ZXJPcGVuKCk7XG4gICAgZWxzZSBpZiAoIXRoaXMub3BlbigpICYmIHRoaXMucmVnaXN0ZXJlZCkgdGhpcy5hZnRlckNsb3NlKCdwcm9ncmFtbWF0aWMnKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZvY3VzVGltZXIpO1xuICAgIGlmICh0aGlzLnJlZ2lzdGVyZWQpIHRoaXMuc3RhY2suY2xvc2UodGhpcy5lbnRyeSk7XG4gIH1cblxuICAvKiogT3BlbnMgdGhlIHBhbmVsLCBvcHRpb25hbGx5IGhhbmdpbmcgaXQgZnJvbSBgYW5jaG9yYC4gKi9cbiAgc2hvdyhhbmNob3I/OiBIVE1MRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAoYW5jaG9yKSB0aGlzLnRyaWdnZXJBbmNob3Iuc2V0KGFuY2hvcik7XG4gICAgaWYgKHRoaXMub3BlbigpKSByZXR1cm47XG4gICAgdGhpcy5vcGVuLnNldCh0cnVlKTtcbiAgICB0aGlzLmFmdGVyT3BlbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgcGFuZWwuIGByZXN0b3JlYCBvdmVycmlkZXMgd2hldGhlciBmb2N1cyBnb2VzIGJhY2sgdG8gdGhlXG4gICAqIHRyaWdnZXIgKGRlZmF1bHQ6IHllcyB3aGVuIGZvY3VzIHdhcyBpbnNpZGUgb3IgdGhlIHVzZXIgcHJlc3NlZCBFc2NhcGUpLlxuICAgKi9cbiAgaGlkZShyZWFzb246IEF0aE92ZXJsYXlDbG9zZVJlYXNvbiA9ICdwcm9ncmFtbWF0aWMnLCByZXN0b3JlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5vcGVuKCkpIHJldHVybjtcbiAgICB0aGlzLm9wZW4uc2V0KGZhbHNlKTtcbiAgICB0aGlzLmFmdGVyQ2xvc2UocmVhc29uLCByZXN0b3JlKTtcbiAgfVxuXG4gIHRvZ2dsZShhbmNob3I/OiBIVE1MRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuKCkpIHRoaXMuaGlkZSgpO1xuICAgIGVsc2UgdGhpcy5zaG93KGFuY2hvcik7XG4gIH1cblxuICAvKiogTW92ZXMgZm9jdXMgaW50byB0aGUgcGFuZWwgYWNjb3JkaW5nIHRvIGBhdXRvRm9jdXNgIChvciBgbW9kZWApLiAqL1xuICBmb2N1c1BhbmVsKG1vZGU6IFBvcG92ZXJBdXRvRm9jdXMgPSB0aGlzLmF1dG9Gb2N1cygpKTogdm9pZCB7XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmICghcGFuZWwgfHwgbW9kZSA9PT0gJ25vbmUnKSByZXR1cm47XG4gICAgY29uc3QgYWN0aXZlID0gcGFuZWwub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIGlmIChhY3RpdmUgJiYgcGFuZWwuY29udGFpbnMoYWN0aXZlKSAmJiBhY3RpdmUgIT09IHBhbmVsKSByZXR1cm47XG4gICAgY29uc3QgdGFyZ2V0ID0gbW9kZSA9PT0gJ2ZpcnN0JyA/ICh0YWJiYWJsZXMocGFuZWwpWzBdID8/IHBhbmVsKSA6IHBhbmVsO1xuICAgIGZvY3VzU2FmZWx5KHRhcmdldCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGlmIChwYW5lbCAmJiB0aGlzLnRyYXBGb2N1cygpKSB0cmFwVGFiKGV2ZW50LCBwYW5lbCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25Gb2N1c091dChldmVudDogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRyYXBGb2N1cygpIHx8ICF0aGlzLm9wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IG5leHQgPSBldmVudC5yZWxhdGVkVGFyZ2V0O1xuICAgIGNvbnN0IHBhbmVsID0gdGhpcy5wYW5lbDtcbiAgICBjb25zdCBhbmNob3IgPSB0aGlzLmFuY2hvckVsZW1lbnQoKTtcbiAgICBpZiAoIShuZXh0IGluc3RhbmNlb2YgTm9kZSkgfHwgIXBhbmVsKSByZXR1cm47XG4gICAgaWYgKHBhbmVsLmNvbnRhaW5zKG5leHQpIHx8IGFuY2hvcj8uY29udGFpbnMobmV4dCkpIHJldHVybjtcbiAgICB0aGlzLmhpZGUoJ3RhYicsIGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJPcGVuKCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJlZCA9IHRydWU7XG4gICAgY29uc3QgZG9jID0gdGhpcy5hbmNob3JFbGVtZW50KCk/Lm93bmVyRG9jdW1lbnQgPz8gZG9jdW1lbnQ7XG4gICAgY29uc3QgYWN0aXZlID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgYW5jaG9yID0gdGhpcy5hbmNob3JFbGVtZW50KCk7XG4gICAgdGhpcy5yZXR1cm5Gb2N1cyA9IGFuY2hvclxuICAgICAgPyBmb2N1c1RhcmdldChhbmNob3IpXG4gICAgICA6IGFjdGl2ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGFjdGl2ZSAhPT0gZG9jLmJvZHlcbiAgICAgICAgPyBhY3RpdmVcbiAgICAgICAgOiBudWxsO1xuICAgIHRoaXMuc3RhY2sub3Blbih0aGlzLmVudHJ5KTtcbiAgICB0aGlzLm9wZW5lZC5lbWl0KCk7XG4gICAgLy8gQWZ0ZXIgdGhlIHBhbmVsIGhhcyByZW5kZXJlZCBhbmQgYmVlbiBwb3NpdGlvbmVkLlxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZvY3VzVGltZXIpO1xuICAgIHRoaXMuZm9jdXNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5mb2N1c1BhbmVsKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlckNsb3NlKHJlYXNvbjogQXRoT3ZlcmxheUNsb3NlUmVhc29uLCByZXN0b3JlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJlZCA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZvY3VzVGltZXIpO1xuICAgIHRoaXMuc3RhY2suY2xvc2UodGhpcy5lbnRyeSk7XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGNvbnN0IGRvYyA9IHBhbmVsPy5vd25lckRvY3VtZW50ID8/IGRvY3VtZW50O1xuICAgIGNvbnN0IGZvY3VzSW5zaWRlID0gISFwYW5lbCAmJiBwYW5lbC5jb250YWlucyhkb2MuYWN0aXZlRWxlbWVudCk7XG4gICAgY29uc3QgYmFjayA9IHRoaXMucmV0dXJuRm9jdXM7XG4gICAgdGhpcy5yZXR1cm5Gb2N1cyA9IG51bGw7XG4gICAgY29uc3Qgd2FudGVkID1cbiAgICAgIHJlc3RvcmUgPz9cbiAgICAgICh0aGlzLnJlc3RvcmVGb2N1cygpICYmXG4gICAgICAgIChyZWFzb24gPT09ICdlc2NhcGUnIHx8IHJlYXNvbiA9PT0gJ3NlbGVjdCcgfHwgKHJlYXNvbiAhPT0gJ3RhYicgJiYgZm9jdXNJbnNpZGUpKSk7XG4gICAgaWYgKHdhbnRlZCAmJiByZWFzb24gIT09ICdvdXRzaWRlJykge1xuICAgICAgZm9jdXNTYWZlbHkoYmFjayk7XG4gICAgfSBlbHNlIGlmIChyZWFzb24gPT09ICdvdXRzaWRlJyAmJiBmb2N1c0luc2lkZSAmJiB0aGlzLnJlc3RvcmVGb2N1cygpKSB7XG4gICAgICAvLyBUaGUgcGFuZWwgdGFrZXMgZm9jdXMgd2l0aCBpdDsgaWYgdGhlIGNsaWNrIGxhbmRlZCBvbiBub3RoaW5nXG4gICAgICAvLyBmb2N1c2FibGUsIHB1dCBmb2N1cyBiYWNrIG9uIHRoZSB0cmlnZ2VyIGluc3RlYWQgb2YgdGhlIHBhZ2UuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ID09PSBkb2MuYm9keSB8fCAhZG9jLmFjdGl2ZUVsZW1lbnQpIGZvY3VzU2FmZWx5KGJhY2spO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VkLmVtaXQocmVhc29uKTtcbiAgfVxufVxuIiwiQGlmIChvcGVuKCkpIHtcbiAgPGRpdlxuICAgICNwYW5lbFxuICAgIGNsYXNzPVwiYXRoLXBvcG92ZXJfX3BhbmVsXCJcbiAgICBbY2xhc3NdPVwicGFuZWxDbGFzc2VzKClcIlxuICAgIFtpZF09XCJwYW5lbElkKClcIlxuICAgIFthdHRyLnJvbGVdPVwicGFuZWxSb2xlKClcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsKClcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRieSgpXCJcbiAgICBbYXR0ci5hcmlhLW1vZGFsXT1cInRyYXBGb2N1cygpICYmIHBhbmVsUm9sZSgpID09PSAnZGlhbG9nJyA/ICd0cnVlJyA6IG51bGxcIlxuICAgIHRhYmluZGV4PVwiLTFcIlxuICAgIFthdGhGbG9hdGluZ109XCJhbmNob3JFbGVtZW50KClcIlxuICAgIFthbGlnbl09XCJhbGlnbigpXCJcbiAgICBbc2lkZV09XCJzaWRlKClcIlxuICAgIFtvZmZzZXRdPVwib2Zmc2V0KClcIlxuICAgIFttYXRjaFdpZHRoXT1cIm1hdGNoV2lkdGgoKVwiXG4gICAgW21heEhlaWdodF09XCJtYXhIZWlnaHQoKVwiXG4gICAgW2Fycm93XT1cImFycm93KCkgPyBhcnJvd0VsIDogbnVsbFwiXG4gICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIlxuICAgIChmb2N1c291dCk9XCJvbkZvY3VzT3V0KCRldmVudClcIlxuICA+XG4gICAgPHNwYW4gI2Fycm93RWwgY2xhc3M9XCJhdGgtcG9wb3Zlcl9fYXJyb3dcIiBbaGlkZGVuXT1cIiFhcnJvdygpXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgIEBpZiAobGF6eUNvbnRlbnQoKTsgYXMgbGF6eSkge1xuICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJsYXp5LnRlbXBsYXRlXCIgLz5cbiAgICB9IEBlbHNlIHtcbiAgICAgIDxuZy1jb250ZW50IC8+XG4gICAgfVxuICA8L2Rpdj5cbn1cbiJdfQ==