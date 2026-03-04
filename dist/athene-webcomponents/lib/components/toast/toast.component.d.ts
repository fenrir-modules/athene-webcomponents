import * as i0 from "@angular/core";
/**
 * Toast variant types
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
/**
 * Toast message
 */
export interface ToastMessage {
    id: string;
    variant: ToastVariant;
    message: string;
    duration?: number;
}
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
export declare class AthToastService {
    private toastsSignal;
    readonly toasts: import("@angular/core").Signal<ToastMessage[]>;
    success(message: string, duration?: number): void;
    error(message: string, duration?: number): void;
    warning(message: string, duration?: number): void;
    info(message: string, duration?: number): void;
    remove(id: string): void;
    private add;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AthToastService>;
}
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
    get toasts(): ToastMessage[];
    getIcon(variant: ToastVariant): import("node_modules/lucide-angular/icons/types").LucideIconData;
    dismiss(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthToastContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthToastContainerComponent, "ath-toast-container", never, {}, {}, never, never, true, never>;
}
