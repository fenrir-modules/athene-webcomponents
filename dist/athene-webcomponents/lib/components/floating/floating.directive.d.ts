import { AfterViewInit, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { type FloatingAlign, type FloatingSide, type FloatingVirtualAnchor } from './floating';
import * as i0 from "@angular/core";
/**
 * An anchor given as an element, an `ElementRef` (a template ref of a
 * component) or a `FloatingVirtualAnchor` (a caret or pointer rectangle).
 */
export type FloatingAnchor = HTMLElement | ElementRef<HTMLElement> | FloatingVirtualAnchor | null | undefined;
/**
 * The element behind an anchor: itself, or a virtual anchor's
 * `contextElement` (focus return, outside clicks, `aria-*`).
 */
export declare function resolveAnchor(anchor: FloatingAnchor): HTMLElement | null;
/** What a panel is placed against: the element, or the virtual anchor itself. */
export declare function resolveFloatingTarget(anchor: FloatingAnchor): HTMLElement | FloatingVirtualAnchor | null;
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
export declare class AthFloatingDirective implements AfterViewInit, OnChanges, OnDestroy {
    /** The element (or virtual anchor) the panel hangs from. */
    readonly anchor: import("@angular/core").InputSignal<FloatingAnchor>;
    /**
     * `start`: start edges line up; `end`: end edges; `auto`: start unless it
     * overflows; `center`: centred on the anchor.
     */
    readonly align: import("@angular/core").InputSignal<FloatingAlign>;
    /** Preferred side; flips when the other side has more room. */
    readonly side: import("@angular/core").InputSignal<FloatingSide>;
    /** Gap between anchor and panel, in px. */
    readonly offset: import("@angular/core").InputSignal<number>;
    /** At least as wide as the anchor (selects, comboboxes). */
    readonly matchWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Upper bound for the height in px (the viewport caps it anyway). */
    readonly maxHeight: import("@angular/core").InputSignal<number | null>;
    /** Promote into the top layer (default). `false` keeps `position: fixed` + `--z-popover`. */
    readonly topLayer: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** An arrow element inside the panel, kept pointing at the anchor's centre. */
    readonly arrow: import("@angular/core").InputSignal<HTMLElement | null>;
    private readonly el;
    private readonly zone;
    private cleanup;
    private viewReady;
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    /** Re-measures now (after a content change the ResizeObserver cannot see). */
    update(): void;
    private attach;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthFloatingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AthFloatingDirective, "[athFloating]", ["athFloating"], { "anchor": { "alias": "athFloating"; "required": true; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; "side": { "alias": "side"; "required": false; "isSignal": true; }; "offset": { "alias": "offset"; "required": false; "isSignal": true; }; "matchWidth": { "alias": "matchWidth"; "required": false; "isSignal": true; }; "maxHeight": { "alias": "maxHeight"; "required": false; "isSignal": true; }; "topLayer": { "alias": "topLayer"; "required": false; "isSignal": true; }; "arrow": { "alias": "arrow"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
