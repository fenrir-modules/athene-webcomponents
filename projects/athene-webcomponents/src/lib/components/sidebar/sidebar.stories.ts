import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Calendar, Home, Inbox, Settings } from 'lucide';
import { AthNavItemComponent } from '../nav-item/nav-item.component';
import { AthSidebarComponent } from './sidebar.component';

const meta: Meta<AthSidebarComponent> = {
  title: 'Layout/Sidebar',
  component: AthSidebarComponent,
  decorators: [moduleMetadata({ imports: [AthNavItemComponent] })],
  parameters: { layout: 'fullscreen' },
  args: { collapsed: false },
  render: (args) => ({
    props: { ...args, Home, Inbox, Calendar, Settings },
    template: `
      <div style="height:480px;display:flex">
        <ath-sidebar [collapsed]="collapsed" (collapsedChange)="collapsed = $event">
          <div slot="header" style="padding:12px;font-weight:600">Athene</div>
          <ath-nav-item [icon]="Home" label="Home" route="/home" [compact]="collapsed" />
          <ath-nav-item [icon]="Inbox" label="Inbox" route="/inbox" [badge]="3" [compact]="collapsed" />
          <ath-nav-item [icon]="Calendar" label="Calendar" route="/calendar" [compact]="collapsed" />
          <div slot="footer"><ath-nav-item [icon]="Settings" label="Settings" route="/settings" [compact]="collapsed" /></div>
        </ath-sidebar>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthSidebarComponent>;

export const Expanded: Story = {};
export const Collapsed: Story = { args: { collapsed: true } };
