import * as i0 from "@angular/core";
/**
 * A lucide icon's data payload.
 *
 * `lucide-angular` does not export its `LucideIconData` type publicly,
 * so this mirrors its shape rather than leaking `any` into the API.
 */
export type EmptyStateIcon = readonly (readonly [string, Record<string, string | number>])[];
/**
 * Athene Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 * <ath-empty-state [icon]="Inbox" message="Nothing here" subMessage="…" />
 */
export declare class AthEmptyStateComponent {
    /** Empty state message */
    message: string;
    /** Optional sub-message */
    subMessage: string;
    /** Optional lucide icon shown above the message. */
    icon: EmptyStateIcon | null;
    /**
     * No frame of its own, for an empty state that already sits inside a
     * panel; the dashed box inside a white panel drew a card in a card.
     */
    bare: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthEmptyStateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthEmptyStateComponent, "ath-empty-state", never, { "message": { "alias": "message"; "required": true; }; "subMessage": { "alias": "subMessage"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "bare": { "alias": "bare"; "required": false; }; }, {}, never, ["*"], true, never>;
}
