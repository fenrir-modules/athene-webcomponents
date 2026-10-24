import { Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject, } from '@angular/core';
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
        ], ngImport: i0, template: "<div\n  class=\"ath-select\"\n  [class.ath-select--sm]=\"size === 'sm'\"\n  [class.ath-select--error]=\"error\"\n  [class.ath-select--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--red-text);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i2.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-select', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthSelectComponent),
                            multi: true,
                        },
                    ], template: "<div\n  class=\"ath-select\"\n  [class.ath-select--sm]=\"size === 'sm'\"\n  [class.ath-select--error]=\"error\"\n  [class.ath-select--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--red-text);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBVy9FOzs7Ozs7O0dBT0c7QUFnQkgsTUFBTSxPQUFPLGtCQUFrQjtJQWYvQjtRQWdCRSxtQkFBbUI7UUFDbkIsNEVBQTRFO1FBQ25FLFNBQUksR0FBZ0IsSUFBSSxDQUFDO1FBRXpCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFcEIsdUJBQXVCO1FBQ2QsZ0JBQVcsR0FBRyxrQkFBa0IsQ0FBQztRQUUxQyxxQkFBcUI7UUFDWixZQUFPLEdBQW1CLEVBQUUsQ0FBQztRQUV0QyxvQkFBb0I7UUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRXBCLGdCQUFnQjtRQUNQLFNBQUksR0FBRyxFQUFFLENBQUM7UUFFbkIscUJBQXFCO1FBQ1osYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQixxQkFBcUI7UUFDWixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCLHVCQUF1QjtRQUNkLGFBQVEsR0FBRyxjQUFjLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRWxFLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFRixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixjQUFTLEdBQUcsV0FBVyxDQUFDO1FBRW5DLGFBQVEsR0FBNEIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQzNDLGNBQVMsR0FBZSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFM0MsMEVBQTBFO1FBQzFFLG9FQUFvRTtRQUNuRCxRQUFHLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0F5QmxEO0lBdkJDLFVBQVUsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUEyQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBYztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBWTtRQUM1QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBMkIsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzsrR0E5RFUsa0JBQWtCO21HQUFsQixrQkFBa0IsbVBBVmxCO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDakQsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLDBCQ3hDSCwrdUNBNkNBLG0zRERiWSxZQUFZLDhCQUFFLFdBQVcsMk9BQUUsbUJBQW1COzs0RkFZN0Msa0JBQWtCO2tCQWY5QixTQUFTOytCQUNFLFlBQVksY0FDVixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixDQUFDLG1CQUN4Qyx1QkFBdUIsQ0FBQyxNQUFNLGFBQ3BDO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDOzRCQUNqRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjs4QkFPUSxJQUFJO3NCQUFaLEtBQUs7Z0JBRUcsS0FBSztzQkFBYixLQUFLO2dCQUdHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUdHLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBmb3J3YXJkUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUsIENoZXZyb25Eb3duLCBBbGVydENpcmNsZSB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcblxuLyoqXG4gKiBTZWxlY3Qgb3B0aW9uIGRlZmluaXRpb25cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RPcHRpb24ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQXRoZW5lIFNlbGVjdCBDb21wb25lbnRcbiAqXG4gKiBGb3JtIHNlbGVjdCB3aXRoIGNvbnNpc3RlbnQgc3R5bGluZyBhbmQgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtc2VsZWN0IGxhYmVsPVwiUm9sZVwiIFtvcHRpb25zXT1cInJvbGVzXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFJvbGVcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtc2VsZWN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBdGhTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBTZWxlY3QgbGFiZWwgKi9cbiAgLyoqIEZpZWxkIGhlaWdodDogYG1kYCA0NHB4IChkZWZhdWx0KSwgYHNtYCAzM3B4IChjb21wYWN0IHNldHRpbmdzIHJvd3MpLiAqL1xuICBASW5wdXQoKSBzaXplOiAnc20nIHwgJ21kJyA9ICdtZCc7XG5cbiAgQElucHV0KCkgbGFiZWwgPSAnJztcblxuICAvKiogUGxhY2Vob2xkZXIgdGV4dCAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdTZWxlY3QgYW4gb3B0aW9uJztcblxuICAvKiogU2VsZWN0IG9wdGlvbnMgKi9cbiAgQElucHV0KCkgb3B0aW9uczogU2VsZWN0T3B0aW9uW10gPSBbXTtcblxuICAvKiogRXJyb3IgbWVzc2FnZSAqL1xuICBASW5wdXQoKSBlcnJvciA9ICcnO1xuXG4gIC8qKiBIaW50IHRleHQgKi9cbiAgQElucHV0KCkgaGludCA9ICcnO1xuXG4gIC8qKiBEaXNhYmxlZCBzdGF0ZSAqL1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBSZXF1aXJlZCBmaWVsZCAqL1xuICBASW5wdXQoKSByZXF1aXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBVbmlxdWUgc2VsZWN0IElEICovXG4gIEBJbnB1dCgpIHNlbGVjdElkID0gYGF0aC1zZWxlY3QtJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSl9YDtcblxuICBwcm90ZWN0ZWQgdmFsdWUgPSAnJztcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2hldnJvbkljb24gPSBDaGV2cm9uRG93bjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGFsZXJ0SWNvbiA9IEFsZXJ0Q2lyY2xlO1xuXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIHByb3RlY3RlZCBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvLyBPblB1c2g6IHZhbHVlcyB3cml0dGVuIGJ5IHRoZSBmb3JtcyBBUEkgKGUuZy4gYSBzZXRWYWx1ZSBhZnRlciBhbiBhc3luY1xuICAvLyBsb29rdXApIGFycml2ZSBvdXRzaWRlIGFuIGlucHV0IGNoYW5nZSwgc28gdGhlIHZpZXcgbXVzdCBiZSB0b2xkLlxuICBwcml2YXRlIHJlYWRvbmx5IGNkciA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlID8/ICcnO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uU2VsZWN0aW9uQ2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICB0aGlzLnZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gIH1cbn1cbiIsIjxkaXZcbiAgY2xhc3M9XCJhdGgtc2VsZWN0XCJcbiAgW2NsYXNzLmF0aC1zZWxlY3QtLXNtXT1cInNpemUgPT09ICdzbSdcIlxuICBbY2xhc3MuYXRoLXNlbGVjdC0tZXJyb3JdPVwiZXJyb3JcIlxuICBbY2xhc3MuYXRoLXNlbGVjdC0tZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuPlxuICBAaWYgKGxhYmVsKSB7XG4gICAgPGxhYmVsIGNsYXNzPVwiYXRoLXNlbGVjdF9fbGFiZWxcIiBbZm9yXT1cInNlbGVjdElkXCI+XG4gICAgICB7eyBsYWJlbCB9fVxuICAgICAgQGlmIChyZXF1aXJlZCkge1xuICAgICAgICA8c3BhbiBjbGFzcz1cImF0aC1zZWxlY3RfX3JlcXVpcmVkXCI+Kjwvc3Bhbj5cbiAgICAgIH1cbiAgICA8L2xhYmVsPlxuICB9XG5cbiAgPGRpdiBjbGFzcz1cImF0aC1zZWxlY3RfX3dyYXBwZXJcIj5cbiAgICA8c2VsZWN0XG4gICAgICBbaWRdPVwic2VsZWN0SWRcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAoY2hhbmdlKT1cIm9uU2VsZWN0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgKGJsdXIpPVwib25Ub3VjaGVkKClcIlxuICAgICAgY2xhc3M9XCJhdGgtc2VsZWN0X19maWVsZFwiXG4gICAgPlxuICAgICAgQGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgW3NlbGVjdGVkXT1cIiF2YWx1ZVwiPnt7IHBsYWNlaG9sZGVyIH19PC9vcHRpb24+XG4gICAgICB9XG4gICAgICBAZm9yIChvcHRpb24gb2Ygb3B0aW9uczsgdHJhY2sgb3B0aW9uLnZhbHVlKSB7XG4gICAgICAgIDxvcHRpb24gW3ZhbHVlXT1cIm9wdGlvbi52YWx1ZVwiIFtkaXNhYmxlZF09XCJvcHRpb24uZGlzYWJsZWRcIj57eyBvcHRpb24ubGFiZWwgfX08L29wdGlvbj5cbiAgICAgIH1cbiAgICA8L3NlbGVjdD5cbiAgICA8bHVjaWRlLWljb24gW2ltZ109XCJjaGV2cm9uSWNvblwiIFtzaXplXT1cIjE2XCIgY2xhc3M9XCJhdGgtc2VsZWN0X19jaGV2cm9uXCIgLz5cbiAgPC9kaXY+XG5cbiAgQGlmIChlcnJvcikge1xuICAgIDxkaXYgY2xhc3M9XCJhdGgtc2VsZWN0X19lcnJvclwiPlxuICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiYWxlcnRJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICAgICAge3sgZXJyb3IgfX1cbiAgICA8L2Rpdj5cbiAgfVxuXG4gIEBpZiAoaGludCAmJiAhZXJyb3IpIHtcbiAgICA8ZGl2IGNsYXNzPVwiYXRoLXNlbGVjdF9faGludFwiPnt7IGhpbnQgfX08L2Rpdj5cbiAgfVxuPC9kaXY+XG4iXX0=