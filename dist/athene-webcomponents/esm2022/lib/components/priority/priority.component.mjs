import { ChangeDetectionStrategy, Component, HostBinding, InjectionToken, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
const LABELS = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    crit: 'Critical',
};
/**
 * Optional resolver for priority labels. The app provides it once at the
 * root (with its translations); without it the labels are English.
 */
export const ATH_PRIORITY_LABELS = new InjectionToken('ATH_PRIORITY_LABELS');
/**
 * Priority indicator with rising bars (low → critical).
 *
 * @example
 * <ath-priority priority="high" />
 * <ath-priority priority="crit" [showLabel]="false" />
 */
export class AthPriorityComponent {
    constructor() {
        this.resolveLabel = inject(ATH_PRIORITY_LABELS, { optional: true });
        this.priority = 'medium';
        this.showLabel = true;
        /** Optional override label. */
        this.label = null;
    }
    get hostPriority() {
        return this.priority;
    }
    get computedLabel() {
        return (this.label ?? this.resolveLabel?.(this.priority) ?? LABELS[this.priority] ?? this.priority);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPriorityComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPriorityComponent, isStandalone: true, selector: "ath-priority", inputs: { priority: "priority", showLabel: "showLabel", label: "label" }, host: { properties: { "attr.data-priority": "this.hostPriority" } }, ngImport: i0, template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel) {\n  <span class=\"ath-priority__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red);font-weight:600}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPriorityComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-priority', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel) {\n  <span class=\"ath-priority__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red);font-weight:600}\n"] }]
        }], propDecorators: { priority: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], label: [{
                type: Input
            }], hostPriority: [{
                type: HostBinding,
                args: ['attr.data-priority']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpb3JpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3ByaW9yaXR5L3ByaW9yaXR5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wcmlvcml0eS9wcmlvcml0eS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBSS9DLE1BQU0sTUFBTSxHQUE2QztJQUN2RCxHQUFHLEVBQUUsS0FBSztJQUNWLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLFVBQVU7Q0FDakIsQ0FBQztBQUtGOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLElBQUksY0FBYyxDQUF3QixxQkFBcUIsQ0FBQyxDQUFDO0FBRXBHOzs7Ozs7R0FNRztBQVNILE1BQU0sT0FBTyxvQkFBb0I7SUFSakM7UUFTbUIsaUJBQVksR0FBRyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV2RSxhQUFRLEdBQW1CLFFBQVEsQ0FBQztRQUNwQyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTFCLCtCQUErQjtRQUN0QixVQUFLLEdBQWtCLElBQUksQ0FBQztLQVd0QztJQVRDLElBQXVDLFlBQVk7UUFDakQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFjLGFBQWE7UUFDekIsT0FBTyxDQUNMLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQzNGLENBQUM7SUFDSixDQUFDOytHQWpCVSxvQkFBb0I7bUdBQXBCLG9CQUFvQix1TkNwQ2pDLDhMQVFBLHE4QkR1QlksWUFBWTs7NEZBS1gsb0JBQW9CO2tCQVJoQyxTQUFTOytCQUNFLGNBQWMsY0FDWixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFPdEMsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLEtBQUs7c0JBQWIsS0FBSztnQkFFaUMsWUFBWTtzQkFBbEQsV0FBVzt1QkFBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5qZWN0aW9uVG9rZW4sIElucHV0LCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIFRpY2tldFByaW9yaXR5ID0gJ2xvdycgfCAnbWVkaXVtJyB8ICdoaWdoJyB8ICdjcml0JztcblxuY29uc3QgTEFCRUxTOiBSZWFkb25seTxSZWNvcmQ8VGlja2V0UHJpb3JpdHksIHN0cmluZz4+ID0ge1xuICBsb3c6ICdMb3cnLFxuICBtZWRpdW06ICdNZWRpdW0nLFxuICBoaWdoOiAnSGlnaCcsXG4gIGNyaXQ6ICdDcml0aWNhbCcsXG59O1xuXG4vKiogUmV0dXJucyB0aGUgbGFiZWwgZm9yIGEgcHJpb3JpdHkgaW4gdGhlIGFwcCdzIGxhbmd1YWdlLCBvciBudWxsIGZvciB0aGUgZGVmYXVsdC4gKi9cbmV4cG9ydCB0eXBlIFByaW9yaXR5TGFiZWxSZXNvbHZlciA9IChwcmlvcml0eTogVGlja2V0UHJpb3JpdHkpID0+IHN0cmluZyB8IG51bGw7XG5cbi8qKlxuICogT3B0aW9uYWwgcmVzb2x2ZXIgZm9yIHByaW9yaXR5IGxhYmVscy4gVGhlIGFwcCBwcm92aWRlcyBpdCBvbmNlIGF0IHRoZVxuICogcm9vdCAod2l0aCBpdHMgdHJhbnNsYXRpb25zKTsgd2l0aG91dCBpdCB0aGUgbGFiZWxzIGFyZSBFbmdsaXNoLlxuICovXG5leHBvcnQgY29uc3QgQVRIX1BSSU9SSVRZX0xBQkVMUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxQcmlvcml0eUxhYmVsUmVzb2x2ZXI+KCdBVEhfUFJJT1JJVFlfTEFCRUxTJyk7XG5cbi8qKlxuICogUHJpb3JpdHkgaW5kaWNhdG9yIHdpdGggcmlzaW5nIGJhcnMgKGxvdyDihpIgY3JpdGljYWwpLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXByaW9yaXR5IHByaW9yaXR5PVwiaGlnaFwiIC8+XG4gKiA8YXRoLXByaW9yaXR5IHByaW9yaXR5PVwiY3JpdFwiIFtzaG93TGFiZWxdPVwiZmFsc2VcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtcHJpb3JpdHknLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmlvcml0eS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9wcmlvcml0eS5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFByaW9yaXR5Q29tcG9uZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNvbHZlTGFiZWwgPSBpbmplY3QoQVRIX1BSSU9SSVRZX0xBQkVMUywgeyBvcHRpb25hbDogdHJ1ZSB9KTtcblxuICBASW5wdXQoKSBwcmlvcml0eTogVGlja2V0UHJpb3JpdHkgPSAnbWVkaXVtJztcbiAgQElucHV0KCkgc2hvd0xhYmVsID0gdHJ1ZTtcblxuICAvKiogT3B0aW9uYWwgb3ZlcnJpZGUgbGFiZWwuICovXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1wcmlvcml0eScpIGdldCBob3N0UHJpb3JpdHkoKTogVGlja2V0UHJpb3JpdHkge1xuICAgIHJldHVybiB0aGlzLnByaW9yaXR5O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBjb21wdXRlZExhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubGFiZWwgPz8gdGhpcy5yZXNvbHZlTGFiZWw/Lih0aGlzLnByaW9yaXR5KSA/PyBMQUJFTFNbdGhpcy5wcmlvcml0eV0gPz8gdGhpcy5wcmlvcml0eVxuICAgICk7XG4gIH1cbn1cbiIsIjxzcGFuIGNsYXNzPVwiYXRoLXByaW9yaXR5X19iYXJzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gIDxpPjwvaT5cbiAgPGk+PC9pPlxuICA8aT48L2k+XG48L3NwYW4+XG5AaWYgKHNob3dMYWJlbCkge1xuICA8c3BhbiBjbGFzcz1cImF0aC1wcmlvcml0eV9fbGFiZWxcIj57eyBjb21wdXRlZExhYmVsIH19PC9zcGFuPlxufVxuIl19