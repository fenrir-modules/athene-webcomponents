import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Athene Card Component
 *
 * @example
 * <ath-card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </ath-card>
 *
 * <ath-card [hoverable]="true" padding="lg">
 *   Hoverable card with large padding
 * </ath-card>
 */
export class AthCardComponent {
    constructor() {
        /** Card padding */
        this.padding = 'md';
        /** Show border */
        this.bordered = true;
        /** Hoverable effect */
        this.hoverable = false;
        /** Show header slot */
        this.header = false;
        /** Show footer slot */
        this.footer = false;
    }
    get cardClasses() {
        return [
            'ath-card',
            `ath-card--padding-${this.padding}`,
            this.bordered ? 'ath-card--bordered' : '',
            this.hoverable ? 'ath-card--hoverable' : '',
        ]
            .filter(Boolean)
            .join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthCardComponent, isStandalone: true, selector: "ath-card", inputs: { padding: "padding", bordered: "bordered", hoverable: "hoverable", header: "header", footer: "footer" }, ngImport: i0, template: "<div [class]=\"cardClasses\">\n  @if (header) {\n    <div class=\"ath-card__header\">\n      <ng-content select=\"[slot=header]\" />\n    </div>\n  }\n\n  <div class=\"ath-card__body\">\n    <ng-content />\n  </div>\n\n  @if (footer) {\n    <div class=\"ath-card__footer\">\n      <ng-content select=\"[slot=footer]\" />\n    </div>\n  }\n</div>\n", styles: [".ath-card{background-color:var(--ath-bg-panel);border-radius:var(--panel-radius);box-shadow:var(--ath-shadow-sm);transition:box-shadow var(--ath-transition-fast),transform var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-card--padding-none .ath-card__body{padding:0}.ath-card--padding-sm .ath-card__body{padding:var(--ath-space-3)}.ath-card--padding-md .ath-card__body{padding:var(--panel-pad-y) var(--panel-pad-x)}.ath-card--padding-lg .ath-card__body{padding:var(--ath-space-6)}.ath-card--bordered{border:1px solid var(--ath-border-color)}.ath-card--hoverable{cursor:pointer}.ath-card--hoverable:hover{box-shadow:var(--ath-shadow-md);transform:translateY(-2px);border-color:var(--ath-border-color-hover)}.ath-card__header{display:flex;align-items:center;min-height:var(--panel-head-h);padding:0 var(--panel-pad-x);font-size:var(--panel-title-size);border-bottom:1px solid var(--ath-border-color);font-weight:var(--ath-font-weight-semibold)}.ath-card__footer{padding:var(--panel-pad-y) var(--panel-pad-x);border-top:1px solid var(--ath-border-color);background-color:var(--ath-bg-tertiary);border-radius:0 0 var(--ath-border-radius-lg) var(--ath-border-radius-lg)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-card', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"cardClasses\">\n  @if (header) {\n    <div class=\"ath-card__header\">\n      <ng-content select=\"[slot=header]\" />\n    </div>\n  }\n\n  <div class=\"ath-card__body\">\n    <ng-content />\n  </div>\n\n  @if (footer) {\n    <div class=\"ath-card__footer\">\n      <ng-content select=\"[slot=footer]\" />\n    </div>\n  }\n</div>\n", styles: [".ath-card{background-color:var(--ath-bg-panel);border-radius:var(--panel-radius);box-shadow:var(--ath-shadow-sm);transition:box-shadow var(--ath-transition-fast),transform var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-card--padding-none .ath-card__body{padding:0}.ath-card--padding-sm .ath-card__body{padding:var(--ath-space-3)}.ath-card--padding-md .ath-card__body{padding:var(--panel-pad-y) var(--panel-pad-x)}.ath-card--padding-lg .ath-card__body{padding:var(--ath-space-6)}.ath-card--bordered{border:1px solid var(--ath-border-color)}.ath-card--hoverable{cursor:pointer}.ath-card--hoverable:hover{box-shadow:var(--ath-shadow-md);transform:translateY(-2px);border-color:var(--ath-border-color-hover)}.ath-card__header{display:flex;align-items:center;min-height:var(--panel-head-h);padding:0 var(--panel-pad-x);font-size:var(--panel-title-size);border-bottom:1px solid var(--ath-border-color);font-weight:var(--ath-font-weight-semibold)}.ath-card__footer{padding:var(--panel-pad-y) var(--panel-pad-x);border-top:1px solid var(--ath-border-color);background-color:var(--ath-bg-tertiary);border-radius:0 0 var(--ath-border-radius-lg) var(--ath-border-radius-lg)}\n"] }]
        }], propDecorators: { padding: [{
                type: Input
            }], bordered: [{
                type: Input
            }], hoverable: [{
                type: Input
            }], header: [{
                type: Input
            }], footer: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvY2FyZC9jYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQU8vQzs7Ozs7Ozs7Ozs7O0dBWUc7QUFTSCxNQUFNLE9BQU8sZ0JBQWdCO0lBUjdCO1FBU0UsbUJBQW1CO1FBQ1YsWUFBTyxHQUFnQixJQUFJLENBQUM7UUFFckMsa0JBQWtCO1FBQ1QsYUFBUSxHQUFHLElBQUksQ0FBQztRQUV6Qix1QkFBdUI7UUFDZCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTNCLHVCQUF1QjtRQUNkLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFeEIsdUJBQXVCO1FBQ2QsV0FBTSxHQUFHLEtBQUssQ0FBQztLQVl6QjtJQVZDLElBQUksV0FBVztRQUNiLE9BQU87WUFDTCxVQUFVO1lBQ1YscUJBQXFCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDNUM7YUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQzsrR0F6QlUsZ0JBQWdCO21HQUFoQixnQkFBZ0Isc0xDN0I3Qiw2VkFpQkEsK3RDRE9ZLFlBQVk7OzRGQUtYLGdCQUFnQjtrQkFSNUIsU0FBUzsrQkFDRSxVQUFVLGNBQ1IsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUNOLHVCQUF1QixDQUFDLE1BQU07OEJBTXRDLE9BQU87c0JBQWYsS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0csTUFBTTtzQkFBZCxLQUFLO2dCQUdHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG4vKipcbiAqIENhcmQgcGFkZGluZyB2YXJpYW50c1xuICovXG5leHBvcnQgdHlwZSBDYXJkUGFkZGluZyA9ICdub25lJyB8ICdzbScgfCAnbWQnIHwgJ2xnJztcblxuLyoqXG4gKiBBdGhlbmUgQ2FyZCBDb21wb25lbnRcbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC1jYXJkPlxuICogICA8aDM+Q2FyZCBUaXRsZTwvaDM+XG4gKiAgIDxwPkNhcmQgY29udGVudCBnb2VzIGhlcmU8L3A+XG4gKiA8L2F0aC1jYXJkPlxuICpcbiAqIDxhdGgtY2FyZCBbaG92ZXJhYmxlXT1cInRydWVcIiBwYWRkaW5nPVwibGdcIj5cbiAqICAgSG92ZXJhYmxlIGNhcmQgd2l0aCBsYXJnZSBwYWRkaW5nXG4gKiA8L2F0aC1jYXJkPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtY2FyZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vY2FyZC5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aENhcmRDb21wb25lbnQge1xuICAvKiogQ2FyZCBwYWRkaW5nICovXG4gIEBJbnB1dCgpIHBhZGRpbmc6IENhcmRQYWRkaW5nID0gJ21kJztcblxuICAvKiogU2hvdyBib3JkZXIgKi9cbiAgQElucHV0KCkgYm9yZGVyZWQgPSB0cnVlO1xuXG4gIC8qKiBIb3ZlcmFibGUgZWZmZWN0ICovXG4gIEBJbnB1dCgpIGhvdmVyYWJsZSA9IGZhbHNlO1xuXG4gIC8qKiBTaG93IGhlYWRlciBzbG90ICovXG4gIEBJbnB1dCgpIGhlYWRlciA9IGZhbHNlO1xuXG4gIC8qKiBTaG93IGZvb3RlciBzbG90ICovXG4gIEBJbnB1dCgpIGZvb3RlciA9IGZhbHNlO1xuXG4gIGdldCBjYXJkQ2xhc3NlcygpOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICAnYXRoLWNhcmQnLFxuICAgICAgYGF0aC1jYXJkLS1wYWRkaW5nLSR7dGhpcy5wYWRkaW5nfWAsXG4gICAgICB0aGlzLmJvcmRlcmVkID8gJ2F0aC1jYXJkLS1ib3JkZXJlZCcgOiAnJyxcbiAgICAgIHRoaXMuaG92ZXJhYmxlID8gJ2F0aC1jYXJkLS1ob3ZlcmFibGUnIDogJycsXG4gICAgXVxuICAgICAgLmZpbHRlcihCb29sZWFuKVxuICAgICAgLmpvaW4oJyAnKTtcbiAgfVxufVxuIiwiPGRpdiBbY2xhc3NdPVwiY2FyZENsYXNzZXNcIj5cbiAgQGlmIChoZWFkZXIpIHtcbiAgICA8ZGl2IGNsYXNzPVwiYXRoLWNhcmRfX2hlYWRlclwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9aGVhZGVyXVwiIC8+XG4gICAgPC9kaXY+XG4gIH1cblxuICA8ZGl2IGNsYXNzPVwiYXRoLWNhcmRfX2JvZHlcIj5cbiAgICA8bmctY29udGVudCAvPlxuICA8L2Rpdj5cblxuICBAaWYgKGZvb3Rlcikge1xuICAgIDxkaXYgY2xhc3M9XCJhdGgtY2FyZF9fZm9vdGVyXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1mb290ZXJdXCIgLz5cbiAgICA8L2Rpdj5cbiAgfVxuPC9kaXY+XG4iXX0=