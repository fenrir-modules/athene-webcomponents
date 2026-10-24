/** Elements inside `root` reachable with Tab, in document order. */
export declare function tabbables(root: HTMLElement): HTMLElement[];
/**
 * Keeps Tab inside `root`: from the last tabbable to the first and back.
 * Returns true when it moved focus.
 */
export declare function trapTab(event: KeyboardEvent, root: HTMLElement): boolean;
/** Focuses `el` if it is still in the document; never scrolls the page. */
export declare function focusSafely(el: HTMLElement | null | undefined): boolean;
/** A natively focusable control, or the first one inside a wrapper (e.g. `<ath-button>`). */
export declare function focusTarget(host: HTMLElement): HTMLElement;
