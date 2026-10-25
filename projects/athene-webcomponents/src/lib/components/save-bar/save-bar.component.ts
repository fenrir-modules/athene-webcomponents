import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { injectAthLabels } from '../../i18n/labels';
import { AthButtonComponent } from '../button';
import { AthOverlayStack } from '../floating/overlay-stack';

/**
 * The sticky "unsaved changes" bar at the bottom of an editor: a sentence
 * and *Discard* / *Save*. Replaces hand-kept dirty flags per field.
 *
 * - Appearing is announced once (`aria-live="polite"`); the bar is a named
 *   region, so it can be found with a screen reader's landmark keys.
 * - `confirmDiscard`: *Discard* asks first (the button turns into "Really
 *   discard?"); Escape anywhere on the page starts the same question and
 *   moves focus to it, a second Escape takes it back. Escape is left alone
 *   while a dialog, menu or popover is open.
 * - `saving`: *Save* shows its spinner and both buttons wait.
 *
 * Sticky to the bottom of its scroll container; full width on phones.
 *
 * @example
 * <ath-save-bar [open]="dirty()" [saving]="saving()" [confirmDiscard]="true"
 *   (save)="save()" (discard)="reset()" />
 */
@Component({
  selector: 'ath-save-bar',
  imports: [AthButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './save-bar.component.html',
  styleUrl: './save-bar.component.scss',
  host: {
    '[class.ath-save-bar--open]': 'open()',
    '(document:keydown)': 'onDocumentKey($event)',
  },
})
export class AthSaveBarComponent {
  private readonly labels = injectAthLabels();
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly stack = inject(AthOverlayStack);
  private readonly injector = inject(Injector);

  readonly open = input(false, { transform: booleanAttribute });
  readonly message = input<string | null>(null);
  readonly saving = input(false, { transform: booleanAttribute });
  readonly saveLabel = input<string | null>(null);
  readonly discardLabel = input<string | null>(null);
  /** *Discard* (and Escape) asks before it discards. */
  readonly confirmDiscard = input(false, { transform: booleanAttribute });

  readonly save = output<void>();
  readonly discard = output<void>();

  /** The discard question is showing. */
  protected readonly confirming = signal(false);
  /** The live region's text: the message while open, so appearing is read out. */
  protected readonly announcement = computed(() => (this.open() ? this.text() : ''));
  protected readonly text = computed(() => this.message() || this.labels.saveBarMessage());
  protected readonly saveText = computed(() => this.saveLabel() || this.labels.saveBarSave());
  protected readonly discardText = computed(() =>
    this.confirming()
      ? this.labels.saveBarConfirmDiscard()
      : this.discardLabel() || this.labels.saveBarDiscard()
  );

  constructor() {
    // A bar that closes forgets an open question.
    effect(() => {
      if (!this.open()) untracked(() => this.confirming.set(false));
    });
  }

  protected onSave(): void {
    if (this.saving()) return;
    this.confirming.set(false);
    this.save.emit();
  }

  protected onDiscard(): void {
    if (this.saving()) return;
    if (this.confirmDiscard() && !this.confirming()) {
      this.confirming.set(true);
      return;
    }
    this.confirming.set(false);
    this.discard.emit();
  }

  protected onDocumentKey(event: KeyboardEvent): void {
    if (event.key !== 'Escape' || !this.open() || this.saving() || event.defaultPrevented) return;
    // An open overlay owns this Escape.
    if (this.stack.size > 0 || this.stack.escapeConsumed()) return;
    if (!this.confirmDiscard()) return;
    event.preventDefault();
    if (this.confirming()) {
      this.confirming.set(false);
      return;
    }
    this.confirming.set(true);
    afterNextRender(
      () =>
        this.host.nativeElement
          .querySelector<HTMLElement>('.ath-save-bar__discard button')
          ?.focus(),
      { injector: this.injector }
    );
  }
}
