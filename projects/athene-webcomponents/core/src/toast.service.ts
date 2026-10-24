import { Injectable, signal } from '@angular/core';

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
  private readonly toastsSignal = signal<ToastMessage[]>([]);
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
    this.toastsSignal.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  private add(
    variant: ToastVariant,
    message: string,
    options: number | ToastOptions,
    fallback: number
  ): void {
    const opts: ToastOptions = typeof options === 'number' ? { duration: options } : options;
    const action = opts.action;
    const duration = opts.duration ?? (action ? Math.max(fallback, ACTION_MIN_DURATION) : fallback);
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const toast: ToastMessage = { id, variant, message, duration, action };

    this.toastsSignal.update((toasts) => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }
}
