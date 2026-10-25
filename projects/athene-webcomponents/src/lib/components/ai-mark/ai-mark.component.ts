import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  AI_MARK_REGULAR,
  AI_MARK_SMALL,
  AI_MARK_SMALL_MAX,
  type AiMarkGeometry,
} from './ai-mark.geometry';

/**
 * - `color`: the body in the current text colour, the spark in `--accent`
 *   (hints, rows, nav).
 * - `mono`: everything in the current text colour (one-colour contexts).
 * - `gradient`: body and spark in `--ai-gradient`'s two steps (hero areas,
 *   24 px and up).
 */
export type AiMarkVariant = 'color' | 'mono' | 'gradient';

let nextId = 0;

/**
 * The Athene AI mark ("Perch"), optionally with the wordmark.
 *
 * Decorative unless it carries a `label` (then `role="img"` with that
 * name). With `wordmark`, the text "Athene AI" follows the mark and is
 * what screen readers read; the mark itself is then hidden from them.
 *
 * @example
 * <ath-ai-mark />                                   <!-- 16 px, decorative -->
 * <ath-ai-mark [size]="48" variant="gradient" />
 * <ath-ai-mark [size]="20" wordmark />
 * <ath-ai-mark label="Athene AI" />
 */
@Component({
  selector: 'ath-ai-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ai-mark.component.html',
  styleUrl: './ai-mark.component.scss',
  host: {
    class: 'ath-ai-mark',
    '[attr.data-variant]': 'variant()',
    '[style.--ai-mark-size]': 'size() + "px"',
  },
})
export class AthAiMarkComponent {
  /** Edge length in px; the drawing switches to its small optical size up to 20. */
  readonly size = input(16);
  readonly variant = input<AiMarkVariant>('color');
  /** Accessible name of the mark alone; empty = decorative. Ignored with `wordmark`. */
  readonly label = input('');
  /** Show "Athene AI" next to the mark. */
  readonly wordmark = input(false, {
    transform: (v: boolean | '' | null | undefined) => v === '' || !!v,
  });

  /** Unique per instance: two gradients on one page must not share an id. */
  protected readonly gradientId = `ath-ai-mark-g${++nextId}`;
  protected readonly fillUrl = `url(#${this.gradientId})`;

  protected readonly shape = computed<AiMarkGeometry>(() =>
    this.size() <= AI_MARK_SMALL_MAX ? AI_MARK_SMALL : AI_MARK_REGULAR
  );
  /** The name the image carries, when it stands alone. */
  protected readonly imageName = computed(() => (this.wordmark() ? '' : this.label().trim()));
}
