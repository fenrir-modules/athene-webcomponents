import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Athene Section Component
 *
 * Card-based section with title, description and content.
 *
 * @example
 * <ath-section title="General" description="Basic settings">
 *   <form>...</form>
 * </ath-section>
 */
@Component({
  selector: 'ath-section',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
})
export class AthSectionComponent {
  /** Section title */
  @Input({ required: true }) title = '';

  /** Section description */
  @Input() description = '';

  /** Collapsible state */
  @Input() collapsible = false;

  /** Expanded state (for collapsible) */
  @Input() expanded = true;

  toggle(): void {
    if (this.collapsible) {
      this.expanded = !this.expanded;
    }
  }
}
