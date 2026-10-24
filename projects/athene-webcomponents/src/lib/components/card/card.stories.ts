import type { Meta, StoryObj } from '@storybook/angular';
import { AthCardComponent } from './card.component';

const meta: Meta<AthCardComponent> = {
  title: 'Display/Card',
  component: AthCardComponent,
  argTypes: { padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] } },
  args: { padding: 'md', bordered: true, hoverable: false, header: false, footer: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:360px">
        <ath-card [padding]="padding" [bordered]="bordered" [hoverable]="hoverable" [header]="header" [footer]="footer">
          <div slot="header"><strong>Release notes</strong></div>
          <p style="margin:0">Cards group related content on a surface.</p>
          <div slot="footer">Updated 2h ago</div>
        </ath-card>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthCardComponent>;

export const Default: Story = {};
export const WithHeaderAndFooter: Story = { args: { header: true, footer: true } };
export const Borderless: Story = { args: { bordered: false, padding: 'lg' } };
