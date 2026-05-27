import * as i0 from "@angular/core";
/**
 * Compact timeline marker for status changes, assignments etc.
 * (Lighter weight than <ath-timeline-entry>.)
 *
 * @example
 * <ath-timeline-event statusColor="var(--green)">
 *   <b>Mira</b> moved to In Progress · 2d ago
 * </ath-timeline-event>
 */
export declare class AthTimelineEventComponent {
    /** Dot color — any CSS color (e.g., `var(--green)`, `#f59e0b`). */
    statusColor: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTimelineEventComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTimelineEventComponent, "ath-timeline-event", never, { "statusColor": { "alias": "statusColor"; "required": false; }; }, {}, never, ["*"], true, never>;
}
