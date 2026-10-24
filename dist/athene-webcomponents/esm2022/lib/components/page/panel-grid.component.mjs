import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input, } from '@angular/core';
import * as i0 from "@angular/core";
const PRESETS = {
    '1': 'minmax(0, 1fr)',
    '2': 'repeat(2, minmax(0, 1fr))',
    '3': 'repeat(3, minmax(0, 1fr))',
    '4': 'repeat(4, minmax(0, 1fr))',
    'main-side': 'minmax(0, 1fr) minmax(280px, 360px)',
    'side-main': 'minmax(220px, 280px) minmax(0, 1fr)',
};
/** The `grid-template-columns` for a preset or a custom template. */
export function panelGridColumns(columns) {
    return PRESETS[columns] ?? columns;
}
/**
 * Panels in rows that share their height: every panel in a row is as tall
 * as the row (no height mismatch between neighbours), the rows fill the
 * page body, and a panel's body scrolls inside it when the row is shorter.
 * Narrower than 720px (its own width, a container query) the grid stacks
 * into one column with natural heights, and the page scrolls.
 *
 * Panels span columns or rows with `ath-panel [colSpan]` / `[rowSpan]`.
 *
 * @example
 * <ath-panel-grid columns="main-side">
 *   <ath-panel title="Active tickets">…</ath-panel>
 *   <ath-panel title="Due this week">…</ath-panel>
 * </ath-panel-grid>
 * <ath-panel-grid columns="2" rows="auto minmax(0, 1fr)">…</ath-panel-grid>
 */
