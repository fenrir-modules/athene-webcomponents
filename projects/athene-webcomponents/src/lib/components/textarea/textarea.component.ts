import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { LucideAngularModule, AlertCircle } from 'lucide-angular';

/**
 * Athene Textarea Component
 *
 * Multi-line text input with ControlValueAccessor.
 *
 * @example
 * <ath-textarea label="Description" [(ngModel)]="description" />
 * <ath-textarea label="Message" [rows]="6" [error]="errorMsg" />
 */
@Component({
  selector: 'ath-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AthTextareaComponent),
      multi: true,
    },
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class AthTextareaComponent implements ControlValueAccessor {
  /** Textarea label */
  @Input() label = '';

  /** Placeholder text */
  @Input() placeholder = '';

  /** Number of rows */
  @Input() rows = 4;

  /** Error message */
  @Input() error = '';

  /** Hint text */
  @Input() hint = '';

  /** Disabled state */
  @Input() disabled = false;

  /** Required field */
  @Input() required = false;

  /** Allow resize */
  @Input() resize: 'none' | 'vertical' | 'both' = 'vertical';

  /** Max length */
  @Input() maxLength: number | null = null;

  /** Unique textarea ID */
  @Input() textareaId = `ath-textarea-${Math.random().toString(36).substr(2, 9)}`;

  protected value = '';

  protected readonly alertIcon = AlertCircle;

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  get characterCount(): number {
    return this.value?.length ?? 0;
  }

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
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
  }
}
