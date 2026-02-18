import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Skeleton variant types
 */
export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

/**
 * Athene Skeleton Component
 *
 * Loading placeholder for content
 *
 * @example
 * <ath-skeleton variant="text" width="200px" />
 * <ath-skeleton variant="circular" width="48px" height="48px" />
 * <ath-skeleton variant="rectangular" height="200px" />
 */
@Component({
  selector: 'ath-skeleton',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class AthSkeletonComponent {
  /** Skeleton variant */
  @Input() variant: SkeletonVariant = 'text';

  /** Width (CSS value) */
  @Input() width = '100%';

  /** Height (CSS value) */
  @Input() height = '';

  /** Animation enabled */
  @Input() animated = true;

  get skeletonClasses(): string {
    return [
      'ath-skeleton',
      `ath-skeleton--${this.variant}`,
      this.animated ? 'ath-skeleton--animated' : '',
    ].filter(Boolean).join(' ');
  }
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
  @Input() rows = 5;

  /** Column widths in percent */
  @Input() columns: number[] = [20, 30, 25, 25];

  get rowsArray(): number[] {
    return Array.from({ length: this.rows }, (_, i) => i);
  }
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
  @Input() showImage = true;

  /** Show action buttons */
  @Input() showActions = true;
}
