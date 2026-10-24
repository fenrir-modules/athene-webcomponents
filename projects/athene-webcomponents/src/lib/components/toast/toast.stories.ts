import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AthToastService } from '@athene/webcomponents/core';
import { AthButtonComponent } from '../button/button.component';
import { AthToastContainerComponent } from './toast.component';

/** Shows one toast per variant that stays (duration 0) for the screenshot. */
@Component({
  selector: 'ath-story-toasts',
  standalone: true,
  imports: [AthButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ath-button variant="secondary" (clicked)="more()">Show another toast</ath-button>`,
})
class StoryToastsComponent implements OnInit {
  private readonly toast = inject(AthToastService);

  ngOnInit(): void {
    this.toast.success('Ticket ATH-12 created', 0);
    this.toast.info('3 people are viewing this ticket', 0);
    this.toast.warning('You are offline; changes are kept locally', 0);
    this.toast.error('Could not save the sprint', {
      duration: 0,
      action: { label: 'Retry', run: () => undefined },
    });
  }

  more(): void {
    this.toast.info('Another one', 4000);
  }
}

const meta: Meta<AthToastContainerComponent> = {
  title: 'Feedback/Toast',
  component: AthToastContainerComponent,
  decorators: [moduleMetadata({ imports: [StoryToastsComponent] })],
  parameters: { visual: { mode: 'viewport' } },
  render: () => ({
    template: `<ath-story-toasts /><ath-toast-container />`,
  }),
};

export default meta;
type Story = StoryObj<AthToastContainerComponent>;

/** All variants, one with an action. The container is fixed at the viewport edge. */
export const Variants: Story = {};
