import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import type { ListboxOption } from '../listbox/listbox.component';
import { AthComboboxComponent } from './combobox.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthComboboxComponent],
  template: `
    <ath-combobox
      [options]="options"
      [value]="value()"
      placeholder="Pick relation"
      [clearable]="true"
      (valueChange)="value.set($event)"
      (queryChange)="queries.push($event)"
      (opened)="events.push('opened')"
      (closed)="events.push('closed')"
    />
    <ath-combobox #bare [options]="options" [bare]="true" />
  `,
})
class ComboboxHostComponent {
  readonly options: ListboxOption[] = [
    { value: 'blocks', label: 'Blocks' },
    { value: 'relates', label: 'Relates to' },
  ];
  readonly value = signal<string | null>(null);
  readonly queries: string[] = [];
  readonly events: string[] = [];
  readonly bare = viewChild.required<AthComboboxComponent>('bare');
}

const wait = (): Promise<void> => new Promise((r) => setTimeout(r));

describe('AthComboboxComponent', () => {
  let fixture: ComponentFixture<ComboboxHostComponent>;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxHostComponent);
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('keeps its API: placeholder, search, valueChange, queryChange, opened/closed', async () => {
    const trigger = q('.ath-picker__trigger')!;
    expect(trigger.textContent).toContain('Pick relation');
    trigger.click();
    fixture.detectChanges();
    await wait();
    fixture.detectChanges();
    expect(fixture.componentInstance.events).toEqual(['opened']);

    const input = q<HTMLInputElement>('input')!;
    input.value = 'rel';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.queries).toContain('rel');
    expect(root.querySelectorAll('[role=option]').length).toBe(1);

    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
    );
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('relates');
    expect(fixture.componentInstance.events).toEqual(['opened', 'closed']);
    expect(trigger.textContent).toContain('Relates to');
  });

  it('has no button nested in its trigger button', () => {
    fixture.componentInstance.value.set('blocks');
    fixture.detectChanges();
    expect(q('.ath-picker__trigger button')).toBeNull();
    expect(q('.ath-picker__clear')).not.toBeNull();
  });

  it('opens programmatically in bare mode', async () => {
    const bare = fixture.componentInstance.bare();
    expect(root.querySelectorAll('.ath-picker__trigger').length).toBe(1);
    bare.openPanel();
    fixture.detectChanges();
    await wait();
    expect(root.querySelectorAll('[role=listbox]').length).toBe(1);
    bare.close();
    fixture.detectChanges();
    expect(root.querySelectorAll('[role=listbox]').length).toBe(0);
  });
});
