import { Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, X } from 'lucide-angular';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

/**
 * Athene Search Input Component
 *
 * Search field with debounce, clear button, and search icon.
 *
 * @example
 * <ath-search-input placeholder="Search flags..." (searched)="onSearch($event)" />
 */
@Component({
  selector: 'ath-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class AthSearchInputComponent implements OnDestroy {
  /** Placeholder text */
  @Input() placeholder = 'Search...';

  /** Debounce time in ms */
  @Input() debounce = 300;

  /** Search event emitter */
  @Output() searched = new EventEmitter<string>();

  protected value = '';
  protected readonly searchIcon = Search;
  protected readonly clearIcon = X;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {
    this.searchSubject.pipe(
      debounceTime(this.debounce),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(value => {
      this.searched.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.searchSubject.next(this.value);
  }

  clear(): void {
    this.value = '';
    this.searchSubject.next('');
    this.cdr.markForCheck();
  }
}
