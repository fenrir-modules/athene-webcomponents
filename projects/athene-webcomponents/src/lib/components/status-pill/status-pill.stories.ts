import type { Meta, StoryObj } from '@storybook/angular';
import { AthStatusPillComponent } from './status-pill.component';

const meta: Meta<AthStatusPillComponent> = {
  title: 'Display/Status pill',
  component: AthStatusPillComponent,
  argTypes: {
    status: { control: 'select', options: ['open', 'prog', 'review', 'done', 'blocked', 'closed'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { status: 'prog', size: 'md', showDot: true, showLabel: true },
  render: (args) => ({
    props: args,
    template: `<ath-status-pill [status]="status" [size]="size" [showDot]="showDot" [showLabel]="showLabel" />`,
  }),
};

export default meta;
type Story = StoryObj<AthStatusPillComponent>;

export const Default: Story = {};
export const AllStatuses: Story = {
  render: () => ({
    props: { statuses: ['open', 'prog', 'review', 'done', 'blocked', 'closed'] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(6,max-content);gap:8px">
        @for (s of statuses; track s) { <ath-status-pill [status]="s" /> }
        @for (s of statuses; track s) { <ath-status-pill [status]="s" size="sm" /> }
      </div>
    `,
  }),
};
export const DotOnly: Story = { args: { showLabel: false, label: 'In progress' } };
/** A workspace's own status: any key, its name and a palette tone. */
export const OwnStatus: Story = {
  render: () => ({
    props: { tones: ['neutral', 'blue', 'green', 'amber', 'red', 'purple', 'pink'] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(7,max-content);gap:8px">
        @for (t of tones; track t) { <ath-status-pill status="qa" label="QA" [tone]="t" /> }
      </div>
    `,
  }),
};
