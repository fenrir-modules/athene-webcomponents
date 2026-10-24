import { Directive, ElementRef, 
// eslint-disable-next-line no-restricted-imports -- runOutsideAngular only, a zone.js optimisation for floatPanel's scroll/resize listeners; see `zone` below.
NgZone, booleanAttribute, inject, input, } from '@angular/core';
import { floatPanel, isVirtualAnchor, } from './floating';
import * as i0 from "@angular/core";
/**
 * The element behind an anchor: itself, or a virtual anchor's
 * `contextElement` (focus return, outside clicks, `aria-*`).
 */
export function resolveAnchor(anchor) {
    if (!anchor)
        return null;
    if (anchor instanceof ElementRef)
        return anchor.nativeElement;
    if (isVirtualAnchor(anchor)) {
        const ctx = anchor.contextElement;
        return ctx instanceof HTMLElement ? ctx : null;
    }
    return anchor;
}
/** What a panel is placed against: the element, or the virtual anchor itself. */
export function resolveFloatingTarget(anchor) {
    if (!anchor)
        return null;
    return anchor instanceof ElementRef ? anchor.nativeElement : anchor;
}
/**
 * Hangs the host element from an anchor with `floatPanel`: top layer (so no
 * `overflow`, `transform` or `z-index` of a container can clip or cover it),
 * kept inside the viewport (flip, shift, height cap), following scrolls,
 * resizes and size changes. The host stays where the template puts it.
 *
 * The only positioning logic of the library; `ath-popover`, `ath-menu` and
 * `ath-option-picker` use it, and app code that needs a bare floating panel
 * uses it instead of measuring rectangles itself.
 *
 * @example
 * @if (open()) {
 *   <div class="menu" [athFloating]="trigger" align="end">…</div>
 * }
 */
