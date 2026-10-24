import { AthOverlayTriggerBase } from '../floating/trigger';
import { AthPopoverComponent } from './popover.component';
import * as i0 from "@angular/core";
/**
 * Opens an `ath-popover` from a button and anchors it there. Sets
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control
 * (the inner `<button>` of an `<ath-button>`).
 *
 * @example
 * <button type="button" [athPopoverTrigger]="pop">Filter</button>
 * <ath-popover #pop ariaLabel="Filter">…</ath-popover>
 */
export declare class AthPopoverTriggerDirective extends AthOverlayTriggerBase {
    readonly popover: import("@angular/core").InputSignal<AthPopoverComponent>;
    /** `aria-haspopup` value; `listbox` for a picker without a search field. */
    readonly popupType: import("@angular/core").InputSignal<"dialog" | "menu" | "listbox">;
    protected popupKind(): string;
    protected isOpen(): boolean;
    protected popupId(): string;
    protected onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPopoverTriggerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AthPopoverTriggerDirective, "[athPopoverTrigger]", ["athPopoverTrigger"], { "popover": { "alias": "athPopoverTrigger"; "required": true; "isSignal": true; }; "popupType": { "alias": "popupType"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
