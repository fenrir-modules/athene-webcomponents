import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { ATH_DEFAULT_LABELS, ATH_LABELS } from '../../i18n/labels';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';

/**
 * Breadcrumb item definition
 */
export interface BreadcrumbItem {
  label: string;
  link?: string;
}

/**
 * Athene Breadcrumb Component
 *
 * Page navigation breadcrumbs.
 *
 * @example
 * <ath-breadcrumb [items]="[{ label: 'Admin', link: '/admin' }, { label: 'Settings' }]" />
 */
@Component({
  selector: 'ath-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class AthBreadcrumbComponent {
  private readonly labels = inject(ATH_LABELS, { optional: true });

  /** Breadcrumb items */
  @Input() items: BreadcrumbItem[] = [];

  /** Accessible name of the landmark; defaults to `ATH_LABELS`. */
  @Input() ariaLabel: string | null = null;

  protected get navLabel(): string {
    return this.ariaLabel ?? (this.labels?.breadcrumb ?? ATH_DEFAULT_LABELS.breadcrumb)();
  }

  protected readonly separatorIcon = ChevronRight;
}
