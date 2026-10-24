import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AthButtonComponent } from '../button/button.component';
import { AthFloatingDirective } from './floating.directive';

const meta: Meta<AthFloatingDirective> = {
  title: 'Overlays/Floating',
  component: AthFloatingDirective,
  decorators: [moduleMetadata({ imports: [AthButtonComponent] })],
  argTypes: {
    align: { control: 'select', options: ['start', 'end', 'auto'] },
    side: { control: 'select', options: ['bottom', 'top'] },
  },
  args: { align: 'start', side: 'bottom', offset: 4, matchWidth: false },
  render: (args) => ({
    props: { ...args, open: signal(true) },
    template: `
      <div style="height:220px;overflow:hidden;border:1px dashed var(--border);padding:12px;transform:translateZ(0)">
        <button #anchor type="button" style="padding:6px 12px" (click)="open.set(!open())">Anchor (in a clipping, transformed box)</button>
        @if (open()) {
          <div [athFloating]="anchor" [align]="align" [side]="side" [offset]="offset" [matchWidth]="matchWidth"
               style="background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-md);padding:8px 12px;box-shadow:var(--shadow-2)">
            Floating panel: top layer, not clipped
          </div>
        }
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthFloatingDirective>;

export const Default: Story = {};
export const AlignEnd: Story = { args: { align: 'end' } };
export const MatchWidth: Story = { args: { matchWidth: true } };
/** `align="auto"` follows `dir`: in RTL the panel starts at the anchor's right edge. */
export const RightToLeft: Story = { globals: { dir: 'rtl' }, args: { align: 'auto' } };
