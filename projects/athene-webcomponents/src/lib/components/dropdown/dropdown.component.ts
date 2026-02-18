import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  ElementRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

/**
 * Dropdown menu item
 */
export interface DropdownItem {
  id: string;
  label: string;
  icon?: any;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  divider?: boolean;
}

/**
 * Horizontal alignment hint.
 * `'auto'` picks left or right based on available viewport space.
 */
export type DropdownAlign = 'left' | 'right' | 'auto';

/**
 * Athene Dropdown Component
 *
 * Smart-positioning action menu.
 * Automatically opens upward/downward and left/right depending
 * on where the trigger sits in the viewport.
 *
 * @example
 * <ath-dropdown [items]="menuItems" (itemClicked)="onAction($event)">
 *   <ath-button variant="ghost">Actions</ath-button>
 * </ath-dropdown>
 */
@Component({
  selector: 'ath-dropdown',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class AthDropdownComponent {
  private readonly el = inject(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);

  /** Menu items */
  @Input() items: DropdownItem[] = [];

  /**
   * Horizontal alignment hint.
   * - `'left'`  – menu anchored to the left edge of trigger
   * - `'right'` – menu anchored to the right edge of trigger
   * - `'auto'`  – pick best side based on viewport space
   *
   * Vertical direction is always auto-detected.
   */
  @Input() align: DropdownAlign = 'auto';

  /** Item click event */
  @Output() itemClicked = new EventEmitter<string>();

  /** Emits `true` when the menu opens, `false` when it closes. */
  @Output() openChange = new EventEmitter<boolean>();

  protected isOpen = false;

  // Computed placement — set each time the menu opens
  protected placementX: 'left' | 'right' = 'right';
  protected placementY: 'down' | 'up' = 'down';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.close();
  }

  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.isOpen = true;
      this.openChange.emit(true);
      this.computePlacement();
    }
  }

  selectItem(item: DropdownItem): void {
    if (item.disabled || item.divider) return;
    this.itemClicked.emit(item.id);
    this.close();
  }

  private close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.openChange.emit(false);
  }

  getItemClasses(item: DropdownItem): string {
    return [
      'ath-dropdown__item',
      item.variant === 'danger' ? 'ath-dropdown__item--danger' : '',
      item.disabled ? 'ath-dropdown__item--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /** Determine where to place the menu based on trigger position */
  private computePlacement(): void {
    const trigger = this.el.nativeElement as HTMLElement;
    const rect = trigger.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Vertical: if trigger is in the bottom 40% of viewport → open upward
    this.placementY = rect.bottom > vh * 0.6 ? 'up' : 'down';

    // Horizontal: respect explicit hint, otherwise auto-detect
    if (this.align === 'left') {
      this.placementX = 'left';
    } else if (this.align === 'right') {
      this.placementX = 'right';
    } else {
      // auto: if trigger center is in the right half → anchor right
      const center = rect.left + rect.width / 2;
      this.placementX = center > vw / 2 ? 'right' : 'left';
    }

    this.cdr.markForCheck();
  }
}
