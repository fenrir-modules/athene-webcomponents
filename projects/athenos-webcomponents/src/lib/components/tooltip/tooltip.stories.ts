import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AthButtonComponent } from '../button/button.component';
import { AthTooltipDirective } from './tooltip.component';

const meta: Meta<AthTooltipDirective> = {
  title: 'Overlays/Tooltip',
  component: AthTooltipDirective,
  decorators: [moduleMetadata({ imports: [AthButtonComponent] })],
  argTypes: { tooltipPosition: { control: 'select', options: ['top', 'bottom', 'left', 'right'] } },
  args: { tooltipPosition: 'top' },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:48px 120px">
        <ath-button variant="secondary" athTooltip="Saves a draft; nothing is sent" [tooltipPosition]="tooltipPosition">Save draft</ath-button>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthTooltipDirective>;

export const Hidden: Story = {};

/** Shown on hover (after the show delay). */
export const Shown: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.hover(canvas.getByRole('button', { name: 'Save draft' }));
    await new Promise((resolve) => setTimeout(resolve, 800));
  },
};

export const Bottom: Story = { args: { tooltipPosition: 'bottom' }, play: Shown.play };
