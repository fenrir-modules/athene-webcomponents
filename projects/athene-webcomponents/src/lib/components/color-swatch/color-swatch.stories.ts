import type { Meta, StoryObj } from '@storybook/angular';
import { AthColorSwatchComponent } from './color-swatch.component';

const meta: Meta<AthColorSwatchComponent> = {
  title: 'Forms/Color swatch',
  component: AthColorSwatchComponent,
  args: { value: 'blue', disabled: false, label: 'Role colour' },
  render: (args) => ({
    props: args,
    template: `<ath-color-swatch [(value)]="value" [label]="label" [disabled]="disabled" />`,
  }),
};

export default meta;
type Story = StoryObj<AthColorSwatchComponent>;

export const Default: Story = {};
export const NothingPicked: Story = { args: { value: null } };
export const Disabled: Story = { args: { disabled: true, value: 'green' } };
export const RightToLeft: Story = { globals: { dir: 'rtl' } };
