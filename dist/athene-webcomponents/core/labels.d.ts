import { InjectionToken } from '@angular/core';
/**
 * The few words the library itself puts on screen for assistive tech.
 *
 * Defaults are English. An app provides `ATH_LABELS` (anywhere above the
 * components, e.g. its shell) with functions that return the translated
 * text; a component input, where one exists, wins over both.
 */
export interface AthLabels {
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
    /** `ath-due-label`, compact: `{count}` days past the date. */
    dueOverdue: () => string;
    dueToday: () => string;
    dueTomorrow: () => string;
    /** `{count}` days ahead, 2 to 6. */
    dueInDays: () => string;
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
}
export declare const ATH_DEFAULT_LABELS: AthLabels;
export declare const ATH_LABELS: InjectionToken<Partial<AthLabels>>;
