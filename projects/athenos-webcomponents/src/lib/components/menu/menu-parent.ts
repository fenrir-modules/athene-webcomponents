import { InjectionToken } from '@angular/core';

/** What a menu item needs from its menu (breaks the import cycle menu ↔ item). */
export interface AthMenuParent {
  itemActivated(item: { keepOpen(): boolean }): void;
  isOpen(): boolean;
}

export const ATH_MENU_PARENT = new InjectionToken<AthMenuParent>('ATH_MENU_PARENT');
