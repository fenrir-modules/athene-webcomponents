import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
  /** Breadcrumb items */
  @Input() items: BreadcrumbItem[] = [];

  protected readonly separatorIcon = ChevronRight;
}
