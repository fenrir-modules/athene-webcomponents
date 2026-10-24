import type { Meta, StoryObj } from '@storybook/angular';
import { AthSlaBarComponent } from './sla-bar.component';

const meta: Meta<AthSlaBarComponent> = {
  title: 'Display/SLA bar',
  component: AthSlaBarComponent,
  render: () => ({
    template: `
      <div style="max-width:360px;display:grid;gap:20px">
        <ath-sla-bar [response]="{ label: 'Response', status: 'met', text: 'met · 24m' }"
          [resolution]="{ label: 'Resolution', status: 'pending', text: '6h 12m left' }" [progressPct]="40" />
        <ath-sla-bar [response]="{ label: 'Response', status: 'met', text: 'met · 1h' }"
          [resolution]="{ label: 'Resolution', status: 'pending', text: '42m left' }" [progressPct]="86" />
        <ath-sla-bar [response]="{ label: 'Response', status: 'breached', text: 'breached · 3h' }"
          [resolution]="{ label: 'Resolution', status: 'breached', text: '2h over' }" [progressPct]="100" />
        <ath-sla-bar [response]="{ label: 'Response', status: 'met', text: 'met' }"
          [resolution]="{ label: 'Resolution', status: 'met', text: 'met · 2d' }" [progressPct]="55" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthSlaBarComponent>;

/** On track, at risk (≥ 80 %), breached and met. */
export const States: Story = {};
