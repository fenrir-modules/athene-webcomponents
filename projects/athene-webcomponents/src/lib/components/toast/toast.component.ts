import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';

import { AthIconComponent, type AthIconData } from '../icon/icon.component';
import { AthToastTimerDirective } from './toast-timer.directive';
import { Check, ChevronUp, X } from 'lucide';
import { AthToastService, type ToastMessage, type ToastVariant } from '@athene/webcomponents/core';
import { formatAthLabel, injectAthLabels } from '../../i18n/labels';

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

/** Where the stack sits: at the bottom (newest at the bottom) or at the top (newest on top). */
export type ToastPlacement = 'bottom' | 'top';

// Bare glyphs for the tinted disc: Lucide's info and alert icons draw their
// own circle, which inside a circle reads as a target.
const INFO_GLYPH: AthIconData = {
  name: 'toast-info',
  node: [
    ['path', { d: 'M12 10.5v7' }],
    ['path', { d: 'M12 6.5h.01' }],
  ],
};
const ALERT_GLYPH: AthIconData = {
  name: 'toast-alert',
  node: [
    ['path', { d: 'M12 6v8' }],
    ['path', { d: 'M12 18h.01' }],
  ],
};

/** Pause reasons the container sets on the service. */
const HOVER = 'ath-toast:hover';
const FOCUS = 'ath-toast:focus';
const HIDDEN = 'ath-toast:hidden';

/** Delay before a new toast is read out: a live region must exist before its text changes. */
const ANNOUNCE_DELAY = 100;

/**
 * Athene Toast Container Component
 *
 * Renders global toast notifications. Place once in the root component.
 *
 * - Newest toast nearest the corner; at most `maxVisible` are shown, older
 *   ones collapse behind a "+N more" button and their clocks stop until
 *   they show again. Pointer or focus on the stack shows them all.
 * - A hairline at the foot of a timed toast shows the time left. Clocks
 *   stop while the pointer or focus is on the stack and while the page is
 *   hidden.
 * - New toasts are read out through two hidden live regions: errors
 *   assertive, everything else polite. The stack itself is a labelled
 *   region (`ATH_LABELS.toastRegion`), so a screen-reader user can find it.
 * - Escape closes the toast that has focus. Focus then moves to the next
 *   toast, or back to where it was before it entered the stack. Nothing
 *   traps focus.
 *
 * @example
 * <!-- app.component.html -->
 * <router-outlet />
 * <ath-toast-container />
 */
/** How long a removed toast stays while it leaves: `ath-toast-close` ends at 60 + 220 ms. */
const LEAVE_MS = 300;

