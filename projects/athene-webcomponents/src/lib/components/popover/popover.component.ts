import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  AthFloatingDirective,
  resolveAnchor,
  type FloatingAnchor,
} from '../floating/floating.directive';
import type { FloatingAlign, FloatingSide } from '../floating/floating';
import {
  AthOverlayStack,
  type AthOverlayCloseReason,
  type AthOverlayEntry,
} from '../floating/overlay-stack';
import { focusSafely, focusTarget, tabbables, trapTab } from '../floating/focus';

/** Panel width: `sm` 220px, `md` 280px (default), `lg` 360px, `auto` fits the content. */
export type PopoverSize = 'sm' | 'md' | 'lg' | 'auto';
/** Inner padding of the panel. */
export type PopoverPadding = 'md' | 'sm' | 'none';
/** Where focus goes when the panel opens. */
export type PopoverAutoFocus = 'first' | 'panel' | 'none';
/** ARIA role of the panel; `null` for a bare container (the content brings its own role). */
export type PopoverRole = 'dialog' | 'menu' | 'listbox' | null;

export type { AthOverlayCloseReason as PopoverCloseReason } from '../floating/overlay-stack';

let nextPopoverId = 0;

/**
 * Lazy panel content: rendered only while the popover is open.
 *
 * @example
 * <ath-popover>
 *   <ng-template athPopoverContent>…</ng-template>
 * </ath-popover>
 */
@Directive({
  selector: 'ng-template[athPopoverContent]',
  standalone: true,
})
export class AthPopoverContentDirective {
  readonly template = inject(TemplateRef);
}

/**
 * Athene Popover
 *
 * An anchored panel in the top layer: no container's overflow or z-index
 * clips it. Opens from `athPopoverTrigger`, `show()` or `[(open)]`; closes on
 * Escape (topmost overlay only), outside click and Tab-out, and returns focus
 * to the trigger. `role="dialog"` by default; `trapFocus` keeps Tab inside.
 *
 * @example
 * <ath-button [athPopoverTrigger]="info">Details</ath-button>
 * <ath-popover #info ariaLabel="Details" arrow>
 *   <p>Content</p>
 * </ath-popover>
 */
