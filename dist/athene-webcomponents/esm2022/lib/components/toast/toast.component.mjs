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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthToastContainerComponent, isStandalone: true, selector: "ath-toast-container", ngImport: i0, template: "<div class=\"ath-toast-container\" aria-live=\"polite\">\n  @for (toast of toasts; track toast.id) {\n    <div class=\"ath-toast\" [class]=\"'ath-toast ath-toast--' + toast.variant\">\n      <lucide-icon [img]=\"getIcon(toast.variant)\" [size]=\"18\" class=\"ath-toast__icon\" />\n      <span class=\"ath-toast__message\">{{ toast.message }}</span>\n      <button\n        type=\"button\"\n        class=\"ath-toast__close\"\n        [attr.aria-label]=\"'Dismiss notification: ' + toast.message\"\n        (click)=\"dismiss(toast.id)\"\n      >\n        <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n      </button>\n    </div>\n  }\n</div>\n", styles: [".ath-toast-container{position:fixed;top:var(--ath-space-4);right:var(--ath-space-4);z-index:var(--ath-z-toast);display:flex;flex-direction:column;gap:var(--ath-space-2);max-width:420px;width:100%;pointer-events:none}.ath-toast{display:flex;align-items:flex-start;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg);pointer-events:auto;animation:ath-toast-in .2s ease}.ath-toast--success{border-left:3px solid var(--ath-color-success)}.ath-toast--success .ath-toast__icon{color:var(--ath-color-success)}.ath-toast--error{border-left:3px solid var(--ath-color-error)}.ath-toast--error .ath-toast__icon{color:var(--ath-color-error)}.ath-toast--warning{border-left:3px solid var(--ath-color-warning)}.ath-toast--warning .ath-toast__icon{color:var(--ath-color-warning)}.ath-toast--info{border-left:3px solid var(--ath-color-info)}.ath-toast--info .ath-toast__icon{color:var(--ath-color-info)}.ath-toast__icon{flex-shrink:0;margin-top:1px}.ath-toast__message{flex:1;font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);line-height:var(--ath-line-height-normal)}.ath-toast__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast)}.ath-toast__close:hover{color:var(--ath-text-primary)}@keyframes ath-toast-in{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-toast-container', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-toast-container\" aria-live=\"polite\">\n  @for (toast of toasts; track toast.id) {\n    <div class=\"ath-toast\" [class]=\"'ath-toast ath-toast--' + toast.variant\">\n      <lucide-icon [img]=\"getIcon(toast.variant)\" [size]=\"18\" class=\"ath-toast__icon\" />\n      <span class=\"ath-toast__message\">{{ toast.message }}</span>\n      <button\n        type=\"button\"\n        class=\"ath-toast__close\"\n        [attr.aria-label]=\"'Dismiss notification: ' + toast.message\"\n        (click)=\"dismiss(toast.id)\"\n      >\n        <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n      </button>\n    </div>\n  }\n</div>\n", styles: [".ath-toast-container{position:fixed;top:var(--ath-space-4);right:var(--ath-space-4);z-index:var(--ath-z-toast);display:flex;flex-direction:column;gap:var(--ath-space-2);max-width:420px;width:100%;pointer-events:none}.ath-toast{display:flex;align-items:flex-start;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg);pointer-events:auto;animation:ath-toast-in .2s ease}.ath-toast--success{border-left:3px solid var(--ath-color-success)}.ath-toast--success .ath-toast__icon{color:var(--ath-color-success)}.ath-toast--error{border-left:3px solid var(--ath-color-error)}.ath-toast--error .ath-toast__icon{color:var(--ath-color-error)}.ath-toast--warning{border-left:3px solid var(--ath-color-warning)}.ath-toast--warning .ath-toast__icon{color:var(--ath-color-warning)}.ath-toast--info{border-left:3px solid var(--ath-color-info)}.ath-toast--info .ath-toast__icon{color:var(--ath-color-info)}.ath-toast__icon{flex-shrink:0;margin-top:1px}.ath-toast__message{flex:1;font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);line-height:var(--ath-line-height-normal)}.ath-toast__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast)}.ath-toast__close:hover{color:var(--ath-text-primary)}@keyframes ath-toast-in{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}\n"] }]
        }], ctorParameters: () => [{ type: AthToastService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3RvYXN0L3RvYXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy90b2FzdC90b2FzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQWlCdkc7Ozs7Ozs7OztHQVNHO0FBRUgsTUFBTSxPQUFPLGVBQWU7SUFENUI7UUFFVSxpQkFBWSxHQUFHLE1BQU0sQ0FBaUIsRUFBRSxDQUFDLENBQUM7UUFDekMsV0FBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7S0FnQ2xEO0lBOUJDLE9BQU8sQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxFQUFVO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTyxHQUFHLENBQUMsT0FBaUM7UUFDM0MsTUFBTSxFQUFFLEdBQUcsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDNUUsTUFBTSxLQUFLLEdBQWlCLEVBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFdkQsSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDN0MsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDSCxDQUFDOytHQWpDVSxlQUFlO21IQUFmLGVBQWUsY0FERixNQUFNOzs0RkFDbkIsZUFBZTtrQkFEM0IsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7O0FBcUNsQzs7Ozs7Ozs7O0dBU0c7QUFTSCxNQUFNLE9BQU8sMEJBQTBCO0lBT3JDLFlBQXNCLFlBQTZCO1FBQTdCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQU5oQyxnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixjQUFTLEdBQUcsV0FBVyxDQUFDO1FBQ3hCLGdCQUFXLEdBQUcsYUFBYSxDQUFDO1FBQzVCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsY0FBUyxHQUFHLENBQUMsQ0FBQztJQUVxQixDQUFDO0lBRXZELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsT0FBTyxDQUFDLE9BQXFCO1FBQzNCLFFBQVEsT0FBTyxFQUFFLENBQUM7WUFDaEIsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDeEMsS0FBSyxPQUFPLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDcEMsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDeEMsS0FBSyxNQUFNLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDcEMsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLENBQUMsRUFBVTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDOytHQXhCVSwwQkFBMEI7bUdBQTFCLDBCQUEwQiwrRUNwRnZDLHlvQkFnQkEsbXNERCtEWSxZQUFZLDhCQUFFLG1CQUFtQjs7NEZBS2hDLDBCQUEwQjtrQkFSdEMsU0FBUzsrQkFDRSxxQkFBcUIsY0FDbkIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDLG1CQUMzQix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5qZWN0YWJsZSwgc2lnbmFsLCBjb21wdXRlZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUsIFgsIENoZWNrQ2lyY2xlLCBBbGVydENpcmNsZSwgSW5mbywgQWxlcnRUcmlhbmdsZSB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcblxuLyoqXG4gKiBUb2FzdCB2YXJpYW50IHR5cGVzXG4gKi9cbmV4cG9ydCB0eXBlIFRvYXN0VmFyaWFudCA9ICdzdWNjZXNzJyB8ICdlcnJvcicgfCAnd2FybmluZycgfCAnaW5mbyc7XG5cbi8qKlxuICogVG9hc3QgbWVzc2FnZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRvYXN0TWVzc2FnZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHZhcmlhbnQ6IFRvYXN0VmFyaWFudDtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICBkdXJhdGlvbj86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBUb2FzdCBTZXJ2aWNlXG4gKlxuICogR2xvYmFsIG5vdGlmaWNhdGlvbiBzZXJ2aWNlIGZvciBkaXNwbGF5aW5nIHRvYXN0IG1lc3NhZ2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIHRvYXN0OiBBdGhUb2FzdFNlcnZpY2UpIHt9XG4gKiB0aGlzLnRvYXN0LnN1Y2Nlc3MoJ0l0ZW0gY3JlYXRlZCcpO1xuICogdGhpcy50b2FzdC5lcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBdGhUb2FzdFNlcnZpY2Uge1xuICBwcml2YXRlIHRvYXN0c1NpZ25hbCA9IHNpZ25hbDxUb2FzdE1lc3NhZ2VbXT4oW10pO1xuICByZWFkb25seSB0b2FzdHMgPSB0aGlzLnRvYXN0c1NpZ25hbC5hc1JlYWRvbmx5KCk7XG5cbiAgc3VjY2VzcyhtZXNzYWdlOiBzdHJpbmcsIGR1cmF0aW9uID0gNDAwMCk6IHZvaWQge1xuICAgIHRoaXMuYWRkKHsgdmFyaWFudDogJ3N1Y2Nlc3MnLCBtZXNzYWdlLCBkdXJhdGlvbiB9KTtcbiAgfVxuXG4gIGVycm9yKG1lc3NhZ2U6IHN0cmluZywgZHVyYXRpb24gPSA2MDAwKTogdm9pZCB7XG4gICAgdGhpcy5hZGQoeyB2YXJpYW50OiAnZXJyb3InLCBtZXNzYWdlLCBkdXJhdGlvbiB9KTtcbiAgfVxuXG4gIHdhcm5pbmcobWVzc2FnZTogc3RyaW5nLCBkdXJhdGlvbiA9IDUwMDApOiB2b2lkIHtcbiAgICB0aGlzLmFkZCh7IHZhcmlhbnQ6ICd3YXJuaW5nJywgbWVzc2FnZSwgZHVyYXRpb24gfSk7XG4gIH1cblxuICBpbmZvKG1lc3NhZ2U6IHN0cmluZywgZHVyYXRpb24gPSA0MDAwKTogdm9pZCB7XG4gICAgdGhpcy5hZGQoeyB2YXJpYW50OiAnaW5mbycsIG1lc3NhZ2UsIGR1cmF0aW9uIH0pO1xuICB9XG5cbiAgcmVtb3ZlKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRvYXN0c1NpZ25hbC51cGRhdGUodG9hc3RzID0+IHRvYXN0cy5maWx0ZXIodCA9PiB0LmlkICE9PSBpZCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGQob3B0aW9uczogT21pdDxUb2FzdE1lc3NhZ2UsICdpZCc+KTogdm9pZCB7XG4gICAgY29uc3QgaWQgPSBgdG9hc3QtJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA1KX1gO1xuICAgIGNvbnN0IHRvYXN0OiBUb2FzdE1lc3NhZ2UgPSB7IGlkLCAuLi5vcHRpb25zIH07XG5cbiAgICB0aGlzLnRvYXN0c1NpZ25hbC51cGRhdGUodG9hc3RzID0+IFsuLi50b2FzdHMsIHRvYXN0XSk7XG5cbiAgICBpZiAob3B0aW9ucy5kdXJhdGlvbiAmJiBvcHRpb25zLmR1cmF0aW9uID4gMCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlbW92ZShpZCksIG9wdGlvbnMuZHVyYXRpb24pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEF0aGVuZSBUb2FzdCBDb250YWluZXIgQ29tcG9uZW50XG4gKlxuICogUmVuZGVycyBnbG9iYWwgdG9hc3Qgbm90aWZpY2F0aW9ucy4gUGxhY2Ugb25jZSBpbiB0aGUgcm9vdCBjb21wb25lbnQuXG4gKlxuICogQGV4YW1wbGVcbiAqIDwhLS0gYXBwLmNvbXBvbmVudC5odG1sIC0tPlxuICogPHJvdXRlci1vdXRsZXQgLz5cbiAqIDxhdGgtdG9hc3QtY29udGFpbmVyIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC10b2FzdC1jb250YWluZXInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBMdWNpZGVBbmd1bGFyTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi90b2FzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi90b2FzdC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFRvYXN0Q29udGFpbmVyQ29tcG9uZW50IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHN1Y2Nlc3NJY29uID0gQ2hlY2tDaXJjbGU7XG4gIHByb3RlY3RlZCByZWFkb25seSBlcnJvckljb24gPSBBbGVydENpcmNsZTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHdhcm5pbmdJY29uID0gQWxlcnRUcmlhbmdsZTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGluZm9JY29uID0gSW5mbztcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNsb3NlSWNvbiA9IFg7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHRvYXN0U2VydmljZTogQXRoVG9hc3RTZXJ2aWNlKSB7fVxuXG4gIGdldCB0b2FzdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9hc3RTZXJ2aWNlLnRvYXN0cygpO1xuICB9XG5cbiAgZ2V0SWNvbih2YXJpYW50OiBUb2FzdFZhcmlhbnQpIHtcbiAgICBzd2l0Y2ggKHZhcmlhbnQpIHtcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOiByZXR1cm4gdGhpcy5zdWNjZXNzSWNvbjtcbiAgICAgIGNhc2UgJ2Vycm9yJzogcmV0dXJuIHRoaXMuZXJyb3JJY29uO1xuICAgICAgY2FzZSAnd2FybmluZyc6IHJldHVybiB0aGlzLndhcm5pbmdJY29uO1xuICAgICAgY2FzZSAnaW5mbyc6IHJldHVybiB0aGlzLmluZm9JY29uO1xuICAgIH1cbiAgfVxuXG4gIGRpc21pc3MoaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudG9hc3RTZXJ2aWNlLnJlbW92ZShpZCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhdGgtdG9hc3QtY29udGFpbmVyXCIgYXJpYS1saXZlPVwicG9saXRlXCI+XG4gIEBmb3IgKHRvYXN0IG9mIHRvYXN0czsgdHJhY2sgdG9hc3QuaWQpIHtcbiAgICA8ZGl2IGNsYXNzPVwiYXRoLXRvYXN0XCIgW2NsYXNzXT1cIidhdGgtdG9hc3QgYXRoLXRvYXN0LS0nICsgdG9hc3QudmFyaWFudFwiPlxuICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiZ2V0SWNvbih0b2FzdC52YXJpYW50KVwiIFtzaXplXT1cIjE4XCIgY2xhc3M9XCJhdGgtdG9hc3RfX2ljb25cIiAvPlxuICAgICAgPHNwYW4gY2xhc3M9XCJhdGgtdG9hc3RfX21lc3NhZ2VcIj57eyB0b2FzdC5tZXNzYWdlIH19PC9zcGFuPlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJhdGgtdG9hc3RfX2Nsb3NlXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInRGlzbWlzcyBub3RpZmljYXRpb246ICcgKyB0b2FzdC5tZXNzYWdlXCJcbiAgICAgICAgKGNsaWNrKT1cImRpc21pc3ModG9hc3QuaWQpXCJcbiAgICAgID5cbiAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiY2xvc2VJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIH1cbjwvZGl2PlxuIl19