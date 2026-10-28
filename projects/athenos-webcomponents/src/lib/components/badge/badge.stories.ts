import type { Meta, StoryObj } from '@storybook/angular';
import { AthBadgeComponent } from './badge.component';

const meta: Meta<AthBadgeComponent> = {
  title: 'Display/Badge',
  component: AthBadgeComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'muted'],
    },
  },
  args: { variant: 'default', dot: false },
  render: (args) => ({
    props: args,
    template: `<ath-badge [variant]="variant" [dot]="dot">Beta</ath-badge>`,
  }),
};

export default meta;
type Story = StoryObj<AthBadgeComponent>;

export const Default: Story = {};
export const Variants: Story = {
  render: () => ({
    props: { variants: ['default', 'success', 'warning', 'error', 'info', 'muted'] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(6,max-content);gap:8px">
        @for (v of variants; track v) { <ath-badge [variant]="v">{{ v }}</ath-badge> }
        @for (v of variants; track v) { <ath-badge [variant]="v" [dot]="true">{{ v }}</ath-badge> }
      </div>
    `,
  }),
};
