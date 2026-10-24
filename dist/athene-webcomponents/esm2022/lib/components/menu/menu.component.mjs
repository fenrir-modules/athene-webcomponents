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
        // After the projected items are in the open panel.
        setTimeout(() => this.focusEdge(focus));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvbWVudS9tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGFBQWEsRUFBdUIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVwRixPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDeEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBc0IsTUFBTSxlQUFlLENBQUM7O0FBS3BFLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQUVuQjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQW1DSCxNQUFNLE9BQU8sZ0JBQWdCO0lBbEM3QjtRQW1DRSxzREFBc0Q7UUFDN0MsU0FBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3Qix3RUFBd0U7UUFDL0QsV0FBTSxHQUFHLEtBQUssQ0FBaUIsSUFBSSxDQUFDLENBQUM7UUFDckMsVUFBSyxHQUFHLEtBQUssQ0FBZ0IsT0FBTyxDQUFDLENBQUM7UUFDdEMsU0FBSSxHQUFHLEtBQUssQ0FBZSxRQUFRLENBQUMsQ0FBQztRQUNyQyxjQUFTLEdBQUcsS0FBSyxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUNoRCx1RUFBdUU7UUFDOUQsY0FB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LE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsZ0RBK0NqRCxvQkFBb0IseUdBRGYsbUJBQW1CLHVGQTdDdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCVCxtR0F6QlMsbUJBQW1COzs0RkErQmxCLGdCQUFnQjtrQkFsQzVCLFNBQVM7K0JBQ0UsVUFBVSxjQUNSLElBQUksV0FDUCxDQUFDLG1CQUFtQixDQUFDLG1CQUNiLHVCQUF1QixDQUFDLE1BQU0sWUFDckMsU0FBUyxhQUNSLENBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxZQUNoRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJULFFBRUs7d0JBQ0osV0FBVyxFQUFFLG1CQUFtQjtxQkFDakMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBjb250ZW50Q2hpbGRyZW4sXG4gIGZvcndhcmRSZWYsXG4gIGlucHV0LFxuICBtb2RlbCxcbiAgb3V0cHV0LFxuICBzaWduYWwsXG4gIHZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdGhQb3BvdmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgdHlwZSB7IEZsb2F0aW5nQWxpZ24sIEZsb2F0aW5nU2lkZSB9IGZyb20gJy4uL2Zsb2F0aW5nL2Zsb2F0aW5nJztcbmltcG9ydCB7IHJlc29sdmVBbmNob3IsIHR5cGUgRmxvYXRpbmdBbmNob3IgfSBmcm9tICcuLi9mbG9hdGluZy9mbG9hdGluZy5kaXJlY3RpdmUnO1xuaW1wb3J0IHR5cGUgeyBBdGhPdmVybGF5Q2xvc2VSZWFzb24gfSBmcm9tICcuLi9mbG9hdGluZy9vdmVybGF5LXN0YWNrJztcbmltcG9ydCB7IFR5cGVhaGVhZCwgZWRnZUluZGV4LCBpc1R5cGVhaGVhZEtleSwgc3RlcEluZGV4IH0gZnJvbSAnLi4vZmxvYXRpbmcvbGlzdC1rZXlzJztcbmltcG9ydCB7IEF0aE1lbnVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9tZW51LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IEFUSF9NRU5VX1BBUkVOVCwgdHlwZSBBdGhNZW51UGFyZW50IH0gZnJvbSAnLi9tZW51LXBhcmVudCc7XG5cbi8qKiBXaGljaCBpdGVtIGdldHMgZm9jdXMgd2hlbiB0aGUgbWVudSBvcGVucy4gKi9cbmV4cG9ydCB0eXBlIE1lbnVGb2N1cyA9ICdmaXJzdCcgfCAnbGFzdCcgfCAnbm9uZSc7XG5cbmxldCBuZXh0TWVudUlkID0gMDtcblxuLyoqXG4gKiBBdGhlbmUgTWVudTogdGhlIFdBSS1BUklBIG1lbnUgYnV0dG9uIHBhdHRlcm4gZm9yIHJvdyBhY3Rpb25zLCBg4ouvYCBtZW51c1xuICogYW5kIHRvb2xiYXJzLlxuICpcbiAqIEtleWJvYXJkOiBvbiB0aGUgdHJpZ2dlciBFbnRlciwgU3BhY2UgYW5kIEFycm93RG93biBvcGVuIG9uIHRoZSBmaXJzdFxuICogaXRlbSwgQXJyb3dVcCBvbiB0aGUgbGFzdC4gSW4gdGhlIG1lbnU6IEFycm93RG93bi9BcnJvd1VwICh3cmFwcGluZyksXG4gKiBIb21lL0VuZCwgdHlwZWFoZWFkLCBFbnRlci9TcGFjZSBhY3RpdmF0ZSwgRXNjYXBlIGNsb3NlcyBhbmQgcmV0dXJuc1xuICogZm9jdXMgdG8gdGhlIHRyaWdnZXIsIFRhYiBjbG9zZXMgYW5kIG1vdmVzIG9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWJ1dHRvbiB2YXJpYW50PVwiZ2hvc3RcIiBbYXRoTWVudVRyaWdnZXJdPVwicm93TWVudVwiIGFyaWFMYWJlbD1cIkFjdGlvbnNcIj7ii688L2F0aC1idXR0b24+XG4gKiA8YXRoLW1lbnUgI3Jvd01lbnU+XG4gKiAgIDxidXR0b24gYXRoTWVudUl0ZW0gW2ljb25dPVwiUGVuY2lsXCIgc2hvcnRjdXQ9XCJFXCIgKHRyaWdnZXJlZCk9XCJlZGl0KClcIj5FZGl0PC9idXR0b24+XG4gKiAgIDxhdGgtbWVudS1zZXBhcmF0b3IgLz5cbiAqICAgPGJ1dHRvbiBhdGhNZW51SXRlbSB2YXJpYW50PVwiZGFuZ2VyXCIgKHRyaWdnZXJlZCk9XCJyZW1vdmUoKVwiPkRlbGV0ZTwvYnV0dG9uPlxuICogPC9hdGgtbWVudT5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLW1lbnUnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQXRoUG9wb3ZlckNvbXBvbmVudF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBleHBvcnRBczogJ2F0aE1lbnUnLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IEFUSF9NRU5VX1BBUkVOVCwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXRoTWVudUNvbXBvbmVudCkgfV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGF0aC1wb3BvdmVyXG4gICAgICBbb3Blbl09XCJvcGVuKClcIlxuICAgICAgKG9wZW5DaGFuZ2UpPVwib3Blbi5zZXQoJGV2ZW50KVwiXG4gICAgICBbYW5jaG9yXT1cImFuY2hvcigpXCJcbiAgICAgIFtwYW5lbElkXT1cInBhbmVsSWRcIlxuICAgICAgc2l6ZT1cImF1dG9cIlxuICAgICAgcGFkZGluZz1cInNtXCJcbiAgICAgIHBhbmVsUm9sZT1cIm1lbnVcIlxuICAgICAgYXV0b0ZvY3VzPVwibm9uZVwiXG4gICAgICBbYWxpZ25dPVwiYWxpZ24oKVwiXG4gICAgICBbc2lkZV09XCJzaWRlKClcIlxuICAgICAgW21heEhlaWdodF09XCJtYXhIZWlnaHQoKVwiXG4gICAgICBbYXJpYUxhYmVsXT1cImFyaWFMYWJlbCgpXCJcbiAgICAgIFthcmlhTGFiZWxsZWRieV09XCJhcmlhTGFiZWwoKSA/IG51bGwgOiBsYWJlbGxlZEJ5KClcIlxuICAgICAgW3BhbmVsQ2xhc3NdPVwicGFuZWxDbGFzcygpXCJcbiAgICAgIChvcGVuZWQpPVwib25PcGVuZWQoKVwiXG4gICAgICAoY2xvc2VkKT1cImNsb3NlZC5lbWl0KCRldmVudClcIlxuICAgID5cbiAgICAgIDxuZy1jb250ZW50IC8+XG4gICAgPC9hdGgtcG9wb3Zlcj5cbiAgYCxcbiAgc3R5bGVzOiBbJzpob3N0IHsgZGlzcGxheTogY29udGVudHM7IH0nXSxcbiAgaG9zdDoge1xuICAgICcoa2V5ZG93biknOiAnb25LZXlkb3duKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBBdGhNZW51Q29tcG9uZW50IGltcGxlbWVudHMgQXRoTWVudVBhcmVudCB7XG4gIC8qKiBXaGV0aGVyIHRoZSBtZW51IGlzIHNob3duLiBUd28td2F5OiBgWyhvcGVuKV1gLiAqL1xuICByZWFkb25seSBvcGVuID0gbW9kZWwoZmFsc2UpO1xuICAvKiogQW5jaG9yIGZvciBwcm9ncmFtbWF0aWMgdXNlOyBgYXRoTWVudVRyaWdnZXJgIHNldHMgaXQgb24gaXRzIG93bi4gKi9cbiAgcmVhZG9ubHkgYW5jaG9yID0gaW5wdXQ8RmxvYXRpbmdBbmNob3I+KG51bGwpO1xuICByZWFkb25seSBhbGlnbiA9IGlucHV0PEZsb2F0aW5nQWxpZ24+KCdzdGFydCcpO1xuICByZWFkb25seSBzaWRlID0gaW5wdXQ8RmxvYXRpbmdTaWRlPignYm90dG9tJyk7XG4gIHJlYWRvbmx5IG1heEhlaWdodCA9IGlucHV0PG51bWJlciB8IG51bGw+KG51bGwpO1xuICAvKiogQWNjZXNzaWJsZSBuYW1lOyBieSBkZWZhdWx0IHRoZSBtZW51IGlzIGxhYmVsbGVkIGJ5IGl0cyB0cmlnZ2VyLiAqL1xuICByZWFkb25seSBhcmlhTGFiZWwgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgcGFuZWxDbGFzcyA9IGlucHV0KCcnKTtcblxuICByZWFkb25seSBvcGVuZWQgPSBvdXRwdXQ8dm9pZD4oKTtcbiAgcmVhZG9ubHkgY2xvc2VkID0gb3V0cHV0PEF0aE92ZXJsYXlDbG9zZVJlYXNvbj4oKTtcblxuICByZWFkb25seSBwYW5lbElkID0gYGF0aC1tZW51LSR7KytuZXh0TWVudUlkfWA7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGxhYmVsbGVkQnkgPSBzaWduYWw8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcG9wb3ZlciA9IHZpZXdDaGlsZC5yZXF1aXJlZChBdGhQb3BvdmVyQ29tcG9uZW50KTtcbiAgcHJpdmF0ZSByZWFkb25seSBpdGVtcyA9IGNvbnRlbnRDaGlsZHJlbihBdGhNZW51SXRlbUNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KTtcbiAgcHJpdmF0ZSByZWFkb25seSB0eXBlYWhlYWQgPSBuZXcgVHlwZWFoZWFkKCk7XG4gIHByaXZhdGUgcGVuZGluZ0ZvY3VzOiBNZW51Rm9jdXMgPSAnZmlyc3QnO1xuXG4gIGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcGVuKCk7XG4gIH1cblxuICAvKiogT3BlbnMgdGhlIG1lbnUgZnJvbSBgYW5jaG9yYCwgZm9jdXNpbmcgdGhlIGZpcnN0IG9yIGxhc3QgaXRlbS4gKi9cbiAgc2hvdyhhbmNob3I/OiBGbG9hdGluZ0FuY2hvciwgZm9jdXM6IE1lbnVGb2N1cyA9ICdmaXJzdCcpOiB2b2lkIHtcbiAgICB0aGlzLnBlbmRpbmdGb2N1cyA9IGZvY3VzO1xuICAgIGlmICh0aGlzLm9wZW4oKSkge1xuICAgICAgdGhpcy5mb2N1c0VkZ2UoZm9jdXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBvcG92ZXIoKS5zaG93KHJlc29sdmVBbmNob3IoYW5jaG9yKSk7XG4gIH1cblxuICAvKiogQ2xvc2VzIHRoZSBtZW51OyBmb2N1cyByZXR1cm5zIHRvIHRoZSB0cmlnZ2VyIHVubGVzcyBgcmVzdG9yZUZvY3VzYCBpcyBmYWxzZS4gKi9cbiAgaGlkZShyZXN0b3JlRm9jdXMgPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5wb3BvdmVyKCkuaGlkZSgncHJvZ3JhbW1hdGljJywgcmVzdG9yZUZvY3VzKTtcbiAgfVxuXG4gIHRvZ2dsZShhbmNob3I/OiBGbG9hdGluZ0FuY2hvciwgZm9jdXM6IE1lbnVGb2N1cyA9ICdmaXJzdCcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuKCkpIHRoaXMuaGlkZSgpO1xuICAgIGVsc2UgdGhpcy5zaG93KGFuY2hvciwgZm9jdXMpO1xuICB9XG5cbiAgLyoqIENhbGxlZCBieSBgYXRoTWVudVRyaWdnZXJgOiB0aGUgdHJpZ2dlciBuYW1lcyB0aGUgbWVudS4gKi9cbiAgbGFiZWxGcm9tKHRyaWdnZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sYWJlbGxlZEJ5LnNldCh0cmlnZ2VySWQpO1xuICB9XG5cbiAgaXRlbUFjdGl2YXRlZChpdGVtOiB7IGtlZXBPcGVuKCk6IGJvb2xlYW4gfSk6IHZvaWQge1xuICAgIGlmICghaXRlbS5rZWVwT3BlbigpKSB0aGlzLnBvcG92ZXIoKS5oaWRlKCdzZWxlY3QnLCB0cnVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbk9wZW5lZCgpOiB2b2lkIHtcbiAgICB0aGlzLnR5cGVhaGVhZC5yZXNldCgpO1xuICAgIHRoaXMub3BlbmVkLmVtaXQoKTtcbiAgICBjb25zdCBmb2N1cyA9IHRoaXMucGVuZGluZ0ZvY3VzO1xuICAgIHRoaXMucGVuZGluZ0ZvY3VzID0gJ2ZpcnN0JztcbiAgICAvLyBBZnRlciB0aGUgcHJvamVjdGVkIGl0ZW1zIGFyZSBpbiB0aGUgb3BlbiBwYW5lbC5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZm9jdXNFZGdlKGZvY3VzKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wZW4oKSkgcmV0dXJuO1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5pdGVtcygpO1xuICAgIGNvbnN0IGNvdW50ID0gaXRlbXMubGVuZ3RoO1xuICAgIGlmIChjb3VudCA9PT0gMCkgcmV0dXJuO1xuICAgIGNvbnN0IGFjdGl2ZSA9IGl0ZW1zLmZpbmRJbmRleCgoaSkgPT4gaS5lbGVtZW50ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgICBjb25zdCBhbnkgPSAoKTogYm9vbGVhbiA9PiB0cnVlO1xuICAgIGxldCBuZXh0ID0gLTE7XG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIG5leHQgPSBhY3RpdmUgPCAwID8gMCA6IHN0ZXBJbmRleChjb3VudCwgYWN0aXZlLCAxLCBhbnksIHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBuZXh0ID0gYWN0aXZlIDwgMCA/IGNvdW50IC0gMSA6IHN0ZXBJbmRleChjb3VudCwgYWN0aXZlLCAtMSwgYW55LCB0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdIb21lJzpcbiAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgIG5leHQgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgIG5leHQgPSBjb3VudCAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVGFiJzpcbiAgICAgICAgLy8gRm9jdXMgZ29lcyBiYWNrIHRvIHRoZSB0cmlnZ2VyOyB0aGUgVGFiIGl0c2VsZiB0aGVuIG1vdmVzIG9uIGZyb20gdGhlcmUuXG4gICAgICAgIHRoaXMucG9wb3ZlcigpLmhpZGUoJ3RhYicsIHRydWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoaXNUeXBlYWhlYWRLZXkoZXZlbnQpICYmIGV2ZW50LmtleSAhPT0gJyAnKSB7XG4gICAgICAgICAgbmV4dCA9IHRoaXMudHlwZWFoZWFkLm5leHQoXG4gICAgICAgICAgICBldmVudC5rZXksXG4gICAgICAgICAgICBpdGVtcy5tYXAoKGkpID0+IGkubGFiZWwoKSksXG4gICAgICAgICAgICBNYXRoLm1heChhY3RpdmUsIDApXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobmV4dCA8IDApIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpdGVtc1tuZXh0XT8uZm9jdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZm9jdXNFZGdlKGZvY3VzOiBNZW51Rm9jdXMpOiB2b2lkIHtcbiAgICBpZiAoZm9jdXMgPT09ICdub25lJyB8fCAhdGhpcy5vcGVuKCkpIHJldHVybjtcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXMoKTtcbiAgICBjb25zdCBlbmFibGVkID0gKGk6IG51bWJlcik6IGJvb2xlYW4gPT4gIWl0ZW1zW2ldLmRpc2FibGVkKCk7XG4gICAgbGV0IGluZGV4ID0gZWRnZUluZGV4KGl0ZW1zLmxlbmd0aCwgZW5hYmxlZCwgZm9jdXMgPT09ICdsYXN0Jyk7XG4gICAgaWYgKGluZGV4IDwgMCkgaW5kZXggPSBmb2N1cyA9PT0gJ2xhc3QnID8gaXRlbXMubGVuZ3RoIC0gMSA6IDA7XG4gICAgaWYgKGl0ZW1zW2luZGV4XSkgaXRlbXNbaW5kZXhdLmZvY3VzKCk7XG4gICAgZWxzZSB0aGlzLnBvcG92ZXIoKS5mb2N1c1BhbmVsKCdwYW5lbCcpO1xuICB9XG59XG4iXX0=