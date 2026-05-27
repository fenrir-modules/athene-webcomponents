import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Compact timeline marker for status changes, assignments etc.
 * (Lighter weight than <ath-timeline-entry>.)
 *
 * @example
 * <ath-timeline-event statusColor="var(--green)">
 *   <b>Mira</b> moved to In Progress · 2d ago
 * </ath-timeline-event>
 */
@Component({
  selector: 'ath-timeline-event',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline-event.component.html',
  styleUrl: './timeline-event.component.scss',
})
export class AthTimelineEventComponent {
  /** Dot color — any CSS color (e.g., `var(--green)`, `#f59e0b`). */
  @Input() statusColor = 'var(--fg-4)';
}
