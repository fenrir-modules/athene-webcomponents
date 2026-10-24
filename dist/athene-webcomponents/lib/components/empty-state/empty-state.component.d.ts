import * as i0 from "@angular/core";
/**
 * Lucide's icon data, mirrored exactly: `lucide-angular` does not export
 * `LucideIconData` from its public entry, so consumers pass `Inbox`,
 * `CheckCircle2`, … straight in without a cast.
 */
type LucideIconNode = readonly [string, {
    [key: string]: string | number;
}];
export type LucideIconDataLike = readonly LucideIconNode[];
/** A lucide icon (`import { Inbox } from 'lucide-angular'`) — no cast needed. */
export type EmptyStateIcon = LucideIconDataLike | readonly (readonly [string, Record<string, string | number>])[];
/** One "what will appear here" row in a compact empty state. */
export interface EmptyStateHint {
    icon?: EmptyStateIcon | null;
    label: string;
    /** Muted one-line explanation under the label. */
    sub?: string;
}
/** `default`: centred block (existing look). `compact`: content-sized, icon tile left. */
export type EmptyStateSize = 'default' | 'compact';
/**
 * Athene Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 * <ath-empty-state [icon]="Inbox" message="Nothing here" subMessage="…" />
 *
 * Compact: content-sized, for a panel that should end with its content.
 * <ath-empty-state
 *   size="compact" bare
 *   [icon]="ic.inbox"
 *   message="You're all caught up"
 *   subMessage="Mentions, assignments and replies land here."
 *   actionLabel="Notification settings" (action)="openPrefs()"
 *   [hints]="[{ icon: ic.at, label: 'Mentions', sub: 'When someone @mentions you' }]"
 * />
 */
export declare class AthEmptyStateComponent {
    /** Empty state message */
    readonly message: import("@angular/core").InputSignal<string>;
    /** Optional sub-message */
    readonly subMessage: import("@angular/core").InputSignal<string>;
    /** Optional lucide icon shown above the message. */
    readonly icon: import("@angular/core").InputSignal<EmptyStateIcon | null>;
    /**
     * No frame of its own, for an empty state that already sits inside a
     * panel; the dashed box inside a white panel drew a card in a card.
     */
    readonly bare: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** `compact`: icon tile left, auto height, optional hint rows. */
    readonly size: import("@angular/core").InputSignal<EmptyStateSize>;
    /** 2–4 rows describing what will appear here (compact layout). */
    readonly hints: import("@angular/core").InputSignal<readonly EmptyStateHint[]>;
    /** Primary action label; emits `action` when clicked. */
    readonly actionLabel: import("@angular/core").InputSignal<string>;
    readonly actionIcon: import("@angular/core").InputSignal<EmptyStateIcon | null>;
    /** Secondary (outline) action label; emits `secondaryAction`. */
    readonly secondaryActionLabel: import("@angular/core").InputSignal<string>;
    readonly action: import("@angular/core").OutputEmitterRef<void>;
    readonly secondaryAction: import("@angular/core").OutputEmitterRef<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthEmptyStateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthEmptyStateComponent, "ath-empty-state", never, { "message": { "alias": "message"; "required": true; "isSignal": true; }; "subMessage": { "alias": "subMessage"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "bare": { "alias": "bare"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "hints": { "alias": "hints"; "required": false; "isSignal": true; }; "actionLabel": { "alias": "actionLabel"; "required": false; "isSignal": true; }; "actionIcon": { "alias": "actionIcon"; "required": false; "isSignal": true; }; "secondaryActionLabel": { "alias": "secondaryActionLabel"; "required": false; "isSignal": true; }; }, { "action": "action"; "secondaryAction": "secondaryAction"; }, never, ["*", "*"], true, never>;
}
export {};
