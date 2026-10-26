import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Inbox } from 'lucide';
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

  it('projects an end marker inside the link, after the label', () => {
    const host = TestBed.configureTestingModule({
      imports: [EndHostComponent],
      providers: [provideRouter([])],
    }).createComponent(EndHostComponent);
    host.detectChanges();
    const root = host.nativeElement as HTMLElement;
    const end = root.querySelector('a .ath-nav-item__tail .ath-nav-item__end');
    expect(end?.querySelector('.beta')?.textContent).toBe('Beta');
    expect(end?.previousElementSibling?.classList).toContain('ath-nav-item__label');
    expect(root.querySelector('a')?.textContent).toContain('Beta');
  });

  it('draws no end cell without a marker', () => {
    render({});
    expect(q('.ath-nav-item__end')?.childElementCount).toBe(0);
  });
});

@Component({
  imports: [AthNavItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ath-nav-item label="Assistant" route="/ai"
    ><span athNavItemEnd class="beta">Beta</span></ath-nav-item
  >`,
})
class EndHostComponent {}
