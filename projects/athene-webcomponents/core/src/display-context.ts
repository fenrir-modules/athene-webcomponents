import { InjectionToken } from '@angular/core';

// The app-wide settings of the display primitives, in the light core entry
// point so an app can provide them at its root without loading every
// component (`ath-due-label`, `ath-markdown` re-export them).

/** Short-date order: the locale's own, or one the reader chose. */
export type DueDateFormat = 'auto' | 'dmy' | 'mdy' | 'iso';

/** The reader's date settings. All optional; missing = the browser's. */
export interface AthDateContext {
  /** BCP-47 tag for month names (`auto` format). */
  locale?: string;
  /** IANA zone "today" is computed in. */
  timeZone?: string;
  dateFormat?: DueDateFormat;
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
export const ATH_DATE_CONTEXT = new InjectionToken<() => AthDateContext>('ATH_DATE_CONTEXT');

/** Turns Markdown into HTML. Its output is sanitized before it is shown. */
export type AthMarkdownParser = (source: string) => string;

/**
 * The app's Markdown parser, provided once at the root so every
 * `<ath-markdown [text]>` renders the same dialect. An explicit `[parse]`
 * input wins.
 */
export const ATH_MARKDOWN_PARSER = new InjectionToken<AthMarkdownParser>('ATH_MARKDOWN_PARSER');
