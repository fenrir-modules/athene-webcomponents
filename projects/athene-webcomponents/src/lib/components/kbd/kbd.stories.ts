import type { Meta, StoryObj } from '@storybook/angular';
import { AthKbdComponent } from './kbd.component';

const meta: Meta<AthKbdComponent> = {
  title: 'Display/Kbd',
  component: AthKbdComponent,
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { size: 'md', label: '' },
  render: (args) => ({
    props: args,
    template: `<span>Open the palette with <ath-kbd [size]="size">⌘</ath-kbd> <ath-kbd [size]="size">K</ath-kbd></span>`,
  }),
};

export default meta;
type Story = StoryObj<AthKbdComponent>;

export const Default: Story = {};
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <ath-kbd size="sm">Esc</ath-kbd><ath-kbd size="md">Enter</ath-kbd><ath-kbd size="lg">⇧ Shift</ath-kbd>
      </div>
    `,
  }),
};