export class AthFloatingDirective {
    constructor() {
        /** The element (or virtual anchor) the panel hangs from. */
        this.anchor = input.required({ alias: 'athFloating' });
        /**
         * `start`: start edges line up; `end`: end edges; `auto`: start unless it
         * overflows; `center`: centred on the anchor.
         */
        this.align = input('start');
        /** Preferred side; flips when the other side has more room. */
        this.side = input('bottom');
        /** Gap between anchor and panel, in px. */
        this.offset = input(4);
        /** At least as wide as the anchor (selects, comboboxes). */
        this.matchWidth = input(false, { transform: booleanAttribute });
        /** Upper bound for the height in px (the viewport caps it anyway). */
        this.maxHeight = input(null);
        /** Promote into the top layer (default). `false` keeps `position: fixed` + `--z-popover`. */
        this.topLayer = input(true, { transform: booleanAttribute });
        /** An arrow element inside the panel, kept pointing at the anchor's centre. */
        this.arrow = input(null);
        this.el = inject(ElementRef).nativeElement;
        /**
         * Only for `runOutsideAngular` below, a zone.js optimisation: `floatPanel`
         * listens to every scroll, resize and size change while the panel is open
         * and must not run the app's change detection each time. It changes no
         * Angular state, so it is correct with and without zone.js; zoneless,
         * `NgZone` is a no-op (angular.dev/guide/zoneless keeps `run` and
         * `runOutsideAngular` for libraries that zone.js apps use). Drop it with
         * zone.js (4.3).
         */
        this.zone = inject(NgZone);
        this.cleanup = null;
        this.viewReady = false;
    }
    ngAfterViewInit() {
        this.viewReady = true;
        this.attach();
    }
    ngOnChanges() {
        if (this.viewReady)
            this.attach();
    }
    ngOnDestroy() {
        this.cleanup?.();
        this.cleanup = null;
    }
    /** Re-measures now (after a content change the ResizeObserver cannot see). */
    update() {
        this.cleanup?.update();
    }
    attach() {
        this.cleanup?.();
        this.cleanup = null;
        const anchor = resolveFloatingTarget(this.anchor());
        if (!anchor)
            return;
        this.cleanup = this.zone.runOutsideAngular(() => floatPanel(this.el, anchor, {
            align: this.align(),
            side: this.side(),
            offset: this.offset(),
            matchWidth: this.matchWidth(),
            maxHeight: this.maxHeight(),
            topLayer: this.topLayer(),
            arrow: this.arrow(),
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFloatingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.14", type: AthFloatingDirective, isStandalone: true, selector: "[athFloating]", inputs: { anchor: { classPropertyName: "anchor", publicName: "athFloating", isSignal: true, isRequired: true, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null }, side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null }, offset: { classPropertyName: "offset", publicName: "offset", isSignal: true, isRequired: false, transformFunction: null }, matchWidth: { classPropertyName: "matchWidth", publicName: "matchWidth", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, topLayer: { classPropertyName: "topLayer", publicName: "topLayer", isSignal: true, isRequired: false, transformFunction: null }, arrow: { classPropertyName: "arrow", publicName: "arrow", isSignal: true, isRequired: false, transformFunction: null } }, exportAs: ["athFloating"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFloatingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[athFloating]',
                    standalone: true,
                    exportAs: 'athFloating',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2Zsb2F0aW5nL2Zsb2F0aW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVU7QUFDViwrSkFBK0o7QUFDL0osTUFBTSxFQUdOLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsZUFBZSxHQUtoQixNQUFNLFlBQVksQ0FBQzs7QUFhcEI7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxNQUFzQjtJQUNsRCxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3pCLElBQUksTUFBTSxZQUFZLFVBQVU7UUFBRSxPQUFPLE1BQU0sQ0FBQyxhQUFhLENBQUM7SUFDOUQsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM1QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ2xDLE9BQU8sR0FBRyxZQUFZLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDakQsQ0FBQztJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxpRkFBaUY7QUFDakYsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxNQUFzQjtJQUV0QixJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3pCLE9BQU8sTUFBTSxZQUFZLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3RFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQU1ILE1B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XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtaW1wb3J0cyAtLSBydW5PdXRzaWRlQW5ndWxhciBvbmx5LCBhIHpvbmUuanMgb3B0aW1pc2F0aW9uIGZvciBmbG9hdFBhbmVsJ3Mgc2Nyb2xsL3Jlc2l6ZSBsaXN0ZW5lcnM7IHNlZSBgem9uZWAgYmVsb3cuXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG4gIGluamVjdCxcbiAgaW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgZmxvYXRQYW5lbCxcbiAgaXNWaXJ0dWFsQW5jaG9yLFxuICB0eXBlIEZsb2F0aW5nQWxpZ24sXG4gIHR5cGUgRmxvYXRpbmdDbGVhbnVwLFxuICB0eXBlIEZsb2F0aW5nU2lkZSxcbiAgdHlwZSBGbG9hdGluZ1ZpcnR1YWxBbmNob3IsXG59IGZyb20gJy4vZmxvYXRpbmcnO1xuXG4vKipcbiAqIEFuIGFuY2hvciBnaXZlbiBhcyBhbiBlbGVtZW50LCBhbiBgRWxlbWVudFJlZmAgKGEgdGVtcGxhdGUgcmVmIG9mIGFcbiAqIGNvbXBvbmVudCkgb3IgYSBgRmxvYXRpbmdWaXJ0dWFsQW5jaG9yYCAoYSBjYXJldCBvciBwb2ludGVyIHJlY3RhbmdsZSkuXG4gKi9cbmV4cG9ydCB0eXBlIEZsb2F0aW5nQW5jaG9yID1cbiAgfCBIVE1MRWxlbWVudFxuICB8IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+XG4gIHwgRmxvYXRpbmdWaXJ0dWFsQW5jaG9yXG4gIHwgbnVsbFxuICB8IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgZWxlbWVudCBiZWhpbmQgYW4gYW5jaG9yOiBpdHNlbGYsIG9yIGEgdmlydHVhbCBhbmNob3Inc1xuICogYGNvbnRleHRFbGVtZW50YCAoZm9jdXMgcmV0dXJuLCBvdXRzaWRlIGNsaWNrcywgYGFyaWEtKmApLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUFuY2hvcihhbmNob3I6IEZsb2F0aW5nQW5jaG9yKTogSFRNTEVsZW1lbnQgfCBudWxsIHtcbiAgaWYgKCFhbmNob3IpIHJldHVybiBudWxsO1xuICBpZiAoYW5jaG9yIGluc3RhbmNlb2YgRWxlbWVudFJlZikgcmV0dXJuIGFuY2hvci5uYXRpdmVFbGVtZW50O1xuICBpZiAoaXNWaXJ0dWFsQW5jaG9yKGFuY2hvcikpIHtcbiAgICBjb25zdCBjdHggPSBhbmNob3IuY29udGV4dEVsZW1lbnQ7XG4gICAgcmV0dXJuIGN0eCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ID8gY3R4IDogbnVsbDtcbiAgfVxuICByZXR1cm4gYW5jaG9yO1xufVxuXG4vKiogV2hhdCBhIHBhbmVsIGlzIHBsYWNlZCBhZ2FpbnN0OiB0aGUgZWxlbWVudCwgb3IgdGhlIHZpcnR1YWwgYW5jaG9yIGl0c2VsZi4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlRmxvYXRpbmdUYXJnZXQoXG4gIGFuY2hvcjogRmxvYXRpbmdBbmNob3Jcbik6IEhUTUxFbGVtZW50IHwgRmxvYXRpbmdWaXJ0dWFsQW5jaG9yIHwgbnVsbCB7XG4gIGlmICghYW5jaG9yKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGFuY2hvciBpbnN0YW5jZW9mIEVsZW1lbnRSZWYgPyBhbmNob3IubmF0aXZlRWxlbWVudCA6IGFuY2hvcjtcbn1cblxuLyoqXG4gKiBIYW5ncyB0aGUgaG9zdCBlbGVtZW50IGZyb20gYW4gYW5jaG9yIHdpdGggYGZsb2F0UGFuZWxgOiB0b3AgbGF5ZXIgKHNvIG5vXG4gKiBgb3ZlcmZsb3dgLCBgdHJhbnNmb3JtYCBvciBgei1pbmRleGAgb2YgYSBjb250YWluZXIgY2FuIGNsaXAgb3IgY292ZXIgaXQpLFxuICoga2VwdCBpbnNpZGUgdGhlIHZpZXdwb3J0IChmbGlwLCBzaGlmdCwgaGVpZ2h0IGNhcCksIGZvbGxvd2luZyBzY3JvbGxzLFxuICogcmVzaXplcyBhbmQgc2l6ZSBjaGFuZ2VzLiBUaGUgaG9zdCBzdGF5cyB3aGVyZSB0aGUgdGVtcGxhdGUgcHV0cyBpdC5cbiAqXG4gKiBUaGUgb25seSBwb3NpdGlvbmluZyBsb2dpYyBvZiB0aGUgbGlicmFyeTsgYGF0aC1wb3BvdmVyYCwgYGF0aC1tZW51YCBhbmRcbiAqIGBhdGgtb3B0aW9uLXBpY2tlcmAgdXNlIGl0LCBhbmQgYXBwIGNvZGUgdGhhdCBuZWVkcyBhIGJhcmUgZmxvYXRpbmcgcGFuZWxcbiAqIHVzZXMgaXQgaW5zdGVhZCBvZiBtZWFzdXJpbmcgcmVjdGFuZ2xlcyBpdHNlbGYuXG4gKlxuICogQGV4YW1wbGVcbiAqIEBpZiAob3BlbigpKSB7XG4gKiAgIDxkaXYgY2xhc3M9XCJtZW51XCIgW2F0aEZsb2F0aW5nXT1cInRyaWdnZXJcIiBhbGlnbj1cImVuZFwiPuKApjwvZGl2PlxuICogfVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXRoRmxvYXRpbmddJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgZXhwb3J0QXM6ICdhdGhGbG9hdGluZycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aEZsb2F0aW5nRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvKiogVGhlIGVsZW1lbnQgKG9yIHZpcnR1YWwgYW5jaG9yKSB0aGUgcGFuZWwgaGFuZ3MgZnJvbS4gKi9cbiAgcmVhZG9ubHkgYW5jaG9yID0gaW5wdXQucmVxdWlyZWQ8RmxvYXRpbmdBbmNob3I+KHsgYWxpYXM6ICdhdGhGbG9hdGluZycgfSk7XG4gIC8qKlxuICAgKiBgc3RhcnRgOiBzdGFydCBlZGdlcyBsaW5lIHVwOyBgZW5kYDogZW5kIGVkZ2VzOyBgYXV0b2A6IHN0YXJ0IHVubGVzcyBpdFxuICAgKiBvdmVyZmxvd3M7IGBjZW50ZXJgOiBjZW50cmVkIG9uIHRoZSBhbmNob3IuXG4gICAqL1xuICByZWFkb25seSBhbGlnbiA9IGlucHV0PEZsb2F0aW5nQWxpZ24+KCdzdGFydCcpO1xuICAvKiogUHJlZmVycmVkIHNpZGU7IGZsaXBzIHdoZW4gdGhlIG90aGVyIHNpZGUgaGFzIG1vcmUgcm9vbS4gKi9cbiAgcmVhZG9ubHkgc2lkZSA9IGlucHV0PEZsb2F0aW5nU2lkZT4oJ2JvdHRvbScpO1xuICAvKiogR2FwIGJldHdlZW4gYW5jaG9yIGFuZCBwYW5lbCwgaW4gcHguICovXG4gIHJlYWRvbmx5IG9mZnNldCA9IGlucHV0KDQpO1xuICAvKiogQXQgbGVhc3QgYXMgd2lkZSBhcyB0aGUgYW5jaG9yIChzZWxlY3RzLCBjb21ib2JveGVzKS4gKi9cbiAgcmVhZG9ubHkgbWF0Y2hXaWR0aCA9IGlucHV0KGZhbHNlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgLyoqIFVwcGVyIGJvdW5kIGZvciB0aGUgaGVpZ2h0IGluIHB4ICh0aGUgdmlld3BvcnQgY2FwcyBpdCBhbnl3YXkpLiAqL1xuICByZWFkb25seSBtYXhIZWlnaHQgPSBpbnB1dDxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgLyoqIFByb21vdGUgaW50byB0aGUgdG9wIGxheWVyIChkZWZhdWx0KS4gYGZhbHNlYCBrZWVwcyBgcG9zaXRpb246IGZpeGVkYCArIGAtLXotcG9wb3ZlcmAuICovXG4gIHJlYWRvbmx5IHRvcExheWVyID0gaW5wdXQodHJ1ZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBBbiBhcnJvdyBlbGVtZW50IGluc2lkZSB0aGUgcGFuZWwsIGtlcHQgcG9pbnRpbmcgYXQgdGhlIGFuY2hvcidzIGNlbnRyZS4gKi9cbiAgcmVhZG9ubHkgYXJyb3cgPSBpbnB1dDxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZWwgPSBpbmplY3Q8RWxlbWVudFJlZjxIVE1MRWxlbWVudD4+KEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gIC8qKlxuICAgKiBPbmx5IGZvciBgcnVuT3V0c2lkZUFuZ3VsYXJgIGJlbG93LCBhIHpvbmUuanMgb3B0aW1pc2F0aW9uOiBgZmxvYXRQYW5lbGBcbiAgICogbGlzdGVucyB0byBldmVyeSBzY3JvbGwsIHJlc2l6ZSBhbmQgc2l6ZSBjaGFuZ2Ugd2hpbGUgdGhlIHBhbmVsIGlzIG9wZW5cbiAgICogYW5kIG11c3Qgbm90IHJ1biB0aGUgYXBwJ3MgY2hhbmdlIGRldGVjdGlvbiBlYWNoIHRpbWUuIEl0IGNoYW5nZXMgbm9cbiAgICogQW5ndWxhciBzdGF0ZSwgc28gaXQgaXMgY29ycmVjdCB3aXRoIGFuZCB3aXRob3V0IHpvbmUuanM7IHpvbmVsZXNzLFxuICAgKiBgTmdab25lYCBpcyBhIG5vLW9wIChhbmd1bGFyLmRldi9ndWlkZS96b25lbGVzcyBrZWVwcyBgcnVuYCBhbmRcbiAgICogYHJ1bk91dHNpZGVBbmd1bGFyYCBmb3IgbGlicmFyaWVzIHRoYXQgem9uZS5qcyBhcHBzIHVzZSkuIERyb3AgaXQgd2l0aFxuICAgKiB6b25lLmpzICg0LjMpLlxuICAgKi9cbiAgcHJpdmF0ZSByZWFkb25seSB6b25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgY2xlYW51cDogRmxvYXRpbmdDbGVhbnVwIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdmlld1JlYWR5ID0gZmFsc2U7XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudmlld1JlYWR5ID0gdHJ1ZTtcbiAgICB0aGlzLmF0dGFjaCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmlld1JlYWR5KSB0aGlzLmF0dGFjaCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhbnVwPy4oKTtcbiAgICB0aGlzLmNsZWFudXAgPSBudWxsO1xuICB9XG5cbiAgLyoqIFJlLW1lYXN1cmVzIG5vdyAoYWZ0ZXIgYSBjb250ZW50IGNoYW5nZSB0aGUgUmVzaXplT2JzZXJ2ZXIgY2Fubm90IHNlZSkuICovXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFudXA/LnVwZGF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhbnVwPy4oKTtcbiAgICB0aGlzLmNsZWFudXAgPSBudWxsO1xuICAgIGNvbnN0IGFuY2hvciA9IHJlc29sdmVGbG9hdGluZ1RhcmdldCh0aGlzLmFuY2hvcigpKTtcbiAgICBpZiAoIWFuY2hvcikgcmV0dXJuO1xuICAgIHRoaXMuY2xlYW51cCA9IHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgZmxvYXRQYW5lbCh0aGlzLmVsLCBhbmNob3IsIHtcbiAgICAgICAgYWxpZ246IHRoaXMuYWxpZ24oKSxcbiAgICAgICAgc2lkZTogdGhpcy5zaWRlKCksXG4gICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQoKSxcbiAgICAgICAgbWF0Y2hXaWR0aDogdGhpcy5tYXRjaFdpZHRoKCksXG4gICAgICAgIG1heEhlaWdodDogdGhpcy5tYXhIZWlnaHQoKSxcbiAgICAgICAgdG9wTGF5ZXI6IHRoaXMudG9wTGF5ZXIoKSxcbiAgICAgICAgYXJyb3c6IHRoaXMuYXJyb3coKSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19