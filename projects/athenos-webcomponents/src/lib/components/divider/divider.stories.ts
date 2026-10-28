import type { Meta, StoryObj } from '@storybook/angular';
import { AthDividerComponent } from './divider.component';

const meta: Meta<AthDividerComponent> = {
  title: 'Layout/Divider',
  component: AthDividerComponent,
  render: () => ({
    template: `
      <div style="max-width:360px">
        <p>Above</p><ath-divider /><p>Below</p><ath-divider spacing="lg" /><p>After a large gap</p>
        <div style="display:flex;align-items:center;height:24px;margin-top:16px">
          <span>Left</span><ath-divider orientation="vertical" /><span>Right</span>
        </div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthDividerComponent>;

export const Default: Story = {};
