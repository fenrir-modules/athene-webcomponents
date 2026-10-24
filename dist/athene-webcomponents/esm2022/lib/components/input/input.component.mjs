import { Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject, } from '@angular/core';
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
        return (this.showPasswordLabel ?? (this.labels?.showPassword ?? ATH_DEFAULT_LABELS.showPassword)());
    }
    get hidePasswordText() {
        return (this.hidePasswordLabel ?? (this.labels?.hidePassword ?? ATH_DEFAULT_LABELS.hidePassword)());
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
        ], ngImport: i0, template: "<div\n  class=\"ath-input\"\n  [class.ath-input--sm]=\"size === 'sm'\"\n  [class.ath-input--error]=\"error\"\n  [class.ath-input--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-input__label\" [for]=\"inputId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId\"\n      [type]=\"showPassword ? 'text' : type\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [readonly]=\"readonly\"\n      [autocomplete]=\"autocomplete\"\n      [value]=\"value\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword ? hidePasswordText : showPasswordText\"\n        [attr.aria-pressed]=\"showPassword\"\n        tabindex=\"-1\"\n      >\n        <lucide-icon [img]=\"showPassword ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error) {\n    <div class=\"ath-input__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-input__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-input{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-input__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-input__required{color:var(--red-text);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-input__toggle{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}.ath-input__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-input__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-input--error .ath-input__field{border-color:var(--ath-color-error)}.ath-input--error .ath-input__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-input--disabled .ath-input__label{opacity:.5}.ath-input--sm .ath-input__field{height:var(--field-h-sm);padding-left:10px;padding-right:10px;font-size:13.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-input', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthInputComponent),
                            multi: true,
                        },
                    ], template: "<div\n  class=\"ath-input\"\n  [class.ath-input--sm]=\"size === 'sm'\"\n  [class.ath-input--error]=\"error\"\n  [class.ath-input--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-input__label\" [for]=\"inputId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId\"\n      [type]=\"showPassword ? 'text' : type\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [readonly]=\"readonly\"\n      [autocomplete]=\"autocomplete\"\n      [value]=\"value\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword ? hidePasswordText : showPasswordText\"\n        [attr.aria-pressed]=\"showPassword\"\n        tabindex=\"-1\"\n      >\n        <lucide-icon [img]=\"showPassword ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error) {\n    <div class=\"ath-input__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-input__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-input{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-input__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-input__required{color:var(--red-text);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-input__toggle{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}.ath-input__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-input__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-input--error .ath-input__field{border-color:var(--ath-color-error)}.ath-input--error .ath-input__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-input--disabled .ath-input__label{opacity:.5}.ath-input--sm .ath-input__field{height:var(--field-h-sm);padding-left:10px;padding-right:10px;font-size:13.5px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2lucHV0L2lucHV0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9pbnB1dC9pbnB1dC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxVQUFVLEVBQ1YsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPL0U7Ozs7OztHQU1HO0FBZ0JILE1BQU0sT0FBTyxpQkFBaUI7SUFmOUI7UUFnQkUsa0JBQWtCO1FBQ2xCLDRFQUE0RTtRQUNuRSxTQUFJLEdBQWdCLElBQUksQ0FBQztRQUVqQixXQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLDRFQUE0RTtRQUNuRSxzQkFBaUIsR0FBa0IsSUFBSSxDQUFDO1FBQ3hDLHNCQUFpQixHQUFrQixJQUFJLENBQUM7UUFjeEMsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVwQixpQkFBaUI7UUFDUixTQUFJLEdB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QixTQUFTOytCQUNFLFdBQVcsY0FDVCxJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixDQUFDLG1CQUN4Qyx1QkFBdUIsQ0FBQyxNQUFNLGFBQ3BDO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDOzRCQUNoRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjs4QkFPUSxJQUFJO3NCQUFaLEtBQUs7Z0JBS0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFjRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQUdHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR0csS0FBSztzQkFBYixLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxZQUFZO3NCQUFwQixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIGZvcndhcmRSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFUSF9ERUZBVUxUX0xBQkVMUywgQVRIX0xBQkVMUyB9IGZyb20gJy4uLy4uL2kxOG4vbGFiZWxzJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSwgRXllLCBFeWVPZmYsIEFsZXJ0Q2lyY2xlIH0gZnJvbSAnbHVjaWRlLWFuZ3VsYXInO1xuXG4vKipcbiAqIElucHV0IHR5cGUgdmFyaWFudHNcbiAqL1xuZXhwb3J0IHR5cGUgSW5wdXRUeXBlID0gJ3RleHQnIHwgJ2VtYWlsJyB8ICdwYXNzd29yZCcgfCAnbnVtYmVyJyB8ICd0ZWwnIHwgJ3VybCcgfCAnc2VhcmNoJztcblxuLyoqXG4gKiBBdGhlbmUgSW5wdXQgQ29tcG9uZW50XG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtaW5wdXQgbGFiZWw9XCJFbWFpbFwiIHR5cGU9XCJlbWFpbFwiIFsobmdNb2RlbCldPVwiZW1haWxcIiAvPlxuICogPGF0aC1pbnB1dCBsYWJlbD1cIlBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgW2Vycm9yXT1cImVycm9yTWVzc2FnZVwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1pbnB1dCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBMdWNpZGVBbmd1bGFyTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQXRoSW5wdXRDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2lucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2lucHV0LmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKiBJbnB1dCBsYWJlbCAqL1xuICAvKiogRmllbGQgaGVpZ2h0OiBgbWRgIDQ0cHggKGRlZmF1bHQpLCBgc21gIDMzcHggKGNvbXBhY3Qgc2V0dGluZ3Mgcm93cykuICovXG4gIEBJbnB1dCgpIHNpemU6ICdzbScgfCAnbWQnID0gJ21kJztcblxuICBwcml2YXRlIHJlYWRvbmx5IGxhYmVscyA9IGluamVjdChBVEhfTEFCRUxTLCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuXG4gIC8qKiBBY2Nlc3NpYmxlIG5hbWVzIG9mIHRoZSBwYXNzd29yZCByZXZlYWwgdG9nZ2xlOyBkZWZhdWx0IGBBVEhfTEFCRUxTYC4gKi9cbiAgQElucHV0KCkgc2hvd1Bhc3N3b3JkTGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBoaWRlUGFzc3dvcmRMYWJlbDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cbiAgcHJvdGVjdGVkIGdldCBzaG93UGFzc3dvcmRUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkTGFiZWwgPz8gKHRoaXMubGFiZWxzPy5zaG93UGFzc3dvcmQgPz8gQVRIX0RFRkFVTFRfTEFCRUxTLnNob3dQYXNzd29yZCkoKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGhpZGVQYXNzd29yZFRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5oaWRlUGFzc3dvcmRMYWJlbCA/PyAodGhpcy5sYWJlbHM/LmhpZGVQYXNzd29yZCA/PyBBVEhfREVGQVVMVF9MQUJFTFMuaGlkZVBhc3N3b3JkKSgpXG4gICAgKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XG5cbiAgLyoqIElucHV0IHR5cGUgKi9cbiAgQElucHV0KCkgdHlwZTogSW5wdXRUeXBlID0gJ3RleHQnO1xuXG4gIC8qKiBQbGFjZWhvbGRlciB0ZXh0ICovXG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgLyoqIEVycm9yIG1lc3NhZ2UgKi9cbiAgQElucHV0KCkgZXJyb3IgPSAnJztcblxuICAvKiogSGludCB0ZXh0ICovXG4gIEBJbnB1dCgpIGhpbnQgPSAnJztcblxuICAvKiogRGlzYWJsZWQgc3RhdGUgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvKiogUmVhZG9ubHkgc3RhdGUgKi9cbiAgQElucHV0KCkgcmVhZG9ubHkgPSBmYWxzZTtcblxuICAvKiogUmVxdWlyZWQgZmllbGQgKi9cbiAgQElucHV0KCkgcmVxdWlyZWQgPSBmYWxzZTtcblxuICAvKiogQXV0b2NvbXBsZXRlIGF0dHJpYnV0ZSAqL1xuICBASW5wdXQoKSBhdXRvY29tcGxldGUgPSAnb2ZmJztcblxuICAvKiogVW5pcXVlIGlucHV0IElEICovXG4gIEBJbnB1dCgpIGlucHV0SWQgPSBgYXRoLWlucHV0LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpfWA7XG5cbiAgcHJvdGVjdGVkIHZhbHVlID0gJyc7XG4gIHByb3RlY3RlZCBzaG93UGFzc3dvcmQgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZXllSWNvbiA9IEV5ZTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGV5ZU9mZkljb24gPSBFeWVPZmY7XG4gIHByb3RlY3RlZCByZWFkb25seSBhbGVydEljb24gPSBBbGVydENpcmNsZTtcblxuICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBwcm90ZWN0ZWQgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLy8gT25QdXNoOiB2YWx1ZXMgd3JpdHRlbiBieSB0aGUgZm9ybXMgQVBJIChlLmcuIGEgc2V0VmFsdWUgYWZ0ZXIgYW4gYXN5bmNcbiAgLy8gbG9va3VwKSBhcnJpdmUgb3V0c2lkZSBhbiBpbnB1dCBjaGFuZ2UsIHNvIHRoZSB2aWV3IG11c3QgYmUgdG9sZC5cbiAgcHJpdmF0ZSByZWFkb25seSBjZHIgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZSA/PyAnJztcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvbklucHV0KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHRoaXMudmFsdWUgPSB0YXJnZXQudmFsdWU7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHRvZ2dsZVBhc3N3b3JkKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd1Bhc3N3b3JkID0gIXRoaXMuc2hvd1Bhc3N3b3JkO1xuICB9XG59XG4iLCI8ZGl2XG4gIGNsYXNzPVwiYXRoLWlucHV0XCJcbiAgW2NsYXNzLmF0aC1pbnB1dC0tc21dPVwic2l6ZSA9PT0gJ3NtJ1wiXG4gIFtjbGFzcy5hdGgtaW5wdXQtLWVycm9yXT1cImVycm9yXCJcbiAgW2NsYXNzLmF0aC1pbnB1dC0tZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuPlxuICBAaWYgKGxhYmVsKSB7XG4gICAgPGxhYmVsIGNsYXNzPVwiYXRoLWlucHV0X19sYWJlbFwiIFtmb3JdPVwiaW5wdXRJZFwiPlxuICAgICAge3sgbGFiZWwgfX1cbiAgICAgIEBpZiAocmVxdWlyZWQpIHtcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhdGgtaW5wdXRfX3JlcXVpcmVkXCI+Kjwvc3Bhbj5cbiAgICAgIH1cbiAgICA8L2xhYmVsPlxuICB9XG5cbiAgPGRpdiBjbGFzcz1cImF0aC1pbnB1dF9fd3JhcHBlclwiPlxuICAgIDxpbnB1dFxuICAgICAgW2lkXT1cImlucHV0SWRcIlxuICAgICAgW3R5cGVdPVwic2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogdHlwZVwiXG4gICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgIFtyZWFkb25seV09XCJyZWFkb25seVwiXG4gICAgICBbYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiXG4gICAgICBbdmFsdWVdPVwidmFsdWVcIlxuICAgICAgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiXG4gICAgICAoYmx1cik9XCJvblRvdWNoZWQoKVwiXG4gICAgICBjbGFzcz1cImF0aC1pbnB1dF9fZmllbGRcIlxuICAgIC8+XG5cbiAgICBAaWYgKHR5cGUgPT09ICdwYXNzd29yZCcpIHtcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwiYXRoLWlucHV0X190b2dnbGVcIlxuICAgICAgICAoY2xpY2spPVwidG9nZ2xlUGFzc3dvcmQoKVwiXG4gICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwic2hvd1Bhc3N3b3JkID8gaGlkZVBhc3N3b3JkVGV4dCA6IHNob3dQYXNzd29yZFRleHRcIlxuICAgICAgICBbYXR0ci5hcmlhLXByZXNzZWRdPVwic2hvd1Bhc3N3b3JkXCJcbiAgICAgICAgdGFiaW5kZXg9XCItMVwiXG4gICAgICA+XG4gICAgICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cInNob3dQYXNzd29yZCA/IGV5ZU9mZkljb24gOiBleWVJY29uXCIgW3NpemVdPVwiMThcIiAvPlxuICAgICAgPC9idXR0b24+XG4gICAgfVxuICA8L2Rpdj5cblxuICBAaWYgKGVycm9yKSB7XG4gICAgPGRpdiBjbGFzcz1cImF0aC1pbnB1dF9fZXJyb3JcIj5cbiAgICAgIDxsdWNpZGUtaWNvbiBbaW1nXT1cImFsZXJ0SWNvblwiIFtzaXplXT1cIjE0XCIgLz5cbiAgICAgIHt7IGVycm9yIH19XG4gICAgPC9kaXY+XG4gIH1cblxuICBAaWYgKGhpbnQgJiYgIWVycm9yKSB7XG4gICAgPGRpdiBjbGFzcz1cImF0aC1pbnB1dF9faGludFwiPnt7IGhpbnQgfX08L2Rpdj5cbiAgfVxuPC9kaXY+XG4iXX0=