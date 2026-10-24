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
}

export const ATH_DEFAULT_LABELS: AthLabels = {
  closeDialog: () => 'Close dialog',
  showPassword: () => 'Show password',
  hidePassword: () => 'Hide password',
  breadcrumb: () => 'Breadcrumb',
  unassigned: () => 'Unassigned',
  dismiss: () => 'Dismiss',
  retry: () => 'Retry',
  loading: () => 'Loading',
  removeItem: () => 'Remove {name}',
  moreCount: () => '{count} more',
  dueOverdue: () => '{count}d overdue',
  dueToday: () => 'Today',
  dueTomorrow: () => 'Tomorrow',
  dueInDays: () => '{count}d',
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
};

export const ATH_LABELS = new InjectionToken<Partial<AthLabels>>('ATH_LABELS');
