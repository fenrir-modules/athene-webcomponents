import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Athene Divider Component
 *
 * Visual separator for content sections.
 *
 * @example
 * <ath-divider />
 * <ath-divider spacing="lg" />
 * <ath-divider orientation="vertical" />
 */
export class AthDividerComponent {
    constructor() {
        /** Orientation */
        this.orientation = 'horizontal';
        /** Spacing around the divider */
        this.spacing = 'md';
    }
    get dividerClasses() {
        return [
            'ath-divider',
            `ath-divider--${this.orientation}`,
            `ath-divider--spacing-${this.spacing}`,
        ].join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthDividerComponent, isStandalone: true, selector: "ath-divider", inputs: { orientation: "orientation", spacing: "spacing" }, ngImport: i0, template: "<div [class]=\"dividerClasses\" role=\"separator\"></div>\n", styles: [".ath-divider{flex-shrink:0;background-color:var(--ath-border-color)}.ath-divider--horizontal{width:100%;height:1px}.ath-divider--vertical{width:1px;align-self:stretch}.ath-divider--spacing-none{margin:0}.ath-divider--spacing-sm.ath-divider--horizontal{margin:var(--ath-space-2) 0}.ath-divider--spacing-sm.ath-divider--vertical{margin:0 var(--ath-space-2)}.ath-divider--spacing-md.ath-divider--horizontal{margin:var(--ath-space-4) 0}.ath-divider--spacing-md.ath-divider--vertical{margin:0 var(--ath-space-4)}.ath-divider--spacing-lg.ath-divider--horizontal{margin:var(--ath-space-6) 0}.ath-divider--spacing-lg.ath-divider--vertical{margin:0 var(--ath-space-6)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDividerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-divider', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"dividerClasses\" role=\"separator\"></div>\n", styles: [".ath-divider{flex-shrink:0;background-color:var(--ath-border-color)}.ath-divider--horizontal{width:100%;height:1px}.ath-divider--vertical{width:1px;align-self:stretch}.ath-divider--spacing-none{margin:0}.ath-divider--spacing-sm.ath-divider--horizontal{margin:var(--ath-space-2) 0}.ath-divider--spacing-sm.ath-divider--vertical{margin:0 var(--ath-space-2)}.ath-divider--spacing-md.ath-divider--horizontal{margin:var(--ath-space-4) 0}.ath-divider--spacing-md.ath-divider--vertical{margin:0 var(--ath-space-4)}.ath-divider--spacing-lg.ath-divider--horizontal{margin:var(--ath-space-6) 0}.ath-divider--spacing-lg.ath-divider--vertical{margin:0 var(--ath-space-6)}\n"] }]
        }], propDecorators: { orientation: [{
                type: Input
            }], spacing: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvZGl2aWRlci9kaXZpZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaXZpZGVyL2RpdmlkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUUvQzs7Ozs7Ozs7O0dBU0c7QUFTSCxNQUFNLE9BQU8sbUJBQW1CO0lBUmhDO1FBU0Usa0JBQWtCO1FBQ1QsZ0JBQVcsR0FBOEIsWUFBWSxDQUFDO1FBRS9ELGlDQUFpQztRQUN4QixZQUFPLEdBQWdDLElBQUksQ0FBQztLQVN0RDtJQVBDLElBQUksY0FBYztRQUNoQixPQUFPO1lBQ0wsYUFBYTtZQUNiLGdCQUFnQixJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xDLHdCQUF3QixJQUFJLENBQUMsT0FBTyxFQUFFO1NBQ3ZDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsQ0FBQzsrR0FiVSxtQkFBbUI7bUdBQW5CLG1CQUFtQixtSUNyQmhDLDZEQUNBLDhzQkRlWSxZQUFZOzs0RkFLWCxtQkFBbUI7a0JBUi9CLFNBQVM7K0JBQ0UsYUFBYSxjQUNYLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQU10QyxXQUFXO3NCQUFuQixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIEF0aGVuZSBEaXZpZGVyIENvbXBvbmVudFxuICpcbiAqIFZpc3VhbCBzZXBhcmF0b3IgZm9yIGNvbnRlbnQgc2VjdGlvbnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtZGl2aWRlciAvPlxuICogPGF0aC1kaXZpZGVyIHNwYWNpbmc9XCJsZ1wiIC8+XG4gKiA8YXRoLWRpdmlkZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1kaXZpZGVyJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vZGl2aWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9kaXZpZGVyLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoRGl2aWRlckNvbXBvbmVudCB7XG4gIC8qKiBPcmllbnRhdGlvbiAqL1xuICBASW5wdXQoKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICAvKiogU3BhY2luZyBhcm91bmQgdGhlIGRpdmlkZXIgKi9cbiAgQElucHV0KCkgc3BhY2luZzogJ25vbmUnIHwgJ3NtJyB8ICdtZCcgfCAnbGcnID0gJ21kJztcblxuICBnZXQgZGl2aWRlckNsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2F0aC1kaXZpZGVyJyxcbiAgICAgIGBhdGgtZGl2aWRlci0tJHt0aGlzLm9yaWVudGF0aW9ufWAsXG4gICAgICBgYXRoLWRpdmlkZXItLXNwYWNpbmctJHt0aGlzLnNwYWNpbmd9YCxcbiAgICBdLmpvaW4oJyAnKTtcbiAgfVxufVxuIiwiPGRpdiBbY2xhc3NdPVwiZGl2aWRlckNsYXNzZXNcIiByb2xlPVwic2VwYXJhdG9yXCI+PC9kaXY+XG4iXX0=