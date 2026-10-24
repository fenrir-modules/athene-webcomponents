import { Directive, ElementRef, effect, inject } from '@angular/core';
import { focusTarget } from './focus';
import * as i0 from "@angular/core";
let nextTriggerId = 0;
/**
 * Shared part of `athPopoverTrigger` and `athMenuTrigger`: keeps
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control.
 * On a wrapper component such as `<ath-button>` that is its inner `<button>`,
 * so there is one tab stop and the state is announced where focus is.
 */
export class AthOverlayTriggerBase {
    constructor() {
        this.host = inject(ElementRef).nativeElement;
        effect(() => this.syncAria(this.isOpen()));
    }
    /** The focusable control the attributes go on. */
    get control() {
        return focusTarget(this.host);
    }
    /** A stable id on the control, for `aria-labelledby` of the popup. */
    controlId() {
        const el = this.control;
        if (!el.id)
            el.id = `ath-trigger-${++nextTriggerId}`;
        return el.id;
    }
    syncAria(open) {
        const el = this.control;
        el.setAttribute('aria-haspopup', this.popupKind());
        el.setAttribute('aria-expanded', String(open));
        if (open)
            el.setAttribute('aria-controls', this.popupId());
        else
            el.removeAttribute('aria-controls');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayTriggerBase, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.14", type: AthOverlayTriggerBase, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayTriggerBase, decorators: [{
            type: Directive
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9mbG9hdGluZy90cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7QUFFdEMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBRXRCOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFnQixxQkFBcUI7SUFRekM7UUFQbUIsU0FBSSxHQUFHLE1BQU0sQ0FBMEIsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDO1FBUWxGLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELGtEQUFrRDtJQUNsRCxJQUFJLE9BQU87UUFDVCxPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELHNFQUFzRTtJQUN0RSxTQUFTO1FBQ1AsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLGVBQWUsRUFBRSxhQUFhLEVBQUUsQ0FBQztRQUNyRCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRU8sUUFBUSxDQUFDLElBQWE7UUFDNUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUk7WUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7WUFDdEQsRUFBRSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzQyxDQUFDOytHQTlCbUIscUJBQXFCO21HQUFyQixxQkFBcUI7OzRGQUFyQixxQkFBcUI7a0JBRDFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGVmZmVjdCwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb2N1c1RhcmdldCB9IGZyb20gJy4vZm9jdXMnO1xuXG5sZXQgbmV4dFRyaWdnZXJJZCA9IDA7XG5cbi8qKlxuICogU2hhcmVkIHBhcnQgb2YgYGF0aFBvcG92ZXJUcmlnZ2VyYCBhbmQgYGF0aE1lbnVUcmlnZ2VyYDoga2VlcHNcbiAqIGBhcmlhLWhhc3BvcHVwYCwgYGFyaWEtZXhwYW5kZWRgIGFuZCBgYXJpYS1jb250cm9sc2Agb24gdGhlIHJlYWwgY29udHJvbC5cbiAqIE9uIGEgd3JhcHBlciBjb21wb25lbnQgc3VjaCBhcyBgPGF0aC1idXR0b24+YCB0aGF0IGlzIGl0cyBpbm5lciBgPGJ1dHRvbj5gLFxuICogc28gdGhlcmUgaXMgb25lIHRhYiBzdG9wIGFuZCB0aGUgc3RhdGUgaXMgYW5ub3VuY2VkIHdoZXJlIGZvY3VzIGlzLlxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdGhPdmVybGF5VHJpZ2dlckJhc2Uge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgaG9zdCA9IGluamVjdDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj4oRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcblxuICAvKiogVGhlIHZhbHVlIG9mIGBhcmlhLWhhc3BvcHVwYC4gKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHBvcHVwS2luZCgpOiBzdHJpbmc7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBpc09wZW4oKTogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHBvcHVwSWQoKTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGVmZmVjdCgoKSA9PiB0aGlzLnN5bmNBcmlhKHRoaXMuaXNPcGVuKCkpKTtcbiAgfVxuXG4gIC8qKiBUaGUgZm9jdXNhYmxlIGNvbnRyb2wgdGhlIGF0dHJpYnV0ZXMgZ28gb24uICovXG4gIGdldCBjb250cm9sKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gZm9jdXNUYXJnZXQodGhpcy5ob3N0KTtcbiAgfVxuXG4gIC8qKiBBIHN0YWJsZSBpZCBvbiB0aGUgY29udHJvbCwgZm9yIGBhcmlhLWxhYmVsbGVkYnlgIG9mIHRoZSBwb3B1cC4gKi9cbiAgY29udHJvbElkKCk6IHN0cmluZyB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmNvbnRyb2w7XG4gICAgaWYgKCFlbC5pZCkgZWwuaWQgPSBgYXRoLXRyaWdnZXItJHsrK25leHRUcmlnZ2VySWR9YDtcbiAgICByZXR1cm4gZWwuaWQ7XG4gIH1cblxuICBwcml2YXRlIHN5bmNBcmlhKG9wZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBlbCA9IHRoaXMuY29udHJvbDtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGFzcG9wdXAnLCB0aGlzLnBvcHVwS2luZCgpKTtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBTdHJpbmcob3BlbikpO1xuICAgIGlmIChvcGVuKSBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnLCB0aGlzLnBvcHVwSWQoKSk7XG4gICAgZWxzZSBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgfVxufVxuIl19