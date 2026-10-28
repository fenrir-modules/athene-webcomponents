import type { Meta, StoryObj } from '@storybook/angular';
import { AthFileDropComponent } from './file-drop.component';

const meta: Meta<AthFileDropComponent> = {
  title: 'Forms/File drop',
  component: AthFileDropComponent,
  args: {
    accept: null,
    multiple: true,
    maxSizeMb: 10,
    disabled: false,
    prompt: 'Drop files or click to browse',
  },
  render: (args) => ({
    props: { ...args, picked: 0 },
    template: `
      <div style="max-width:420px">
        <ath-file-drop [accept]="accept" [multiple]="multiple" [maxSizeMb]="maxSizeMb"
          [disabled]="disabled" [prompt]="prompt" (filesPicked)="picked = $event.length" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthFileDropComponent>;

export const Default: Story = {};
export const ImagesOnly: Story = {
  args: { accept: 'image/*', multiple: false, prompt: 'Drop an image' },
};
export const Disabled: Story = { args: { disabled: true } };
