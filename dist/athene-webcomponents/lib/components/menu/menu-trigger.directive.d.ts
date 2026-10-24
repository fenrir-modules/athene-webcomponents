import { AthOverlayTriggerBase } from '../floating/trigger';
import { AthMenuComponent } from './menu.component';
import * as i0 from "@angular/core";
/**
 * Makes a button the menu button of an `ath-menu`: click, Enter and Space
 * open it on the first item, ArrowDown on the first, ArrowUp on the last.
 * `aria-haspopup="menu"`, `aria-expanded` and `aria-controls` go on the real
 * control (the inner `<button>` of an `<ath-button>`), and the menu is
 * labelled by it.
 *
 * @example
 * <button type="button" [athMenuTrigger]="menu" aria-label="Actions">⋯</button>
 */
export declare class AthMenuTriggerDirective extends AthOverlayTriggerBase {
    readonly menu: import("@angular/core").InputSignal<AthMenuComponent>;
    protected popupKind(): string;
    protected isOpen(): boolean;
    protected popupId(): string;
    protected onClick(): void;
    protected onKeydown(event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthMenuTriggerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AthMenuTriggerDirective, "[athMenuTrigger]", ["athMenuTrigger"], { "menu": { "alias": "athMenuTrigger"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
