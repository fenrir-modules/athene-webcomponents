import { Component, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { ATH_DEFAULT_LABELS, ATH_LABELS } from '../../i18n/labels';
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
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class AthInputComponent implements ControlValueAccessor {
  /** Input label */
  /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
  @Input() size: 'sm' | 'md' = 'md';

  private readonly labels = inject(ATH_LABELS, { optional: true });

  /** Accessible names of the password reveal toggle; default `ATH_LABELS`. */
  @Input() showPasswordLabel: string | null = null;
  @Input() hidePasswordLabel: string | null = null;

  protected get showPasswordText(): string {
    return this.showPasswordLabel ?? (this.labels?.showPassword ?? ATH_DEFAULT_LABELS.showPassword)();
  }

  protected get hidePasswordText(): string {
    return this.hidePasswordLabel ?? (this.labels?.hidePassword ?? ATH_DEFAULT_LABELS.hidePassword)();
  }

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

  // OnPush: values written by the forms API (e.g. a setValue after an async
  // lookup) arrive outside an input change, so the view must be told.
  private readonly cdr = inject(ChangeDetectorRef);

  writeValue(value: string): void {
    this.value = value ?? '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
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
