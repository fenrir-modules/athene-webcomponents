import { Directive, Input, } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Athene Tooltip Directive
 *
 * Shows a tooltip on hover.
 *
 * @example
 * <button [athTooltip]="'Click to save'" tooltipPosition="bottom">Save</button>
 */
export class AthTooltipDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        /** Tooltip text */
        this.text = '';
        /** Tooltip position */
        this.tooltipPosition = 'top';
        this.tooltipElement = null;
        this.showTimeout = null;
        this.hideTimeout = null;
        this.mouseEnterListener = null;
        this.mouseLeaveListener = null;
        this.mouseEnterListener = this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.show());
        this.mouseLeaveListener = this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hide());
    }
    ngOnDestroy() {
        this.removeTooltip();
        if (this.mouseEnterListener)
            this.mouseEnterListener();
        if (this.mouseLeaveListener)
            this.mouseLeaveListener();
    }
    show() {
        if (!this.text)
            return;
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        this.showTimeout = setTimeout(() => {
            this.createTooltip();
        }, 300);
    }
    hide() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        this.hideTimeout = setTimeout(() => {
            this.removeTooltip();
        }, 100);
    }
    createTooltip() {
        if (this.tooltipElement)
            return;
        this.tooltipElement = this.renderer.createElement('div');
        this.renderer.addClass(this.tooltipElement, 'ath-tooltip');
        this.renderer.addClass(this.tooltipElement, `ath-tooltip--${this.tooltipPosition}`);
        this.tooltipElement.textContent = this.text;
        this.renderer.appendChild(document.body, this.tooltipElement);
        this.positionTooltip();
        requestAnimationFrame(() => {
            if (this.tooltipElement) {
                this.renderer.addClass(this.tooltipElement, 'ath-tooltip--visible');
            }
        });
    }
    positionTooltip() {
        if (!this.tooltipElement)
            return;
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
    removeTooltip() {
        if (this.tooltipElement) {
            this.tooltipElement.remove();
            this.tooltipElement = null;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTooltipDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.14", type: AthTooltipDirective, isStandalone: true, selector: "[athTooltip]", inputs: { text: ["athTooltip", "text"], tooltipPosition: "tooltipPosition" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[athTooltip]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { text: [{
                type: Input,
                args: ['athTooltip']
            }], tooltipPosition: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssR0FLTixNQUFNLGVBQWUsQ0FBQzs7QUFPdkI7Ozs7Ozs7R0FPRztBQUtILE1BQU0sT0FBTyxtQkFBbUI7SUFjOUIsWUFDVSxFQUFjLEVBQ2QsUUFBbUI7UUFEbkIsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFmN0IsbUJBQW1CO1FBQ0UsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUUvQix1QkFBdUI7UUFDZCxvQkFBZSxHQUFvQixLQUFLLENBQUM7UUFFMUMsbUJBQWMsR0FBdUIsSUFBSSxDQUFDO1FBQzFDLGdCQUFXLEdBQXlDLElBQUksQ0FBQztRQUN6RCxnQkFBVyxHQUF5QyxJQUFJLENBQUM7UUFFekQsdUJBQWtCLEdBQXdCLElBQUksQ0FBQztRQUMvQyx1QkFBa0IsR0FBd0IsSUFBSSxDQUFDO1FBTXJELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQ3ZGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FDWixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsQ0FDdkYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUNaLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FB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O21HQUFuQixtQkFBbUI7OzRGQUFuQixtQkFBbUI7a0JBSi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjt1R0FHc0IsSUFBSTtzQkFBeEIsS0FBSzt1QkFBQyxZQUFZO2dCQUdWLGVBQWU7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRvb2x0aXAgcG9zaXRpb24gdmFyaWFudHNcbiAqL1xuZXhwb3J0IHR5cGUgVG9vbHRpcFBvc2l0aW9uID0gJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCc7XG5cbi8qKlxuICogQXRoZW5lIFRvb2x0aXAgRGlyZWN0aXZlXG4gKlxuICogU2hvd3MgYSB0b29sdGlwIG9uIGhvdmVyLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YnV0dG9uIFthdGhUb29sdGlwXT1cIidDbGljayB0byBzYXZlJ1wiIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbVwiPlNhdmU8L2J1dHRvbj5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2F0aFRvb2x0aXBdJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgQXRoVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBUb29sdGlwIHRleHQgKi9cbiAgQElucHV0KCdhdGhUb29sdGlwJykgdGV4dCA9ICcnO1xuXG4gIC8qKiBUb29sdGlwIHBvc2l0aW9uICovXG4gIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvbjogVG9vbHRpcFBvc2l0aW9uID0gJ3RvcCc7XG5cbiAgcHJpdmF0ZSB0b29sdGlwRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzaG93VGltZW91dDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBoaWRlVGltZW91dDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIG1vdXNlRW50ZXJMaXN0ZW5lcjogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbW91c2VMZWF2ZUxpc3RlbmVyOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICB0aGlzLm1vdXNlRW50ZXJMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21vdXNlZW50ZXInLCAoKSA9PlxuICAgICAgdGhpcy5zaG93KClcbiAgICApO1xuICAgIHRoaXMubW91c2VMZWF2ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbW91c2VsZWF2ZScsICgpID0+XG4gICAgICB0aGlzLmhpZGUoKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZVRvb2x0aXAoKTtcbiAgICBpZiAodGhpcy5tb3VzZUVudGVyTGlzdGVuZXIpIHRoaXMubW91c2VFbnRlckxpc3RlbmVyKCk7XG4gICAgaWYgKHRoaXMubW91c2VMZWF2ZUxpc3RlbmVyKSB0aGlzLm1vdXNlTGVhdmVMaXN0ZW5lcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy50ZXh0KSByZXR1cm47XG4gICAgaWYgKHRoaXMuaGlkZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhpZGVUaW1lb3V0KTtcbiAgICAgIHRoaXMuaGlkZVRpbWVvdXQgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuc2hvd1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY3JlYXRlVG9vbHRpcCgpO1xuICAgIH0sIDMwMCk7XG4gIH1cblxuICBwcml2YXRlIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2hvd1RpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dUaW1lb3V0KTtcbiAgICAgIHRoaXMuc2hvd1RpbWVvdXQgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMuaGlkZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlVG9vbHRpcCgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbHRpcEVsZW1lbnQpIHJldHVybjtcblxuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwRWxlbWVudCwgJ2F0aC10b29sdGlwJyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXBFbGVtZW50LCBgYXRoLXRvb2x0aXAtLSR7dGhpcy50b29sdGlwUG9zaXRpb259YCk7XG4gICAgdGhpcy50b29sdGlwRWxlbWVudCEudGV4dENvbnRlbnQgPSB0aGlzLnRleHQ7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHksIHRoaXMudG9vbHRpcEVsZW1lbnQpO1xuICAgIHRoaXMucG9zaXRpb25Ub29sdGlwKCk7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudG9vbHRpcEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnRvb2x0aXBFbGVtZW50LCAnYXRoLXRvb2x0aXAtLXZpc2libGUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcG9zaXRpb25Ub29sdGlwKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy50b29sdGlwRWxlbWVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaG9zdFJlY3QgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgdG9vbHRpcFJlY3QgPSB0aGlzLnRvb2x0aXBFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGdhcCA9IDg7XG5cbiAgICBsZXQgdG9wID0gMDtcbiAgICBsZXQgbGVmdCA9IDA7XG5cbiAgICBzd2l0Y2ggKHRoaXMudG9vbHRpcFBvc2l0aW9uKSB7XG4gICAgICBjYXNlICd0b3AnOlxuICAgICAgICB0b3AgPSBob3N0UmVjdC50b3AgLSB0b29sdGlwUmVjdC5oZWlnaHQgLSBnYXA7XG4gICAgICAgIGxlZnQgPSBob3N0UmVjdC5sZWZ0ICsgKGhvc3RSZWN0LndpZHRoIC0gdG9vbHRpcFJlY3Qud2lkdGgpIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICB0b3AgPSBob3N0UmVjdC5ib3R0b20gKyBnYXA7XG4gICAgICAgIGxlZnQgPSBob3N0UmVjdC5sZWZ0ICsgKGhvc3RSZWN0LndpZHRoIC0gdG9vbHRpcFJlY3Qud2lkdGgpIC8gMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgdG9wID0gaG9zdFJlY3QudG9wICsgKGhvc3RSZWN0LmhlaWdodCAtIHRvb2x0aXBSZWN0LmhlaWdodCkgLyAyO1xuICAgICAgICBsZWZ0ID0gaG9zdFJlY3QubGVmdCAtIHRvb2x0aXBSZWN0LndpZHRoIC0gZ2FwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgdG9wID0gaG9zdFJlY3QudG9wICsgKGhvc3RSZWN0LmhlaWdodCAtIHRvb2x0aXBSZWN0LmhlaWdodCkgLyAyO1xuICAgICAgICBsZWZ0ID0gaG9zdFJlY3QucmlnaHQgKyBnYXA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwRWxlbWVudCwgJ3RvcCcsIGAke3RvcH1weGApO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy50b29sdGlwRWxlbWVudCwgJ2xlZnQnLCBgJHtsZWZ0fXB4YCk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVRvb2x0aXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbHRpcEVsZW1lbnQpIHtcbiAgICAgIHRoaXMudG9vbHRpcEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICB0aGlzLnRvb2x0aXBFbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==