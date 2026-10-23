import { InjectionToken } from '@angular/core';

export type TicketStatus = 'open' | 'prog' | 'review' | 'done' | 'blocked' | 'closed';

/**
 * Names a status in the reader's language.
 *
 * The library stays free of any translation framework: the app provides
 * this once at the root, and every pill without an explicit `label` asks
 * it. Return `null` to fall back to the English default. A resolver that
 * reads a signal (the current language) keeps OnPush pills current when
 * the language changes.
 */
export type StatusLabelResolver = (status: TicketStatus) => string | null;

export const ATH_STATUS_LABELS = new InjectionToken<StatusLabelResolver>('ATH_STATUS_LABELS');
