import type { Meta, StoryObj } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthBreadcrumbComponent, type BreadcrumbItem } from './breadcrumb.component';

const ITEMS: BreadcrumbItem[] = [
  { label: 'Projects', route: '/projects' },
  { label: 'Web', key: 'WEB', route: '/projects/web' },
  { label: 'Fix the login redirect', key: 'WEB-142' },
];

/** Longer than four steps: the middle folds into "…". */
const DEEP: BreadcrumbItem[] = [
  { label: 'Projects', route: '/projects' },
  { label: 'Atlas', key: 'ATL', route: '/projects/atlas' },
  { label: 'Board', route: '/projects/atlas', queryParams: { tab: 'board' } },
  { label: 'Checkout epic', key: 'ATL-1', route: '/tickets/atl-1' },
  { label: 'Cart over 50 items', key: 'ATL-8' },
];

const meta: Meta<AthBreadcrumbComponent> = {
  title: 'Layout/Breadcrumb',
  component: AthBreadcrumbComponent,
  render: () => ({ props: { items: ITEMS }, template: `<ath-breadcrumb [items]="items" />` }),
};

export default meta;
type Story = StoryObj<AthBreadcrumbComponent>;

export const Default: Story = {};
export const Folded: Story = {
  render: () => ({ props: { items: DEEP }, template: `<ath-breadcrumb [items]="items" />` }),
};
export const LongText: Story = {
  render: () => ({
    props: { items: [{ label: LONG_TEXT, route: '/a' }, { label: LONG_TEXT }] },
    template: `<div style="max-width:420px"><ath-breadcrumb [items]="items" /></div>`,
  }),
};
export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { items: [{ label: RTL_TEXT, route: '/a' }, { label: 'ATH-142' }] },
    template: `<ath-breadcrumb [items]="items" />`,
  }),
};
export const GermanLabels: Story = { globals: { labels: 'de' } };
