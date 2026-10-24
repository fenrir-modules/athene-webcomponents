import type { AthDateContext } from '@athene/webcomponents/core';
/**
 * Due dates as the product shows them: pure functions, no Angular, so the
 * thresholds are tested with plain values (`due-date.spec.ts`).
 *
 * A due date names a calendar day. "Today" is today in the reader's time
 * zone; a bare `YYYY-MM-DD` (or a timestamp at UTC midnight/noon, which is
 * what the date pickers write) is that day everywhere.
 */
/** How urgent a due date reads. One rule, one place (DS-08). */
export type DueTone = 'overdue' | 'today' | 'soon' | 'later' | 'done';
/** Where a due date comes from: the ticket's own, or its sprint's end. */
export type DueSource = 'own' | 'sprint';
export { ATH_DATE_CONTEXT, type AthDateContext, type DueDateFormat, } from '@athene/webcomponents/core';
/** Label templates the compact text is built from (`{count}` placeholder). */
export interface DueTextLabels {
    overdue: string;
    today: string;
    tomorrow: string;
    inDays: string;
}
/**
 * `date` as wall-clock time in `timeZone`: a Date whose local fields read
 * what a clock in that zone shows. Only for day comparisons.
 */
export declare function zonedWallClock(date: Date, timeZone?: string): Date;
/**
 * The calendar day a due value names, as local midday; `null` when the
 * value is not a date.
 */
export declare function calendarDayOf(value: string, timeZone?: string): Date | null;
/** Whole calendar days from `now` (in `timeZone`) to `day`; negative = past. */
export declare function calendarDaysUntil(day: Date, now: Date, timeZone?: string): number;
/**
 * The one colour rule: before today overdue, today today (both red), the
 * next two days soon (amber), later muted. Finished work is never urgent.
 */
export declare function dueToneOf(days: number | null, done?: boolean): DueTone;
/** A calendar day in the chosen short format ("30 Oct", "30.10.", "10/30", "2026-10-30"). */
export declare function shortDay(day: Date, ctx?: AthDateContext): string;
/**
 * The compact due text: "2d overdue", "Today", "Tomorrow", "3d" up to six
 * days ahead, then the short date.
 */
export declare function compactDueText(days: number, day: Date, labels: DueTextLabels, ctx?: AthDateContext): string;
export interface DueInput {
    /** ISO date or timestamp; empty = no due date. */
    date: string | null | undefined;
    /** Finished work: muted, and the plain date instead of "overdue". */
    done?: boolean;
    /** A sprint-derived date names its day ("Sprint end · 31 Oct"). */
    source?: DueSource;
    now?: Date;
}
export interface DueView {
    tone: DueTone;
    /** The date part of the label (without the "Sprint end ·" prefix). */
    text: string;
    /** Calendar days from today; negative = past. */
    days: number;
    /** The short date, e.g. for a tooltip. */
    day: string;
}
/** Everything `ath-due-label` draws, from a date; `null` without one. */
export declare function describeDue(input: DueInput, labels: DueTextLabels, ctx?: AthDateContext): DueView | null;
