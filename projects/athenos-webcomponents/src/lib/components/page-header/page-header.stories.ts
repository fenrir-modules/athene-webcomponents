import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthButtonComponent } from '../button/button.component';
import { AthPageHeaderComponent } from './page-header.component';

const meta: Meta<AthPageHeaderComponent> = {
  title: 'Layout/Page header',
  component: AthPageHeaderComponent,
  decorators: [moduleMetadata({ imports: [AthButtonComponent] })],
  args: { title: 'Sprint 24', description: '', divider: true, level: 1 },
  render: (args) => ({
    props: { ...args, sub: ['12 tickets', 'ends Friday'] },
    template: `
      <ath-page-header [title]="title" [subItems]="sub" [description]="description"
        [divider]="divider" [level]="level">
        <ath-button variant="secondary" size="sm">Share</ath-button>
        <ath-button size="sm">New ticket</ath-button>
      </ath-page-header>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthPageHeaderComponent>;

export const Default: Story = {};
export const WithDescription: Story = {
  args: { description: 'Everything planned for the last two weeks of October.' },
};
export const LongText: Story = { args: { title: LONG_TEXT, description: LONG_TEXT } };
export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  args: { title: RTL_TEXT },
};
