import type { Meta, StoryObj } from '@storybook/angular';
import { FolderPlus, Hand, Pencil, Plus, Ticket } from 'lucide-angular';
import { LONG_TEXT } from '../../stories/story-data';
import { AthToggleComponent } from '../toggle';
import { AthTriStateComponent } from '../tri-state';
import { AthPermissionRowComponent } from './permission-row.component';

const meta: Meta<AthPermissionRowComponent> = {
  title: 'Forms/Permission row',
  component: AthPermissionRowComponent,
  render: () => ({
    moduleMetadata: { imports: [AthToggleComponent] },
    props: { FolderPlus, Pencil, Plus, on: { a: false, b: true, c: true } },
    template: `
      <section style="max-width:640px" aria-label="Projects">
        <ath-permission-row [icon]="FolderPlus" label="Create projects"
          description="New projects in the workspace" [interactive]="true" (activate)="on.a = !on.a">
          <ath-toggle ariaLabel="Create projects" [checked]="on.a" (toggled)="on.a = $event" />
        </ath-permission-row>
        <ath-permission-row [icon]="Pencil" label="Edit own projects"
          description="Projects you created or lead" [interactive]="true" (activate)="on.b = !on.b">
          <ath-toggle ariaLabel="Edit own projects" [checked]="on.b" (toggled)="on.b = $event" />
        </ath-permission-row>
        <ath-permission-row [icon]="Plus" label="Edit tickets" description="Fields, status, assignee, links"
          [disabled]="true" disabledReason="Guests can never do this">
          <ath-toggle ariaLabel="Edit tickets" [checked]="false" [disabled]="true" />
        </ath-permission-row>
      </section>
    `,
  }),
};

export default meta;
type Story = StoryObj<AthPermissionRowComponent>;

export const WithToggles: Story = {};
/** In an override: the tri-state, and the inherited value as a hint. */
export const WithTriState: Story = {
  render: () => ({
    moduleMetadata: { imports: [AthTriStateComponent] },
    props: { Ticket, Hand, a: 'inherit', b: 'deny' },
    template: `
      <section style="max-width:720px" aria-label="Tickets">
        <ath-permission-row [icon]="Ticket" label="Create tickets" description="New tickets in this project"
          inheritedHint="✓ inherited from role Tester">
          <ath-tri-state label="Create tickets" [(value)]="a" [inherited]="true" />
        </ath-permission-row>
        <ath-permission-row [icon]="Hand" label="Take tickets from a queue" description="Assign yourself an unassigned ticket">
          <ath-tri-state label="Take tickets from a queue" [(value)]="b" [inherited]="true" />
        </ath-permission-row>
      </section>
    `,
  }),
};
export const LongText: Story = {
  render: () => ({
    moduleMetadata: { imports: [AthToggleComponent] },
    props: { FolderPlus, text: LONG_TEXT },
    template: `
      <div style="max-width:360px">
        <ath-permission-row [icon]="FolderPlus" [label]="text" [description]="text" [interactive]="true">
          <ath-toggle [ariaLabel]="text" [checked]="true" />
        </ath-permission-row>
      </div>
    `,
  }),
};
