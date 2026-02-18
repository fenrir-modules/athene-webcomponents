import { Directive, Input, ElementRef, OnDestroy, ChangeDetectorRef, Renderer2 } from '@angular/core';

/**
 * Tooltip position variants
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Athene Tooltip Directive
 *
 * Shows a tooltip on hover.
 *
 * @example
 * <button [athTooltip]="'Click to save'" tooltipPosition="bottom">Save</button>
 */
@Directive({
  selector: '[athTooltip]',
  standalone: true,
})
export class AthTooltipDirective implements OnDestroy {
  /** Tooltip text */
  @Input('athTooltip') text = '';

  /** Tooltip position */
  @Input() tooltipPosition: TooltipPosition = 'top';

  private tooltipElement: HTMLElement | null = null;
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  private mouseEnterListener: (() => void) | null = null;
  private mouseLeaveListener: (() => void) | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.mouseEnterListener = this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.show());
    this.mouseLeaveListener = this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hide());
  }

  ngOnDestroy(): void {
    this.removeTooltip();
    if (this.mouseEnterListener) this.mouseEnterListener();
    if (this.mouseLeaveListener) this.mouseLeaveListener();
  }

  private show(): void {
    if (!this.text) return;
    if (this.hideTimeout) { clearTimeout(this.hideTimeout); this.hideTimeout = null; }

    this.showTimeout = setTimeout(() => {
      this.createTooltip();
    }, 300);
  }

  private hide(): void {
    if (this.showTimeout) { clearTimeout(this.showTimeout); this.showTimeout = null; }

    this.hideTimeout = setTimeout(() => {
      this.removeTooltip();
    }, 100);
  }

  private createTooltip(): void {
    if (this.tooltipElement) return;

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'ath-tooltip');
    this.renderer.addClass(this.tooltipElement, `ath-tooltip--${this.tooltipPosition}`);
    this.tooltipElement!.textContent = this.text;

    this.renderer.appendChild(document.body, this.tooltipElement);
    this.positionTooltip();

    requestAnimationFrame(() => {
      if (this.tooltipElement) {
        this.renderer.addClass(this.tooltipElement, 'ath-tooltip--visible');
      }
    });
  }

  private positionTooltip(): void {
    if (!this.tooltipElement) return;

    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostRect.top - tooltipRect.height - gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + gap;
        left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + gap;
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }

  private removeTooltip(): void {
    if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
    }
  }
}
