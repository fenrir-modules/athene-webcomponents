import { type TicketStatus } from '@athene/webcomponents/core';
import * as i0 from "@angular/core";
export { ATH_STATUS_LABELS, type StatusLabelResolver, type TicketStatus, } from '@athene/webcomponents/core';
export type StatusPillSize = 'sm' | 'md';
/**
 * Status indicator for a ticket: colored inner-ring dot + label.
 *
 * @example
 * <ath-status-pill status="open" />
 * <ath-status-pill status="prog" [showLabel]="false" />
 * <ath-status-pill status="done" size="sm" />
 */
export declare class AthStatusPillComponent {
    readonly status: import("@angular/core").InputSignal<TicketStatus>;
    readonly showDot: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly showLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly size: import("@angular/core").InputSignal<StatusPillSize>;
    /** Optional override label (otherwise the app's resolver, then the English default). */
    readonly label: import("@angular/core").InputSignal<string | null>;
    private readonly resolveLabel;
    /** The resolver reads a signal for the language (see `StatusLabelResolver`), so this follows it. */
    protected readonly computedLabel: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthStatusPillComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthStatusPillComponent, "ath-status-pill", never, { "status": { "alias": "status"; "required": false; "isSignal": true; }; "showDot": { "alias": "showDot"; "required": false; "isSignal": true; }; "showLabel": { "alias": "showLabel"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
