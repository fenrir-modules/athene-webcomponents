import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
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
    }
    get characterCount() {
        return this.value?.length ?? 0;
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
        ], ngImport: i0, template: "<div class=\"ath-textarea\" [class.ath-textarea--error]=\"error\" [class.ath-textarea--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div class=\"ath-textarea__count\" [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\">\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-textarea__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-textarea__required{color:var(--ath-color-error);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);line-height:var(--ath-line-height-normal);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-textarea__field::placeholder{color:var(--ath-text-tertiary)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-textarea__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-textarea__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-textarea__count{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-textarea__count--near-limit{color:var(--ath-color-warning)}.ath-textarea--error .ath-textarea__field{border-color:var(--ath-color-error)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-textarea', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthTextareaComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"ath-textarea\" [class.ath-textarea--error]=\"error\" [class.ath-textarea--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div class=\"ath-textarea__count\" [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\">\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-textarea__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-textarea__required{color:var(--ath-color-error);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);line-height:var(--ath-line-height-normal);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-textarea__field::placeholder{color:var(--ath-text-tertiary)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-textarea__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-textarea__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-textarea__count{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-textarea__count--near-limit{color:var(--ath-color-warning)}.ath-textarea--error .ath-textarea__field{border-color:var(--ath-color-error)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFbEU7Ozs7Ozs7O0dBUUc7QUFnQkgsTUFBTSxPQUFPLG9CQUFvQjtJQWZqQztRQWdCRSxxQkFBcUI7UUFDWixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRXBCLHVCQUF1QjtRQUNkLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRTFCLHFCQUFxQjtRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFFbEIsb0JBQW9CO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVwQixnQkFBZ0I7UUFDUCxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRW5CLHFCQUFxQjtRQUNaLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIscUJBQXFCO1FBQ1osYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQixtQkFBbUI7UUFDVixXQUFNLEdBQWlDLFVBQVUsQ0FBQztRQUUzRCxpQkFBaUI7UUFDUixjQUFTLEdBQWtCLElBQUksQ0FBQztRQUV6Qyx5QkFBeUI7UUFDaEIsZUFBVSxHQUFHLGdCQUFnQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUV0RSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRUYsY0FBUyxHQUFHLFdBQVcsQ0FBQztRQUVuQyxhQUFRLEdBQTRCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUMzQyxjQUFTLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0tBMkI1QztJQXpCQyxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsRUFBMkI7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQWM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBWTtRQUNsQixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBNkIsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzsrR0E5RFUsb0JBQW9CO21HQUFwQixvQkFBb0IsK1FBVnBCO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDbkQsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLDBCQ3pCSCxnckNBMENBLHMyRER6QlksWUFBWSw4QkFBRSxXQUFXLDhCQUFFLG1CQUFtQjs7NEZBWTdDLG9CQUFvQjtrQkFmaEMsU0FBUzsrQkFDRSxjQUFjLGNBQ1osSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxtQkFDeEMsdUJBQXVCLENBQUMsTUFBTSxhQUNwQzt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQzs0QkFDbkQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7OEJBTVEsS0FBSztzQkFBYixLQUFLO2dCQUdHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQUdHLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLE1BQU07c0JBQWQsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBMdWNpZGVBbmd1bGFyTW9kdWxlLCBBbGVydENpcmNsZSB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcblxuLyoqXG4gKiBBdGhlbmUgVGV4dGFyZWEgQ29tcG9uZW50XG4gKlxuICogTXVsdGktbGluZSB0ZXh0IGlucHV0IHdpdGggQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtdGV4dGFyZWEgbGFiZWw9XCJEZXNjcmlwdGlvblwiIFsobmdNb2RlbCldPVwiZGVzY3JpcHRpb25cIiAvPlxuICogPGF0aC10ZXh0YXJlYSBsYWJlbD1cIk1lc3NhZ2VcIiBbcm93c109XCI2XCIgW2Vycm9yXT1cImVycm9yTXNnXCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLXRleHRhcmVhJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBdGhUZXh0YXJlYUNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vdGV4dGFyZWEuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vdGV4dGFyZWEuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhUZXh0YXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqIFRleHRhcmVhIGxhYmVsICovXG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XG5cbiAgLyoqIFBsYWNlaG9sZGVyIHRleHQgKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICAvKiogTnVtYmVyIG9mIHJvd3MgKi9cbiAgQElucHV0KCkgcm93cyA9IDQ7XG5cbiAgLyoqIEVycm9yIG1lc3NhZ2UgKi9cbiAgQElucHV0KCkgZXJyb3IgPSAnJztcblxuICAvKiogSGludCB0ZXh0ICovXG4gIEBJbnB1dCgpIGhpbnQgPSAnJztcblxuICAvKiogRGlzYWJsZWQgc3RhdGUgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogUmVxdWlyZWQgZmllbGQgKi9cbiAgQElucHV0KCkgcmVxdWlyZWQgPSBmYWxzZTtcblxuICAvKiogQWxsb3cgcmVzaXplICovXG4gIEBJbnB1dCgpIHJlc2l6ZTogJ25vbmUnIHwgJ3ZlcnRpY2FsJyB8ICdib3RoJyA9ICd2ZXJ0aWNhbCc7XG5cbiAgLyoqIE1heCBsZW5ndGggKi9cbiAgQElucHV0KCkgbWF4TGVuZ3RoOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKiogVW5pcXVlIHRleHRhcmVhIElEICovXG4gIEBJbnB1dCgpIHRleHRhcmVhSWQgPSBgYXRoLXRleHRhcmVhLSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpfWA7XG5cbiAgcHJvdGVjdGVkIHZhbHVlID0gJyc7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGFsZXJ0SWNvbiA9IEFsZXJ0Q2lyY2xlO1xuXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIHByb3RlY3RlZCBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBnZXQgY2hhcmFjdGVyQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZT8ubGVuZ3RoID8/IDA7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgPz8gJyc7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgb25JbnB1dChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICB0aGlzLnZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhdGgtdGV4dGFyZWFcIiBbY2xhc3MuYXRoLXRleHRhcmVhLS1lcnJvcl09XCJlcnJvclwiIFtjbGFzcy5hdGgtdGV4dGFyZWEtLWRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gIEBpZiAobGFiZWwpIHtcbiAgICA8bGFiZWwgY2xhc3M9XCJhdGgtdGV4dGFyZWFfX2xhYmVsXCIgW2Zvcl09XCJ0ZXh0YXJlYUlkXCI+XG4gICAgICB7eyBsYWJlbCB9fVxuICAgICAgQGlmIChyZXF1aXJlZCkge1xuICAgICAgICA8c3BhbiBjbGFzcz1cImF0aC10ZXh0YXJlYV9fcmVxdWlyZWRcIj4qPC9zcGFuPlxuICAgICAgfVxuICAgIDwvbGFiZWw+XG4gIH1cblxuICA8dGV4dGFyZWFcbiAgICBbaWRdPVwidGV4dGFyZWFJZFwiXG4gICAgW3Jvd3NdPVwicm93c1wiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgW2F0dHIubWF4bGVuZ3RoXT1cIm1heExlbmd0aFwiXG4gICAgW3N0eWxlLnJlc2l6ZV09XCJyZXNpemVcIlxuICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIlxuICAgIChibHVyKT1cIm9uVG91Y2hlZCgpXCJcbiAgICBjbGFzcz1cImF0aC10ZXh0YXJlYV9fZmllbGRcIlxuICA+PC90ZXh0YXJlYT5cblxuICA8ZGl2IGNsYXNzPVwiYXRoLXRleHRhcmVhX19tZXRhXCI+XG4gICAgQGlmIChlcnJvcikge1xuICAgICAgPGRpdiBjbGFzcz1cImF0aC10ZXh0YXJlYV9fZXJyb3JcIj5cbiAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiYWxlcnRJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICAgICAgICB7eyBlcnJvciB9fVxuICAgICAgPC9kaXY+XG4gICAgfSBAZWxzZSBpZiAoaGludCkge1xuICAgICAgPGRpdiBjbGFzcz1cImF0aC10ZXh0YXJlYV9faGludFwiPnt7IGhpbnQgfX08L2Rpdj5cbiAgICB9IEBlbHNlIHtcbiAgICAgIDxkaXY+PC9kaXY+XG4gICAgfVxuXG4gICAgQGlmIChtYXhMZW5ndGgpIHtcbiAgICAgIDxkaXYgY2xhc3M9XCJhdGgtdGV4dGFyZWFfX2NvdW50XCIgW2NsYXNzLmF0aC10ZXh0YXJlYV9fY291bnQtLW5lYXItbGltaXRdPVwiY2hhcmFjdGVyQ291bnQgPiBtYXhMZW5ndGggKiAwLjlcIj5cbiAgICAgICAge3sgY2hhcmFjdGVyQ291bnQgfX0ve3sgbWF4TGVuZ3RoIH19XG4gICAgICA8L2Rpdj5cbiAgICB9XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=