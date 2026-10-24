import type { Meta, StoryObj } from '@storybook/angular';
import { AthSpinnerComponent } from './spinner.component';

const meta: Meta<AthSpinnerComponent> = {
  title: 'Feedback/Spinner',
  component: AthSpinnerComponent,
  render: () => ({
    template: `
      <div style="display:flex;gap:16px;align-items:center">
        <ath-spinner size="sm" /><ath-spinner size="md" /><ath-spinner size="lg" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthSpinnerComponent>;

export const Sizes: Story = {};
