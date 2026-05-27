import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * iOS-style segmented control. Multiple options, exactly one active.
 *
 * @example
 * <ath-segment
 *   [options]="[{value:'list', label:'List'}, {value:'kanban', label:'Kanban'}]"
 *   [value]="view"
 *   (valueChange)="view = $event" />
 */
export class AthSegmentComponent {
    constructor() {
        this.options = [];
        this.size = 'md';
        /** Optional aria-label for the group (for screen readers). */
        this.ariaLabel = null;
        this.valueChange = new EventEmitter();
        this.role = 'tablist';
        this.trackByValue = (_, item) => item.value;
    }
    get hostAriaLabel() {
        return this.ariaLabel;
    }
    get hostSize() {
        return this.size;
    }
    select(option) {
        if (option.disabled)
            return;
        if (option.value !== this.value) {
            this.valueChange.emit(option.value);
        }
    }
    isActive(option) {
        return option.value === this.value;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSegmentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSegmentComponent, isStandalone: true, selector: "ath-segment", inputs: { options: "options", value: "value", size: "size", ariaLabel: "ariaLabel" }, outputs: { valueChange: "valueChange" }, host: { properties: { "attr.role": "this.role", "attr.aria-label": "this.hostAriaLabel", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@for (option of options; track trackByValue($index, option)) {\n  <button\n    type=\"button\"\n    role=\"tab\"\n    class=\"ath-seg__item\"\n    [class.ath-seg__item--active]=\"isActive(option)\"\n    [class.ath-seg__item--disabled]=\"option.disabled\"\n    [attr.aria-selected]=\"isActive(option)\"\n    [attr.aria-disabled]=\"option.disabled || null\"\n    [disabled]=\"option.disabled\"\n    (click)=\"select(option)\"\n  >\n    <span class=\"ath-seg__label\">{{ option.label }}</span>\n    @if (option.count != null) {\n      <span class=\"ath-seg__count\">{{ option.count }}</span>\n    }\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:2px;padding:2px;background:var(--bg-2);border-radius:var(--r);border:1px solid var(--border)}.ath-seg__item{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:26px;padding:0 10px;background:transparent;border:0;border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);white-space:nowrap;letter-spacing:-.005em}.ath-seg__item:hover:not(.ath-seg__item--active):not(.ath-seg__item--disabled){color:var(--fg);background:var(--hover)}.ath-seg__item:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent-ring)}.ath-seg__item--active{background:var(--bg-1);color:var(--fg);box-shadow:var(--shadow-1)}.ath-seg__item--disabled{opacity:.5;cursor:not-allowed}.ath-seg__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;padding:0 5px;height:16px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;border-radius:999px;background:var(--bg-2);color:var(--fg-3);line-height:1}.ath-seg__item--active .ath-seg__count{background:var(--accent-faint);color:var(--accent)}:host([data-size=sm]) .ath-seg__item,body.compact :host .ath-seg__item{height:22px;padding:0 8px;font-size:11.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSegmentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-segment', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (option of options; track trackByValue($index, option)) {\n  <button\n    type=\"button\"\n    role=\"tab\"\n    class=\"ath-seg__item\"\n    [class.ath-seg__item--active]=\"isActive(option)\"\n    [class.ath-seg__item--disabled]=\"option.disabled\"\n    [attr.aria-selected]=\"isActive(option)\"\n    [attr.aria-disabled]=\"option.disabled || null\"\n    [disabled]=\"option.disabled\"\n    (click)=\"select(option)\"\n  >\n    <span class=\"ath-seg__label\">{{ option.label }}</span>\n    @if (option.count != null) {\n      <span class=\"ath-seg__count\">{{ option.count }}</span>\n    }\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:2px;padding:2px;background:var(--bg-2);border-radius:var(--r);border:1px solid var(--border)}.ath-seg__item{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:26px;padding:0 10px;background:transparent;border:0;border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);white-space:nowrap;letter-spacing:-.005em}.ath-seg__item:hover:not(.ath-seg__item--active):not(.ath-seg__item--disabled){color:var(--fg);background:var(--hover)}.ath-seg__item:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent-ring)}.ath-seg__item--active{background:var(--bg-1);color:var(--fg);box-shadow:var(--shadow-1)}.ath-seg__item--disabled{opacity:.5;cursor:not-allowed}.ath-seg__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;padding:0 5px;height:16px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;border-radius:999px;background:var(--bg-2);color:var(--fg-3);line-height:1}.ath-seg__item--active .ath-seg__count{background:var(--accent-faint);color:var(--accent)}:host([data-size=sm]) .ath-seg__item,body.compact :host .ath-seg__item{height:22px;padding:0 8px;font-size:11.5px}\n"] }]
        }], propDecorators: { options: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input
            }], size: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], hostAriaLabel: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VnbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvc2VnbWVudC9zZWdtZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWdtZW50L3NlZ21lbnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQWEvQzs7Ozs7Ozs7R0FRRztBQVNILE1BQU0sT0FBTyxtQkFBbUI7SUFSaEM7UUFTNkIsWUFBTyxHQUF1QixFQUFFLENBQUM7UUFFbkQsU0FBSSxHQUFnQixJQUFJLENBQUM7UUFFbEMsOERBQThEO1FBQ3JELGNBQVMsR0FBa0IsSUFBSSxDQUFDO1FBRS9CLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQztRQUVYLFNBQUksR0FBRyxTQUFTLENBQUM7UUFTcEQsaUJBQVksR0FBRyxDQUFDLENBQVMsRUFBRSxJQUFzQixFQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBWTNFO0lBcEJDLElBQW9DLGFBQWE7UUFDL0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFtQyxRQUFRO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBSUQsTUFBTSxDQUFDLE1BQXdCO1FBQzdCLElBQUksTUFBTSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQzVCLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLENBQUM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQXdCO1FBQy9CLE9BQU8sTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JDLENBQUM7K0dBOUJVLG1CQUFtQjttR0FBbkIsbUJBQW1CLHNVQy9CaEMsdW1CQWtCQSxrM0NEUVksWUFBWTs7NEZBS1gsbUJBQW1CO2tCQVIvQixTQUFTOytCQUNFLGFBQWEsY0FDWCxJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFLcEIsT0FBTztzQkFBakMsS0FBSzt1QkFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBQ2hCLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csU0FBUztzQkFBakIsS0FBSztnQkFFSSxXQUFXO3NCQUFwQixNQUFNO2dCQUU0QixJQUFJO3NCQUF0QyxXQUFXO3VCQUFDLFdBQVc7Z0JBQ1ksYUFBYTtzQkFBaEQsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBSUssUUFBUTtzQkFBMUMsV0FBVzt1QkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlZ21lbnRPcHRpb248VCA9IHN0cmluZz4ge1xuICB2YWx1ZTogVDtcbiAgbGFiZWw6IHN0cmluZztcbiAgLyoqIE9wdGlvbmFsIGlubGluZSBjb3VudCBiYWRnZSAoZS5nLiwgXCIxMlwiKS4gKi9cbiAgY291bnQ/OiBudW1iZXIgfCBzdHJpbmc7XG4gIC8qKiBPcHRpb25hbCBgZGlzYWJsZWRgIHN0YXRlIHBlciBvcHRpb24uICovXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgU2VnbWVudFNpemUgPSAnc20nIHwgJ21kJztcblxuLyoqXG4gKiBpT1Mtc3R5bGUgc2VnbWVudGVkIGNvbnRyb2wuIE11bHRpcGxlIG9wdGlvbnMsIGV4YWN0bHkgb25lIGFjdGl2ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1zZWdtZW50XG4gKiAgIFtvcHRpb25zXT1cIlt7dmFsdWU6J2xpc3QnLCBsYWJlbDonTGlzdCd9LCB7dmFsdWU6J2thbmJhbicsIGxhYmVsOidLYW5iYW4nfV1cIlxuICogICBbdmFsdWVdPVwidmlld1wiXG4gKiAgICh2YWx1ZUNoYW5nZSk9XCJ2aWV3ID0gJGV2ZW50XCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLXNlZ21lbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWdtZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3NlZ21lbnQuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhTZWdtZW50Q29tcG9uZW50PFQgPSBzdHJpbmc+IHtcbiAgQElucHV0KHsgcmVxdWlyZWQ6IHRydWUgfSkgb3B0aW9uczogU2VnbWVudE9wdGlvbjxUPltdID0gW107XG4gIEBJbnB1dCgpIHZhbHVlITogVDtcbiAgQElucHV0KCkgc2l6ZTogU2VnbWVudFNpemUgPSAnbWQnO1xuXG4gIC8qKiBPcHRpb25hbCBhcmlhLWxhYmVsIGZvciB0aGUgZ3JvdXAgKGZvciBzY3JlZW4gcmVhZGVycykuICovXG4gIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xuXG4gIEBIb3N0QmluZGluZygnYXR0ci5yb2xlJykgcmVhZG9ubHkgcm9sZSA9ICd0YWJsaXN0JztcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtbGFiZWwnKSBnZXQgaG9zdEFyaWFMYWJlbCgpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5hcmlhTGFiZWw7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGF0YS1zaXplJykgZ2V0IGhvc3RTaXplKCk6IFNlZ21lbnRTaXplIHtcbiAgICByZXR1cm4gdGhpcy5zaXplO1xuICB9XG5cbiAgdHJhY2tCeVZhbHVlID0gKF86IG51bWJlciwgaXRlbTogU2VnbWVudE9wdGlvbjxUPik6IHVua25vd24gPT4gaXRlbS52YWx1ZTtcblxuICBzZWxlY3Qob3B0aW9uOiBTZWdtZW50T3B0aW9uPFQ+KTogdm9pZCB7XG4gICAgaWYgKG9wdGlvbi5kaXNhYmxlZCkgcmV0dXJuO1xuICAgIGlmIChvcHRpb24udmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChvcHRpb24udmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGlzQWN0aXZlKG9wdGlvbjogU2VnbWVudE9wdGlvbjxUPik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvcHRpb24udmFsdWUgPT09IHRoaXMudmFsdWU7XG4gIH1cbn1cbiIsIkBmb3IgKG9wdGlvbiBvZiBvcHRpb25zOyB0cmFjayB0cmFja0J5VmFsdWUoJGluZGV4LCBvcHRpb24pKSB7XG4gIDxidXR0b25cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICByb2xlPVwidGFiXCJcbiAgICBjbGFzcz1cImF0aC1zZWdfX2l0ZW1cIlxuICAgIFtjbGFzcy5hdGgtc2VnX19pdGVtLS1hY3RpdmVdPVwiaXNBY3RpdmUob3B0aW9uKVwiXG4gICAgW2NsYXNzLmF0aC1zZWdfX2l0ZW0tLWRpc2FibGVkXT1cIm9wdGlvbi5kaXNhYmxlZFwiXG4gICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc0FjdGl2ZShvcHRpb24pXCJcbiAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cIm9wdGlvbi5kaXNhYmxlZCB8fCBudWxsXCJcbiAgICBbZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCJcbiAgICAoY2xpY2spPVwic2VsZWN0KG9wdGlvbilcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJhdGgtc2VnX19sYWJlbFwiPnt7IG9wdGlvbi5sYWJlbCB9fTwvc3Bhbj5cbiAgICBAaWYgKG9wdGlvbi5jb3VudCAhPSBudWxsKSB7XG4gICAgICA8c3BhbiBjbGFzcz1cImF0aC1zZWdfX2NvdW50XCI+e3sgb3B0aW9uLmNvdW50IH19PC9zcGFuPlxuICAgIH1cbiAgPC9idXR0b24+XG59XG4iXX0=