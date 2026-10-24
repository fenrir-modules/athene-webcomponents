import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { injectAthLabels } from '../../i18n/label-utils';
import { AthOverlayStack, type AthOverlayEntry } from '../floating/overlay-stack';
import { focusSafely, tabbables, trapTab } from '../floating/focus';

/**
 * Dialog size variants: max widths 400 / 520 / 680 / 860px, `full` = the
 * viewport minus a margin.
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

let nextDialogId = 0;

/**
 * Athene Dialog: the one modal of the library, on a native `<dialog>`
 * opened with `showModal()`. That puts it in the top layer (no z-index, no
 * clipping), makes the rest of the page inert and gives a `::backdrop`
 * (`--scrim`). On top: Tab stays inside, page scroll is locked, Escape and
 * backdrop clicks follow `closeOnEscape` / `closeOnBackdrop`, and focus goes
 * back to where it was when the dialog closes.
 *
 * Controlled: a close request (✕, Escape, backdrop) emits `closed` and
 * `openChange(false)`; the dialog closes when `open` becomes false, so a
 * parent can refuse (unsaved changes). `[(open)]` works.
 *
 * Content: the default slot is the scrolling body; `[slot=header]` (or
 * `[athDialogHeader]`) goes into the header under the title,
 * `[slot=footer]` (or `[athDialogFooter]`) into the footer. Initial focus:
 * an element with `autofocus`, else the first control in the body/footer,
 * else the close button.
 *
 * @example
 * <ath-dialog [(open)]="isOpen" title="Create item" (closed)="onClose()">
 *   <p>Dialog content here</p>
 *   <div slot="footer">
 *     <ath-button variant="secondary" (clicked)="isOpen = false">Cancel</ath-button>
 *     <ath-button (clicked)="save()">Save</ath-button>
 *   </div>
 * </ath-dialog>
 */
@Component({
  selector: 'ath-dialog',
  standalone: true,
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  host: {
    '(pointerdown)': 'onPointerDown($event)',
    '(click)': 'onClick($event)',
  },
})
export class AthDialogComponent implements OnChanges, OnDestroy {
  private readonly stack = inject(AthOverlayStack);
  private readonly labels = injectAthLabels();

  /** Ids that name and describe the dialog (`aria-labelledby/-describedby`). */
  protected readonly titleId = `ath-dialog-title-${++nextDialogId}`;
  protected readonly descriptionId = `ath-dialog-desc-${nextDialogId}`;

  /** Whether the dialog is open. Two-way: `[(open)]`. */
  readonly open = input(false, { transform: booleanAttribute });
  /** Dialog title (names the dialog). */
  readonly title = input('');
  /** Dialog description (describes the dialog). */
  readonly description = input('');
  readonly size = input<DialogSize>('md');
  /** Whether clicking the backdrop requests closing. */
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  /** Whether Escape requests closing. */
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  /** Show the ✕ button in the header. */
  readonly showClose = input(true, { transform: booleanAttribute });
  /** Accessible name of the close button; defaults to `ATH_LABELS.closeDialog`. */
  readonly closeLabel = input<string | null>(null);
  /** Accessible name when there is no visible `title`. */
  readonly ariaLabel = input<string | null>(null);
  /** `alertdialog` for confirmations that interrupt. */
  readonly role = input<'dialog' | 'alertdialog'>('dialog');

  /** The user asked to close (✕, Escape, backdrop). */
  readonly closed = output<void>();
  /** Two-way partner of `open`; emits `false` on a close request. */
  readonly openChange = output<boolean>();
  /** The dialog is shown (after `showModal()`). */
  readonly opened = output<void>();

  protected readonly closeIcon = X;
  protected readonly closeText = computed(() => this.closeLabel() ?? this.labels.closeDialog());

  private dialogEl: HTMLDialogElement | null = null;
  private returnFocus: HTMLElement | null = null;
  private pressedOnBackdrop = false;
  private locked = false;

  private readonly entry: AthOverlayEntry = {
    modal: true,
    panel: () => this.dialogEl,
    anchor: () => null,
    closeOnEscape: () => this.closeOnEscape(),
    closeOnOutsideClick: () => false,
    dismiss: () => this.requestClose(),
  };

  @ViewChild('dialog')
  private set dialogRef(ref: ElementRef<HTMLDialogElement> | undefined) {
    const el = ref?.nativeElement ?? null;
    if (el === this.dialogEl) return;
    if (this.dialogEl) this.teardown();
    this.dialogEl = el;
    if (el) this.present(el);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Remember the focus before the dialog renders and takes it.
    if (changes['open'] && this.open() && !this.dialogEl) {
      const active = document.activeElement;
      this.returnFocus = active instanceof HTMLElement && active !== document.body ? active : null;
    }
  }

  ngOnDestroy(): void {
    if (this.dialogEl) this.teardown();
  }

  /** Requests closing, as the ✕ button does. */
  close(): void {
    this.requestClose();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.dialogEl) trapTab(event, this.dialogEl);
  }

  /** Escape: the browser's close request. Always prevented; the parent decides. */
  protected onCancel(event: Event): void {
    event.preventDefault();
    if (!this.closeOnEscape() || this.stack.escapeConsumed() || !this.stack.isTop(this.entry)) {
      return;
    }
    this.requestClose();
  }

  /** The browser closed it anyway (e.g. a forced close request). */
  protected onNativeClose(): void {
    if (this.open() && this.dialogEl && !this.dialogEl.open) this.requestClose();
  }

  protected onPointerDown(event: PointerEvent): void {
    this.pressedOnBackdrop = this.isBackdropEvent(event);
  }

  protected onClick(event: MouseEvent): void {
    const onBackdrop = this.pressedOnBackdrop && this.isBackdropEvent(event);
    this.pressedOnBackdrop = false;
    if (onBackdrop && this.closeOnBackdrop() && this.stack.isTop(this.entry)) this.requestClose();
  }

  private requestClose(): void {
    this.closed.emit();
    this.openChange.emit(false);
  }

  /** A press on the `::backdrop`: it targets the dialog, outside its box. */
  private isBackdropEvent(event: MouseEvent): boolean {
    const el = this.dialogEl;
    if (!el || event.target !== el) return false;
    const r = el.getBoundingClientRect();
    return (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    );
  }

  private present(el: HTMLDialogElement): void {
    this.stack.open(this.entry);
    this.stack.lockScroll();
    this.locked = true;
    try {
      if (!el.open) el.showModal();
    } catch {
      // Not connected (yet): show it non-modally rather than not at all.
      el.setAttribute('open', '');
    }
    this.stack.raiseTopLayer();
    this.focusInitial(el);
    this.opened.emit();
  }

  private focusInitial(el: HTMLDialogElement): void {
    const auto = el.querySelector<HTMLElement>('[autofocus]');
    if (auto && focusSafely(auto)) return;
    const parts = el.querySelectorAll<HTMLElement>('.ath-dialog__body, .ath-dialog__footer');
    for (const part of Array.from(parts)) {
      const first = tabbables(part)[0];
      if (first && focusSafely(first)) return;
    }
    if (!focusSafely(tabbables(el)[0])) focusSafely(el);
  }

  private teardown(): void {
    const el = this.dialogEl;
    this.dialogEl = null;
    this.stack.close(this.entry);
    if (this.locked) this.stack.unlockScroll();
    this.locked = false;
    try {
      if (el?.open) el.close();
    } catch {
      // Already removed.
    }
    const back = this.returnFocus;
    this.returnFocus = null;
    focusSafely(back);
  }
}
