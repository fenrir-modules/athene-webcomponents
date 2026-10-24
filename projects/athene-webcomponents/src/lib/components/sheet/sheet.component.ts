import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  booleanAttribute,
  effect,
  inject,
  input,
  output,
  untracked,
  viewChild,
} from '@angular/core';
import { supportsTopLayer } from '../floating/floating';
import { AthOverlayStack, type AthOverlayEntry } from '../floating/overlay-stack';
import { focusSafely, tabbables } from '../floating/focus';

/** Where focus goes when the sheet opens. */
export type SheetAutoFocus = 'panel' | 'first' | 'none';

let nextSheetId = 0;

/**
 * Athene Sheet: a non-modal side sheet at the inline end of the viewport
 * (the right in LTR), for detail that sits beside the page instead of over
 * it — a ticket's peek view next to the list it was opened from.
 *
 * - **Non-modal:** no scrim, no focus trap, no scroll lock. The page beside
 *   it stays usable; a click there does not close the sheet.
 * - **Top layer:** the panel is promoted with `popover="manual"`, so no
 *   ancestor's `overflow`, `transform` or `z-index` clips or covers it.
 *   Menus, pickers and dialogs opened later lie above it; the toast
 *   container is raised above it too. Without the Popover API it falls back
 *   to `position: fixed` at `--z-fixed`.
 * - **Escape** (topmost overlay only, via `AthOverlayStack`) asks to close:
 *   it emits `closed` and `openChange(false)`. The sheet is controlled and
 *   closes when `open` turns false, so a parent may refuse (an edit to
 *   cancel first).
 * - **Focus:** on open it moves into the sheet (`autoFocus`: the panel
 *   itself by default, or the first control); on close it returns to where
 *   it was before, when it was inside the sheet or would otherwise be lost.
 *   Tab moves on through the page as usual.
 *
 * The panel stays where the template puts it in the DOM (encapsulated
 * styles, event bubbling and tab order keep working) and inherits text
 * styles from there. `top` keeps a shell's top bar uncovered.
 *
 * @example
 * <ath-sheet [open]="!!ticket()" [ariaLabel]="ticket()?.title" width="560px" top="48px"
 *            (closed)="ticket.set(null)">
 *   …detail…
 * </ath-sheet>
 */
@Component({
  selector: 'ath-sheet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.scss',
})
export class AthSheetComponent implements OnChanges, OnDestroy {
  private readonly stack = inject(AthOverlayStack);

  /** Whether the sheet is shown. Controlled; pair with `(openChange)` or `(closed)`. */
  readonly open = input(false, { transform: booleanAttribute });
  /** Width (a CSS length); capped at the viewport. Default 480px. */
  readonly width = input<string | null>(null);
  /** Distance from the viewport's top (a CSS length), e.g. a top bar's height. Default 0. */
  readonly top = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly ariaLabelledby = input<string | null>(null);
  readonly autoFocus = input<SheetAutoFocus>('panel');
  /** Return focus to where it was before opening (see the class comment). */
  readonly restoreFocus = input(true, { transform: booleanAttribute });
  /** Whether Escape asks to close. */
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  /** Extra classes on the panel (it lives in this component's view). */
  readonly panelClass = input('');
  readonly panelId = input(`ath-sheet-${++nextSheetId}`);

  /** The user asked to close (Escape). */
  readonly closed = output<void>();
  /** Two-way partner of `open`; emits `false` on a close request. */
  readonly openChange = output<boolean>();
  /** The sheet is shown (in the top layer, focus placed). */
  readonly opened = output<void>();

  private panelEl: HTMLElement | null = null;
  private returnFocus: HTMLElement | null = null;

  private readonly entry: AthOverlayEntry = {
    panel: () => this.panelEl,
    anchor: () => null,
    closeOnEscape: () => this.closeOnEscape(),
    // Non-modal: the page beside the sheet is for working in.
    closeOnOutsideClick: () => false,
    dismiss: () => this.requestClose(),
  };

  /** The panel element while open. */
  get panel(): HTMLElement | null {
    return this.panelEl;
  }

  /** The panel; rendered while `open` is true. */
  private readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');

  constructor() {
    // DOM sync, no state: the top layer, the overlay stack and focus follow
    // the panel element as `@if (open())` adds and removes it.
    effect(() => {
      const el = this.panelRef()?.nativeElement ?? null;
      untracked(() => this.attach(el));
    });
  }

  private attach(el: HTMLElement | null): void {
    if (el === this.panelEl) return;
    if (this.panelEl) this.teardown();
    this.panelEl = el;
    if (el) this.present(el);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Remember the focus before the panel renders and takes it.
    if (changes['open'] && this.open() && !this.panelEl) {
      const active = document.activeElement;
      this.returnFocus = active instanceof HTMLElement && active !== document.body ? active : null;
    }
  }

  ngOnDestroy(): void {
    if (this.panelEl) this.teardown();
  }

  /** Asks to close, as Escape does. */
  close(): void {
    this.requestClose();
  }

  private requestClose(): void {
    this.closed.emit();
    this.openChange.emit(false);
  }

  private present(el: HTMLElement): void {
    this.stack.open(this.entry);
    if (supportsTopLayer()) {
      el.setAttribute('popover', 'manual');
      try {
        el.showPopover();
      } catch {
        // Not connected (yet): stay a fixed layer.
        el.removeAttribute('popover');
      }
    }
    // Toasts stay visible above the sheet.
    this.stack.raiseTopLayer();
    this.focusInitial(el);
    this.opened.emit();
  }

  private focusInitial(el: HTMLElement): void {
    const mode = this.autoFocus();
    if (mode === 'none') return;
    const active = el.ownerDocument.activeElement;
    if (active && active !== el && el.contains(active)) return;
    if (mode === 'first' && focusSafely(tabbables(el)[0])) return;
    focusSafely(el);
  }

  private teardown(): void {
    const el = this.panelEl;
    this.panelEl = null;
    this.stack.close(this.entry);
    if (!el) return;
    const doc = el.ownerDocument;
    // Removed from the document already (the parent closed it), focus is
    // on the body; still in it, focus may be inside.
    const lost =
      !doc.activeElement || doc.activeElement === doc.body || el.contains(doc.activeElement);
    try {
      if (el.matches(':popover-open')) el.hidePopover();
    } catch {
      // Already gone from the document.
    }
    const back = this.returnFocus;
    this.returnFocus = null;
    if (this.restoreFocus() && lost) focusSafely(back);
  }
}
