import { ChangeDetectionStrategy, Component, computed, effect, input, output, viewChild, } from '@angular/core';
import { AthMenuComponent } from '../menu/menu.component';
import { AthMenuItemComponent, AthMenuSeparatorComponent } from '../menu/menu-item.component';
import * as i0 from "@angular/core";
/**
 * The separator entry: `[edit, rename, DROPDOWN_SEPARATOR, remove]`. It
 * replaces the old pseudo-item `{ id: 'divider', label: '', divider: true }`
 * (quality step 2.7).
 */
export const DROPDOWN_SEPARATOR = Object.freeze({ separator: true });
export function isDropdownSeparator(item) {
    return 'separator' in item && item.separator === true;
}
const ALIGN = { left: 'start', right: 'end', auto: 'auto' };
/** The controls a projected trigger may be (or contain). */
const CONTROL = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
/**
 * Athene Dropdown: an action menu from a flat `items` list. A preset on
 * `ath-menu` (keyboard, focus and ARIA come from there); for custom rows use
 * `ath-menu` + `athMenuItem` directly.
 *
 * The projected content is the trigger. When it is (or contains) a button,
 * that button is the menu button: one tab stop, with `aria-haspopup`,
 * `aria-expanded` and `aria-controls` on it. Plain content (text, an icon)
 * gets a `role="button"` wrapper instead.
 *
 * @example
 * <ath-dropdown [items]="menuItems" (itemClicked)="onAction($event)">
 *   <ath-button variant="ghost">Actions</ath-button>
 * </ath-dropdown>
 */
