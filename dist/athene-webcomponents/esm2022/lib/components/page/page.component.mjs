import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The shared page frame: the head slot (`ath-page-header` or
 * `[athPageHead]`), then a body column spaced by `--section-gap`.
 *
 * In the body, toolbars and alerts keep their height; the first
 * `ath-panel-grid`, `ath-panel` or `[athPageFill]` child takes the rest.
 *
 * **Contract with the app shell** (see the README, "Page frame"): the
 * scroll container that hosts routed pages carries the class `ath-stage`,
 * has a definite height (a flex item with `min-height: 0` in a full-height
 * column) and its bottom padding is `--content-pad-bottom`. `ath-page` is
 * the root element of the routed component's template. The lib's global
 * styles (`styles/_layout.scss`) turn the stage into a flex column and let
 * the route host grow.
 *
 * @example
 * <ath-page mode="fill">
 *   <ath-page-header title="Inbox" [subItems]="[unread + ' unread']" />
 *   <ath-alert variant="error" [message]="error()" [retry]="reload" />
 *   <ath-panel-grid columns="side-main">
 *     <ath-panel title="Filters">…</ath-panel>
 *     <ath-panel title="Activity" [count]="items().length">…</ath-panel>
 *   </ath-panel-grid>
 * </ath-page>
 */
