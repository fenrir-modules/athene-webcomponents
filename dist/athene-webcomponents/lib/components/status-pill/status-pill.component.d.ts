import * as i0 from "@angular/core";
export type TicketStatus = 'open' | 'prog' | 'review' | 'done' | 'blocked' | 'closed';
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
    status: TicketStatus;
    showDot: boolean;
    showLabel: boolean;
    size: StatusPillSize;
    /** Optional override label (otherwise the default label for the status is used). */
    label: string | null;
    get hostStatus(): TicketStatus;
    get hostSize(): StatusPillSize;
    protected get computedLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthStatusPillComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthStatusPillComponent, "ath-status-pill", never, { "status": { "alias": "status"; "required": false; }; "showDot": { "alias": "showDot"; "required": false; }; "showLabel": { "alias": "showLabel"; "required": false; }; "size": { "alias": "size"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, never, true, never>;
}
