import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Athene Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 */
export class AthEmptyStateComponent {
    constructor() {
        /** Empty state message */
        this.message = '';
        /** Optional sub-message */
        this.subMessage = '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthEmptyStateComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthEmptyStateComponent, isStandalone: true, selector: "ath-empty-state", inputs: { message: "message", subMessage: "subMessage" }, ngImport: i0, template: "<div class=\"ath-empty-state\">\n  <p class=\"ath-empty-state__message\">{{ message }}</p>\n  @if (subMessage) {\n    <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n  }\n  <ng-content />\n</div>\n", styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--ath-space-2);padding:var(--ath-space-10) var(--ath-space-6);text-align:center;border:1px dashed rgba(255,255,255,.08);border-radius:var(--ath-border-radius-lg);background:#ffffff03}.ath-empty-state__message{margin:0;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-secondary)}.ath-empty-state__sub{margin:0;font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthEmptyStateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-empty-state', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-empty-state\">\n  <p class=\"ath-empty-state__message\">{{ message }}</p>\n  @if (subMessage) {\n    <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n  }\n  <ng-content />\n</div>\n", styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--ath-space-2);padding:var(--ath-space-10) var(--ath-space-6);text-align:center;border:1px dashed rgba(255,255,255,.08);border-radius:var(--ath-border-radius-lg);background:#ffffff03}.ath-empty-state__message{margin:0;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-secondary)}.ath-empty-state__sub{margin:0;font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}\n"] }]
        }], propDecorators: { message: [{
                type: Input,
                args: [{ required: true }]
            }], subMessage: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHktc3RhdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2VtcHR5LXN0YXRlL2VtcHR5LXN0YXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9lbXB0eS1zdGF0ZS9lbXB0eS1zdGF0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRS9DOzs7Ozs7O0dBT0c7QUFTSCxNQUFNLE9BQU8sc0JBQXNCO0lBUm5DO1FBU0UsMEJBQTBCO1FBQ0MsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUV4QywyQkFBMkI7UUFDbEIsZUFBVSxHQUFHLEVBQUUsQ0FBQztLQUMxQjsrR0FOWSxzQkFBc0I7bUdBQXRCLHNCQUFzQixxSUNuQm5DLCtNQU9BLHVrQkRPWSxZQUFZOzs0RkFLWCxzQkFBc0I7a0JBUmxDLFNBQVM7K0JBQ0UsaUJBQWlCLGNBQ2YsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUNOLHVCQUF1QixDQUFDLE1BQU07OEJBTXBCLE9BQU87c0JBQWpDLEtBQUs7dUJBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO2dCQUdoQixVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogQXRoZW5lIEVtcHR5IFN0YXRlIENvbXBvbmVudFxuICpcbiAqIERpc3BsYXkgd2hlbiBsaXN0cyBvciB0YWJsZXMgaGF2ZSBubyBkYXRhLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLWVtcHR5LXN0YXRlIG1lc3NhZ2U9XCJObyBpdGVtcyBmb3VuZFwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1lbXB0eS1zdGF0ZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2VtcHR5LXN0YXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2VtcHR5LXN0YXRlLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoRW1wdHlTdGF0ZUNvbXBvbmVudCB7XG4gIC8qKiBFbXB0eSBzdGF0ZSBtZXNzYWdlICovXG4gIEBJbnB1dCh7IHJlcXVpcmVkOiB0cnVlIH0pIG1lc3NhZ2UgPSAnJztcblxuICAvKiogT3B0aW9uYWwgc3ViLW1lc3NhZ2UgKi9cbiAgQElucHV0KCkgc3ViTWVzc2FnZSA9ICcnO1xufVxuIiwiPGRpdiBjbGFzcz1cImF0aC1lbXB0eS1zdGF0ZVwiPlxuICA8cCBjbGFzcz1cImF0aC1lbXB0eS1zdGF0ZV9fbWVzc2FnZVwiPnt7IG1lc3NhZ2UgfX08L3A+XG4gIEBpZiAoc3ViTWVzc2FnZSkge1xuICAgIDxwIGNsYXNzPVwiYXRoLWVtcHR5LXN0YXRlX19zdWJcIj57eyBzdWJNZXNzYWdlIH19PC9wPlxuICB9XG4gIDxuZy1jb250ZW50IC8+XG48L2Rpdj5cbiJdfQ==