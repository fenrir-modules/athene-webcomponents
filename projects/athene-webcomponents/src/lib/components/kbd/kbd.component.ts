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
 * <ath-kbd label="⌘K" size="sm" />
 */
@Component({
  selector: 'ath-kbd',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kbd.component.html',
  styleUrl: './kbd.component.scss',
})
export class AthKbdComponent {
  /** Size variant */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Keys as text, for a self-closing tag. Callers wrote `label="⌘K"`
   * before this input existed, which rendered an empty chip.
   */
  @Input() label = '';

  get kbdClasses(): string {
    return `ath-kbd ath-kbd--${this.size}`;
  }
}
