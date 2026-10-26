import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';
import { LucideDynamicIcon, type LucideIconData } from '@lucide/angular';
import type { IconNode } from 'lucide';

/**
 * A Lucide icon: the plain data from `@athene/webcomponents/icons`
 * (`import { Users } from '@athene/webcomponents/icons'`), or a named icon
 * object of your own (`{ name, node }`, the `name` becomes the svg's
 * `lucide-<name>` class).
 */
export type AthIconData = IconNode | LucideIconData;

/** One wrapper per icon array, shared by every `ath-icon` that draws it. */
const wrapped = new WeakMap<IconNode, LucideIconData>();

function toIconData(icon: AthIconData): LucideIconData {
  if (!Array.isArray(icon)) return icon;
  let data = wrapped.get(icon);
  if (!data) {
    data = { name: '', node: icon };
    wrapped.set(icon, data);
  }
  return data;
}

/**
 * Draws a Lucide icon (quality package W4-A, successor of `lucide-angular`'s
 * `<ath-icon>`, which allows Angular up to 21 only and is deprecated).
 *
 * Same shape as before: an inline `<ath-icon>` host with the `<svg>` inside,
 * so styles on the host, toggled host classes, `role`, `aria-label` and
 * `title` keep working. The inputs are the old ones (`img`, `size`,
 * `strokeWidth`, `color`, `absoluteStrokeWidth`); `class` goes to the svg as
 * well. The svg is drawn by `@lucide/angular`'s `LucideDynamicIcon` and is
 * `aria-hidden`; name the host when the icon carries meaning.
 *
 * The per-icon components of `@lucide/angular` are not used: each carries
 * its own copy of the icon template, 2–3 kB per icon in a bundle.
 */
@Component({
  selector: 'ath-icon',
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg
    [lucideIcon]="data()"
    [size]="size()"
    [strokeWidth]="strokeWidth()"
    [color]="color()"
    [absoluteStrokeWidth]="absoluteStrokeWidth()"
    [class]="class()"
  ></svg>`,
})
export class AthIconComponent {
  readonly img = input.required<AthIconData>();
  /** Width and height in px (default 24). */
  readonly size = input<number | string | null>(null);
  /** Default 2; the library's reset draws 2 at `--icon-stroke`. */
  readonly strokeWidth = input<number | string | null>(null);
  /** Stroke colour (default `currentColor`). */
  readonly color = input<string | null>(null);
  readonly absoluteStrokeWidth = input(false, { transform: booleanAttribute });
  /** Classes for the svg too (the host keeps its own `class` attribute). */
  readonly class = input<string | null>(null);

  protected readonly data = computed(() => toIconData(this.img()));
}
