import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

/**
 * - `scroll`: the page is at least as tall as the stage and grows with its
 *   content; the stage scrolls. Panels in the last `ath-panel-grid` stretch
 *   to the bottom when the content is short, so no dead band is left.
 * - `fill`: the page is exactly the stage's height. The filling child (an
 *   `ath-panel-grid`, an `ath-panel` or an `[athPageFill]` element) takes
 *   the height under the head and its panels scroll inside themselves
 *   (board, calendar, inbox). Below 768px fill falls back to scroll.
 */
export type PageMode = 'scroll' | 'fill';

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
@Component({
  selector: 'ath-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Global (element-scoped) styles: the rules size projected children.
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.data-mode]': 'mode()',
  },
  template: `
    <ng-content select="ath-page-header, [athPageHead]" />
    <div class="ath-page__body"><ng-content /></div>
  `,
  styleUrl: './page.component.scss',
})
export class AthPageComponent {
  readonly mode = input<PageMode>('scroll');
}
