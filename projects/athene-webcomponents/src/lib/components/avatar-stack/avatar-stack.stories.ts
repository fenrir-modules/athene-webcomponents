import type { Meta, StoryObj } from '@storybook/angular';
import { STORY_PEOPLE } from '../../stories/story-data';
import { AthAvatarStackComponent, type StackedUser } from './avatar-stack.component';

const USERS: StackedUser[] = STORY_PEOPLE.map((p) => ({ name: p.name ?? '' }));

const meta: Meta<AthAvatarStackComponent> = {
  title: 'Display/Avatar stack',
  component: AthAvatarStackComponent,
  argTypes: { size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] } },
  args: { max: 4, size: 'sm' },
  render: (args) => ({
    props: { ...args, users: USERS },
    template: `<ath-avatar-stack [users]="users" [max]="max" [size]="size" />`,
  }),
};

export default meta;
type Story = StoryObj<AthAvatarStackComponent>;

export const Overflow: Story = {};
export const FitsAll: Story = { args: { max: 10 } };
export const Empty: Story = {
  render: () => ({ template: `<ath-avatar-stack [users]="[]" />` }),
};
export const RightToLeft: Story = { globals: { dir: 'rtl' }, args: { size: 'md' } };
