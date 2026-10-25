import type { Meta, StoryObj } from '@storybook/angular';
import { AthAiMarkComponent } from './ai-mark.component';

const meta: Meta<AthAiMarkComponent> = {
  title: 'Display/AI Mark',
  component: AthAiMarkComponent,
  argTypes: {
    variant: { control: 'select', options: ['color', 'mono', 'gradient'] },
    size: { control: { type: 'number', min: 12, max: 128 } },
  },
  args: { size: 24, variant: 'color', label: 'Athene AI', wordmark: false },
};

export default meta;
type Story = StoryObj<AthAiMarkComponent>;

export const Default: Story = {};

/** The optical sizes: up to 20 px the small drawing, from 21 px the regular one. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;align-items:end">
        @for (s of [16, 20, 24, 32, 48]; track s) {
          <ath-ai-mark [size]="s" />
        }
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:24px;align-items:center">
        <ath-ai-mark [size]="48" variant="color" />
        <ath-ai-mark [size]="48" variant="mono" />
        <ath-ai-mark [size]="48" variant="gradient" />
      </div>
    `,
  }),
};

export const Wordmark: Story = {
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <ath-ai-mark [size]="16" wordmark />
        <ath-ai-mark [size]="24" wordmark />
        <ath-ai-mark [size]="40" variant="gradient" wordmark />
      </div>
    `,
  }),
};
