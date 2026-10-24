import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Info, AlertTriangle, AlertOctagon, CheckCircle2, X, } from 'lucide-angular';
import { injectAthLabels } from '../../i18n/labels';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Page-level banner for system-wide notices (maintenance, trial-ending,
 * plan-limit, deprecation, etc.).
 *
 * Lives at the top of a layout — typically full-width. For inline alerts
 * within forms or cards use `<ath-alert>`.
 *
 * @example
 * <ath-banner tone="warning" title="Maintenance scheduled">
 *   Athene will be unavailable on Sat 22:00–22:30 CET.
 * </ath-banner>
 * <ath-banner tone="danger" title="Trial ends in 2 days" [dismissible]="true"
 *             (dismissed)="hide()">
 *   Add a payment method to keep your Pro features.
 * </ath-banner>
 */
export class AthBannerComponent {
    constructor() {
        this.labels = injectAthLabels();
        this.tone = 'info';
        this.title = null;
        this.dismissible = false;
        this.dismissed = new EventEmitter();
        this.closeIcon = X;
    }
    get hostTone() {
        return this.tone;
    }
    get hostRole() {
        return this.tone === 'danger' || this.tone === 'warning' ? 'alert' : 'status';
    }
    get icon() {
        switch (this.tone) {
            case 'warning':
                return AlertTriangle;
            case 'danger':
                return AlertOctagon;
            case 'success':
                return CheckCircle2;
            case 'info':
            default:
                return Info;
        }
    }
    onDismiss() {
        this.dismissed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBannerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthBannerComponent, isStandalone: true, selector: "ath-banner", inputs: { tone: "tone", title: "title", dismissible: "dismissible" }, outputs: { dismissed: "dismissed" }, host: { properties: { "attr.data-tone": "this.hostTone", "attr.role": "this.hostRole" } }, ngImport: i0, template: "<span class=\"ath-banner__icon\" aria-hidden=\"true\">\n  <lucide-icon [img]=\"icon\" [size]=\"16\" />\n</span>\n<div class=\"ath-banner__body\">\n  @if (title) {\n    <strong class=\"ath-banner__title\">{{ title }}</strong>\n  }\n  <span class=\"ath-banner__message\"><ng-content /></span>\n</div>\n<div class=\"ath-banner__actions\">\n  <ng-content select=\"[banner-action]\" />\n  @if (dismissible) {\n    <button\n      type=\"button\"\n      class=\"ath-banner__close\"\n      [attr.aria-label]=\"labels.dismiss()\"\n      (click)=\"onDismiss()\"\n    >\n      <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n    </button>\n  }\n</div>\n", styles: [":host{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-top:1px solid transparent;border-bottom:1px solid transparent;font-family:var(--font-sans);font-size:13px;line-height:1.5}.ath-banner__icon{flex-shrink:0;display:inline-flex;align-items:center;margin-top:1px}.ath-banner__body{flex:1;min-width:0}.ath-banner__title{display:inline;margin-right:6px;font-weight:600;letter-spacing:-.005em}.ath-banner__message{display:inline;color:inherit}.ath-banner__actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.ath-banner__close{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;background:transparent;border:0;border-radius:var(--r-sm);color:inherit;opacity:.7;cursor:pointer;transition:opacity var(--t-fast),background var(--t-fast)}.ath-banner__close:hover{opacity:1;background:var(--hover-strong)}:host([data-tone=info]){background:var(--blue-tint);color:var(--blue);border-color:var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent)}:host([data-tone=info]) .ath-banner__title{color:var(--fg)}:host([data-tone=info]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=warning]){background:var(--amber-tint);color:var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent)}:host([data-tone=warning]) .ath-banner__title{color:var(--fg)}:host([data-tone=warning]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=danger]){background:var(--red-tint);color:var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent)}:host([data-tone=danger]) .ath-banner__title{color:var(--fg)}:host([data-tone=danger]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=success]){background:var(--green-tint);color:var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-tone=success]) .ath-banner__title{color:var(--fg)}:host([data-tone=success]) .ath-banner__message{color:var(--fg-2)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-banner', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-banner__icon\" aria-hidden=\"true\">\n  <lucide-icon [img]=\"icon\" [size]=\"16\" />\n</span>\n<div class=\"ath-banner__body\">\n  @if (title) {\n    <strong class=\"ath-banner__title\">{{ title }}</strong>\n  }\n  <span class=\"ath-banner__message\"><ng-content /></span>\n</div>\n<div class=\"ath-banner__actions\">\n  <ng-content select=\"[banner-action]\" />\n  @if (dismissible) {\n    <button\n      type=\"button\"\n      class=\"ath-banner__close\"\n      [attr.aria-label]=\"labels.dismiss()\"\n      (click)=\"onDismiss()\"\n    >\n      <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n    </button>\n  }\n</div>\n", styles: [":host{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-top:1px solid transparent;border-bottom:1px solid transparent;font-family:var(--font-sans);font-size:13px;line-height:1.5}.ath-banner__icon{flex-shrink:0;display:inline-flex;align-items:center;margin-top:1px}.ath-banner__body{flex:1;min-width:0}.ath-banner__title{display:inline;margin-right:6px;font-weight:600;letter-spacing:-.005em}.ath-banner__message{display:inline;color:inherit}.ath-banner__actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.ath-banner__close{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;background:transparent;border:0;border-radius:var(--r-sm);color:inherit;opacity:.7;cursor:pointer;transition:opacity var(--t-fast),background var(--t-fast)}.ath-banner__close:hover{opacity:1;background:var(--hover-strong)}:host([data-tone=info]){background:var(--blue-tint);color:var(--blue);border-color:var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent)}:host([data-tone=info]) .ath-banner__title{color:var(--fg)}:host([data-tone=info]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=warning]){background:var(--amber-tint);color:var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent)}:host([data-tone=warning]) .ath-banner__title{color:var(--fg)}:host([data-tone=warning]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=danger]){background:var(--red-tint);color:var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent)}:host([data-tone=danger]) .ath-banner__title{color:var(--fg)}:host([data-tone=danger]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=success]){background:var(--green-tint);color:var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-tone=success]) .ath-banner__title{color:var(--fg)}:host([data-tone=success]) .ath-banner__message{color:var(--fg-2)}\n"] }]
        }], propDecorators: { tone: [{
                type: Input
            }], title: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], dismissed: [{
                type: Output
            }], hostTone: [{
                type: HostBinding,
                args: ['attr.data-tone']
            }], hostRole: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9iYW5uZXIvYmFubmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9iYW5uZXIvYmFubmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixJQUFJLEVBQ0osYUFBYSxFQUNiLFlBQVksRUFDWixZQUFZLEVBQ1osQ0FBQyxHQUNGLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFJcEQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBU0gsTUFBTSxPQUFPLGtCQUFrQjtJQVIvQjtRQVNxQixXQUFNLEdBQUcsZUFBZSxFQUFFLENBQUM7UUFFckMsU0FBSSxHQUFlLE1BQU0sQ0FBQztRQUMxQixVQUFLLEdBQWtCLElBQUksQ0FBQztRQUM1QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVuQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQVU1QixjQUFTLEdBQUcsQ0FBQyxDQUFDO0tBbUJsQztJQTNCQyxJQUFtQyxRQUFRO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBOEIsUUFBUTtRQUNwQyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNoRixDQUFDO0lBSUQsSUFBYyxJQUFJO1FBQ2hCLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLEtBQUssU0FBUztnQkFDWixPQUFPLGFBQWEsQ0FBQztZQUN2QixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxZQUFZLENBQUM7WUFDdEIsS0FBSyxTQUFTO2dCQUNaLE9BQU8sWUFBWSxDQUFDO1lBQ3RCLEtBQUssTUFBTSxDQUFDO1lBQ1o7Z0JBQ0UsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDOytHQW5DVSxrQkFBa0I7bUdBQWxCLGtCQUFrQiw0UUM3Qy9CLHVvQkFzQkEsdThERGtCWSxZQUFZLDhCQUFFLG1CQUFtQjs7NEZBS2hDLGtCQUFrQjtrQkFSOUIsU0FBUzsrQkFDRSxZQUFZLGNBQ1YsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDLG1CQUMzQix1QkFBdUIsQ0FBQyxNQUFNOzhCQU90QyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUksU0FBUztzQkFBbEIsTUFBTTtnQkFFNEIsUUFBUTtzQkFBMUMsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBSUMsUUFBUTtzQkFBckMsV0FBVzt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgTHVjaWRlQW5ndWxhck1vZHVsZSxcbiAgSW5mbyxcbiAgQWxlcnRUcmlhbmdsZSxcbiAgQWxlcnRPY3RhZ29uLFxuICBDaGVja0NpcmNsZTIsXG4gIFgsXG59IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcbmltcG9ydCB7IGluamVjdEF0aExhYmVscyB9IGZyb20gJy4uLy4uL2kxOG4vbGFiZWxzJztcblxuZXhwb3J0IHR5cGUgQmFubmVyVG9uZSA9ICdpbmZvJyB8ICd3YXJuaW5nJyB8ICdkYW5nZXInIHwgJ3N1Y2Nlc3MnO1xuXG4vKipcbiAqIFBhZ2UtbGV2ZWwgYmFubmVyIGZvciBzeXN0ZW0td2lkZSBub3RpY2VzIChtYWludGVuYW5jZSwgdHJpYWwtZW5kaW5nLFxuICogcGxhbi1saW1pdCwgZGVwcmVjYXRpb24sIGV0Yy4pLlxuICpcbiAqIExpdmVzIGF0IHRoZSB0b3Agb2YgYSBsYXlvdXQg4oCUIHR5cGljYWxseSBmdWxsLXdpZHRoLiBGb3IgaW5saW5lIGFsZXJ0c1xuICogd2l0aGluIGZvcm1zIG9yIGNhcmRzIHVzZSBgPGF0aC1hbGVydD5gLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWJhbm5lciB0b25lPVwid2FybmluZ1wiIHRpdGxlPVwiTWFpbnRlbmFuY2Ugc2NoZWR1bGVkXCI+XG4gKiAgIEF0aGVuZSB3aWxsIGJlIHVuYXZhaWxhYmxlIG9uIFNhdCAyMjowMOKAkzIyOjMwIENFVC5cbiAqIDwvYXRoLWJhbm5lcj5cbiAqIDxhdGgtYmFubmVyIHRvbmU9XCJkYW5nZXJcIiB0aXRsZT1cIlRyaWFsIGVuZHMgaW4gMiBkYXlzXCIgW2Rpc21pc3NpYmxlXT1cInRydWVcIlxuICogICAgICAgICAgICAgKGRpc21pc3NlZCk9XCJoaWRlKClcIj5cbiAqICAgQWRkIGEgcGF5bWVudCBtZXRob2QgdG8ga2VlcCB5b3VyIFBybyBmZWF0dXJlcy5cbiAqIDwvYXRoLWJhbm5lcj5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWJhbm5lcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2Jhbm5lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9iYW5uZXIuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhCYW5uZXJDb21wb25lbnQge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbGFiZWxzID0gaW5qZWN0QXRoTGFiZWxzKCk7XG5cbiAgQElucHV0KCkgdG9uZTogQmFubmVyVG9uZSA9ICdpbmZvJztcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNtaXNzaWJsZSA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBkaXNtaXNzZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRhdGEtdG9uZScpIGdldCBob3N0VG9uZSgpOiBCYW5uZXJUb25lIHtcbiAgICByZXR1cm4gdGhpcy50b25lO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnJvbGUnKSBnZXQgaG9zdFJvbGUoKTogJ3N0YXR1cycgfCAnYWxlcnQnIHtcbiAgICByZXR1cm4gdGhpcy50b25lID09PSAnZGFuZ2VyJyB8fCB0aGlzLnRvbmUgPT09ICd3YXJuaW5nJyA/ICdhbGVydCcgOiAnc3RhdHVzJztcbiAgfVxuXG4gIHByb3RlY3RlZCByZWFkb25seSBjbG9zZUljb24gPSBYO1xuXG4gIHByb3RlY3RlZCBnZXQgaWNvbigpIHtcbiAgICBzd2l0Y2ggKHRoaXMudG9uZSkge1xuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIHJldHVybiBBbGVydFRyaWFuZ2xlO1xuICAgICAgY2FzZSAnZGFuZ2VyJzpcbiAgICAgICAgcmV0dXJuIEFsZXJ0T2N0YWdvbjtcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICByZXR1cm4gQ2hlY2tDaXJjbGUyO1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gSW5mbztcbiAgICB9XG4gIH1cblxuICBvbkRpc21pc3MoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNtaXNzZWQuZW1pdCgpO1xuICB9XG59XG4iLCI8c3BhbiBjbGFzcz1cImF0aC1iYW5uZXJfX2ljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgPGx1Y2lkZS1pY29uIFtpbWddPVwiaWNvblwiIFtzaXplXT1cIjE2XCIgLz5cbjwvc3Bhbj5cbjxkaXYgY2xhc3M9XCJhdGgtYmFubmVyX19ib2R5XCI+XG4gIEBpZiAodGl0bGUpIHtcbiAgICA8c3Ryb25nIGNsYXNzPVwiYXRoLWJhbm5lcl9fdGl0bGVcIj57eyB0aXRsZSB9fTwvc3Ryb25nPlxuICB9XG4gIDxzcGFuIGNsYXNzPVwiYXRoLWJhbm5lcl9fbWVzc2FnZVwiPjxuZy1jb250ZW50IC8+PC9zcGFuPlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiYXRoLWJhbm5lcl9fYWN0aW9uc1wiPlxuICA8bmctY29udGVudCBzZWxlY3Q9XCJbYmFubmVyLWFjdGlvbl1cIiAvPlxuICBAaWYgKGRpc21pc3NpYmxlKSB7XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cImF0aC1iYW5uZXJfX2Nsb3NlXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxzLmRpc21pc3MoKVwiXG4gICAgICAoY2xpY2spPVwib25EaXNtaXNzKClcIlxuICAgID5cbiAgICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cImNsb3NlSWNvblwiIFtzaXplXT1cIjE0XCIgLz5cbiAgICA8L2J1dHRvbj5cbiAgfVxuPC9kaXY+XG4iXX0=