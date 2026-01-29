import type { Meta, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { AthInputComponent } from './input.component';

const meta: Meta<AthInputComponent> = {
  title: 'Components/Input',
  component: AthInputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<AthInputComponent>;

// Default
export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

// With Hint
export const WithHint: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    hint: 'Username must be 3-20 characters',
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    error: 'Please enter a valid email address',
  },
};

// Password
export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

// Required
export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    disabled: true,
  },
};

// All States
export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <ath-input label="Default" placeholder="Enter text" />
        <ath-input label="With Hint" placeholder="Enter text" hint="This is a helpful hint" />
        <ath-input label="With Error" placeholder="Enter text" error="This field is required" />
        <ath-input label="Password" type="password" placeholder="Enter password" />
        <ath-input label="Required" placeholder="Enter text" [required]="true" />
        <ath-input label="Disabled" placeholder="Enter text" [disabled]="true" />
      </div>
    `,
  }),
};
