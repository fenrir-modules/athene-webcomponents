import { Directive, input } from '@angular/core';
import { AthOverlayTriggerBase } from '../floating/trigger';
import { AthMenuComponent } from './menu.component';

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
@Directive({
  selector: '[athMenuTrigger]',
  standalone: true,
  exportAs: 'athMenuTrigger',
  host: {
    '(click)': 'onClick()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class AthMenuTriggerDirective extends AthOverlayTriggerBase {
  readonly menu = input.required<AthMenuComponent>({ alias: 'athMenuTrigger' });

  protected popupKind(): string {
    return 'menu';
  }

  protected isOpen(): boolean {
    return this.menu().open();
  }

  protected popupId(): string {
    return this.menu().panelId;
  }

  protected onClick(): void {
    const menu = this.menu();
    menu.labelFrom(this.controlId());
    menu.toggle(this.host, 'first');
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const menu = this.menu();
    menu.labelFrom(this.controlId());
    menu.show(this.host, event.key === 'ArrowUp' ? 'last' : 'first');
  }
}
