import { TestBed } from '@angular/core/testing';
import { AthSparklineComponent, sparklineGeometry } from './sparkline.component';

describe('sparklineGeometry', () => {
  it('is null below two samples', () => {
    expect(sparklineGeometry([], 70, 22)).toBeNull();
    expect(sparklineGeometry([4], 70, 22)).toBeNull();
  });

  it('spans the box with a 1px inset and ends on the last value', () => {
    const g = sparklineGeometry([0, 10], 70, 22)!;
    expect(g.linePath).toBe('M1.0,20.0 L69.0,2.0');
    expect([g.lastX, g.lastY]).toEqual([69, 2]);
    expect(g.areaPath).toBe('M1.0,20.0 L69.0,2.0 L 69,21 L 1,21 Z');
  });

  it('draws a flat series mid-way without dividing by zero', () => {
    const g = sparklineGeometry([5, 5, 5], 70, 22)!;
    expect(g.linePath).not.toContain('NaN');
  });
});

describe('AthSparklineComponent', () => {
  it('renders a decorative 70×22 svg by default', () => {
    const fixture = TestBed.createComponent(AthSparklineComponent);
    fixture.componentRef.setInput('data', [1, 3, 2]);
    fixture.detectChanges();
    const svg = (fixture.nativeElement as HTMLElement).querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('70');
    expect(svg.getAttribute('height')).toBe('22');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.querySelector('circle')).not.toBeNull();
  });
});
