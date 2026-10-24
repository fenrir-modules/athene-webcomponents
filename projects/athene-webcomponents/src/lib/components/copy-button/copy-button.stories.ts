import type { Meta, StoryObj } from '@storybook/angular';
import { AthCopyButtonComponent } from './copy-button.component';

const meta: Meta<AthCopyButtonComponent> = {
  title: 'Forms/Copy button',
  component: AthCopyButtonComponent,
  args: { value: 'ATH-1234', label: 'Copy ticket key' },
  render: (args) => ({
    props: args,
    template: `<span style="display:inline-flex;gap:8px;align-items:center">ATH-1234 <ath-copy-button [value]="value" [label]="label" /></span>`,
  }),
};

export default meta;
type Story = StoryObj<AthCopyButtonComponent>;

export const Default: Story = {};
