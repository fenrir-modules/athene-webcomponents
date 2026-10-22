import { Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { ATH_DEFAULT_LABELS, ATH_LABELS } from '../../i18n/labels';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { LucideAngularModule, Eye, EyeOff, AlertCircle } from 'lucide-angular';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Athene Input Component
 *
 * @example
 * <ath-input label="Email" type="email" [(ngModel)]="email" />
 * <ath-input label="Password" type="password" [error]="errorMessage" />
 */
export class AthInputComponent {
    constructor() {
        /** Input label */
        /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
        this.size = 'md';
        this.labels = inject(ATH_LABELS, { optional: true });
        /** Accessible names of the password reveal toggle; default `ATH_LABELS`. */
        this.showPasswordLabel = null;
        this.hidePasswordLabel = null;
        this.label = '';
        /** Input type */
        this.type = 'text';
        /** Placeholder text */
        this.placeholder = '';
        /** Error message */
        this.error = '';
        /** Hint text */
        this.hint = '';
        /** Disabled state */
        this.disabled = false;
        /** Readonly state */
        this.readonly = false;
        /** Required field */
        this.required = false;
        /** Autocomplete attribute */
        this.autocomplete = 'off';
        /** Unique input ID */
        this.inputId = `ath-input-${Math.random().toString(36).substr(2, 9)}`;
        this.value = '';
        this.showPassword = false;
        this.eyeIcon = Eye;
        this.eyeOffIcon = EyeOff;
        this.alertIcon = AlertCircle;
        this.onChange = () => { };
        this.onTouched = () => { };
        // OnPush: values written by the forms API (e.g. a setValue after an async
        // lookup) arrive outside an input change, so the view must be told.
        this.cdr = inject(ChangeDetectorRef);
    }
    get showPasswordText() {
        return this.showPasswordLabel ?? (this.labels?.showPassword ?? ATH_DEFAULT_LABELS.showPassword)();
    }
    get hidePasswordText() {
        return this.hidePasswordLabel ?? (this.labels?.hidePassword ?? ATH_DEFAULT_LABELS.hidePassword)();
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
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthInputComponent, isStandalone: true, selector: "ath-input", inputs: { size: "size", showPasswordLabel: "showPasswordLabel", hidePasswordLabel: "hidePasswordLabel", label: "label", type: "type", placeholder: "placeholder", error: "error", hint: "hint", disabled: "disabled", readonly: "readonly", required: "required", autocomplete: "autocomplete", inputId: "inputId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthInputComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"ath-input\" [class.ath-input--sm]=\"size === 'sm'\" [class.ath-input--error]=\"error\" [class.ath-input--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-input__label\" [for]=\"inputId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId\"\n      [type]=\"showPassword ? 'text' : type\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [readonly]=\"readonly\"\n      [autocomplete]=\"autocomplete\"\n      [value]=\"value\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword ? hidePasswordText : showPasswordText\"\n        [attr.aria-pressed]=\"showPassword\"\n        tabindex=\"-1\"\n      >\n        <lucide-icon [img]=\"showPassword ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error) {\n    <div class=\"ath-input__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-input__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-input{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-input__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-input__required{color:var(--ath-color-error);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-input__toggle{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}.ath-input__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-input__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-input--error .ath-input__field{border-color:var(--ath-color-error)}.ath-input--error .ath-input__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-input--disabled .ath-input__label{opacity:.5}.ath-input--sm .ath-input__field{height:var(--field-h-sm);padding-left:10px;padding-right:10px;font-size:13.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-input', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthInputComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"ath-input\" [class.ath-input--sm]=\"size === 'sm'\" [class.ath-input--error]=\"error\" [class.ath-input--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-input__label\" [for]=\"inputId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId\"\n      [type]=\"showPassword ? 'text' : type\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [readonly]=\"readonly\"\n      [autocomplete]=\"autocomplete\"\n      [value]=\"value\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword ? hidePasswordText : showPasswordText\"\n        [attr.aria-pressed]=\"showPassword\"\n        tabindex=\"-1\"\n      >\n        <lucide-icon [img]=\"showPassword ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error) {\n    <div class=\"ath-input__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-input__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-input{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-input__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-input__required{color:var(--ath-color-error);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-input__toggle{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}.ath-input__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-input__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-input--error .ath-input__field{border-color:var(--ath-color-error)}.ath-input--error .ath-input__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-input--disabled .ath-input__label{opacity:.5}.ath-input--sm .ath-input__field{height:var(--field-h-sm);padding-left:10px;padding-right:10px;font-size:13.5px}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], showPasswordLabel: [{
                type: Input
            }], hidePasswordLabel: [{
                type: Input
            }], label: [{
                type: Input
            }], type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], error: [{
                type: Input
            }], hint: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], required: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], inputId: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9pbnB1dC9pbnB1dC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBTy9FOzs7Ozs7R0FNRztBQWdCSCxNQUFNLE9BQU8saUJBQWlCO0lBZjlCO1FBZ0JFLGtCQUFrQjtRQUNsQiw0RUFBNEU7UUFDbkUsU0FBSSxHQUFnQixJQUFJLENBQUM7UUFFakIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVqRSw0RUFBNEU7UUFDbkUsc0JBQWlCLEdBQWtCLElBQUksQ0FBQztRQUN4QyxzQkFBaUIsR0FBa0IsSUFBSSxDQUFDO1FBVXhDLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFcEIsaUJBQWlCO1FBQ1IsU0FBSSxHQUFj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LElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsbUJBQW1CLENBQUMsbUJBQ3hDLHVCQUF1QixDQUFDLE1BQU0sYUFDcEM7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUM7NEJBQ2hELEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGOzhCQU9RLElBQUk7c0JBQVosS0FBSztnQkFLRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQVVHLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxJQUFJO3NCQUFaLEtBQUs7Z0JBR0csV0FBVztzQkFBbkIsS0FBSztnQkFHRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFUSF9ERUZBVUxUX0xBQkVMUywgQVRIX0xBQkVMUyB9IGZyb20gJy4uLy4uL2kxOG4vbGFiZWxzJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSwgRXllLCBFeWVPZmYsIEFsZXJ0Q2lyY2xlIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuXG4vKipcbiAqIElucHV0IHR5cGUgdmFyaWFudHNcbiAqL1xuZXhwb3J0IHR5cGUgSW5wdXRUeXBlID0gJ3RleHQnIHwgJ2VtYWlsJyB8ICdwYXNzd29yZCcgfCAnbnVtYmVyJyB8ICd0ZWwnIHwgJ3VybCcgfCAnc2VhcmNoJztcblxuLyoqXG4gKiBBdGhlbmUgSW5wdXQgQ29tcG9uZW50XG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtaW5wdXQgbGFiZWw9XCJFbWFpbFwiIHR5cGU9XCJlbWFpbFwiIFsobmdNb2RlbCldPVwiZW1haWxcIiAvPlxuICogPGF0aC1pbnB1dCBsYWJlbD1cIlBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgW2Vycm9yXT1cImVycm9yTWVzc2FnZVwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1pbnB1dCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBMdWNpZGVBbmd1bGFyTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXRoSW5wdXRDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2lucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2lucHV0LmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBJbnB1dCBsYWJlbCAqL1xuICAvKiogRmllbGQgaGVpZ2h0OiBgbWRgIDQ0cHggKGRlZmF1bHQpLCBgc21gIDMzcHggKGNvbXBhY3Qgc2V0dGluZ3Mgcm93cykuICovXG4gIEBJbnB1dCgpIHNpemU6ICdzbScgfCAnbWQnID0gJ21kJztcblxuICBwcml2YXRlIHJlYWRvbmx5IGxhYmVscyA9IGluamVjdChBVEhfTEFCRUxTLCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuXG4gIC8qKiBBY2Nlc3NpYmxlIG5hbWVzIG9mIHRoZSBwYXNzd29yZCByZXZlYWwgdG9nZ2xlOyBkZWZhdWx0IGBBVEhfTEFCRUxTYC4gKi9cbiAgQElucHV0KCkgc2hvd1Bhc3N3b3JkTGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBoaWRlUGFzc3dvcmRMYWJlbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgcHJvdGVjdGVkIGdldCBzaG93UGFzc3dvcmRUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd1Bhc3N3b3JkTGFiZWwgPz8gKHRoaXMubGFiZWxzPy5zaG93UGFzc3dvcmQgPz8gQVRIX0RFRkFVTFRfTEFCRUxTLnNob3dQYXNzd29yZCkoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgaGlkZVBhc3N3b3JkVGV4dCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmhpZGVQYXNzd29yZExhYmVsID8/ICh0aGlzLmxhYmVscz8uaGlkZVBhc3N3b3JkID8/IEFUSF9ERUZBVUxUX0xBQkVMUy5oaWRlUGFzc3dvcmQpKCk7XG4gIH1cblxuICBASW5wdXQoKSBsYWJlbCA9ICcnO1xuXG4gIC8qKiBJbnB1dCB0eXBlICovXG4gIEBJbnB1dCgpIHR5cGU6IElucHV0VHlwZSA9ICd0ZXh0JztcblxuICAvKiogUGxhY2Vob2xkZXIgdGV4dCAqL1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuXG4gIC8qKiBFcnJvciBtZXNzYWdlICovXG4gIEBJbnB1dCgpIGVycm9yID0gJyc7XG5cbiAgLyoqIEhpbnQgdGV4dCAqL1xuICBASW5wdXQoKSBoaW50ID0gJyc7XG5cbiAgLyoqIERpc2FibGVkIHN0YXRlICovXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqIFJlYWRvbmx5IHN0YXRlICovXG4gIEBJbnB1dCgpIHJlYWRvbmx5ID0gZmFsc2U7XG5cbiAgLyoqIFJlcXVpcmVkIGZpZWxkICovXG4gIEBJbnB1dCgpIHJlcXVpcmVkID0gZmFsc2U7XG5cbiAgLyoqIEF1dG9jb21wbGV0ZSBhdHRyaWJ1dGUgKi9cbiAgQElucHV0KCkgYXV0b2NvbXBsZXRlID0gJ29mZic7XG5cbiAgLyoqIFVuaXF1ZSBpbnB1dCBJRCAqL1xuICBASW5wdXQoKSBpbnB1dElkID0gYGF0aC1pbnB1dC0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KX1gO1xuXG4gIHByb3RlY3RlZCB2YWx1ZSA9ICcnO1xuICBwcm90ZWN0ZWQgc2hvd1Bhc3N3b3JkID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGV5ZUljb24gPSBFeWU7XG4gIHByb3RlY3RlZCByZWFkb25seSBleWVPZmZJY29uID0gRXllT2ZmO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgYWxlcnRJY29uID0gQWxlcnRDaXJjbGU7XG5cbiAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgcHJvdGVjdGVkIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8vIE9uUHVzaDogdmFsdWVzIHdyaXR0ZW4gYnkgdGhlIGZvcm1zIEFQSSAoZS5nLiBhIHNldFZhbHVlIGFmdGVyIGFuIGFzeW5jXG4gIC8vIGxvb2t1cCkgYXJyaXZlIG91dHNpZGUgYW4gaW5wdXQgY2hhbmdlLCBzbyB0aGUgdmlldyBtdXN0IGJlIHRvbGQuXG4gIHByaXZhdGUgcmVhZG9ubHkgY2RyID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgPz8gJyc7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25JbnB1dChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLnZhbHVlID0gdGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gIH1cblxuICB0b2dnbGVQYXNzd29yZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dQYXNzd29yZCA9ICF0aGlzLnNob3dQYXNzd29yZDtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImF0aC1pbnB1dFwiIFtjbGFzcy5hdGgtaW5wdXQtLXNtXT1cInNpemUgPT09ICdzbSdcIiBbY2xhc3MuYXRoLWlucHV0LS1lcnJvcl09XCJlcnJvclwiIFtjbGFzcy5hdGgtaW5wdXQtLWRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gIEBpZiAobGFiZWwpIHtcbiAgICA8bGFiZWwgY2xhc3M9XCJhdGgtaW5wdXRfX2xhYmVsXCIgW2Zvcl09XCJpbnB1dElkXCI+XG4gICAgICB7eyBsYWJlbCB9fVxuICAgICAgQGlmIChyZXF1aXJlZCkge1xuICAgICAgICA8c3BhbiBjbGFzcz1cImF0aC1pbnB1dF9fcmVxdWlyZWRcIj4qPC9zcGFuPlxuICAgICAgfVxuICAgIDwvbGFiZWw+XG4gIH1cblxuICA8ZGl2IGNsYXNzPVwiYXRoLWlucHV0X193cmFwcGVyXCI+XG4gICAgPGlucHV0XG4gICAgICBbaWRdPVwiaW5wdXRJZFwiXG4gICAgICBbdHlwZV09XCJzaG93UGFzc3dvcmQgPyAndGV4dCcgOiB0eXBlXCJcbiAgICAgIFtwbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgIFthdXRvY29tcGxldGVdPVwiYXV0b2NvbXBsZXRlXCJcbiAgICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgICAoaW5wdXQpPVwib25JbnB1dCgkZXZlbnQpXCJcbiAgICAgIChibHVyKT1cIm9uVG91Y2hlZCgpXCJcbiAgICAgIGNsYXNzPVwiYXRoLWlucHV0X19maWVsZFwiXG4gICAgLz5cblxuICAgIEBpZiAodHlwZSA9PT0gJ3Bhc3N3b3JkJykge1xuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJhdGgtaW5wdXRfX3RvZ2dsZVwiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGVQYXNzd29yZCgpXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJzaG93UGFzc3dvcmQgPyBoaWRlUGFzc3dvcmRUZXh0IDogc2hvd1Bhc3N3b3JkVGV4dFwiXG4gICAgICAgIFthdHRyLmFyaWEtcHJlc3NlZF09XCJzaG93UGFzc3dvcmRcIlxuICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgID5cbiAgICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwic2hvd1Bhc3N3b3JkID8gZXllT2ZmSWNvbiA6IGV5ZUljb25cIiBbc2l6ZV09XCIxOFwiIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICB9XG4gIDwvZGl2PlxuXG4gIEBpZiAoZXJyb3IpIHtcbiAgICA8ZGl2IGNsYXNzPVwiYXRoLWlucHV0X19lcnJvclwiPlxuICAgICAgPGx1Y2lkZS1pY29uIFtpbWddPVwiYWxlcnRJY29uXCIgW3NpemVdPVwiMTRcIiAvPlxuICAgICAge3sgZXJyb3IgfX1cbiAgICA8L2Rpdj5cbiAgfVxuXG4gIEBpZiAoaGludCAmJiAhZXJyb3IpIHtcbiAgICA8ZGl2IGNsYXNzPVwiYXRoLWlucHV0X19oaW50XCI+e3sgaGludCB9fTwvZGl2PlxuICB9XG48L2Rpdj5cbiJdfQ==