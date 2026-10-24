import type { Meta, StoryObj } from '@storybook/angular';
import { Inbox, ListTodo, MessageSquare, Plus } from 'lucide-angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthEmptyStateComponent } from './empty-state.component';

const meta: Meta<AthEmptyStateComponent> = {
  title: 'Display/Empty state',
  component: AthEmptyStateComponent,
  render: () => ({
    props: { Inbox, Plus },
    template: `
      <ath-empty-state message="Inbox zero" subMessage="Mentions and assignments will show up here."
        [icon]="Inbox" actionLabel="New ticket" [actionIcon]="Plus" secondaryActionLabel="Settings" />
    `,
  }),
};

export default meta;
type Story = StoryObj<AthEmptyStateComponent>;

export const Default: Story = {};

/** Compact, with "what will appear here" hints. */
export const CompactWithHints: Story = {
  render: () => ({
    props: {
      ListTodo,
      hints: [
        { icon: ListTodo, label: 'Tickets assigned to you', sub: 'sorted by due date' },
        { icon: MessageSquare, label: 'Mentions', sub: 'from comments and notes' },
      ],
    },
    template: `
      <div style="max-width:520px">
        <ath-empty-state size="compact" message="Nothing assigned yet" [icon]="ListTodo" [hints]="hints" actionLabel="Browse backlog" />
      </div>
    `,
  }),
};

export const Bare: Story = {
  render: () => ({
    template: `<ath-empty-state [bare]="true" message="No results" subMessage="Try a different filter." />`,
  }),
};

export const LongText: Story = {
  render: () => ({
    props: { text: LONG_TEXT, Inbox },
    template: `<div style="max-width:320px"><ath-empty-state [message]="text" [subMessage]="text" [icon]="Inbox" [actionLabel]="text" /></div>`,
  }),
};
