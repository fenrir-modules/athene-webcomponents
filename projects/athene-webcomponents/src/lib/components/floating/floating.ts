/** Which edge of the anchor a floating panel lines up with. */
export type FloatingAlign = 'start' | 'end' | 'auto';

export interface FloatingOptions {
  align?: FloatingAlign;
  /** Gap between anchor and panel, in px. */
  offset?: number;
  /** At least as wide as the anchor. */
  matchWidth?: boolean;
}

/** Space kept between a floating panel and the viewport's edges. */
const MARGIN = 8;

/**
 * Pins a menu or popover to its anchor as a `position: fixed` layer, so an
 * `overflow: hidden/auto` ancestor (a side panel, a dialog body, a table
 * scroller) can never clip it, and keeps it inside the viewport: below the
 * anchor when it fits, above when there is more room there, shifted
 * sideways to stay on screen, height-capped (scrolling inside) when
 * neither side has room. Follows scrolls, resizes and its own size.
 *
 * The panel stays where the template rendered it; only its box moves.
 * Returns the function that stops following.
 */
export function floatPanel(
  panel: HTMLElement,
  anchor: HTMLElement,
  options: FloatingOptions = {}
): () => void {
  const style = panel.style;
  style.position = 'fixed';
  style.top = '0';
  style.left = '0';
  style.right = 'auto';
  style.bottom = 'auto';
  style.margin = '0';
  style.zIndex = 'var(--z-popover)';
  style.visibility = 'hidden';

  let frame = 0;
  const place = (): void => {
    if (!anchor.isConnected) return;
    const a = anchor.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const gap = options.offset ?? 4;

    if (options.matchWidth) style.minWidth = `${Math.round(a.width)}px`;
    style.maxHeight = '';
    const width = Math.min(panel.offsetWidth, vw - MARGIN * 2);
    const natural = panel.offsetHeight;

    const below = vh - a.bottom - gap - MARGIN;
    const above = a.top - gap - MARGIN;
    const down = natural <= below || below >= above;
    const room = Math.max(down ? below : above, 120);
    const height = Math.min(natural, room);
    if (natural > room) {
      style.maxHeight = `${Math.floor(room)}px`;
      style.overflowY = 'auto';
    }

    const align = options.align ?? 'start';
    const fromEnd = a.right - width;
    let left =
      align === 'end'
        ? fromEnd
        : align === 'auto' && a.left + width > vw - MARGIN
          ? fromEnd
          : a.left;
    left = Math.max(MARGIN, Math.min(left, vw - width - MARGIN));
    const top = down ? a.bottom + gap : a.top - gap - height;

    const origin = fixedOrigin(panel);
    style.left = `${Math.round(left - origin.x)}px`;
    style.top = `${Math.round(Math.max(MARGIN, top) - origin.y)}px`;
    style.maxWidth = `${vw - MARGIN * 2}px`;
    style.visibility = '';
    panel.dataset['placement'] = down ? 'bottom' : 'top';
  };
  const schedule = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(place);
  };

  window.addEventListener('resize', schedule);
  document.addEventListener('scroll', schedule, true);
  const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
  resize?.observe(panel);
  place();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', schedule);
    document.removeEventListener('scroll', schedule, true);
    resize?.disconnect();
  };
}

/**
 * Where `position: fixed; left: 0; top: 0` lands for this element. Normally
 * the viewport's corner; inside a transformed ancestor (a centred dialog)
 * `fixed` is relative to that ancestor instead. Measured with a bare probe,
 * so the panel's own entry animation does not skew it.
 */
function fixedOrigin(el: HTMLElement): { x: number; y: number } {
  const parent = el.parentElement;
  if (!parent) return { x: 0, y: 0 };
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none';
  parent.appendChild(probe);
  const box = probe.getBoundingClientRect();
  probe.remove();
  return { x: box.left, y: box.top };
}
