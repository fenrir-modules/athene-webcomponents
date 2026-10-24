import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthToggleComponent } from './toggle.component';

const meta: Meta<AthToggleComponent> = {
  title: 'Forms/Toggle',
  component: AthToggleComponent,
  args: { checked: false, disabled: false, label: 'Email notifications', description: '' },
  render: (args) => ({
    props: args,
    template: `<ath-toggle [checked]="checked" [disabled]="disabled" [label]="label"
      [description]="description" (toggled)="checked = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<AthToggleComponent>;

export const Off: Story = {};
export const On: Story = { args: { checked: true } };
export const WithDescription: Story = {
  args: { checked: true, description: 'A digest of mentions and assignments, once a day.' },
};
export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display:grid;gap:12px">
        <ath-toggle label="Disabled, off" [disabled]="true" />
        <ath-toggle label="Disabled, on" [disabled]="true" [checked]="true" />
      </div>
    `,
  }),
};
export const LongText: Story = {
  render: () => ({
    props: { text: LONG_TEXT },
    template: `<div style="max-width:300px"><ath-toggle [label]="text" [description]="text" /></div>`,
  }),
};
export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { text: RTL_TEXT },
    template: `<ath-toggle [label]="text" [checked]="true" description="${RTL_TEXT}" />`,
  }),
};
