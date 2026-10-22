import { InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export type TicketPriority = 'low' | 'medium' | 'high' | 'crit';
/** Returns the label for a priority in the app's language, or null for the default. */
export type PriorityLabelResolver = (priority: TicketPriority) => string | null;
/**
 * Optional resolver for priority labels. The app provides it once at the
 * root (with its translations); without it the labels are English.
 */
export declare const ATH_PRIORITY_LABELS: InjectionToken<PriorityLabelResolver>;
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
