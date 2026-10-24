import type { Meta, StoryObj } from '@storybook/angular';
import { AthTimerPillComponent } from './timer-pill.component';

const meta: Meta<AthTimerPillComponent> = {
  title: 'Display/Timer pill',
  component: AthTimerPillComponent,
  args: { active: false, seconds: 0, ticketKey: null },
  render: (args) => ({
    props: args,
    template: `<ath-timer-pill [active]="active" [seconds]="seconds" [ticketKey]="ticketKey" (toggled)="active = !active" />`,
  }),
};

export default meta;
type Story = StoryObj<AthTimerPillComponent>;

export const Idle: Story = {};
export const Running: Story = { args: { active: true, seconds: 4521, ticketKey: 'ATH-142' } };
export const Paused: Story = { args: { active: false, seconds: 905, ticketKey: 'ATH-142' } };