export class AthDropdownComponent {
    constructor() {
        /** Menu entries: actions, and `DROPDOWN_SEPARATOR` between groups. */
        this.items = input([]);
        /** Separators are keyed by position, actions by id. */
        this.entries = computed(() => this.items().map((item, i) => isDropdownSeparator(item)
            ? { key: `separator-${i}`, action: null }
            : { key: item.id, action: item }));
        /**
         * Horizontal alignment hint.
         * - `'left'`  – menu anchored to the left edge of trigger
         * - `'right'` – menu anchored to the right edge of trigger
         * - `'auto'`  – pick best side based on viewport space
         *
         * Vertical direction is always auto-detected.
         */
        this.align = input('auto');
        /** Item click event */
        this.itemClicked = output();
        /** Emits `true` when the menu opens, `false` when it closes. */
        this.openChange = output();
        this.menuAlign = () => ALIGN[this.align()];
        this.menu = viewChild.required(AthMenuComponent);
        this.triggerRef = viewChild.required('trigger');
        this.menuQuery = viewChild(AthMenuComponent);
        this.viewReady = false;
        effect(() => {
            const open = this.menuQuery()?.open() ?? false;
            if (this.viewReady)
                this.syncAria(open);
        });
    }
    ngAfterViewInit() {
        this.viewReady = true;
        this.syncAria(this.menu().open());
    }
    /** Opens or closes the menu (focus goes to the first item when opening). */
    toggle() {
        this.menu().toggle(this.triggerRef().nativeElement, 'first');
    }
    /** Emits the item's id, as a click on it does. */
    selectItem(item) {
        if (item.disabled)
            return;
        this.itemClicked.emit(item.id);
        this.menu().hide();
    }
    onOpenChange(open) {
        this.openChange.emit(open);
    }
    onHostClick(event) {
        if (this.inTrigger(event))
            this.toggle();
    }
    onHostKeydown(event) {
        if (!this.inTrigger(event))
            return;
        const wrapperIsControl = this.control() === this.triggerRef().nativeElement;
        const key = event.key;
        if (key === 'ArrowDown' || key === 'ArrowUp') {
            event.preventDefault();
            this.menu().show(this.triggerRef().nativeElement, key === 'ArrowUp' ? 'last' : 'first');
        }
        else if (wrapperIsControl && (key === 'Enter' || key === ' ')) {
            // A real button clicks on its own; the role="button" wrapper does not.
            event.preventDefault();
            this.toggle();
        }
    }
    /** The trigger's real control, or the wrapper when there is none. */
    control() {
        const wrapper = this.triggerRef().nativeElement;
        return wrapper.querySelector(CONTROL) ?? wrapper;
    }
    inTrigger(event) {
        return event.target instanceof Node && this.triggerRef().nativeElement.contains(event.target);
    }
    syncAria(open) {
        const wrapper = this.triggerRef().nativeElement;
        const control = this.control();
        if (control === wrapper) {
            wrapper.setAttribute('role', 'button');
            wrapper.tabIndex = 0;
        }
        else {
            wrapper.removeAttribute('role');
            wrapper.removeAttribute('tabindex');
        }
        control.setAttribute('aria-haspopup', 'menu');
        control.setAttribute('aria-expanded', String(open));
        if (open)
            control.setAttribute('aria-controls', this.menu().panelId);
        else
            control.removeAttribute('aria-controls');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDropdownComponent, isStandalone: true, selector: "ath-dropdown", inputs: { items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { itemClicked: "itemClicked", openChange: "openChange" }, host: { listeners: { "click": "onHostClick($event)", "keydown": "onHostKeydown($event)" } }, viewQueries: [{ propertyName: "menu", first: true, predicate: AthMenuComponent, descendants: true, isSignal: true }, { propertyName: "triggerRef", first: true, predicate: ["trigger"], descendants: true, isSignal: true }, { propertyName: "menuQuery", first: true, predicate: AthMenuComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<span #trigger class=\"ath-dropdown__trigger\">\n  <ng-content />\n</span>\n\n<!-- ath-dropdown__menu: app code checks for an open dropdown by this class. -->\n<ath-menu\n  panelClass=\"ath-dropdown__menu\"\n  [anchor]=\"trigger\"\n  [align]=\"menuAlign()\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  @for (entry of entries(); track entry.key) {\n    @if (entry.action; as item) {\n      <button\n        athMenuItem\n        role=\"menuitem\"\n        class=\"ath-dropdown__item\"\n        [class.ath-dropdown__item--danger]=\"item.variant === 'danger'\"\n        [icon]=\"item.icon\"\n        [variant]=\"item.variant ?? 'default'\"\n        [disabled]=\"!!item.disabled\"\n        [disabledReason]=\"item.title\"\n        [tooltip]=\"item.title\"\n        [shortcut]=\"item.shortcut ?? null\"\n        (triggered)=\"itemClicked.emit(item.id)\"\n      >\n        {{ item.label }}\n      </button>\n    } @else {\n      <ath-menu-separator />\n    }\n  }\n</ath-menu>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-dropdown__trigger{display:inline-flex;cursor:pointer}.ath-dropdown__trigger[role=button]:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:var(--focus-ring-shadow)}\n"], dependencies: [{ kind: "component", type: AthMenuComponent, selector: "ath-menu", inputs: ["open", "anchor", "align", "side", "maxHeight", "ariaLabel", "panelClass"], outputs: ["openChange", "opened", "closed"], exportAs: ["athMenu"] }, { kind: "component", type: AthMenuItemComponent, selector: "ath-menu-item, button[athMenuItem], a[athMenuItem]", inputs: ["icon", "shortcut", "keyshortcuts", "variant", "disabled", "disabledReason", "tooltip", "checked", "keepOpen"], outputs: ["triggered"], exportAs: ["athMenuItem"] }, { kind: "component", type: AthMenuSeparatorComponent, selector: "ath-menu-separator" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dropdown', standalone: true, imports: [AthMenuComponent, AthMenuItemComponent, AthMenuSeparatorComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(click)': 'onHostClick($event)',
                        '(keydown)': 'onHostKeydown($event)',
                    }, template: "<span #trigger class=\"ath-dropdown__trigger\">\n  <ng-content />\n</span>\n\n<!-- ath-dropdown__menu: app code checks for an open dropdown by this class. -->\n<ath-menu\n  panelClass=\"ath-dropdown__menu\"\n  [anchor]=\"trigger\"\n  [align]=\"menuAlign()\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  @for (entry of entries(); track entry.key) {\n    @if (entry.action; as item) {\n      <button\n        athMenuItem\n        role=\"menuitem\"\n        class=\"ath-dropdown__item\"\n        [class.ath-dropdown__item--danger]=\"item.variant === 'danger'\"\n        [icon]=\"item.icon\"\n        [variant]=\"item.variant ?? 'default'\"\n        [disabled]=\"!!item.disabled\"\n        [disabledReason]=\"item.title\"\n        [tooltip]=\"item.title\"\n        [shortcut]=\"item.shortcut ?? null\"\n        (triggered)=\"itemClicked.emit(item.id)\"\n      >\n        {{ item.label }}\n      </button>\n    } @else {\n      <ath-menu-separator />\n    }\n  }\n</ath-menu>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-dropdown__trigger{display:inline-flex;cursor:pointer}.ath-dropdown__trigger[role=button]:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:var(--focus-ring-shadow)}\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQXdCOUY7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFzQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFFeEYsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQWtCO0lBQ3BELE9BQU8sV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztBQUN4RCxDQUFDO0FBVUQsTUFBTSxLQUFLLEdBQXlDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUVsRyw0REFBNEQ7QUFDNUQsTUFBTSxPQUFPLEdBQUcsMkVBQTJFLENBQUM7QUFFNUY7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFhSCxNQUFNLE9BQU8sb0JBQW9CO0lBb0Mv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USxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxJQUFJO1lBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUNoRSxPQUFPLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7K0dBMUdVLG9CQUFvQjttR0FBcEIsb0JBQW9CLDBnQkErQmMsZ0JBQWdCLG9NQUV0QixnQkFBZ0IsZ0VDMUh6RCxnOUJBaUNBLHVXRCtDWSxnQkFBZ0IsOE1BQUUsb0JBQW9CLDJRQUFFLHlCQUF5Qjs7NEZBU2hFLG9CQUFvQjtrQkFaaEMsU0FBUzsrQkFDRSxjQUFjLGNBQ1osSUFBSSxXQUNQLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUseUJBQXlCLENBQUMsbUJBQzNELHVCQUF1QixDQUFDLE1BQU0sUUFHekM7d0JBQ0osU0FBUyxFQUFFLHFCQUFxQjt3QkFDaEMsV0FBVyxFQUFFLHVCQUF1QjtxQkFDckMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBjb21wdXRlZCxcbiAgZWZmZWN0LFxuICBpbnB1dCxcbiAgb3V0cHV0LFxuICB2aWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBBdGhJY29uRGF0YSB9IGZyb20gJy4uL2Zsb2F0aW5nL2ljb24nO1xuaW1wb3J0IHR5cGUgeyBGbG9hdGluZ0FsaWduIH0gZnJvbSAnLi4vZmxvYXRpbmcvZmxvYXRpbmcnO1xuaW1wb3J0IHsgQXRoTWVudUNvbXBvbmVudCB9IGZyb20gJy4uL21lbnUvbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXRoTWVudUl0ZW1Db21wb25lbnQsIEF0aE1lbnVTZXBhcmF0b3JDb21wb25lbnQgfSBmcm9tICcuLi9tZW51L21lbnUtaXRlbS5jb21wb25lbnQnO1xuXG4vKiogQW4gYWN0aW9uIG9mIHRoZSBtZW51OyBjaG9vc2luZyBpdCBlbWl0cyBpdHMgYGlkYC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25BY3Rpb24ge1xuICBpZDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICAvKiogQSBMdWNpZGUgaWNvbiAoYGltcG9ydCB7IFBlbmNpbCB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJ2ApLiAqL1xuICBpY29uPzogQXRoSWNvbkRhdGE7XG4gIHZhcmlhbnQ/OiAnZGVmYXVsdCcgfCAnZGFuZ2VyJztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICAvKiogQSB0b29sdGlwIOKAlCBlLmcuIHdoeSBhIGRpc2FibGVkIGl0ZW0gY2Fubm90IGJlIGNob3NlbiAoYWxzbyByZWFkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIC8qKiBTaG9ydGN1dCBoaW50IGF0IHRoZSBlbmQgb2YgdGhlIGl0ZW0sIGUuZy4gYOKMmEVgLiAqL1xuICBzaG9ydGN1dD86IHN0cmluZztcbn1cblxuLyoqIEEgaGFpcmxpbmUgYmV0d2VlbiB0d28gZ3JvdXBzIG9mIGFjdGlvbnM7IHVzZSBgRFJPUERPV05fU0VQQVJBVE9SYC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25TZXBhcmF0b3Ige1xuICByZWFkb25seSBzZXBhcmF0b3I6IHRydWU7XG59XG5cbi8qKiBPbmUgZW50cnkgb2YgYGF0aC1kcm9wZG93bmA6IGFuIGFjdGlvbiBvciBgRFJPUERPV05fU0VQQVJBVE9SYC4gKi9cbmV4cG9ydCB0eXBlIERyb3Bkb3duSXRlbSA9IERyb3Bkb3duQWN0aW9uIHwgRHJvcGRvd25TZXBhcmF0b3I7XG5cbi8qKlxuICogVGhlIHNlcGFyYXRvciBlbnRyeTogYFtlZGl0LCByZW5hbWUsIERST1BET1dOX1NFUEFSQVRPUiwgcmVtb3ZlXWAuIEl0XG4gKiByZXBsYWNlcyB0aGUgb2xkIHBzZXVkby1pdGVtIGB7IGlkOiAnZGl2aWRlcicsIGxhYmVsOiAnJywgZGl2aWRlcjogdHJ1ZSB9YFxuICogKHF1YWxpdHkgc3RlcCAyLjcpLlxuICovXG5leHBvcnQgY29uc3QgRFJPUERPV05fU0VQQVJBVE9SOiBEcm9wZG93blNlcGFyYXRvciA9IE9iamVjdC5mcmVlemUoeyBzZXBhcmF0b3I6IHRydWUgfSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Ryb3Bkb3duU2VwYXJhdG9yKGl0ZW06IERyb3Bkb3duSXRlbSk6IGl0ZW0gaXMgRHJvcGRvd25TZXBhcmF0b3Ige1xuICByZXR1cm4gJ3NlcGFyYXRvcicgaW4gaXRlbSAmJiBpdGVtLnNlcGFyYXRvciA9PT0gdHJ1ZTtcbn1cblxudHlwZSBFbnRyeSA9IHsga2V5OiBzdHJpbmc7IGFjdGlvbjogRHJvcGRvd25BY3Rpb24gfCBudWxsIH07XG5cbi8qKlxuICogSG9yaXpvbnRhbCBhbGlnbm1lbnQgaGludC5cbiAqIGAnYXV0bydgIHBpY2tzIGxlZnQgb3IgcmlnaHQgYmFzZWQgb24gYXZhaWxhYmxlIHZpZXdwb3J0IHNwYWNlLlxuICovXG5leHBvcnQgdHlwZSBEcm9wZG93bkFsaWduID0gJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdhdXRvJztcblxuY29uc3QgQUxJR046IFJlY29yZDxEcm9wZG93bkFsaWduLCBGbG9hdGluZ0FsaWduPiA9IHsgbGVmdDogJ3N0YXJ0JywgcmlnaHQ6ICdlbmQnLCBhdXRvOiAnYXV0bycgfTtcblxuLyoqIFRoZSBjb250cm9scyBhIHByb2plY3RlZCB0cmlnZ2VyIG1heSBiZSAob3IgY29udGFpbikuICovXG5jb25zdCBDT05UUk9MID0gJ2J1dHRvbiwgYVtocmVmXSwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEsIFt0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKSc7XG5cbi8qKlxuICogQXRoZW5lIERyb3Bkb3duOiBhbiBhY3Rpb24gbWVudSBmcm9tIGEgZmxhdCBgaXRlbXNgIGxpc3QuIEEgcHJlc2V0IG9uXG4gKiBgYXRoLW1lbnVgIChrZXlib2FyZCwgZm9jdXMgYW5kIEFSSUEgY29tZSBmcm9tIHRoZXJlKTsgZm9yIGN1c3RvbSByb3dzIHVzZVxuICogYGF0aC1tZW51YCArIGBhdGhNZW51SXRlbWAgZGlyZWN0bHkuXG4gKlxuICogVGhlIHByb2plY3RlZCBjb250ZW50IGlzIHRoZSB0cmlnZ2VyLiBXaGVuIGl0IGlzIChvciBjb250YWlucykgYSBidXR0b24sXG4gKiB0aGF0IGJ1dHRvbiBpcyB0aGUgbWVudSBidXR0b246IG9uZSB0YWIgc3RvcCwgd2l0aCBgYXJpYS1oYXNwb3B1cGAsXG4gKiBgYXJpYS1leHBhbmRlZGAgYW5kIGBhcmlhLWNvbnRyb2xzYCBvbiBpdC4gUGxhaW4gY29udGVudCAodGV4dCwgYW4gaWNvbilcbiAqIGdldHMgYSBgcm9sZT1cImJ1dHRvblwiYCB3cmFwcGVyIGluc3RlYWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtZHJvcGRvd24gW2l0ZW1zXT1cIm1lbnVJdGVtc1wiIChpdGVtQ2xpY2tlZCk9XCJvbkFjdGlvbigkZXZlbnQpXCI+XG4gKiAgIDxhdGgtYnV0dG9uIHZhcmlhbnQ9XCJnaG9zdFwiPkFjdGlvbnM8L2F0aC1idXR0b24+XG4gKiA8L2F0aC1kcm9wZG93bj5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWRyb3Bkb3duJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0F0aE1lbnVDb21wb25lbnQsIEF0aE1lbnVJdGVtQ29tcG9uZW50LCBBdGhNZW51U2VwYXJhdG9yQ29tcG9uZW50XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9kcm9wZG93bi5jb21wb25lbnQuc2NzcycsXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdvbkhvc3RDbGljaygkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ29uSG9zdEtleWRvd24oJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIEF0aERyb3Bkb3duQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8qKiBNZW51IGVudHJpZXM6IGFjdGlvbnMsIGFuZCBgRFJPUERPV05fU0VQQVJBVE9SYCBiZXR3ZWVuIGdyb3Vwcy4gKi9cbiAgcmVhZG9ubHkgaXRlbXMgPSBpbnB1dDxyZWFkb25seSBEcm9wZG93bkl0ZW1bXT4oW10pO1xuXG4gIC8qKiBTZXBhcmF0b3JzIGFyZSBrZXllZCBieSBwb3NpdGlvbiwgYWN0aW9ucyBieSBpZC4gKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGVudHJpZXMgPSBjb21wdXRlZDxFbnRyeVtdPigoKSA9PlxuICAgIHRoaXMuaXRlbXMoKS5tYXAoKGl0ZW0sIGkpID0+XG4gICAgICBpc0Ryb3Bkb3duU2VwYXJhdG9yKGl0ZW0pXG4gICAgICAgID8geyBrZXk6IGBzZXBhcmF0b3ItJHtpfWAsIGFjdGlvbjogbnVsbCB9XG4gICAgICAgIDogeyBrZXk6IGl0ZW0uaWQsIGFjdGlvbjogaXRlbSB9XG4gICAgKVxuICApO1xuXG4gIC8qKlxuICAgKiBIb3Jpem9udGFsIGFsaWdubWVudCBoaW50LlxuICAgKiAtIGAnbGVmdCdgICDigJMgbWVudSBhbmNob3JlZCB0byB0aGUgbGVmdCBlZGdlIG9mIHRyaWdnZXJcbiAgICogLSBgJ3JpZ2h0J2Ag4oCTIG1lbnUgYW5jaG9yZWQgdG8gdGhlIHJpZ2h0IGVkZ2Ugb2YgdHJpZ2dlclxuICAgKiAtIGAnYXV0bydgICDigJMgcGljayBiZXN0IHNpZGUgYmFzZWQgb24gdmlld3BvcnQgc3BhY2VcbiAgICpcbiAgICogVmVydGljYWwgZGlyZWN0aW9uIGlzIGFsd2F5cyBhdXRvLWRldGVjdGVkLlxuICAgKi9cbiAgcmVhZG9ubHkgYWxpZ24gPSBpbnB1dDxEcm9wZG93bkFsaWduPignYXV0bycpO1xuXG4gIC8qKiBJdGVtIGNsaWNrIGV2ZW50ICovXG4gIHJlYWRvbmx5IGl0ZW1DbGlja2VkID0gb3V0cHV0PHN0cmluZz4oKTtcblxuICAvKiogRW1pdHMgYHRydWVgIHdoZW4gdGhlIG1lbnUgb3BlbnMsIGBmYWxzZWAgd2hlbiBpdCBjbG9zZXMuICovXG4gIHJlYWRvbmx5IG9wZW5DaGFuZ2UgPSBvdXRwdXQ8Ym9vbGVhbj4oKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWVudUFsaWduID0gKCk6IEZsb2F0aW5nQWxpZ24gPT4gQUxJR05bdGhpcy5hbGlnbigpXTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWVudSA9IHZpZXdDaGlsZC5yZXF1aXJlZChBdGhNZW51Q29tcG9uZW50KTtcbiAgcHJpdmF0ZSByZWFkb25seSB0cmlnZ2VyUmVmID0gdmlld0NoaWxkLnJlcXVpcmVkPEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+PigndHJpZ2dlcicpO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lbnVRdWVyeSA9IHZpZXdDaGlsZChBdGhNZW51Q29tcG9uZW50KTtcbiAgcHJpdmF0ZSB2aWV3UmVhZHkgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBlZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3Qgb3BlbiA9IHRoaXMubWVudVF1ZXJ5KCk/Lm9wZW4oKSA/PyBmYWxzZTtcbiAgICAgIGlmICh0aGlzLnZpZXdSZWFkeSkgdGhpcy5zeW5jQXJpYShvcGVuKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdSZWFkeSA9IHRydWU7XG4gICAgdGhpcy5zeW5jQXJpYSh0aGlzLm1lbnUoKS5vcGVuKCkpO1xuICB9XG5cbiAgLyoqIE9wZW5zIG9yIGNsb3NlcyB0aGUgbWVudSAoZm9jdXMgZ29lcyB0byB0aGUgZmlyc3QgaXRlbSB3aGVuIG9wZW5pbmcpLiAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5tZW51KCkudG9nZ2xlKHRoaXMudHJpZ2dlclJlZigpLm5hdGl2ZUVsZW1lbnQsICdmaXJzdCcpO1xuICB9XG5cbiAgLyoqIEVtaXRzIHRoZSBpdGVtJ3MgaWQsIGFzIGEgY2xpY2sgb24gaXQgZG9lcy4gKi9cbiAgc2VsZWN0SXRlbShpdGVtOiBEcm9wZG93bkFjdGlvbik6IHZvaWQge1xuICAgIGlmIChpdGVtLmRpc2FibGVkKSByZXR1cm47XG4gICAgdGhpcy5pdGVtQ2xpY2tlZC5lbWl0KGl0ZW0uaWQpO1xuICAgIHRoaXMubWVudSgpLmhpZGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbk9wZW5DaGFuZ2Uob3BlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KG9wZW4pO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uSG9zdENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5UcmlnZ2VyKGV2ZW50KSkgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkhvc3RLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluVHJpZ2dlcihldmVudCkpIHJldHVybjtcbiAgICBjb25zdCB3cmFwcGVySXNDb250cm9sID0gdGhpcy5jb250cm9sKCkgPT09IHRoaXMudHJpZ2dlclJlZigpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3Qga2V5ID0gZXZlbnQua2V5O1xuICAgIGlmIChrZXkgPT09ICdBcnJvd0Rvd24nIHx8IGtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5tZW51KCkuc2hvdyh0aGlzLnRyaWdnZXJSZWYoKS5uYXRpdmVFbGVtZW50LCBrZXkgPT09ICdBcnJvd1VwJyA/ICdsYXN0JyA6ICdmaXJzdCcpO1xuICAgIH0gZWxzZSBpZiAod3JhcHBlcklzQ29udHJvbCAmJiAoa2V5ID09PSAnRW50ZXInIHx8IGtleSA9PT0gJyAnKSkge1xuICAgICAgLy8gQSByZWFsIGJ1dHRvbiBjbGlja3Mgb24gaXRzIG93bjsgdGhlIHJvbGU9XCJidXR0b25cIiB3cmFwcGVyIGRvZXMgbm90LlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFRoZSB0cmlnZ2VyJ3MgcmVhbCBjb250cm9sLCBvciB0aGUgd3JhcHBlciB3aGVuIHRoZXJlIGlzIG5vbmUuICovXG4gIHByaXZhdGUgY29udHJvbCgpOiBIVE1MRWxlbWVudCB7XG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMudHJpZ2dlclJlZigpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgcmV0dXJuIHdyYXBwZXIucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oQ09OVFJPTCkgPz8gd3JhcHBlcjtcbiAgfVxuXG4gIHByaXZhdGUgaW5UcmlnZ2VyKGV2ZW50OiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBldmVudC50YXJnZXQgaW5zdGFuY2VvZiBOb2RlICYmIHRoaXMudHJpZ2dlclJlZigpLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KTtcbiAgfVxuXG4gIHByaXZhdGUgc3luY0FyaWEob3BlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLnRyaWdnZXJSZWYoKS5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmNvbnRyb2woKTtcbiAgICBpZiAoY29udHJvbCA9PT0gd3JhcHBlcikge1xuICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XG4gICAgICB3cmFwcGVyLnRhYkluZGV4ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgd3JhcHBlci5yZW1vdmVBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgICAgIHdyYXBwZXIucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgIH1cbiAgICBjb250cm9sLnNldEF0dHJpYnV0ZSgnYXJpYS1oYXNwb3B1cCcsICdtZW51Jyk7XG4gICAgY29udHJvbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBTdHJpbmcob3BlbikpO1xuICAgIGlmIChvcGVuKSBjb250cm9sLnNldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycsIHRoaXMubWVudSgpLnBhbmVsSWQpO1xuICAgIGVsc2UgY29udHJvbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKTtcbiAgfVxufVxuIiwiPHNwYW4gI3RyaWdnZXIgY2xhc3M9XCJhdGgtZHJvcGRvd25fX3RyaWdnZXJcIj5cbiAgPG5nLWNvbnRlbnQgLz5cbjwvc3Bhbj5cblxuPCEtLSBhdGgtZHJvcGRvd25fX21lbnU6IGFwcCBjb2RlIGNoZWNrcyBmb3IgYW4gb3BlbiBkcm9wZG93biBieSB0aGlzIGNsYXNzLiAtLT5cbjxhdGgtbWVudVxuICBwYW5lbENsYXNzPVwiYXRoLWRyb3Bkb3duX19tZW51XCJcbiAgW2FuY2hvcl09XCJ0cmlnZ2VyXCJcbiAgW2FsaWduXT1cIm1lbnVBbGlnbigpXCJcbiAgKG9wZW5DaGFuZ2UpPVwib25PcGVuQ2hhbmdlKCRldmVudClcIlxuPlxuICBAZm9yIChlbnRyeSBvZiBlbnRyaWVzKCk7IHRyYWNrIGVudHJ5LmtleSkge1xuICAgIEBpZiAoZW50cnkuYWN0aW9uOyBhcyBpdGVtKSB7XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGF0aE1lbnVJdGVtXG4gICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgIGNsYXNzPVwiYXRoLWRyb3Bkb3duX19pdGVtXCJcbiAgICAgICAgW2NsYXNzLmF0aC1kcm9wZG93bl9faXRlbS0tZGFuZ2VyXT1cIml0ZW0udmFyaWFudCA9PT0gJ2RhbmdlcidcIlxuICAgICAgICBbaWNvbl09XCJpdGVtLmljb25cIlxuICAgICAgICBbdmFyaWFudF09XCJpdGVtLnZhcmlhbnQgPz8gJ2RlZmF1bHQnXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiEhaXRlbS5kaXNhYmxlZFwiXG4gICAgICAgIFtkaXNhYmxlZFJlYXNvbl09XCJpdGVtLnRpdGxlXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiaXRlbS50aXRsZVwiXG4gICAgICAgIFtzaG9ydGN1dF09XCJpdGVtLnNob3J0Y3V0ID8/IG51bGxcIlxuICAgICAgICAodHJpZ2dlcmVkKT1cIml0ZW1DbGlja2VkLmVtaXQoaXRlbS5pZClcIlxuICAgICAgPlxuICAgICAgICB7eyBpdGVtLmxhYmVsIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICB9IEBlbHNlIHtcbiAgICAgIDxhdGgtbWVudS1zZXBhcmF0b3IgLz5cbiAgICB9XG4gIH1cbjwvYXRoLW1lbnU+XG4iXX0=