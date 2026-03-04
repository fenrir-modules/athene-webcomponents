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
        ].filter(Boolean).join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthCardComponent, isStandalone: true, selector: "ath-card", inputs: { padding: "padding", bordered: "bordered", hoverable: "hoverable", header: "header", footer: "footer" }, ngImport: i0, template: "<div [class]=\"cardClasses\">\n  @if (header) {\n    <div class=\"ath-card__header\">\n      <ng-content select=\"[slot=header]\" />\n    </div>\n  }\n\n  <div class=\"ath-card__body\">\n    <ng-content />\n  </div>\n\n  @if (footer) {\n    <div class=\"ath-card__footer\">\n      <ng-content select=\"[slot=footer]\" />\n    </div>\n  }\n</div>\n", styles: [".ath-card{background-color:var(--ath-bg-panel);border-radius:var(--ath-border-radius-lg);box-shadow:var(--ath-shadow-sm);backdrop-filter:blur(14px);transition:box-shadow var(--ath-transition-fast),transform var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-card--padding-none .ath-card__body{padding:0}.ath-card--padding-sm .ath-card__body{padding:var(--ath-space-3)}.ath-card--padding-md .ath-card__body{padding:var(--ath-space-4)}.ath-card--padding-lg .ath-card__body{padding:var(--ath-space-6)}.ath-card--bordered{border:1px solid var(--ath-border-color)}.ath-card--hoverable{cursor:pointer}.ath-card--hoverable:hover{box-shadow:var(--ath-shadow-md);transform:translateY(-2px);border-color:var(--ath-border-color-hover)}.ath-card__header{padding:var(--ath-space-4);border-bottom:1px solid var(--ath-border-color);font-weight:var(--ath-font-weight-semibold)}.ath-card__footer{padding:var(--ath-space-4);border-top:1px solid var(--ath-border-color);background-color:var(--ath-bg-tertiary);border-radius:0 0 var(--ath-border-radius-lg) var(--ath-border-radius-lg)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-card', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"cardClasses\">\n  @if (header) {\n    <div class=\"ath-card__header\">\n      <ng-content select=\"[slot=header]\" />\n    </div>\n  }\n\n  <div class=\"ath-card__body\">\n    <ng-content />\n  </div>\n\n  @if (footer) {\n    <div class=\"ath-card__footer\">\n      <ng-content select=\"[slot=footer]\" />\n    </div>\n  }\n</div>\n", styles: [".ath-card{background-color:var(--ath-bg-panel);border-radius:var(--ath-border-radius-lg);box-shadow:var(--ath-shadow-sm);backdrop-filter:blur(14px);transition:box-shadow var(--ath-transition-fast),transform var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-card--padding-none .ath-card__body{padding:0}.ath-card--padding-sm .ath-card__body{padding:var(--ath-space-3)}.ath-card--padding-md .ath-card__body{padding:var(--ath-space-4)}.ath-card--padding-lg .ath-card__body{padding:var(--ath-space-6)}.ath-card--bordered{border:1px solid var(--ath-border-color)}.ath-card--hoverable{cursor:pointer}.ath-card--hoverable:hover{box-shadow:var(--ath-shadow-md);transform:translateY(-2px);border-color:var(--ath-border-color-hover)}.ath-card__header{padding:var(--ath-space-4);border-bottom:1px solid var(--ath-border-color);font-weight:var(--ath-font-weight-semibold)}.ath-card__footer{padding:var(--ath-space-4);border-top:1px solid var(--ath-border-color);background-color:var(--ath-bg-tertiary);border-radius:0 0 var(--ath-border-radius-lg) var(--ath-border-radius-lg)}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvY2FyZC9jYXJkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQU8vQzs7Ozs7Ozs7Ozs7O0dBWUc7QUFTSCxNQUFNLE9BQU8sZ0JBQWdCO0lBUjdCO1FBU0UsbUJBQW1CO1FBQ1YsWUFBTyxHQUFnQixJQUFJLENBQUM7UUFFckMsa0JBQWtCO1FBQ1QsYUFBUSxHQUFHLElBQUksQ0FBQztRQUV6Qix1QkFBdUI7UUFDZCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTNCLHVCQUF1QjtRQUNkLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFeEIsdUJBQXVCO1FBQ2QsV0FBTSxHQUFHLEtBQUssQ0FBQztLQVV6QjtJQVJDLElBQUksV0FBVztRQUNiLE9BQU87WUFDTCxVQUFVO1lBQ1YscUJBQXFCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDNUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7K0dBdkJVLGdCQUFnQjttR0FBaEIsZ0JBQWdCLHNMQzdCN0IsNlZBaUJBLHluQ0RPWSxZQUFZOzs0RkFLWCxnQkFBZ0I7a0JBUjVCLFNBQVM7K0JBQ0UsVUFBVSxjQUNSLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNOzhCQU10QyxPQUFPO3NCQUFmLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdHLE1BQU07c0JBQWQsS0FBSztnQkFHRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBDYXJkIHBhZGRpbmcgdmFyaWFudHNcbiAqL1xuZXhwb3J0IHR5cGUgQ2FyZFBhZGRpbmcgPSAnbm9uZScgfCAnc20nIHwgJ21kJyB8ICdsZyc7XG5cbi8qKlxuICogQXRoZW5lIENhcmQgQ29tcG9uZW50XG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtY2FyZD5cbiAqICAgPGgzPkNhcmQgVGl0bGU8L2gzPlxuICogICA8cD5DYXJkIGNvbnRlbnQgZ29lcyBoZXJlPC9wPlxuICogPC9hdGgtY2FyZD5cbiAqXG4gKiA8YXRoLWNhcmQgW2hvdmVyYWJsZV09XCJ0cnVlXCIgcGFkZGluZz1cImxnXCI+XG4gKiAgIEhvdmVyYWJsZSBjYXJkIHdpdGggbGFyZ2UgcGFkZGluZ1xuICogPC9hdGgtY2FyZD5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLWNhcmQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2NhcmQuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhDYXJkQ29tcG9uZW50IHtcbiAgLyoqIENhcmQgcGFkZGluZyAqL1xuICBASW5wdXQoKSBwYWRkaW5nOiBDYXJkUGFkZGluZyA9ICdtZCc7XG5cbiAgLyoqIFNob3cgYm9yZGVyICovXG4gIEBJbnB1dCgpIGJvcmRlcmVkID0gdHJ1ZTtcblxuICAvKiogSG92ZXJhYmxlIGVmZmVjdCAqL1xuICBASW5wdXQoKSBob3ZlcmFibGUgPSBmYWxzZTtcblxuICAvKiogU2hvdyBoZWFkZXIgc2xvdCAqL1xuICBASW5wdXQoKSBoZWFkZXIgPSBmYWxzZTtcblxuICAvKiogU2hvdyBmb290ZXIgc2xvdCAqL1xuICBASW5wdXQoKSBmb290ZXIgPSBmYWxzZTtcblxuICBnZXQgY2FyZENsYXNzZXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gW1xuICAgICAgJ2F0aC1jYXJkJyxcbiAgICAgIGBhdGgtY2FyZC0tcGFkZGluZy0ke3RoaXMucGFkZGluZ31gLFxuICAgICAgdGhpcy5ib3JkZXJlZCA/ICdhdGgtY2FyZC0tYm9yZGVyZWQnIDogJycsXG4gICAgICB0aGlzLmhvdmVyYWJsZSA/ICdhdGgtY2FyZC0taG92ZXJhYmxlJyA6ICcnLFxuICAgIF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oJyAnKTtcbiAgfVxufVxuIiwiPGRpdiBbY2xhc3NdPVwiY2FyZENsYXNzZXNcIj5cbiAgQGlmIChoZWFkZXIpIHtcbiAgICA8ZGl2IGNsYXNzPVwiYXRoLWNhcmRfX2hlYWRlclwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9aGVhZGVyXVwiIC8+XG4gICAgPC9kaXY+XG4gIH1cblxuICA8ZGl2IGNsYXNzPVwiYXRoLWNhcmRfX2JvZHlcIj5cbiAgICA8bmctY29udGVudCAvPlxuICA8L2Rpdj5cblxuICBAaWYgKGZvb3Rlcikge1xuICAgIDxkaXYgY2xhc3M9XCJhdGgtY2FyZF9fZm9vdGVyXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1mb290ZXJdXCIgLz5cbiAgICA8L2Rpdj5cbiAgfVxuPC9kaXY+XG4iXX0=