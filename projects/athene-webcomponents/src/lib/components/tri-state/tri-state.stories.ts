import type { Meta, StoryObj } from '@storybook/angular';
import { RTL_TEXT } from '../../stories/story-data';
import { AthTriStateComponent } from './tri-state.component';

const meta: Meta<AthTriStateComponent> = {
  title: 'Forms/Tri-state',
  component: AthTriStateComponent,
  argTypes: {
    value: { control: 'inline-radio', options: ['deny', 'inherit', 'allow'] },
    inherited: { control: 'select', options: [true, false, null] },
  },
  args: {
    value: 'inherit',
    inherited: true,
    disabled: false,
    compact: false,
    label: 'Edit tickets',
  },
  render: (args) => ({
    props: args,
    template: `<ath-tri-state [label]="label" [(value)]="value" [inherited]="inherited"
      [disabled]="disabled" [compact]="compact" />`,
  }),
};

export default meta;
type Story = StoryObj<AthTriStateComponent>;

export const Inherit: Story = {};
export const Allow: Story = { args: { value: 'allow' } };
export const Deny: Story = { args: { value: 'deny' } };
export const Compact: Story = { args: { compact: true, value: 'deny' } };
export const Disabled: Story = { args: { disabled: true } };
/** Rows of an override page: the hint says what "Inherit" currently stands for. */
export const InRows: Story = {
  render: () => ({
    props: { a: 'inherit', b: 'deny', c: 'allow' },
    template: `
      <div style="display:grid;gap:8px;max-width:520px">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
          <span>Create tickets</span><ath-tri-state label="Create tickets" [(value)]="a" [inherited]="true" />
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
          <span>Edit tickets</span><ath-tri-state label="Edit tickets" [(value)]="b" [inherited]="true" />
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px">
          <span>Plan tickets</span><ath-tri-state label="Plan tickets" [(value)]="c" [inherited]="false" />
        </div>
      </div>
    `,
  }),
};
export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  args: { label: RTL_TEXT, value: 'allow' },
};
