import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { AthButtonComponent } from '../button/button.component';

/**
 * Dialog size variants
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';

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
export class AthDialogComponent {
  /** Whether the dialog is open */
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
