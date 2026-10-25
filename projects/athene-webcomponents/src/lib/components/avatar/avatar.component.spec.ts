import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ATH_LABELS } from '../../i18n/labels';
import { AthAvatarComponent } from './avatar.component';
import { toneOfKey } from './avatar-tone';

describe('AthAvatarComponent', () => {
  let fixture: ComponentFixture<AthAvatarComponent>;
  const face = () =>
    (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.ath-avatar')!;

  function create(inputs: Record<string, unknown>, providers: unknown[] = []): void {
    TestBed.configureTestingModule({
      imports: [AthAvatarComponent],
      providers: providers as never[],
    });
    fixture = TestBed.createComponent(AthAvatarComponent);
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('shows initials on the tone of the person id', () => {
    create({ person: { id: 'user-42', name: 'Mira Voss' }, size: 'sm' });
    expect(face().textContent!.trim()).toBe('MV');
    expect(face().dataset['tone']).toBe(String(toneOfKey('user-42')));
    expect(face().getAttribute('role')).toBe('img');
    expect(face().getAttribute('aria-label')).toBe('Mira Voss');
    expect(face().getAttribute('title')).toBe('Mira Voss');
  });

  it('draws a role ring in a palette colour, and none for an unknown token', () => {
    create({ person: { id: 'u1', name: 'Mira Voss' }, ring: 'purple' });
    expect(face().dataset['ring']).toBe('purple');
    expect(getComputedStyle(face()).boxShadow).not.toBe('none');
    fixture.componentRef.setInput('ring', '#123456');
    fixture.detectChanges();
    expect(face().hasAttribute('data-ring')).toBeFalse();
    fixture.componentRef.setInput('ring', null);
    fixture.detectChanges();
    expect(face().hasAttribute('data-ring')).toBeFalse();
  });

  it('draws null as the empty seat, titled with the label', () => {
    create({ person: null, size: 'sm' });
    expect(face().classList).toContain('ath-avatar--empty');
    expect(face().getAttribute('aria-label')).toBe('Unassigned');
    expect(face().getAttribute('title')).toBe('Unassigned');
    expect(face().querySelector('lucide-icon')).not.toBeNull();
    expect(face().dataset['tone']).toBeUndefined();
  });

  it('gives the empty seat the exact size of a person avatar', () => {
    create({ person: null, size: 'sm' });
    const empty = face().getBoundingClientRect();
    fixture.componentRef.setInput('person', { id: 'x', name: 'Ann Lee' });
    fixture.detectChanges();
    const person = face().getBoundingClientRect();
    expect(empty.width).toBe(22);
    expect([person.width, person.height]).toEqual([empty.width, empty.height]);
  });

  it('reads each size from its --avatar-* token', () => {
    const sizes = { xs: 20, sm: 22, md: 36, lg: 44, xl: 56 } as const;
    create({ name: 'Ann Lee' });
    for (const [size, px] of Object.entries(sizes)) {
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();
      expect(face().getBoundingClientRect().width).withContext(size).toBe(px);
    }
  });

  it('translates "Unassigned" through ATH_LABELS', () => {
    create({ unassigned: true }, [
      { provide: ATH_LABELS, useValue: { unassigned: () => 'Nicht zugewiesen' } },
    ]);
    expect(face().getAttribute('aria-label')).toBe('Nicht zugewiesen');
  });

  it('keeps the legacy name input: initials tone, no tooltip', () => {
    create({ name: 'Dev User' });
    expect(face().textContent!.trim()).toBe('DU');
    expect(face().getAttribute('title')).toBeNull();
    expect(face().dataset['tone']).toBeDefined();
  });

  it('falls back to the initials when the image fails', () => {
    create({ person: { id: 'a', name: 'Ann Lee', src: 'data:image/png;base64,broken' } });
    const img = face().querySelector('img')!;
    expect(img).not.toBeNull();
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(face().querySelector('img')).toBeNull();
    expect(face().textContent!.trim()).toBe('AL');
  });
});
