import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
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
    }
    writeValue(value) {
        this.value = value ?? '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onSelectionChange(event) {
        const target = event.target;
        this.value = target.value;
        this.onChange(this.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSelectComponent, isStandalone: true, selector: "ath-select", inputs: { label: "label", placeholder: "placeholder", options: "options", error: "error", hint: "hint", disabled: "disabled", required: "required", selectId: "selectId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthSelectComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"ath-select\" [class.ath-select--error]=\"error\" [class.ath-select--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--ath-color-error);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-select--disabled .ath-select__label{opacity:.5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i2.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-select', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthSelectComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"ath-select\" [class.ath-select--error]=\"error\" [class.ath-select--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--ath-color-error);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-select--disabled .ath-select__label{opacity:.5}\n"] }]
        }], propDecorators: { label: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBVy9FOzs7Ozs7O0dBT0c7QUFnQkgsTUFBTSxPQUFPLGtCQUFrQjtJQWYvQjtRQWdCRSxtQkFBbUI7UUFDVixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRXBCLHVCQUF1QjtRQUNkLGdCQUFXLEdBQUcsa0JBQWtCLENBQUM7UUFFMUMscUJBQXFCO1FBQ1osWUFBTyxHQUFtQixFQUFFLENBQUM7UUFFdEMsb0JBQW9CO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVwQixnQkFBZ0I7UUFDUCxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRW5CLHFCQUFxQjtRQUNaLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIscUJBQXFCO1FBQ1osYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQix1QkFBdUI7UUFDZCxhQUFRLEdBQUcsY0FBYyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVsRSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRUYsZ0JBQVcsR0FBRyxXQUFXLENBQUM7UUFDMUIsY0FBUyxHQUFHLFdBQVcsQ0FBQztRQUVuQyxhQUFRLEdBQTRCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUMzQyxjQUFTLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0tBdUI1QztJQXJCQyxVQUFVLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQTJCO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxFQUFjO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBWTtRQUM1QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBMkIsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzsrR0FyRFUsa0JBQWtCO21HQUFsQixrQkFBa0IscU9BVmxCO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDakQsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLDBCQ2pDSCx3ckNBd0NBLHl5RERmWSxZQUFZLDhCQUFFLFdBQVcsMk9BQUUsbUJBQW1COzs0RkFZN0Msa0JBQWtCO2tCQWY5QixTQUFTOytCQUNFLFlBQVksY0FDVixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixDQUFDLG1CQUN4Qyx1QkFBdUIsQ0FBQyxNQUFNLGFBQ3BDO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDOzRCQUNqRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjs4QkFNUSxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csV0FBVztzQkFBbkIsS0FBSztnQkFHRyxPQUFPO3NCQUFmLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUsIENoZXZyb25Eb3duLCBBbGVydENpcmNsZSB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcblxuLyoqXG4gKiBTZWxlY3Qgb3B0aW9uIGRlZmluaXRpb25cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RPcHRpb24ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQXRoZW5lIFNlbGVjdCBDb21wb25lbnRcbiAqXG4gKiBGb3JtIHNlbGVjdCB3aXRoIGNvbnNpc3RlbnQgc3R5bGluZyBhbmQgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtc2VsZWN0IGxhYmVsPVwiUm9sZVwiIFtvcHRpb25zXT1cInJvbGVzXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFJvbGVcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtc2VsZWN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBdGhTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBTZWxlY3QgbGFiZWwgKi9cbiAgQElucHV0KCkgbGFiZWwgPSAnJztcblxuICAvKiogUGxhY2Vob2xkZXIgdGV4dCAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdTZWxlY3QgYW4gb3B0aW9uJztcblxuICAvKiogU2VsZWN0IG9wdGlvbnMgKi9cbiAgQElucHV0KCkgb3B0aW9uczogU2VsZWN0T3B0aW9uW10gPSBbXTtcblxuICAvKiogRXJyb3IgbWVzc2FnZSAqL1xuICBASW5wdXQoKSBlcnJvciA9ICcnO1xuXG4gIC8qKiBIaW50IHRleHQgKi9cbiAgQElucHV0KCkgaGludCA9ICcnO1xuXG4gIC8qKiBEaXNhYmxlZCBzdGF0ZSAqL1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBSZXF1aXJlZCBmaWVsZCAqL1xuICBASW5wdXQoKSByZXF1aXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBVbmlxdWUgc2VsZWN0IElEICovXG4gIEBJbnB1dCgpIHNlbGVjdElkID0gYGF0aC1zZWxlY3QtJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSl9YDtcblxuICBwcm90ZWN0ZWQgdmFsdWUgPSAnJztcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2hldnJvbkljb24gPSBDaGV2cm9uRG93bjtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGFsZXJ0SWNvbiA9IEFsZXJ0Q2lyY2xlO1xuXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIHByb3RlY3RlZCBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgPz8gJyc7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgb25TZWxlY3Rpb25DaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHRoaXMudmFsdWUgPSB0YXJnZXQudmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImF0aC1zZWxlY3RcIiBbY2xhc3MuYXRoLXNlbGVjdC0tZXJyb3JdPVwiZXJyb3JcIiBbY2xhc3MuYXRoLXNlbGVjdC0tZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgQGlmIChsYWJlbCkge1xuICAgIDxsYWJlbCBjbGFzcz1cImF0aC1zZWxlY3RfX2xhYmVsXCIgW2Zvcl09XCJzZWxlY3RJZFwiPlxuICAgICAge3sgbGFiZWwgfX1cbiAgICAgIEBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhdGgtc2VsZWN0X19yZXF1aXJlZFwiPio8L3NwYW4+XG4gICAgICB9XG4gICAgPC9sYWJlbD5cbiAgfVxuXG4gIDxkaXYgY2xhc3M9XCJhdGgtc2VsZWN0X193cmFwcGVyXCI+XG4gICAgPHNlbGVjdFxuICAgICAgW2lkXT1cInNlbGVjdElkXCJcbiAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgKGNoYW5nZSk9XCJvblNlbGVjdGlvbkNoYW5nZSgkZXZlbnQpXCJcbiAgICAgIChibHVyKT1cIm9uVG91Y2hlZCgpXCJcbiAgICAgIGNsYXNzPVwiYXRoLXNlbGVjdF9fZmllbGRcIlxuICAgID5cbiAgICAgIEBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkIFtzZWxlY3RlZF09XCIhdmFsdWVcIj57eyBwbGFjZWhvbGRlciB9fTwvb3B0aW9uPlxuICAgICAgfVxuICAgICAgQGZvciAob3B0aW9uIG9mIG9wdGlvbnM7IHRyYWNrIG9wdGlvbi52YWx1ZSkge1xuICAgICAgICA8b3B0aW9uIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIiBbZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCI+e3sgb3B0aW9uLmxhYmVsIH19PC9vcHRpb24+XG4gICAgICB9XG4gICAgPC9zZWxlY3Q+XG4gICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiY2hldnJvbkljb25cIiBbc2l6ZV09XCIxNlwiIGNsYXNzPVwiYXRoLXNlbGVjdF9fY2hldnJvblwiIC8+XG4gIDwvZGl2PlxuXG4gIEBpZiAoZXJyb3IpIHtcbiAgICA8ZGl2IGNsYXNzPVwiYXRoLXNlbGVjdF9fZXJyb3JcIj5cbiAgICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cImFsZXJ0SWNvblwiIFtzaXplXT1cIjE0XCIgLz5cbiAgICAgIHt7IGVycm9yIH19XG4gICAgPC9kaXY+XG4gIH1cblxuICBAaWYgKGhpbnQgJiYgIWVycm9yKSB7XG4gICAgPGRpdiBjbGFzcz1cImF0aC1zZWxlY3RfX2hpbnRcIj57eyBoaW50IH19PC9kaXY+XG4gIH1cbjwvZGl2PlxuIl19