@Component({
  selector: 'ath-popover',
  standalone: true,
  imports: [AthFloatingDirective, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  exportAs: 'athPopover',
})
export class AthPopoverComponent implements OnChanges, OnDestroy {
  private readonly stack = inject(AthOverlayStack);

  /** Whether the panel is shown. Two-way: `[(open)]`. */
  readonly open = model(false);
  /** The element the panel hangs from. A trigger directive sets it on its own. */
  readonly anchor = input<FloatingAnchor>(null);
  readonly size = input<PopoverSize>('md');
  readonly padding = input<PopoverPadding>('md');
  readonly align = input<FloatingAlign>('start');
  readonly side = input<FloatingSide>('bottom');
  /** Gap to the anchor in px. */
  readonly offset = input(6);
  readonly matchWidth = input(false, { transform: booleanAttribute });
  /** Upper bound for the height in px (the viewport caps it anyway). */
  readonly maxHeight = input<number | null>(null);
  /** Show an arrow pointing at the anchor. */
  readonly arrow = input(false, { transform: booleanAttribute });
  /** Keep Tab inside the panel (modal-like content); otherwise Tab out closes it. */
  readonly trapFocus = input(false, { transform: booleanAttribute });
  readonly autoFocus = input<PopoverAutoFocus>('first');
  /** Return focus to the trigger on Escape / selection / programmatic close. */
  readonly restoreFocus = input(true, { transform: booleanAttribute });
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  readonly closeOnOutsideClick = input(true, { transform: booleanAttribute });
  readonly panelRole = input<PopoverRole>('dialog');
  readonly ariaLabel = input<string | null>(null);
  readonly ariaLabelledby = input<string | null>(null);
  /** Extra classes on the panel (it lives in this component's view). */
  readonly panelClass = input('');

  readonly opened = output<void>();
  readonly closed = output<AthOverlayCloseReason>();

  /** Id of the panel, for `aria-controls`. */
  readonly panelId = input(`ath-popover-${++nextPopoverId}`);

  protected readonly lazyContent = contentChild(AthPopoverContentDirective, {
    descendants: false,
  });
  private readonly panelRef = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly triggerAnchor = signal<HTMLElement | null>(null);

  /** The element the panel currently hangs from. */
  readonly anchorElement = computed(() => resolveAnchor(this.anchor()) ?? this.triggerAnchor());

  protected readonly panelClasses = computed(() =>
    [
      `ath-popover__panel--${this.size()}`,
      `ath-popover__panel--pad-${this.padding()}`,
      this.panelClass(),
    ]
      .filter(Boolean)
      .join(' ')
  );

  private registered = false;
  private returnFocus: HTMLElement | null = null;
  private focusTimer: ReturnType<typeof setTimeout> | undefined;

  private readonly entry: AthOverlayEntry = {
    panel: () => this.panel,
    anchor: () => this.anchorElement(),
    closeOnEscape: () => this.closeOnEscape(),
    closeOnOutsideClick: () => this.closeOnOutsideClick(),
    dismiss: (reason) => this.hide(reason),
  };

  /** The panel element while open. */
  get panel(): HTMLElement | null {
    return this.panelRef()?.nativeElement ?? null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['open']) return;
    if (this.open() && !this.registered) this.afterOpen();
    else if (!this.open() && this.registered) this.afterClose('programmatic');
  }

  ngOnDestroy(): void {
    clearTimeout(this.focusTimer);
    if (this.registered) this.stack.close(this.entry);
  }

  /** Opens the panel, optionally hanging it from `anchor`. */
  show(anchor?: HTMLElement | null): void {
    if (anchor) this.triggerAnchor.set(anchor);
    if (this.open()) return;
    this.open.set(true);
    this.afterOpen();
  }

  /**
   * Closes the panel. `restore` overrides whether focus goes back to the
   * trigger (default: yes when focus was inside or the user pressed Escape).
   */
  hide(reason: AthOverlayCloseReason = 'programmatic', restore?: boolean): void {
    if (!this.open()) return;
    this.open.set(false);
    this.afterClose(reason, restore);
  }

  toggle(anchor?: HTMLElement | null): void {
    if (this.open()) this.hide();
    else this.show(anchor);
  }

  /** Moves focus into the panel according to `autoFocus` (or `mode`). */
  focusPanel(mode: PopoverAutoFocus = this.autoFocus()): void {
    const panel = this.panel;
    if (!panel || mode === 'none') return;
    const active = panel.ownerDocument.activeElement;
    if (active && panel.contains(active) && active !== panel) return;
    const target = mode === 'first' ? (tabbables(panel)[0] ?? panel) : panel;
    focusSafely(target);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const panel = this.panel;
    if (panel && this.trapFocus()) trapTab(event, panel);
  }

  protected onFocusOut(event: FocusEvent): void {
    if (this.trapFocus() || !this.open()) return;
    const next = event.relatedTarget;
    const panel = this.panel;
    const anchor = this.anchorElement();
    if (!(next instanceof Node) || !panel) return;
    if (panel.contains(next) || anchor?.contains(next)) return;
    this.hide('tab', false);
  }

  private afterOpen(): void {
    this.registered = true;
    const doc = this.anchorElement()?.ownerDocument ?? document;
    const active = doc.activeElement;
    const anchor = this.anchorElement();
    this.returnFocus = anchor
      ? focusTarget(anchor)
      : active instanceof HTMLElement && active !== doc.body
        ? active
        : null;
    this.stack.open(this.entry);
    this.opened.emit();
    // After the panel has rendered and been positioned.
    clearTimeout(this.focusTimer);
    this.focusTimer = setTimeout(() => this.focusPanel());
  }

  private afterClose(reason: AthOverlayCloseReason, restore?: boolean): void {
    this.registered = false;
    clearTimeout(this.focusTimer);
    this.stack.close(this.entry);
    const panel = this.panel;
    const doc = panel?.ownerDocument ?? document;
    const focusInside = !!panel && panel.contains(doc.activeElement);
    const back = this.returnFocus;
    this.returnFocus = null;
    const wanted =
      restore ??
      (this.restoreFocus() &&
        (reason === 'escape' || reason === 'select' || (reason !== 'tab' && focusInside)));
    if (wanted && reason !== 'outside') {
      focusSafely(back);
    } else if (reason === 'outside' && focusInside && this.restoreFocus()) {
      // The panel takes focus with it; if the click landed on nothing
      // focusable, put focus back on the trigger instead of the page.
      setTimeout(() => {
        if (doc.activeElement === doc.body || !doc.activeElement) focusSafely(back);
      });
    }
    this.closed.emit(reason);
  }
}
