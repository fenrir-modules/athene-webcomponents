import { EventEmitter } from '@angular/core';
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
    options: SegmentOption<T>[];
    value: T;
    size: SegmentSize;
    /** Optional aria-label for the group (for screen readers). */
    ariaLabel: string | null;
    valueChange: EventEmitter<T>;
    readonly role = "tablist";
    get hostAriaLabel(): string | null;
    get hostSize(): SegmentSize;
    trackByValue: (_: number, item: SegmentOption<T>) => unknown;
    select(option: SegmentOption<T>): void;
    isActive(option: SegmentOption<T>): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthSegmentComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthSegmentComponent<any>, "ath-segment", never, { "options": { "alias": "options"; "required": true; }; "value": { "alias": "value"; "required": false; }; "size": { "alias": "size"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}
