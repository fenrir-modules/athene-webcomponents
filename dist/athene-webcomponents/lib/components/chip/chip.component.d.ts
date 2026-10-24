import { Zap } from 'lucide-angular';
import * as i0 from "@angular/core";
/** A lucide icon (`lucide-angular` does not export its data type from its entry). */
export type AthChipIcon = typeof Zap;
/** Semantic tone of a `tag` or `status` chip. */
export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
/**
 * What a chip shows. Every kind is one height (`--chip-h`, 20px), so chips
 * of different kinds line up in a row.
 *
 * - `tag`: text on a tinted pill in a semantic `variant`
 * - `label`: a dot in the label's own `color`, then its name
 * - `epic`: a quiet outline, the bolt (or `icon`) in the epic `color`
 * - `type`: a small square in the type `color` with its `icon` glyph; text optional
 * - `status`: a dot (or `icon`) in the `variant` tone, then the status name
 * - `count`: "+N" for items that did not fit; `tooltip` names them
 */
export type ChipKind = 'tag' | 'label' | 'epic' | 'type' | 'status' | 'count';
/**
 * Athene Chip
 *
 * The library takes colour and words; resolving a label's, epic's or
 * type's colour and name stays in the app.
 *
 * @example
 * <ath-chip>authentication</ath-chip>
 * <ath-chip kind="label" [color]="label.color">{{ label.name }}</ath-chip>
 * <ath-chip kind="epic" [color]="'var(--purple)'" [tooltip]="epic.title">{{ epic.title }}</ath-chip>
 * <ath-chip kind="type" [icon]="bugIcon" color="var(--red)" [tooltip]="'Bug'" />
 * <ath-chip kind="status" variant="warning">In progress</ath-chip>
 * <ath-chip kind="count" [count]="3" tooltip="design, backend, api" />
 * <ath-chip kind="label" [color]="c" [removable]="true" (removed)="drop(l)">{{ l.name }}</ath-chip>
 */
export declare class AthChipComponent {
    private readonly labels;
    readonly kind: import("@angular/core").InputSignal<ChipKind>;
    /** Tone of a `tag` or `status` chip. */
    readonly variant: import("@angular/core").InputSignal<ChipVariant>;
    /** Any CSS colour: the label dot, the epic glyph, the type square, the status dot. */
    readonly color: import("@angular/core").InputSignal<string | null | undefined>;
    /** Glyph for `epic` (default bolt), `type` (required) and `status` (instead of the dot). */
    readonly icon: import("@angular/core").InputSignal<import("node_modules/lucide-angular/icons/types").LucideIconData | null>;
    /** N of a `count` chip. */
    readonly count: import("@angular/core").InputSignal<number | null>;
    /** Hover text, also the accessible description (names behind "+N", an epic's full title). */
    readonly tooltip: import("@angular/core").InputSignal<string | null | undefined>;
    /** `type` in dense lists: the glyph alone, in grey. */
    readonly muted: import("@angular/core").InputSignal<boolean>;
    readonly removable: import("@angular/core").InputSignal<boolean>;
    /** Accessible name of the remove button; default "Remove {name}". */
    readonly removeLabel: import("@angular/core").InputSignal<string | null>;
    /** The chip's text, for the default remove label (projected text is not readable here). */
    readonly name: import("@angular/core").InputSignal<string | null>;
    readonly removed: import("@angular/core").OutputEmitterRef<void>;
    protected readonly removeIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly glyph: import("@angular/core").Signal<import("node_modules/lucide-angular/icons/types").LucideIconData | null>;
    protected readonly countText: import("@angular/core").Signal<string>;
    /** "+3" is read as "3 more: a, b, c". */
    protected readonly countLabel: import("@angular/core").Signal<string>;
    protected readonly resolvedRemoveLabel: import("@angular/core").Signal<string>;
    remove(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthChipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthChipComponent, "ath-chip", never, { "kind": { "alias": "kind"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "count": { "alias": "count"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; "muted": { "alias": "muted"; "required": false; "isSignal": true; }; "removable": { "alias": "removable"; "required": false; "isSignal": true; }; "removeLabel": { "alias": "removeLabel"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; }, { "removed": "removed"; }, never, ["*"], true, never>;
}
