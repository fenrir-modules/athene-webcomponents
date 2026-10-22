/**
 * Number of avatar colour tones defined in the design tokens
 * (`--avatar-1-bg` … `--avatar-8-bg`, per theme).
 */
export const AVATAR_TONE_COUNT = 8;
/**
 * Initials for a display name: first + last word, or the first two letters
 * of a single word. Already-abbreviated input ("DU") passes through.
 */
export function avatarInitials(name) {
    const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0)
        return '?';
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
export function avatarTone(name) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLXRvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvYXZhdGFyL2F2YXRhci10b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUVuQzs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLElBQStCO0lBQzVELE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0QsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUNuQyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xFLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2hELENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUErQjtJQUN4RCxNQUFNLEdBQUcsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsb0RBQW9EO0lBQ3BELElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQztJQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3BDLElBQUksSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsdUVBQXVFO0lBQ3ZFLGlFQUFpRTtJQUNqRSxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUNwQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7SUFDcEIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ25DLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3BCLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBOdW1iZXIgb2YgYXZhdGFyIGNvbG91ciB0b25lcyBkZWZpbmVkIGluIHRoZSBkZXNpZ24gdG9rZW5zXG4gKiAoYC0tYXZhdGFyLTEtYmdgIOKApiBgLS1hdmF0YXItOC1iZ2AsIHBlciB0aGVtZSkuXG4gKi9cbmV4cG9ydCBjb25zdCBBVkFUQVJfVE9ORV9DT1VOVCA9IDg7XG5cbi8qKlxuICogSW5pdGlhbHMgZm9yIGEgZGlzcGxheSBuYW1lOiBmaXJzdCArIGxhc3Qgd29yZCwgb3IgdGhlIGZpcnN0IHR3byBsZXR0ZXJzXG4gKiBvZiBhIHNpbmdsZSB3b3JkLiBBbHJlYWR5LWFiYnJldmlhdGVkIGlucHV0IChcIkRVXCIpIHBhc3NlcyB0aHJvdWdoLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXZhdGFySW5pdGlhbHMobmFtZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG4gIGNvbnN0IHBhcnRzID0gKG5hbWUgPz8gJycpLnRyaW0oKS5zcGxpdCgvXFxzKy8pLmZpbHRlcihCb29sZWFuKTtcbiAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICc/JztcbiAgaWYgKHBhcnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgcmV0dXJuIChwYXJ0c1swXVswXSArIHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdWzBdKS50b1VwcGVyQ2FzZSgpO1xuICB9XG4gIHJldHVybiBwYXJ0c1swXS5zdWJzdHJpbmcoMCwgMikudG9VcHBlckNhc2UoKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmlzdGljIGNvbG91ciB0b25lICgx4oCmQVZBVEFSX1RPTkVfQ09VTlQpIGZvciBhIHBlcnNvbi5cbiAqXG4gKiBLZXllZCBvbiB0aGUgaW5pdGlhbHMgcmF0aGVyIHRoYW4gYW4gaWQgb3IgdGhlIGZ1bGwgbmFtZTogY2FsbCBzaXRlc1xuICogdmFyaW91c2x5IGhhbmQgdGhlIGF2YXRhciBhIGZ1bGwgbmFtZSwgYSBwcmUtY29tcHV0ZWQgXCJEVVwiIG9yIG5vdGhpbmdcbiAqIGJ1dCBpbml0aWFscywgYW5kIHRoZSBzYW1lIHBlcnNvbiBtdXN0IGNvbWUgb3V0IHRoZSBzYW1lIGNvbG91ciBpbiBhbGxcbiAqIG9mIHRoZW0uIFRoZSBpbml0aWFscyBhcmUgdGhlIG9uZSBrZXkgZXZlcnkgY2FsbCBzaXRlIHNoYXJlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF2YXRhclRvbmUobmFtZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IG51bWJlciB7XG4gIGNvbnN0IGtleSA9IGF2YXRhckluaXRpYWxzKG5hbWUpO1xuICAvLyBGTlYtMWEsIDMyLWJpdCDigJQgdGlueSBhbmQgc3RhYmxlIGFjcm9zcyBzZXNzaW9ucy5cbiAgbGV0IGhhc2ggPSAweDgxMWM5ZGM1O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuICAgIGhhc2ggXj0ga2V5LmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9IE1hdGguaW11bChoYXNoLCAweDAxMDAwMTkzKTtcbiAgfVxuICAvLyBGaW5hbCBhdmFsYW5jaGUgKG11cm11cjMgZm1peDMyKTogcGxhaW4gRk5WIG9uIHR3byBjaGFyYWN0ZXJzIGxlYXZlc1xuICAvLyB0aGUgbG93IGJpdHMgcG9vcmx5IG1peGVkLCB3aGljaCBgJSA4YCB3b3VsZCBvdGhlcndpc2UgZXhwb3NlLlxuICBoYXNoIF49IGhhc2ggPj4+IDE2O1xuICBoYXNoID0gTWF0aC5pbXVsKGhhc2gsIDB4ODVlYmNhNmIpO1xuICBoYXNoIF49IGhhc2ggPj4+IDEzO1xuICBoYXNoID0gTWF0aC5pbXVsKGhhc2gsIDB4YzJiMmFlMzUpO1xuICBoYXNoIF49IGhhc2ggPj4+IDE2O1xuICByZXR1cm4gKChoYXNoID4+PiAwKSAlIEFWQVRBUl9UT05FX0NPVU5UKSArIDE7XG59XG4iXX0=