import type { Meta, StoryObj } from '@storybook/angular';
import { RTL_TEXT } from '../../stories/story-data';
import { AthSegmentComponent, type SegmentOption } from './segment.component';

const VIEWS: SegmentOption[] = [
  { value: 'list', label: 'List', count: 24 },
  { value: 'board', label: 'Board' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'timeline', label: 'Timeline', disabled: true },
];

const meta: Meta<AthSegmentComponent<string>> = {
  title: 'Forms/Segment',
  component: AthSegmentComponent,
  argTypes: { size: { control: 'select', options: ['sm', 'md'] } },
  args: { size: 'md' },
  render: (args) => ({
    props: { ...args, options: VIEWS, value: 'list' },
    template: `<ath-segment [options]="options" [value]="value" [size]="size" ariaLabel="View"
      (valueChange)="value = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<AthSegmentComponent<string>>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: {
      options: [
        { value: 'a', label: RTL_TEXT, count: 3 },
        { value: 'b', label: 'لوحة' },
      ],
      value: 'a',
    },
    template: `<ath-segment [options]="options" [value]="value" ariaLabel="عرض" (valueChange)="value = $event" />`,
  }),
};
