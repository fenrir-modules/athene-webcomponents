import { InjectionToken } from '@angular/core';

/**
 * The five built-in statuses as the pill's short codes, plus the legacy
 * `closed`. A workspace has its own statuses too (athenos-contracts W4-F):
 * the pill also takes any status key, with its name and tone from the app.
 */
export type TicketStatus = 'open' | 'prog' | 'review' | 'done' | 'blocked' | 'closed';

/**
 * Names a status in the reader's language.
 *
 * The library stays free of any translation framework: the app provides
 * this once at the root, and every pill without an explicit `label` asks
 * it, with the status the pill was given (a short code or any status key).
 * Return `null` to fall back to the English default. A resolver that reads
 * a signal (the current language, the workspace's statuses) keeps OnPush
 * pills current when it changes.
 */
export type StatusLabelResolver = (status: string) => string | null;

export const ATH_STATUS_LABELS = new InjectionToken<StatusLabelResolver>('ATH_STATUS_LABELS');

/**
 * The tone of a status's dot: a token of the decorative palette (`neutral`,
 * `blue`, `green`, `amber`, `red`, `purple`, `pink`, as `AthDecoColor`), or
 * `null` for the pill's own colour of a built-in code. Provided once at the
 * root like the labels, so a pill shows a workspace's own colour without
 * every caller passing `[tone]`.
 */
export type StatusToneResolver = (status: string) => string | null;

export const ATH_STATUS_TONES = new InjectionToken<StatusToneResolver>('ATH_STATUS_TONES');
