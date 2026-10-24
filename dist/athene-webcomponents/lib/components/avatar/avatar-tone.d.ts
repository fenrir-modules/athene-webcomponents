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
 * Deterministic colour tone (1…AVATAR_TONE_COUNT) for an arbitrary key.
 * FNV-1a with a murmur3 finaliser: tiny and stable across sessions.
 */
export declare function toneOfKey(key: string): number;
/**
 * The tone of a person: keyed on their stable id when there is one, so two
 * people with the same initials still differ and one person keeps a colour
 * however a call site spells the name. Without an id it falls back to the
 * initials (two people with the same initials then share a colour, DS-9:
 * pass the id), and with neither it is `null` (neutral tone).
 */
export declare function avatarToneFor(person: {
    id?: string | null;
    name?: string | null;
}): number | null;
