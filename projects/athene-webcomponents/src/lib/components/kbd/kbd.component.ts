import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Athene Kbd (Keyboard) Component
 * 
 * Displays keyboard shortcuts in a styled badge
 * 
 * @example
 * <ath-kbd>Ctrl</ath-kbd>
 * <ath-kbd>⌘</ath-kbd>
 * <ath-kbd size="sm">K</ath-kbd>
 */
@Component({
  selector: 'ath-kbd',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <kbd [class]="kbdClasses">
      <ng-content />
    </kbd>
  `,
  styles: [`
    .ath-kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.5em;
      padding: 2px 6px;
      font-family: var(--ath-font-family);
      font-weight: var(--ath-font-weight-medium);
      color: var(--ath-text-secondary);
      background-color: var(--ath-bg-tertiary);
      border: 1px solid var(--ath-border-color);
      border-radius: var(--ath-border-radius-sm);
      box-shadow: 0 1px 0 var(--ath-border-color);
      white-space: nowrap;
      
      // Sizes
      &--sm {
        font-size: var(--ath-font-size-xs);
        padding: 1px 4px;
      }
      
      &--md {
        font-size: var(--ath-font-size-sm);
        padding: 2px 6px;
      }
      
      &--lg {
        font-size: var(--ath-font-size-md);
        padding: 4px 8px;
      }
    }
  `],
})
export class AthKbdComponent {
  /** Size variant */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  get kbdClasses(): string {
    return `ath-kbd ath-kbd--${this.size}`;
  }
}
