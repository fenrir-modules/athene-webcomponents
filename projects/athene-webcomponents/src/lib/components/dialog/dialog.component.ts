import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ATH_DEFAULT_LABELS, ATH_LABELS } from '../../i18n/labels';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { AthButtonComponent } from '../button/button.component';

/**
 * Dialog size variants
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

let nextDialogId = 0;

/**
 * Athene Dialog Component
 *
 * Modal dialog for confirmations, forms, and content overlays.
 *
 * @example
 * <ath-dialog [open]="isOpen" title="Create Item" (closed)="isOpen = false">
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
  imports: [CommonModule, LucideAngularModule, AthButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class AthDialogComponent implements OnChanges {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private returnFocus: HTMLElement | null = null;

  /** Ids that name and describe the dialog (`aria-labelledby/-describedby`). */
  protected readonly titleId = `ath-dialog-title-${++nextDialogId}`;
  protected readonly descriptionId = `ath-dialog-desc-${nextDialogId}`;

  /** Whether the dialog is open */
  private readonly labels = inject(ATH_LABELS, { optional: true });

  /** Accessible name of the close controls; defaults to `ATH_LABELS`. */
  @Input() closeLabel: string | null = null;

  protected get closeText(): string {
    return this.closeLabel ?? (this.labels?.closeDialog ?? ATH_DEFAULT_LABELS.closeDialog)();
  }

  @Input() open = false;

  /** Dialog title */
  @Input() title = '';

  /** Dialog description */
  @Input() description = '';

  /** Dialog size */
  @Input() size: DialogSize = 'md';

  /** Whether clicking the backdrop closes the dialog */
  @Input() closeOnBackdrop = true;

  /** Whether pressing Escape closes the dialog */
  @Input() closeOnEscape = true;

  /** Close event */
  @Output() closed = new EventEmitter<void>();

  protected readonly closeIcon = X;

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.open && this.closeOnEscape) {
      this.close();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['open']) return;
    if (this.open) {
      // Move focus into the dialog once it has rendered; remember where it was.
      this.returnFocus = document.activeElement as HTMLElement | null;
      setTimeout(() => {
        const panel = this.panel();
        if (!panel || panel.contains(document.activeElement)) return;
        (this.focusables()[0] ?? panel).focus();
      });
    } else if (this.returnFocus && document.contains(this.returnFocus)) {
      this.returnFocus.focus();
      this.returnFocus = null;
    }
  }

  /** Keep Tab inside the open dialog. */
  onPanelKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    const items = this.focusables();
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private panel(): HTMLElement | null {
    return this.host.nativeElement.querySelector<HTMLElement>('.ath-dialog__panel');
  }

  private focusables(): HTMLElement[] {
    const panel = this.panel();
    if (!panel) return [];
    return Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  get dialogClasses(): string {
    return `ath-dialog__panel ath-dialog__panel--${this.size}`;
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  onBackdropKeydown(event: KeyboardEvent): void {
    if (!this.closeOnBackdrop) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.close();
    }
  }
}
