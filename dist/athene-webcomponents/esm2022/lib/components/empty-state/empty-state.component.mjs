import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import * as i0 from "@angular/core";
import * as i1 from "lucide-angular";
/**
 * Athene Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 * <ath-empty-state [icon]="Inbox" message="Nothing here" subMessage="…" />
 */
export class AthEmptyStateComponent {
    constructor() {
        /** Empty state message */
        this.message = '';
        /** Optional sub-message */
        this.subMessage = '';
        /** Optional lucide icon shown above the message. */
        this.icon = null;
        /**
         * No frame of its own, for an empty state that already sits inside a
         * panel; the dashed box inside a white panel drew a card in a card.
         */
        this.bare = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthEmptyStateComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthEmptyStateComponent, isStandalone: true, selector: "ath-empty-state", inputs: { message: "message", subMessage: "subMessage", icon: "icon", bare: "bare" }, ngImport: i0, template: "<div class=\"ath-empty-state\" [class.ath-empty-state--bare]=\"bare\">\n  @if (icon) {\n    <span class=\"ath-empty-state__icon\">\n      <lucide-icon [img]=\"icon\" [size]=\"18\" />\n    </span>\n  }\n  <p class=\"ath-empty-state__message\">{{ message }}</p>\n  @if (subMessage) {\n    <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n  }\n  <ng-content />\n</div>\n", styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-10) var(--space-6);text-align:center;border:1px dashed var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-empty-state--bare{border:0;background:transparent}.ath-empty-state__icon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;margin-bottom:var(--space-1);border-radius:var(--r-full);background:var(--surface-3);color:var(--fg-3)}.ath-empty-state__message{margin:0;font-size:var(--text-md);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__sub{margin:0;max-width:44ch;font-size:var(--text-base);line-height:var(--line-normal);color:var(--fg-3)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthEmptyStateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-empty-state', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-empty-state\" [class.ath-empty-state--bare]=\"bare\">\n  @if (icon) {\n    <span class=\"ath-empty-state__icon\">\n      <lucide-icon [img]=\"icon\" [size]=\"18\" />\n    </span>\n  }\n  <p class=\"ath-empty-state__message\">{{ message }}</p>\n  @if (subMessage) {\n    <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n  }\n  <ng-content />\n</div>\n", styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-10) var(--space-6);text-align:center;border:1px dashed var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-empty-state--bare{border:0;background:transparent}.ath-empty-state__icon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;margin-bottom:var(--space-1);border-radius:var(--r-full);background:var(--surface-3);color:var(--fg-3)}.ath-empty-state__message{margin:0;font-size:var(--text-md);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__sub{margin:0;max-width:44ch;font-size:var(--text-base);line-height:var(--line-normal);color:var(--fg-3)}\n"] }]
        }], propDecorators: { message: [{
                type: Input,
                args: [{ required: true }]
            }], subMessage: [{
                type: Input
            }], icon: [{
                type: Input
            }], bare: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHktc3RhdGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL2VtcHR5LXN0YXRlL2VtcHR5LXN0YXRlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9lbXB0eS1zdGF0ZS9lbXB0eS1zdGF0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQVVyRDs7Ozs7Ozs7R0FRRztBQVNILE1BQU0sT0FBTyxzQkFBc0I7SUFSbkM7UUFTRSwwQkFBMEI7UUFDQyxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRXhDLDJCQUEyQjtRQUNsQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXpCLG9EQUFvRDtRQUMzQyxTQUFJLEdBQTBCLElBQUksQ0FBQztRQUU1Qzs7O1dBR0c7UUFDTSxTQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ3ZCOytHQWZZLHNCQUFzQjttR0FBdEIsc0JBQXNCLGlLQzdCbkMsd1hBWUEsMHlCRFlZLFlBQVksOEJBQUUsbUJBQW1COzs0RkFLaEMsc0JBQXNCO2tCQVJsQyxTQUFTOytCQUNFLGlCQUFpQixjQUNmLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxtQkFDM0IsdUJBQXVCLENBQUMsTUFBTTs4QkFNcEIsT0FBTztzQkFBakMsS0FBSzt1QkFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBR2hCLFVBQVU7c0JBQWxCLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQU1HLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTHVjaWRlQW5ndWxhck1vZHVsZSB9IGZyb20gJ2x1Y2lkZS1hbmd1bGFyJztcblxuLyoqXG4gKiBBIGx1Y2lkZSBpY29uJ3MgZGF0YSBwYXlsb2FkLlxuICpcbiAqIGBsdWNpZGUtYW5ndWxhcmAgZG9lcyBub3QgZXhwb3J0IGl0cyBgTHVjaWRlSWNvbkRhdGFgIHR5cGUgcHVibGljbHksXG4gKiBzbyB0aGlzIG1pcnJvcnMgaXRzIHNoYXBlIHJhdGhlciB0aGFuIGxlYWtpbmcgYGFueWAgaW50byB0aGUgQVBJLlxuICovXG5leHBvcnQgdHlwZSBFbXB0eVN0YXRlSWNvbiA9IHJlYWRvbmx5IChyZWFkb25seSBbc3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBudW1iZXI+XSlbXTtcblxuLyoqXG4gKiBBdGhlbmUgRW1wdHkgU3RhdGUgQ29tcG9uZW50XG4gKlxuICogRGlzcGxheSB3aGVuIGxpc3RzIG9yIHRhYmxlcyBoYXZlIG5vIGRhdGEuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtZW1wdHktc3RhdGUgbWVzc2FnZT1cIk5vIGl0ZW1zIGZvdW5kXCIgLz5cbiAqIDxhdGgtZW1wdHktc3RhdGUgW2ljb25dPVwiSW5ib3hcIiBtZXNzYWdlPVwiTm90aGluZyBoZXJlXCIgc3ViTWVzc2FnZT1cIuKAplwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1lbXB0eS1zdGF0ZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEx1Y2lkZUFuZ3VsYXJNb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL2VtcHR5LXN0YXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2VtcHR5LXN0YXRlLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoRW1wdHlTdGF0ZUNvbXBvbmVudCB7XG4gIC8qKiBFbXB0eSBzdGF0ZSBtZXNzYWdlICovXG4gIEBJbnB1dCh7IHJlcXVpcmVkOiB0cnVlIH0pIG1lc3NhZ2UgPSAnJztcblxuICAvKiogT3B0aW9uYWwgc3ViLW1lc3NhZ2UgKi9cbiAgQElucHV0KCkgc3ViTWVzc2FnZSA9ICcnO1xuXG4gIC8qKiBPcHRpb25hbCBsdWNpZGUgaWNvbiBzaG93biBhYm92ZSB0aGUgbWVzc2FnZS4gKi9cbiAgQElucHV0KCkgaWNvbjogRW1wdHlTdGF0ZUljb24gfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogTm8gZnJhbWUgb2YgaXRzIG93biwgZm9yIGFuIGVtcHR5IHN0YXRlIHRoYXQgYWxyZWFkeSBzaXRzIGluc2lkZSBhXG4gICAqIHBhbmVsOyB0aGUgZGFzaGVkIGJveCBpbnNpZGUgYSB3aGl0ZSBwYW5lbCBkcmV3IGEgY2FyZCBpbiBhIGNhcmQuXG4gICAqL1xuICBASW5wdXQoKSBiYXJlID0gZmFsc2U7XG59XG4iLCI8ZGl2IGNsYXNzPVwiYXRoLWVtcHR5LXN0YXRlXCIgW2NsYXNzLmF0aC1lbXB0eS1zdGF0ZS0tYmFyZV09XCJiYXJlXCI+XG4gIEBpZiAoaWNvbikge1xuICAgIDxzcGFuIGNsYXNzPVwiYXRoLWVtcHR5LXN0YXRlX19pY29uXCI+XG4gICAgICA8bHVjaWRlLWljb24gW2ltZ109XCJpY29uXCIgW3NpemVdPVwiMThcIiAvPlxuICAgIDwvc3Bhbj5cbiAgfVxuICA8cCBjbGFzcz1cImF0aC1lbXB0eS1zdGF0ZV9fbWVzc2FnZVwiPnt7IG1lc3NhZ2UgfX08L3A+XG4gIEBpZiAoc3ViTWVzc2FnZSkge1xuICAgIDxwIGNsYXNzPVwiYXRoLWVtcHR5LXN0YXRlX19zdWJcIj57eyBzdWJNZXNzYWdlIH19PC9wPlxuICB9XG4gIDxuZy1jb250ZW50IC8+XG48L2Rpdj5cbiJdfQ==