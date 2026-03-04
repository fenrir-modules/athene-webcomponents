import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Athene Badge Component
 *
 * Status badges for tables, lists and inline indicators.
 *
 * @example
 * <ath-badge variant="success">Active</ath-badge>
 * <ath-badge variant="error">Revoked</ath-badge>
 */
export class AthBadgeComponent {
    constructor() {
        /** Badge variant */
        this.variant = 'default';
        /** Show dot indicator */
        this.dot = false;
    }
    get badgeClasses() {
        return [
            'ath-badge',
            `ath-badge--${this.variant}`,
            this.dot ? 'ath-badge--dot' : '',
        ].filter(Boolean).join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthBadgeComponent, isStandalone: true, selector: "ath-badge", inputs: { variant: "variant", dot: "dot" }, ngImport: i0, template: "<span [class]=\"badgeClasses\">\n  @if (dot) {\n    <span class=\"ath-badge__dot\"></span>\n  }\n  <ng-content />\n</span>\n", styles: [".ath-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:var(--ath-font-weight-semibold);line-height:1;white-space:nowrap;padding:4px 10px;border-radius:var(--ath-border-radius-full);letter-spacing:.2px}.ath-badge__dot{width:6px;height:6px;border-radius:var(--ath-border-radius-full);flex-shrink:0}.ath-badge--default{color:var(--ath-text-secondary);background:#ffffff0f}.ath-badge--default .ath-badge__dot{background:var(--ath-text-tertiary)}.ath-badge--success{color:var(--ath-color-success);background:#4ade801a}.ath-badge--success .ath-badge__dot{background:var(--ath-color-success)}.ath-badge--warning{color:var(--ath-color-primary);background:#c9963a1f}.ath-badge--warning .ath-badge__dot{background:var(--ath-color-primary)}.ath-badge--error{color:var(--ath-color-error);background:#f871711a}.ath-badge--error .ath-badge__dot{background:var(--ath-color-error)}.ath-badge--info{color:var(--ath-color-info);background:#60a5fa1a}.ath-badge--info .ath-badge__dot{background:var(--ath-color-info)}.ath-badge--muted{color:var(--ath-text-tertiary);background:#ffffff0a}.ath-badge--muted .ath-badge__dot{background:#fff3}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-badge', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span [class]=\"badgeClasses\">\n  @if (dot) {\n    <span class=\"ath-badge__dot\"></span>\n  }\n  <ng-content />\n</span>\n", styles: [".ath-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:var(--ath-font-weight-semibold);line-height:1;white-space:nowrap;padding:4px 10px;border-radius:var(--ath-border-radius-full);letter-spacing:.2px}.ath-badge__dot{width:6px;height:6px;border-radius:var(--ath-border-radius-full);flex-shrink:0}.ath-badge--default{color:var(--ath-text-secondary);background:#ffffff0f}.ath-badge--default .ath-badge__dot{background:var(--ath-text-tertiary)}.ath-badge--success{color:var(--ath-color-success);background:#4ade801a}.ath-badge--success .ath-badge__dot{background:var(--ath-color-success)}.ath-badge--warning{color:var(--ath-color-primary);background:#c9963a1f}.ath-badge--warning .ath-badge__dot{background:var(--ath-color-primary)}.ath-badge--error{color:var(--ath-color-error);background:#f871711a}.ath-badge--error .ath-badge__dot{background:var(--ath-color-error)}.ath-badge--info{color:var(--ath-color-info);background:#60a5fa1a}.ath-badge--info .ath-badge__dot{background:var(--ath-color-info)}.ath-badge--muted{color:var(--ath-text-tertiary);background:#ffffff0a}.ath-badge--muted .ath-badge__dot{background:#fff3}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], dot: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2JhZGdlL2JhZGdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9iYWRnZS9iYWRnZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBTy9DOzs7Ozs7OztHQVFHO0FBU0gsTUFBTSxPQUFPLGlCQUFpQjtJQVI5QjtRQVNFLG9CQUFvQjtRQUNYLFlBQU8sR0FBaUIsU0FBUyxDQUFDO1FBRTNDLHlCQUF5QjtRQUNoQixRQUFHLEdBQUcsS0FBSyxDQUFDO0tBU3RCO0lBUEMsSUFBSSxZQUFZO1FBQ2QsT0FBTztZQUNMLFdBQVc7WUFDWCxjQUFjLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDakMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7K0dBYlUsaUJBQWlCO21HQUFqQixpQkFBaUIsaUhDekI5Qiw4SEFNQSx1ckNEY1ksWUFBWTs7NEZBS1gsaUJBQWlCO2tCQVI3QixTQUFTOytCQUNFLFdBQVcsY0FDVCxJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFNdEMsT0FBTztzQkFBZixLQUFLO2dCQUdHLEdBQUc7c0JBQVgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEJhZGdlIHZhcmlhbnQgdHlwZXNcbiAqL1xuZXhwb3J0IHR5cGUgQmFkZ2VWYXJpYW50ID0gJ2RlZmF1bHQnIHwgJ3N1Y2Nlc3MnIHwgJ3dhcm5pbmcnIHwgJ2Vycm9yJyB8ICdpbmZvJyB8ICdtdXRlZCc7XG5cbi8qKlxuICogQXRoZW5lIEJhZGdlIENvbXBvbmVudFxuICpcbiAqIFN0YXR1cyBiYWRnZXMgZm9yIHRhYmxlcywgbGlzdHMgYW5kIGlubGluZSBpbmRpY2F0b3JzLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWJhZGdlIHZhcmlhbnQ9XCJzdWNjZXNzXCI+QWN0aXZlPC9hdGgtYmFkZ2U+XG4gKiA8YXRoLWJhZGdlIHZhcmlhbnQ9XCJlcnJvclwiPlJldm9rZWQ8L2F0aC1iYWRnZT5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWJhZGdlJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vYmFkZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vYmFkZ2UuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhCYWRnZUNvbXBvbmVudCB7XG4gIC8qKiBCYWRnZSB2YXJpYW50ICovXG4gIEBJbnB1dCgpIHZhcmlhbnQ6IEJhZGdlVmFyaWFudCA9ICdkZWZhdWx0JztcblxuICAvKiogU2hvdyBkb3QgaW5kaWNhdG9yICovXG4gIEBJbnB1dCgpIGRvdCA9IGZhbHNlO1xuXG4gIGdldCBiYWRnZUNsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2F0aC1iYWRnZScsXG4gICAgICBgYXRoLWJhZGdlLS0ke3RoaXMudmFyaWFudH1gLFxuICAgICAgdGhpcy5kb3QgPyAnYXRoLWJhZGdlLS1kb3QnIDogJycsXG4gICAgXS5maWx0ZXIoQm9vbGVhbikuam9pbignICcpO1xuICB9XG59XG4iLCI8c3BhbiBbY2xhc3NdPVwiYmFkZ2VDbGFzc2VzXCI+XG4gIEBpZiAoZG90KSB7XG4gICAgPHNwYW4gY2xhc3M9XCJhdGgtYmFkZ2VfX2RvdFwiPjwvc3Bhbj5cbiAgfVxuICA8bmctY29udGVudCAvPlxuPC9zcGFuPlxuIl19