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
 * Deterministic colour tone (1…AVATAR_TONE_COUNT) for an arbitrary key.
 * FNV-1a with a murmur3 finaliser: tiny and stable across sessions.
 */
export function toneOfKey(key) {
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
/**
 * The tone of a person: keyed on their stable id when there is one, so two
 * people with the same initials still differ and one person keeps a colour
 * however a call site spells the name. Without an id it falls back to the
 * initials (two people with the same initials then share a colour, DS-9:
 * pass the id), and with neither it is `null` (neutral tone).
 */
export function avatarToneFor(person) {
    const id = person.id?.trim();
    if (id)
        return toneOfKey(id);
    return person.name?.trim() ? toneOfKey(avatarInitials(person.name)) : null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLXRvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvYXZhdGFyL2F2YXRhci10b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUVuQzs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLElBQStCO0lBQzVELE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0QsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUNuQyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDdEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xFLENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2hELENBQUM7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsU0FBUyxDQUFDLEdBQVc7SUFDbkMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDcEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCx1RUFBdUU7SUFDdkUsaUVBQWlFO0lBQ2pFLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3BCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNuQyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUNwQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7SUFDcEIsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQW9EO0lBQ2hGLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDN0IsSUFBSSxFQUFFO1FBQUUsT0FBTyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDN0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTnVtYmVyIG9mIGF2YXRhciBjb2xvdXIgdG9uZXMgZGVmaW5lZCBpbiB0aGUgZGVzaWduIHRva2Vuc1xuICogKGAtLWF2YXRhci0xLWJnYCDigKYgYC0tYXZhdGFyLTgtYmdgLCBwZXIgdGhlbWUpLlxuICovXG5leHBvcnQgY29uc3QgQVZBVEFSX1RPTkVfQ09VTlQgPSA4O1xuXG4vKipcbiAqIEluaXRpYWxzIGZvciBhIGRpc3BsYXkgbmFtZTogZmlyc3QgKyBsYXN0IHdvcmQsIG9yIHRoZSBmaXJzdCB0d28gbGV0dGVyc1xuICogb2YgYSBzaW5nbGUgd29yZC4gQWxyZWFkeS1hYmJyZXZpYXRlZCBpbnB1dCAoXCJEVVwiKSBwYXNzZXMgdGhyb3VnaC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGF2YXRhckluaXRpYWxzKG5hbWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICBjb25zdCBwYXJ0cyA9IChuYW1lID8/ICcnKS50cmltKCkuc3BsaXQoL1xccysvKS5maWx0ZXIoQm9vbGVhbik7XG4gIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHJldHVybiAnPyc7XG4gIGlmIChwYXJ0cy5sZW5ndGggPj0gMikge1xuICAgIHJldHVybiAocGFydHNbMF1bMF0gKyBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXVswXSkudG9VcHBlckNhc2UoKTtcbiAgfVxuICByZXR1cm4gcGFydHNbMF0uc3Vic3RyaW5nKDAsIDIpLnRvVXBwZXJDYXNlKCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5pc3RpYyBjb2xvdXIgdG9uZSAoMeKApkFWQVRBUl9UT05FX0NPVU5UKSBmb3IgYW4gYXJiaXRyYXJ5IGtleS5cbiAqIEZOVi0xYSB3aXRoIGEgbXVybXVyMyBmaW5hbGlzZXI6IHRpbnkgYW5kIHN0YWJsZSBhY3Jvc3Mgc2Vzc2lvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b25lT2ZLZXkoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xuICBsZXQgaGFzaCA9IDB4ODExYzlkYzU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaGFzaCBePSBrZXkuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoID0gTWF0aC5pbXVsKGhhc2gsIDB4MDEwMDAxOTMpO1xuICB9XG4gIC8vIEZpbmFsIGF2YWxhbmNoZSAobXVybXVyMyBmbWl4MzIpOiBwbGFpbiBGTlYgb24gdHdvIGNoYXJhY3RlcnMgbGVhdmVzXG4gIC8vIHRoZSBsb3cgYml0cyBwb29ybHkgbWl4ZWQsIHdoaWNoIGAlIDhgIHdvdWxkIG90aGVyd2lzZSBleHBvc2UuXG4gIGhhc2ggXj0gaGFzaCA+Pj4gMTY7XG4gIGhhc2ggPSBNYXRoLmltdWwoaGFzaCwgMHg4NWViY2E2Yik7XG4gIGhhc2ggXj0gaGFzaCA+Pj4gMTM7XG4gIGhhc2ggPSBNYXRoLmltdWwoaGFzaCwgMHhjMmIyYWUzNSk7XG4gIGhhc2ggXj0gaGFzaCA+Pj4gMTY7XG4gIHJldHVybiAoKGhhc2ggPj4+IDApICUgQVZBVEFSX1RPTkVfQ09VTlQpICsgMTtcbn1cblxuLyoqXG4gKiBUaGUgdG9uZSBvZiBhIHBlcnNvbjoga2V5ZWQgb24gdGhlaXIgc3RhYmxlIGlkIHdoZW4gdGhlcmUgaXMgb25lLCBzbyB0d29cbiAqIHBlb3BsZSB3aXRoIHRoZSBzYW1lIGluaXRpYWxzIHN0aWxsIGRpZmZlciBhbmQgb25lIHBlcnNvbiBrZWVwcyBhIGNvbG91clxuICogaG93ZXZlciBhIGNhbGwgc2l0ZSBzcGVsbHMgdGhlIG5hbWUuIFdpdGhvdXQgYW4gaWQgaXQgZmFsbHMgYmFjayB0byB0aGVcbiAqIGluaXRpYWxzICh0d28gcGVvcGxlIHdpdGggdGhlIHNhbWUgaW5pdGlhbHMgdGhlbiBzaGFyZSBhIGNvbG91ciwgRFMtOTpcbiAqIHBhc3MgdGhlIGlkKSwgYW5kIHdpdGggbmVpdGhlciBpdCBpcyBgbnVsbGAgKG5ldXRyYWwgdG9uZSkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdmF0YXJUb25lRm9yKHBlcnNvbjogeyBpZD86IHN0cmluZyB8IG51bGw7IG5hbWU/OiBzdHJpbmcgfCBudWxsIH0pOiBudW1iZXIgfCBudWxsIHtcbiAgY29uc3QgaWQgPSBwZXJzb24uaWQ/LnRyaW0oKTtcbiAgaWYgKGlkKSByZXR1cm4gdG9uZU9mS2V5KGlkKTtcbiAgcmV0dXJuIHBlcnNvbi5uYW1lPy50cmltKCkgPyB0b25lT2ZLZXkoYXZhdGFySW5pdGlhbHMocGVyc29uLm5hbWUpKSA6IG51bGw7XG59XG4iXX0=