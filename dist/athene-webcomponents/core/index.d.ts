import * as i0 from '@angular/core';
import { InjectionToken } from '@angular/core';

/**
 * The few words the library itself puts on screen for assistive tech.
 *
 * Defaults are English. An app provides `ATH_LABELS` (anywhere above the
 * components, e.g. its shell) with functions that return the translated
 * text; a component input, where one exists, wins over both.
 */
interface AthLabels {
    closeDialog: () => string;
    showPassword: () => string;
    hidePassword: () => string;
    breadcrumb: () => string;
    /** `ath-breadcrumb`: the "…" that folds the middle of a long trail. */
    breadcrumbMore: () => string;
    /** The empty seat of `ath-avatar`: nobody is assigned. */
    unassigned: () => string;
    dismiss: () => string;
    retry: () => string;
    loading: () => string;
    /** A chip's remove button; `{name}` is the chip's text. */
    removeItem: () => string;
    /** The "+N" overflow chip; `{count}` is N. */
    moreCount: () => string;
    /** `ath-due-label`: `{count}` days past the date (2 or more). */
    dueOverdue: () => string;
    /** `ath-due-label`: one day past the date; `{count}` is 1. */
    dueOverdueOne: () => string;
    dueToday: () => string;
    dueTomorrow: () => string;
    /** `{count}` days ahead, 2 to 6. */
    dueInDays: () => string;
    /** Tooltip and screen-reader text; `{date}` is the full date (and time, when it has one). */
    dueOn: () => string;
    dueSprintEnd: () => string;
    /** Tooltip of a sprint-derived date; `{sprint}` is the sprint name. */
    dueSprintTooltip: () => string;
    dueAfterSprint: () => string;
    /** Placeholder and accessible name of the listbox search field. */
    listboxSearch: () => string;
    listboxNoMatches: () => string;
    /** The "create" row; `{query}` is the typed text. */
    listboxCreate: () => string;
    /** Heading of ungrouped options when other options are grouped. */
    listboxOtherGroup: () => string;
    /** Picker trigger without a selection. */
    pickerPlaceholder: () => string;
    pickerClear: () => string;
    /** Picker trigger with more than two selected; `{count}` is the number. */
    pickerSelected: () => string;
    /** `ath-search-input` clear button. */
    clearSearch: () => string;
    /** `ath-filter-chip` clear button; `{name}` is the filter's label. */
    clearFilter: () => string;
    /** `ath-sidebar` toggle. */
    sidebarExpand: () => string;
    sidebarCollapse: () => string;
    /** `ath-pagination`. `{page}` is the page number. */
    pageFirst: () => string;
    pagePrevious: () => string;
    pageNext: () => string;
    pageLast: () => string;
    pageNumber: () => string;
    /** Visible words of the cursor pagination. */
    previous: () => string;
    next: () => string;
    /** `ath-copy-button`, `ath-code-block`. */
    copy: () => string;
    copied: () => string;
    copyCode: () => string;
    /** `ath-file-drop` default prompt. */
    fileDropPrompt: () => string;
    /** `ath-user-picker` defaults. */
    userPickerPlaceholder: () => string;
    userPickerSearch: () => string;
    /** `ath-timeline-entry` internal marker (visible word, tooltip). */
    internal: () => string;
    internalNote: () => string;
    /** `ath-tri-state`: the three states of an override. */
    triStateDeny: () => string;
    triStateInherit: () => string;
    triStateAllow: () => string;
    /** `ath-tri-state`: "inherit" with the value it currently inherits. */
    triStateInheritAllowed: () => string;
    triStateInheritDenied: () => string;
    /** `ath-save-bar` defaults. */
    saveBarMessage: () => string;
    saveBarSave: () => string;
    saveBarDiscard: () => string;
    saveBarConfirmDiscard: () => string;
    /** `ath-color-swatch`: the group's default name and each colour's name. */
    colorPicker: () => string;
    colorNeutral: () => string;
    colorBlue: () => string;
    colorGreen: () => string;
    colorAmber: () => string;
    colorRed: () => string;
    colorPurple: () => string;
    colorPink: () => string;
    /** `ath-role-badge` with `locked`: screen-reader text of the lock. */
    roleLocked: () => string;
    /** `ath-select`: the empty first option when no `placeholder` is given. */
    selectPlaceholder: () => string;
    /** `ath-search-input`: the field's placeholder when none is given. */
    searchPlaceholder: () => string;
}
declare const ATH_DEFAULT_LABELS: AthLabels;
declare const ATH_LABELS: InjectionToken<Partial<AthLabels>>;

