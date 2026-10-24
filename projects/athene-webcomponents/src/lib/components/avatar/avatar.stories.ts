import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT, STORY_PEOPLE } from '../../stories/story-data';
import { AthAvatarComponent } from './avatar.component';

const meta: Meta<AthAvatarComponent> = {
  title: 'Display/Avatar',
  component: AthAvatarComponent,
  argTypes: { size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
  args: { size: 'md' },
  render: (args) => ({
    props: { ...args, person: STORY_PEOPLE[0] },
    template: `<ath-avatar [person]="person" [size]="size" />`,
  }),
};

export default meta;
type Story = StoryObj<AthAvatarComponent>;

export const Default: Story = {};

/** Every size, initials on the per-person tone (keyed on the id). */
export const Sizes: Story = {
  render: () => ({
    props: { sizes: ['xs', 'sm', 'md', 'lg', 'xl'], person: STORY_PEOPLE[2] },
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        @for (s of sizes; track s) { <ath-avatar [person]="person" [size]="s" /> }
      </div>
    `,
  }),
};

/** All tones: one avatar per sample person. */
export const Tones: Story = {
  render: () => ({
    props: { people: STORY_PEOPLE },
    template: `
      <div style="display:flex;gap:8px">
        @for (p of people; track p.id) { <ath-avatar [person]="p" size="lg" /> }
      </div>
    `,
  }),
};

/** `null` person or `unassigned`: the empty seat, labelled `ATH_LABELS.unassigned`. */
export const Unassigned: Story = {
  render: () => ({
    props: { sizes: ['xs', 'sm', 'md', 'lg', 'xl'] },
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        @for (s of sizes; track s) { <ath-avatar [person]="null" [size]="s" /> }
        <ath-avatar [unassigned]="true" size="md" label="Nobody yet" />
      </div>
    `,
  }),
};

export const Image: Story = {
  render: () => ({
    props: {
      src:
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#4a7bd0"/><circle cx="32" cy="26" r="12" fill="#fff"/><rect x="14" y="42" width="36" height="22" rx="11" fill="#fff"/></svg>'
        ),
    },
    template: `<ath-avatar [person]="{ id: 'u-img', name: 'Ada Lovelace', src: src }" size="lg" />`,
  }),
};

export const LongName: Story = {
  render: () => ({
    props: { name: LONG_TEXT },
    template: `<ath-avatar [name]="name" id="u-long" size="md" />`,
  }),
};
