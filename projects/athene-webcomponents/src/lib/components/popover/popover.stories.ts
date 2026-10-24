import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AthButtonComponent } from '../button/button.component';
import { AthPopoverComponent, AthPopoverContentDirective } from './popover.component';
import { AthPopoverTriggerDirective } from './popover-trigger.directive';

const meta: Meta<AthPopoverComponent> = {
  title: 'Overlays/Popover',
  component: AthPopoverComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AthButtonComponent, AthPopoverTriggerDirective, AthPopoverContentDirective],
    }),
  ],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'auto'] },
    align: { control: 'select', options: ['start', 'end', 'auto'] },
    side: { control: 'select', options: ['bottom', 'top'] },
    arrow: { control: 'boolean' },
    trapFocus: { control: 'boolean' },
  },
  args: { size: 'md', align: 'start', side: 'bottom', arrow: true, trapFocus: false },
};

export default meta;
type Story = StoryObj<AthPopoverComponent>;

/** Inside a clipping container: the panel is in the top layer and is not cut off. */
export const Default: Story = {
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
};
