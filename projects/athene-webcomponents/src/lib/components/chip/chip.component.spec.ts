import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bug } from 'lucide';
import { AthChipComponent } from './chip.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthChipComponent],
  template: `
    <div class="row">
      <ath-chip>plain</ath-chip>
      <ath-chip
        kind="label"
        color="rgb(1, 2, 3)"
        [removable]="true"
        name="frontend"
        (removed)="removed = removed + 1"
        >frontend</ath-chip
      >
      <ath-chip kind="epic" tooltip="Checkout revamp">Checkout revamp</ath-chip>
      <ath-chip kind="type" [icon]="bug" color="var(--red)" tooltip="Bug" />
      <ath-chip kind="type" [icon]="bug" color="var(--red)">Bug</ath-chip>
      <ath-chip kind="status" variant="warning">In progress</ath-chip>
      <ath-chip kind="count" [count]="3" tooltip="design, api, backend" />
    </div>
    <div class="shapes">
      <ath-chip>pill</ath-chip>
      <ath-chip shape="square">square</ath-chip>
      <ath-chip kind="label" color="rgb(1, 2, 3)" shape="square">label</ath-chip>
    </div>
  `,
})
class HostComponent {
  bug = Bug;
  removed = 0;
}

describe('AthChipComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  const chips = () =>
    Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.row .ath-chip')
    );
  const shapes = () =>
    Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.shapes .ath-chip')
    );

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({ imports: [HostComponent] }).createComponent(
      HostComponent
    );
    fixture.detectChanges();
  });

  it('draws every kind at the one chip height (20px)', () => {
    const heights = chips().map((c) => c.getBoundingClientRect().height);
    expect(heights.length).toBe(7);
    for (const h of heights) expect(h).toBe(20);
  });

  it('puts the label colour on the dot only', () => {
    const label = chips()[1];
    const dot = label.querySelector<HTMLElement>('.ath-chip__dot')!;
    expect(getComputedStyle(dot).backgroundColor).toBe('rgb(1, 2, 3)');
    expect(getComputedStyle(label).backgroundColor).not.toBe('rgb(1, 2, 3)');
  });

  it('removes without bubbling to a clickable row', () => {
    const rowClick = jasmine.createSpy('row');
    (fixture.nativeElement as HTMLElement)
      .querySelector('.row')!
      .addEventListener('click', rowClick);
    const button = chips()[1].querySelector<HTMLButtonElement>('.ath-chip__remove')!;
    expect(button.getAttribute('aria-label')).toBe('Remove frontend');
    button.click();
    expect(fixture.componentInstance.removed).toBe(1);
    expect(rowClick).not.toHaveBeenCalled();
  });

  it('gives the epic its bolt and the type its square', () => {
    expect(chips()[2].querySelector('.ath-chip__glyph')).not.toBeNull();
    const typeOnly = chips()[3];
    expect(typeOnly.querySelector('.ath-chip__square')).not.toBeNull();
    expect(typeOnly.querySelector('.ath-chip__sr')!.textContent).toBe('Bug');
    expect(typeOnly.getBoundingClientRect().width).toBe(16);
  });

  it('reads "+N" as "N more: names"', () => {
    const count = chips()[6];
    expect(count.textContent.trim()).toBe('+3');
    expect(count.getAttribute('aria-label')).toBe('3 more: design, api, backend');
  });

  it('gives a status chip a toned dot', () => {
    const status = chips()[5];
    expect(status.dataset['variant']).toBe('warning');
    expect(status.querySelector('.ath-chip__dot')).not.toBeNull();
  });

  it('draws a square tag as the plain grey tag of dense rows, same height, no dot', () => {
    const [pill, square, label] = shapes();
    const sq = getComputedStyle(square);
    expect(square.dataset['shape']).toBe('square');
    expect(sq.borderTopLeftRadius).toBe('4px');
    expect(getComputedStyle(pill).borderTopLeftRadius).not.toBe('4px');
    expect(sq.backgroundColor).not.toBe(getComputedStyle(pill).backgroundColor);
    expect(square.getBoundingClientRect().height).toBe(20);
    expect(square.querySelector('.ath-chip__dot')).toBeNull();
    // Only a tag takes the shape; a label keeps its dot and pill.
    expect(label.dataset['shape']).toBeUndefined();
    expect(label.querySelector('.ath-chip__dot')).not.toBeNull();
  });
});
