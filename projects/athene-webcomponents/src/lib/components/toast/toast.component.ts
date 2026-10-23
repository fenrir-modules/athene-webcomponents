import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-angular';
import { AthToastService, type ToastVariant } from '@athene/webcomponents/core';

// The service and its types live in the light `@athene/webcomponents/core`
// entry point (no forms, no icons), so an app can show toasts from its root
// without loading the whole library; re-exported here for existing imports.
export {
  AthToastService,
  type ToastAction,
  type ToastMessage,
  type ToastOptions,
  type ToastVariant,
} from '@athene/webcomponents/core';

/**
 * Athene Toast Container Component
 *
 * Renders global toast notifications. Place once in the root component.
 *
 * @example
 * <!-- app.component.html -->
 * <router-outlet />
 * <ath-toast-container />
 */
@Component({
  selector: 'ath-toast-container',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class AthToastContainerComponent {
  protected readonly successIcon = CheckCircle;
  protected readonly errorIcon = AlertCircle;
  protected readonly warningIcon = AlertTriangle;
  protected readonly infoIcon = Info;
  protected readonly closeIcon = X;

  constructor(protected toastService: AthToastService) {}

  get toasts() {
    return this.toastService.toasts();
  }

  getIcon(variant: ToastVariant) {
    switch (variant) {
      case 'success': return this.successIcon;
      case 'error': return this.errorIcon;
      case 'warning': return this.warningIcon;
      case 'info': return this.infoIcon;
    }
  }

  dismiss(id: string): void {
    this.toastService.remove(id);
  }

  runAction(id: string): void {
    this.toastService.runAction(id);
  }
}
