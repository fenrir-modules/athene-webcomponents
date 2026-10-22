import { ChangeDetectionStrategy, Component, HostBinding, InjectionToken, Input, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
const LABELS = {
    open: 'Open',
    prog: 'In Progress',
    review: 'In Review',
    done: 'Done',
    blocked: 'Blocked',
    closed: 'Closed',
};
export const ATH_STATUS_LABELS = new InjectionToken('ATH_STATUS_LABELS');
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthStatusPillComponent, isStandalone: true, selector: "ath-status-pill", inputs: { status: "status", showDot: "showDot", showLabel: "showLabel", size: "size", label: "label" }, host: { properties: { "attr.data-status": "this.hostStatus", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}[data-theme=dark] :host .ath-status-pill__dot{box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatusPillComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-status-pill', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}[data-theme=dark] :host .ath-status-pill__dot{box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLXBpbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3N0YXR1cy1waWxsL3N0YXR1cy1waWxsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zdGF0dXMtcGlsbC9zdGF0dXMtcGlsbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxXQUFXLEVBQ1gsY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUsvQyxNQUFNLE1BQU0sR0FBMkM7SUFDckQsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsYUFBYTtJQUNuQixNQUFNLEVBQUUsV0FBVztJQUNuQixJQUFJLEVBQUUsTUFBTTtJQUNaLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLE1BQU0sRUFBRSxRQUFRO0NBQ2pCLENBQUM7QUFhRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBc0IsbUJBQW1CLENBQUMsQ0FBQztBQUU5Rjs7Ozs7OztHQU9HO0FBU0gsTUFBTSxPQUFPLHNCQUFzQjtJQVJuQztRQVNXLFdBQU0sR0FBaUIsTUFBTSxDQUFDO1FBQzlCLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLFNBQUksR0FBbUIsSUFBSSxDQUFDO1FBRXJDLHdGQUF3RjtRQUMvRSxVQUFLLEdBQWtCLElBQUksQ0FBQztRQUVwQixpQkFBWSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBYS9FO0lBWEMsSUFBcUMsVUFBVTtRQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUVELElBQW1DLFFBQVE7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFjLGFBQWE7UUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzlGLENBQUM7K0dBckJVLHNCQUFzQjttR0FBdEIsc0JBQXNCLHVSQ25EbkMsZ0xBTUEsMnVDRHdDWSxZQUFZOzs0RkFLWCxzQkFBc0I7a0JBUmxDLFNBQVM7K0JBQ0UsaUJBQWlCLGNBQ2YsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUNOLHVCQUF1QixDQUFDLE1BQU07OEJBS3RDLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUkrQixVQUFVO3NCQUE5QyxXQUFXO3VCQUFDLGtCQUFrQjtnQkFJSSxRQUFRO3NCQUExQyxXQUFXO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5wdXQsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgdHlwZSBUaWNrZXRTdGF0dXMgPSAnb3BlbicgfCAncHJvZycgfCAncmV2aWV3JyB8ICdkb25lJyB8ICdibG9ja2VkJyB8ICdjbG9zZWQnO1xuZXhwb3J0IHR5cGUgU3RhdHVzUGlsbFNpemUgPSAnc20nIHwgJ21kJztcblxuY29uc3QgTEFCRUxTOiBSZWFkb25seTxSZWNvcmQ8VGlja2V0U3RhdHVzLCBzdHJpbmc+PiA9IHtcbiAgb3BlbjogJ09wZW4nLFxuICBwcm9nOiAnSW4gUHJvZ3Jlc3MnLFxuICByZXZpZXc6ICdJbiBSZXZpZXcnLFxuICBkb25lOiAnRG9uZScsXG4gIGJsb2NrZWQ6ICdCbG9ja2VkJyxcbiAgY2xvc2VkOiAnQ2xvc2VkJyxcbn07XG5cbi8qKlxuICogTmFtZXMgYSBzdGF0dXMgaW4gdGhlIHJlYWRlcidzIGxhbmd1YWdlLlxuICpcbiAqIFRoZSBsaWJyYXJ5IHN0YXlzIGZyZWUgb2YgYW55IHRyYW5zbGF0aW9uIGZyYW1ld29yazogdGhlIGFwcCBwcm92aWRlc1xuICogdGhpcyBvbmNlIGF0IHRoZSByb290LCBhbmQgZXZlcnkgcGlsbCB3aXRob3V0IGFuIGV4cGxpY2l0IGBsYWJlbGAgYXNrc1xuICogaXQuIFJldHVybiBgbnVsbGAgdG8gZmFsbCBiYWNrIHRvIHRoZSBFbmdsaXNoIGRlZmF1bHQuIEEgcmVzb2x2ZXIgdGhhdFxuICogcmVhZHMgYSBzaWduYWwgKHRoZSBjdXJyZW50IGxhbmd1YWdlKSBrZWVwcyBPblB1c2ggcGlsbHMgY3VycmVudCB3aGVuXG4gKiB0aGUgbGFuZ3VhZ2UgY2hhbmdlcy5cbiAqL1xuZXhwb3J0IHR5cGUgU3RhdHVzTGFiZWxSZXNvbHZlciA9IChzdGF0dXM6IFRpY2tldFN0YXR1cykgPT4gc3RyaW5nIHwgbnVsbDtcblxuZXhwb3J0IGNvbnN0IEFUSF9TVEFUVVNfTEFCRUxTID0gbmV3IEluamVjdGlvblRva2VuPFN0YXR1c0xhYmVsUmVzb2x2ZXI+KCdBVEhfU1RBVFVTX0xBQkVMUycpO1xuXG4vKipcbiAqIFN0YXR1cyBpbmRpY2F0b3IgZm9yIGEgdGlja2V0OiBjb2xvcmVkIGlubmVyLXJpbmcgZG90ICsgbGFiZWwuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtc3RhdHVzLXBpbGwgc3RhdHVzPVwib3BlblwiIC8+XG4gKiA8YXRoLXN0YXR1cy1waWxsIHN0YXR1cz1cInByb2dcIiBbc2hvd0xhYmVsXT1cImZhbHNlXCIgLz5cbiAqIDxhdGgtc3RhdHVzLXBpbGwgc3RhdHVzPVwiZG9uZVwiIHNpemU9XCJzbVwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1zdGF0dXMtcGlsbCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3N0YXR1cy1waWxsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3N0YXR1cy1waWxsLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoU3RhdHVzUGlsbENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHN0YXR1czogVGlja2V0U3RhdHVzID0gJ29wZW4nO1xuICBASW5wdXQoKSBzaG93RG90ID0gdHJ1ZTtcbiAgQElucHV0KCkgc2hvd0xhYmVsID0gdHJ1ZTtcbiAgQElucHV0KCkgc2l6ZTogU3RhdHVzUGlsbFNpemUgPSAnbWQnO1xuXG4gIC8qKiBPcHRpb25hbCBvdmVycmlkZSBsYWJlbCAob3RoZXJ3aXNlIHRoZSBhcHAncyByZXNvbHZlciwgdGhlbiB0aGUgRW5nbGlzaCBkZWZhdWx0KS4gKi9cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcmVzb2x2ZUxhYmVsID0gaW5qZWN0KEFUSF9TVEFUVVNfTEFCRUxTLCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLXN0YXR1cycpIGdldCBob3N0U3RhdHVzKCk6IFRpY2tldFN0YXR1cyB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRhdGEtc2l6ZScpIGdldCBob3N0U2l6ZSgpOiBTdGF0dXNQaWxsU2l6ZSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgY29tcHV0ZWRMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxhYmVsID8/IHRoaXMucmVzb2x2ZUxhYmVsPy4odGhpcy5zdGF0dXMpID8/IExBQkVMU1t0aGlzLnN0YXR1c10gPz8gdGhpcy5zdGF0dXM7XG4gIH1cbn1cbiIsIkBpZiAoc2hvd0RvdCkge1xuICA8aSBjbGFzcz1cImF0aC1zdGF0dXMtcGlsbF9fZG90XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxufVxuQGlmIChzaG93TGFiZWwpIHtcbiAgPHNwYW4gY2xhc3M9XCJhdGgtc3RhdHVzLXBpbGxfX2xhYmVsXCI+e3sgY29tcHV0ZWRMYWJlbCB9fTwvc3Bhbj5cbn1cbiJdfQ==