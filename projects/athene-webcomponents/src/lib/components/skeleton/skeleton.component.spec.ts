import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ATH_LABELS } from '../../i18n/labels';
import { AthSkeletonComponent, AthSkeletonListComponent } from './skeleton.component';

describe('AthSkeletonComponent', () => {
  let fixture: ComponentFixture<AthSkeletonComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({ imports: [AthSkeletonComponent] }).createComponent(
      AthSkeletonComponent
    );
  });

  it('is sized like a real row (--row-h) and hidden from assistive tech', () => {
    fixture.componentRef.setInput('variant', 'row');
    fixture.detectChanges();
    expect(host().getBoundingClientRect().height).toBe(44);
    expect(host().getAttribute('aria-hidden')).toBe('true');
  });

  it('is a text line inside a 1.5em line box', () => {
    fixture.componentRef.setInput('variant', 'line');
    fixture.componentRef.setInput('width', '60%');
    fixture.detectChanges();
    host().style.fontSize = '20px';
    const style = getComputedStyle(host());
    expect(parseFloat(style.height)).toBe(16);
    expect(parseFloat(style.marginTop) * 2 + 16).toBe(30);
    expect(host().style.width).toBe('60%');
  });

  it('pulses unless asked not to', () => {
    fixture.detectChanges();
    expect(host().classList).toContain('ath-skeleton--animated');
    fixture.componentRef.setInput('animated', false);
    fixture.detectChanges();
    expect(getComputedStyle(host()).animationName).toBe('none');
  });

  it('stops pulsing under prefers-reduced-motion', () => {
    fixture.detectChanges();
    const still: string[] = [];
    for (const sheet of Array.from(document.styleSheets)) {
      for (const rule of Array.from(sheet.cssRules)) {
        if (
          !(rule instanceof CSSMediaRule) ||
          !rule.conditionText.includes('prefers-reduced-motion')
        )
          continue;
        for (const inner of Array.from(rule.cssRules)) {
          if (inner instanceof CSSStyleRule && inner.style.animationName === 'none') {
            still.push(inner.selectorText);
          }
        }
      }
    }
    expect(still.some((s) => s.includes('ath-skeleton--animated'))).toBeTrue();
  });
});

describe('AthSkeletonListComponent', () => {
  it('draws count rows the height of real rows and announces loading once', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [AthSkeletonListComponent],
      providers: [{ provide: ATH_LABELS, useValue: { loading: () => 'Lädt' } }],
    }).createComponent(AthSkeletonListComponent);
    fixture.componentRef.setInput('count', 3);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const cells = el.querySelectorAll<HTMLElement>('.ath-skeleton-list__cell');
    expect(cells.length).toBe(3);
    expect(cells[0].getBoundingClientRect().height).toBe(44);
    expect(el.querySelector('[role="status"]')!.textContent!.trim()).toBe('Lädt');
  });

  it('lays out a card grid', () => {
    const fixture = TestBed.configureTestingModule({
      imports: [AthSkeletonListComponent],
    }).createComponent(AthSkeletonListComponent);
    fixture.componentRef.setInput('variant', 'card-grid');
    fixture.componentRef.setInput('count', 4);
    fixture.detectChanges();
    const cells = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.ath-skeleton-list__cell'
    );
    expect(cells.length).toBe(4);
    expect(cells[0].getBoundingClientRect().height).toBe(168);
  });
});
