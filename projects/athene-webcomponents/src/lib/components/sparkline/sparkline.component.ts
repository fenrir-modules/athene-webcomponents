import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Mini line chart, no axes, no labels.
 *
 * @example
 * <ath-sparkline [data]="[12, 14, 13, 18, 22, 20, 24]" color="var(--accent)" />
 * <ath-sparkline [data]="trend" [width]="86" [height]="28" [showArea]="false" />
 */
@Component({
  selector: 'ath-sparkline',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sparkline.component.html',
  styleUrl: './sparkline.component.scss',
})
export class AthSparklineComponent {
  private readonly _data = signal<number[]>([]);

  /** Numeric values to plot. Minimum 2 points; fewer renders nothing. */
  @Input()
  set data(value: number[] | null | undefined) {
    this._data.set(value ?? []);
  }
  get data(): number[] {
    return this._data();
  }

  /** Width in px. */
  @Input() width = 86;

  /** Height in px. */
  @Input() height = 28;

  /** Stroke color — any CSS color (e.g., `var(--accent)`, `#16a34a`). */
  @Input() color = 'var(--accent)';

  /** Show a dot at the most recent value. */
  @Input() showDot = true;

  /** Render a translucent filled area below the line. */
  @Input() showArea = true;

  /** Stroke width in px. */
  @Input() strokeWidth = 1.5;

  protected readonly geometry = computed(() => {
    const values = this._data();
    if (values.length < 2) {
      return null;
    }
    const w = this.width;
    const h = this.height;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * (w - 2) + 1;
      const y = h - 2 - ((v - min) / range) * (h - 4);
      return [x, y] as const;
    });

    const linePath = points
      .map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1))
      .join(' ');
    const areaPath = `${linePath} L ${w - 1},${h - 1} L 1,${h - 1} Z`;
    const last = points[points.length - 1];

    return { linePath, areaPath, lastX: last[0], lastY: last[1] };
  });
}
