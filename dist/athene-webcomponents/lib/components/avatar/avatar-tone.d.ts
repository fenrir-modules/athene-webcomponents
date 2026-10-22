/**
 * Number of avatar colour tones defined in the design tokens
 * (`--avatar-1-bg` … `--avatar-8-bg`, per theme).
 */
export declare const AVATAR_TONE_COUNT = 8;
/**
 * Initials for a display name: first + last word, or the first two letters
 * of a single word. Already-abbreviated input ("DU") passes through.
 */
export declare function avatarInitials(name: string | null | undefined): string;
/**
 * Deterministic colour tone (1…AVATAR_TONE_COUNT) for a person.
 *
 * Keyed on the initials rather than an id or the full name: call sites
 * variously hand the avatar a full name, a pre-computed "DU" or nothing
 * but initials, and the same person must come out the same colour in all
 * of them. The initials are the one key every call site shares.
 */
export declare function avatarTone(name: string | null | undefined): number;
