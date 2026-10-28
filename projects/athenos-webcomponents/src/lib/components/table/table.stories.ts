import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthStatusPillComponent } from '../status-pill/status-pill.component';
import { AthTableComponent } from './table.component';

const meta: Meta<AthTableComponent> = {
  title: 'Display/Table',
  component: AthTableComponent,
  decorators: [moduleMetadata({ imports: [AthStatusPillComponent] })],
  render: () => ({
    props: { long: LONG_TEXT },
    template: `
      <ath-table>
        <thead><tr><th scope="col">Key</th><th scope="col">Title</th><th scope="col">Status</th><th scope="col">Points</th></tr></thead>
        <tbody>
          <tr><td>ATH-1</td><td>Login fails with SSO</td><td><ath-status-pill status="prog" /></td><td>3</td></tr>
          <tr><td>ATH-2</td><td>{{ long }}</td><td><ath-status-pill status="review" /></td><td>5</td></tr>
          <tr><td>ATH-3</td><td>Dark theme for the editor</td><td><ath-status-pill status="done" /></td><td>8</td></tr>
        </tbody>
      </ath-table>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthTableComponent>;

export const Default: Story = {};
