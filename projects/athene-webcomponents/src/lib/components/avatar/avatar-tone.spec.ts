import { AVATAR_TONE_COUNT, avatarInitials, avatarTone } from './avatar-tone';

describe('avatarTone', () => {
  it('gives a person the same tone from a full name or their initials', () => {
    expect(avatarTone('Dev User')).toBe(avatarTone('DU'));
    expect(avatarTone('  mira   voss ')).toBe(avatarTone('MV'));
  });

  it('stays within the token palette', () => {
    for (const name of ['A', 'Joel Furter', 'Mira Voss', 'x y z', '?']) {
      const tone = avatarTone(name);
      expect(tone).toBeGreaterThanOrEqual(1);
      expect(tone).toBeLessThanOrEqual(AVATAR_TONE_COUNT);
    }
  });

  it('spreads different people over different tones', () => {
    const tones = new Set(['DU', 'MV', 'JF', 'LB', 'SK', 'TA', 'NH'].map(avatarTone));
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
