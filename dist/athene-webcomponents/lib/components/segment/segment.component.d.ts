import * as i0 from "@angular/core";
export interface SegmentOption<T = string> {
    value: T;
    label: string;
    /** Optional inline count badge (e.g., "12"). */
    count?: number | string;
    /** Optional `disabled` state per option. */
    disabled?: boolean;
}
export type SegmentSize = 'sm' | 'md';
/**
 * iOS-style segmented control. Multiple options, exactly one active.
 *
 * @example
 * <ath-segment
 *   [options]="[{value:'list', label:'List'}, {value:'kanban', label:'Kanban'}]"
 *   [value]="view"
 *   (valueChange)="view = $event" />
 */
export declare class AthSegmentComponent<T = string> {
    readonly options: import("@angular/core").InputSignal<SegmentOption<T>[]>;
    /** The active option's value. Controlled: pair with `(valueChange)` or `[(value)]`. */
    readonly value: import("@angular/core").InputSignal<T>;
    readonly size: import("@angular/core").InputSignal<SegmentSize>;
    /** Optional aria-label for the group (for screen readers). */
    readonly ariaLabel: import("@angular/core").InputSignal<string | null>;
    readonly valueChange: import("@angular/core").OutputEmitterRef<T>;
    trackByValue: (_: number, item: SegmentOption<T>) => unknown;
    select(option: SegmentOption<T>): void;
    isActive(option: SegmentOption<T>): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSegmentComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSegmentComponent<any>, "ath-segment", never, { "options": { "alias": "options"; "required": true; "isSignal": true; }; "value": { "alias": "value"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
