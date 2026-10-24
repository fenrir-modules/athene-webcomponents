import type { Meta, StoryObj } from '@storybook/angular';
import { AthStatCardComponent } from './stat-card.component';

/** Deprecated alias of `ath-kpi-strip` + one `ath-kpi-tile`; kept until the app has migrated. */
const meta: Meta<AthStatCardComponent> = {
  title: 'Display/Stat card (deprecated)',
  component: AthStatCardComponent,
  render: () => ({
    props: { spark: [1, 3, 2, 5, 4, 6] },
    template: `
      <div style="max-width:260px">
        <ath-stat-card label="Open tickets" [value]="42" subValue="8 new" delta="+5" deltaDirection="up" [sparkData]="spark" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthStatCardComponent>;

export const Default: Story = {};
