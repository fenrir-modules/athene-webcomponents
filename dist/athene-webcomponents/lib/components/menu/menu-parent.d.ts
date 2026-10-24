import { InjectionToken } from '@angular/core';
/** What a menu item needs from its menu (breaks the import cycle menu ↔ item). */
export interface AthMenuParent {
    itemActivated(item: {
        keepOpen(): boolean;
    }): void;
    isOpen(): boolean;
}
export declare const ATH_MENU_PARENT: InjectionToken<AthMenuParent>;
