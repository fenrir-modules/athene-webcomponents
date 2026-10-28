import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { AthAction } from '../button/button.action';
import { AthAlertComponent } from '../alert/alert.component';
import { AthKpiStripComponent, AthKpiTileComponent } from '../kpi-tile/kpi-tile.component';
import { AthPageHeaderComponent } from '../page-header/page-header.component';
import { AthPageComponent } from './page.component';
import { AthPanelGridComponent } from './panel-grid.component';
import { AthPanelComponent } from './panel.component';

/**
 * The shell contract (README, "Page frame"): a full-height flex column, the
 * stage `.ath-stage` as its scrolling flex item with the content padding,
 * the route host, then `ath-page`.
 */
const shell = (page: string) => `
  <div style="height:100vh;display:flex;flex-direction:column;overflow:hidden">
    <main class="ath-stage" style="flex:1;min-height:0;padding:var(--content-pad-top) var(--content-pad-x) var(--content-pad-bottom)">
      <div class="route-host">${page}</div>
    </main>
  </div>
`;

const ROWS = Array.from({ length: 30 }, (_, i) => `Activity ${i + 1}`);

const meta: Meta<AthPageComponent> = {
  title: 'Layout/Page',
  component: AthPageComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AthPanelGridComponent,
        AthPanelComponent,
        AthPageHeaderComponent,
        AthAlertComponent,
        AthKpiStripComponent,
        AthKpiTileComponent,
      ],
    }),
  ],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<AthPageComponent>;

/** `mode="scroll"`: the stage scrolls; short panels stretch to the bottom. */
export const Scroll: Story = {
  render: () => ({
    props: { rows: ROWS.slice(0, 6) },
    template: shell(`
      <ath-page>
        <ath-page-header title="Home" [subItems]="['Tuesday', '3 due today']" />
        <ath-kpi-strip [columns]="3">
          <ath-kpi-tile label="Due today" [value]="3" [alert]="true" />
          <ath-kpi-tile label="In review" [value]="2" />
          <ath-kpi-tile label="Done this week" [value]="9" />
        </ath-kpi-strip>
        <ath-panel-grid columns="main-side">
          <ath-panel title="My work" [count]="rows.length">
            @for (r of rows; track r) { <p style="margin:0;padding:8px 16px">{{ r }}</p> }
          </ath-panel>
          <ath-panel title="Mentions" [padded]="true"><p style="margin:0">Nothing new.</p></ath-panel>
        </ath-panel-grid>
      </ath-page>
    `),
  }),
};

/** `mode="fill"`: exactly the stage height; the long panel scrolls inside. Below 720px it falls back to scroll. */
export const Fill: Story = {
  render: () => ({
    props: { rows: ROWS, reload: (() => undefined) satisfies AthAction },
    template: shell(`
      <ath-page mode="fill">
        <ath-page-header title="Inbox" [subItems]="['3 unread']" />
        <ath-alert variant="warn" message="Some notifications could not be loaded." [retry]="reload" />
        <ath-panel-grid columns="side-main">
          <ath-panel title="Filters" [padded]="true"><p style="margin:0">Unread only</p></ath-panel>
          <ath-panel title="Activity" [count]="rows.length">
            @for (r of rows; track r) { <p style="margin:0;padding:8px 16px;border-bottom:1px solid var(--border)">{{ r }}</p> }
          </ath-panel>
        </ath-panel-grid>
      </ath-page>
    `),
  }),
};

/** Panel grid: 3 columns with spans, a loading panel and slots. */
export const PanelGrid: Story = {
  render: () => ({
    template: shell(`
      <ath-page>
        <ath-page-header title="Project overview" />
        <ath-panel-grid columns="3" rows="auto">
          <ath-panel title="Velocity" [colSpan]="2" [padded]="true">
            <span athPanelActions style="color:var(--fg-3)">last 6 sprints</span>
            <p style="margin:0">Chart goes here.</p>
          </ath-panel>
          <ath-panel title="Loading" [loading]="true" [skeletonRows]="3" />
          <ath-panel title="Blockers" [count]="0" [padded]="true"><p style="margin:0">None.</p>
            <div athPanelFoot style="padding:8px 16px;color:var(--fg-3)">Updated just now</div>
          </ath-panel>
          <ath-panel [padded]="true" [colSpan]="2"><p style="margin:0">A panel without a head row.</p></ath-panel>
        </ath-panel-grid>
      </ath-page>
    `),
  }),
};
