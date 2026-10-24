import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AthKpiStripComponent, AthKpiTileComponent } from '../kpi-tile';
import * as i0 from "@angular/core";
/**
 * A single label/value card.
 *
 * @deprecated One KPI API: use `ath-kpi-tile` inside `ath-kpi-strip`. This
 * renders exactly that (a strip of one tile) and maps the old inputs:
 * `subValue` → `note`, `sparkData` → `spark`, `trend` → a "↑"/"↓" delta.
 * Removed in quality step 2.7.
 *
 * @example
 * <ath-stat-card label="Open" value="42" delta="+5" deltaDirection="up" />
 */
export class AthStatCardComponent {
    constructor() {
        this.label = input.required();
        this.value = input('');
        this.subValue = input('');
        this.trend = input(null);
        this.delta = input(null);
        this.deltaDirection = input(null);
        this.sparkData = input(null);
        this.sparkColor = input(null);
        this.shownDelta = computed(() => {
            const delta = this.delta();
            if (delta != null)
                return delta;
            const trend = this.trend();
            return trend ? (trend === 'up' ? '↑' : '↓') : null;
        });
        this.shownDirection = computed(() => this.deltaDirection() ?? this.trend() ?? null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthStatCardComponent, isStandalone: true, selector: "ath-stat-card", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, subValue: { classPropertyName: "subValue", publicName: "subValue", isSignal: true, isRequired: false, transformFunction: null }, trend: { classPropertyName: "trend", publicName: "trend", isSignal: true, isRequired: false, transformFunction: null }, delta: { classPropertyName: "delta", publicName: "delta", isSignal: true, isRequired: false, transformFunction: null }, deltaDirection: { classPropertyName: "deltaDirection", publicName: "deltaDirection", isSignal: true, isRequired: false, transformFunction: null }, sparkData: { classPropertyName: "sparkData", publicName: "sparkData", isSignal: true, isRequired: false, transformFunction: null }, sparkColor: { classPropertyName: "sparkColor", publicName: "sparkColor", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <ath-kpi-strip [columns]="1">
      <ath-kpi-tile
        [label]="label()"
        [value]="value()"
        [delta]="shownDelta()"
        [deltaDirection]="shownDirection()"
        [note]="subValue() || null"
        [spark]="sparkData()"
        [sparkColor]="sparkColor()"
      />
    </ath-kpi-strip>
  `, isInline: true, styles: [":host{display:block}\n"], dependencies: [{ kind: "component", type: AthKpiStripComponent, selector: "ath-kpi-strip", inputs: ["columns"] }, { kind: "component", type: AthKpiTileComponent, selector: "ath-kpi-tile", inputs: ["label", "value", "delta", "deltaDirection", "deltaTitle", "tone", "spark", "sparkData", "sparkColor", "note", "noteTitle", "alert", "muted", "link", "linkParams", "linkLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-stat-card', standalone: true, imports: [AthKpiStripComponent, AthKpiTileComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <ath-kpi-strip [columns]="1">
      <ath-kpi-tile
        [label]="label()"
        [value]="value()"
        [delta]="shownDelta()"
        [deltaDirection]="shownDirection()"
        [note]="subValue() || null"
        [spark]="sparkData()"
        [sparkColor]="sparkColor()"
      />
    </ath-kpi-strip>
  `, styles: [":host{display:block}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdC1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9zdGF0LWNhcmQvc3RhdC1jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUEwQixNQUFNLGFBQWEsQ0FBQzs7QUFFaEc7Ozs7Ozs7Ozs7R0FVRztBQXlCSCxNQUFNLE9BQU8sb0JBQW9CO0lBeEJqQztRQXlCVyxVQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBVSxDQUFDO1FBQ2pDLFVBQUssR0FBRyxLQUFLLENBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLGFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsVUFBSyxHQUFHLEtBQUssQ0FBdUIsSUFBSSxDQUFDLENBQUM7UUFDMUMsVUFBSyxHQUFHLEtBQUssQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDbkMsbUJBQWMsR0FBRyxLQUFLLENBQTJCLElBQUksQ0FBQyxDQUFDO1FBQ3ZELGNBQVMsR0FBRyxLQUFLLENBQTJCLElBQUksQ0FBQyxDQUFDO1FBQ2xELGVBQVUsR0FBRyxLQUFLLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBRTlCLGVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQzVDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzQixJQUFJLEtBQUssSUFBSSxJQUFJO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQ2hDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzQixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFFZ0IsbUJBQWMsR0FBRyxRQUFRLENBQzFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksSUFBSSxDQUNwRCxDQUFDO0tBQ0g7K0dBcEJZLG9CQUFvQjttR0FBcEIsb0JBQW9CLG1sQ0FuQnJCOzs7Ozs7Ozs7Ozs7R0FZVCxnR0FkUyxvQkFBb0IsK0VBQUUsbUJBQW1COzs0RkFxQnhDLG9CQUFvQjtrQkF4QmhDLFNBQVM7K0JBQ0UsZUFBZSxjQUNiLElBQUksV0FDUCxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixDQUFDLG1CQUNuQyx1QkFBdUIsQ0FBQyxNQUFNLFlBQ3JDOzs7Ozs7Ozs7Ozs7R0FZVCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIGNvbXB1dGVkLCBpbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXRoS3BpU3RyaXBDb21wb25lbnQsIEF0aEtwaVRpbGVDb21wb25lbnQsIHR5cGUgS3BpRGVsdGFEaXJlY3Rpb24gfSBmcm9tICcuLi9rcGktdGlsZSc7XG5cbi8qKlxuICogQSBzaW5nbGUgbGFiZWwvdmFsdWUgY2FyZC5cbiAqXG4gKiBAZGVwcmVjYXRlZCBPbmUgS1BJIEFQSTogdXNlIGBhdGgta3BpLXRpbGVgIGluc2lkZSBgYXRoLWtwaS1zdHJpcGAuIFRoaXNcbiAqIHJlbmRlcnMgZXhhY3RseSB0aGF0IChhIHN0cmlwIG9mIG9uZSB0aWxlKSBhbmQgbWFwcyB0aGUgb2xkIGlucHV0czpcbiAqIGBzdWJWYWx1ZWAg4oaSIGBub3RlYCwgYHNwYXJrRGF0YWAg4oaSIGBzcGFya2AsIGB0cmVuZGAg4oaSIGEgXCLihpFcIi9cIuKGk1wiIGRlbHRhLlxuICogUmVtb3ZlZCBpbiBxdWFsaXR5IHN0ZXAgMi43LlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXN0YXQtY2FyZCBsYWJlbD1cIk9wZW5cIiB2YWx1ZT1cIjQyXCIgZGVsdGE9XCIrNVwiIGRlbHRhRGlyZWN0aW9uPVwidXBcIiAvPlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhdGgtc3RhdC1jYXJkJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0F0aEtwaVN0cmlwQ29tcG9uZW50LCBBdGhLcGlUaWxlQ29tcG9uZW50XSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGF0aC1rcGktc3RyaXAgW2NvbHVtbnNdPVwiMVwiPlxuICAgICAgPGF0aC1rcGktdGlsZVxuICAgICAgICBbbGFiZWxdPVwibGFiZWwoKVwiXG4gICAgICAgIFt2YWx1ZV09XCJ2YWx1ZSgpXCJcbiAgICAgICAgW2RlbHRhXT1cInNob3duRGVsdGEoKVwiXG4gICAgICAgIFtkZWx0YURpcmVjdGlvbl09XCJzaG93bkRpcmVjdGlvbigpXCJcbiAgICAgICAgW25vdGVdPVwic3ViVmFsdWUoKSB8fCBudWxsXCJcbiAgICAgICAgW3NwYXJrXT1cInNwYXJrRGF0YSgpXCJcbiAgICAgICAgW3NwYXJrQ29sb3JdPVwic3BhcmtDb2xvcigpXCJcbiAgICAgIC8+XG4gICAgPC9hdGgta3BpLXN0cmlwPlxuICBgLFxuICBzdHlsZXM6IGBcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEF0aFN0YXRDYXJkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgbGFiZWwgPSBpbnB1dC5yZXF1aXJlZDxzdHJpbmc+KCk7XG4gIHJlYWRvbmx5IHZhbHVlID0gaW5wdXQ8c3RyaW5nIHwgbnVtYmVyPignJyk7XG4gIHJlYWRvbmx5IHN1YlZhbHVlID0gaW5wdXQoJycpO1xuICByZWFkb25seSB0cmVuZCA9IGlucHV0PCd1cCcgfCAnZG93bicgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZGVsdGEgPSBpbnB1dDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZGVsdGFEaXJlY3Rpb24gPSBpbnB1dDxLcGlEZWx0YURpcmVjdGlvbiB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBzcGFya0RhdGEgPSBpbnB1dDxyZWFkb25seSBudW1iZXJbXSB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBzcGFya0NvbG9yID0gaW5wdXQ8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNob3duRGVsdGEgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgZGVsdGEgPSB0aGlzLmRlbHRhKCk7XG4gICAgaWYgKGRlbHRhICE9IG51bGwpIHJldHVybiBkZWx0YTtcbiAgICBjb25zdCB0cmVuZCA9IHRoaXMudHJlbmQoKTtcbiAgICByZXR1cm4gdHJlbmQgPyAodHJlbmQgPT09ICd1cCcgPyAn4oaRJyA6ICfihpMnKSA6IG51bGw7XG4gIH0pO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzaG93bkRpcmVjdGlvbiA9IGNvbXB1dGVkPEtwaURlbHRhRGlyZWN0aW9uIHwgbnVsbD4oXG4gICAgKCkgPT4gdGhpcy5kZWx0YURpcmVjdGlvbigpID8/IHRoaXMudHJlbmQoKSA/PyBudWxsXG4gICk7XG59XG4iXX0=