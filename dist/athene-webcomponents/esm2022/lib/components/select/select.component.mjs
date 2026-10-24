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
 * <ath-select [ariaLabel]="'Role for ' + member.name" [options]="roles" [(ngModel)]="role" />
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
        /**
         * Accessible name of the native select when no visible `label` is drawn
         * (a select in a settings row or a table cell that its row already names).
         */
        this.ariaLabel = '';
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSelectComponent, isStandalone: true, selector: "ath-select", inputs: { size: "size", label: "label", placeholder: "placeholder", options: "options", error: "error", hint: "hint", disabled: "disabled", required: "required", ariaLabel: "ariaLabel", selectId: "selectId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthSelectComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div\n  class=\"ath-select\"\n  [class.ath-select--sm]=\"size === 'sm'\"\n  [class.ath-select--error]=\"error\"\n  [class.ath-select--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [attr.aria-label]=\"ariaLabel || null\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <!-- [selected] as well as the select's [value]: options that arrive after\n             the value (loaded later) must still show it. -->\n        <option\n          [value]=\"option.value\"\n          [disabled]=\"option.disabled\"\n          [selected]=\"option.value === value\"\n        >\n          {{ option.label }}\n        </option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--space-1)}.ath-select__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-select__required{color:var(--red-text);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--space-10) 0 var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);appearance:none;cursor:pointer;transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-select__field:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-select__field option{background-color:var(--bg-1);color:var(--fg)}.ath-select__chevron{position:absolute;right:var(--space-3);color:var(--fg-3);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--space-1);font-size:var(--text-sm);color:var(--red-text)}.ath-select__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-select--error .ath-select__field{border-color:var(--red)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i2.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-select', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthSelectComponent),
                            multi: true,
                        },
                    ], template: "<div\n  class=\"ath-select\"\n  [class.ath-select--sm]=\"size === 'sm'\"\n  [class.ath-select--error]=\"error\"\n  [class.ath-select--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [attr.aria-label]=\"ariaLabel || null\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <!-- [selected] as well as the select's [value]: options that arrive after\n             the value (loaded later) must still show it. -->\n        <option\n          [value]=\"option.value\"\n          [disabled]=\"option.disabled\"\n          [selected]=\"option.value === value\"\n        >\n          {{ option.label }}\n        </option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--space-1)}.ath-select__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-select__required{color:var(--red-text);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--space-10) 0 var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);appearance:none;cursor:pointer;transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-select__field:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-select__field option{background-color:var(--bg-1);color:var(--fg)}.ath-select__chevron{position:absolute;right:var(--space-3);color:var(--fg-3);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--space-1);font-size:var(--text-sm);color:var(--red-text)}.ath-select__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-select--error .ath-select__field{border-color:var(--red)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"] }]
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
            }], ariaLabel: [{
                type: Input
            }], selectId: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBVy9FOzs7Ozs7OztHQVFHO0FBZ0JILE1BQU0sT0FBTyxrQkFBa0I7SUFmL0I7UUFnQkUsbUJBQW1CO1FBQ25CLDRFQUE0RTtRQUNuRSxTQUFJLEdBQWdCLElBQUksQ0FBQztRQUV6QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRXBCLHVCQUF1QjtRQUNkLGdCQUFXLEdBQUcsa0JBQWtCLENBQUM7UUFFMUMscUJBQXFCO1FBQ1osWUFBTyxHQUFtQixFQUFFLENBQUM7UUFFdEMsb0JBQW9CO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVwQixnQkFBZ0I7UUFDUCxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRW5CLHFCQUFxQjtRQUNaLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIscUJBQXFCO1FBQ1osYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQjs7O1dBR0c7UUFDTSxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXhCLHVCQUF1QjtRQUNkLGFBQVEsR0FBRyxjQUFjLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRWxFLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFRixnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUMxQixjQUFTLEdBQUcsV0FBVyxDQUFDO1FBRW5DLGFBQVEsR0FBNEIsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQzNDLGNBQVMsR0FBZSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFM0MsMEVBQTBFO1FBQzFFLG9FQUFvRTtRQUNuRCxRQUFHLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0F5QmxEO0lBdkJDLFVBQVUsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUEyQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBYztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBWTtRQUM1QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBMkIsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzsrR0FwRVUsa0JBQWtCO21HQUFsQixrQkFBa0IsMlFBVmxCO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDakQsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLDBCQ3pDSCx3aERBc0RBLDZtRERyQlksWUFBWSw4QkFBRSxXQUFXLDJPQUFFLG1CQUFtQjs7NEZBWTdDLGtCQUFrQjtrQkFmOUIsU0FBUzsrQkFDRSxZQUFZLGNBQ1YsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxtQkFDeEMsdUJBQXVCLENBQUMsTUFBTSxhQUNwQzt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQzs0QkFDakQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7OEJBT1EsSUFBSTtzQkFBWixLQUFLO2dCQUVHLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxXQUFXO3NCQUFuQixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSztnQkFHRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFNRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBmb3J3YXJkUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUsIENoZXZyb25Eb3duLCBBbGVydENpcmNsZSB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcblxuLyoqXG4gKiBTZWxlY3Qgb3B0aW9uIGRlZmluaXRpb25cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RPcHRpb24ge1xuICB2YWx1ZTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQXRoZW5lIFNlbGVjdCBDb21wb25lbnRcbiAqXG4gKiBGb3JtIHNlbGVjdCB3aXRoIGNvbnNpc3RlbnQgc3R5bGluZyBhbmQgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtc2VsZWN0IGxhYmVsPVwiUm9sZVwiIFtvcHRpb25zXT1cInJvbGVzXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFJvbGVcIiAvPlxuICogPGF0aC1zZWxlY3QgW2FyaWFMYWJlbF09XCInUm9sZSBmb3IgJyArIG1lbWJlci5uYW1lXCIgW29wdGlvbnNdPVwicm9sZXNcIiBbKG5nTW9kZWwpXT1cInJvbGVcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtc2VsZWN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBdGhTZWxlY3RDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBTZWxlY3QgbGFiZWwgKi9cbiAgLyoqIEZpZWxkIGhlaWdodDogYG1kYCA0NHB4IChkZWZhdWx0KSwgYHNtYCAzM3B4IChjb21wYWN0IHNldHRpbmdzIHJvd3MpLiAqL1xuICBASW5wdXQoKSBzaXplOiAnc20nIHwgJ21kJyA9ICdtZCc7XG5cbiAgQElucHV0KCkgbGFiZWwgPSAnJztcblxuICAvKiogUGxhY2Vob2xkZXIgdGV4dCAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICdTZWxlY3QgYW4gb3B0aW9uJztcblxuICAvKiogU2VsZWN0IG9wdGlvbnMgKi9cbiAgQElucHV0KCkgb3B0aW9uczogU2VsZWN0T3B0aW9uW10gPSBbXTtcblxuICAvKiogRXJyb3IgbWVzc2FnZSAqL1xuICBASW5wdXQoKSBlcnJvciA9ICcnO1xuXG4gIC8qKiBIaW50IHRleHQgKi9cbiAgQElucHV0KCkgaGludCA9ICcnO1xuXG4gIC8qKiBEaXNhYmxlZCBzdGF0ZSAqL1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBSZXF1aXJlZCBmaWVsZCAqL1xuICBASW5wdXQoKSByZXF1aXJlZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBBY2Nlc3NpYmxlIG5hbWUgb2YgdGhlIG5hdGl2ZSBzZWxlY3Qgd2hlbiBubyB2aXNpYmxlIGBsYWJlbGAgaXMgZHJhd25cbiAgICogKGEgc2VsZWN0IGluIGEgc2V0dGluZ3Mgcm93IG9yIGEgdGFibGUgY2VsbCB0aGF0IGl0cyByb3cgYWxyZWFkeSBuYW1lcykuXG4gICAqL1xuICBASW5wdXQoKSBhcmlhTGFiZWwgPSAnJztcblxuICAvKiogVW5pcXVlIHNlbGVjdCBJRCAqL1xuICBASW5wdXQoKSBzZWxlY3RJZCA9IGBhdGgtc2VsZWN0LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpfWA7XG5cbiAgcHJvdGVjdGVkIHZhbHVlID0gJyc7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGNoZXZyb25JY29uID0gQ2hldnJvbkRvd247XG4gIHByb3RlY3RlZCByZWFkb25seSBhbGVydEljb24gPSBBbGVydENpcmNsZTtcblxuICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBwcm90ZWN0ZWQgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLy8gT25QdXNoOiB2YWx1ZXMgd3JpdHRlbiBieSB0aGUgZm9ybXMgQVBJIChlLmcuIGEgc2V0VmFsdWUgYWZ0ZXIgYW4gYXN5bmNcbiAgLy8gbG9va3VwKSBhcnJpdmUgb3V0c2lkZSBhbiBpbnB1dCBjaGFuZ2UsIHNvIHRoZSB2aWV3IG11c3QgYmUgdG9sZC5cbiAgcHJpdmF0ZSByZWFkb25seSBjZHIgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZSA/PyAnJztcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvblNlbGVjdGlvbkNoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgdGhpcy52YWx1ZSA9IHRhcmdldC52YWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICB9XG59XG4iLCI8ZGl2XG4gIGNsYXNzPVwiYXRoLXNlbGVjdFwiXG4gIFtjbGFzcy5hdGgtc2VsZWN0LS1zbV09XCJzaXplID09PSAnc20nXCJcbiAgW2NsYXNzLmF0aC1zZWxlY3QtLWVycm9yXT1cImVycm9yXCJcbiAgW2NsYXNzLmF0aC1zZWxlY3QtLWRpc2FibGVkXT1cImRpc2FibGVkXCJcbj5cbiAgQGlmIChsYWJlbCkge1xuICAgIDxsYWJlbCBjbGFzcz1cImF0aC1zZWxlY3RfX2xhYmVsXCIgW2Zvcl09XCJzZWxlY3RJZFwiPlxuICAgICAge3sgbGFiZWwgfX1cbiAgICAgIEBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhdGgtc2VsZWN0X19yZXF1aXJlZFwiPio8L3NwYW4+XG4gICAgICB9XG4gICAgPC9sYWJlbD5cbiAgfVxuXG4gIDxkaXYgY2xhc3M9XCJhdGgtc2VsZWN0X193cmFwcGVyXCI+XG4gICAgPHNlbGVjdFxuICAgICAgW2lkXT1cInNlbGVjdElkXCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsIHx8IG51bGxcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAoY2hhbmdlKT1cIm9uU2VsZWN0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgKGJsdXIpPVwib25Ub3VjaGVkKClcIlxuICAgICAgY2xhc3M9XCJhdGgtc2VsZWN0X19maWVsZFwiXG4gICAgPlxuICAgICAgQGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgZGlzYWJsZWQgW3NlbGVjdGVkXT1cIiF2YWx1ZVwiPnt7IHBsYWNlaG9sZGVyIH19PC9vcHRpb24+XG4gICAgICB9XG4gICAgICBAZm9yIChvcHRpb24gb2Ygb3B0aW9uczsgdHJhY2sgb3B0aW9uLnZhbHVlKSB7XG4gICAgICAgIDwhLS0gW3NlbGVjdGVkXSBhcyB3ZWxsIGFzIHRoZSBzZWxlY3QncyBbdmFsdWVdOiBvcHRpb25zIHRoYXQgYXJyaXZlIGFmdGVyXG4gICAgICAgICAgICAgdGhlIHZhbHVlIChsb2FkZWQgbGF0ZXIpIG11c3Qgc3RpbGwgc2hvdyBpdC4gLS0+XG4gICAgICAgIDxvcHRpb25cbiAgICAgICAgICBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwib3B0aW9uLmRpc2FibGVkXCJcbiAgICAgICAgICBbc2VsZWN0ZWRdPVwib3B0aW9uLnZhbHVlID09PSB2YWx1ZVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBvcHRpb24ubGFiZWwgfX1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgICB9XG4gICAgPC9zZWxlY3Q+XG4gICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiY2hldnJvbkljb25cIiBbc2l6ZV09XCIxNlwiIGNsYXNzPVwiYXRoLXNlbGVjdF9fY2hldnJvblwiIC8+XG4gIDwvZGl2PlxuXG4gIEBpZiAoZXJyb3IpIHtcbiAgICA8ZGl2IGNsYXNzPVwiYXRoLXNlbGVjdF9fZXJyb3JcIj5cbiAgICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cImFsZXJ0SWNvblwiIFtzaXplXT1cIjE0XCIgLz5cbiAgICAgIHt7IGVycm9yIH19XG4gICAgPC9kaXY+XG4gIH1cblxuICBAaWYgKGhpbnQgJiYgIWVycm9yKSB7XG4gICAgPGRpdiBjbGFzcz1cImF0aC1zZWxlY3RfX2hpbnRcIj57eyBoaW50IH19PC9kaXY+XG4gIH1cbjwvZGl2PlxuIl19