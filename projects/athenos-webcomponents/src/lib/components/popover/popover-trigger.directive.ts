import { Directive, input } from '@angular/core';
import { AthOverlayTriggerBase } from '../floating/trigger';
import { AthPopoverComponent } from './popover.component';

/** The `aria-haspopup` value of a popover trigger. */
export type PopoverTriggerPopup = 'dialog' | 'listbox' | 'menu';

/**
 * Opens an `ath-popover` from a button and anchors it there. Sets
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control
 * (the inner `<button>` of an `<ath-button>`).
 *
 * @example
 * <button type="button" [athPopoverTrigger]="pop">Filter</button>
 * <ath-popover #pop ariaLabel="Filter">…</ath-popover>
 */
@Directive({
  selector: '[athPopoverTrigger]',
  exportAs: 'athPopoverTrigger',
  host: {
    '(click)': 'onClick()',
  },
})
export class AthPopoverTriggerDirective extends AthOverlayTriggerBase {
  readonly popover = input.required<AthPopoverComponent>({ alias: 'athPopoverTrigger' });
  /** `aria-haspopup` value; `listbox` for a picker without a search field. */
  readonly popupType = input<PopoverTriggerPopup>('dialog');

  protected popupKind(): string {
    return this.popupType();
  }

  protected isOpen(): boolean {
    return this.popover().open();
  }

  protected popupId(): string {
    return this.popover().panelId();
  }

  protected onClick(): void {
    this.popover().toggle(this.host);
  }
}
