import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LONG_TEXT, RTL_TEXT } from '../../stories/story-data';
import { AthButtonComponent } from '../button/button.component';
import { AthSheetComponent } from './sheet.component';

const ROWS = [
  'ATL-12 Export invoices',
  'ATL-13 Portal relaunch',
  'ATL-14 Dark mode',
  'ATL-15 Audit log',
];

const meta: Meta<AthSheetComponent> = {
  title: 'Overlays/Sheet',
  component: AthSheetComponent,
  decorators: [moduleMetadata({ imports: [AthButtonComponent] })],
  // A fixed layer at the viewport's edge: the whole viewport is the picture.
  parameters: { visual: { mode: 'viewport' } },
  render: () => ({
    props: { open: true, rows: ROWS, text: LONG_TEXT },
    template: `
      <div style="display:grid;gap:8px;max-width:420px">
        @for (row of rows; track row) {
          <ath-button variant="secondary" (clicked)="open = true">{{ row }}</ath-button>
        }
      </div>
      <ath-sheet [open]="open" ariaLabel="ATL-12 Export invoices" width="360px" (openChange)="open = $event">
        <div style="display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--border)">
          <strong style="flex:1">ATL-12 Export invoices</strong>
          <ath-button variant="ghost" size="sm" (clicked)="open = false">Close</ath-button>
        </div>
        <div style="flex:1;min-height:0;overflow:auto;padding:16px">
          <p>{{ text }}</p>
          <p>The page beside the sheet stays usable: no scrim, no focus trap. Escape closes it.</p>
        </div>
      </ath-sheet>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthSheetComponent>;

/** Open on load beside a list; the list stays usable. */
export const Default: Story = {};

/** `top` keeps a shell's top bar uncovered. */
export const BelowTopBar: Story = {
  render: () => ({
    props: { open: true },
    template: `
      <div style="position:fixed;inset:0 0 auto 0;height:48px;display:flex;align-items:center;padding:0 16px;border-bottom:1px solid var(--border);background:var(--bg-1)">Top bar</div>
      <ath-sheet [open]="open" ariaLabel="Details" width="360px" top="48px" (openChange)="open = $event">
        <div style="padding:16px">Details under the top bar.</div>
      </ath-sheet>
    `,
  }),
};

/** In RTL the sheet sits at the left edge, its shadow falls to the right. */
export const RightToLeft: Story = {
  globals: { dir: 'rtl' },
  render: () => ({
    props: { open: true, text: RTL_TEXT },
    template: `
      <ath-sheet [open]="open" [ariaLabel]="text" width="360px" (openChange)="open = $event">
        <div style="padding:16px">{{ text }}</div>
      </ath-sheet>
    `,
  }),
};
