import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
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
        this.orientation = input('horizontal');
        /** Spacing around the divider */
        this.spacing = input('md');
        this.dividerClasses = computed(() => [
            'ath-divider',
            `ath-divider--${this.orientation()}`,
            `ath-divider--spacing-${this.spacing()}`,
        ].join(' '));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthDividerComponent, isStandalone: true, selector: "ath-divider", inputs: { orientation: { classPropertyName: "orientation", publicName: "orientation", isSignal: true, isRequired: false, transformFunction: null }, spacing: { classPropertyName: "spacing", publicName: "spacing", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div [class]=\"dividerClasses()\" role=\"separator\"></div>\n", styles: [".ath-divider{flex-shrink:0;background-color:var(--border)}.ath-divider--horizontal{width:100%;height:1px}.ath-divider--vertical{width:1px;align-self:stretch}.ath-divider--spacing-none{margin:0}.ath-divider--spacing-sm.ath-divider--horizontal{margin:var(--space-2) 0}.ath-divider--spacing-sm.ath-divider--vertical{margin:0 var(--space-2)}.ath-divider--spacing-md.ath-divider--horizontal{margin:var(--space-4) 0}.ath-divider--spacing-md.ath-divider--vertical{margin:0 var(--space-4)}.ath-divider--spacing-lg.ath-divider--horizontal{margin:var(--space-6) 0}.ath-divider--spacing-lg.ath-divider--vertical{margin:0 var(--space-6)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDividerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-divider', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"dividerClasses()\" role=\"separator\"></div>\n", styles: [".ath-divider{flex-shrink:0;background-color:var(--border)}.ath-divider--horizontal{width:100%;height:1px}.ath-divider--vertical{width:1px;align-self:stretch}.ath-divider--spacing-none{margin:0}.ath-divider--spacing-sm.ath-divider--horizontal{margin:var(--space-2) 0}.ath-divider--spacing-sm.ath-divider--vertical{margin:0 var(--space-2)}.ath-divider--spacing-md.ath-divider--horizontal{margin:var(--space-4) 0}.ath-divider--spacing-md.ath-divider--vertical{margin:0 var(--space-4)}.ath-divider--spacing-lg.ath-divider--horizontal{margin:var(--space-6) 0}.ath-divider--spacing-lg.ath-divider--vertical{margin:0 var(--space-6)}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvZGl2aWRlci9kaXZpZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9kaXZpZGVyL2RpdmlkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFLL0M7Ozs7Ozs7OztHQVNHO0FBU0gsTUFBTSxPQUFPLG1CQUFtQjtJQVJoQztRQVNFLGtCQUFrQjtRQUNULGdCQUFXLEdBQUcsS0FBSyxDQUFxQixZQUFZLENBQUMsQ0FBQztRQUUvRCxpQ0FBaUM7UUFDeEIsWUFBTyxHQUFHLEtBQUssQ0FBaUIsSUFBSSxDQUFDLENBQUM7UUFFNUIsbUJBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQ2hEO1lBQ0UsYUFBYTtZQUNiLGdCQUFnQixJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDcEMsd0JBQXdCLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtTQUN6QyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDWixDQUFDO0tBQ0g7K0dBZFksbUJBQW1CO21HQUFuQixtQkFBbUIsMlZDeEJoQywrREFDQSw0cUJEa0JZLFlBQVk7OzRGQUtYLG1CQUFtQjtrQkFSL0IsU0FBUzsrQkFDRSxhQUFhLGNBQ1gsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUNOLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBjb21wdXRlZCwgaW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCB0eXBlIERpdmlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5leHBvcnQgdHlwZSBEaXZpZGVyU3BhY2luZyA9ICdub25lJyB8ICdzbScgfCAnbWQnIHwgJ2xnJztcblxuLyoqXG4gKiBBdGhlbmUgRGl2aWRlciBDb21wb25lbnRcbiAqXG4gKiBWaXN1YWwgc2VwYXJhdG9yIGZvciBjb250ZW50IHNlY3Rpb25zLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWRpdmlkZXIgLz5cbiAqIDxhdGgtZGl2aWRlciBzcGFjaW5nPVwibGdcIiAvPlxuICogPGF0aC1kaXZpZGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtZGl2aWRlcicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2RpdmlkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vZGl2aWRlci5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aERpdmlkZXJDb21wb25lbnQge1xuICAvKiogT3JpZW50YXRpb24gKi9cbiAgcmVhZG9ubHkgb3JpZW50YXRpb24gPSBpbnB1dDxEaXZpZGVyT3JpZW50YXRpb24+KCdob3Jpem9udGFsJyk7XG5cbiAgLyoqIFNwYWNpbmcgYXJvdW5kIHRoZSBkaXZpZGVyICovXG4gIHJlYWRvbmx5IHNwYWNpbmcgPSBpbnB1dDxEaXZpZGVyU3BhY2luZz4oJ21kJyk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRpdmlkZXJDbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBbXG4gICAgICAnYXRoLWRpdmlkZXInLFxuICAgICAgYGF0aC1kaXZpZGVyLS0ke3RoaXMub3JpZW50YXRpb24oKX1gLFxuICAgICAgYGF0aC1kaXZpZGVyLS1zcGFjaW5nLSR7dGhpcy5zcGFjaW5nKCl9YCxcbiAgICBdLmpvaW4oJyAnKVxuICApO1xufVxuIiwiPGRpdiBbY2xhc3NdPVwiZGl2aWRlckNsYXNzZXMoKVwiIHJvbGU9XCJzZXBhcmF0b3JcIj48L2Rpdj5cbiJdfQ==