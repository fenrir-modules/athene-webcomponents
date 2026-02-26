import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Athene Section Component
 *
 * Card-based section with title, description and content.
 *
 * @example
 * <ath-section title="General" description="Basic settings">
 *   <form>...</form>
 * </ath-section>
 */
export class AthSectionComponent {
    constructor() {
        /** Section title */
        this.title = '';
        /** Section description */
        this.description = '';
        /** Collapsible state */
        this.collapsible = false;
        /** Expanded state (for collapsible) */
        this.expanded = true;
    }
    toggle() {
        if (this.collapsible) {
            this.expanded = !this.expanded;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSectionComponent, isStandalone: true, selector: "ath-section", inputs: { title: "title", description: "description", collapsible: "collapsible", expanded: "expanded" }, ngImport: i0, template: "<section class=\"ath-section\" [class.ath-section--collapsed]=\"collapsible && !expanded\">\n  <header class=\"ath-section__header\" (click)=\"toggle()\">\n    <div class=\"ath-section__text\">\n      <h2 class=\"ath-section__title\">{{ title }}</h2>\n      @if (description) {\n        <p class=\"ath-section__description\">{{ description }}</p>\n      }\n    </div>\n    <div class=\"ath-section__actions\">\n      <ng-content select=\"[slot=actions]\" />\n    </div>\n  </header>\n  @if (!collapsible || expanded) {\n    <div class=\"ath-section__content\">\n      <ng-content />\n    </div>\n  }\n</section>\n", styles: [".ath-section{background:var(--ath-bg-panel);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);overflow:hidden}.ath-section__header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-4);padding:var(--ath-space-4) var(--ath-space-5);border-bottom:1px solid var(--ath-border-color)}.ath-section__text{flex:1;min-width:0}.ath-section__title{margin:0;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight)}.ath-section__description{margin:2px 0 0;font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);line-height:var(--ath-line-height-tight)}.ath-section__actions{display:flex;align-items:center;gap:var(--ath-space-2);flex-shrink:0}.ath-section__content{padding:var(--ath-space-5)}.ath-section--collapsed .ath-section__header{border-bottom:none;cursor:pointer}.ath-section--collapsed .ath-section__header:hover{background:#ffffff05}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-section', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"ath-section\" [class.ath-section--collapsed]=\"collapsible && !expanded\">\n  <header class=\"ath-section__header\" (click)=\"toggle()\">\n    <div class=\"ath-section__text\">\n      <h2 class=\"ath-section__title\">{{ title }}</h2>\n      @if (description) {\n        <p class=\"ath-section__description\">{{ description }}</p>\n      }\n    </div>\n    <div class=\"ath-section__actions\">\n      <ng-content select=\"[slot=actions]\" />\n    </div>\n  </header>\n  @if (!collapsible || expanded) {\n    <div class=\"ath-section__content\">\n      <ng-content />\n    </div>\n  }\n</section>\n", styles: [".ath-section{background:var(--ath-bg-panel);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);overflow:hidden}.ath-section__header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-4);padding:var(--ath-space-4) var(--ath-space-5);border-bottom:1px solid var(--ath-border-color)}.ath-section__text{flex:1;min-width:0}.ath-section__title{margin:0;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight)}.ath-section__description{margin:2px 0 0;font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);line-height:var(--ath-line-height-tight)}.ath-section__actions{display:flex;align-items:center;gap:var(--ath-space-2);flex-shrink:0}.ath-section__content{padding:var(--ath-space-5)}.ath-section--collapsed .ath-section__header{border-bottom:none;cursor:pointer}.ath-section--collapsed .ath-section__header:hover{background:#ffffff05}\n"] }]
        }], propDecorators: { title: [{
                type: Input,
                args: [{ required: true }]
            }], description: [{
                type: Input
            }], collapsible: [{
                type: Input
            }], expanded: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvc2VjdGlvbi9zZWN0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zZWN0aW9uL3NlY3Rpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUUvQzs7Ozs7Ozs7O0dBU0c7QUFTSCxNQUFNLE9BQU8sbUJBQW1CO0lBUmhDO1FBU0Usb0JBQW9CO1FBQ08sVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUV0QywwQkFBMEI7UUFDakIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFFMUIsd0JBQXdCO1FBQ2YsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFN0IsdUNBQXVDO1FBQzlCLGFBQVEsR0FBRyxJQUFJLENBQUM7S0FPMUI7SUFMQyxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQztJQUNILENBQUM7K0dBakJVLG1CQUFtQjttR0FBbkIsbUJBQW1CLGlMQ3JCaEMsdW1CQWtCQSxvaUNERlksWUFBWTs7NEZBS1gsbUJBQW1CO2tCQVIvQixTQUFTOytCQUNFLGFBQWEsY0FDWCxJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFNcEIsS0FBSztzQkFBL0IsS0FBSzt1QkFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBR2hCLFdBQVc7c0JBQW5CLEtBQUs7Z0JBR0csV0FBVztzQkFBbkIsS0FBSztnQkFHRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogQXRoZW5lIFNlY3Rpb24gQ29tcG9uZW50XG4gKlxuICogQ2FyZC1iYXNlZCBzZWN0aW9uIHdpdGggdGl0bGUsIGRlc2NyaXB0aW9uIGFuZCBjb250ZW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXNlY3Rpb24gdGl0bGU9XCJHZW5lcmFsXCIgZGVzY3JpcHRpb249XCJCYXNpYyBzZXR0aW5nc1wiPlxuICogICA8Zm9ybT4uLi48L2Zvcm0+XG4gKiA8L2F0aC1zZWN0aW9uPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtc2VjdGlvbicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vc2VjdGlvbi5jb21wb25lbnQuc2NzcycsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFNlY3Rpb25Db21wb25lbnQge1xuICAvKiogU2VjdGlvbiB0aXRsZSAqL1xuICBASW5wdXQoeyByZXF1aXJlZDogdHJ1ZSB9KSB0aXRsZSA9ICcnO1xuXG4gIC8qKiBTZWN0aW9uIGRlc2NyaXB0aW9uICovXG4gIEBJbnB1dCgpIGRlc2NyaXB0aW9uID0gJyc7XG5cbiAgLyoqIENvbGxhcHNpYmxlIHN0YXRlICovXG4gIEBJbnB1dCgpIGNvbGxhcHNpYmxlID0gZmFsc2U7XG5cbiAgLyoqIEV4cGFuZGVkIHN0YXRlIChmb3IgY29sbGFwc2libGUpICovXG4gIEBJbnB1dCgpIGV4cGFuZGVkID0gdHJ1ZTtcblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sbGFwc2libGUpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB9XG4gIH1cbn1cbiIsIjxzZWN0aW9uIGNsYXNzPVwiYXRoLXNlY3Rpb25cIiBbY2xhc3MuYXRoLXNlY3Rpb24tLWNvbGxhcHNlZF09XCJjb2xsYXBzaWJsZSAmJiAhZXhwYW5kZWRcIj5cbiAgPGhlYWRlciBjbGFzcz1cImF0aC1zZWN0aW9uX19oZWFkZXJcIiAoY2xpY2spPVwidG9nZ2xlKClcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYXRoLXNlY3Rpb25fX3RleHRcIj5cbiAgICAgIDxoMiBjbGFzcz1cImF0aC1zZWN0aW9uX190aXRsZVwiPnt7IHRpdGxlIH19PC9oMj5cbiAgICAgIEBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgPHAgY2xhc3M9XCJhdGgtc2VjdGlvbl9fZGVzY3JpcHRpb25cIj57eyBkZXNjcmlwdGlvbiB9fTwvcD5cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYXRoLXNlY3Rpb25fX2FjdGlvbnNcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIltzbG90PWFjdGlvbnNdXCIgLz5cbiAgICA8L2Rpdj5cbiAgPC9oZWFkZXI+XG4gIEBpZiAoIWNvbGxhcHNpYmxlIHx8IGV4cGFuZGVkKSB7XG4gICAgPGRpdiBjbGFzcz1cImF0aC1zZWN0aW9uX19jb250ZW50XCI+XG4gICAgICA8bmctY29udGVudCAvPlxuICAgIDwvZGl2PlxuICB9XG48L3NlY3Rpb24+XG4iXX0=