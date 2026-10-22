import { InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export type TicketStatus = 'open' | 'prog' | 'review' | 'done' | 'blocked' | 'closed';
export type StatusPillSize = 'sm' | 'md';
/**
 * Names a status in the reader's language.
 *
 * The library stays free of any translation framework: the app provides
 * this once at the root, and every pill without an explicit `label` asks
 * it. Return `null` to fall back to the English default. A resolver that
 * reads a signal (the current language) keeps OnPush pills current when
 * the language changes.
 */
export type StatusLabelResolver = (status: TicketStatus) => string | null;
export declare const ATH_STATUS_LABELS: InjectionToken<StatusLabelResolver>;
/**
 * Status indicator for a ticket: colored inner-ring dot + label.
 *
 * @example
 * <ath-status-pill status="open" />
 * <ath-status-pill status="prog" [showLabel]="false" />
 * <ath-status-pill status="done" size="sm" />
 */
export declare class AthStatusPillComponent {
    status: TicketStatus;
    showDot: boolean;
    showLabel: boolean;
    size: StatusPillSize;
    /** Optional override label (otherwise the app's resolver, then the English default). */
    label: string | null;
    private readonly resolveLabel;
    get hostStatus(): TicketStatus;
    get hostSize(): StatusPillSize;
    protected get computedLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthStatusPillComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthStatusPillComponent, "ath-status-pill", never, { "status": { "alias": "status"; "required": false; }; "showDot": { "alias": "showDot"; "required": false; }; "showLabel": { "alias": "showLabel"; "required": false; }; "size": { "alias": "size"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, never, true, never>;
}
