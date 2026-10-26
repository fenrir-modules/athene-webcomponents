import type { Meta, StoryObj } from '@storybook/angular';
import { Inbox, MoreHorizontal } from 'lucide';
import { LONG_TEXT } from '../../stories/story-data';
import { AthNavItemComponent } from './nav-item.component';

const meta: Meta<AthNavItemComponent> = {
  title: 'Layout/Nav item',
  component: AthNavItemComponent,
  args: { label: 'Inbox', route: '/inbox', compact: false, badge: 3 },
  render: (args) => ({
    props: { ...args, Inbox },
    template: `
      <nav aria-label="Main" style="width:220px;display:flex;flex-direction:column">
        <ath-nav-item [icon]="Inbox" [label]="label" [route]="route" [compact]="compact" [badge]="badge" />
      </nav>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthNavItemComponent>;

export const Default: Story = {};
/** A collapsed rail: the label folds away, an unread count becomes a dot. */
export const Collapsed: Story = {
  args: { compact: true },
  render: (args) => ({
    props: { ...args, Inbox },
    template: `
      <nav aria-label="Main" style="width:56px;display:flex;flex-direction:column">
        <ath-nav-item [icon]="Inbox" [label]="label" [route]="route" [compact]="compact" [badge]="badge" />
      </nav>
    `,
  }),
};
/** Project rows: the key in the project's colour instead of an icon, then a muted row. */
export const ProjectRows: Story = {
  render: () => ({
    props: {
      MoreHorizontal,
      atlas: { text: 'ATL', color: 'var(--blue)' },
      web: { text: 'WEB', color: 'var(--green)' },
    },
    template: `
      <nav aria-label="Projects" style="width:220px;display:flex;flex-direction:column">
        <ath-nav-item [chip]="atlas" label="Atlas" route="/projects/atlas" />
        <ath-nav-item [chip]="web" label="Website relaunch" route="/projects/web" />
        <ath-nav-item [icon]="MoreHorizontal" label="All projects" route="/projects" [exact]="true" [muted]="true" />
      </nav>
    `,
  }),
};
export const LongText: Story = { args: { label: LONG_TEXT, badge: 128 } };
