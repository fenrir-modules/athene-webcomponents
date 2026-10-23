import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, HostListener, ElementRef, ViewChild, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { floatPanel } from '../floating/floating';
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
        /**
         * The open menu floats (`position: fixed`, kept inside the viewport), so a
         * side panel's or table's overflow never cuts it off.
         */
        this.unfloat = null;
        // Computed placement — set each time the menu opens
        this.placementX = 'right';
        this.placementY = 'down';
    }
    set menuEl(ref) {
        this.unfloat?.();
        this.unfloat = null;
        if (!ref)
            return;
        const trigger = this.el.nativeElement.querySelector('.ath-dropdown__trigger');
        if (!trigger)
            return;
        this.unfloat = floatPanel(ref.nativeElement, trigger, {
            align: this.align === 'left' ? 'start' : this.align === 'right' ? 'end' : 'auto',
        });
    }
    ngOnDestroy() {
        this.unfloat?.();
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDropdownComponent, isStandalone: true, selector: "ath-dropdown", inputs: { items: "items", align: "align" }, outputs: { itemClicked: "itemClicked", openChange: "openChange" }, host: { listeners: { "document:click": "onDocumentClick($event)", "document:keydown.escape": "onEscapeKey()" } }, viewQueries: [{ propertyName: "menuEl", first: true, predicate: ["menu"], descendants: true }], ngImport: i0, template: "<div class=\"ath-dropdown\">\n  <div\n    class=\"ath-dropdown__trigger\"\n    role=\"button\"\n    tabindex=\"0\"\n    aria-haspopup=\"menu\"\n    [attr.aria-expanded]=\"isOpen\"\n    (click)=\"toggle()\"\n    (keydown)=\"onTriggerKeydown($event)\"\n  >\n    <ng-content />\n  </div>\n\n  @if (isOpen) {\n    <div\n      #menu\n      class=\"ath-dropdown__menu\"\n      role=\"menu\"\n      [class.ath-dropdown__menu--left]=\"placementX === 'left'\"\n      [class.ath-dropdown__menu--right]=\"placementX === 'right'\"\n      [class.ath-dropdown__menu--down]=\"placementY === 'down'\"\n      [class.ath-dropdown__menu--up]=\"placementY === 'up'\"\n    >\n      @for (item of items; track item.id) {\n        @if (item.divider) {\n          <div class=\"ath-dropdown__divider\"></div>\n        } @else {\n          <button\n            type=\"button\"\n            [class]=\"getItemClasses(item)\"\n            [disabled]=\"item.disabled\"\n            [attr.title]=\"item.title || null\"\n            (click)=\"selectItem(item)\"\n            role=\"menuitem\"\n          >\n            @if (item.icon) {\n              <lucide-icon [img]=\"item.icon\" [size]=\"16\" class=\"ath-dropdown__item-icon\" />\n            }\n            <span>{{ item.label }}</span>\n          </button>\n        }\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-dropdown{position:relative;display:inline-flex}.ath-dropdown__trigger{cursor:pointer}.ath-dropdown__menu{position:absolute;z-index:var(--z-dropdown);min-width:180px;padding:var(--ath-space-1);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);box-shadow:var(--ath-shadow-lg)}.ath-dropdown__menu--down{top:calc(100% + var(--ath-space-1));animation:ath-dd-down .15s ease}.ath-dropdown__menu--up{bottom:calc(100% + var(--ath-space-1));animation:ath-dd-up .15s ease}.ath-dropdown__menu--left{left:0}.ath-dropdown__menu--right{right:0}.ath-dropdown__item{display:flex;align-items:center;gap:var(--ath-space-2);width:100%;padding:var(--ath-space-2) var(--ath-space-3);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;text-align:left;transition:background-color var(--ath-transition-fast)}.ath-dropdown__item:hover:not(:disabled){background-color:var(--ath-bg-tertiary)}.ath-dropdown__item--danger{color:var(--ath-color-error)}.ath-dropdown__item--danger:hover:not(:disabled){background-color:var(--red-tint)}.ath-dropdown__item--disabled{opacity:.4;cursor:not-allowed}.ath-dropdown__item-icon{flex-shrink:0;color:inherit}.ath-dropdown__divider{height:1px;margin:var(--ath-space-1) 0;background-color:var(--ath-border-color)}@keyframes ath-dd-down{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@keyframes ath-dd-up{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dropdown', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-dropdown\">\n  <div\n    class=\"ath-dropdown__trigger\"\n    role=\"button\"\n    tabindex=\"0\"\n    aria-haspopup=\"menu\"\n    [attr.aria-expanded]=\"isOpen\"\n    (click)=\"toggle()\"\n    (keydown)=\"onTriggerKeydown($event)\"\n  >\n    <ng-content />\n  </div>\n\n  @if (isOpen) {\n    <div\n      #menu\n      class=\"ath-dropdown__menu\"\n      role=\"menu\"\n      [class.ath-dropdown__menu--left]=\"placementX === 'left'\"\n      [class.ath-dropdown__menu--right]=\"placementX === 'right'\"\n      [class.ath-dropdown__menu--down]=\"placementY === 'down'\"\n      [class.ath-dropdown__menu--up]=\"placementY === 'up'\"\n    >\n      @for (item of items; track item.id) {\n        @if (item.divider) {\n          <div class=\"ath-dropdown__divider\"></div>\n        } @else {\n          <button\n            type=\"button\"\n            [class]=\"getItemClasses(item)\"\n            [disabled]=\"item.disabled\"\n            [attr.title]=\"item.title || null\"\n            (click)=\"selectItem(item)\"\n            role=\"menuitem\"\n          >\n            @if (item.icon) {\n              <lucide-icon [img]=\"item.icon\" [size]=\"16\" class=\"ath-dropdown__item-icon\" />\n            }\n            <span>{{ item.label }}</span>\n          </button>\n        }\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-dropdown{position:relative;display:inline-flex}.ath-dropdown__trigger{cursor:pointer}.ath-dropdown__menu{position:absolute;z-index:var(--z-dropdown);min-width:180px;padding:var(--ath-space-1);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);box-shadow:var(--ath-shadow-lg)}.ath-dropdown__menu--down{top:calc(100% + var(--ath-space-1));animation:ath-dd-down .15s ease}.ath-dropdown__menu--up{bottom:calc(100% + var(--ath-space-1));animation:ath-dd-up .15s ease}.ath-dropdown__menu--left{left:0}.ath-dropdown__menu--right{right:0}.ath-dropdown__item{display:flex;align-items:center;gap:var(--ath-space-2);width:100%;padding:var(--ath-space-2) var(--ath-space-3);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;text-align:left;transition:background-color var(--ath-transition-fast)}.ath-dropdown__item:hover:not(:disabled){background-color:var(--ath-bg-tertiary)}.ath-dropdown__item--danger{color:var(--ath-color-error)}.ath-dropdown__item--danger:hover:not(:disabled){background-color:var(--red-tint)}.ath-dropdown__item--disabled{opacity:.4;cursor:not-allowed}.ath-dropdown__item-icon{flex-shrink:0;color:inherit}.ath-dropdown__divider{height:1px;margin:var(--ath-space-1) 0;background-color:var(--ath-border-color)}@keyframes ath-dd-down{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@keyframes ath-dd-up{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}\n"] }]
        }], propDecorators: { items: [{
                type: Input
            }], align: [{
                type: Input
            }], itemClicked: [{
                type: Output
            }], openChange: [{
                type: Output
            }], menuEl: [{
                type: ViewChild,
                args: ['menu']
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], onEscapeKey: [{
                type: HostListener,
                args: ['document:keydown.escape']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFVBQVUsRUFFVixTQUFTLEVBQ1QsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQXNCbEQ7Ozs7Ozs7Ozs7O0dBV0c7QUFTSCxNQUFNLE9BQU8sb0JBQW9CO0lBUmpDO1FBU21CLE9BQUUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsUUFBRyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWpELGlCQUFpQjtRQUNSLFVBQUssR0FBbUIsRUFBRSxDQUFDO1FBRXBDOzs7Ozs7O1dBT0c7UUFDTSxVQUFLLEdBQWtCLE1BQU0sQ0FBQztRQUV2Qyx1QkFBdUI7UUFDYixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbkQsZ0VBQWdFO1FBQ3RELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBRXpDLFdBQU0sR0FBRyxLQUFL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RkFLaEMsb0JBQW9CO2tCQVJoQyxTQUFTOytCQUNFLGNBQWMsY0FDWixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUMsbUJBQzNCLHVCQUF1QixDQUFDLE1BQU07OEJBU3RDLEtBQUs7c0JBQWIsS0FBSztnQkFVRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0ksV0FBVztzQkFBcEIsTUFBTTtnQkFHRyxVQUFVO3NCQUFuQixNQUFNO2dCQVVLLE1BQU07c0JBRGpCLFNBQVM7dUJBQUMsTUFBTTtnQkF1QmpCLGVBQWU7c0JBRGQsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFRMUMsV0FBVztzQkFEVixZQUFZO3VCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBWaWV3Q2hpbGQsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcbmltcG9ydCB7IGZsb2F0UGFuZWwgfSBmcm9tICcuLi9mbG9hdGluZy9mbG9hdGluZyc7XG5cbi8qKlxuICogRHJvcGRvd24gbWVudSBpdGVtXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRHJvcGRvd25JdGVtIHtcbiAgaWQ6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgaWNvbj86IGFueTtcbiAgdmFyaWFudD86ICdkZWZhdWx0JyB8ICdkYW5nZXInO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGRpdmlkZXI/OiBib29sZWFuO1xuICAvKiogQSB0b29sdGlwIOKAlCBlLmcuIHdoeSBhIGRpc2FibGVkIGl0ZW0gY2Fubm90IGJlIGNob3Nlbi4gKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogSG9yaXpvbnRhbCBhbGlnbm1lbnQgaGludC5cbiAqIGAnYXV0bydgIHBpY2tzIGxlZnQgb3IgcmlnaHQgYmFzZWQgb24gYXZhaWxhYmxlIHZpZXdwb3J0IHNwYWNlLlxuICovXG5leHBvcnQgdHlwZSBEcm9wZG93bkFsaWduID0gJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdhdXRvJztcblxuLyoqXG4gKiBBdGhlbmUgRHJvcGRvd24gQ29tcG9uZW50XG4gKlxuICogU21hcnQtcG9zaXRpb25pbmcgYWN0aW9uIG1lbnUuXG4gKiBBdXRvbWF0aWNhbGx5IG9wZW5zIHVwd2FyZC9kb3dud2FyZCBhbmQgbGVmdC9yaWdodCBkZXBlbmRpbmdcbiAqIG9uIHdoZXJlIHRoZSB0cmlnZ2VyIHNpdHMgaW4gdGhlIHZpZXdwb3J0LlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWRyb3Bkb3duIFtpdGVtc109XCJtZW51SXRlbXNcIiAoaXRlbUNsaWNrZWQpPVwib25BY3Rpb24oJGV2ZW50KVwiPlxuICogICA8YXRoLWJ1dHRvbiB2YXJpYW50PVwiZ2hvc3RcIj5BY3Rpb25zPC9hdGgtYnV0dG9uPlxuICogPC9hdGgtZHJvcGRvd24+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1kcm9wZG93bicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2Ryb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2Ryb3Bkb3duLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoRHJvcGRvd25Db21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IGVsID0gaW5qZWN0KEVsZW1lbnRSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkciA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG5cbiAgLyoqIE1lbnUgaXRlbXMgKi9cbiAgQElucHV0KCkgaXRlbXM6IERyb3Bkb3duSXRlbVtdID0gW107XG5cbiAgLyoqXG4gICAqIEhvcml6b250YWwgYWxpZ25tZW50IGhpbnQuXG4gICAqIC0gYCdsZWZ0J2AgIOKAkyBtZW51IGFuY2hvcmVkIHRvIHRoZSBsZWZ0IGVkZ2Ugb2YgdHJpZ2dlclxuICAgKiAtIGAncmlnaHQnYCDigJMgbWVudSBhbmNob3JlZCB0byB0aGUgcmlnaHQgZWRnZSBvZiB0cmlnZ2VyXG4gICAqIC0gYCdhdXRvJ2AgIOKAkyBwaWNrIGJlc3Qgc2lkZSBiYXNlZCBvbiB2aWV3cG9ydCBzcGFjZVxuICAgKlxuICAgKiBWZXJ0aWNhbCBkaXJlY3Rpb24gaXMgYWx3YXlzIGF1dG8tZGV0ZWN0ZWQuXG4gICAqL1xuICBASW5wdXQoKSBhbGlnbjogRHJvcGRvd25BbGlnbiA9ICdhdXRvJztcblxuICAvKiogSXRlbSBjbGljayBldmVudCAqL1xuICBAT3V0cHV0KCkgaXRlbUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICAvKiogRW1pdHMgYHRydWVgIHdoZW4gdGhlIG1lbnUgb3BlbnMsIGBmYWxzZWAgd2hlbiBpdCBjbG9zZXMuICovXG4gIEBPdXRwdXQoKSBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIHByb3RlY3RlZCBpc09wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogVGhlIG9wZW4gbWVudSBmbG9hdHMgKGBwb3NpdGlvbjogZml4ZWRgLCBrZXB0IGluc2lkZSB0aGUgdmlld3BvcnQpLCBzbyBhXG4gICAqIHNpZGUgcGFuZWwncyBvciB0YWJsZSdzIG92ZXJmbG93IG5ldmVyIGN1dHMgaXQgb2ZmLlxuICAgKi9cbiAgcHJpdmF0ZSB1bmZsb2F0OiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbiAgQFZpZXdDaGlsZCgnbWVudScpXG4gIHByaXZhdGUgc2V0IG1lbnVFbChyZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy51bmZsb2F0Py4oKTtcbiAgICB0aGlzLnVuZmxvYXQgPSBudWxsO1xuICAgIGlmICghcmVmKSByZXR1cm47XG4gICAgY29uc3QgdHJpZ2dlciA9ICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFxuICAgICAgJy5hdGgtZHJvcGRvd25fX3RyaWdnZXInXG4gICAgKTtcbiAgICBpZiAoIXRyaWdnZXIpIHJldHVybjtcbiAgICB0aGlzLnVuZmxvYXQgPSBmbG9hdFBhbmVsKHJlZi5uYXRpdmVFbGVtZW50LCB0cmlnZ2VyLCB7XG4gICAgICBhbGlnbjogdGhpcy5hbGlnbiA9PT0gJ2xlZnQnID8gJ3N0YXJ0JyA6IHRoaXMuYWxpZ24gPT09ICdyaWdodCcgPyAnZW5kJyA6ICdhdXRvJyxcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5mbG9hdD8uKCk7XG4gIH1cblxuICAvLyBDb21wdXRlZCBwbGFjZW1lbnQg4oCUIHNldCBlYWNoIHRpbWUgdGhlIG1lbnUgb3BlbnNcbiAgcHJvdGVjdGVkIHBsYWNlbWVudFg6ICdsZWZ0JyB8ICdyaWdodCcgPSAncmlnaHQnO1xuICBwcm90ZWN0ZWQgcGxhY2VtZW50WTogJ2Rvd24nIHwgJ3VwJyA9ICdkb3duJztcblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uRG9jdW1lbnRDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLmVzY2FwZScpXG4gIG9uRXNjYXBlS2V5KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgdGhpcy5vcGVuQ2hhbmdlLmVtaXQodHJ1ZSk7XG4gICAgICB0aGlzLmNvbXB1dGVQbGFjZW1lbnQoKTtcbiAgICB9XG4gIH1cblxuICBvblRyaWdnZXJLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICcgJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0SXRlbShpdGVtOiBEcm9wZG93bkl0ZW0pOiB2b2lkIHtcbiAgICBpZiAoaXRlbS5kaXNhYmxlZCB8fCBpdGVtLmRpdmlkZXIpIHJldHVybjtcbiAgICB0aGlzLml0ZW1DbGlja2VkLmVtaXQoaXRlbS5pZCk7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSByZXR1cm47XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdChmYWxzZSk7XG4gIH1cblxuICBnZXRJdGVtQ2xhc3NlcyhpdGVtOiBEcm9wZG93bkl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICAnYXRoLWRyb3Bkb3duX19pdGVtJyxcbiAgICAgIGl0ZW0udmFyaWFudCA9PT0gJ2RhbmdlcicgPyAnYXRoLWRyb3Bkb3duX19pdGVtLS1kYW5nZXInIDogJycsXG4gICAgICBpdGVtLmRpc2FibGVkID8gJ2F0aC1kcm9wZG93bl9faXRlbS0tZGlzYWJsZWQnIDogJycsXG4gICAgXVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKiBEZXRlcm1pbmUgd2hlcmUgdG8gcGxhY2UgdGhlIG1lbnUgYmFzZWQgb24gdHJpZ2dlciBwb3NpdGlvbiAqL1xuICBwcml2YXRlIGNvbXB1dGVQbGFjZW1lbnQoKTogdm9pZCB7XG4gICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZWwubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCByZWN0ID0gdHJpZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCB2dyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgLy8gVmVydGljYWw6IGlmIHRyaWdnZXIgaXMgaW4gdGhlIGJvdHRvbSA0MCUgb2Ygdmlld3BvcnQg4oaSIG9wZW4gdXB3YXJkXG4gICAgdGhpcy5wbGFjZW1lbnRZID0gcmVjdC5ib3R0b20gPiB2aCAqIDAuNiA/ICd1cCcgOiAnZG93bic7XG5cbiAgICAvLyBIb3Jpem9udGFsOiByZXNwZWN0IGV4cGxpY2l0IGhpbnQsIG90aGVyd2lzZSBhdXRvLWRldGVjdFxuICAgIGlmICh0aGlzLmFsaWduID09PSAnbGVmdCcpIHtcbiAgICAgIHRoaXMucGxhY2VtZW50WCA9ICdsZWZ0JztcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWxpZ24gPT09ICdyaWdodCcpIHtcbiAgICAgIHRoaXMucGxhY2VtZW50WCA9ICdyaWdodCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGF1dG86IGlmIHRyaWdnZXIgY2VudGVyIGlzIGluIHRoZSByaWdodCBoYWxmIOKGkiBhbmNob3IgcmlnaHRcbiAgICAgIGNvbnN0IGNlbnRlciA9IHJlY3QubGVmdCArIHJlY3Qud2lkdGggLyAyO1xuICAgICAgdGhpcy5wbGFjZW1lbnRYID0gY2VudGVyID4gdncgLyAyID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICB9XG5cbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImF0aC1kcm9wZG93blwiPlxuICA8ZGl2XG4gICAgY2xhc3M9XCJhdGgtZHJvcGRvd25fX3RyaWdnZXJcIlxuICAgIHJvbGU9XCJidXR0b25cIlxuICAgIHRhYmluZGV4PVwiMFwiXG4gICAgYXJpYS1oYXNwb3B1cD1cIm1lbnVcIlxuICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXNPcGVuXCJcbiAgICAoY2xpY2spPVwidG9nZ2xlKClcIlxuICAgIChrZXlkb3duKT1cIm9uVHJpZ2dlcktleWRvd24oJGV2ZW50KVwiXG4gID5cbiAgICA8bmctY29udGVudCAvPlxuICA8L2Rpdj5cblxuICBAaWYgKGlzT3Blbikge1xuICAgIDxkaXZcbiAgICAgICNtZW51XG4gICAgICBjbGFzcz1cImF0aC1kcm9wZG93bl9fbWVudVwiXG4gICAgICByb2xlPVwibWVudVwiXG4gICAgICBbY2xhc3MuYXRoLWRyb3Bkb3duX19tZW51LS1sZWZ0XT1cInBsYWNlbWVudFggPT09ICdsZWZ0J1wiXG4gICAgICBbY2xhc3MuYXRoLWRyb3Bkb3duX19tZW51LS1yaWdodF09XCJwbGFjZW1lbnRYID09PSAncmlnaHQnXCJcbiAgICAgIFtjbGFzcy5hdGgtZHJvcGRvd25fX21lbnUtLWRvd25dPVwicGxhY2VtZW50WSA9PT0gJ2Rvd24nXCJcbiAgICAgIFtjbGFzcy5hdGgtZHJvcGRvd25fX21lbnUtLXVwXT1cInBsYWNlbWVudFkgPT09ICd1cCdcIlxuICAgID5cbiAgICAgIEBmb3IgKGl0ZW0gb2YgaXRlbXM7IHRyYWNrIGl0ZW0uaWQpIHtcbiAgICAgICAgQGlmIChpdGVtLmRpdmlkZXIpIHtcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXRoLWRyb3Bkb3duX19kaXZpZGVyXCI+PC9kaXY+XG4gICAgICAgIH0gQGVsc2Uge1xuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgW2NsYXNzXT1cImdldEl0ZW1DbGFzc2VzKGl0ZW0pXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJpdGVtLmRpc2FibGVkXCJcbiAgICAgICAgICAgIFthdHRyLnRpdGxlXT1cIml0ZW0udGl0bGUgfHwgbnVsbFwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0SXRlbShpdGVtKVwiXG4gICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEBpZiAoaXRlbS5pY29uKSB7XG4gICAgICAgICAgICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cIml0ZW0uaWNvblwiIFtzaXplXT1cIjE2XCIgY2xhc3M9XCJhdGgtZHJvcGRvd25fX2l0ZW0taWNvblwiIC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8c3Bhbj57eyBpdGVtLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICB9XG4gICAgICB9XG4gICAgPC9kaXY+XG4gIH1cbjwvZGl2PlxuIl19