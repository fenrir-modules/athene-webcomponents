import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Path geometry of a sparkline, or `null` below two samples. */
export interface SparklineGeometry {
  linePath: string;
  areaPath: string;
  lastX: number;
  lastY: number;
}

/**
 * The line, area and last point for `values` in a `width` × `height` box
 * (1px inset, so the stroke is never clipped). Pure, for tests.
 */
export function sparklineGeometry(
  values: readonly number[],
  width: number,
  height: number
): SparklineGeometry | null {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * (width - 2) + 1;
    const y = height - 2 - ((v - min) / range) * (height - 4);
    return [x, y] as const;
  });
  const linePath = points
    .map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1))
    .join(' ');
  const areaPath = `${linePath} L ${width - 1},${height - 1} L 1,${height - 1} Z`;
  const last = points[points.length - 1];
  return { linePath, areaPath, lastX: last[0], lastY: last[1] };
}

/**
 * Mini line chart: no axes, no labels, no charting library. A filled area
 * under a thin line and a dot on the latest value; nothing at all below
 * two samples (a cold-start dashboard has no trend yet). Decorative
 * (`aria-hidden`): the figure next to it carries the meaning.
 *
 * @example
 * <ath-sparkline [data]="[12, 14, 13, 18, 22, 20, 24]" color="var(--green)" />
 * <ath-sparkline [data]="trend" [width]="86" [height]="28" [showArea]="false" />
 */
@Component({
  selector: 'ath-sparkline',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sparkline.component.html',
  styleUrl: './sparkline.component.scss',
})
export class AthSparklineComponent {
  /** Values to plot; fewer than two renders nothing. */
  readonly data = input<readonly number[] | null | undefined>([]);
  /** Width in px (the KPI tile's footprint by default). */
  readonly width = input(70);
  /** Height in px. */
  readonly height = input(22);
  /** Any CSS colour, e.g. `var(--green)`. */
  readonly color = input('var(--accent)');
  /** Dot on the most recent value. */
  readonly showDot = input(true);
  /** Translucent area under the line. */
  readonly showArea = input(true);
  /** Stroke width in px. */
  readonly strokeWidth = input(1.2);

  protected readonly geometry = computed(() =>
    sparklineGeometry(this.data() ?? [], this.width(), this.height())
  );
}
