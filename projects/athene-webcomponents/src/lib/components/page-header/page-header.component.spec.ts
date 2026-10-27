import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthPageHeaderComponent } from './page-header.component';

@Component({
  imports: [AthPageHeaderComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ath-page-header title="Project" [subItems]="['Sprint 2', '', 'No lead']" [divider]="divider()">
      <span athPageLeading class="key">FP</span>
      <span athPageMeta class="pill">On track</span>
      <button type="button" class="act">More</button>
    </ath-page-header>
  `,
})
class HostComponent {
  readonly divider = signal(true);
}

describe('AthPageHeaderComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  it('renders the title as the page h1', () => {
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Project');
  });

  it('drops blank meta items; each item leads with its own separator', () => {
    // The row clips the first separator-width of every line, so the
    // leading dot of the first item on a line is never seen.
    const items = Array.from(el.querySelectorAll('.ath-page-header__sub-item')).map((n) =>
      n.textContent?.replace(/\s+/g, ' ').trim()
    );
    expect(items).toEqual(['· Sprint 2', '· No lead']);
  });

  it('projects leading, meta and actions into their slots', () => {
    expect(el.querySelector('.ath-page-header__leading .key')).not.toBeNull();
    expect(el.querySelector('.ath-page-header__sub .pill')).not.toBeNull();
    expect(el.querySelector('.ath-page-header__actions .act')).not.toBeNull();
  });

  it('draws the hairline by default and lets a page opt out', () => {
    const header = () => el.querySelector('.ath-page-header') as HTMLElement;
    expect(header().classList).toContain('ath-page-header--divided');
    fixture.componentInstance.divider.set(false);
    fixture.detectChanges();
    expect(header().classList).not.toContain('ath-page-header--divided');
  });

  it('renders an h2 when it heads a section inside a page', () => {
    const f = TestBed.createComponent(AthPageHeaderComponent);
    f.componentRef.setInput('title', 'Labels');
    f.componentRef.setInput('level', 2);
    f.detectChanges();
    const root = f.nativeElement as HTMLElement;
    expect(root.querySelector('h1')).toBeNull();
    expect(root.querySelector('h2')?.textContent?.trim()).toBe('Labels');
  });

  it("keeps the meta line's room on a page head while it is empty (UX-043)", () => {
    const f = TestBed.createComponent(AthPageHeaderComponent);
    f.componentRef.setInput('title', 'Docs');
    f.detectChanges();
    const root = f.nativeElement as HTMLElement;
    document.body.append(root);
    const sub = root.querySelector('.ath-page-header__sub') as HTMLElement;
    expect(getComputedStyle(sub).display).not.toBe('none');
    expect(sub.getBoundingClientRect().height).toBeGreaterThan(0);
    f.componentRef.setInput('level', 2);
    f.detectChanges();
    expect(getComputedStyle(sub).display).toBe('none');
    root.remove();
  });

  it('draws title and meta as skeleton bars while loading, without an empty h1', () => {
    const f = TestBed.createComponent(AthPageHeaderComponent);
    f.componentRef.setInput('title', '');
    f.componentRef.setInput('loading', true);
    f.detectChanges();
    const root = f.nativeElement as HTMLElement;
    expect(root.querySelector('h1')).toBeNull();
    expect(root.querySelector('.ath-page-header__skeleton--title')).not.toBeNull();
    expect(root.querySelector('.ath-page-header__skeleton--meta')).not.toBeNull();
    expect(root.querySelector('header')?.getAttribute('aria-busy')).toBe('true');
  });
});
