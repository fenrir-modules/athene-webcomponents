import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Athene Skeleton Component
 *
 * Loading placeholder for content
 *
 * @example
 * <ath-skeleton variant="text" width="200px" />
 * <ath-skeleton variant="circular" width="48px" height="48px" />
 * <ath-skeleton variant="rectangular" height="200px" />
 */
export class AthSkeletonComponent {
    constructor() {
        /** Skeleton variant */
        this.variant = 'text';
        /** Width (CSS value) */
        this.width = '100%';
        /** Height (CSS value) */
        this.height = '';
        /** Animation enabled */
        this.animated = true;
    }
    get skeletonClasses() {
        return [
            'ath-skeleton',
            `ath-skeleton--${this.variant}`,
            this.animated ? 'ath-skeleton--animated' : '',
        ].filter(Boolean).join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthSkeletonComponent, isStandalone: true, selector: "ath-skeleton", inputs: { variant: "variant", width: "width", height: "height", animated: "animated" }, ngImport: i0, template: "<div\n  [class]=\"skeletonClasses\"\n  [style.width]=\"width\"\n  [style.height]=\"height\"\n></div>\n", styles: [".ath-skeleton{background-color:var(--ath-bg-tertiary)}.ath-skeleton--text{height:1em;border-radius:var(--ath-border-radius-sm)}.ath-skeleton--circular{border-radius:var(--ath-border-radius-full)}.ath-skeleton--rectangular{border-radius:var(--ath-border-radius-md)}.ath-skeleton--animated{background:linear-gradient(90deg,var(--ath-bg-tertiary) 25%,var(--ath-bg-secondary) 50%,var(--ath-bg-tertiary) 75%);background-size:200% 100%;animation:skeleton-shimmer 1.5s ease-in-out infinite}@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-skeleton', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [class]=\"skeletonClasses\"\n  [style.width]=\"width\"\n  [style.height]=\"height\"\n></div>\n", styles: [".ath-skeleton{background-color:var(--ath-bg-tertiary)}.ath-skeleton--text{height:1em;border-radius:var(--ath-border-radius-sm)}.ath-skeleton--circular{border-radius:var(--ath-border-radius-full)}.ath-skeleton--rectangular{border-radius:var(--ath-border-radius-md)}.ath-skeleton--animated{background:linear-gradient(90deg,var(--ath-bg-tertiary) 25%,var(--ath-bg-secondary) 50%,var(--ath-bg-tertiary) 75%);background-size:200% 100%;animation:skeleton-shimmer 1.5s ease-in-out infinite}@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], animated: [{
                type: Input
            }] } });
/**
 * Skeleton Table Component
 *
 * Pre-built skeleton for table loading states
 */
export class AthSkeletonTableComponent {
    constructor() {
        /** Number of rows */
        this.rows = 5;
        /** Column widths in percent */
        this.columns = [20, 30, 25, 25];
    }
    get rowsArray() {
        return Array.from({ length: this.rows }, (_, i) => i);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSkeletonTableComponent, isStandalone: true, selector: "ath-skeleton-table", inputs: { rows: "rows", columns: "columns" }, ngImport: i0, template: "<div class=\"ath-skeleton-table\">\n  <!-- Header -->\n  <div class=\"ath-skeleton-table__header\">\n    @for (col of columns; track col) {\n      <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"20px\" />\n    }\n  </div>\n\n  <!-- Rows -->\n  @for (row of rowsArray; track row) {\n    <div class=\"ath-skeleton-table__row\">\n      @for (col of columns; track col) {\n        <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"16px\" />\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-skeleton-table{display:flex;flex-direction:column;gap:var(--ath-space-3)}.ath-skeleton-table__header{display:flex;gap:var(--ath-space-4);padding-bottom:var(--ath-space-3);border-bottom:1px solid var(--ath-border-color)}.ath-skeleton-table__row{display:flex;gap:var(--ath-space-4);padding:var(--ath-space-2) 0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthSkeletonComponent, selector: "ath-skeleton", inputs: ["variant", "width", "height", "animated"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-skeleton-table', standalone: true, imports: [CommonModule, AthSkeletonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-skeleton-table\">\n  <!-- Header -->\n  <div class=\"ath-skeleton-table__header\">\n    @for (col of columns; track col) {\n      <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"20px\" />\n    }\n  </div>\n\n  <!-- Rows -->\n  @for (row of rowsArray; track row) {\n    <div class=\"ath-skeleton-table__row\">\n      @for (col of columns; track col) {\n        <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"16px\" />\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-skeleton-table{display:flex;flex-direction:column;gap:var(--ath-space-3)}.ath-skeleton-table__header{display:flex;gap:var(--ath-space-4);padding-bottom:var(--ath-space-3);border-bottom:1px solid var(--ath-border-color)}.ath-skeleton-table__row{display:flex;gap:var(--ath-space-4);padding:var(--ath-space-2) 0}\n"] }]
        }], propDecorators: { rows: [{
                type: Input
            }], columns: [{
                type: Input
            }] } });
