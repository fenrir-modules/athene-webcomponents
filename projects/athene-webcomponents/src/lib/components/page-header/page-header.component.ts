import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Athene Page Header Component
 *
 * Consistent page header with title, description and action slot.
 *
 * @example
 * <ath-page-header title="Settings" description="Manage your preferences">
 *   <ath-button variant="outline" size="sm">Refresh</ath-button>
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
  /** Page title */
  @Input({ required: true }) title = '';

  /** Page description */
  @Input() description = '';
}
