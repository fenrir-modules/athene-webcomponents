import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ATH_LABELS } from '../../i18n/labels';
import { ATH_DATE_CONTEXT } from './due-date';
import { AthDueLabelComponent } from './due-label.component';

const NOW = new Date(2026, 9, 22, 10, 0);

describe('AthDueLabelComponent', () => {
  let fixture: ComponentFixture<AthDueLabelComponent>;
  const el = () => fixture.nativeElement as HTMLElement;
  const label = () => el().querySelector<HTMLElement>('.ath-due');

  function create(inputs: Record<string, unknown>, providers: unknown[] = []): void {
    TestBed.configureTestingModule({
      imports: [AthDueLabelComponent],
      providers: [
        { provide: ATH_DATE_CONTEXT, useValue: () => ({ dateFormat: 'dmy' }) },
        ...(providers as never[]),
      ],
    });
    fixture = TestBed.createComponent(AthDueLabelComponent);
    fixture.componentRef.setInput('now', NOW);
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('draws today red via the --due-today token', () => {
    create({ date: '2026-10-22' });
    expect(label()!.dataset['tone']).toBe('today');
    expect(label()!.textContent!.trim()).toBe('Today');
    const color = getComputedStyle(label()!).color;
    const probe = document.createElement('span');
    probe.style.color = 'var(--red)';
    document.body.appendChild(probe);
    expect(color).toBe(getComputedStyle(probe).color);
    probe.remove();
  });

  it('draws tomorrow amber and later muted', () => {
    create({ date: '2026-10-23' });
    expect(label()!.dataset['tone']).toBe('soon');
    fixture.componentRef.setInput('date', '2026-11-20');
    fixture.detectChanges();
    expect(label()!.dataset['tone']).toBe('later');
    expect(label()!.textContent!.trim()).toBe('20.11.');
  });

  it('mutes finished work and shows its date', () => {
    create({ date: '2026-10-01', done: true });
    expect(label()!.dataset['tone']).toBe('done');
    expect(label()!.textContent!.trim()).toBe('1.10.');
  });

  it('reads "Sprint end · <day>" with the sprint icon and a tooltip', () => {
    create({ date: '2026-10-31', source: 'sprint', sprintName: 'Sprint 24' });
    expect(label()!.textContent!.replace(/\s+/g, ' ').trim()).toBe('Sprint end · 31.10.');
    expect(label()!.querySelector('.ath-due__icon')).not.toBeNull();
    expect(label()!.getAttribute('title')).toBe('Due with Sprint 24');
  });

  it('compact keeps the icon and moves the words out of sight', () => {
    create({ date: '2026-10-31', source: 'sprint', compact: true });
    expect(el().querySelector('.ath-due__source')).toBeNull();
    expect(el().querySelector('.ath-due__sr')!.textContent).toBe('Sprint end');
  });

  it('warns when the own date is after the sprint end (not for done work)', () => {
    create({ date: '2026-11-03', afterSprintEnd: true, sprintName: 'Sprint 24' });
    const warn = el().querySelector('.ath-due__warn')!;
    expect(warn.getAttribute('aria-label')).toBe('Due after the sprint ends');
    expect(warn.getAttribute('title')).toBe('Due after the sprint ends · Sprint 24');
    fixture.componentRef.setInput('done', true);
    fixture.detectChanges();
    expect(el().querySelector('.ath-due__warn')).toBeNull();
  });

  it('shows the placeholder without a date, nothing by default', () => {
    create({ date: null });
    expect(el().textContent!.trim()).toBe('');
    fixture.componentRef.setInput('placeholder', '—');
    fixture.detectChanges();
    expect(el().querySelector('.ath-due--none')!.textContent).toBe('—');
  });

  it('takes its words from ATH_LABELS', () => {
    create({ date: '2026-10-19' }, [
      { provide: ATH_LABELS, useValue: { dueOverdue: () => '{count} T überfällig' } },
    ]);
    expect(label()!.textContent!.trim()).toBe('3 T überfällig');
  });
});
