import {
  ChangeDetectionStrategy,
  Component,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, X } from 'lucide-angular';
import { Subject, debounce, distinctUntilChanged, timer } from 'rxjs';
import { injectAthLabels } from '../../i18n/labels';

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
  imports: [CommonModule, FormsModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class AthSearchInputComponent {
  protected readonly labels = injectAthLabels();

  /** Placeholder text */
  readonly placeholder = input('Search...');

  /** Debounce time in ms; read per keystroke, so a change applies to the next one. */
  readonly debounce = input(300, { transform: numberAttribute });

  /** Search event emitter */
  readonly searched = output<string>();

  protected readonly value = signal('');
  protected readonly searchIcon = Search;
  protected readonly clearIcon = X;

  private readonly query$ = new Subject<string>();

  constructor() {
    // `debounce` with a selector reads the input when a value arrives; the
    // old `debounceTime(this.debounce)` read it in the constructor, before
    // any binding was set, so `[debounce]` never applied (FE-09).
    this.query$
      .pipe(
        debounce(() => timer(this.debounce())),
        distinctUntilChanged(),
        takeUntilDestroyed()
      )
      .subscribe((value) => this.searched.emit(value));
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.query$.next(target.value);
  }

  clear(): void {
    this.value.set('');
    this.query$.next('');
  }
}
