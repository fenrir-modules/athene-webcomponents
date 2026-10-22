import { Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { LucideAngularModule, AlertCircle } from 'lucide-angular';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Athene Textarea Component
 *
 * Multi-line text input with ControlValueAccessor.
 *
 * @example
 * <ath-textarea label="Description" [(ngModel)]="description" />
 * <ath-textarea label="Message" [rows]="6" [error]="errorMsg" />
 */
export class AthTextareaComponent {
    constructor() {
        /** Textarea label */
        this.label = '';
        /** Placeholder text */
        this.placeholder = '';
        /** Number of rows */
        this.rows = 4;
        /** Error message */
        this.error = '';
        /** Hint text */
        this.hint = '';
        /** Disabled state */
        this.disabled = false;
        /** Required field */
        this.required = false;
        /** Allow resize */
        this.resize = 'vertical';
        /** Max length */
        this.maxLength = null;
        /** Unique textarea ID */
        this.textareaId = `ath-textarea-${Math.random().toString(36).substr(2, 9)}`;
        this.value = '';
        this.alertIcon = AlertCircle;
        this.onChange = () => { };
        this.onTouched = () => { };
        // OnPush: values written by the forms API (e.g. a setValue after an async
        // lookup) arrive outside an input change, so the view must be told.
        this.cdr = inject(ChangeDetectorRef);
    }
    get characterCount() {
        return this.value?.length ?? 0;
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
    onInput(event) {
        const target = event.target;
        this.value = target.value;
        this.onChange(this.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTextareaComponent, isStandalone: true, selector: "ath-textarea", inputs: { label: "label", placeholder: "placeholder", rows: "rows", error: "error", hint: "hint", disabled: "disabled", required: "required", resize: "resize", maxLength: "maxLength", textareaId: "textareaId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthTextareaComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"ath-textarea\" [class.ath-textarea--error]=\"error\" [class.ath-textarea--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div class=\"ath-textarea__count\" [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\">\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-textarea__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-textarea__required{color:var(--ath-color-error);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);line-height:var(--ath-line-height-normal);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-textarea__field::placeholder{color:var(--ath-text-tertiary)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-textarea__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-textarea__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-textarea__count{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-textarea__count--near-limit{color:var(--ath-color-warning)}.ath-textarea--error .ath-textarea__field{border-color:var(--ath-color-error)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-textarea', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthTextareaComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"ath-textarea\" [class.ath-textarea--error]=\"error\" [class.ath-textarea--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div class=\"ath-textarea__count\" [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\">\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-textarea__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-textarea__required{color:var(--ath-color-error);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);line-height:var(--ath-line-height-normal);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-textarea__field::placeholder{color:var(--ath-text-tertiary)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-textarea__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-textarea__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-textarea__count{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-textarea__count--near-limit{color:var(--ath-color-warning)}.ath-textarea--error .ath-textarea__field{border-color:var(--ath-color-error)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], rows: [{
                type: Input
            }], error: [{
                type: Input
            }], hint: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], resize: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], textareaId: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRWxFOzs7Ozs7OztHQVFHO0FBZ0JILE1BQU0sT0FBTyxvQkFBb0I7SUFmakM7UUFnQkUscUJBQXFCO1FBQ1osVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVwQix1QkFBdUI7UUFDZCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUUxQixxQkFBcUI7UUFDWixTQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLG9CQUFvQjtRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFcEIsZ0JBQWdCO1FBQ1AsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVuQixxQkFBcUI7UUFDWixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCLHFCQUFxQjtRQUNaLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsbUJBQW1CO1FBQ1YsV0FBTSxHQUFpQyxVQUFVLENBQUM7UUFFM0QsaUJBQWlCO1FBQ1IsY0FBUyxHQUFrQixJQUFJLENBQUM7UUFFekMseUJBQXlCO1FBQ2hCLGVBQVUsR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFdEUsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVGLGNBQVMsR0FBRyxXQUFXLENBQUM7UUFFbkMsYUFBUSxHQUE0QixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDM0MsY0FBUyxHQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQU0zQywwRUFBMEU7UUFDMUUsb0VBQW9FO1FBQ25ELFFBQUcsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztLQXlCbEQ7SUEvQkMsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFNRCxVQUFVLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBMkI7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQWM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFZO1FBQ2xCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUE2QixDQUFDO1FBQ25ELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDOytHQXBFVSxvQkFBb0I7bUdBQXBCLG9CQUFvQiwrUUFWcEI7WUFDVDtnQkFDRSxPQUFPLEVBQUUsaUJBQWlCO2dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDO2dCQUNuRCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsMEJDekJILGdyQ0EwQ0EsNDBERHpCWSxZQUFZLDhCQUFFLFdBQVcsOEJBQUUsbUJBQW1COzs0RkFZN0Msb0JBQW9CO2tCQWZoQyxTQUFTOytCQUNFLGNBQWMsY0FDWixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixDQUFDLG1CQUN4Qyx1QkFBdUIsQ0FBQyxNQUFNLGFBQ3BDO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDOzRCQUNuRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjs4QkFNUSxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csV0FBVztzQkFBbkIsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csTUFBTTtzQkFBZCxLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgaW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEx1Y2lkZUFuZ3VsYXJNb2R1bGUsIEFsZXJ0Q2lyY2xlIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuXG4vKipcbiAqIEF0aGVuZSBUZXh0YXJlYSBDb21wb25lbnRcbiAqXG4gKiBNdWx0aS1saW5lIHRleHQgaW5wdXQgd2l0aCBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC10ZXh0YXJlYSBsYWJlbD1cIkRlc2NyaXB0aW9uXCIgWyhuZ01vZGVsKV09XCJkZXNjcmlwdGlvblwiIC8+XG4gKiA8YXRoLXRleHRhcmVhIGxhYmVsPVwiTWVzc2FnZVwiIFtyb3dzXT1cIjZcIiBbZXJyb3JdPVwiZXJyb3JNc2dcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtdGV4dGFyZWEnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTHVjaWRlQW5ndWxhck1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEF0aFRleHRhcmVhQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnLi90ZXh0YXJlYS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi90ZXh0YXJlYS5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFRleHRhcmVhQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvKiogVGV4dGFyZWEgbGFiZWwgKi9cbiAgQElucHV0KCkgbGFiZWwgPSAnJztcblxuICAvKiogUGxhY2Vob2xkZXIgdGV4dCAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuXG4gIC8qKiBOdW1iZXIgb2Ygcm93cyAqL1xuICBASW5wdXQoKSByb3dzID0gNDtcblxuICAvKiogRXJyb3IgbWVzc2FnZSAqL1xuICBASW5wdXQoKSBlcnJvciA9ICcnO1xuXG4gIC8qKiBIaW50IHRleHQgKi9cbiAgQElucHV0KCkgaGludCA9ICcnO1xuXG4gIC8qKiBEaXNhYmxlZCBzdGF0ZSAqL1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8qKiBSZXF1aXJlZCBmaWVsZCAqL1xuICBASW5wdXQoKSByZXF1aXJlZCA9IGZhbHNlO1xuXG4gIC8qKiBBbGxvdyByZXNpemUgKi9cbiAgQElucHV0KCkgcmVzaXplOiAnbm9uZScgfCAndmVydGljYWwnIHwgJ2JvdGgnID0gJ3ZlcnRpY2FsJztcblxuICAvKiogTWF4IGxlbmd0aCAqL1xuICBASW5wdXQoKSBtYXhMZW5ndGg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBVbmlxdWUgdGV4dGFyZWEgSUQgKi9cbiAgQElucHV0KCkgdGV4dGFyZWFJZCA9IGBhdGgtdGV4dGFyZWEtJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSl9YDtcblxuICBwcm90ZWN0ZWQgdmFsdWUgPSAnJztcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYWxlcnRJY29uID0gQWxlcnRDaXJjbGU7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgcHJvdGVjdGVkIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIGdldCBjaGFyYWN0ZXJDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnZhbHVlPy5sZW5ndGggPz8gMDtcbiAgfVxuXG4gIC8vIE9uUHVzaDogdmFsdWVzIHdyaXR0ZW4gYnkgdGhlIGZvcm1zIEFQSSAoZS5nLiBhIHNldFZhbHVlIGFmdGVyIGFuIGFzeW5jXG4gIC8vIGxvb2t1cCkgYXJyaXZlIG91dHNpZGUgYW4gaW5wdXQgY2hhbmdlLCBzbyB0aGUgdmlldyBtdXN0IGJlIHRvbGQuXG4gIHByaXZhdGUgcmVhZG9ubHkgY2RyID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgPz8gJyc7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25JbnB1dChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICB0aGlzLnZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhdGgtdGV4dGFyZWFcIiBbY2xhc3MuYXRoLXRleHRhcmVhLS1lcnJvcl09XCJlcnJvclwiIFtjbGFzcy5hdGgtdGV4dGFyZWEtLWRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gIEBpZiAobGFiZWwpIHtcbiAgICA8bGFiZWwgY2xhc3M9XCJhdGgtdGV4dGFyZWFfX2xhYmVsXCIgW2Zvcl09XCJ0ZXh0YXJlYUlkXCI+XG4gICAgICB7eyBsYWJlbCB9fVxuICAgICAgQGlmIChyZXF1aXJlZCkge1xuICAgICAgICA8c3BhbiBjbGFzcz1cImF0aC10ZXh0YXJlYV9fcmVxdWlyZWRcIj4qPC9zcGFuPlxuICAgICAgfVxuICAgIDwvbGFiZWw+XG4gIH1cblxuICA8dGV4dGFyZWFcbiAgICBbaWRdPVwidGV4dGFyZWFJZFwiXG4gICAgW3Jvd3NdPVwicm93c1wiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgW2F0dHIubWF4bGVuZ3RoXT1cIm1heExlbmd0aFwiXG4gICAgW3N0eWxlLnJlc2l6ZV09XCJyZXNpemVcIlxuICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIlxuICAgIChibHVyKT1cIm9uVG91Y2hlZCgpXCJcbiAgICBjbGFzcz1cImF0aC10ZXh0YXJlYV9fZmllbGRcIlxuICA+PC90ZXh0YXJlYT5cblxuICA8ZGl2IGNsYXNzPVwiYXRoLXRleHRhcmVhX19tZXRhXCI+XG4gICAgQGlmIChlcnJvcikge1xuICAgICAgPGRpdiBjbGFzcz1cImF0aC10ZXh0YXJlYV9fZXJyb3JcIj5cbiAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiYWxlcnRJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICAgICAgICB7eyBlcnJvciB9fVxuICAgICAgPC9kaXY+XG4gICAgfSBAZWxzZSBpZiAoaGludCkge1xuICAgICAgPGRpdiBjbGFzcz1cImF0aC10ZXh0YXJlYV9faGludFwiPnt7IGhpbnQgfX08L2Rpdj5cbiAgICB9IEBlbHNlIHtcbiAgICAgIDxkaXY+PC9kaXY+XG4gICAgfVxuXG4gICAgQGlmIChtYXhMZW5ndGgpIHtcbiAgICAgIDxkaXYgY2xhc3M9XCJhdGgtdGV4dGFyZWFfX2NvdW50XCIgW2NsYXNzLmF0aC10ZXh0YXJlYV9fY291bnQtLW5lYXItbGltaXRdPVwiY2hhcmFjdGVyQ291bnQgPiBtYXhMZW5ndGggKiAwLjlcIj5cbiAgICAgICAge3sgY2hhcmFjdGVyQ291bnQgfX0ve3sgbWF4TGVuZ3RoIH19XG4gICAgICA8L2Rpdj5cbiAgICB9XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=