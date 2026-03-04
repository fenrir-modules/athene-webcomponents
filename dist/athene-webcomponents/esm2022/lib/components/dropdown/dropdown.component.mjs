import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, ElementRef, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Athene Dropdown Component
 *
 * Smart-positioning action menu.
 * Automatically opens upward/downward and left/right depending
 * on where the trigger sits in the viewport.
 *
 * @example
 * <ath-dropdown [items]="menuItems" (itemClicked)="onAction($event)">
 *   <ath-button variant="ghost">Actions</ath-button>
 * </ath-dropdown>
 */
export class AthDropdownComponent {
    constructor() {
        this.el = inject(ElementRef);
        this.cdr = inject(ChangeDetectorRef);
        /** Menu items */
        this.items = [];
        /**
         * Horizontal alignment hint.
         * - `'left'`  – menu anchored to the left edge of trigger
         * - `'right'` – menu anchored to the right edge of trigger
         * - `'auto'`  – pick best side based on viewport space
         *
         * Vertical direction is always auto-detected.
         */
        this.align = 'auto';
        /** Item click event */
        this.itemClicked = new EventEmitter();
        /** Emits `true` when the menu opens, `false` when it closes. */
        this.openChange = new EventEmitter();
        this.isOpen = false;
        // Computed placement — set each time the menu opens
        this.placementX = 'right';
        this.placementY = 'down';
    }
    onDocumentClick(event) {
        if (!this.el.nativeElement.contains(event.target)) {
            this.close();
        }
    }
    onEscapeKey() {
        this.close();
    }
    toggle() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.isOpen = true;
            this.openChange.emit(true);
            this.computePlacement();
        }
    }
    onTriggerKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggle();
        }
    }
    selectItem(item) {
        if (item.disabled || item.divider)
            return;
        this.itemClicked.emit(item.id);
        this.close();
    }
    close() {
        if (!this.isOpen)
            return;
        this.isOpen = false;
        this.openChange.emit(false);
    }
    getItemClasses(item) {
        return [
            'ath-dropdown__item',
            item.variant === 'danger' ? 'ath-dropdown__item--danger' : '',
            item.disabled ? 'ath-dropdown__item--disabled' : '',
        ]
            .filter(Boolean)
            .join(' ');
    }
    /** Determine where to place the menu based on trigger position */
    computePlacement() {
        const trigger = this.el.nativeElement;
        const rect = trigger.getBoundingClientRect();
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        // Vertical: if trigger is in the bottom 40% of viewport → open upward
        this.placementY = rect.bottom > vh * 0.6 ? 'up' : 'down';
        // Horizontal: respect explicit hint, otherwise auto-detect
        if (this.align === 'left') {
            this.placementX = 'left';
        }
        else if (this.align === 'right') {
            this.placementX = 'right';
        }
        else {
            // auto: if trigger center is in the right half → anchor right
            const center = rect.left + rect.width / 2;
            this.placementX = center > vw / 2 ? 'right' : 'left';
        }
        this.cdr.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDropdownComponent, isStandalone: true, selector: "ath-dropdown", inputs: { items: "items", align: "align" }, outputs: { itemClicked: "itemClicked", openChange: "openChange" }, host: { listeners: { "document:click": "onDocumentClick($event)", "document:keydown.escape": "onEscapeKey()" } }, ngImport: i0, template: "<div class=\"ath-dropdown\">\n  <div\n    class=\"ath-dropdown__trigger\"\n    role=\"button\"\n    tabindex=\"0\"\n    aria-haspopup=\"menu\"\n    [attr.aria-expanded]=\"isOpen\"\n    (click)=\"toggle()\"\n    (keydown)=\"onTriggerKeydown($event)\"\n  >\n    <ng-content />\n  </div>\n\n  @if (isOpen) {\n    <div\n      class=\"ath-dropdown__menu\"\n      role=\"menu\"\n      [class.ath-dropdown__menu--left]=\"placementX === 'left'\"\n      [class.ath-dropdown__menu--right]=\"placementX === 'right'\"\n      [class.ath-dropdown__menu--down]=\"placementY === 'down'\"\n      [class.ath-dropdown__menu--up]=\"placementY === 'up'\"\n    >\n      @for (item of items; track item.id) {\n        @if (item.divider) {\n          <div class=\"ath-dropdown__divider\"></div>\n        } @else {\n          <button\n            type=\"button\"\n            [class]=\"getItemClasses(item)\"\n            [disabled]=\"item.disabled\"\n            (click)=\"selectItem(item)\"\n            role=\"menuitem\"\n          >\n            @if (item.icon) {\n              <lucide-icon [img]=\"item.icon\" [size]=\"16\" class=\"ath-dropdown__item-icon\" />\n            }\n            <span>{{ item.label }}</span>\n          </button>\n        }\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-dropdown{position:relative;display:inline-flex}.ath-dropdown__trigger{cursor:pointer}.ath-dropdown__menu{position:absolute;z-index:var(--ath-z-dropdown);min-width:180px;padding:var(--ath-space-1);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg)}.ath-dropdown__menu--down{top:calc(100% + var(--ath-space-1));animation:ath-dd-down .15s ease}.ath-dropdown__menu--up{bottom:calc(100% + var(--ath-space-1));animation:ath-dd-up .15s ease}.ath-dropdown__menu--left{left:0}.ath-dropdown__menu--right{right:0}.ath-dropdown__item{display:flex;align-items:center;gap:var(--ath-space-2);width:100%;padding:var(--ath-space-2) var(--ath-space-3);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;text-align:left;transition:background-color var(--ath-transition-fast)}.ath-dropdown__item:hover:not(:disabled){background-color:var(--ath-bg-tertiary)}.ath-dropdown__item--danger{color:var(--ath-color-error)}.ath-dropdown__item--danger:hover:not(:disabled){background-color:#ef44441a}.ath-dropdown__item--disabled{opacity:.4;cursor:not-allowed}.ath-dropdown__item-icon{flex-shrink:0;color:inherit}.ath-dropdown__divider{height:1px;margin:var(--ath-space-1) 0;background-color:var(--ath-border-color)}@keyframes ath-dd-down{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@keyframes ath-dd-up{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dropdown', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-dropdown\">\n  <div\n    class=\"ath-dropdown__trigger\"\n    role=\"button\"\n    tabindex=\"0\"\n    aria-haspopup=\"menu\"\n    [attr.aria-expanded]=\"isOpen\"\n    (click)=\"toggle()\"\n    (keydown)=\"onTriggerKeydown($event)\"\n  >\n    <ng-content />\n  </div>\n\n  @if (isOpen) {\n    <div\n      class=\"ath-dropdown__menu\"\n      role=\"menu\"\n      [class.ath-dropdown__menu--left]=\"placementX === 'left'\"\n      [class.ath-dropdown__menu--right]=\"placementX === 'right'\"\n      [class.ath-dropdown__menu--down]=\"placementY === 'down'\"\n      [class.ath-dropdown__menu--up]=\"placementY === 'up'\"\n    >\n      @for (item of items; track item.id) {\n        @if (item.divider) {\n          <div class=\"ath-dropdown__divider\"></div>\n        } @else {\n          <button\n            type=\"button\"\n            [class]=\"getItemClasses(item)\"\n            [disabled]=\"item.disabled\"\n            (click)=\"selectItem(item)\"\n            role=\"menuitem\"\n          >\n            @if (item.icon) {\n              <lucide-icon [img]=\"item.icon\" [size]=\"16\" class=\"ath-dropdown__item-icon\" />\n            }\n            <span>{{ item.label }}</span>\n          </button>\n        }\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-dropdown{position:relative;display:inline-flex}.ath-dropdown__trigger{cursor:pointer}.ath-dropdown__menu{position:absolute;z-index:var(--ath-z-dropdown);min-width:180px;padding:var(--ath-space-1);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg)}.ath-dropdown__menu--down{top:calc(100% + var(--ath-space-1));animation:ath-dd-down .15s ease}.ath-dropdown__menu--up{bottom:calc(100% + var(--ath-space-1));animation:ath-dd-up .15s ease}.ath-dropdown__menu--left{left:0}.ath-dropdown__menu--right{right:0}.ath-dropdown__item{display:flex;align-items:center;gap:var(--ath-space-2);width:100%;padding:var(--ath-space-2) var(--ath-space-3);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;text-align:left;transition:background-color var(--ath-transition-fast)}.ath-dropdown__item:hover:not(:disabled){background-color:var(--ath-bg-tertiary)}.ath-dropdown__item--danger{color:var(--ath-color-error)}.ath-dropdown__item--danger:hover:not(:disabled){background-color:#ef44441a}.ath-dropdown__item--disabled{opacity:.4;cursor:not-allowed}.ath-dropdown__item-icon{flex-shrink:0;color:inherit}.ath-dropdown__divider{height:1px;margin:var(--ath-space-1) 0;background-color:var(--ath-border-color)}@keyframes ath-dd-down{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@keyframes ath-dd-up{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}\n"] }]
        }], propDecorators: { items: [{
                type: Input
            }], align: [{
                type: Input
            }], itemClicked: [{
                type: Output
            }], openChange: [{
                type: Output
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], onEscapeKey: [{
                type: HostListener,
                args: ['document:keydown.escape']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFvQnJEOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLG9CQUFvQjtJQVJqQztRQVNtQixPQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLFFBQUcsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVqRCxpQkFBaUI7UUFDUixVQUFLLEdBQW1CLEVBQUUsQ0FBQztRQUVwQzs7Ozs7OztXQU9HO1FBQ00sVUFBSyxHQUFrQixNQUFNLENBQUM7UUFFdkMsdUJBQXVCO1FBQ2IsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRW5ELGdFQUFnRTtRQUN0RCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUV6QyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXpCLG9EQUFvRDtRQUMxQyxlQUFVLEdBQXFCLE9BQU8sQ0FBQztRQUN2Qyxl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QUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3ZELENBQUM7UUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7K0dBdEdVLG9CQUFvQjttR0FBcEIsb0JBQW9CLHlTQ3BEakMscXZDQTJDQSxzcERESVksWUFBWSw4QkFBRSxtQkFBbUI7OzRGQUtoQyxvQkFBb0I7a0JBUmhDLFNBQVM7K0JBQ0UsY0FBYyxjQUNaLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxtQkFDM0IsdUJBQXVCLENBQUMsTUFBTTs4QkFTdEMsS0FBSztzQkFBYixLQUFLO2dCQVVHLEtBQUs7c0JBQWIsS0FBSztnQkFHSSxXQUFXO3NCQUFwQixNQUFNO2dCQUdHLFVBQVU7c0JBQW5CLE1BQU07Z0JBU1AsZUFBZTtzQkFEZCxZQUFZO3VCQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVExQyxXQUFXO3NCQURWLFlBQVk7dUJBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBFbGVtZW50UmVmLFxuICBpbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUgfSBmcm9tICdsdWNpZGUtYW5ndWxhcic7XG5cbi8qKlxuICogRHJvcGRvd24gbWVudSBpdGVtXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JdGVtIHtcbiAgaWQ6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgaWNvbj86IGFueTtcbiAgdmFyaWFudD86ICdkZWZhdWx0JyB8ICdkYW5nZXInO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGRpdmlkZXI/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEhvcml6b250YWwgYWxpZ25tZW50IGhpbnQuXG4gKiBgJ2F1dG8nYCBwaWNrcyBsZWZ0IG9yIHJpZ2h0IGJhc2VkIG9uIGF2YWlsYWJsZSB2aWV3cG9ydCBzcGFjZS5cbiAqL1xuZXhwb3J0IHR5cGUgRHJvcGRvd25BbGlnbiA9ICdsZWZ0JyB8ICdyaWdodCcgfCAnYXV0byc7XG5cbi8qKlxuICogQXRoZW5lIERyb3Bkb3duIENvbXBvbmVudFxuICpcbiAqIFNtYXJ0LXBvc2l0aW9uaW5nIGFjdGlvbiBtZW51LlxuICogQXV0b21hdGljYWxseSBvcGVucyB1cHdhcmQvZG93bndhcmQgYW5kIGxlZnQvcmlnaHQgZGVwZW5kaW5nXG4gKiBvbiB3aGVyZSB0aGUgdHJpZ2dlciBzaXRzIGluIHRoZSB2aWV3cG9ydC5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1kcm9wZG93biBbaXRlbXNdPVwibWVudUl0ZW1zXCIgKGl0ZW1DbGlja2VkKT1cIm9uQWN0aW9uKCRldmVudClcIj5cbiAqICAgPGF0aC1idXR0b24gdmFyaWFudD1cImdob3N0XCI+QWN0aW9uczwvYXRoLWJ1dHRvbj5cbiAqIDwvYXRoLWRyb3Bkb3duPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtZHJvcGRvd24nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBMdWNpZGVBbmd1bGFyTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9kcm9wZG93bi5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aERyb3Bkb3duQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSBlbCA9IGluamVjdChFbGVtZW50UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjZHIgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuXG4gIC8qKiBNZW51IGl0ZW1zICovXG4gIEBJbnB1dCgpIGl0ZW1zOiBEcm9wZG93bkl0ZW1bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBIb3Jpem9udGFsIGFsaWdubWVudCBoaW50LlxuICAgKiAtIGAnbGVmdCdgICDigJMgbWVudSBhbmNob3JlZCB0byB0aGUgbGVmdCBlZGdlIG9mIHRyaWdnZXJcbiAgICogLSBgJ3JpZ2h0J2Ag4oCTIG1lbnUgYW5jaG9yZWQgdG8gdGhlIHJpZ2h0IGVkZ2Ugb2YgdHJpZ2dlclxuICAgKiAtIGAnYXV0bydgICDigJMgcGljayBiZXN0IHNpZGUgYmFzZWQgb24gdmlld3BvcnQgc3BhY2VcbiAgICpcbiAgICogVmVydGljYWwgZGlyZWN0aW9uIGlzIGFsd2F5cyBhdXRvLWRldGVjdGVkLlxuICAgKi9cbiAgQElucHV0KCkgYWxpZ246IERyb3Bkb3duQWxpZ24gPSAnYXV0byc7XG5cbiAgLyoqIEl0ZW0gY2xpY2sgZXZlbnQgKi9cbiAgQE91dHB1dCgpIGl0ZW1DbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgLyoqIEVtaXRzIGB0cnVlYCB3aGVuIHRoZSBtZW51IG9wZW5zLCBgZmFsc2VgIHdoZW4gaXQgY2xvc2VzLiAqL1xuICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBwcm90ZWN0ZWQgaXNPcGVuID0gZmFsc2U7XG5cbiAgLy8gQ29tcHV0ZWQgcGxhY2VtZW50IOKAlCBzZXQgZWFjaCB0aW1lIHRoZSBtZW51IG9wZW5zXG4gIHByb3RlY3RlZCBwbGFjZW1lbnRYOiAnbGVmdCcgfCAncmlnaHQnID0gJ3JpZ2h0JztcbiAgcHJvdGVjdGVkIHBsYWNlbWVudFk6ICdkb3duJyB8ICd1cCcgPSAnZG93bic7XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICBvbkRvY3VtZW50Q2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5lc2NhcGUnKVxuICBvbkVzY2FwZUtleSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5jb21wdXRlUGxhY2VtZW50KCk7XG4gICAgfVxuICB9XG5cbiAgb25UcmlnZ2VyS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnICcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEl0ZW0oaXRlbTogRHJvcGRvd25JdGVtKTogdm9pZCB7XG4gICAgaWYgKGl0ZW0uZGlzYWJsZWQgfHwgaXRlbS5kaXZpZGVyKSByZXR1cm47XG4gICAgdGhpcy5pdGVtQ2xpY2tlZC5lbWl0KGl0ZW0uaWQpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbikgcmV0dXJuO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgZ2V0SXRlbUNsYXNzZXMoaXRlbTogRHJvcGRvd25JdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2F0aC1kcm9wZG93bl9faXRlbScsXG4gICAgICBpdGVtLnZhcmlhbnQgPT09ICdkYW5nZXInID8gJ2F0aC1kcm9wZG93bl9faXRlbS0tZGFuZ2VyJyA6ICcnLFxuICAgICAgaXRlbS5kaXNhYmxlZCA/ICdhdGgtZHJvcGRvd25fX2l0ZW0tLWRpc2FibGVkJyA6ICcnLFxuICAgIF1cbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5qb2luKCcgJyk7XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lIHdoZXJlIHRvIHBsYWNlIHRoZSBtZW51IGJhc2VkIG9uIHRyaWdnZXIgcG9zaXRpb24gKi9cbiAgcHJpdmF0ZSBjb21wdXRlUGxhY2VtZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IHRyaWdnZXIgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgcmVjdCA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgdmggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3QgdncgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuICAgIC8vIFZlcnRpY2FsOiBpZiB0cmlnZ2VyIGlzIGluIHRoZSBib3R0b20gNDAlIG9mIHZpZXdwb3J0IOKGkiBvcGVuIHVwd2FyZFxuICAgIHRoaXMucGxhY2VtZW50WSA9IHJlY3QuYm90dG9tID4gdmggKiAwLjYgPyAndXAnIDogJ2Rvd24nO1xuXG4gICAgLy8gSG9yaXpvbnRhbDogcmVzcGVjdCBleHBsaWNpdCBoaW50LCBvdGhlcndpc2UgYXV0by1kZXRlY3RcbiAgICBpZiAodGhpcy5hbGlnbiA9PT0gJ2xlZnQnKSB7XG4gICAgICB0aGlzLnBsYWNlbWVudFggPSAnbGVmdCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFsaWduID09PSAncmlnaHQnKSB7XG4gICAgICB0aGlzLnBsYWNlbWVudFggPSAncmlnaHQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdXRvOiBpZiB0cmlnZ2VyIGNlbnRlciBpcyBpbiB0aGUgcmlnaHQgaGFsZiDihpIgYW5jaG9yIHJpZ2h0XG4gICAgICBjb25zdCBjZW50ZXIgPSByZWN0LmxlZnQgKyByZWN0LndpZHRoIC8gMjtcbiAgICAgIHRoaXMucGxhY2VtZW50WCA9IGNlbnRlciA+IHZ3IC8gMiA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgfVxuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhdGgtZHJvcGRvd25cIj5cbiAgPGRpdlxuICAgIGNsYXNzPVwiYXRoLWRyb3Bkb3duX190cmlnZ2VyXCJcbiAgICByb2xlPVwiYnV0dG9uXCJcbiAgICB0YWJpbmRleD1cIjBcIlxuICAgIGFyaWEtaGFzcG9wdXA9XCJtZW51XCJcbiAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImlzT3BlblwiXG4gICAgKGNsaWNrKT1cInRvZ2dsZSgpXCJcbiAgICAoa2V5ZG93bik9XCJvblRyaWdnZXJLZXlkb3duKCRldmVudClcIlxuICA+XG4gICAgPG5nLWNvbnRlbnQgLz5cbiAgPC9kaXY+XG5cbiAgQGlmIChpc09wZW4pIHtcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImF0aC1kcm9wZG93bl9fbWVudVwiXG4gICAgICByb2xlPVwibWVudVwiXG4gICAgICBbY2xhc3MuYXRoLWRyb3Bkb3duX19tZW51LS1sZWZ0XT1cInBsYWNlbWVudFggPT09ICdsZWZ0J1wiXG4gICAgICBbY2xhc3MuYXRoLWRyb3Bkb3duX19tZW51LS1yaWdodF09XCJwbGFjZW1lbnRYID09PSAncmlnaHQnXCJcbiAgICAgIFtjbGFzcy5hdGgtZHJvcGRvd25fX21lbnUtLWRvd25dPVwicGxhY2VtZW50WSA9PT0gJ2Rvd24nXCJcbiAgICAgIFtjbGFzcy5hdGgtZHJvcGRvd25fX21lbnUtLXVwXT1cInBsYWNlbWVudFkgPT09ICd1cCdcIlxuICAgID5cbiAgICAgIEBmb3IgKGl0ZW0gb2YgaXRlbXM7IHRyYWNrIGl0ZW0uaWQpIHtcbiAgICAgICAgQGlmIChpdGVtLmRpdmlkZXIpIHtcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXRoLWRyb3Bkb3duX19kaXZpZGVyXCI+PC9kaXY+XG4gICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzc2VzKGl0ZW0pXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpdGVtLmRpc2FibGVkXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RJdGVtKGl0ZW0pXCJcbiAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQGlmIChpdGVtLmljb24pIHtcbiAgICAgICAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiaXRlbS5pY29uXCIgW3NpemVdPVwiMTZcIiBjbGFzcz1cImF0aC1kcm9wZG93bl9faXRlbS1pY29uXCIgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxzcGFuPnt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgfVxuPC9kaXY+XG4iXX0=