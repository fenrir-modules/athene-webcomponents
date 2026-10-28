import { TestBed } from '@angular/core/testing';
import { ATH_STATUS_LABELS, ATH_STATUS_TONES } from '@athenos/webcomponents/core';
import { AthStatusPillComponent } from './status-pill.component';

describe('AthStatusPillComponent', () => {
  function render(inputs: Record<string, unknown>, providers: unknown[] = []) {
    TestBed.configureTestingModule({
      imports: [AthStatusPillComponent],
      providers: providers as never[],
    });
    const fixture = TestBed.createComponent(AthStatusPillComponent);
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      host,
      label: () => host.querySelector('.ath-status-pill__label')?.textContent,
    };
  }

  it('names a short code and a built-in key in English by default', () => {
    expect(render({ status: 'prog' }).label()).toBe('In Progress');
    TestBed.resetTestingModule();
    expect(render({ status: 'in_review' }).label()).toBe('In Review');
  });

  it('shows any status key, named by the app and toned by its resolver', () => {
    const { host, label } = render({ status: 'qa' }, [
      { provide: ATH_STATUS_LABELS, useValue: (s: string) => (s === 'qa' ? 'QA' : null) },
      { provide: ATH_STATUS_TONES, useValue: (s: string) => (s === 'qa' ? 'purple' : null) },
    ]);
    expect(label()).toBe('QA');
    expect(host.getAttribute('data-status')).toBe('qa');
    expect(host.getAttribute('data-tone')).toBe('purple');
  });

  it('lets [tone] win over the resolver and ignores an unknown token', () => {
    const { fixture, host } = render({ status: 'open', tone: 'green' }, [
      { provide: ATH_STATUS_TONES, useValue: () => 'red' },
    ]);
    expect(host.getAttribute('data-tone')).toBe('green');
    fixture.componentRef.setInput('tone', 'chartreuse');
    fixture.detectChanges();
    expect(host.hasAttribute('data-tone')).toBe(false);
  });

  it('falls back to the key itself when nobody names it', () => {
    const { host, label } = render({ status: 'shipped' });
    expect(label()).toBe('shipped');
    expect(host.hasAttribute('data-tone')).toBe(false);
  });
});
