import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  AthSkeletonCardComponent,
  AthSkeletonComponent,
  AthSkeletonListComponent,
  AthSkeletonTableComponent,
} from './skeleton.component';

const meta: Meta<AthSkeletonComponent> = {
  title: 'Feedback/Skeleton',
  component: AthSkeletonComponent,
  decorators: [
    moduleMetadata({
      imports: [AthSkeletonListComponent, AthSkeletonTableComponent, AthSkeletonCardComponent],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'row', 'card', 'text', 'circular', 'rectangular'],
    },
  },
  args: { variant: 'line', width: '60%', animated: true },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:480px"><ath-skeleton [variant]="variant" [width]="width" [animated]="animated" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<AthSkeletonComponent>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="max-width:480px;display:grid;gap:12px">
        <ath-skeleton variant="line" width="70%" />
        <ath-skeleton variant="text" />
        <ath-skeleton variant="row" />
        <ath-skeleton variant="card" />
        <div style="display:flex;gap:12px;align-items:center">
          <ath-skeleton variant="circular" width="32px" height="32px" />
          <ath-skeleton variant="rectangular" width="120px" height="48px" />
          <ath-skeleton variant="line" width="80px" [animated]="false" />
        </div>
      </div>
    `,
  }),
};

/** Lists announce `ATH_LABELS.loading` once (`role="status"`). */
export const List: Story = {
  render: () => ({
    template: `
      <div style="display:grid;gap:24px">
        <div style="max-width:520px"><ath-skeleton-list variant="row" [count]="4" /></div>
        <div style="max-width:520px"><ath-skeleton-list variant="card" [count]="2" /></div>
        <ath-skeleton-list variant="card-grid" [count]="6" />
      </div>
    `,
  }),
};

export const TableAndCard: Story = {
  render: () => ({
    template: `
      <div style="display:grid;gap:24px;max-width:640px">
        <ath-skeleton-table [rows]="4" [columns]="[15, 45, 20, 20]" />
        <ath-skeleton-card />
      </div>
    `,
  }),
};
