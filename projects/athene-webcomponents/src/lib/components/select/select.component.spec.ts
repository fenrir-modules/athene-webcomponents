import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AthSelectComponent, type SelectOption } from './select.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthSelectComponent, FormsModule],
  template: `
    <ath-select
      placeholder=""
      [options]="options()"
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
    />
  `,
})
class SelectHostComponent {
  readonly options = signal<SelectOption[]>([]);
  readonly value = signal('');
}

const PROJECTS: SelectOption[] = [
  { value: '', label: 'None' },
  { value: 'p1', label: 'Atlas' },
  { value: 'p2', label: 'Website' },
];

describe('AthSelectComponent', () => {
  async function setup() {
    const fixture = TestBed.createComponent(SelectHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const select = (): HTMLSelectElement =>
      (fixture.nativeElement as HTMLElement).querySelector('select')!;
    return { fixture, host: fixture.componentInstance, select };
  }

  it('shows the value once the options arrive after it (default project after a reload)', async () => {
    const { fixture, host, select } = await setup();
    // The setting is known before the project list has loaded.
    host.value.set('p2');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    host.options.set(PROJECTS);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(select().value).toBe('p2');
    expect(select().selectedOptions[0]?.textContent?.trim()).toBe('Website');
  });

  it('keeps the value when the options are replaced', async () => {
    const { fixture, host, select } = await setup();
    host.options.set(PROJECTS);
    host.value.set('p1');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(select().value).toBe('p1');
    host.options.set([...PROJECTS, { value: 'p3', label: 'Mobile' }]);
    fixture.detectChanges();
    expect(select().value).toBe('p1');
  });

  it('reports a user change through the forms API', async () => {
    const { fixture, host, select } = await setup();
    host.options.set(PROJECTS);
    fixture.detectChanges();
    select().value = 'p1';
    select().dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(host.value()).toBe('p1');
  });

  it('names the native select with ariaLabel when there is no visible label', () => {
    const fixture = TestBed.createComponent(AthSelectComponent);
    fixture.componentRef.setInput('options', PROJECTS);
    fixture.componentRef.setInput('ariaLabel', 'Role for Mira');
    fixture.detectChanges();
    const select = (fixture.nativeElement as HTMLElement).querySelector('select')!;
    expect(select.getAttribute('aria-label')).toBe('Role for Mira');
    expect((fixture.nativeElement as HTMLElement).querySelector('label')).toBeNull();
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();
    expect(select.hasAttribute('aria-label')).toBeFalse();
  });
});
