import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  booleanAttribute,
  computed,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Check, LucideAngularModule, Plus, Search } from 'lucide-angular';
import { formatAthLabel, injectAthLabels } from '../../i18n/label-utils';
import type { AthIconData } from '../floating/icon';
import { Typeahead, edgeIndex, isTypeaheadKey, stepIndex } from '../floating/list-keys';
import { focusSafely } from '../floating/focus';

/** One choice of an `ath-listbox`. */
export interface ListboxOption<T = string> {
  value: T;
  label: string;
  /** Second line, e.g. the e-mail under a name. */
  sublabel?: string;
  /**
   * A Lucide icon shown before the label, or a name your own option
   * template resolves (strings are not rendered by the default template).
   */
  icon?: AthIconData | string;
  disabled?: boolean;
  /** Options with the same group are listed together under that heading. */
  group?: string;
  /** Extra text the search matches but does not show (key, alias, e-mail). */
  keywords?: string;
}

/** Context of a custom option template (`<ng-template let-option let-selected="selected">`). */
export interface ListboxOptionContext<T = string> {
  $implicit: ListboxOption<T>;
  selected: boolean;
  active: boolean;
}

interface OptionRow<T> {
  kind: 'option';
  option: ListboxOption<T>;
  index: number;
  id: string;
  selected: boolean;
}

interface CreateRow {
  kind: 'create';
  index: number;
  id: string;
  label: string;
}

type Row<T> = OptionRow<T> | CreateRow;

interface Section<T> {
  key: string;
  label: string | null;
  labelId: string;
  rows: Row<T>[];
}

let nextListboxId = 0;

/** Case- and accent-insensitive text for matching ("Jürgen" ~ "jurgen"). */
function foldText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase();
}

/**
 * Athene Listbox: the WAI-ARIA listbox pattern, single or multi-select.
 *
 * Optional search field (`role="combobox"` with `aria-activedescendant`;
 * focus stays in the field), groups, an optional "create" row, typeahead
 * when there is no search field. Rendering stays cheap for a few hundred
 * options: one element per option, filtering in a `computed`, the active row
 * marked by id, offscreen rows skipped by `content-visibility`.
 *
 * Keyboard: ArrowDown/ArrowUp, Home/End (without search field),
 * PageDown/PageUp, Enter chooses (toggles in multi-select), Space too
 * without search field, typeahead without search field.
 *
 * @example
 * <ath-listbox [options]="labels" multiple searchable [(values)]="selected"
 *              creatable (create)="addLabel($event)" ariaLabel="Labels" />
 */
