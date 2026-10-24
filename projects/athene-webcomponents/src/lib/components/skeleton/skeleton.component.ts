import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectAthLabels } from '../../i18n/labels';

/**
 * Skeleton variants.
 *
 * - `line`: one line of text, as tall as the surrounding text's line box
 * - `row`: one list or table row (`--row-h`), full width
 * - `card`: one compact card (64px)
 * - `text` / `circular` / `rectangular`: free-form shapes sized by `width` / `height`
 */
export type SkeletonVariant = 'line' | 'row' | 'card' | 'text' | 'circular' | 'rectangular';

/**
 * Athene Skeleton
 *
 * A loading placeholder shaped like the content it stands in for, so the
 * page does not jump when the data arrives. Pulses gently; still under
 * `prefers-reduced-motion`.
 *
 * @example
 * <ath-skeleton variant="line" width="60%" />
 * <ath-skeleton variant="row" />
 * <ath-skeleton variant="circular" width="22px" height="22px" />
 */
@Component({
  selector: 'ath-skeleton',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    class: 'ath-skeleton',
    '[attr.data-variant]': 'variant()',
    '[class.ath-skeleton--animated]': 'animated()',
    '[style.width]': 'width()',
    '[style.height]': 'height() || null',
  },
  template: '',
  styleUrl: './skeleton.component.scss',
})
export class AthSkeletonComponent {
  readonly variant = input<SkeletonVariant>('text');
  /** Width (CSS value). */
  readonly width = input('100%');
  /** Height (CSS value); the variant's own height when empty. */
  readonly height = input('');
  /** Pulse; off is also forced by `prefers-reduced-motion`. */
  readonly animated = input(true, { transform: booleanAttribute });
}

/** Layout of `ath-skeleton-list`. */
export type SkeletonListVariant = 'row' | 'card' | 'card-grid';

/**
 * A list's or grid's loading state: `count` placeholders the size of real
 * rows (`--row-h`), cards (64px) or grid cards (168px), in a panel-like
 * frame. Announced once as "Loading" to assistive tech.
 *
 * @example
 * <ath-skeleton-list variant="row" [count]="8" />
 * <ath-skeleton-list variant="card-grid" [count]="6" />
 */
@Component({
  selector: 'ath-skeleton-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ath-skeleton-list" [attr.data-variant]="variant()" role="status">
      <span class="ath-skeleton-list__sr">{{ loadingLabel() }}</span>
      @for (i of indexes(); track i) {
        <div class="ath-skeleton-list__cell" aria-hidden="true"></div>
      }
    </div>
  `,
  styleUrl: './skeleton-list.component.scss',
})
export class AthSkeletonListComponent {
  private readonly labels = injectAthLabels();

  readonly variant = input<SkeletonListVariant>('row');
  readonly count = input(6, { transform: numberAttribute });
  /** Accessible text; default `ATH_LABELS.loading`. */
  readonly label = input<string | null>(null);

  protected readonly indexes = computed(() =>
    Array.from({ length: Math.max(1, Math.floor(this.count() || 0)) }, (_, i) => i)
  );
  protected readonly loadingLabel = computed(() => this.label() ?? this.labels.loading());
}

/**
 * Skeleton Table Component
 *
 * Pre-built skeleton for table loading states
 */
@Component({
  selector: 'ath-skeleton-table',
  standalone: true,
  imports: [CommonModule, AthSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton-table.component.html',
  styleUrl: './skeleton-table.component.scss',
})
export class AthSkeletonTableComponent {
  /** Number of rows */
  readonly rows = input(5, { transform: numberAttribute });

  /** Column widths in percent */
  readonly columns = input<number[]>([20, 30, 25, 25]);

  protected readonly rowsArray = computed(() => Array.from({ length: this.rows() }, (_, i) => i));
}

/**
 * Skeleton Card Component
 *
 * Pre-built skeleton for card loading states
 */
@Component({
  selector: 'ath-skeleton-card',
  standalone: true,
  imports: [CommonModule, AthSkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton-card.component.html',
  styleUrl: './skeleton-card.component.scss',
})
export class AthSkeletonCardComponent {
  /** Show image placeholder */
  readonly showImage = input(true, { transform: booleanAttribute });

  /** Show action buttons */
  readonly showActions = input(true, { transform: booleanAttribute });
}
