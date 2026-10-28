import type { Meta, StoryObj } from '@storybook/angular';
import { AthPriorityComponent } from './priority.component';

const meta: Meta<AthPriorityComponent> = {
  title: 'Display/Priority',
  component: AthPriorityComponent,
  argTypes: { priority: { control: 'select', options: ['low', 'medium', 'high', 'crit'] } },
  args: { priority: 'high', showLabel: true },
  render: (args) => ({
    props: args,
    template: `<ath-priority [priority]="priority" [showLabel]="showLabel" />`,
  }),
};

export default meta;
type Story = StoryObj<AthPriorityComponent>;

export const Default: Story = {};
export const All: Story = {
  render: () => ({
    props: { all: ['low', 'medium', 'high', 'crit'] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(4,max-content);gap:16px">
        @for (p of all; track p) { <ath-priority [priority]="p" /> }
        @for (p of all; track p) { <ath-priority [priority]="p" [showLabel]="false" /> }
      </div>
    `,
  }),
};
