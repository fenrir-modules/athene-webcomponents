import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Vertical timeline container with connecting rail.
 * Wraps `<ath-timeline-entry>` and `<ath-timeline-event>` items.
 *
 * @example
 * <ath-timeline>
 *   <ath-timeline-entry author="Mira Voss" avatarName="Mira Voss" [whenMinutes]="48">
 *     <p>Pushed first pass to a feature branch.</p>
 *   </ath-timeline-entry>
 *   <ath-timeline-event statusColor="var(--green)">
 *     <b>Mira</b> moved this to In Progress · 2d ago
 *   </ath-timeline-event>
 * </ath-timeline>
 */
@Component({
  selector: 'ath-timeline',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class AthTimelineComponent {}
