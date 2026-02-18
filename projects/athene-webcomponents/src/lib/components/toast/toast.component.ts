import { Component, ChangeDetectionStrategy, Injectable, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-angular';

/**
 * Toast variant types
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast message
 */
export interface ToastMessage {
  id: string;
  variant: ToastVariant;
  message: string;
  duration?: number;
}

/**
 * Toast Service
 *
 * Global notification service for displaying toast messages.
 *
 * @example
 * constructor(private toast: AthToastService) {}
 * this.toast.success('Item created');
 * this.toast.error('Something went wrong');
 */
@Injectable({ providedIn: 'root' })
export class AthToastService {
  private toastsSignal = signal<ToastMessage[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  success(message: string, duration = 4000): void {
    this.add({ variant: 'success', message, duration });
  }

  error(message: string, duration = 6000): void {
    this.add({ variant: 'error', message, duration });
  }

  warning(message: string, duration = 5000): void {
    this.add({ variant: 'warning', message, duration });
  }

  info(message: string, duration = 4000): void {
    this.add({ variant: 'info', message, duration });
  }

  remove(id: string): void {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }

  private add(options: Omit<ToastMessage, 'id'>): void {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const toast: ToastMessage = { id, ...options };

    this.toastsSignal.update(toasts => [...toasts, toast]);

    if (options.duration && options.duration > 0) {
      setTimeout(() => this.remove(id), options.duration);
    }
  }
}

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
}
