import * as i0 from '@angular/core';
import { InjectionToken, signal, Injectable } from '@angular/core';

const ATH_DEFAULT_LABELS = {
    closeDialog: () => 'Close dialog',
    showPassword: () => 'Show password',
    hidePassword: () => 'Hide password',
    breadcrumb: () => 'Breadcrumb',
};
const ATH_LABELS = new InjectionToken('ATH_LABELS');

const ATH_STATUS_LABELS = new InjectionToken('ATH_STATUS_LABELS');

/**
 * Optional resolver for priority labels. The app provides it once at the
 * root (with its translations); without it the labels are English.
 */
const ATH_PRIORITY_LABELS = new InjectionToken('ATH_PRIORITY_LABELS');

const ACTION_MIN_DURATION = 8000;
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
class AthToastService {
    constructor() {
        this.toastsSignal = signal([]);
        this.toasts = this.toastsSignal.asReadonly();
    }
    success(message, options = 4000) {
        this.add('success', message, options, 4000);
    }
    error(message, options = 6000) {
        this.add('error', message, options, 6000);
    }
    warning(message, options = 5000) {
        this.add('warning', message, options, 5000);
    }
    info(message, options = 4000) {
        this.add('info', message, options, 4000);
    }
    /** Run a toast's action, then close the toast. */
    runAction(id) {
        const toast = this.toastsSignal().find((t) => t.id === id);
        this.remove(id);
        toast?.action?.run();
    }
    remove(id) {
        this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
    }
    add(variant, message, options, fallback) {
        const opts = typeof options === 'number' ? { duration: options } : options;
        const action = opts.action;
        const duration = opts.duration ?? (action ? Math.max(fallback, ACTION_MIN_DURATION) : fallback);
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const toast = { id, variant, message, duration, action };
        this.toastsSignal.update((toasts) => [...toasts, toast]);
        if (duration > 0) {
            setTimeout(() => this.remove(id), duration);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

// ===========================================
// ATHENE WEBCOMPONENTS - CORE ENTRY POINT
// ===========================================
//
// `@athene/webcomponents/core`: what an app needs at its root — the label
// tokens it provides and the toast service it calls — without the
// components (and the forms and icon code behind them). Everything here is
// re-exported from `@athene/webcomponents` too, so existing imports keep
// working and both resolve to the same tokens and service.

/**
 * Generated bundle index. Do not edit.
 */

export { ATH_DEFAULT_LABELS, ATH_LABELS, ATH_PRIORITY_LABELS, ATH_STATUS_LABELS, AthToastService };
//# sourceMappingURL=athene-webcomponents-core.mjs.map
