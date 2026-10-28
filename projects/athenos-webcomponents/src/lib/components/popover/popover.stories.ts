import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthButtonComponent } from '../button/button.component';
import { AthPopoverComponent, AthPopoverContentDirective } from './popover.component';
import { AthPopoverTriggerDirective } from './popover-trigger.directive';

const meta: Meta<AthPopoverComponent> = {
  title: 'Overlays/Popover',
  component: AthPopoverComponent,
  decorators: [
    moduleMetadata({
      imports: [AthButtonComponent, AthPopoverTriggerDirective, AthPopoverContentDirective],
    }),
  ],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'auto'] },
    align: { control: 'select', options: ['start', 'end', 'auto'] },
    side: { control: 'select', options: ['bottom', 'top'] },
  },
  args: { size: 'md', align: 'start', side: 'bottom', arrow: true, trapFocus: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:64px;overflow:hidden;padding:12px;border:1px dashed var(--border)">
        <ath-button variant="secondary" [athPopoverTrigger]="pop">Details</ath-button>
        <ath-popover #pop ariaLabel="Details" [size]="size" [align]="align" [side]="side"
                     [arrow]="arrow" [trapFocus]="trapFocus">
          <p style="margin:0 0 8px">Escape, a click outside or Tab out closes it; focus returns to the button.</p>
          <ath-button size="sm" (clicked)="pop.hide()">Done</ath-button>
        </ath-popover>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthPopoverComponent>;

const openTrigger: Story['play'] = async ({ canvas, userEvent }) => {
  // Keyboard, like a user: a synthetic click races the overlay's focus move.
  const trigger = canvas.getByRole('button', { name: 'Details' });
  trigger.focus();
  await userEvent.keyboard('{Enter}');
};

/** Open, inside a clipping container: the panel is in the top layer and is not cut off. */
export const Open: Story = { play: openTrigger };

/** Closed: only the trigger, with `aria-haspopup` / `aria-expanded="false"`. */
export const Closed: Story = {};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px">
        <ath-button variant="secondary" [athPopoverTrigger]="lg">Large</ath-button>
        <ath-popover #lg ariaLabel="Large" size="lg"><p style="margin:0">size="lg": 360px wide.</p></ath-popover>
      </div>
    `,
  }),
  play: async ({ canvas, userEvent }) => {
    // Keyboard, like a user: a synthetic click races the overlay's focus move.
    const trigger = canvas.getByRole('button', { name: 'Large' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
  },
};

/** `trapFocus`: Tab stays inside, `aria-modal`. */
export const TrapFocus: Story = { args: { trapFocus: true, arrow: false }, play: openTrigger };

/** Lazy content is created only while the panel is open. */
export const LazyContent: Story = {
  render: () => ({
    template: `
      <ath-button variant="secondary" [athPopoverTrigger]="pop">Open</ath-button>
      <ath-popover #pop ariaLabel="Lazy" size="sm">
        <ng-template athPopoverContent><p style="margin:0">Rendered on open.</p></ng-template>
      </ath-popover>
    `,
  }),
  play: async ({ canvas, userEvent }) => {
    // Keyboard, like a user: a synthetic click races the overlay's focus move.
    const trigger = canvas.getByRole('button', { name: 'Open' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
  },
};

export const LongText: Story = {
  render: () => ({
    props: { text: `${LONG_TEXT}. ${LONG_TEXT}.` },
    template: `
      <ath-button variant="secondary" [athPopoverTrigger]="pop">Details</ath-button>
      <ath-popover #pop ariaLabel="Details" size="sm"><p style="margin:0">{{ text }}</p></ath-popover>
    `,
  }),
  play: openTrigger,
};

export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  args: { align: 'auto' },
  render: (args) => ({
    props: { ...args, text: RTL_TEXT },
    template: `
      <ath-button variant="secondary" [athPopoverTrigger]="pop">Details</ath-button>
      <ath-popover #pop ariaLabel="Details" [align]="align" arrow><p style="margin:0">{{ text }}</p></ath-popover>
    `,
  }),
  play: openTrigger,
};
