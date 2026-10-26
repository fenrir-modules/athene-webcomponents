import type { Meta, StoryObj } from '@storybook/angular';
import { Bookmark, Bug, CircleDot, Sparkles } from 'lucide';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthChipComponent } from './chip.component';

const meta: Meta<AthChipComponent> = {
  title: 'Display/Chip',
  component: AthChipComponent,
  argTypes: {
    kind: { control: 'select', options: ['tag', 'label', 'epic', 'type', 'status', 'count'] },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
    },
    shape: { control: 'select', options: ['pill', 'square'] },
  },
  args: { kind: 'tag', variant: 'default', shape: 'pill', removable: false },
  render: (args) => ({
    props: args,
    template: `<ath-chip [kind]="kind" [variant]="variant" [shape]="shape" [removable]="removable">authentication</ath-chip>`,
  }),
};

export default meta;
type Story = StoryObj<AthChipComponent>;

export const Default: Story = {};

/** `tag` in every semantic variant. */
export const Tags: Story = {
  render: () => ({
    props: { variants: ['default', 'primary', 'success', 'warning', 'error', 'info'] },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        @for (v of variants; track v) { <ath-chip [variant]="v">{{ v }}</ath-chip> }
      </div>
    `,
  }),
};

/**
 * `shape="square"`: the plain grey tag of dense ticket rows and board cards
 * (references 05/06), next to the default pill.
 */
export const SquareTags: Story = {
  render: () => ({
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <ath-chip>pill</ath-chip>
        <ath-chip shape="square">backend</ath-chip>
        <ath-chip shape="square">bug</ath-chip>
        <ath-chip kind="count" [count]="2" tooltip="api, design" />
      </div>
    `,
  }),
};

/** All kinds in one row: they share `--chip-h`, so they line up. */
export const Kinds: Story = {
  render: () => ({
    props: { Bug, Bookmark, Sparkles, CircleDot },
    template: `
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <ath-chip>tag</ath-chip>
        <ath-chip kind="label" color="var(--blue)">frontend</ath-chip>
        <ath-chip kind="label" color="var(--green)">docs</ath-chip>
        <ath-chip kind="epic" tooltip="Onboarding revamp">Onboarding revamp</ath-chip>
        <ath-chip kind="epic" color="var(--orange)" [icon]="Sparkles">Q4 polish</ath-chip>
        <ath-chip kind="type" [icon]="Bug" color="var(--red)" tooltip="Bug" />
        <ath-chip kind="type" [icon]="Bookmark" color="var(--blue)">Story</ath-chip>
        <ath-chip kind="type" [icon]="Bug" [muted]="true" tooltip="Bug (muted)" />
        <ath-chip kind="status" variant="warning">In progress</ath-chip>
        <ath-chip kind="status" variant="success" [icon]="CircleDot">Done</ath-chip>
        <ath-chip kind="count" [count]="3" tooltip="design, backend, api" />
      </div>
    `,
  }),
};

/** `removable`: the ✕ is labelled "Remove {name}" from `ATH_LABELS.removeItem`. */
export const Removable: Story = {
  render: () => ({
    props: {
      labels: ['frontend', 'backend', 'urgent'],
      drop(this: { labels: string[] }, l: string) {
        this.labels = this.labels.filter((x) => x !== l);
      },
    },
    template: `
      <div style="display:flex;gap:8px">
        @for (l of labels; track l) {
          <ath-chip kind="label" color="var(--purple)" [removable]="true" [name]="l"
            (removed)="drop(l)">{{ l }}</ath-chip>
        }
      </div>
    `,
  }),
};

export const LongText: Story = {
  render: () => ({
    props: { text: LONG_TEXT },
    template: `
      <div style="max-width:260px;display:grid;gap:8px;justify-items:start">
        <ath-chip>{{ text }}</ath-chip>
        <ath-chip kind="epic">{{ text }}</ath-chip>
        <ath-chip kind="label" color="var(--blue)" [removable]="true" name="long">{{ text }}</ath-chip>
      </div>
    `,
  }),
};

export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { text: RTL_TEXT },
    template: `
      <div style="display:flex;gap:8px">
        <ath-chip kind="label" color="var(--blue)" [removable]="true" name="x">{{ text }}</ath-chip>
        <ath-chip kind="epic">{{ text }}</ath-chip>
        <ath-chip kind="count" [count]="2" />
      </div>
    `,
  }),
};

export const GermanLabels: Story = {
  globals: { labels: 'de' },
  render: () => ({
    template: `
      <div style="display:flex;gap:8px">
        <ath-chip kind="label" color="var(--blue)" [removable]="true" name="frontend">frontend</ath-chip>
        <ath-chip kind="count" [count]="4" tooltip="a, b, c, d" />
      </div>
    `,
  }),
};
