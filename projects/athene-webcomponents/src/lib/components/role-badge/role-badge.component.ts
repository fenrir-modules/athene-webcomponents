import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';
import { AthIconComponent } from '../icon/icon.component';
import { Lock } from 'lucide';
import { injectAthLabels } from '../../i18n/labels';
import { isAthDecoColor } from '../color-swatch/deco-color';

/** `ath-role-badge` sizes. */
export type RoleBadgeSize = 'sm' | 'md';

/**
 * A workspace role: a dot in the role's colour and its name. `locked`
 * adds a lock for the fixed roles (Owner, Admin), read out as "Fixed
 * role". An unknown colour draws the neutral dot.
 *
 * @example
 * <ath-role-badge name="Developer" color="blue" />
 * <ath-role-badge name="Owner" color="amber" [locked]="true" size="sm" />
 */
@Component({
  selector: 'ath-role-badge',
  imports: [AthIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './role-badge.component.html',
  styleUrl: './role-badge.component.scss',
})
export class AthRoleBadgeComponent {
  private readonly labels = injectAthLabels();

  readonly name = input.required<string>();
  /** A palette token (`AthDecoColor`); anything else is neutral. */
  readonly color = input<string | null | undefined>(null);
  readonly size = input<RoleBadgeSize>('md');
  readonly locked = input(false, { transform: booleanAttribute });

  protected readonly lockIcon = Lock;
  protected readonly tone = computed(() => {
    const color = this.color();
    return isAthDecoColor(color) ? color : 'neutral';
  });
  protected readonly lockedText = computed(() => this.labels.roleLocked());
}
