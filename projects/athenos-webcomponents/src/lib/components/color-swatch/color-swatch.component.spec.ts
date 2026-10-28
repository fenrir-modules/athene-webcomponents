import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthColorSwatchComponent } from './color-swatch.component';
import { ATH_DECO_COLORS, isAthDecoColor } from './deco-color';

describe('AthColorSwatchComponent', () => {
  let fixture: ComponentFixture<AthColorSwatchComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const radios = () => Array.from(host().querySelectorAll<HTMLButtonElement>('[role="radio"]'));
  const key = (el: HTMLElement, k: string) =>
    el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));

  function render(inputs: Record<string, unknown> = {}) {
    fixture = TestBed.configureTestingModule({
      imports: [AthColorSwatchComponent],
    }).createComponent(AthColorSwatchComponent);
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('offers the whole palette as a named radio group', () => {
    render({ label: 'Role colour' });
    expect(host().querySelector('[role="radiogroup"]')!.getAttribute('aria-label')).toBe(
      'Role colour'
    );
    expect(radios().map((r) => r.getAttribute('data-color'))).toEqual([...ATH_DECO_COLORS]);
    expect(radios().map((r) => r.getAttribute('aria-label'))).toEqual([
      'Grey',
      'Blue',
      'Green',
      'Amber',
      'Red',
      'Purple',
      'Pink',
    ]);
  });

  it('defaults the group name to the Colour label', () => {
    render();
    expect(host().querySelector('[role="radiogroup"]')!.getAttribute('aria-label')).toBe('Colour');
  });

  it('marks the picked swatch with aria-checked and a check, and gives it the tab stop', () => {
    render({ value: 'green' });
    const picked = radios()[2];
    expect(picked.getAttribute('aria-checked')).toBe('true');
    expect(picked.querySelector('ath-icon')).not.toBeNull();
    expect(radios().filter((r) => r.tabIndex === 0)).toEqual([picked]);
  });

  it('gives the first swatch the tab stop when nothing is picked', () => {
    render({ value: null });
    expect(radios()[0].tabIndex).toBe(0);
    expect(
      radios()
        .slice(1)
        .every((r) => r.tabIndex === -1)
    ).toBe(true);
  });

  it('picks on click and with the arrow keys, wrapping', () => {
    render({ value: 'neutral' });
    radios()[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('blue');
    key(radios()[1], 'ArrowRight');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('green');
    expect(document.activeElement).toBe(radios()[2]);
    key(radios()[2], 'End');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('pink');
    key(radios()[6], 'ArrowDown');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('neutral');
    key(radios()[0], 'ArrowLeft');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('pink');
  });

  it('does not change while disabled', () => {
    render({ value: 'red', disabled: true });
    radios()[1].click();
    key(radios()[4], 'ArrowRight');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('red');
  });

  it('recognises palette tokens only', () => {
    expect(isAthDecoColor('purple')).toBe(true);
    expect(isAthDecoColor('#ff0000')).toBe(false);
    expect(isAthDecoColor(null)).toBe(false);
  });
});