@Component({
  selector: 'ath-toast-container',
  imports: [AthIconComponent, AthToastTimerDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class AthToastContainerComponent {
  protected readonly successIcon = Check;
  protected readonly errorIcon = X;
  protected readonly warningIcon = ALERT_GLYPH;
  protected readonly infoIcon = INFO_GLYPH;
  protected readonly closeIcon = X;
  protected readonly moreIcon = ChevronUp;

  protected readonly toastService = inject(AthToastService);
  private readonly labels = injectAthLabels();
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly doc = inject(DOCUMENT);

  /** How many toasts show at once; older ones collapse behind a counter (default 3). */
  readonly maxVisible = input(3);
  /** `bottom` (default) or `top`; set `--toast-offset-top` / `-bottom` to match. */
  readonly placement = input<ToastPlacement>('bottom');
  /** Accessible name of each close button; `{message}` is the toast's text. Default `ATH_LABELS.toastDismiss`. */
  readonly dismissLabel = input<string | null>(null);
  /** Name of the notifications region. Default `ATH_LABELS.toastRegion`. */
  readonly regionLabel = input<string | null>(null);

  private readonly hovered = signal(false);
  private readonly focused = signal(false);
  /** Opened with the "+N more" button; stays open until pointer and focus leave. */
  private readonly pinned = signal(false);
  /** Where focus was before it entered the stack. */
  private returnFocus: HTMLElement | null = null;

  /** Read by the template, so a pause renders the view (and the hairlines sync). */
  protected readonly paused = this.toastService.paused;

  protected readonly expanded = computed(() => this.hovered() || this.focused() || this.pinned());

  /** Ids of the toasts collapsed behind the visible ones. */
  protected readonly collapsed = computed(() => {
    const list = this.toastService.toasts();
    const max = Math.max(1, this.maxVisible());
    if (this.expanded() || list.length <= max) return new Set<string>();
    return new Set(list.slice(0, list.length - max).map((t) => t.id));
  });

  protected readonly moreText = computed(() =>
    formatAthLabel(this.labels.moreCount(), { count: this.collapsed().size })
  );
  protected readonly regionText = computed(() => this.regionLabel() ?? this.labels.toastRegion());

  /** Text of the two live regions; set a moment after a toast appears. */
  protected readonly politeText = signal('');
  protected readonly assertiveText = signal('');

  private readonly announced = new Set<string>();
  private readonly held = new Set<string>();

  /**
   * Toasts the service removed, shown a moment longer while they leave
   * (`ath-toast-slot--leave`), at the place they had. CSS and a timer, not
   * `animate.leave`: that would pull Angular's animation runtime into the
   * initial bundle of every app that shows a toast.
   */
  private readonly leaving = signal<ReadonlyMap<string, { toast: ToastMessage; at: number }>>(
    new Map()
  );
  private previous: readonly ToastMessage[] = [];

  /** The rows of the stack: the service's toasts, and the ones leaving. */
  protected readonly rows = computed(() => {
    const list = this.toastService.toasts();
    const rows = list.map((toast) => ({ toast, leaving: false }));
    for (const { toast, at } of this.leaving().values()) {
      if (list.some((t) => t.id === toast.id)) continue;
      rows.splice(Math.min(at, rows.length), 0, { toast, leaving: true });
    }
    return rows;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Hold the clocks of collapsed toasts; release them when they show.
    effect(() => {
      const collapsed = this.collapsed();
      untracked(() => {
        for (const id of collapsed) {
          if (!this.held.has(id)) this.toastService.hold(id);
          this.held.add(id);
        }
        for (const id of [...this.held]) {
          if (collapsed.has(id)) continue;
          this.held.delete(id);
          this.toastService.release(id);
        }
      });
    });

    // Announce each new toast once; focus that went with a removed toast
    // (no focusout fires then) is let go once the list has rendered.
    effect(() => {
      const list = this.toastService.toasts();
      untracked(() => {
        this.announce(list);
        this.doc.defaultView?.requestAnimationFrame(() => {
          if (this.focused() && !this.host.nativeElement.contains(this.doc.activeElement)) {
            this.leaveFocus();
          }
        });
      });
    });

    // A removed toast stays a moment as a leaving row.
    const leaveTimers = new Set<ReturnType<typeof setTimeout>>();
    effect(() => {
      const list = this.toastService.toasts();
      untracked(() => {
        const gone = this.previous
          .map((toast, at) => ({ toast, at }))
          .filter(({ toast }) => !list.some((t) => t.id === toast.id));
        this.previous = list;
        if (gone.length === 0) return;
        this.leaving.update((map) => {
          const next = new Map(map);
          for (const g of gone) next.set(g.toast.id, g);
          return next;
        });
        const timer = setTimeout(() => {
          leaveTimers.delete(timer);
          this.leaving.update((map) => {
            const next = new Map(map);
            for (const g of gone) next.delete(g.toast.id);
            return next;
          });
        }, LEAVE_MS);
        leaveTimers.add(timer);
      });
    });

    const view = this.doc.defaultView;
    const onVisibility = () => this.syncVisibility();
    this.doc.addEventListener('visibilitychange', onVisibility);
    this.syncVisibility();

    destroyRef.onDestroy(() => {
      this.doc.removeEventListener('visibilitychange', onVisibility);
      for (const reason of [HOVER, FOCUS, HIDDEN]) this.toastService.resume(reason);
      for (const id of this.held) this.toastService.release(id);
      view?.clearTimeout(this.announceTask);
      for (const timer of leaveTimers) clearTimeout(timer);
    });
  }

  getIcon(variant: ToastVariant): AthIconData {
    switch (variant) {
      case 'success':
        return this.successIcon;
      case 'error':
        return this.errorIcon;
      case 'warning':
        return this.warningIcon;
      case 'info':
        return this.infoIcon;
    }
  }

  dismiss(id: string): void {
    this.moveFocusFrom(id);
    this.toastService.remove(id);
  }

  runAction(id: string): void {
    this.moveFocusFrom(id);
    this.toastService.runAction(id);
  }

  protected closeLabel(toast: ToastMessage): string {
    const text = toast.title ? `${toast.title}: ${toast.message}` : toast.message;
    return formatAthLabel(this.dismissLabel() ?? this.labels.toastDismiss(), { message: text });
  }

  protected timed(toast: ToastMessage): boolean {
    return (toast.duration ?? 0) > 0;
  }

  // ---- Pointer and focus -------------------------------------------------

  protected onPointerEnter(): void {
    this.hovered.set(true);
    this.toastService.pause(HOVER);
  }

  protected onPointerLeave(): void {
    this.hovered.set(false);
    this.toastService.resume(HOVER);
    if (!this.focused()) this.pinned.set(false);
  }

  protected onFocusIn(event: FocusEvent): void {
    if (!this.focused()) {
      const from = event.relatedTarget;
      this.returnFocus =
        from instanceof HTMLElement && !this.host.nativeElement.contains(from) ? from : null;
    }
    this.focused.set(true);
    this.toastService.pause(FOCUS);
  }

  protected onFocusOut(event: FocusEvent): void {
    const to = event.relatedTarget;
    if (to instanceof Node && this.host.nativeElement.contains(to)) return;
    this.leaveFocus();
  }

  protected onKeydown(event: KeyboardEvent, id: string): void {
    if (event.key !== 'Escape' || event.defaultPrevented) return;
    // Handled here: no dialog or popover below closes on the same press.
    event.preventDefault();
    this.dismiss(id);
  }

  /** "+N more": shows every toast and moves focus to the oldest. */
  protected expand(): void {
    this.pinned.set(true);
    const first = this.toastService.toasts()[0];
    // After the render that takes `inert` off the collapsed toasts.
    // The oldest is still collapsed (inert, hidden) until the next render;
    // give it the state that render gives it, then focus it.
    const slot = first ? this.toastElement(first.id)?.closest('li') : null;
    if (first && slot) {
      slot.removeAttribute('inert');
      slot.classList.remove('ath-toast-slot--collapsed');
      this.focusToast(first.id);
    }
  }

  // ---- Internals --------------------------------------------------------

  private leaveFocus(): void {
    this.focused.set(false);
    this.toastService.resume(FOCUS);
    if (!this.hovered()) this.pinned.set(false);
  }

  /**
   * Focus inside a toast that is about to close goes to the next toast (the
   * one below it, else the one above), else back to where it came from.
   */
  private moveFocusFrom(id: string): void {
    const el = this.toastElement(id);
    const active = this.doc.activeElement;
    if (!el || !active || !el.contains(active)) return;
    const list = this.toastService.toasts();
    const i = list.findIndex((t) => t.id === id);
    const next = list[i + 1] ?? list[i - 1];
    if (next && this.focusToast(next.id)) return;
    const back = this.returnFocus;
    this.returnFocus = null;
    if (back?.isConnected) back.focus();
    else (active as HTMLElement).blur();
    if (!this.host.nativeElement.contains(this.doc.activeElement)) this.leaveFocus();
  }

  private focusToast(id: string): boolean {
    const el = this.toastElement(id);
    if (!el) return false;
    el.focus();
    return this.doc.activeElement === el;
  }

  private toastElement(id: string): HTMLElement | null {
    return this.host.nativeElement.querySelector<HTMLElement>(
      `.ath-toast[data-toast-id="${CSS.escape(id)}"]`
    );
  }

  private syncVisibility(): void {
    if (this.doc.visibilityState === 'hidden') this.toastService.pause(HIDDEN);
    else this.toastService.resume(HIDDEN);
  }

  private announceTask = 0;

  private announce(list: readonly ToastMessage[]): void {
    const fresh = list.filter((t) => !this.announced.has(t.id));
    const ids = new Set(list.map((t) => t.id));
    for (const id of [...this.announced]) if (!ids.has(id)) this.announced.delete(id);
    if (fresh.length === 0) return;
    for (const t of fresh) this.announced.add(t.id);
    const view = this.doc.defaultView;
    if (!view) return;
    const text = (t: ToastMessage) => (t.title ? `${t.title}: ${t.message}` : t.message);
    const errors = fresh.filter((t) => t.variant === 'error').map(text);
    const others = fresh.filter((t) => t.variant !== 'error').map(text);
    // Cleared first, so the same text twice in a row is read twice.
    if (errors.length) this.assertiveText.set('');
    if (others.length) this.politeText.set('');
    view.clearTimeout(this.announceTask);
    this.announceTask = view.setTimeout(() => {
      if (errors.length) this.assertiveText.set(errors.join('. '));
      if (others.length) this.politeText.set(others.join('. '));
    }, ANNOUNCE_DELAY);
  }

  /**
   * One Web Animation per timed toast: the hairline shrinks from the time
   * left to zero, running exactly while the service's clock runs. Rebuilt
   * from `remaining()` on every change, so the two never drift. (Web
   * Animations, not CSS: the global reduced-motion reset would end a CSS
   * animation at once, and the time left is information, not decoration.)
   */
}
