import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Info, AlertTriangle, AlertOctagon, CheckCircle2, X } from 'lucide-angular';

export type BannerTone = 'info' | 'warning' | 'danger' | 'success';

/**
 * Page-level banner for system-wide notices (maintenance, trial-ending,
 * plan-limit, deprecation, etc.).
 *
 * Lives at the top of a layout — typically full-width. For inline alerts
 * within forms or cards use `<ath-alert>`.
 *
 * @example
 * <ath-banner tone="warning" title="Maintenance scheduled">
 *   Athene will be unavailable on Sat 22:00–22:30 CET.
 * </ath-banner>
 * <ath-banner tone="danger" title="Trial ends in 2 days" [dismissible]="true"
 *             (dismissed)="hide()">
 *   Add a payment method to keep your Pro features.
 * </ath-banner>
 */
@Component({
  selector: 'ath-banner',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class AthBannerComponent {
  @Input() tone: BannerTone = 'info';
  @Input() title: string | null = null;
  @Input() dismissible = false;

  @Output() dismissed = new EventEmitter<void>();

  @HostBinding('attr.data-tone') get hostTone(): BannerTone {
    return this.tone;
  }

  @HostBinding('attr.role') get hostRole(): 'status' | 'alert' {
    return this.tone === 'danger' || this.tone === 'warning' ? 'alert' : 'status';
  }

  protected readonly closeIcon = X;

  protected get icon() {
    switch (this.tone) {
      case 'warning': return AlertTriangle;
      case 'danger': return AlertOctagon;
      case 'success': return CheckCircle2;
      case 'info':
      default: return Info;
    }
  }

  onDismiss(): void {
    this.dismissed.emit();
  }
}
