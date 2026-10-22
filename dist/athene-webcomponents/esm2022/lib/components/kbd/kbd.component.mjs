import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Athene Kbd (Keyboard) Component
 *
 * Displays keyboard shortcuts in a styled badge
 *
 * @example
 * <ath-kbd>Ctrl</ath-kbd>
 * <ath-kbd>⌘</ath-kbd>
 * <ath-kbd size="sm">K</ath-kbd>
 * <ath-kbd label="⌘K" size="sm" />
 */
export class AthKbdComponent {
    constructor() {
        /** Size variant */
        this.size = 'md';
        /**
         * Keys as text, for a self-closing tag. Callers wrote `label="⌘K"`
         * before this input existed, which rendered an empty chip.
         */
        this.label = '';
    }
    get kbdClasses() {
        return `ath-kbd ath-kbd--${this.size}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthKbdComponent, isStandalone: true, selector: "ath-kbd", inputs: { size: "size", label: "label" }, ngImport: i0, template: "<kbd [class]=\"kbdClasses\">\n  @if (label) {\n    {{ label }}\n  }\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;gap:1px;min-width:1.5em;font-family:var(--font-mono);font-weight:var(--weight-medium);line-height:1;color:var(--fg-2);background-color:var(--surface);border:1px solid var(--border);border-radius:var(--r-xs);box-shadow:0 1px 0 var(--border);white-space:nowrap}.ath-kbd--sm{font-size:10.5px;height:18px;padding:0 5px}.ath-kbd--md{font-size:var(--text-xs);height:20px;padding:0 6px}.ath-kbd--lg{font-size:var(--text-sm);height:24px;padding:0 var(--space-2)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-kbd', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<kbd [class]=\"kbdClasses\">\n  @if (label) {\n    {{ label }}\n  }\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;gap:1px;min-width:1.5em;font-family:var(--font-mono);font-weight:var(--weight-medium);line-height:1;color:var(--fg-2);background-color:var(--surface);border:1px solid var(--border);border-radius:var(--r-xs);box-shadow:0 1px 0 var(--border);white-space:nowrap}.ath-kbd--sm{font-size:10.5px;height:18px;padding:0 5px}.ath-kbd--md{font-size:var(--text-xs);height:20px;padding:0 6px}.ath-kbd--lg{font-size:var(--text-sm);height:24px;padding:0 var(--space-2)}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], label: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9rYmQva2JkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9rYmQva2JkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFL0M7Ozs7Ozs7Ozs7R0FVRztBQVNILE1BQU0sT0FBTyxlQUFlO0lBUjVCO1FBU0UsbUJBQW1CO1FBQ1YsU0FBSSxHQUF1QixJQUFJLENBQUM7UUFFekM7OztXQUdHO1FBQ00sVUFBSyxHQUFHLEVBQUUsQ0FBQztLQUtyQjtJQUhDLElBQUksVUFBVTtRQUNaLE9BQU8sb0JBQW9CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxDQUFDOytHQVpVLGVBQWU7bUdBQWYsZUFBZSw2R0N0QjVCLGlHQU1BLHdrQkRXWSxZQUFZOzs0RkFLWCxlQUFlO2tCQVIzQixTQUFTOytCQUNFLFNBQVMsY0FDUCxJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFNdEMsSUFBSTtzQkFBWixLQUFLO2dCQU1HLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEF0aGVuZSBLYmQgKEtleWJvYXJkKSBDb21wb25lbnRcbiAqXG4gKiBEaXNwbGF5cyBrZXlib2FyZCBzaG9ydGN1dHMgaW4gYSBzdHlsZWQgYmFkZ2VcbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1rYmQ+Q3RybDwvYXRoLWtiZD5cbiAqIDxhdGgta2JkPuKMmDwvYXRoLWtiZD5cbiAqIDxhdGgta2JkIHNpemU9XCJzbVwiPks8L2F0aC1rYmQ+XG4gKiA8YXRoLWtiZCBsYWJlbD1cIuKMmEtcIiBzaXplPVwic21cIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgta2JkJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4va2JkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2tiZC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aEtiZENvbXBvbmVudCB7XG4gIC8qKiBTaXplIHZhcmlhbnQgKi9cbiAgQElucHV0KCkgc2l6ZTogJ3NtJyB8ICdtZCcgfCAnbGcnID0gJ21kJztcblxuICAvKipcbiAgICogS2V5cyBhcyB0ZXh0LCBmb3IgYSBzZWxmLWNsb3NpbmcgdGFnLiBDYWxsZXJzIHdyb3RlIGBsYWJlbD1cIuKMmEtcImBcbiAgICogYmVmb3JlIHRoaXMgaW5wdXQgZXhpc3RlZCwgd2hpY2ggcmVuZGVyZWQgYW4gZW1wdHkgY2hpcC5cbiAgICovXG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XG5cbiAgZ2V0IGtiZENsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGF0aC1rYmQgYXRoLWtiZC0tJHt0aGlzLnNpemV9YDtcbiAgfVxufVxuIiwiPGtiZCBbY2xhc3NdPVwia2JkQ2xhc3Nlc1wiPlxuICBAaWYgKGxhYmVsKSB7XG4gICAge3sgbGFiZWwgfX1cbiAgfVxuICA8bmctY29udGVudCAvPlxuPC9rYmQ+XG4iXX0=