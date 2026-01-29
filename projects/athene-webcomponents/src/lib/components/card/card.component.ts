import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card padding variants
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Athene Card Component
 *
 * @example
 * <ath-card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </ath-card>
 *
 * <ath-card [hoverable]="true" padding="lg">
 *   Hoverable card with large padding
 * </ath-card>
 */
@Component({
  selector: 'ath-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="cardClasses">
      @if (header) {
        <div class="ath-card__header">
          <ng-content select="[slot=header]" />
        </div>
      }

      <div class="ath-card__body">
        <ng-content />
      </div>

      @if (footer) {
        <div class="ath-card__footer">
          <ng-content select="[slot=footer]" />
        </div>
      }
    </div>
  `,
  styleUrl: './card.component.scss',
})
export class AthCardComponent {
  /** Card padding */
  @Input() padding: CardPadding = 'md';

  /** Show border */
  @Input() bordered = true;

  /** Hoverable effect */
  @Input() hoverable = false;

  /** Show header slot */
  @Input() header = false;

  /** Show footer slot */
  @Input() footer = false;

  get cardClasses(): string {
    return [
      'ath-card',
      `ath-card--padding-${this.padding}`,
      this.bordered ? 'ath-card--bordered' : '',
      this.hoverable ? 'ath-card--hoverable' : '',
    ].filter(Boolean).join(' ');
  }
}
