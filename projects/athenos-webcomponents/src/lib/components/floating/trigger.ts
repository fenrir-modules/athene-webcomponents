import { Directive, ElementRef, effect, inject } from '@angular/core';
import { focusTarget } from './focus';

let nextTriggerId = 0;

/**
 * Shared part of `athPopoverTrigger` and `athMenuTrigger`: keeps
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control.
 * On a wrapper component such as `<ath-button>` that is its inner `<button>`,
 * so there is one tab stop and the state is announced where focus is.
 */
@Directive()
export abstract class AthOverlayTriggerBase {
  protected readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  /** The value of `aria-haspopup`. */
  protected abstract popupKind(): string;
  protected abstract isOpen(): boolean;
  protected abstract popupId(): string;

  constructor() {
    effect(() => this.syncAria(this.isOpen()));
  }

  /** The focusable control the attributes go on. */
  get control(): HTMLElement {
    return focusTarget(this.host);
  }

  /** A stable id on the control, for `aria-labelledby` of the popup. */
  controlId(): string {
    const el = this.control;
    if (!el.id) el.id = `ath-trigger-${++nextTriggerId}`;
    return el.id;
  }

  private syncAria(open: boolean): void {
    const el = this.control;
    el.setAttribute('aria-haspopup', this.popupKind());
    el.setAttribute('aria-expanded', String(open));
    if (open) el.setAttribute('aria-controls', this.popupId());
    else el.removeAttribute('aria-controls');
  }
}
