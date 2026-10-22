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
  action?: ToastAction;
}

/** A quiet text button in the toast ("Öffnen"). Runs, then closes the toast. */
export interface ToastAction {
  label: string;
  run: () => void;
}

/**
 * Second argument of the toast methods: a duration in ms (the old form,
 * still accepted), or options. A toast with an action stays a little
 * longer by default (8s) so there is time to reach the button.
 */
export interface ToastOptions {
  duration?: number;
  action?: ToastAction;
}

const ACTION_MIN_DURATION = 8000;

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

  success(message: string, options: number | ToastOptions = 4000): void {
    this.add('success', message, options, 4000);
  }

  error(message: string, options: number | ToastOptions = 6000): void {
    this.add('error', message, options, 6000);
  }

  warning(message: string, options: number | ToastOptions = 5000): void {
    this.add('warning', message, options, 5000);
  }

  info(message: string, options: number | ToastOptions = 4000): void {
    this.add('info', message, options, 4000);
  }

  /** Run a toast's action, then close the toast. */
  runAction(id: string): void {
    const toast = this.toastsSignal().find((t) => t.id === id);
    this.remove(id);
    toast?.action?.run();
  }

  remove(id: string): void {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }

  private add(
    variant: ToastVariant,
    message: string,
    options: number | ToastOptions,
    fallback: number
  ): void {
    const opts: ToastOptions = typeof options === 'number' ? { duration: options } : options;
    const action = opts.action;
    const duration =
      opts.duration ?? (action ? Math.max(fallback, ACTION_MIN_DURATION) : fallback);
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const toast: ToastMessage = { id, variant, message, duration, action };

    this.toastsSignal.update((toasts) => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
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

  runAction(id: string): void {
    this.toastService.runAction(id);
  }
}
