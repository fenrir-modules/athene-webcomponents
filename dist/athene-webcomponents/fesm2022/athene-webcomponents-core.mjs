import * as i0 from '@angular/core';
import { InjectionToken, signal, Injectable } from '@angular/core';

const ATH_DEFAULT_LABELS = {
    closeDialog: () => 'Close dialog',
    showPassword: () => 'Show password',
    hidePassword: () => 'Hide password',
    breadcrumb: () => 'Breadcrumb',
    breadcrumbMore: () => 'Hidden steps',
    unassigned: () => 'Unassigned',
    dismiss: () => 'Dismiss',
    retry: () => 'Retry',
    loading: () => 'Loading',
    removeItem: () => 'Remove {name}',
    moreCount: () => '{count} more',
    dueOverdue: () => '{count} days overdue',
    dueOverdueOne: () => '{count} day overdue',
    dueToday: () => 'today',
    dueTomorrow: () => 'tomorrow',
    dueInDays: () => 'in {count} days',
    dueOn: () => 'Due {date}',
    dueSprintEnd: () => 'Sprint end',
    dueSprintTooltip: () => 'Due with {sprint}',
    dueAfterSprint: () => 'Due after the sprint ends',
    listboxSearch: () => 'Search',
    listboxNoMatches: () => 'No matches',
    listboxCreate: () => 'Create “{query}”',
    listboxOtherGroup: () => 'Other',
    pickerPlaceholder: () => 'Select…',
    pickerClear: () => 'Clear selection',
    pickerSelected: () => '{count} selected',
    clearSearch: () => 'Clear search',
    clearFilter: () => 'Clear {name} filter',
    sidebarExpand: () => 'Expand sidebar',
    sidebarCollapse: () => 'Collapse sidebar',
    pageFirst: () => 'First page',
    pagePrevious: () => 'Previous page',
    pageNext: () => 'Next page',
    pageLast: () => 'Last page',
    pageNumber: () => 'Page {page}',
    previous: () => 'Previous',
    next: () => 'Next',
    copy: () => 'Copy',
    copied: () => 'Copied',
    copyCode: () => 'Copy code',
    fileDropPrompt: () => 'Drop files or click to browse',
    userPickerPlaceholder: () => 'Pick user',
    userPickerSearch: () => 'Search people',
    internal: () => 'internal',
    internalNote: () => 'Internal note',
    triStateDeny: () => 'Deny',
    triStateInherit: () => 'Inherit',
    triStateAllow: () => 'Allow',
    triStateInheritAllowed: () => 'Inherit (currently allowed)',
    triStateInheritDenied: () => 'Inherit (currently denied)',
    saveBarMessage: () => 'You have unsaved changes',
    saveBarSave: () => 'Save',
    saveBarDiscard: () => 'Discard',
    saveBarConfirmDiscard: () => 'Really discard?',
    colorPicker: () => 'Colour',
    colorNeutral: () => 'Grey',
    colorBlue: () => 'Blue',
    colorGreen: () => 'Green',
    colorAmber: () => 'Amber',
    colorRed: () => 'Red',
    colorPurple: () => 'Purple',
    colorPink: () => 'Pink',
    roleLocked: () => 'Fixed role',
    selectPlaceholder: () => 'Select an option',
    searchPlaceholder: () => 'Search…',
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
        this.toastsSignal = signal([], ...(ngDevMode ? [{ debugName: "toastsSignal" }] : []));
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
        this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: AthToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: AthToastService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.33", ngImport: i0, type: AthToastService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/**
 * The app's date settings for every `ath-due-label`, provided once at the
 * root. A function, so a provider that reads signals (language, the
 * reader's preferences) keeps the labels current.
 *
 * @example
 * { provide: ATH_DATE_CONTEXT, useFactory: () => {
 *     const prefs = inject(UserPreferencesService);
 *     return () => ({ locale: prefs.locale(), timeZone: prefs.timeZone(), dateFormat: prefs.dateFormat() });
 * } }
 */
const ATH_DATE_CONTEXT = new InjectionToken('ATH_DATE_CONTEXT');
/**
 * The app's Markdown parser, provided once at the root so every
 * `<ath-markdown [text]>` renders the same dialect. An explicit `[parse]`
 * input wins.
 */
const ATH_MARKDOWN_PARSER = new InjectionToken('ATH_MARKDOWN_PARSER');

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

export { ATH_DATE_CONTEXT, ATH_DEFAULT_LABELS, ATH_LABELS, ATH_MARKDOWN_PARSER, ATH_PRIORITY_LABELS, ATH_STATUS_LABELS, AthToastService };
//# sourceMappingURL=athene-webcomponents-core.mjs.map