export class AthPageComponent {
    constructor() {
        this.mode = input('scroll');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthPageComponent, isStandalone: true, selector: "ath-page", inputs: { mode: { classPropertyName: "mode", publicName: "mode", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-mode": "mode()" } }, ngImport: i0, template: `
    <ng-content select="ath-page-header, [athPageHead]" />
    <div class="ath-page__body"><ng-content /></div>
  `, isInline: true, styles: ["ath-page{display:flex;flex-direction:column;gap:var(--section-gap);box-sizing:border-box;width:100%;min-width:0;max-width:var(--page-max-w);margin-inline:auto;flex:1 0 auto}ath-page[data-mode=fill]{flex:1 1 0;min-height:0}ath-page{margin-bottom:calc(var(--content-pad-top) - var(--content-pad-bottom))}ath-page>ath-page-header,ath-page>[athPageHead]{flex:none}.ath-page__body{display:flex;flex-direction:column;gap:var(--section-gap);flex:1 0 auto;min-width:0;min-height:0}.ath-page__body>*{flex:none;min-width:0}.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 1 0}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 1 0;min-height:0}@container ath-stage (max-width: 720px){ath-page[data-mode=fill]{flex:1 0 auto;min-height:auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto;min-height:auto}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-page', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[attr.data-mode]': 'mode()',
                    }, template: `
    <ng-content select="ath-page-header, [athPageHead]" />
    <div class="ath-page__body"><ng-content /></div>
  `, styles: ["ath-page{display:flex;flex-direction:column;gap:var(--section-gap);box-sizing:border-box;width:100%;min-width:0;max-width:var(--page-max-w);margin-inline:auto;flex:1 0 auto}ath-page[data-mode=fill]{flex:1 1 0;min-height:0}ath-page{margin-bottom:calc(var(--content-pad-top) - var(--content-pad-bottom))}ath-page>ath-page-header,ath-page>[athPageHead]{flex:none}.ath-page__body{display:flex;flex-direction:column;gap:var(--section-gap);flex:1 0 auto;min-width:0;min-height:0}.ath-page__body>*{flex:none;min-width:0}.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 1 0}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 1 0;min-height:0}@container ath-stage (max-width: 720px){ath-page[data-mode=fill]{flex:1 0 auto;min-height:auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto;min-height:auto}}\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hdGhlbmUtd2ViY29tcG9uZW50cy9zcmMvbGliL2NvbXBvbmVudHMvcGFnZS9wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFhN0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQWdCSCxNQUFNLE9BQU8sZ0JBQWdCO0lBZjdCO1FBZ0JXLFNBQUksR0FBRyxLQUFLLENBQVcsUUFBUSxDQUFDLENBQUM7S0FDM0M7K0dBRlksZ0JBQWdCO21HQUFoQixnQkFBZ0IsMlBBTmpCOzs7R0FHVDs7NEZBR1UsZ0JBQWdCO2tCQWY1QixTQUFTOytCQUNFLFVBQVUsY0FDUixJQUFJLG1CQUNDLHVCQUF1QixDQUFDLE1BQU0saUJBRWhDLGlCQUFpQixDQUFDLElBQUksUUFDL0I7d0JBQ0osa0JBQWtCLEVBQUUsUUFBUTtxQkFDN0IsWUFDUzs7O0dBR1QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBWaWV3RW5jYXBzdWxhdGlvbiwgaW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiAtIGBzY3JvbGxgOiB0aGUgcGFnZSBpcyBhdCBsZWFzdCBhcyB0YWxsIGFzIHRoZSBzdGFnZSBhbmQgZ3Jvd3Mgd2l0aCBpdHNcbiAqICAgY29udGVudDsgdGhlIHN0YWdlIHNjcm9sbHMuIFBhbmVscyBpbiB0aGUgbGFzdCBgYXRoLXBhbmVsLWdyaWRgIHN0cmV0Y2hcbiAqICAgdG8gdGhlIGJvdHRvbSB3aGVuIHRoZSBjb250ZW50IGlzIHNob3J0LCBzbyBubyBkZWFkIGJhbmQgaXMgbGVmdC5cbiAqIC0gYGZpbGxgOiB0aGUgcGFnZSBpcyBleGFjdGx5IHRoZSBzdGFnZSdzIGhlaWdodC4gVGhlIGZpbGxpbmcgY2hpbGQgKGFuXG4gKiAgIGBhdGgtcGFuZWwtZ3JpZGAsIGFuIGBhdGgtcGFuZWxgIG9yIGFuIGBbYXRoUGFnZUZpbGxdYCBlbGVtZW50KSB0YWtlc1xuICogICB0aGUgaGVpZ2h0IHVuZGVyIHRoZSBoZWFkIGFuZCBpdHMgcGFuZWxzIHNjcm9sbCBpbnNpZGUgdGhlbXNlbHZlc1xuICogICAoYm9hcmQsIGNhbGVuZGFyLCBpbmJveCkuIEJlbG93IDc2OHB4IGZpbGwgZmFsbHMgYmFjayB0byBzY3JvbGwuXG4gKi9cbmV4cG9ydCB0eXBlIFBhZ2VNb2RlID0gJ3Njcm9sbCcgfCAnZmlsbCc7XG5cbi8qKlxuICogVGhlIHNoYXJlZCBwYWdlIGZyYW1lOiB0aGUgaGVhZCBzbG90IChgYXRoLXBhZ2UtaGVhZGVyYCBvclxuICogYFthdGhQYWdlSGVhZF1gKSwgdGhlbiBhIGJvZHkgY29sdW1uIHNwYWNlZCBieSBgLS1zZWN0aW9uLWdhcGAuXG4gKlxuICogSW4gdGhlIGJvZHksIHRvb2xiYXJzIGFuZCBhbGVydHMga2VlcCB0aGVpciBoZWlnaHQ7IHRoZSBmaXJzdFxuICogYGF0aC1wYW5lbC1ncmlkYCwgYGF0aC1wYW5lbGAgb3IgYFthdGhQYWdlRmlsbF1gIGNoaWxkIHRha2VzIHRoZSByZXN0LlxuICpcbiAqICoqQ29udHJhY3Qgd2l0aCB0aGUgYXBwIHNoZWxsKiogKHNlZSB0aGUgUkVBRE1FLCBcIlBhZ2UgZnJhbWVcIik6IHRoZVxuICogc2Nyb2xsIGNvbnRhaW5lciB0aGF0IGhvc3RzIHJvdXRlZCBwYWdlcyBjYXJyaWVzIHRoZSBjbGFzcyBgYXRoLXN0YWdlYCxcbiAqIGhhcyBhIGRlZmluaXRlIGhlaWdodCAoYSBmbGV4IGl0ZW0gd2l0aCBgbWluLWhlaWdodDogMGAgaW4gYSBmdWxsLWhlaWdodFxuICogY29sdW1uKSBhbmQgaXRzIGJvdHRvbSBwYWRkaW5nIGlzIGAtLWNvbnRlbnQtcGFkLWJvdHRvbWAuIGBhdGgtcGFnZWAgaXNcbiAqIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIHJvdXRlZCBjb21wb25lbnQncyB0ZW1wbGF0ZS4gVGhlIGxpYidzIGdsb2JhbFxuICogc3R5bGVzIChgc3R5bGVzL19sYXlvdXQuc2Nzc2ApIHR1cm4gdGhlIHN0YWdlIGludG8gYSBmbGV4IGNvbHVtbiBhbmQgbGV0XG4gKiB0aGUgcm91dGUgaG9zdCBncm93LlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXRoLXBhZ2UgbW9kZT1cImZpbGxcIj5cbiAqICAgPGF0aC1wYWdlLWhlYWRlciB0aXRsZT1cIkluYm94XCIgW3N1Ykl0ZW1zXT1cIlt1bnJlYWQgKyAnIHVucmVhZCddXCIgLz5cbiAqICAgPGF0aC1hbGVydCB2YXJpYW50PVwiZXJyb3JcIiBbbWVzc2FnZV09XCJlcnJvcigpXCIgW3JldHJ5XT1cInJlbG9hZFwiIC8+XG4gKiAgIDxhdGgtcGFuZWwtZ3JpZCBjb2x1bW5zPVwic2lkZS1tYWluXCI+XG4gKiAgICAgPGF0aC1wYW5lbCB0aXRsZT1cIkZpbHRlcnNcIj7igKY8L2F0aC1wYW5lbD5cbiAqICAgICA8YXRoLXBhbmVsIHRpdGxlPVwiQWN0aXZpdHlcIiBbY291bnRdPVwiaXRlbXMoKS5sZW5ndGhcIj7igKY8L2F0aC1wYW5lbD5cbiAqICAgPC9hdGgtcGFuZWwtZ3JpZD5cbiAqIDwvYXRoLXBhZ2U+XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F0aC1wYWdlJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIC8vIEdsb2JhbCAoZWxlbWVudC1zY29wZWQpIHN0eWxlczogdGhlIHJ1bGVzIHNpemUgcHJvamVjdGVkIGNoaWxkcmVuLlxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1thdHRyLmRhdGEtbW9kZV0nOiAnbW9kZSgpJyxcbiAgfSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCJhdGgtcGFnZS1oZWFkZXIsIFthdGhQYWdlSGVhZF1cIiAvPlxuICAgIDxkaXYgY2xhc3M9XCJhdGgtcGFnZV9fYm9keVwiPjxuZy1jb250ZW50IC8+PC9kaXY+XG4gIGAsXG4gIHN0eWxlVXJsOiAnLi9wYWdlLmNvbXBvbmVudC5zY3NzJyxcbn0pXG5leHBvcnQgY2xhc3MgQXRoUGFnZUNvbXBvbmVudCB7XG4gIHJlYWRvbmx5IG1vZGUgPSBpbnB1dDxQYWdlTW9kZT4oJ3Njcm9sbCcpO1xufVxuIl19