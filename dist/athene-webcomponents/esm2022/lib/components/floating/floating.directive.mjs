import { Directive, ElementRef, NgZone, booleanAttribute, inject, input, } from '@angular/core';
import { floatPanel, } from './floating';
import * as i0 from "@angular/core";
export function resolveAnchor(anchor) {
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
        /** The element the panel hangs from. */
        this.anchor = input.required({ alias: 'athFloating' });
        /** `start`: start edges line up; `end`: end edges; `auto`: start unless it overflows. */
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
        const anchor = resolveAnchor(this.anchor());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2Zsb2F0aW5nL2Zsb2F0aW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBR04sZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLFVBQVUsR0FJWCxNQUFNLFlBQVksQ0FBQzs7QUFLcEIsTUFBTSxVQUFVLGFBQWEsQ0FBQyxNQUFzQjtJQUNsRCxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3pCLE9BQU8sTUFBTSxZQUFZLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3RFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQU1ILE1BQU0sT0FBTyxvQkFBb0I7SUFMakM7UUFNRSx3Q0FBd0M7UUFDL0IsV0FBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQWlCLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDM0UseUZBQXlGO1FBQ2hGLFVBQUssR0FBRyxLQUFLLENBQWdCLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLCtEQUErRDtRQUN0RCxTQUFJLEdBQUcsS0FBSyxDQUFlLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLDJDQUEyQztRQUNsQyxXQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLDREQUE0RDtRQUNuRCxlQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDcEUsc0VBQXNFO1FBQzdELGNBQVMsR0FBRyxLQUFLLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBQ2hELDZGQUE2RjtRQUNwRixhQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDakUsK0VBQStFO1FBQ3RFLFVBQUssR0FBRyxLQUFLLENBQXFCLElBQUksQ0FBQyxDQUFDO1FBRWhDLE9BQUUsR0FBRyxNQUFNLENBQTBCLFVBQVUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUMvRCxTQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLFlBQU8sR0FBMkIsSUFBSSxDQUFDO1FBQ3ZDLGNBQVMsR0FBRyxLQUFLLENBQUM7S0FzQzNCO0lBcENDLGVBQWU7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUVELDhFQUE4RTtJQUM5RSxNQUFNO1FBQ0osSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sTUFBTTtRQUNaLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUM5QyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUU7WUFDMUIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDN0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7U0FDcEIsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOytHQTFEVSxvQkFBb0I7bUdBQXBCLG9CQUFvQjs7NEZBQXBCLG9CQUFvQjtrQkFMaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxhQUFhO2lCQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgYm9vbGVhbkF0dHJpYnV0ZSxcbiAgaW5qZWN0LFxuICBpbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBmbG9hdFBhbmVsLFxuICB0eXBlIEZsb2F0aW5nQWxpZ24sXG4gIHR5cGUgRmxvYXRpbmdDbGVhbnVwLFxuICB0eXBlIEZsb2F0aW5nU2lkZSxcbn0gZnJvbSAnLi9mbG9hdGluZyc7XG5cbi8qKiBBbiBhbmNob3IgZ2l2ZW4gYXMgYW4gZWxlbWVudCBvciBhbiBgRWxlbWVudFJlZmAgKGEgdGVtcGxhdGUgcmVmIG9mIGEgY29tcG9uZW50KS4gKi9cbmV4cG9ydCB0eXBlIEZsb2F0aW5nQW5jaG9yID0gSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlQW5jaG9yKGFuY2hvcjogRmxvYXRpbmdBbmNob3IpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICBpZiAoIWFuY2hvcikgcmV0dXJuIG51bGw7XG4gIHJldHVybiBhbmNob3IgaW5zdGFuY2VvZiBFbGVtZW50UmVmID8gYW5jaG9yLm5hdGl2ZUVsZW1lbnQgOiBhbmNob3I7XG59XG5cbi8qKlxuICogSGFuZ3MgdGhlIGhvc3QgZWxlbWVudCBmcm9tIGFuIGFuY2hvciB3aXRoIGBmbG9hdFBhbmVsYDogdG9wIGxheWVyIChzbyBub1xuICogYG92ZXJmbG93YCwgYHRyYW5zZm9ybWAgb3IgYHotaW5kZXhgIG9mIGEgY29udGFpbmVyIGNhbiBjbGlwIG9yIGNvdmVyIGl0KSxcbiAqIGtlcHQgaW5zaWRlIHRoZSB2aWV3cG9ydCAoZmxpcCwgc2hpZnQsIGhlaWdodCBjYXApLCBmb2xsb3dpbmcgc2Nyb2xscyxcbiAqIHJlc2l6ZXMgYW5kIHNpemUgY2hhbmdlcy4gVGhlIGhvc3Qgc3RheXMgd2hlcmUgdGhlIHRlbXBsYXRlIHB1dHMgaXQuXG4gKlxuICogVGhlIG9ubHkgcG9zaXRpb25pbmcgbG9naWMgb2YgdGhlIGxpYnJhcnk7IGBhdGgtcG9wb3ZlcmAsIGBhdGgtbWVudWAgYW5kXG4gKiBgYXRoLW9wdGlvbi1waWNrZXJgIHVzZSBpdCwgYW5kIGFwcCBjb2RlIHRoYXQgbmVlZHMgYSBiYXJlIGZsb2F0aW5nIHBhbmVsXG4gKiB1c2VzIGl0IGluc3RlYWQgb2YgbWVhc3VyaW5nIHJlY3RhbmdsZXMgaXRzZWxmLlxuICpcbiAqIEBleGFtcGxlXG4gKiBAaWYgKG9wZW4oKSkge1xuICogICA8ZGl2IGNsYXNzPVwibWVudVwiIFthdGhGbG9hdGluZ109XCJ0cmlnZ2VyXCIgYWxpZ249XCJlbmRcIj7igKY8L2Rpdj5cbiAqIH1cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2F0aEZsb2F0aW5nXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGV4cG9ydEFzOiAnYXRoRmxvYXRpbmcnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhGbG9hdGluZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcbiAgLyoqIFRoZSBlbGVtZW50IHRoZSBwYW5lbCBoYW5ncyBmcm9tLiAqL1xuICByZWFkb25seSBhbmNob3IgPSBpbnB1dC5yZXF1aXJlZDxGbG9hdGluZ0FuY2hvcj4oeyBhbGlhczogJ2F0aEZsb2F0aW5nJyB9KTtcbiAgLyoqIGBzdGFydGA6IHN0YXJ0IGVkZ2VzIGxpbmUgdXA7IGBlbmRgOiBlbmQgZWRnZXM7IGBhdXRvYDogc3RhcnQgdW5sZXNzIGl0IG92ZXJmbG93cy4gKi9cbiAgcmVhZG9ubHkgYWxpZ24gPSBpbnB1dDxGbG9hdGluZ0FsaWduPignc3RhcnQnKTtcbiAgLyoqIFByZWZlcnJlZCBzaWRlOyBmbGlwcyB3aGVuIHRoZSBvdGhlciBzaWRlIGhhcyBtb3JlIHJvb20uICovXG4gIHJlYWRvbmx5IHNpZGUgPSBpbnB1dDxGbG9hdGluZ1NpZGU+KCdib3R0b20nKTtcbiAgLyoqIEdhcCBiZXR3ZWVuIGFuY2hvciBhbmQgcGFuZWwsIGluIHB4LiAqL1xuICByZWFkb25seSBvZmZzZXQgPSBpbnB1dCg0KTtcbiAgLyoqIEF0IGxlYXN0IGFzIHdpZGUgYXMgdGhlIGFuY2hvciAoc2VsZWN0cywgY29tYm9ib3hlcykuICovXG4gIHJlYWRvbmx5IG1hdGNoV2lkdGggPSBpbnB1dChmYWxzZSwgeyB0cmFuc2Zvcm06IGJvb2xlYW5BdHRyaWJ1dGUgfSk7XG4gIC8qKiBVcHBlciBib3VuZCBmb3IgdGhlIGhlaWdodCBpbiBweCAodGhlIHZpZXdwb3J0IGNhcHMgaXQgYW55d2F5KS4gKi9cbiAgcmVhZG9ubHkgbWF4SGVpZ2h0ID0gaW5wdXQ8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIC8qKiBQcm9tb3RlIGludG8gdGhlIHRvcCBsYXllciAoZGVmYXVsdCkuIGBmYWxzZWAga2VlcHMgYHBvc2l0aW9uOiBmaXhlZGAgKyBgLS16LXBvcG92ZXJgLiAqL1xuICByZWFkb25seSB0b3BMYXllciA9IGlucHV0KHRydWUsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogQW4gYXJyb3cgZWxlbWVudCBpbnNpZGUgdGhlIHBhbmVsLCBrZXB0IHBvaW50aW5nIGF0IHRoZSBhbmNob3IncyBjZW50cmUuICovXG4gIHJlYWRvbmx5IGFycm93ID0gaW5wdXQ8SFRNTEVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGVsID0gaW5qZWN0PEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+PihFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICBwcml2YXRlIHJlYWRvbmx5IHpvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgcHJpdmF0ZSBjbGVhbnVwOiBGbG9hdGluZ0NsZWFudXAgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSB2aWV3UmVhZHkgPSBmYWxzZTtcblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3UmVhZHkgPSB0cnVlO1xuICAgIHRoaXMuYXR0YWNoKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52aWV3UmVhZHkpIHRoaXMuYXR0YWNoKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFudXA/LigpO1xuICAgIHRoaXMuY2xlYW51cCA9IG51bGw7XG4gIH1cblxuICAvKiogUmUtbWVhc3VyZXMgbm93IChhZnRlciBhIGNvbnRlbnQgY2hhbmdlIHRoZSBSZXNpemVPYnNlcnZlciBjYW5ub3Qgc2VlKS4gKi9cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYW51cD8udXBkYXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFudXA/LigpO1xuICAgIHRoaXMuY2xlYW51cCA9IG51bGw7XG4gICAgY29uc3QgYW5jaG9yID0gcmVzb2x2ZUFuY2hvcih0aGlzLmFuY2hvcigpKTtcbiAgICBpZiAoIWFuY2hvcikgcmV0dXJuO1xuICAgIHRoaXMuY2xlYW51cCA9IHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgICAgZmxvYXRQYW5lbCh0aGlzLmVsLCBhbmNob3IsIHtcbiAgICAgICAgYWxpZ246IHRoaXMuYWxpZ24oKSxcbiAgICAgICAgc2lkZTogdGhpcy5zaWRlKCksXG4gICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQoKSxcbiAgICAgICAgbWF0Y2hXaWR0aDogdGhpcy5tYXRjaFdpZHRoKCksXG4gICAgICAgIG1heEhlaWdodDogdGhpcy5tYXhIZWlnaHQoKSxcbiAgICAgICAgdG9wTGF5ZXI6IHRoaXMudG9wTGF5ZXIoKSxcbiAgICAgICAgYXJyb3c6IHRoaXMuYXJyb3coKSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19