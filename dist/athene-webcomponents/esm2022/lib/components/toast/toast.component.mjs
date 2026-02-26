import { Component, ChangeDetectionStrategy, Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-angular';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Toast Service
 *
 * Global notification service for displaying toast messages.
 *
 * @example
 * constructor(private toast: AthToastService) {}
 * this.toast.success('Item created');
 * this.toast.error('Something went wrong');
 */
export class AthToastService {
    constructor() {
        this.toastsSignal = signal([]);
        this.toasts = this.toastsSignal.asReadonly();
    }
    success(message, duration = 4000) {
        this.add({ variant: 'success', message, duration });
    }
    error(message, duration = 6000) {
        this.add({ variant: 'error', message, duration });
    }
    warning(message, duration = 5000) {
        this.add({ variant: 'warning', message, duration });
    }
    info(message, duration = 4000) {
        this.add({ variant: 'info', message, duration });
    }
    remove(id) {
        this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
    }
    add(options) {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        const toast = { id, ...options };
        this.toastsSignal.update(toasts => [...toasts, toast]);
        if (options.duration && options.duration > 0) {
            setTimeout(() => this.remove(id), options.duration);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * Athene Toast Container Component
 *
 * Renders global toast notifications. Place once in the root component.
 *
 * @example
 * <!-- app.component.html -->
 * <router-outlet />
 * <ath-toast-container />
 */
export class AthToastContainerComponent {
    constructor(toastService) {
        this.toastService = toastService;
        this.successIcon = CheckCircle;
        this.errorIcon = AlertCircle;
        this.warningIcon = AlertTriangle;
        this.infoIcon = Info;
        this.closeIcon = X;
    }
    get toasts() {
        return this.toastService.toasts();
    }
    getIcon(variant) {
        switch (variant) {
            case 'success': return this.successIcon;
            case 'error': return this.errorIcon;
            case 'warning': return this.warningIcon;
            case 'info': return this.infoIcon;
        }
    }
    dismiss(id) {
        this.toastService.remove(id);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastContainerComponent, deps: [{ token: AthToastService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthToastContainerComponent, isStandalone: true, selector: "ath-toast-container", ngImport: i0, template: "<div class=\"ath-toast-container\" aria-live=\"polite\">\n  @for (toast of toasts; track toast.id) {\n    <div class=\"ath-toast\" [class]=\"'ath-toast ath-toast--' + toast.variant\">\n      <lucide-icon [img]=\"getIcon(toast.variant)\" [size]=\"18\" class=\"ath-toast__icon\" />\n      <span class=\"ath-toast__message\">{{ toast.message }}</span>\n      <button type=\"button\" class=\"ath-toast__close\" (click)=\"dismiss(toast.id)\">\n        <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n      </button>\n    </div>\n  }\n</div>\n", styles: [".ath-toast-container{position:fixed;top:var(--ath-space-4);right:var(--ath-space-4);z-index:var(--ath-z-toast);display:flex;flex-direction:column;gap:var(--ath-space-2);max-width:420px;width:100%;pointer-events:none}.ath-toast{display:flex;align-items:flex-start;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg);pointer-events:auto;animation:ath-toast-in .2s ease}.ath-toast--success{border-left:3px solid var(--ath-color-success)}.ath-toast--success .ath-toast__icon{color:var(--ath-color-success)}.ath-toast--error{border-left:3px solid var(--ath-color-error)}.ath-toast--error .ath-toast__icon{color:var(--ath-color-error)}.ath-toast--warning{border-left:3px solid var(--ath-color-warning)}.ath-toast--warning .ath-toast__icon{color:var(--ath-color-warning)}.ath-toast--info{border-left:3px solid var(--ath-color-info)}.ath-toast--info .ath-toast__icon{color:var(--ath-color-info)}.ath-toast__icon{flex-shrink:0;margin-top:1px}.ath-toast__message{flex:1;font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);line-height:var(--ath-line-height-normal)}.ath-toast__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast)}.ath-toast__close:hover{color:var(--ath-text-primary)}@keyframes ath-toast-in{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-toast-container', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-toast-container\" aria-live=\"polite\">\n  @for (toast of toasts; track toast.id) {\n    <div class=\"ath-toast\" [class]=\"'ath-toast ath-toast--' + toast.variant\">\n      <lucide-icon [img]=\"getIcon(toast.variant)\" [size]=\"18\" class=\"ath-toast__icon\" />\n      <span class=\"ath-toast__message\">{{ toast.message }}</span>\n      <button type=\"button\" class=\"ath-toast__close\" (click)=\"dismiss(toast.id)\">\n        <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n      </button>\n    </div>\n  }\n</div>\n", styles: [".ath-toast-container{position:fixed;top:var(--ath-space-4);right:var(--ath-space-4);z-index:var(--ath-z-toast);display:flex;flex-direction:column;gap:var(--ath-space-2);max-width:420px;width:100%;pointer-events:none}.ath-toast{display:flex;align-items:flex-start;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg);pointer-events:auto;animation:ath-toast-in .2s ease}.ath-toast--success{border-left:3px solid var(--ath-color-success)}.ath-toast--success .ath-toast__icon{color:var(--ath-color-success)}.ath-toast--error{border-left:3px solid var(--ath-color-error)}.ath-toast--error .ath-toast__icon{color:var(--ath-color-error)}.ath-toast--warning{border-left:3px solid var(--ath-color-warning)}.ath-toast--warning .ath-toast__icon{color:var(--ath-color-warning)}.ath-toast--info{border-left:3px solid var(--ath-color-info)}.ath-toast--info .ath-toast__icon{color:var(--ath-color-info)}.ath-toast__icon{flex-shrink:0;margin-top:1px}.ath-toast__message{flex:1;font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);line-height:var(--ath-line-height-normal)}.ath-toast__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast)}.ath-toast__close:hover{color:var(--ath-text-primary)}@keyframes ath-toast-in{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}\n"] }]
        }], ctorParameters: () => [{ type: AthToastService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3RvYXN0L3RvYXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy90b2FzdC90b2FzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQWlCdkc7Ozs7Ozs7OztHQVNHO0FBRUgsTUFBTSxPQUFPLGVBQWU7SUFENUI7UUFFVSxpQkFBWSxHQUFHLE1BQU0sQ0FBaUIsRUFBRSxDQUFDLENBQUM7UUFDekMsV0FBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7S0FnQ2xEO0lBOUJDLE9BQU8sQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFVO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTyxHQUFHLENBQUMsT0FBaUM7UUFDM0MsTUFBTSxFQUFFLEdBQUcsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDNUUsTUFBTSxLQUFLLEdBQWlCLEVBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFdkQsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0MsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDSCxDQUFDOytHQWpDVSxlQUFlO21IQUFmLGVBQWUsY0FERixNQUFNOzs0RkFDbkIsZUFBZTtrQkFEM0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBcUNsQzs7Ozs7Ozs7O0dBU0c7QUFTSCxNQUFNLE9BQU8sMEJBQTBCO0lBT3JDLFlBQXNCLFlBQTZCO1FBQTdCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQU5oQyxnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixjQUFTLEdBQUcsV0FBVyxDQUFDO1FBQ3hCLGdCQUFXLEdBQUcsYUFBYSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsY0FBUyxHQUFHLENBQUMsQ0FBQztJQUVxQixDQUFDO0lBRXZELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQXFCO1FBQzNCLFFBQVEsT0FBTyxFQUFFLENBQUM7WUFDaEIsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDeEMsS0FBSyxPQUFPLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDcEMsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDeEMsS0FBSyxNQUFNLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDcEMsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLENBQUMsRUFBVTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDOytHQXhCVSwwQkFBMEI7bUdBQTFCLDBCQUEwQiwrRUNwRnZDLDhoQkFXQSxtc0REb0VZLFlBQVksOEJBQUUsbUJBQW1COzs0RkFLaEMsMEJBQTBCO2tCQVJ0QyxTQUFTOytCQUNFLHFCQUFxQixjQUNuQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsbUJBQzNCLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbmplY3RhYmxlLCBzaWduYWwsIGNvbXB1dGVkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSwgWCwgQ2hlY2tDaXJjbGUsIEFsZXJ0Q2lyY2xlLCBJbmZvLCBBbGVydFRyaWFuZ2xlIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuXG4vKipcbiAqIFRvYXN0IHZhcmlhbnQgdHlwZXNcbiAqL1xuZXhwb3J0IHR5cGUgVG9hc3RWYXJpYW50ID0gJ3N1Y2Nlc3MnIHwgJ2Vycm9yJyB8ICd3YXJuaW5nJyB8ICdpbmZvJztcblxuLyoqXG4gKiBUb2FzdCBtZXNzYWdlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9hc3RNZXNzYWdlIHtcbiAgaWQ6IHN0cmluZztcbiAgdmFyaWFudDogVG9hc3RWYXJpYW50O1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIGR1cmF0aW9uPzogbnVtYmVyO1xufVxuXG4vKipcbiAqIFRvYXN0IFNlcnZpY2VcbiAqXG4gKiBHbG9iYWwgbm90aWZpY2F0aW9uIHNlcnZpY2UgZm9yIGRpc3BsYXlpbmcgdG9hc3QgbWVzc2FnZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgdG9hc3Q6IEF0aFRvYXN0U2VydmljZSkge31cbiAqIHRoaXMudG9hc3Quc3VjY2VzcygnSXRlbSBjcmVhdGVkJyk7XG4gKiB0aGlzLnRvYXN0LmVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZycpO1xuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEF0aFRvYXN0U2VydmljZSB7XG4gIHByaXZhdGUgdG9hc3RzU2lnbmFsID0gc2lnbmFsPFRvYXN0TWVzc2FnZVtdPihbXSk7XG4gIHJlYWRvbmx5IHRvYXN0cyA9IHRoaXMudG9hc3RzU2lnbmFsLmFzUmVhZG9ubHkoKTtcblxuICBzdWNjZXNzKG1lc3NhZ2U6IHN0cmluZywgZHVyYXRpb24gPSA0MDAwKTogdm9pZCB7XG4gICAgdGhpcy5hZGQoeyB2YXJpYW50OiAnc3VjY2VzcycsIG1lc3NhZ2UsIGR1cmF0aW9uIH0pO1xuICB9XG5cbiAgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBkdXJhdGlvbiA9IDYwMDApOiB2b2lkIHtcbiAgICB0aGlzLmFkZCh7IHZhcmlhbnQ6ICdlcnJvcicsIG1lc3NhZ2UsIGR1cmF0aW9uIH0pO1xuICB9XG5cbiAgd2FybmluZyhtZXNzYWdlOiBzdHJpbmcsIGR1cmF0aW9uID0gNTAwMCk6IHZvaWQge1xuICAgIHRoaXMuYWRkKHsgdmFyaWFudDogJ3dhcm5pbmcnLCBtZXNzYWdlLCBkdXJhdGlvbiB9KTtcbiAgfVxuXG4gIGluZm8obWVzc2FnZTogc3RyaW5nLCBkdXJhdGlvbiA9IDQwMDApOiB2b2lkIHtcbiAgICB0aGlzLmFkZCh7IHZhcmlhbnQ6ICdpbmZvJywgbWVzc2FnZSwgZHVyYXRpb24gfSk7XG4gIH1cblxuICByZW1vdmUoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudG9hc3RzU2lnbmFsLnVwZGF0ZSh0b2FzdHMgPT4gdG9hc3RzLmZpbHRlcih0ID0+IHQuaWQgIT09IGlkKSk7XG4gIH1cblxuICBwcml2YXRlIGFkZChvcHRpb25zOiBPbWl0PFRvYXN0TWVzc2FnZSwgJ2lkJz4pOiB2b2lkIHtcbiAgICBjb25zdCBpZCA9IGB0b2FzdC0ke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDUpfWA7XG4gICAgY29uc3QgdG9hc3Q6IFRvYXN0TWVzc2FnZSA9IHsgaWQsIC4uLm9wdGlvbnMgfTtcblxuICAgIHRoaXMudG9hc3RzU2lnbmFsLnVwZGF0ZSh0b2FzdHMgPT4gWy4uLnRvYXN0cywgdG9hc3RdKTtcblxuICAgIGlmIChvcHRpb25zLmR1cmF0aW9uICYmIG9wdGlvbnMuZHVyYXRpb24gPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlKGlkKSwgb3B0aW9ucy5kdXJhdGlvbik7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQXRoZW5lIFRvYXN0IENvbnRhaW5lciBDb21wb25lbnRcbiAqXG4gKiBSZW5kZXJzIGdsb2JhbCB0b2FzdCBub3RpZmljYXRpb25zLiBQbGFjZSBvbmNlIGluIHRoZSByb290IGNvbXBvbmVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogPCEtLSBhcHAuY29tcG9uZW50Lmh0bWwgLS0+XG4gKiA8cm91dGVyLW91dGxldCAvPlxuICogPGF0aC10b2FzdC1jb250YWluZXIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLXRvYXN0LWNvbnRhaW5lcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3RvYXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3RvYXN0LmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoVG9hc3RDb250YWluZXJDb21wb25lbnQge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3VjY2Vzc0ljb24gPSBDaGVja0NpcmNsZTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGVycm9ySWNvbiA9IEFsZXJ0Q2lyY2xlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgd2FybmluZ0ljb24gPSBBbGVydFRyaWFuZ2xlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgaW5mb0ljb24gPSBJbmZvO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2xvc2VJY29uID0gWDtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdG9hc3RTZXJ2aWNlOiBBdGhUb2FzdFNlcnZpY2UpIHt9XG5cbiAgZ2V0IHRvYXN0cygpIHtcbiAgICByZXR1cm4gdGhpcy50b2FzdFNlcnZpY2UudG9hc3RzKCk7XG4gIH1cblxuICBnZXRJY29uKHZhcmlhbnQ6IFRvYXN0VmFyaWFudCkge1xuICAgIHN3aXRjaCAodmFyaWFudCkge1xuICAgICAgY2FzZSAnc3VjY2Vzcyc6IHJldHVybiB0aGlzLnN1Y2Nlc3NJY29uO1xuICAgICAgY2FzZSAnZXJyb3InOiByZXR1cm4gdGhpcy5lcnJvckljb247XG4gICAgICBjYXNlICd3YXJuaW5nJzogcmV0dXJuIHRoaXMud2FybmluZ0ljb247XG4gICAgICBjYXNlICdpbmZvJzogcmV0dXJuIHRoaXMuaW5mb0ljb247XG4gICAgfVxuICB9XG5cbiAgZGlzbWlzcyhpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50b2FzdFNlcnZpY2UucmVtb3ZlKGlkKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImF0aC10b2FzdC1jb250YWluZXJcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cbiAgQGZvciAodG9hc3Qgb2YgdG9hc3RzOyB0cmFjayB0b2FzdC5pZCkge1xuICAgIDxkaXYgY2xhc3M9XCJhdGgtdG9hc3RcIiBbY2xhc3NdPVwiJ2F0aC10b2FzdCBhdGgtdG9hc3QtLScgKyB0b2FzdC52YXJpYW50XCI+XG4gICAgICA8bHVjaWRlLWljb24gW2ltZ109XCJnZXRJY29uKHRvYXN0LnZhcmlhbnQpXCIgW3NpemVdPVwiMThcIiBjbGFzcz1cImF0aC10b2FzdF9faWNvblwiIC8+XG4gICAgICA8c3BhbiBjbGFzcz1cImF0aC10b2FzdF9fbWVzc2FnZVwiPnt7IHRvYXN0Lm1lc3NhZ2UgfX08L3NwYW4+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImF0aC10b2FzdF9fY2xvc2VcIiAoY2xpY2spPVwiZGlzbWlzcyh0b2FzdC5pZClcIj5cbiAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiY2xvc2VJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIH1cbjwvZGl2PlxuIl19