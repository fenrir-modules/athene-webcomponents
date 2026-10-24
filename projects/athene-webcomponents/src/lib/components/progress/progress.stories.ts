import type { Meta, StoryObj } from '@storybook/angular';
import { AthProgressComponent } from './progress.component';

const meta: Meta<AthProgressComponent> = {
  title: 'Display/Progress',
  component: AthProgressComponent,
  argTypes: {
    tone: { control: 'select', options: ['accent', 'success', 'warning', 'danger', 'neutral'] },
    size: { control: 'select', options: ['xs', 'sm', 'md'] },
  },
  args: {
    value: 7,
    total: 12,
    tone: 'accent',
    size: 'sm',
    showLabel: true,
    ariaLabel: 'Sprint progress',
  },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:320px"><ath-progress [value]="value" [total]="total" [tone]="tone"
      [size]="size" [showLabel]="showLabel" [ariaLabel]="ariaLabel" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<AthProgressComponent>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => ({
    props: { tones: ['accent', 'success', 'warning', 'danger', 'neutral'] },
    template: `
      <div style="max-width:320px;display:grid;gap:12px">
        @for (t of tones; track t) { <ath-progress [value]="60" [tone]="t" [showLabel]="true" [ariaLabel]="t" /> }
      </div>
    `,
  }),
};
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="max-width:320px;display:grid;gap:12px">
        <ath-progress [value]="25" size="xs" ariaLabel="xs" />
        <ath-progress [value]="50" size="sm" ariaLabel="sm" />
        <ath-progress [value]="75" size="md" ariaLabel="md" />
      </div>
    `,
  }),
};
export const EmptyAndFull: Story = {
  render: () => ({
    template: `
      <div style="max-width:320px;display:grid;gap:12px">
        <ath-progress [value]="0" [total]="10" [showLabel]="true" ariaLabel="none" />
        <ath-progress [value]="10" [total]="10" tone="success" [showLabel]="true" ariaLabel="all" />
      </div>
    `,
  }),
};
