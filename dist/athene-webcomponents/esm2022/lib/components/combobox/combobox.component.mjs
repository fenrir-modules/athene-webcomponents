import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, computed, inject, signal, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { floatPanel } from '../floating/floating';
import { LucideAngularModule, ChevronDown, Check, Search, X } from 'lucide-angular';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "lucide-angular";
/**
 * Searchable single-select dropdown. The foundation for UserPicker,
 * LabelPicker, ProjectPicker, AssigneePicker, etc.
 *
 * For custom rendering pass an `optionTpl` template.
 *
 * @example
 * <ath-combobox
 *   [options]="users"
 *   [(value)]="selected"
 *   placeholder="Pick assignee"
 *   (queryChange)="search($event)" />
 */
export class AthComboboxComponent {
    constructor() {
        /**
         * The open panel floats (`position: fixed`, kept inside the viewport), so
         * a side panel's or dialog's overflow never cuts it off.
         */
        this.unfloat = null;
        this.host = inject((ElementRef));
        this.options = [];
        this.value = null;
        this.placeholder = 'Select…';
        this.searchPlaceholder = 'Search';
        this.disabled = false;
        this.clearable = false;
        this.loading = false;
        /** Hide the trigger's button styling; render only the popup (controlled mode). */
        this.bare = false;
        /** Optional custom template for each option (`<ng-template let-option>`). */
        this.optionTpl = null;
        this.valueChange = new EventEmitter();
        /** Emits the search query when it changes (for async/server search). */
        this.queryChange = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.chevronIcon = ChevronDown;
        this.checkIcon = Check;
        this.searchIcon = Search;
        this.clearIcon = X;
        this.open = signal(false);
        this.query = signal('');
        this.highlighted = signal(0);
        this.filtered = computed(() => {
            const q = this.query().trim().toLowerCase();
            if (!q)
                return this.options;
            return this.options.filter((o) => o.label.toLowerCase().includes(q) || (o.sublabel ?? '').toLowerCase().includes(q));
        });
        /** Result with `null` separators inserted between groups. */
        this.grouped = computed(() => {
            const items = this.filtered();
            if (!items.some((i) => i.group))
                return items;
            const byGroup = new Map();
            const noGroup = [];
            for (const item of items) {
                if (item.group) {
                    const arr = byGroup.get(item.group) ?? [];
                    arr.push(item);
                    byGroup.set(item.group, arr);
                }
                else {
                    noGroup.push(item);
                }
            }
            const result = [];
            for (const [group, list] of byGroup) {
                result.push({ _group: group });
                result.push(...list);
            }
            if (noGroup.length) {
                if (byGroup.size > 0)
                    result.push({ _group: 'Other' });
                result.push(...noGroup);
            }
            return result;
        });
        this.selectedOption = computed(() => this.options.find((o) => o.value === this.value) ?? null);
        this.trackByValue = (index, item) => {
            return this.isOption(item) ? item.value : `__group_${item._group}`;
        };
    }
    set panelEl(ref) {
        this.unfloat?.();
        this.unfloat = null;
        if (!ref)
            return;
        const root = this.host.nativeElement;
        const anchor = root.querySelector('.ath-cb__trigger') ?? root;
        this.unfloat = floatPanel(ref.nativeElement, anchor, { align: 'auto', matchWidth: !this.bare });
    }
    ngOnDestroy() {
        this.unfloat?.();
    }
    toggle() {
        if (this.disabled)
            return;
        if (this.open()) {
            this.close();
        }
        else {
            this.openPanel();
        }
    }
    openPanel() {
        if (this.disabled)
            return;
        this.open.set(true);
        this.query.set('');
        this.highlighted.set(0);
        this.opened.emit();
        queueMicrotask(() => this.searchInput?.nativeElement.focus());
    }
    close() {
        if (!this.open())
            return;
        this.open.set(false);
        this.closed.emit();
    }
    select(option) {
        if (option.disabled)
            return;
        this.value = option.value;
        this.valueChange.emit(option.value);
        this.close();
    }
    clearValue(event) {
        event.stopPropagation();
        this.value = null;
        this.valueChange.emit(null);
    }
    onQueryInput(value) {
        this.query.set(value);
        this.highlighted.set(0);
        this.queryChange.emit(value);
    }
    isOption(item) {
        return !('_group' in item);
    }
    isHighlighted(index, item) {
        if (!this.isOption(item))
            return false;
        const realIndex = this.filtered().indexOf(item);
        return realIndex === this.highlighted();
    }
    // ---------- Keyboard navigation ----------
    onSearchKey(event) {
        const items = this.filtered();
        if (items.length === 0) {
            if (event.key === 'Escape')
                this.close();
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.highlighted.update((i) => Math.min(i + 1, items.length - 1));
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.highlighted.update((i) => Math.max(i - 1, 0));
                break;
            case 'Enter':
                event.preventDefault();
                this.select(items[this.highlighted()]);
                break;
            case 'Escape':
                event.preventDefault();
                this.close();
                break;
        }
    }
    // ---------- Click-outside ----------
    onDocumentMouseDown(event) {
        if (!this.open())
            return;
        if (!this.host.nativeElement.contains(event.target)) {
            this.close();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthComboboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthComboboxComponent, isStandalone: true, selector: "ath-combobox", inputs: { options: "options", value: "value", placeholder: "placeholder", searchPlaceholder: "searchPlaceholder", disabled: "disabled", clearable: "clearable", loading: "loading", bare: "bare", optionTpl: "optionTpl" }, outputs: { valueChange: "valueChange", queryChange: "queryChange", opened: "opened", closed: "closed" }, host: { listeners: { "document:mousedown": "onDocumentMouseDown($event)" } }, viewQueries: [{ propertyName: "panelEl", first: true, predicate: ["panel"], descendants: true }, { propertyName: "searchInput", first: true, predicate: ["searchInput"], descendants: true }], ngImport: i0, template: "@if (!bare) {\n  <button\n    type=\"button\"\n    class=\"ath-cb__trigger\"\n    [class.ath-cb__trigger--open]=\"open()\"\n    [disabled]=\"disabled\"\n    [attr.aria-expanded]=\"open()\"\n    [attr.aria-haspopup]=\"'listbox'\"\n    (click)=\"toggle()\"\n  >\n    <span class=\"ath-cb__value\" [class.ath-cb__value--placeholder]=\"!selectedOption()\">\n      {{ selectedOption()?.label ?? placeholder }}\n    </span>\n    @if (clearable && selectedOption()) {\n      <button\n        type=\"button\"\n        class=\"ath-cb__clear\"\n        [attr.aria-label]=\"'Clear selection'\"\n        (click)=\"clearValue($event)\"\n      >\n        <lucide-icon [img]=\"clearIcon\" [size]=\"12\" />\n      </button>\n    }\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"14\" class=\"ath-cb__chevron\" />\n  </button>\n}\n\n@if (open()) {\n  <div #panel class=\"ath-cb__panel\" role=\"listbox\">\n    <div class=\"ath-cb__search\">\n      <lucide-icon [img]=\"searchIcon\" [size]=\"13\" class=\"ath-cb__search-icon\" />\n      <input\n        #searchInput\n        type=\"text\"\n        class=\"ath-cb__search-input\"\n        [placeholder]=\"searchPlaceholder\"\n        [ngModel]=\"query()\"\n        (ngModelChange)=\"onQueryInput($event)\"\n        (keydown)=\"onSearchKey($event)\"\n        autocomplete=\"off\"\n        spellcheck=\"false\"\n      />\n    </div>\n\n    <div class=\"ath-cb__items\">\n      @if (loading) {\n        <div class=\"ath-cb__loading\">Loading\u2026</div>\n      } @else if (grouped().length === 0) {\n        <div class=\"ath-cb__empty\">No matches</div>\n      } @else {\n        @for (item of grouped(); track trackByValue($index, item)) {\n          @if (isOption(item)) {\n            <button\n              type=\"button\"\n              role=\"option\"\n              class=\"ath-cb__option\"\n              [class.ath-cb__option--selected]=\"item.value === value\"\n              [class.ath-cb__option--highlighted]=\"isHighlighted($index, item)\"\n              [class.ath-cb__option--disabled]=\"item.disabled\"\n              [attr.aria-selected]=\"item.value === value\"\n              [disabled]=\"item.disabled\"\n              (click)=\"select(item)\"\n            >\n              @if (optionTpl) {\n                <ng-container *ngTemplateOutlet=\"optionTpl; context: { $implicit: item }\" />\n              } @else {\n                <div class=\"ath-cb__option-text\">\n                  <span class=\"ath-cb__option-label\">{{ item.label }}</span>\n                  @if (item.sublabel) {\n                    <span class=\"ath-cb__option-sub\">{{ item.sublabel }}</span>\n                  }\n                </div>\n                @if (item.value === value) {\n                  <lucide-icon [img]=\"checkIcon\" [size]=\"13\" class=\"ath-cb__option-check\" />\n                }\n              }\n            </button>\n          } @else {\n            <div class=\"ath-cb__group\">{{ item._group }}</div>\n          }\n        }\n      }\n    </div>\n  </div>\n}\n", styles: [":host{display:inline-block;position:relative;font-family:var(--font-sans)}.ath-cb__trigger{display:inline-flex;align-items:center;gap:6px;height:32px;min-width:140px;padding:0 8px 0 12px;background:var(--bg-1);border:1px solid var(--border-strong);border-radius:var(--r);font-family:var(--font-sans);font-size:13px;font-weight:500;color:var(--fg);cursor:pointer;transition:border-color var(--t-fast),background var(--t-fast),box-shadow var(--t-fast)}.ath-cb__trigger:hover:not(:disabled){border-color:var(--accent-dim)}.ath-cb__trigger:focus-visible,.ath-cb__trigger--open{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-cb__trigger:disabled{opacity:.5;cursor:not-allowed}.ath-cb__value{flex:1;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__value--placeholder{color:var(--fg-4);font-weight:400}.ath-cb__clear{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-cb__clear:hover{background:var(--hover-strong);color:var(--fg)}.ath-cb__chevron{color:var(--fg-3)}.ath-cb__panel{position:absolute;top:calc(100% + 4px);left:0;z-index:var(--z-popover);min-width:220px;max-width:360px;max-height:320px;display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);overflow:hidden}.ath-cb__search{display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid var(--border-faint)}.ath-cb__search-icon{color:var(--fg-4);flex-shrink:0}.ath-cb__search-input{flex:1;height:26px;padding:0;background:transparent;border:0;color:var(--fg);font-family:var(--font-sans);font-size:13px;outline:none}.ath-cb__search-input::placeholder{color:var(--fg-4)}.ath-cb__items{flex:1;overflow-y:auto;padding:4px}.ath-cb__option{display:flex;align-items:center;gap:8px;width:100%;padding:6px 8px;background:transparent;border:0;border-radius:var(--r-sm);color:var(--fg-2);font-family:var(--font-sans);font-size:13px;text-align:left;cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-cb__option:hover:not(:disabled),.ath-cb__option--highlighted{background:var(--hover);color:var(--fg)}.ath-cb__option--selected{color:var(--fg);font-weight:500}.ath-cb__option--selected.ath-cb__option--highlighted{background:var(--accent-faint)}.ath-cb__option--disabled{opacity:.5;cursor:not-allowed}.ath-cb__option-text{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}.ath-cb__option-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__option-sub{font-size:11.5px;color:var(--fg-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__option-check{color:var(--accent);flex-shrink:0}.ath-cb__group{padding:6px 10px 2px;font-family:var(--font-sans);font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;color:var(--fg-4)}.ath-cb__empty,.ath-cb__loading{padding:12px 10px;text-align:center;font-size:12.5px;color:var(--fg-3)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i3.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthComboboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-combobox', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (!bare) {\n  <button\n    type=\"button\"\n    class=\"ath-cb__trigger\"\n    [class.ath-cb__trigger--open]=\"open()\"\n    [disabled]=\"disabled\"\n    [attr.aria-expanded]=\"open()\"\n    [attr.aria-haspopup]=\"'listbox'\"\n    (click)=\"toggle()\"\n  >\n    <span class=\"ath-cb__value\" [class.ath-cb__value--placeholder]=\"!selectedOption()\">\n      {{ selectedOption()?.label ?? placeholder }}\n    </span>\n    @if (clearable && selectedOption()) {\n      <button\n        type=\"button\"\n        class=\"ath-cb__clear\"\n        [attr.aria-label]=\"'Clear selection'\"\n        (click)=\"clearValue($event)\"\n      >\n        <lucide-icon [img]=\"clearIcon\" [size]=\"12\" />\n      </button>\n    }\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"14\" class=\"ath-cb__chevron\" />\n  </button>\n}\n\n@if (open()) {\n  <div #panel class=\"ath-cb__panel\" role=\"listbox\">\n    <div class=\"ath-cb__search\">\n      <lucide-icon [img]=\"searchIcon\" [size]=\"13\" class=\"ath-cb__search-icon\" />\n      <input\n        #searchInput\n        type=\"text\"\n        class=\"ath-cb__search-input\"\n        [placeholder]=\"searchPlaceholder\"\n        [ngModel]=\"query()\"\n        (ngModelChange)=\"onQueryInput($event)\"\n        (keydown)=\"onSearchKey($event)\"\n        autocomplete=\"off\"\n        spellcheck=\"false\"\n      />\n    </div>\n\n    <div class=\"ath-cb__items\">\n      @if (loading) {\n        <div class=\"ath-cb__loading\">Loading\u2026</div>\n      } @else if (grouped().length === 0) {\n        <div class=\"ath-cb__empty\">No matches</div>\n      } @else {\n        @for (item of grouped(); track trackByValue($index, item)) {\n          @if (isOption(item)) {\n            <button\n              type=\"button\"\n              role=\"option\"\n              class=\"ath-cb__option\"\n              [class.ath-cb__option--selected]=\"item.value === value\"\n              [class.ath-cb__option--highlighted]=\"isHighlighted($index, item)\"\n              [class.ath-cb__option--disabled]=\"item.disabled\"\n              [attr.aria-selected]=\"item.value === value\"\n              [disabled]=\"item.disabled\"\n              (click)=\"select(item)\"\n            >\n              @if (optionTpl) {\n                <ng-container *ngTemplateOutlet=\"optionTpl; context: { $implicit: item }\" />\n              } @else {\n                <div class=\"ath-cb__option-text\">\n                  <span class=\"ath-cb__option-label\">{{ item.label }}</span>\n                  @if (item.sublabel) {\n                    <span class=\"ath-cb__option-sub\">{{ item.sublabel }}</span>\n                  }\n                </div>\n                @if (item.value === value) {\n                  <lucide-icon [img]=\"checkIcon\" [size]=\"13\" class=\"ath-cb__option-check\" />\n                }\n              }\n            </button>\n          } @else {\n            <div class=\"ath-cb__group\">{{ item._group }}</div>\n          }\n        }\n      }\n    </div>\n  </div>\n}\n", styles: [":host{display:inline-block;position:relative;font-family:var(--font-sans)}.ath-cb__trigger{display:inline-flex;align-items:center;gap:6px;height:32px;min-width:140px;padding:0 8px 0 12px;background:var(--bg-1);border:1px solid var(--border-strong);border-radius:var(--r);font-family:var(--font-sans);font-size:13px;font-weight:500;color:var(--fg);cursor:pointer;transition:border-color var(--t-fast),background var(--t-fast),box-shadow var(--t-fast)}.ath-cb__trigger:hover:not(:disabled){border-color:var(--accent-dim)}.ath-cb__trigger:focus-visible,.ath-cb__trigger--open{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-cb__trigger:disabled{opacity:.5;cursor:not-allowed}.ath-cb__value{flex:1;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__value--placeholder{color:var(--fg-4);font-weight:400}.ath-cb__clear{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-cb__clear:hover{background:var(--hover-strong);color:var(--fg)}.ath-cb__chevron{color:var(--fg-3)}.ath-cb__panel{position:absolute;top:calc(100% + 4px);left:0;z-index:var(--z-popover);min-width:220px;max-width:360px;max-height:320px;display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);overflow:hidden}.ath-cb__search{display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid var(--border-faint)}.ath-cb__search-icon{color:var(--fg-4);flex-shrink:0}.ath-cb__search-input{flex:1;height:26px;padding:0;background:transparent;border:0;color:var(--fg);font-family:var(--font-sans);font-size:13px;outline:none}.ath-cb__search-input::placeholder{color:var(--fg-4)}.ath-cb__items{flex:1;overflow-y:auto;padding:4px}.ath-cb__option{display:flex;align-items:center;gap:8px;width:100%;padding:6px 8px;background:transparent;border:0;border-radius:var(--r-sm);color:var(--fg-2);font-family:var(--font-sans);font-size:13px;text-align:left;cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-cb__option:hover:not(:disabled),.ath-cb__option--highlighted{background:var(--hover);color:var(--fg)}.ath-cb__option--selected{color:var(--fg);font-weight:500}.ath-cb__option--selected.ath-cb__option--highlighted{background:var(--accent-faint)}.ath-cb__option--disabled{opacity:.5;cursor:not-allowed}.ath-cb__option-text{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}.ath-cb__option-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__option-sub{font-size:11.5px;color:var(--fg-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__option-check{color:var(--accent);flex-shrink:0}.ath-cb__group{padding:6px 10px 2px;font-family:var(--font-sans);font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;color:var(--fg-4)}.ath-cb__empty,.ath-cb__loading{padding:12px 10px;text-align:center;font-size:12.5px;color:var(--fg-3)}\n"] }]
        }], propDecorators: { panelEl: [{
                type: ViewChild,
                args: ['panel']
            }], options: [{
                type: Input
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clearable: [{
                type: Input
            }], loading: [{
                type: Input
            }], bare: [{
                type: Input
            }], optionTpl: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], queryChange: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], searchInput: [{
                type: ViewChild,
                args: ['searchInput']
            }], onDocumentMouseDown: [{
                type: HostListener,
                args: ['document:mousedown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYm9ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2NvbWJvYm94L2NvbWJvYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9jb21ib2JveC9jb21ib2JveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUVOLFNBQVMsRUFDVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBY3BGOzs7Ozs7Ozs7Ozs7R0FZRztBQVNILE1BQU0sT0FBTyxvQkFBb0I7SUFSakM7UUFTRTs7O1dBR0c7UUFDSyxZQUFPLEdBQXdCLElBQUksQ0FBQztRQWUzQixTQUFJLEdBQUcsTUFBTSxDQUFDLENBQUEsVUFBdUIsQ0FBQSxDQUFDLENBQUM7UUFFL0MsWUFBTyxHQUF3QixFQUFFLENBQUM7UUFDbEMsVUFBSyxHQUFhLElBQUksQ0FBQztRQUN2QixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUN4QixzQkFBaUIsR0FBRyxRQUFR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QztJQUNILENBQUM7K0dBOUxVLG9CQUFvQjttR0FBcEIsb0JBQW9CLDBwQkNyRGpDLDA4RkFxRkEsNm5HRHJDWSxZQUFZLHFNQUFFLFdBQVcsOG1CQUFFLG1CQUFtQjs7NEZBSzdDLG9CQUFvQjtrQkFSaEMsU0FBUzsrQkFDRSxjQUFjLGNBQ1osSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxtQkFDeEMsdUJBQXVCLENBQUMsTUFBTTs4QkFXbkMsT0FBTztzQkFEbEIsU0FBUzt1QkFBQyxPQUFPO2dCQWdCVCxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUksV0FBVztzQkFBcEIsTUFBTTtnQkFHRyxXQUFXO3NCQUFwQixNQUFNO2dCQUVHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBRTJCLFdBQVc7c0JBQTVDLFNBQVM7dUJBQUMsYUFBYTtnQkE2SXhCLG1CQUFtQjtzQkFEbEIsWUFBWTt1QkFBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIGNvbXB1dGVkLFxuICBpbmplY3QsXG4gIHNpZ25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmbG9hdFBhbmVsIH0gZnJvbSAnLi4vZmxvYXRpbmcvZmxvYXRpbmcnO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSwgQ2hldnJvbkRvd24sIENoZWNrLCBTZWFyY2gsIFggfSBmcm9tICdsdWNpZGUtYW5ndWxhcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tYm9ib3hPcHRpb248VCA9IHN0cmluZz4ge1xuICB2YWx1ZTogVDtcbiAgbGFiZWw6IHN0cmluZztcbiAgLyoqIE9wdGlvbmFsIHN1Yi1sYWJlbCBzaG93biBiZWxvdyB0aGUgbWFpbiBsYWJlbCAoZS5nLiwgZW1haWwgdW5kZXIgbmFtZSkuICovXG4gIHN1YmxhYmVsPzogc3RyaW5nO1xuICAvKiogT3B0aW9uYWwgaWNvbi1uYW1lIChMdWNpZGUpIG9yIGFyYml0cmFyeSBzdHJpbmcgaGFuZGxlZCBieSBgb3B0aW9uVHBsYC4gKi9cbiAgaWNvbj86IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICAvKiogRnJlZS1mb3JtIGdyb3VwIGxhYmVsIOKAlCBpdGVtcyB3aXRoIHRoZSBzYW1lIGdyb3VwIGFyZSBncm91cGVkIHRvZ2V0aGVyLiAqL1xuICBncm91cD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBTZWFyY2hhYmxlIHNpbmdsZS1zZWxlY3QgZHJvcGRvd24uIFRoZSBmb3VuZGF0aW9uIGZvciBVc2VyUGlja2VyLFxuICogTGFiZWxQaWNrZXIsIFByb2plY3RQaWNrZXIsIEFzc2lnbmVlUGlja2VyLCBldGMuXG4gKlxuICogRm9yIGN1c3RvbSByZW5kZXJpbmcgcGFzcyBhbiBgb3B0aW9uVHBsYCB0ZW1wbGF0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1jb21ib2JveFxuICogICBbb3B0aW9uc109XCJ1c2Vyc1wiXG4gKiAgIFsodmFsdWUpXT1cInNlbGVjdGVkXCJcbiAqICAgcGxhY2Vob2xkZXI9XCJQaWNrIGFzc2lnbmVlXCJcbiAqICAgKHF1ZXJ5Q2hhbmdlKT1cInNlYXJjaCgkZXZlbnQpXCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWNvbWJvYm94JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbWJvYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2NvbWJvYm94LmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoQ29tYm9ib3hDb21wb25lbnQ8VCA9IHN0cmluZz4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIG9wZW4gcGFuZWwgZmxvYXRzIChgcG9zaXRpb246IGZpeGVkYCwga2VwdCBpbnNpZGUgdGhlIHZpZXdwb3J0KSwgc29cbiAgICogYSBzaWRlIHBhbmVsJ3Mgb3IgZGlhbG9nJ3Mgb3ZlcmZsb3cgbmV2ZXIgY3V0cyBpdCBvZmYuXG4gICAqL1xuICBwcml2YXRlIHVuZmxvYXQ6ICgoKSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuICBAVmlld0NoaWxkKCdwYW5lbCcpXG4gIHByaXZhdGUgc2V0IHBhbmVsRWwocmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMudW5mbG9hdD8uKCk7XG4gICAgdGhpcy51bmZsb2F0ID0gbnVsbDtcbiAgICBpZiAoIXJlZikgcmV0dXJuO1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLmhvc3QubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBhbmNob3IgPSByb290LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KCcuYXRoLWNiX190cmlnZ2VyJykgPz8gcm9vdDtcbiAgICB0aGlzLnVuZmxvYXQgPSBmbG9hdFBhbmVsKHJlZi5uYXRpdmVFbGVtZW50LCBhbmNob3IsIHsgYWxpZ246ICdhdXRvJywgbWF0Y2hXaWR0aDogIXRoaXMuYmFyZSB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5mbG9hdD8uKCk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IGhvc3QgPSBpbmplY3QoRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pO1xuXG4gIEBJbnB1dCgpIG9wdGlvbnM6IENvbWJvYm94T3B0aW9uPFQ+W10gPSBbXTtcbiAgQElucHV0KCkgdmFsdWU6IFQgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnU2VsZWN04oCmJztcbiAgQElucHV0KCkgc2VhcmNoUGxhY2Vob2xkZXIgPSAnU2VhcmNoJztcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgY2xlYXJhYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGxvYWRpbmcgPSBmYWxzZTtcblxuICAvKiogSGlkZSB0aGUgdHJpZ2dlcidzIGJ1dHRvbiBzdHlsaW5nOyByZW5kZXIgb25seSB0aGUgcG9wdXAgKGNvbnRyb2xsZWQgbW9kZSkuICovXG4gIEBJbnB1dCgpIGJhcmUgPSBmYWxzZTtcblxuICAvKiogT3B0aW9uYWwgY3VzdG9tIHRlbXBsYXRlIGZvciBlYWNoIG9wdGlvbiAoYDxuZy10ZW1wbGF0ZSBsZXQtb3B0aW9uPmApLiAqL1xuICBASW5wdXQoKSBvcHRpb25UcGw6IFRlbXBsYXRlUmVmPHVua25vd24+IHwgbnVsbCA9IG51bGw7XG5cbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUIHwgbnVsbD4oKTtcblxuICAvKiogRW1pdHMgdGhlIHNlYXJjaCBxdWVyeSB3aGVuIGl0IGNoYW5nZXMgKGZvciBhc3luYy9zZXJ2ZXIgc2VhcmNoKS4gKi9cbiAgQE91dHB1dCgpIHF1ZXJ5Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQE91dHB1dCgpIG9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIHByaXZhdGUgc2VhcmNoSW5wdXQhOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBjaGV2cm9uSWNvbiA9IENoZXZyb25Eb3duO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2hlY2tJY29uID0gQ2hlY2s7XG4gIHByb3RlY3RlZCByZWFkb25seSBzZWFyY2hJY29uID0gU2VhcmNoO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2xlYXJJY29uID0gWDtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgb3BlbiA9IHNpZ25hbChmYWxzZSk7XG4gIHByb3RlY3RlZCByZWFkb25seSBxdWVyeSA9IHNpZ25hbCgnJyk7XG4gIHByb3RlY3RlZCByZWFkb25seSBoaWdobGlnaHRlZCA9IHNpZ25hbCgwKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZmlsdGVyZWQgPSBjb21wdXRlZDxDb21ib2JveE9wdGlvbjxUPltdPigoKSA9PiB7XG4gICAgY29uc3QgcSA9IHRoaXMucXVlcnkoKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIXEpIHJldHVybiB0aGlzLm9wdGlvbnM7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXIoXG4gICAgICAobykgPT4gby5sYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8IChvLnN1YmxhYmVsID8/ICcnKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpXG4gICAgKTtcbiAgfSk7XG5cbiAgLyoqIFJlc3VsdCB3aXRoIGBudWxsYCBzZXBhcmF0b3JzIGluc2VydGVkIGJldHdlZW4gZ3JvdXBzLiAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZ3JvdXBlZCA9IGNvbXB1dGVkPChDb21ib2JveE9wdGlvbjxUPiB8IHsgX2dyb3VwOiBzdHJpbmcgfSlbXT4oKCkgPT4ge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5maWx0ZXJlZCgpO1xuICAgIGlmICghaXRlbXMuc29tZSgoaSkgPT4gaS5ncm91cCkpIHJldHVybiBpdGVtcztcblxuICAgIGNvbnN0IGJ5R3JvdXAgPSBuZXcgTWFwPHN0cmluZywgQ29tYm9ib3hPcHRpb248VD5bXT4oKTtcbiAgICBjb25zdCBub0dyb3VwOiBDb21ib2JveE9wdGlvbjxUPltdID0gW107XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBpZiAoaXRlbS5ncm91cCkge1xuICAgICAgICBjb25zdCBhcnIgPSBieUdyb3VwLmdldChpdGVtLmdyb3VwKSA/PyBbXTtcbiAgICAgICAgYXJyLnB1c2goaXRlbSk7XG4gICAgICAgIGJ5R3JvdXAuc2V0KGl0ZW0uZ3JvdXAsIGFycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub0dyb3VwLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0OiAoQ29tYm9ib3hPcHRpb248VD4gfCB7IF9ncm91cDogc3RyaW5nIH0pW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IFtncm91cCwgbGlzdF0gb2YgYnlHcm91cCkge1xuICAgICAgcmVzdWx0LnB1c2goeyBfZ3JvdXA6IGdyb3VwIH0pO1xuICAgICAgcmVzdWx0LnB1c2goLi4ubGlzdCk7XG4gICAgfVxuICAgIGlmIChub0dyb3VwLmxlbmd0aCkge1xuICAgICAgaWYgKGJ5R3JvdXAuc2l6ZSA+IDApIHJlc3VsdC5wdXNoKHsgX2dyb3VwOiAnT3RoZXInIH0pO1xuICAgICAgcmVzdWx0LnB1c2goLi4ubm9Hcm91cCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzZWxlY3RlZE9wdGlvbiA9IGNvbXB1dGVkPENvbWJvYm94T3B0aW9uPFQ+IHwgbnVsbD4oXG4gICAgKCkgPT4gdGhpcy5vcHRpb25zLmZpbmQoKG8pID0+IG8udmFsdWUgPT09IHRoaXMudmFsdWUpID8/IG51bGxcbiAgKTtcblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICBpZiAodGhpcy5vcGVuKCkpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuUGFuZWwoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuUGFuZWwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICB0aGlzLm9wZW4uc2V0KHRydWUpO1xuICAgIHRoaXMucXVlcnkuc2V0KCcnKTtcbiAgICB0aGlzLmhpZ2hsaWdodGVkLnNldCgwKTtcbiAgICB0aGlzLm9wZW5lZC5lbWl0KCk7XG4gICAgcXVldWVNaWNyb3Rhc2soKCkgPT4gdGhpcy5zZWFyY2hJbnB1dD8ubmF0aXZlRWxlbWVudC5mb2N1cygpKTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5vcGVuKCkpIHJldHVybjtcbiAgICB0aGlzLm9wZW4uc2V0KGZhbHNlKTtcbiAgICB0aGlzLmNsb3NlZC5lbWl0KCk7XG4gIH1cblxuICBzZWxlY3Qob3B0aW9uOiBDb21ib2JveE9wdGlvbjxUPik6IHZvaWQge1xuICAgIGlmIChvcHRpb24uZGlzYWJsZWQpIHJldHVybjtcbiAgICB0aGlzLnZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChvcHRpb24udmFsdWUpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGNsZWFyVmFsdWUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQobnVsbCk7XG4gIH1cblxuICBvblF1ZXJ5SW5wdXQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucXVlcnkuc2V0KHZhbHVlKTtcbiAgICB0aGlzLmhpZ2hsaWdodGVkLnNldCgwKTtcbiAgICB0aGlzLnF1ZXJ5Q2hhbmdlLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgaXNPcHRpb24oaXRlbTogQ29tYm9ib3hPcHRpb248VD4gfCB7IF9ncm91cDogc3RyaW5nIH0pOiBpdGVtIGlzIENvbWJvYm94T3B0aW9uPFQ+IHtcbiAgICByZXR1cm4gISgnX2dyb3VwJyBpbiBpdGVtKTtcbiAgfVxuXG4gIGlzSGlnaGxpZ2h0ZWQoaW5kZXg6IG51bWJlciwgaXRlbTogQ29tYm9ib3hPcHRpb248VD4gfCB7IF9ncm91cDogc3RyaW5nIH0pOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuaXNPcHRpb24oaXRlbSkpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCByZWFsSW5kZXggPSB0aGlzLmZpbHRlcmVkKCkuaW5kZXhPZihpdGVtKTtcbiAgICByZXR1cm4gcmVhbEluZGV4ID09PSB0aGlzLmhpZ2hsaWdodGVkKCk7XG4gIH1cblxuICB0cmFja0J5VmFsdWUgPSAoaW5kZXg6IG51bWJlciwgaXRlbTogQ29tYm9ib3hPcHRpb248VD4gfCB7IF9ncm91cDogc3RyaW5nIH0pOiB1bmtub3duID0+IHtcbiAgICByZXR1cm4gdGhpcy5pc09wdGlvbihpdGVtKSA/IGl0ZW0udmFsdWUgOiBgX19ncm91cF8ke2l0ZW0uX2dyb3VwfWA7XG4gIH07XG5cbiAgLy8gLS0tLS0tLS0tLSBLZXlib2FyZCBuYXZpZ2F0aW9uIC0tLS0tLS0tLS1cblxuICBvblNlYXJjaEtleShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5maWx0ZXJlZCgpO1xuICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnKSB0aGlzLmNsb3NlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWQudXBkYXRlKChpKSA9PiBNYXRoLm1pbihpICsgMSwgaXRlbXMubGVuZ3RoIC0gMSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkLnVwZGF0ZSgoaSkgPT4gTWF0aC5tYXgoaSAtIDEsIDApKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuc2VsZWN0KGl0ZW1zW3RoaXMuaGlnaGxpZ2h0ZWQoKV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLS0tLS0tLSBDbGljay1vdXRzaWRlIC0tLS0tLS0tLS1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZWRvd24nLCBbJyRldmVudCddKVxuICBvbkRvY3VtZW50TW91c2VEb3duKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm9wZW4oKSkgcmV0dXJuO1xuICAgIGlmICghdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG59XG4iLCJAaWYgKCFiYXJlKSB7XG4gIDxidXR0b25cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBjbGFzcz1cImF0aC1jYl9fdHJpZ2dlclwiXG4gICAgW2NsYXNzLmF0aC1jYl9fdHJpZ2dlci0tb3Blbl09XCJvcGVuKClcIlxuICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJvcGVuKClcIlxuICAgIFthdHRyLmFyaWEtaGFzcG9wdXBdPVwiJ2xpc3Rib3gnXCJcbiAgICAoY2xpY2spPVwidG9nZ2xlKClcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJhdGgtY2JfX3ZhbHVlXCIgW2NsYXNzLmF0aC1jYl9fdmFsdWUtLXBsYWNlaG9sZGVyXT1cIiFzZWxlY3RlZE9wdGlvbigpXCI+XG4gICAgICB7eyBzZWxlY3RlZE9wdGlvbigpPy5sYWJlbCA/PyBwbGFjZWhvbGRlciB9fVxuICAgIDwvc3Bhbj5cbiAgICBAaWYgKGNsZWFyYWJsZSAmJiBzZWxlY3RlZE9wdGlvbigpKSB7XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzcz1cImF0aC1jYl9fY2xlYXJcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidDbGVhciBzZWxlY3Rpb24nXCJcbiAgICAgICAgKGNsaWNrKT1cImNsZWFyVmFsdWUoJGV2ZW50KVwiXG4gICAgICA+XG4gICAgICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cImNsZWFySWNvblwiIFtzaXplXT1cIjEyXCIgLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIH1cbiAgICA8bHVjaWRlLWljb24gW2ltZ109XCJjaGV2cm9uSWNvblwiIFtzaXplXT1cIjE0XCIgY2xhc3M9XCJhdGgtY2JfX2NoZXZyb25cIiAvPlxuICA8L2J1dHRvbj5cbn1cblxuQGlmIChvcGVuKCkpIHtcbiAgPGRpdiAjcGFuZWwgY2xhc3M9XCJhdGgtY2JfX3BhbmVsXCIgcm9sZT1cImxpc3Rib3hcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYXRoLWNiX19zZWFyY2hcIj5cbiAgICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cInNlYXJjaEljb25cIiBbc2l6ZV09XCIxM1wiIGNsYXNzPVwiYXRoLWNiX19zZWFyY2gtaWNvblwiIC8+XG4gICAgICA8aW5wdXRcbiAgICAgICAgI3NlYXJjaElucHV0XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3M9XCJhdGgtY2JfX3NlYXJjaC1pbnB1dFwiXG4gICAgICAgIFtwbGFjZWhvbGRlcl09XCJzZWFyY2hQbGFjZWhvbGRlclwiXG4gICAgICAgIFtuZ01vZGVsXT1cInF1ZXJ5KClcIlxuICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJvblF1ZXJ5SW5wdXQoJGV2ZW50KVwiXG4gICAgICAgIChrZXlkb3duKT1cIm9uU2VhcmNoS2V5KCRldmVudClcIlxuICAgICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgICBzcGVsbGNoZWNrPVwiZmFsc2VcIlxuICAgICAgLz5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJhdGgtY2JfX2l0ZW1zXCI+XG4gICAgICBAaWYgKGxvYWRpbmcpIHtcbiAgICAgICAgPGRpdiBjbGFzcz1cImF0aC1jYl9fbG9hZGluZ1wiPkxvYWRpbmfigKY8L2Rpdj5cbiAgICAgIH0gQGVsc2UgaWYgKGdyb3VwZWQoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgPGRpdiBjbGFzcz1cImF0aC1jYl9fZW1wdHlcIj5ObyBtYXRjaGVzPC9kaXY+XG4gICAgICB9IEBlbHNlIHtcbiAgICAgICAgQGZvciAoaXRlbSBvZiBncm91cGVkKCk7IHRyYWNrIHRyYWNrQnlWYWx1ZSgkaW5kZXgsIGl0ZW0pKSB7XG4gICAgICAgICAgQGlmIChpc09wdGlvbihpdGVtKSkge1xuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYXRoLWNiX19vcHRpb25cIlxuICAgICAgICAgICAgICBbY2xhc3MuYXRoLWNiX19vcHRpb24tLXNlbGVjdGVkXT1cIml0ZW0udmFsdWUgPT09IHZhbHVlXCJcbiAgICAgICAgICAgICAgW2NsYXNzLmF0aC1jYl9fb3B0aW9uLS1oaWdobGlnaHRlZF09XCJpc0hpZ2hsaWdodGVkKCRpbmRleCwgaXRlbSlcIlxuICAgICAgICAgICAgICBbY2xhc3MuYXRoLWNiX19vcHRpb24tLWRpc2FibGVkXT1cIml0ZW0uZGlzYWJsZWRcIlxuICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cIml0ZW0udmFsdWUgPT09IHZhbHVlXCJcbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIml0ZW0uZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KGl0ZW0pXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQGlmIChvcHRpb25UcGwpIHtcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwib3B0aW9uVHBsOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogaXRlbSB9XCIgLz5cbiAgICAgICAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF0aC1jYl9fb3B0aW9uLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXRoLWNiX19vcHRpb24tbGFiZWxcIj57eyBpdGVtLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgQGlmIChpdGVtLnN1YmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXRoLWNiX19vcHRpb24tc3ViXCI+e3sgaXRlbS5zdWJsYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBAaWYgKGl0ZW0udmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICA8bHVjaWRlLWljb24gW2ltZ109XCJjaGVja0ljb25cIiBbc2l6ZV09XCIxM1wiIGNsYXNzPVwiYXRoLWNiX19vcHRpb24tY2hlY2tcIiAvPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgfSBAZWxzZSB7XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXRoLWNiX19ncm91cFwiPnt7IGl0ZW0uX2dyb3VwIH19PC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxufVxuIl19