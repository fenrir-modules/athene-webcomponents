import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Copy, Pencil, Trash2 } from 'lucide-angular';
import { AthButtonComponent } from '../button/button.component';
import { AthDropdownComponent, DROPDOWN_SEPARATOR, type DropdownItem } from './dropdown.component';

const ITEMS: DropdownItem[] = [
  { id: 'edit', label: 'Edit', icon: Pencil, shortcut: 'E' },
  { id: 'copy', label: 'Copy link', icon: Copy },
  { id: 'move', label: 'Move', disabled: true, title: 'Only leads can move tickets' },
  DROPDOWN_SEPARATOR,
  { id: 'delete', label: 'Delete', icon: Trash2, variant: 'danger' },
];

const meta: Meta<AthDropdownComponent> = {
  title: 'Overlays/Dropdown',
  component: AthDropdownComponent,
  decorators: [moduleMetadata({ imports: [AthButtonComponent] })],
  argTypes: { align: { control: 'select', options: ['left', 'right', 'auto'] } },
  args: { align: 'auto' },
  render: (args) => ({
    props: { ...args, items: ITEMS, last: '' },
    template: `
      <ath-dropdown [items]="items" [align]="align" (itemClicked)="last = $event">
        <ath-button variant="secondary">Ticket actions</ath-button>
      </ath-dropdown>
      <span style="margin-inline-start:12px">{{ last }}</span>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthDropdownComponent>;

const open: Story['play'] = async ({ canvas, userEvent }) => {
  // Keyboard, like a user: a synthetic click races the overlay's focus move.
  const trigger = canvas.getByRole('button', { name: /ticket actions|more/i });
  trigger.focus();
  await userEvent.keyboard('{ArrowDown}');
};

export const Closed: Story = {};
export const Open: Story = { play: open };

/** Plain text trigger: wrapped in a `role="button"` with one tab stop. */
export const TextTrigger: Story = {
  render: () => ({
    props: { items: ITEMS },
    template: `<ath-dropdown [items]="items">More</ath-dropdown>`,
  }),
  play: open,
};

export const RightToLeft: Story = { globals: { dir: 'rtl' }, play: open };
