import { type DueSource } from './due-date';
import * as i0 from "@angular/core";
/**
 * The one way a due date is shown: text, never a pill.
 *
 * One colour rule (tokens `--due-*`): overdue and today red, the next two
 * days amber, later muted; finished work is always muted and shows its
 * plain date. Words: "2 days overdue" ("1 day overdue"), "today",
 * "tomorrow", "in 3 days" up to six days ahead, then the short date. The
 * full date (and time, for a moment) is the tooltip and is read out to
 * screen readers. A sprint-derived date reads "Sprint end · 31 Oct" with a
 * sprint icon; `afterSprintEnd` adds an amber warning.
 *
 * The app provides `ATH_DATE_CONTEXT` (locale, time zone, date format) and
 * the words through `ATH_LABELS`; resolving a ticket's effective date stays
 * in the app.
 *
 * @example
 * <ath-due-label [date]="t.due_date" [done]="closed" />
 * <ath-due-label [date]="sprint.end_date" source="sprint" [sprintName]="sprint.name" />
 * <ath-due-label [date]="t.due_date" [afterSprintEnd]="true" sprintName="Sprint 24" />
 * <ath-due-label [date]="null" placeholder="—" />
 */
export declare class AthDueLabelComponent {
    private readonly labels;
    private readonly localeId;
    private readonly dateContext;
    /** ISO date or timestamp; empty shows `placeholder` (or nothing). */
    readonly date: import("@angular/core").InputSignal<string | null | undefined>;
    /** Finished work: muted, never "overdue". */
    readonly done: import("@angular/core").InputSignal<boolean>;
    readonly source: import("@angular/core").InputSignal<DueSource>;
    readonly sprintName: import("@angular/core").InputSignal<string | null | undefined>;
    /** The own date lies after the sprint's end: amber warning icon. */
    readonly afterSprintEnd: import("@angular/core").InputSignal<boolean>;
    /** Text without a date (e.g. "—"); default nothing. */
    readonly placeholder: import("@angular/core").InputSignal<string | null>;
    /** Narrow columns: the sprint icon only, "Sprint end" moves to the tooltip. */
    readonly compact: import("@angular/core").InputSignal<boolean>;
    /** Reference time, for stories and tests. */
    readonly now: import("@angular/core").InputSignal<Date | null>;
    protected readonly ic: {
        readonly sprint: import("node_modules/lucide-angular/icons/types").LucideIconData;
        readonly warn: import("node_modules/lucide-angular/icons/types").LucideIconData;
    };
    private readonly ctx;
    protected readonly view: import("@angular/core").Signal<import("./due-date").DueView | null>;
    protected readonly isSprint: import("@angular/core").Signal<boolean>;
    protected readonly sprintEndText: import("@angular/core").Signal<string>;
    /** "Due Friday 30 October 2026" — the tooltip and the screen-reader text. */
    protected readonly dueOnText: import("@angular/core").Signal<string | null>;
    /** The full date; a sprint-derived one also names its sprint. */
    protected readonly title: import("@angular/core").Signal<string | null>;
    protected readonly showWarn: import("@angular/core").Signal<boolean>;
    protected readonly warnText: import("@angular/core").Signal<string>;
    protected readonly warnTitle: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthDueLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthDueLabelComponent, "ath-due-label", never, { "date": { "alias": "date"; "required": false; "isSignal": true; }; "done": { "alias": "done"; "required": false; "isSignal": true; }; "source": { "alias": "source"; "required": false; "isSignal": true; }; "sprintName": { "alias": "sprintName"; "required": false; "isSignal": true; }; "afterSprintEnd": { "alias": "afterSprintEnd"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "compact": { "alias": "compact"; "required": false; "isSignal": true; }; "now": { "alias": "now"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
