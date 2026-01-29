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
  template: `
    <div 
      [class]="skeletonClasses" 
      [style.width]="width"
      [style.height]="height"
    ></div>
  `,
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
  @Input() animation = true;
  
  get skeletonClasses(): string {
    return [
      'ath-skeleton',
      `ath-skeleton--${this.variant}`,
      this.animation ? 'ath-skeleton--animated' : '',
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
  template: `
    <div class="ath-skeleton-table">
      <!-- Header -->
      <div class="ath-skeleton-table__header">
        @for (col of columns; track col) {
          <ath-skeleton variant="text" [width]="col + '%'" height="20px" />
        }
      </div>
      
      <!-- Rows -->
      @for (row of rowsArray; track row) {
        <div class="ath-skeleton-table__row">
          @for (col of columns; track col) {
            <ath-skeleton variant="text" [width]="col + '%'" height="16px" />
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .ath-skeleton-table {
      display: flex;
      flex-direction: column;
      gap: var(--ath-space-3);
      
      &__header {
        display: flex;
        gap: var(--ath-space-4);
        padding-bottom: var(--ath-space-3);
        border-bottom: 1px solid var(--ath-border-color);
      }
      
      &__row {
        display: flex;
        gap: var(--ath-space-4);
        padding: var(--ath-space-2) 0;
      }
    }
  `],
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
  template: `
    <div class="ath-skeleton-card">
      @if (showImage) {
        <ath-skeleton variant="rectangular" height="160px" />
      }
      <div class="ath-skeleton-card__content">
        <ath-skeleton variant="text" width="70%" height="24px" />
        <ath-skeleton variant="text" width="100%" height="16px" />
        <ath-skeleton variant="text" width="90%" height="16px" />
        @if (showActions) {
          <div class="ath-skeleton-card__actions">
            <ath-skeleton variant="rectangular" width="80px" height="32px" />
            <ath-skeleton variant="rectangular" width="80px" height="32px" />
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .ath-skeleton-card {
      border: 1px solid var(--ath-border-color);
      border-radius: var(--ath-border-radius-lg);
      overflow: hidden;
      
      &__content {
        display: flex;
        flex-direction: column;
        gap: var(--ath-space-2);
        padding: var(--ath-space-4);
      }
      
      &__actions {
        display: flex;
        gap: var(--ath-space-2);
        margin-top: var(--ath-space-2);
      }
    }
  `],
})
export class AthSkeletonCardComponent {
  /** Show image placeholder */
  @Input() showImage = true;
  
  /** Show action buttons */
  @Input() showActions = true;
}
