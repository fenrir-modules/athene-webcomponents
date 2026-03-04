import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthInputComponent } from './input.component';

describe('AthInputComponent', () => {
  let fixture: ComponentFixture<AthInputComponent>;
  let component: AthInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AthInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders label and required marker', () => {
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label');
    expect(label?.textContent).toContain('Email');
    expect(label?.textContent).toContain('*');
  });

  it('emits value changes on input event', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'demo@example.com';
    input.dispatchEvent(new Event('input'));

    expect(onChange).toHaveBeenCalledWith('demo@example.com');
  });

  it('toggles password visibility with aria state', () => {
    fixture.componentRef.setInput('type', 'password');
    fixture.detectChanges();

    const toggle = fixture.nativeElement.querySelector('.ath-input__toggle') as HTMLButtonElement;
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
  });
});
