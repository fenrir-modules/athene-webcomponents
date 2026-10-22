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
    action?: ToastAction;
}
/** A quiet text button in the toast ("Öffnen"). Runs, then closes the toast. */
export interface ToastAction {
    label: string;
    run: () => void;
}
/**
 * Second argument of the toast methods: a duration in ms (the old form,
 * still accepted), or options. A toast with an action stays a little
 * longer by default (8s) so there is time to reach the button.
 */
export interface ToastOptions {
    duration?: number;
    action?: ToastAction;
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
    success(message: string, options?: number | ToastOptions): void;
    error(message: string, options?: number | ToastOptions): void;
    warning(message: string, options?: number | ToastOptions): void;
    info(message: string, options?: number | ToastOptions): void;
    /** Run a toast's action, then close the toast. */
    runAction(id: string): void;
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
    runAction(id: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthToastContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthToastContainerComponent, "ath-toast-container", never, {}, {}, never, never, true, never>;
}
