import { Directive, Input } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBdUQsTUFBTSxlQUFlLENBQUM7O0FBT3RHOzs7Ozs7O0dBT0c7QUFLSCxNQUFNLE9BQU8sbUJBQW1CO0lBYzlCLFlBQ1UsRUFBYyxFQUNkLFFBQW1CO1FBRG5CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBZjdCLG1CQUFtQjtRQUNFLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFL0IsdUJBQXVCO1FBQ2Qsb0JBQWUsR0FBb0IsS0FBSyxDQUFDO1FBRTFDLG1CQUFjLEdBQXVCLElBQUksQ0FBQztRQUMxQyxnQkFBVyxHQUF5QyxJQUFJLENBQUM7UUFDekQsZ0JBQVcsR0FBeUMsSUFBSSxDQUFDO1FBRXpELHVCQUFrQixHQUF3QixJQUFJLENBQUM7UUFDL0MsdUJBQWtCLEdBQXdCLElBQUksQ0FBQztRQU1yRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENB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QUFuQixtQkFBbUI7OzRGQUFuQixtQkFBbUI7a0JBSi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFVBQVUsRUFBRSxJQUFJO2lCQUNqQjt1R0FHc0IsSUFBSTtzQkFBeEIsS0FBSzt1QkFBQyxZQUFZO2dCQUdWLGVBQWU7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUb29sdGlwIHBvc2l0aW9uIHZhcmlhbnRzXG4gKi9cbmV4cG9ydCB0eXBlIFRvb2x0aXBQb3NpdGlvbiA9ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnO1xuXG4vKipcbiAqIEF0aGVuZSBUb29sdGlwIERpcmVjdGl2ZVxuICpcbiAqIFNob3dzIGEgdG9vbHRpcCBvbiBob3Zlci5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGJ1dHRvbiBbYXRoVG9vbHRpcF09XCInQ2xpY2sgdG8gc2F2ZSdcIiB0b29sdGlwUG9zaXRpb249XCJib3R0b21cIj5TYXZlPC9idXR0b24+XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thdGhUb29sdGlwXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKiogVG9vbHRpcCB0ZXh0ICovXG4gIEBJbnB1dCgnYXRoVG9vbHRpcCcpIHRleHQgPSAnJztcblxuICAvKiogVG9vbHRpcCBwb3NpdGlvbiAqL1xuICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246IFRvb2x0aXBQb3NpdGlvbiA9ICd0b3AnO1xuXG4gIHByaXZhdGUgdG9vbHRpcEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2hvd1RpbWVvdXQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgaGlkZVRpbWVvdXQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBtb3VzZUVudGVyTGlzdGVuZXI6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG1vdXNlTGVhdmVMaXN0ZW5lcjogKCgpID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICkge1xuICAgIHRoaXMubW91c2VFbnRlckxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicsICgpID0+IHRoaXMuc2hvdygpKTtcbiAgICB0aGlzLm1vdXNlTGVhdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ21vdXNlbGVhdmUnLCAoKSA9PiB0aGlzLmhpZGUoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZVRvb2x0aXAoKTtcbiAgICBpZiAodGhpcy5tb3VzZUVudGVyTGlzdGVuZXIpIHRoaXMubW91c2VFbnRlckxpc3RlbmVyKCk7XG4gICAgaWYgKHRoaXMubW91c2VMZWF2ZUxpc3RlbmVyKSB0aGlzLm1vdXNlTGVhdmVMaXN0ZW5lcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG93KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy50ZXh0KSByZXR1cm47XG4gICAgaWYgKHRoaXMuaGlkZVRpbWVvdXQpIHsgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpbWVvdXQpOyB0aGlzLmhpZGVUaW1lb3V0ID0gbnVsbDsgfVxuXG4gICAgdGhpcy5zaG93VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jcmVhdGVUb29sdGlwKCk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIHByaXZhdGUgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaG93VGltZW91dCkgeyBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZW91dCk7IHRoaXMuc2hvd1RpbWVvdXQgPSBudWxsOyB9XG5cbiAgICB0aGlzLmhpZGVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZVRvb2x0aXAoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVUb29sdGlwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2x0aXBFbGVtZW50KSByZXR1cm47XG5cbiAgICB0aGlzLnRvb2x0aXBFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudG9vbHRpcEVsZW1lbnQsICdhdGgtdG9vbHRpcCcpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwRWxlbWVudCwgYGF0aC10b29sdGlwLS0ke3RoaXMudG9vbHRpcFBvc2l0aW9ufWApO1xuICAgIHRoaXMudG9vbHRpcEVsZW1lbnQhLnRleHRDb250ZW50ID0gdGhpcy50ZXh0O1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5ib2R5LCB0aGlzLnRvb2x0aXBFbGVtZW50KTtcbiAgICB0aGlzLnBvc2l0aW9uVG9vbHRpcCgpO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRvb2x0aXBFbGVtZW50KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy50b29sdGlwRWxlbWVudCwgJ2F0aC10b29sdGlwLS12aXNpYmxlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHBvc2l0aW9uVG9vbHRpcCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudG9vbHRpcEVsZW1lbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGhvc3RSZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHRvb2x0aXBSZWN0ID0gdGhpcy50b29sdGlwRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBnYXAgPSA4O1xuXG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IGxlZnQgPSAwO1xuXG4gICAgc3dpdGNoICh0aGlzLnRvb2x0aXBQb3NpdGlvbikge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgdG9wID0gaG9zdFJlY3QudG9wIC0gdG9vbHRpcFJlY3QuaGVpZ2h0IC0gZ2FwO1xuICAgICAgICBsZWZ0ID0gaG9zdFJlY3QubGVmdCArIChob3N0UmVjdC53aWR0aCAtIHRvb2x0aXBSZWN0LndpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdG9wID0gaG9zdFJlY3QuYm90dG9tICsgZ2FwO1xuICAgICAgICBsZWZ0ID0gaG9zdFJlY3QubGVmdCArIChob3N0UmVjdC53aWR0aCAtIHRvb2x0aXBSZWN0LndpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRvcCA9IGhvc3RSZWN0LnRvcCArIChob3N0UmVjdC5oZWlnaHQgLSB0b29sdGlwUmVjdC5oZWlnaHQpIC8gMjtcbiAgICAgICAgbGVmdCA9IGhvc3RSZWN0LmxlZnQgLSB0b29sdGlwUmVjdC53aWR0aCAtIGdhcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRvcCA9IGhvc3RSZWN0LnRvcCArIChob3N0UmVjdC5oZWlnaHQgLSB0b29sdGlwUmVjdC5oZWlnaHQpIC8gMjtcbiAgICAgICAgbGVmdCA9IGhvc3RSZWN0LnJpZ2h0ICsgZ2FwO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcEVsZW1lbnQsICd0b3AnLCBgJHt0b3B9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcEVsZW1lbnQsICdsZWZ0JywgYCR7bGVmdH1weGApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVUb29sdGlwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2x0aXBFbGVtZW50KSB7XG4gICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgdGhpcy50b29sdGlwRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=