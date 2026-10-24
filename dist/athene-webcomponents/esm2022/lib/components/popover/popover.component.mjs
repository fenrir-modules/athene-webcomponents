import { ChangeDetectionStrategy, Component, Directive, TemplateRef, booleanAttribute, computed, contentChild, effect, inject, input, model, output, signal, untracked, viewChild, } from '@angular/core';
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
    /** The panel element while open. */
    get panel() {
        return this.panelRef()?.nativeElement ?? null;
    }
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
        // Annotated: an inferred union of two object types prints in type-id
        // order, which differs between cached and fresh builds (check:dist).
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
        /** Work waiting for the open panel to render (see `whenPanelReady`). */
        this.panelJobs = [];
        this.entry = {
            panel: () => this.panel,
            anchor: () => this.anchorElement(),
            closeOnEscape: () => this.closeOnEscape(),
            closeOnOutsideClick: () => this.closeOnOutsideClick(),
            dismiss: (reason) => this.hide(reason),
        };
        // DOM sync, no state: work on the panel (focus into it, a menu's first
        // item, a picker's active option) follows the panel element, as in
        // ath-dialog and ath-sheet, so it runs whichever change detection
        // rendered the panel. `afterNextRender` ran on the next app render even
        // when that did not include this view (a fixture without autoDetect, a
        // view checked by hand), before the panel existed (VERIFY 4.1).
        effect(() => {
            if (this.panelRef())
                untracked(() => this.runPanelJobs());
        });
    }
    /**
     * Runs `fn` once the open panel is rendered and placed (`athFloating`
     * places it when it is created); right away when it already is. Dropped
     * when the popover closes first. For `ath-menu` and `ath-option-picker`.
     */
    whenPanelReady(fn) {
        if (!this.open())
            return;
        this.panelJobs.push(fn);
        if (this.panel)
            this.runPanelJobs();
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
        this.panelJobs = [];
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
        this.whenPanelReady(() => this.focusPanel());
    }
    runPanelJobs() {
        if (!this.open() || !this.panel)
            return;
        const jobs = this.panelJobs;
        this.panelJobs = [];
        for (const job of jobs)
            job();
    }
    afterClose(reason, restore) {
        this.registered = false;
        this.panelJobs = [];
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
            // focusable, put focus back on the trigger instead of the page. A task
            // later: the browser moves focus after this pointerdown (not change
            // detection).
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
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsU0FBUyxFQUtULFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLFlBQVksRUFDWixNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLHFCQUFxQixHQUV0QixNQUFNLGdDQUFnQyxDQUFDO0FBRXhDLE9BQU8sRUFDTCxlQUFlLEdBR2hCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQWFqRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFFdEI7Ozs7Ozs7R0FPRztBQUtILE1BQU0sT0FBTywwQkFBMEI7SUFKdkM7UUFLVyxhQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3pDOytHQUZZLDBCQUEwQjttR0FBMUIsMEJBQTBCOzs0RkFBMUIsMEJBQTBCO2tCQUp0QyxTQUFTO21CQUFDO29CQUNULFFB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QUksTUFBTSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNuQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQzthQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7WUFDdEUsZ0VBQWdFO1lBQ2hFLHVFQUF1RTtZQUN2RSxvRUFBb0U7WUFDcEUsY0FBYztZQUNkLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxHQUFHLENBQUMsYUFBYSxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYTtvQkFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQzsrR0F0TlUsbUJBQW1CO21HQUFuQixtQkFBbUIsc3ZGQXlDZ0IsMEJBQTBCLCtNQ2xJMUUsODRCQTZCQSxpaEREc0RZLG9CQUFvQix5TEFBRSxnQkFBZ0I7OzRGQU1yQyxtQkFBbUI7a0JBVC9CLFNBQVM7K0JBQ0UsYUFBYSxjQUNYLElBQUksV0FDUCxDQUFDLG9CQUFvQixFQUFFLGdCQUFnQixDQUFDLG1CQUNoQyx1QkFBdUIsQ0FBQyxNQUFNLFlBR3JDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgY29tcHV0ZWQsXG4gIGNvbnRlbnRDaGlsZCxcbiAgZWZmZWN0LFxuICBpbmplY3QsXG4gIGlucHV0LFxuICBtb2RlbCxcbiAgb3V0cHV0LFxuICBzaWduYWwsXG4gIHVudHJhY2tlZCxcbiAgdmlld0NoaWxkLFxuICB0eXBlIFNpZ25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1RlbXBsYXRlT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEF0aEZsb2F0aW5nRGlyZWN0aXZlLFxuICByZXNvbHZlQW5jaG9yLFxuICByZXNvbHZlRmxvYXRpbmdUYXJnZXQsXG4gIHR5cGUgRmxvYXRpbmdBbmNob3IsXG59IGZyb20gJy4uL2Zsb2F0aW5nL2Zsb2F0aW5nLmRpcmVjdGl2ZSc7XG5pbXBvcnQgdHlwZSB7IEZsb2F0aW5nQWxpZ24sIEZsb2F0aW5nU2lkZSwgRmxvYXRpbmdWaXJ0dWFsQW5jaG9yIH0gZnJvbSAnLi4vZmxvYXRpbmcvZmxvYXRpbmcnO1xuaW1wb3J0IHtcbiAgQXRoT3ZlcmxheVN0YWNrLFxuICB0eXBlIEF0aE92ZXJsYXlDbG9zZVJlYXNvbixcbiAgdHlwZSBBdGhPdmVybGF5RW50cnksXG59IGZyb20gJy4uL2Zsb2F0aW5nL292ZXJsYXktc3RhY2snO1xuaW1wb3J0IHsgZm9jdXNTYWZlbHksIGZvY3VzVGFyZ2V0LCB0YWJiYWJsZXMsIHRyYXBUYWIgfSBmcm9tICcuLi9mbG9hdGluZy9mb2N1cyc7XG5cbi8qKiBQYW5lbCB3aWR0aDogYHNtYCAyMjBweCwgYG1kYCAyODBweCAoZGVmYXVsdCksIGBsZ2AgMzYwcHgsIGBhdXRvYCBmaXRzIHRoZSBjb250ZW50LiAqL1xuZXhwb3J0IHR5cGUgUG9wb3ZlclNpemUgPSAnc20nIHwgJ21kJyB8ICdsZycgfCAnYXV0byc7XG4vKiogSW5uZXIgcGFkZGluZyBvZiB0aGUgcGFuZWwuICovXG5leHBvcnQgdHlwZSBQb3BvdmVyUGFkZGluZyA9ICdtZCcgfCAnc20nIHwgJ25vbmUnO1xuLyoqIFdoZXJlIGZvY3VzIGdvZXMgd2hlbiB0aGUgcGFuZWwgb3BlbnMuICovXG5leHBvcnQgdHlwZSBQb3BvdmVyQXV0b0ZvY3VzID0gJ2ZpcnN0JyB8ICdwYW5lbCcgfCAnbm9uZSc7XG4vKiogQVJJQSByb2xlIG9mIHRoZSBwYW5lbDsgYG51bGxgIGZvciBhIGJhcmUgY29udGFpbmVyICh0aGUgY29udGVudCBicmluZ3MgaXRzIG93biByb2xlKS4gKi9cbmV4cG9ydCB0eXBlIFBvcG92ZXJSb2xlID0gJ2RpYWxvZycgfCAnbWVudScgfCAnbGlzdGJveCcgfCBudWxsO1xuXG5leHBvcnQgdHlwZSB7IEF0aE92ZXJsYXlDbG9zZVJlYXNvbiBhcyBQb3BvdmVyQ2xvc2VSZWFzb24gfSBmcm9tICcuLi9mbG9hdGluZy9vdmVybGF5LXN0YWNrJztcblxubGV0IG5leHRQb3BvdmVySWQgPSAwO1xuXG4vKipcbiAqIExhenkgcGFuZWwgY29udGVudDogcmVuZGVyZWQgb25seSB3aGlsZSB0aGUgcG9wb3ZlciBpcyBvcGVuLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXBvcG92ZXI+XG4gKiAgIDxuZy10ZW1wbGF0ZSBhdGhQb3BvdmVyQ29udGVudD7igKY8L25nLXRlbXBsYXRlPlxuICogPC9hdGgtcG9wb3Zlcj5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnbmctdGVtcGxhdGVbYXRoUG9wb3ZlckNvbnRlbnRdJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgQXRoUG9wb3ZlckNvbnRlbnREaXJlY3RpdmUge1xuICByZWFkb25seSB0ZW1wbGF0ZSA9IGluamVjdChUZW1wbGF0ZVJlZik7XG59XG5cbi8qKlxuICogQXRoZW5lIFBvcG92ZXJcbiAqXG4gKiBBbiBhbmNob3JlZCBwYW5lbCBpbiB0aGUgdG9wIGxheWVyOiBubyBjb250YWluZXIncyBvdmVyZmxvdyBvciB6LWluZGV4XG4gKiBjbGlwcyBpdC4gT3BlbnMgZnJvbSBgYXRoUG9wb3ZlclRyaWdnZXJgLCBgc2hvdygpYCBvciBgWyhvcGVuKV1gOyBjbG9zZXMgb25cbiAqIEVzY2FwZSAodG9wbW9zdCBvdmVybGF5IG9ubHkpLCBvdXRzaWRlIGNsaWNrIGFuZCBUYWItb3V0LCBhbmQgcmV0dXJucyBmb2N1c1xuICogdG8gdGhlIHRyaWdnZXIuIGByb2xlPVwiZGlhbG9nXCJgIGJ5IGRlZmF1bHQ7IGB0cmFwRm9jdXNgIGtlZXBzIFRhYiBpbnNpZGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtYnV0dG9uIFthdGhQb3BvdmVyVHJpZ2dlcl09XCJpbmZvXCI+RGV0YWlsczwvYXRoLWJ1dHRvbj5cbiAqIDxhdGgtcG9wb3ZlciAjaW5mbyBhcmlhTGFiZWw9XCJEZXRhaWxzXCIgYXJyb3c+XG4gKiAgIDxwPkNvbnRlbnQ8L3A+XG4gKiA8L2F0aC1wb3BvdmVyPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtcG9wb3ZlcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtBdGhGbG9hdGluZ0RpcmVjdGl2ZSwgTmdUZW1wbGF0ZU91dGxldF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9wb3BvdmVyLmNvbXBvbmVudC5zY3NzJyxcbiAgZXhwb3J0QXM6ICdhdGhQb3BvdmVyJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoUG9wb3ZlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFjayA9IGluamVjdChBdGhPdmVybGF5U3RhY2spO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSBwYW5lbCBpcyBzaG93bi4gVHdvLXdheTogYFsob3BlbildYC4gKi9cbiAgcmVhZG9ubHkgb3BlbiA9IG1vZGVsKGZhbHNlKTtcbiAgLyoqXG4gICAqIFRoZSBlbGVtZW50IHRoZSBwYW5lbCBoYW5ncyBmcm9tIChhIHRyaWdnZXIgZGlyZWN0aXZlIHNldHMgaXQgb24gaXRzXG4gICAqIG93biksIG9yIGEgYEZsb2F0aW5nVmlydHVhbEFuY2hvcmAgc3VjaCBhcyB0aGUgc3BvdCB0aGUgcG9pbnRlciByZXN0cyBvbjtcbiAgICogaXRzIGBjb250ZXh0RWxlbWVudGAgdGhlbiBjb3VudHMgYXMgdGhlIHRyaWdnZXIuXG4gICAqL1xuICByZWFkb25seSBhbmNob3IgPSBpbnB1dDxGbG9hdGluZ0FuY2hvcj4obnVsbCk7XG4gIHJlYWRvbmx5IHNpemUgPSBpbnB1dDxQb3BvdmVyU2l6ZT4oJ21kJyk7XG4gIHJlYWRvbmx5IHBhZGRpbmcgPSBpbnB1dDxQb3BvdmVyUGFkZGluZz4oJ21kJyk7XG4gIHJlYWRvbmx5IGFsaWduID0gaW5wdXQ8RmxvYXRpbmdBbGlnbj4oJ3N0YXJ0Jyk7XG4gIHJlYWRvbmx5IHNpZGUgPSBpbnB1dDxGbG9hdGluZ1NpZGU+KCdib3R0b20nKTtcbiAgLyoqIEdhcCB0byB0aGUgYW5jaG9yIGluIHB4LiAqL1xuICByZWFkb25seSBvZmZzZXQgPSBpbnB1dCg2KTtcbiAgcmVhZG9ubHkgbWF0Y2hXaWR0aCA9IGlucHV0KGZhbHNlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgLyoqIFVwcGVyIGJvdW5kIGZvciB0aGUgaGVpZ2h0IGluIHB4ICh0aGUgdmlld3BvcnQgY2FwcyBpdCBhbnl3YXkpLiAqL1xuICByZWFkb25seSBtYXhIZWlnaHQgPSBpbnB1dDxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgLyoqIFNob3cgYW4gYXJyb3cgcG9pbnRpbmcgYXQgdGhlIGFuY2hvci4gKi9cbiAgcmVhZG9ubHkgYXJyb3cgPSBpbnB1dChmYWxzZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBLZWVwIFRhYiBpbnNpZGUgdGhlIHBhbmVsIChtb2RhbC1saWtlIGNvbnRlbnQpOyBvdGhlcndpc2UgVGFiIG91dCBjbG9zZXMgaXQuICovXG4gIHJlYWRvbmx5IHRyYXBGb2N1cyA9IGlucHV0KGZhbHNlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgcmVhZG9ubHkgYXV0b0ZvY3VzID0gaW5wdXQ8UG9wb3ZlckF1dG9Gb2N1cz4oJ2ZpcnN0Jyk7XG4gIC8qKiBSZXR1cm4gZm9jdXMgdG8gdGhlIHRyaWdnZXIgb24gRXNjYXBlIC8gc2VsZWN0aW9uIC8gcHJvZ3JhbW1hdGljIGNsb3NlLiAqL1xuICByZWFkb25seSByZXN0b3JlRm9jdXMgPSBpbnB1dCh0cnVlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgcmVhZG9ubHkgY2xvc2VPbkVzY2FwZSA9IGlucHV0KHRydWUsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICByZWFkb25seSBjbG9zZU9uT3V0c2lkZUNsaWNrID0gaW5wdXQodHJ1ZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIHJlYWRvbmx5IHBhbmVsUm9sZSA9IGlucHV0PFBvcG92ZXJSb2xlPignZGlhbG9nJyk7XG4gIHJlYWRvbmx5IGFyaWFMYWJlbCA9IGlucHV0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBhcmlhTGFiZWxsZWRieSA9IGlucHV0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICAvKiogRXh0cmEgY2xhc3NlcyBvbiB0aGUgcGFuZWwgKGl0IGxpdmVzIGluIHRoaXMgY29tcG9uZW50J3MgdmlldykuICovXG4gIHJlYWRvbmx5IHBhbmVsQ2xhc3MgPSBpbnB1dCgnJyk7XG5cbiAgcmVhZG9ubHkgb3BlbmVkID0gb3V0cHV0PHZvaWQ+KCk7XG4gIHJlYWRvbmx5IGNsb3NlZCA9IG91dHB1dDxBdGhPdmVybGF5Q2xvc2VSZWFzb24+KCk7XG5cbiAgLyoqIElkIG9mIHRoZSBwYW5lbCwgZm9yIGBhcmlhLWNvbnRyb2xzYC4gKi9cbiAgcmVhZG9ubHkgcGFuZWxJZCA9IGlucHV0KGBhdGgtcG9wb3Zlci0keysrbmV4dFBvcG92ZXJJZH1gKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbGF6eUNvbnRlbnQgPSBjb250ZW50Q2hpbGQoQXRoUG9wb3ZlckNvbnRlbnREaXJlY3RpdmUsIHtcbiAgICBkZXNjZW5kYW50czogZmFsc2UsXG4gIH0pO1xuICBwcml2YXRlIHJlYWRvbmx5IHBhbmVsUmVmID0gdmlld0NoaWxkPEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+PigncGFuZWwnKTtcbiAgcHJpdmF0ZSByZWFkb25seSB0cmlnZ2VyQW5jaG9yID0gc2lnbmFsPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgLyoqIFRoZSBlbGVtZW50IHRoZSBwYW5lbCBjdXJyZW50bHkgaGFuZ3MgZnJvbS4gKi9cbiAgcmVhZG9ubHkgYW5jaG9yRWxlbWVudCA9IGNvbXB1dGVkKCgpID0+IHJlc29sdmVBbmNob3IodGhpcy5hbmNob3IoKSkgPz8gdGhpcy50cmlnZ2VyQW5jaG9yKCkpO1xuXG4gIC8qKiBXaGF0IHRoZSBwYW5lbCBpcyBwbGFjZWQgYWdhaW5zdDogdGhlIGFuY2hvciBpbnB1dCAoZWxlbWVudCBvciB2aXJ0dWFsKSBvciB0aGUgdHJpZ2dlci4gKi9cbiAgLy8gQW5ub3RhdGVkOiBhbiBpbmZlcnJlZCB1bmlvbiBvZiB0d28gb2JqZWN0IHR5cGVzIHByaW50cyBpbiB0eXBlLWlkXG4gIC8vIG9yZGVyLCB3aGljaCBkaWZmZXJzIGJldHdlZW4gY2FjaGVkIGFuZCBmcmVzaCBidWlsZHMgKGNoZWNrOmRpc3QpLlxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZmxvYXRUYXJnZXQ6IFNpZ25hbDxIVE1MRWxlbWVudCB8IEZsb2F0aW5nVmlydHVhbEFuY2hvciB8IG51bGw+ID0gY29tcHV0ZWQoXG4gICAgKCkgPT4gcmVzb2x2ZUZsb2F0aW5nVGFyZ2V0KHRoaXMuYW5jaG9yKCkpID8/IHRoaXMudHJpZ2dlckFuY2hvcigpXG4gICk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHBhbmVsQ2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgW1xuICAgICAgYGF0aC1wb3BvdmVyX19wYW5lbC0tJHt0aGlzLnNpemUoKX1gLFxuICAgICAgYGF0aC1wb3BvdmVyX19wYW5lbC0tcGFkLSR7dGhpcy5wYWRkaW5nKCl9YCxcbiAgICAgIHRoaXMucGFuZWxDbGFzcygpLFxuICAgIF1cbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5qb2luKCcgJylcbiAgKTtcblxuICBwcml2YXRlIHJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSByZXR1cm5Gb2N1czogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgLyoqIFdvcmsgd2FpdGluZyBmb3IgdGhlIG9wZW4gcGFuZWwgdG8gcmVuZGVyIChzZWUgYHdoZW5QYW5lbFJlYWR5YCkuICovXG4gIHByaXZhdGUgcGFuZWxKb2JzOiAoKCkgPT4gdm9pZClbXSA9IFtdO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZW50cnk6IEF0aE92ZXJsYXlFbnRyeSA9IHtcbiAgICBwYW5lbDogKCkgPT4gdGhpcy5wYW5lbCxcbiAgICBhbmNob3I6ICgpID0+IHRoaXMuYW5jaG9yRWxlbWVudCgpLFxuICAgIGNsb3NlT25Fc2NhcGU6ICgpID0+IHRoaXMuY2xvc2VPbkVzY2FwZSgpLFxuICAgIGNsb3NlT25PdXRzaWRlQ2xpY2s6ICgpID0+IHRoaXMuY2xvc2VPbk91dHNpZGVDbGljaygpLFxuICAgIGRpc21pc3M6IChyZWFzb24pID0+IHRoaXMuaGlkZShyZWFzb24pLFxuICB9O1xuXG4gIC8qKiBUaGUgcGFuZWwgZWxlbWVudCB3aGlsZSBvcGVuLiAqL1xuICBnZXQgcGFuZWwoKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5wYW5lbFJlZigpPy5uYXRpdmVFbGVtZW50ID8/IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBET00gc3luYywgbm8gc3RhdGU6IHdvcmsgb24gdGhlIHBhbmVsIChmb2N1cyBpbnRvIGl0LCBhIG1lbnUncyBmaXJzdFxuICAgIC8vIGl0ZW0sIGEgcGlja2VyJ3MgYWN0aXZlIG9wdGlvbikgZm9sbG93cyB0aGUgcGFuZWwgZWxlbWVudCwgYXMgaW5cbiAgICAvLyBhdGgtZGlhbG9nIGFuZCBhdGgtc2hlZXQsIHNvIGl0IHJ1bnMgd2hpY2hldmVyIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAvLyByZW5kZXJlZCB0aGUgcGFuZWwuIGBhZnRlck5leHRSZW5kZXJgIHJhbiBvbiB0aGUgbmV4dCBhcHAgcmVuZGVyIGV2ZW5cbiAgICAvLyB3aGVuIHRoYXQgZGlkIG5vdCBpbmNsdWRlIHRoaXMgdmlldyAoYSBmaXh0dXJlIHdpdGhvdXQgYXV0b0RldGVjdCwgYVxuICAgIC8vIHZpZXcgY2hlY2tlZCBieSBoYW5kKSwgYmVmb3JlIHRoZSBwYW5lbCBleGlzdGVkIChWRVJJRlkgNC4xKS5cbiAgICBlZmZlY3QoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucGFuZWxSZWYoKSkgdW50cmFja2VkKCgpID0+IHRoaXMucnVuUGFuZWxKb2JzKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnMgYGZuYCBvbmNlIHRoZSBvcGVuIHBhbmVsIGlzIHJlbmRlcmVkIGFuZCBwbGFjZWQgKGBhdGhGbG9hdGluZ2BcbiAgICogcGxhY2VzIGl0IHdoZW4gaXQgaXMgY3JlYXRlZCk7IHJpZ2h0IGF3YXkgd2hlbiBpdCBhbHJlYWR5IGlzLiBEcm9wcGVkXG4gICAqIHdoZW4gdGhlIHBvcG92ZXIgY2xvc2VzIGZpcnN0LiBGb3IgYGF0aC1tZW51YCBhbmQgYGF0aC1vcHRpb24tcGlja2VyYC5cbiAgICovXG4gIHdoZW5QYW5lbFJlYWR5KGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wZW4oKSkgcmV0dXJuO1xuICAgIHRoaXMucGFuZWxKb2JzLnB1c2goZm4pO1xuICAgIGlmICh0aGlzLnBhbmVsKSB0aGlzLnJ1blBhbmVsSm9icygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghY2hhbmdlc1snb3BlbiddKSByZXR1cm47XG4gICAgaWYgKHRoaXMub3BlbigpICYmICF0aGlzLnJlZ2lzdGVyZWQpIHRoaXMuYWZ0ZXJPcGVuKCk7XG4gICAgZWxzZSBpZiAoIXRoaXMub3BlbigpICYmIHRoaXMucmVnaXN0ZXJlZCkgdGhpcy5hZnRlckNsb3NlKCdwcm9ncmFtbWF0aWMnKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucGFuZWxKb2JzID0gW107XG4gICAgaWYgKHRoaXMucmVnaXN0ZXJlZCkgdGhpcy5zdGFjay5jbG9zZSh0aGlzLmVudHJ5KTtcbiAgfVxuXG4gIC8qKiBPcGVucyB0aGUgcGFuZWwsIG9wdGlvbmFsbHkgaGFuZ2luZyBpdCBmcm9tIGBhbmNob3JgLiAqL1xuICBzaG93KGFuY2hvcj86IEhUTUxFbGVtZW50IHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChhbmNob3IpIHRoaXMudHJpZ2dlckFuY2hvci5zZXQoYW5jaG9yKTtcbiAgICBpZiAodGhpcy5vcGVuKCkpIHJldHVybjtcbiAgICB0aGlzLm9wZW4uc2V0KHRydWUpO1xuICAgIHRoaXMuYWZ0ZXJPcGVuKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBwYW5lbC4gYHJlc3RvcmVgIG92ZXJyaWRlcyB3aGV0aGVyIGZvY3VzIGdvZXMgYmFjayB0byB0aGVcbiAgICogdHJpZ2dlciAoZGVmYXVsdDogeWVzIHdoZW4gZm9jdXMgd2FzIGluc2lkZSBvciB0aGUgdXNlciBwcmVzc2VkIEVzY2FwZSkuXG4gICAqL1xuICBoaWRlKHJlYXNvbjogQXRoT3ZlcmxheUNsb3NlUmVhc29uID0gJ3Byb2dyYW1tYXRpYycsIHJlc3RvcmU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wZW4oKSkgcmV0dXJuO1xuICAgIHRoaXMub3Blbi5zZXQoZmFsc2UpO1xuICAgIHRoaXMuYWZ0ZXJDbG9zZShyZWFzb24sIHJlc3RvcmUpO1xuICB9XG5cbiAgdG9nZ2xlKGFuY2hvcj86IEhUTUxFbGVtZW50IHwgbnVsbCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wZW4oKSkgdGhpcy5oaWRlKCk7XG4gICAgZWxzZSB0aGlzLnNob3coYW5jaG9yKTtcbiAgfVxuXG4gIC8qKiBNb3ZlcyBmb2N1cyBpbnRvIHRoZSBwYW5lbCBhY2NvcmRpbmcgdG8gYGF1dG9Gb2N1c2AgKG9yIGBtb2RlYCkuICovXG4gIGZvY3VzUGFuZWwobW9kZTogUG9wb3ZlckF1dG9Gb2N1cyA9IHRoaXMuYXV0b0ZvY3VzKCkpOiB2b2lkIHtcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgaWYgKCFwYW5lbCB8fCBtb2RlID09PSAnbm9uZScpIHJldHVybjtcbiAgICBjb25zdCBhY3RpdmUgPSBwYW5lbC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGFjdGl2ZSAmJiBwYW5lbC5jb250YWlucyhhY3RpdmUpICYmIGFjdGl2ZSAhPT0gcGFuZWwpIHJldHVybjtcbiAgICBjb25zdCB0YXJnZXQgPSBtb2RlID09PSAnZmlyc3QnID8gKHRhYmJhYmxlcyhwYW5lbClbMF0gPz8gcGFuZWwpIDogcGFuZWw7XG4gICAgZm9jdXNTYWZlbHkodGFyZ2V0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBwYW5lbCA9IHRoaXMucGFuZWw7XG4gICAgaWYgKHBhbmVsICYmIHRoaXMudHJhcEZvY3VzKCkpIHRyYXBUYWIoZXZlbnQsIHBhbmVsKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkZvY3VzT3V0KGV2ZW50OiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMudHJhcEZvY3VzKCkgfHwgIXRoaXMub3BlbigpKSByZXR1cm47XG4gICAgY29uc3QgbmV4dCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQ7XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGNvbnN0IGFuY2hvciA9IHRoaXMuYW5jaG9yRWxlbWVudCgpO1xuICAgIGlmICghKG5leHQgaW5zdGFuY2VvZiBOb2RlKSB8fCAhcGFuZWwpIHJldHVybjtcbiAgICBpZiAocGFuZWwuY29udGFpbnMobmV4dCkgfHwgYW5jaG9yPy5jb250YWlucyhuZXh0KSkgcmV0dXJuO1xuICAgIHRoaXMuaGlkZSgndGFiJywgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlck9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICBjb25zdCBkb2MgPSB0aGlzLmFuY2hvckVsZW1lbnQoKT8ub3duZXJEb2N1bWVudCA/PyBkb2N1bWVudDtcbiAgICBjb25zdCBhY3RpdmUgPSBkb2MuYWN0aXZlRWxlbWVudDtcbiAgICBjb25zdCBhbmNob3IgPSB0aGlzLmFuY2hvckVsZW1lbnQoKTtcbiAgICB0aGlzLnJldHVybkZvY3VzID0gYW5jaG9yXG4gICAgICA/IGZvY3VzVGFyZ2V0KGFuY2hvcilcbiAgICAgIDogYWN0aXZlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgYWN0aXZlICE9PSBkb2MuYm9keVxuICAgICAgICA/IGFjdGl2ZVxuICAgICAgICA6IG51bGw7XG4gICAgdGhpcy5zdGFjay5vcGVuKHRoaXMuZW50cnkpO1xuICAgIHRoaXMub3BlbmVkLmVtaXQoKTtcbiAgICB0aGlzLndoZW5QYW5lbFJlYWR5KCgpID0+IHRoaXMuZm9jdXNQYW5lbCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgcnVuUGFuZWxKb2JzKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vcGVuKCkgfHwgIXRoaXMucGFuZWwpIHJldHVybjtcbiAgICBjb25zdCBqb2JzID0gdGhpcy5wYW5lbEpvYnM7XG4gICAgdGhpcy5wYW5lbEpvYnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGpvYiBvZiBqb2JzKSBqb2IoKTtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJDbG9zZShyZWFzb246IEF0aE92ZXJsYXlDbG9zZVJlYXNvbiwgcmVzdG9yZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdGVyZWQgPSBmYWxzZTtcbiAgICB0aGlzLnBhbmVsSm9icyA9IFtdO1xuICAgIHRoaXMuc3RhY2suY2xvc2UodGhpcy5lbnRyeSk7XG4gICAgY29uc3QgcGFuZWwgPSB0aGlzLnBhbmVsO1xuICAgIGNvbnN0IGRvYyA9IHBhbmVsPy5vd25lckRvY3VtZW50ID8/IGRvY3VtZW50O1xuICAgIGNvbnN0IGZvY3VzSW5zaWRlID0gISFwYW5lbCAmJiBwYW5lbC5jb250YWlucyhkb2MuYWN0aXZlRWxlbWVudCk7XG4gICAgY29uc3QgYmFjayA9IHRoaXMucmV0dXJuRm9jdXM7XG4gICAgdGhpcy5yZXR1cm5Gb2N1cyA9IG51bGw7XG4gICAgY29uc3Qgd2FudGVkID1cbiAgICAgIHJlc3RvcmUgPz9cbiAgICAgICh0aGlzLnJlc3RvcmVGb2N1cygpICYmXG4gICAgICAgIChyZWFzb24gPT09ICdlc2NhcGUnIHx8IHJlYXNvbiA9PT0gJ3NlbGVjdCcgfHwgKHJlYXNvbiAhPT0gJ3RhYicgJiYgZm9jdXNJbnNpZGUpKSk7XG4gICAgaWYgKHdhbnRlZCAmJiByZWFzb24gIT09ICdvdXRzaWRlJykge1xuICAgICAgZm9jdXNTYWZlbHkoYmFjayk7XG4gICAgfSBlbHNlIGlmIChyZWFzb24gPT09ICdvdXRzaWRlJyAmJiBmb2N1c0luc2lkZSAmJiB0aGlzLnJlc3RvcmVGb2N1cygpKSB7XG4gICAgICAvLyBUaGUgcGFuZWwgdGFrZXMgZm9jdXMgd2l0aCBpdDsgaWYgdGhlIGNsaWNrIGxhbmRlZCBvbiBub3RoaW5nXG4gICAgICAvLyBmb2N1c2FibGUsIHB1dCBmb2N1cyBiYWNrIG9uIHRoZSB0cmlnZ2VyIGluc3RlYWQgb2YgdGhlIHBhZ2UuIEEgdGFza1xuICAgICAgLy8gbGF0ZXI6IHRoZSBicm93c2VyIG1vdmVzIGZvY3VzIGFmdGVyIHRoaXMgcG9pbnRlcmRvd24gKG5vdCBjaGFuZ2VcbiAgICAgIC8vIGRldGVjdGlvbikuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ID09PSBkb2MuYm9keSB8fCAhZG9jLmFjdGl2ZUVsZW1lbnQpIGZvY3VzU2FmZWx5KGJhY2spO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuY2xvc2VkLmVtaXQocmVhc29uKTtcbiAgfVxufVxuIiwiQGlmIChvcGVuKCkpIHtcbiAgPGRpdlxuICAgICNwYW5lbFxuICAgIGNsYXNzPVwiYXRoLXBvcG92ZXJfX3BhbmVsXCJcbiAgICBbY2xhc3NdPVwicGFuZWxDbGFzc2VzKClcIlxuICAgIFtpZF09XCJwYW5lbElkKClcIlxuICAgIFthdHRyLnJvbGVdPVwicGFuZWxSb2xlKClcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsKClcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRieSgpXCJcbiAgICBbYXR0ci5hcmlhLW1vZGFsXT1cInRyYXBGb2N1cygpICYmIHBhbmVsUm9sZSgpID09PSAnZGlhbG9nJyA/ICd0cnVlJyA6IG51bGxcIlxuICAgIHRhYmluZGV4PVwiLTFcIlxuICAgIFthdGhGbG9hdGluZ109XCJmbG9hdFRhcmdldCgpXCJcbiAgICBbYWxpZ25dPVwiYWxpZ24oKVwiXG4gICAgW3NpZGVdPVwic2lkZSgpXCJcbiAgICBbb2Zmc2V0XT1cIm9mZnNldCgpXCJcbiAgICBbbWF0Y2hXaWR0aF09XCJtYXRjaFdpZHRoKClcIlxuICAgIFttYXhIZWlnaHRdPVwibWF4SGVpZ2h0KClcIlxuICAgIFthcnJvd109XCJhcnJvdygpID8gYXJyb3dFbCA6IG51bGxcIlxuICAgIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAoZm9jdXNvdXQpPVwib25Gb2N1c091dCgkZXZlbnQpXCJcbiAgPlxuICAgIDxzcGFuICNhcnJvd0VsIGNsYXNzPVwiYXRoLXBvcG92ZXJfX2Fycm93XCIgW2hpZGRlbl09XCIhYXJyb3coKVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICBAaWYgKGxhenlDb250ZW50KCk7IGFzIGxhenkpIHtcbiAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibGF6eS50ZW1wbGF0ZVwiIC8+XG4gICAgfSBAZWxzZSB7XG4gICAgICA8bmctY29udGVudCAvPlxuICAgIH1cbiAgPC9kaXY+XG59XG4iXX0=