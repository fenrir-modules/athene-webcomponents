import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthKpiStripComponent, AthKpiTileComponent } from './kpi-tile.component';

const TREND = [2, 3, 3, 5, 4, 6, 8];

const meta: Meta<AthKpiTileComponent> = {
  title: 'Display/KPI tile',
  component: AthKpiTileComponent,
  decorators: [moduleMetadata({ imports: [AthKpiStripComponent] })],
  render: () => ({
    props: { trend: TREND },
    template: `
      <ath-kpi-strip [columns]="4">
        <ath-kpi-tile label="Due today" [value]="1" [alert]="true" delta="+1" deltaDirection="down" deltaTitle="1 overdue" />
        <ath-kpi-tile label="This week" [value]="3" tone="blue" [spark]="trend" />
        <ath-kpi-tile label="Story points" [value]="24" note="3 done" />
        <ath-kpi-tile label="In review" [value]="2" link="/app/tickets" [linkParams]="{ status: 'review' }" />
      </ath-kpi-strip>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthKpiTileComponent>;

/** The strip as on Home: alert, trend, note and a linked tile. Two columns below 920px. */
export const Strip: Story = {};

export const Tones: Story = {
  render: () => ({
    props: { trend: TREND, tones: ['neutral', 'amber', 'blue', 'green', 'red'] },
    template: `
      <ath-kpi-strip [columns]="5">
        @for (t of tones; track t) {
          <ath-kpi-tile [label]="t" [value]="12" [tone]="t" [spark]="trend" delta="+2" deltaDirection="up" />
        }
      </ath-kpi-strip>
    `,
  }),
};

export const MutedAndEmpty: Story = {
  render: () => ({
    template: `
      <ath-kpi-strip [columns]="3">
        <ath-kpi-tile label="Blocked" [value]="0" [muted]="true" />
        <ath-kpi-tile label="Unknown" [value]="null" />
        <ath-kpi-tile label="Text value" value="—" note="no data yet" />
      </ath-kpi-strip>
    `,
  }),
};

export const LongText: Story = {
  render: () => ({
    props: { text: LONG_TEXT },
    template: `
      <ath-kpi-strip [columns]="2">
        <ath-kpi-tile [label]="text" [value]="1234567" [note]="text" />
        <ath-kpi-tile label="Short" [value]="5" />
      </ath-kpi-strip>
    `,
  }),
};
