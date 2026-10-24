import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Archive, Copy, Pencil, Trash2 } from 'lucide-angular';
import { AthButtonComponent } from '../button/button.component';
import { AthMenuComponent } from './menu.component';
import { AthMenuItemComponent, AthMenuSeparatorComponent } from './menu-item.component';
import { AthMenuTriggerDirective } from './menu-trigger.directive';

const meta: Meta<AthMenuComponent> = {
  title: 'Overlays/Menu',
  component: AthMenuComponent,
  tags: ['autodocs'],
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
  argTypes: {
    align: { control: 'select', options: ['start', 'end', 'auto'] },
  },
  args: { align: 'start' },
};

export default meta;
type Story = StoryObj<AthMenuComponent>;

/** Row / `⋯` menu: icons, shortcut hints, a separator, a disabled item with its reason, a danger item. */
export const RowActions: Story = {
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
};
