// Scroll containment for inner scroll panes (W5-R).
//
// `overscroll-behavior-y: contain` on a scroll container stops the wheel
// from chaining to the page *whether or not the container overflows*: a
// list of three options with `overflow-y: auto; overscroll-behavior: contain`
// swallows every wheel turn over it, and the page under the pointer stands
// still. So containment is set only while the pane really scrolls.

/**
 * Keeps `overscroll-behavior-y: contain` on `el` exactly while its content
 * is taller than its box, so the wheel stays in a list that scrolls and
 * passes on to the page over one that does not. Follows the element's size
 * (a list capped by `max-height` grows to the cap as rows come and shrinks
 * as they go). Returns the cleanup.
 */
export function containScrollWhileOverflowing(el: HTMLElement): () => void {
  const sync = (): void => {
    el.style.overscrollBehaviorY = el.scrollHeight > el.clientHeight ? 'contain' : '';
  };
  sync();
  if (typeof ResizeObserver === 'undefined') return () => undefined;
  const observer = new ResizeObserver(sync);
  observer.observe(el);
  return () => observer.disconnect();
}

const SCROLLS = /^(auto|scroll|overlay)$/;

/**
 * What a scroll container on the wheel's path does with it: `take` (room
 * left to scroll that way), `keep` (at its end, but `overscroll-behavior-y`
 * stops the chain), or `pass` (no scroll container, or at its end).
 */
function wheelAt(el: Element, deltaY: number): 'take' | 'keep' | 'pass' {
  const style = getComputedStyle(el);
  if (!SCROLLS.test(style.overflowY)) return 'pass';
  const max = el.scrollHeight - el.clientHeight;
  const room = deltaY < 0 ? el.scrollTop > 0 : max > 0 && el.scrollTop < max - 1;
  if (room) return 'take';
  return style.overscrollBehaviorY === 'auto' ? 'pass' : 'keep';
}

/** The scroller the anchor sits in (not the document's own: the browser chains there by itself). */
function scrollParent(el: Element | null): HTMLElement | null {
  const root = el?.ownerDocument.scrollingElement;
  for (let node = el?.parentElement ?? null; node; node = node.parentElement) {
    if (node === root || node === el?.ownerDocument.body) return null;
    if (SCROLLS.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight) {
      return node;
    }
  }
  return null;
}

/** Wheel delta in px (`deltaMode` lines or pages are rare: a mouse wheel on some systems). */
function pixels(event: WheelEvent, page: number): number {
  if (event.deltaMode === 1) return event.deltaY * 16;
  if (event.deltaMode === 2) return event.deltaY * page;
  return event.deltaY;
}

/**
 * A floating panel is drawn in the top layer (or `position: fixed`), so the
 * browser chains its wheel to the document, never to the pane its anchor
 * sits in: with the pointer over a short menu or picker the page below did
 * not move (W5-R). This passes such a wheel on to the anchor's scroller,
 * the way an inline panel would chain, unless something inside the panel
 * takes it (a list with room left to scroll) or keeps it
 * (`overscroll-behavior-y` other than `auto`, as on a list that scrolls).
 * The panel follows its anchor on that scroll. Returns the cleanup.
 */
export function chainWheelToAnchor(panel: HTMLElement, anchor: Element | null): () => void {
  if (!anchor) return () => undefined;
  const onWheel = (event: WheelEvent): void => {
    if (event.defaultPrevented || event.ctrlKey || event.deltaY === 0) return;
    const start = event.target instanceof Element ? event.target : panel;
    for (let el: Element | null = start; el; el = el.parentElement) {
      if (wheelAt(el, event.deltaY) !== 'pass') return;
      if (el === panel) break;
    }
    const target = scrollParent(anchor);
    if (target) target.scrollBy({ top: pixels(event, target.clientHeight) });
  };
  panel.addEventListener('wheel', onWheel, { passive: true });
  return () => panel.removeEventListener('wheel', onWheel);
}
