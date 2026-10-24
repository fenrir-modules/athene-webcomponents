import { type AthLabels } from '@athene/webcomponents/core';
/**
 * The labels a component reads: the app's `ATH_LABELS` where it provides
 * one, the English default otherwise. Call in an injection context; the
 * members stay functions, so a provider that reads a signal (the current
 * language) keeps a `computed` that calls them current.
 */
export declare function injectAthLabels(): AthLabels;
/** Fills `{name}` placeholders of a label; unknown ones stay as written. */
export declare function formatAthLabel(template: string, params: Readonly<Record<string, string | number>>): string;
