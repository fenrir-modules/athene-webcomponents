import type { Meta, StoryObj } from '@storybook/angular';
import { RTL_TEXT, STORY_ASSIGNEES } from '../../stories/story-data';
import { AthListboxComponent, type ListboxOption } from './listbox.component';

const MANY: ListboxOption[] = Array.from({ length: 300 }, (_, i) => ({
  value: `opt-${i}`,
  label: `Option ${i + 1}`,
}));

const frame = (inner: string) =>
  `<div style="width:280px;border:1px solid var(--border);border-radius:var(--r-lg);padding:4px">${inner}</div>`;

const meta: Meta<AthListboxComponent> = {
  title: 'Overlays/Listbox',
  component: AthListboxComponent,
};

export default meta;
type Story = StoryObj<AthListboxComponent>;

/** Single select with search and groups (inline, no popup). */
export const Single: Story = {
  render: () => ({
    props: { options: STORY_ASSIGNEES, value: 'ada' },
    template: frame(
      `<ath-listbox [options]="options" searchable [(value)]="value" ariaLabel="Assignee" />`
    ),
  }),
};

/** Multi select with check boxes and a "create" row for the typed query. */
export const MultiCreate: Story = {
  render: () => ({
    props: {
      options: [
        { value: 'bug', label: 'bug' },
        { value: 'ui', label: 'ui' },
        { value: 'backend', label: 'backend' },
      ],
      values: ['ui'],
    },
    template: frame(
      `<ath-listbox [options]="options" multiple searchable creatable [(values)]="values" ariaLabel="Labels" />`
    ),
  }),
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole('combobox'), 'ba');
  },
};

/** 300 options without a search field: typeahead, Home/End, PageUp/PageDown. */
export const ManyOptions: Story = {
  render: () => ({
    props: { options: MANY, value: null },
    template: frame(`<ath-listbox [options]="options" [(value)]="value" ariaLabel="Option" />`),
  }),
};

export const Loading: Story = {
  render: () => ({
    props: { options: [] },
    template: frame(`<ath-listbox [options]="options" searchable loading ariaLabel="People" />`),
  }),
};

export const NoMatches: Story = {
  render: () => ({
    props: { options: STORY_ASSIGNEES, query: 'zzz' },
    template: frame(
      `<ath-listbox [options]="options" searchable [(query)]="query" ariaLabel="Assignee" />`
    ),
  }),
};

export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: {
      options: [
        { value: 'a', label: RTL_TEXT, sublabel: 'a@example.com' },
        { value: 'b', label: 'سارة' },
      ],
      values: ['a'],
    },
    template: frame(
      `<ath-listbox [options]="options" multiple searchable [(values)]="values" ariaLabel="الأشخاص" />`
    ),
  }),
};

export const GermanLabels: Story = {
  globals: { labels: 'de' },
  render: () => ({
    props: { options: STORY_ASSIGNEES, query: 'zzz' },
    template: frame(
      `<ath-listbox [options]="options" searchable creatable [(query)]="query" ariaLabel="Zuständig" />`
    ),
  }),
};

/**
 * Driven from an outside field (an @-mention in a comment box): the textarea
 * keeps focus and forwards its keys to `handleKeydown()`; `autoActivate`
 * keeps the first person ready for Enter.
 */
export const OutsideField: Story = {
  render: () => ({
    props: { options: STORY_ASSIGNEES.slice(0, 4) },
    template: `
      <div style="width:320px;display:flex;flex-direction:column;gap:4px">
        <textarea aria-label="Comment" rows="2" style="font:inherit;padding:6px"
          [attr.aria-activedescendant]="people.activeId()"
          (keydown)="people.handleKeydown($event)">Thanks &#64;a</textarea>
        ${frame(`<ath-listbox #people [options]="options" autoActivate ariaLabel="People" />`)}
      </div>
    `,
  }),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('textbox'));
    await userEvent.keyboard('{ArrowDown}');
  },
};
