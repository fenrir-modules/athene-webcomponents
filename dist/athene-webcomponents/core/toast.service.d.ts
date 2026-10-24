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
    private readonly toastsSignal;
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
