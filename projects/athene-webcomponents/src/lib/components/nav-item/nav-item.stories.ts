import type { Meta, StoryObj } from '@storybook/angular';
import { Inbox } from 'lucide-angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthNavItemComponent } from './nav-item.component';

const meta: Meta<AthNavItemComponent> = {
  title: 'Layout/Nav item',
  component: AthNavItemComponent,
  args: { label: 'Inbox', link: '/inbox', collapsed: false, badgeCount: 3 },
  render: (args) => ({
    props: { ...args, Inbox },
    template: `
      <nav aria-label="Main" style="width:220px">
        <ath-nav-item [icon]="Inbox" [label]="label" [link]="link" [collapsed]="collapsed" [badgeCount]="badgeCount" />
      </nav>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthNavItemComponent>;

export const Default: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
export const LongText: Story = { args: { label: LONG_TEXT, badgeCount: 128 } };
