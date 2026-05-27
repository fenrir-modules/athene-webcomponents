import { AvatarSize } from '../avatar';
import * as i0 from "@angular/core";
export interface StackedUser {
    /** Display name (also used for initials). */
    name: string;
    /** Optional avatar image URL. */
    src?: string;
}
/**
 * Overlapping avatars with a `+N` chip when the list exceeds `max`.
 *
 * @example
 * <ath-avatar-stack [users]="[{name:'Joel'},{name:'Mira'},{name:'Tom'},{name:'Sara'}]" />
 * <ath-avatar-stack [users]="watchers" [max]="5" size="md" />
 */
export declare class AthAvatarStackComponent {
    private readonly _users;
    set users(value: StackedUser[] | null | undefined);
    get users(): StackedUser[];
    max: number;
    size: AvatarSize;
    get hostSize(): AvatarSize;
    protected readonly visible: import("@angular/core").Signal<StackedUser[]>;
    protected readonly overflowCount: import("@angular/core").Signal<number>;
    trackByName: (_: number, user: StackedUser) => string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthAvatarStackComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthAvatarStackComponent, "ath-avatar-stack", never, { "users": { "alias": "users"; "required": false; }; "max": { "alias": "max"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}
