import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthBreadcrumbComponent, type BreadcrumbItem } from './breadcrumb.component';

const ITEMS: BreadcrumbItem[] = [
  { label: 'Projects', link: '/projects' },
  { label: 'Web', link: '/projects/web' },
  { label: 'ATH-142' },
];

const meta: Meta<AthBreadcrumbComponent> = {
  title: 'Layout/Breadcrumb',
  component: AthBreadcrumbComponent,
  render: () => ({ props: { items: ITEMS }, template: `<ath-breadcrumb [items]="items" />` }),
};

export default meta;
type Story = StoryObj<AthBreadcrumbComponent>;

export const Default: Story = {};
export const LongText: Story = {
  render: () => ({
    props: { items: [{ label: LONG_TEXT, link: '/a' }, { label: LONG_TEXT }] },
    template: `<div style="max-width:420px"><ath-breadcrumb [items]="items" /></div>`,
  }),
};
export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { items: [{ label: RTL_TEXT, link: '/a' }, { label: 'ATH-142' }] },
    template: `<ath-breadcrumb [items]="items" />`,
  }),
};
export const GermanLabels: Story = { globals: { labels: 'de' } };
