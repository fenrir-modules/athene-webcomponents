import { ComponentFixture, TestBed } from '@angular/core/testing';
import { toneOfKey } from '../avatar/avatar-tone';
import { AthAvatarStackComponent, type StackedUser } from './avatar-stack.component';

describe('AthAvatarStackComponent', () => {
  let fixture: ComponentFixture<AthAvatarStackComponent>;
  const items = () =>
    Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('ath-avatar'));

  function render(users: StackedUser[], max = 4) {
    fixture = TestBed.configureTestingModule({
      imports: [AthAvatarStackComponent],
    }).createComponent(AthAvatarStackComponent);
    fixture.componentInstance.users = users;
    fixture.componentInstance.max = max;
    fixture.detectChanges();
  }

  it('tones each avatar by the user id, like every other ath-avatar (DS-09)', () => {
    // Same initials, different people: the id decides the colour.
    render([
      { id: 'u-1', name: 'Mira Voss' },
      { id: 'u-2', name: 'Max Vogel' },
    ]);
    const tones = items().map(
      (el) => el.querySelector<HTMLElement>('[data-tone]')?.getAttribute('data-tone') ?? null
    );
    expect(tones).toEqual([String(toneOfKey('u-1')), String(toneOfKey('u-2'))]);
  });

  it('shows at most max avatars and counts the rest', () => {
    render(
      ['a', 'b', 'c', 'd', 'e', 'f'].map((id) => ({ id, name: `User ${id}` })),
      4
    );
    expect(items().length).toBe(4);
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.ath-stack__more')?.textContent
    ).toBe('+2');
  });
});
