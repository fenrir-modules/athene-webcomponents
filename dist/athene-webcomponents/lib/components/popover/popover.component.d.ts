import { OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { type FloatingAnchor } from '../floating/floating.directive';
import type { FloatingAlign, FloatingSide } from '../floating/floating';
import { type AthOverlayCloseReason } from '../floating/overlay-stack';
import * as i0 from "@angular/core";
/** Panel width: `sm` 220px, `md` 280px (default), `lg` 360px, `auto` fits the content. */
export type PopoverSize = 'sm' | 'md' | 'lg' | 'auto';
/** Inner padding of the panel. */
export type PopoverPadding = 'md' | 'sm' | 'none';
/** Where focus goes when the panel opens. */
export type PopoverAutoFocus = 'first' | 'panel' | 'none';
/** ARIA role of the panel; `null` for a bare container (the content brings its own role). */
export type PopoverRole = 'dialog' | 'menu' | 'listbox' | null;
export type { AthOverlayCloseReason as PopoverCloseReason } from '../floating/overlay-stack';
/**
 * Lazy panel content: rendered only while the popover is open.
 *
 * @example
 * <ath-popover>
 *   <ng-template athPopoverContent>…</ng-template>
 * </ath-popover>
 */
export declare class AthPopoverContentDirective {
    readonly template: TemplateRef<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPopoverContentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AthPopoverContentDirective, "ng-template[athPopoverContent]", never, {}, {}, never, never, true, never>;
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
export declare class AthPopoverComponent implements OnChanges, OnDestroy {
    private readonly stack;
    /** Whether the panel is shown. Two-way: `[(open)]`. */
    readonly open: import("@angular/core").ModelSignal<boolean>;
    /**
     * The element the panel hangs from (a trigger directive sets it on its
     * own), or a `FloatingVirtualAnchor` such as the spot the pointer rests on;
     * its `contextElement` then counts as the trigger.
     */
    readonly anchor: import("@angular/core").InputSignal<FloatingAnchor>;
    readonly size: import("@angular/core").InputSignal<PopoverSize>;
    readonly padding: import("@angular/core").InputSignal<PopoverPadding>;
    readonly align: import("@angular/core").InputSignal<FloatingAlign>;
    readonly side: import("@angular/core").InputSignal<FloatingSide>;
    /** Gap to the anchor in px. */
    readonly offset: import("@angular/core").InputSignal<number>;
    readonly matchWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Upper bound for the height in px (the viewport caps it anyway). */
    readonly maxHeight: import("@angular/core").InputSignal<number | null>;
    /** Show an arrow pointing at the anchor. */
    readonly arrow: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Keep Tab inside the panel (modal-like content); otherwise Tab out closes it. */
    readonly trapFocus: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly autoFocus: import("@angular/core").InputSignal<PopoverAutoFocus>;
    /** Return focus to the trigger on Escape / selection / programmatic close. */
    readonly restoreFocus: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly closeOnEscape: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly closeOnOutsideClick: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly panelRole: import("@angular/core").InputSignal<PopoverRole>;
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    readonly ariaLabelledby: import("@angular/core").InputSignal<string | null>;
    /** Extra classes on the panel (it lives in this component's view). */
    readonly panelClass: import("@angular/core").InputSignal<string>;
    readonly opened: import("@angular/core").OutputEmitterRef<void>;
    readonly closed: import("@angular/core").OutputEmitterRef<AthOverlayCloseReason>;
    /** Id of the panel, for `aria-controls`. */
    readonly panelId: import("@angular/core").InputSignal<string>;
    protected readonly lazyContent: import("@angular/core").Signal<AthPopoverContentDirective | undefined>;
    private readonly panelRef;
    private readonly triggerAnchor;
    /** The element the panel currently hangs from. */
    readonly anchorElement: import("@angular/core").Signal<HTMLElement | null>;
    /** What the panel is placed against: the anchor input (element or virtual) or the trigger. */
    protected readonly floatTarget: import("@angular/core").Signal<import("../floating/floating").FloatingVirtualAnchor | HTMLElement | null>;
    protected readonly panelClasses: import("@angular/core").Signal<string>;
    private registered;
    private returnFocus;
    private focusTimer;
    private readonly entry;
    /** The panel element while open. */
    get panel(): HTMLElement | null;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** Opens the panel, optionally hanging it from `anchor`. */
    show(anchor?: HTMLElement | null): void;
    /**
     * Closes the panel. `restore` overrides whether focus goes back to the
     * trigger (default: yes when focus was inside or the user pressed Escape).
     */
    hide(reason?: AthOverlayCloseReason, restore?: boolean): void;
    toggle(anchor?: HTMLElement | null): void;
    /** Moves focus into the panel according to `autoFocus` (or `mode`). */
    focusPanel(mode?: PopoverAutoFocus): void;
    protected onKeydown(event: KeyboardEvent): void;
    protected onFocusOut(event: FocusEvent): void;
    private afterOpen;
    private afterClose;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPopoverComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPopoverComponent, "ath-popover", ["athPopover"], { "open": { "alias": "open"; "required": false; "isSignal": true; }; "anchor": { "alias": "anchor"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "padding": { "alias": "padding"; "required": false; "isSignal": true; }; "align": { "alias": "align"; "required": false; "isSignal": true; }; "side": { "alias": "side"; "required": false; "isSignal": true; }; "offset": { "alias": "offset"; "required": false; "isSignal": true; }; "matchWidth": { "alias": "matchWidth"; "required": false; "isSignal": true; }; "maxHeight": { "alias": "maxHeight"; "required": false; "isSignal": true; }; "arrow": { "alias": "arrow"; "required": false; "isSignal": true; }; "trapFocus": { "alias": "trapFocus"; "required": false; "isSignal": true; }; "autoFocus": { "alias": "autoFocus"; "required": false; "isSignal": true; }; "restoreFocus": { "alias": "restoreFocus"; "required": false; "isSignal": true; }; "closeOnEscape": { "alias": "closeOnEscape"; "required": false; "isSignal": true; }; "closeOnOutsideClick": { "alias": "closeOnOutsideClick"; "required": false; "isSignal": true; }; "panelRole": { "alias": "panelRole"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "ariaLabelledby": { "alias": "ariaLabelledby"; "required": false; "isSignal": true; }; "panelClass": { "alias": "panelClass"; "required": false; "isSignal": true; }; "panelId": { "alias": "panelId"; "required": false; "isSignal": true; }; }, { "open": "openChange"; "opened": "opened"; "closed": "closed"; }, ["lazyContent"], ["*"], true, never>;
}
