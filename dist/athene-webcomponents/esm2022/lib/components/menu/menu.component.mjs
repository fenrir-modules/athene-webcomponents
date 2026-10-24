import { ChangeDetectionStrategy, Component, contentChildren, forwardRef, input, model, output, signal, viewChild, } from '@angular/core';
import { AthPopoverComponent } from '../popover/popover.component';
import { resolveAnchor } from '../floating/floating.directive';
import { Typeahead, edgeIndex, isTypeaheadKey, stepIndex } from '../floating/list-keys';
import { AthMenuItemComponent } from './menu-item.component';
import { ATH_MENU_PARENT } from './menu-parent';
import * as i0 from "@angular/core";
let nextMenuId = 0;
/**
 * Athene Menu: the WAI-ARIA menu button pattern for row actions, `⋯` menus
 * and toolbars.
 *
 * Keyboard: on the trigger Enter, Space and ArrowDown open on the first
 * item, ArrowUp on the last. In the menu: ArrowDown/ArrowUp (wrapping),
 * Home/End, typeahead, Enter/Space activate, Escape closes and returns
 * focus to the trigger, Tab closes and moves on.
 *
 * @example
 * <ath-button variant="ghost" [athMenuTrigger]="rowMenu" ariaLabel="Actions">⋯</ath-button>
 * <ath-menu #rowMenu>
 *   <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 *   <ath-menu-separator />
 *   <button athMenuItem variant="danger" (triggered)="remove()">Delete</button>
 * </ath-menu>
 */
