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
    protected readonly successIcon: import("lucide").IconNode;
    protected readonly errorIcon: import("lucide").IconNode;
    protected readonly warningIcon: import("lucide").IconNode;
    protected readonly infoIcon: import("lucide").IconNode;
    protected readonly closeIcon: import("lucide").IconNode;
    constructor(toastService: AthToastService);
    get toasts(): import("@athene/webcomponents/core").ToastMessage[];
    getIcon(variant: ToastVariant): import("lucide").IconNode;
    dismiss(id: string): void;
    runAction(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthToastContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthToastContainerComponent, "ath-toast-container", never, {}, {}, never, never, true, never>;
}
