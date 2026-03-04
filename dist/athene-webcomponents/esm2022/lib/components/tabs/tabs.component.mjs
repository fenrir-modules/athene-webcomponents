import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Athene Tabs Component
 *
 * Tab navigation for switching between content sections.
 *
 * @example
 * <ath-tabs [tabs]="tabs" [activeTab]="activeTab" (tabChanged)="activeTab = $event" />
 */
export class AthTabsComponent {
    constructor() {
        /** Tab items */
        this.tabs = [];
        /** Currently active tab ID */
        this.activeTab = '';
        /** Tab change event */
        this.tabChanged = new EventEmitter();
    }
    selectTab(tab) {
        if (!tab.disabled && tab.id !== this.activeTab) {
            this.tabChanged.emit(tab.id);
        }
    }
    getTabClasses(tab) {
        return [
            'ath-tabs__tab',
            tab.id === this.activeTab ? 'ath-tabs__tab--active' : '',
            tab.disabled ? 'ath-tabs__tab--disabled' : '',
        ].filter(Boolean).join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTabsComponent, isStandalone: true, selector: "ath-tabs", inputs: { tabs: "tabs", activeTab: "activeTab" }, outputs: { tabChanged: "tabChanged" }, ngImport: i0, template: "<div class=\"ath-tabs\" role=\"tablist\">\n  @for (tab of tabs; track tab.id) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n    >\n      {{ tab.label }}\n    </button>\n  }\n</div>\n", styles: [".ath-tabs{display:flex;gap:0;border-bottom:1px solid var(--ath-border-color)}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-tertiary);background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;cursor:pointer;transition:all var(--ath-transition-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--ath-text-primary)}.ath-tabs__tab--active{color:var(--ath-color-primary);border-bottom-color:var(--ath-color-primary)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--ath-color-primary)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--ath-border-color-focus);border-radius:var(--ath-border-radius-sm) var(--ath-border-radius-sm) 0 0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-tabs', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-tabs\" role=\"tablist\">\n  @for (tab of tabs; track tab.id) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n    >\n      {{ tab.label }}\n    </button>\n  }\n</div>\n", styles: [".ath-tabs{display:flex;gap:0;border-bottom:1px solid var(--ath-border-color)}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-tertiary);background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;cursor:pointer;transition:all var(--ath-transition-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--ath-text-primary)}.ath-tabs__tab--active{color:var(--ath-color-primary);border-bottom-color:var(--ath-color-primary)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--ath-color-primary)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--ath-border-color-focus);border-radius:var(--ath-border-radius-sm) var(--ath-border-radius-sm) 0 0}\n"] }]
        }], propDecorators: { tabs: [{
                type: Input
            }], activeTab: [{
                type: Input
            }], tabChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvdGFicy90YWJzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy90YWJzL3RhYnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBVy9DOzs7Ozs7O0dBT0c7QUFTSCxNQUFNLE9BQU8sZ0JBQWdCO0lBUjdCO1FBU0UsZ0JBQWdCO1FBQ1AsU0FBSSxHQUFjLEVBQUUsQ0FBQztRQUU5Qiw4QkFBOEI7UUFDckIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUV4Qix1QkFBdUI7UUFDYixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztLQWVuRDtJQWJDLFNBQVMsQ0FBQyxHQUFZO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFZO1FBQ3hCLE9BQU87WUFDTCxlQUFlO1lBQ2YsR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN4RCxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUM5QyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQzsrR0F0QlUsZ0JBQWdCO21HQUFoQixnQkFBZ0IsNkpDNUI3QixxV0FjQSwrL0JEU1ksWUFBWTs7NEZBS1gsZ0JBQWdCO2tCQVI1QixTQUFTOytCQUNFLFVBQVUsY0FDUixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFNdEMsSUFBSTtzQkFBWixLQUFLO2dCQUdHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0ksVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLyoqXG4gKiBUYWIgaXRlbSBkZWZpbml0aW9uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVGFiSXRlbSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBdGhlbmUgVGFicyBDb21wb25lbnRcbiAqXG4gKiBUYWIgbmF2aWdhdGlvbiBmb3Igc3dpdGNoaW5nIGJldHdlZW4gY29udGVudCBzZWN0aW9ucy5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGF0aC10YWJzIFt0YWJzXT1cInRhYnNcIiBbYWN0aXZlVGFiXT1cImFjdGl2ZVRhYlwiICh0YWJDaGFuZ2VkKT1cImFjdGl2ZVRhYiA9ICRldmVudFwiIC8+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC10YWJzJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFicy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi90YWJzLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoVGFic0NvbXBvbmVudCB7XG4gIC8qKiBUYWIgaXRlbXMgKi9cbiAgQElucHV0KCkgdGFiczogVGFiSXRlbVtdID0gW107XG5cbiAgLyoqIEN1cnJlbnRseSBhY3RpdmUgdGFiIElEICovXG4gIEBJbnB1dCgpIGFjdGl2ZVRhYiA9ICcnO1xuXG4gIC8qKiBUYWIgY2hhbmdlIGV2ZW50ICovXG4gIEBPdXRwdXQoKSB0YWJDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgc2VsZWN0VGFiKHRhYjogVGFiSXRlbSk6IHZvaWQge1xuICAgIGlmICghdGFiLmRpc2FibGVkICYmIHRhYi5pZCAhPT0gdGhpcy5hY3RpdmVUYWIpIHtcbiAgICAgIHRoaXMudGFiQ2hhbmdlZC5lbWl0KHRhYi5pZCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VGFiQ2xhc3Nlcyh0YWI6IFRhYkl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICAnYXRoLXRhYnNfX3RhYicsXG4gICAgICB0YWIuaWQgPT09IHRoaXMuYWN0aXZlVGFiID8gJ2F0aC10YWJzX190YWItLWFjdGl2ZScgOiAnJyxcbiAgICAgIHRhYi5kaXNhYmxlZCA/ICdhdGgtdGFic19fdGFiLS1kaXNhYmxlZCcgOiAnJyxcbiAgICBdLmZpbHRlcihCb29sZWFuKS5qb2luKCcgJyk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhdGgtdGFic1wiIHJvbGU9XCJ0YWJsaXN0XCI+XG4gIEBmb3IgKHRhYiBvZiB0YWJzOyB0cmFjayB0YWIuaWQpIHtcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgW2NsYXNzXT1cImdldFRhYkNsYXNzZXModGFiKVwiXG4gICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInRhYi5pZCA9PT0gYWN0aXZlVGFiXCJcbiAgICAgIFtkaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdFRhYih0YWIpXCJcbiAgICA+XG4gICAgICB7eyB0YWIubGFiZWwgfX1cbiAgICA8L2J1dHRvbj5cbiAgfVxuPC9kaXY+XG4iXX0=