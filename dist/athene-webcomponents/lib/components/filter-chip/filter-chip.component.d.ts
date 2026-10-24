import * as i0 from "@angular/core";
/**
 * Filter pill in the style `Label Value ▾`: quiet grey fill, muted label,
 * semibold value, no separator. Optional clearable.
 * Typically used in toolbars to compose query filters.
 *
 * @example
 * <ath-filter-chip label="Status" value="Any" (clicked)="openMenu()" />
 * <ath-filter-chip label="Assignee" value="Mira Voss" [active]="true" [clearable]="true"
 *                  (clicked)="open()" (cleared)="reset()" />
 */
export declare class AthFilterChipComponent {
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly value: import("@angular/core").InputSignal<string>;
    /** Visually highlights the chip when a filter value is set. */
    readonly active: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Shows a small `×` button to clear the filter. */
    readonly clearable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly clicked: import("@angular/core").OutputEmitterRef<void>;
    readonly cleared: import("@angular/core").OutputEmitterRef<void>;
    protected readonly chevronIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly clearIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected clearLabel(): string;
    onClick(): void;
    onClear(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthFilterChipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthFilterChipComponent, "ath-filter-chip", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "value": { "alias": "value"; "required": false; "isSignal": true; }; "active": { "alias": "active"; "required": false; "isSignal": true; }; "clearable": { "alias": "clearable"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "clicked": "clicked"; "cleared": "cleared"; }, never, never, true, never>;
}
