import { type TicketPriority } from '@athene/webcomponents/core';
import * as i0 from "@angular/core";
export { ATH_PRIORITY_LABELS, type PriorityLabelResolver, type TicketPriority, } from '@athene/webcomponents/core';
/**
 * Priority indicator with rising bars (low → critical).
 *
 * @example
 * <ath-priority priority="high" />
 * <ath-priority priority="crit" [showLabel]="false" />
 */
export declare class AthPriorityComponent {
    private readonly resolveLabel;
    readonly priority: import("@angular/core").InputSignal<TicketPriority>;
    readonly showLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Optional override label. */
    readonly label: import("@angular/core").InputSignal<string | null>;
    /** The resolver reads a signal for the language (see `PriorityLabelResolver`), so this follows it. */
    protected readonly computedLabel: import("@angular/core").Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPriorityComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPriorityComponent, "ath-priority", never, { "priority": { "alias": "priority"; "required": false; "isSignal": true; }; "showLabel": { "alias": "showLabel"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
