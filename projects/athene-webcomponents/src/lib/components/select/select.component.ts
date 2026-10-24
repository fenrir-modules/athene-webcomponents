import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
} from '@angular/core';
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
 * <ath-select [ariaLabel]="'Role for ' + member.name" [options]="roles" [(ngModel)]="role" />
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
  /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
  @Input() size: 'sm' | 'md' = 'md';

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

  /**
   * Accessible name of the native select when no visible `label` is drawn
   * (a select in a settings row or a table cell that its row already names).
   */
  @Input() ariaLabel = '';

  /** Unique select ID */
  @Input() selectId = `ath-select-${Math.random().toString(36).substr(2, 9)}`;

  protected value = '';

  protected readonly chevronIcon = ChevronDown;
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

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
  }
}
