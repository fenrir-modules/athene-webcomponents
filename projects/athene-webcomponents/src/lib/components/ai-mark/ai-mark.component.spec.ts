import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AthAiMarkComponent, type AiMarkVariant } from './ai-mark.component';
import { AI_MARK_REGULAR, AI_MARK_SMALL } from './ai-mark.geometry';

@Component({
  imports: [AthAiMarkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ath-ai-mark class="a" [size]="size()" [variant]="variant()" [label]="label()" />
    <ath-ai-mark class="b" variant="gradient" [size]="48" />
    <ath-ai-mark class="c" variant="gradient" [size]="48" />
    <ath-ai-mark class="w" [size]="20" wordmark label="ignored" />
  `,
})
class HostComponent {
  readonly size = signal(16);
  readonly variant = signal<AiMarkVariant>('color');
  readonly label = signal('');
}

describe('AthAiMarkComponent', () => {
  function render() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const q = (sel: string) => el.querySelector(sel) as Element;
    return { fixture, el, q };
  }

  it('is decorative without a label and an image with one', () => {
    const { fixture, q } = render();
    const svg = q('.a svg');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.getAttribute('role')).toBeNull();

    fixture.componentInstance.label.set('Athenos AI');
    fixture.detectChanges();
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Athenos AI');
    expect(svg.getAttribute('aria-hidden')).toBeNull();
  });

  it('switches to the small optical size up to 20 px', () => {
    const { fixture, q } = render();
    const body = () => q('.a .ath-ai-mark__body').getAttribute('d');
    expect(body()).toBe(AI_MARK_SMALL.body);
    expect(q('.a svg').getAttribute('width')).toBe('16');
    fixture.componentInstance.size.set(24);
    fixture.detectChanges();
    expect(body()).toBe(AI_MARK_REGULAR.body);
    expect(q('.a svg').getAttribute('height')).toBe('24');
  });

  it('paints the gradient from its own, unique paint server', () => {
    const { q } = render();
    const idB = q('.b linearGradient').getAttribute('id');
    const idC = q('.c linearGradient').getAttribute('id');
    expect(idB).toBeTruthy();
    expect(idB).not.toBe(idC);
    expect(q('.b .ath-ai-mark__body').getAttribute('fill')).toBe(`url(#${idB})`);
    expect(q('.b .ath-ai-mark__spark').getAttribute('fill')).toBe(`url(#${idB})`);
    // The other variants take their colours from the stylesheet (tokens).
    expect(q('.a linearGradient')).toBeNull();
    expect(q('.a .ath-ai-mark__body').getAttribute('fill')).toBeNull();
  });

  it('with the wordmark, the text is what is read', () => {
    const { q } = render();
    expect(q('.w .ath-ai-mark__word').textContent?.replace(/\s+/g, ' ').trim()).toBe('Athenos AI');
    expect(q('.w svg').getAttribute('aria-hidden')).toBe('true');
    expect(q('.w svg').getAttribute('aria-label')).toBeNull();
  });

  it('keeps the path data to two decimals', () => {
    for (const d of [AI_MARK_SMALL.body, AI_MARK_SMALL.spark, AI_MARK_REGULAR.body]) {
      expect(d).not.toMatch(/\d\.\d{3}/);
    }
    expect(AI_MARK_SMALL.body).toContain('M9.3 15.4a1.7');
  });

  it('marks its variant on the host for the stylesheet', () => {
    const { fixture, q } = render();
    expect(q('.a').getAttribute('data-variant')).toBe('color');
    fixture.componentInstance.variant.set('mono');
    fixture.detectChanges();
    expect(q('.a').getAttribute('data-variant')).toBe('mono');
  });
});
