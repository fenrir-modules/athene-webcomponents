import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { installTopLayerStyles, supportsTopLayer } from './floating';

/** Why an overlay closed. */
export type AthOverlayCloseReason = 'escape' | 'outside' | 'select' | 'tab' | 'programmatic';

/** What an open overlay tells the stack about itself. */
export interface AthOverlayEntry {
  /** The overlay's box; clicks inside it are not "outside". */
  panel(): HTMLElement | null;
  /** The trigger or anchor; clicks on it are left to its own toggle. */
  anchor(): HTMLElement | null;
  /** Modal overlays (dialogs) stop outside-click handling for everything below them. */
  readonly modal?: boolean;
  closeOnEscape(): boolean;
  closeOnOutsideClick(): boolean;
  dismiss(reason: 'escape' | 'outside'): void;
}

/**
 * The open overlays (popovers, menus, pickers, dialogs) in opening order.
 * One document listener each for Escape and outside pointer-downs, so only
 * the topmost overlay reacts to Escape and a click inside a nested overlay
 * does not close its parent. Also owns the page scroll lock of modal dialogs.
 */
@Injectable({ providedIn: 'root' })
export class AthOverlayStack {
  private readonly doc = inject(DOCUMENT);
  private readonly entries: AthOverlayEntry[] = [];
  private listening = false;
  private escapeTask = 0;
  private locks = 0;
  private savedScroll: { overflow: string; paddingRight: string } | null = null;

  /** Registers an overlay as the new topmost one. */
  open(entry: AthOverlayEntry): void {
    this.remove(entry);
    this.entries.push(entry);
    this.listen();
  }

  /** Unregisters an overlay (idempotent). */
  close(entry: AthOverlayEntry): void {
    this.remove(entry);
    if (this.entries.length === 0) this.unlisten();
  }

  isTop(entry: AthOverlayEntry): boolean {
    return this.entries[this.entries.length - 1] === entry;
  }

  /** How many overlays are open. */
  get size(): number {
    return this.entries.length;
  }

  /**
   * True while the current Escape key press has already closed an overlay.
   * A native modal `<dialog>` checks this in its `cancel` event, which the
   * browser fires after the keydown, so one press closes one layer.
   */
  escapeConsumed(): boolean {
    return this.escapeTask !== 0;
  }

  /**
   * A modal dialog that opens goes on top of the top layer. Elements marked
   * `data-ath-top-layer` (the toast container) are moved back above it, so a
   * toast raised while a dialog is open is still seen.
   */
  raiseTopLayer(): void {
    if (!supportsTopLayer()) return;
    installTopLayerStyles();
    for (const el of Array.from(this.doc.querySelectorAll<HTMLElement>('[data-ath-top-layer]'))) {
      try {
        if (!el.hasAttribute('popover')) el.setAttribute('popover', 'manual');
        if (el.matches(':popover-open')) el.hidePopover();
        el.showPopover();
      } catch {
        // Not connected; nothing to raise.
      }
    }
  }

  /** Locks page scrolling while at least one lock is held (modal dialogs). */
  lockScroll(): void {
    if (this.locks++ > 0) return;
    const root = this.doc.documentElement;
    const body = this.doc.body;
    const view = this.doc.defaultView;
    const scrollbar = view ? view.innerWidth - root.clientWidth : 0;
    this.savedScroll = { overflow: root.style.overflow, paddingRight: body.style.paddingRight };
    root.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }

  unlockScroll(): void {
    if (this.locks === 0 || --this.locks > 0) return;
    if (this.savedScroll) {
      this.doc.documentElement.style.overflow = this.savedScroll.overflow;
      this.doc.body.style.paddingRight = this.savedScroll.paddingRight;
    }
    this.savedScroll = null;
  }

  private remove(entry: AthOverlayEntry): void {
    const i = this.entries.indexOf(entry);
    if (i >= 0) this.entries.splice(i, 1);
  }

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || event.defaultPrevented) return;
    const top = this.entries[this.entries.length - 1];
    // A modal dialog handles Escape through its native `cancel` event.
    if (!top || top.modal) return;
    event.preventDefault();
    this.markEscape();
    if (top.closeOnEscape()) top.dismiss('escape');
  };

  private readonly onPointerDown = (event: Event): void => {
    const path = event.composedPath();
    for (let i = this.entries.length - 1; i >= 0; i--) {
      const entry = this.entries[i];
      if (entry.modal) return;
      const panel = entry.panel();
      const anchor = entry.anchor();
      if ((panel && path.includes(panel)) || (anchor && path.includes(anchor))) return;
      if (!entry.closeOnOutsideClick()) return;
      entry.dismiss('outside');
    }
  };

  private markEscape(): void {
    const view = this.doc.defaultView;
    if (!view) return;
    view.clearTimeout(this.escapeTask);
    this.escapeTask = view.setTimeout(() => (this.escapeTask = 0));
  }

  /**
   * Registered only while an overlay is open. No `NgZone`: in a zone.js app
   * the listeners run in the Angular zone like any template listener, so a
   * dismissal's handlers (the overlay's `closed`, the app's reaction) are
   * followed by change detection; zoneless, the signals and output
   * listeners they touch schedule it.
   */
  private listen(): void {
    if (this.listening) return;
    this.listening = true;
    this.doc.addEventListener('keydown', this.onKeydown);
    this.doc.addEventListener('pointerdown', this.onPointerDown, true);
  }

  private unlisten(): void {
    if (!this.listening) return;
    this.listening = false;
    this.doc.removeEventListener('keydown', this.onKeydown);
    this.doc.removeEventListener('pointerdown', this.onPointerDown, true);
  }
}
