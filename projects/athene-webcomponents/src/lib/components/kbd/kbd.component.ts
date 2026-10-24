import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type KbdSize = 'sm' | 'md' | 'lg';

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
  readonly size = input<KbdSize>('md');

  /**
   * Keys as text, for a self-closing tag. Callers wrote `label="⌘K"`
   * before this input existed, which rendered an empty chip.
   */
  readonly label = input('');

  protected readonly kbdClasses = computed(() => `ath-kbd ath-kbd--${this.size()}`);
}