/**
 * Skeleton Card Component
 *
 * Pre-built skeleton for card loading states
 */
export class AthSkeletonCardComponent {
    constructor() {
        /** Show image placeholder */
        this.showImage = true;
        /** Show action buttons */
        this.showActions = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSkeletonCardComponent, isStandalone: true, selector: "ath-skeleton-card", inputs: { showImage: "showImage", showActions: "showActions" }, ngImport: i0, template: "<div class=\"ath-skeleton-card\">\n  @if (showImage) {\n    <ath-skeleton variant=\"rectangular\" height=\"160px\" />\n  }\n  <div class=\"ath-skeleton-card__content\">\n    <ath-skeleton variant=\"text\" width=\"70%\" height=\"24px\" />\n    <ath-skeleton variant=\"text\" width=\"100%\" height=\"16px\" />\n    <ath-skeleton variant=\"text\" width=\"90%\" height=\"16px\" />\n    @if (showActions) {\n      <div class=\"ath-skeleton-card__actions\">\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n      </div>\n    }\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthSkeletonComponent, selector: "ath-skeleton", inputs: ["variant", "width", "height", "animated"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-skeleton-card', standalone: true, imports: [CommonModule, AthSkeletonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-skeleton-card\">\n  @if (showImage) {\n    <ath-skeleton variant=\"rectangular\" height=\"160px\" />\n  }\n  <div class=\"ath-skeleton-card__content\">\n    <ath-skeleton variant=\"text\" width=\"70%\" height=\"24px\" />\n    <ath-skeleton variant=\"text\" width=\"100%\" height=\"16px\" />\n    <ath-skeleton variant=\"text\" width=\"90%\" height=\"16px\" />\n    @if (showActions) {\n      <div class=\"ath-skeleton-card__actions\">\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n      </div>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { showImage: [{
                type: Input
            }], showActions: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tlbGV0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3NrZWxldG9uL3NrZWxldG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9za2VsZXRvbi9za2VsZXRvbi5jb21wb25lbnQuaHRtbCIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9za2VsZXRvbi9za2VsZXRvbi10YWJsZS5jb21wb25lbnQuaHRtbCIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9za2VsZXRvbi9za2VsZXRvbi1jYXJkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFPL0M7Ozs7Ozs7OztHQVNHO0FBU0gsTUFBTSxPQUFPLG9CQUFvQjtJQVJqQztRQVNFLHVCQUF1QjtRQUNkLFlBQU8sR0FBb0IsTUFBTSxDQUFDO1FBRTNDLHdCQUF3QjtRQUNmLFVBQUssR0FBRyxNQUFNLENBQUM7UUFFeEIseUJBQXlCO1FBQ2hCLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFckIsd0JBQXdCO1FBQ2YsYUFBUSxHQUFHLElBQUksQ0FBQztLQVMxQjtJQVBDLElBQUksZUFBZTtRQUNqQixPQUFPO1lBQ0wsY0FBYztZQUNkLGlCQUFpQixJQUFJLENBQUMsT0FBTyxFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQzlDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDOytHQW5CVSxvQkFBb0I7bUdBQXBCLG9CQUFvQixnS0MxQmpDLHdHQUtBLHduQkRnQlksWUFBWTs7NEZBS1gsb0JBQW9CO2tCQVJoQyxTQUFTOytCQUNFLGNBQWMsY0FDWixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFNdEMsT0FBTztzQkFBZixLQUFLO2dCQUdHLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxNQUFNO3NCQUFkLEtBQUs7Z0JBR0csUUFBUTtzQkFBaEIsS0FBSzs7QUFXUjs7OztHQUlHO0FBU0gsTUFBTSxPQUFPLHlCQUF5QjtJQVJ0QztRQVNFLHFCQUFxQjtRQUNaLFNBQUksR0FBRyxDQUFDLENBQUM7UUFFbEIsK0JBQStCO1FBQ3RCLFlBQU8sR0FBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBSy9DO0lBSEMsSUFBSSxTQUFTO1FBQ1gsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7K0dBVFUseUJBQXlCO21HQUF6Qix5QkFBeUIsNEhFN0R0QyxvZkFpQkEscVhGdUNZLFlBQVksK0JBOUJYLG9CQUFvQjs7NEZBbUNwQix5QkFBeUI7a0JBUnJDLFNBQVM7K0JBQ0Usb0JBQW9CLGNBQ2xCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQyxtQkFDNUIsdUJBQXVCLENBQUMsTUFBTTs4QkFNdEMsSUFBSTtzQkFBWixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSzs7QUFPUjs7OztHQUlHO0FBU0gsTUFBTSxPQUFPLHdCQUF3QjtJQVJyQztRQVNFLDZCQUE2QjtRQUNwQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTFCLDBCQUEwQjtRQUNqQixnQkFBVyxHQUFHLElBQUksQ0FBQztLQUM3QjsrR0FOWSx3QkFBd0I7bUdBQXhCLHdCQUF3Qiw2SUd0RnJDLGdwQkFnQkEseURIaUVZLFlBQVksK0JBdkRYLG9CQUFvQjs7NEZBNERwQix3QkFBd0I7a0JBUnBDLFNBQVM7K0JBQ0UsbUJBQW1CLGNBQ2pCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxvQkFBb0IsQ0FBQyxtQkFDNUIsdUJBQXVCLENBQUMsTUFBTTs4QkFNdEMsU0FBUztzQkFBakIsS0FBSztnQkFHRyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogU2tlbGV0b24gdmFyaWFudCB0eXBlc1xuICovXG5leHBvcnQgdHlwZSBTa2VsZXRvblZhcmlhbnQgPSAndGV4dCcgfCAnY2lyY3VsYXInIHwgJ3JlY3Rhbmd1bGFyJztcblxuLyoqXG4gKiBBdGhlbmUgU2tlbGV0b24gQ29tcG9uZW50XG4gKlxuICogTG9hZGluZyBwbGFjZWhvbGRlciBmb3IgY29udGVudFxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXNrZWxldG9uIHZhcmlhbnQ9XCJ0ZXh0XCIgd2lkdGg9XCIyMDBweFwiIC8+XG4gKiA8YXRoLXNrZWxldG9uIHZhcmlhbnQ9XCJjaXJjdWxhclwiIHdpZHRoPVwiNDhweFwiIGhlaWdodD1cIjQ4cHhcIiAvPlxuICogPGF0aC1za2VsZXRvbiB2YXJpYW50PVwicmVjdGFuZ3VsYXJcIiBoZWlnaHQ9XCIyMDBweFwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1za2VsZXRvbicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3NrZWxldG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3NrZWxldG9uLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoU2tlbGV0b25Db21wb25lbnQge1xuICAvKiogU2tlbGV0b24gdmFyaWFudCAqL1xuICBASW5wdXQoKSB2YXJpYW50OiBTa2VsZXRvblZhcmlhbnQgPSAndGV4dCc7XG5cbiAgLyoqIFdpZHRoIChDU1MgdmFsdWUpICovXG4gIEBJbnB1dCgpIHdpZHRoID0gJzEwMCUnO1xuXG4gIC8qKiBIZWlnaHQgKENTUyB2YWx1ZSkgKi9cbiAgQElucHV0KCkgaGVpZ2h0ID0gJyc7XG5cbiAgLyoqIEFuaW1hdGlvbiBlbmFibGVkICovXG4gIEBJbnB1dCgpIGFuaW1hdGVkID0gdHJ1ZTtcblxuICBnZXQgc2tlbGV0b25DbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFtcbiAgICAgICdhdGgtc2tlbGV0b24nLFxuICAgICAgYGF0aC1za2VsZXRvbi0tJHt0aGlzLnZhcmlhbnR9YCxcbiAgICAgIHRoaXMuYW5pbWF0ZWQgPyAnYXRoLXNrZWxldG9uLS1hbmltYXRlZCcgOiAnJyxcbiAgICBdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBTa2VsZXRvbiBUYWJsZSBDb21wb25lbnRcbiAqXG4gKiBQcmUtYnVpbHQgc2tlbGV0b24gZm9yIHRhYmxlIGxvYWRpbmcgc3RhdGVzXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1za2VsZXRvbi10YWJsZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEF0aFNrZWxldG9uQ29tcG9uZW50XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9za2VsZXRvbi10YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9za2VsZXRvbi10YWJsZS5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFNrZWxldG9uVGFibGVDb21wb25lbnQge1xuICAvKiogTnVtYmVyIG9mIHJvd3MgKi9cbiAgQElucHV0KCkgcm93cyA9IDU7XG5cbiAgLyoqIENvbHVtbiB3aWR0aHMgaW4gcGVyY2VudCAqL1xuICBASW5wdXQoKSBjb2x1bW5zOiBudW1iZXJbXSA9IFsyMCwgMzAsIDI1LCAyNV07XG5cbiAgZ2V0IHJvd3NBcnJheSgpOiBudW1iZXJbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMucm93cyB9LCAoXywgaSkgPT4gaSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTa2VsZXRvbiBDYXJkIENvbXBvbmVudFxuICpcbiAqIFByZS1idWlsdCBza2VsZXRvbiBmb3IgY2FyZCBsb2FkaW5nIHN0YXRlc1xuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtc2tlbGV0b24tY2FyZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEF0aFNrZWxldG9uQ29tcG9uZW50XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9za2VsZXRvbi1jYXJkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL3NrZWxldG9uLWNhcmQuY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhTa2VsZXRvbkNhcmRDb21wb25lbnQge1xuICAvKiogU2hvdyBpbWFnZSBwbGFjZWhvbGRlciAqL1xuICBASW5wdXQoKSBzaG93SW1hZ2UgPSB0cnVlO1xuXG4gIC8qKiBTaG93IGFjdGlvbiBidXR0b25zICovXG4gIEBJbnB1dCgpIHNob3dBY3Rpb25zID0gdHJ1ZTtcbn1cbiIsIjxkaXZcbiAgW2NsYXNzXT1cInNrZWxldG9uQ2xhc3Nlc1wiXG4gIFtzdHlsZS53aWR0aF09XCJ3aWR0aFwiXG4gIFtzdHlsZS5oZWlnaHRdPVwiaGVpZ2h0XCJcbj48L2Rpdj5cbiIsIjxkaXYgY2xhc3M9XCJhdGgtc2tlbGV0b24tdGFibGVcIj5cbiAgPCEtLSBIZWFkZXIgLS0+XG4gIDxkaXYgY2xhc3M9XCJhdGgtc2tlbGV0b24tdGFibGVfX2hlYWRlclwiPlxuICAgIEBmb3IgKGNvbCBvZiBjb2x1bW5zOyB0cmFjayBjb2wpIHtcbiAgICAgIDxhdGgtc2tlbGV0b24gdmFyaWFudD1cInRleHRcIiBbd2lkdGhdPVwiY29sICsgJyUnXCIgaGVpZ2h0PVwiMjBweFwiIC8+XG4gICAgfVxuICA8L2Rpdj5cblxuICA8IS0tIFJvd3MgLS0+XG4gIEBmb3IgKHJvdyBvZiByb3dzQXJyYXk7IHRyYWNrIHJvdykge1xuICAgIDxkaXYgY2xhc3M9XCJhdGgtc2tlbGV0b24tdGFibGVfX3Jvd1wiPlxuICAgICAgQGZvciAoY29sIG9mIGNvbHVtbnM7IHRyYWNrIGNvbCkge1xuICAgICAgICA8YXRoLXNrZWxldG9uIHZhcmlhbnQ9XCJ0ZXh0XCIgW3dpZHRoXT1cImNvbCArICclJ1wiIGhlaWdodD1cIjE2cHhcIiAvPlxuICAgICAgfVxuICAgIDwvZGl2PlxuICB9XG48L2Rpdj5cbiIsIjxkaXYgY2xhc3M9XCJhdGgtc2tlbGV0b24tY2FyZFwiPlxuICBAaWYgKHNob3dJbWFnZSkge1xuICAgIDxhdGgtc2tlbGV0b24gdmFyaWFudD1cInJlY3Rhbmd1bGFyXCIgaGVpZ2h0PVwiMTYwcHhcIiAvPlxuICB9XG4gIDxkaXYgY2xhc3M9XCJhdGgtc2tlbGV0b24tY2FyZF9fY29udGVudFwiPlxuICAgIDxhdGgtc2tlbGV0b24gdmFyaWFudD1cInRleHRcIiB3aWR0aD1cIjcwJVwiIGhlaWdodD1cIjI0cHhcIiAvPlxuICAgIDxhdGgtc2tlbGV0b24gdmFyaWFudD1cInRleHRcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxNnB4XCIgLz5cbiAgICA8YXRoLXNrZWxldG9uIHZhcmlhbnQ9XCJ0ZXh0XCIgd2lkdGg9XCI5MCVcIiBoZWlnaHQ9XCIxNnB4XCIgLz5cbiAgICBAaWYgKHNob3dBY3Rpb25zKSB7XG4gICAgICA8ZGl2IGNsYXNzPVwiYXRoLXNrZWxldG9uLWNhcmRfX2FjdGlvbnNcIj5cbiAgICAgICAgPGF0aC1za2VsZXRvbiB2YXJpYW50PVwicmVjdGFuZ3VsYXJcIiB3aWR0aD1cIjgwcHhcIiBoZWlnaHQ9XCIzMnB4XCIgLz5cbiAgICAgICAgPGF0aC1za2VsZXRvbiB2YXJpYW50PVwicmVjdGFuZ3VsYXJcIiB3aWR0aD1cIjgwcHhcIiBoZWlnaHQ9XCIzMnB4XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIH1cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==