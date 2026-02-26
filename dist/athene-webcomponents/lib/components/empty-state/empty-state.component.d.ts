import * as i0 from "@angular/core";
/**
 * Athene Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 */
export declare class AthEmptyStateComponent {
    /** Empty state message */
    message: string;
    /** Optional sub-message */
    subMessage: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthEmptyStateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthEmptyStateComponent, "ath-empty-state", never, { "message": { "alias": "message"; "required": true; }; "subMessage": { "alias": "subMessage"; "required": false; }; }, {}, never, ["*"], true, never>;
}
