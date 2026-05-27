import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, Check, Search, X } from 'lucide-angular';

export interface ComboboxOption<T = string> {
  value: T;
  label: string;
  /** Optional sub-label shown below the main label (e.g., email under name). */
  sublabel?: string;
  /** Optional icon-name (Lucide) or arbitrary string handled by `optionTpl`. */
  icon?: string;
  disabled?: boolean;
  /** Free-form group label — items with the same group are grouped together. */
  group?: string;
}

/**
 * Searchable single-select dropdown. The foundation for UserPicker,
 * LabelPicker, ProjectPicker, AssigneePicker, etc.
 *
 * For custom rendering pass an `optionTpl` template.
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
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
})
export class AthComboboxComponent<T = string> {
  private readonly host = inject(ElementRef<HTMLElement>);

  @Input() options: ComboboxOption<T>[] = [];
  @Input() value: T | null = null;
  @Input() placeholder = 'Select…';
  @Input() searchPlaceholder = 'Search';
  @Input() disabled = false;
  @Input() clearable = false;
  @Input() loading = false;

  /** Hide the trigger's button styling; render only the popup (controlled mode). */
  @Input() bare = false;

  /** Optional custom template for each option (`<ng-template let-option>`). */
  @Input() optionTpl: TemplateRef<unknown> | null = null;

  @Output() valueChange = new EventEmitter<T | null>();

  /** Emits the search query when it changes (for async/server search). */
  @Output() queryChange = new EventEmitter<string>();

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild('searchInput') private searchInput!: ElementRef<HTMLInputElement>;

  protected readonly chevronIcon = ChevronDown;
  protected readonly checkIcon = Check;
  protected readonly searchIcon = Search;
  protected readonly clearIcon = X;

  protected readonly open = signal(false);
  protected readonly query = signal('');
  protected readonly highlighted = signal(0);

  protected readonly filtered = computed<ComboboxOption<T>[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.options;
    return this.options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        (o.sublabel ?? '').toLowerCase().includes(q),
    );
  });

  /** Result with `null` separators inserted between groups. */
  protected readonly grouped = computed<(ComboboxOption<T> | { _group: string })[]>(() => {
    const items = this.filtered();
    if (!items.some((i) => i.group)) return items;

    const byGroup = new Map<string, ComboboxOption<T>[]>();
    const noGroup: ComboboxOption<T>[] = [];
    for (const item of items) {
      if (item.group) {
        const arr = byGroup.get(item.group) ?? [];
        arr.push(item);
        byGroup.set(item.group, arr);
      } else {
        noGroup.push(item);
      }
    }

    const result: (ComboboxOption<T> | { _group: string })[] = [];
    for (const [group, list] of byGroup) {
      result.push({ _group: group });
      result.push(...list);
    }
    if (noGroup.length) {
      if (byGroup.size > 0) result.push({ _group: 'Other' });
      result.push(...noGroup);
    }
    return result;
  });

  protected readonly selectedOption = computed<ComboboxOption<T> | null>(
    () => this.options.find((o) => o.value === this.value) ?? null,
  );

  toggle(): void {
    if (this.disabled) return;
    if (this.open()) {
      this.close();
    } else {
      this.openPanel();
    }
  }

  openPanel(): void {
    if (this.disabled) return;
    this.open.set(true);
    this.query.set('');
    this.highlighted.set(0);
    this.opened.emit();
    queueMicrotask(() => this.searchInput?.nativeElement.focus());
  }

  close(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.closed.emit();
  }

  select(option: ComboboxOption<T>): void {
    if (option.disabled) return;
    this.value = option.value;
    this.valueChange.emit(option.value);
    this.close();
  }

  clearValue(event: MouseEvent): void {
    event.stopPropagation();
    this.value = null;
    this.valueChange.emit(null);
  }

  onQueryInput(value: string): void {
    this.query.set(value);
    this.highlighted.set(0);
    this.queryChange.emit(value);
  }

  isOption(item: ComboboxOption<T> | { _group: string }): item is ComboboxOption<T> {
    return !('_group' in item);
  }

  isHighlighted(index: number, item: ComboboxOption<T> | { _group: string }): boolean {
    if (!this.isOption(item)) return false;
    const realIndex = this.filtered().indexOf(item);
    return realIndex === this.highlighted();
  }

  trackByValue = (index: number, item: ComboboxOption<T> | { _group: string }): unknown => {
    return this.isOption(item) ? item.value : `__group_${item._group}`;
  };

  // ---------- Keyboard navigation ----------

  onSearchKey(event: KeyboardEvent): void {
    const items = this.filtered();
    if (items.length === 0) {
      if (event.key === 'Escape') this.close();
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlighted.update((i) => Math.min(i + 1, items.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.highlighted.update((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        this.select(items[this.highlighted()]);
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  // ---------- Click-outside ----------

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    if (!this.open()) return;
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
