import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
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
        this.size = input('md');
        /**
         * Keys as text, for a self-closing tag. Callers wrote `label="⌘K"`
         * before this input existed, which rendered an empty chip.
         */
        this.label = input('');
        this.kbdClasses = computed(() => `ath-kbd ath-kbd--${this.size()}`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthKbdComponent, isStandalone: true, selector: "ath-kbd", inputs: { size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<kbd [class]=\"kbdClasses()\">\n  @if (label()) {\n    {{ label() }}\n  }\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;gap:1px;min-width:1.5em;font-family:var(--font-mono);font-weight:var(--weight-medium);line-height:1;color:var(--fg-2);background-color:var(--surface);border:1px solid var(--border);border-radius:var(--r-xs);box-shadow:0 1px 0 var(--border);white-space:nowrap}.ath-kbd--sm{font-size:10.5px;height:18px;padding:0 5px}.ath-kbd--md{font-size:var(--text-xs);height:20px;padding:0 6px}.ath-kbd--lg{font-size:var(--text-sm);height:24px;padding:0 var(--space-2)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-kbd', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<kbd [class]=\"kbdClasses()\">\n  @if (label()) {\n    {{ label() }}\n  }\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;gap:1px;min-width:1.5em;font-family:var(--font-mono);font-weight:var(--weight-medium);line-height:1;color:var(--fg-2);background-color:var(--surface);border:1px solid var(--border);border-radius:var(--r-xs);box-shadow:0 1px 0 var(--border);white-space:nowrap}.ath-kbd--sm{font-size:10.5px;height:18px;padding:0 5px}.ath-kbd--md{font-size:var(--text-xs);height:20px;padding:0 6px}.ath-kbd--lg{font-size:var(--text-sm);height:24px;padding:0 var(--space-2)}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2JkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9rYmQva2JkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9rYmQva2JkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBSS9DOzs7Ozs7Ozs7O0dBVUc7QUFTSCxNQUFNLE9BQU8sZUFBZTtJQVI1QjtRQVNFLG1CQUFtQjtRQUNWLFNBQUksR0FBRyxLQUFLLENBQVUsSUFBSSxDQUFDLENBQUM7UUFFckM7OztXQUdHO1FBQ00sVUFBSyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVSLGVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbkY7K0dBWFksZUFBZTttR0FBZixlQUFlLDRUQ3hCNUIsdUdBTUEsd2tCRGFZLFlBQVk7OzRGQUtYLGVBQWU7a0JBUjNCLFNBQVM7K0JBQ0UsU0FBUyxjQUNQLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgY29tcHV0ZWQsIGlucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgdHlwZSBLYmRTaXplID0gJ3NtJyB8ICdtZCcgfCAnbGcnO1xuXG4vKipcbiAqIEF0aGVuZSBLYmQgKEtleWJvYXJkKSBDb21wb25lbnRcbiAqXG4gKiBEaXNwbGF5cyBrZXlib2FyZCBzaG9ydGN1dHMgaW4gYSBzdHlsZWQgYmFkZ2VcbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1rYmQ+Q3RybDwvYXRoLWtiZD5cbiAqIDxhdGgta2JkPuKMmDwvYXRoLWtiZD5cbiAqIDxhdGgta2JkIHNpemU9XCJzbVwiPks8L2F0aC1rYmQ+XG4gKiA8YXRoLWtiZCBsYWJlbD1cIuKMmEtcIiBzaXplPVwic21cIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgta2JkJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4va2JkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2tiZC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aEtiZENvbXBvbmVudCB7XG4gIC8qKiBTaXplIHZhcmlhbnQgKi9cbiAgcmVhZG9ubHkgc2l6ZSA9IGlucHV0PEtiZFNpemU+KCdtZCcpO1xuXG4gIC8qKlxuICAgKiBLZXlzIGFzIHRleHQsIGZvciBhIHNlbGYtY2xvc2luZyB0YWcuIENhbGxlcnMgd3JvdGUgYGxhYmVsPVwi4oyYS1wiYFxuICAgKiBiZWZvcmUgdGhpcyBpbnB1dCBleGlzdGVkLCB3aGljaCByZW5kZXJlZCBhbiBlbXB0eSBjaGlwLlxuICAgKi9cbiAgcmVhZG9ubHkgbGFiZWwgPSBpbnB1dCgnJyk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGtiZENsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiBgYXRoLWtiZCBhdGgta2JkLS0ke3RoaXMuc2l6ZSgpfWApO1xufVxuIiwiPGtiZCBbY2xhc3NdPVwia2JkQ2xhc3NlcygpXCI+XG4gIEBpZiAobGFiZWwoKSkge1xuICAgIHt7IGxhYmVsKCkgfX1cbiAgfVxuICA8bmctY29udGVudCAvPlxuPC9rYmQ+XG4iXX0=