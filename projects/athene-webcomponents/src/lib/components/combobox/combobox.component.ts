import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  booleanAttribute,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { AthOptionPickerComponent } from '../listbox/option-picker.component';
import type { ListboxOption, ListboxOptionContext } from '../listbox/listbox.component';

/**
 * A combobox option. Same shape as `ListboxOption`: `icon` may be a Lucide
 * icon (rendered) or a name your `optionTpl` resolves.
 */
export type ComboboxOption<T = string> = ListboxOption<T>;

/**
 * Searchable single-select dropdown: a preset on `ath-option-picker`
 * (popover + listbox), kept for its established API. For multi-select,
 * "create" rows or a custom anchor use `ath-option-picker` directly.
 *
 * For custom rendering pass an `optionTpl` template (`let-option`).
 *
 * @example
 * <ath-combobox
 *   [options]="users"
 *   [(value)]="selected"
 *   placeholder="Pick assignee"
 *   (queryChange)="search($event)" />
 */
@Component({
  selector: 'ath-combobox',
  standalone: true,
  imports: [AthOptionPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
})
export class AthComboboxComponent<T = string> {
  protected readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly options = input<ComboboxOption<T>[]>([]);
  /** The selected value. Two-way: `[(value)]`. */
  readonly value = model<T | null>(null);
  /** Trigger text without a value; defaults to `ATH_LABELS.pickerPlaceholder`. */
  readonly placeholder = input<string | null>(null);
  /** Search field placeholder; defaults to `ATH_LABELS.listboxSearch`. */
  readonly searchPlaceholder = input<string | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly clearable = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  /** Hide the trigger; render only the popup (controlled mode, see `openPanel()`). */
  readonly bare = input(false, { transform: booleanAttribute });

  /** Optional custom template for each option (`<ng-template let-option>`). */
  readonly optionTpl = input<TemplateRef<ListboxOptionContext<T>> | null>(null);

  /** Emits the search query when it changes (for async/server search). */
  readonly queryChange = output<string>();
  readonly opened = output<void>();
  readonly closed = output<void>();

  private readonly picker =
    viewChild.required<AthOptionPickerComponent<T>>(AthOptionPickerComponent);

  toggle(): void {
    this.picker().toggle();
  }

  openPanel(): void {
    this.picker().show();
  }

  close(): void {
    this.picker().hide();
  }

  select(option: ComboboxOption<T>): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.close();
  }

  /** @deprecated The clear button is built in (`clearable`); call `value.set(null)`. */
  clearValue(event?: Event): void {
    event?.stopPropagation();
    this.value.set(null);
  }
}
