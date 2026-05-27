import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AthAvatarComponent } from '../avatar';
import { AthComboboxComponent, ComboboxOption } from '../combobox';

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
  standalone: true,
  imports: [CommonModule, AthAvatarComponent, AthComboboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-picker.component.html',
  styleUrl: './user-picker.component.scss',
})
export class AthUserPickerComponent {
  private readonly _users = signal<UserOption[]>([]);

  @Input()
  set users(value: UserOption[] | null | undefined) {
    this._users.set(value ?? []);
  }
  get users(): UserOption[] {
    return this._users();
  }

  @Input() value: string | null = null;
  @Input() placeholder = 'Pick user';
  @Input() searchPlaceholder = 'Search people';
  @Input() disabled = false;
  @Input() clearable = true;
  @Input() allowUnassigned = true;

  /** Show email under each name. */
  @Input() showEmail = true;

  @Output() valueChange = new EventEmitter<string | null>();

  protected readonly options = computed<ComboboxOption<string>[]>(() =>
    this._users().map((u) => ({
      value: u.id,
      label: u.name,
      sublabel: this.showEmail ? u.email : undefined,
    })),
  );

  protected readonly selectedUser = computed<UserOption | null>(() =>
    this._users().find((u) => u.id === this.value) ?? null,
  );

  onValueChange(v: string | null): void {
    this.value = v;
    this.valueChange.emit(v);
  }

  protected get triggerLabel(): string {
    const selected = this.selectedUser();
    if (selected) return selected.name;
    return this.allowUnassigned ? this.placeholder : '—';
  }
}
