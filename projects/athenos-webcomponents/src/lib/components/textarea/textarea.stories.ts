import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthTextareaComponent } from './textarea.component';

const meta: Meta<AthTextareaComponent> = {
  title: 'Forms/Textarea',
  component: AthTextareaComponent,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  argTypes: { resize: { control: 'select', options: ['none', 'vertical', 'both'] } },
  args: {
    label: 'Description',
    placeholder: 'What needs to happen?',
    rows: 4,
    hint: '',
    error: '',
    disabled: false,
    required: false,
    resize: 'vertical',
    maxLength: null,
  },
  render: (args) => ({
    props: { ...args, value: '' },
    template: `
      <div style="max-width:420px">
        <ath-textarea [label]="label" [placeholder]="placeholder" [rows]="rows" [hint]="hint"
          [error]="error" [disabled]="disabled" [required]="required" [resize]="resize"
          [maxLength]="maxLength" [(ngModel)]="value" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthTextareaComponent>;

export const Default: Story = {};
export const WithCounter: Story = { args: { maxLength: 200, hint: 'Markdown is supported.' } };
export const WithError: Story = { args: { error: 'A description is required', required: true } };
export const Disabled: Story = { args: { disabled: true } };
export const LongText: Story = {
  render: () => ({
    props: { value: `${LONG_TEXT}. ${LONG_TEXT}. ${LONG_TEXT}.` },
    template: `<div style="max-width:320px"><ath-textarea label="Notes" [rows]="3" [(ngModel)]="value" /></div>`,
  }),
};
export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { value: RTL_TEXT },
    template: `<div style="max-width:320px"><ath-textarea label="ملاحظات" [maxLength]="100" [(ngModel)]="value" /></div>`,
  }),
};
