import type { Meta, StoryObj } from '@storybook/angular';
import { AthSearchInputComponent } from './search-input.component';

const meta: Meta<AthSearchInputComponent> = {
  title: 'Forms/Search input',
  component: AthSearchInputComponent,
  args: { placeholder: 'Search tickets…', debounce: 300 },
  render: (args) => ({
    props: { ...args, last: '' },
    template: `
      <div style="max-width:320px">
        <ath-search-input [placeholder]="placeholder" [debounce]="debounce" (searched)="last = $event" />
        <p style="margin-top:8px;color:var(--fg-3)">Searched: {{ last || '–' }}</p>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthSearchInputComponent>;

export const Default: Story = {};

/** With a query typed: the clear button appears. */
export const WithQuery: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByPlaceholderText('Search tickets…'), 'login bug');
  },
};

export const RightToLeft: Story = { globals: { dir: 'rtl' }, args: { placeholder: 'بحث…' } };
