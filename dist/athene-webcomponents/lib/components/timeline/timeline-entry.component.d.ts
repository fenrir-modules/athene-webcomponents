import * as i0 from "@angular/core";
/**
 * A full timeline item (comment, note, change-with-content).
 * Use inside <ath-timeline>.
 *
 * @example
 * <ath-timeline-entry
 *   author="Mira Voss"
 *   avatarName="Mira Voss"
 *   timeLabel="48m ago"
 *   [internal]="false">
 *   <p>Pushed first pass.</p>
 * </ath-timeline-entry>
 */
export declare class AthTimelineEntryComponent {
    author: string;
    /** Defaults to `author` for initials/colors. Override if avatar should differ. */
    avatarName: string | null;
    avatarSrc: string;
    /** Pre-formatted relative time (e.g., "5m ago"). */
    timeLabel: string;
    /** Marks the entry as internal (only visible to operators/admins). */
    internal: boolean;
    get hostInternal(): string | null;
    protected get effectiveAvatarName(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTimelineEntryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTimelineEntryComponent, "ath-timeline-entry", never, { "author": { "alias": "author"; "required": true; }; "avatarName": { "alias": "avatarName"; "required": false; }; "avatarSrc": { "alias": "avatarSrc"; "required": false; }; "timeLabel": { "alias": "timeLabel"; "required": false; }; "internal": { "alias": "internal"; "required": false; }; }, {}, never, ["*"], true, never>;
}
