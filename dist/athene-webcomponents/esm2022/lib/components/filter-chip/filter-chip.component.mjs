import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronDown, X } from 'lucide-angular';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Filter pill in the style `Label Value ▾`: quiet grey fill, muted label,
 * semibold value, no separator. Optional clearable.
 * Typically used in toolbars to compose query filters.
 *
 * @example
 * <ath-filter-chip label="Status" value="Any" (clicked)="openMenu()" />
 * <ath-filter-chip label="Assignee" value="Mira Voss" [active]="true" [clearable]="true"
 *                  (clicked)="open()" (cleared)="reset()" />
 */
export class AthFilterChipComponent {
    constructor() {
        this.value = '';
        /** Visually highlights the chip when a filter value is set. */
        this.active = false;
        /** Shows a small `×` button to clear the filter. */
        this.clearable = false;
        this.disabled = false;
        this.clicked = new EventEmitter();
        this.cleared = new EventEmitter();
        this.chevronIcon = ChevronDown;
        this.clearIcon = X;
    }
    get hostActive() {
        return this.active ? 'true' : null;
    }
    get hostDisabled() {
        return this.disabled ? 'true' : null;
    }
    onClick() {
        if (!this.disabled) {
            this.clicked.emit();
        }
    }
    onClear(event) {
        event.stopPropagation();
        if (!this.disabled) {
            this.cleared.emit();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFilterChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthFilterChipComponent, isStandalone: true, selector: "ath-filter-chip", inputs: { label: "label", value: "value", active: "active", clearable: "clearable", disabled: "disabled" }, outputs: { clicked: "clicked", cleared: "cleared" }, host: { properties: { "attr.data-active": "this.hostActive", "attr.data-disabled": "this.hostDisabled" } }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-fchip\"\n  [disabled]=\"disabled\"\n  (click)=\"onClick()\"\n>\n  <span class=\"ath-fchip__label\">{{ label }}</span>\n  <span class=\"ath-fchip__value\">{{ value }}</span>\n\n  @if (clearable && active) {\n    <button\n      type=\"button\"\n      class=\"ath-fchip__clear\"\n      [attr.aria-label]=\"'Clear ' + label + ' filter'\"\n      (click)=\"onClear($event)\"\n    >\n      <lucide-icon [img]=\"clearIcon\" [size]=\"11\" />\n    </button>\n  } @else {\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"11\" class=\"ath-fchip__chevron\" />\n  }\n</button>\n", styles: [":host{display:inline-flex}.ath-fchip{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 10px;background:var(--bg-2);border:1px solid transparent;border-radius:var(--r);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-normal);color:var(--fg-2);cursor:pointer;white-space:nowrap;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);letter-spacing:-.005em}.ath-fchip:hover:not(:disabled){background:var(--hover-strong);color:var(--fg)}.ath-fchip:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fchip:disabled{opacity:.5;cursor:not-allowed}.ath-fchip__label{color:var(--fg-3);font-weight:var(--weight-normal)}.ath-fchip__value{color:var(--fg);font-weight:var(--weight-semibold)}.ath-fchip__chevron{color:var(--fg-4);margin-left:2px}.ath-fchip__clear{display:inline-flex;align-items:center;justify-content:center;margin:0 -2px 0 2px;width:16px;height:16px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-fchip__clear:hover{background:var(--hover-strong);color:var(--fg)}:host([data-active=true]) .ath-fchip{border-color:var(--chip-active-border)}:host([data-active=true]) .ath-fchip .ath-fchip__label{color:var(--fg-2)}body.compact .ath-fchip{height:22px;padding:0 7px;font-size:11.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFilterChipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-filter-chip', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-fchip\"\n  [disabled]=\"disabled\"\n  (click)=\"onClick()\"\n>\n  <span class=\"ath-fchip__label\">{{ label }}</span>\n  <span class=\"ath-fchip__value\">{{ value }}</span>\n\n  @if (clearable && active) {\n    <button\n      type=\"button\"\n      class=\"ath-fchip__clear\"\n      [attr.aria-label]=\"'Clear ' + label + ' filter'\"\n      (click)=\"onClear($event)\"\n    >\n      <lucide-icon [img]=\"clearIcon\" [size]=\"11\" />\n    </button>\n  } @else {\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"11\" class=\"ath-fchip__chevron\" />\n  }\n</button>\n", styles: [":host{display:inline-flex}.ath-fchip{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 10px;background:var(--bg-2);border:1px solid transparent;border-radius:var(--r);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-normal);color:var(--fg-2);cursor:pointer;white-space:nowrap;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);letter-spacing:-.005em}.ath-fchip:hover:not(:disabled){background:var(--hover-strong);color:var(--fg)}.ath-fchip:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fchip:disabled{opacity:.5;cursor:not-allowed}.ath-fchip__label{color:var(--fg-3);font-weight:var(--weight-normal)}.ath-fchip__value{color:var(--fg);font-weight:var(--weight-semibold)}.ath-fchip__chevron{color:var(--fg-4);margin-left:2px}.ath-fchip__clear{display:inline-flex;align-items:center;justify-content:center;margin:0 -2px 0 2px;width:16px;height:16px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-fchip__clear:hover{background:var(--hover-strong);color:var(--fg)}:host([data-active=true]) .ath-fchip{border-color:var(--chip-active-border)}:host([data-active=true]) .ath-fchip .ath-fchip__label{color:var(--fg-2)}body.compact .ath-fchip{height:22px;padding:0 7px;font-size:11.5px}\n"] }]
        }], propDecorators: { label: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input
            }], active: [{
                type: Input
            }], clearable: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clicked: [{
                type: Output
            }], cleared: [{
                type: Output
            }], hostActive: [{
                type: HostBinding,
                args: ['attr.data-active']
            }], hostDisabled: [{
                type: HostBinding,
                args: ['attr.data-disabled']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWNoaXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2ZpbHRlci1jaGlwL2ZpbHRlci1jaGlwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9maWx0ZXItY2hpcC9maWx0ZXItY2hpcC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRXJFOzs7Ozs7Ozs7R0FTRztBQVNILE1BQU0sT0FBTyxzQkFBc0I7SUFSbkM7UUFVVyxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRXBCLCtEQUErRDtRQUN0RCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXhCLG9EQUFvRDtRQUMzQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFaEIsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbkMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFMUIsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFDMUIsY0FBUyxHQUFHLENBQUMsQ0FBQztLQXNCbEM7SUFwQkMsSUFBcUMsVUFBVTtRQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUF1QyxZQUFZO1FBQ2pELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLENBQUMsS0FBaUI7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQzsrR0FyQ1Usc0JBQXNCO21HQUF0QixzQkFBc0Isd1ZDdEJuQyxnbUJBc0JBLDg5Q0RMWSxZQUFZLDhCQUFFLG1CQUFtQjs7NEZBS2hDLHNCQUFzQjtrQkFSbEMsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsbUJBQzNCLHVCQUF1QixDQUFDLE1BQU07OEJBS3BCLEtBQUs7c0JBQS9CLEtBQUs7dUJBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO2dCQUNoQixLQUFLO3NCQUFiLEtBQUs7Z0JBR0csTUFBTTtzQkFBZCxLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxPQUFPO3NCQUFoQixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU07Z0JBSzhCLFVBQVU7c0JBQTlDLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUlRLFlBQVk7c0JBQWxELFdBQVc7dUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUsIENoZXZyb25Eb3duLCBYIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuXG4vKipcbiAqIEZpbHRlciBwaWxsIGluIHRoZSBzdHlsZSBgTGFiZWwgVmFsdWUg4pa+YDogcXVpZXQgZ3JleSBmaWxsLCBtdXRlZCBsYWJlbCxcbiAqIHNlbWlib2xkIHZhbHVlLCBubyBzZXBhcmF0b3IuIE9wdGlvbmFsIGNsZWFyYWJsZS5cbiAqIFR5cGljYWxseSB1c2VkIGluIHRvb2xiYXJzIHRvIGNvbXBvc2UgcXVlcnkgZmlsdGVycy5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1maWx0ZXItY2hpcCBsYWJlbD1cIlN0YXR1c1wiIHZhbHVlPVwiQW55XCIgKGNsaWNrZWQpPVwib3Blbk1lbnUoKVwiIC8+XG4gKiA8YXRoLWZpbHRlci1jaGlwIGxhYmVsPVwiQXNzaWduZWVcIiB2YWx1ZT1cIk1pcmEgVm9zc1wiIFthY3RpdmVdPVwidHJ1ZVwiIFtjbGVhcmFibGVdPVwidHJ1ZVwiXG4gKiAgICAgICAgICAgICAgICAgIChjbGlja2VkKT1cIm9wZW4oKVwiIChjbGVhcmVkKT1cInJlc2V0KClcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtZmlsdGVyLWNoaXAnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBMdWNpZGVBbmd1bGFyTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWx0ZXItY2hpcC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9maWx0ZXItY2hpcC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aEZpbHRlckNoaXBDb21wb25lbnQge1xuICBASW5wdXQoeyByZXF1aXJlZDogdHJ1ZSB9KSBsYWJlbCE6IHN0cmluZztcbiAgQElucHV0KCkgdmFsdWUgPSAnJztcblxuICAvKiogVmlzdWFsbHkgaGlnaGxpZ2h0cyB0aGUgY2hpcCB3aGVuIGEgZmlsdGVyIHZhbHVlIGlzIHNldC4gKi9cbiAgQElucHV0KCkgYWN0aXZlID0gZmFsc2U7XG5cbiAgLyoqIFNob3dzIGEgc21hbGwgYMOXYCBidXR0b24gdG8gY2xlYXIgdGhlIGZpbHRlci4gKi9cbiAgQElucHV0KCkgY2xlYXJhYmxlID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgY2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGNsZWFyZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNoZXZyb25JY29uID0gQ2hldnJvbkRvd247XG4gIHByb3RlY3RlZCByZWFkb25seSBjbGVhckljb24gPSBYO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5kYXRhLWFjdGl2ZScpIGdldCBob3N0QWN0aXZlKCk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZSA/ICd0cnVlJyA6IG51bGw7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1kaXNhYmxlZCcpIGdldCBob3N0RGlzYWJsZWQoKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAndHJ1ZScgOiBudWxsO1xuICB9XG5cbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuY2xpY2tlZC5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgb25DbGVhcihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgdGhpcy5jbGVhcmVkLmVtaXQoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgdHlwZT1cImJ1dHRvblwiXG4gIGNsYXNzPVwiYXRoLWZjaGlwXCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgKGNsaWNrKT1cIm9uQ2xpY2soKVwiXG4+XG4gIDxzcGFuIGNsYXNzPVwiYXRoLWZjaGlwX19sYWJlbFwiPnt7IGxhYmVsIH19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImF0aC1mY2hpcF9fdmFsdWVcIj57eyB2YWx1ZSB9fTwvc3Bhbj5cblxuICBAaWYgKGNsZWFyYWJsZSAmJiBhY3RpdmUpIHtcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwiYXRoLWZjaGlwX19jbGVhclwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidDbGVhciAnICsgbGFiZWwgKyAnIGZpbHRlcidcIlxuICAgICAgKGNsaWNrKT1cIm9uQ2xlYXIoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiY2xlYXJJY29uXCIgW3NpemVdPVwiMTFcIiAvPlxuICAgIDwvYnV0dG9uPlxuICB9IEBlbHNlIHtcbiAgICA8bHVjaWRlLWljb24gW2ltZ109XCJjaGV2cm9uSWNvblwiIFtzaXplXT1cIjExXCIgY2xhc3M9XCJhdGgtZmNoaXBfX2NoZXZyb25cIiAvPlxuICB9XG48L2J1dHRvbj5cbiJdfQ==