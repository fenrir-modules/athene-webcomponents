import { type Params } from '@angular/router';
import * as i0 from "@angular/core";
export type KpiDeltaDirection = 'up' | 'down' | 'neutral';
/** Tint of the trend line. */
export type KpiTone = 'neutral' | 'amber' | 'blue' | 'green' | 'red';
/** Colour of the figure itself, from the contrast-safe `--*-text` tokens. */
export type KpiValueTone = 'amber' | 'blue' | 'green' | 'red' | 'purple';
/** A trend worth drawing: two samples or more, and not all zero. */
export declare function hasKpiTrend(spark: readonly number[] | null | undefined): boolean;
/**
 * One cell of a KPI strip (`ath-kpi-strip`): label, figure, an optional
 * delta badge, and a trend or a quiet note bottom-right. The tile carries
 * no chrome of its own; the strip draws one card and hairlines between the
 * tiles, so the row reads as one instrument panel.
 *
 * With `link` the whole cell is the hit area (a stretched link on the
 * label), still drawn as part of the strip.
 *
 * Replaces the app's `metric-card` and the lib's former `ath-stat-card`.
 *
 * @example
 * <ath-kpi-strip>
 *   <ath-kpi-tile label="Due today" [value]="1" [alert]="true" delta="+1" deltaDirection="down"
 *                 deltaTitle="1 overdue" />
 *   <ath-kpi-tile label="This week" [value]="3" tone="blue" [spark]="[1,2,2,3,2,4,3]" />
 *   <ath-kpi-tile label="Story points" [value]="24" note="3 done" />
 *   <ath-kpi-tile label="In review" [value]="2" link="/app/tickets" [linkParams]="{ status: 'review' }"
 *                 linkLabel="Show in-review tickets" />
 *   <ath-kpi-tile label="In progress" [value]="4" valueTone="amber" dot="var(--amber)" />
 *   <ath-kpi-tile label="Progress" value="62%"><my-progress-bar /></ath-kpi-tile>
 * </ath-kpi-strip>
 *
 * Projected content sits under the figure (a progress bar, a short line).
 */
export declare class AthKpiTileComponent {
    readonly label: import("@angular/core").InputSignal<string>;
    readonly value: import("@angular/core").InputSignal<string | number | null | undefined>;
    /** Pre-formatted delta ("+1", "−2"); `null` hides the badge. */
    readonly delta: import("@angular/core").InputSignal<string | null | undefined>;
    readonly deltaDirection: import("@angular/core").InputSignal<KpiDeltaDirection | null | undefined>;
    /** Long form of a compact delta ("+1" → "1 overdue"): tooltip and accessible name. */
    readonly deltaTitle: import("@angular/core").InputSignal<string | null | undefined>;
    /** Tints the trend line. */
    readonly tone: import("@angular/core").InputSignal<KpiTone>;
    /** Trend samples; fewer than two, or all zero, draw nothing. */
    readonly spark: import("@angular/core").InputSignal<readonly number[] | null | undefined>;
    /** Overrides the tone's trend colour. */
    readonly sparkColor: import("@angular/core").InputSignal<string | null>;
    /** A small quiet note bottom-right ("3 done"), drawn instead of a trend. */
    readonly note: import("@angular/core").InputSignal<string | null | undefined>;
    readonly noteTitle: import("@angular/core").InputSignal<string | null | undefined>;
    /** The figure in red: something needs attention now. */
    readonly alert: import("@angular/core").InputSignal<boolean>;
    /**
     * The figure in a status colour (`--amber-text`, `--blue-text` …), e.g. a
     * count of tickets in a status. `alert` and `muted` win over it.
     */
    readonly valueTone: import("@angular/core").InputSignal<KpiValueTone | null | undefined>;
    /** A small dot in this CSS colour before the label (a status key). */
    readonly dot: import("@angular/core").InputSignal<string | null | undefined>;
    /** Nothing to count: a quiet figure (pass "–" for a zero), no trend. */
    readonly muted: import("@angular/core").InputSignal<boolean>;
    /** Where the tile leads (router link). */
    readonly link: import("@angular/core").InputSignal<string | readonly unknown[] | null>;
    readonly linkParams: import("@angular/core").InputSignal<Params | null>;
    /** Accessible name of the link; defaults to the label. */
    readonly linkLabel: import("@angular/core").InputSignal<string | null>;
    protected readonly samples: import("@angular/core").Signal<readonly number[] | null>;
    protected readonly showTrend: import("@angular/core").Signal<boolean>;
    protected readonly trendColor: import("@angular/core").Signal<string>;
    protected readonly routerLink: import("@angular/core").Signal<string | unknown[]>;
    /** `alert` and `muted` say more than a status colour, so they win. */
    protected readonly figureTone: import("@angular/core").Signal<KpiValueTone | null>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthKpiTileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthKpiTileComponent, "ath-kpi-tile", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "delta": { "alias": "delta"; "required": false; "isSignal": true; }; "deltaDirection": { "alias": "deltaDirection"; "required": false; "isSignal": true; }; "deltaTitle": { "alias": "deltaTitle"; "required": false; "isSignal": true; }; "tone": { "alias": "tone"; "required": false; "isSignal": true; }; "spark": { "alias": "spark"; "required": false; "isSignal": true; }; "sparkColor": { "alias": "sparkColor"; "required": false; "isSignal": true; }; "note": { "alias": "note"; "required": false; "isSignal": true; }; "noteTitle": { "alias": "noteTitle"; "required": false; "isSignal": true; }; "alert": { "alias": "alert"; "required": false; "isSignal": true; }; "valueTone": { "alias": "valueTone"; "required": false; "isSignal": true; }; "dot": { "alias": "dot"; "required": false; "isSignal": true; }; "muted": { "alias": "muted"; "required": false; "isSignal": true; }; "link": { "alias": "link"; "required": false; "isSignal": true; }; "linkParams": { "alias": "linkParams"; "required": false; "isSignal": true; }; "linkLabel": { "alias": "linkLabel"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
/**
 * The card around a row of `ath-kpi-tile`s: one border, radius and shadow,
 * hairlines between the tiles, `columns` equal columns (default: one per
 * tile up to 4); two columns when the strip is narrower than 920px.
 *
 * @example
 * <ath-kpi-strip [columns]="4"> <ath-kpi-tile … /> … </ath-kpi-strip>
 */
export declare class AthKpiStripComponent {
    /** Number of columns on wide screens. */
    readonly columns: import("@angular/core").InputSignal<number>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthKpiStripComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthKpiStripComponent, "ath-kpi-strip", never, { "columns": { "alias": "columns"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
