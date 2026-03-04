import * as i0 from "@angular/core";
/**
 * Avatar size variants
 */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
/**
 * Athene Avatar Component
 *
 * User avatar with initials fallback.
 *
 * @example
 * <ath-avatar name="John Doe" />
 * <ath-avatar name="Admin" size="lg" />
 */
export declare class AthAvatarComponent {
    /** User display name (used for initials) */
    name: string;
    /** Optional image URL */
    src: string;
    /** Avatar size */
    size: AvatarSize;
    get avatarClasses(): string;
    get initials(): string;
    onImageError(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthAvatarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthAvatarComponent, "ath-avatar", never, { "name": { "alias": "name"; "required": false; }; "src": { "alias": "src"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}
