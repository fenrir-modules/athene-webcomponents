import { InjectionToken } from '@angular/core';

export type TicketPriority = 'low' | 'medium' | 'high' | 'crit';

/** Returns the label for a priority in the app's language, or null for the default. */
export type PriorityLabelResolver = (priority: TicketPriority) => string | null;

/**
 * Optional resolver for priority labels. The app provides it once at the
 * root (with its translations); without it the labels are English.
 */
export const ATH_PRIORITY_LABELS = new InjectionToken<PriorityLabelResolver>('ATH_PRIORITY_LABELS');
