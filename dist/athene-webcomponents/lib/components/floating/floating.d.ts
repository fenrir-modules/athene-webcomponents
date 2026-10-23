/** Which edge of the anchor a floating panel lines up with. */
export type FloatingAlign = 'start' | 'end' | 'auto';
export interface FloatingOptions {
    align?: FloatingAlign;
    /** Gap between anchor and panel, in px. */
    offset?: number;
    /** At least as wide as the anchor. */
    matchWidth?: boolean;
}
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
export declare function floatPanel(panel: HTMLElement, anchor: HTMLElement, options?: FloatingOptions): () => void;
