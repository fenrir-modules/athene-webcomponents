import type { Meta, StoryObj } from '@storybook/angular';
import { AthSparklineComponent } from './sparkline.component';

const TREND = [3, 5, 4, 8, 6, 9, 12, 10, 14];

const meta: Meta<AthSparklineComponent> = {
  title: 'Display/Sparkline',
  component: AthSparklineComponent,
  args: { width: 70, height: 22, showDot: true, showArea: true, strokeWidth: 1.2 },
  render: (args) => ({
    props: { ...args, data: TREND },
    template: `<ath-sparkline [data]="data" [width]="width" [height]="height" [showDot]="showDot"
      [showArea]="showArea" [strokeWidth]="strokeWidth" />`,
  }),
};

export default meta;
type Story = StoryObj<AthSparklineComponent>;

export const Default: Story = {};
export const Colours: Story = {
  render: () => ({
    props: { data: TREND, down: [...TREND].reverse(), flat: [4, 4, 4, 4] },
    template: `
      <div style="display:flex;gap:24px;align-items:center">
        <ath-sparkline [data]="data" color="var(--green)" [width]="120" [height]="32" />
        <ath-sparkline [data]="down" color="var(--red)" [width]="120" [height]="32" />
        <ath-sparkline [data]="flat" color="var(--blue)" [width]="120" [height]="32" [showArea]="false" />
      </div>
    `,
  }),
};
/** Fewer than two samples (or all zero) draws nothing. */
export const NotEnoughData: Story = {
  render: () => ({
    template: `<span>[<ath-sparkline [data]="[5]" />] [<ath-sparkline [data]="[0, 0, 0]" />]</span>`,
  }),
};