@Component({
  selector: 'ath-listbox',
  standalone: true,
  imports: [NgTemplateOutlet, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './listbox.component.html',
  styleUrl: './listbox.component.scss',
  exportAs: 'athListbox',
})
export class AthListboxComponent<T = string> {
  protected readonly labels = injectAthLabels();

  readonly options = input<readonly ListboxOption<T>[]>([]);
  readonly multiple = input(false, { transform: booleanAttribute });
  /** The selected value (single-select). Two-way: `[(value)]`. */
  readonly value = model<T | null>(null);
  /** The selected values (multi-select). Two-way: `[(values)]`. */
  readonly values = model<readonly T[]>([]);
  /** Show a search field above the options. */
  readonly searchable = input(false, { transform: booleanAttribute });
  /** The search text. Two-way: `[(query)]`, e.g. for server-side search. */
  readonly query = model('');
  /** Filter `options` by the query here; turn off when the server filters. */
  readonly localFilter = input(true, { transform: booleanAttribute });
  /** Offer a "Create …" row for a query without an exact match. */
  readonly creatable = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly searchPlaceholder = input<string | null>(null);
  /** Text when nothing matches; defaults to `ATH_LABELS.listboxNoMatches`. */
  readonly emptyLabel = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly ariaLabelledby = input<string | null>(null);
  /** Custom option rendering; see `ListboxOptionContext`. */
  readonly optionTemplate = input<TemplateRef<ListboxOptionContext<T>> | null>(null);
  /** Height of the option list before it scrolls, in px. */
  readonly maxHeight = input<number | null>(320);
  /** Equality of values; `Object.is` by default. */
  readonly compareWith = input<((a: T, b: T) => boolean) | null>(null);

  /** The user chose (single) or toggled (multi) an option. */
  readonly picked = output<ListboxOption<T>>();
  /** The user chose the "create" row; carries the trimmed query. */
  readonly create = output<string>();

  readonly listId = `ath-listbox-${++nextListboxId}`;

  protected readonly checkIcon = Check;
  protected readonly plusIcon = Plus;
  protected readonly searchIcon = Search;

  private readonly searchRef = viewChild<ElementRef<HTMLInputElement>>('search');
  private readonly listRef = viewChild.required<ElementRef<HTMLElement>>('list');
  private readonly activeRaw = signal(-1);
  private readonly typeahead = new Typeahead();

  protected readonly searchText = computed(
    () => this.searchPlaceholder() ?? this.labels.listboxSearch()
  );
  protected readonly emptyText = computed(
    () => this.emptyLabel() ?? this.labels.listboxNoMatches()
  );

  private readonly folded = computed(() =>
    this.options().map((o) => foldText(`${o.label} ${o.sublabel ?? ''} ${o.keywords ?? ''}`))
  );

  private readonly filtered = computed<readonly ListboxOption<T>[]>(() => {
    const q = foldText(this.query().trim());
    const options = this.options();
    if (!q || !this.localFilter()) return options;
    const folded = this.folded();
    return options.filter((_, i) => folded[i].includes(q));
  });

  private readonly showCreate = computed(() => {
    const q = this.query().trim();
    if (!this.creatable() || !q) return false;
    const fq = foldText(q);
    return !this.options().some((o) => foldText(o.label) === fq);
  });

  private readonly isSelected = computed<(v: T) => boolean>(() => {
    const eq = this.compareWith();
    const chosen: readonly T[] = this.multiple()
      ? this.values()
      : this.value() === null
        ? []
        : [this.value() as T];
    if (eq) return (v) => chosen.some((c) => eq(c, v));
    const set = new Set<T>(chosen);
    return (v) => set.has(v);
  });

  /** Sections in display order; row indexes run across all of them. */
  protected readonly sections = computed<Section<T>[]>(() => {
    const items = this.filtered();
    const selected = this.isSelected();
    const groups = new Map<string, ListboxOption<T>[]>();
    const loose: ListboxOption<T>[] = [];
    for (const o of items) {
      if (o.group) {
        const list = groups.get(o.group);
        if (list) list.push(o);
        else groups.set(o.group, [o]);
      } else {
        loose.push(o);
      }
    }
    const sections: Section<T>[] = [];
    let index = 0;
    const toRows = (list: ListboxOption<T>[]): Row<T>[] =>
      list.map((option) => {
        const i = index++;
        return {
          kind: 'option',
          option,
          index: i,
          id: `${this.listId}-opt-${i}`,
          selected: selected(option.value),
        };
      });
    for (const [label, list] of groups) {
      sections.push({ key: `g:${label}`, label, labelId: '', rows: toRows(list) });
    }
    if (loose.length) {
      const label = groups.size > 0 ? this.labels.listboxOtherGroup() : null;
      sections.push({ key: 'g:', label, labelId: '', rows: toRows(loose) });
    }
    if (this.showCreate()) {
      const i = index++;
      sections.push({
        key: 'create',
        label: null,
        labelId: '',
        rows: [
          {
            kind: 'create',
            index: i,
            id: `${this.listId}-create`,
            label: formatAthLabel(this.labels.listboxCreate(), { query: this.query().trim() }),
          },
        ],
      });
    }
    sections.forEach((s, k) => (s.labelId = `${this.listId}-group-${k}`));
    return sections;
  });

  protected readonly rows = computed<Row<T>[]>(() => this.sections().flatMap((s) => s.rows));

  /** Index of the highlighted row, -1 for none. */
  readonly activeIndex = computed(() => {
    const i = this.activeRaw();
    return i >= 0 && i < this.rows().length ? i : -1;
  });

  protected readonly activeId = computed(() => this.rows()[this.activeIndex()]?.id ?? null);

  /** Focuses the search field, or the list itself. */
  focus(): void {
    focusSafely(this.searchRef()?.nativeElement ?? this.listRef().nativeElement);
  }

  /** Highlights the first selected option, else the first enabled one. */
  resetActive(): void {
    const rows = this.rows();
    const selected = rows.findIndex((r) => r.kind === 'option' && r.selected);
    this.activeRaw.set(selected >= 0 ? selected : edgeIndex(rows.length, this.usable));
    this.scrollToActive();
  }

  /** Chooses the row at `index` as if the user had clicked it. */
  choose(index: number): void {
    const row = this.rows()[index];
    if (!row) return;
    this.activeRaw.set(index);
    if (row.kind === 'create') {
      this.create.emit(this.query().trim());
      return;
    }
    const { option } = row;
    if (option.disabled) return;
    if (this.multiple()) {
      const eq = this.compareWith() ?? Object.is;
      const current = this.values();
      this.values.set(
        row.selected ? current.filter((v) => !eq(v, option.value)) : [...current, option.value]
      );
    } else {
      this.value.set(option.value);
    }
    this.picked.emit(option);
  }

  protected optionIcon(option: ListboxOption<T>): AthIconData | null {
    return typeof option.icon === 'object' ? option.icon : null;
  }

  protected onQueryInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    // The best match is ready for Enter.
    this.activeRaw.set(edgeIndex(this.rows().length, this.usable));
    this.listRef().nativeElement.scrollTop = 0;
  }

  protected onKeydown(event: KeyboardEvent): void {
    const count = this.rows().length;
    const searchable = this.searchable();
    const active = this.activeIndex();
    let next: number;
    switch (event.key) {
      case 'ArrowDown':
        next =
          active < 0
            ? edgeIndex(count, this.usable)
            : stepIndex(count, active, 1, this.usable, false);
        break;
      case 'ArrowUp':
        next =
          active < 0
            ? edgeIndex(count, this.usable, true)
            : stepIndex(count, active, -1, this.usable, false);
        break;
      case 'PageDown':
        next = this.jump(active, 10);
        break;
      case 'PageUp':
        next = this.jump(active, -10);
        break;
      case 'Home':
      case 'End':
        // In the search field they move the caret.
        if (searchable) return;
        next = edgeIndex(count, this.usable, event.key === 'End');
        break;
      case 'Enter':
        if (active < 0) return;
        event.preventDefault();
        this.choose(active);
        return;
      case ' ':
        if (searchable || active < 0) return;
        event.preventDefault();
        this.choose(active);
        return;
      default:
        if (searchable || !isTypeaheadKey(event)) return;
        next = this.typeahead.next(event.key, this.rowLabels(), Math.max(active, 0));
        if (next < 0) return;
    }
    event.preventDefault();
    if (next >= 0) {
      this.activeRaw.set(next);
      this.scrollToActive();
    }
  }

  protected onListClick(event: MouseEvent): void {
    const index = this.rowIndexAt(event);
    if (index >= 0) this.choose(index);
  }

  protected onListMousedown(event: MouseEvent): void {
    // Keep focus (and the caret) in the search field.
    if (this.searchable() && this.rowIndexAt(event) >= 0) event.preventDefault();
  }

  protected onListHover(event: MouseEvent): void {
    const index = this.rowIndexAt(event);
    if (index >= 0 && index !== this.activeRaw() && this.usable(index)) this.activeRaw.set(index);
  }

  private readonly usable = (i: number): boolean => {
    const row = this.rows()[i];
    return !!row && (row.kind === 'create' || !row.option.disabled);
  };

  private jump(from: number, delta: number): number {
    const count = this.rows().length;
    let i = Math.max(0, Math.min(count - 1, (from < 0 ? 0 : from) + delta));
    const step = delta > 0 ? -1 : 1;
    while (i >= 0 && i < count && !this.usable(i)) i += step;
    return i >= 0 && i < count ? i : from;
  }

  private rowLabels(): string[] {
    return this.rows().map((r) => (r.kind === 'option' ? r.option.label : r.label));
  }

  private rowIndexAt(event: Event): number {
    const target = event.target instanceof Element ? event.target : null;
    const el = target?.closest<HTMLElement>('[data-index]');
    if (!el || !this.listRef().nativeElement.contains(el)) return -1;
    return Number(el.dataset['index']);
  }

  private scrollToActive(): void {
    const id = this.activeId();
    if (!id) return;
    const el = this.listRef().nativeElement.ownerDocument.getElementById(id);
    el?.scrollIntoView({ block: 'nearest' });
  }
}
