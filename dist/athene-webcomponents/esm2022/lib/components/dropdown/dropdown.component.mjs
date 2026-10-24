import { ChangeDetectionStrategy, Component, effect, input, output, viewChild, } from '@angular/core';
import { AthMenuComponent } from '../menu/menu.component';
import { AthMenuItemComponent, AthMenuSeparatorComponent } from '../menu/menu-item.component';
import * as i0 from "@angular/core";
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
        /** Menu items */
        this.items = input([]);
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
        if (item.disabled || item.divider)
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDropdownComponent, isStandalone: true, selector: "ath-dropdown", inputs: { items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { itemClicked: "itemClicked", openChange: "openChange" }, host: { listeners: { "click": "onHostClick($event)", "keydown": "onHostKeydown($event)" } }, viewQueries: [{ propertyName: "menu", first: true, predicate: AthMenuComponent, descendants: true, isSignal: true }, { propertyName: "triggerRef", first: true, predicate: ["trigger"], descendants: true, isSignal: true }, { propertyName: "menuQuery", first: true, predicate: AthMenuComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<span #trigger class=\"ath-dropdown__trigger\">\n  <ng-content />\n</span>\n\n<!-- ath-dropdown__menu: app code checks for an open dropdown by this class. -->\n<ath-menu\n  panelClass=\"ath-dropdown__menu\"\n  [anchor]=\"trigger\"\n  [align]=\"menuAlign()\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  @for (item of items(); track item.id) {\n    @if (item.divider) {\n      <ath-menu-separator />\n    } @else {\n      <button\n        athMenuItem\n        role=\"menuitem\"\n        class=\"ath-dropdown__item\"\n        [class.ath-dropdown__item--danger]=\"item.variant === 'danger'\"\n        [icon]=\"item.icon\"\n        [variant]=\"item.variant ?? 'default'\"\n        [disabled]=\"!!item.disabled\"\n        [disabledReason]=\"item.title\"\n        [tooltip]=\"item.title\"\n        [shortcut]=\"item.shortcut ?? null\"\n        (triggered)=\"itemClicked.emit(item.id)\"\n      >\n        {{ item.label }}\n      </button>\n    }\n  }\n</ath-menu>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-dropdown__trigger{display:inline-flex;cursor:pointer}.ath-dropdown__trigger[role=button]:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:var(--focus-ring-shadow)}\n"], dependencies: [{ kind: "component", type: AthMenuComponent, selector: "ath-menu", inputs: ["open", "anchor", "align", "side", "maxHeight", "ariaLabel", "panelClass"], outputs: ["openChange", "opened", "closed"], exportAs: ["athMenu"] }, { kind: "component", type: AthMenuItemComponent, selector: "ath-menu-item, button[athMenuItem], a[athMenuItem]", inputs: ["icon", "shortcut", "keyshortcuts", "variant", "disabled", "disabledReason", "tooltip", "checked", "keepOpen"], outputs: ["triggered"], exportAs: ["athMenuItem"] }, { kind: "component", type: AthMenuSeparatorComponent, selector: "ath-menu-separator" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dropdown', standalone: true, imports: [AthMenuComponent, AthMenuItemComponent, AthMenuSeparatorComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(click)': 'onHostClick($event)',
                        '(keydown)': 'onHostKeydown($event)',
                    }, template: "<span #trigger class=\"ath-dropdown__trigger\">\n  <ng-content />\n</span>\n\n<!-- ath-dropdown__menu: app code checks for an open dropdown by this class. -->\n<ath-menu\n  panelClass=\"ath-dropdown__menu\"\n  [anchor]=\"trigger\"\n  [align]=\"menuAlign()\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  @for (item of items(); track item.id) {\n    @if (item.divider) {\n      <ath-menu-separator />\n    } @else {\n      <button\n        athMenuItem\n        role=\"menuitem\"\n        class=\"ath-dropdown__item\"\n        [class.ath-dropdown__item--danger]=\"item.variant === 'danger'\"\n        [icon]=\"item.icon\"\n        [variant]=\"item.variant ?? 'default'\"\n        [disabled]=\"!!item.disabled\"\n        [disabledReason]=\"item.title\"\n        [tooltip]=\"item.title\"\n        [shortcut]=\"item.shortcut ?? null\"\n        (triggered)=\"itemClicked.emit(item.id)\"\n      >\n        {{ item.label }}\n      </button>\n    }\n  }\n</ath-menu>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-dropdown__trigger{display:inline-flex;cursor:pointer}.ath-dropdown__trigger[role=button]:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:var(--focus-ring-shadow)}\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLHlCQUF5QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBeUI5RixNQUFNLEtBQUssR0FBeUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBRWxHLDREQUE0RDtBQUM1RCxNQUFNLE9BQU8sR0FBRywyRUFBMkUsQ0FBQztBQUU1Rjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQWFILE1BQU0sT0FBTyxvQkFBb0I7SUEyQi9CO1FBMUJBLGlCQUFpQjtRQUNSLFVBQUssR0FBRyxLQUFLLENBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBRTNDOzs7Ozs7O1dBT0c7UUFDTSxVQUFLLEdBQUcsS0FBSyxDQUFnQixNQUFNLENBQUMsQ0FBQztRQUU5Qyx1QkFBdUI7UUFDZCxnQkFBVyxHQUFHLE1BQU0sRUFBVSxDQUFDO1FBRXhDLGdFQUFnRTtRQUN2RCxlQUFVLEdBQUcsTUFBTSxFQUFXLENBQUM7UUFFckIsY0FBUyxHQUFH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OzRGQVNoRSxvQkFBb0I7a0JBWmhDLFNBQVM7K0JBQ0UsY0FBYyxjQUNaLElBQUksV0FDUCxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLHlCQUF5QixDQUFDLG1CQUMzRCx1QkFBdUIsQ0FBQyxNQUFNLFFBR3pDO3dCQUNKLFNBQVMsRUFBRSxxQkFBcUI7d0JBQ2hDLFdBQVcsRUFBRSx1QkFBdUI7cUJBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgZWZmZWN0LFxuICBpbnB1dCxcbiAgb3V0cHV0LFxuICB2aWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBBdGhJY29uRGF0YSB9IGZyb20gJy4uL2Zsb2F0aW5nL2ljb24nO1xuaW1wb3J0IHR5cGUgeyBGbG9hdGluZ0FsaWduIH0gZnJvbSAnLi4vZmxvYXRpbmcvZmxvYXRpbmcnO1xuaW1wb3J0IHsgQXRoTWVudUNvbXBvbmVudCB9IGZyb20gJy4uL21lbnUvbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXRoTWVudUl0ZW1Db21wb25lbnQsIEF0aE1lbnVTZXBhcmF0b3JDb21wb25lbnQgfSBmcm9tICcuLi9tZW51L21lbnUtaXRlbS5jb21wb25lbnQnO1xuXG4vKipcbiAqIERyb3Bkb3duIG1lbnUgaXRlbVxuICovXG5leHBvcnQgaW50ZXJmYWNlIERyb3Bkb3duSXRlbSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIC8qKiBBIEx1Y2lkZSBpY29uIChgaW1wb3J0IHsgUGVuY2lsIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInYCkuICovXG4gIGljb24/OiBBdGhJY29uRGF0YTtcbiAgdmFyaWFudD86ICdkZWZhdWx0JyB8ICdkYW5nZXInO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGRpdmlkZXI/OiBib29sZWFuO1xuICAvKiogQSB0b29sdGlwIOKAlCBlLmcuIHdoeSBhIGRpc2FibGVkIGl0ZW0gY2Fubm90IGJlIGNob3NlbiAoYWxzbyByZWFkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG4gIC8qKiBTaG9ydGN1dCBoaW50IGF0IHRoZSBlbmQgb2YgdGhlIGl0ZW0sIGUuZy4gYOKMmEVgLiAqL1xuICBzaG9ydGN1dD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBIb3Jpem9udGFsIGFsaWdubWVudCBoaW50LlxuICogYCdhdXRvJ2AgcGlja3MgbGVmdCBvciByaWdodCBiYXNlZCBvbiBhdmFpbGFibGUgdmlld3BvcnQgc3BhY2UuXG4gKi9cbmV4cG9ydCB0eXBlIERyb3Bkb3duQWxpZ24gPSAnbGVmdCcgfCAncmlnaHQnIHwgJ2F1dG8nO1xuXG5jb25zdCBBTElHTjogUmVjb3JkPERyb3Bkb3duQWxpZ24sIEZsb2F0aW5nQWxpZ24+ID0geyBsZWZ0OiAnc3RhcnQnLCByaWdodDogJ2VuZCcsIGF1dG86ICdhdXRvJyB9O1xuXG4vKiogVGhlIGNvbnRyb2xzIGEgcHJvamVjdGVkIHRyaWdnZXIgbWF5IGJlIChvciBjb250YWluKS4gKi9cbmNvbnN0IENPTlRST0wgPSAnYnV0dG9uLCBhW2hyZWZdLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJztcblxuLyoqXG4gKiBBdGhlbmUgRHJvcGRvd246IGFuIGFjdGlvbiBtZW51IGZyb20gYSBmbGF0IGBpdGVtc2AgbGlzdC4gQSBwcmVzZXQgb25cbiAqIGBhdGgtbWVudWAgKGtleWJvYXJkLCBmb2N1cyBhbmQgQVJJQSBjb21lIGZyb20gdGhlcmUpOyBmb3IgY3VzdG9tIHJvd3MgdXNlXG4gKiBgYXRoLW1lbnVgICsgYGF0aE1lbnVJdGVtYCBkaXJlY3RseS5cbiAqXG4gKiBUaGUgcHJvamVjdGVkIGNvbnRlbnQgaXMgdGhlIHRyaWdnZXIuIFdoZW4gaXQgaXMgKG9yIGNvbnRhaW5zKSBhIGJ1dHRvbixcbiAqIHRoYXQgYnV0dG9uIGlzIHRoZSBtZW51IGJ1dHRvbjogb25lIHRhYiBzdG9wLCB3aXRoIGBhcmlhLWhhc3BvcHVwYCxcbiAqIGBhcmlhLWV4cGFuZGVkYCBhbmQgYGFyaWEtY29udHJvbHNgIG9uIGl0LiBQbGFpbiBjb250ZW50ICh0ZXh0LCBhbiBpY29uKVxuICogZ2V0cyBhIGByb2xlPVwiYnV0dG9uXCJgIHdyYXBwZXIgaW5zdGVhZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1kcm9wZG93biBbaXRlbXNdPVwibWVudUl0ZW1zXCIgKGl0ZW1DbGlja2VkKT1cIm9uQWN0aW9uKCRldmVudClcIj5cbiAqICAgPGF0aC1idXR0b24gdmFyaWFudD1cImdob3N0XCI+QWN0aW9uczwvYXRoLWJ1dHRvbj5cbiAqIDwvYXRoLWRyb3Bkb3duPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtZHJvcGRvd24nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQXRoTWVudUNvbXBvbmVudCwgQXRoTWVudUl0ZW1Db21wb25lbnQsIEF0aE1lbnVTZXBhcmF0b3JDb21wb25lbnRdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2Ryb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2Ryb3Bkb3duLmNvbXBvbmVudC5zY3NzJyxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ29uSG9zdENsaWNrKCRldmVudCknLFxuICAgICcoa2V5ZG93biknOiAnb25Ib3N0S2V5ZG93bigkZXZlbnQpJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgQXRoRHJvcGRvd25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgLyoqIE1lbnUgaXRlbXMgKi9cbiAgcmVhZG9ubHkgaXRlbXMgPSBpbnB1dDxEcm9wZG93bkl0ZW1bXT4oW10pO1xuXG4gIC8qKlxuICAgKiBIb3Jpem9udGFsIGFsaWdubWVudCBoaW50LlxuICAgKiAtIGAnbGVmdCdgICDigJMgbWVudSBhbmNob3JlZCB0byB0aGUgbGVmdCBlZGdlIG9mIHRyaWdnZXJcbiAgICogLSBgJ3JpZ2h0J2Ag4oCTIG1lbnUgYW5jaG9yZWQgdG8gdGhlIHJpZ2h0IGVkZ2Ugb2YgdHJpZ2dlclxuICAgKiAtIGAnYXV0bydgICDigJMgcGljayBiZXN0IHNpZGUgYmFzZWQgb24gdmlld3BvcnQgc3BhY2VcbiAgICpcbiAgICogVmVydGljYWwgZGlyZWN0aW9uIGlzIGFsd2F5cyBhdXRvLWRldGVjdGVkLlxuICAgKi9cbiAgcmVhZG9ubHkgYWxpZ24gPSBpbnB1dDxEcm9wZG93bkFsaWduPignYXV0bycpO1xuXG4gIC8qKiBJdGVtIGNsaWNrIGV2ZW50ICovXG4gIHJlYWRvbmx5IGl0ZW1DbGlja2VkID0gb3V0cHV0PHN0cmluZz4oKTtcblxuICAvKiogRW1pdHMgYHRydWVgIHdoZW4gdGhlIG1lbnUgb3BlbnMsIGBmYWxzZWAgd2hlbiBpdCBjbG9zZXMuICovXG4gIHJlYWRvbmx5IG9wZW5DaGFuZ2UgPSBvdXRwdXQ8Ym9vbGVhbj4oKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWVudUFsaWduID0gKCk6IEZsb2F0aW5nQWxpZ24gPT4gQUxJR05bdGhpcy5hbGlnbigpXTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWVudSA9IHZpZXdDaGlsZC5yZXF1aXJlZChBdGhNZW51Q29tcG9uZW50KTtcbiAgcHJpdmF0ZSByZWFkb25seSB0cmlnZ2VyUmVmID0gdmlld0NoaWxkLnJlcXVpcmVkPEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+PigndHJpZ2dlcicpO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lbnVRdWVyeSA9IHZpZXdDaGlsZChBdGhNZW51Q29tcG9uZW50KTtcbiAgcHJpdmF0ZSB2aWV3UmVhZHkgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBlZmZlY3QoKCkgPT4ge1xuICAgICAgY29uc3Qgb3BlbiA9IHRoaXMubWVudVF1ZXJ5KCk/Lm9wZW4oKSA/PyBmYWxzZTtcbiAgICAgIGlmICh0aGlzLnZpZXdSZWFkeSkgdGhpcy5zeW5jQXJpYShvcGVuKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdSZWFkeSA9IHRydWU7XG4gICAgdGhpcy5zeW5jQXJpYSh0aGlzLm1lbnUoKS5vcGVuKCkpO1xuICB9XG5cbiAgLyoqIE9wZW5zIG9yIGNsb3NlcyB0aGUgbWVudSAoZm9jdXMgZ29lcyB0byB0aGUgZmlyc3QgaXRlbSB3aGVuIG9wZW5pbmcpLiAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5tZW51KCkudG9nZ2xlKHRoaXMudHJpZ2dlclJlZigpLm5hdGl2ZUVsZW1lbnQsICdmaXJzdCcpO1xuICB9XG5cbiAgLyoqIEVtaXRzIHRoZSBpdGVtJ3MgaWQsIGFzIGEgY2xpY2sgb24gaXQgZG9lcy4gKi9cbiAgc2VsZWN0SXRlbShpdGVtOiBEcm9wZG93bkl0ZW0pOiB2b2lkIHtcbiAgICBpZiAoaXRlbS5kaXNhYmxlZCB8fCBpdGVtLmRpdmlkZXIpIHJldHVybjtcbiAgICB0aGlzLml0ZW1DbGlja2VkLmVtaXQoaXRlbS5pZCk7XG4gICAgdGhpcy5tZW51KCkuaGlkZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uT3BlbkNoYW5nZShvcGVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQob3Blbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25Ib3N0Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pblRyaWdnZXIoZXZlbnQpKSB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uSG9zdEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaW5UcmlnZ2VyKGV2ZW50KSkgcmV0dXJuO1xuICAgIGNvbnN0IHdyYXBwZXJJc0NvbnRyb2wgPSB0aGlzLmNvbnRyb2woKSA9PT0gdGhpcy50cmlnZ2VyUmVmKCkubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBrZXkgPSBldmVudC5rZXk7XG4gICAgaWYgKGtleSA9PT0gJ0Fycm93RG93bicgfHwga2V5ID09PSAnQXJyb3dVcCcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLm1lbnUoKS5zaG93KHRoaXMudHJpZ2dlclJlZigpLm5hdGl2ZUVsZW1lbnQsIGtleSA9PT0gJ0Fycm93VXAnID8gJ2xhc3QnIDogJ2ZpcnN0Jyk7XG4gICAgfSBlbHNlIGlmICh3cmFwcGVySXNDb250cm9sICYmIChrZXkgPT09ICdFbnRlcicgfHwga2V5ID09PSAnICcpKSB7XG4gICAgICAvLyBBIHJlYWwgYnV0dG9uIGNsaWNrcyBvbiBpdHMgb3duOyB0aGUgcm9sZT1cImJ1dHRvblwiIHdyYXBwZXIgZG9lcyBub3QuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICAvKiogVGhlIHRyaWdnZXIncyByZWFsIGNvbnRyb2wsIG9yIHRoZSB3cmFwcGVyIHdoZW4gdGhlcmUgaXMgbm9uZS4gKi9cbiAgcHJpdmF0ZSBjb250cm9sKCk6IEhUTUxFbGVtZW50IHtcbiAgICBjb25zdCB3cmFwcGVyID0gdGhpcy50cmlnZ2VyUmVmKCkubmF0aXZlRWxlbWVudDtcbiAgICByZXR1cm4gd3JhcHBlci5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihDT05UUk9MKSA/PyB3cmFwcGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBpblRyaWdnZXIoZXZlbnQ6IEV2ZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIE5vZGUgJiYgdGhpcy50cmlnZ2VyUmVmKCkubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzeW5jQXJpYShvcGVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMudHJpZ2dlclJlZigpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMuY29udHJvbCgpO1xuICAgIGlmIChjb250cm9sID09PSB3cmFwcGVyKSB7XG4gICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcbiAgICAgIHdyYXBwZXIudGFiSW5kZXggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwcGVyLnJlbW92ZUF0dHJpYnV0ZSgncm9sZScpO1xuICAgICAgd3JhcHBlci5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgfVxuICAgIGNvbnRyb2wuc2V0QXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJywgJ21lbnUnKTtcbiAgICBjb250cm9sLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIFN0cmluZyhvcGVuKSk7XG4gICAgaWYgKG9wZW4pIGNvbnRyb2wuc2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJywgdGhpcy5tZW51KCkucGFuZWxJZCk7XG4gICAgZWxzZSBjb250cm9sLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpO1xuICB9XG59XG4iLCI8c3BhbiAjdHJpZ2dlciBjbGFzcz1cImF0aC1kcm9wZG93bl9fdHJpZ2dlclwiPlxuICA8bmctY29udGVudCAvPlxuPC9zcGFuPlxuXG48IS0tIGF0aC1kcm9wZG93bl9fbWVudTogYXBwIGNvZGUgY2hlY2tzIGZvciBhbiBvcGVuIGRyb3Bkb3duIGJ5IHRoaXMgY2xhc3MuIC0tPlxuPGF0aC1tZW51XG4gIHBhbmVsQ2xhc3M9XCJhdGgtZHJvcGRvd25fX21lbnVcIlxuICBbYW5jaG9yXT1cInRyaWdnZXJcIlxuICBbYWxpZ25dPVwibWVudUFsaWduKClcIlxuICAob3BlbkNoYW5nZSk9XCJvbk9wZW5DaGFuZ2UoJGV2ZW50KVwiXG4+XG4gIEBmb3IgKGl0ZW0gb2YgaXRlbXMoKTsgdHJhY2sgaXRlbS5pZCkge1xuICAgIEBpZiAoaXRlbS5kaXZpZGVyKSB7XG4gICAgICA8YXRoLW1lbnUtc2VwYXJhdG9yIC8+XG4gICAgfSBAZWxzZSB7XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGF0aE1lbnVJdGVtXG4gICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgIGNsYXNzPVwiYXRoLWRyb3Bkb3duX19pdGVtXCJcbiAgICAgICAgW2NsYXNzLmF0aC1kcm9wZG93bl9faXRlbS0tZGFuZ2VyXT1cIml0ZW0udmFyaWFudCA9PT0gJ2RhbmdlcidcIlxuICAgICAgICBbaWNvbl09XCJpdGVtLmljb25cIlxuICAgICAgICBbdmFyaWFudF09XCJpdGVtLnZhcmlhbnQgPz8gJ2RlZmF1bHQnXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiEhaXRlbS5kaXNhYmxlZFwiXG4gICAgICAgIFtkaXNhYmxlZFJlYXNvbl09XCJpdGVtLnRpdGxlXCJcbiAgICAgICAgW3Rvb2x0aXBdPVwiaXRlbS50aXRsZVwiXG4gICAgICAgIFtzaG9ydGN1dF09XCJpdGVtLnNob3J0Y3V0ID8/IG51bGxcIlxuICAgICAgICAodHJpZ2dlcmVkKT1cIml0ZW1DbGlja2VkLmVtaXQoaXRlbS5pZClcIlxuICAgICAgPlxuICAgICAgICB7eyBpdGVtLmxhYmVsIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICB9XG4gIH1cbjwvYXRoLW1lbnU+XG4iXX0=