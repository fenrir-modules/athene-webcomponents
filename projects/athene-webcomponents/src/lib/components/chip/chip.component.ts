import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { LucideAngularModule, X, Zap } from 'lucide-angular';
import { formatAthLabel, injectAthLabels } from '../../i18n/labels';
import { AthTooltipDirective } from '../tooltip';

/** A lucide icon (`lucide-angular` does not export its data type from its entry). */
export type AthChipIcon = typeof Zap;

/** Semantic tone of a `tag` or `status` chip. */
export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

/**
 * What a chip shows. Every kind is one height (`--chip-h`, 20px), so chips
 * of different kinds line up in a row.
 *
 * - `tag`: text on a tinted pill in a semantic `variant`
 * - `label`: a dot in the label's own `color`, then its name
 * - `epic`: a quiet outline, the bolt (or `icon`) in the epic `color`
 * - `type`: a small square in the type `color` with its `icon` glyph; text optional
 * - `status`: a dot (or `icon`) in the `variant` tone, then the status name
 * - `count`: "+N" for items that did not fit; `tooltip` names them
 */
export type ChipKind = 'tag' | 'label' | 'epic' | 'type' | 'status' | 'count';

/**
 * Outline of a `tag` chip: `pill` (default, round ends) or `square`, the
 * plain grey tag of dense ticket rows and board cards (references 05/06):
 * small radius, `--bg-2`, a faint border, no dot.
 */
export type ChipShape = 'pill' | 'square';

/**
 * Athene Chip
 *
 * The library takes colour and words; resolving a label's, epic's or
 * type's colour and name stays in the app.
 *
 * @example
 * <ath-chip>authentication</ath-chip>
 * <ath-chip shape="square">backend</ath-chip>
 * <ath-chip kind="label" [color]="label.color">{{ label.name }}</ath-chip>
 * <ath-chip kind="epic" [color]="'var(--purple)'" [tooltip]="epic.title">{{ epic.title }}</ath-chip>
 * <ath-chip kind="type" [icon]="bugIcon" color="var(--red)" [tooltip]="'Bug'" />
 * <ath-chip kind="status" variant="warning">In progress</ath-chip>
 * <ath-chip kind="count" [count]="3" tooltip="design, backend, api" />
 * <ath-chip kind="label" [color]="c" [removable]="true" (removed)="drop(l)">{{ l.name }}</ath-chip>
 */
@Component({
  selector: 'ath-chip',
  imports: [LucideAngularModule, AthTooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class AthChipComponent {
  private readonly labels = injectAthLabels();

  readonly kind = input<ChipKind>('tag');
  /** Tone of a `tag` or `status` chip. */
  readonly variant = input<ChipVariant>('default');
  /** Outline of a `tag` chip; `square` is the plain grey tag of dense rows. */
  readonly shape = input<ChipShape>('pill');
  /** Any CSS colour: the label dot, the epic glyph, the type square, the status dot. */
  readonly color = input<string | null | undefined>(null);
  /** Glyph for `epic` (default bolt), `type` (required) and `status` (instead of the dot). */
  readonly icon = input<AthChipIcon | null>(null);
  /** N of a `count` chip. */
  readonly count = input<number | null>(null);
  /** Hover text, also the accessible description (names behind "+N", an epic's full title). */
  readonly tooltip = input<string | null | undefined>(null);
  /** `type` in dense lists: the glyph alone, in grey. */
  readonly muted = input(false);
  readonly removable = input(false);
  /** Accessible name of the remove button; default "Remove {name}". */
  readonly removeLabel = input<string | null>(null);
  /** The chip's text, for the default remove label (projected text is not readable here). */
  readonly name = input<string | null>(null);

  readonly removed = output<void>();

  protected readonly removeIcon = X;

  protected readonly glyph = computed<AthChipIcon | null>(() => {
    const icon = this.icon();
    if (icon) return icon;
    return this.kind() === 'epic' ? Zap : null;
  });

  protected readonly countText = computed(() => `+${Math.max(0, this.count() ?? 0)}`);

  /** "+3" is read as "3 more: a, b, c". */
  protected readonly countLabel = computed(() => {
    const more = formatAthLabel(this.labels.moreCount(), { count: Math.max(0, this.count() ?? 0) });
    const names = this.tooltip();
    return names ? `${more}: ${names}` : more;
  });

  protected readonly resolvedRemoveLabel = computed(
    () =>
      this.removeLabel() ??
      formatAthLabel(this.labels.removeItem(), { name: this.name() ?? this.tooltip() ?? '' }).trim()
  );

  remove(event: MouseEvent): void {
    // Chips often sit inside something clickable (a row that opens the
    // ticket); removing a label is not opening it.
    event.stopPropagation();
    this.removed.emit();
  }
}
