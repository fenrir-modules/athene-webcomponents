import { OnDestroy } from '@angular/core';
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
    /** Tooltip text */
    readonly text: import("@angular/core").InputSignal<string>;
    /** Tooltip position */
    readonly tooltipPosition: import("@angular/core").InputSignal<TooltipPosition>;
    private readonly el;
    private readonly renderer;
    private tooltipElement;
    private showTimeout;
    private hideTimeout;
    private mouseEnterListener;
    private mouseLeaveListener;
    constructor();
    ngOnDestroy(): void;
    private show;
    private hide;
    private createTooltip;
    private positionTooltip;
    private removeTooltip;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AthTooltipDirective, "[athTooltip]", never, { "text": { "alias": "athTooltip"; "required": false; "isSignal": true; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
