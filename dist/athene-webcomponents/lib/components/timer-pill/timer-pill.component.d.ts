import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
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
    private readonly _seconds;
    active: boolean;
    set seconds(value: number);
    get seconds(): number;
    ticketKey: string | null;
    /** Tooltip override; otherwise auto-built from state. */
    tooltip: string | null;
    toggled: EventEmitter<void>;
    get hostActive(): string;
    get hostWarning(): string | null;
    protected readonly time: import("@angular/core").Signal<string>;
    protected get effectiveTooltip(): string;
    onToggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTimerPillComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTimerPillComponent, "ath-timer-pill", never, { "active": { "alias": "active"; "required": false; }; "seconds": { "alias": "seconds"; "required": false; }; "ticketKey": { "alias": "ticketKey"; "required": false; }; "tooltip": { "alias": "tooltip"; "required": false; }; }, { "toggled": "toggled"; }, never, never, true, never>;
}
