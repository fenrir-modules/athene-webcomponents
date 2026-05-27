import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Page header with optional eyebrow, title, sub-row chips, description, and action slot.
 *
 * Sub-rows: pass `subItems` as an array of strings; they render with bullet separators.
 *
 * @example
 * <ath-page-header eyebrow="Work" title="Tickets"
 *                  [subItems]="['12 of 45', 'across 6 projects']">
 *   <button ath-button variant="secondary" size="sm">Filter</button>
 *   <button ath-button variant="primary" size="sm">+ New ticket</button>
 * </ath-page-header>
 */
@Component({
  selector: 'ath-page-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class AthPageHeaderComponent {
  /** Small uppercase eyebrow above the title (e.g., "Work", "Personal"). */
  @Input() eyebrow = '';

  /** Page title. */
  @Input({ required: true }) title = '';

  /** Multi-segment sub-row, rendered with bullet (•) separators. */
  @Input() subItems: string[] = [];

  /** Legacy free-form description (single paragraph). Falls back if subItems empty. */
  @Input() description = '';
}
