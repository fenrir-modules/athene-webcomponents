import { AVATAR_TONE_COUNT, avatarInitials, avatarToneFor, toneOfKey } from './avatar-tone';

describe('toneOfKey', () => {
  it('stays within the token palette', () => {
    for (const key of ['A', 'u-1', '8ad83b3c-f215-404a-984d-fbe486477824', 'x y z', '?']) {
      const tone = toneOfKey(key);
      expect(tone).toBeGreaterThanOrEqual(1);
      expect(tone).toBeLessThanOrEqual(AVATAR_TONE_COUNT);
    }
  });

  it('spreads different keys over different tones', () => {
    const tones = new Set(['DU', 'MV', 'JF', 'LB', 'SK', 'TA', 'NH'].map(toneOfKey));
    expect(tones.size).toBeGreaterThan(3);
  });
});

describe('avatarInitials', () => {
  it('uses first and last word, or two letters of one word', () => {
    expect(avatarInitials('Joel Peter Furter')).toBe('JF');
    expect(avatarInitials('admin')).toBe('AD');
    expect(avatarInitials('')).toBe('?');
  });
});

describe('avatarToneFor', () => {
  it('keys on the id when there is one', () => {
    // Same initials, different people: the id decides.
    const ids = ['u-1', 'u-2', 'u-3', 'u-4', 'u-5', 'u-6'];
    const tones = new Set(ids.map((id) => avatarToneFor({ id, name: 'Mira Voss' })));
    expect(tones.size).toBeGreaterThan(1);
    expect(avatarToneFor({ id: 'u-1', name: 'Mira Voss' })).toBe(toneOfKey('u-1'));
    // One person, however the name is spelled.
    expect(avatarToneFor({ id: 'u-1', name: 'MV' })).toBe(
      avatarToneFor({ id: 'u-1', name: 'Mira' })
    );
  });

  it('falls back to the initials without an id, and to neutral without anything', () => {
    // Same tone as before 2.7's removal of avatarTone(): the initials are the key.
    expect(avatarToneFor({ name: 'Mira Voss' })).toBe(toneOfKey('MV'));
    expect(avatarToneFor({ name: '  mira   voss ' })).toBe(avatarToneFor({ name: 'MV' }));
    expect(avatarToneFor({ id: ' ', name: '' })).toBeNull();
  });
});
