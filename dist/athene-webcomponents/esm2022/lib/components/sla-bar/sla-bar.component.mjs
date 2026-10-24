import { ChangeDetectionStrategy, Component, HostBinding, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * SLA progress widget. Two rows (response + resolution) and a progress bar
 * for the active (pending) one.
 *
 * The color of the bar transitions:
 *   < 80% → green / accent
 *   80-95% → amber (warn)
 *   ≥ 95% → red (breach)
 *
 * @example
 * <ath-sla-bar
 *   [response]="{label:'Response',  status:'met',     text:'met · 24m'}"
 *   [resolution]="{label:'Resolution', status:'pending', text:'6h 12m left'}"
 *   [progressPct]="68" />
 */
export class AthSlaBarComponent {
    constructor() {
        this.response = null;
        this.resolution = null;
        this._progress = signal(0);
        this.severity = computed(() => {
            const r = this.resolution?.status;
            const rs = this.response?.status;
            if (r === 'breached' || rs === 'breached')
                return 'breached';
            if (this._progress() >= 95)
                return 'breached';
            if (this._progress() >= 80)
                return 'pending';
            if (r === 'met' && rs === 'met')
                return 'met';
            return 'pending';
        });
    }
    /** 0..100. The progress bar reflects the most "at risk" target. */
    set progressPct(value) {
        this._progress.set(Math.max(0, Math.min(100, value)));
    }
    get progressPct() {
        return this._progress();
    }
    get hostSeverity() {
        return this.severity();
    }
    statusColor(s) {
        switch (s) {
            case 'met': return 'var(--green)';
            case 'breached': return 'var(--red)';
            case 'pending':
            default: return 'var(--amber)';
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSlaBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSlaBarComponent, isStandalone: true, selector: "ath-sla-bar", inputs: { response: "response", resolution: "resolution", progressPct: "progressPct" }, host: { properties: { "attr.data-severity": "this.hostSeverity" } }, ngImport: i0, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{ response.text }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{ resolution.text }}</span>\n  </div>\n}\n<div class=\"ath-sla__track\" role=\"progressbar\"\n     [attr.aria-label]=\"(resolution ?? response)?.label ?? null\"\n     [attr.aria-valuetext]=\"(resolution ?? response)?.text ?? null\"\n     [attr.aria-valuenow]=\"progressPct\" aria-valuemin=\"0\" aria-valuemax=\"100\">\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSlaBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sla-bar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{ response.text }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{ resolution.text }}</span>\n  </div>\n}\n<div class=\"ath-sla__track\" role=\"progressbar\"\n     [attr.aria-label]=\"(resolution ?? response)?.label ?? null\"\n     [attr.aria-valuetext]=\"(resolution ?? response)?.text ?? null\"\n     [attr.aria-valuenow]=\"progressPct\" aria-valuemin=\"0\" aria-valuemax=\"100\">\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"] }]
        }], propDecorators: { response: [{
                type: Input
            }], resolution: [{
                type: Input
            }], progressPct: [{
                type: Input
            }], hostSeverity: [{
                type: HostBinding,
                args: ['attr.data-severity']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvc2xhLWJhci9zbGEtYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zbGEtYmFyL3NsYS1iYXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQWEvQzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQVNILE1BQU0sT0FBTyxrQkFBa0I7SUFSL0I7UUFTVyxhQUFRLEdBQXFCLElBQUksQ0FBQztRQUNsQyxlQUFVLEdBQXFCLElBQUksQ0FBQztRQVc1QixjQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBCLGFBQVEsR0FBRyxRQUFRLENBQVksR0FBRyxFQUFFO1lBQ3JELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO1lBQ2xDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLFVBQVUsSUFBSSxFQUFFLEtBQUssVUFBVTtnQkFBRSxPQUFPLFVBQVUsQ0FBQztZQUM3RCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO2dCQUFFLE9BQU8sVUFBVSxDQUFDO1lBQzlDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUU7Z0JBQUUsT0FBTyxTQUFTLENBQUM7WUFDN0MsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUUsS0FBSyxLQUFLO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQzlDLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0tBY0o7SUFqQ0MsbUVBQW1FO0lBQ25FLElBQ0ksV0FBVyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBY0QsSUFBdUMsWUFBWTtRQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVMsV0FBVyxDQUFDLENBQVk7UUFDaEMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUNWLEtBQUssS0FBSyxDQUFDLENBQUMsT0FBTyxjQUFjLENBQUM7WUFDbEMsS0FBSyxVQUFVLENBQUMsQ0FBQyxPQUFPLFlBQVksQ0FBQztZQUNyQyxLQUFLLFNBQVMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxDQUFDLE9BQU8sY0FBYyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDOytHQXBDVSxrQkFBa0I7bUdBQWxCLGtCQUFrQixvT0NyQy9CLG8wQkFrQkEsbTFCRGNZLFlBQVk7OzRGQUtYLGtCQUFrQjtrQkFSOUIsU0FBUzsrQkFDRSxhQUFhLGNBQ1gsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUNOLHVCQUF1QixDQUFDLE1BQU07OEJBS3RDLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFJRixXQUFXO3NCQURkLEtBQUs7Z0JBb0JpQyxZQUFZO3NCQUFsRCxXQUFXO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgY29tcHV0ZWQsIHNpZ25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IHR5cGUgU2xhU3RhdHVzID0gJ21ldCcgfCAncGVuZGluZycgfCAnYnJlYWNoZWQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNsYVRhcmdldCB7XG4gIC8qKiBEaXNwbGF5IGxhYmVsIChlLmcuLCBcIlJlc3BvbnNlXCIsIFwiUmVzb2x1dGlvblwiKS4gKi9cbiAgbGFiZWw6IHN0cmluZztcbiAgLyoqIFN0YXR1cyBvZiB0aGlzIFNMQS4gKi9cbiAgc3RhdHVzOiBTbGFTdGF0dXM7XG4gIC8qKiBQcmUtZm9ybWF0dGVkIGRldGFpbCB0ZXh0IChlLmcuLCBcIm1ldCDCtyAyNG1cIiwgXCI2aCAxMm0gbGVmdFwiKS4gKi9cbiAgdGV4dDogc3RyaW5nO1xufVxuXG4vKipcbiAqIFNMQSBwcm9ncmVzcyB3aWRnZXQuIFR3byByb3dzIChyZXNwb25zZSArIHJlc29sdXRpb24pIGFuZCBhIHByb2dyZXNzIGJhclxuICogZm9yIHRoZSBhY3RpdmUgKHBlbmRpbmcpIG9uZS5cbiAqXG4gKiBUaGUgY29sb3Igb2YgdGhlIGJhciB0cmFuc2l0aW9uczpcbiAqICAgPCA4MCUg4oaSIGdyZWVuIC8gYWNjZW50XG4gKiAgIDgwLTk1JSDihpIgYW1iZXIgKHdhcm4pXG4gKiAgIOKJpSA5NSUg4oaSIHJlZCAoYnJlYWNoKVxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXNsYS1iYXJcbiAqICAgW3Jlc3BvbnNlXT1cIntsYWJlbDonUmVzcG9uc2UnLCAgc3RhdHVzOidtZXQnLCAgICAgdGV4dDonbWV0IMK3IDI0bSd9XCJcbiAqICAgW3Jlc29sdXRpb25dPVwie2xhYmVsOidSZXNvbHV0aW9uJywgc3RhdHVzOidwZW5kaW5nJywgdGV4dDonNmggMTJtIGxlZnQnfVwiXG4gKiAgIFtwcm9ncmVzc1BjdF09XCI2OFwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1zbGEtYmFyJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vc2xhLWJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9zbGEtYmFyLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoU2xhQmFyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcmVzcG9uc2U6IFNsYVRhcmdldCB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSByZXNvbHV0aW9uOiBTbGFUYXJnZXQgfCBudWxsID0gbnVsbDtcblxuICAvKiogMC4uMTAwLiBUaGUgcHJvZ3Jlc3MgYmFyIHJlZmxlY3RzIHRoZSBtb3N0IFwiYXQgcmlza1wiIHRhcmdldC4gKi9cbiAgQElucHV0KClcbiAgc2V0IHByb2dyZXNzUGN0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl9wcm9ncmVzcy5zZXQoTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB2YWx1ZSkpKTtcbiAgfVxuICBnZXQgcHJvZ3Jlc3NQY3QoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3MoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZG9ubHkgX3Byb2dyZXNzID0gc2lnbmFsKDApO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzZXZlcml0eSA9IGNvbXB1dGVkPFNsYVN0YXR1cz4oKCkgPT4ge1xuICAgIGNvbnN0IHIgPSB0aGlzLnJlc29sdXRpb24/LnN0YXR1cztcbiAgICBjb25zdCBycyA9IHRoaXMucmVzcG9uc2U/LnN0YXR1cztcbiAgICBpZiAociA9PT0gJ2JyZWFjaGVkJyB8fCBycyA9PT0gJ2JyZWFjaGVkJykgcmV0dXJuICdicmVhY2hlZCc7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzKCkgPj0gOTUpIHJldHVybiAnYnJlYWNoZWQnO1xuICAgIGlmICh0aGlzLl9wcm9ncmVzcygpID49IDgwKSByZXR1cm4gJ3BlbmRpbmcnO1xuICAgIGlmIChyID09PSAnbWV0JyAmJiBycyA9PT0gJ21ldCcpIHJldHVybiAnbWV0JztcbiAgICByZXR1cm4gJ3BlbmRpbmcnO1xuICB9KTtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1zZXZlcml0eScpIGdldCBob3N0U2V2ZXJpdHkoKTogU2xhU3RhdHVzIHtcbiAgICByZXR1cm4gdGhpcy5zZXZlcml0eSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN0YXR1c0NvbG9yKHM6IFNsYVN0YXR1cyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChzKSB7XG4gICAgICBjYXNlICdtZXQnOiByZXR1cm4gJ3ZhcigtLWdyZWVuKSc7XG4gICAgICBjYXNlICdicmVhY2hlZCc6IHJldHVybiAndmFyKC0tcmVkKSc7XG4gICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgIGRlZmF1bHQ6IHJldHVybiAndmFyKC0tYW1iZXIpJztcbiAgICB9XG4gIH1cbn1cbiIsIkBpZiAocmVzcG9uc2UpIHtcbiAgPGRpdiBjbGFzcz1cImF0aC1zbGFfX3Jvd1wiPlxuICAgIDxzcGFuIGNsYXNzPVwiYXRoLXNsYV9fbmFtZVwiPnt7IHJlc3BvbnNlLmxhYmVsIH19PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiYXRoLXNsYV9fdGV4dFwiIFtzdHlsZS5jb2xvcl09XCJzdGF0dXNDb2xvcihyZXNwb25zZS5zdGF0dXMpXCI+e3sgcmVzcG9uc2UudGV4dCB9fTwvc3Bhbj5cbiAgPC9kaXY+XG59XG5AaWYgKHJlc29sdXRpb24pIHtcbiAgPGRpdiBjbGFzcz1cImF0aC1zbGFfX3Jvd1wiPlxuICAgIDxzcGFuIGNsYXNzPVwiYXRoLXNsYV9fbmFtZVwiPnt7IHJlc29sdXRpb24ubGFiZWwgfX08L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJhdGgtc2xhX190ZXh0XCIgW3N0eWxlLmNvbG9yXT1cInN0YXR1c0NvbG9yKHJlc29sdXRpb24uc3RhdHVzKVwiPnt7IHJlc29sdXRpb24udGV4dCB9fTwvc3Bhbj5cbiAgPC9kaXY+XG59XG48ZGl2IGNsYXNzPVwiYXRoLXNsYV9fdHJhY2tcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIlxuICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIihyZXNvbHV0aW9uID8/IHJlc3BvbnNlKT8ubGFiZWwgPz8gbnVsbFwiXG4gICAgIFthdHRyLmFyaWEtdmFsdWV0ZXh0XT1cIihyZXNvbHV0aW9uID8/IHJlc3BvbnNlKT8udGV4dCA/PyBudWxsXCJcbiAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJwcm9ncmVzc1BjdFwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiPlxuICA8ZGl2IGNsYXNzPVwiYXRoLXNsYV9fZmlsbFwiIFtzdHlsZS53aWR0aC4lXT1cInByb2dyZXNzUGN0XCI+PC9kaXY+XG48L2Rpdj5cbiJdfQ==