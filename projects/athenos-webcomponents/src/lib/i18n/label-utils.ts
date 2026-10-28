import { inject } from '@angular/core';
import { ATH_DEFAULT_LABELS, ATH_LABELS, type AthLabels } from '@athenos/webcomponents/core';

/**
 * The labels a component reads: the app's `ATH_LABELS` where it provides
 * one, the English default otherwise. Call in an injection context; the
 * members stay functions, so a provider that reads a signal (the current
 * language) keeps a `computed` that calls them current.
 */
export function injectAthLabels(): AthLabels {
  const provided = inject(ATH_LABELS, { optional: true }) ?? {};
  return { ...ATH_DEFAULT_LABELS, ...provided };
}

/** Fills `{name}` placeholders of a label; unknown ones stay as written. */
export function formatAthLabel(
  template: string,
  params: Readonly<Record<string, string | number>>
): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in params ? String(params[key]) : whole
  );
}
