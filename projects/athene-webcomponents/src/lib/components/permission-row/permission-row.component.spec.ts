import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolderPlus } from 'lucide';
import { AthToggleComponent } from '../toggle';
import { AthPermissionRowComponent } from './permission-row.component';

@Component({
  imports: [AthPermissionRowComponent, AthToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ath-permission-row
      [icon]="icon"
      label="Create projects"
      description="New projects in the workspace"
      [inheritedHint]="hint()"
      [interactive]="interactive()"
      [disabled]="disabled()"
      [disabledReason]="reason()"
      (activate)="flip()"
    >
      <ath-toggle
        ariaLabel="Create projects"
        [checked]="on()"
        [disabled]="disabled()"
        (toggled)="on.set($event)"
      />
    </ath-permission-row>
  `,
})
class HostComponent {
  readonly icon = FolderPlus;
  readonly on = signal(false);
  readonly interactive = signal(true);
  readonly disabled = signal(false);
  readonly reason = signal<string | null>(null);
  readonly hint = signal<string | null>(null);
  activations = 0;
  flip(): void {
    this.activations++;
    this.on.update((v) => !v);
  }
}

describe('AthPermissionRowComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const row = () => (fixture.nativeElement as HTMLElement).querySelector('ath-permission-row')!;
  const toggle = () => row().querySelector<HTMLButtonElement>('[role="switch"]')!;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(
      HostComponent
    );
    fixture.detectChanges();
  });

  it('shows the icon, name and one-line explanation', () => {
    expect(row().querySelector('ath-icon')).not.toBeNull();
    expect(row().querySelector('.ath-perm__label')!.textContent.trim()).toBe('Create projects');
    expect(row().querySelector('.ath-perm__explain')!.textContent.trim()).toBe(
      'New projects in the workspace'
    );
    expect(row().querySelector('.ath-perm__icon')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('turns a click on the row into activate', () => {
    (row().querySelector('.ath-perm__label') as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activations).toBe(1);
    expect(toggle().getAttribute('aria-checked')).toBe('true');
  });

  it('leaves a click on the control to the control: one change, not two', () => {
    toggle().click();
    fixture.detectChanges();
    expect(fixture.componentInstance.activations).toBe(0);
    expect(fixture.componentInstance.on()).toBeTrue();
  });

  it('emits nothing when not interactive or when disabled', () => {
    fixture.componentInstance.interactive.set(false);
    fixture.detectChanges();
    (row() as HTMLElement).click();
    fixture.componentInstance.interactive.set(true);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    (row() as HTMLElement).click();
    expect(fixture.componentInstance.activations).toBe(0);
    expect(row().classList).toContain('ath-perm--disabled');
    expect(row().classList).not.toContain('ath-perm--interactive');
  });

  it('reads out why it is disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.componentInstance.reason.set('Guests can never do this');
    fixture.detectChanges();
    expect(row().querySelector('.ath-perm__sr')!.textContent.trim()).toBe(
      'Guests can never do this'
    );
  });

  it('shows the inherited hint', () => {
    fixture.componentInstance.hint.set('✓ inherited from role Developer');
    fixture.detectChanges();
    expect(row().querySelector('.ath-perm__hint')!.textContent.trim()).toBe(
      '✓ inherited from role Developer'
    );
  });
});
