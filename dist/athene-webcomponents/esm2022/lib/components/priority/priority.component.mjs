import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
const LABELS = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    crit: 'Critical',
};
/**
 * Priority indicator with rising bars (low → critical).
 *
 * @example
 * <ath-priority priority="high" />
 * <ath-priority priority="crit" [showLabel]="false" />
 */
export class AthPriorityComponent {
    constructor() {
        this.priority = 'medium';
        this.showLabel = true;
        /** Optional override label. */
        this.label = null;
    }
    get hostPriority() {
        return this.priority;
    }
    get computedLabel() {
        return this.label ?? LABELS[this.priority] ?? this.priority;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpb3JpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3ByaW9yaXR5L3ByaW9yaXR5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wcmlvcml0eS9wcmlvcml0eS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUkvQyxNQUFNLE1BQU0sR0FBNkM7SUFDdkQsR0FBRyxFQUFFLEtBQUs7SUFDVixNQUFNLEVBQUUsUUFBUTtJQUNoQixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxVQUFVO0NBQ2pCLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFTSCxNQUFNLE9BQU8sb0JBQW9CO0lBUmpDO1FBU1csYUFBUSxHQUFtQixRQUFRLENBQUM7UUFDcEMsY0FBUyxHQUFHLElBQUksQ0FBQztRQUUxQiwrQkFBK0I7UUFDdEIsVUFBSyxHQUFrQixJQUFJLENBQUM7S0FTdEM7SUFQQyxJQUF1QyxZQUFZO1FBQ2pELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBYyxhQUFhO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDOUQsQ0FBQzsrR0FiVSxvQkFBb0I7bUdBQXBCLG9CQUFvQix1TkMzQmpDLDhMQVFBLHE4QkRjWSxZQUFZOzs0RkFLWCxvQkFBb0I7a0JBUmhDLFNBQVM7K0JBQ0UsY0FBYyxjQUNaLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQUt0QyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUVpQyxZQUFZO3NCQUFsRCxXQUFXO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IHR5cGUgVGlja2V0UHJpb3JpdHkgPSAnbG93JyB8ICdtZWRpdW0nIHwgJ2hpZ2gnIHwgJ2NyaXQnO1xuXG5jb25zdCBMQUJFTFM6IFJlYWRvbmx5PFJlY29yZDxUaWNrZXRQcmlvcml0eSwgc3RyaW5nPj4gPSB7XG4gIGxvdzogJ0xvdycsXG4gIG1lZGl1bTogJ01lZGl1bScsXG4gIGhpZ2g6ICdIaWdoJyxcbiAgY3JpdDogJ0NyaXRpY2FsJyxcbn07XG5cbi8qKlxuICogUHJpb3JpdHkgaW5kaWNhdG9yIHdpdGggcmlzaW5nIGJhcnMgKGxvdyDihpIgY3JpdGljYWwpLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXByaW9yaXR5IHByaW9yaXR5PVwiaGlnaFwiIC8+XG4gKiA8YXRoLXByaW9yaXR5IHByaW9yaXR5PVwiY3JpdFwiIFtzaG93TGFiZWxdPVwiZmFsc2VcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtcHJpb3JpdHknLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmlvcml0eS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9wcmlvcml0eS5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFByaW9yaXR5Q29tcG9uZW50IHtcbiAgQElucHV0KCkgcHJpb3JpdHk6IFRpY2tldFByaW9yaXR5ID0gJ21lZGl1bSc7XG4gIEBJbnB1dCgpIHNob3dMYWJlbCA9IHRydWU7XG5cbiAgLyoqIE9wdGlvbmFsIG92ZXJyaWRlIGxhYmVsLiAqL1xuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRhdGEtcHJpb3JpdHknKSBnZXQgaG9zdFByaW9yaXR5KCk6IFRpY2tldFByaW9yaXR5IHtcbiAgICByZXR1cm4gdGhpcy5wcmlvcml0eTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgY29tcHV0ZWRMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxhYmVsID8/IExBQkVMU1t0aGlzLnByaW9yaXR5XSA/PyB0aGlzLnByaW9yaXR5O1xuICB9XG59XG4iLCI8c3BhbiBjbGFzcz1cImF0aC1wcmlvcml0eV9fYmFyc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICA8aT48L2k+XG4gIDxpPjwvaT5cbiAgPGk+PC9pPlxuPC9zcGFuPlxuQGlmIChzaG93TGFiZWwpIHtcbiAgPHNwYW4gY2xhc3M9XCJhdGgtcHJpb3JpdHlfX2xhYmVsXCI+e3sgY29tcHV0ZWRMYWJlbCB9fTwvc3Bhbj5cbn1cbiJdfQ==