import type { Meta, StoryObj } from '@storybook/angular';
import { AthButtonComponent } from './button.component';

const meta: Meta<AthButtonComponent> = {
  title: 'Components/Button',
  component: AthButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
  },
  render: (args) => ({
    props: args,
    template: `<ath-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [fullWidth]="fullWidth"
    >Button Text</ath-button>`,
  }),
};

export default meta;
type Story = StoryObj<AthButtonComponent>;

// Primary Button
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
  },
};

// Secondary Button
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
};

// Outline Button
export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
  },
};

// Ghost Button
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
};

// Danger Button
export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
  },
};

// Loading State
export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <ath-button size="sm">Small</ath-button>
        <ath-button size="md">Medium</ath-button>
        <ath-button size="lg">Large</ath-button>
      </div>
    `,
  }),
};

// All Variants
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 16px;">
          <ath-button variant="primary">Primary</ath-button>
          <ath-button variant="secondary">Secondary</ath-button>
          <ath-button variant="outline">Outline</ath-button>
          <ath-button variant="ghost">Ghost</ath-button>
          <ath-button variant="danger">Danger</ath-button>
        </div>
        <div style="display: flex; gap: 16px;">
          <ath-button variant="primary" [disabled]="true">Disabled</ath-button>
          <ath-button variant="primary" [loading]="true">Loading</ath-button>
        </div>
      </div>
    `,
  }),
};
