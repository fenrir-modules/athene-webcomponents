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
 * Searchable single-select dropdown: a preset on `ath-option-picker`
 * (popover + listbox), kept for its established API. For multi-select,
 * "create" rows or a custom anchor use `ath-option-picker` directly.
 *
 * Options are `ListboxOption`s: `icon` may be a Lucide icon (rendered) or a
 * name your `optionTpl` resolves. For custom rendering pass an `optionTpl`
 * template (`let-option`). Clearing is built in (`clearable`); from code,
 * `value.set(null)`.
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
  imports: [AthOptionPickerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
})
export class AthComboboxComponent<T = string> {
  protected readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly options = input<ListboxOption<T>[]>([]);
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

  select(option: ListboxOption<T>): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.close();
  }
}
