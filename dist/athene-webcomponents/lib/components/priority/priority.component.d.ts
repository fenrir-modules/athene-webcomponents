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
    priority: TicketPriority;
    showLabel: boolean;
    /** Optional override label. */
    label: string | null;
    get hostPriority(): TicketPriority;
    protected get computedLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthPriorityComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthPriorityComponent, "ath-priority", never, { "priority": { "alias": "priority"; "required": false; }; "showLabel": { "alias": "showLabel"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, never, true, never>;
}
