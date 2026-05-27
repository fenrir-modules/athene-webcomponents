import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthAvatarComponent } from '../avatar';

/**
 * A full timeline item (comment, note, change-with-content).
 * Use inside <ath-timeline>.
 *
 * @example
 * <ath-timeline-entry
 *   author="Mira Voss"
 *   avatarName="Mira Voss"
 *   timeLabel="48m ago"
 *   [internal]="false">
 *   <p>Pushed first pass.</p>
 * </ath-timeline-entry>
 */
@Component({
  selector: 'ath-timeline-entry',
  standalone: true,
  imports: [CommonModule, AthAvatarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline-entry.component.html',
  styleUrl: './timeline-entry.component.scss',
})
export class AthTimelineEntryComponent {
  @Input({ required: true }) author!: string;

  /** Defaults to `author` for initials/colors. Override if avatar should differ. */
  @Input() avatarName: string | null = null;

  @Input() avatarSrc = '';

  /** Pre-formatted relative time (e.g., "5m ago"). */
  @Input() timeLabel = '';

  /** Marks the entry as internal (only visible to operators/admins). */
  @Input() internal = false;

  @HostBinding('attr.data-internal') get hostInternal(): string | null {
    return this.internal ? 'true' : null;
  }

  protected get effectiveAvatarName(): string {
    return this.avatarName ?? this.author;
  }
}
