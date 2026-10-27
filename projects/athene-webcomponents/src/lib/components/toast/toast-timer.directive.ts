import { DestroyRef, Directive, ElementRef, effect, inject, input, untracked } from '@angular/core';
import { AthToastService } from '@athene/webcomponents/core';

/**
 * A toast's time-left hairline: from the time the toast has left to zero,
 * paused while its clock stands (`running` false: paused, held, leaving).
 * On the bar element itself, so it starts with the element, without a
 * render hook (`afterRenderEffect` would pull Angular's render-hook runtime
 * into the initial bundle of every app).
 */
@Directive({ selector: '[athToastTimer]' })
export class AthToastTimerDirective {
  /** The toast's id. */
  readonly id = input.required<string>({ alias: 'athToastTimer' });
  /** Its clock runs now. */
  readonly running = input(true);

  constructor() {
    const bar = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const service = inject(AthToastService);
    let anim: Animation | null = null;
    effect(() => {
      const id = this.id();
      const running = this.running();
      untracked(() => {
        if (!running && anim) {
          anim.pause();
          return;
        }
        const toast = service.toasts().find((t) => t.id === id);
        const total = toast?.duration ?? 0;
        const remaining = service.remaining(id);
        anim?.cancel();
        anim = null;
        if (remaining === null || total <= 0 || typeof bar.animate !== 'function') return;
        const from = Math.min(1, remaining / total);
        anim = bar.animate([{ transform: `scaleX(${from})` }, { transform: 'scaleX(0)' }], {
          duration: Math.max(1, remaining),
          easing: 'linear',
          fill: 'forwards',
        });
        if (!running) anim.pause();
      });
    });
    inject(DestroyRef).onDestroy(() => anim?.cancel());
  }
}
