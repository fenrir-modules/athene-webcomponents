import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  booleanAttribute,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Athene Table Component
 *
 * Clean data table with consistent styling.
 *
 * `flush`: no frame of its own. The table sits on the page between two
 * hairlines, the head is a quiet line instead of a filled band and the
 * cells keep a small side inset, so it lines up with a list of settings
 * rows above or below it.
 * Uses ViewEncapsulation.None so projected content (thead/tbody)
 * inherits the table styles.
 *
 * @example
 * <ath-table>
 *   <thead>
 *     <tr><th>Name</th><th>Status</th></tr>
 *   </thead>
 *   <tbody>
 *     <tr><td>Item 1</td><td>Active</td></tr>
 *   </tbody>
 * </ath-table>
 * <ath-table flush>…</ath-table>
 */
@Component({
  selector: 'ath-table',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class AthTableComponent {
  /** No frame: hairlines above and below, a quiet head, a small side inset. */
  readonly flush = input(false, { transform: booleanAttribute });
}
