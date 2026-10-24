import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT, STORY_ASSIGNEES } from '../../stories/story-data';
import { AthOptionPickerComponent } from './option-picker.component';

const meta: Meta<AthOptionPickerComponent> = {
  title: 'Overlays/Option picker',
  component: AthOptionPickerComponent,
  args: { disabled: false, clearable: true },
  render: (args) => ({
    props: { ...args, options: STORY_ASSIGNEES, value: null },
    template: `<ath-option-picker [options]="options" [(value)]="value" [clearable]="clearable"
      [disabled]="disabled" ariaLabel="Assignee" placeholder="Assignee" matchWidth />`,
  }),
};

export default meta;
type Story = StoryObj<AthOptionPickerComponent>;

const openPicker: Story['play'] = async ({ canvas, userEvent }) => {
  // Keyboard, like a user: a synthetic click races the overlay's focus move.
  const trigger = canvas.getAllByRole('button', { name: /assignee|watchers/i })[0];
  trigger.focus();
  await userEvent.keyboard('{Enter}');
};

export const Default: Story = {};
export const Open: Story = { play: openPicker };
export const Disabled: Story = { args: { disabled: true } };

/** Single with a value (and a separate clear button), multi with "N selected". */
export const WithSelection: Story = {
  render: () => ({
    props: { options: STORY_ASSIGNEES, value: 'grace', values: ['ada', 'alan', 'jurgen'] },
    template: `
      <div style="display:flex;gap:12px">
        <ath-option-picker [options]="options" [(value)]="value" clearable ariaLabel="Assignee" />
        <ath-option-picker [options]="options" multiple [(values)]="values" ariaLabel="Watchers" placeholder="Watchers" />
      </div>
    `,
  }),
};

export const MultiOpen: Story = {
  render: () => ({
    props: { options: STORY_ASSIGNEES, values: ['ada'] },
    template: `<ath-option-picker [options]="options" multiple creatable [(values)]="values" ariaLabel="Watchers" placeholder="Watchers" />`,
  }),
  play: openPicker,
};

export const LongText: Story = {
  render: () => ({
    props: { options: [{ value: 'x', label: LONG_TEXT }], value: 'x' },
    template: `<div style="max-width:220px"><ath-option-picker [options]="options" [(value)]="value" ariaLabel="Assignee" /></div>`,
  }),
};
