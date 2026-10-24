import { Directive, input } from '@angular/core';
import { AthOverlayTriggerBase } from '../floating/trigger';
import * as i0 from "@angular/core";
/**
 * Opens an `ath-popover` from a button and anchors it there. Sets
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control
 * (the inner `<button>` of an `<ath-button>`).
 *
 * @example
 * <button type="button" [athPopoverTrigger]="pop">Filter</button>
 * <ath-popover #pop ariaLabel="Filter">…</ath-popover>
 */
export class AthPopoverTriggerDirective extends AthOverlayTriggerBase {
    constructor() {
        super(...arguments);
        this.popover = input.required({ alias: 'athPopoverTrigger' });
        /** `aria-haspopup` value; `listbox` for a picker without a search field. */
        this.popupType = input('dialog');
    }
    popupKind() {
        return this.popupType();
    }
    isOpen() {
        return this.popover().open();
    }
    popupId() {
        return this.popover().panelId();
    }
    onClick() {
        this.popover().toggle(this.host);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverTriggerDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.14", type: AthPopoverTriggerDirective, isStandalone: true, selector: "[athPopoverTrigger]", inputs: { popover: { classPropertyName: "popover", publicName: "athPopoverTrigger", isSignal: true, isRequired: true, transformFunction: null }, popupType: { classPropertyName: "popupType", publicName: "popupType", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "onClick()" } }, exportAs: ["athPopoverTrigger"], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[athPopoverTrigger]',
                    standalone: true,
                    exportAs: 'athPopoverTrigger',
                    host: {
                        '(click)': 'onClick()',
                    },
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXItdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBTTVEOzs7Ozs7OztHQVFHO0FBU0gsTUFBTSxPQUFPLDBCQUEyQixTQUFRLHFCQUFxQjtJQVJyRTs7UUFTVyxZQUFPLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBc0IsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLDRFQUE0RTtRQUNuRSxjQUFTLEdBQUcsS0FBSyxDQUFzQixRQUFRLENBQUMsQ0FBQztLQWlCM0Q7SUFmVyxTQUFTO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFUyxNQUFNO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVTLE9BQU87UUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRVMsT0FBTztRQUNmLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7K0dBbkJVLDBCQUEwQjttR0FBMUIsMEJBQTBCOzs0RkFBMUIsMEJBQTBCO2tCQVJ0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixJQUFJLEVBQUU7d0JBQ0osU0FBUyxFQUFFLFdBQVc7cUJBQ3ZCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBpbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXRoT3ZlcmxheVRyaWdnZXJCYXNlIH0gZnJvbSAnLi4vZmxvYXRpbmcvdHJpZ2dlcic7XG5pbXBvcnQgeyBBdGhQb3BvdmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLmNvbXBvbmVudCc7XG5cbi8qKiBUaGUgYGFyaWEtaGFzcG9wdXBgIHZhbHVlIG9mIGEgcG9wb3ZlciB0cmlnZ2VyLiAqL1xuZXhwb3J0IHR5cGUgUG9wb3ZlclRyaWdnZXJQb3B1cCA9ICdkaWFsb2cnIHwgJ2xpc3Rib3gnIHwgJ21lbnUnO1xuXG4vKipcbiAqIE9wZW5zIGFuIGBhdGgtcG9wb3ZlcmAgZnJvbSBhIGJ1dHRvbiBhbmQgYW5jaG9ycyBpdCB0aGVyZS4gU2V0c1xuICogYGFyaWEtaGFzcG9wdXBgLCBgYXJpYS1leHBhbmRlZGAgYW5kIGBhcmlhLWNvbnRyb2xzYCBvbiB0aGUgcmVhbCBjb250cm9sXG4gKiAodGhlIGlubmVyIGA8YnV0dG9uPmAgb2YgYW4gYDxhdGgtYnV0dG9uPmApLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbYXRoUG9wb3ZlclRyaWdnZXJdPVwicG9wXCI+RmlsdGVyPC9idXR0b24+XG4gKiA8YXRoLXBvcG92ZXIgI3BvcCBhcmlhTGFiZWw9XCJGaWx0ZXJcIj7igKY8L2F0aC1wb3BvdmVyPlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXRoUG9wb3ZlclRyaWdnZXJdJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgZXhwb3J0QXM6ICdhdGhQb3BvdmVyVHJpZ2dlcicsXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBdGhQb3BvdmVyVHJpZ2dlckRpcmVjdGl2ZSBleHRlbmRzIEF0aE92ZXJsYXlUcmlnZ2VyQmFzZSB7XG4gIHJlYWRvbmx5IHBvcG92ZXIgPSBpbnB1dC5yZXF1aXJlZDxBdGhQb3BvdmVyQ29tcG9uZW50Pih7IGFsaWFzOiAnYXRoUG9wb3ZlclRyaWdnZXInIH0pO1xuICAvKiogYGFyaWEtaGFzcG9wdXBgIHZhbHVlOyBgbGlzdGJveGAgZm9yIGEgcGlja2VyIHdpdGhvdXQgYSBzZWFyY2ggZmllbGQuICovXG4gIHJlYWRvbmx5IHBvcHVwVHlwZSA9IGlucHV0PFBvcG92ZXJUcmlnZ2VyUG9wdXA+KCdkaWFsb2cnKTtcblxuICBwcm90ZWN0ZWQgcG9wdXBLaW5kKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucG9wdXBUeXBlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBvcG92ZXIoKS5vcGVuKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcG9wdXBJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBvcG92ZXIoKS5wYW5lbElkKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLnBvcG92ZXIoKS50b2dnbGUodGhpcy5ob3N0KTtcbiAgfVxufVxuIl19