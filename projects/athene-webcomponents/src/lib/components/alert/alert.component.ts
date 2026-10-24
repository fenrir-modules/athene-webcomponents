import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Info,
  LucideAngularModule,
  X,
} from 'lucide-angular';
import { injectAthLabels } from '../../i18n/labels';
import { AthButtonComponent, type AthAction } from '../button';

/** Alert tones. `warning` is an alias of `warn`. */
export type AlertVariant = 'info' | 'success' | 'warn' | 'warning' | 'error';

/**
 * - `inline`: a tinted box inside the page flow (forms, lists, panels)
 * - `banner`: full width, square edges, an icon; for the top of a layout or panel
 */
export type AlertAppearance = 'inline' | 'banner';

/**
 * Athene Alert
 *
 * Feedback in the page: info, warn, error or success, inline or as a
 * banner, with an optional retry. `[retry]` takes the work to repeat; the
 * retry button is an `ath-button [action]`, so it is busy while the retry
 * runs. With no `message` (and nothing projected) the alert takes no
 * space, so a page can keep `<ath-alert [message]="error()" …>` in its
 * template unconditionally.
 *
 * Replaces the app's `error-banner`.
 *
 * @example
 * <ath-alert variant="error" [message]="error()" [retry]="reload" />
 * <ath-alert variant="warn" appearance="banner" [message]="'Maintenance at 22:00'" />
 * <ath-alert variant="success" message="Saved" [dismissible]="true" (dismissed)="clear()" />
 */
@Component({
  selector: 'ath-alert',
  standalone: true,
  imports: [LucideAngularModule, AthButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ath-alert--empty]': '!message() && !title()',
  },
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AthAlertComponent {
  private readonly labels = injectAthLabels();

  readonly variant = input<AlertVariant>('info');
  readonly appearance = input<AlertAppearance>('inline');
  /** The text; empty or `null` (with no projected content) hides the alert. */
  readonly message = input<string | null | undefined>('');
  /** Optional bold lead-in before the message. */
  readonly title = input<string | null>(null);
  /** Icon before the text; default on for banners, off inline. */
  readonly icon = input<boolean | null>(null);
  readonly dismissible = input(false);
  /** Work to repeat; shows the retry button. */
  readonly retry = input<AthAction | null>(null);
  /** Retry button text; default `ATH_LABELS.retry`. */
  readonly retryLabel = input<string | null>(null);
  /** Dismiss button's accessible name; default `ATH_LABELS.dismiss`. */
  readonly dismissLabel = input<string | null>(null);

  readonly dismissed = output<void>();

  protected readonly closeIcon = X;

  protected readonly tone = computed(() => {
    const v = this.variant();
    return v === 'warning' ? 'warn' : v;
  });

  /** Errors and warnings interrupt; info and success wait their turn. */
  protected readonly role = computed(() =>
    this.tone() === 'error' || this.tone() === 'warn' ? 'alert' : 'status'
  );

  protected readonly showIcon = computed(() => this.icon() ?? this.appearance() === 'banner');

  protected readonly glyph = computed(() => {
    switch (this.tone()) {
      case 'warn':
        return AlertTriangle;
      case 'error':
        return AlertOctagon;
      case 'success':
        return CheckCircle2;
      default:
        return Info;
    }
  });

  protected readonly retryText = computed(() => this.retryLabel() ?? this.labels.retry());
  protected readonly dismissText = computed(() => this.dismissLabel() ?? this.labels.dismiss());

  dismiss(): void {
    this.dismissed.emit();
  }
}
