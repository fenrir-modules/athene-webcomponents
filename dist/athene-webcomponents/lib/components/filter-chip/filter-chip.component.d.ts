import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Filter chip in the style `Label : Value ▾`. Optional clearable.
 * Typically used in toolbars to compose query filters.
 *
 * @example
 * <ath-filter-chip label="Status" value="Any" (clicked)="openMenu()" />
 * <ath-filter-chip label="Assignee" value="Mira Voss" [active]="true" [clearable]="true"
 *                  (clicked)="open()" (cleared)="reset()" />
 */
export declare class AthFilterChipComponent {
    label: string;
    value: string;
    /** Visually highlights the chip when a filter value is set. */
    active: boolean;
    /** Shows a small `×` button to clear the filter. */
    clearable: boolean;
    disabled: boolean;
    clicked: EventEmitter<void>;
    cleared: EventEmitter<void>;
    protected readonly chevronIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly clearIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    get hostActive(): string | null;
    get hostDisabled(): string | null;
    onClick(): void;
    onClear(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthFilterChipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthFilterChipComponent, "ath-filter-chip", never, { "label": { "alias": "label"; "required": true; }; "value": { "alias": "value"; "required": false; }; "active": { "alias": "active"; "required": false; }; "clearable": { "alias": "clearable"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "clicked": "clicked"; "cleared": "cleared"; }, never, never, true, never>;
}