export class AthMenuComponent {
    constructor() {
        /** Whether the menu is shown. Two-way: `[(open)]`. */
        this.open = model(false);
        /** Anchor for programmatic use; `athMenuTrigger` sets it on its own. */
        this.anchor = input(null);
        this.align = input('start');
        this.side = input('bottom');
        this.maxHeight = input(null);
        /** Accessible name; by default the menu is labelled by its trigger. */
        this.ariaLabel = input(null);
        this.panelClass = input('');
        this.opened = output();
        this.closed = output();
        this.panelId = `ath-menu-${++nextMenuId}`;
        this.labelledBy = signal(null);
        this.popover = viewChild.required(AthPopoverComponent);
        this.items = contentChildren(AthMenuItemComponent, { descendants: true });
        this.typeahead = new Typeahead();
        this.pendingFocus = 'first';
    }
    isOpen() {
        return this.open();
    }
    /** Opens the menu from `anchor`, focusing the first or last item. */
    show(anchor, focus = 'first') {
        this.pendingFocus = focus;
        if (this.open()) {
            this.focusEdge(focus);
            return;
        }
        this.popover().show(resolveAnchor(anchor));
    }
    /** Closes the menu; focus returns to the trigger unless `restoreFocus` is false. */
    hide(restoreFocus = true) {
        this.popover().hide('programmatic', restoreFocus);
    }
    toggle(anchor, focus = 'first') {
        if (this.open())
            this.hide();
        else
            this.show(anchor, focus);
    }
    /** Called by `athMenuTrigger`: the trigger names the menu. */
    labelFrom(triggerId) {
        this.labelledBy.set(triggerId);
    }
    itemActivated(item) {
        if (!item.keepOpen())
            this.popover().hide('select', true);
    }
    onOpened() {
        this.typeahead.reset();
        this.opened.emit();
        const focus = this.pendingFocus;
        this.pendingFocus = 'first';
        // Once the projected items are in the rendered panel.
        this.popover().whenPanelReady(() => this.focusEdge(focus));
    }
    onKeydown(event) {
        if (!this.open())
            return;
        const items = this.items();
        const count = items.length;
        if (count === 0)
            return;
        const active = items.findIndex((i) => i.element === document.activeElement);
        const any = () => true;
        let next = -1;
        switch (event.key) {
            case 'ArrowDown':
                next = active < 0 ? 0 : stepIndex(count, active, 1, any, true);
                break;
            case 'ArrowUp':
                next = active < 0 ? count - 1 : stepIndex(count, active, -1, any, true);
                break;
            case 'Home':
            case 'PageUp':
                next = 0;
                break;
            case 'End':
            case 'PageDown':
                next = count - 1;
                break;
            case 'Tab':
                // Focus goes back to the trigger; the Tab itself then moves on from there.
                this.popover().hide('tab', true);
                return;
            default:
                if (isTypeaheadKey(event) && event.key !== ' ') {
                    next = this.typeahead.next(event.key, items.map((i) => i.label()), Math.max(active, 0));
                    if (next < 0)
                        return;
                }
                else {
                    return;
                }
        }
        event.preventDefault();
        items[next]?.focus();
    }
    focusEdge(focus) {
        if (focus === 'none' || !this.open())
            return;
        const items = this.items();
        const enabled = (i) => !items[i].disabled();
        let index = edgeIndex(items.length, enabled, focus === 'last');
        if (index < 0)
            index = focus === 'last' ? items.length - 1 : 0;
        if (items[index])
            items[index].focus();
        else
            this.popover().focusPanel('panel');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "18.2.14", type: AthMenuComponent, isStandalone: true, selector: "ath-menu", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null }, side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, panelClass: { classPropertyName: "panelClass", publicName: "panelClass", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", opened: "opened", closed: "closed" }, host: { listeners: { "keydown": "onKeydown($event)" } }, providers: [{ provide: ATH_MENU_PARENT, useExisting: forwardRef(() => AthMenuComponent) }], queries: [{ propertyName: "items", predicate: AthMenuItemComponent, descendants: true, isSignal: true }], viewQueries: [{ propertyName: "popover", first: true, predicate: AthPopoverComponent, descendants: true, isSignal: true }], exportAs: ["athMenu"], ngImport: i0, template: `
    <ath-popover
      [open]="open()"
      (openChange)="open.set($event)"
      [anchor]="anchor()"
      [panelId]="panelId"
      size="auto"
      padding="sm"
      panelRole="menu"
      autoFocus="none"
      [align]="align()"
      [side]="side()"
      [maxHeight]="maxHeight()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledby]="ariaLabel() ? null : labelledBy()"
      [panelClass]="panelClass()"
      (opened)="onOpened()"
      (closed)="closed.emit($event)"
    >
      <ng-content />
    </ath-popover>
  `, isInline: true, styles: [":host{display:contents}\n"], dependencies: [{ kind: "component", type: AthPopoverComponent, selector: "ath-popover", inputs: ["open", "anchor", "size", "padding", "align", "side", "offset", "matchWidth", "maxHeight", "arrow", "trapFocus", "autoFocus", "restoreFocus", "closeOnEscape", "closeOnOutsideClick", "panelRole", "ariaLabel", "ariaLabelledby", "panelClass", "panelId"], outputs: ["openChange", "opened", "closed"], exportAs: ["athPopover"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-menu', standalone: true, imports: [AthPopoverComponent], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'athMenu', providers: [{ provide: ATH_MENU_PARENT, useExisting: forwardRef(() => AthMenuComponent) }], template: `
    <ath-popover
      [open]="open()"
      (openChange)="open.set($event)"
      [anchor]="anchor()"
      [panelId]="panelId"
      size="auto"
      padding="sm"
      panelRole="menu"
      autoFocus="none"
      [align]="align()"
      [side]="side()"
      [maxHeight]="maxHeight()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledby]="ariaLabel() ? null : labelledBy()"
      [panelClass]="panelClass()"
      (opened)="onOpened()"
      (closed)="closed.emit($event)"
    >
      <ng-content />
    </ath-popover>
  `, host: {
                        '(keydown)': 'onKeydown($event)',
                    }, styles: [":host{display:contents}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvbWVudS9tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGFBQWEsRUFBdUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVwRixPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBc0IsTUFBTSxlQUFlLENBQUM7O0FBS3BFLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQUVuQjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQW1DSCxNQUFNLE9BQU8sZ0JBQWdCO0lBbEM3QjtRQW1DRSxzREFBc0Q7UUFDN0MsU0FBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3Qix3RUFBd0U7UUFDL0QsV0FBTSxHQUFHLEtBQUssQ0FBaUIsSUFBSSxDQUFDLENBQUM7UUFDckMsVUFBSyxHQUFHLEtBQUssQ0FBZ0IsT0FBTyxDQUFDLENBQUM7UUFDdEMsU0FBSSxHQUFHLEtBQUssQ0FBZSxRQUFRLENBQUMsQ0FBQztRQUNyQyxjQUFTLEdBQUcsS0FBSyxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUNoRCx1RUFBdUU7UUFDOUQsY0FB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Z0JBQWdCLDZpQ0E1QmhCLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLGdEQStDakQsb0JBQW9CLHlHQURmLG1CQUFtQix1RkE3Q3ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQlQsbUdBekJTLG1CQUFtQjs7NEZBK0JsQixnQkFBZ0I7a0JBbEM1QixTQUFTOytCQUNFLFVBQVUsY0FDUixJQUFJLFdBQ1AsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFDYix1QkFBdUIsQ0FBQyxNQUFNLFlBQ3JDLFNBQVMsYUFDUixDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsWUFDaEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVCxRQUVLO3dCQUNKLFdBQVcsRUFBRSxtQkFBbUI7cUJBQ2pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgY29udGVudENoaWxkcmVuLFxuICBmb3J3YXJkUmVmLFxuICBpbnB1dCxcbiAgbW9kZWwsXG4gIG91dHB1dCxcbiAgc2lnbmFsLFxuICB2aWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXRoUG9wb3ZlckNvbXBvbmVudCB9IGZyb20gJy4uL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQnO1xuaW1wb3J0IHR5cGUgeyBGbG9hdGluZ0FsaWduLCBGbG9hdGluZ1NpZGUgfSBmcm9tICcuLi9mbG9hdGluZy9mbG9hdGluZyc7XG5pbXBvcnQgeyByZXNvbHZlQW5jaG9yLCB0eXBlIEZsb2F0aW5nQW5jaG9yIH0gZnJvbSAnLi4vZmxvYXRpbmcvZmxvYXRpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB0eXBlIHsgQXRoT3ZlcmxheUNsb3NlUmVhc29uIH0gZnJvbSAnLi4vZmxvYXRpbmcvb3ZlcmxheS1zdGFjayc7XG5pbXBvcnQgeyBUeXBlYWhlYWQsIGVkZ2VJbmRleCwgaXNUeXBlYWhlYWRLZXksIHN0ZXBJbmRleCB9IGZyb20gJy4uL2Zsb2F0aW5nL2xpc3Qta2V5cyc7XG5pbXBvcnQgeyBBdGhNZW51SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbWVudS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBVEhfTUVOVV9QQVJFTlQsIHR5cGUgQXRoTWVudVBhcmVudCB9IGZyb20gJy4vbWVudS1wYXJlbnQnO1xuXG4vKiogV2hpY2ggaXRlbSBnZXRzIGZvY3VzIHdoZW4gdGhlIG1lbnUgb3BlbnMuICovXG5leHBvcnQgdHlwZSBNZW51Rm9jdXMgPSAnZmlyc3QnIHwgJ2xhc3QnIHwgJ25vbmUnO1xuXG5sZXQgbmV4dE1lbnVJZCA9IDA7XG5cbi8qKlxuICogQXRoZW5lIE1lbnU6IHRoZSBXQUktQVJJQSBtZW51IGJ1dHRvbiBwYXR0ZXJuIGZvciByb3cgYWN0aW9ucywgYOKLr2AgbWVudXNcbiAqIGFuZCB0b29sYmFycy5cbiAqXG4gKiBLZXlib2FyZDogb24gdGhlIHRyaWdnZXIgRW50ZXIsIFNwYWNlIGFuZCBBcnJvd0Rvd24gb3BlbiBvbiB0aGUgZmlyc3RcbiAqIGl0ZW0sIEFycm93VXAgb24gdGhlIGxhc3QuIEluIHRoZSBtZW51OiBBcnJvd0Rvd24vQXJyb3dVcCAod3JhcHBpbmcpLFxuICogSG9tZS9FbmQsIHR5cGVhaGVhZCwgRW50ZXIvU3BhY2UgYWN0aXZhdGUsIEVzY2FwZSBjbG9zZXMgYW5kIHJldHVybnNcbiAqIGZvY3VzIHRvIHRoZSB0cmlnZ2VyLCBUYWIgY2xvc2VzIGFuZCBtb3ZlcyBvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1idXR0b24gdmFyaWFudD1cImdob3N0XCIgW2F0aE1lbnVUcmlnZ2VyXT1cInJvd01lbnVcIiBhcmlhTGFiZWw9XCJBY3Rpb25zXCI+4ouvPC9hdGgtYnV0dG9uPlxuICogPGF0aC1tZW51ICNyb3dNZW51PlxuICogICA8YnV0dG9uIGF0aE1lbnVJdGVtIFtpY29uXT1cIlBlbmNpbFwiIHNob3J0Y3V0PVwiRVwiICh0cmlnZ2VyZWQpPVwiZWRpdCgpXCI+RWRpdDwvYnV0dG9uPlxuICogICA8YXRoLW1lbnUtc2VwYXJhdG9yIC8+XG4gKiAgIDxidXR0b24gYXRoTWVudUl0ZW0gdmFyaWFudD1cImRhbmdlclwiICh0cmlnZ2VyZWQpPVwicmVtb3ZlKClcIj5EZWxldGU8L2J1dHRvbj5cbiAqIDwvYXRoLW1lbnU+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1tZW51JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0F0aFBvcG92ZXJDb21wb25lbnRdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZXhwb3J0QXM6ICdhdGhNZW51JyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBBVEhfTUVOVV9QQVJFTlQsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF0aE1lbnVDb21wb25lbnQpIH1dLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxhdGgtcG9wb3ZlclxuICAgICAgW29wZW5dPVwib3BlbigpXCJcbiAgICAgIChvcGVuQ2hhbmdlKT1cIm9wZW4uc2V0KCRldmVudClcIlxuICAgICAgW2FuY2hvcl09XCJhbmNob3IoKVwiXG4gICAgICBbcGFuZWxJZF09XCJwYW5lbElkXCJcbiAgICAgIHNpemU9XCJhdXRvXCJcbiAgICAgIHBhZGRpbmc9XCJzbVwiXG4gICAgICBwYW5lbFJvbGU9XCJtZW51XCJcbiAgICAgIGF1dG9Gb2N1cz1cIm5vbmVcIlxuICAgICAgW2FsaWduXT1cImFsaWduKClcIlxuICAgICAgW3NpZGVdPVwic2lkZSgpXCJcbiAgICAgIFttYXhIZWlnaHRdPVwibWF4SGVpZ2h0KClcIlxuICAgICAgW2FyaWFMYWJlbF09XCJhcmlhTGFiZWwoKVwiXG4gICAgICBbYXJpYUxhYmVsbGVkYnldPVwiYXJpYUxhYmVsKCkgPyBudWxsIDogbGFiZWxsZWRCeSgpXCJcbiAgICAgIFtwYW5lbENsYXNzXT1cInBhbmVsQ2xhc3MoKVwiXG4gICAgICAob3BlbmVkKT1cIm9uT3BlbmVkKClcIlxuICAgICAgKGNsb3NlZCk9XCJjbG9zZWQuZW1pdCgkZXZlbnQpXCJcbiAgICA+XG4gICAgICA8bmctY29udGVudCAvPlxuICAgIDwvYXRoLXBvcG92ZXI+XG4gIGAsXG4gIHN0eWxlczogWyc6aG9zdCB7IGRpc3BsYXk6IGNvbnRlbnRzOyB9J10sXG4gIGhvc3Q6IHtcbiAgICAnKGtleWRvd24pJzogJ29uS2V5ZG93bigkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQXRoTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIEF0aE1lbnVQYXJlbnQge1xuICAvKiogV2hldGhlciB0aGUgbWVudSBpcyBzaG93bi4gVHdvLXdheTogYFsob3BlbildYC4gKi9cbiAgcmVhZG9ubHkgb3BlbiA9IG1vZGVsKGZhbHNlKTtcbiAgLyoqIEFuY2hvciBmb3IgcHJvZ3JhbW1hdGljIHVzZTsgYGF0aE1lbnVUcmlnZ2VyYCBzZXRzIGl0IG9uIGl0cyBvd24uICovXG4gIHJlYWRvbmx5IGFuY2hvciA9IGlucHV0PEZsb2F0aW5nQW5jaG9yPihudWxsKTtcbiAgcmVhZG9ubHkgYWxpZ24gPSBpbnB1dDxGbG9hdGluZ0FsaWduPignc3RhcnQnKTtcbiAgcmVhZG9ubHkgc2lkZSA9IGlucHV0PEZsb2F0aW5nU2lkZT4oJ2JvdHRvbScpO1xuICByZWFkb25seSBtYXhIZWlnaHQgPSBpbnB1dDxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgLyoqIEFjY2Vzc2libGUgbmFtZTsgYnkgZGVmYXVsdCB0aGUgbWVudSBpcyBsYWJlbGxlZCBieSBpdHMgdHJpZ2dlci4gKi9cbiAgcmVhZG9ubHkgYXJpYUxhYmVsID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IHBhbmVsQ2xhc3MgPSBpbnB1dCgnJyk7XG5cbiAgcmVhZG9ubHkgb3BlbmVkID0gb3V0cHV0PHZvaWQ+KCk7XG4gIHJlYWRvbmx5IGNsb3NlZCA9IG91dHB1dDxBdGhPdmVybGF5Q2xvc2VSZWFzb24+KCk7XG5cbiAgcmVhZG9ubHkgcGFuZWxJZCA9IGBhdGgtbWVudS0keysrbmV4dE1lbnVJZH1gO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBsYWJlbGxlZEJ5ID0gc2lnbmFsPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIHJlYWRvbmx5IHBvcG92ZXIgPSB2aWV3Q2hpbGQucmVxdWlyZWQoQXRoUG9wb3ZlckNvbXBvbmVudCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaXRlbXMgPSBjb250ZW50Q2hpbGRyZW4oQXRoTWVudUl0ZW1Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgdHlwZWFoZWFkID0gbmV3IFR5cGVhaGVhZCgpO1xuICBwcml2YXRlIHBlbmRpbmdGb2N1czogTWVudUZvY3VzID0gJ2ZpcnN0JztcblxuICBpc09wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3BlbigpO1xuICB9XG5cbiAgLyoqIE9wZW5zIHRoZSBtZW51IGZyb20gYGFuY2hvcmAsIGZvY3VzaW5nIHRoZSBmaXJzdCBvciBsYXN0IGl0ZW0uICovXG4gIHNob3coYW5jaG9yPzogRmxvYXRpbmdBbmNob3IsIGZvY3VzOiBNZW51Rm9jdXMgPSAnZmlyc3QnKTogdm9pZCB7XG4gICAgdGhpcy5wZW5kaW5nRm9jdXMgPSBmb2N1cztcbiAgICBpZiAodGhpcy5vcGVuKCkpIHtcbiAgICAgIHRoaXMuZm9jdXNFZGdlKGZvY3VzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5wb3BvdmVyKCkuc2hvdyhyZXNvbHZlQW5jaG9yKGFuY2hvcikpO1xuICB9XG5cbiAgLyoqIENsb3NlcyB0aGUgbWVudTsgZm9jdXMgcmV0dXJucyB0byB0aGUgdHJpZ2dlciB1bmxlc3MgYHJlc3RvcmVGb2N1c2AgaXMgZmFsc2UuICovXG4gIGhpZGUocmVzdG9yZUZvY3VzID0gdHJ1ZSk6IHZvaWQge1xuICAgIHRoaXMucG9wb3ZlcigpLmhpZGUoJ3Byb2dyYW1tYXRpYycsIHJlc3RvcmVGb2N1cyk7XG4gIH1cblxuICB0b2dnbGUoYW5jaG9yPzogRmxvYXRpbmdBbmNob3IsIGZvY3VzOiBNZW51Rm9jdXMgPSAnZmlyc3QnKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3BlbigpKSB0aGlzLmhpZGUoKTtcbiAgICBlbHNlIHRoaXMuc2hvdyhhbmNob3IsIGZvY3VzKTtcbiAgfVxuXG4gIC8qKiBDYWxsZWQgYnkgYGF0aE1lbnVUcmlnZ2VyYDogdGhlIHRyaWdnZXIgbmFtZXMgdGhlIG1lbnUuICovXG4gIGxhYmVsRnJvbSh0cmlnZ2VySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMubGFiZWxsZWRCeS5zZXQodHJpZ2dlcklkKTtcbiAgfVxuXG4gIGl0ZW1BY3RpdmF0ZWQoaXRlbTogeyBrZWVwT3BlbigpOiBib29sZWFuIH0pOiB2b2lkIHtcbiAgICBpZiAoIWl0ZW0ua2VlcE9wZW4oKSkgdGhpcy5wb3BvdmVyKCkuaGlkZSgnc2VsZWN0JywgdHJ1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25PcGVuZWQoKTogdm9pZCB7XG4gICAgdGhpcy50eXBlYWhlYWQucmVzZXQoKTtcbiAgICB0aGlzLm9wZW5lZC5lbWl0KCk7XG4gICAgY29uc3QgZm9jdXMgPSB0aGlzLnBlbmRpbmdGb2N1cztcbiAgICB0aGlzLnBlbmRpbmdGb2N1cyA9ICdmaXJzdCc7XG4gICAgLy8gT25jZSB0aGUgcHJvamVjdGVkIGl0ZW1zIGFyZSBpbiB0aGUgcmVuZGVyZWQgcGFuZWwuXG4gICAgdGhpcy5wb3BvdmVyKCkud2hlblBhbmVsUmVhZHkoKCkgPT4gdGhpcy5mb2N1c0VkZ2UoZm9jdXMpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3BlbigpKSByZXR1cm47XG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zKCk7XG4gICAgY29uc3QgY291bnQgPSBpdGVtcy5sZW5ndGg7XG4gICAgaWYgKGNvdW50ID09PSAwKSByZXR1cm47XG4gICAgY29uc3QgYWN0aXZlID0gaXRlbXMuZmluZEluZGV4KChpKSA9PiBpLmVsZW1lbnQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgIGNvbnN0IGFueSA9ICgpOiBib29sZWFuID0+IHRydWU7XG4gICAgbGV0IG5leHQgPSAtMTtcbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgbmV4dCA9IGFjdGl2ZSA8IDAgPyAwIDogc3RlcEluZGV4KGNvdW50LCBhY3RpdmUsIDEsIGFueSwgdHJ1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIG5leHQgPSBhY3RpdmUgPCAwID8gY291bnQgLSAxIDogc3RlcEluZGV4KGNvdW50LCBhY3RpdmUsIC0xLCBhbnksIHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0hvbWUnOlxuICAgICAgY2FzZSAnUGFnZVVwJzpcbiAgICAgICAgbmV4dCA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRW5kJzpcbiAgICAgIGNhc2UgJ1BhZ2VEb3duJzpcbiAgICAgICAgbmV4dCA9IGNvdW50IC0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdUYWInOlxuICAgICAgICAvLyBGb2N1cyBnb2VzIGJhY2sgdG8gdGhlIHRyaWdnZXI7IHRoZSBUYWIgaXRzZWxmIHRoZW4gbW92ZXMgb24gZnJvbSB0aGVyZS5cbiAgICAgICAgdGhpcy5wb3BvdmVyKCkuaGlkZSgndGFiJywgdHJ1ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChpc1R5cGVhaGVhZEtleShldmVudCkgJiYgZXZlbnQua2V5ICE9PSAnICcpIHtcbiAgICAgICAgICBuZXh0ID0gdGhpcy50eXBlYWhlYWQubmV4dChcbiAgICAgICAgICAgIGV2ZW50LmtleSxcbiAgICAgICAgICAgIGl0ZW1zLm1hcCgoaSkgPT4gaS5sYWJlbCgpKSxcbiAgICAgICAgICAgIE1hdGgubWF4KGFjdGl2ZSwgMClcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChuZXh0IDwgMCkgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGl0ZW1zW25leHRdPy5mb2N1cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c0VkZ2UoZm9jdXM6IE1lbnVGb2N1cyk6IHZvaWQge1xuICAgIGlmIChmb2N1cyA9PT0gJ25vbmUnIHx8ICF0aGlzLm9wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcygpO1xuICAgIGNvbnN0IGVuYWJsZWQgPSAoaTogbnVtYmVyKTogYm9vbGVhbiA9PiAhaXRlbXNbaV0uZGlzYWJsZWQoKTtcbiAgICBsZXQgaW5kZXggPSBlZGdlSW5kZXgoaXRlbXMubGVuZ3RoLCBlbmFibGVkLCBmb2N1cyA9PT0gJ2xhc3QnKTtcbiAgICBpZiAoaW5kZXggPCAwKSBpbmRleCA9IGZvY3VzID09PSAnbGFzdCcgPyBpdGVtcy5sZW5ndGggLSAxIDogMDtcbiAgICBpZiAoaXRlbXNbaW5kZXhdKSBpdGVtc1tpbmRleF0uZm9jdXMoKTtcbiAgICBlbHNlIHRoaXMucG9wb3ZlcigpLmZvY3VzUGFuZWwoJ3BhbmVsJyk7XG4gIH1cbn1cbiJdfQ==