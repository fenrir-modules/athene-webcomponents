/** Which edge of the anchor a floating panel lines up with (`start` follows `dir`). */
export type FloatingAlign = 'start' | 'end' | 'auto';
/** The side of the anchor a panel prefers; it flips when the other side has more room. */
export type FloatingSide = 'bottom' | 'top';
export interface FloatingOptions {
    align?: FloatingAlign;
    /** Preferred side; default `bottom`. */
    side?: FloatingSide;
    /** Gap between anchor and panel, in px. Default 4. */
    offset?: number;
    /** At least as wide as the anchor. */
    matchWidth?: boolean;
    /** Upper bound for the panel's height in px; the viewport caps it anyway. */
    maxHeight?: number | null;
    /**
     * Promote the panel into the browser's top layer (`popover="manual"`), so no
     * ancestor's `overflow`, `transform` or `z-index` can clip or cover it. Default
     * true; without Popover API support the panel stays `position: fixed` with
     * `z-index: var(--z-popover)`.
     */
    topLayer?: boolean;
    /** An arrow element inside the panel; its `left` is set to point at the anchor's centre. */
    arrow?: HTMLElement | null;
}
/** Stops following when called; `update()` re-measures right away. */
export interface FloatingCleanup {
    (): void;
    update(): void;
}
/**
 * The one positioning engine of the library (menus, listboxes, popovers,
 * pickers; the `athFloating` directive wraps it).
 *
 * Pins `panel` to `anchor` and keeps it inside the viewport: on the preferred
 * side when it fits, on the other side when that has more room, shifted
 * sideways to stay on screen, height-capped (scrolling inside) when neither
 * side has room for all of it. Follows scrolls in any container, viewport
 * resizes, and size changes of the panel and the anchor.
 *
 * The panel stays where the template rendered it (focus order, event
 * bubbling and "click outside" checks keep working). It is promoted into the
 * top layer, or, without Popover API support, made `position: fixed` with a
 * correction for transformed ancestors that would otherwise move a fixed box.
 *
 * Writes `data-placement="bottom|top"` on the panel for side-dependent styles.
 */
export declare function floatPanel(panel: HTMLElement, anchor: HTMLElement, options?: FloatingOptions): FloatingCleanup;
/** Whether this browser has the Popover API (top layer for non-modal panels). */
export declare function supportsTopLayer(): boolean;
/** @internal Installs the reset once; used by `floatPanel` and `AthOverlayStack`. */
export declare function installTopLayerStyles(): void;
