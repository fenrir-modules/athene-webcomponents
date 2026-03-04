import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
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
export declare class AthTooltipDirective implements OnDestroy {
    private el;
    private renderer;
    /** Tooltip text */
    text: string;
    /** Tooltip position */
    tooltipPosition: TooltipPosition;
    private tooltipElement;
    private showTimeout;
    private hideTimeout;
    private mouseEnterListener;
    private mouseLeaveListener;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnDestroy(): void;
    private show;
    private hide;
    private createTooltip;
    private positionTooltip;
    private removeTooltip;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AthTooltipDirective, "[athTooltip]", never, { "text": { "alias": "athTooltip"; "required": false; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; }; }, {}, never, never, true, never>;
}
