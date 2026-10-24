import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthPanelComponent } from './panel.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthPanelComponent],
  template: `
    <ath-panel id="full" title="Active tickets" count="5 open">
      <button athPanelActions type="button">Filter</button>
      <p>body</p>
      <footer athPanelFoot>foot</footer>
    </ath-panel>
    <ath-panel id="bare"><p>only a body</p></ath-panel>
    <ath-panel id="loading" title="Loading" [loading]="true" [skeletonRows]="3"
      ><p>hidden</p></ath-panel
    >
    <ath-panel id="clip" [scroll]="false" overflow="clip"><p>sticky inside</p></ath-panel>
  `,
})
class HostComponent {}

describe('AthPanelComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const panel = (id: string) =>
    (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(`#${id}`)!;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(
      HostComponent
    );
    fixture.detectChanges();
  });

  it('draws the head row at --panel-head-h with title, count and actions', () => {
    const head = panel('full').querySelector<HTMLElement>('.ath-panel__head')!;
    expect(head.getBoundingClientRect().height).toBe(40);
    expect(head.querySelector('h2')!.textContent).toBe('Active tickets');
    expect(head.querySelector('.ath-panel__count')!.textContent).toBe('5 open');
    expect(head.querySelector('button')!.textContent).toBe('Filter');
    expect(panel('full').lastElementChild!.textContent).toBe('foot');
  });

  it('omits an empty head row', () => {
    const head = panel('bare').querySelector<HTMLElement>('.ath-panel__head')!;
    expect(getComputedStyle(head).display).toBe('none');
  });

  it('shows row placeholders while loading', () => {
    const body = panel('loading').querySelector('.ath-panel__body')!;
    expect(body.querySelectorAll('ath-skeleton').length).toBe(3);
    expect(body.textContent).not.toContain('hidden');
    expect(panel('loading').getAttribute('aria-busy')).toBe('true');
  });

  it('uses the panel tokens for its frame', () => {
    const style = getComputedStyle(panel('full'));
    expect(style.borderTopLeftRadius).toBe('10px');
    expect(style.borderTopWidth).toBe('1px');
  });

  it('clips without becoming a scroll container when overflow="clip"', () => {
    // Needs the lib's global styles only for the frame; overflow is the host rule.
    expect(getComputedStyle(panel('full')).overflow).toBe('hidden');
    expect(panel('clip').getAttribute('data-overflow')).toBe('clip');
    expect(getComputedStyle(panel('clip')).overflow).toBe('clip');
    expect(panel('full').hasAttribute('data-overflow')).toBeFalse();
  });
});
