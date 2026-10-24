import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AthButtonComponent } from '../button/button.component';
import { AthOptionPickerComponent } from '../listbox/option-picker.component';
import { AthDialogComponent } from './dialog.component';

const meta: Meta<AthDialogComponent> = {
  title: 'Overlays/Dialog',
  component: AthDialogComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [AthButtonComponent, AthOptionPickerComponent] })],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
  args: { size: 'md', closeOnBackdrop: true, closeOnEscape: true },
};

export default meta;
type Story = StoryObj<AthDialogComponent>;

/** Header / body / footer, with a picker inside: its panel floats above the dialog. */
export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      open: false,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'high', label: 'High' },
      ],
    },
    template: `
      <ath-button (clicked)="open = true">Open dialog</ath-button>
      <ath-dialog [(open)]="open" title="Create ticket" description="Fields marked * are required"
                  [size]="size" [closeOnBackdrop]="closeOnBackdrop" [closeOnEscape]="closeOnEscape">
        <label style="display:block;margin-bottom:8px">Title * <input autofocus /></label>
        <ath-option-picker [options]="options" placeholder="Priority" ariaLabel="Priority" />
        <div slot="footer">
          <ath-button variant="secondary" (clicked)="open = false">Cancel</ath-button>
          <ath-button (clicked)="open = false">Create</ath-button>
        </div>
      </ath-dialog>
    `,
  }),
};
