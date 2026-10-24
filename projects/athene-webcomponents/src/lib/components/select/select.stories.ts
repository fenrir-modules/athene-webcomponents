import { ChangeDetectionStrategy, Component, afterNextRender, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthSelectComponent, type SelectOption } from './select.component';

const OPTIONS: SelectOption[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent', disabled: true },
];

/**
 * The value is known before the options: a saved setting read before the
 * list it picks from has loaded. The select shows it once they arrive.
 */
@Component({
  selector: 'ath-story-late-options',
  standalone: true,
  imports: [AthSelectComponent, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div style="max-width:280px">
    <ath-select label="Default priority" placeholder="" [options]="options()" [(ngModel)]="value" />
  </div>`,
})
class StoryLateOptionsComponent {
  protected readonly options = signal<SelectOption[]>([]);
  protected value = 'high';

  constructor() {
    afterNextRender(() => this.options.set([{ value: '', label: 'None' }, ...OPTIONS]));
  }
}

const meta: Meta<AthSelectComponent> = {
  title: 'Forms/Select',
  component: AthSelectComponent,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  argTypes: { size: { control: 'select', options: ['sm', 'md'] } },
  args: { label: 'Priority', hint: '', error: '', disabled: false, required: false, size: 'md' },
  render: (args) => ({
    props: { ...args, options: OPTIONS, value: 'medium' },
    template: `
      <div style="max-width:280px">
        <ath-select [label]="label" [options]="options" [hint]="hint" [error]="error"
          [disabled]="disabled" [required]="required" [size]="size" [(ngModel)]="value" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthSelectComponent>;

export const Default: Story = {};
export const Placeholder: Story = {
  render: () => ({
    props: { options: OPTIONS, value: '' },
    template: `<div style="max-width:280px"><ath-select label="Priority" placeholder="Choose a priority" [options]="options" [(ngModel)]="value" /></div>`,
  }),
};
export const WithHint: Story = { args: { hint: 'Used to order the backlog.' } };
export const WithError: Story = { args: { error: 'Pick a priority', required: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Small: Story = { args: { size: 'sm' } };
export const LongText: Story = {
  render: () => ({
    props: { options: [{ value: 'x', label: LONG_TEXT }], value: 'x' },
    template: `<div style="max-width:240px"><ath-select label="Status" [options]="options" [(ngModel)]="value" /></div>`,
  }),
};

/** Options that arrive after the value still show it (not the first option). */
export const OptionsAfterValue: Story = {
  decorators: [moduleMetadata({ imports: [StoryLateOptionsComponent] })],
  render: () => ({ template: `<ath-story-late-options />` }),
};
/** In a settings row the row's text names the select; `ariaLabel` gives it the same name. */
export const NamedByRow: Story = {
  render: () => ({
    props: { options: OPTIONS, value: 'medium' },
    template: `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;max-width:420px">
        <span>Default priority</span>
        <ath-select size="sm" placeholder="" ariaLabel="Default priority" [options]="options" [(ngModel)]="value" />
      </div>
    `,
  }),
};
