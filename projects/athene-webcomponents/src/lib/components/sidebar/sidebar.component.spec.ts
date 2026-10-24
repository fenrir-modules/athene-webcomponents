import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AthSidebarComponent } from './sidebar.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthSidebarComponent],
  template: `<ath-sidebar [(collapsed)]="collapsed" />`,
})
class SidebarHostComponent {
  readonly collapsed = signal(false);
}

describe('AthSidebarComponent', () => {
  it('keeps [(collapsed)] two-way through the toggle', () => {
    const fixture = TestBed.createComponent(SidebarHostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const aside = () => el.querySelector('aside')!;
    el.querySelector<HTMLButtonElement>('.ath-sidebar__toggle')!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.collapsed()).toBeTrue();
    expect(aside().classList).toContain('ath-sidebar--collapsed');
    fixture.componentInstance.collapsed.set(false);
    fixture.detectChanges();
    expect(aside().classList).not.toContain('ath-sidebar--collapsed');
  });
});
