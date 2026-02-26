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
 */
export class AthKbdComponent {
    constructor() {
        /** Size variant */
        this.size = 'md';
    }
    get kbdClasses() {
        return `ath-kbd ath-kbd--${this.size}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthKbdComponent, isStandalone: true, selector: "ath-kbd", inputs: { size: "size" }, ngImport: i0, template: "<kbd [class]=\"kbdClasses\">\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;min-width:1.5em;padding:var(--ath-space-1);font-family:var(--ath-font-family);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);box-shadow:0 1px 0 var(--ath-border-color);white-space:nowrap}.ath-kbd--sm{font-size:var(--ath-font-size-xs);padding:1px var(--ath-space-1)}.ath-kbd--md{font-size:var(--ath-font-size-sm);padding:2px var(--ath-space-1)}.ath-kbd--lg{font-size:var(--ath-font-size-md);padding:var(--ath-space-1) var(--ath-space-2)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-kbd', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<kbd [class]=\"kbdClasses\">\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;min-width:1.5em;padding:var(--ath-space-1);font-family:var(--ath-font-family);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);box-shadow:0 1px 0 var(--ath-border-color);white-space:nowrap}.ath-kbd--sm{font-size:var(--ath-font-size-xs);padding:1px var(--ath-space-1)}.ath-kbd--md{font-size:var(--ath-font-size-sm);padding:2px var(--ath-space-1)}.ath-kbd--lg{font-size:var(--ath-font-size-md);padding:var(--ath-space-1) var(--ath-space-2)}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9rYmQva2JkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9rYmQva2JkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFL0M7Ozs7Ozs7OztHQVNHO0FBU0gsTUFBTSxPQUFPLGVBQWU7SUFSNUI7UUFTRSxtQkFBbUI7UUFDVixTQUFJLEdBQXVCLElBQUksQ0FBQztLQUsxQztJQUhDLElBQUksVUFBVTtRQUNaLE9BQU8sb0JBQW9CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxDQUFDOytHQU5VLGVBQWU7bUdBQWYsZUFBZSw2RkNyQjVCLDBEQUdBLDRzQkRhWSxZQUFZOzs0RkFLWCxlQUFlO2tCQVIzQixTQUFTOytCQUNFLFNBQVMsY0FDUCxJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFNdEMsSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogQXRoZW5lIEtiZCAoS2V5Ym9hcmQpIENvbXBvbmVudFxuICpcbiAqIERpc3BsYXlzIGtleWJvYXJkIHNob3J0Y3V0cyBpbiBhIHN0eWxlZCBiYWRnZVxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWtiZD5DdHJsPC9hdGgta2JkPlxuICogPGF0aC1rYmQ+4oyYPC9hdGgta2JkPlxuICogPGF0aC1rYmQgc2l6ZT1cInNtXCI+SzwvYXRoLWtiZD5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWtiZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2tiZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9rYmQuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhLYmRDb21wb25lbnQge1xuICAvKiogU2l6ZSB2YXJpYW50ICovXG4gIEBJbnB1dCgpIHNpemU6ICdzbScgfCAnbWQnIHwgJ2xnJyA9ICdtZCc7XG5cbiAgZ2V0IGtiZENsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYGF0aC1rYmQgYXRoLWtiZC0tJHt0aGlzLnNpemV9YDtcbiAgfVxufVxuIiwiPGtiZCBbY2xhc3NdPVwia2JkQ2xhc3Nlc1wiPlxuICA8bmctY29udGVudCAvPlxuPC9rYmQ+XG4iXX0=