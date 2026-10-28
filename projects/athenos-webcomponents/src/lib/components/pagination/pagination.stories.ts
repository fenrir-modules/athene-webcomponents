import type { Meta, StoryObj } from '@storybook/angular';
import { AthPaginationComponent } from './pagination.component';

const meta: Meta<AthPaginationComponent> = {
  title: 'Layout/Pagination',
  component: AthPaginationComponent,
  args: { page: 5, totalPages: 12, siblingCount: 1 },
  render: (args) => ({
    props: args,
    template: `<ath-pagination [page]="page" [totalPages]="totalPages" [siblingCount]="siblingCount" (pageChange)="page = $event" />`,
  }),
};

export default meta;
type Story = StoryObj<AthPaginationComponent>;

export const Numbered: Story = {};
export const FirstPage: Story = { args: { page: 1, totalPages: 3 } };
export const Cursor: Story = {
  render: () => ({
    template: `<ath-pagination mode="cursor" [hasPrev]="true" [hasNext]="false" summary="41–60 of 60" />`,
  }),
};
