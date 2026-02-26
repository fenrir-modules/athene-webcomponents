import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Athene Chip Component
 *
 * Tags and categories with optional remove action.
 *
 * @example
 * <ath-chip>authentication</ath-chip>
 * <ath-chip variant="primary" [removable]="true" (removed)="onRemove()">beta</ath-chip>
 */
export class AthChipComponent {
    constructor() {
        /** Chip variant */
        this.variant = 'default';
        /** Whether the chip can be removed */
        this.removable = false;
        /** Remove event */
        this.removed = new EventEmitter();
        this.removeIcon = X;
    }
    get chipClasses() {
        return `ath-chip ath-chip--${this.variant}`;
    }
    remove(event) {
        event.stopPropagation();
        this.removed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthChipComponent, isStandalone: true, selector: "ath-chip", inputs: { variant: "variant", removable: "removable" }, outputs: { removed: "removed" }, ngImport: i0, template: "<span [class]=\"chipClasses\">\n  <ng-content />\n  @if (removable) {\n    <button type=\"button\" class=\"ath-chip__remove\" (click)=\"remove($event)\">\n      <lucide-icon [img]=\"removeIcon\" [size]=\"12\" />\n    </button>\n  }\n</span>\n", styles: [".ath-chip{display:inline-flex;align-items:center;gap:var(--ath-space-1);padding:2px var(--ath-space-2);font-size:var(--ath-font-size-xs);font-weight:var(--ath-font-weight-medium);border-radius:var(--ath-border-radius-full);white-space:nowrap}.ath-chip--default{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color)}.ath-chip--primary{color:var(--ath-color-primary);background-color:#c9963a1f;border:1px solid rgba(201,150,58,.3)}.ath-chip--success{color:var(--ath-color-success);background-color:#22c55e1f;border:1px solid rgba(34,197,94,.3)}.ath-chip--warning{color:var(--ath-color-warning);background-color:#f59e0b1f;border:1px solid rgba(245,158,11,.3)}.ath-chip--error{color:var(--ath-color-error);background-color:#ef44441f;border:1px solid rgba(239,68,68,.3)}.ath-chip__remove{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;color:inherit;background:none;border:none;border-radius:var(--ath-border-radius-full);cursor:pointer;opacity:.6;transition:opacity var(--ath-transition-fast)}.ath-chip__remove:hover{opacity:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthChipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-chip', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span [class]=\"chipClasses\">\n  <ng-content />\n  @if (removable) {\n    <button type=\"button\" class=\"ath-chip__remove\" (click)=\"remove($event)\">\n      <lucide-icon [img]=\"removeIcon\" [size]=\"12\" />\n    </button>\n  }\n</span>\n", styles: [".ath-chip{display:inline-flex;align-items:center;gap:var(--ath-space-1);padding:2px var(--ath-space-2);font-size:var(--ath-font-size-xs);font-weight:var(--ath-font-weight-medium);border-radius:var(--ath-border-radius-full);white-space:nowrap}.ath-chip--default{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color)}.ath-chip--primary{color:var(--ath-color-primary);background-color:#c9963a1f;border:1px solid rgba(201,150,58,.3)}.ath-chip--success{color:var(--ath-color-success);background-color:#22c55e1f;border:1px solid rgba(34,197,94,.3)}.ath-chip--warning{color:var(--ath-color-warning);background-color:#f59e0b1f;border:1px solid rgba(245,158,11,.3)}.ath-chip--error{color:var(--ath-color-error);background-color:#ef44441f;border:1px solid rgba(239,68,68,.3)}.ath-chip__remove{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;color:inherit;background:none;border:none;border-radius:var(--ath-border-radius-full);cursor:pointer;opacity:.6;transition:opacity var(--ath-transition-fast)}.ath-chip__remove:hover{opacity:1}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], removable: [{
                type: Input
            }], removed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvY2hpcC9jaGlwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9jaGlwL2NoaXAuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLENBQUMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPeEQ7Ozs7Ozs7O0dBUUc7QUFTSCxNQUFNLE9BQU8sZ0JBQWdCO0lBUjdCO1FBU0UsbUJBQW1CO1FBQ1YsWUFBTyxHQUFnQixTQUFTLENBQUM7UUFFMUMsc0NBQXNDO1FBQzdCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFM0IsbUJBQW1CO1FBQ1QsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFMUIsZUFBVSxHQUFHLENBQUMsQ0FBQztLQVVuQztJQVJDLElBQUksV0FBVztRQUNiLE9BQU8sc0JBQXNCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWlCO1FBQ3RCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7K0dBbkJVLGdCQUFnQjttR0FBaEIsZ0JBQWdCLDZKQzFCN0Isb1BBUUEsb3FDRGFZLFlBQVksOEJBQUUsbUJBQW1COzs0RkFLaEMsZ0JBQWdCO2tCQVI1QixTQUFTOytCQUNFLFVBQVUsY0FDUixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsbUJBQzNCLHVCQUF1QixDQUFDLE1BQU07OEJBTXRDLE9BQU87c0JBQWYsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdJLE9BQU87c0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMdWNpZGVBbmd1bGFyTW9kdWxlLCBYIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuXG4vKipcbiAqIENoaXAgdmFyaWFudCB0eXBlc1xuICovXG5leHBvcnQgdHlwZSBDaGlwVmFyaWFudCA9ICdkZWZhdWx0JyB8ICdwcmltYXJ5JyB8ICdzdWNjZXNzJyB8ICd3YXJuaW5nJyB8ICdlcnJvcic7XG5cbi8qKlxuICogQXRoZW5lIENoaXAgQ29tcG9uZW50XG4gKlxuICogVGFncyBhbmQgY2F0ZWdvcmllcyB3aXRoIG9wdGlvbmFsIHJlbW92ZSBhY3Rpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtY2hpcD5hdXRoZW50aWNhdGlvbjwvYXRoLWNoaXA+XG4gKiA8YXRoLWNoaXAgdmFyaWFudD1cInByaW1hcnlcIiBbcmVtb3ZhYmxlXT1cInRydWVcIiAocmVtb3ZlZCk9XCJvblJlbW92ZSgpXCI+YmV0YTwvYXRoLWNoaXA+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1jaGlwJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTHVjaWRlQW5ndWxhck1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vY2hpcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9jaGlwLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoQ2hpcENvbXBvbmVudCB7XG4gIC8qKiBDaGlwIHZhcmlhbnQgKi9cbiAgQElucHV0KCkgdmFyaWFudDogQ2hpcFZhcmlhbnQgPSAnZGVmYXVsdCc7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNoaXAgY2FuIGJlIHJlbW92ZWQgKi9cbiAgQElucHV0KCkgcmVtb3ZhYmxlID0gZmFsc2U7XG5cbiAgLyoqIFJlbW92ZSBldmVudCAqL1xuICBAT3V0cHV0KCkgcmVtb3ZlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVtb3ZlSWNvbiA9IFg7XG5cbiAgZ2V0IGNoaXBDbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBhdGgtY2hpcCBhdGgtY2hpcC0tJHt0aGlzLnZhcmlhbnR9YDtcbiAgfVxuXG4gIHJlbW92ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMucmVtb3ZlZC5lbWl0KCk7XG4gIH1cbn1cbiIsIjxzcGFuIFtjbGFzc109XCJjaGlwQ2xhc3Nlc1wiPlxuICA8bmctY29udGVudCAvPlxuICBAaWYgKHJlbW92YWJsZSkge1xuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYXRoLWNoaXBfX3JlbW92ZVwiIChjbGljayk9XCJyZW1vdmUoJGV2ZW50KVwiPlxuICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwicmVtb3ZlSWNvblwiIFtzaXplXT1cIjEyXCIgLz5cbiAgICA8L2J1dHRvbj5cbiAgfVxuPC9zcGFuPlxuIl19