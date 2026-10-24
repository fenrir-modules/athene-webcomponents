import { ChangeDetectionStrategy, Component, HostBinding, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ATH_PRIORITY_LABELS } from '@athene/webcomponents/core';
import * as i0 from "@angular/core";
// The priority type and label token live in `@athene/webcomponents/core`.
export { ATH_PRIORITY_LABELS, } from '@athene/webcomponents/core';
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPriorityComponent, isStandalone: true, selector: "ath-priority", inputs: { priority: "priority", showLabel: "showLabel", label: "label" }, host: { properties: { "attr.data-priority": "this.hostPriority" } }, ngImport: i0, template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel) {\n  <span class=\"ath-priority__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red-text);font-weight:600}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPriorityComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-priority', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel) {\n  <span class=\"ath-priority__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red-text);font-weight:600}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpb3JpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3ByaW9yaXR5L3ByaW9yaXR5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9wcmlvcml0eS9wcmlvcml0eS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQXVCLE1BQU0sNEJBQTRCLENBQUM7O0FBRXRGLDBFQUEwRTtBQUMxRSxPQUFPLEVBQ0wsbUJBQW1CLEdBR3BCLE1BQU0sNEJBQTRCLENBQUM7QUFFcEMsTUFBTSxNQUFNLEdBQTZDO0lBQ3ZELEdBQUcsRUFBRSxLQUFLO0lBQ1YsTUFBTSxFQUFFLFFBQVE7SUFDaEIsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsVUFBVTtDQUNqQixDQUFDO0FBRUY7Ozs7OztHQU1HO0FBU0gsTUFBTSxPQUFPLG9CQUFvQjtJQVJqQztRQVNtQixpQkFBWSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXZFLGFBQVEsR0FBbUIsUUFBUSxDQUFDO1FBQ3BDLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFFMUIsK0JBQStCO1FBQ3RCLFVBQUssR0FBa0IsSUFBSSxDQUFDO0tBV3RDO0lBVEMsSUFBdUMsWUFBWTtRQUNqRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQWMsYUFBYTtRQUN6QixPQUFPLENBQ0wsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FDM0YsQ0FBQztJQUNKLENBQUM7K0dBakJVLG9CQUFvQjttR0FBcEIsb0JBQW9CLHVOQ2pDakMsOExBUUEsMDhCRG9CWSxZQUFZOzs0RkFLWCxvQkFBb0I7a0JBUmhDLFNBQVM7K0JBQ0UsY0FBYyxjQUNaLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQU90QyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUVpQyxZQUFZO3NCQUFsRCxXQUFXO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQVRIX1BSSU9SSVRZX0xBQkVMUywgdHlwZSBUaWNrZXRQcmlvcml0eSB9IGZyb20gJ0BhdGhlbmUvd2ViY29tcG9uZW50cy9jb3JlJztcblxuLy8gVGhlIHByaW9yaXR5IHR5cGUgYW5kIGxhYmVsIHRva2VuIGxpdmUgaW4gYEBhdGhlbmUvd2ViY29tcG9uZW50cy9jb3JlYC5cbmV4cG9ydCB7XG4gIEFUSF9QUklPUklUWV9MQUJFTFMsXG4gIHR5cGUgUHJpb3JpdHlMYWJlbFJlc29sdmVyLFxuICB0eXBlIFRpY2tldFByaW9yaXR5LFxufSBmcm9tICdAYXRoZW5lL3dlYmNvbXBvbmVudHMvY29yZSc7XG5cbmNvbnN0IExBQkVMUzogUmVhZG9ubHk8UmVjb3JkPFRpY2tldFByaW9yaXR5LCBzdHJpbmc+PiA9IHtcbiAgbG93OiAnTG93JyxcbiAgbWVkaXVtOiAnTWVkaXVtJyxcbiAgaGlnaDogJ0hpZ2gnLFxuICBjcml0OiAnQ3JpdGljYWwnLFxufTtcblxuLyoqXG4gKiBQcmlvcml0eSBpbmRpY2F0b3Igd2l0aCByaXNpbmcgYmFycyAobG93IOKGkiBjcml0aWNhbCkuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtcHJpb3JpdHkgcHJpb3JpdHk9XCJoaWdoXCIgLz5cbiAqIDxhdGgtcHJpb3JpdHkgcHJpb3JpdHk9XCJjcml0XCIgW3Nob3dMYWJlbF09XCJmYWxzZVwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1wcmlvcml0eScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3ByaW9yaXR5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3ByaW9yaXR5LmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoUHJpb3JpdHlDb21wb25lbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IHJlc29sdmVMYWJlbCA9IGluamVjdChBVEhfUFJJT1JJVFlfTEFCRUxTLCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuXG4gIEBJbnB1dCgpIHByaW9yaXR5OiBUaWNrZXRQcmlvcml0eSA9ICdtZWRpdW0nO1xuICBASW5wdXQoKSBzaG93TGFiZWwgPSB0cnVlO1xuXG4gIC8qKiBPcHRpb25hbCBvdmVycmlkZSBsYWJlbC4gKi9cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLXByaW9yaXR5JykgZ2V0IGhvc3RQcmlvcml0eSgpOiBUaWNrZXRQcmlvcml0eSB7XG4gICAgcmV0dXJuIHRoaXMucHJpb3JpdHk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGNvbXB1dGVkTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5sYWJlbCA/PyB0aGlzLnJlc29sdmVMYWJlbD8uKHRoaXMucHJpb3JpdHkpID8/IExBQkVMU1t0aGlzLnByaW9yaXR5XSA/PyB0aGlzLnByaW9yaXR5XG4gICAgKTtcbiAgfVxufVxuIiwiPHNwYW4gY2xhc3M9XCJhdGgtcHJpb3JpdHlfX2JhcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgPGk+PC9pPlxuICA8aT48L2k+XG4gIDxpPjwvaT5cbjwvc3Bhbj5cbkBpZiAoc2hvd0xhYmVsKSB7XG4gIDxzcGFuIGNsYXNzPVwiYXRoLXByaW9yaXR5X19sYWJlbFwiPnt7IGNvbXB1dGVkTGFiZWwgfX08L3NwYW4+XG59XG4iXX0=