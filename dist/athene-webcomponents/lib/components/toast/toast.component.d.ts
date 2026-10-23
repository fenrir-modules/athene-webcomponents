import { AthToastService, type ToastVariant } from '@athene/webcomponents/core';
import * as i0 from "@angular/core";
export { AthToastService, type ToastAction, type ToastMessage, type ToastOptions, type ToastVariant, } from '@athene/webcomponents/core';
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
export declare class AthToastContainerComponent {
    protected toastService: AthToastService;
    protected readonly successIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly errorIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly warningIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly infoIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly closeIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    constructor(toastService: AthToastService);
    get toasts(): import("@athene/webcomponents/core").ToastMessage[];
    getIcon(variant: ToastVariant): import("node_modules/lucide-angular/icons/types").LucideIconData;
    dismiss(id: string): void;
    runAction(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthToastContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthToastContainerComponent, "ath-toast-container", never, {}, {}, never, never, true, never>;
}
