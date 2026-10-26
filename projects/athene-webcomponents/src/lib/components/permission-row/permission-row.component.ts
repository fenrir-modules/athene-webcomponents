import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  input,
  output,
  viewChild,
} from '@angular/core';
import { AthIconComponent } from '../icon/icon.component';
import type { AthIconData } from '../floating/icon';
import { AthTooltipDirective } from '../tooltip';

let nextId = 0;

/**
 * One permission in a roles editor: icon, name, a one-line explanation and,
 * on the right, the control (projected: an `ath-toggle` on a role, an
 * `ath-tri-state` in an override).
 *
 * With `interactive` (a toggle) the whole row is the mouse target: a click
 * anywhere outside the control emits `activate`, which the page wires to
 * the same change as the toggle. A click on the control itself is left to
 * the control, so nothing toggles twice. Keyboard users reach the control
 * directly; the row adds no tab stop of its own.
 *
 * `disabledReason` is the tooltip of a disabled row ("Gäste können das nie")
 * and is read out with it. Below 480px the control moves under the text.
 *
 * @example
 * <ath-permission-row [icon]="FolderPlus" label="Projekte anlegen"
 *   description="Neue Projekte im Workspace erstellen" [interactive]="true"
 *   (activate)="toggle('project.create')">
 *   <ath-toggle ariaLabel="Projekte anlegen" [checked]="on" (toggled)="set($event)" />
 * </ath-permission-row>
 */
@Component({
  selector: 'ath-permission-row',
  imports: [AthIconComponent, AthTooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './permission-row.component.html',
  styleUrl: './permission-row.component.scss',
  host: {
    '[class.ath-perm--interactive]': 'interactive() && !disabled()',
    '[class.ath-perm--disabled]': 'disabled()',
    '(click)': 'onClick($event)',
  },
})
export class AthPermissionRowComponent {
  readonly icon = input<AthIconData | null>(null);
  readonly label = input.required<string>();
  /** One line in `--fg-3`, cut with an ellipsis (the full text as tooltip). */
  readonly description = input<string | null>(null);
  /** Where the value comes from, e.g. "✓ von Rolle Developer geerbt". */
  readonly inheritedHint = input<string | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Why it is disabled: tooltip and screen-reader text. */
  readonly disabledReason = input<string | null>(null);
  /** The whole row toggles (only with a two-state control). */
  readonly interactive = input(false, { transform: booleanAttribute });

  /** A click on the row outside the control (with `interactive`). */
  readonly activate = output<void>();

  /** Ids a projected control can point `aria-describedby` at. */
  readonly labelId = `ath-perm-${++nextId}-label`;
  readonly descriptionId = `ath-perm-${nextId}-desc`;

  private readonly control = viewChild.required<ElementRef<HTMLElement>>('control');

  protected onClick(event: MouseEvent): void {
    if (!this.interactive() || this.disabled()) return;
    const target = event.target as Node | null;
    if (target && this.control().nativeElement.contains(target)) return;
    this.activate.emit();
  }
}
