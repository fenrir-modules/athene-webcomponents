import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthFilterChipComponent } from './filter-chip.component';

const meta: Meta<AthFilterChipComponent> = {
  title: 'Forms/Filter chip',
  component: AthFilterChipComponent,
  args: { label: 'Assignee', value: '', active: false, clearable: false, disabled: false },
  render: (args) => ({
    props: args,
    template: `<ath-filter-chip [label]="label" [value]="value" [active]="active"
      [clearable]="clearable" [disabled]="disabled" (cleared)="active = false; value = ''" />`,
  }),
};

export default meta;
type Story = StoryObj<AthFilterChipComponent>;

export const Inactive: Story = {};
export const Active: Story = { args: { active: true, value: 'Ada Lovelace', clearable: true } };
export const Disabled: Story = { args: { disabled: true } };
export const LongText: Story = {
  render: () => ({
    props: { text: LONG_TEXT },
    template: `<div style="max-width:260px"><ath-filter-chip label="Label" [value]="text" [active]="true" [clearable]="true" /></div>`,
  }),
};
