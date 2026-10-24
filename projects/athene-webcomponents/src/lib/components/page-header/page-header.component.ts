import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * The page head every app page uses: H1, one muted meta line, actions on
 * the right, a hairline underneath. The breadcrumb lives in the shell's
 * topbar, so this component starts at the page gutter like every other.
 *
 * - Meta: `subItems` strings render with `·` separators. Anything richer
 *   (a health pill, an avatar) goes in an `[athPageMeta]` child, which
 *   continues the same line.
 * - Leading: an `[athPageLeading]` child (e.g. a project key tile) sits
 *   left of the title block.
 * - Actions: default content. At most one primary; the topbar's "New" is
 *   already the view's primary on most pages.
 * - `divider`: the hairline. Turn it off only when the next element draws
 *   its own rule directly under the head (an underline tab bar).
 *
 * @example
 * <ath-page-header title="Tickets" [subItems]="['12 of 45', 'across 6 projects']">
 *   <ath-button variant="secondary" size="sm">Filter</ath-button>
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
  /** Page title. */
  @Input({ required: true }) title = '';

  /** Multi-segment sub-row, rendered with bullet (•) separators. */
  @Input() subItems: string[] = [];

  /** Legacy free-form description (single paragraph). Falls back if subItems empty. */
  @Input() description = '';

  /** Hairline under the head. On by default: it is part of the contract. */
  @Input() divider = true;

  /**
   * Heading level of the title. 1 for a page; 2 for a section head inside a
   * page that already has its h1 (the settings sub-pages under "Settings").
   */
  @Input() level: 1 | 2 = 1;

  /**
   * The sub-items worth separating.
   *
   * Callers build this array inline from conditionals, so a fact that
   * does not apply arrives as `''` rather than being left out — and a
   * blank segment still earned its bullet, leaving headers reading
   * "All open tickets ·" with nothing after the separator.
   */
  protected get visibleSubItems(): string[] {
    return this.subItems.filter((item) => item != null && item.trim() !== '');
  }
}
