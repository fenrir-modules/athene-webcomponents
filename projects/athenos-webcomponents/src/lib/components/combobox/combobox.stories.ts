import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT, STORY_ASSIGNEES } from '../../stories/story-data';
import { AthComboboxComponent } from './combobox.component';

const meta: Meta<AthComboboxComponent<string>> = {
  title: 'Overlays/Combobox',
  component: AthComboboxComponent,
  args: { disabled: false, clearable: true, loading: false, bare: false },
  render: (args) => ({
    props: { ...args, options: STORY_ASSIGNEES, value: 'ada' },
    template: `
      <div style="max-width:260px">
        <ath-combobox [options]="options" [(value)]="value" placeholder="Assignee" searchPlaceholder="Search people"
          [disabled]="disabled" [clearable]="clearable" [loading]="loading" [bare]="bare" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthComboboxComponent<string>>;

const open: Story['play'] = async ({ canvas, userEvent }) => {
  // Keyboard, like a user: a synthetic click races the overlay's focus move.
  const trigger = canvas.getAllByRole('button')[0];
  trigger.focus();
  await userEvent.keyboard('{Enter}');
};

export const Default: Story = {};
export const Open: Story = { play: open };
export const Loading: Story = { args: { loading: true }, play: open };
export const Disabled: Story = { args: { disabled: true } };
export const Bare: Story = { args: { bare: true } };
export const LongText: Story = {
  render: () => ({
    props: { options: [{ value: 'x', label: LONG_TEXT }], value: 'x' },
    template: `<div style="max-width:200px"><ath-combobox [options]="options" [(value)]="value" placeholder="Pick" /></div>`,
  }),
};
