/** A printable character without Ctrl/Meta/Alt, i.e. typeahead input. */
export declare function isTypeaheadKey(event: KeyboardEvent): boolean;
/**
 * Typeahead as in the WAI-ARIA menu and listbox patterns: characters typed
 * within `delay` ms form a prefix; repeating one character cycles through
 * the items that start with it.
 */
export declare class Typeahead {
    private readonly delay;
    private buffer;
    private last;
    constructor(delay?: number);
    /**
     * The index of the next label (after `from`, wrapping) that starts with the
     * typed prefix, or -1.
     */
    next(char: string, labels: readonly string[], from: number): number;
    reset(): void;
}
/**
 * The next index from `from` in direction `step` (±1) that `usable` accepts,
 * wrapping when `wrap` is set; `from` itself when there is none.
 */
export declare function stepIndex(count: number, from: number, step: 1 | -1, usable: (i: number) => boolean, wrap: boolean): number;
/** The first (or last) index `usable` accepts, or -1. */
export declare function edgeIndex(count: number, usable: (i: number) => boolean, last?: boolean): number;
