import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AthListboxComponent, type ListboxOption } from './listbox.component';
import { AthOptionPickerComponent } from './option-picker.component';

const PEOPLE: ListboxOption[] = [
  { value: 'me', label: 'Me', group: 'Shortcuts' },
  { value: 'none', label: 'Unassigned', group: 'Shortcuts' },
  { value: 'ada', label: 'Ada Lovelace', sublabel: 'ada@example.com' },
  { value: 'alan', label: 'Alan Turing', sublabel: 'alan@example.com' },
  { value: 'grace', label: 'Grace Hopper', sublabel: 'grace@example.com' },
  { value: 'jurgen', label: 'Jürgen Müller', sublabel: 'jm@example.com', keywords: 'juergen' },
  { value: 'linus', label: 'Linus Torvalds', disabled: true },
];

const MANY: ListboxOption[] = Array.from({ length: 300 }, (_, i) => ({
  value: `opt-${i}`,
  label: `Option ${i + 1}`,
}));

const meta: Meta<AthListboxComponent> = {
  title: 'Overlays/Listbox',
  component: AthListboxComponent,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [AthOptionPickerComponent] })],
};

export default meta;
type Story = StoryObj<AthListboxComponent>;

/** Single select with search and groups (inline, no popup). */
export const Single: Story = {
  render: () => ({
    props: { options: PEOPLE, value: 'ada' },
    template: `
      <div style="width:280px;border:1px solid var(--border);border-radius:var(--r-lg);padding:4px">
        <ath-listbox [options]="options" searchable [(value)]="value" ariaLabel="Assignee" />
      </div>
      <p>Value: {{ value }}</p>
    `,
  }),
};

/** Multi select with checkmarks and a "create" row. */
export const MultiCreate: Story = {
  render: () => ({
    props: {
      options: [
        { value: 'bug', label: 'bug' },
        { value: 'ui', label: 'ui' },
        { value: 'backend', label: 'backend' },
      ],
      values: ['ui'],
      created: '',
    },
    template: `
      <div style="width:280px;border:1px solid var(--border);border-radius:var(--r-lg);padding:4px">
        <ath-listbox [options]="options" multiple searchable creatable [(values)]="values"
                     ariaLabel="Labels" (create)="created = $event" />
      </div>
      <p>Values: {{ values.join(', ') }} · created: {{ created }}</p>
    `,
  }),
};

/** 300 options without a search field: typeahead, Home/End, PageUp/PageDown. */
export const ManyOptions: Story = {
  render: () => ({
    props: { options: MANY, value: null },
    template: `
      <div style="width:240px;border:1px solid var(--border);border-radius:var(--r-lg);padding:4px">
        <ath-listbox [options]="options" [(value)]="value" ariaLabel="Option" />
      </div>
    `,
  }),
};

/** The option picker: popover + listbox behind a select-style trigger. */
export const OptionPicker: Story = {
  render: () => ({
    props: { options: PEOPLE, value: null, values: [] },
    template: `
      <div style="display:flex;gap:12px">
        <ath-option-picker [options]="options" [(value)]="value" clearable ariaLabel="Assignee"
                           placeholder="Assignee" matchWidth />
        <ath-option-picker [options]="options" multiple [(values)]="values" ariaLabel="Watchers"
                           placeholder="Watchers" />
      </div>
    `,
  }),
};
