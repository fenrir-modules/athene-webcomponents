import { type Signal } from '@angular/core';
import * as i0 from "@angular/core";
/** Long-running timer: `warn` after 8h, `alert` after 24h. */
export type TimerPillWarning = 'warn' | 'alert';
/**
 * Live time-tracking pill for the topbar. **Stateless about ticking** —
 * the consumer (TimeTrackingService) feeds `seconds` and reacts to `toggled`.
 *
 * This keeps the component pure (testable) while letting the service stay
 * authoritative about the real running time.
 *
 * @example
 * <ath-timer-pill
 *   [active]="timer.running()"
 *   [seconds]="timer.elapsed()"
 *   [ticketKey]="timer.ticketKey()"
 *   (toggled)="timer.toggle()" />
 */
export declare class AthTimerPillComponent {
    readonly active: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Elapsed time in seconds; fractions are dropped, negative counts as 0. */
    readonly seconds: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly ticketKey: import("@angular/core").InputSignal<string | null>;
    /** Tooltip override; otherwise auto-built from state. */
    readonly tooltip: import("@angular/core").InputSignal<string | null>;
    readonly toggled: import("@angular/core").OutputEmitterRef<void>;
    /** After 8h surfaces a warn color; after 24h, an alert color. */
    protected readonly warning: Signal<TimerPillWarning | null>;
    protected readonly time: Signal<string>;
    protected readonly effectiveTooltip: Signal<string>;
    onToggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTimerPillComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTimerPillComponent, "ath-timer-pill", never, { "active": { "alias": "active"; "required": false; "isSignal": true; }; "seconds": { "alias": "seconds"; "required": false; "isSignal": true; }; "ticketKey": { "alias": "ticketKey"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; }, { "toggled": "toggled"; }, never, never, true, never>;
}
