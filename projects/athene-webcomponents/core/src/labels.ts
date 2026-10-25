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
  // Display primitives (quality step 1.7). Placeholders in braces
  // (`{count}`, `{name}`, `{sprint}`) are filled in by the component; a
  // translation keeps them, e.g. `() => t('due.overdue', { count: '{count}' })`.
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
  // Overlay primitives (quality step 1.6): ath-listbox, ath-option-picker.
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
  // Remaining fixed words of the lib (quality step 1.8a, DS-20).
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
  // Roles editor (custom roles, phase A).
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
}

export const ATH_DEFAULT_LABELS: AthLabels = {
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
};

export const ATH_LABELS = new InjectionToken<Partial<AthLabels>>('ATH_LABELS');
