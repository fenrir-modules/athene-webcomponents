import { Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, AlertCircle } from 'lucide-angular';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "lucide-angular";
/**
 * Athene Select Component
 *
 * Form select with consistent styling and ControlValueAccessor.
 *
 * @example
 * <ath-select label="Role" [options]="roles" [(ngModel)]="selectedRole" />
 */
export class AthSelectComponent {
    constructor() {
        /** Select label */
        /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
        this.size = 'md';
        this.label = '';
        /** Placeholder text */
        this.placeholder = 'Select an option';
        /** Select options */
        this.options = [];
        /** Error message */
        this.error = '';
        /** Hint text */
        this.hint = '';
        /** Disabled state */
        this.disabled = false;
        /** Required field */
        this.required = false;
        /** Unique select ID */
        this.selectId = `ath-select-${Math.random().toString(36).substr(2, 9)}`;
        this.value = '';
        this.chevronIcon = ChevronDown;
        this.alertIcon = AlertCircle;
        this.onChange = () => { };
        this.onTouched = () => { };
        // OnPush: values written by the forms API (e.g. a setValue after an async
        // lookup) arrive outside an input change, so the view must be told.
        this.cdr = inject(ChangeDetectorRef);
    }
    writeValue(value) {
        this.value = value ?? '';
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    onSelectionChange(event) {
        const target = event.target;
        this.value = target.value;
        this.onChange(this.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSelectComponent, isStandalone: true, selector: "ath-select", inputs: { size: "size", label: "label", placeholder: "placeholder", options: "options", error: "error", hint: "hint", disabled: "disabled", required: "required", selectId: "selectId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthSelectComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"ath-select\" [class.ath-select--sm]=\"size === 'sm'\" [class.ath-select--error]=\"error\" [class.ath-select--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--ath-color-error);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i2.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-select', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthSelectComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"ath-select\" [class.ath-select--sm]=\"size === 'sm'\" [class.ath-select--error]=\"error\" [class.ath-select--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--ath-color-error);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], options: [{
                type: Input
            }], error: [{
                type: Input
            }], hint: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], selectId: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQVcvRTs7Ozs7OztHQU9HO0FBZ0JILE1BQU0sT0FBTyxrQkFBa0I7SUFmL0I7UUFnQkUsbUJBQW1CO1FBQ25CLDRFQUE0RTtRQUNuRSxTQUFJLEdBQWdCLElBQUksQ0FBQztRQUV6QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRXBCLHVCQUF1QjtRQUNkLGdCQUFXLEdBQUcsa0JBQWtCLENBQUM7UUFFMUMscUJBQXFCO1FBQ1osWUFBTyxHQUFtQixFQUFFLENBQUM7UUFFdEMsb0JBQW9CO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVwQixnQkFBZ0I7UUFDUCxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRW5CLHFCQUFxQjtRQUNaLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIscUJBQXFCO1FBQ1osYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQix1QkFBdUI7UUFDZCxhQUFRLEdBQUcsY0FBYyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVsRSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRUYsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFDMUIsY0FBUyxHQUFHLFdBQVcsQ0FBQztRQUVuQyxhQUFRLEdBQTRCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUMzQyxjQUFTLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRTNDLDBFQUEwRTtRQUMxRSxvRUFBb0U7UUFDbkQsUUFBRyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBeUJsRDtJQXZCQyxVQUFVLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBMkI7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQWM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQVk7UUFDNUIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQTJCLENBQUM7UUFDakQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7K0dBOURVLGtCQUFrQjttR0FBbEIsa0JBQWtCLG1QQVZsQjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Z0JBQ2pELEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRiwwQkNqQ0gsaXVDQXdDQSxpNEREZlksWUFBWSw4QkFBRSxXQUFXLDJPQUFFLG1CQUFtQjs7NEZBWTdDLGtCQUFrQjtrQkFmOUIsU0FBUzsrQkFDRSxZQUFZLGNBQ1YsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxtQkFDeEMsdUJBQXVCLENBQUMsTUFBTSxhQUNwQzt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQzs0QkFDakQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7OEJBT1EsSUFBSTtzQkFBWixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxXQUFXO3NCQUFuQixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSztnQkFHRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSwgQ2hldnJvbkRvd24sIEFsZXJ0Q2lyY2xlIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuXG4vKipcbiAqIFNlbGVjdCBvcHRpb24gZGVmaW5pdGlvblxuICovXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdE9wdGlvbiB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBdGhlbmUgU2VsZWN0IENvbXBvbmVudFxuICpcbiAqIEZvcm0gc2VsZWN0IHdpdGggY29uc2lzdGVudCBzdHlsaW5nIGFuZCBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1zZWxlY3QgbGFiZWw9XCJSb2xlXCIgW29wdGlvbnNdPVwicm9sZXNcIiBbKG5nTW9kZWwpXT1cInNlbGVjdGVkUm9sZVwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1zZWxlY3QnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTHVjaWRlQW5ndWxhck1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF0aFNlbGVjdENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqIFNlbGVjdCBsYWJlbCAqL1xuICAvKiogRmllbGQgaGVpZ2h0OiBgbWRgIDQ0cHggKGRlZmF1bHQpLCBgc21gIDMzcHggKGNvbXBhY3Qgc2V0dGluZ3Mgcm93cykuICovXG4gIEBJbnB1dCgpIHNpemU6ICdzbScgfCAnbWQnID0gJ21kJztcblxuICBASW5wdXQoKSBsYWJlbCA9ICcnO1xuXG4gIC8qKiBQbGFjZWhvbGRlciB0ZXh0ICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJ1NlbGVjdCBhbiBvcHRpb24nO1xuXG4gIC8qKiBTZWxlY3Qgb3B0aW9ucyAqL1xuICBASW5wdXQoKSBvcHRpb25zOiBTZWxlY3RPcHRpb25bXSA9IFtdO1xuXG4gIC8qKiBFcnJvciBtZXNzYWdlICovXG4gIEBJbnB1dCgpIGVycm9yID0gJyc7XG5cbiAgLyoqIEhpbnQgdGV4dCAqL1xuICBASW5wdXQoKSBoaW50ID0gJyc7XG5cbiAgLyoqIERpc2FibGVkIHN0YXRlICovXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqIFJlcXVpcmVkIGZpZWxkICovXG4gIEBJbnB1dCgpIHJlcXVpcmVkID0gZmFsc2U7XG5cbiAgLyoqIFVuaXF1ZSBzZWxlY3QgSUQgKi9cbiAgQElucHV0KCkgc2VsZWN0SWQgPSBgYXRoLXNlbGVjdC0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KX1gO1xuXG4gIHByb3RlY3RlZCB2YWx1ZSA9ICcnO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBjaGV2cm9uSWNvbiA9IENoZXZyb25Eb3duO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYWxlcnRJY29uID0gQWxlcnRDaXJjbGU7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgcHJvdGVjdGVkIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8vIE9uUHVzaDogdmFsdWVzIHdyaXR0ZW4gYnkgdGhlIGZvcm1zIEFQSSAoZS5nLiBhIHNldFZhbHVlIGFmdGVyIGFuIGFzeW5jXG4gIC8vIGxvb2t1cCkgYXJyaXZlIG91dHNpZGUgYW4gaW5wdXQgY2hhbmdlLCBzbyB0aGUgdmlldyBtdXN0IGJlIHRvbGQuXG4gIHByaXZhdGUgcmVhZG9ubHkgY2RyID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgPz8gJyc7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25TZWxlY3Rpb25DaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHRoaXMudmFsdWUgPSB0YXJnZXQudmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImF0aC1zZWxlY3RcIiBbY2xhc3MuYXRoLXNlbGVjdC0tc21dPVwic2l6ZSA9PT0gJ3NtJ1wiIFtjbGFzcy5hdGgtc2VsZWN0LS1lcnJvcl09XCJlcnJvclwiIFtjbGFzcy5hdGgtc2VsZWN0LS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiPlxuICBAaWYgKGxhYmVsKSB7XG4gICAgPGxhYmVsIGNsYXNzPVwiYXRoLXNlbGVjdF9fbGFiZWxcIiBbZm9yXT1cInNlbGVjdElkXCI+XG4gICAgICB7eyBsYWJlbCB9fVxuICAgICAgQGlmIChyZXF1aXJlZCkge1xuICAgICAgICA8c3BhbiBjbGFzcz1cImF0aC1zZWxlY3RfX3JlcXVpcmVkXCI+Kjwvc3Bhbj5cbiAgICAgIH1cbiAgICA8L2xhYmVsPlxuICB9XG5cbiAgPGRpdiBjbGFzcz1cImF0aC1zZWxlY3RfX3dyYXBwZXJcIj5cbiAgICA8c2VsZWN0XG4gICAgICBbaWRdPVwic2VsZWN0SWRcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAoY2hhbmdlKT1cIm9uU2VsZWN0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgKGJsdXIpPVwib25Ub3VjaGVkKClcIlxuICAgICAgY2xhc3M9XCJhdGgtc2VsZWN0X19maWVsZFwiXG4gICAgPlxuICAgICAgQGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgW3NlbGVjdGVkXT1cIiF2YWx1ZVwiPnt7IHBsYWNlaG9sZGVyIH19PC9vcHRpb24+XG4gICAgICB9XG4gICAgICBAZm9yIChvcHRpb24gb2Ygb3B0aW9uczsgdHJhY2sgb3B0aW9uLnZhbHVlKSB7XG4gICAgICAgIDxvcHRpb24gW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiIFtkaXNhYmxlZF09XCJvcHRpb24uZGlzYWJsZWRcIj57eyBvcHRpb24ubGFiZWwgfX08L29wdGlvbj5cbiAgICAgIH1cbiAgICA8L3NlbGVjdD5cbiAgICA8bHVjaWRlLWljb24gW2ltZ109XCJjaGV2cm9uSWNvblwiIFtzaXplXT1cIjE2XCIgY2xhc3M9XCJhdGgtc2VsZWN0X19jaGV2cm9uXCIgLz5cbiAgPC9kaXY+XG5cbiAgQGlmIChlcnJvcikge1xuICAgIDxkaXYgY2xhc3M9XCJhdGgtc2VsZWN0X19lcnJvclwiPlxuICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiYWxlcnRJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICAgICAge3sgZXJyb3IgfX1cbiAgICA8L2Rpdj5cbiAgfVxuXG4gIEBpZiAoaGludCAmJiAhZXJyb3IpIHtcbiAgICA8ZGl2IGNsYXNzPVwiYXRoLXNlbGVjdF9faGludFwiPnt7IGhpbnQgfX08L2Rpdj5cbiAgfVxuPC9kaXY+XG4iXX0=