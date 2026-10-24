import type { Meta, StoryObj } from '@storybook/angular';
import { AthProjectKeyBadgeComponent } from './project-key-badge.component';

const meta: Meta<AthProjectKeyBadgeComponent> = {
  title: 'Display/Project key badge',
  component: AthProjectKeyBadgeComponent,
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { projectKey: 'ATH', color: '#4a7bd0', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<ath-project-key-badge [projectKey]="projectKey" [color]="color" [size]="size" />`,
  }),
};

export default meta;
type Story = StoryObj<AthProjectKeyBadgeComponent>;

export const Default: Story = {};
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <ath-project-key-badge projectKey="WEB" color="#3d8a5f" size="sm" />
        <ath-project-key-badge projectKey="API" color="#a35f1c" size="md" />
        <ath-project-key-badge projectKey="INFRA" color="#7c5cc4" size="lg" />
      </div>
    `,
  }),
};
