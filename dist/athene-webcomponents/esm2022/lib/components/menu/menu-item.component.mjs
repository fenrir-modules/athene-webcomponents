import { ChangeDetectionStrategy, Component, ElementRef, booleanAttribute, inject, input, output, } from '@angular/core';
import { Check, LucideAngularModule } from 'lucide-angular';
import { focusSafely } from '../floating/focus';
import { ATH_MENU_PARENT } from './menu-parent';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
let nextReasonId = 0;
/**
 * One entry of an `ath-menu`: `<button athMenuItem>`, `<a athMenuItem>` or
 * `<ath-menu-item>`.
 *
 * Disabled items stay focusable (`aria-disabled`), so keyboard and screen
 * reader users can find them and hear `disabledReason`, which is also the
 * hover tooltip. Use `(triggered)` rather than `(click)`: it does not fire for
 * disabled items and closes the menu afterwards (unless `keepOpen`).
 *
 * @example
 * <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 * <button athMenuItem variant="danger" [disabled]="!canDelete" [disabledReason]="why"
 *         (triggered)="delete()">Delete</button>
 */
export class AthMenuItemComponent {
    constructor() {
        this.menu = inject(ATH_MENU_PARENT, { optional: true });
        /** The item element (the `<button>` or `<a>`). */
        this.element = inject(ElementRef).nativeElement;
        this.isButton = this.element.tagName === 'BUTTON';
        this.checkIcon = Check;
        this.reasonId = `ath-menu-item-reason-${++nextReasonId}`;
        /** A Lucide icon before the label. */
        this.icon = input(null);
        /** Shortcut hint shown at the end, e.g. `⌘E`. */
        this.shortcut = input(null);
        /** `aria-keyshortcuts` value, e.g. `Meta+E` (the hint itself is hidden from AT). */
        this.keyshortcuts = input(null);
        this.variant = input('default');
        this.disabled = input(false, { transform: booleanAttribute });
        /** Why the item is disabled: tooltip and accessible description. */
        this.disabledReason = input(null);
        /** Hover tooltip (for a disabled item `disabledReason` takes its place). */
        this.tooltip = input(null);
        /** `true`/`false` makes it a `menuitemcheckbox` with a check mark. */
        this.checked = input(null);
        /** Leave the menu open after activation. */
        this.keepOpen = input(false, { transform: booleanAttribute });
        /** The item was chosen (click, Enter or Space) and is not disabled. */
        this.triggered = output();
    }
    /** The visible label, for typeahead. */
    label() {
        const el = this.element.querySelector('.ath-menu-item__label');
        return (el?.textContent ?? '').trim();
    }
    focus() {
        focusSafely(this.element);
    }
    onClick(event) {
        if (this.disabled()) {
            event.preventDefault();
            return;
        }
        this.triggered.emit();
        this.menu?.itemActivated(this);
    }
    onKeydown(event) {
        // Buttons click on Enter and Space natively, links only on Enter, and
        // an <ath-menu-item> element on neither.
        const isLink = this.element.tagName === 'A';
        if ((event.key === ' ' && !this.isButton) ||
            (event.key === 'Enter' && !this.isButton && !isLink)) {
            event.preventDefault();
            this.element.click();
        }
    }
    onHover() {
        if (this.menu?.isOpen())
            this.focus();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthMenuItemComponent, isStandalone: true, selector: "ath-menu-item, button[athMenuItem], a[athMenuItem]", inputs: { icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, shortcut: { classPropertyName: "shortcut", publicName: "shortcut", isSignal: true, isRequired: false, transformFunction: null }, keyshortcuts: { classPropertyName: "keyshortcuts", publicName: "keyshortcuts", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, disabledReason: { classPropertyName: "disabledReason", publicName: "disabledReason", isSignal: true, isRequired: false, transformFunction: null }, tooltip: { classPropertyName: "tooltip", publicName: "tooltip", isSignal: true, isRequired: false, transformFunction: null }, checked: { classPropertyName: "checked", publicName: "checked", isSignal: true, isRequired: false, transformFunction: null }, keepOpen: { classPropertyName: "keepOpen", publicName: "keepOpen", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { triggered: "triggered" }, host: { attributes: { "tabindex": "-1" }, listeners: { "click": "onClick($event)", "keydown": "onKeydown($event)", "mouseenter": "onHover()" }, properties: { "attr.disabled": "null", "attr.type": "isButton ? 'button' : null", "attr.role": "checked() === null ? 'menuitem' : 'menuitemcheckbox'", "attr.aria-checked": "checked() === null ? null : checked()", "attr.aria-disabled": "disabled() || null", "attr.aria-describedby": "disabled() && disabledReason() ? reasonId : null", "attr.aria-keyshortcuts": "keyshortcuts()", "attr.title": "(disabled() && disabledReason()) || tooltip() || null", "class.ath-menu-item--danger": "variant() === 'danger'", "class.ath-menu-item--disabled": "disabled()" }, classAttribute: "ath-menu-item" }, exportAs: ["athMenuItem"], ngImport: i0, template: `
    @if (icon(); as img) {
      <lucide-icon class="ath-menu-item__icon" [img]="img" [size]="16" aria-hidden="true" />
    } @else if (checked() !== null) {
      <span class="ath-menu-item__icon" aria-hidden="true">
        @if (checked()) {
          <lucide-icon [img]="checkIcon" [size]="16" />
        }
      </span>
    }
    <span class="ath-menu-item__label"><ng-content /></span>
    @if (shortcut()) {
      <kbd class="ath-menu-item__shortcut" aria-hidden="true">{{ shortcut() }}</kbd>
    }
    @if (disabled() && disabledReason()) {
      <span class="ath-menu-item__reason" [id]="reasonId" aria-hidden="true">{{
        disabledReason()
      }}</span>
    }
  `, isInline: true, styles: [":host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--hover-strong);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-faint)}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-menu-item, button[athMenuItem], a[athMenuItem]', standalone: true, imports: [LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'athMenuItem', template: `
    @if (icon(); as img) {
      <lucide-icon class="ath-menu-item__icon" [img]="img" [size]="16" aria-hidden="true" />
    } @else if (checked() !== null) {
      <span class="ath-menu-item__icon" aria-hidden="true">
        @if (checked()) {
          <lucide-icon [img]="checkIcon" [size]="16" />
        }
      </span>
    }
    <span class="ath-menu-item__label"><ng-content /></span>
    @if (shortcut()) {
      <kbd class="ath-menu-item__shortcut" aria-hidden="true">{{ shortcut() }}</kbd>
    }
    @if (disabled() && disabledReason()) {
      <span class="ath-menu-item__reason" [id]="reasonId" aria-hidden="true">{{
        disabledReason()
      }}</span>
    }
  `, host: {
                        class: 'ath-menu-item',
                        tabindex: '-1',
                        // A static `disabled` attribute would make the native button unfocusable;
                        // disabled items stay focusable (aria-disabled).
                        '[attr.disabled]': 'null',
                        '[attr.type]': "isButton ? 'button' : null",
                        '[attr.role]': "checked() === null ? 'menuitem' : 'menuitemcheckbox'",
                        '[attr.aria-checked]': 'checked() === null ? null : checked()',
                        '[attr.aria-disabled]': 'disabled() || null',
                        '[attr.aria-describedby]': 'disabled() && disabledReason() ? reasonId : null',
                        '[attr.aria-keyshortcuts]': 'keyshortcuts()',
                        '[attr.title]': '(disabled() && disabledReason()) || tooltip() || null',
                        '[class.ath-menu-item--danger]': "variant() === 'danger'",
                        '[class.ath-menu-item--disabled]': 'disabled()',
                        '(click)': 'onClick($event)',
                        '(keydown)': 'onKeydown($event)',
                        '(mouseenter)': 'onHover()',
                    }, styles: [":host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--hover-strong);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-faint)}\n"] }]
        }] });
/** A divider between groups of menu items. */
export class AthMenuSeparatorComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuSeparatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthMenuSeparatorComponent, isStandalone: true, selector: "ath-menu-separator", host: { attributes: { "role": "separator" }, classAttribute: "ath-menu-separator" }, ngImport: i0, template: '', isInline: true, styles: [":host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--hover-strong);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-faint)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuSeparatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-menu-separator', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: '', host: { class: 'ath-menu-separator', role: 'separator' }, styles: [":host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--hover-strong);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-faint)}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9tZW51L21lbnUtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUloRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFFckI7Ozs7Ozs7Ozs7Ozs7R0FhRztBQWdESCxNQUFNLE9BQU8sb0JBQW9CO0lBL0NqQztRQWdEbUIsU0FBSSxHQUFHLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwRSxrREFBa0Q7UUFDekMsWUFBTyxHQUFHLE1BQU0sQ0FBMEIsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQzFELGFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUM7UUFDN0MsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQUcsd0JBQXdCLEVBQUUsWUFBWSxFQUFFLENBQUM7UUFFdkUsc0NBQXNDO1FBQzdCLFNBQUksR0FBRyxLQUFLLENBQWlDLElBQUksQ0FBQyxDQUFDO1FBQzVELGlEQUFpRDtRQUN4QyxhQUFRLEdBQUcsS0FBSyxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUMv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LGtEQUFrRDt3QkFDN0UsMEJBQTBCLEVBQUUsZ0JBQWdCO3dCQUM1QyxjQUFjLEVBQUUsdURBQXVEO3dCQUN2RSwrQkFBK0IsRUFBRSx3QkFBd0I7d0JBQ3pELGlDQUFpQyxFQUFFLFlBQVk7d0JBQy9DLFNBQVMsRUFBRSxpQkFBaUI7d0JBQzVCLFdBQVcsRUFBRSxtQkFBbUI7d0JBQ2hDLGNBQWMsRUFBRSxXQUFXO3FCQUM1Qjs7QUFtRUgsOENBQThDO0FBUzlDLE1BQU0sT0FBTyx5QkFBeUI7K0dBQXpCLHlCQUF5QjttR0FBekIseUJBQXlCLG1LQUoxQixFQUFFOzs0RkFJRCx5QkFBeUI7a0JBUnJDLFNBQVM7K0JBQ0Usb0JBQW9CLGNBQ2xCLElBQUksbUJBQ0MsdUJBQXVCLENBQUMsTUFBTSxZQUNyQyxFQUFFLFFBRU4sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIGJvb2xlYW5BdHRyaWJ1dGUsXG4gIGluamVjdCxcbiAgaW5wdXQsXG4gIG91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDaGVjaywgTHVjaWRlQW5ndWxhck1vZHVsZSB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcbmltcG9ydCB0eXBlIHsgQXRoSWNvbkRhdGEgfSBmcm9tICcuLi9mbG9hdGluZy9pY29uJztcbmltcG9ydCB7IGZvY3VzU2FmZWx5IH0gZnJvbSAnLi4vZmxvYXRpbmcvZm9jdXMnO1xuaW1wb3J0IHsgQVRIX01FTlVfUEFSRU5UIH0gZnJvbSAnLi9tZW51LXBhcmVudCc7XG5cbmV4cG9ydCB0eXBlIE1lbnVJdGVtVmFyaWFudCA9ICdkZWZhdWx0JyB8ICdkYW5nZXInO1xuXG5sZXQgbmV4dFJlYXNvbklkID0gMDtcblxuLyoqXG4gKiBPbmUgZW50cnkgb2YgYW4gYGF0aC1tZW51YDogYDxidXR0b24gYXRoTWVudUl0ZW0+YCwgYDxhIGF0aE1lbnVJdGVtPmAgb3JcbiAqIGA8YXRoLW1lbnUtaXRlbT5gLlxuICpcbiAqIERpc2FibGVkIGl0ZW1zIHN0YXkgZm9jdXNhYmxlIChgYXJpYS1kaXNhYmxlZGApLCBzbyBrZXlib2FyZCBhbmQgc2NyZWVuXG4gKiByZWFkZXIgdXNlcnMgY2FuIGZpbmQgdGhlbSBhbmQgaGVhciBgZGlzYWJsZWRSZWFzb25gLCB3aGljaCBpcyBhbHNvIHRoZVxuICogaG92ZXIgdG9vbHRpcC4gVXNlIGAodHJpZ2dlcmVkKWAgcmF0aGVyIHRoYW4gYChjbGljaylgOiBpdCBkb2VzIG5vdCBmaXJlIGZvclxuICogZGlzYWJsZWQgaXRlbXMgYW5kIGNsb3NlcyB0aGUgbWVudSBhZnRlcndhcmRzICh1bmxlc3MgYGtlZXBPcGVuYCkuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxidXR0b24gYXRoTWVudUl0ZW0gW2ljb25dPVwiUGVuY2lsXCIgc2hvcnRjdXQ9XCJFXCIgKHRyaWdnZXJlZCk9XCJlZGl0KClcIj5FZGl0PC9idXR0b24+XG4gKiA8YnV0dG9uIGF0aE1lbnVJdGVtIHZhcmlhbnQ9XCJkYW5nZXJcIiBbZGlzYWJsZWRdPVwiIWNhbkRlbGV0ZVwiIFtkaXNhYmxlZFJlYXNvbl09XCJ3aHlcIlxuICogICAgICAgICAodHJpZ2dlcmVkKT1cImRlbGV0ZSgpXCI+RGVsZXRlPC9idXR0b24+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1tZW51LWl0ZW0sIGJ1dHRvblthdGhNZW51SXRlbV0sIGFbYXRoTWVudUl0ZW1dJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0x1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZXhwb3J0QXM6ICdhdGhNZW51SXRlbScsXG4gIHRlbXBsYXRlOiBgXG4gICAgQGlmIChpY29uKCk7IGFzIGltZykge1xuICAgICAgPGx1Y2lkZS1pY29uIGNsYXNzPVwiYXRoLW1lbnUtaXRlbV9faWNvblwiIFtpbWddPVwiaW1nXCIgW3NpemVdPVwiMTZcIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgIH0gQGVsc2UgaWYgKGNoZWNrZWQoKSAhPT0gbnVsbCkge1xuICAgICAgPHNwYW4gY2xhc3M9XCJhdGgtbWVudS1pdGVtX19pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIEBpZiAoY2hlY2tlZCgpKSB7XG4gICAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiY2hlY2tJY29uXCIgW3NpemVdPVwiMTZcIiAvPlxuICAgICAgICB9XG4gICAgICA8L3NwYW4+XG4gICAgfVxuICAgIDxzcGFuIGNsYXNzPVwiYXRoLW1lbnUtaXRlbV9fbGFiZWxcIj48bmctY29udGVudCAvPjwvc3Bhbj5cbiAgICBAaWYgKHNob3J0Y3V0KCkpIHtcbiAgICAgIDxrYmQgY2xhc3M9XCJhdGgtbWVudS1pdGVtX19zaG9ydGN1dFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPnt7IHNob3J0Y3V0KCkgfX08L2tiZD5cbiAgICB9XG4gICAgQGlmIChkaXNhYmxlZCgpICYmIGRpc2FibGVkUmVhc29uKCkpIHtcbiAgICAgIDxzcGFuIGNsYXNzPVwiYXRoLW1lbnUtaXRlbV9fcmVhc29uXCIgW2lkXT1cInJlYXNvbklkXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+e3tcbiAgICAgICAgZGlzYWJsZWRSZWFzb24oKVxuICAgICAgfX08L3NwYW4+XG4gICAgfVxuICBgLFxuICBzdHlsZVVybDogJy4vbWVudS1pdGVtLmNvbXBvbmVudC5zY3NzJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYXRoLW1lbnUtaXRlbScsXG4gICAgdGFiaW5kZXg6ICctMScsXG4gICAgLy8gQSBzdGF0aWMgYGRpc2FibGVkYCBhdHRyaWJ1dGUgd291bGQgbWFrZSB0aGUgbmF0aXZlIGJ1dHRvbiB1bmZvY3VzYWJsZTtcbiAgICAvLyBkaXNhYmxlZCBpdGVtcyBzdGF5IGZvY3VzYWJsZSAoYXJpYS1kaXNhYmxlZCkuXG4gICAgJ1thdHRyLmRpc2FibGVkXSc6ICdudWxsJyxcbiAgICAnW2F0dHIudHlwZV0nOiBcImlzQnV0dG9uID8gJ2J1dHRvbicgOiBudWxsXCIsXG4gICAgJ1thdHRyLnJvbGVdJzogXCJjaGVja2VkKCkgPT09IG51bGwgPyAnbWVudWl0ZW0nIDogJ21lbnVpdGVtY2hlY2tib3gnXCIsXG4gICAgJ1thdHRyLmFyaWEtY2hlY2tlZF0nOiAnY2hlY2tlZCgpID09PSBudWxsID8gbnVsbCA6IGNoZWNrZWQoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkKCkgfHwgbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ2Rpc2FibGVkKCkgJiYgZGlzYWJsZWRSZWFzb24oKSA/IHJlYXNvbklkIDogbnVsbCcsXG4gICAgJ1thdHRyLmFyaWEta2V5c2hvcnRjdXRzXSc6ICdrZXlzaG9ydGN1dHMoKScsXG4gICAgJ1thdHRyLnRpdGxlXSc6ICcoZGlzYWJsZWQoKSAmJiBkaXNhYmxlZFJlYXNvbigpKSB8fCB0b29sdGlwKCkgfHwgbnVsbCcsXG4gICAgJ1tjbGFzcy5hdGgtbWVudS1pdGVtLS1kYW5nZXJdJzogXCJ2YXJpYW50KCkgPT09ICdkYW5nZXInXCIsXG4gICAgJ1tjbGFzcy5hdGgtbWVudS1pdGVtLS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQoKScsXG4gICAgJyhjbGljayknOiAnb25DbGljaygkZXZlbnQpJyxcbiAgICAnKGtleWRvd24pJzogJ29uS2V5ZG93bigkZXZlbnQpJyxcbiAgICAnKG1vdXNlZW50ZXIpJzogJ29uSG92ZXIoKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIEF0aE1lbnVJdGVtQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSBtZW51ID0gaW5qZWN0KEFUSF9NRU5VX1BBUkVOVCwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcbiAgLyoqIFRoZSBpdGVtIGVsZW1lbnQgKHRoZSBgPGJ1dHRvbj5gIG9yIGA8YT5gKS4gKi9cbiAgcmVhZG9ubHkgZWxlbWVudCA9IGluamVjdDxFbGVtZW50UmVmPEhUTUxFbGVtZW50Pj4oRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGlzQnV0dG9uID0gdGhpcy5lbGVtZW50LnRhZ05hbWUgPT09ICdCVVRUT04nO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2hlY2tJY29uID0gQ2hlY2s7XG4gIHByb3RlY3RlZCByZWFkb25seSByZWFzb25JZCA9IGBhdGgtbWVudS1pdGVtLXJlYXNvbi0keysrbmV4dFJlYXNvbklkfWA7XG5cbiAgLyoqIEEgTHVjaWRlIGljb24gYmVmb3JlIHRoZSBsYWJlbC4gKi9cbiAgcmVhZG9ubHkgaWNvbiA9IGlucHV0PEF0aEljb25EYXRhIHwgbnVsbCB8IHVuZGVmaW5lZD4obnVsbCk7XG4gIC8qKiBTaG9ydGN1dCBoaW50IHNob3duIGF0IHRoZSBlbmQsIGUuZy4gYOKMmEVgLiAqL1xuICByZWFkb25seSBzaG9ydGN1dCA9IGlucHV0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICAvKiogYGFyaWEta2V5c2hvcnRjdXRzYCB2YWx1ZSwgZS5nLiBgTWV0YStFYCAodGhlIGhpbnQgaXRzZWxmIGlzIGhpZGRlbiBmcm9tIEFUKS4gKi9cbiAgcmVhZG9ubHkga2V5c2hvcnRjdXRzID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IHZhcmlhbnQgPSBpbnB1dDxNZW51SXRlbVZhcmlhbnQ+KCdkZWZhdWx0Jyk7XG4gIHJlYWRvbmx5IGRpc2FibGVkID0gaW5wdXQoZmFsc2UsIHsgdHJhbnNmb3JtOiBib29sZWFuQXR0cmlidXRlIH0pO1xuICAvKiogV2h5IHRoZSBpdGVtIGlzIGRpc2FibGVkOiB0b29sdGlwIGFuZCBhY2Nlc3NpYmxlIGRlc2NyaXB0aW9uLiAqL1xuICByZWFkb25seSBkaXNhYmxlZFJlYXNvbiA9IGlucHV0PHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ+KG51bGwpO1xuICAvKiogSG92ZXIgdG9vbHRpcCAoZm9yIGEgZGlzYWJsZWQgaXRlbSBgZGlzYWJsZWRSZWFzb25gIHRha2VzIGl0cyBwbGFjZSkuICovXG4gIHJlYWRvbmx5IHRvb2x0aXAgPSBpbnB1dDxzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkPihudWxsKTtcbiAgLyoqIGB0cnVlYC9gZmFsc2VgIG1ha2VzIGl0IGEgYG1lbnVpdGVtY2hlY2tib3hgIHdpdGggYSBjaGVjayBtYXJrLiAqL1xuICByZWFkb25seSBjaGVja2VkID0gaW5wdXQ8Ym9vbGVhbiB8IG51bGw+KG51bGwpO1xuICAvKiogTGVhdmUgdGhlIG1lbnUgb3BlbiBhZnRlciBhY3RpdmF0aW9uLiAqL1xuICByZWFkb25seSBrZWVwT3BlbiA9IGlucHV0KGZhbHNlLCB7IHRyYW5zZm9ybTogYm9vbGVhbkF0dHJpYnV0ZSB9KTtcblxuICAvKiogVGhlIGl0ZW0gd2FzIGNob3NlbiAoY2xpY2ssIEVudGVyIG9yIFNwYWNlKSBhbmQgaXMgbm90IGRpc2FibGVkLiAqL1xuICByZWFkb25seSB0cmlnZ2VyZWQgPSBvdXRwdXQ8dm9pZD4oKTtcblxuICAvKiogVGhlIHZpc2libGUgbGFiZWwsIGZvciB0eXBlYWhlYWQuICovXG4gIGxhYmVsKCk6IHN0cmluZyB7XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLmF0aC1tZW51LWl0ZW1fX2xhYmVsJyk7XG4gICAgcmV0dXJuIChlbD8udGV4dENvbnRlbnQgPz8gJycpLnRyaW0oKTtcbiAgfVxuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIGZvY3VzU2FmZWx5KHRoaXMuZWxlbWVudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudHJpZ2dlcmVkLmVtaXQoKTtcbiAgICB0aGlzLm1lbnU/Lml0ZW1BY3RpdmF0ZWQodGhpcyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgLy8gQnV0dG9ucyBjbGljayBvbiBFbnRlciBhbmQgU3BhY2UgbmF0aXZlbHksIGxpbmtzIG9ubHkgb24gRW50ZXIsIGFuZFxuICAgIC8vIGFuIDxhdGgtbWVudS1pdGVtPiBlbGVtZW50IG9uIG5laXRoZXIuXG4gICAgY29uc3QgaXNMaW5rID0gdGhpcy5lbGVtZW50LnRhZ05hbWUgPT09ICdBJztcbiAgICBpZiAoXG4gICAgICAoZXZlbnQua2V5ID09PSAnICcgJiYgIXRoaXMuaXNCdXR0b24pIHx8XG4gICAgICAoZXZlbnQua2V5ID09PSAnRW50ZXInICYmICF0aGlzLmlzQnV0dG9uICYmICFpc0xpbmspXG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5lbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIG9uSG92ZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubWVudT8uaXNPcGVuKCkpIHRoaXMuZm9jdXMoKTtcbiAgfVxufVxuXG4vKiogQSBkaXZpZGVyIGJldHdlZW4gZ3JvdXBzIG9mIG1lbnUgaXRlbXMuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtbWVudS1zZXBhcmF0b3InLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6ICcnLFxuICBzdHlsZVVybDogJy4vbWVudS1pdGVtLmNvbXBvbmVudC5zY3NzJyxcbiAgaG9zdDogeyBjbGFzczogJ2F0aC1tZW51LXNlcGFyYXRvcicsIHJvbGU6ICdzZXBhcmF0b3InIH0sXG59KVxuZXhwb3J0IGNsYXNzIEF0aE1lbnVTZXBhcmF0b3JDb21wb25lbnQge31cbiJdfQ==