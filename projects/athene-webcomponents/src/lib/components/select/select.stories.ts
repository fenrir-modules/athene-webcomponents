import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthSelectComponent, type SelectOption } from './select.component';

const OPTIONS: SelectOption[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent', disabled: true },
];

const meta: Meta<AthSelectComponent> = {
  title: 'Forms/Select',
  component: AthSelectComponent,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  argTypes: { size: { control: 'select', options: ['sm', 'md'] } },
  args: { label: 'Priority', hint: '', error: '', disabled: false, required: false, size: 'md' },
  render: (args) => ({
    props: { ...args, options: OPTIONS, value: 'medium' },
    template: `
      <div style="max-width:280px">
        <ath-select [label]="label" [options]="options" [hint]="hint" [error]="error"
          [disabled]="disabled" [required]="required" [size]="size" [(ngModel)]="value" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthSelectComponent>;

export const Default: Story = {};
export const Placeholder: Story = {
  render: () => ({
    props: { options: OPTIONS, value: '' },
    template: `<div style="max-width:280px"><ath-select label="Priority" placeholder="Choose a priority" [options]="options" [(ngModel)]="value" /></div>`,
  }),
};
export const WithHint: Story = { args: { hint: 'Used to order the backlog.' } };
export const WithError: Story = { args: { error: 'Pick a priority', required: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };
export const LongText: Story = {
  render: () => ({
    props: { options: [{ value: 'x', label: LONG_TEXT }], value: 'x' },
    template: `<div style="max-width:240px"><ath-select label="Status" [options]="options" [(ngModel)]="value" /></div>`,
  }),
};
