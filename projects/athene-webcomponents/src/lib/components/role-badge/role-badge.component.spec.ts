import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthRoleBadgeComponent } from './role-badge.component';

describe('AthRoleBadgeComponent', () => {
  let fixture: ComponentFixture<AthRoleBadgeComponent>;
  const badge = () => (fixture.nativeElement as HTMLElement).querySelector('.ath-role-badge')!;

  function render(inputs: Record<string, unknown>) {
    fixture = TestBed.configureTestingModule({ imports: [AthRoleBadgeComponent] }).createComponent(
      AthRoleBadgeComponent
    );
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('shows a dot in the role colour and the name', () => {
    render({ name: 'Developer', color: 'blue' });
    expect(badge().getAttribute('data-color')).toBe('blue');
    expect(badge().querySelector('.ath-role-badge__dot')!.getAttribute('aria-hidden')).toBe('true');
    expect(badge().textContent.trim()).toBe('Developer');
  });

  it('draws an unknown or missing colour neutral', () => {
    render({ name: 'Gast', color: '#ff0000' });
    expect(badge().getAttribute('data-color')).toBe('neutral');
    fixture.componentRef.setInput('color', null);
    fixture.detectChanges();
    expect(badge().getAttribute('data-color')).toBe('neutral');
  });

  it('marks a fixed role with a lock that is read out', () => {
    render({ name: 'Owner', color: 'amber', locked: true, size: 'sm' });
    expect(badge().querySelector('ath-icon')).not.toBeNull();
    expect(badge().querySelector('.ath-role-badge__sr')!.textContent.trim()).toBe('Fixed role:');
    expect(badge().getAttribute('data-size')).toBe('sm');
  });
});
