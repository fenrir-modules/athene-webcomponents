import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import { ATH_STATUS_LABELS, ATH_STATUS_TONES, type TicketStatus } from '@athene/webcomponents/core';
import { isAthDecoColor, type AthDecoColor } from '../color-swatch/deco-color';

// The status type and the label and tone tokens live in
// `@athene/webcomponents/core`, so an app can provide the tokens at its root
// without loading the components.
export {
  ATH_STATUS_LABELS,
  ATH_STATUS_TONES,
  type StatusLabelResolver,
  type StatusToneResolver,
  type TicketStatus,
} from '@athene/webcomponents/core';

export type StatusPillSize = 'sm' | 'md';

/** English defaults: the short codes and the built-in status keys. */
const LABELS: Readonly<Record<string, string>> = {
  open: 'Open',
  prog: 'In Progress',
  in_progress: 'In Progress',
  review: 'In Review',
  in_review: 'In Review',
  done: 'Done',
  blocked: 'Blocked',
  closed: 'Closed',
};

/**
 * Status indicator for a ticket: colored inner-ring dot + label.
 *
 * `status` is a short code (`prog`) or any status key of the workspace
 * (`in_progress`, `qa`). The dot's colour is `tone` (a palette token), else
 * the app's `ATH_STATUS_TONES` resolver, else the pill's own colour for a
 * built-in code; an unknown status without a tone is grey.
 *
 * @example
 * <ath-status-pill status="open" />
 * <ath-status-pill status="prog" [showLabel]="false" />
 * <ath-status-pill status="qa" tone="purple" label="QA" size="sm" />
 */
@Component({
  selector: 'ath-status-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-pill.component.html',
  styleUrl: './status-pill.component.scss',
  host: {
    '[attr.data-status]': 'status()',
    '[attr.data-tone]': 'computedTone()',
    '[attr.data-size]': 'size()',
  },
})
export class AthStatusPillComponent {
  readonly status = input<TicketStatus | (string & {})>('open');
  readonly showDot = input(true, { transform: booleanAttribute });
  readonly showLabel = input(true, { transform: booleanAttribute });
  readonly size = input<StatusPillSize>('md');

  /** Optional override label (otherwise the app's resolver, then the English default). */
  readonly label = input<string | null>(null);
  /** Optional palette token for the dot (otherwise the app's resolver, then the code's colour). */
  readonly tone = input<AthDecoColor | (string & {}) | null>(null);

  private readonly resolveLabel = inject(ATH_STATUS_LABELS, { optional: true });
  private readonly resolveTone = inject(ATH_STATUS_TONES, { optional: true });

  /** The resolver reads a signal for the language (see `StatusLabelResolver`), so this follows it. */
  protected readonly computedLabel = computed<string>(() => {
    const status = this.status();
    return this.label() ?? this.resolveLabel?.(status) ?? LABELS[status] ?? status;
  });

  /** A palette token, or `null` (the code's own colour). Unknown tokens are ignored. */
  protected readonly computedTone = computed<AthDecoColor | null>(() => {
    const tone = this.tone() ?? this.resolveTone?.(this.status()) ?? null;
    return isAthDecoColor(tone) ? tone : null;
  });
}
