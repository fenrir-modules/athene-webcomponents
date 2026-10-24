import { ChangeDetectionStrategy, Component, HostBinding, Input, computed, signal, } from '@angular/core';
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
            case 'met':
                return 'var(--green-text)';
            case 'breached':
                return 'var(--red-text)';
            case 'pending':
            default:
                return 'var(--amber-text)';
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSlaBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSlaBarComponent, isStandalone: true, selector: "ath-sla-bar", inputs: { response: "response", resolution: "resolution", progressPct: "progressPct" }, host: { properties: { "attr.data-severity": "this.hostSeverity" } }, ngImport: i0, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{\n      response.text\n    }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{\n      resolution.text\n    }}</span>\n  </div>\n}\n<div\n  class=\"ath-sla__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"(resolution ?? response)?.label ?? null\"\n  [attr.aria-valuetext]=\"(resolution ?? response)?.text ?? null\"\n  [attr.aria-valuenow]=\"progressPct\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSlaBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sla-bar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{\n      response.text\n    }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{\n      resolution.text\n    }}</span>\n  </div>\n}\n<div\n  class=\"ath-sla__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"(resolution ?? response)?.label ?? null\"\n  [attr.aria-valuetext]=\"(resolution ?? response)?.text ?? null\"\n  [attr.aria-valuenow]=\"progressPct\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvc2xhLWJhci9zbGEtYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zbGEtYmFyL3NsYS1iYXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFhL0M7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFTSCxNQUFNLE9BQU8sa0JBQWtCO0lBUi9CO1FBU1csYUFBUSxHQUFxQixJQUFJLENBQUM7UUFDbEMsZUFBVSxHQUFxQixJQUFJLENBQUM7UUFXNUIsY0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQixhQUFRLEdBQUcsUUFBUSxDQUFZLEdBQUcsRUFBRTtZQUNyRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQztZQUNsQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxVQUFVLElBQUksRUFBRSxLQUFLLFVBQVU7Z0JBQUUsT0FBTyxVQUFVLENBQUM7WUFDN0QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRTtnQkFBRSxPQUFPLFVBQVUsQ0FBQztZQUM5QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO2dCQUFFLE9BQU8sU0FBUyxDQUFDO1lBQzdDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFLEtBQUssS0FBSztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUM5QyxPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztLQWlCSjtJQXBDQyxtRUFBbUU7SUFDbkUsSUFDSSxXQUFXLENBQUMsS0FBYTtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUNELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFjRCxJQUF1QyxZQUFZO1FBQ2pELE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFUyxXQUFXLENBQUMsQ0FBWTtRQUNoQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQ1YsS0FBSyxLQUFLO2dCQUNSLE9BQU8sbUJBQW1CLENBQUM7WUFDN0IsS0FBSyxVQUFVO2dCQUNiLE9BQU8saUJBQWlCLENBQUM7WUFDM0IsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDRSxPQUFPLG1CQUFtQixDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDOytHQXZDVSxrQkFBa0I7bUdBQWxCLGtCQUFrQixvT0M1Qy9CLGkyQkEyQkEsbTFCRFlZLFlBQVk7OzRGQUtYLGtCQUFrQjtrQkFSOUIsU0FBUzsrQkFDRSxhQUFhLGNBQ1gsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUNOLHVCQUF1QixDQUFDLE1BQU07OEJBS3RDLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFJRixXQUFXO3NCQURkLEtBQUs7Z0JBb0JpQyxZQUFZO3NCQUFsRCxXQUFXO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgY29tcHV0ZWQsXG4gIHNpZ25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgdHlwZSBTbGFTdGF0dXMgPSAnbWV0JyB8ICdwZW5kaW5nJyB8ICdicmVhY2hlZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2xhVGFyZ2V0IHtcbiAgLyoqIERpc3BsYXkgbGFiZWwgKGUuZy4sIFwiUmVzcG9uc2VcIiwgXCJSZXNvbHV0aW9uXCIpLiAqL1xuICBsYWJlbDogc3RyaW5nO1xuICAvKiogU3RhdHVzIG9mIHRoaXMgU0xBLiAqL1xuICBzdGF0dXM6IFNsYVN0YXR1cztcbiAgLyoqIFByZS1mb3JtYXR0ZWQgZGV0YWlsIHRleHQgKGUuZy4sIFwibWV0IMK3IDI0bVwiLCBcIjZoIDEybSBsZWZ0XCIpLiAqL1xuICB0ZXh0OiBzdHJpbmc7XG59XG5cbi8qKlxuICogU0xBIHByb2dyZXNzIHdpZGdldC4gVHdvIHJvd3MgKHJlc3BvbnNlICsgcmVzb2x1dGlvbikgYW5kIGEgcHJvZ3Jlc3MgYmFyXG4gKiBmb3IgdGhlIGFjdGl2ZSAocGVuZGluZykgb25lLlxuICpcbiAqIFRoZSBjb2xvciBvZiB0aGUgYmFyIHRyYW5zaXRpb25zOlxuICogICA8IDgwJSDihpIgZ3JlZW4gLyBhY2NlbnRcbiAqICAgODAtOTUlIOKGkiBhbWJlciAod2FybilcbiAqICAg4omlIDk1JSDihpIgcmVkIChicmVhY2gpXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtc2xhLWJhclxuICogICBbcmVzcG9uc2VdPVwie2xhYmVsOidSZXNwb25zZScsICBzdGF0dXM6J21ldCcsICAgICB0ZXh0OidtZXQgwrcgMjRtJ31cIlxuICogICBbcmVzb2x1dGlvbl09XCJ7bGFiZWw6J1Jlc29sdXRpb24nLCBzdGF0dXM6J3BlbmRpbmcnLCB0ZXh0Oic2aCAxMm0gbGVmdCd9XCJcbiAqICAgW3Byb2dyZXNzUGN0XT1cIjY4XCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLXNsYS1iYXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9zbGEtYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3NsYS1iYXIuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhTbGFCYXJDb21wb25lbnQge1xuICBASW5wdXQoKSByZXNwb25zZTogU2xhVGFyZ2V0IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHJlc29sdXRpb246IFNsYVRhcmdldCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiAwLi4xMDAuIFRoZSBwcm9ncmVzcyBiYXIgcmVmbGVjdHMgdGhlIG1vc3QgXCJhdCByaXNrXCIgdGFyZ2V0LiAqL1xuICBASW5wdXQoKVxuICBzZXQgcHJvZ3Jlc3NQY3QodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3Byb2dyZXNzLnNldChNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHZhbHVlKSkpO1xuICB9XG4gIGdldCBwcm9ncmVzc1BjdCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wcm9ncmVzcygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfcHJvZ3Jlc3MgPSBzaWduYWwoMCk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNldmVyaXR5ID0gY29tcHV0ZWQ8U2xhU3RhdHVzPigoKSA9PiB7XG4gICAgY29uc3QgciA9IHRoaXMucmVzb2x1dGlvbj8uc3RhdHVzO1xuICAgIGNvbnN0IHJzID0gdGhpcy5yZXNwb25zZT8uc3RhdHVzO1xuICAgIGlmIChyID09PSAnYnJlYWNoZWQnIHx8IHJzID09PSAnYnJlYWNoZWQnKSByZXR1cm4gJ2JyZWFjaGVkJztcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3MoKSA+PSA5NSkgcmV0dXJuICdicmVhY2hlZCc7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzKCkgPj0gODApIHJldHVybiAncGVuZGluZyc7XG4gICAgaWYgKHIgPT09ICdtZXQnICYmIHJzID09PSAnbWV0JykgcmV0dXJuICdtZXQnO1xuICAgIHJldHVybiAncGVuZGluZyc7XG4gIH0pO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLXNldmVyaXR5JykgZ2V0IGhvc3RTZXZlcml0eSgpOiBTbGFTdGF0dXMge1xuICAgIHJldHVybiB0aGlzLnNldmVyaXR5KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3RhdHVzQ29sb3IoczogU2xhU3RhdHVzKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKHMpIHtcbiAgICAgIGNhc2UgJ21ldCc6XG4gICAgICAgIHJldHVybiAndmFyKC0tZ3JlZW4tdGV4dCknO1xuICAgICAgY2FzZSAnYnJlYWNoZWQnOlxuICAgICAgICByZXR1cm4gJ3ZhcigtLXJlZC10ZXh0KSc7XG4gICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAndmFyKC0tYW1iZXItdGV4dCknO1xuICAgIH1cbiAgfVxufVxuIiwiQGlmIChyZXNwb25zZSkge1xuICA8ZGl2IGNsYXNzPVwiYXRoLXNsYV9fcm93XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJhdGgtc2xhX19uYW1lXCI+e3sgcmVzcG9uc2UubGFiZWwgfX08L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJhdGgtc2xhX190ZXh0XCIgW3N0eWxlLmNvbG9yXT1cInN0YXR1c0NvbG9yKHJlc3BvbnNlLnN0YXR1cylcIj57e1xuICAgICAgcmVzcG9uc2UudGV4dFxuICAgIH19PC9zcGFuPlxuICA8L2Rpdj5cbn1cbkBpZiAocmVzb2x1dGlvbikge1xuICA8ZGl2IGNsYXNzPVwiYXRoLXNsYV9fcm93XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJhdGgtc2xhX19uYW1lXCI+e3sgcmVzb2x1dGlvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImF0aC1zbGFfX3RleHRcIiBbc3R5bGUuY29sb3JdPVwic3RhdHVzQ29sb3IocmVzb2x1dGlvbi5zdGF0dXMpXCI+e3tcbiAgICAgIHJlc29sdXRpb24udGV4dFxuICAgIH19PC9zcGFuPlxuICA8L2Rpdj5cbn1cbjxkaXZcbiAgY2xhc3M9XCJhdGgtc2xhX190cmFja1wiXG4gIHJvbGU9XCJwcm9ncmVzc2JhclwiXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiKHJlc29sdXRpb24gPz8gcmVzcG9uc2UpPy5sYWJlbCA/PyBudWxsXCJcbiAgW2F0dHIuYXJpYS12YWx1ZXRleHRdPVwiKHJlc29sdXRpb24gPz8gcmVzcG9uc2UpPy50ZXh0ID8/IG51bGxcIlxuICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInByb2dyZXNzUGN0XCJcbiAgYXJpYS12YWx1ZW1pbj1cIjBcIlxuICBhcmlhLXZhbHVlbWF4PVwiMTAwXCJcbj5cbiAgPGRpdiBjbGFzcz1cImF0aC1zbGFfX2ZpbGxcIiBbc3R5bGUud2lkdGguJV09XCJwcm9ncmVzc1BjdFwiPjwvZGl2PlxuPC9kaXY+XG4iXX0=