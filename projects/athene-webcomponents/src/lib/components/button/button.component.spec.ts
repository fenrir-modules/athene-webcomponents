import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthButtonComponent } from './button.component';

describe('AthButtonComponent', () => {
  let fixture: ComponentFixture<AthButtonComponent>;
  const inner = () => (fixture.nativeElement as HTMLElement).querySelector('button')!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AthButtonComponent] }).compileComponents();
    fixture = TestBed.createComponent(AthButtonComponent);
    fixture.detectChanges();
  });

  it('omits aria-pressed / aria-expanded unless set', () => {
    expect(inner().hasAttribute('aria-pressed')).toBeFalse();
    expect(inner().hasAttribute('aria-expanded')).toBeFalse();
  });

  it('forwards pressed, expanded and controls to the inner button', () => {
    fixture.componentRef.setInput('pressed', true);
    fixture.componentRef.setInput('expanded', false);
    fixture.componentRef.setInput('controls', 'panel-1');
    fixture.detectChanges();
    expect(inner().getAttribute('aria-pressed')).toBe('true');
    expect(inner().getAttribute('aria-expanded')).toBe('false');
    expect(inner().getAttribute('aria-controls')).toBe('panel-1');
    expect(inner().classList).toContain('ath-button--pressed');
  });

  it('supports the xs size used by the topbar', () => {
    fixture.componentRef.setInput('size', 'xs');
    fixture.detectChanges();
    expect(inner().classList).toContain('ath-button--xs');
  });
});
