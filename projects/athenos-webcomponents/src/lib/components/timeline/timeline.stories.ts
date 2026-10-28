import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AthTimelineEntryComponent } from './timeline-entry.component';
import { AthTimelineEventComponent } from './timeline-event.component';
import { AthTimelineComponent } from './timeline.component';

const meta: Meta<AthTimelineComponent> = {
  title: 'Display/Timeline',
  component: AthTimelineComponent,
  decorators: [moduleMetadata({ imports: [AthTimelineEntryComponent, AthTimelineEventComponent] })],
  render: () => ({
    template: `
      <div style="max-width:560px">
        <ath-timeline>
          <ath-timeline-entry author="Ada Lovelace" avatarName="Ada Lovelace" timeLabel="48m ago">
            <p>Pushed a first pass to a feature branch.</p>
          </ath-timeline-entry>
          <ath-timeline-event statusColor="var(--green)">
            <b>Ada</b> moved this to In progress · 2h ago
          </ath-timeline-event>
          <ath-timeline-entry author="Alan Turing" avatarName="Alan Turing" timeLabel="1d ago" [internal]="true">
            <p>Internal note: check with support before closing.</p>
          </ath-timeline-entry>
          <ath-timeline-event>
            <b>Grace</b> created the ticket · 3d ago
          </ath-timeline-event>
        </ath-timeline>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthTimelineComponent>;

export const Default: Story = {};
