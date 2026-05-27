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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSlaBarComponent, isStandalone: true, selector: "ath-sla-bar", inputs: { response: "response", resolution: "resolution", progressPct: "progressPct" }, host: { properties: { "attr.data-severity": "this.hostSeverity" } }, ngImport: i0, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{ response.text }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{ resolution.text }}</span>\n  </div>\n}\n<div class=\"ath-sla__track\" role=\"progressbar\"\n     [attr.aria-valuenow]=\"progressPct\" aria-valuemin=\"0\" aria-valuemax=\"100\">\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSlaBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sla-bar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{ response.text }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{ resolution.text }}</span>\n  </div>\n}\n<div class=\"ath-sla__track\" role=\"progressbar\"\n     [attr.aria-valuenow]=\"progressPct\" aria-valuemin=\"0\" aria-valuemax=\"100\">\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvc2xhLWJhci9zbGEtYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zbGEtYmFyL3NsYS1iYXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQWEvQzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQVNILE1BQU0sT0FBTyxrQkFBa0I7SUFSL0I7UUFTVyxhQUFRLEdBQXFCLElBQUksQ0FBQztRQUNsQyxlQUFVLEdBQXFCLElBQUksQ0FBQztRQVc1QixjQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBCLGFBQVEsR0FBRyxRQUFRLENBQVksR0FBRyxFQUFFO1lBQ3JELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDO1lBQ2xDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLFVBQVUsSUFBSSxFQUFFLEtBQUssVUFBVTtnQkFBRSxPQUFPLFVBQVUsQ0FBQztZQUM3RCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO2dCQUFFLE9BQU8sVUFBVSxDQUFDO1lBQzlDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUU7Z0JBQUUsT0FBTyxTQUFTLENBQUM7WUFDN0MsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUUsS0FBSyxLQUFLO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQzlDLE9BQU8sU0FBUyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0tBY0o7SUFqQ0MsbUVBQW1FO0lBQ25FLElBQ0ksV0FBVyxDQUFDLEtBQWE7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFDRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBY0QsSUFBdUMsWUFBWTtRQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRVMsV0FBVyxDQUFDLENBQVk7UUFDaEMsUUFBUSxDQUFDLEVBQUUsQ0FBQztZQUNWLEtBQUssS0FBSyxDQUFDLENBQUMsT0FBTyxjQUFjLENBQUM7WUFDbEMsS0FBSyxVQUFVLENBQUMsQ0FBQyxPQUFPLFlBQVksQ0FBQztZQUNyQyxLQUFLLFNBQVMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxDQUFDLE9BQU8sY0FBYyxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDOytHQXBDVSxrQkFBa0I7bUdBQWxCLGtCQUFrQixvT0NyQy9CLHlyQkFnQkEsbTFCRGdCWSxZQUFZOzs0RkFLWCxrQkFBa0I7a0JBUjlCLFNBQVM7K0JBQ0UsYUFBYSxjQUNYLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQUt0QyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBSUYsV0FBVztzQkFEZCxLQUFLO2dCQW9CaUMsWUFBWTtzQkFBbEQsV0FBVzt1QkFBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIGNvbXB1dGVkLCBzaWduYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIFNsYVN0YXR1cyA9ICdtZXQnIHwgJ3BlbmRpbmcnIHwgJ2JyZWFjaGVkJztcblxuZXhwb3J0IGludGVyZmFjZSBTbGFUYXJnZXQge1xuICAvKiogRGlzcGxheSBsYWJlbCAoZS5nLiwgXCJSZXNwb25zZVwiLCBcIlJlc29sdXRpb25cIikuICovXG4gIGxhYmVsOiBzdHJpbmc7XG4gIC8qKiBTdGF0dXMgb2YgdGhpcyBTTEEuICovXG4gIHN0YXR1czogU2xhU3RhdHVzO1xuICAvKiogUHJlLWZvcm1hdHRlZCBkZXRhaWwgdGV4dCAoZS5nLiwgXCJtZXQgwrcgMjRtXCIsIFwiNmggMTJtIGxlZnRcIikuICovXG4gIHRleHQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBTTEEgcHJvZ3Jlc3Mgd2lkZ2V0LiBUd28gcm93cyAocmVzcG9uc2UgKyByZXNvbHV0aW9uKSBhbmQgYSBwcm9ncmVzcyBiYXJcbiAqIGZvciB0aGUgYWN0aXZlIChwZW5kaW5nKSBvbmUuXG4gKlxuICogVGhlIGNvbG9yIG9mIHRoZSBiYXIgdHJhbnNpdGlvbnM6XG4gKiAgIDwgODAlIOKGkiBncmVlbiAvIGFjY2VudFxuICogICA4MC05NSUg4oaSIGFtYmVyICh3YXJuKVxuICogICDiiaUgOTUlIOKGkiByZWQgKGJyZWFjaClcbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1zbGEtYmFyXG4gKiAgIFtyZXNwb25zZV09XCJ7bGFiZWw6J1Jlc3BvbnNlJywgIHN0YXR1czonbWV0JywgICAgIHRleHQ6J21ldCDCtyAyNG0nfVwiXG4gKiAgIFtyZXNvbHV0aW9uXT1cIntsYWJlbDonUmVzb2x1dGlvbicsIHN0YXR1czoncGVuZGluZycsIHRleHQ6JzZoIDEybSBsZWZ0J31cIlxuICogICBbcHJvZ3Jlc3NQY3RdPVwiNjhcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtc2xhLWJhcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3NsYS1iYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vc2xhLWJhci5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFNsYUJhckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHJlc3BvbnNlOiBTbGFUYXJnZXQgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcmVzb2x1dGlvbjogU2xhVGFyZ2V0IHwgbnVsbCA9IG51bGw7XG5cbiAgLyoqIDAuLjEwMC4gVGhlIHByb2dyZXNzIGJhciByZWZsZWN0cyB0aGUgbW9zdCBcImF0IHJpc2tcIiB0YXJnZXQuICovXG4gIEBJbnB1dCgpXG4gIHNldCBwcm9ncmVzc1BjdCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fcHJvZ3Jlc3Muc2V0KE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgdmFsdWUpKSk7XG4gIH1cbiAgZ2V0IHByb2dyZXNzUGN0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb2dyZXNzKCk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IF9wcm9ncmVzcyA9IHNpZ25hbCgwKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2V2ZXJpdHkgPSBjb21wdXRlZDxTbGFTdGF0dXM+KCgpID0+IHtcbiAgICBjb25zdCByID0gdGhpcy5yZXNvbHV0aW9uPy5zdGF0dXM7XG4gICAgY29uc3QgcnMgPSB0aGlzLnJlc3BvbnNlPy5zdGF0dXM7XG4gICAgaWYgKHIgPT09ICdicmVhY2hlZCcgfHwgcnMgPT09ICdicmVhY2hlZCcpIHJldHVybiAnYnJlYWNoZWQnO1xuICAgIGlmICh0aGlzLl9wcm9ncmVzcygpID49IDk1KSByZXR1cm4gJ2JyZWFjaGVkJztcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3MoKSA+PSA4MCkgcmV0dXJuICdwZW5kaW5nJztcbiAgICBpZiAociA9PT0gJ21ldCcgJiYgcnMgPT09ICdtZXQnKSByZXR1cm4gJ21ldCc7XG4gICAgcmV0dXJuICdwZW5kaW5nJztcbiAgfSk7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRhdGEtc2V2ZXJpdHknKSBnZXQgaG9zdFNldmVyaXR5KCk6IFNsYVN0YXR1cyB7XG4gICAgcmV0dXJuIHRoaXMuc2V2ZXJpdHkoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzdGF0dXNDb2xvcihzOiBTbGFTdGF0dXMpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAocykge1xuICAgICAgY2FzZSAnbWV0JzogcmV0dXJuICd2YXIoLS1ncmVlbiknO1xuICAgICAgY2FzZSAnYnJlYWNoZWQnOiByZXR1cm4gJ3ZhcigtLXJlZCknO1xuICAgICAgY2FzZSAncGVuZGluZyc6XG4gICAgICBkZWZhdWx0OiByZXR1cm4gJ3ZhcigtLWFtYmVyKSc7XG4gICAgfVxuICB9XG59XG4iLCJAaWYgKHJlc3BvbnNlKSB7XG4gIDxkaXYgY2xhc3M9XCJhdGgtc2xhX19yb3dcIj5cbiAgICA8c3BhbiBjbGFzcz1cImF0aC1zbGFfX25hbWVcIj57eyByZXNwb25zZS5sYWJlbCB9fTwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImF0aC1zbGFfX3RleHRcIiBbc3R5bGUuY29sb3JdPVwic3RhdHVzQ29sb3IocmVzcG9uc2Uuc3RhdHVzKVwiPnt7IHJlc3BvbnNlLnRleHQgfX08L3NwYW4+XG4gIDwvZGl2PlxufVxuQGlmIChyZXNvbHV0aW9uKSB7XG4gIDxkaXYgY2xhc3M9XCJhdGgtc2xhX19yb3dcIj5cbiAgICA8c3BhbiBjbGFzcz1cImF0aC1zbGFfX25hbWVcIj57eyByZXNvbHV0aW9uLmxhYmVsIH19PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiYXRoLXNsYV9fdGV4dFwiIFtzdHlsZS5jb2xvcl09XCJzdGF0dXNDb2xvcihyZXNvbHV0aW9uLnN0YXR1cylcIj57eyByZXNvbHV0aW9uLnRleHQgfX08L3NwYW4+XG4gIDwvZGl2PlxufVxuPGRpdiBjbGFzcz1cImF0aC1zbGFfX3RyYWNrXCIgcm9sZT1cInByb2dyZXNzYmFyXCJcbiAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJwcm9ncmVzc1BjdFwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiPlxuICA8ZGl2IGNsYXNzPVwiYXRoLXNsYV9fZmlsbFwiIFtzdHlsZS53aWR0aC4lXT1cInByb2dyZXNzUGN0XCI+PC9kaXY+XG48L2Rpdj5cbiJdfQ==