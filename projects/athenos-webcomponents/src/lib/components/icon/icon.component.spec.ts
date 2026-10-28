import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChevronDown, Users } from 'lucide';
import { AthIconComponent, type AthIconData } from './icon.component';

const OWN: AthIconData = {
  name: 'own-mark',
  node: [['path', { d: 'M0 0h24v24H0z', fill: 'currentColor', stroke: 'none' }]],
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthIconComponent],
  template: `
    <ath-icon id="plain" [img]="users" />
    <ath-icon
      id="styled"
      class="chev"
      [class.chev--open]="open()"
      [img]="icon()"
      [size]="14"
      [strokeWidth]="1.5"
    />
    <ath-icon id="named" [img]="own" role="img" aria-label="Mark" title="Mark" />
  `,
})
class HostComponent {
  readonly users = Users;
  readonly own = OWN;
  readonly icon = signal<AthIconData>(ChevronDown);
  readonly open = signal(true);
}

describe('AthIconComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const host = (id: string) => (fixture.nativeElement as HTMLElement).querySelector(`#${id}`)!;
  const svg = (id: string) => host(id).querySelector('svg')!;

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('draws the icon data in an svg inside the host, at Lucide defaults', () => {
    const icon = svg('plain');
    expect(host('plain').tagName.toLowerCase()).toBe('ath-icon');
    expect(icon.getAttribute('class')).toBe('lucide');
    expect(icon.getAttribute('width')).toBe('24');
    expect(icon.getAttribute('stroke-width')).toBe('2');
    expect(icon.getAttribute('stroke')).toBe('currentColor');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(icon.querySelectorAll('path, circle').length).toBe(Users.length);
  });

  it('passes size, stroke and the static class to the svg', () => {
    const icon = svg('styled');
    expect(icon.getAttribute('width')).toBe('14');
    expect(icon.getAttribute('height')).toBe('14');
    expect(icon.getAttribute('stroke-width')).toBe('1.5');
    expect(icon.classList).toContain('chev');
  });

  it('keeps a toggled host class when the icon changes (unlike a class on the svg)', () => {
    expect(host('styled').classList).toContain('chev--open');
    fixture.componentInstance.icon.set(Users);
    fixture.detectChanges();
    expect(host('styled').classList).toContain('chev--open');
    expect(svg('styled').querySelectorAll('path, circle').length).toBe(Users.length);
    fixture.componentInstance.open.set(false);
    fixture.detectChanges();
    expect(host('styled').classList).not.toContain('chev--open');
  });

  it('takes a named icon of its own and leaves naming to the host', () => {
    const icon = svg('named');
    expect(icon.classList).toContain('lucide-own-mark');
    expect(icon.querySelector('path')!.getAttribute('fill')).toBe('currentColor');
    expect(icon.getAttribute('aria-hidden')).toBe('true');
    expect(host('named').getAttribute('role')).toBe('img');
    expect(host('named').getAttribute('aria-label')).toBe('Mark');
  });
});
