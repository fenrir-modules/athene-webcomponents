import type { Meta, StoryObj } from '@storybook/angular';
import { STORY_NOW, storyDay } from '../../stories/story-data';
import { AthDueLabelComponent } from './due-label.component';

const meta: Meta<AthDueLabelComponent> = {
  title: 'Display/Due label',
  component: AthDueLabelComponent,
  args: { done: false, compact: false },
  render: (args) => ({
    props: { ...args, now: STORY_NOW, date: storyDay(-2) },
    template: `<ath-due-label [date]="date" [now]="now" [done]="done" [compact]="compact" />`,
  }),
};

export default meta;
type Story = StoryObj<AthDueLabelComponent>;

export const Overdue: Story = {};

/** Each tone of the one colour rule: overdue and today red, 1–2 days amber, later muted, done muted. */
export const Tones: Story = {
  render: () => ({
    props: {
      now: STORY_NOW,
      rows: [
        { label: 'overdue (5 days)', date: storyDay(-5), done: false },
        { label: 'overdue (1 day)', date: storyDay(-1), done: false },
        { label: 'today', date: storyDay(0), done: false },
        { label: 'tomorrow', date: storyDay(1), done: false },
        { label: 'in 2 days', date: storyDay(2), done: false },
        { label: 'in 4 days', date: storyDay(4), done: false },
        { label: 'in 3 weeks', date: storyDay(21), done: false },
        { label: 'done, was overdue', date: storyDay(-3), done: true },
      ],
    },
    template: `
      <table style="border-collapse:collapse">
        @for (r of rows; track r.label) {
          <tr>
            <th scope="row" style="text-align:start;padding:4px 16px 4px 0;font-weight:400;color:var(--fg-3)">{{ r.label }}</th>
            <td style="padding:4px 16px 4px 0"><ath-due-label [date]="r.date" [now]="now" [done]="r.done" /></td>
            <td style="padding:4px 0"><ath-due-label [date]="r.date" [now]="now" [done]="r.done" [compact]="true" /></td>
          </tr>
        }
      </table>
    `,
  }),
};

/** A date that comes from the sprint: "Sprint end · date", compact keeps the icon only. */
export const SprintSource: Story = {
  render: () => ({
    props: { now: STORY_NOW, end: storyDay(3), soon: storyDay(1) },
    template: `
      <div style="display:grid;gap:8px;justify-items:start">
        <ath-due-label [date]="end" source="sprint" sprintName="Sprint 24" [now]="now" />
        <ath-due-label [date]="soon" source="sprint" sprintName="Sprint 24" [now]="now" />
        <ath-due-label [date]="end" source="sprint" sprintName="Sprint 24" [compact]="true" [now]="now" />
      </div>
    `,
  }),
};

/** The own date lies after the sprint's end: amber warning icon. */
export const AfterSprintEnd: Story = {
  render: () => ({
    props: { now: STORY_NOW, date: storyDay(9) },
    template: `<ath-due-label [date]="date" [afterSprintEnd]="true" sprintName="Sprint 24" [now]="now" />`,
  }),
};

export const Empty: Story = {
  render: () => ({
    props: { now: STORY_NOW },
    template: `<span>Due: <ath-due-label [date]="null" placeholder="—" [now]="now" /></span>`,
  }),
};

/** `ATH_LABELS` in German (toolbar "Labels"), with the German date context. */
export const GermanLabels: Story = {
  globals: { labels: 'de' },
  render: () => ({
    props: {
      now: STORY_NOW,
      a: storyDay(-2),
      b: storyDay(0),
      c: storyDay(1),
      d: storyDay(3),
      e: storyDay(30),
    },
    template: `
      <div style="display:flex;gap:16px">
        <ath-due-label [date]="a" [now]="now" />
        <ath-due-label [date]="b" [now]="now" />
        <ath-due-label [date]="c" [now]="now" />
        <ath-due-label [date]="d" [now]="now" [compact]="true" />
        <ath-due-label [date]="e" [now]="now" />
        <ath-due-label [date]="d" source="sprint" sprintName="Sprint 24" [now]="now" />
      </div>
    `,
  }),
};

export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { now: STORY_NOW, date: storyDay(9) },
    template: `<ath-due-label [date]="date" [afterSprintEnd]="true" sprintName="Sprint 24" [now]="now" />`,
  }),
};
