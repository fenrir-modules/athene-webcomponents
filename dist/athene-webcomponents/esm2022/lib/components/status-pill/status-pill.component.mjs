import { ChangeDetectionStrategy, Component, HostBinding, Input, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ATH_STATUS_LABELS } from '@athene/webcomponents/core';
import * as i0 from "@angular/core";
// The status type and label token live in `@athene/webcomponents/core`, so an
// app can provide the token at its root without loading the components.
export { ATH_STATUS_LABELS, } from '@athene/webcomponents/core';
const LABELS = {
    open: 'Open',
    prog: 'In Progress',
    review: 'In Review',
    done: 'Done',
    blocked: 'Blocked',
    closed: 'Closed',
};
/**
 * Status indicator for a ticket: colored inner-ring dot + label.
 *
 * @example
 * <ath-status-pill status="open" />
 * <ath-status-pill status="prog" [showLabel]="false" />
 * <ath-status-pill status="done" size="sm" />
 */
export class AthStatusPillComponent {
    constructor() {
        this.status = 'open';
        this.showDot = true;
        this.showLabel = true;
        this.size = 'md';
        /** Optional override label (otherwise the app's resolver, then the English default). */
        this.label = null;
        this.resolveLabel = inject(ATH_STATUS_LABELS, { optional: true });
    }
    get hostStatus() {
        return this.status;
    }
    get hostSize() {
        return this.size;
    }
    get computedLabel() {
        return this.label ?? this.resolveLabel?.(this.status) ?? LABELS[this.status] ?? this.status;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatusPillComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthStatusPillComponent, isStandalone: true, selector: "ath-status-pill", inputs: { status: "status", showDot: "showDot", showLabel: "showLabel", size: "size", label: "label" }, host: { properties: { "attr.data-status": "this.hostStatus", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatusPillComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-status-pill', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}\n"] }]
        }], propDecorators: { status: [{
                type: Input
            }], showDot: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], size: [{
                type: Input
            }], label: [{
                type: Input
            }], hostStatus: [{
                type: HostBinding,
                args: ['attr.data-status']
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLXBpbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3N0YXR1cy1waWxsL3N0YXR1cy1waWxsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zdGF0dXMtcGlsbC9zdGF0dXMtcGlsbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFxQixNQUFNLDRCQUE0QixDQUFDOztBQUVsRiw4RUFBOEU7QUFDOUUsd0VBQXdFO0FBQ3hFLE9BQU8sRUFDTCxpQkFBaUIsR0FHbEIsTUFBTSw0QkFBNEIsQ0FBQztBQUlwQyxNQUFNLE1BQU0sR0FBMkM7SUFDckQsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsYUFBYTtJQUNuQixNQUFNLEVBQUUsV0FBVztJQUNuQixJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFFRjs7Ozs7OztHQU9HO0FBU0gsTUFBTSxPQUFPLHNCQUFzQjtJQVJuQztRQVNXLFdBQU0sR0FBaUIsTUFBTSxDQUFDO1FBQzlCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLFNBQUksR0FBbUIsSUFBSSxDQUFDO1FBRXJDLHdGQUF3RjtRQUMvRSxVQUFLLEdBQWtCLElBQUksQ0FBQztRQUVwQixpQkFBWSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBYS9FO0lBWEMsSUFBcUMsVUFBVTtRQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQW1DLFFBQVE7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFjLGFBQWE7UUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzlGLENBQUM7K0dBckJVLHNCQUFzQjttR0FBdEIsc0JBQXNCLHVSQzdDbkMsZ0xBTUEsK25DRGtDWSxZQUFZOzs0RkFLWCxzQkFBc0I7a0JBUmxDLFNBQVM7K0JBQ0UsaUJBQWlCLGNBQ2YsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUNOLHVCQUF1QixDQUFDLE1BQU07OEJBS3RDLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUkrQixVQUFVO3NCQUE5QyxXQUFXO3VCQUFDLGtCQUFrQjtnQkFJSSxRQUFRO3NCQUExQyxXQUFXO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBVEhfU1RBVFVTX0xBQkVMUywgdHlwZSBUaWNrZXRTdGF0dXMgfSBmcm9tICdAYXRoZW5lL3dlYmNvbXBvbmVudHMvY29yZSc7XG5cbi8vIFRoZSBzdGF0dXMgdHlwZSBhbmQgbGFiZWwgdG9rZW4gbGl2ZSBpbiBgQGF0aGVuZS93ZWJjb21wb25lbnRzL2NvcmVgLCBzbyBhblxuLy8gYXBwIGNhbiBwcm92aWRlIHRoZSB0b2tlbiBhdCBpdHMgcm9vdCB3aXRob3V0IGxvYWRpbmcgdGhlIGNvbXBvbmVudHMuXG5leHBvcnQge1xuICBBVEhfU1RBVFVTX0xBQkVMUyxcbiAgdHlwZSBTdGF0dXNMYWJlbFJlc29sdmVyLFxuICB0eXBlIFRpY2tldFN0YXR1cyxcbn0gZnJvbSAnQGF0aGVuZS93ZWJjb21wb25lbnRzL2NvcmUnO1xuXG5leHBvcnQgdHlwZSBTdGF0dXNQaWxsU2l6ZSA9ICdzbScgfCAnbWQnO1xuXG5jb25zdCBMQUJFTFM6IFJlYWRvbmx5PFJlY29yZDxUaWNrZXRTdGF0dXMsIHN0cmluZz4+ID0ge1xuICBvcGVuOiAnT3BlbicsXG4gIHByb2c6ICdJbiBQcm9ncmVzcycsXG4gIHJldmlldzogJ0luIFJldmlldycsXG4gIGRvbmU6ICdEb25lJyxcbiAgYmxvY2tlZDogJ0Jsb2NrZWQnLFxuICBjbG9zZWQ6ICdDbG9zZWQnLFxufTtcblxuLyoqXG4gKiBTdGF0dXMgaW5kaWNhdG9yIGZvciBhIHRpY2tldDogY29sb3JlZCBpbm5lci1yaW5nIGRvdCArIGxhYmVsLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXN0YXR1cy1waWxsIHN0YXR1cz1cIm9wZW5cIiAvPlxuICogPGF0aC1zdGF0dXMtcGlsbCBzdGF0dXM9XCJwcm9nXCIgW3Nob3dMYWJlbF09XCJmYWxzZVwiIC8+XG4gKiA8YXRoLXN0YXR1cy1waWxsIHN0YXR1cz1cImRvbmVcIiBzaXplPVwic21cIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtc3RhdHVzLXBpbGwnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9zdGF0dXMtcGlsbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9zdGF0dXMtcGlsbC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFN0YXR1c1BpbGxDb21wb25lbnQge1xuICBASW5wdXQoKSBzdGF0dXM6IFRpY2tldFN0YXR1cyA9ICdvcGVuJztcbiAgQElucHV0KCkgc2hvd0RvdCA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dMYWJlbCA9IHRydWU7XG4gIEBJbnB1dCgpIHNpemU6IFN0YXR1c1BpbGxTaXplID0gJ21kJztcblxuICAvKiogT3B0aW9uYWwgb3ZlcnJpZGUgbGFiZWwgKG90aGVyd2lzZSB0aGUgYXBwJ3MgcmVzb2x2ZXIsIHRoZW4gdGhlIEVuZ2xpc2ggZGVmYXVsdCkuICovXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIHJlYWRvbmx5IHJlc29sdmVMYWJlbCA9IGluamVjdChBVEhfU1RBVFVTX0xBQkVMUywgeyBvcHRpb25hbDogdHJ1ZSB9KTtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1zdGF0dXMnKSBnZXQgaG9zdFN0YXR1cygpOiBUaWNrZXRTdGF0dXMge1xuICAgIHJldHVybiB0aGlzLnN0YXR1cztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLXNpemUnKSBnZXQgaG9zdFNpemUoKTogU3RhdHVzUGlsbFNpemUge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGNvbXB1dGVkTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbCA/PyB0aGlzLnJlc29sdmVMYWJlbD8uKHRoaXMuc3RhdHVzKSA/PyBMQUJFTFNbdGhpcy5zdGF0dXNdID8/IHRoaXMuc3RhdHVzO1xuICB9XG59XG4iLCJAaWYgKHNob3dEb3QpIHtcbiAgPGkgY2xhc3M9XCJhdGgtc3RhdHVzLXBpbGxfX2RvdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbn1cbkBpZiAoc2hvd0xhYmVsKSB7XG4gIDxzcGFuIGNsYXNzPVwiYXRoLXN0YXR1cy1waWxsX19sYWJlbFwiPnt7IGNvbXB1dGVkTGFiZWwgfX08L3NwYW4+XG59XG4iXX0=