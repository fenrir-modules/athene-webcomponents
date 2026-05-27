import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Vertical timeline container with connecting rail.
 * Wraps `<ath-timeline-entry>` and `<ath-timeline-event>` items.
 *
 * @example
 * <ath-timeline>
 *   <ath-timeline-entry author="Mira Voss" avatarName="Mira Voss" [whenMinutes]="48">
 *     <p>Pushed first pass to a feature branch.</p>
 *   </ath-timeline-entry>
 *   <ath-timeline-event statusColor="var(--green)">
 *     <b>Mira</b> moved this to In Progress · 2d ago
 *   </ath-timeline-event>
 * </ath-timeline>
 */
export class AthTimelineComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthTimelineComponent, isStandalone: true, selector: "ath-timeline", ngImport: i0, template: "<ng-content />\n", styles: [":host{display:block;position:relative}:host:before{content:\"\";position:absolute;left:12px;top:8px;bottom:8px;width:1px;background:var(--border-faint);pointer-events:none}::ng-deep ath-timeline-entry,::ng-deep ath-timeline-event{display:block;position:relative}::ng-deep ath-timeline-entry+ath-timeline-entry,::ng-deep ath-timeline-entry+ath-timeline-event,::ng-deep ath-timeline-event+ath-timeline-entry,::ng-deep ath-timeline-event+ath-timeline-event{margin-top:12px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timeline', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content />\n", styles: [":host{display:block;position:relative}:host:before{content:\"\";position:absolute;left:12px;top:8px;bottom:8px;width:1px;background:var(--border-faint);pointer-events:none}::ng-deep ath-timeline-entry,::ng-deep ath-timeline-event{display:block;position:relative}::ng-deep ath-timeline-entry+ath-timeline-entry,::ng-deep ath-timeline-entry+ath-timeline-event,::ng-deep ath-timeline-event+ath-timeline-entry,::ng-deep ath-timeline-event+ath-timeline-event{margin-top:12px}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL3RpbWVsaW5lL3RpbWVsaW5lLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy90aW1lbGluZS90aW1lbGluZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFL0M7Ozs7Ozs7Ozs7Ozs7R0FhRztBQVNILE1BQU0sT0FBTyxvQkFBb0I7K0dBQXBCLG9CQUFvQjttR0FBcEIsb0JBQW9CLHdFQ3pCakMsa0JBQ0EsaWhCRG1CWSxZQUFZOzs0RkFLWCxvQkFBb0I7a0JBUmhDLFNBQVM7K0JBQ0UsY0FBYyxjQUNaLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxtQkFDTix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBWZXJ0aWNhbCB0aW1lbGluZSBjb250YWluZXIgd2l0aCBjb25uZWN0aW5nIHJhaWwuXG4gKiBXcmFwcyBgPGF0aC10aW1lbGluZS1lbnRyeT5gIGFuZCBgPGF0aC10aW1lbGluZS1ldmVudD5gIGl0ZW1zLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXRpbWVsaW5lPlxuICogICA8YXRoLXRpbWVsaW5lLWVudHJ5IGF1dGhvcj1cIk1pcmEgVm9zc1wiIGF2YXRhck5hbWU9XCJNaXJhIFZvc3NcIiBbd2hlbk1pbnV0ZXNdPVwiNDhcIj5cbiAqICAgICA8cD5QdXNoZWQgZmlyc3QgcGFzcyB0byBhIGZlYXR1cmUgYnJhbmNoLjwvcD5cbiAqICAgPC9hdGgtdGltZWxpbmUtZW50cnk+XG4gKiAgIDxhdGgtdGltZWxpbmUtZXZlbnQgc3RhdHVzQ29sb3I9XCJ2YXIoLS1ncmVlbilcIj5cbiAqICAgICA8Yj5NaXJhPC9iPiBtb3ZlZCB0aGlzIHRvIEluIFByb2dyZXNzIMK3IDJkIGFnb1xuICogICA8L2F0aC10aW1lbGluZS1ldmVudD5cbiAqIDwvYXRoLXRpbWVsaW5lPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtdGltZWxpbmUnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lbGluZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi90aW1lbGluZS5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFRpbWVsaW5lQ29tcG9uZW50IHt9XG4iLCI8bmctY29udGVudCAvPlxuIl19