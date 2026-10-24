import { type Signal } from '@angular/core';
import { type AthAction } from '../button';
import * as i0 from "@angular/core";
/** Alert tones. `warning` is an alias of `warn`. */
export type AlertVariant = 'info' | 'success' | 'warn' | 'warning' | 'error';
/**
 * - `inline`: a tinted box inside the page flow (forms, lists, panels)
 * - `banner`: full width, square edges, an icon; for the top of a layout or panel
 */
export type AlertAppearance = 'inline' | 'banner';
/**
 * Athene Alert
 *
 * Feedback in the page: info, warn, error or success, inline or as a
 * banner, with an optional retry. `[retry]` takes the work to repeat; the
 * retry button is an `ath-button [action]`, so it is busy while the retry
 * runs. With no `message` (and nothing projected) the alert takes no
 * space, so a page can keep `<ath-alert [message]="error()" …>` in its
 * template unconditionally.
 *
 * Replaces the app's `error-banner`.
 *
 * @example
 * <ath-alert variant="error" [message]="error()" [retry]="reload" />
 * <ath-alert variant="warn" appearance="banner" [message]="'Maintenance at 22:00'" />
 * <ath-alert variant="success" message="Saved" [dismissible]="true" (dismissed)="clear()" />
 */
export declare class AthAlertComponent {
    private readonly labels;
    readonly variant: import("@angular/core").InputSignal<AlertVariant>;
    readonly appearance: import("@angular/core").InputSignal<AlertAppearance>;
    /** The text; empty or `null` (with no projected content) hides the alert. */
    readonly message: import("@angular/core").InputSignal<string | null | undefined>;
    /** Optional bold lead-in before the message. */
    readonly title: import("@angular/core").InputSignal<string | null>;
    /** Icon before the text; default on for banners, off inline. */
    readonly icon: import("@angular/core").InputSignal<boolean | null>;
    readonly dismissible: import("@angular/core").InputSignal<boolean>;
    /** Work to repeat; shows the retry button. */
    readonly retry: import("@angular/core").InputSignal<AthAction | null>;
    /** Retry button text; default `ATH_LABELS.retry`. */
    readonly retryLabel: import("@angular/core").InputSignal<string | null>;
    /** Dismiss button's accessible name; default `ATH_LABELS.dismiss`. */
    readonly dismissLabel: import("@angular/core").InputSignal<string | null>;
    readonly dismissed: import("@angular/core").OutputEmitterRef<void>;
    protected readonly closeIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly tone: Signal<'info' | 'success' | 'warn' | 'error'>;
    /** Errors and warnings interrupt; info and success wait their turn. */
    protected readonly role: Signal<'alert' | 'status'>;
    protected readonly showIcon: Signal<boolean>;
    protected readonly glyph: Signal<import("node_modules/lucide-angular/icons/types").LucideIconData>;
    protected readonly retryText: Signal<string>;
    protected readonly dismissText: Signal<string>;
    dismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthAlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthAlertComponent, "ath-alert", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "appearance": { "alias": "appearance"; "required": false; "isSignal": true; }; "message": { "alias": "message"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "dismissible": { "alias": "dismissible"; "required": false; "isSignal": true; }; "retry": { "alias": "retry"; "required": false; "isSignal": true; }; "retryLabel": { "alias": "retryLabel"; "required": false; "isSignal": true; }; "dismissLabel": { "alias": "dismissLabel"; "required": false; "isSignal": true; }; }, { "dismissed": "dismissed"; }, never, ["*"], true, never>;
}
