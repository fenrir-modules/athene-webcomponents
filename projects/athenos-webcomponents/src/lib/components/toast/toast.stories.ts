import { ChangeDetectionStrategy, Component, inject, input, type OnInit } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AthToastService } from '@athenos/webcomponents/core';
import { AthButtonComponent } from '../button/button.component';
import { AthToastContainerComponent } from './toast.component';

type Scenario = 'variants' | 'titled' | 'undo' | 'stack' | 'playground';

const noop = () => undefined;

/**
 * Puts the scenario's toasts up. Toasts that would time out stay
 * (duration 0), or the clocks are paused (`pause('story')`), so a
 * screenshot never races a timer.
 */
@Component({
  selector: 'ath-story-toasts',
  imports: [AthButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 8px">
      <ath-button variant="secondary" (clicked)="fire('success')">Success</ath-button>
      <ath-button variant="secondary" (clicked)="fire('info')">Info</ath-button>
      <ath-button variant="secondary" (clicked)="fire('warning')">Warning</ath-button>
      <ath-button variant="secondary" (clicked)="fire('error')">Error</ath-button>
      <ath-button variant="secondary" (clicked)="undo()">With undo</ath-button>
    </div>
  `,
})
class StoryToastsComponent implements OnInit {
  private readonly toast = inject(AthToastService);
  readonly scenario = input<Scenario>('variants');

  ngOnInit(): void {
    switch (this.scenario()) {
      case 'variants':
        this.toast.success('Ticket ATH-12 created', 0);
        this.toast.info('3 people are viewing this ticket', 0);
        this.toast.warning('You are offline; changes are kept locally', 0);
        this.toast.error('Could not save the sprint', {
          duration: 0,
          action: { label: 'Retry', run: noop },
        });
        break;
      case 'titled':
        this.toast.success('Moved to In review and assigned to Lea', {
          duration: 0,
          title: 'ATH-128 updated',
          action: { label: 'Open', run: noop },
        });
        this.toast.warning('2 of 3 files attached to ATH-128. report.pdf is larger than 25 MB.', {
          duration: 0,
          title: 'Some files were not attached',
        });
        this.toast.error('The server did not answer. Your text is kept; try again in a moment.', {
          duration: 0,
          title: 'Could not save the comment',
          action: { label: 'Retry', run: noop },
        });
        break;
      case 'undo':
        // The undo window: the hairline shows the time left (paused here).
        this.toast.pause('story');
        this.toast.info('Timer for TEST-1 discarded (under a minute)', {
          action: { label: 'Undo', run: noop },
        });
        break;
      case 'stack':
        this.toast.success('Ticket ATH-12 created', 0);
        this.toast.success('Ticket ATH-13 created', 0);
        this.toast.info('Link copied', 0);
        this.toast.info('ATH-12 moved to Done', {
          duration: 0,
          action: { label: 'Undo', run: noop },
        });
        this.toast.error('Could not save the sprint', {
          duration: 0,
          action: { label: 'Retry', run: noop },
        });
        break;
      case 'playground':
        break;
    }
  }

  fire(variant: 'success' | 'info' | 'warning' | 'error'): void {
    const text = {
      success: 'Ticket ATH-14 created',
      info: 'Link copied',
      warning: 'Some changes are not synced yet',
      error: 'Could not save the sprint',
    }[variant];
    this.toast[variant](text);
  }

  undo(): void {
    this.toast.info('Timer for TEST-1 discarded (under a minute)', {
      action: { label: 'Undo', run: () => this.toast.success('Timer restored') },
    });
  }
}

const meta: Meta<AthToastContainerComponent> = {
  title: 'Feedback/Toast',
  component: AthToastContainerComponent,
  decorators: [moduleMetadata({ imports: [StoryToastsComponent] })],
  // The container is fixed at the viewport edge: screenshot the viewport.
  parameters: { visual: { mode: 'viewport' } },
  render: () => ({
    template: `<ath-story-toasts scenario="variants" /><ath-toast-container [maxVisible]="4" />`,
  }),
};

export default meta;
type Story = StoryObj<AthToastContainerComponent>;

/**
 * One toast per variant. The variant shows in the icon disc only: success
 * green, info neutral, warning amber, error red (read out assertively).
 * Hover a toast for its close button.
 */
export const Variants: Story = {};

/** `title`: a short headline above the message, which becomes the detail line. */
export const WithTitle: Story = {
  render: () => ({
    template: `<ath-story-toasts scenario="titled" /><ath-toast-container />`,
  }),
};

/**
 * An action ("Undo") keeps the toast at least 8s. The hairline at its foot
 * shows the time left and stops while the pointer or focus is on the
 * stack, or the page is hidden. (Paused in this story.)
 */
export const WithUndo: Story = {
  render: () => ({
    template: `<ath-story-toasts scenario="undo" /><ath-toast-container />`,
  }),
};

/**
 * Five toasts, `maxVisible` 3: the two oldest collapse behind "2 more" and
 * their clocks stop. Pointer or focus on the stack, or the button, shows
 * them all.
 */
export const Stacking: Story = {
  render: () => ({
    template: `<ath-story-toasts scenario="stack" /><ath-toast-container />`,
  }),
};

/** `placement="top"`: newest on top. */
export const Top: Story = {
  render: () => ({
    template: `<ath-story-toasts scenario="stack" /><ath-toast-container placement="top" />`,
  }),
};

/** Dark theme: a lifted, translucent surface and an inner highlight. */
export const Dark: Story = {
  globals: { theme: 'dark' },
  render: () => ({
    template: `<ath-story-toasts scenario="titled" /><ath-toast-container />`,
  }),
};

/** German labels: close buttons ("Benachrichtigung schließen: …"), region, "2 weitere". */
export const GermanLabels: Story = {
  globals: { labels: 'de' },
  render: () => ({
    template: `<ath-story-toasts scenario="stack" /><ath-toast-container />`,
  }),
};

/** Fire toasts by hand to see the motion: enter, stacking, exit. Timed, so no screenshot. */
export const Playground: Story = {
  tags: ['!visual'],
  render: () => ({
    template: `<ath-story-toasts scenario="playground" /><ath-toast-container />`,
  }),
};
