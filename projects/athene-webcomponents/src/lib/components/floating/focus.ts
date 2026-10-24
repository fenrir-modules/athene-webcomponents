// Focus helpers shared by the overlay primitives (popover, menu, listbox, dialog).

const FOCUSABLE = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]',
].join(',');

/** Elements inside `root` reachable with Tab, in document order. */
export function tabbables(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.tabIndex >= 0 && !el.closest('[inert]') && el.getClientRects().length > 0
  );
}

/** The first focusable element of `root` (any tabindex), or `null`. */
export function firstFocusable(root: HTMLElement): HTMLElement | null {
  return root.querySelector<HTMLElement>(FOCUSABLE);
}

/**
 * Keeps Tab inside `root`: from the last tabbable to the first and back.
 * Returns true when it moved focus.
 */
export function trapTab(event: KeyboardEvent, root: HTMLElement): boolean {
  if (event.key !== 'Tab') return false;
  const items = tabbables(root);
  if (items.length === 0) {
    event.preventDefault();
    root.focus();
    return true;
  }
  const first = items[0];
  const last = items[items.length - 1];
  const active = root.ownerDocument.activeElement;
  if (event.shiftKey && (active === first || active === root)) {
    event.preventDefault();
    last.focus();
    return true;
  }
  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
    return true;
  }
  return false;
}

/** Focuses `el` if it is still in the document; never scrolls the page. */
export function focusSafely(el: HTMLElement | null | undefined): boolean {
  if (!el || !el.isConnected) return false;
  el.focus({ preventScroll: true });
  return el.ownerDocument.activeElement === el;
}

/** A natively focusable control, or the first one inside a wrapper (e.g. `<ath-button>`). */
export function focusTarget(host: HTMLElement): HTMLElement {
  if (host.matches('button, a[href], input, select, textarea, [tabindex]')) return host;
  return host.querySelector<HTMLElement>('button, a[href], [tabindex]') ?? host;
}
