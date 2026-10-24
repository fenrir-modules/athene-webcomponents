import {
  AfterViewInit,
  Directive,
  ElementRef,
  // eslint-disable-next-line no-restricted-imports -- runOutsideAngular only, a zone.js optimisation for floatPanel's scroll/resize listeners; see `zone` below.
  NgZone,
  OnChanges,
  OnDestroy,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import {
  floatPanel,
  isVirtualAnchor,
  type FloatingAlign,
  type FloatingCleanup,
  type FloatingSide,
  type FloatingVirtualAnchor,
} from './floating';

/**
 * An anchor given as an element, an `ElementRef` (a template ref of a
 * component) or a `FloatingVirtualAnchor` (a caret or pointer rectangle).
 */
export type FloatingAnchor =
  | HTMLElement
  | ElementRef<HTMLElement>
  | FloatingVirtualAnchor
  | null
  | undefined;

/**
 * The element behind an anchor: itself, or a virtual anchor's
 * `contextElement` (focus return, outside clicks, `aria-*`).
 */
export function resolveAnchor(anchor: FloatingAnchor): HTMLElement | null {
  if (!anchor) return null;
  if (anchor instanceof ElementRef) return anchor.nativeElement;
  if (isVirtualAnchor(anchor)) {
    const ctx = anchor.contextElement;
    return ctx instanceof HTMLElement ? ctx : null;
  }
  return anchor;
}

/** What a panel is placed against: the element, or the virtual anchor itself. */
export function resolveFloatingTarget(
  anchor: FloatingAnchor
): HTMLElement | FloatingVirtualAnchor | null {
  if (!anchor) return null;
  return anchor instanceof ElementRef ? anchor.nativeElement : anchor;
}

/**
 * Hangs the host element from an anchor with `floatPanel`: top layer (so no
 * `overflow`, `transform` or `z-index` of a container can clip or cover it),
 * kept inside the viewport (flip, shift, height cap), following scrolls,
 * resizes and size changes. The host stays where the template puts it.
 *
 * The only positioning logic of the library; `ath-popover`, `ath-menu` and
 * `ath-option-picker` use it, and app code that needs a bare floating panel
 * uses it instead of measuring rectangles itself.
 *
 * @example
 * @if (open()) {
 *   <div class="menu" [athFloating]="trigger" align="end">…</div>
 * }
 */
@Directive({
  selector: '[athFloating]',
  standalone: true,
  exportAs: 'athFloating',
})
export class AthFloatingDirective implements AfterViewInit, OnChanges, OnDestroy {
  /** The element (or virtual anchor) the panel hangs from. */
  readonly anchor = input.required<FloatingAnchor>({ alias: 'athFloating' });
  /**
   * `start`: start edges line up; `end`: end edges; `auto`: start unless it
   * overflows; `center`: centred on the anchor.
   */
  readonly align = input<FloatingAlign>('start');
  /** Preferred side; flips when the other side has more room. */
  readonly side = input<FloatingSide>('bottom');
  /** Gap between anchor and panel, in px. */
  readonly offset = input(4);
  /** At least as wide as the anchor (selects, comboboxes). */
  readonly matchWidth = input(false, { transform: booleanAttribute });
  /** Upper bound for the height in px (the viewport caps it anyway). */
  readonly maxHeight = input<number | null>(null);
  /** Promote into the top layer (default). `false` keeps `position: fixed` + `--z-popover`. */
  readonly topLayer = input(true, { transform: booleanAttribute });
  /** An arrow element inside the panel, kept pointing at the anchor's centre. */
  readonly arrow = input<HTMLElement | null>(null);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /**
   * Only for `runOutsideAngular` below, a zone.js optimisation: `floatPanel`
   * listens to every scroll, resize and size change while the panel is open
   * and must not run the app's change detection each time. It changes no
   * Angular state, so it is correct with and without zone.js; zoneless,
   * `NgZone` is a no-op (angular.dev/guide/zoneless keeps `run` and
   * `runOutsideAngular` for libraries that zone.js apps use). Drop it with
   * zone.js (4.3).
   */
  private readonly zone = inject(NgZone);
  private cleanup: FloatingCleanup | null = null;
  private viewReady = false;

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.attach();
  }

  ngOnChanges(): void {
    if (this.viewReady) this.attach();
  }

  ngOnDestroy(): void {
    this.cleanup?.();
    this.cleanup = null;
  }

  /** Re-measures now (after a content change the ResizeObserver cannot see). */
  update(): void {
    this.cleanup?.update();
  }

  private attach(): void {
    this.cleanup?.();
    this.cleanup = null;
    const anchor = resolveFloatingTarget(this.anchor());
    if (!anchor) return;
    this.cleanup = this.zone.runOutsideAngular(() =>
      floatPanel(this.el, anchor, {
        align: this.align(),
        side: this.side(),
        offset: this.offset(),
        matchWidth: this.matchWidth(),
        maxHeight: this.maxHeight(),
        topLayer: this.topLayer(),
        arrow: this.arrow(),
      })
    );
  }
}
