import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { Check, LucideAngularModule, Slash, X } from 'lucide-angular';
import { injectAthLabels } from '../../i18n/labels';
import type { AthIconData } from '../floating/icon';

/** An override's state: forbid, take the inherited value, or allow. */
export type TriStateValue = 'deny' | 'inherit' | 'allow';

const ORDER: readonly TriStateValue[] = ['deny', 'inherit', 'allow'];
const ICONS: Record<TriStateValue, AthIconData> = { deny: X, inherit: Slash, allow: Check };

/**
 * Three segments *Deny · Inherit · Allow* for one permission in an
 * override. A radio group (WAI-ARIA radio pattern), not `ath-segment`
 * (which is a tab list): one tab stop on the chosen segment, the arrow keys
 * move and choose, Home/End jump, Space/Enter choose.
 *
 * `inherited` is the value the "Inherit" segment currently stands for; it
 * is read out with it ("Inherit (currently allowed)"). `compact` shows the
 * icons only (each still named); below 480px the segments are icons only
 * anyway.
 *
 * @example
 * <ath-tri-state label="Tickets bearbeiten" [(value)]="state" [inherited]="true" />
 */
@Component({
  selector: 'ath-tri-state',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tri-state.component.html',
  styleUrl: './tri-state.component.scss',
  host: { '[attr.data-compact]': "compact() ? '' : null" },
})
export class AthTriStateComponent {
  private readonly labels = injectAthLabels();
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly value = model<TriStateValue>('inherit');
  /** The value "Inherit" stands for now; `null`: unknown. */
  readonly inherited = input<boolean | null>(null);
  readonly disabled = input(false, { transform: booleanAttribute });
  /** The permission's name: the group's accessible name. */
  readonly label = input.required<string>();
  /** Icons only (each segment keeps its accessible name). */
  readonly compact = input(false, { transform: booleanAttribute });

  protected readonly segments = computed(() => {
    const inherited = this.inherited();
    return ORDER.map((state) => ({
      state,
      icon: ICONS[state],
      text: this.textOf(state),
      name:
        state === 'inherit' && inherited !== null
          ? inherited
            ? this.labels.triStateInheritAllowed()
            : this.labels.triStateInheritDenied()
          : this.textOf(state),
    }));
  });

  protected select(state: TriStateValue): void {
    if (!this.disabled() && state !== this.value()) this.value.set(state);
  }

  protected onKey(event: KeyboardEvent, index: number): void {
    if (this.disabled()) return;
    const count = ORDER.length;
    // Right-to-left: Left and Right follow the visual order.
    const rtl = getComputedStyle(this.host.nativeElement).direction === 'rtl';
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = index + (rtl ? -1 : 1);
        break;
      case 'ArrowLeft':
        next = index + (rtl ? 1 : -1);
        break;
      case 'ArrowDown':
        next = index + 1;
        break;
      case 'ArrowUp':
        next = index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.select(ORDER[index]);
        return;
      default:
        return;
    }
    event.preventDefault();
    next = (next + count) % count;
    this.select(ORDER[next]);
    this.host.nativeElement.querySelectorAll<HTMLElement>('[role="radio"]')[next]?.focus();
  }

  private textOf(state: TriStateValue): string {
    switch (state) {
      case 'deny':
        return this.labels.triStateDeny();
      case 'inherit':
        return this.labels.triStateInherit();
      case 'allow':
        return this.labels.triStateAllow();
    }
  }
}