type TicketStatus = 'open' | 'prog' | 'review' | 'done' | 'blocked' | 'closed';
/**
 * Names a status in the reader's language.
 *
 * The library stays free of any translation framework: the app provides
 * this once at the root, and every pill without an explicit `label` asks
 * it. Return `null` to fall back to the English default. A resolver that
 * reads a signal (the current language) keeps OnPush pills current when
 * the language changes.
 */
type StatusLabelResolver = (status: TicketStatus) => string | null;
declare const ATH_STATUS_LABELS: InjectionToken<StatusLabelResolver>;

type TicketPriority = 'low' | 'medium' | 'high' | 'crit';
/** Returns the label for a priority in the app's language, or null for the default. */
type PriorityLabelResolver = (priority: TicketPriority) => string | null;
/**
 * Optional resolver for priority labels. The app provides it once at the
 * root (with its translations); without it the labels are English.
 */
declare const ATH_PRIORITY_LABELS: InjectionToken<PriorityLabelResolver>;

/**
 * Toast variant types
 */
type ToastVariant = 'success' | 'error' | 'warning' | 'info';
/**
 * Toast message
 */
interface ToastMessage {
    id: string;
    variant: ToastVariant;
    message: string;
    duration?: number;
    action?: ToastAction;
}
/** A quiet text button in the toast ("Öffnen"). Runs, then closes the toast. */
interface ToastAction {
    label: string;
    run: () => void;
}
/**
 * Second argument of the toast methods: a duration in ms (the old form,
 * still accepted), or options. A toast with an action stays a little
 * longer by default (8s) so there is time to reach the button.
 */
interface ToastOptions {
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
declare class AthToastService {
    private readonly toastsSignal;
    readonly toasts: i0.Signal<ToastMessage[]>;
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

/** Short-date order: the locale's own, or one the reader chose. */
type DueDateFormat = 'auto' | 'dmy' | 'mdy' | 'iso';
/** The reader's date settings. All optional; missing = the browser's. */
interface AthDateContext {
    /** BCP-47 tag for month names (`auto` format). */
    locale?: string;
    /** IANA zone "today" is computed in. */
    timeZone?: string;
    dateFormat?: DueDateFormat;
    /** 12- or 24-hour clock for a due time; missing = the locale's own. */
    hour12?: boolean;
}
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
declare const ATH_DATE_CONTEXT: InjectionToken<() => AthDateContext>;
/** Turns Markdown into HTML. Its output is sanitized before it is shown. */
type AthMarkdownParser = (source: string) => string;
/**
 * The app's Markdown parser, provided once at the root so every
 * `<ath-markdown [text]>` renders the same dialect. An explicit `[parse]`
 * input wins.
 */
declare const ATH_MARKDOWN_PARSER: InjectionToken<AthMarkdownParser>;

export { ATH_DATE_CONTEXT, ATH_DEFAULT_LABELS, ATH_LABELS, ATH_MARKDOWN_PARSER, ATH_PRIORITY_LABELS, ATH_STATUS_LABELS, AthToastService };
export type { AthDateContext, AthLabels, AthMarkdownParser, DueDateFormat, PriorityLabelResolver, StatusLabelResolver, TicketPriority, TicketStatus, ToastAction, ToastMessage, ToastOptions, ToastVariant };
