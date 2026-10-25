import * as i0 from "@angular/core";
export type { AthIconData } from '../floating/icon';
/** Colour and short text drawn in place of an icon (a project's key). */
export interface AthNavChip {
    text: string;
    color: string;
}
/** A status dot at the row's end (service health, say). */
export type AthNavDot = 'ok' | 'warn' | 'error';
/**
 * Athene Nav Item: one row of a navigation list (the app sidebar, the
 * settings rail, the admin console).
 *
 * - The single source for hit zone, hover, active, focus and tooltip; no
 *   layout reimplements them.
 * - An `icon` or a `chip` (a project key in the project's colour).
 * - `compact` (a collapsed rail): the label folds away and a CSS tooltip
 *   shows it to the right; an unread `badge` becomes a dot on the icon.
 * - Active: a tinted pill, the accent on the icon, and (with `indicator`)
 *   a 2-px bar at the left edge.
 * - `[athNavItemEnd]`: a projected marker at the row's end (a "Beta" pill),
 *   inside the link and its active pill; it folds away with the label.
 *
 * Layout contract: the row stretches to its parent's width in both modes;
 * the icon sits in a fixed 40-px cell so it keeps its x position while a
 * rail opens, and only the tail (label, badge, dot) collapses.
 *
 * @example
 * <ath-nav-item [icon]="Inbox" label="Inbox" route="/app/inbox" [badge]="3" />
 * <ath-nav-item [chip]="{ text: 'ATL', color: 'var(--blue)' }" label="Atlas" [route]="['/p', id]" />
 * <ath-nav-item [icon]="Sparkles" label="Assistant" route="/ai"><span athNavItemEnd>Beta</span></ath-nav-item>
 */
export declare class AthNavItemComponent {
    /** Visible label; also the tooltip and accessible name when compact. */
    readonly label: import("@angular/core").InputSignal<string>;
    /** Router target: a path, or link parameters for a parameterised route. */
    readonly route: import("@angular/core").InputSignal<string | readonly unknown[] | null>;
    /** Exact match for the active state (default: prefix match, like Angular). */
    readonly exact: import("@angular/core").InputSignal<boolean>;
    /** Either an icon or a chip. */
    readonly icon: import("@angular/core").InputSignal<import("node_modules/lucide-angular/icons/types").LucideIconData | null>;
    readonly chip: import("@angular/core").InputSignal<AthNavChip | null>;
    /** A count (unread items); nothing below 1. */
    readonly badge: import("@angular/core").InputSignal<number | null>;
    readonly dot: import("@angular/core").InputSignal<AthNavDot | null>;
    /** A secondary row in a quieter tone ("… All projects"). */
    readonly muted: import("@angular/core").InputSignal<boolean>;
    /** Rail mode: the label folds away, a tooltip shows it. */
    readonly compact: import("@angular/core").InputSignal<boolean>;
    /** The 2-px bar at the left edge of the active row. */
    readonly indicator: import("@angular/core").InputSignal<boolean>;
    /** Tooltip text in compact mode; defaults to the label. */
    readonly tooltip: import("@angular/core").InputSignal<string | null>;
    /** Link parameters for `routerLink` (a copy: it takes a mutable array). */
    protected readonly target: import("@angular/core").Signal<unknown[]>;
    protected readonly count: import("@angular/core").Signal<number | null>;
    protected readonly tooltipText: import("@angular/core").Signal<string | null>;
    /** Pointer over the row or keyboard focus on it: shows the tooltip. */
    protected readonly active: import("@angular/core").WritableSignal<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthNavItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthNavItemComponent, "ath-nav-item", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "route": { "alias": "route"; "required": false; "isSignal": true; }; "exact": { "alias": "exact"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "chip": { "alias": "chip"; "required": false; "isSignal": true; }; "badge": { "alias": "badge"; "required": false; "isSignal": true; }; "dot": { "alias": "dot"; "required": false; "isSignal": true; }; "muted": { "alias": "muted"; "required": false; "isSignal": true; }; "compact": { "alias": "compact"; "required": false; "isSignal": true; }; "indicator": { "alias": "indicator"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; }, {}, never, ["[athNavItemEnd]"], true, never>;
}
