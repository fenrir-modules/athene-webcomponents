import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import type { AthAction } from '../button/button.action';
import { AthAlertComponent } from './alert.component';

const meta: Meta<AthAlertComponent> = {
  title: 'Feedback/Alert',
  component: AthAlertComponent,
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warn', 'error'] },
    appearance: { control: 'select', options: ['inline', 'banner'] },
  },
  args: { variant: 'info', appearance: 'inline', dismissible: false },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:560px"><ath-alert [variant]="variant" [appearance]="appearance"
      [dismissible]="dismissible" title="Heads up" message="The workspace will be read-only on Saturday 22:00–22:30." /></div>`,
  }),
};

export default meta;
type Story = StoryObj<AthAlertComponent>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => ({
    props: { variants: ['info', 'success', 'warn', 'error'] },
    template: `
      <div style="max-width:560px;display:grid;gap:12px">
        @for (v of variants; track v) {
          <ath-alert [variant]="v" [title]="v" message="Something the reader should know." [dismissible]="true" />
        }
      </div>
    `,
  }),
};

/** `[retry]` is an `ath-button [action]`: busy while it runs. */
export const ErrorWithRetry: Story = {
  render: () => ({
    props: {
      reload: (() => new Promise((resolve) => setTimeout(resolve, 1200))) satisfies AthAction,
    },
    template: `<div style="max-width:560px"><ath-alert variant="error" message="Could not load the sprint." [retry]="reload" /></div>`,
  }),
};

export const Banner: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    template: `
      <div style="display:grid;gap:8px">
        <ath-alert variant="warn" appearance="banner" title="Maintenance" message="Sat 22:00–22:30" [dismissible]="true" />
        <ath-alert variant="error" appearance="banner" message="You are offline. Changes are kept locally." />
      </div>
    `,
  }),
};

/** No message and nothing projected: takes no space, so `[message]="error()"` can stay in a template. */
export const EmptyTakesNoSpace: Story = {
  render: () => ({
    template: `<div style="border:1px dashed var(--border);padding:8px">before<ath-alert variant="error" [message]="null" />after</div>`,
  }),
};

export const LongText: Story = {
  render: () => ({
    props: { text: `${LONG_TEXT}. ${LONG_TEXT}.` },
    template: `<div style="max-width:360px"><ath-alert variant="warn" [title]="text" [message]="text" [dismissible]="true" /></div>`,
  }),
};

export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { text: RTL_TEXT },
    template: `<div style="max-width:420px"><ath-alert variant="info" [title]="text" [message]="text" [dismissible]="true" /></div>`,
  }),
};

export const GermanLabels: Story = {
  globals: { labels: 'de' },
  render: () => ({
    props: { reload: (() => undefined) satisfies AthAction },
    template: `<div style="max-width:420px"><ath-alert variant="error" message="Laden fehlgeschlagen." [retry]="reload" [dismissible]="true" /></div>`,
  }),
};
