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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDropdownComponent, isStandalone: true, selector: "ath-dropdown", inputs: { items: "items", align: "align" }, outputs: { itemClicked: "itemClicked", openChange: "openChange" }, host: { listeners: { "document:click": "onDocumentClick($event)", "document:keydown.escape": "onEscapeKey()" } }, ngImport: i0, template: "<div class=\"ath-dropdown\">\n  <div class=\"ath-dropdown__trigger\" (click)=\"toggle()\">\n    <ng-content />\n  </div>\n\n  @if (isOpen) {\n    <div\n      class=\"ath-dropdown__menu\"\n      [class.ath-dropdown__menu--left]=\"placementX === 'left'\"\n      [class.ath-dropdown__menu--right]=\"placementX === 'right'\"\n      [class.ath-dropdown__menu--down]=\"placementY === 'down'\"\n      [class.ath-dropdown__menu--up]=\"placementY === 'up'\"\n    >\n      @for (item of items; track item.id) {\n        @if (item.divider) {\n          <div class=\"ath-dropdown__divider\"></div>\n        } @else {\n          <button\n            type=\"button\"\n            [class]=\"getItemClasses(item)\"\n            [disabled]=\"item.disabled\"\n            (click)=\"selectItem(item)\"\n          >\n            @if (item.icon) {\n              <lucide-icon [img]=\"item.icon\" [size]=\"16\" class=\"ath-dropdown__item-icon\" />\n            }\n            <span>{{ item.label }}</span>\n          </button>\n        }\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-dropdown{position:relative;display:inline-flex}.ath-dropdown__trigger{cursor:pointer}.ath-dropdown__menu{position:absolute;z-index:var(--ath-z-dropdown);min-width:180px;padding:var(--ath-space-1);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg)}.ath-dropdown__menu--down{top:calc(100% + var(--ath-space-1));animation:ath-dd-down .15s ease}.ath-dropdown__menu--up{bottom:calc(100% + var(--ath-space-1));animation:ath-dd-up .15s ease}.ath-dropdown__menu--left{left:0}.ath-dropdown__menu--right{right:0}.ath-dropdown__item{display:flex;align-items:center;gap:var(--ath-space-2);width:100%;padding:var(--ath-space-2) var(--ath-space-3);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;text-align:left;transition:background-color var(--ath-transition-fast)}.ath-dropdown__item:hover:not(:disabled){background-color:var(--ath-bg-tertiary)}.ath-dropdown__item--danger{color:var(--ath-color-error)}.ath-dropdown__item--danger:hover:not(:disabled){background-color:#ef44441a}.ath-dropdown__item--disabled{opacity:.4;cursor:not-allowed}.ath-dropdown__item-icon{flex-shrink:0;color:inherit}.ath-dropdown__divider{height:1px;margin:var(--ath-space-1) 0;background-color:var(--ath-border-color)}@keyframes ath-dd-down{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@keyframes ath-dd-up{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dropdown', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-dropdown\">\n  <div class=\"ath-dropdown__trigger\" (click)=\"toggle()\">\n    <ng-content />\n  </div>\n\n  @if (isOpen) {\n    <div\n      class=\"ath-dropdown__menu\"\n      [class.ath-dropdown__menu--left]=\"placementX === 'left'\"\n      [class.ath-dropdown__menu--right]=\"placementX === 'right'\"\n      [class.ath-dropdown__menu--down]=\"placementY === 'down'\"\n      [class.ath-dropdown__menu--up]=\"placementY === 'up'\"\n    >\n      @for (item of items; track item.id) {\n        @if (item.divider) {\n          <div class=\"ath-dropdown__divider\"></div>\n        } @else {\n          <button\n            type=\"button\"\n            [class]=\"getItemClasses(item)\"\n            [disabled]=\"item.disabled\"\n            (click)=\"selectItem(item)\"\n          >\n            @if (item.icon) {\n              <lucide-icon [img]=\"item.icon\" [size]=\"16\" class=\"ath-dropdown__item-icon\" />\n            }\n            <span>{{ item.label }}</span>\n          </button>\n        }\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-dropdown{position:relative;display:inline-flex}.ath-dropdown__trigger{cursor:pointer}.ath-dropdown__menu{position:absolute;z-index:var(--ath-z-dropdown);min-width:180px;padding:var(--ath-space-1);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg)}.ath-dropdown__menu--down{top:calc(100% + var(--ath-space-1));animation:ath-dd-down .15s ease}.ath-dropdown__menu--up{bottom:calc(100% + var(--ath-space-1));animation:ath-dd-up .15s ease}.ath-dropdown__menu--left{left:0}.ath-dropdown__menu--right{right:0}.ath-dropdown__item{display:flex;align-items:center;gap:var(--ath-space-2);width:100%;padding:var(--ath-space-2) var(--ath-space-3);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;text-align:left;transition:background-color var(--ath-transition-fast)}.ath-dropdown__item:hover:not(:disabled){background-color:var(--ath-bg-tertiary)}.ath-dropdown__item--danger{color:var(--ath-color-error)}.ath-dropdown__item--danger:hover:not(:disabled){background-color:#ef44441a}.ath-dropdown__item--disabled{opacity:.4;cursor:not-allowed}.ath-dropdown__item-icon{flex-shrink:0;color:inherit}.ath-dropdown__divider{height:1px;margin:var(--ath-space-1) 0;background-color:var(--ath-border-color)}@keyframes ath-dd-down{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@keyframes ath-dd-up{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFvQnJEOzs7Ozs7Ozs7OztHQVdHO0FBU0gsTUFBTSxPQUFPLG9CQUFvQjtJQVJqQztRQVNtQixPQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLFFBQUcsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVqRCxpQkFBaUI7UUFDUixVQUFLLEdBQW1CLEVBQUUsQ0FBQztRQUVwQzs7Ozs7OztXQU9HO1FBQ00sVUFBSyxHQUFrQixNQUFNLENBQUM7UUFFdkMsdUJBQXVCO1FBQ2IsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRW5ELGdFQUFnRTtRQUN0RCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUV6QyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXpCLG9EQUFvRDtRQUMxQyxlQUFVLEdBQXFCLE9BQU8sQ0FBQztRQUN2Qyxl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QUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDOytHQS9GVSxvQkFBb0I7bUdBQXBCLG9CQUFvQix5U0NwRGpDLDZoQ0FpQ0Esc3BERGNZLFlBQVksOEJBQUUsbUJBQW1COzs0RkFLaEMsb0JBQW9CO2tCQVJoQyxTQUFTOytCQUNFLGNBQWMsY0FDWixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsbUJBQzNCLHVCQUF1QixDQUFDLE1BQU07OEJBU3RDLEtBQUs7c0JBQWIsS0FBSztnQkFVRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0ksV0FBVztzQkFBcEIsTUFBTTtnQkFHRyxVQUFVO3NCQUFuQixNQUFNO2dCQVNQLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFRMUMsV0FBVztzQkFEVixZQUFZO3VCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZixcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBMdWNpZGVBbmd1bGFyTW9kdWxlIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuXG4vKipcbiAqIERyb3Bkb3duIG1lbnUgaXRlbVxuICovXG5leHBvcnQgaW50ZXJmYWNlIERyb3Bkb3duSXRlbSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGljb24/OiBhbnk7XG4gIHZhcmlhbnQ/OiAnZGVmYXVsdCcgfCAnZGFuZ2VyJztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBkaXZpZGVyPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBIb3Jpem9udGFsIGFsaWdubWVudCBoaW50LlxuICogYCdhdXRvJ2AgcGlja3MgbGVmdCBvciByaWdodCBiYXNlZCBvbiBhdmFpbGFibGUgdmlld3BvcnQgc3BhY2UuXG4gKi9cbmV4cG9ydCB0eXBlIERyb3Bkb3duQWxpZ24gPSAnbGVmdCcgfCAncmlnaHQnIHwgJ2F1dG8nO1xuXG4vKipcbiAqIEF0aGVuZSBEcm9wZG93biBDb21wb25lbnRcbiAqXG4gKiBTbWFydC1wb3NpdGlvbmluZyBhY3Rpb24gbWVudS5cbiAqIEF1dG9tYXRpY2FsbHkgb3BlbnMgdXB3YXJkL2Rvd253YXJkIGFuZCBsZWZ0L3JpZ2h0IGRlcGVuZGluZ1xuICogb24gd2hlcmUgdGhlIHRyaWdnZXIgc2l0cyBpbiB0aGUgdmlld3BvcnQuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtZHJvcGRvd24gW2l0ZW1zXT1cIm1lbnVJdGVtc1wiIChpdGVtQ2xpY2tlZCk9XCJvbkFjdGlvbigkZXZlbnQpXCI+XG4gKiAgIDxhdGgtYnV0dG9uIHZhcmlhbnQ9XCJnaG9zdFwiPkFjdGlvbnM8L2F0aC1idXR0b24+XG4gKiA8L2F0aC1kcm9wZG93bj5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWRyb3Bkb3duJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTHVjaWRlQW5ndWxhck1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vZHJvcGRvd24uY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhEcm9wZG93bkNvbXBvbmVudCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZWwgPSBpbmplY3QoRWxlbWVudFJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2RyID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcblxuICAvKiogTWVudSBpdGVtcyAqL1xuICBASW5wdXQoKSBpdGVtczogRHJvcGRvd25JdGVtW10gPSBbXTtcblxuICAvKipcbiAgICogSG9yaXpvbnRhbCBhbGlnbm1lbnQgaGludC5cbiAgICogLSBgJ2xlZnQnYCAg4oCTIG1lbnUgYW5jaG9yZWQgdG8gdGhlIGxlZnQgZWRnZSBvZiB0cmlnZ2VyXG4gICAqIC0gYCdyaWdodCdgIOKAkyBtZW51IGFuY2hvcmVkIHRvIHRoZSByaWdodCBlZGdlIG9mIHRyaWdnZXJcbiAgICogLSBgJ2F1dG8nYCAg4oCTIHBpY2sgYmVzdCBzaWRlIGJhc2VkIG9uIHZpZXdwb3J0IHNwYWNlXG4gICAqXG4gICAqIFZlcnRpY2FsIGRpcmVjdGlvbiBpcyBhbHdheXMgYXV0by1kZXRlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGFsaWduOiBEcm9wZG93bkFsaWduID0gJ2F1dG8nO1xuXG4gIC8qKiBJdGVtIGNsaWNrIGV2ZW50ICovXG4gIEBPdXRwdXQoKSBpdGVtQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKiBFbWl0cyBgdHJ1ZWAgd2hlbiB0aGUgbWVudSBvcGVucywgYGZhbHNlYCB3aGVuIGl0IGNsb3Nlcy4gKi9cbiAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgcHJvdGVjdGVkIGlzT3BlbiA9IGZhbHNlO1xuXG4gIC8vIENvbXB1dGVkIHBsYWNlbWVudCDigJQgc2V0IGVhY2ggdGltZSB0aGUgbWVudSBvcGVuc1xuICBwcm90ZWN0ZWQgcGxhY2VtZW50WDogJ2xlZnQnIHwgJ3JpZ2h0JyA9ICdyaWdodCc7XG4gIHByb3RlY3RlZCBwbGFjZW1lbnRZOiAnZG93bicgfCAndXAnID0gJ2Rvd24nO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25Eb2N1bWVudENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uZXNjYXBlJylcbiAgb25Fc2NhcGVLZXkoKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMuY29tcHV0ZVBsYWNlbWVudCgpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEl0ZW0oaXRlbTogRHJvcGRvd25JdGVtKTogdm9pZCB7XG4gICAgaWYgKGl0ZW0uZGlzYWJsZWQgfHwgaXRlbS5kaXZpZGVyKSByZXR1cm47XG4gICAgdGhpcy5pdGVtQ2xpY2tlZC5lbWl0KGl0ZW0uaWQpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbikgcmV0dXJuO1xuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgZ2V0SXRlbUNsYXNzZXMoaXRlbTogRHJvcGRvd25JdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2F0aC1kcm9wZG93bl9faXRlbScsXG4gICAgICBpdGVtLnZhcmlhbnQgPT09ICdkYW5nZXInID8gJ2F0aC1kcm9wZG93bl9faXRlbS0tZGFuZ2VyJyA6ICcnLFxuICAgICAgaXRlbS5kaXNhYmxlZCA/ICdhdGgtZHJvcGRvd25fX2l0ZW0tLWRpc2FibGVkJyA6ICcnLFxuICAgIF1cbiAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgIC5qb2luKCcgJyk7XG4gIH1cblxuICAvKiogRGV0ZXJtaW5lIHdoZXJlIHRvIHBsYWNlIHRoZSBtZW51IGJhc2VkIG9uIHRyaWdnZXIgcG9zaXRpb24gKi9cbiAgcHJpdmF0ZSBjb21wdXRlUGxhY2VtZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IHRyaWdnZXIgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgcmVjdCA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgdmggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3QgdncgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuICAgIC8vIFZlcnRpY2FsOiBpZiB0cmlnZ2VyIGlzIGluIHRoZSBib3R0b20gNDAlIG9mIHZpZXdwb3J0IOKGkiBvcGVuIHVwd2FyZFxuICAgIHRoaXMucGxhY2VtZW50WSA9IHJlY3QuYm90dG9tID4gdmggKiAwLjYgPyAndXAnIDogJ2Rvd24nO1xuXG4gICAgLy8gSG9yaXpvbnRhbDogcmVzcGVjdCBleHBsaWNpdCBoaW50LCBvdGhlcndpc2UgYXV0by1kZXRlY3RcbiAgICBpZiAodGhpcy5hbGlnbiA9PT0gJ2xlZnQnKSB7XG4gICAgICB0aGlzLnBsYWNlbWVudFggPSAnbGVmdCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFsaWduID09PSAncmlnaHQnKSB7XG4gICAgICB0aGlzLnBsYWNlbWVudFggPSAncmlnaHQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdXRvOiBpZiB0cmlnZ2VyIGNlbnRlciBpcyBpbiB0aGUgcmlnaHQgaGFsZiDihpIgYW5jaG9yIHJpZ2h0XG4gICAgICBjb25zdCBjZW50ZXIgPSByZWN0LmxlZnQgKyByZWN0LndpZHRoIC8gMjtcbiAgICAgIHRoaXMucGxhY2VtZW50WCA9IGNlbnRlciA+IHZ3IC8gMiA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgfVxuXG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhdGgtZHJvcGRvd25cIj5cbiAgPGRpdiBjbGFzcz1cImF0aC1kcm9wZG93bl9fdHJpZ2dlclwiIChjbGljayk9XCJ0b2dnbGUoKVwiPlxuICAgIDxuZy1jb250ZW50IC8+XG4gIDwvZGl2PlxuXG4gIEBpZiAoaXNPcGVuKSB7XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJhdGgtZHJvcGRvd25fX21lbnVcIlxuICAgICAgW2NsYXNzLmF0aC1kcm9wZG93bl9fbWVudS0tbGVmdF09XCJwbGFjZW1lbnRYID09PSAnbGVmdCdcIlxuICAgICAgW2NsYXNzLmF0aC1kcm9wZG93bl9fbWVudS0tcmlnaHRdPVwicGxhY2VtZW50WCA9PT0gJ3JpZ2h0J1wiXG4gICAgICBbY2xhc3MuYXRoLWRyb3Bkb3duX19tZW51LS1kb3duXT1cInBsYWNlbWVudFkgPT09ICdkb3duJ1wiXG4gICAgICBbY2xhc3MuYXRoLWRyb3Bkb3duX19tZW51LS11cF09XCJwbGFjZW1lbnRZID09PSAndXAnXCJcbiAgICA+XG4gICAgICBAZm9yIChpdGVtIG9mIGl0ZW1zOyB0cmFjayBpdGVtLmlkKSB7XG4gICAgICAgIEBpZiAoaXRlbS5kaXZpZGVyKSB7XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImF0aC1kcm9wZG93bl9fZGl2aWRlclwiPjwvZGl2PlxuICAgICAgICB9IEBlbHNlIHtcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJnZXRJdGVtQ2xhc3NlcyhpdGVtKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXRlbS5kaXNhYmxlZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0SXRlbShpdGVtKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQGlmIChpdGVtLmljb24pIHtcbiAgICAgICAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiaXRlbS5pY29uXCIgW3NpemVdPVwiMTZcIiBjbGFzcz1cImF0aC1kcm9wZG93bl9faXRlbS1pY29uXCIgLz5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDxzcGFuPnt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgfVxuPC9kaXY+XG4iXX0=