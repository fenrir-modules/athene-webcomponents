import type { Meta, StoryObj } from '@storybook/angular';
import { AthBannerComponent } from './banner.component';

const meta: Meta<AthBannerComponent> = {
  title: 'Feedback/Banner',
  component: AthBannerComponent,
  argTypes: { tone: { control: 'select', options: ['info', 'warning', 'danger', 'success'] } },
  args: { tone: 'info', title: 'New version', dismissible: true },
  render: (args) => ({
    props: args,
    template: `<ath-banner [tone]="tone" [title]="title" [dismissible]="dismissible">Reload to get the latest release.</ath-banner>`,
  }),
};

export default meta;
type Story = StoryObj<AthBannerComponent>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => ({
    props: { tones: ['info', 'warning', 'danger', 'success'] },
    template: `
      <div style="display:grid;gap:8px">
        @for (t of tones; track t) { <ath-banner [tone]="t" [title]="t">Banner body text.</ath-banner> }
      </div>
    `,
  }),
};
