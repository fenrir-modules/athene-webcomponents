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
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    readonly author: import("@angular/core").InputSignal<string>;
    /** Defaults to `author` for initials/colors. Override if avatar should differ. */
    readonly avatarName: import("@angular/core").InputSignal<string | null>;
    readonly avatarSrc: import("@angular/core").InputSignal<string>;
    /** Pre-formatted relative time (e.g., "5m ago"). */
    readonly timeLabel: import("@angular/core").InputSignal<string>;
    /** Marks the entry as internal (only visible to operators/admins). */
    readonly internal: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected readonly effectiveAvatarName: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTimelineEntryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthTimelineEntryComponent, "ath-timeline-entry", never, { "author": { "alias": "author"; "required": true; "isSignal": true; }; "avatarName": { "alias": "avatarName"; "required": false; "isSignal": true; }; "avatarSrc": { "alias": "avatarSrc"; "required": false; "isSignal": true; }; "timeLabel": { "alias": "timeLabel"; "required": false; "isSignal": true; }; "internal": { "alias": "internal"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
