import type { AthLabels } from '@athene/webcomponents/core';
/**
 * The decorative palette a user picks from (role colours, the badge and
 * avatar ring of a role). The same tokens as athene-contracts
 * `TicketTypeColor`, drawn with the `--<hue>-muted` deco tokens (`--grey-
 * muted` for `neutral`), which are validated for both themes.
 */
export type AthDecoColor = 'neutral' | 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'pink';
/** Every palette token, in picker order. */
export declare const ATH_DECO_COLORS: readonly AthDecoColor[];
/** Whether a stored value is one of the palette tokens. */
export declare function isAthDecoColor(value: unknown): value is AthDecoColor;
/** The palette token's accessible name. */
export declare function athDecoColorLabel(labels: AthLabels, color: AthDecoColor): string;
