import { Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject, } from '@angular/core';
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
        ], ngImport: i0, template: "<div\n  class=\"ath-textarea\"\n  [class.ath-textarea--error]=\"error\"\n  [class.ath-textarea--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div\n        class=\"ath-textarea__count\"\n        [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\"\n      >\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--space-1)}.ath-textarea__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-textarea__required{color:var(--red-text);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--space-3) var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);line-height:var(--line-normal);transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-textarea__field::placeholder{color:var(--fg-3)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-textarea__field:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--space-1);font-size:var(--text-sm);color:var(--red-text)}.ath-textarea__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-textarea__count{font-size:var(--text-xs);color:var(--fg-3)}.ath-textarea__count--near-limit{color:var(--amber-text)}.ath-textarea--error .ath-textarea__field{border-color:var(--red)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-textarea', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthTextareaComponent),
                            multi: true,
                        },
                    ], template: "<div\n  class=\"ath-textarea\"\n  [class.ath-textarea--error]=\"error\"\n  [class.ath-textarea--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div\n        class=\"ath-textarea__count\"\n        [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\"\n      >\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--space-1)}.ath-textarea__label{font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--fg)}.ath-textarea__required{color:var(--red-text);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--space-3) var(--space-4);font-family:var(--font-sans);font-size:var(--text-md);color:var(--fg);background-color:var(--bg-1);border:1px solid var(--border);border-radius:var(--r);line-height:var(--line-normal);transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-textarea__field::placeholder{color:var(--fg-3)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--border-strong)}.ath-textarea__field:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--bg-2)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--space-1);font-size:var(--text-sm);color:var(--red-text)}.ath-textarea__hint{font-size:var(--text-sm);color:var(--fg-3)}.ath-textarea__count{font-size:var(--text-xs);color:var(--fg-3)}.ath-textarea__count--near-limit{color:var(--amber-text)}.ath-textarea--error .ath-textarea__field{border-color:var(--red)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxVQUFVLEVBQ1YsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFbEU7Ozs7Ozs7O0dBUUc7QUFnQkgsTUFBTSxPQUFPLG9CQUFvQjtJQWZqQztRQWdCRSxxQkFBcUI7UUFDWixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRXBCLHVCQUF1QjtRQUNkLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRTFCLHFCQUFxQjtRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFFbEIsb0JBQW9CO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVwQixnQkFBZ0I7UUFDUCxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBRW5CLHFCQUFxQjtRQUNaLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIscUJBQXFCO1FBQ1osYUFBUSxHQUFHLEtBQUssQ0FBQztRQUUxQixtQkFBbUI7UUFDVixXQUFNLEdBQWlDLFVBQVUsQ0FBQztRQUUzRCxpQkFBaUI7UUFDUixjQUFTLEdBQWtCLElBQUksQ0FBQztRQUV6Qyx5QkFBeUI7UUFDaEIsZUFBVSxHQUFHLGdCQUFnQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUV0RSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRUYsY0FBUyxHQUFHLFdBQVcsQ0FBQztRQUVuQyxhQUFRLEdBQTRCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUMzQyxjQUFTLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBTTNDLDBFQUEwRTtRQUMxRSxvRUFBb0U7UUFDbkQsUUFBRyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBeUJsRDtJQS9CQyxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQU1ELFVBQVUsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUEyQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBYztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQVk7UUFDbEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQTZCLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7K0dBcEVVLG9CQUFvQjttR0FBcEIsb0JBQW9CLCtRQVZwQjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQ25ELEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRiwwQkNoQ0gscXRDQWlEQSwwaUREekJZLFlBQVksOEJBQUUsV0FBVyw4QkFBRSxtQkFBbUI7OzRGQVk3QyxvQkFBb0I7a0JBZmhDLFNBQVM7K0JBQ0UsY0FBYyxjQUNaLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLENBQUMsbUJBQ3hDLHVCQUF1QixDQUFDLE1BQU0sYUFDcEM7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUM7NEJBQ25ELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGOzhCQU1RLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxXQUFXO3NCQUFuQixLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSztnQkFHRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxNQUFNO3NCQUFkLEtBQUs7Z0JBR0csU0FBUztzQkFBakIsS0FBSztnQkFHRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBpbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBMdWNpZGVBbmd1bGFyTW9kdWxlLCBBbGVydENpcmNsZSB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcblxuLyoqXG4gKiBBdGhlbmUgVGV4dGFyZWEgQ29tcG9uZW50XG4gKlxuICogTXVsdGktbGluZSB0ZXh0IGlucHV0IHdpdGggQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtdGV4dGFyZWEgbGFiZWw9XCJEZXNjcmlwdGlvblwiIFsobmdNb2RlbCldPVwiZGVzY3JpcHRpb25cIiAvPlxuICogPGF0aC10ZXh0YXJlYSBsYWJlbD1cIk1lc3NhZ2VcIiBbcm93c109XCI2XCIgW2Vycm9yXT1cImVycm9yTXNnXCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLXRleHRhcmVhJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBdGhUZXh0YXJlYUNvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vdGV4dGFyZWEuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vdGV4dGFyZWEuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhUZXh0YXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqIFRleHRhcmVhIGxhYmVsICovXG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XG5cbiAgLyoqIFBsYWNlaG9sZGVyIHRleHQgKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICAvKiogTnVtYmVyIG9mIHJvd3MgKi9cbiAgQElucHV0KCkgcm93cyA9IDQ7XG5cbiAgLyoqIEVycm9yIG1lc3NhZ2UgKi9cbiAgQElucHV0KCkgZXJyb3IgPSAnJztcblxuICAvKiogSGludCB0ZXh0ICovXG4gIEBJbnB1dCgpIGhpbnQgPSAnJztcblxuICAvKiogRGlzYWJsZWQgc3RhdGUgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogUmVxdWlyZWQgZmllbGQgKi9cbiAgQElucHV0KCkgcmVxdWlyZWQgPSBmYWxzZTtcblxuICAvKiogQWxsb3cgcmVzaXplICovXG4gIEBJbnB1dCgpIHJlc2l6ZTogJ25vbmUnIHwgJ3ZlcnRpY2FsJyB8ICdib3RoJyA9ICd2ZXJ0aWNhbCc7XG5cbiAgLyoqIE1heCBsZW5ndGggKi9cbiAgQElucHV0KCkgbWF4TGVuZ3RoOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKiogVW5pcXVlIHRleHRhcmVhIElEICovXG4gIEBJbnB1dCgpIHRleHRhcmVhSWQgPSBgYXRoLXRleHRhcmVhLSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpfWA7XG5cbiAgcHJvdGVjdGVkIHZhbHVlID0gJyc7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGFsZXJ0SWNvbiA9IEFsZXJ0Q2lyY2xlO1xuXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIHByb3RlY3RlZCBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBnZXQgY2hhcmFjdGVyQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZT8ubGVuZ3RoID8/IDA7XG4gIH1cblxuICAvLyBPblB1c2g6IHZhbHVlcyB3cml0dGVuIGJ5IHRoZSBmb3JtcyBBUEkgKGUuZy4gYSBzZXRWYWx1ZSBhZnRlciBhbiBhc3luY1xuICAvLyBsb29rdXApIGFycml2ZSBvdXRzaWRlIGFuIGlucHV0IGNoYW5nZSwgc28gdGhlIHZpZXcgbXVzdCBiZSB0b2xkLlxuICBwcml2YXRlIHJlYWRvbmx5IGNkciA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlID8/ICcnO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIG9uSW5wdXQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgdGhpcy52YWx1ZSA9IHRhcmdldC52YWx1ZTtcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICB9XG59XG4iLCI8ZGl2XG4gIGNsYXNzPVwiYXRoLXRleHRhcmVhXCJcbiAgW2NsYXNzLmF0aC10ZXh0YXJlYS0tZXJyb3JdPVwiZXJyb3JcIlxuICBbY2xhc3MuYXRoLXRleHRhcmVhLS1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4+XG4gIEBpZiAobGFiZWwpIHtcbiAgICA8bGFiZWwgY2xhc3M9XCJhdGgtdGV4dGFyZWFfX2xhYmVsXCIgW2Zvcl09XCJ0ZXh0YXJlYUlkXCI+XG4gICAgICB7eyBsYWJlbCB9fVxuICAgICAgQGlmIChyZXF1aXJlZCkge1xuICAgICAgICA8c3BhbiBjbGFzcz1cImF0aC10ZXh0YXJlYV9fcmVxdWlyZWRcIj4qPC9zcGFuPlxuICAgICAgfVxuICAgIDwvbGFiZWw+XG4gIH1cblxuICA8dGV4dGFyZWFcbiAgICBbaWRdPVwidGV4dGFyZWFJZFwiXG4gICAgW3Jvd3NdPVwicm93c1wiXG4gICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgW2F0dHIubWF4bGVuZ3RoXT1cIm1heExlbmd0aFwiXG4gICAgW3N0eWxlLnJlc2l6ZV09XCJyZXNpemVcIlxuICAgIChpbnB1dCk9XCJvbklucHV0KCRldmVudClcIlxuICAgIChibHVyKT1cIm9uVG91Y2hlZCgpXCJcbiAgICBjbGFzcz1cImF0aC10ZXh0YXJlYV9fZmllbGRcIlxuICA+PC90ZXh0YXJlYT5cblxuICA8ZGl2IGNsYXNzPVwiYXRoLXRleHRhcmVhX19tZXRhXCI+XG4gICAgQGlmIChlcnJvcikge1xuICAgICAgPGRpdiBjbGFzcz1cImF0aC10ZXh0YXJlYV9fZXJyb3JcIj5cbiAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiYWxlcnRJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICAgICAgICB7eyBlcnJvciB9fVxuICAgICAgPC9kaXY+XG4gICAgfSBAZWxzZSBpZiAoaGludCkge1xuICAgICAgPGRpdiBjbGFzcz1cImF0aC10ZXh0YXJlYV9faGludFwiPnt7IGhpbnQgfX08L2Rpdj5cbiAgICB9IEBlbHNlIHtcbiAgICAgIDxkaXY+PC9kaXY+XG4gICAgfVxuXG4gICAgQGlmIChtYXhMZW5ndGgpIHtcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJhdGgtdGV4dGFyZWFfX2NvdW50XCJcbiAgICAgICAgW2NsYXNzLmF0aC10ZXh0YXJlYV9fY291bnQtLW5lYXItbGltaXRdPVwiY2hhcmFjdGVyQ291bnQgPiBtYXhMZW5ndGggKiAwLjlcIlxuICAgICAgPlxuICAgICAgICB7eyBjaGFyYWN0ZXJDb3VudCB9fS97eyBtYXhMZW5ndGggfX1cbiAgICAgIDwvZGl2PlxuICAgIH1cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==