import type { Meta, StoryObj } from '@storybook/angular';
import { STORY_PEOPLE } from '../../stories/story-data';
import { AthUserPickerComponent, type UserOption } from './user-picker.component';

const USERS: UserOption[] = STORY_PEOPLE.map((p) => ({
  id: p.id ?? '',
  name: p.name ?? '',
  email: `${(p.name ?? '').split(' ')[0].toLowerCase()}@example.com`,
}));

const meta: Meta<AthUserPickerComponent> = {
  title: 'Overlays/User picker',
  component: AthUserPickerComponent,
  args: { disabled: false, clearable: true, allowUnassigned: true, showEmail: true },
  render: (args) => ({
    props: { ...args, users: USERS, value: 'u-grace' },
    template: `
      <div style="max-width:260px">
        <ath-user-picker [users]="users" [value]="value" (valueChange)="value = $event" [disabled]="disabled"
          [clearable]="clearable" [allowUnassigned]="allowUnassigned" [showEmail]="showEmail" placeholder="Unassigned" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthUserPickerComponent>;

export const Default: Story = {};
export const Open: Story = {
  play: async ({ canvas, userEvent }) => {
    // Keyboard, like a user: a synthetic click races the overlay's focus move.
    const trigger = canvas.getAllByRole('button')[0];
    trigger.focus();
    await userEvent.keyboard('{Enter}');
  },
};
export const Unassigned: Story = {
  render: () => ({
    props: { users: USERS },
    template: `<div style="max-width:260px"><ath-user-picker [users]="users" [value]="null" placeholder="Unassigned" /></div>`,
  }),
};
export const Disabled: Story = { args: { disabled: true } };
