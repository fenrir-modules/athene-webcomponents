import type { AthLabels } from '@athenos/webcomponents/core';

/**
 * The decorative palette a user picks from (role colours, the badge and
 * avatar ring of a role). The same tokens as athenos-contracts
 * `TicketTypeColor`, drawn with the `--<hue>-muted` deco tokens (`--grey-
 * muted` for `neutral`), which are validated for both themes.
 */
export type AthDecoColor = 'neutral' | 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'pink';

/** Every palette token, in picker order. */
export const ATH_DECO_COLORS: readonly AthDecoColor[] = [
  'neutral',
  'blue',
  'green',
  'amber',
  'red',
  'purple',
  'pink',
];

/** Whether a stored value is one of the palette tokens. */
export function isAthDecoColor(value: unknown): value is AthDecoColor {
  return typeof value === 'string' && (ATH_DECO_COLORS as readonly string[]).includes(value);
}

/** The palette token's accessible name. */
export function athDecoColorLabel(labels: AthLabels, color: AthDecoColor): string {
  switch (color) {
    case 'neutral':
      return labels.colorNeutral();
    case 'blue':
      return labels.colorBlue();
    case 'green':
      return labels.colorGreen();
    case 'amber':
      return labels.colorAmber();
    case 'red':
      return labels.colorRed();
    case 'purple':
      return labels.colorPurple();
    case 'pink':
      return labels.colorPink();
  }
}