export class AthPanelGridComponent {
    constructor() {
        this.columns = input('2');
        this.rows = input('fill');
        this.templateColumns = computed(() => panelGridColumns(this.columns()));
        this.rowsMode = computed(() => {
            const rows = this.rows();
            return rows === 'fill' || rows === 'auto' ? rows : 'custom';
        });
        this.templateRows = computed(() => this.rowsMode() === 'custom' ? this.rows() : null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPanelGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthPanelGridComponent, isStandalone: true, selector: "ath-panel-grid", inputs: { columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: false, transformFunction: null }, rows: { classPropertyName: "rows", publicName: "rows", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-rows": "rowsMode()" } }, ngImport: i0, template: `
    <div
      class="ath-panel-grid__track"
      [style.--ath-panel-grid-cols]="templateColumns()"
      [style.grid-template-rows]="templateRows()"
    >
      <ng-content />
    </div>
  `, isInline: true, styles: ["ath-panel-grid{display:flex;flex-direction:column;min-width:0;min-height:0;container:ath-panel-grid/inline-size}.ath-panel-grid__track{--ath-panel-grid-cols: minmax(0, 1fr);display:grid;flex:1 1 auto;min-height:0;gap:var(--section-gap);grid-template-columns:var(--ath-panel-grid-cols);grid-auto-rows:auto;align-content:stretch;align-items:stretch}.ath-panel-grid__track>*{min-width:0;min-height:0}.ath-panel-grid__track>[data-col-span=\"2\"]{grid-column:span 2}.ath-panel-grid__track>[data-col-span=\"3\"]{grid-column:span 3}.ath-panel-grid__track>[data-col-span=\"4\"]{grid-column:span 4}.ath-panel-grid__track>[data-row-span=\"2\"]{grid-row:span 2}.ath-panel-grid__track>[data-row-span=\"3\"]{grid-row:span 3}ath-panel-grid[data-rows=auto]>.ath-panel-grid__track{align-content:start}ath-page[data-mode=fill]>.ath-page__body>ath-panel-grid[data-rows=fill]>.ath-panel-grid__track{grid-auto-rows:minmax(0,1fr)}@container ath-panel-grid (max-width: 720px){.ath-panel-grid__track{grid-template-columns:minmax(0,1fr);grid-template-rows:none!important;grid-auto-rows:auto!important;align-content:start}.ath-panel-grid__track>[data-col-span],.ath-panel-grid__track>[data-row-span]{grid-column:auto;grid-row:auto}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPanelGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-panel-grid', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[attr.data-rows]': 'rowsMode()',
                    }, template: `
    <div
      class="ath-panel-grid__track"
      [style.--ath-panel-grid-cols]="templateColumns()"
      [style.grid-template-rows]="templateRows()"
    >
      <ng-content />
    </div>
  `, styles: ["ath-panel-grid{display:flex;flex-direction:column;min-width:0;min-height:0;container:ath-panel-grid/inline-size}.ath-panel-grid__track{--ath-panel-grid-cols: minmax(0, 1fr);display:grid;flex:1 1 auto;min-height:0;gap:var(--section-gap);grid-template-columns:var(--ath-panel-grid-cols);grid-auto-rows:auto;align-content:stretch;align-items:stretch}.ath-panel-grid__track>*{min-width:0;min-height:0}.ath-panel-grid__track>[data-col-span=\"2\"]{grid-column:span 2}.ath-panel-grid__track>[data-col-span=\"3\"]{grid-column:span 3}.ath-panel-grid__track>[data-col-span=\"4\"]{grid-column:span 4}.ath-panel-grid__track>[data-row-span=\"2\"]{grid-row:span 2}.ath-panel-grid__track>[data-row-span=\"3\"]{grid-row:span 3}ath-panel-grid[data-rows=auto]>.ath-panel-grid__track{align-content:start}ath-page[data-mode=fill]>.ath-page__body>ath-panel-grid[data-rows=fill]>.ath-panel-grid__track{grid-auto-rows:minmax(0,1fr)}@container ath-panel-grid (max-width: 720px){.ath-panel-grid__track{grid-template-columns:minmax(0,1fr);grid-template-rows:none!important;grid-auto-rows:auto!important;align-content:start}.ath-panel-grid__track>[data-col-span],.ath-panel-grid__track>[data-row-span]{grid-column:auto;grid-row:auto}}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvcGFnZS9wYW5lbC1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsUUFBUSxFQUNSLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQzs7QUFpQnZCLE1BQU0sT0FBTyxHQUEyQjtJQUN0QyxHQUFHLEVBQUUsZ0JBQWdCO0lBQ3JCLEdBQUcsRUFBRSwyQkFBMkI7SUFDaEMsR0FBRyxFQUFFLDJCQUEyQjtJQUNoQyxHQUFHLEVBQUUsMkJBQTJCO0lBQ2hDLFdBQVcsRUFBRSxxQ0FBcUM7SUFDbEQsV0FBVyxFQUFFLHFDQUFxQztDQUNuRCxDQUFDO0FBRUYscUVBQXFFO0FBQ3JFLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxPQUF5QjtJQUN4RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUM7QUFDckMsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQXFCSCxNQUFNLE9BQU8scUJBQXFCO0lBcEJsQztRQXFCVyxZQUFPLEdBQUcsS0FBSyxDQUFtQixHQUFHLENBQUMsQ0FBQztRQUN2QyxTQUFJLEdBQUcsS0FBSyxDQUFnQixNQUFNLENBQUMsQ0FBQztRQUUxQixvQkFBZSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25FLGFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQzFDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QixPQUFPLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDZ0IsaUJBQVksR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQzlDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNsRCxDQUFDO0tBQ0g7K0dBWlkscUJBQXFCO21HQUFyQixxQkFBcUIsbVlBWHRCOzs7Ozs7OztHQVFUOzs0RkFHVSxxQkFBcUI7a0JBcEJqQyxTQUFTOytCQUNFLGdCQUFnQixjQUNkLElBQUksbUJBQ0MsdUJBQXVCLENBQUMsTUFBTSxpQkFFaEMsaUJBQWlCLENBQUMsSUFBSSxRQUMvQjt3QkFDSixrQkFBa0IsRUFBRSxZQUFZO3FCQUNqQyxZQUNTOzs7Ozs7OztHQVFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIGNvbXB1dGVkLFxuICBpbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29sdW1uIHByZXNldHMgb2YgYGF0aC1wYW5lbC1ncmlkYDsgYW55IG90aGVyIHN0cmluZyBpcyB1c2VkIGFzXG4gKiBgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zYCBhcyBnaXZlbi5cbiAqL1xuZXhwb3J0IHR5cGUgUGFuZWxHcmlkQ29sdW1ucyA9ICcxJyB8ICcyJyB8ICczJyB8ICc0JyB8ICdtYWluLXNpZGUnIHwgJ3NpZGUtbWFpbicgfCAoc3RyaW5nICYge30pO1xuXG4vKipcbiAqIC0gYGZpbGxgIChkZWZhdWx0KTogcm93cyBzaGFyZSB0aGUgaGVpZ2h0LiBJbiBhIGZpbGwgcGFnZSBlYWNoIHJvdyBnZXRzXG4gKiAgIGFuIGVxdWFsIHBhcnQgYW5kIHRoZSBwYW5lbHMgc2Nyb2xsIGluc2lkZTsgaW4gYSBzY3JvbGwgcGFnZSByb3dzIGFyZVxuICogICBhcyB0YWxsIGFzIHRoZWlyIGNvbnRlbnQgYW5kIHN0cmV0Y2ggdG8gdGhlIGJvdHRvbSB3aGVuIGl0IGlzIHNob3J0LlxuICogLSBgYXV0b2A6IG5hdHVyYWwgcm93IGhlaWdodHMsIG5vIHN0cmV0Y2hpbmcuXG4gKiAtIGFueSBvdGhlciBzdHJpbmc6IGBncmlkLXRlbXBsYXRlLXJvd3NgIGFzIGdpdmVuIChlLmcuIGBhdXRvIG1pbm1heCgwLCAxZnIpYCkuXG4gKi9cbmV4cG9ydCB0eXBlIFBhbmVsR3JpZFJvd3MgPSAnZmlsbCcgfCAnYXV0bycgfCAoc3RyaW5nICYge30pO1xuXG5jb25zdCBQUkVTRVRTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAnMSc6ICdtaW5tYXgoMCwgMWZyKScsXG4gICcyJzogJ3JlcGVhdCgyLCBtaW5tYXgoMCwgMWZyKSknLFxuICAnMyc6ICdyZXBlYXQoMywgbWlubWF4KDAsIDFmcikpJyxcbiAgJzQnOiAncmVwZWF0KDQsIG1pbm1heCgwLCAxZnIpKScsXG4gICdtYWluLXNpZGUnOiAnbWlubWF4KDAsIDFmcikgbWlubWF4KDI4MHB4LCAzNjBweCknLFxuICAnc2lkZS1tYWluJzogJ21pbm1heCgyMjBweCwgMjgwcHgpIG1pbm1heCgwLCAxZnIpJyxcbn07XG5cbi8qKiBUaGUgYGdyaWQtdGVtcGxhdGUtY29sdW1uc2AgZm9yIGEgcHJlc2V0IG9yIGEgY3VzdG9tIHRlbXBsYXRlLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhbmVsR3JpZENvbHVtbnMoY29sdW1uczogUGFuZWxHcmlkQ29sdW1ucyk6IHN0cmluZyB7XG4gIHJldHVybiBQUkVTRVRTW2NvbHVtbnNdID8/IGNvbHVtbnM7XG59XG5cbi8qKlxuICogUGFuZWxzIGluIHJvd3MgdGhhdCBzaGFyZSB0aGVpciBoZWlnaHQ6IGV2ZXJ5IHBhbmVsIGluIGEgcm93IGlzIGFzIHRhbGxcbiAqIGFzIHRoZSByb3cgKG5vIGhlaWdodCBtaXNtYXRjaCBiZXR3ZWVuIG5laWdoYm91cnMpLCB0aGUgcm93cyBmaWxsIHRoZVxuICogcGFnZSBib2R5LCBhbmQgYSBwYW5lbCdzIGJvZHkgc2Nyb2xscyBpbnNpZGUgaXQgd2hlbiB0aGUgcm93IGlzIHNob3J0ZXIuXG4gKiBOYXJyb3dlciB0aGFuIDcyMHB4IChpdHMgb3duIHdpZHRoLCBhIGNvbnRhaW5lciBxdWVyeSkgdGhlIGdyaWQgc3RhY2tzXG4gKiBpbnRvIG9uZSBjb2x1bW4gd2l0aCBuYXR1cmFsIGhlaWdodHMsIGFuZCB0aGUgcGFnZSBzY3JvbGxzLlxuICpcbiAqIFBhbmVscyBzcGFuIGNvbHVtbnMgb3Igcm93cyB3aXRoIGBhdGgtcGFuZWwgW2NvbFNwYW5dYCAvIGBbcm93U3Bhbl1gLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXBhbmVsLWdyaWQgY29sdW1ucz1cIm1haW4tc2lkZVwiPlxuICogICA8YXRoLXBhbmVsIHRpdGxlPVwiQWN0aXZlIHRpY2tldHNcIj7igKY8L2F0aC1wYW5lbD5cbiAqICAgPGF0aC1wYW5lbCB0aXRsZT1cIkR1ZSB0aGlzIHdlZWtcIj7igKY8L2F0aC1wYW5lbD5cbiAqIDwvYXRoLXBhbmVsLWdyaWQ+XG4gKiA8YXRoLXBhbmVsLWdyaWQgY29sdW1ucz1cIjJcIiByb3dzPVwiYXV0byBtaW5tYXgoMCwgMWZyKVwiPuKApjwvYXRoLXBhbmVsLWdyaWQ+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1wYW5lbC1ncmlkJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIC8vIEdsb2JhbCAoZWxlbWVudC1zY29wZWQpIHN0eWxlczogdGhlIHJ1bGVzIHBsYWNlIHByb2plY3RlZCBwYW5lbHMuXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIuZGF0YS1yb3dzXSc6ICdyb3dzTW9kZSgpJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImF0aC1wYW5lbC1ncmlkX190cmFja1wiXG4gICAgICBbc3R5bGUuLS1hdGgtcGFuZWwtZ3JpZC1jb2xzXT1cInRlbXBsYXRlQ29sdW1ucygpXCJcbiAgICAgIFtzdHlsZS5ncmlkLXRlbXBsYXRlLXJvd3NdPVwidGVtcGxhdGVSb3dzKClcIlxuICAgID5cbiAgICAgIDxuZy1jb250ZW50IC8+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsOiAnLi9wYW5lbC1ncmlkLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoUGFuZWxHcmlkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgY29sdW1ucyA9IGlucHV0PFBhbmVsR3JpZENvbHVtbnM+KCcyJyk7XG4gIHJlYWRvbmx5IHJvd3MgPSBpbnB1dDxQYW5lbEdyaWRSb3dzPignZmlsbCcpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSB0ZW1wbGF0ZUNvbHVtbnMgPSBjb21wdXRlZCgoKSA9PiBwYW5lbEdyaWRDb2x1bW5zKHRoaXMuY29sdW1ucygpKSk7XG4gIHByb3RlY3RlZCByZWFkb25seSByb3dzTW9kZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCByb3dzID0gdGhpcy5yb3dzKCk7XG4gICAgcmV0dXJuIHJvd3MgPT09ICdmaWxsJyB8fCByb3dzID09PSAnYXV0bycgPyByb3dzIDogJ2N1c3RvbSc7XG4gIH0pO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgdGVtcGxhdGVSb3dzID0gY29tcHV0ZWQoKCkgPT5cbiAgICB0aGlzLnJvd3NNb2RlKCkgPT09ICdjdXN0b20nID8gdGhpcy5yb3dzKCkgOiBudWxsXG4gICk7XG59XG4iXX0=