import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';
import { injectAthLabels } from '../../i18n/labels';
import { avatarInitials, avatarToneFor } from './avatar-tone';

/** Avatar sizes; each reads its `--avatar-<size>` token. */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Who an avatar shows. `id` is the stable key of the colour tone. */
export interface AthPerson {
  id?: string | null;
  name?: string | null;
  src?: string | null;
}

const ICON_SIZE: Record<AvatarSize, number> = { xs: 12, sm: 13, md: 18, lg: 22, xl: 28 };

/**
 * A person as an avatar (image, else initials on a per-person tone), or an
 * empty seat: the soft grey circle with a user glyph, the same size as a
 * person, titled "Unassigned". One symbol for "nobody" everywhere (DS-09).
 *
 * The tone is keyed on the person's stable id, so two people with the same
 * initials differ and one person keeps a colour wherever they appear.
 *
 * @example
 * <ath-avatar [person]="{ id: user.id, name: user.name, src: user.avatar_url }" size="sm" />
 * <ath-avatar [person]="assignee ?? null" size="sm" />   <!-- null → empty seat -->
 * <ath-avatar [unassigned]="true" size="sm" />
 * <ath-avatar name="Mira Voss" />                         <!-- legacy: tone from initials -->
 */
@Component({
  selector: 'ath-avatar',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AthAvatarComponent {
  private readonly labels = injectAthLabels();

  /**
   * The person. `null` draws the empty seat; leave it unset to use the
   * separate `name` / `src` / `id` inputs.
   */
  readonly person = input<AthPerson | null | undefined>(undefined);
  /** Display name (initials and accessible name) when `person` is not used. */
  readonly name = input<string | null | undefined>('');
  /** Image URL when `person` is not used. */
  readonly src = input<string | null | undefined>('');
  /** Stable id for the tone when `person` is not used. */
  readonly id = input<string | null | undefined>(null);
  readonly size = input<AvatarSize>('md');
  /** Draw the empty seat regardless of the other inputs. */
  readonly unassigned = input(false);
  /** Accessible name and tooltip; defaults to the name or the "Unassigned" label. */
  readonly label = input<string | null>(null);

  protected readonly userIcon = User;
  private readonly failedSrc = signal<string | null>(null);

  private readonly who = computed<AthPerson>(() => {
    const p = this.person();
    return p ?? { id: this.id(), name: this.name(), src: this.src() };
  });

  protected readonly empty = computed(() => this.unassigned() || this.person() === null);

  protected readonly initials = computed(() => avatarInitials(this.who().name));
  protected readonly tone = computed(() => (this.empty() ? null : avatarToneFor(this.who())));
  protected readonly image = computed(() => {
    const src = this.who().src;
    return src && src !== this.failedSrc() ? src : null;
  });
  protected readonly iconSize = computed(() => ICON_SIZE[this.size()]);

  protected readonly accessibleName = computed(() => {
    const explicit = this.label();
    if (explicit) return explicit;
    if (this.empty()) return this.labels.unassigned();
    return this.who().name?.trim() || null;
  });

  /**
   * Tooltip: shown for the empty seat and whenever the avatar was given a
   * person or an explicit label; a bare `name` keeps the old behaviour of
   * no tooltip (the name usually sits next to it).
   */
  protected readonly tooltip = computed(() =>
    this.label() || this.empty() || this.person() ? this.accessibleName() : null
  );

  protected onImageError(): void {
    this.failedSrc.set(this.who().src ?? null);
  }
}
