import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  signal,
  viewChild,
} from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AthButtonComponent } from '../button/button.component';
import type { FloatingVirtualAnchor } from './floating';
import { AthFloatingDirective } from './floating.directive';

/**
 * A formatting toolbar over a word of text: the anchor is a `Range` (a
 * virtual anchor, it has `getBoundingClientRect()`), centred on it.
 */
@Component({
  selector: 'ath-story-selection-toolbar',
  imports: [AthFloatingDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p #text style="max-width:420px;margin:56px 0 0;line-height:1.6">
      Hang a panel from a caret, a text selection or the spot the pointer rests on.
    </p>
    @if (selection(); as range) {
      <div
        role="toolbar"
        aria-label="Format"
        [athFloating]="range"
        align="center"
        side="top"
        [offset]="6"
        style="display:flex;gap:4px;padding:4px 8px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r);box-shadow:var(--shadow-2)"
      >
        <button type="button">Bold</button><button type="button">Italic</button>
      </div>
    }
  `,
})
class StorySelectionToolbarComponent {
  private readonly text = viewChild.required<ElementRef<HTMLElement>>('text');
  protected readonly selection = signal<FloatingVirtualAnchor | null>(null);

  constructor() {
    afterNextRender(() => {
      const node = this.text().nativeElement.firstChild;
      if (!node) return;
      const range = document.createRange();
      const at = (node.textContent ?? '').indexOf('selection');
      range.setStart(node, at);
      range.setEnd(node, at + 'selection'.length);
      this.selection.set({
        getBoundingClientRect: () => range.getBoundingClientRect(),
        contextElement: this.text().nativeElement,
      });
    });
  }
}

const meta: Meta<AthFloatingDirective> = {
  title: 'Overlays/Floating',
  component: AthFloatingDirective,
  decorators: [moduleMetadata({ imports: [AthButtonComponent] })],
  argTypes: {
    align: { control: 'select', options: ['start', 'end', 'auto', 'center'] },
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
/** `align="center"`: centred under the anchor. */
export const AlignCenter: Story = { args: { align: 'center' } };

/** A virtual anchor (a text range), the toolbar centred above it. */
export const VirtualAnchor: Story = {
  decorators: [moduleMetadata({ imports: [StorySelectionToolbarComponent] })],
  render: () => ({ template: `<ath-story-selection-toolbar />` }),
};
