// The labels live in the light `@athenos/webcomponents/core` entry point so an
// app can provide them at its root without loading every component.
export { ATH_DEFAULT_LABELS, ATH_LABELS, type AthLabels } from '@athenos/webcomponents/core';
export { formatAthLabel, injectAthLabels } from './label-utils';
