/**
 * Number of avatar colour tones defined in the design tokens
 * (`--avatar-1-bg` … `--avatar-8-bg`, per theme).
 */
export const AVATAR_TONE_COUNT = 8;

/**
 * Initials for a display name: first + last word, or the first two letters
 * of a single word. Already-abbreviated input ("DU") passes through.
 */
export function avatarInitials(name: string | null | undefined): string {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
}

/**
 * Deterministic colour tone (1…AVATAR_TONE_COUNT) for a person.
 *
 * Keyed on the initials rather than an id or the full name: call sites
 * variously hand the avatar a full name, a pre-computed "DU" or nothing
 * but initials, and the same person must come out the same colour in all
 * of them. The initials are the one key every call site shares.
 */
export function avatarTone(name: string | null | undefined): number {
  const key = avatarInitials(name);
  // FNV-1a, 32-bit — tiny and stable across sessions.
  let hash = 0x811c9dc5;
  for (let i = 0; i < key.length; i++) {
    hash ^= key.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  // Final avalanche (murmur3 fmix32): plain FNV on two characters leaves
  // the low bits poorly mixed, which `% 8` would otherwise expose.
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;
  return ((hash >>> 0) % AVATAR_TONE_COUNT) + 1;
}
