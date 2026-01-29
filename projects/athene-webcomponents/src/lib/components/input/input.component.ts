import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { LucideAngularModule, Eye, EyeOff, AlertCircle } from 'lucide-angular';

/**
 * Input type variants
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/**
 * Athene Input Component
 * 
 * @example
 * <ath-input label="Email" type="email" [(ngModel)]="email" />
 * <ath-input label="Password" type="password" [error]="errorMessage" />
 */
@Component({
  selector: 'ath-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AthInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="ath-input" [class.ath-input--error]="error" [class.ath-input--disabled]="disabled">
      @if (label) {
        <label class="ath-input__label" [for]="inputId">
          {{ label }}
          @if (required) {
            <span class="ath-input__required">*</span>
          }
        </label>
      }
      
      <div class="ath-input__wrapper">
        <input
          [id]="inputId"
          [type]="showPassword ? 'text' : type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [autocomplete]="autocomplete"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onTouched()"
          class="ath-input__field"
        />
        
        @if (type === 'password') {
          <button
            type="button"
            class="ath-input__toggle"
            (click)="togglePassword()"
            tabindex="-1"
          >
            <lucide-icon [img]="showPassword ? eyeOffIcon : eyeIcon" [size]="18" />
          </button>
        }
      </div>
      
      @if (error) {
        <div class="ath-input__error">
          <lucide-icon [img]="alertIcon" [size]="14" />
          {{ error }}
        </div>
      }
      
      @if (hint && !error) {
        <div class="ath-input__hint">{{ hint }}</div>
      }
    </div>
  `,
  styleUrl: './input.component.scss',
})
export class AthInputComponent implements ControlValueAccessor {
  /** Input label */
  @Input() label = '';
  
  /** Input type */
  @Input() type: InputType = 'text';
  
  /** Placeholder text */
  @Input() placeholder = '';
  
  /** Error message */
  @Input() error = '';
  
  /** Hint text */
  @Input() hint = '';
  
  /** Disabled state */
  @Input() disabled = false;
  
  /** Readonly state */
  @Input() readonly = false;
  
  /** Required field */
  @Input() required = false;
  
  /** Autocomplete attribute */
  @Input() autocomplete = 'off';
  
  /** Unique input ID */
  @Input() inputId = `ath-input-${Math.random().toString(36).substr(2, 9)}`;
  
  protected value = '';
  protected showPassword = false;
  
  protected readonly eyeIcon = Eye;
  protected readonly eyeOffIcon = EyeOff;
  protected readonly alertIcon = AlertCircle;
  
  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};
  
  writeValue(value: string): void {
    this.value = value ?? '';
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }
  
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
