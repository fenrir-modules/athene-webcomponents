import type { Meta, StoryObj } from '@storybook/angular';
import { AthSaveBarComponent } from './save-bar.component';

const meta: Meta<AthSaveBarComponent> = {
  title: 'Feedback/Save bar',
  component: AthSaveBarComponent,
  args: { open: true, saving: false, confirmDiscard: true, message: null },
  render: (args) => ({
    props: { ...args, log: '' },
    template: `
      <div style="height:320px;overflow:auto;border:1px dashed var(--border);padding:16px">
        <p style="height:420px;margin:0;color:var(--fg-3)">Editor content…</p>
        <ath-save-bar [open]="open" [saving]="saving" [confirmDiscard]="confirmDiscard"
          [message]="message" (save)="log = 'saved'" (discard)="log = 'discarded'; open = false" />
      </div>
      <p style="color:var(--fg-3)">{{ log }}</p>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthSaveBarComponent>;

export const Open: Story = {};
export const Saving: Story = { args: { saving: true } };
export const WithoutConfirm: Story = { args: { confirmDiscard: false } };
export const CustomMessage: Story = { args: { message: 'Rolle „Developer“ geändert' } };
