import { Directive, ElementRef, NgZone, booleanAttribute, inject, input, } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2Zsb2F0aW5nL2Zsb2F0aW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBR04sZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLFVBQVUsRUFDVixlQUFlLEdBS2hCLE1BQU0sWUFBWSxDQUFDOztBQWFwQjs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQXNCO0lBQ2xELElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDekIsSUFBSSxNQUFNLFlBQVksVUFBVTtRQUFFLE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUM5RCxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzVCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFDbEMsT0FBTyxHQUFHLFlBQVksV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRCxDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELGlGQUFpRjtBQUNqRixNQUFNLFVBQVUscUJBQXFCLENBQ25DLE1BQXNCO0lBRXRCLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDekIsT0FBTyxNQUFNLFlBQVksVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDdEUsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBTUgsTUFBTSxPQUFPLG9CQUFvQjtJQUxqQztRQU1FLDREQUE0RDtRQUNuRCxXQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBaUIsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUMzRTs7O1dBR0c7UUFDTSxVQUFLLEdBQUcsS0FBSyxDQUFnQixPQUFPLENBQUMsQ0FBQztRQUMvQywrREFBK0Q7UUFDdEQsU0FBSSxHQUFHLEtBQUssQ0FBZSxRQUFRLENBQUMsQ0FBQztRQUM5QywyQ0FBMkM7UUFDbEMsV0FBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQiw0REFBNEQ7UUFDbkQsZUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLHNFQUFzRTtRQUM3RCxjQUFTLEdBQUcsS0FBSyxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUNoRCw2RkFBNkY7UUFDcEYsYUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLCtFQUErRTtRQUN0RSxVQUFLLEdBQUcsS0FBSyxDQUFxQixJQUFJLENBQUMsQ0FBQztRQUVoQyxPQUFFLEdBQUcsTUFBTSxDQUEwQixVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDL0QsU0FBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixZQUFPLEdBQTJCLElBQUksQ0FBQztRQUN2QyxjQUFTLEdBQUcsS0FBSyxDQUFDO0tBc0MzQjtJQXBDQyxlQUFlO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCw4RUFBOEU7SUFDOUUsTUFBTTtRQUNKLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVPLE1BQU07UUFDWixJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixNQUFNLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUM5QyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUU7WUFDMUIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDN0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7U0FDcEIsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOytHQTdEVSxvQkFBb0I7bUdBQXBCLG9CQUFvQjs7NEZBQXBCLG9CQUFvQjtrQkFMaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxhQUFhO2lCQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgaW5qZWN0LFxuICBpbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBmbG9hdFBhbmVsLFxuICBpc1ZpcnR1YWxBbmNob3IsXG4gIHR5cGUgRmxvYXRpbmdBbGlnbixcbiAgdHlwZSBGbG9hdGluZ0NsZWFudXAsXG4gIHR5cGUgRmxvYXRpbmdTaWRlLFxuICB0eXBlIEZsb2F0aW5nVmlydHVhbEFuY2hvcixcbn0gZnJvbSAnLi9mbG9hdGluZyc7XG5cbi8qKlxuICogQW4gYW5jaG9yIGdpdmVuIGFzIGFuIGVsZW1lbnQsIGFuIGBFbGVtZW50UmVmYCAoYSB0ZW1wbGF0ZSByZWYgb2YgYVxuICogY29tcG9uZW50KSBvciBhIGBGbG9hdGluZ1ZpcnR1YWxBbmNob3JgIChhIGNhcmV0IG9yIHBvaW50ZXIgcmVjdGFuZ2xlKS5cbiAqL1xuZXhwb3J0IHR5cGUgRmxvYXRpbmdBbmNob3IgPVxuICB8IEhUTUxFbGVtZW50XG4gIHwgRWxlbWVudFJlZjxIVE1MRWxlbWVudD5cbiAgfCBGbG9hdGluZ1ZpcnR1YWxBbmNob3JcbiAgfCBudWxsXG4gIHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBlbGVtZW50IGJlaGluZCBhbiBhbmNob3I6IGl0c2VsZiwgb3IgYSB2aXJ0dWFsIGFuY2hvcidzXG4gKiBgY29udGV4dEVsZW1lbnRgIChmb2N1cyByZXR1cm4sIG91dHNpZGUgY2xpY2tzLCBgYXJpYS0qYCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlQW5jaG9yKGFuY2hvcjogRmxvYXRpbmdBbmNob3IpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICBpZiAoIWFuY2hvcikgcmV0dXJuIG51bGw7XG4gIGlmIChhbmNob3IgaW5zdGFuY2VvZiBFbGVtZW50UmVmKSByZXR1cm4gYW5jaG9yLm5hdGl2ZUVsZW1lbnQ7XG4gIGlmIChpc1ZpcnR1YWxBbmNob3IoYW5jaG9yKSkge1xuICAgIGNvbnN0IGN0eCA9IGFuY2hvci5jb250ZXh0RWxlbWVudDtcbiAgICByZXR1cm4gY3R4IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBjdHggOiBudWxsO1xuICB9XG4gIHJldHVybiBhbmNob3I7XG59XG5cbi8qKiBXaGF0IGEgcGFuZWwgaXMgcGxhY2VkIGFnYWluc3Q6IHRoZSBlbGVtZW50LCBvciB0aGUgdmlydHVhbCBhbmNob3IgaXRzZWxmLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVGbG9hdGluZ1RhcmdldChcbiAgYW5jaG9yOiBGbG9hdGluZ0FuY2hvclxuKTogSFRNTEVsZW1lbnQgfCBGbG9hdGluZ1ZpcnR1YWxBbmNob3IgfCBudWxsIHtcbiAgaWYgKCFhbmNob3IpIHJldHVybiBudWxsO1xuICByZXR1cm4gYW5jaG9yIGluc3RhbmNlb2YgRWxlbWVudFJlZiA/IGFuY2hvci5uYXRpdmVFbGVtZW50IDogYW5jaG9yO1xufVxuXG4vKipcbiAqIEhhbmdzIHRoZSBob3N0IGVsZW1lbnQgZnJvbSBhbiBhbmNob3Igd2l0aCBgZmxvYXRQYW5lbGA6IHRvcCBsYXllciAoc28gbm9cbiAqIGBvdmVyZmxvd2AsIGB0cmFuc2Zvcm1gIG9yIGB6LWluZGV4YCBvZiBhIGNvbnRhaW5lciBjYW4gY2xpcCBvciBjb3ZlciBpdCksXG4gKiBrZXB0IGluc2lkZSB0aGUgdmlld3BvcnQgKGZsaXAsIHNoaWZ0LCBoZWlnaHQgY2FwKSwgZm9sbG93aW5nIHNjcm9sbHMsXG4gKiByZXNpemVzIGFuZCBzaXplIGNoYW5nZXMuIFRoZSBob3N0IHN0YXlzIHdoZXJlIHRoZSB0ZW1wbGF0ZSBwdXRzIGl0LlxuICpcbiAqIFRoZSBvbmx5IHBvc2l0aW9uaW5nIGxvZ2ljIG9mIHRoZSBsaWJyYXJ5OyBgYXRoLXBvcG92ZXJgLCBgYXRoLW1lbnVgIGFuZFxuICogYGF0aC1vcHRpb24tcGlja2VyYCB1c2UgaXQsIGFuZCBhcHAgY29kZSB0aGF0IG5lZWRzIGEgYmFyZSBmbG9hdGluZyBwYW5lbFxuICogdXNlcyBpdCBpbnN0ZWFkIG9mIG1lYXN1cmluZyByZWN0YW5nbGVzIGl0c2VsZi5cbiAqXG4gKiBAZXhhbXBsZVxuICogQGlmIChvcGVuKCkpIHtcbiAqICAgPGRpdiBjbGFzcz1cIm1lbnVcIiBbYXRoRmxvYXRpbmddPVwidHJpZ2dlclwiIGFsaWduPVwiZW5kXCI+4oCmPC9kaXY+XG4gKiB9XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thdGhGbG9hdGluZ10nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBleHBvcnRBczogJ2F0aEZsb2F0aW5nJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoRmxvYXRpbmdEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBUaGUgZWxlbWVudCAob3IgdmlydHVhbCBhbmNob3IpIHRoZSBwYW5lbCBoYW5ncyBmcm9tLiAqL1xuICByZWFkb25seSBhbmNob3IgPSBpbnB1dC5yZXF1aXJlZDxGbG9hdGluZ0FuY2hvcj4oeyBhbGlhczogJ2F0aEZsb2F0aW5nJyB9KTtcbiAgLyoqXG4gICAqIGBzdGFydGA6IHN0YXJ0IGVkZ2VzIGxpbmUgdXA7IGBlbmRgOiBlbmQgZWRnZXM7IGBhdXRvYDogc3RhcnQgdW5sZXNzIGl0XG4gICAqIG92ZXJmbG93czsgYGNlbnRlcmA6IGNlbnRyZWQgb24gdGhlIGFuY2hvci5cbiAgICovXG4gIHJlYWRvbmx5IGFsaWduID0gaW5wdXQ8RmxvYXRpbmdBbGlnbj4oJ3N0YXJ0Jyk7XG4gIC8qKiBQcmVmZXJyZWQgc2lkZTsgZmxpcHMgd2hlbiB0aGUgb3RoZXIgc2lkZSBoYXMgbW9yZSByb29tLiAqL1xuICByZWFkb25seSBzaWRlID0gaW5wdXQ8RmxvYXRpbmdTaWRlPignYm90dG9tJyk7XG4gIC8qKiBHYXAgYmV0d2VlbiBhbmNob3IgYW5kIHBhbmVsLCBpbiBweC4gKi9cbiAgcmVhZG9ubHkgb2Zmc2V0ID0gaW5wdXQoNCk7XG4gIC8qKiBBdCBsZWFzdCBhcyB3aWRlIGFzIHRoZSBhbmNob3IgKHNlbGVjdHMsIGNvbWJvYm94ZXMpLiAqL1xuICByZWFkb25seSBtYXRjaFdpZHRoID0gaW5wdXQoZmFsc2UsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogVXBwZXIgYm91bmQgZm9yIHRoZSBoZWlnaHQgaW4gcHggKHRoZSB2aWV3cG9ydCBjYXBzIGl0IGFueXdheSkuICovXG4gIHJlYWRvbmx5IG1heEhlaWdodCA9IGlucHV0PG51bWJlciB8IG51bGw+KG51bGwpO1xuICAvKiogUHJvbW90ZSBpbnRvIHRoZSB0b3AgbGF5ZXIgKGRlZmF1bHQpLiBgZmFsc2VgIGtlZXBzIGBwb3NpdGlvbjogZml4ZWRgICsgYC0tei1wb3BvdmVyYC4gKi9cbiAgcmVhZG9ubHkgdG9wTGF5ZXIgPSBpbnB1dCh0cnVlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcbiAgLyoqIEFuIGFycm93IGVsZW1lbnQgaW5zaWRlIHRoZSBwYW5lbCwga2VwdCBwb2ludGluZyBhdCB0aGUgYW5jaG9yJ3MgY2VudHJlLiAqL1xuICByZWFkb25seSBhcnJvdyA9IGlucHV0PEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbCA9IGluamVjdDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj4oRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgcHJpdmF0ZSByZWFkb25seSB6b25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgY2xlYW51cDogRmxvYXRpbmdDbGVhbnVwIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgdmlld1JlYWR5ID0gZmFsc2U7XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudmlld1JlYWR5ID0gdHJ1ZTtcbiAgICB0aGlzLmF0dGFjaCgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmlld1JlYWR5KSB0aGlzLmF0dGFjaCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhbnVwPy4oKTtcbiAgICB0aGlzLmNsZWFudXAgPSBudWxsO1xuICB9XG5cbiAgLyoqIFJlLW1lYXN1cmVzIG5vdyAoYWZ0ZXIgYSBjb250ZW50IGNoYW5nZSB0aGUgUmVzaXplT2JzZXJ2ZXIgY2Fubm90IHNlZSkuICovXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFudXA/LnVwZGF0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5jbGVhbnVwPy4oKTtcbiAgICB0aGlzLmNsZWFudXAgPSBudWxsO1xuICAgIGNvbnN0IGFuY2hvciA9IHJlc29sdmVGbG9hdGluZ1RhcmdldCh0aGlzLmFuY2hvcigpKTtcbiAgICBpZiAoIWFuY2hvcikgcmV0dXJuO1xuICAgIHRoaXMuY2xlYW51cCA9IHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgZmxvYXRQYW5lbCh0aGlzLmVsLCBhbmNob3IsIHtcbiAgICAgICAgYWxpZ246IHRoaXMuYWxpZ24oKSxcbiAgICAgICAgc2lkZTogdGhpcy5zaWRlKCksXG4gICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQoKSxcbiAgICAgICAgbWF0Y2hXaWR0aDogdGhpcy5tYXRjaFdpZHRoKCksXG4gICAgICAgIG1heEhlaWdodDogdGhpcy5tYXhIZWlnaHQoKSxcbiAgICAgICAgdG9wTGF5ZXI6IHRoaXMudG9wTGF5ZXIoKSxcbiAgICAgICAgYXJyb3c6IHRoaXMuYXJyb3coKSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19