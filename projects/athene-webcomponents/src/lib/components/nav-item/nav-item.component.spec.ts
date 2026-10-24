import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Inbox } from 'lucide-angular';
import { AthNavItemComponent } from './nav-item.component';

describe('AthNavItemComponent', () => {
  let fixture: ComponentFixture<AthNavItemComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const q = (sel: string) => host().querySelector<HTMLElement>(sel);

  function render(inputs: Record<string, unknown>) {
    fixture = TestBed.configureTestingModule({
      imports: [AthNavItemComponent],
      providers: [provideRouter([])],
    }).createComponent(AthNavItemComponent);
    for (const [k, v] of Object.entries({ label: 'Inbox', route: '/inbox', ...inputs })) {
      fixture.componentRef.setInput(k, v);
    }
    fixture.detectChanges();
  }

  it('links to its route and shows the label and count', () => {
    render({ icon: Inbox, badge: 3 });
    expect(q('a')?.getAttribute('href')).toBe('/inbox');
    expect(q('.ath-nav-item__label')?.textContent).toBe('Inbox');
    expect(q('.ath-nav-item__badge')?.textContent).toBe('3');
    expect(q('.ath-nav-item__tooltip')).toBeNull();
  });

  it('takes link parameters for a parameterised route', () => {
    render({ route: ['/projects', 'p1'], chip: { text: 'ATL', color: 'var(--blue)' } });
    expect(q('a')?.getAttribute('href')).toBe('/projects/p1');
    expect(q('.ath-nav-item__chip')?.textContent).toBe('ATL');
  });

  it('shows no count below 1', () => {
    render({ badge: 0 });
    expect(q('.ath-nav-item__badge')).toBeNull();
  });

  it('compact: names the link, turns the count into a dot and the tooltip', () => {
    render({ icon: Inbox, badge: 3, compact: true });
    expect(q('a')?.getAttribute('aria-label')).toBe('Inbox');
    expect(q('.ath-nav-item__icon-dot')).not.toBeNull();
    expect(q('.ath-nav-item__tooltip')?.textContent?.trim()).toBe('Inbox · 3');
  });

  it('still reads the deprecated inputs (link, collapsed, badgeCount)', () => {
    render({ route: null, link: '/old', collapsed: true, badgeCount: 2 });
    expect(q('a')?.getAttribute('href')).toBe('/old');
    expect(q('.ath-nav-item__tooltip')?.textContent?.trim()).toBe('Inbox · 2');
  });
});
