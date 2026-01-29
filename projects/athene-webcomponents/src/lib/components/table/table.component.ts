import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Athene Table Component
 *
 * @example
 * <ath-table>
 *   <thead>...</thead>
 *   <tbody>...</tbody>
 * </ath-table>
 */
@Component({
  selector: 'ath-table',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class AthTableComponent {}
