import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthTriStateComponent, type TriStateValue } from './tri-state.component';

describe('AthTriStateComponent', () => {
  let fixture: ComponentFixture<AthTriStateComponent>;
  const host = () => fixture.nativeElement as HTMLElement;
  const radios = () => Array.from(host().querySelectorAll<HTMLButtonElement>('[role="radio"]'));
  const key = (el: HTMLElement, k: string) =>
    el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));

  function render(inputs: Record<string, unknown>) {
    fixture = TestBed.configureTestingModule({ imports: [AthTriStateComponent] }).createComponent(
      AthTriStateComponent
    );
    fixture.componentRef.setInput('label', 'Edit tickets');
    for (const [k, v] of Object.entries(inputs)) fixture.componentRef.setInput(k, v);
    fixture.detectChanges();
  }

  it('is a radio group named by the permission, three radios in deny · inherit · allow order', () => {
    render({ value: 'allow' });
    const group = host().querySelector('[role="radiogroup"]')!;
    expect(group.getAttribute('aria-label')).toBe('Edit tickets');
    expect(radios().map((r) => r.getAttribute('data-state'))).toEqual(['deny', 'inherit', 'allow']);
    expect(radios().map((r) => r.getAttribute('aria-checked'))).toEqual(['false', 'false', 'true']);
  });

  it('keeps one tab stop, on the chosen segment', () => {
    render({ value: 'inherit' });
    expect(radios().map((r) => r.tabIndex)).toEqual([-1, 0, -1]);
  });

  it('reads out what "inherit" currently stands for', () => {
    render({ value: 'inherit', inherited: true });
    expect(radios()[1].getAttribute('aria-label')).toBe('Inherit (currently allowed)');
    fixture.componentRef.setInput('inherited', false);
    fixture.detectChanges();
    expect(radios()[1].getAttribute('aria-label')).toBe('Inherit (currently denied)');
    fixture.componentRef.setInput('inherited', null);
    fixture.detectChanges();
    expect(radios()[1].getAttribute('aria-label')).toBe('Inherit');
    expect(radios()[0].getAttribute('aria-label')).toBe('Deny');
  });

  it('chooses on click and emits valueChange', () => {
    render({ value: 'inherit' });
    const seen: TriStateValue[] = [];
    fixture.componentInstance.value.subscribe((v) => seen.push(v));
    radios()[2].click();
    fixture.detectChanges();
    expect(seen).toEqual(['allow']);
    expect(radios()[2].getAttribute('aria-checked')).toBe('true');
  });

  it('moves and chooses with the arrow keys, wrapping, and jumps with Home/End', () => {
    render({ value: 'inherit' });
    const value = () => fixture.componentInstance.value();
    key(radios()[1], 'ArrowRight');
    fixture.detectChanges();
    expect(value()).toBe('allow');
    expect(document.activeElement).toBe(radios()[2]);
    key(radios()[2], 'ArrowRight');
    fixture.detectChanges();
    expect(value()).toBe('deny');
    key(radios()[0], 'ArrowLeft');
    fixture.detectChanges();
    expect(value()).toBe('allow');
    key(radios()[2], 'ArrowUp');
    fixture.detectChanges();
    expect(value()).toBe('inherit');
    key(radios()[1], 'Home');
    fixture.detectChanges();
    expect(value()).toBe('deny');
    key(radios()[0], 'End');
    fixture.detectChanges();
    expect(value()).toBe('allow');
  });

  it('chooses the focused segment with Space and Enter', () => {
    render({ value: 'allow' });
    key(radios()[0], ' ');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('deny');
    key(radios()[1], 'Enter');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('inherit');
  });

  it('does nothing while disabled', () => {
    render({ value: 'inherit', disabled: true });
    expect(radios().every((r) => r.disabled)).toBe(true);
    key(radios()[1], 'ArrowRight');
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('inherit');
  });

  it('shows icons only when compact, every segment still named', () => {
    render({ value: 'deny', compact: true });
    expect(host().hasAttribute('data-compact')).toBe(true);
    const text = host().querySelector<HTMLElement>('.ath-tri__text')!;
    expect(getComputedStyle(text).display).toBe('none');
    expect(radios().every((r) => !!r.getAttribute('aria-label'))).toBe(true);
  });
});
