import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthToggleComponent } from './toggle.component';

describe('AthToggleComponent', () => {
  let fixture: ComponentFixture<AthToggleComponent>;
  const button = () => (fixture.nativeElement as HTMLElement).querySelector('button')!;

  function render(inputs: Record<string, unknown>) {
    fixture = TestBed.configureTestingModule({ imports: [AthToggleComponent] }).createComponent(
      AthToggleComponent
    );
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('is a switch named by ariaLabel, without the boxed label chrome', () => {
    render({ ariaLabel: 'Email on mention', checked: true });
    expect(button().getAttribute('role')).toBe('switch');
    expect(button().getAttribute('aria-checked')).toBe('true');
    expect(button().getAttribute('aria-label')).toBe('Email on mention');
    expect(button().classList).not.toContain('ath-toggle--boxed');
    expect(button().querySelector('.ath-toggle__content')).toBeNull();
    // A box of its own: exactly the switch, no line box (strut) around it.
    const host = fixture.nativeElement as HTMLElement;
    expect(host.hasAttribute('data-bare')).toBe(true);
    expect(getComputedStyle(host).display).toBe('inline-flex');
    expect(Math.round(host.getBoundingClientRect().height)).toBe(
      Math.round(button().getBoundingClientRect().height)
    );
  });

  it('is named by its visible label otherwise', () => {
    render({ label: 'Maintenance' });
    expect(button().hasAttribute('aria-label')).toBe(false);
    expect(button().textContent?.trim()).toBe('Maintenance');
    expect(button().classList).toContain('ath-toggle--boxed');
    expect((fixture.nativeElement as HTMLElement).hasAttribute('data-bare')).toBe(false);
  });

  it('emits the next state, not when disabled', () => {
    render({ ariaLabel: 'Flag' });
    const seen: boolean[] = [];
    fixture.componentInstance.toggled.subscribe((v) => seen.push(v));
    button().click();
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.componentInstance.toggle();
    expect(seen).toEqual([true]);
  });
});
