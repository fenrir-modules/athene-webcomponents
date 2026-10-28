// Keyboard helpers shared by `ath-menu` and `ath-listbox`.

/** A printable character without Ctrl/Meta/Alt, i.e. typeahead input. */
export function isTypeaheadKey(event: KeyboardEvent): boolean {
  return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
}

/**
 * Typeahead as in the WAI-ARIA menu and listbox patterns: characters typed
 * within `delay` ms form a prefix; repeating one character cycles through
 * the items that start with it.
 */
export class Typeahead {
  private buffer = '';
  private last = 0;

  constructor(private readonly delay = 500) {}

  /**
   * The index of the next label (after `from`, wrapping) that starts with the
   * typed prefix, or -1.
   */
  next(char: string, labels: readonly string[], from: number): number {
    const now = Date.now();
    if (now - this.last > this.delay) this.buffer = '';
    this.last = now;
    const c = char.toLocaleLowerCase();
    // "aaa" cycles through items starting with "a".
    const cycling = this.buffer.length > 0 && [...this.buffer].every((x) => x === c);
    this.buffer += c;
    const prefix = cycling ? c : this.buffer;
    const n = labels.length;
    const start = cycling || this.buffer.length === 1 ? from + 1 : from;
    for (let k = 0; k < n; k++) {
      const i = (((start + k) % n) + n) % n;
      if (labels[i].trim().toLocaleLowerCase().startsWith(prefix)) return i;
    }
    return -1;
  }

  reset(): void {
    this.buffer = '';
  }
}

/**
 * The next index from `from` in direction `step` (±1) that `usable` accepts,
 * wrapping when `wrap` is set; `from` itself when there is none.
 */
export function stepIndex(
  count: number,
  from: number,
  step: 1 | -1,
  usable: (i: number) => boolean,
  wrap: boolean
): number {
  for (let k = 1; k <= count; k++) {
    let i = from + step * k;
    if (wrap) i = ((i % count) + count) % count;
    else if (i < 0 || i >= count) break;
    if (usable(i)) return i;
  }
  return from;
}

/** The first (or last) index `usable` accepts, or -1. */
export function edgeIndex(count: number, usable: (i: number) => boolean, last = false): number {
  for (let k = 0; k < count; k++) {
    const i = last ? count - 1 - k : k;
    if (usable(i)) return i;
  }
  return -1;
}
