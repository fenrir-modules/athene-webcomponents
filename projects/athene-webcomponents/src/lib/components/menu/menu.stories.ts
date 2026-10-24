import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Archive, Copy, Pencil, Trash2 } from 'lucide-angular';
import { RTL_TEXT } from '../../stories/story-data';
import { AthButtonComponent } from '../button/button.component';
import { AthMenuComponent } from './menu.component';
import { AthMenuItemComponent, AthMenuSeparatorComponent } from './menu-item.component';
import { AthMenuTriggerDirective } from './menu-trigger.directive';

const meta: Meta<AthMenuComponent> = {
  title: 'Overlays/Menu',
  component: AthMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AthButtonComponent,
        AthMenuItemComponent,
        AthMenuSeparatorComponent,
        AthMenuTriggerDirective,
      ],
    }),
  ],
  argTypes: { align: { control: 'select', options: ['start', 'end', 'auto'] } },
  args: { align: 'start' },
  render: (args) => ({
    props: { ...args, Pencil, Copy, Archive, Trash2 },
    template: `
      <ath-button variant="ghost" [athMenuTrigger]="menu" ariaLabel="Actions">⋯</ath-button>
      <ath-menu #menu [align]="align">
        <button athMenuItem [icon]="Pencil" shortcut="E">Edit</button>
        <button athMenuItem [icon]="Copy" shortcut="⌘D">Duplicate</button>
        <button athMenuItem [icon]="Archive" disabled disabledReason="Only project leads can archive">Archive</button>
        <ath-menu-separator />
        <button athMenuItem [icon]="Trash2" variant="danger">Delete</button>
      </ath-menu>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthMenuComponent>;

const openTrigger: Story['play'] = async ({ canvas, userEvent }) => {
  // Keyboard, like a user: a synthetic click races the overlay's focus move.
  const trigger = canvas.getByRole('button', { name: /actions|view/i });
  trigger.focus();
  await userEvent.keyboard('{ArrowDown}');
};

/** Row / `⋯` menu: icons, shortcut hints, a separator, a disabled item with its reason, a danger item. */
export const RowActions: Story = { play: openTrigger };

export const Closed: Story = {};

/** Checkable items (`menuitemcheckbox`) that keep the menu open. */
export const Checkable: Story = {
  render: () => ({
    props: { compact: true, avatars: false },
    template: `
      <ath-button variant="secondary" [athMenuTrigger]="view">View</ath-button>
      <ath-menu #view>
        <button athMenuItem keepOpen [checked]="compact" (triggered)="compact = !compact">Compact rows</button>
        <button athMenuItem keepOpen [checked]="avatars" (triggered)="avatars = !avatars">Show avatars</button>
      </ath-menu>
    `,
  }),
  play: openTrigger,
};

export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  args: { align: 'auto' },
  render: (args) => ({
    props: { ...args, Pencil, Trash2, text: RTL_TEXT },
    template: `
      <ath-button variant="ghost" [athMenuTrigger]="menu" ariaLabel="Actions">⋯</ath-button>
      <ath-menu #menu [align]="align">
        <button athMenuItem [icon]="Pencil" shortcut="E">{{ text }}</button>
        <button athMenuItem [icon]="Trash2" variant="danger">حذف</button>
      </ath-menu>
    `,
  }),
  play: openTrigger,
};
