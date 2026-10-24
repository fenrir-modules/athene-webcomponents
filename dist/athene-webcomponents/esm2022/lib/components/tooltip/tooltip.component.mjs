import { Directive, ElementRef, Renderer2, inject, input } from '@angular/core';
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
    constructor() {
        /** Tooltip text */
        this.text = input('', { alias: 'athTooltip' });
        /** Tooltip position */
        this.tooltipPosition = input('top');
        this.el = inject(ElementRef);
        this.renderer = inject(Renderer2);
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
        if (!this.text())
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
        const tooltip = this.renderer.createElement('div');
        this.tooltipElement = tooltip;
        this.renderer.addClass(tooltip, 'ath-tooltip');
        this.renderer.addClass(tooltip, `ath-tooltip--${this.tooltipPosition()}`);
        tooltip.textContent = this.text();
        this.renderer.appendChild(document.body, tooltip);
        this.positionTooltip();
        // Next frame, so the CSS transition runs from the hidden state (not change detection).
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
        switch (this.tooltipPosition()) {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.14", type: AthTooltipDirective, isStandalone: true, selector: "[athTooltip]", inputs: { text: { classPropertyName: "text", publicName: "athTooltip", isSignal: true, isRequired: false, transformFunction: null }, tooltipPosition: { classPropertyName: "tooltipPosition", publicName: "tooltipPosition", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[athTooltip]',
                    standalone: true,
                }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBYSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPM0Y7Ozs7Ozs7R0FPRztBQUtILE1BQU0sT0FBTyxtQkFBbUI7SUFpQjlCO1FBaEJBLG1CQUFtQjtRQUNWLFNBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7UUFFbkQsdUJBQXVCO1FBQ2Qsb0JBQWUsR0FBRyxLQUFLLENBQWtCLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE9BQUUsR0FBRyxNQUFNLENBQTBCLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELGFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsbUJBQWMsR0FBdUIsSUFBSSxDQUFDO1FBQzFDLGdCQUFXLEdBQXlDLElBQUksQ0FBQztRQUN6RCxnQkFBVyxHQUF5QyxJQUFJLENBQUM7UUFFekQsdUJBQWtCLEdBQXdCLElBQUksQ0FBQztRQUMvQyx1QkFBa0IsR0FBd0IsSUFBSSxDQUFDO1FBR3JELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQ3ZGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FDWixDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENB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QyxjQUFjLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDOytHQWpIVSxtQkFBbUI7bUdBQW5CLG1CQUFtQjs7NEZBQW5CLG1CQUFtQjtrQkFKL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgaW5qZWN0LCBpbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRvb2x0aXAgcG9zaXRpb24gdmFyaWFudHNcbiAqL1xuZXhwb3J0IHR5cGUgVG9vbHRpcFBvc2l0aW9uID0gJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCc7XG5cbi8qKlxuICogQXRoZW5lIFRvb2x0aXAgRGlyZWN0aXZlXG4gKlxuICogU2hvd3MgYSB0b29sdGlwIG9uIGhvdmVyLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YnV0dG9uIFthdGhUb29sdGlwXT1cIidDbGljayB0byBzYXZlJ1wiIHRvb2x0aXBQb3NpdGlvbj1cImJvdHRvbVwiPlNhdmU8L2J1dHRvbj5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2F0aFRvb2x0aXBdJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbn0pXG5leHBvcnQgY2xhc3MgQXRoVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBUb29sdGlwIHRleHQgKi9cbiAgcmVhZG9ubHkgdGV4dCA9IGlucHV0KCcnLCB7IGFsaWFzOiAnYXRoVG9vbHRpcCcgfSk7XG5cbiAgLyoqIFRvb2x0aXAgcG9zaXRpb24gKi9cbiAgcmVhZG9ubHkgdG9vbHRpcFBvc2l0aW9uID0gaW5wdXQ8VG9vbHRpcFBvc2l0aW9uPigndG9wJyk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbCA9IGluamVjdDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj4oRWxlbWVudFJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyZXIgPSBpbmplY3QoUmVuZGVyZXIyKTtcblxuICBwcml2YXRlIHRvb2x0aXBFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNob3dUaW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGhpZGVUaW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgbW91c2VFbnRlckxpc3RlbmVyOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBtb3VzZUxlYXZlTGlzdGVuZXI6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubW91c2VFbnRlckxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicsICgpID0+XG4gICAgICB0aGlzLnNob3coKVxuICAgICk7XG4gICAgdGhpcy5tb3VzZUxlYXZlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdtb3VzZWxlYXZlJywgKCkgPT5cbiAgICAgIHRoaXMuaGlkZSgpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlVG9vbHRpcCgpO1xuICAgIGlmICh0aGlzLm1vdXNlRW50ZXJMaXN0ZW5lcikgdGhpcy5tb3VzZUVudGVyTGlzdGVuZXIoKTtcbiAgICBpZiAodGhpcy5tb3VzZUxlYXZlTGlzdGVuZXIpIHRoaXMubW91c2VMZWF2ZUxpc3RlbmVyKCk7XG4gIH1cblxuICBwcml2YXRlIHNob3coKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRleHQoKSkgcmV0dXJuO1xuICAgIGlmICh0aGlzLmhpZGVUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5oaWRlVGltZW91dCk7XG4gICAgICB0aGlzLmhpZGVUaW1lb3V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnNob3dUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNyZWF0ZVRvb2x0aXAoKTtcbiAgICB9LCAzMDApO1xuICB9XG5cbiAgcHJpdmF0ZSBoaWRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNob3dUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5zaG93VGltZW91dCk7XG4gICAgICB0aGlzLnNob3dUaW1lb3V0ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLmhpZGVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZVRvb2x0aXAoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVUb29sdGlwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2x0aXBFbGVtZW50KSByZXR1cm47XG5cbiAgICBjb25zdCB0b29sdGlwOiBIVE1MRWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy50b29sdGlwRWxlbWVudCA9IHRvb2x0aXA7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0b29sdGlwLCAnYXRoLXRvb2x0aXAnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRvb2x0aXAsIGBhdGgtdG9vbHRpcC0tJHt0aGlzLnRvb2x0aXBQb3NpdGlvbigpfWApO1xuICAgIHRvb2x0aXAudGV4dENvbnRlbnQgPSB0aGlzLnRleHQoKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgdG9vbHRpcCk7XG4gICAgdGhpcy5wb3NpdGlvblRvb2x0aXAoKTtcblxuICAgIC8vIE5leHQgZnJhbWUsIHNvIHRoZSBDU1MgdHJhbnNpdGlvbiBydW5zIGZyb20gdGhlIGhpZGRlbiBzdGF0ZSAobm90IGNoYW5nZSBkZXRlY3Rpb24pLlxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy50b29sdGlwRWxlbWVudCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMudG9vbHRpcEVsZW1lbnQsICdhdGgtdG9vbHRpcC0tdmlzaWJsZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3NpdGlvblRvb2x0aXAoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRvb2x0aXBFbGVtZW50KSByZXR1cm47XG5cbiAgICBjb25zdCBob3N0UmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB0b29sdGlwUmVjdCA9IHRoaXMudG9vbHRpcEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgZ2FwID0gODtcblxuICAgIGxldCB0b3AgPSAwO1xuICAgIGxldCBsZWZ0ID0gMDtcblxuICAgIHN3aXRjaCAodGhpcy50b29sdGlwUG9zaXRpb24oKSkge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgdG9wID0gaG9zdFJlY3QudG9wIC0gdG9vbHRpcFJlY3QuaGVpZ2h0IC0gZ2FwO1xuICAgICAgICBsZWZ0ID0gaG9zdFJlY3QubGVmdCArIChob3N0UmVjdC53aWR0aCAtIHRvb2x0aXBSZWN0LndpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgdG9wID0gaG9zdFJlY3QuYm90dG9tICsgZ2FwO1xuICAgICAgICBsZWZ0ID0gaG9zdFJlY3QubGVmdCArIChob3N0UmVjdC53aWR0aCAtIHRvb2x0aXBSZWN0LndpZHRoKSAvIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIHRvcCA9IGhvc3RSZWN0LnRvcCArIChob3N0UmVjdC5oZWlnaHQgLSB0b29sdGlwUmVjdC5oZWlnaHQpIC8gMjtcbiAgICAgICAgbGVmdCA9IGhvc3RSZWN0LmxlZnQgLSB0b29sdGlwUmVjdC53aWR0aCAtIGdhcDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgIHRvcCA9IGhvc3RSZWN0LnRvcCArIChob3N0UmVjdC5oZWlnaHQgLSB0b29sdGlwUmVjdC5oZWlnaHQpIC8gMjtcbiAgICAgICAgbGVmdCA9IGhvc3RSZWN0LnJpZ2h0ICsgZ2FwO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcEVsZW1lbnQsICd0b3AnLCBgJHt0b3B9cHhgKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMudG9vbHRpcEVsZW1lbnQsICdsZWZ0JywgYCR7bGVmdH1weGApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVUb29sdGlwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2x0aXBFbGVtZW50KSB7XG4gICAgICB0aGlzLnRvb2x0aXBFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgdGhpcy50b29sdGlwRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICB9XG59XG4iXX0=