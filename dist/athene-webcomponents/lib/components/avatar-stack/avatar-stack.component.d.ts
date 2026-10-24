import { AvatarSize } from '../avatar';
import * as i0 from "@angular/core";
export interface StackedUser {
    /**
     * Stable id (the user's id): the key of the avatar's colour tone, so one
     * person has the same colour here as in every other `ath-avatar` (DS-09).
     */
    id: string;
    /** Display name (also used for initials). */
    name: string;
    /** Optional avatar image URL. */
    src?: string;
}
/**
 * Overlapping avatars with a `+N` chip when the list exceeds `max`.
 *
 * @example
 * <ath-avatar-stack [users]="[{ id: 'u1', name: 'Joel' }, { id: 'u2', name: 'Mira' }]" />
 * <ath-avatar-stack [users]="watchers" [max]="5" size="md" />
 */
export declare class AthAvatarStackComponent {
    /** The people to show; `null`/`undefined` count as none. */
    readonly users: import("@angular/core").InputSignalWithTransform<StackedUser[], StackedUser[] | null | undefined>;
    readonly max: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly size: import("@angular/core").InputSignal<AvatarSize>;
    protected readonly visible: import("@angular/core").Signal<StackedUser[]>;
    protected readonly overflowCount: import("@angular/core").Signal<number>;
    trackById: (_: number, user: StackedUser) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthAvatarStackComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthAvatarStackComponent, "ath-avatar-stack", never, { "users": { "alias": "users"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
