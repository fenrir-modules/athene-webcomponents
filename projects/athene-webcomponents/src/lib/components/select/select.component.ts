import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, AlertCircle } from 'lucide-angular';

/**
 * Select option definition
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Athene Select Component
 *
 * Form select with consistent styling and ControlValueAccessor.
 *
 * @example
 * <ath-select label="Role" [options]="roles" [(ngModel)]="selectedRole" />
 */
@Component({
  selector: 'ath-select',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AthSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class AthSelectComponent implements ControlValueAccessor {
  /** Select label */
  @Input() label = '';

  /** Placeholder text */
  @Input() placeholder = 'Select an option';

  /** Select options */
  @Input() options: SelectOption[] = [];

  /** Error message */
  @Input() error = '';

  /** Hint text */
  @Input() hint = '';

  /** Disabled state */
  @Input() disabled = false;

  /** Required field */
  @Input() required = false;

  /** Unique select ID */
  @Input() selectId = `ath-select-${Math.random().toString(36).substr(2, 9)}`;

  protected value = '';

  protected readonly chevronIcon = ChevronDown;
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

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
  }
}
