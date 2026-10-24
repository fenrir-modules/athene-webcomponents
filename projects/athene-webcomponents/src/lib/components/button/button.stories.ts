import type { Meta, StoryObj } from '@storybook/angular';
import { RTL_TEXT } from '../../stories/story-data';
import type { AthAction } from './button.action';
import { AthButtonComponent } from './button.component';

const meta: Meta<AthButtonComponent> = {
  title: 'Forms/Button',
  component: AthButtonComponent,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'danger-ghost'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: { variant: 'primary', size: 'md', disabled: false, loading: false, fullWidth: false },
  render: (args) => ({
    props: args,
    template: `<ath-button [variant]="variant" [size]="size" [disabled]="disabled"
      [loading]="loading" [fullWidth]="fullWidth">Save changes</ath-button>`,
  }),
};

export default meta;
type Story = StoryObj<AthButtonComponent>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true } };

export const Loading: Story = { args: { loading: true } };

/** Every variant at rest, disabled and loading. */
export const Variants: Story = {
  render: () => ({
    props: { variants: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'danger-ghost'] },
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,max-content);gap:12px;align-items:center">
        @for (v of variants; track v) {
          <ath-button [variant]="v">{{ v }}</ath-button>
          <ath-button [variant]="v" [disabled]="true">{{ v }}</ath-button>
          <ath-button [variant]="v" [loading]="true">{{ v }}</ath-button>
        }
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <ath-button size="xs">Extra small</ath-button>
        <ath-button size="sm">Small</ath-button>
        <ath-button size="md">Medium</ath-button>
        <ath-button size="lg">Large</ath-button>
      </div>
    `,
  }),
};

/** Toggle and disclosure buttons expose `aria-pressed` / `aria-expanded`. */
export const PressedAndExpanded: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:12px">
        <ath-button variant="secondary" [pressed]="true">Bold (pressed)</ath-button>
        <ath-button variant="secondary" [pressed]="false">Italic</ath-button>
        <ath-button variant="ghost" [expanded]="true" controls="panel-x">Filters (expanded)</ath-button>
      </div>
      <div id="panel-x" style="margin-top:8px">Filter panel</div>
    `,
  }),
};

export const LongText: Story = {
  render: () => ({
    template: `
      <div style="width:220px;display:grid;gap:8px">
        <ath-button [fullWidth]="true">A very long button label that has to wrap or truncate somewhere</ath-button>
        <ath-button variant="secondary">Kurz</ath-button>
      </div>
    `,
  }),
};

export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { text: RTL_TEXT },
    template: `
      <div style="display:flex;gap:12px">
        <ath-button>{{ text }}</ath-button>
        <ath-button variant="secondary" [loading]="true">{{ text }}</ath-button>
      </div>
    `,
  }),
};

/**
 * `[action]`: the button is busy (disabled, spinner, `aria-busy`) until the
 * returned Promise settles. This one never settles, so the play function
 * leaves it busy for the screenshot.
 */
export const ActionBusy: Story = {
  render: () => ({
    props: { save: (() => new Promise<never>(() => undefined)) satisfies AthAction },
    template: `<ath-button [action]="save">Save</ath-button>`,
  }),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /save/i }));
  },
};

/** `[action]` that settles after 1.5 s; `(done)` and `(failed)` report the result. */
export const ActionRoundTrip: Story = {
  tags: ['!visual'],
  render: () => ({
    props: {
      result: '–',
      ok: (() =>
        new Promise((resolve) => setTimeout(() => resolve('saved'), 1500))) satisfies AthAction,
      fail: (() =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Network down')), 1500)
        )) satisfies AthAction,
    },
    template: `
      <div style="display:flex;gap:12px;align-items:center">
        <ath-button [action]="ok" (done)="result = 'done: ' + $event">Save</ath-button>
        <ath-button variant="danger" [action]="fail" (failed)="result = 'failed'">Fail</ath-button>
        <span>{{ result }}</span>
      </div>
    `,
  }),
};
