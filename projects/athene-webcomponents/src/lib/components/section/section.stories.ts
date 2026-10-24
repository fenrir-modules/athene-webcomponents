import type { Meta, StoryObj } from '@storybook/angular';
import { AthSectionComponent } from './section.component';

const meta: Meta<AthSectionComponent> = {
  title: 'Layout/Section',
  component: AthSectionComponent,
  args: {
    title: 'Notifications',
    description: 'Choose what reaches your inbox.',
    collapsible: false,
    expanded: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:560px">
        <ath-section [title]="title" [description]="description" [collapsible]="collapsible" [expanded]="expanded">
          <p style="margin:0">Section content.</p>
        </ath-section>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthSectionComponent>;

export const Default: Story = {};
export const Collapsible: Story = { args: { collapsible: true } };
export const Collapsed: Story = { args: { collapsible: true, expanded: false } };
