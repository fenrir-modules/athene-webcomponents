import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ATH_LABELS } from '../../i18n/labels';
import { AthBreadcrumbComponent, type BreadcrumbItem } from './breadcrumb.component';

describe('AthBreadcrumbComponent', () => {
  let fixture: ComponentFixture<AthBreadcrumbComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  function render(items: BreadcrumbItem[]) {
    fixture = TestBed.configureTestingModule({
      imports: [AthBreadcrumbComponent],
      providers: [
        provideRouter([]),
        { provide: ATH_LABELS, useValue: { breadcrumbMore: () => 'Ausgeblendet' } },
      ],
    }).createComponent(AthBreadcrumbComponent);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
  }

  const five: BreadcrumbItem[] = [
    { label: 'Projekte', route: '/app/work/projects' },
    { label: 'Atlas', key: 'ATL', route: '/app/work/projects/p1' },
    { label: 'Board', route: '/app/work/projects/p1', queryParams: { tab: 'board' } },
    { label: 'Parent', key: 'ATL-1', route: '/app/tickets/t1' },
    { label: 'Child', key: 'ATL-2' },
  ];

  const steps = () =>
    Array.from(host().querySelectorAll('.ath-breadcrumb__list > li')).map((li) =>
      li.textContent?.replace(/\s+/g, ' ').trim()
    );

  it('renders nothing for an empty trail', () => {
    render([]);
    expect(host().querySelector('nav')).toBeNull();
  });

  it('shows short trails whole, the last one as the current page', () => {
    render(five.slice(0, 3));
    expect(steps().length).toBe(3);
    expect(host().querySelector('.ath-breadcrumb__more')).toBeNull();
    expect(host().querySelector('[aria-current="page"]')?.textContent).toContain('Board');
  });

  it('links ancestors with their query, and draws keys as chips', () => {
    render(five.slice(0, 3));
    const links = Array.from(host().querySelectorAll<HTMLAnchorElement>('a.ath-breadcrumb__link'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '/app/work/projects',
      '/app/work/projects/p1',
    ]);
    expect(host().querySelector('.ath-breadcrumb__key')?.textContent).toBe('ATL');
  });

  it('folds the middle of a long trail into "…", keeping first and last two', () => {
    render(five);
    const shown = steps();
    expect(shown.length).toBe(4);
    expect(shown[0]).toContain('Projekte');
    expect(shown[1]).toContain('…');
    expect(shown[2]).toContain('Parent');
    expect(shown[3]).toContain('Child');
    expect(host().querySelector('.ath-breadcrumb__more')?.getAttribute('title')).toBe(
      'Ausgeblendet'
    );
  });

  it('lists the hidden steps in the "…" menu, in order, with their keys', () => {
    render(five);
    const more = (
      fixture.componentInstance as unknown as {
        shown: () => {
          kind: string;
          items?: {
            label: string;
          }[];
        }[];
      }
    )
      .shown()
      .find((s) => s.kind === 'more');
    expect(more?.items?.map((i) => i.label)).toEqual(['ATL · Atlas', 'Board']);
  });
});
