import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  model,
} from '@angular/core';

import { AthComboboxComponent } from '../combobox';
import type { ListboxOption } from '../listbox/listbox.component';
import { injectAthLabels } from '../../i18n/labels';

export interface UserOption {
  id: string;
  name: string;
  email?: string;
  avatarSrc?: string;
}

/**
 * User picker — wraps `<ath-combobox>` with avatar rendering on the trigger
 * and in options. Use for Assignee, Reporter, Watchers, Mentions, etc.
 *
 * @example
 * <ath-user-picker
 *   [users]="workspaceMembers"
 *   [(value)]="assigneeId"
 *   placeholder="Unassigned" />
 */
@Component({
  selector: 'ath-user-picker',
  imports: [AthComboboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-picker.component.html',
  styleUrl: './user-picker.component.scss',
})
export class AthUserPickerComponent {
  protected readonly labels = injectAthLabels();

  /** The people to choose from; `null`/`undefined` count as none. */
  readonly users = input<UserOption[], UserOption[] | null | undefined>([], {
    transform: (value) => value ?? [],
  });

  /** The chosen user's id. Two-way: `[(value)]`. */
  readonly value = model<string | null>(null);
  readonly placeholder = input<string | null>(null);
  readonly searchPlaceholder = input<string | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly clearable = input(true, { transform: booleanAttribute });
  readonly allowUnassigned = input(true, { transform: booleanAttribute });

  /** Show email under each name. */
  readonly showEmail = input(true, { transform: booleanAttribute });

  protected readonly options = computed<ListboxOption<string>[]>(() => {
    const showEmail = this.showEmail();
    return this.users().map((u) => ({
      value: u.id,
      label: u.name,
      sublabel: showEmail ? u.email : undefined,
    }));
  });

  protected readonly selectedUser = computed<UserOption | null>(
    () => this.users().find((u) => u.id === this.value()) ?? null
  );

  onValueChange(v: string | null): void {
    this.value.set(v);
  }

  protected readonly triggerLabel = computed<string>(() => {
    const selected = this.selectedUser();
    if (selected) return selected.name;
    return this.allowUnassigned()
      ? (this.placeholder() ?? this.labels.userPickerPlaceholder())
      : '—';
  });
}
