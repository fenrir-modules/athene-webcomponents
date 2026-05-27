import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, HostBinding, signal, computed, ViewEncapsulation, inject, forwardRef, ElementRef, ChangeDetectorRef, HostListener, ViewChild, Injectable, Directive } from '@angular/core';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1 from 'lucide-angular';
import { PanelLeftClose, PanelLeft, LucideAngularModule, ChevronRight, X, Copy, Check, Loader2, Eye, EyeOff, AlertCircle, ChevronDown, Search, Upload, CheckCircle, AlertTriangle, Info, CheckCircle2, AlertOctagon, ChevronLeft, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as i2 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

/**
 * Page header with optional eyebrow, title, sub-row chips, description, and action slot.
 *
 * Sub-rows: pass `subItems` as an array of strings; they render with bullet separators.
 *
 * @example
 * <ath-page-header eyebrow="Work" title="Tickets"
 *                  [subItems]="['12 of 45', 'across 6 projects']">
 *   <button ath-button variant="secondary" size="sm">Filter</button>
 *   <button ath-button variant="primary" size="sm">+ New ticket</button>
 * </ath-page-header>
 */
class AthPageHeaderComponent {
    constructor() {
        /** Small uppercase eyebrow above the title (e.g., "Work", "Personal"). */
        this.eyebrow = '';
        /** Page title. */
        this.title = '';
        /** Multi-segment sub-row, rendered with bullet (•) separators. */
        this.subItems = [];
        /** Legacy free-form description (single paragraph). Falls back if subItems empty. */
        this.description = '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPageHeaderComponent, isStandalone: true, selector: "ath-page-header", inputs: { eyebrow: "eyebrow", title: "title", subItems: "subItems", description: "description" }, ngImport: i0, template: "<header class=\"ath-page-header\">\n  <div class=\"ath-page-header__text\">\n    @if (eyebrow) {\n      <div class=\"ath-page-header__eyebrow\">{{ eyebrow }}</div>\n    }\n    <h1 class=\"ath-page-header__title\">{{ title }}</h1>\n    @if (subItems && subItems.length > 0) {\n      <div class=\"ath-page-header__sub\">\n        @for (item of subItems; track $index; let last = $last) {\n          <span class=\"ath-page-header__sub-item\">{{ item }}</span>\n          @if (!last) {\n            <span class=\"ath-page-header__sub-sep\" aria-hidden=\"true\">\u2022</span>\n          }\n        }\n      </div>\n    } @else if (description) {\n      <p class=\"ath-page-header__description\">{{ description }}</p>\n    }\n  </div>\n  <div class=\"ath-page-header__actions\">\n    <ng-content />\n  </div>\n</header>\n", styles: [".ath-page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-6);padding-bottom:var(--ath-space-5)}.ath-page-header__text{flex:1;min-width:0}.ath-page-header__eyebrow{font-family:var(--font-sans);font-size:11px;font-weight:500;color:var(--fg-3);letter-spacing:.04em;margin-bottom:4px}.ath-page-header__title{margin:0;font-size:22px;font-weight:600;color:var(--fg);line-height:1.2;letter-spacing:-.02em}.ath-page-header__sub{margin-top:6px;display:flex;align-items:center;flex-wrap:wrap;gap:6px;font-size:13px;color:var(--fg-3);line-height:1.4}.ath-page-header__sub-item{font-weight:400}.ath-page-header__sub-sep{color:var(--fg-4)}.ath-page-header__description{margin:var(--ath-space-1) 0 0;font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);line-height:var(--ath-line-height-normal);max-width:560px}.ath-page-header__actions{display:flex;align-items:center;gap:var(--ath-space-2);flex-shrink:0}@media (max-width: 640px){.ath-page-header{flex-direction:column;align-items:stretch;gap:var(--ath-space-4)}.ath-page-header__actions{justify-content:flex-start}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-page-header', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"ath-page-header\">\n  <div class=\"ath-page-header__text\">\n    @if (eyebrow) {\n      <div class=\"ath-page-header__eyebrow\">{{ eyebrow }}</div>\n    }\n    <h1 class=\"ath-page-header__title\">{{ title }}</h1>\n    @if (subItems && subItems.length > 0) {\n      <div class=\"ath-page-header__sub\">\n        @for (item of subItems; track $index; let last = $last) {\n          <span class=\"ath-page-header__sub-item\">{{ item }}</span>\n          @if (!last) {\n            <span class=\"ath-page-header__sub-sep\" aria-hidden=\"true\">\u2022</span>\n          }\n        }\n      </div>\n    } @else if (description) {\n      <p class=\"ath-page-header__description\">{{ description }}</p>\n    }\n  </div>\n  <div class=\"ath-page-header__actions\">\n    <ng-content />\n  </div>\n</header>\n", styles: [".ath-page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-6);padding-bottom:var(--ath-space-5)}.ath-page-header__text{flex:1;min-width:0}.ath-page-header__eyebrow{font-family:var(--font-sans);font-size:11px;font-weight:500;color:var(--fg-3);letter-spacing:.04em;margin-bottom:4px}.ath-page-header__title{margin:0;font-size:22px;font-weight:600;color:var(--fg);line-height:1.2;letter-spacing:-.02em}.ath-page-header__sub{margin-top:6px;display:flex;align-items:center;flex-wrap:wrap;gap:6px;font-size:13px;color:var(--fg-3);line-height:1.4}.ath-page-header__sub-item{font-weight:400}.ath-page-header__sub-sep{color:var(--fg-4)}.ath-page-header__description{margin:var(--ath-space-1) 0 0;font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);line-height:var(--ath-line-height-normal);max-width:560px}.ath-page-header__actions{display:flex;align-items:center;gap:var(--ath-space-2);flex-shrink:0}@media (max-width: 640px){.ath-page-header{flex-direction:column;align-items:stretch;gap:var(--ath-space-4)}.ath-page-header__actions{justify-content:flex-start}}\n"] }]
        }], propDecorators: { eyebrow: [{
                type: Input
            }], title: [{
                type: Input,
                args: [{ required: true }]
            }], subItems: [{
                type: Input
            }], description: [{
                type: Input
            }] } });

/**
 * Athene Section Component
 *
 * Card-based section with title, description and content.
 *
 * @example
 * <ath-section title="General" description="Basic settings">
 *   <form>...</form>
 * </ath-section>
 */
class AthSectionComponent {
    constructor() {
        /** Section title */
        this.title = '';
        /** Section description */
        this.description = '';
        /** Collapsible state */
        this.collapsible = false;
        /** Expanded state (for collapsible) */
        this.expanded = true;
    }
    toggle() {
        if (this.collapsible) {
            this.expanded = !this.expanded;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSectionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSectionComponent, isStandalone: true, selector: "ath-section", inputs: { title: "title", description: "description", collapsible: "collapsible", expanded: "expanded" }, ngImport: i0, template: "<section class=\"ath-section\" [class.ath-section--collapsed]=\"collapsible && !expanded\">\n  <header class=\"ath-section__header\" (click)=\"toggle()\">\n    <div class=\"ath-section__text\">\n      <h2 class=\"ath-section__title\">{{ title }}</h2>\n      @if (description) {\n        <p class=\"ath-section__description\">{{ description }}</p>\n      }\n    </div>\n    <div class=\"ath-section__actions\">\n      <ng-content select=\"[slot=actions]\" />\n    </div>\n  </header>\n  @if (!collapsible || expanded) {\n    <div class=\"ath-section__content\">\n      <ng-content />\n    </div>\n  }\n</section>\n", styles: [".ath-section{background:var(--ath-bg-panel);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);overflow:hidden}.ath-section__header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-4);padding:var(--ath-space-4) var(--ath-space-5);border-bottom:1px solid var(--ath-border-color)}.ath-section__text{flex:1;min-width:0}.ath-section__title{margin:0;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight)}.ath-section__description{margin:2px 0 0;font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);line-height:var(--ath-line-height-tight)}.ath-section__actions{display:flex;align-items:center;gap:var(--ath-space-2);flex-shrink:0}.ath-section__content{padding:var(--ath-space-5)}.ath-section--collapsed .ath-section__header{border-bottom:none;cursor:pointer}.ath-section--collapsed .ath-section__header:hover{background:#ffffff05}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-section', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"ath-section\" [class.ath-section--collapsed]=\"collapsible && !expanded\">\n  <header class=\"ath-section__header\" (click)=\"toggle()\">\n    <div class=\"ath-section__text\">\n      <h2 class=\"ath-section__title\">{{ title }}</h2>\n      @if (description) {\n        <p class=\"ath-section__description\">{{ description }}</p>\n      }\n    </div>\n    <div class=\"ath-section__actions\">\n      <ng-content select=\"[slot=actions]\" />\n    </div>\n  </header>\n  @if (!collapsible || expanded) {\n    <div class=\"ath-section__content\">\n      <ng-content />\n    </div>\n  }\n</section>\n", styles: [".ath-section{background:var(--ath-bg-panel);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);overflow:hidden}.ath-section__header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-4);padding:var(--ath-space-4) var(--ath-space-5);border-bottom:1px solid var(--ath-border-color)}.ath-section__text{flex:1;min-width:0}.ath-section__title{margin:0;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight)}.ath-section__description{margin:2px 0 0;font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);line-height:var(--ath-line-height-tight)}.ath-section__actions{display:flex;align-items:center;gap:var(--ath-space-2);flex-shrink:0}.ath-section__content{padding:var(--ath-space-5)}.ath-section--collapsed .ath-section__header{border-bottom:none;cursor:pointer}.ath-section--collapsed .ath-section__header:hover{background:#ffffff05}\n"] }]
        }], propDecorators: { title: [{
                type: Input,
                args: [{ required: true }]
            }], description: [{
                type: Input
            }], collapsible: [{
                type: Input
            }], expanded: [{
                type: Input
            }] } });

/**
 * Athene Sidebar Component
 *
 * Navigation sidebar for admin and app layouts.
 *
 * @example
 * <ath-sidebar [collapsed]="isCollapsed" (collapsedChange)="isCollapsed = $event">
 *   <div slot="header">Logo</div>
 *   <ath-nav-item icon="home" label="Home" />
 *   <div slot="footer">User info</div>
 * </ath-sidebar>
 */
class AthSidebarComponent {
    constructor() {
        /** Collapsed state */
        this.collapsed = false;
        /** Collapsed change event */
        this.collapsedChange = new EventEmitter();
        this.collapseIcon = PanelLeftClose;
        this.expandIcon = PanelLeft;
    }
    get sidebarClasses() {
        return [
            'ath-sidebar',
            this.collapsed ? 'ath-sidebar--collapsed' : '',
        ].filter(Boolean).join(' ');
    }
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthSidebarComponent, isStandalone: true, selector: "ath-sidebar", inputs: { collapsed: "collapsed" }, outputs: { collapsedChange: "collapsedChange" }, ngImport: i0, template: "<aside [class]=\"sidebarClasses\">\n  <div class=\"ath-sidebar__header\">\n    <ng-content select=\"[slot=header]\" />\n  </div>\n\n  <nav class=\"ath-sidebar__nav\">\n    <ng-content />\n  </nav>\n\n  <div class=\"ath-sidebar__footer\">\n    <ng-content select=\"[slot=footer]\" />\n    <button\n      class=\"ath-sidebar__toggle\"\n      type=\"button\"\n      [attr.aria-label]=\"collapsed ? 'Expand sidebar' : 'Collapse sidebar'\"\n      (click)=\"toggleCollapse()\"\n    >\n      <lucide-icon [img]=\"collapsed ? expandIcon : collapseIcon\" [size]=\"18\" />\n    </button>\n  </div>\n</aside>\n", styles: [".ath-sidebar{display:flex;flex-direction:column;width:260px;height:100%;background-color:var(--ath-bg-secondary);border-right:1px solid var(--ath-border-color);transition:width var(--ath-transition-slow);overflow:hidden}.ath-sidebar--collapsed{width:64px}.ath-sidebar--collapsed .ath-sidebar__header,.ath-sidebar--collapsed .ath-sidebar__footer{padding:var(--ath-space-3)}.ath-sidebar__header{padding:var(--ath-space-4) var(--ath-space-5);border-bottom:1px solid var(--ath-border-color);flex-shrink:0}.ath-sidebar__nav{flex:1;display:flex;flex-direction:column;gap:var(--ath-space-1);padding:var(--ath-space-3);overflow-y:auto;overflow-x:hidden}.ath-sidebar__nav::-webkit-scrollbar{width:4px}.ath-sidebar__nav::-webkit-scrollbar-track{background:transparent}.ath-sidebar__nav::-webkit-scrollbar-thumb{background-color:var(--ath-border-color);border-radius:var(--ath-border-radius-full)}.ath-sidebar__footer{display:flex;flex-direction:column;gap:var(--ath-space-2);padding:var(--ath-space-4) var(--ath-space-5);border-top:1px solid var(--ath-border-color);flex-shrink:0}.ath-sidebar__toggle{display:flex;align-items:center;justify-content:center;width:100%;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-sidebar__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sidebar', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<aside [class]=\"sidebarClasses\">\n  <div class=\"ath-sidebar__header\">\n    <ng-content select=\"[slot=header]\" />\n  </div>\n\n  <nav class=\"ath-sidebar__nav\">\n    <ng-content />\n  </nav>\n\n  <div class=\"ath-sidebar__footer\">\n    <ng-content select=\"[slot=footer]\" />\n    <button\n      class=\"ath-sidebar__toggle\"\n      type=\"button\"\n      [attr.aria-label]=\"collapsed ? 'Expand sidebar' : 'Collapse sidebar'\"\n      (click)=\"toggleCollapse()\"\n    >\n      <lucide-icon [img]=\"collapsed ? expandIcon : collapseIcon\" [size]=\"18\" />\n    </button>\n  </div>\n</aside>\n", styles: [".ath-sidebar{display:flex;flex-direction:column;width:260px;height:100%;background-color:var(--ath-bg-secondary);border-right:1px solid var(--ath-border-color);transition:width var(--ath-transition-slow);overflow:hidden}.ath-sidebar--collapsed{width:64px}.ath-sidebar--collapsed .ath-sidebar__header,.ath-sidebar--collapsed .ath-sidebar__footer{padding:var(--ath-space-3)}.ath-sidebar__header{padding:var(--ath-space-4) var(--ath-space-5);border-bottom:1px solid var(--ath-border-color);flex-shrink:0}.ath-sidebar__nav{flex:1;display:flex;flex-direction:column;gap:var(--ath-space-1);padding:var(--ath-space-3);overflow-y:auto;overflow-x:hidden}.ath-sidebar__nav::-webkit-scrollbar{width:4px}.ath-sidebar__nav::-webkit-scrollbar-track{background:transparent}.ath-sidebar__nav::-webkit-scrollbar-thumb{background-color:var(--ath-border-color);border-radius:var(--ath-border-radius-full)}.ath-sidebar__footer{display:flex;flex-direction:column;gap:var(--ath-space-2);padding:var(--ath-space-4) var(--ath-space-5);border-top:1px solid var(--ath-border-color);flex-shrink:0}.ath-sidebar__toggle{display:flex;align-items:center;justify-content:center;width:100%;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-sidebar__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}\n"] }]
        }], propDecorators: { collapsed: [{
                type: Input
            }], collapsedChange: [{
                type: Output
            }] } });

/**
 * Athene Nav Item Component
 *
 * Navigation item for sidebar with icon, label and active state.
 *
 * @example
 * <ath-nav-item [icon]="homeIcon" label="Overview" link="/admin/overview" />
 * <ath-nav-item [icon]="flagIcon" label="Feature Flags" link="/admin/feature-flags" />
 */
class AthNavItemComponent {
    constructor() {
        /** Lucide icon */
        this.icon = null;
        /** Nav item label */
        this.label = '';
        /** Router link */
        this.link = '';
        /** Whether the sidebar is collapsed */
        this.collapsed = false;
        /** Badge count (optional) */
        this.badgeCount = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthNavItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthNavItemComponent, isStandalone: true, selector: "ath-nav-item", inputs: { icon: "icon", label: "label", link: "link", collapsed: "collapsed", badgeCount: "badgeCount" }, ngImport: i0, template: "<a\n  class=\"ath-nav-item\"\n  [routerLink]=\"link\"\n  routerLinkActive=\"ath-nav-item--active\"\n  [routerLinkActiveOptions]=\"{ exact: false }\"\n  [class.ath-nav-item--collapsed]=\"collapsed\"\n  [attr.title]=\"collapsed ? label : null\"\n>\n  @if (icon) {\n    <lucide-icon [img]=\"icon\" [size]=\"20\" class=\"ath-nav-item__icon\" />\n  }\n  @if (!collapsed) {\n    <span class=\"ath-nav-item__label\">{{ label }}</span>\n    @if (badgeCount !== null) {\n      <span class=\"ath-nav-item__badge\">{{ badgeCount }}</span>\n    }\n  }\n</a>\n", styles: [".ath-nav-item{display:flex;align-items:center;gap:var(--ath-space-3);padding:10px var(--ath-space-3);border-radius:var(--ath-border-radius-md);color:var(--ath-text-tertiary);text-decoration:none;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);transition:all .15s ease;cursor:pointer;white-space:nowrap;overflow:hidden;position:relative}.ath-nav-item:hover{color:var(--ath-text-primary);background-color:#ffffff0a}.ath-nav-item--active{color:var(--ath-color-primary);background-color:#c9963a14}.ath-nav-item--active:before{content:\"\";position:absolute;left:0;top:6px;bottom:6px;width:3px;border-radius:0 2px 2px 0;background:var(--ath-color-primary)}.ath-nav-item--active:hover{color:var(--ath-color-primary);background-color:#c9963a1f}.ath-nav-item--active .ath-nav-item__icon{color:var(--ath-color-primary)}.ath-nav-item--collapsed{justify-content:center;padding:var(--ath-space-2)}.ath-nav-item__icon{flex-shrink:0;color:inherit}.ath-nav-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}.ath-nav-item__badge{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 var(--ath-space-1);font-size:var(--ath-font-size-xs);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-inverse);background-color:var(--ath-color-primary);border-radius:var(--ath-border-radius-full)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthNavItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-nav-item', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  class=\"ath-nav-item\"\n  [routerLink]=\"link\"\n  routerLinkActive=\"ath-nav-item--active\"\n  [routerLinkActiveOptions]=\"{ exact: false }\"\n  [class.ath-nav-item--collapsed]=\"collapsed\"\n  [attr.title]=\"collapsed ? label : null\"\n>\n  @if (icon) {\n    <lucide-icon [img]=\"icon\" [size]=\"20\" class=\"ath-nav-item__icon\" />\n  }\n  @if (!collapsed) {\n    <span class=\"ath-nav-item__label\">{{ label }}</span>\n    @if (badgeCount !== null) {\n      <span class=\"ath-nav-item__badge\">{{ badgeCount }}</span>\n    }\n  }\n</a>\n", styles: [".ath-nav-item{display:flex;align-items:center;gap:var(--ath-space-3);padding:10px var(--ath-space-3);border-radius:var(--ath-border-radius-md);color:var(--ath-text-tertiary);text-decoration:none;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);transition:all .15s ease;cursor:pointer;white-space:nowrap;overflow:hidden;position:relative}.ath-nav-item:hover{color:var(--ath-text-primary);background-color:#ffffff0a}.ath-nav-item--active{color:var(--ath-color-primary);background-color:#c9963a14}.ath-nav-item--active:before{content:\"\";position:absolute;left:0;top:6px;bottom:6px;width:3px;border-radius:0 2px 2px 0;background:var(--ath-color-primary)}.ath-nav-item--active:hover{color:var(--ath-color-primary);background-color:#c9963a1f}.ath-nav-item--active .ath-nav-item__icon{color:var(--ath-color-primary)}.ath-nav-item--collapsed{justify-content:center;padding:var(--ath-space-2)}.ath-nav-item__icon{flex-shrink:0;color:inherit}.ath-nav-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}.ath-nav-item__badge{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 var(--ath-space-1);font-size:var(--ath-font-size-xs);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-inverse);background-color:var(--ath-color-primary);border-radius:var(--ath-border-radius-full)}\n"] }]
        }], propDecorators: { icon: [{
                type: Input
            }], label: [{
                type: Input
            }], link: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], badgeCount: [{
                type: Input
            }] } });

/**
 * Athene Breadcrumb Component
 *
 * Page navigation breadcrumbs.
 *
 * @example
 * <ath-breadcrumb [items]="[{ label: 'Admin', link: '/admin' }, { label: 'Settings' }]" />
 */
class AthBreadcrumbComponent {
    constructor() {
        /** Breadcrumb items */
        this.items = [];
        this.separatorIcon = ChevronRight;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBreadcrumbComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthBreadcrumbComponent, isStandalone: true, selector: "ath-breadcrumb", inputs: { items: "items" }, ngImport: i0, template: "<nav class=\"ath-breadcrumb\" aria-label=\"Breadcrumb\">\n  <ol class=\"ath-breadcrumb__list\">\n    @for (item of items; track item.label; let last = $last) {\n      <li class=\"ath-breadcrumb__item\">\n        @if (item.link && !last) {\n          <a [routerLink]=\"item.link\" class=\"ath-breadcrumb__link\">{{ item.label }}</a>\n        } @else {\n          <span class=\"ath-breadcrumb__current\" [attr.aria-current]=\"last ? 'page' : null\">{{ item.label }}</span>\n        }\n        @if (!last) {\n          <lucide-icon [img]=\"separatorIcon\" [size]=\"14\" class=\"ath-breadcrumb__separator\" />\n        }\n      </li>\n    }\n  </ol>\n</nav>\n", styles: [".ath-breadcrumb__list{display:flex;align-items:center;gap:var(--ath-space-1);list-style:none;margin:0;padding:0}.ath-breadcrumb__item{display:flex;align-items:center;gap:var(--ath-space-1)}.ath-breadcrumb__link{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);text-decoration:none;transition:color var(--ath-transition-fast)}.ath-breadcrumb__link:hover{color:var(--ath-text-link)}.ath-breadcrumb__current{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-breadcrumb__separator{color:var(--ath-text-tertiary);flex-shrink:0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBreadcrumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-breadcrumb', standalone: true, imports: [CommonModule, RouterLink, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav class=\"ath-breadcrumb\" aria-label=\"Breadcrumb\">\n  <ol class=\"ath-breadcrumb__list\">\n    @for (item of items; track item.label; let last = $last) {\n      <li class=\"ath-breadcrumb__item\">\n        @if (item.link && !last) {\n          <a [routerLink]=\"item.link\" class=\"ath-breadcrumb__link\">{{ item.label }}</a>\n        } @else {\n          <span class=\"ath-breadcrumb__current\" [attr.aria-current]=\"last ? 'page' : null\">{{ item.label }}</span>\n        }\n        @if (!last) {\n          <lucide-icon [img]=\"separatorIcon\" [size]=\"14\" class=\"ath-breadcrumb__separator\" />\n        }\n      </li>\n    }\n  </ol>\n</nav>\n", styles: [".ath-breadcrumb__list{display:flex;align-items:center;gap:var(--ath-space-1);list-style:none;margin:0;padding:0}.ath-breadcrumb__item{display:flex;align-items:center;gap:var(--ath-space-1)}.ath-breadcrumb__link{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);text-decoration:none;transition:color var(--ath-transition-fast)}.ath-breadcrumb__link:hover{color:var(--ath-text-link)}.ath-breadcrumb__current{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-breadcrumb__separator{color:var(--ath-text-tertiary);flex-shrink:0}\n"] }]
        }], propDecorators: { items: [{
                type: Input
            }] } });

/**
 * Athene Divider Component
 *
 * Visual separator for content sections.
 *
 * @example
 * <ath-divider />
 * <ath-divider spacing="lg" />
 * <ath-divider orientation="vertical" />
 */
class AthDividerComponent {
    constructor() {
        /** Orientation */
        this.orientation = 'horizontal';
        /** Spacing around the divider */
        this.spacing = 'md';
    }
    get dividerClasses() {
        return [
            'ath-divider',
            `ath-divider--${this.orientation}`,
            `ath-divider--spacing-${this.spacing}`,
        ].join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthDividerComponent, isStandalone: true, selector: "ath-divider", inputs: { orientation: "orientation", spacing: "spacing" }, ngImport: i0, template: "<div [class]=\"dividerClasses\" role=\"separator\"></div>\n", styles: [".ath-divider{flex-shrink:0;background-color:var(--ath-border-color)}.ath-divider--horizontal{width:100%;height:1px}.ath-divider--vertical{width:1px;align-self:stretch}.ath-divider--spacing-none{margin:0}.ath-divider--spacing-sm.ath-divider--horizontal{margin:var(--ath-space-2) 0}.ath-divider--spacing-sm.ath-divider--vertical{margin:0 var(--ath-space-2)}.ath-divider--spacing-md.ath-divider--horizontal{margin:var(--ath-space-4) 0}.ath-divider--spacing-md.ath-divider--vertical{margin:0 var(--ath-space-4)}.ath-divider--spacing-lg.ath-divider--horizontal{margin:var(--ath-space-6) 0}.ath-divider--spacing-lg.ath-divider--vertical{margin:0 var(--ath-space-6)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDividerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-divider', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"dividerClasses\" role=\"separator\"></div>\n", styles: [".ath-divider{flex-shrink:0;background-color:var(--ath-border-color)}.ath-divider--horizontal{width:100%;height:1px}.ath-divider--vertical{width:1px;align-self:stretch}.ath-divider--spacing-none{margin:0}.ath-divider--spacing-sm.ath-divider--horizontal{margin:var(--ath-space-2) 0}.ath-divider--spacing-sm.ath-divider--vertical{margin:0 var(--ath-space-2)}.ath-divider--spacing-md.ath-divider--horizontal{margin:var(--ath-space-4) 0}.ath-divider--spacing-md.ath-divider--vertical{margin:0 var(--ath-space-4)}.ath-divider--spacing-lg.ath-divider--horizontal{margin:var(--ath-space-6) 0}.ath-divider--spacing-lg.ath-divider--vertical{margin:0 var(--ath-space-6)}\n"] }]
        }], propDecorators: { orientation: [{
                type: Input
            }], spacing: [{
                type: Input
            }] } });

/**
 * Athene Tabs Component
 *
 * Tab navigation for switching between content sections.
 *
 * @example
 * <ath-tabs [tabs]="tabs" [activeTab]="activeTab" (tabChanged)="activeTab = $event" />
 */
class AthTabsComponent {
    constructor() {
        /** Tab items */
        this.tabs = [];
        /** Currently active tab ID */
        this.activeTab = '';
        /** Tab change event */
        this.tabChanged = new EventEmitter();
    }
    selectTab(tab) {
        if (!tab.disabled && tab.id !== this.activeTab) {
            this.tabChanged.emit(tab.id);
        }
    }
    getTabClasses(tab) {
        return [
            'ath-tabs__tab',
            tab.id === this.activeTab ? 'ath-tabs__tab--active' : '',
            tab.disabled ? 'ath-tabs__tab--disabled' : '',
        ].filter(Boolean).join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTabsComponent, isStandalone: true, selector: "ath-tabs", inputs: { tabs: "tabs", activeTab: "activeTab" }, outputs: { tabChanged: "tabChanged" }, ngImport: i0, template: "<div class=\"ath-tabs\" role=\"tablist\">\n  @for (tab of tabs; track tab.id) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n    >\n      <span class=\"ath-tabs__label\">{{ tab.label }}</span>\n      @if (tab.count != null && tab.count !== 0 && tab.count !== '') {\n        <span class=\"ath-tabs__count\">{{ tab.count }}</span>\n      }\n    </button>\n  }\n</div>\n", styles: [".ath-tabs{display:flex;gap:0;border-bottom:1px solid var(--ath-border-color)}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-tertiary);background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;cursor:pointer;transition:all var(--ath-transition-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--ath-text-primary)}.ath-tabs__tab--active{color:var(--ath-color-primary);border-bottom-color:var(--ath-color-primary)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--ath-color-primary)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--ath-border-color-focus);border-radius:var(--ath-border-radius-sm) var(--ath-border-radius-sm) 0 0}.ath-tabs__label{display:inline-flex;align-items:center}.ath-tabs__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:16px;margin-left:6px;padding:0 5px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;line-height:1;color:var(--fg-3);background:var(--bg-2);border-radius:999px;transition:color var(--t-fast),background var(--t-fast)}.ath-tabs__tab--active .ath-tabs__count{color:var(--accent);background:var(--accent-faint)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-tabs', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-tabs\" role=\"tablist\">\n  @for (tab of tabs; track tab.id) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n    >\n      <span class=\"ath-tabs__label\">{{ tab.label }}</span>\n      @if (tab.count != null && tab.count !== 0 && tab.count !== '') {\n        <span class=\"ath-tabs__count\">{{ tab.count }}</span>\n      }\n    </button>\n  }\n</div>\n", styles: [".ath-tabs{display:flex;gap:0;border-bottom:1px solid var(--ath-border-color)}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-tertiary);background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;cursor:pointer;transition:all var(--ath-transition-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--ath-text-primary)}.ath-tabs__tab--active{color:var(--ath-color-primary);border-bottom-color:var(--ath-color-primary)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--ath-color-primary)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--ath-border-color-focus);border-radius:var(--ath-border-radius-sm) var(--ath-border-radius-sm) 0 0}.ath-tabs__label{display:inline-flex;align-items:center}.ath-tabs__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:16px;margin-left:6px;padding:0 5px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;line-height:1;color:var(--fg-3);background:var(--bg-2);border-radius:999px;transition:color var(--t-fast),background var(--t-fast)}.ath-tabs__tab--active .ath-tabs__count{color:var(--accent);background:var(--accent-faint)}\n"] }]
        }], propDecorators: { tabs: [{
                type: Input
            }], activeTab: [{
                type: Input
            }], tabChanged: [{
                type: Output
            }] } });

/**
 * Vertical timeline container with connecting rail.
 * Wraps `<ath-timeline-entry>` and `<ath-timeline-event>` items.
 *
 * @example
 * <ath-timeline>
 *   <ath-timeline-entry author="Mira Voss" avatarName="Mira Voss" [whenMinutes]="48">
 *     <p>Pushed first pass to a feature branch.</p>
 *   </ath-timeline-entry>
 *   <ath-timeline-event statusColor="var(--green)">
 *     <b>Mira</b> moved this to In Progress · 2d ago
 *   </ath-timeline-event>
 * </ath-timeline>
 */
class AthTimelineComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthTimelineComponent, isStandalone: true, selector: "ath-timeline", ngImport: i0, template: "<ng-content />\n", styles: [":host{display:block;position:relative}:host:before{content:\"\";position:absolute;left:12px;top:8px;bottom:8px;width:1px;background:var(--border-faint);pointer-events:none}::ng-deep ath-timeline-entry,::ng-deep ath-timeline-event{display:block;position:relative}::ng-deep ath-timeline-entry+ath-timeline-entry,::ng-deep ath-timeline-entry+ath-timeline-event,::ng-deep ath-timeline-event+ath-timeline-entry,::ng-deep ath-timeline-event+ath-timeline-event{margin-top:12px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timeline', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content />\n", styles: [":host{display:block;position:relative}:host:before{content:\"\";position:absolute;left:12px;top:8px;bottom:8px;width:1px;background:var(--border-faint);pointer-events:none}::ng-deep ath-timeline-entry,::ng-deep ath-timeline-event{display:block;position:relative}::ng-deep ath-timeline-entry+ath-timeline-entry,::ng-deep ath-timeline-entry+ath-timeline-event,::ng-deep ath-timeline-event+ath-timeline-entry,::ng-deep ath-timeline-event+ath-timeline-event{margin-top:12px}\n"] }]
        }] });

/**
 * Athene Avatar Component
 *
 * User avatar with initials fallback.
 *
 * @example
 * <ath-avatar name="John Doe" />
 * <ath-avatar name="Admin" size="lg" />
 */
class AthAvatarComponent {
    constructor() {
        /** User display name (used for initials) */
        this.name = '';
        /** Optional image URL */
        this.src = '';
        /** Avatar size */
        this.size = 'md';
    }
    get avatarClasses() {
        return `ath-avatar ath-avatar--${this.size}`;
    }
    get initials() {
        if (!this.name)
            return '?';
        const parts = this.name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return parts[0].substring(0, 2).toUpperCase();
    }
    onImageError(event) {
        event.target.style.display = 'none';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAvatarComponent, isStandalone: true, selector: "ath-avatar", inputs: { name: "name", src: "src", size: "size" }, ngImport: i0, template: "<div [class]=\"avatarClasses\" [attr.aria-label]=\"name\">\n  @if (src) {\n    <img [src]=\"src\" [alt]=\"name\" class=\"ath-avatar__image\" (error)=\"onImageError($event)\" />\n  }\n  <span class=\"ath-avatar__initials\">{{ initials }}</span>\n</div>\n", styles: [".ath-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--ath-border-radius-full);background:linear-gradient(135deg,var(--ath-color-primary),var(--ath-color-primary-hover));color:var(--ath-text-inverse);font-weight:var(--ath-font-weight-semibold);overflow:hidden;flex-shrink:0;-webkit-user-select:none;user-select:none}.ath-avatar--sm{width:28px;height:28px;font-size:var(--ath-font-size-xs)}.ath-avatar--md{width:36px;height:36px;font-size:var(--ath-font-size-sm)}.ath-avatar--lg{width:44px;height:44px;font-size:var(--ath-font-size-md)}.ath-avatar--xl{width:56px;height:56px;font-size:var(--ath-font-size-lg)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ath-avatar__initials{position:relative;z-index:1;letter-spacing:.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-avatar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"avatarClasses\" [attr.aria-label]=\"name\">\n  @if (src) {\n    <img [src]=\"src\" [alt]=\"name\" class=\"ath-avatar__image\" (error)=\"onImageError($event)\" />\n  }\n  <span class=\"ath-avatar__initials\">{{ initials }}</span>\n</div>\n", styles: [".ath-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;border-radius:var(--ath-border-radius-full);background:linear-gradient(135deg,var(--ath-color-primary),var(--ath-color-primary-hover));color:var(--ath-text-inverse);font-weight:var(--ath-font-weight-semibold);overflow:hidden;flex-shrink:0;-webkit-user-select:none;user-select:none}.ath-avatar--sm{width:28px;height:28px;font-size:var(--ath-font-size-xs)}.ath-avatar--md{width:36px;height:36px;font-size:var(--ath-font-size-sm)}.ath-avatar--lg{width:44px;height:44px;font-size:var(--ath-font-size-md)}.ath-avatar--xl{width:56px;height:56px;font-size:var(--ath-font-size-lg)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ath-avatar__initials{position:relative;z-index:1;letter-spacing:.5px}\n"] }]
        }], propDecorators: { name: [{
                type: Input
            }], src: [{
                type: Input
            }], size: [{
                type: Input
            }] } });

/**
 * A full timeline item (comment, note, change-with-content).
 * Use inside <ath-timeline>.
 *
 * @example
 * <ath-timeline-entry
 *   author="Mira Voss"
 *   avatarName="Mira Voss"
 *   timeLabel="48m ago"
 *   [internal]="false">
 *   <p>Pushed first pass.</p>
 * </ath-timeline-entry>
 */
class AthTimelineEntryComponent {
    constructor() {
        /** Defaults to `author` for initials/colors. Override if avatar should differ. */
        this.avatarName = null;
        this.avatarSrc = '';
        /** Pre-formatted relative time (e.g., "5m ago"). */
        this.timeLabel = '';
        /** Marks the entry as internal (only visible to operators/admins). */
        this.internal = false;
    }
    get hostInternal() {
        return this.internal ? 'true' : null;
    }
    get effectiveAvatarName() {
        return this.avatarName ?? this.author;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineEntryComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTimelineEntryComponent, isStandalone: true, selector: "ath-timeline-entry", inputs: { author: "author", avatarName: "avatarName", avatarSrc: "avatarSrc", timeLabel: "timeLabel", internal: "internal" }, host: { properties: { "attr.data-internal": "this.hostInternal" } }, ngImport: i0, template: "<div class=\"ath-tl-entry__avatar\">\n  <ath-avatar [name]=\"effectiveAvatarName\" [src]=\"avatarSrc\" size=\"sm\" />\n</div>\n<div class=\"ath-tl-entry__body\">\n  <div class=\"ath-tl-entry__meta\">\n    <b class=\"ath-tl-entry__author\">{{ author }}</b>\n    @if (internal) {\n      <span class=\"ath-tl-entry__internal\" title=\"Internal note\">internal</span>\n    }\n    @if (timeLabel) {\n      <span class=\"ath-tl-entry__when\">{{ timeLabel }}</span>\n    }\n  </div>\n  <div class=\"ath-tl-entry__content\">\n    <ng-content />\n  </div>\n</div>\n", styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;position:relative;padding:6px 0}.ath-tl-entry__avatar{position:relative;z-index:1}.ath-tl-entry__avatar ath-avatar{box-shadow:0 0 0 2px var(--bg-0);border-radius:999px;display:inline-flex}.ath-tl-entry__body{min-width:0}.ath-tl-entry__meta{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;font-family:var(--font-sans);font-size:12.5px;line-height:1.4}.ath-tl-entry__author{color:var(--fg);font-weight:600}.ath-tl-entry__internal{display:inline-flex;align-items:center;padding:1px 6px;font-size:10.5px;font-weight:500;color:var(--amber);background:var(--amber-tint);border-radius:var(--r-xs);text-transform:lowercase;letter-spacing:.02em}.ath-tl-entry__when{color:var(--fg-3);font-family:var(--font-mono);font-size:11px}.ath-tl-entry__content{color:var(--fg-2);font-size:13px;line-height:1.55}.ath-tl-entry__content ::ng-deep p{margin:0 0 6px}.ath-tl-entry__content ::ng-deep p:last-child{margin-bottom:0}.ath-tl-entry__content ::ng-deep code{font-family:var(--font-mono);font-size:12px;padding:1px 5px;background:var(--surface-3);border-radius:var(--r-xs);color:var(--fg)}:host([data-internal=true]){padding:8px 10px;background:var(--amber-tint);border-radius:var(--r);margin-left:-10px;margin-right:-10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthAvatarComponent, selector: "ath-avatar", inputs: ["name", "src", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineEntryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timeline-entry', standalone: true, imports: [CommonModule, AthAvatarComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-tl-entry__avatar\">\n  <ath-avatar [name]=\"effectiveAvatarName\" [src]=\"avatarSrc\" size=\"sm\" />\n</div>\n<div class=\"ath-tl-entry__body\">\n  <div class=\"ath-tl-entry__meta\">\n    <b class=\"ath-tl-entry__author\">{{ author }}</b>\n    @if (internal) {\n      <span class=\"ath-tl-entry__internal\" title=\"Internal note\">internal</span>\n    }\n    @if (timeLabel) {\n      <span class=\"ath-tl-entry__when\">{{ timeLabel }}</span>\n    }\n  </div>\n  <div class=\"ath-tl-entry__content\">\n    <ng-content />\n  </div>\n</div>\n", styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;position:relative;padding:6px 0}.ath-tl-entry__avatar{position:relative;z-index:1}.ath-tl-entry__avatar ath-avatar{box-shadow:0 0 0 2px var(--bg-0);border-radius:999px;display:inline-flex}.ath-tl-entry__body{min-width:0}.ath-tl-entry__meta{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;font-family:var(--font-sans);font-size:12.5px;line-height:1.4}.ath-tl-entry__author{color:var(--fg);font-weight:600}.ath-tl-entry__internal{display:inline-flex;align-items:center;padding:1px 6px;font-size:10.5px;font-weight:500;color:var(--amber);background:var(--amber-tint);border-radius:var(--r-xs);text-transform:lowercase;letter-spacing:.02em}.ath-tl-entry__when{color:var(--fg-3);font-family:var(--font-mono);font-size:11px}.ath-tl-entry__content{color:var(--fg-2);font-size:13px;line-height:1.55}.ath-tl-entry__content ::ng-deep p{margin:0 0 6px}.ath-tl-entry__content ::ng-deep p:last-child{margin-bottom:0}.ath-tl-entry__content ::ng-deep code{font-family:var(--font-mono);font-size:12px;padding:1px 5px;background:var(--surface-3);border-radius:var(--r-xs);color:var(--fg)}:host([data-internal=true]){padding:8px 10px;background:var(--amber-tint);border-radius:var(--r);margin-left:-10px;margin-right:-10px}\n"] }]
        }], propDecorators: { author: [{
                type: Input,
                args: [{ required: true }]
            }], avatarName: [{
                type: Input
            }], avatarSrc: [{
                type: Input
            }], timeLabel: [{
                type: Input
            }], internal: [{
                type: Input
            }], hostInternal: [{
                type: HostBinding,
                args: ['attr.data-internal']
            }] } });

/**
 * Compact timeline marker for status changes, assignments etc.
 * (Lighter weight than <ath-timeline-entry>.)
 *
 * @example
 * <ath-timeline-event statusColor="var(--green)">
 *   <b>Mira</b> moved to In Progress · 2d ago
 * </ath-timeline-event>
 */
class AthTimelineEventComponent {
    constructor() {
        /** Dot color — any CSS color (e.g., `var(--green)`, `#f59e0b`). */
        this.statusColor = 'var(--fg-4)';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineEventComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthTimelineEventComponent, isStandalone: true, selector: "ath-timeline-event", inputs: { statusColor: "statusColor" }, ngImport: i0, template: "<div class=\"ath-tl-event__dot-wrap\">\n  <span class=\"ath-tl-event__dot\" [style.background]=\"statusColor\"></span>\n</div>\n<div class=\"ath-tl-event__text\">\n  <ng-content />\n</div>\n", styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;align-items:center;padding:4px 0;font-family:var(--font-sans);font-size:12.5px;color:var(--fg-3);line-height:1.4}.ath-tl-event__dot-wrap{display:flex;align-items:center;justify-content:center;position:relative;z-index:1}.ath-tl-event__dot{width:8px;height:8px;border-radius:999px;box-shadow:0 0 0 3px var(--bg-0)}.ath-tl-event__text{min-width:0}.ath-tl-event__text ::ng-deep b{color:var(--fg);font-weight:600}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineEventComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timeline-event', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-tl-event__dot-wrap\">\n  <span class=\"ath-tl-event__dot\" [style.background]=\"statusColor\"></span>\n</div>\n<div class=\"ath-tl-event__text\">\n  <ng-content />\n</div>\n", styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;align-items:center;padding:4px 0;font-family:var(--font-sans);font-size:12.5px;color:var(--fg-3);line-height:1.4}.ath-tl-event__dot-wrap{display:flex;align-items:center;justify-content:center;position:relative;z-index:1}.ath-tl-event__dot{width:8px;height:8px;border-radius:999px;box-shadow:0 0 0 3px var(--bg-0)}.ath-tl-event__text{min-width:0}.ath-tl-event__text ::ng-deep b{color:var(--fg);font-weight:600}\n"] }]
        }], propDecorators: { statusColor: [{
                type: Input
            }] } });

/**
 * Athene Card Component
 *
 * @example
 * <ath-card>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </ath-card>
 *
 * <ath-card [hoverable]="true" padding="lg">
 *   Hoverable card with large padding
 * </ath-card>
 */
class AthCardComponent {
    constructor() {
        /** Card padding */
        this.padding = 'md';
        /** Show border */
        this.bordered = true;
        /** Hoverable effect */
        this.hoverable = false;
        /** Show header slot */
        this.header = false;
        /** Show footer slot */
        this.footer = false;
    }
    get cardClasses() {
        return [
            'ath-card',
            `ath-card--padding-${this.padding}`,
            this.bordered ? 'ath-card--bordered' : '',
            this.hoverable ? 'ath-card--hoverable' : '',
        ].filter(Boolean).join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthCardComponent, isStandalone: true, selector: "ath-card", inputs: { padding: "padding", bordered: "bordered", hoverable: "hoverable", header: "header", footer: "footer" }, ngImport: i0, template: "<div [class]=\"cardClasses\">\n  @if (header) {\n    <div class=\"ath-card__header\">\n      <ng-content select=\"[slot=header]\" />\n    </div>\n  }\n\n  <div class=\"ath-card__body\">\n    <ng-content />\n  </div>\n\n  @if (footer) {\n    <div class=\"ath-card__footer\">\n      <ng-content select=\"[slot=footer]\" />\n    </div>\n  }\n</div>\n", styles: [".ath-card{background-color:var(--ath-bg-panel);border-radius:var(--ath-border-radius-lg);box-shadow:var(--ath-shadow-sm);backdrop-filter:blur(14px);transition:box-shadow var(--ath-transition-fast),transform var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-card--padding-none .ath-card__body{padding:0}.ath-card--padding-sm .ath-card__body{padding:var(--ath-space-3)}.ath-card--padding-md .ath-card__body{padding:var(--ath-space-4)}.ath-card--padding-lg .ath-card__body{padding:var(--ath-space-6)}.ath-card--bordered{border:1px solid var(--ath-border-color)}.ath-card--hoverable{cursor:pointer}.ath-card--hoverable:hover{box-shadow:var(--ath-shadow-md);transform:translateY(-2px);border-color:var(--ath-border-color-hover)}.ath-card__header{padding:var(--ath-space-4);border-bottom:1px solid var(--ath-border-color);font-weight:var(--ath-font-weight-semibold)}.ath-card__footer{padding:var(--ath-space-4);border-top:1px solid var(--ath-border-color);background-color:var(--ath-bg-tertiary);border-radius:0 0 var(--ath-border-radius-lg) var(--ath-border-radius-lg)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-card', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"cardClasses\">\n  @if (header) {\n    <div class=\"ath-card__header\">\n      <ng-content select=\"[slot=header]\" />\n    </div>\n  }\n\n  <div class=\"ath-card__body\">\n    <ng-content />\n  </div>\n\n  @if (footer) {\n    <div class=\"ath-card__footer\">\n      <ng-content select=\"[slot=footer]\" />\n    </div>\n  }\n</div>\n", styles: [".ath-card{background-color:var(--ath-bg-panel);border-radius:var(--ath-border-radius-lg);box-shadow:var(--ath-shadow-sm);backdrop-filter:blur(14px);transition:box-shadow var(--ath-transition-fast),transform var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-card--padding-none .ath-card__body{padding:0}.ath-card--padding-sm .ath-card__body{padding:var(--ath-space-3)}.ath-card--padding-md .ath-card__body{padding:var(--ath-space-4)}.ath-card--padding-lg .ath-card__body{padding:var(--ath-space-6)}.ath-card--bordered{border:1px solid var(--ath-border-color)}.ath-card--hoverable{cursor:pointer}.ath-card--hoverable:hover{box-shadow:var(--ath-shadow-md);transform:translateY(-2px);border-color:var(--ath-border-color-hover)}.ath-card__header{padding:var(--ath-space-4);border-bottom:1px solid var(--ath-border-color);font-weight:var(--ath-font-weight-semibold)}.ath-card__footer{padding:var(--ath-space-4);border-top:1px solid var(--ath-border-color);background-color:var(--ath-bg-tertiary);border-radius:0 0 var(--ath-border-radius-lg) var(--ath-border-radius-lg)}\n"] }]
        }], propDecorators: { padding: [{
                type: Input
            }], bordered: [{
                type: Input
            }], hoverable: [{
                type: Input
            }], header: [{
                type: Input
            }], footer: [{
                type: Input
            }] } });

/**
 * Mini line chart, no axes, no labels.
 *
 * @example
 * <ath-sparkline [data]="[12, 14, 13, 18, 22, 20, 24]" color="var(--accent)" />
 * <ath-sparkline [data]="trend" [width]="86" [height]="28" [showArea]="false" />
 */
class AthSparklineComponent {
    constructor() {
        this._data = signal([]);
        /** Width in px. */
        this.width = 86;
        /** Height in px. */
        this.height = 28;
        /** Stroke color — any CSS color (e.g., `var(--accent)`, `#16a34a`). */
        this.color = 'var(--accent)';
        /** Show a dot at the most recent value. */
        this.showDot = true;
        /** Render a translucent filled area below the line. */
        this.showArea = true;
        /** Stroke width in px. */
        this.strokeWidth = 1.5;
        this.geometry = computed(() => {
            const values = this._data();
            if (values.length < 2) {
                return null;
            }
            const w = this.width;
            const h = this.height;
            const min = Math.min(...values);
            const max = Math.max(...values);
            const range = max - min || 1;
            const points = values.map((v, i) => {
                const x = (i / (values.length - 1)) * (w - 2) + 1;
                const y = h - 2 - ((v - min) / range) * (h - 4);
                return [x, y];
            });
            const linePath = points
                .map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1))
                .join(' ');
            const areaPath = `${linePath} L ${w - 1},${h - 1} L 1,${h - 1} Z`;
            const last = points[points.length - 1];
            return { linePath, areaPath, lastX: last[0], lastY: last[1] };
        });
    }
    /** Numeric values to plot. Minimum 2 points; fewer renders nothing. */
    set data(value) {
        this._data.set(value ?? []);
    }
    get data() {
        return this._data();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSparklineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSparklineComponent, isStandalone: true, selector: "ath-sparkline", inputs: { data: "data", width: "width", height: "height", color: "color", showDot: "showDot", showArea: "showArea", strokeWidth: "strokeWidth" }, ngImport: i0, template: "@if (geometry(); as g) {\n  <svg\n    class=\"ath-sparkline\"\n    [attr.width]=\"width\"\n    [attr.height]=\"height\"\n    [attr.viewBox]=\"'0 0 ' + width + ' ' + height\"\n    aria-hidden=\"true\"\n  >\n    @if (showArea) {\n      <path class=\"ath-sparkline__area\" [attr.d]=\"g.areaPath\" [attr.fill]=\"color\" />\n    }\n    <path\n      class=\"ath-sparkline__line\"\n      [attr.d]=\"g.linePath\"\n      [attr.stroke]=\"color\"\n      [attr.stroke-width]=\"strokeWidth\"\n    />\n    @if (showDot) {\n      <circle\n        class=\"ath-sparkline__dot\"\n        [attr.cx]=\"g.lastX\"\n        [attr.cy]=\"g.lastY\"\n        r=\"2\"\n        [attr.fill]=\"color\"\n      />\n    }\n  </svg>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-sparkline{display:block;overflow:visible}.ath-sparkline__area{opacity:.1;stroke:none}.ath-sparkline__line{fill:none;stroke-linecap:round;stroke-linejoin:round}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSparklineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sparkline', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (geometry(); as g) {\n  <svg\n    class=\"ath-sparkline\"\n    [attr.width]=\"width\"\n    [attr.height]=\"height\"\n    [attr.viewBox]=\"'0 0 ' + width + ' ' + height\"\n    aria-hidden=\"true\"\n  >\n    @if (showArea) {\n      <path class=\"ath-sparkline__area\" [attr.d]=\"g.areaPath\" [attr.fill]=\"color\" />\n    }\n    <path\n      class=\"ath-sparkline__line\"\n      [attr.d]=\"g.linePath\"\n      [attr.stroke]=\"color\"\n      [attr.stroke-width]=\"strokeWidth\"\n    />\n    @if (showDot) {\n      <circle\n        class=\"ath-sparkline__dot\"\n        [attr.cx]=\"g.lastX\"\n        [attr.cy]=\"g.lastY\"\n        r=\"2\"\n        [attr.fill]=\"color\"\n      />\n    }\n  </svg>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-sparkline{display:block;overflow:visible}.ath-sparkline__area{opacity:.1;stroke:none}.ath-sparkline__line{fill:none;stroke-linecap:round;stroke-linejoin:round}\n"] }]
        }], propDecorators: { data: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], color: [{
                type: Input
            }], showDot: [{
                type: Input
            }], showArea: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }] } });

/**
 * Stat card with label + value, optional trend arrow, optional delta badge,
 * optional sparkline.
 *
 * For dashboard-style KPI tiles prefer `<ath-kpi-tile>`. This stays as the
 * simpler label/value/sub primitive.
 *
 * @example
 * <ath-stat-card label="Total Users" value="1,234" />
 * <ath-stat-card label="Active" value="89%" trend="up" />
 * <ath-stat-card label="Open" value="42" delta="+5" deltaDirection="up"
 *                [sparkData]="[10,12,15,18,22,28,30]" />
 */
class AthStatCardComponent {
    constructor() {
        this.label = '';
        this.value = '';
        this.subValue = '';
        /** Quick up/down arrow. Use delta+deltaDirection for richer badges. */
        this.trend = null;
        /** Delta text (e.g., `+12`, `-3`). Displayed as colored badge. */
        this.delta = null;
        /** Color cue for the delta badge. */
        this.deltaDirection = null;
        /** Optional sparkline data — min 2 points. */
        this.sparkData = null;
        this.sparkColor = 'var(--accent)';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthStatCardComponent, isStandalone: true, selector: "ath-stat-card", inputs: { label: "label", value: "value", subValue: "subValue", trend: "trend", delta: "delta", deltaDirection: "deltaDirection", sparkData: "sparkData", sparkColor: "sparkColor" }, ngImport: i0, template: "<div class=\"ath-stat-card\">\n  <div class=\"ath-stat-card__head\">\n    <span class=\"ath-stat-card__label\">{{ label }}</span>\n    @if (delta != null && deltaDirection) {\n      <span class=\"ath-stat-card__delta\" [attr.data-direction]=\"deltaDirection\">{{ delta }}</span>\n    }\n  </div>\n  <div class=\"ath-stat-card__value-row\">\n    <span class=\"ath-stat-card__value\">{{ value }}</span>\n    @if (trend && delta == null) {\n      <span\n        class=\"ath-stat-card__trend\"\n        [class.ath-stat-card__trend--up]=\"trend === 'up'\"\n        [class.ath-stat-card__trend--down]=\"trend === 'down'\"\n      >\n        {{ trend === 'up' ? '\u2191' : '\u2193' }}\n      </span>\n    }\n    @if (sparkData && sparkData.length >= 2) {\n      <ath-sparkline\n        class=\"ath-stat-card__spark\"\n        [data]=\"sparkData\"\n        [color]=\"sparkColor\"\n        [width]=\"70\"\n        [height]=\"22\"\n      />\n    }\n  </div>\n  @if (subValue) {\n    <span class=\"ath-stat-card__sub\">{{ subValue }}</span>\n  }\n</div>\n", styles: [".ath-stat-card{display:flex;flex-direction:column;gap:var(--ath-space-2);padding:var(--ath-space-4) var(--ath-space-5);background:var(--ath-bg-panel);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg)}.ath-stat-card__head{display:flex;align-items:center;justify-content:space-between;gap:8px}.ath-stat-card__label{font-size:12px;font-weight:500;letter-spacing:-.005em;color:var(--fg-3);text-transform:none}.ath-stat-card__delta{display:inline-flex;align-items:center;font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;font-weight:500;padding:1px 6px;border-radius:var(--r-xs);line-height:1.5}.ath-stat-card__delta[data-direction=up]{color:var(--green);background:var(--green-tint)}.ath-stat-card__delta[data-direction=down]{color:var(--red);background:var(--red-tint)}.ath-stat-card__delta[data-direction=neutral]{color:var(--fg-3);background:var(--bg-2)}.ath-stat-card__value-row{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--ath-space-2)}.ath-stat-card__spark{flex-shrink:0}.ath-stat-card__value{font-size:var(--ath-font-size-3xl);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:1;font-variant-numeric:tabular-nums}.ath-stat-card__trend{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium)}.ath-stat-card__trend--up{color:var(--ath-color-success)}.ath-stat-card__trend--down{color:var(--ath-color-error)}.ath-stat-card__sub{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthSparklineComponent, selector: "ath-sparkline", inputs: ["data", "width", "height", "color", "showDot", "showArea", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-stat-card', standalone: true, imports: [CommonModule, AthSparklineComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-stat-card\">\n  <div class=\"ath-stat-card__head\">\n    <span class=\"ath-stat-card__label\">{{ label }}</span>\n    @if (delta != null && deltaDirection) {\n      <span class=\"ath-stat-card__delta\" [attr.data-direction]=\"deltaDirection\">{{ delta }}</span>\n    }\n  </div>\n  <div class=\"ath-stat-card__value-row\">\n    <span class=\"ath-stat-card__value\">{{ value }}</span>\n    @if (trend && delta == null) {\n      <span\n        class=\"ath-stat-card__trend\"\n        [class.ath-stat-card__trend--up]=\"trend === 'up'\"\n        [class.ath-stat-card__trend--down]=\"trend === 'down'\"\n      >\n        {{ trend === 'up' ? '\u2191' : '\u2193' }}\n      </span>\n    }\n    @if (sparkData && sparkData.length >= 2) {\n      <ath-sparkline\n        class=\"ath-stat-card__spark\"\n        [data]=\"sparkData\"\n        [color]=\"sparkColor\"\n        [width]=\"70\"\n        [height]=\"22\"\n      />\n    }\n  </div>\n  @if (subValue) {\n    <span class=\"ath-stat-card__sub\">{{ subValue }}</span>\n  }\n</div>\n", styles: [".ath-stat-card{display:flex;flex-direction:column;gap:var(--ath-space-2);padding:var(--ath-space-4) var(--ath-space-5);background:var(--ath-bg-panel);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg)}.ath-stat-card__head{display:flex;align-items:center;justify-content:space-between;gap:8px}.ath-stat-card__label{font-size:12px;font-weight:500;letter-spacing:-.005em;color:var(--fg-3);text-transform:none}.ath-stat-card__delta{display:inline-flex;align-items:center;font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;font-weight:500;padding:1px 6px;border-radius:var(--r-xs);line-height:1.5}.ath-stat-card__delta[data-direction=up]{color:var(--green);background:var(--green-tint)}.ath-stat-card__delta[data-direction=down]{color:var(--red);background:var(--red-tint)}.ath-stat-card__delta[data-direction=neutral]{color:var(--fg-3);background:var(--bg-2)}.ath-stat-card__value-row{display:flex;align-items:flex-end;justify-content:space-between;gap:var(--ath-space-2)}.ath-stat-card__spark{flex-shrink:0}.ath-stat-card__value{font-size:var(--ath-font-size-3xl);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:1;font-variant-numeric:tabular-nums}.ath-stat-card__trend{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium)}.ath-stat-card__trend--up{color:var(--ath-color-success)}.ath-stat-card__trend--down{color:var(--ath-color-error)}.ath-stat-card__sub{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}\n"] }]
        }], propDecorators: { label: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], subValue: [{
                type: Input
            }], trend: [{
                type: Input
            }], delta: [{
                type: Input
            }], deltaDirection: [{
                type: Input
            }], sparkData: [{
                type: Input
            }], sparkColor: [{
                type: Input
            }] } });

/**
 * Athene Table Component
 *
 * Clean data table with consistent styling.
 * Uses ViewEncapsulation.None so projected content (thead/tbody)
 * inherits the table styles.
 *
 * @example
 * <ath-table>
 *   <thead>
 *     <tr><th>Name</th><th>Status</th></tr>
 *   </thead>
 *   <tbody>
 *     <tr><td>Item 1</td><td>Active</td></tr>
 *   </tbody>
 * </ath-table>
 */
class AthTableComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthTableComponent, isStandalone: true, selector: "ath-table", ngImport: i0, template: "<div class=\"ath-table\">\n  <table class=\"ath-table__table\">\n    <ng-content />\n  </table>\n</div>\n", styles: [".ath-table{width:100%;overflow-x:auto;border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);background:var(--ath-bg-secondary)}.ath-table__table{width:100%;border-collapse:collapse;font-size:var(--ath-font-size-sm);table-layout:auto}.ath-table__table thead th{text-align:left;padding:10px 16px;color:var(--ath-text-tertiary);font-weight:var(--ath-font-weight-medium);font-size:11px;letter-spacing:.5px;text-transform:uppercase;border-bottom:1px solid var(--ath-border-color);white-space:nowrap;background:#ffffff05}.ath-table__table thead th:first-child{padding-left:20px}.ath-table__table thead th:last-child{padding-right:20px;text-align:right}.ath-table__table tbody tr{border-bottom:1px solid rgba(255,255,255,.04);transition:background-color .15s ease}.ath-table__table tbody tr:last-child{border-bottom:none}.ath-table__table tbody tr:hover{background-color:#ffffff06}.ath-table__table tbody td{padding:12px 16px;color:var(--ath-text-primary);vertical-align:middle;line-height:1.5}.ath-table__table tbody td:first-child{padding-left:20px}.ath-table__table tbody td:last-child{padding-right:20px;text-align:right}.ath-table__table tbody td code{font-family:var(--ath-font-family-mono);font-size:var(--ath-font-size-xs);color:var(--ath-text-secondary)}.ath-table__table td .ath-toggle{width:auto;padding:0;border:none;background:transparent;gap:0}.ath-table__table td .ath-toggle:hover:not(.ath-toggle--disabled){background:transparent;border:none}.ath-table__table td .ath-toggle.ath-toggle--checked{background:transparent;border:none}.ath-table__table td .ath-toggle .ath-toggle__content{display:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-table', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ath-table\">\n  <table class=\"ath-table__table\">\n    <ng-content />\n  </table>\n</div>\n", styles: [".ath-table{width:100%;overflow-x:auto;border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);background:var(--ath-bg-secondary)}.ath-table__table{width:100%;border-collapse:collapse;font-size:var(--ath-font-size-sm);table-layout:auto}.ath-table__table thead th{text-align:left;padding:10px 16px;color:var(--ath-text-tertiary);font-weight:var(--ath-font-weight-medium);font-size:11px;letter-spacing:.5px;text-transform:uppercase;border-bottom:1px solid var(--ath-border-color);white-space:nowrap;background:#ffffff05}.ath-table__table thead th:first-child{padding-left:20px}.ath-table__table thead th:last-child{padding-right:20px;text-align:right}.ath-table__table tbody tr{border-bottom:1px solid rgba(255,255,255,.04);transition:background-color .15s ease}.ath-table__table tbody tr:last-child{border-bottom:none}.ath-table__table tbody tr:hover{background-color:#ffffff06}.ath-table__table tbody td{padding:12px 16px;color:var(--ath-text-primary);vertical-align:middle;line-height:1.5}.ath-table__table tbody td:first-child{padding-left:20px}.ath-table__table tbody td:last-child{padding-right:20px;text-align:right}.ath-table__table tbody td code{font-family:var(--ath-font-family-mono);font-size:var(--ath-font-size-xs);color:var(--ath-text-secondary)}.ath-table__table td .ath-toggle{width:auto;padding:0;border:none;background:transparent;gap:0}.ath-table__table td .ath-toggle:hover:not(.ath-toggle--disabled){background:transparent;border:none}.ath-table__table td .ath-toggle.ath-toggle--checked{background:transparent;border:none}.ath-table__table td .ath-toggle .ath-toggle__content{display:none}\n"] }]
        }] });

/**
 * Athene Badge Component
 *
 * Status badges for tables, lists and inline indicators.
 *
 * @example
 * <ath-badge variant="success">Active</ath-badge>
 * <ath-badge variant="error">Revoked</ath-badge>
 */
class AthBadgeComponent {
    constructor() {
        /** Badge variant */
        this.variant = 'default';
        /** Show dot indicator */
        this.dot = false;
    }
    get badgeClasses() {
        return [
            'ath-badge',
            `ath-badge--${this.variant}`,
            this.dot ? 'ath-badge--dot' : '',
        ].filter(Boolean).join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthBadgeComponent, isStandalone: true, selector: "ath-badge", inputs: { variant: "variant", dot: "dot" }, ngImport: i0, template: "<span [class]=\"badgeClasses\">\n  @if (dot) {\n    <span class=\"ath-badge__dot\"></span>\n  }\n  <ng-content />\n</span>\n", styles: [".ath-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:var(--ath-font-weight-semibold);line-height:1;white-space:nowrap;padding:4px 10px;border-radius:var(--ath-border-radius-full);letter-spacing:.2px}.ath-badge__dot{width:6px;height:6px;border-radius:var(--ath-border-radius-full);flex-shrink:0}.ath-badge--default{color:var(--ath-text-secondary);background:#ffffff0f}.ath-badge--default .ath-badge__dot{background:var(--ath-text-tertiary)}.ath-badge--success{color:var(--ath-color-success);background:#4ade801a}.ath-badge--success .ath-badge__dot{background:var(--ath-color-success)}.ath-badge--warning{color:var(--ath-color-primary);background:#c9963a1f}.ath-badge--warning .ath-badge__dot{background:var(--ath-color-primary)}.ath-badge--error{color:var(--ath-color-error);background:#f871711a}.ath-badge--error .ath-badge__dot{background:var(--ath-color-error)}.ath-badge--info{color:var(--ath-color-info);background:#60a5fa1a}.ath-badge--info .ath-badge__dot{background:var(--ath-color-info)}.ath-badge--muted{color:var(--ath-text-tertiary);background:#ffffff0a}.ath-badge--muted .ath-badge__dot{background:#fff3}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-badge', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span [class]=\"badgeClasses\">\n  @if (dot) {\n    <span class=\"ath-badge__dot\"></span>\n  }\n  <ng-content />\n</span>\n", styles: [".ath-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:var(--ath-font-weight-semibold);line-height:1;white-space:nowrap;padding:4px 10px;border-radius:var(--ath-border-radius-full);letter-spacing:.2px}.ath-badge__dot{width:6px;height:6px;border-radius:var(--ath-border-radius-full);flex-shrink:0}.ath-badge--default{color:var(--ath-text-secondary);background:#ffffff0f}.ath-badge--default .ath-badge__dot{background:var(--ath-text-tertiary)}.ath-badge--success{color:var(--ath-color-success);background:#4ade801a}.ath-badge--success .ath-badge__dot{background:var(--ath-color-success)}.ath-badge--warning{color:var(--ath-color-primary);background:#c9963a1f}.ath-badge--warning .ath-badge__dot{background:var(--ath-color-primary)}.ath-badge--error{color:var(--ath-color-error);background:#f871711a}.ath-badge--error .ath-badge__dot{background:var(--ath-color-error)}.ath-badge--info{color:var(--ath-color-info);background:#60a5fa1a}.ath-badge--info .ath-badge__dot{background:var(--ath-color-info)}.ath-badge--muted{color:var(--ath-text-tertiary);background:#ffffff0a}.ath-badge--muted .ath-badge__dot{background:#fff3}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], dot: [{
                type: Input
            }] } });

/**
 * Athene Chip Component
 *
 * Tags and categories with optional remove action.
 *
 * @example
 * <ath-chip>authentication</ath-chip>
 * <ath-chip variant="primary" [removable]="true" (removed)="onRemove()">beta</ath-chip>
 */
class AthChipComponent {
    constructor() {
        /** Chip variant */
        this.variant = 'default';
        /** Whether the chip can be removed */
        this.removable = false;
        /** Remove event */
        this.removed = new EventEmitter();
        this.removeIcon = X;
    }
    get chipClasses() {
        return `ath-chip ath-chip--${this.variant}`;
    }
    remove(event) {
        event.stopPropagation();
        this.removed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthChipComponent, isStandalone: true, selector: "ath-chip", inputs: { variant: "variant", removable: "removable" }, outputs: { removed: "removed" }, ngImport: i0, template: "<span [class]=\"chipClasses\">\n  <ng-content />\n  @if (removable) {\n    <button type=\"button\" class=\"ath-chip__remove\" aria-label=\"Remove chip\" (click)=\"remove($event)\">\n      <lucide-icon [img]=\"removeIcon\" [size]=\"12\" />\n    </button>\n  }\n</span>\n", styles: [".ath-chip{display:inline-flex;align-items:center;gap:var(--ath-space-1);padding:2px var(--ath-space-2);font-size:var(--ath-font-size-xs);font-weight:var(--ath-font-weight-medium);border-radius:var(--ath-border-radius-full);white-space:nowrap}.ath-chip--default{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color)}.ath-chip--primary{color:var(--ath-color-primary);background-color:#c9963a1f;border:1px solid rgba(201,150,58,.3)}.ath-chip--success{color:var(--ath-color-success);background-color:#22c55e1f;border:1px solid rgba(34,197,94,.3)}.ath-chip--warning{color:var(--ath-color-warning);background-color:#f59e0b1f;border:1px solid rgba(245,158,11,.3)}.ath-chip--error{color:var(--ath-color-error);background-color:#ef44441f;border:1px solid rgba(239,68,68,.3)}.ath-chip__remove{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;color:inherit;background:none;border:none;border-radius:var(--ath-border-radius-full);cursor:pointer;opacity:.6;transition:opacity var(--ath-transition-fast)}.ath-chip__remove:hover{opacity:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthChipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-chip', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span [class]=\"chipClasses\">\n  <ng-content />\n  @if (removable) {\n    <button type=\"button\" class=\"ath-chip__remove\" aria-label=\"Remove chip\" (click)=\"remove($event)\">\n      <lucide-icon [img]=\"removeIcon\" [size]=\"12\" />\n    </button>\n  }\n</span>\n", styles: [".ath-chip{display:inline-flex;align-items:center;gap:var(--ath-space-1);padding:2px var(--ath-space-2);font-size:var(--ath-font-size-xs);font-weight:var(--ath-font-weight-medium);border-radius:var(--ath-border-radius-full);white-space:nowrap}.ath-chip--default{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color)}.ath-chip--primary{color:var(--ath-color-primary);background-color:#c9963a1f;border:1px solid rgba(201,150,58,.3)}.ath-chip--success{color:var(--ath-color-success);background-color:#22c55e1f;border:1px solid rgba(34,197,94,.3)}.ath-chip--warning{color:var(--ath-color-warning);background-color:#f59e0b1f;border:1px solid rgba(245,158,11,.3)}.ath-chip--error{color:var(--ath-color-error);background-color:#ef44441f;border:1px solid rgba(239,68,68,.3)}.ath-chip__remove{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;padding:0;color:inherit;background:none;border:none;border-radius:var(--ath-border-radius-full);cursor:pointer;opacity:.6;transition:opacity var(--ath-transition-fast)}.ath-chip__remove:hover{opacity:1}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], removable: [{
                type: Input
            }], removed: [{
                type: Output
            }] } });

/**
 * Overlapping avatars with a `+N` chip when the list exceeds `max`.
 *
 * @example
 * <ath-avatar-stack [users]="[{name:'Joel'},{name:'Mira'},{name:'Tom'},{name:'Sara'}]" />
 * <ath-avatar-stack [users]="watchers" [max]="5" size="md" />
 */
class AthAvatarStackComponent {
    constructor() {
        this._users = signal([]);
        this.max = 4;
        this.size = 'sm';
        this.visible = computed(() => this._users().slice(0, this.max));
        this.overflowCount = computed(() => {
            const total = this._users().length;
            return total > this.max ? total - this.max : 0;
        });
        this.trackByName = (_, user) => user.name;
    }
    set users(value) {
        this._users.set(value ?? []);
    }
    get users() {
        return this._users();
    }
    get hostSize() {
        return this.size;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarStackComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAvatarStackComponent, isStandalone: true, selector: "ath-avatar-stack", inputs: { users: "users", max: "max", size: "size" }, host: { properties: { "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@for (user of visible(); track trackByName($index, user)) {\n  <ath-avatar [name]=\"user.name\" [src]=\"user.src ?? ''\" [size]=\"size\" class=\"ath-stack__item\" />\n}\n@if (overflowCount() > 0) {\n  <span class=\"ath-stack__more\">+{{ overflowCount() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-stack__item{display:inline-flex}.ath-stack__item+.ath-stack__item,.ath-stack__item+.ath-stack__more{margin-left:-6px}:host ath-avatar{border-radius:999px;box-shadow:0 0 0 1.5px var(--bg-1)}.ath-stack__more{display:inline-flex;align-items:center;justify-content:center;margin-left:-6px;border-radius:999px;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-sans);font-weight:600;border:1.5px solid var(--bg-1);letter-spacing:0}:host([data-size=sm]) .ath-stack__more{width:20px;height:20px;font-size:9px}:host([data-size=md]) .ath-stack__more{width:24px;height:24px;font-size:10px}:host([data-size=lg]) .ath-stack__more{width:36px;height:36px;font-size:12px}:host([data-size=xl]) .ath-stack__more{width:48px;height:48px;font-size:14px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthAvatarComponent, selector: "ath-avatar", inputs: ["name", "src", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarStackComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-avatar-stack', standalone: true, imports: [CommonModule, AthAvatarComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (user of visible(); track trackByName($index, user)) {\n  <ath-avatar [name]=\"user.name\" [src]=\"user.src ?? ''\" [size]=\"size\" class=\"ath-stack__item\" />\n}\n@if (overflowCount() > 0) {\n  <span class=\"ath-stack__more\">+{{ overflowCount() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-stack__item{display:inline-flex}.ath-stack__item+.ath-stack__item,.ath-stack__item+.ath-stack__more{margin-left:-6px}:host ath-avatar{border-radius:999px;box-shadow:0 0 0 1.5px var(--bg-1)}.ath-stack__more{display:inline-flex;align-items:center;justify-content:center;margin-left:-6px;border-radius:999px;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-sans);font-weight:600;border:1.5px solid var(--bg-1);letter-spacing:0}:host([data-size=sm]) .ath-stack__more{width:20px;height:20px;font-size:9px}:host([data-size=md]) .ath-stack__more{width:24px;height:24px;font-size:10px}:host([data-size=lg]) .ath-stack__more{width:36px;height:36px;font-size:12px}:host([data-size=xl]) .ath-stack__more{width:48px;height:48px;font-size:14px}\n"] }]
        }], propDecorators: { users: [{
                type: Input
            }], max: [{
                type: Input
            }], size: [{
                type: Input
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }] } });

/**
 * Athene Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 */
class AthEmptyStateComponent {
    constructor() {
        /** Empty state message */
        this.message = '';
        /** Optional sub-message */
        this.subMessage = '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthEmptyStateComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthEmptyStateComponent, isStandalone: true, selector: "ath-empty-state", inputs: { message: "message", subMessage: "subMessage" }, ngImport: i0, template: "<div class=\"ath-empty-state\">\n  <p class=\"ath-empty-state__message\">{{ message }}</p>\n  @if (subMessage) {\n    <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n  }\n  <ng-content />\n</div>\n", styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--ath-space-2);padding:var(--ath-space-10) var(--ath-space-6);text-align:center;border:1px dashed rgba(255,255,255,.08);border-radius:var(--ath-border-radius-lg);background:#ffffff03}.ath-empty-state__message{margin:0;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-secondary)}.ath-empty-state__sub{margin:0;font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthEmptyStateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-empty-state', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-empty-state\">\n  <p class=\"ath-empty-state__message\">{{ message }}</p>\n  @if (subMessage) {\n    <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n  }\n  <ng-content />\n</div>\n", styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--ath-space-2);padding:var(--ath-space-10) var(--ath-space-6);text-align:center;border:1px dashed rgba(255,255,255,.08);border-radius:var(--ath-border-radius-lg);background:#ffffff03}.ath-empty-state__message{margin:0;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-secondary)}.ath-empty-state__sub{margin:0;font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}\n"] }]
        }], propDecorators: { message: [{
                type: Input,
                args: [{ required: true }]
            }], subMessage: [{
                type: Input
            }] } });

const LABELS$1 = {
    open: 'Open',
    prog: 'In Progress',
    review: 'In Review',
    done: 'Done',
    blocked: 'Blocked',
    closed: 'Closed',
};
/**
 * Status indicator for a ticket: colored inner-ring dot + label.
 *
 * @example
 * <ath-status-pill status="open" />
 * <ath-status-pill status="prog" [showLabel]="false" />
 * <ath-status-pill status="done" size="sm" />
 */
class AthStatusPillComponent {
    constructor() {
        this.status = 'open';
        this.showDot = true;
        this.showLabel = true;
        this.size = 'md';
        /** Optional override label (otherwise the default label for the status is used). */
        this.label = null;
    }
    get hostStatus() {
        return this.status;
    }
    get hostSize() {
        return this.size;
    }
    get computedLabel() {
        return this.label ?? LABELS$1[this.status] ?? this.status;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatusPillComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthStatusPillComponent, isStandalone: true, selector: "ath-status-pill", inputs: { status: "status", showDot: "showDot", showLabel: "showLabel", size: "size", label: "label" }, host: { properties: { "attr.data-status": "this.hostStatus", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}[data-theme=dark] :host .ath-status-pill__dot{box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatusPillComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-status-pill', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}[data-theme=dark] :host .ath-status-pill__dot{box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor}\n"] }]
        }], propDecorators: { status: [{
                type: Input
            }], showDot: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], size: [{
                type: Input
            }], label: [{
                type: Input
            }], hostStatus: [{
                type: HostBinding,
                args: ['attr.data-status']
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }] } });

const LABELS = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    crit: 'Critical',
};
/**
 * Priority indicator with rising bars (low → critical).
 *
 * @example
 * <ath-priority priority="high" />
 * <ath-priority priority="crit" [showLabel]="false" />
 */
class AthPriorityComponent {
    constructor() {
        this.priority = 'medium';
        this.showLabel = true;
        /** Optional override label. */
        this.label = null;
    }
    get hostPriority() {
        return this.priority;
    }
    get computedLabel() {
        return this.label ?? LABELS[this.priority] ?? this.priority;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPriorityComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPriorityComponent, isStandalone: true, selector: "ath-priority", inputs: { priority: "priority", showLabel: "showLabel", label: "label" }, host: { properties: { "attr.data-priority": "this.hostPriority" } }, ngImport: i0, template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel) {\n  <span class=\"ath-priority__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red);font-weight:600}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPriorityComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-priority', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel) {\n  <span class=\"ath-priority__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red);font-weight:600}\n"] }]
        }], propDecorators: { priority: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], label: [{
                type: Input
            }], hostPriority: [{
                type: HostBinding,
                args: ['attr.data-priority']
            }] } });

/**
 * Colored project-key badge (e.g., `FNR`, `WEB`, `AUT`).
 *
 * Colors are tinted from the provided `color` (project's brand color).
 *
 * @example
 * <ath-project-key-badge projectKey="WEB" color="#e9b864" />
 * <ath-project-key-badge projectKey="FNR" color="#7aa9f5" size="lg" />
 */
class AthProjectKeyBadgeComponent {
    constructor() {
        /** Hex color (e.g., `#e9b864`). Used to tint border + background. */
        this.color = '#6b7280';
        this.size = 'md';
    }
    get hostSize() {
        return this.size;
    }
    get cssColor() {
        return this.color;
    }
    get cssBorder() {
        // 25% alpha
        return this.color + '40';
    }
    get cssBg() {
        // ~7% alpha
        return this.color + '12';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProjectKeyBadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthProjectKeyBadgeComponent, isStandalone: true, selector: "ath-project-key-badge", inputs: { projectKey: "projectKey", color: "color", size: "size" }, host: { properties: { "attr.data-size": "this.hostSize", "style.--pkey-color": "this.cssColor", "style.--pkey-border": "this.cssBorder", "style.--pkey-bg": "this.cssBg" } }, ngImport: i0, template: "<span class=\"ath-pkey\">{{ projectKey }}</span>\n", styles: [":host{display:inline-flex;align-items:center;justify-content:center;--pkey-color: var(--fg-3);--pkey-border: var(--border);--pkey-bg: transparent}.ath-pkey{display:inline-flex;align-items:center;justify-content:center;padding:1px 6px;font-family:var(--font-mono);font-feature-settings:\"ss01\",\"zero\",\"tnum\";font-weight:600;letter-spacing:0;text-transform:uppercase;border-radius:var(--r-sm);color:var(--pkey-color);background:var(--pkey-bg);border:1px solid var(--pkey-border);line-height:1.3;white-space:nowrap}:host([data-size=sm]) .ath-pkey{font-size:10px;padding:1px 5px;border-radius:4px}:host([data-size=md]) .ath-pkey{font-size:11.5px}:host([data-size=lg]) .ath-pkey{font-size:14px;padding:3px 8px;font-weight:700}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProjectKeyBadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-project-key-badge', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-pkey\">{{ projectKey }}</span>\n", styles: [":host{display:inline-flex;align-items:center;justify-content:center;--pkey-color: var(--fg-3);--pkey-border: var(--border);--pkey-bg: transparent}.ath-pkey{display:inline-flex;align-items:center;justify-content:center;padding:1px 6px;font-family:var(--font-mono);font-feature-settings:\"ss01\",\"zero\",\"tnum\";font-weight:600;letter-spacing:0;text-transform:uppercase;border-radius:var(--r-sm);color:var(--pkey-color);background:var(--pkey-bg);border:1px solid var(--pkey-border);line-height:1.3;white-space:nowrap}:host([data-size=sm]) .ath-pkey{font-size:10px;padding:1px 5px;border-radius:4px}:host([data-size=md]) .ath-pkey{font-size:11.5px}:host([data-size=lg]) .ath-pkey{font-size:14px;padding:3px 8px;font-weight:700}\n"] }]
        }], propDecorators: { projectKey: [{
                type: Input,
                args: [{ required: true }]
            }], color: [{
                type: Input
            }], size: [{
                type: Input
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }], cssColor: [{
                type: HostBinding,
                args: ['style.--pkey-color']
            }], cssBorder: [{
                type: HostBinding,
                args: ['style.--pkey-border']
            }], cssBg: [{
                type: HostBinding,
                args: ['style.--pkey-bg']
            }] } });

/**
 * Compact KPI widget for dashboards. Shows label + value + optional delta + sparkline.
 *
 * @example
 * <ath-kpi-tile label="Assigned" [value]="3" delta="+1" deltaDirection="up"
 *               [sparkData]="[12,14,13,18,22,20,24]" sparkColor="var(--accent)" />
 */
class AthKpiTileComponent {
    constructor() {
        /** Free-form delta text (e.g., `+12`, `-2`, ` 0`). */
        this.delta = null;
        /** Influences color of the delta badge. */
        this.deltaDirection = null;
        /** Optional sparkline data — at least 2 points. */
        this.sparkData = null;
        /** Sparkline color (any CSS color). */
        this.sparkColor = 'var(--accent)';
        /** Hides the value's color emphasis (useful for empty/loading state). */
        this.muted = false;
    }
    get hostMuted() {
        return this.muted ? 'true' : null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKpiTileComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthKpiTileComponent, isStandalone: true, selector: "ath-kpi-tile", inputs: { label: "label", value: "value", delta: "delta", deltaDirection: "deltaDirection", sparkData: "sparkData", sparkColor: "sparkColor", muted: "muted" }, host: { properties: { "attr.data-muted": "this.hostMuted" } }, ngImport: i0, template: "<div class=\"ath-kpi__row\">\n  <span class=\"ath-kpi__label\">{{ label }}</span>\n  @if (delta != null && deltaDirection) {\n    <span class=\"ath-kpi__delta\" [attr.data-direction]=\"deltaDirection\">{{ delta }}</span>\n  }\n</div>\n<div class=\"ath-kpi__bottom\">\n  <span class=\"ath-kpi__value\">{{ value }}</span>\n  @if (sparkData && sparkData.length >= 2) {\n    <ath-sparkline\n      class=\"ath-kpi__spark\"\n      [data]=\"sparkData\"\n      [color]=\"sparkColor\"\n      [width]=\"70\"\n      [height]=\"22\"\n    />\n  }\n</div>\n", styles: [":host{display:flex;flex-direction:column;justify-content:space-between;gap:10px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-1);min-height:80px;transition:border-color var(--t-fast),box-shadow var(--t-fast)}:host:hover{border-color:var(--border-strong)}.ath-kpi__row{display:flex;align-items:center;justify-content:space-between;gap:8px}.ath-kpi__label{font-family:var(--font-sans);font-size:12px;font-weight:500;color:var(--fg-3);letter-spacing:-.005em}.ath-kpi__delta{display:inline-flex;align-items:center;font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;font-weight:500;padding:1px 6px;border-radius:var(--r-xs);letter-spacing:0;line-height:1.5}.ath-kpi__delta[data-direction=up]{color:var(--green);background:var(--green-tint)}.ath-kpi__delta[data-direction=down]{color:var(--red);background:var(--red-tint)}.ath-kpi__delta[data-direction=neutral]{color:var(--fg-3);background:var(--bg-2)}.ath-kpi__bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;min-height:28px}.ath-kpi__value{font-family:var(--font-sans);font-size:24px;font-weight:600;color:var(--fg);line-height:1;letter-spacing:-.02em;font-feature-settings:\"tnum\"}.ath-kpi__spark{flex-shrink:0}:host([data-muted=true]) .ath-kpi__value{color:var(--fg-3)}body.compact :host{padding:10px 12px;min-height:64px}body.compact :host .ath-kpi__value{font-size:20px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthSparklineComponent, selector: "ath-sparkline", inputs: ["data", "width", "height", "color", "showDot", "showArea", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKpiTileComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-kpi-tile', standalone: true, imports: [CommonModule, AthSparklineComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-kpi__row\">\n  <span class=\"ath-kpi__label\">{{ label }}</span>\n  @if (delta != null && deltaDirection) {\n    <span class=\"ath-kpi__delta\" [attr.data-direction]=\"deltaDirection\">{{ delta }}</span>\n  }\n</div>\n<div class=\"ath-kpi__bottom\">\n  <span class=\"ath-kpi__value\">{{ value }}</span>\n  @if (sparkData && sparkData.length >= 2) {\n    <ath-sparkline\n      class=\"ath-kpi__spark\"\n      [data]=\"sparkData\"\n      [color]=\"sparkColor\"\n      [width]=\"70\"\n      [height]=\"22\"\n    />\n  }\n</div>\n", styles: [":host{display:flex;flex-direction:column;justify-content:space-between;gap:10px;padding:14px 16px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-1);min-height:80px;transition:border-color var(--t-fast),box-shadow var(--t-fast)}:host:hover{border-color:var(--border-strong)}.ath-kpi__row{display:flex;align-items:center;justify-content:space-between;gap:8px}.ath-kpi__label{font-family:var(--font-sans);font-size:12px;font-weight:500;color:var(--fg-3);letter-spacing:-.005em}.ath-kpi__delta{display:inline-flex;align-items:center;font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;font-weight:500;padding:1px 6px;border-radius:var(--r-xs);letter-spacing:0;line-height:1.5}.ath-kpi__delta[data-direction=up]{color:var(--green);background:var(--green-tint)}.ath-kpi__delta[data-direction=down]{color:var(--red);background:var(--red-tint)}.ath-kpi__delta[data-direction=neutral]{color:var(--fg-3);background:var(--bg-2)}.ath-kpi__bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:10px;min-height:28px}.ath-kpi__value{font-family:var(--font-sans);font-size:24px;font-weight:600;color:var(--fg);line-height:1;letter-spacing:-.02em;font-feature-settings:\"tnum\"}.ath-kpi__spark{flex-shrink:0}:host([data-muted=true]) .ath-kpi__value{color:var(--fg-3)}body.compact :host{padding:10px 12px;min-height:64px}body.compact :host .ath-kpi__value{font-size:20px}\n"] }]
        }], propDecorators: { label: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input,
                args: [{ required: true }]
            }], delta: [{
                type: Input
            }], deltaDirection: [{
                type: Input
            }], sparkData: [{
                type: Input
            }], sparkColor: [{
                type: Input
            }], muted: [{
                type: Input
            }], hostMuted: [{
                type: HostBinding,
                args: ['attr.data-muted']
            }] } });

/**
 * SLA progress widget. Two rows (response + resolution) and a progress bar
 * for the active (pending) one.
 *
 * The color of the bar transitions:
 *   < 80% → green / accent
 *   80-95% → amber (warn)
 *   ≥ 95% → red (breach)
 *
 * @example
 * <ath-sla-bar
 *   [response]="{label:'Response',  status:'met',     text:'met · 24m'}"
 *   [resolution]="{label:'Resolution', status:'pending', text:'6h 12m left'}"
 *   [progressPct]="68" />
 */
class AthSlaBarComponent {
    constructor() {
        this.response = null;
        this.resolution = null;
        this._progress = signal(0);
        this.severity = computed(() => {
            const r = this.resolution?.status;
            const rs = this.response?.status;
            if (r === 'breached' || rs === 'breached')
                return 'breached';
            if (this._progress() >= 95)
                return 'breached';
            if (this._progress() >= 80)
                return 'pending';
            if (r === 'met' && rs === 'met')
                return 'met';
            return 'pending';
        });
    }
    /** 0..100. The progress bar reflects the most "at risk" target. */
    set progressPct(value) {
        this._progress.set(Math.max(0, Math.min(100, value)));
    }
    get progressPct() {
        return this._progress();
    }
    get hostSeverity() {
        return this.severity();
    }
    statusColor(s) {
        switch (s) {
            case 'met': return 'var(--green)';
            case 'breached': return 'var(--red)';
            case 'pending':
            default: return 'var(--amber)';
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSlaBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSlaBarComponent, isStandalone: true, selector: "ath-sla-bar", inputs: { response: "response", resolution: "resolution", progressPct: "progressPct" }, host: { properties: { "attr.data-severity": "this.hostSeverity" } }, ngImport: i0, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{ response.text }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{ resolution.text }}</span>\n  </div>\n}\n<div class=\"ath-sla__track\" role=\"progressbar\"\n     [attr.aria-valuenow]=\"progressPct\" aria-valuemin=\"0\" aria-valuemax=\"100\">\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSlaBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sla-bar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{ response.text }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{ resolution.text }}</span>\n  </div>\n}\n<div class=\"ath-sla__track\" role=\"progressbar\"\n     [attr.aria-valuenow]=\"progressPct\" aria-valuemin=\"0\" aria-valuemax=\"100\">\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"] }]
        }], propDecorators: { response: [{
                type: Input
            }], resolution: [{
                type: Input
            }], progressPct: [{
                type: Input
            }], hostSeverity: [{
                type: HostBinding,
                args: ['attr.data-severity']
            }] } });

/**
 * Generic progress bar. Used for milestones, subtasks, sprint burn,
 * upload progress, etc.
 *
 * @example
 * <ath-progress [value]="62" />
 * <ath-progress [value]="80" tone="warning" size="md" [showLabel]="true" />
 * <ath-progress [value]="40" [total]="50" [showLabel]="true" />
 */
class AthProgressComponent {
    constructor() {
        this._value = signal(0);
        /** Total (denominator). If unset, `value` is a percent. */
        this.total = null;
        this.tone = 'accent';
        this.size = 'sm';
        /** Show a small `X / Y` (or `X%`) label next to the bar. */
        this.showLabel = false;
        /** Optional aria-label for screen readers. */
        this.ariaLabel = null;
        this.pct = computed(() => {
            const v = this._value();
            if (this.total != null && this.total > 0) {
                return Math.min(100, (v / this.total) * 100);
            }
            return Math.min(100, v);
        });
        this.label = computed(() => {
            if (this.total != null) {
                return `${Math.round(this._value())} / ${this.total}`;
            }
            return `${Math.round(this.pct())}%`;
        });
    }
    /** Current value. When `total` is unset, treated as a percentage (0..100). */
    set value(v) {
        this._value.set(Math.max(0, v));
    }
    get value() {
        return this._value();
    }
    get hostTone() {
        return this.tone;
    }
    get hostSize() {
        return this.size;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProgressComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthProgressComponent, isStandalone: true, selector: "ath-progress", inputs: { value: "value", total: "total", tone: "tone", size: "size", showLabel: "showLabel", ariaLabel: "ariaLabel" }, host: { properties: { "attr.data-tone": "this.hostTone", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "<div\n  class=\"ath-progress__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-valuenow]=\"pct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-progress__fill\" [style.width.%]=\"pct()\"></div>\n</div>\n@if (showLabel) {\n  <span class=\"ath-progress__label\">{{ label() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:8px;width:100%}.ath-progress__track{flex:1;background:var(--bg-2);border-radius:999px;overflow:hidden;min-width:40px}.ath-progress__fill{height:100%;border-radius:999px;background:var(--accent);transition:width var(--t-slow),background-color var(--t-base)}.ath-progress__label{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg-3);white-space:nowrap;flex-shrink:0}:host([data-size=xs]) .ath-progress__track{height:3px}:host([data-size=sm]) .ath-progress__track{height:4px}:host([data-size=md]) .ath-progress__track{height:6px}:host([data-tone=accent]) .ath-progress__fill{background:var(--accent)}:host([data-tone=success]) .ath-progress__fill{background:var(--green)}:host([data-tone=warning]) .ath-progress__fill{background:var(--amber)}:host([data-tone=danger]) .ath-progress__fill{background:var(--red)}:host([data-tone=neutral]) .ath-progress__fill{background:var(--fg-3)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProgressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-progress', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"ath-progress__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-valuenow]=\"pct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-progress__fill\" [style.width.%]=\"pct()\"></div>\n</div>\n@if (showLabel) {\n  <span class=\"ath-progress__label\">{{ label() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:8px;width:100%}.ath-progress__track{flex:1;background:var(--bg-2);border-radius:999px;overflow:hidden;min-width:40px}.ath-progress__fill{height:100%;border-radius:999px;background:var(--accent);transition:width var(--t-slow),background-color var(--t-base)}.ath-progress__label{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg-3);white-space:nowrap;flex-shrink:0}:host([data-size=xs]) .ath-progress__track{height:3px}:host([data-size=sm]) .ath-progress__track{height:4px}:host([data-size=md]) .ath-progress__track{height:6px}:host([data-tone=accent]) .ath-progress__fill{background:var(--accent)}:host([data-tone=success]) .ath-progress__fill{background:var(--green)}:host([data-tone=warning]) .ath-progress__fill{background:var(--amber)}:host([data-tone=danger]) .ath-progress__fill{background:var(--red)}:host([data-tone=neutral]) .ath-progress__fill{background:var(--fg-3)}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], total: [{
                type: Input
            }], tone: [{
                type: Input
            }], size: [{
                type: Input
            }], showLabel: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], hostTone: [{
                type: HostBinding,
                args: ['attr.data-tone']
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }] } });

/**
 * Code block with optional language label + copy-to-clipboard button.
 *
 * Heavy syntax highlighting is **intentionally not bundled** to keep the
 * library small. Consumers can layer highlight.js or Prism on top by
 * targeting `pre code`. The default rendering is a clean monospace block.
 *
 * @example
 * <ath-code-block language="bash" code="curl https://api.athene.dev/v1/me" />
 * <ath-code-block language="rust" [code]="snippet" [filename]="'main.rs'" />
 */
class AthCodeBlockComponent {
    constructor() {
        this.code = '';
        this.language = null;
        /** Optional filename to display next to the language label. */
        this.filename = null;
        /** Show line numbers down the left gutter. */
        this.showLineNumbers = false;
        /** Hide the copy button (e.g., for short read-only snippets). */
        this.copyable = true;
        this.copyIcon = Copy;
        this.checkIcon = Check;
        this.copied = signal(false);
    }
    get hostLang() {
        return this.language;
    }
    get lines() {
        return this.code.split('\n');
    }
    async copy() {
        try {
            await navigator.clipboard.writeText(this.code);
            this.copied.set(true);
            window.setTimeout(() => this.copied.set(false), 1500);
        }
        catch {
            // Fallback: select the text so the user can copy manually
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCodeBlockComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthCodeBlockComponent, isStandalone: true, selector: "ath-code-block", inputs: { code: "code", language: "language", filename: "filename", showLineNumbers: "showLineNumbers", copyable: "copyable" }, host: { properties: { "attr.data-language": "this.hostLang" } }, ngImport: i0, template: "@if (language || filename || copyable) {\n  <div class=\"ath-code__head\">\n    <div class=\"ath-code__meta\">\n      @if (language) {\n        <span class=\"ath-code__lang\">{{ language }}</span>\n      }\n      @if (filename) {\n        <span class=\"ath-code__filename\">{{ filename }}</span>\n      }\n    </div>\n    @if (copyable) {\n      <button\n        type=\"button\"\n        class=\"ath-code__copy\"\n        [class.ath-code__copy--copied]=\"copied()\"\n        [attr.aria-label]=\"copied() ? 'Copied' : 'Copy code'\"\n        (click)=\"copy()\"\n      >\n        @if (copied()) {\n          <lucide-icon [img]=\"checkIcon\" [size]=\"12\" />\n          <span>Copied</span>\n        } @else {\n          <lucide-icon [img]=\"copyIcon\" [size]=\"12\" />\n          <span>Copy</span>\n        }\n      </button>\n    }\n  </div>\n}\n<pre class=\"ath-code__pre\"><code class=\"ath-code__code\"><!--\n  -->@if (showLineNumbers) {<!--\n    --><span class=\"ath-code__gutter\" aria-hidden=\"true\"><!--\n      -->@for (line of lines; track $index) {<!--\n        --><span class=\"ath-code__lineno\">{{ $index + 1 }}</span><!--\n      -->}<!--\n    --></span><!--\n  -->}<!--\n  --><span class=\"ath-code__body\">{{ code }}</span><!--\n--></code></pre>\n", styles: [":host{display:block;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;font-family:var(--font-mono)}.ath-code__head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px 6px 12px;background:var(--bg-2);border-bottom:1px solid var(--border);font-family:var(--font-sans)}.ath-code__meta{display:inline-flex;align-items:center;gap:8px;min-width:0}.ath-code__lang{font-size:11px;font-weight:500;color:var(--fg-3);text-transform:lowercase;letter-spacing:0}.ath-code__filename{font-family:var(--font-mono);font-size:11.5px;color:var(--fg-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-code__copy{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;background:transparent;border:0;border-radius:var(--r-xs);font-family:var(--font-sans);font-size:11.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-code__copy:hover{background:var(--hover);color:var(--fg)}.ath-code__copy--copied{color:var(--green)}.ath-code__pre{margin:0;padding:12px 14px;overflow-x:auto;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:var(--fg);background:var(--surface-2)}.ath-code__code{display:block;font-family:inherit;white-space:pre}.ath-code__gutter{display:inline-flex;flex-direction:column;-webkit-user-select:none;user-select:none;margin-right:14px;padding-right:10px;border-right:1px solid var(--border-faint);color:var(--fg-4);font-size:11.5px;text-align:right;vertical-align:top;float:left}.ath-code__lineno{display:block;line-height:1.6}.ath-code__body{display:inline}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCodeBlockComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-code-block', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (language || filename || copyable) {\n  <div class=\"ath-code__head\">\n    <div class=\"ath-code__meta\">\n      @if (language) {\n        <span class=\"ath-code__lang\">{{ language }}</span>\n      }\n      @if (filename) {\n        <span class=\"ath-code__filename\">{{ filename }}</span>\n      }\n    </div>\n    @if (copyable) {\n      <button\n        type=\"button\"\n        class=\"ath-code__copy\"\n        [class.ath-code__copy--copied]=\"copied()\"\n        [attr.aria-label]=\"copied() ? 'Copied' : 'Copy code'\"\n        (click)=\"copy()\"\n      >\n        @if (copied()) {\n          <lucide-icon [img]=\"checkIcon\" [size]=\"12\" />\n          <span>Copied</span>\n        } @else {\n          <lucide-icon [img]=\"copyIcon\" [size]=\"12\" />\n          <span>Copy</span>\n        }\n      </button>\n    }\n  </div>\n}\n<pre class=\"ath-code__pre\"><code class=\"ath-code__code\"><!--\n  -->@if (showLineNumbers) {<!--\n    --><span class=\"ath-code__gutter\" aria-hidden=\"true\"><!--\n      -->@for (line of lines; track $index) {<!--\n        --><span class=\"ath-code__lineno\">{{ $index + 1 }}</span><!--\n      -->}<!--\n    --></span><!--\n  -->}<!--\n  --><span class=\"ath-code__body\">{{ code }}</span><!--\n--></code></pre>\n", styles: [":host{display:block;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;font-family:var(--font-mono)}.ath-code__head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px 6px 12px;background:var(--bg-2);border-bottom:1px solid var(--border);font-family:var(--font-sans)}.ath-code__meta{display:inline-flex;align-items:center;gap:8px;min-width:0}.ath-code__lang{font-size:11px;font-weight:500;color:var(--fg-3);text-transform:lowercase;letter-spacing:0}.ath-code__filename{font-family:var(--font-mono);font-size:11.5px;color:var(--fg-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-code__copy{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;background:transparent;border:0;border-radius:var(--r-xs);font-family:var(--font-sans);font-size:11.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-code__copy:hover{background:var(--hover);color:var(--fg)}.ath-code__copy--copied{color:var(--green)}.ath-code__pre{margin:0;padding:12px 14px;overflow-x:auto;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:var(--fg);background:var(--surface-2)}.ath-code__code{display:block;font-family:inherit;white-space:pre}.ath-code__gutter{display:inline-flex;flex-direction:column;-webkit-user-select:none;user-select:none;margin-right:14px;padding-right:10px;border-right:1px solid var(--border-faint);color:var(--fg-4);font-size:11.5px;text-align:right;vertical-align:top;float:left}.ath-code__lineno{display:block;line-height:1.6}.ath-code__body{display:inline}\n"] }]
        }], propDecorators: { code: [{
                type: Input,
                args: [{ required: true }]
            }], language: [{
                type: Input
            }], filename: [{
                type: Input
            }], showLineNumbers: [{
                type: Input
            }], copyable: [{
                type: Input
            }], hostLang: [{
                type: HostBinding,
                args: ['attr.data-language']
            }] } });

/**
 * Styled container for rendered Markdown content.
 *
 * The library deliberately does NOT bundle a Markdown parser to keep the
 * footprint small. Two ways to use it:
 *
 *  1. **Server-rendered:** parse + sanitize Markdown on the server, pass
 *     the HTML via `[html]`. This is the recommended path for V1 (the
 *     wiki-service uses pulldown-cmark for this).
 *
 *  2. **Client-rendered:** pass raw Markdown via `[source]`; the consuming
 *     app provides a `parse` function (e.g., marked, markdown-it). The
 *     resulting HTML is sanitized by Angular's `DomSanitizer` and styled.
 *
 * **Security:** When using `[html]`, the caller is responsible for
 * sanitization (or guarantees the HTML is trusted). When using `[source]`
 * with a parser, the output is bypassed via `bypassSecurityTrustHtml` — so
 * the parser must produce safe HTML (most popular parsers do, but verify).
 *
 * @example
 * <ath-markdown [html]="serverRenderedHtml" />
 * <ath-markdown [source]="rawMd" [parse]="markdownIt" />
 */
class AthMarkdownComponent {
    constructor() {
        this.sanitizer = inject(DomSanitizer);
        this._html = signal('');
        this._source = signal('');
        this._parse = signal(null);
        this.renderedHtml = computed(() => {
            const direct = this._html();
            if (direct) {
                return this.sanitizer.bypassSecurityTrustHtml(direct);
            }
            const src = this._source();
            const parser = this._parse();
            if (src && parser) {
                try {
                    return this.sanitizer.bypassSecurityTrustHtml(parser(src));
                }
                catch (err) {
                    console.warn('[ath-markdown] parser threw, falling back to plain text', err);
                    return this.escapeAsPre(src);
                }
            }
            if (src) {
                return this.escapeAsPre(src);
            }
            return '';
        });
    }
    set html(value) {
        this._html.set(value ?? '');
    }
    get html() {
        return this._html();
    }
    set source(value) {
        this._source.set(value ?? '');
    }
    get source() {
        return this._source();
    }
    set parse(fn) {
        this._parse.set(fn);
    }
    escapeAsPre(src) {
        const escaped = src
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return this.sanitizer.bypassSecurityTrustHtml(`<pre>${escaped}</pre>`);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMarkdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthMarkdownComponent, isStandalone: true, selector: "ath-markdown", inputs: { html: "html", source: "source", parse: "parse" }, ngImport: i0, template: "<div class=\"ath-md\" [innerHTML]=\"renderedHtml()\"></div>\n", styles: [":host{display:block;font-family:var(--font-sans);color:var(--fg-2);font-size:14px;line-height:1.6;letter-spacing:-.005em}.ath-md ::ng-deep h1{margin:0 0 16px;font-size:24px;font-weight:600;color:var(--fg);line-height:1.25;letter-spacing:-.02em}.ath-md ::ng-deep h2{margin:28px 0 12px;font-size:18px;font-weight:600;color:var(--fg);line-height:1.3;letter-spacing:-.015em}.ath-md ::ng-deep h3{margin:22px 0 8px;font-size:15px;font-weight:600;color:var(--fg);line-height:1.35}.ath-md ::ng-deep h4,.ath-md ::ng-deep h5,.ath-md ::ng-deep h6{margin:18px 0 6px;font-size:14px;font-weight:600;color:var(--fg)}.ath-md ::ng-deep p{margin:0 0 12px}.ath-md ::ng-deep>*:first-child{margin-top:0}.ath-md ::ng-deep>*:last-child{margin-bottom:0}.ath-md ::ng-deep ul,.ath-md ::ng-deep ol{margin:0 0 12px;padding-left:22px}.ath-md ::ng-deep li{margin:4px 0}.ath-md ::ng-deep li>ul,.ath-md ::ng-deep li>ol{margin:4px 0}.ath-md ::ng-deep code{font-family:var(--font-mono);font-size:12.5px;padding:1px 5px;background:var(--surface-3);border-radius:var(--r-xs);color:var(--fg)}.ath-md ::ng-deep pre{margin:0 0 14px;padding:12px 14px;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);overflow-x:auto;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:var(--fg)}.ath-md ::ng-deep pre code{padding:0;background:transparent;border-radius:0;font-size:inherit;color:inherit}.ath-md ::ng-deep blockquote{margin:0 0 12px;padding:4px 0 4px 14px;border-left:3px solid var(--border-strong);color:var(--fg-3);font-style:italic}.ath-md ::ng-deep a{color:var(--accent);text-decoration:none;border-bottom:1px solid transparent;transition:border-color var(--t-fast)}.ath-md ::ng-deep a:hover{border-bottom-color:var(--accent)}.ath-md ::ng-deep hr{margin:24px 0;border:0;border-top:1px solid var(--border)}.ath-md ::ng-deep table{width:100%;margin:0 0 14px;border-collapse:collapse;font-size:13px}.ath-md ::ng-deep th,.ath-md ::ng-deep td{padding:8px 10px;border-bottom:1px solid var(--border-faint);text-align:left;vertical-align:top}.ath-md ::ng-deep th{background:var(--surface-2);font-weight:600;color:var(--fg);font-size:12px}.ath-md ::ng-deep tr:last-child td{border-bottom:0}.ath-md ::ng-deep img{max-width:100%;height:auto;border-radius:var(--r-sm)}.ath-md ::ng-deep .ath-callout{margin:0 0 14px;padding:10px 14px;border-left:3px solid;border-radius:0 var(--r-sm) var(--r-sm) 0}.ath-md ::ng-deep .ath-callout--info{border-left-color:var(--blue);background:var(--blue-tint)}.ath-md ::ng-deep .ath-callout--warn{border-left-color:var(--amber);background:var(--amber-tint)}.ath-md ::ng-deep .ath-callout--ok{border-left-color:var(--green);background:var(--green-tint)}.ath-md ::ng-deep .ath-callout--error{border-left-color:var(--red);background:var(--red-tint)}.ath-md ::ng-deep .ath-callout>p{margin:0}.ath-md ::ng-deep .ath-ticket-ref{display:inline-flex;align-items:center;padding:0 5px;font-family:var(--font-mono);font-size:12px;color:var(--accent);background:var(--accent-faint);border-radius:var(--r-xs);text-decoration:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMarkdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-markdown', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-md\" [innerHTML]=\"renderedHtml()\"></div>\n", styles: [":host{display:block;font-family:var(--font-sans);color:var(--fg-2);font-size:14px;line-height:1.6;letter-spacing:-.005em}.ath-md ::ng-deep h1{margin:0 0 16px;font-size:24px;font-weight:600;color:var(--fg);line-height:1.25;letter-spacing:-.02em}.ath-md ::ng-deep h2{margin:28px 0 12px;font-size:18px;font-weight:600;color:var(--fg);line-height:1.3;letter-spacing:-.015em}.ath-md ::ng-deep h3{margin:22px 0 8px;font-size:15px;font-weight:600;color:var(--fg);line-height:1.35}.ath-md ::ng-deep h4,.ath-md ::ng-deep h5,.ath-md ::ng-deep h6{margin:18px 0 6px;font-size:14px;font-weight:600;color:var(--fg)}.ath-md ::ng-deep p{margin:0 0 12px}.ath-md ::ng-deep>*:first-child{margin-top:0}.ath-md ::ng-deep>*:last-child{margin-bottom:0}.ath-md ::ng-deep ul,.ath-md ::ng-deep ol{margin:0 0 12px;padding-left:22px}.ath-md ::ng-deep li{margin:4px 0}.ath-md ::ng-deep li>ul,.ath-md ::ng-deep li>ol{margin:4px 0}.ath-md ::ng-deep code{font-family:var(--font-mono);font-size:12.5px;padding:1px 5px;background:var(--surface-3);border-radius:var(--r-xs);color:var(--fg)}.ath-md ::ng-deep pre{margin:0 0 14px;padding:12px 14px;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);overflow-x:auto;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:var(--fg)}.ath-md ::ng-deep pre code{padding:0;background:transparent;border-radius:0;font-size:inherit;color:inherit}.ath-md ::ng-deep blockquote{margin:0 0 12px;padding:4px 0 4px 14px;border-left:3px solid var(--border-strong);color:var(--fg-3);font-style:italic}.ath-md ::ng-deep a{color:var(--accent);text-decoration:none;border-bottom:1px solid transparent;transition:border-color var(--t-fast)}.ath-md ::ng-deep a:hover{border-bottom-color:var(--accent)}.ath-md ::ng-deep hr{margin:24px 0;border:0;border-top:1px solid var(--border)}.ath-md ::ng-deep table{width:100%;margin:0 0 14px;border-collapse:collapse;font-size:13px}.ath-md ::ng-deep th,.ath-md ::ng-deep td{padding:8px 10px;border-bottom:1px solid var(--border-faint);text-align:left;vertical-align:top}.ath-md ::ng-deep th{background:var(--surface-2);font-weight:600;color:var(--fg);font-size:12px}.ath-md ::ng-deep tr:last-child td{border-bottom:0}.ath-md ::ng-deep img{max-width:100%;height:auto;border-radius:var(--r-sm)}.ath-md ::ng-deep .ath-callout{margin:0 0 14px;padding:10px 14px;border-left:3px solid;border-radius:0 var(--r-sm) var(--r-sm) 0}.ath-md ::ng-deep .ath-callout--info{border-left-color:var(--blue);background:var(--blue-tint)}.ath-md ::ng-deep .ath-callout--warn{border-left-color:var(--amber);background:var(--amber-tint)}.ath-md ::ng-deep .ath-callout--ok{border-left-color:var(--green);background:var(--green-tint)}.ath-md ::ng-deep .ath-callout--error{border-left-color:var(--red);background:var(--red-tint)}.ath-md ::ng-deep .ath-callout>p{margin:0}.ath-md ::ng-deep .ath-ticket-ref{display:inline-flex;align-items:center;padding:0 5px;font-family:var(--font-mono);font-size:12px;color:var(--accent);background:var(--accent-faint);border-radius:var(--r-xs);text-decoration:none}\n"] }]
        }], propDecorators: { html: [{
                type: Input
            }], source: [{
                type: Input
            }], parse: [{
                type: Input
            }] } });

/**
 * Athene Button Component
 *
 * @example
 * <ath-button variant="primary" (clicked)="handleClick()">Click me</ath-button>
 * <ath-button variant="outline" size="sm" [loading]="true">Loading...</ath-button>
 */
class AthButtonComponent {
    constructor() {
        /** Button variant */
        this.variant = 'primary';
        /** Button size */
        this.size = 'md';
        /** Button type attribute */
        this.type = 'button';
        /** Disabled state */
        this.disabled = false;
        /** Loading state */
        this.loading = false;
        /** Full width button */
        this.fullWidth = false;
        /** Optional aria-label for icon-only usage */
        this.ariaLabel = null;
        /** Click event emitter */
        this.clicked = new EventEmitter();
        this.loaderIcon = Loader2;
    }
    get buttonClasses() {
        return [
            'ath-button',
            `ath-button--${this.variant}`,
            `ath-button--${this.size}`,
            this.fullWidth ? 'ath-button--full-width' : '',
            this.loading ? 'ath-button--loading' : '',
        ].filter(Boolean).join(' ');
    }
    handleClick(event) {
        if (!this.disabled && !this.loading) {
            this.clicked.emit(event);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthButtonComponent, isStandalone: true, selector: "ath-button", inputs: { variant: "variant", size: "size", type: "type", disabled: "disabled", loading: "loading", fullWidth: "fullWidth", ariaLabel: "ariaLabel" }, outputs: { clicked: "clicked" }, ngImport: i0, template: "<button\n  [type]=\"type\"\n  [disabled]=\"disabled || loading\"\n  [class]=\"buttonClasses\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-busy]=\"loading\"\n  (click)=\"handleClick($event)\"\n>\n  @if (loading) {\n    <span class=\"ath-button__loader-wrap\">\n      <lucide-icon [img]=\"loaderIcon\" class=\"ath-button__loader\" [size]=\"18\" />\n    </span>\n  }\n  <span class=\"ath-button__content\" [class.ath-button__content--hidden]=\"loading\">\n    <ng-content />\n  </span>\n</button>\n", styles: [".ath-button{display:inline-grid;place-items:center;position:relative;grid-template-columns:1fr;grid-template-rows:1fr;font-family:var(--ath-font-family);font-weight:var(--ath-font-weight-medium);border-radius:var(--ath-border-radius-md);border:1px solid transparent;cursor:pointer;white-space:nowrap;letter-spacing:.2px;transition:background-color .15s ease,border-color .15s ease,color .15s ease,box-shadow .15s ease,opacity .15s ease}.ath-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-bg-primary),0 0 0 4px var(--ath-color-primary)}.ath-button:disabled{opacity:.5;cursor:not-allowed}.ath-button--sm{height:32px;padding:0 var(--ath-space-3);font-size:var(--ath-font-size-sm)}.ath-button--md{height:40px;padding:0 var(--ath-space-4);font-size:var(--ath-font-size-md)}.ath-button--lg{height:48px;padding:0 var(--ath-space-6);font-size:var(--ath-font-size-lg)}.ath-button--primary{background:var(--ath-color-primary);color:var(--ath-text-inverse);border-color:var(--ath-color-primary);font-weight:var(--ath-font-weight-semibold)}.ath-button--primary:hover:not(:disabled){background:var(--ath-color-primary-hover);border-color:var(--ath-color-primary-hover)}.ath-button--primary:active:not(:disabled){background:var(--ath-color-primary-active);border-color:var(--ath-color-primary-active)}.ath-button--primary .ath-button__loader-wrap{color:var(--ath-text-inverse)}.ath-button--secondary{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary);border-color:var(--ath-border-color)}.ath-button--secondary:hover:not(:disabled){border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-button--outline{background-color:transparent;border-color:var(--ath-border-color);color:var(--ath-color-primary)}.ath-button--outline:hover:not(:disabled){background-color:rgba(var(--ath-color-primary-rgb),.08);border-color:var(--ath-color-primary)}.ath-button--ghost{background-color:transparent;color:var(--ath-text-primary)}.ath-button--ghost:hover:not(:disabled){background-color:var(--ath-hover-bg)}.ath-button--danger{background-color:var(--ath-color-error);color:#fff;border-color:var(--ath-color-error)}.ath-button--danger:hover:not(:disabled){background-color:var(--ath-color-error-hover);border-color:var(--ath-color-error-hover)}.ath-button--full-width{width:100%}.ath-button--loading{pointer-events:none}.ath-button__loader-wrap{display:inline-flex;align-items:center;justify-content:center;grid-area:1/1}.ath-button__loader{animation:ath-spin 1s linear infinite}.ath-button__content{display:inline-flex;grid-area:1/1;align-items:center;gap:var(--ath-space-2)}.ath-button__content--hidden{visibility:hidden}@keyframes ath-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-button', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  [type]=\"type\"\n  [disabled]=\"disabled || loading\"\n  [class]=\"buttonClasses\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-busy]=\"loading\"\n  (click)=\"handleClick($event)\"\n>\n  @if (loading) {\n    <span class=\"ath-button__loader-wrap\">\n      <lucide-icon [img]=\"loaderIcon\" class=\"ath-button__loader\" [size]=\"18\" />\n    </span>\n  }\n  <span class=\"ath-button__content\" [class.ath-button__content--hidden]=\"loading\">\n    <ng-content />\n  </span>\n</button>\n", styles: [".ath-button{display:inline-grid;place-items:center;position:relative;grid-template-columns:1fr;grid-template-rows:1fr;font-family:var(--ath-font-family);font-weight:var(--ath-font-weight-medium);border-radius:var(--ath-border-radius-md);border:1px solid transparent;cursor:pointer;white-space:nowrap;letter-spacing:.2px;transition:background-color .15s ease,border-color .15s ease,color .15s ease,box-shadow .15s ease,opacity .15s ease}.ath-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-bg-primary),0 0 0 4px var(--ath-color-primary)}.ath-button:disabled{opacity:.5;cursor:not-allowed}.ath-button--sm{height:32px;padding:0 var(--ath-space-3);font-size:var(--ath-font-size-sm)}.ath-button--md{height:40px;padding:0 var(--ath-space-4);font-size:var(--ath-font-size-md)}.ath-button--lg{height:48px;padding:0 var(--ath-space-6);font-size:var(--ath-font-size-lg)}.ath-button--primary{background:var(--ath-color-primary);color:var(--ath-text-inverse);border-color:var(--ath-color-primary);font-weight:var(--ath-font-weight-semibold)}.ath-button--primary:hover:not(:disabled){background:var(--ath-color-primary-hover);border-color:var(--ath-color-primary-hover)}.ath-button--primary:active:not(:disabled){background:var(--ath-color-primary-active);border-color:var(--ath-color-primary-active)}.ath-button--primary .ath-button__loader-wrap{color:var(--ath-text-inverse)}.ath-button--secondary{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary);border-color:var(--ath-border-color)}.ath-button--secondary:hover:not(:disabled){border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-button--outline{background-color:transparent;border-color:var(--ath-border-color);color:var(--ath-color-primary)}.ath-button--outline:hover:not(:disabled){background-color:rgba(var(--ath-color-primary-rgb),.08);border-color:var(--ath-color-primary)}.ath-button--ghost{background-color:transparent;color:var(--ath-text-primary)}.ath-button--ghost:hover:not(:disabled){background-color:var(--ath-hover-bg)}.ath-button--danger{background-color:var(--ath-color-error);color:#fff;border-color:var(--ath-color-error)}.ath-button--danger:hover:not(:disabled){background-color:var(--ath-color-error-hover);border-color:var(--ath-color-error-hover)}.ath-button--full-width{width:100%}.ath-button--loading{pointer-events:none}.ath-button__loader-wrap{display:inline-flex;align-items:center;justify-content:center;grid-area:1/1}.ath-button__loader{animation:ath-spin 1s linear infinite}.ath-button__content{display:inline-flex;grid-area:1/1;align-items:center;gap:var(--ath-space-2)}.ath-button__content--hidden{visibility:hidden}@keyframes ath-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], type: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loading: [{
                type: Input
            }], fullWidth: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], clicked: [{
                type: Output
            }] } });

/**
 * Athene Input Component
 *
 * @example
 * <ath-input label="Email" type="email" [(ngModel)]="email" />
 * <ath-input label="Password" type="password" [error]="errorMessage" />
 */
class AthInputComponent {
    constructor() {
        /** Input label */
        this.label = '';
        /** Input type */
        this.type = 'text';
        /** Placeholder text */
        this.placeholder = '';
        /** Error message */
        this.error = '';
        /** Hint text */
        this.hint = '';
        /** Disabled state */
        this.disabled = false;
        /** Readonly state */
        this.readonly = false;
        /** Required field */
        this.required = false;
        /** Autocomplete attribute */
        this.autocomplete = 'off';
        /** Unique input ID */
        this.inputId = `ath-input-${Math.random().toString(36).substr(2, 9)}`;
        this.value = '';
        this.showPassword = false;
        this.eyeIcon = Eye;
        this.eyeOffIcon = EyeOff;
        this.alertIcon = AlertCircle;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        this.value = value ?? '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onInput(event) {
        const target = event.target;
        this.value = target.value;
        this.onChange(this.value);
    }
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthInputComponent, isStandalone: true, selector: "ath-input", inputs: { label: "label", type: "type", placeholder: "placeholder", error: "error", hint: "hint", disabled: "disabled", readonly: "readonly", required: "required", autocomplete: "autocomplete", inputId: "inputId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthInputComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"ath-input\" [class.ath-input--error]=\"error\" [class.ath-input--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-input__label\" [for]=\"inputId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId\"\n      [type]=\"showPassword ? 'text' : type\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [readonly]=\"readonly\"\n      [autocomplete]=\"autocomplete\"\n      [value]=\"value\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword ? 'Hide password' : 'Show password'\"\n        [attr.aria-pressed]=\"showPassword\"\n        tabindex=\"-1\"\n      >\n        <lucide-icon [img]=\"showPassword ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error) {\n    <div class=\"ath-input__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-input__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-input{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-input__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-input__required{color:var(--ath-color-error);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-input__toggle{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}.ath-input__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-input__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-input--error .ath-input__field{border-color:var(--ath-color-error)}.ath-input--error .ath-input__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-input--disabled .ath-input__label{opacity:.5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-input', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthInputComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"ath-input\" [class.ath-input--error]=\"error\" [class.ath-input--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-input__label\" [for]=\"inputId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId\"\n      [type]=\"showPassword ? 'text' : type\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [readonly]=\"readonly\"\n      [autocomplete]=\"autocomplete\"\n      [value]=\"value\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword ? 'Hide password' : 'Show password'\"\n        [attr.aria-pressed]=\"showPassword\"\n        tabindex=\"-1\"\n      >\n        <lucide-icon [img]=\"showPassword ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error) {\n    <div class=\"ath-input__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-input__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-input{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-input__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-input__required{color:var(--ath-color-error);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-input__toggle{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}.ath-input__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-input__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-input--error .ath-input__field{border-color:var(--ath-color-error)}.ath-input--error .ath-input__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-input--disabled .ath-input__label{opacity:.5}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], error: [{
                type: Input
            }], hint: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readonly: [{
                type: Input
            }], required: [{
                type: Input
            }], autocomplete: [{
                type: Input
            }], inputId: [{
                type: Input
            }] } });

/**
 * Athene Select Component
 *
 * Form select with consistent styling and ControlValueAccessor.
 *
 * @example
 * <ath-select label="Role" [options]="roles" [(ngModel)]="selectedRole" />
 */
class AthSelectComponent {
    constructor() {
        /** Select label */
        this.label = '';
        /** Placeholder text */
        this.placeholder = 'Select an option';
        /** Select options */
        this.options = [];
        /** Error message */
        this.error = '';
        /** Hint text */
        this.hint = '';
        /** Disabled state */
        this.disabled = false;
        /** Required field */
        this.required = false;
        /** Unique select ID */
        this.selectId = `ath-select-${Math.random().toString(36).substr(2, 9)}`;
        this.value = '';
        this.chevronIcon = ChevronDown;
        this.alertIcon = AlertCircle;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        this.value = value ?? '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onSelectionChange(event) {
        const target = event.target;
        this.value = target.value;
        this.onChange(this.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSelectComponent, isStandalone: true, selector: "ath-select", inputs: { label: "label", placeholder: "placeholder", options: "options", error: "error", hint: "hint", disabled: "disabled", required: "required", selectId: "selectId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthSelectComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"ath-select\" [class.ath-select--error]=\"error\" [class.ath-select--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--ath-color-error);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-select--disabled .ath-select__label{opacity:.5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-select', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthSelectComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"ath-select\" [class.ath-select--error]=\"error\" [class.ath-select--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--ath-color-error);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-select--disabled .ath-select__label{opacity:.5}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], options: [{
                type: Input
            }], error: [{
                type: Input
            }], hint: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], selectId: [{
                type: Input
            }] } });

/**
 * Athene Textarea Component
 *
 * Multi-line text input with ControlValueAccessor.
 *
 * @example
 * <ath-textarea label="Description" [(ngModel)]="description" />
 * <ath-textarea label="Message" [rows]="6" [error]="errorMsg" />
 */
class AthTextareaComponent {
    constructor() {
        /** Textarea label */
        this.label = '';
        /** Placeholder text */
        this.placeholder = '';
        /** Number of rows */
        this.rows = 4;
        /** Error message */
        this.error = '';
        /** Hint text */
        this.hint = '';
        /** Disabled state */
        this.disabled = false;
        /** Required field */
        this.required = false;
        /** Allow resize */
        this.resize = 'vertical';
        /** Max length */
        this.maxLength = null;
        /** Unique textarea ID */
        this.textareaId = `ath-textarea-${Math.random().toString(36).substr(2, 9)}`;
        this.value = '';
        this.alertIcon = AlertCircle;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    get characterCount() {
        return this.value?.length ?? 0;
    }
    writeValue(value) {
        this.value = value ?? '';
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onInput(event) {
        const target = event.target;
        this.value = target.value;
        this.onChange(this.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTextareaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTextareaComponent, isStandalone: true, selector: "ath-textarea", inputs: { label: "label", placeholder: "placeholder", rows: "rows", error: "error", hint: "hint", disabled: "disabled", required: "required", resize: "resize", maxLength: "maxLength", textareaId: "textareaId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthTextareaComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div class=\"ath-textarea\" [class.ath-textarea--error]=\"error\" [class.ath-textarea--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div class=\"ath-textarea__count\" [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\">\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-textarea__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-textarea__required{color:var(--ath-color-error);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);line-height:var(--ath-line-height-normal);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-textarea__field::placeholder{color:var(--ath-text-tertiary)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-textarea__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-textarea__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-textarea__count{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-textarea__count--near-limit{color:var(--ath-color-warning)}.ath-textarea--error .ath-textarea__field{border-color:var(--ath-color-error)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-textarea', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthTextareaComponent),
                            multi: true,
                        },
                    ], template: "<div class=\"ath-textarea\" [class.ath-textarea--error]=\"error\" [class.ath-textarea--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div class=\"ath-textarea__count\" [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\">\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-textarea__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-textarea__required{color:var(--ath-color-error);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);line-height:var(--ath-line-height-normal);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-textarea__field::placeholder{color:var(--ath-text-tertiary)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-textarea__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-textarea__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-textarea__count{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-textarea__count--near-limit{color:var(--ath-color-warning)}.ath-textarea--error .ath-textarea__field{border-color:var(--ath-color-error)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], rows: [{
                type: Input
            }], error: [{
                type: Input
            }], hint: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], resize: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], textareaId: [{
                type: Input
            }] } });

/**
 * Athene Toggle Component
 *
 * @example
 * <ath-toggle label="Maintenance" [checked]="enabled" (toggled)="onToggle($event)" />
 */
class AthToggleComponent {
    constructor() {
        /** Checked state */
        this.checked = false;
        /** Disabled state */
        this.disabled = false;
        /** Label text */
        this.label = '';
        /** Description text */
        this.description = '';
        /** Toggle event emitter */
        this.toggled = new EventEmitter();
    }
    toggle() {
        if (!this.disabled) {
            this.toggled.emit(!this.checked);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthToggleComponent, isStandalone: true, selector: "ath-toggle", inputs: { checked: "checked", disabled: "disabled", label: "label", description: "description" }, outputs: { toggled: "toggled" }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-toggle\"\n  [class.ath-toggle--checked]=\"checked\"\n  [class.ath-toggle--disabled]=\"disabled\"\n  role=\"switch\"\n  [attr.aria-checked]=\"checked\"\n  [disabled]=\"disabled\"\n  (click)=\"toggle()\"\n>\n  <span class=\"ath-toggle__track\">\n    <span class=\"ath-toggle__thumb\"></span>\n  </span>\n  <span class=\"ath-toggle__content\">\n    @if (label) {\n      <span class=\"ath-toggle__label\">{{ label }}</span>\n    }\n    @if (description) {\n      <span class=\"ath-toggle__description\">{{ description }}</span>\n    }\n  </span>\n</button>\n", styles: [".ath-toggle{display:flex;align-items:center;gap:var(--ath-space-3);width:100%;padding:var(--ath-space-3) var(--ath-space-4);border-radius:var(--ath-border-radius-md);border:1px solid var(--ath-border-color);background:#ffffff05;color:var(--ath-text-primary);text-align:left;cursor:pointer;transition:border-color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-toggle:hover:not(.ath-toggle--disabled){border-color:var(--ath-border-color-hover);background:#ffffff0a}.ath-toggle__track{position:relative;flex-shrink:0;width:36px;height:20px;border-radius:var(--ath-border-radius-full);background:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color);transition:background-color var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-toggle__thumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:var(--ath-border-radius-full);background:var(--ath-text-tertiary);transition:transform var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-toggle__content{display:flex;flex-direction:column;gap:2px}.ath-toggle__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-toggle__description{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-toggle--checked{border-color:var(--ath-border-color)}.ath-toggle--checked:hover:not(.ath-toggle--disabled){border-color:var(--ath-border-color-hover)}.ath-toggle--checked .ath-toggle__track{background:var(--ath-color-primary);border-color:var(--ath-color-primary)}.ath-toggle--checked .ath-toggle__thumb{transform:translate(16px);background:#fff}.ath-toggle--disabled{opacity:.5;cursor:not-allowed}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-toggle', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-toggle\"\n  [class.ath-toggle--checked]=\"checked\"\n  [class.ath-toggle--disabled]=\"disabled\"\n  role=\"switch\"\n  [attr.aria-checked]=\"checked\"\n  [disabled]=\"disabled\"\n  (click)=\"toggle()\"\n>\n  <span class=\"ath-toggle__track\">\n    <span class=\"ath-toggle__thumb\"></span>\n  </span>\n  <span class=\"ath-toggle__content\">\n    @if (label) {\n      <span class=\"ath-toggle__label\">{{ label }}</span>\n    }\n    @if (description) {\n      <span class=\"ath-toggle__description\">{{ description }}</span>\n    }\n  </span>\n</button>\n", styles: [".ath-toggle{display:flex;align-items:center;gap:var(--ath-space-3);width:100%;padding:var(--ath-space-3) var(--ath-space-4);border-radius:var(--ath-border-radius-md);border:1px solid var(--ath-border-color);background:#ffffff05;color:var(--ath-text-primary);text-align:left;cursor:pointer;transition:border-color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-toggle:hover:not(.ath-toggle--disabled){border-color:var(--ath-border-color-hover);background:#ffffff0a}.ath-toggle__track{position:relative;flex-shrink:0;width:36px;height:20px;border-radius:var(--ath-border-radius-full);background:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color);transition:background-color var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-toggle__thumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:var(--ath-border-radius-full);background:var(--ath-text-tertiary);transition:transform var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-toggle__content{display:flex;flex-direction:column;gap:2px}.ath-toggle__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-toggle__description{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-toggle--checked{border-color:var(--ath-border-color)}.ath-toggle--checked:hover:not(.ath-toggle--disabled){border-color:var(--ath-border-color-hover)}.ath-toggle--checked .ath-toggle__track{background:var(--ath-color-primary);border-color:var(--ath-color-primary)}.ath-toggle--checked .ath-toggle__thumb{transform:translate(16px);background:#fff}.ath-toggle--disabled{opacity:.5;cursor:not-allowed}\n"] }]
        }], propDecorators: { checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], label: [{
                type: Input
            }], description: [{
                type: Input
            }], toggled: [{
                type: Output
            }] } });

/**
 * Athene Search Input Component
 *
 * Search field with debounce, clear button, and search icon.
 *
 * @example
 * <ath-search-input placeholder="Search flags..." (searched)="onSearch($event)" />
 */
class AthSearchInputComponent {
    constructor(cdr) {
        this.cdr = cdr;
        /** Placeholder text */
        this.placeholder = 'Search...';
        /** Debounce time in ms */
        this.debounce = 300;
        /** Search event emitter */
        this.searched = new EventEmitter();
        this.value = '';
        this.searchIcon = Search;
        this.clearIcon = X;
        this.searchSubject = new Subject();
        this.destroy$ = new Subject();
        this.searchSubject.pipe(debounceTime(this.debounce), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(value => {
            this.searched.emit(value);
        });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    onInput(event) {
        const target = event.target;
        this.value = target.value;
        this.searchSubject.next(this.value);
    }
    clear() {
        this.value = '';
        this.searchSubject.next('');
        this.cdr.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSearchInputComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSearchInputComponent, isStandalone: true, selector: "ath-search-input", inputs: { placeholder: "placeholder", debounce: "debounce" }, outputs: { searched: "searched" }, ngImport: i0, template: "<div class=\"ath-search-input\">\n  <lucide-icon [img]=\"searchIcon\" [size]=\"18\" class=\"ath-search-input__icon\" />\n  <input\n    type=\"text\"\n    class=\"ath-search-input__field\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    (input)=\"onInput($event)\"\n  />\n  @if (value) {\n    <button type=\"button\" class=\"ath-search-input__clear\" aria-label=\"Clear search\" (click)=\"clear()\">\n      <lucide-icon [img]=\"clearIcon\" [size]=\"16\" />\n    </button>\n  }\n</div>\n", styles: [".ath-search-input{position:relative;display:flex;align-items:center}.ath-search-input__icon{position:absolute;left:var(--ath-space-4);color:var(--ath-text-tertiary);pointer-events:none;transition:color .15s ease}.ath-search-input__field{width:100%;height:42px;padding:0 var(--ath-space-10) 0 42px;font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background-color:var(--ath-bg-secondary);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);transition:border-color .15s ease,box-shadow .15s ease,background-color .15s ease}.ath-search-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-search-input__field:hover:not(:focus){border-color:var(--ath-border-color-hover);background-color:#ffffff08}.ath-search-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus);background-color:var(--ath-bg-secondary)}.ath-search-input__field:focus~.ath-search-input__icon{color:var(--ath-color-primary)}.ath-search-input:focus-within .ath-search-input__icon{color:var(--ath-color-primary)}.ath-search-input__clear{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color .15s ease,background-color .15s ease}.ath-search-input__clear:hover{color:var(--ath-text-secondary);background-color:#ffffff0f}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSearchInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-search-input', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-search-input\">\n  <lucide-icon [img]=\"searchIcon\" [size]=\"18\" class=\"ath-search-input__icon\" />\n  <input\n    type=\"text\"\n    class=\"ath-search-input__field\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    (input)=\"onInput($event)\"\n  />\n  @if (value) {\n    <button type=\"button\" class=\"ath-search-input__clear\" aria-label=\"Clear search\" (click)=\"clear()\">\n      <lucide-icon [img]=\"clearIcon\" [size]=\"16\" />\n    </button>\n  }\n</div>\n", styles: [".ath-search-input{position:relative;display:flex;align-items:center}.ath-search-input__icon{position:absolute;left:var(--ath-space-4);color:var(--ath-text-tertiary);pointer-events:none;transition:color .15s ease}.ath-search-input__field{width:100%;height:42px;padding:0 var(--ath-space-10) 0 42px;font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background-color:var(--ath-bg-secondary);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);transition:border-color .15s ease,box-shadow .15s ease,background-color .15s ease}.ath-search-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-search-input__field:hover:not(:focus){border-color:var(--ath-border-color-hover);background-color:#ffffff08}.ath-search-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus);background-color:var(--ath-bg-secondary)}.ath-search-input__field:focus~.ath-search-input__icon{color:var(--ath-color-primary)}.ath-search-input:focus-within .ath-search-input__icon{color:var(--ath-color-primary)}.ath-search-input__clear{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color .15s ease,background-color .15s ease}.ath-search-input__clear:hover{color:var(--ath-text-secondary);background-color:#ffffff0f}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { placeholder: [{
                type: Input
            }], debounce: [{
                type: Input
            }], searched: [{
                type: Output
            }] } });

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
class AthDropdownComponent {
    constructor() {
        this.el = inject(ElementRef);
        this.cdr = inject(ChangeDetectorRef);
        /** Menu items */
        this.items = [];
        /**
         * Horizontal alignment hint.
         * - `'left'`  – menu anchored to the left edge of trigger
         * - `'right'` – menu anchored to the right edge of trigger
         * - `'auto'`  – pick best side based on viewport space
         *
         * Vertical direction is always auto-detected.
         */
        this.align = 'auto';
        /** Item click event */
        this.itemClicked = new EventEmitter();
        /** Emits `true` when the menu opens, `false` when it closes. */
        this.openChange = new EventEmitter();
        this.isOpen = false;
        // Computed placement — set each time the menu opens
        this.placementX = 'right';
        this.placementY = 'down';
    }
    onDocumentClick(event) {
        if (!this.el.nativeElement.contains(event.target)) {
            this.close();
        }
    }
    onEscapeKey() {
        this.close();
    }
    toggle() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.isOpen = true;
            this.openChange.emit(true);
            this.computePlacement();
        }
    }
    onTriggerKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggle();
        }
    }
    selectItem(item) {
        if (item.disabled || item.divider)
            return;
        this.itemClicked.emit(item.id);
        this.close();
    }
    close() {
        if (!this.isOpen)
            return;
        this.isOpen = false;
        this.openChange.emit(false);
    }
    getItemClasses(item) {
        return [
            'ath-dropdown__item',
            item.variant === 'danger' ? 'ath-dropdown__item--danger' : '',
            item.disabled ? 'ath-dropdown__item--disabled' : '',
        ]
            .filter(Boolean)
            .join(' ');
    }
    /** Determine where to place the menu based on trigger position */
    computePlacement() {
        const trigger = this.el.nativeElement;
        const rect = trigger.getBoundingClientRect();
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        // Vertical: if trigger is in the bottom 40% of viewport → open upward
        this.placementY = rect.bottom > vh * 0.6 ? 'up' : 'down';
        // Horizontal: respect explicit hint, otherwise auto-detect
        if (this.align === 'left') {
            this.placementX = 'left';
        }
        else if (this.align === 'right') {
            this.placementX = 'right';
        }
        else {
            // auto: if trigger center is in the right half → anchor right
            const center = rect.left + rect.width / 2;
            this.placementX = center > vw / 2 ? 'right' : 'left';
        }
        this.cdr.markForCheck();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDropdownComponent, isStandalone: true, selector: "ath-dropdown", inputs: { items: "items", align: "align" }, outputs: { itemClicked: "itemClicked", openChange: "openChange" }, host: { listeners: { "document:click": "onDocumentClick($event)", "document:keydown.escape": "onEscapeKey()" } }, ngImport: i0, template: "<div class=\"ath-dropdown\">\n  <div\n    class=\"ath-dropdown__trigger\"\n    role=\"button\"\n    tabindex=\"0\"\n    aria-haspopup=\"menu\"\n    [attr.aria-expanded]=\"isOpen\"\n    (click)=\"toggle()\"\n    (keydown)=\"onTriggerKeydown($event)\"\n  >\n    <ng-content />\n  </div>\n\n  @if (isOpen) {\n    <div\n      class=\"ath-dropdown__menu\"\n      role=\"menu\"\n      [class.ath-dropdown__menu--left]=\"placementX === 'left'\"\n      [class.ath-dropdown__menu--right]=\"placementX === 'right'\"\n      [class.ath-dropdown__menu--down]=\"placementY === 'down'\"\n      [class.ath-dropdown__menu--up]=\"placementY === 'up'\"\n    >\n      @for (item of items; track item.id) {\n        @if (item.divider) {\n          <div class=\"ath-dropdown__divider\"></div>\n        } @else {\n          <button\n            type=\"button\"\n            [class]=\"getItemClasses(item)\"\n            [disabled]=\"item.disabled\"\n            (click)=\"selectItem(item)\"\n            role=\"menuitem\"\n          >\n            @if (item.icon) {\n              <lucide-icon [img]=\"item.icon\" [size]=\"16\" class=\"ath-dropdown__item-icon\" />\n            }\n            <span>{{ item.label }}</span>\n          </button>\n        }\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-dropdown{position:relative;display:inline-flex}.ath-dropdown__trigger{cursor:pointer}.ath-dropdown__menu{position:absolute;z-index:var(--ath-z-dropdown);min-width:180px;padding:var(--ath-space-1);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg)}.ath-dropdown__menu--down{top:calc(100% + var(--ath-space-1));animation:ath-dd-down .15s ease}.ath-dropdown__menu--up{bottom:calc(100% + var(--ath-space-1));animation:ath-dd-up .15s ease}.ath-dropdown__menu--left{left:0}.ath-dropdown__menu--right{right:0}.ath-dropdown__item{display:flex;align-items:center;gap:var(--ath-space-2);width:100%;padding:var(--ath-space-2) var(--ath-space-3);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;text-align:left;transition:background-color var(--ath-transition-fast)}.ath-dropdown__item:hover:not(:disabled){background-color:var(--ath-bg-tertiary)}.ath-dropdown__item--danger{color:var(--ath-color-error)}.ath-dropdown__item--danger:hover:not(:disabled){background-color:#ef44441a}.ath-dropdown__item--disabled{opacity:.4;cursor:not-allowed}.ath-dropdown__item-icon{flex-shrink:0;color:inherit}.ath-dropdown__divider{height:1px;margin:var(--ath-space-1) 0;background-color:var(--ath-border-color)}@keyframes ath-dd-down{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@keyframes ath-dd-up{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dropdown', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-dropdown\">\n  <div\n    class=\"ath-dropdown__trigger\"\n    role=\"button\"\n    tabindex=\"0\"\n    aria-haspopup=\"menu\"\n    [attr.aria-expanded]=\"isOpen\"\n    (click)=\"toggle()\"\n    (keydown)=\"onTriggerKeydown($event)\"\n  >\n    <ng-content />\n  </div>\n\n  @if (isOpen) {\n    <div\n      class=\"ath-dropdown__menu\"\n      role=\"menu\"\n      [class.ath-dropdown__menu--left]=\"placementX === 'left'\"\n      [class.ath-dropdown__menu--right]=\"placementX === 'right'\"\n      [class.ath-dropdown__menu--down]=\"placementY === 'down'\"\n      [class.ath-dropdown__menu--up]=\"placementY === 'up'\"\n    >\n      @for (item of items; track item.id) {\n        @if (item.divider) {\n          <div class=\"ath-dropdown__divider\"></div>\n        } @else {\n          <button\n            type=\"button\"\n            [class]=\"getItemClasses(item)\"\n            [disabled]=\"item.disabled\"\n            (click)=\"selectItem(item)\"\n            role=\"menuitem\"\n          >\n            @if (item.icon) {\n              <lucide-icon [img]=\"item.icon\" [size]=\"16\" class=\"ath-dropdown__item-icon\" />\n            }\n            <span>{{ item.label }}</span>\n          </button>\n        }\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-dropdown{position:relative;display:inline-flex}.ath-dropdown__trigger{cursor:pointer}.ath-dropdown__menu{position:absolute;z-index:var(--ath-z-dropdown);min-width:180px;padding:var(--ath-space-1);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg)}.ath-dropdown__menu--down{top:calc(100% + var(--ath-space-1));animation:ath-dd-down .15s ease}.ath-dropdown__menu--up{bottom:calc(100% + var(--ath-space-1));animation:ath-dd-up .15s ease}.ath-dropdown__menu--left{left:0}.ath-dropdown__menu--right{right:0}.ath-dropdown__item{display:flex;align-items:center;gap:var(--ath-space-2);width:100%;padding:var(--ath-space-2) var(--ath-space-3);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;text-align:left;transition:background-color var(--ath-transition-fast)}.ath-dropdown__item:hover:not(:disabled){background-color:var(--ath-bg-tertiary)}.ath-dropdown__item--danger{color:var(--ath-color-error)}.ath-dropdown__item--danger:hover:not(:disabled){background-color:#ef44441a}.ath-dropdown__item--disabled{opacity:.4;cursor:not-allowed}.ath-dropdown__item-icon{flex-shrink:0;color:inherit}.ath-dropdown__divider{height:1px;margin:var(--ath-space-1) 0;background-color:var(--ath-border-color)}@keyframes ath-dd-down{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@keyframes ath-dd-up{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}\n"] }]
        }], propDecorators: { items: [{
                type: Input
            }], align: [{
                type: Input
            }], itemClicked: [{
                type: Output
            }], openChange: [{
                type: Output
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }], onEscapeKey: [{
                type: HostListener,
                args: ['document:keydown.escape']
            }] } });

/**
 * iOS-style segmented control. Multiple options, exactly one active.
 *
 * @example
 * <ath-segment
 *   [options]="[{value:'list', label:'List'}, {value:'kanban', label:'Kanban'}]"
 *   [value]="view"
 *   (valueChange)="view = $event" />
 */
class AthSegmentComponent {
    constructor() {
        this.options = [];
        this.size = 'md';
        /** Optional aria-label for the group (for screen readers). */
        this.ariaLabel = null;
        this.valueChange = new EventEmitter();
        this.role = 'tablist';
        this.trackByValue = (_, item) => item.value;
    }
    get hostAriaLabel() {
        return this.ariaLabel;
    }
    get hostSize() {
        return this.size;
    }
    select(option) {
        if (option.disabled)
            return;
        if (option.value !== this.value) {
            this.valueChange.emit(option.value);
        }
    }
    isActive(option) {
        return option.value === this.value;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSegmentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSegmentComponent, isStandalone: true, selector: "ath-segment", inputs: { options: "options", value: "value", size: "size", ariaLabel: "ariaLabel" }, outputs: { valueChange: "valueChange" }, host: { properties: { "attr.role": "this.role", "attr.aria-label": "this.hostAriaLabel", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@for (option of options; track trackByValue($index, option)) {\n  <button\n    type=\"button\"\n    role=\"tab\"\n    class=\"ath-seg__item\"\n    [class.ath-seg__item--active]=\"isActive(option)\"\n    [class.ath-seg__item--disabled]=\"option.disabled\"\n    [attr.aria-selected]=\"isActive(option)\"\n    [attr.aria-disabled]=\"option.disabled || null\"\n    [disabled]=\"option.disabled\"\n    (click)=\"select(option)\"\n  >\n    <span class=\"ath-seg__label\">{{ option.label }}</span>\n    @if (option.count != null) {\n      <span class=\"ath-seg__count\">{{ option.count }}</span>\n    }\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:2px;padding:2px;background:var(--bg-2);border-radius:var(--r);border:1px solid var(--border)}.ath-seg__item{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:26px;padding:0 10px;background:transparent;border:0;border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);white-space:nowrap;letter-spacing:-.005em}.ath-seg__item:hover:not(.ath-seg__item--active):not(.ath-seg__item--disabled){color:var(--fg);background:var(--hover)}.ath-seg__item:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent-ring)}.ath-seg__item--active{background:var(--bg-1);color:var(--fg);box-shadow:var(--shadow-1)}.ath-seg__item--disabled{opacity:.5;cursor:not-allowed}.ath-seg__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;padding:0 5px;height:16px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;border-radius:999px;background:var(--bg-2);color:var(--fg-3);line-height:1}.ath-seg__item--active .ath-seg__count{background:var(--accent-faint);color:var(--accent)}:host([data-size=sm]) .ath-seg__item,body.compact :host .ath-seg__item{height:22px;padding:0 8px;font-size:11.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSegmentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-segment', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (option of options; track trackByValue($index, option)) {\n  <button\n    type=\"button\"\n    role=\"tab\"\n    class=\"ath-seg__item\"\n    [class.ath-seg__item--active]=\"isActive(option)\"\n    [class.ath-seg__item--disabled]=\"option.disabled\"\n    [attr.aria-selected]=\"isActive(option)\"\n    [attr.aria-disabled]=\"option.disabled || null\"\n    [disabled]=\"option.disabled\"\n    (click)=\"select(option)\"\n  >\n    <span class=\"ath-seg__label\">{{ option.label }}</span>\n    @if (option.count != null) {\n      <span class=\"ath-seg__count\">{{ option.count }}</span>\n    }\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:2px;padding:2px;background:var(--bg-2);border-radius:var(--r);border:1px solid var(--border)}.ath-seg__item{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:26px;padding:0 10px;background:transparent;border:0;border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);white-space:nowrap;letter-spacing:-.005em}.ath-seg__item:hover:not(.ath-seg__item--active):not(.ath-seg__item--disabled){color:var(--fg);background:var(--hover)}.ath-seg__item:focus-visible{outline:none;box-shadow:0 0 0 2px var(--accent-ring)}.ath-seg__item--active{background:var(--bg-1);color:var(--fg);box-shadow:var(--shadow-1)}.ath-seg__item--disabled{opacity:.5;cursor:not-allowed}.ath-seg__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;padding:0 5px;height:16px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;border-radius:999px;background:var(--bg-2);color:var(--fg-3);line-height:1}.ath-seg__item--active .ath-seg__count{background:var(--accent-faint);color:var(--accent)}:host([data-size=sm]) .ath-seg__item,body.compact :host .ath-seg__item{height:22px;padding:0 8px;font-size:11.5px}\n"] }]
        }], propDecorators: { options: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input
            }], size: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], hostAriaLabel: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], hostSize: [{
                type: HostBinding,
                args: ['attr.data-size']
            }] } });

/**
 * Filter chip in the style `Label : Value ▾`. Optional clearable.
 * Typically used in toolbars to compose query filters.
 *
 * @example
 * <ath-filter-chip label="Status" value="Any" (clicked)="openMenu()" />
 * <ath-filter-chip label="Assignee" value="Mira Voss" [active]="true" [clearable]="true"
 *                  (clicked)="open()" (cleared)="reset()" />
 */
class AthFilterChipComponent {
    constructor() {
        this.value = '';
        /** Visually highlights the chip when a filter value is set. */
        this.active = false;
        /** Shows a small `×` button to clear the filter. */
        this.clearable = false;
        this.disabled = false;
        this.clicked = new EventEmitter();
        this.cleared = new EventEmitter();
        this.chevronIcon = ChevronDown;
        this.clearIcon = X;
    }
    get hostActive() {
        return this.active ? 'true' : null;
    }
    get hostDisabled() {
        return this.disabled ? 'true' : null;
    }
    onClick() {
        if (!this.disabled) {
            this.clicked.emit();
        }
    }
    onClear(event) {
        event.stopPropagation();
        if (!this.disabled) {
            this.cleared.emit();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFilterChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthFilterChipComponent, isStandalone: true, selector: "ath-filter-chip", inputs: { label: "label", value: "value", active: "active", clearable: "clearable", disabled: "disabled" }, outputs: { clicked: "clicked", cleared: "cleared" }, host: { properties: { "attr.data-active": "this.hostActive", "attr.data-disabled": "this.hostDisabled" } }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-fchip\"\n  [disabled]=\"disabled\"\n  (click)=\"onClick()\"\n>\n  <span class=\"ath-fchip__label\">{{ label }}</span>\n  <span class=\"ath-fchip__sep\" aria-hidden=\"true\">:</span>\n  <span class=\"ath-fchip__value\">{{ value }}</span>\n\n  @if (clearable && active) {\n    <button\n      type=\"button\"\n      class=\"ath-fchip__clear\"\n      [attr.aria-label]=\"'Clear ' + label + ' filter'\"\n      (click)=\"onClear($event)\"\n    >\n      <lucide-icon [img]=\"clearIcon\" [size]=\"11\" />\n    </button>\n  } @else {\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"11\" class=\"ath-fchip__chevron\" />\n  }\n</button>\n", styles: [":host{display:inline-flex}.ath-fchip{display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12px;font-weight:500;color:var(--fg-2);cursor:pointer;white-space:nowrap;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);letter-spacing:-.005em}.ath-fchip:hover:not(:disabled){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-fchip:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fchip:disabled{opacity:.5;cursor:not-allowed}.ath-fchip__label{color:var(--fg-3);font-weight:500}.ath-fchip__sep{color:var(--fg-4);margin:0 -1px}.ath-fchip__value{color:var(--fg)}.ath-fchip__chevron{color:var(--fg-4);margin-left:2px}.ath-fchip__clear{display:inline-flex;align-items:center;justify-content:center;margin:0 -2px 0 2px;width:16px;height:16px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-fchip__clear:hover{background:var(--hover-strong);color:var(--fg)}:host([data-active=true]) .ath-fchip{background:var(--accent-faint);border-color:var(--accent-ring);color:var(--fg)}:host([data-active=true]) .ath-fchip .ath-fchip__label{color:var(--accent)}:host([data-active=true]) .ath-fchip:hover{background:var(--accent-faint);border-color:var(--accent)}body.compact .ath-fchip{height:22px;padding:0 7px;font-size:11.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFilterChipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-filter-chip', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-fchip\"\n  [disabled]=\"disabled\"\n  (click)=\"onClick()\"\n>\n  <span class=\"ath-fchip__label\">{{ label }}</span>\n  <span class=\"ath-fchip__sep\" aria-hidden=\"true\">:</span>\n  <span class=\"ath-fchip__value\">{{ value }}</span>\n\n  @if (clearable && active) {\n    <button\n      type=\"button\"\n      class=\"ath-fchip__clear\"\n      [attr.aria-label]=\"'Clear ' + label + ' filter'\"\n      (click)=\"onClear($event)\"\n    >\n      <lucide-icon [img]=\"clearIcon\" [size]=\"11\" />\n    </button>\n  } @else {\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"11\" class=\"ath-fchip__chevron\" />\n  }\n</button>\n", styles: [":host{display:inline-flex}.ath-fchip{display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12px;font-weight:500;color:var(--fg-2);cursor:pointer;white-space:nowrap;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);letter-spacing:-.005em}.ath-fchip:hover:not(:disabled){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-fchip:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fchip:disabled{opacity:.5;cursor:not-allowed}.ath-fchip__label{color:var(--fg-3);font-weight:500}.ath-fchip__sep{color:var(--fg-4);margin:0 -1px}.ath-fchip__value{color:var(--fg)}.ath-fchip__chevron{color:var(--fg-4);margin-left:2px}.ath-fchip__clear{display:inline-flex;align-items:center;justify-content:center;margin:0 -2px 0 2px;width:16px;height:16px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-fchip__clear:hover{background:var(--hover-strong);color:var(--fg)}:host([data-active=true]) .ath-fchip{background:var(--accent-faint);border-color:var(--accent-ring);color:var(--fg)}:host([data-active=true]) .ath-fchip .ath-fchip__label{color:var(--accent)}:host([data-active=true]) .ath-fchip:hover{background:var(--accent-faint);border-color:var(--accent)}body.compact .ath-fchip{height:22px;padding:0 7px;font-size:11.5px}\n"] }]
        }], propDecorators: { label: [{
                type: Input,
                args: [{ required: true }]
            }], value: [{
                type: Input
            }], active: [{
                type: Input
            }], clearable: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clicked: [{
                type: Output
            }], cleared: [{
                type: Output
            }], hostActive: [{
                type: HostBinding,
                args: ['attr.data-active']
            }], hostDisabled: [{
                type: HostBinding,
                args: ['attr.data-disabled']
            }] } });

/**
 * Searchable single-select dropdown. The foundation for UserPicker,
 * LabelPicker, ProjectPicker, AssigneePicker, etc.
 *
 * For custom rendering pass an `optionTpl` template.
 *
 * @example
 * <ath-combobox
 *   [options]="users"
 *   [(value)]="selected"
 *   placeholder="Pick assignee"
 *   (queryChange)="search($event)" />
 */
class AthComboboxComponent {
    constructor() {
        this.host = inject((ElementRef));
        this.options = [];
        this.value = null;
        this.placeholder = 'Select…';
        this.searchPlaceholder = 'Search';
        this.disabled = false;
        this.clearable = false;
        this.loading = false;
        /** Hide the trigger's button styling; render only the popup (controlled mode). */
        this.bare = false;
        /** Optional custom template for each option (`<ng-template let-option>`). */
        this.optionTpl = null;
        this.valueChange = new EventEmitter();
        /** Emits the search query when it changes (for async/server search). */
        this.queryChange = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.chevronIcon = ChevronDown;
        this.checkIcon = Check;
        this.searchIcon = Search;
        this.clearIcon = X;
        this.open = signal(false);
        this.query = signal('');
        this.highlighted = signal(0);
        this.filtered = computed(() => {
            const q = this.query().trim().toLowerCase();
            if (!q)
                return this.options;
            return this.options.filter((o) => o.label.toLowerCase().includes(q) ||
                (o.sublabel ?? '').toLowerCase().includes(q));
        });
        /** Result with `null` separators inserted between groups. */
        this.grouped = computed(() => {
            const items = this.filtered();
            if (!items.some((i) => i.group))
                return items;
            const byGroup = new Map();
            const noGroup = [];
            for (const item of items) {
                if (item.group) {
                    const arr = byGroup.get(item.group) ?? [];
                    arr.push(item);
                    byGroup.set(item.group, arr);
                }
                else {
                    noGroup.push(item);
                }
            }
            const result = [];
            for (const [group, list] of byGroup) {
                result.push({ _group: group });
                result.push(...list);
            }
            if (noGroup.length) {
                if (byGroup.size > 0)
                    result.push({ _group: 'Other' });
                result.push(...noGroup);
            }
            return result;
        });
        this.selectedOption = computed(() => this.options.find((o) => o.value === this.value) ?? null);
        this.trackByValue = (index, item) => {
            return this.isOption(item) ? item.value : `__group_${item._group}`;
        };
    }
    toggle() {
        if (this.disabled)
            return;
        if (this.open()) {
            this.close();
        }
        else {
            this.openPanel();
        }
    }
    openPanel() {
        if (this.disabled)
            return;
        this.open.set(true);
        this.query.set('');
        this.highlighted.set(0);
        this.opened.emit();
        queueMicrotask(() => this.searchInput?.nativeElement.focus());
    }
    close() {
        if (!this.open())
            return;
        this.open.set(false);
        this.closed.emit();
    }
    select(option) {
        if (option.disabled)
            return;
        this.value = option.value;
        this.valueChange.emit(option.value);
        this.close();
    }
    clearValue(event) {
        event.stopPropagation();
        this.value = null;
        this.valueChange.emit(null);
    }
    onQueryInput(value) {
        this.query.set(value);
        this.highlighted.set(0);
        this.queryChange.emit(value);
    }
    isOption(item) {
        return !('_group' in item);
    }
    isHighlighted(index, item) {
        if (!this.isOption(item))
            return false;
        const realIndex = this.filtered().indexOf(item);
        return realIndex === this.highlighted();
    }
    // ---------- Keyboard navigation ----------
    onSearchKey(event) {
        const items = this.filtered();
        if (items.length === 0) {
            if (event.key === 'Escape')
                this.close();
            return;
        }
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.highlighted.update((i) => Math.min(i + 1, items.length - 1));
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.highlighted.update((i) => Math.max(i - 1, 0));
                break;
            case 'Enter':
                event.preventDefault();
                this.select(items[this.highlighted()]);
                break;
            case 'Escape':
                event.preventDefault();
                this.close();
                break;
        }
    }
    // ---------- Click-outside ----------
    onDocumentMouseDown(event) {
        if (!this.open())
            return;
        if (!this.host.nativeElement.contains(event.target)) {
            this.close();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthComboboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthComboboxComponent, isStandalone: true, selector: "ath-combobox", inputs: { options: "options", value: "value", placeholder: "placeholder", searchPlaceholder: "searchPlaceholder", disabled: "disabled", clearable: "clearable", loading: "loading", bare: "bare", optionTpl: "optionTpl" }, outputs: { valueChange: "valueChange", queryChange: "queryChange", opened: "opened", closed: "closed" }, host: { listeners: { "document:mousedown": "onDocumentMouseDown($event)" } }, viewQueries: [{ propertyName: "searchInput", first: true, predicate: ["searchInput"], descendants: true }], ngImport: i0, template: "@if (!bare) {\n  <button\n    type=\"button\"\n    class=\"ath-cb__trigger\"\n    [class.ath-cb__trigger--open]=\"open()\"\n    [disabled]=\"disabled\"\n    [attr.aria-expanded]=\"open()\"\n    [attr.aria-haspopup]=\"'listbox'\"\n    (click)=\"toggle()\"\n  >\n    <span class=\"ath-cb__value\" [class.ath-cb__value--placeholder]=\"!selectedOption()\">\n      {{ selectedOption()?.label ?? placeholder }}\n    </span>\n    @if (clearable && selectedOption()) {\n      <button\n        type=\"button\"\n        class=\"ath-cb__clear\"\n        [attr.aria-label]=\"'Clear selection'\"\n        (click)=\"clearValue($event)\"\n      >\n        <lucide-icon [img]=\"clearIcon\" [size]=\"12\" />\n      </button>\n    }\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"14\" class=\"ath-cb__chevron\" />\n  </button>\n}\n\n@if (open()) {\n  <div class=\"ath-cb__panel\" role=\"listbox\">\n    <div class=\"ath-cb__search\">\n      <lucide-icon [img]=\"searchIcon\" [size]=\"13\" class=\"ath-cb__search-icon\" />\n      <input\n        #searchInput\n        type=\"text\"\n        class=\"ath-cb__search-input\"\n        [placeholder]=\"searchPlaceholder\"\n        [ngModel]=\"query()\"\n        (ngModelChange)=\"onQueryInput($event)\"\n        (keydown)=\"onSearchKey($event)\"\n        autocomplete=\"off\"\n        spellcheck=\"false\"\n      />\n    </div>\n\n    <div class=\"ath-cb__items\">\n      @if (loading) {\n        <div class=\"ath-cb__loading\">Loading\u2026</div>\n      } @else if (grouped().length === 0) {\n        <div class=\"ath-cb__empty\">No matches</div>\n      } @else {\n        @for (item of grouped(); track trackByValue($index, item)) {\n          @if (isOption(item)) {\n            <button\n              type=\"button\"\n              role=\"option\"\n              class=\"ath-cb__option\"\n              [class.ath-cb__option--selected]=\"item.value === value\"\n              [class.ath-cb__option--highlighted]=\"isHighlighted($index, item)\"\n              [class.ath-cb__option--disabled]=\"item.disabled\"\n              [attr.aria-selected]=\"item.value === value\"\n              [disabled]=\"item.disabled\"\n              (click)=\"select(item)\"\n            >\n              @if (optionTpl) {\n                <ng-container *ngTemplateOutlet=\"optionTpl; context: { $implicit: item }\" />\n              } @else {\n                <div class=\"ath-cb__option-text\">\n                  <span class=\"ath-cb__option-label\">{{ item.label }}</span>\n                  @if (item.sublabel) {\n                    <span class=\"ath-cb__option-sub\">{{ item.sublabel }}</span>\n                  }\n                </div>\n                @if (item.value === value) {\n                  <lucide-icon [img]=\"checkIcon\" [size]=\"13\" class=\"ath-cb__option-check\" />\n                }\n              }\n            </button>\n          } @else {\n            <div class=\"ath-cb__group\">{{ item._group }}</div>\n          }\n        }\n      }\n    </div>\n  </div>\n}\n", styles: [":host{display:inline-block;position:relative;font-family:var(--font-sans)}.ath-cb__trigger{display:inline-flex;align-items:center;gap:6px;height:32px;min-width:140px;padding:0 8px 0 12px;background:var(--bg-1);border:1px solid var(--border-strong);border-radius:var(--r);font-family:var(--font-sans);font-size:13px;font-weight:500;color:var(--fg);cursor:pointer;transition:border-color var(--t-fast),background var(--t-fast),box-shadow var(--t-fast)}.ath-cb__trigger:hover:not(:disabled){border-color:var(--accent-dim)}.ath-cb__trigger:focus-visible,.ath-cb__trigger--open{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-cb__trigger:disabled{opacity:.5;cursor:not-allowed}.ath-cb__value{flex:1;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__value--placeholder{color:var(--fg-4);font-weight:400}.ath-cb__clear{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-cb__clear:hover{background:var(--hover-strong);color:var(--fg)}.ath-cb__chevron{color:var(--fg-3)}.ath-cb__panel{position:absolute;top:calc(100% + 4px);left:0;z-index:var(--z-popover);min-width:220px;max-width:360px;max-height:320px;display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);overflow:hidden}.ath-cb__search{display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid var(--border-faint)}.ath-cb__search-icon{color:var(--fg-4);flex-shrink:0}.ath-cb__search-input{flex:1;height:26px;padding:0;background:transparent;border:0;color:var(--fg);font-family:var(--font-sans);font-size:13px;outline:none}.ath-cb__search-input::placeholder{color:var(--fg-4)}.ath-cb__items{flex:1;overflow-y:auto;padding:4px}.ath-cb__option{display:flex;align-items:center;gap:8px;width:100%;padding:6px 8px;background:transparent;border:0;border-radius:var(--r-sm);color:var(--fg-2);font-family:var(--font-sans);font-size:13px;text-align:left;cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-cb__option:hover:not(:disabled),.ath-cb__option--highlighted{background:var(--hover);color:var(--fg)}.ath-cb__option--selected{color:var(--fg);font-weight:500}.ath-cb__option--selected.ath-cb__option--highlighted{background:var(--accent-faint)}.ath-cb__option--disabled{opacity:.5;cursor:not-allowed}.ath-cb__option-text{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}.ath-cb__option-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__option-sub{font-size:11.5px;color:var(--fg-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__option-check{color:var(--accent);flex-shrink:0}.ath-cb__group{padding:6px 10px 2px;font-family:var(--font-sans);font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;color:var(--fg-4)}.ath-cb__empty,.ath-cb__loading{padding:12px 10px;text-align:center;font-size:12.5px;color:var(--fg-3)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthComboboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-combobox', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (!bare) {\n  <button\n    type=\"button\"\n    class=\"ath-cb__trigger\"\n    [class.ath-cb__trigger--open]=\"open()\"\n    [disabled]=\"disabled\"\n    [attr.aria-expanded]=\"open()\"\n    [attr.aria-haspopup]=\"'listbox'\"\n    (click)=\"toggle()\"\n  >\n    <span class=\"ath-cb__value\" [class.ath-cb__value--placeholder]=\"!selectedOption()\">\n      {{ selectedOption()?.label ?? placeholder }}\n    </span>\n    @if (clearable && selectedOption()) {\n      <button\n        type=\"button\"\n        class=\"ath-cb__clear\"\n        [attr.aria-label]=\"'Clear selection'\"\n        (click)=\"clearValue($event)\"\n      >\n        <lucide-icon [img]=\"clearIcon\" [size]=\"12\" />\n      </button>\n    }\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"14\" class=\"ath-cb__chevron\" />\n  </button>\n}\n\n@if (open()) {\n  <div class=\"ath-cb__panel\" role=\"listbox\">\n    <div class=\"ath-cb__search\">\n      <lucide-icon [img]=\"searchIcon\" [size]=\"13\" class=\"ath-cb__search-icon\" />\n      <input\n        #searchInput\n        type=\"text\"\n        class=\"ath-cb__search-input\"\n        [placeholder]=\"searchPlaceholder\"\n        [ngModel]=\"query()\"\n        (ngModelChange)=\"onQueryInput($event)\"\n        (keydown)=\"onSearchKey($event)\"\n        autocomplete=\"off\"\n        spellcheck=\"false\"\n      />\n    </div>\n\n    <div class=\"ath-cb__items\">\n      @if (loading) {\n        <div class=\"ath-cb__loading\">Loading\u2026</div>\n      } @else if (grouped().length === 0) {\n        <div class=\"ath-cb__empty\">No matches</div>\n      } @else {\n        @for (item of grouped(); track trackByValue($index, item)) {\n          @if (isOption(item)) {\n            <button\n              type=\"button\"\n              role=\"option\"\n              class=\"ath-cb__option\"\n              [class.ath-cb__option--selected]=\"item.value === value\"\n              [class.ath-cb__option--highlighted]=\"isHighlighted($index, item)\"\n              [class.ath-cb__option--disabled]=\"item.disabled\"\n              [attr.aria-selected]=\"item.value === value\"\n              [disabled]=\"item.disabled\"\n              (click)=\"select(item)\"\n            >\n              @if (optionTpl) {\n                <ng-container *ngTemplateOutlet=\"optionTpl; context: { $implicit: item }\" />\n              } @else {\n                <div class=\"ath-cb__option-text\">\n                  <span class=\"ath-cb__option-label\">{{ item.label }}</span>\n                  @if (item.sublabel) {\n                    <span class=\"ath-cb__option-sub\">{{ item.sublabel }}</span>\n                  }\n                </div>\n                @if (item.value === value) {\n                  <lucide-icon [img]=\"checkIcon\" [size]=\"13\" class=\"ath-cb__option-check\" />\n                }\n              }\n            </button>\n          } @else {\n            <div class=\"ath-cb__group\">{{ item._group }}</div>\n          }\n        }\n      }\n    </div>\n  </div>\n}\n", styles: [":host{display:inline-block;position:relative;font-family:var(--font-sans)}.ath-cb__trigger{display:inline-flex;align-items:center;gap:6px;height:32px;min-width:140px;padding:0 8px 0 12px;background:var(--bg-1);border:1px solid var(--border-strong);border-radius:var(--r);font-family:var(--font-sans);font-size:13px;font-weight:500;color:var(--fg);cursor:pointer;transition:border-color var(--t-fast),background var(--t-fast),box-shadow var(--t-fast)}.ath-cb__trigger:hover:not(:disabled){border-color:var(--accent-dim)}.ath-cb__trigger:focus-visible,.ath-cb__trigger--open{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-cb__trigger:disabled{opacity:.5;cursor:not-allowed}.ath-cb__value{flex:1;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__value--placeholder{color:var(--fg-4);font-weight:400}.ath-cb__clear{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-cb__clear:hover{background:var(--hover-strong);color:var(--fg)}.ath-cb__chevron{color:var(--fg-3)}.ath-cb__panel{position:absolute;top:calc(100% + 4px);left:0;z-index:var(--z-popover);min-width:220px;max-width:360px;max-height:320px;display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);overflow:hidden}.ath-cb__search{display:flex;align-items:center;gap:6px;padding:6px 10px;border-bottom:1px solid var(--border-faint)}.ath-cb__search-icon{color:var(--fg-4);flex-shrink:0}.ath-cb__search-input{flex:1;height:26px;padding:0;background:transparent;border:0;color:var(--fg);font-family:var(--font-sans);font-size:13px;outline:none}.ath-cb__search-input::placeholder{color:var(--fg-4)}.ath-cb__items{flex:1;overflow-y:auto;padding:4px}.ath-cb__option{display:flex;align-items:center;gap:8px;width:100%;padding:6px 8px;background:transparent;border:0;border-radius:var(--r-sm);color:var(--fg-2);font-family:var(--font-sans);font-size:13px;text-align:left;cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-cb__option:hover:not(:disabled),.ath-cb__option--highlighted{background:var(--hover);color:var(--fg)}.ath-cb__option--selected{color:var(--fg);font-weight:500}.ath-cb__option--selected.ath-cb__option--highlighted{background:var(--accent-faint)}.ath-cb__option--disabled{opacity:.5;cursor:not-allowed}.ath-cb__option-text{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}.ath-cb__option-label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__option-sub{font-size:11.5px;color:var(--fg-3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ath-cb__option-check{color:var(--accent);flex-shrink:0}.ath-cb__group{padding:6px 10px 2px;font-family:var(--font-sans);font-size:10.5px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;color:var(--fg-4)}.ath-cb__empty,.ath-cb__loading{padding:12px 10px;text-align:center;font-size:12.5px;color:var(--fg-3)}\n"] }]
        }], propDecorators: { options: [{
                type: Input
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clearable: [{
                type: Input
            }], loading: [{
                type: Input
            }], bare: [{
                type: Input
            }], optionTpl: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], queryChange: [{
                type: Output
            }], opened: [{
                type: Output
            }], closed: [{
                type: Output
            }], searchInput: [{
                type: ViewChild,
                args: ['searchInput']
            }], onDocumentMouseDown: [{
                type: HostListener,
                args: ['document:mousedown', ['$event']]
            }] } });

/**
 * User picker — wraps `<ath-combobox>` with avatar rendering on the trigger
 * and in options. Use for Assignee, Reporter, Watchers, Mentions, etc.
 *
 * @example
 * <ath-user-picker
 *   [users]="workspaceMembers"
 *   [(value)]="assigneeId"
 *   placeholder="Unassigned" />
 */
class AthUserPickerComponent {
    constructor() {
        this._users = signal([]);
        this.value = null;
        this.placeholder = 'Pick user';
        this.searchPlaceholder = 'Search people';
        this.disabled = false;
        this.clearable = true;
        this.allowUnassigned = true;
        /** Show email under each name. */
        this.showEmail = true;
        this.valueChange = new EventEmitter();
        this.options = computed(() => this._users().map((u) => ({
            value: u.id,
            label: u.name,
            sublabel: this.showEmail ? u.email : undefined,
        })));
        this.selectedUser = computed(() => this._users().find((u) => u.id === this.value) ?? null);
    }
    set users(value) {
        this._users.set(value ?? []);
    }
    get users() {
        return this._users();
    }
    onValueChange(v) {
        this.value = v;
        this.valueChange.emit(v);
    }
    get triggerLabel() {
        const selected = this.selectedUser();
        if (selected)
            return selected.name;
        return this.allowUnassigned ? this.placeholder : '—';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthUserPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthUserPickerComponent, isStandalone: true, selector: "ath-user-picker", inputs: { users: "users", value: "value", placeholder: "placeholder", searchPlaceholder: "searchPlaceholder", disabled: "disabled", clearable: "clearable", allowUnassigned: "allowUnassigned", showEmail: "showEmail" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value\"\n  [placeholder]=\"placeholder\"\n  [searchPlaceholder]=\"searchPlaceholder\"\n  [disabled]=\"disabled\"\n  [clearable]=\"clearable && allowUnassigned\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n", styles: [":host{display:inline-block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthComboboxComponent, selector: "ath-combobox", inputs: ["options", "value", "placeholder", "searchPlaceholder", "disabled", "clearable", "loading", "bare", "optionTpl"], outputs: ["valueChange", "queryChange", "opened", "closed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthUserPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-user-picker', standalone: true, imports: [CommonModule, AthAvatarComponent, AthComboboxComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value\"\n  [placeholder]=\"placeholder\"\n  [searchPlaceholder]=\"searchPlaceholder\"\n  [disabled]=\"disabled\"\n  [clearable]=\"clearable && allowUnassigned\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n", styles: [":host{display:inline-block}\n"] }]
        }], propDecorators: { users: [{
                type: Input
            }], value: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], clearable: [{
                type: Input
            }], allowUnassigned: [{
                type: Input
            }], showEmail: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

/**
 * Drag-and-drop file upload zone with click-to-browse fallback.
 *
 * Emits raw `File[]` — actual uploading is the caller's job (typically
 * routed via `file-service`).
 *
 * @example
 * <ath-file-drop accept="image/*,.pdf" (filesPicked)="upload($event)" />
 * <ath-file-drop [multiple]="false" [maxSizeMb]="20" (rejected)="showError($event)"
 *                (filesPicked)="onPick($event)">
 *   Drop your avatar here
 * </ath-file-drop>
 */
class AthFileDropComponent {
    constructor() {
        /** Filter for the file picker (e.g., `image/*,.pdf`). */
        this.accept = null;
        this.multiple = true;
        /** Reject files larger than this (in MB). 0 = no limit. */
        this.maxSizeMb = 0;
        this.disabled = false;
        /** Custom prompt text. Defaults to "Drop files or click to browse". */
        this.prompt = 'Drop files or click to browse';
        this.filesPicked = new EventEmitter();
        /** Emits when files are rejected (size limit, wrong type). */
        this.rejected = new EventEmitter();
        this.uploadIcon = Upload;
        this.dragging = signal(false);
    }
    onDragOver(event) {
        if (this.disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = 'copy';
        }
        this.dragging.set(true);
    }
    onDragLeave(event) {
        if (this.disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        // Only flip off if leaving the host, not a child element
        if (!event.currentTarget.contains(event.relatedTarget)) {
            this.dragging.set(false);
        }
    }
    onDrop(event) {
        if (this.disabled)
            return;
        event.preventDefault();
        event.stopPropagation();
        this.dragging.set(false);
        const files = Array.from(event.dataTransfer?.files ?? []);
        this.handle(files);
    }
    openPicker() {
        if (this.disabled)
            return;
        this.fileInput.nativeElement.click();
    }
    onPickerChange(event) {
        const input = event.target;
        const files = Array.from(input.files ?? []);
        this.handle(files);
        input.value = ''; // allow re-picking the same file
    }
    handle(files) {
        if (files.length === 0)
            return;
        const accepted = [];
        const rejected = [];
        for (const file of files) {
            if (this.maxSizeMb > 0 && file.size > this.maxSizeMb * 1024 * 1024) {
                rejected.push({ file, reason: 'size' });
                continue;
            }
            if (this.accept && !this.matchesAccept(file)) {
                rejected.push({ file, reason: 'type' });
                continue;
            }
            accepted.push(file);
        }
        if (rejected.length > 0) {
            this.rejected.emit(rejected);
        }
        if (accepted.length > 0) {
            this.filesPicked.emit(this.multiple ? accepted : [accepted[0]]);
        }
    }
    matchesAccept(file) {
        if (!this.accept)
            return true;
        const patterns = this.accept.split(',').map((p) => p.trim().toLowerCase());
        const type = file.type.toLowerCase();
        const name = file.name.toLowerCase();
        return patterns.some((p) => {
            if (p.startsWith('.'))
                return name.endsWith(p);
            if (p.endsWith('/*'))
                return type.startsWith(p.slice(0, -1));
            return type === p;
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFileDropComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthFileDropComponent, isStandalone: true, selector: "ath-file-drop", inputs: { accept: "accept", multiple: "multiple", maxSizeMb: "maxSizeMb", disabled: "disabled", prompt: "prompt" }, outputs: { filesPicked: "filesPicked", rejected: "rejected" }, host: { listeners: { "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)", "drop": "onDrop($event)" } }, viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }], ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt }}</ng-content>\n  </span>\n  @if (accept || maxSizeMb > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept) {\n        <span>{{ accept }}</span>\n      }\n      @if (accept && maxSizeMb > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb > 0) {\n        <span>max {{ maxSizeMb }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept ?? ''\"\n  [multiple]=\"multiple\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFileDropComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-file-drop', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt }}</ng-content>\n  </span>\n  @if (accept || maxSizeMb > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept) {\n        <span>{{ accept }}</span>\n      }\n      @if (accept && maxSizeMb > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb > 0) {\n        <span>max {{ maxSizeMb }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept ?? ''\"\n  [multiple]=\"multiple\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"] }]
        }], propDecorators: { accept: [{
                type: Input
            }], multiple: [{
                type: Input
            }], maxSizeMb: [{
                type: Input
            }], disabled: [{
                type: Input
            }], prompt: [{
                type: Input
            }], filesPicked: [{
                type: Output
            }], rejected: [{
                type: Output
            }], fileInput: [{
                type: ViewChild,
                args: ['fileInput']
            }], onDragOver: [{
                type: HostListener,
                args: ['dragover', ['$event']]
            }], onDragLeave: [{
                type: HostListener,
                args: ['dragleave', ['$event']]
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });

/**
 * Athene Alert Component
 *
 * Display feedback messages.
 *
 * @example
 * <ath-alert variant="error" message="Something went wrong" />
 * <ath-alert variant="success" message="Saved successfully" [dismissible]="true" />
 */
class AthAlertComponent {
    constructor() {
        /** Alert variant */
        this.variant = 'info';
        /** Alert message */
        this.message = '';
        /** Show dismiss button */
        this.dismissible = false;
        /** Dismiss event */
        this.dismissed = new EventEmitter();
    }
    get alertClasses() {
        return ['ath-alert', `ath-alert--${this.variant}`].join(' ');
    }
    dismiss() {
        this.dismissed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAlertComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAlertComponent, isStandalone: true, selector: "ath-alert", inputs: { variant: "variant", message: "message", dismissible: "dismissible" }, outputs: { dismissed: "dismissed" }, ngImport: i0, template: "<div [class]=\"alertClasses\" role=\"alert\">\n  <span class=\"ath-alert__message\">{{ message }}</span>\n  @if (dismissible) {\n    <button class=\"ath-alert__dismiss\" (click)=\"dismiss()\" aria-label=\"Dismiss\">\n      \u00D7\n    </button>\n  }\n</div>\n", styles: [".ath-alert{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);border-radius:var(--ath-border-radius-md);font-size:var(--ath-font-size-sm)}.ath-alert__message{flex:1}.ath-alert__dismiss{display:flex;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:none;border-radius:var(--ath-border-radius-sm);background:transparent;color:inherit;font-size:16px;line-height:1;cursor:pointer;opacity:.7;transition:opacity var(--ath-transition-fast),background var(--ath-transition-fast)}.ath-alert__dismiss:hover{opacity:1;background:#ffffff1a}.ath-alert--info{background:#3b82f61f;border:1px solid rgba(59,130,246,.25);color:var(--ath-color-info)}.ath-alert--success{background:#22c55e1f;border:1px solid rgba(34,197,94,.25);color:var(--ath-color-success)}.ath-alert--warning{background:#c9963a1f;border:1px solid rgba(201,150,58,.25);color:var(--ath-color-primary)}.ath-alert--error{background:#ef44441f;border:1px solid rgba(239,68,68,.25);color:var(--ath-color-error)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-alert', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"alertClasses\" role=\"alert\">\n  <span class=\"ath-alert__message\">{{ message }}</span>\n  @if (dismissible) {\n    <button class=\"ath-alert__dismiss\" (click)=\"dismiss()\" aria-label=\"Dismiss\">\n      \u00D7\n    </button>\n  }\n</div>\n", styles: [".ath-alert{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);border-radius:var(--ath-border-radius-md);font-size:var(--ath-font-size-sm)}.ath-alert__message{flex:1}.ath-alert__dismiss{display:flex;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:none;border-radius:var(--ath-border-radius-sm);background:transparent;color:inherit;font-size:16px;line-height:1;cursor:pointer;opacity:.7;transition:opacity var(--ath-transition-fast),background var(--ath-transition-fast)}.ath-alert__dismiss:hover{opacity:1;background:#ffffff1a}.ath-alert--info{background:#3b82f61f;border:1px solid rgba(59,130,246,.25);color:var(--ath-color-info)}.ath-alert--success{background:#22c55e1f;border:1px solid rgba(34,197,94,.25);color:var(--ath-color-success)}.ath-alert--warning{background:#c9963a1f;border:1px solid rgba(201,150,58,.25);color:var(--ath-color-primary)}.ath-alert--error{background:#ef44441f;border:1px solid rgba(239,68,68,.25);color:var(--ath-color-error)}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], message: [{
                type: Input,
                args: [{ required: true }]
            }], dismissible: [{
                type: Input
            }], dismissed: [{
                type: Output
            }] } });

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
class AthDialogComponent {
    constructor() {
        /** Whether the dialog is open */
        this.open = false;
        /** Dialog title */
        this.title = '';
        /** Dialog description */
        this.description = '';
        /** Dialog size */
        this.size = 'md';
        /** Whether clicking the backdrop closes the dialog */
        this.closeOnBackdrop = true;
        /** Whether pressing Escape closes the dialog */
        this.closeOnEscape = true;
        /** Close event */
        this.closed = new EventEmitter();
        this.closeIcon = X;
    }
    onEscapeKey() {
        if (this.open && this.closeOnEscape) {
            this.close();
        }
    }
    get dialogClasses() {
        return `ath-dialog__panel ath-dialog__panel--${this.size}`;
    }
    close() {
        this.closed.emit();
    }
    onBackdropClick() {
        if (this.closeOnBackdrop) {
            this.close();
        }
    }
    onBackdropKeydown(event) {
        if (!this.closeOnBackdrop) {
            return;
        }
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.close();
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDialogComponent, isStandalone: true, selector: "ath-dialog", inputs: { open: "open", title: "title", description: "description", size: "size", closeOnBackdrop: "closeOnBackdrop", closeOnEscape: "closeOnEscape" }, outputs: { closed: "closed" }, host: { listeners: { "document:keydown.escape": "onEscapeKey()" } }, ngImport: i0, template: "@if (open) {\n  <div\n    class=\"ath-dialog__backdrop\"\n    (click)=\"onBackdropClick()\"\n    (keydown)=\"onBackdropKeydown($event)\"\n    role=\"button\"\n    tabindex=\"0\"\n    aria-label=\"Close dialog\"\n  ></div>\n  <div class=\"ath-dialog__container\">\n    <div [class]=\"dialogClasses\" role=\"dialog\" aria-modal=\"true\">\n      <!-- Header -->\n      <div class=\"ath-dialog__header\">\n        <div class=\"ath-dialog__header-text\">\n          @if (title) {\n            <h2 class=\"ath-dialog__title\">{{ title }}</h2>\n          }\n          @if (description) {\n            <p class=\"ath-dialog__description\">{{ description }}</p>\n          }\n        </div>\n        <button class=\"ath-dialog__close\" type=\"button\" aria-label=\"Close dialog\" (click)=\"close()\">\n          <lucide-icon [img]=\"closeIcon\" [size]=\"18\" />\n        </button>\n      </div>\n\n      <!-- Body -->\n      <div class=\"ath-dialog__body\">\n        <ng-content />\n      </div>\n\n      <!-- Footer -->\n      <div class=\"ath-dialog__footer\">\n        <ng-content select=\"[slot=footer]\" />\n      </div>\n    </div>\n  </div>\n}\n", styles: [".ath-dialog__backdrop{position:fixed;inset:0;z-index:var(--ath-z-modal-backdrop);background-color:var(--ath-bg-overlay);animation:ath-dialog-backdrop-in .2s ease}.ath-dialog__container{position:fixed;inset:0;z-index:var(--ath-z-modal);display:flex;align-items:center;justify-content:center;padding:var(--ath-space-4);pointer-events:none}.ath-dialog__panel{position:relative;display:flex;flex-direction:column;width:100%;max-height:calc(100vh - var(--ath-space-16));background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-xl);box-shadow:var(--ath-shadow-xl);pointer-events:auto;animation:ath-dialog-panel-in .2s ease}.ath-dialog__panel--sm{max-width:400px}.ath-dialog__panel--md{max-width:520px}.ath-dialog__panel--lg{max-width:680px}.ath-dialog__panel--xl{max-width:860px}.ath-dialog__header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-4);padding:var(--ath-space-6);padding-bottom:0}.ath-dialog__header-text{display:flex;flex-direction:column;gap:var(--ath-space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--ath-font-size-lg);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight)}.ath-dialog__description{margin:0;font-size:var(--ath-font-size-sm);color:var(--ath-text-secondary);line-height:var(--ath-line-height-normal)}.ath-dialog__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-dialog__close:hover{color:var(--ath-text-primary);background-color:var(--ath-bg-tertiary)}.ath-dialog__close:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-dialog__body{flex:1;overflow-y:auto;padding:var(--ath-space-6)}.ath-dialog__footer{display:flex;align-items:center;justify-content:flex-end;gap:var(--ath-space-3);padding:var(--ath-space-4) var(--ath-space-6);border-top:1px solid var(--ath-border-color)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}to{opacity:1}}@keyframes ath-dialog-panel-in{0%{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dialog', standalone: true, imports: [CommonModule, LucideAngularModule, AthButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (open) {\n  <div\n    class=\"ath-dialog__backdrop\"\n    (click)=\"onBackdropClick()\"\n    (keydown)=\"onBackdropKeydown($event)\"\n    role=\"button\"\n    tabindex=\"0\"\n    aria-label=\"Close dialog\"\n  ></div>\n  <div class=\"ath-dialog__container\">\n    <div [class]=\"dialogClasses\" role=\"dialog\" aria-modal=\"true\">\n      <!-- Header -->\n      <div class=\"ath-dialog__header\">\n        <div class=\"ath-dialog__header-text\">\n          @if (title) {\n            <h2 class=\"ath-dialog__title\">{{ title }}</h2>\n          }\n          @if (description) {\n            <p class=\"ath-dialog__description\">{{ description }}</p>\n          }\n        </div>\n        <button class=\"ath-dialog__close\" type=\"button\" aria-label=\"Close dialog\" (click)=\"close()\">\n          <lucide-icon [img]=\"closeIcon\" [size]=\"18\" />\n        </button>\n      </div>\n\n      <!-- Body -->\n      <div class=\"ath-dialog__body\">\n        <ng-content />\n      </div>\n\n      <!-- Footer -->\n      <div class=\"ath-dialog__footer\">\n        <ng-content select=\"[slot=footer]\" />\n      </div>\n    </div>\n  </div>\n}\n", styles: [".ath-dialog__backdrop{position:fixed;inset:0;z-index:var(--ath-z-modal-backdrop);background-color:var(--ath-bg-overlay);animation:ath-dialog-backdrop-in .2s ease}.ath-dialog__container{position:fixed;inset:0;z-index:var(--ath-z-modal);display:flex;align-items:center;justify-content:center;padding:var(--ath-space-4);pointer-events:none}.ath-dialog__panel{position:relative;display:flex;flex-direction:column;width:100%;max-height:calc(100vh - var(--ath-space-16));background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-xl);box-shadow:var(--ath-shadow-xl);pointer-events:auto;animation:ath-dialog-panel-in .2s ease}.ath-dialog__panel--sm{max-width:400px}.ath-dialog__panel--md{max-width:520px}.ath-dialog__panel--lg{max-width:680px}.ath-dialog__panel--xl{max-width:860px}.ath-dialog__header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-4);padding:var(--ath-space-6);padding-bottom:0}.ath-dialog__header-text{display:flex;flex-direction:column;gap:var(--ath-space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--ath-font-size-lg);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight)}.ath-dialog__description{margin:0;font-size:var(--ath-font-size-sm);color:var(--ath-text-secondary);line-height:var(--ath-line-height-normal)}.ath-dialog__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-dialog__close:hover{color:var(--ath-text-primary);background-color:var(--ath-bg-tertiary)}.ath-dialog__close:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-dialog__body{flex:1;overflow-y:auto;padding:var(--ath-space-6)}.ath-dialog__footer{display:flex;align-items:center;justify-content:flex-end;gap:var(--ath-space-3);padding:var(--ath-space-4) var(--ath-space-6);border-top:1px solid var(--ath-border-color)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}to{opacity:1}}@keyframes ath-dialog-panel-in{0%{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}\n"] }]
        }], propDecorators: { open: [{
                type: Input
            }], title: [{
                type: Input
            }], description: [{
                type: Input
            }], size: [{
                type: Input
            }], closeOnBackdrop: [{
                type: Input
            }], closeOnEscape: [{
                type: Input
            }], closed: [{
                type: Output
            }], onEscapeKey: [{
                type: HostListener,
                args: ['document:keydown.escape']
            }] } });

/**
 * Toast Service
 *
 * Global notification service for displaying toast messages.
 *
 * @example
 * constructor(private toast: AthToastService) {}
 * this.toast.success('Item created');
 * this.toast.error('Something went wrong');
 */
class AthToastService {
    constructor() {
        this.toastsSignal = signal([]);
        this.toasts = this.toastsSignal.asReadonly();
    }
    success(message, duration = 4000) {
        this.add({ variant: 'success', message, duration });
    }
    error(message, duration = 6000) {
        this.add({ variant: 'error', message, duration });
    }
    warning(message, duration = 5000) {
        this.add({ variant: 'warning', message, duration });
    }
    info(message, duration = 4000) {
        this.add({ variant: 'info', message, duration });
    }
    remove(id) {
        this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
    }
    add(options) {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        const toast = { id, ...options };
        this.toastsSignal.update(toasts => [...toasts, toast]);
        if (options.duration && options.duration > 0) {
            setTimeout(() => this.remove(id), options.duration);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * Athene Toast Container Component
 *
 * Renders global toast notifications. Place once in the root component.
 *
 * @example
 * <!-- app.component.html -->
 * <router-outlet />
 * <ath-toast-container />
 */
class AthToastContainerComponent {
    constructor(toastService) {
        this.toastService = toastService;
        this.successIcon = CheckCircle;
        this.errorIcon = AlertCircle;
        this.warningIcon = AlertTriangle;
        this.infoIcon = Info;
        this.closeIcon = X;
    }
    get toasts() {
        return this.toastService.toasts();
    }
    getIcon(variant) {
        switch (variant) {
            case 'success': return this.successIcon;
            case 'error': return this.errorIcon;
            case 'warning': return this.warningIcon;
            case 'info': return this.infoIcon;
        }
    }
    dismiss(id) {
        this.toastService.remove(id);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastContainerComponent, deps: [{ token: AthToastService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthToastContainerComponent, isStandalone: true, selector: "ath-toast-container", ngImport: i0, template: "<div class=\"ath-toast-container\" aria-live=\"polite\">\n  @for (toast of toasts; track toast.id) {\n    <div class=\"ath-toast\" [class]=\"'ath-toast ath-toast--' + toast.variant\">\n      <lucide-icon [img]=\"getIcon(toast.variant)\" [size]=\"18\" class=\"ath-toast__icon\" />\n      <span class=\"ath-toast__message\">{{ toast.message }}</span>\n      <button\n        type=\"button\"\n        class=\"ath-toast__close\"\n        [attr.aria-label]=\"'Dismiss notification: ' + toast.message\"\n        (click)=\"dismiss(toast.id)\"\n      >\n        <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n      </button>\n    </div>\n  }\n</div>\n", styles: [".ath-toast-container{position:fixed;top:var(--ath-space-4);right:var(--ath-space-4);z-index:var(--ath-z-toast);display:flex;flex-direction:column;gap:var(--ath-space-2);max-width:420px;width:100%;pointer-events:none}.ath-toast{display:flex;align-items:flex-start;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg);pointer-events:auto;animation:ath-toast-in .2s ease}.ath-toast--success{border-left:3px solid var(--ath-color-success)}.ath-toast--success .ath-toast__icon{color:var(--ath-color-success)}.ath-toast--error{border-left:3px solid var(--ath-color-error)}.ath-toast--error .ath-toast__icon{color:var(--ath-color-error)}.ath-toast--warning{border-left:3px solid var(--ath-color-warning)}.ath-toast--warning .ath-toast__icon{color:var(--ath-color-warning)}.ath-toast--info{border-left:3px solid var(--ath-color-info)}.ath-toast--info .ath-toast__icon{color:var(--ath-color-info)}.ath-toast__icon{flex-shrink:0;margin-top:1px}.ath-toast__message{flex:1;font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);line-height:var(--ath-line-height-normal)}.ath-toast__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast)}.ath-toast__close:hover{color:var(--ath-text-primary)}@keyframes ath-toast-in{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-toast-container', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-toast-container\" aria-live=\"polite\">\n  @for (toast of toasts; track toast.id) {\n    <div class=\"ath-toast\" [class]=\"'ath-toast ath-toast--' + toast.variant\">\n      <lucide-icon [img]=\"getIcon(toast.variant)\" [size]=\"18\" class=\"ath-toast__icon\" />\n      <span class=\"ath-toast__message\">{{ toast.message }}</span>\n      <button\n        type=\"button\"\n        class=\"ath-toast__close\"\n        [attr.aria-label]=\"'Dismiss notification: ' + toast.message\"\n        (click)=\"dismiss(toast.id)\"\n      >\n        <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n      </button>\n    </div>\n  }\n</div>\n", styles: [".ath-toast-container{position:fixed;top:var(--ath-space-4);right:var(--ath-space-4);z-index:var(--ath-z-toast);display:flex;flex-direction:column;gap:var(--ath-space-2);max-width:420px;width:100%;pointer-events:none}.ath-toast{display:flex;align-items:flex-start;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg);pointer-events:auto;animation:ath-toast-in .2s ease}.ath-toast--success{border-left:3px solid var(--ath-color-success)}.ath-toast--success .ath-toast__icon{color:var(--ath-color-success)}.ath-toast--error{border-left:3px solid var(--ath-color-error)}.ath-toast--error .ath-toast__icon{color:var(--ath-color-error)}.ath-toast--warning{border-left:3px solid var(--ath-color-warning)}.ath-toast--warning .ath-toast__icon{color:var(--ath-color-warning)}.ath-toast--info{border-left:3px solid var(--ath-color-info)}.ath-toast--info .ath-toast__icon{color:var(--ath-color-info)}.ath-toast__icon{flex-shrink:0;margin-top:1px}.ath-toast__message{flex:1;font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);line-height:var(--ath-line-height-normal)}.ath-toast__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast)}.ath-toast__close:hover{color:var(--ath-text-primary)}@keyframes ath-toast-in{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}\n"] }]
        }], ctorParameters: () => [{ type: AthToastService }] });

/**
 * Athene Spinner Component
 *
 * Loading indicator for async operations.
 *
 * @example
 * <ath-spinner />
 * <ath-spinner size="lg" />
 */
class AthSpinnerComponent {
    constructor() {
        /** Spinner size */
        this.size = 'md';
    }
    get spinnerClasses() {
        return `ath-spinner ath-spinner--${this.size}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthSpinnerComponent, isStandalone: true, selector: "ath-spinner", inputs: { size: "size" }, ngImport: i0, template: "<div [class]=\"spinnerClasses\" role=\"status\" aria-label=\"Loading\">\n  <svg viewBox=\"0 0 24 24\" fill=\"none\" class=\"ath-spinner__svg\">\n    <circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"3\" class=\"ath-spinner__track\" />\n    <path d=\"M12 2a10 10 0 0 1 10 10\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" class=\"ath-spinner__arc\" />\n  </svg>\n</div>\n", styles: [".ath-spinner{display:inline-flex;align-items:center;justify-content:center;color:var(--ath-color-primary)}.ath-spinner--sm{width:16px;height:16px}.ath-spinner--md{width:24px;height:24px}.ath-spinner--lg{width:36px;height:36px}.ath-spinner__svg{width:100%;height:100%;animation:ath-spinner-rotate 1s linear infinite}.ath-spinner__track{opacity:.15}.ath-spinner__arc{opacity:1}@keyframes ath-spinner-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-spinner', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"spinnerClasses\" role=\"status\" aria-label=\"Loading\">\n  <svg viewBox=\"0 0 24 24\" fill=\"none\" class=\"ath-spinner__svg\">\n    <circle cx=\"12\" cy=\"12\" r=\"10\" stroke=\"currentColor\" stroke-width=\"3\" class=\"ath-spinner__track\" />\n    <path d=\"M12 2a10 10 0 0 1 10 10\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" class=\"ath-spinner__arc\" />\n  </svg>\n</div>\n", styles: [".ath-spinner{display:inline-flex;align-items:center;justify-content:center;color:var(--ath-color-primary)}.ath-spinner--sm{width:16px;height:16px}.ath-spinner--md{width:24px;height:24px}.ath-spinner--lg{width:36px;height:36px}.ath-spinner__svg{width:100%;height:100%;animation:ath-spinner-rotate 1s linear infinite}.ath-spinner__track{opacity:.15}.ath-spinner__arc{opacity:1}@keyframes ath-spinner-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }] } });

/**
 * Athene Skeleton Component
 *
 * Loading placeholder for content
 *
 * @example
 * <ath-skeleton variant="text" width="200px" />
 * <ath-skeleton variant="circular" width="48px" height="48px" />
 * <ath-skeleton variant="rectangular" height="200px" />
 */
class AthSkeletonComponent {
    constructor() {
        /** Skeleton variant */
        this.variant = 'text';
        /** Width (CSS value) */
        this.width = '100%';
        /** Height (CSS value) */
        this.height = '';
        /** Animation enabled */
        this.animated = true;
    }
    get skeletonClasses() {
        return [
            'ath-skeleton',
            `ath-skeleton--${this.variant}`,
            this.animated ? 'ath-skeleton--animated' : '',
        ].filter(Boolean).join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthSkeletonComponent, isStandalone: true, selector: "ath-skeleton", inputs: { variant: "variant", width: "width", height: "height", animated: "animated" }, ngImport: i0, template: "<div\n  [class]=\"skeletonClasses\"\n  [style.width]=\"width\"\n  [style.height]=\"height\"\n></div>\n", styles: [".ath-skeleton{background-color:var(--ath-bg-tertiary)}.ath-skeleton--text{height:1em;border-radius:var(--ath-border-radius-sm)}.ath-skeleton--circular{border-radius:var(--ath-border-radius-full)}.ath-skeleton--rectangular{border-radius:var(--ath-border-radius-md)}.ath-skeleton--animated{background:linear-gradient(90deg,var(--ath-bg-tertiary) 25%,var(--ath-bg-secondary) 50%,var(--ath-bg-tertiary) 75%);background-size:200% 100%;animation:skeleton-shimmer 1.5s ease-in-out infinite}@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-skeleton', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [class]=\"skeletonClasses\"\n  [style.width]=\"width\"\n  [style.height]=\"height\"\n></div>\n", styles: [".ath-skeleton{background-color:var(--ath-bg-tertiary)}.ath-skeleton--text{height:1em;border-radius:var(--ath-border-radius-sm)}.ath-skeleton--circular{border-radius:var(--ath-border-radius-full)}.ath-skeleton--rectangular{border-radius:var(--ath-border-radius-md)}.ath-skeleton--animated{background:linear-gradient(90deg,var(--ath-bg-tertiary) 25%,var(--ath-bg-secondary) 50%,var(--ath-bg-tertiary) 75%);background-size:200% 100%;animation:skeleton-shimmer 1.5s ease-in-out infinite}@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], animated: [{
                type: Input
            }] } });
/**
 * Skeleton Table Component
 *
 * Pre-built skeleton for table loading states
 */
class AthSkeletonTableComponent {
    constructor() {
        /** Number of rows */
        this.rows = 5;
        /** Column widths in percent */
        this.columns = [20, 30, 25, 25];
    }
    get rowsArray() {
        return Array.from({ length: this.rows }, (_, i) => i);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSkeletonTableComponent, isStandalone: true, selector: "ath-skeleton-table", inputs: { rows: "rows", columns: "columns" }, ngImport: i0, template: "<div class=\"ath-skeleton-table\">\n  <!-- Header -->\n  <div class=\"ath-skeleton-table__header\">\n    @for (col of columns; track col) {\n      <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"20px\" />\n    }\n  </div>\n\n  <!-- Rows -->\n  @for (row of rowsArray; track row) {\n    <div class=\"ath-skeleton-table__row\">\n      @for (col of columns; track col) {\n        <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"16px\" />\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-skeleton-table{display:flex;flex-direction:column;gap:var(--ath-space-3)}.ath-skeleton-table__header{display:flex;gap:var(--ath-space-4);padding-bottom:var(--ath-space-3);border-bottom:1px solid var(--ath-border-color)}.ath-skeleton-table__row{display:flex;gap:var(--ath-space-4);padding:var(--ath-space-2) 0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthSkeletonComponent, selector: "ath-skeleton", inputs: ["variant", "width", "height", "animated"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-skeleton-table', standalone: true, imports: [CommonModule, AthSkeletonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-skeleton-table\">\n  <!-- Header -->\n  <div class=\"ath-skeleton-table__header\">\n    @for (col of columns; track col) {\n      <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"20px\" />\n    }\n  </div>\n\n  <!-- Rows -->\n  @for (row of rowsArray; track row) {\n    <div class=\"ath-skeleton-table__row\">\n      @for (col of columns; track col) {\n        <ath-skeleton variant=\"text\" [width]=\"col + '%'\" height=\"16px\" />\n      }\n    </div>\n  }\n</div>\n", styles: [".ath-skeleton-table{display:flex;flex-direction:column;gap:var(--ath-space-3)}.ath-skeleton-table__header{display:flex;gap:var(--ath-space-4);padding-bottom:var(--ath-space-3);border-bottom:1px solid var(--ath-border-color)}.ath-skeleton-table__row{display:flex;gap:var(--ath-space-4);padding:var(--ath-space-2) 0}\n"] }]
        }], propDecorators: { rows: [{
                type: Input
            }], columns: [{
                type: Input
            }] } });
/**
 * Skeleton Card Component
 *
 * Pre-built skeleton for card loading states
 */
class AthSkeletonCardComponent {
    constructor() {
        /** Show image placeholder */
        this.showImage = true;
        /** Show action buttons */
        this.showActions = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSkeletonCardComponent, isStandalone: true, selector: "ath-skeleton-card", inputs: { showImage: "showImage", showActions: "showActions" }, ngImport: i0, template: "<div class=\"ath-skeleton-card\">\n  @if (showImage) {\n    <ath-skeleton variant=\"rectangular\" height=\"160px\" />\n  }\n  <div class=\"ath-skeleton-card__content\">\n    <ath-skeleton variant=\"text\" width=\"70%\" height=\"24px\" />\n    <ath-skeleton variant=\"text\" width=\"100%\" height=\"16px\" />\n    <ath-skeleton variant=\"text\" width=\"90%\" height=\"16px\" />\n    @if (showActions) {\n      <div class=\"ath-skeleton-card__actions\">\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n      </div>\n    }\n  </div>\n</div>\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthSkeletonComponent, selector: "ath-skeleton", inputs: ["variant", "width", "height", "animated"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-skeleton-card', standalone: true, imports: [CommonModule, AthSkeletonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-skeleton-card\">\n  @if (showImage) {\n    <ath-skeleton variant=\"rectangular\" height=\"160px\" />\n  }\n  <div class=\"ath-skeleton-card__content\">\n    <ath-skeleton variant=\"text\" width=\"70%\" height=\"24px\" />\n    <ath-skeleton variant=\"text\" width=\"100%\" height=\"16px\" />\n    <ath-skeleton variant=\"text\" width=\"90%\" height=\"16px\" />\n    @if (showActions) {\n      <div class=\"ath-skeleton-card__actions\">\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n        <ath-skeleton variant=\"rectangular\" width=\"80px\" height=\"32px\" />\n      </div>\n    }\n  </div>\n</div>\n" }]
        }], propDecorators: { showImage: [{
                type: Input
            }], showActions: [{
                type: Input
            }] } });

/**
 * Athene Tooltip Directive
 *
 * Shows a tooltip on hover.
 *
 * @example
 * <button [athTooltip]="'Click to save'" tooltipPosition="bottom">Save</button>
 */
class AthTooltipDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        /** Tooltip text */
        this.text = '';
        /** Tooltip position */
        this.tooltipPosition = 'top';
        this.tooltipElement = null;
        this.showTimeout = null;
        this.hideTimeout = null;
        this.mouseEnterListener = null;
        this.mouseLeaveListener = null;
        this.mouseEnterListener = this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.show());
        this.mouseLeaveListener = this.renderer.listen(this.el.nativeElement, 'mouseleave', () => this.hide());
    }
    ngOnDestroy() {
        this.removeTooltip();
        if (this.mouseEnterListener)
            this.mouseEnterListener();
        if (this.mouseLeaveListener)
            this.mouseLeaveListener();
    }
    show() {
        if (!this.text)
            return;
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        this.showTimeout = setTimeout(() => {
            this.createTooltip();
        }, 300);
    }
    hide() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
        this.hideTimeout = setTimeout(() => {
            this.removeTooltip();
        }, 100);
    }
    createTooltip() {
        if (this.tooltipElement)
            return;
        this.tooltipElement = this.renderer.createElement('div');
        this.renderer.addClass(this.tooltipElement, 'ath-tooltip');
        this.renderer.addClass(this.tooltipElement, `ath-tooltip--${this.tooltipPosition}`);
        this.tooltipElement.textContent = this.text;
        this.renderer.appendChild(document.body, this.tooltipElement);
        this.positionTooltip();
        requestAnimationFrame(() => {
            if (this.tooltipElement) {
                this.renderer.addClass(this.tooltipElement, 'ath-tooltip--visible');
            }
        });
    }
    positionTooltip() {
        if (!this.tooltipElement)
            return;
        const hostRect = this.el.nativeElement.getBoundingClientRect();
        const tooltipRect = this.tooltipElement.getBoundingClientRect();
        const gap = 8;
        let top = 0;
        let left = 0;
        switch (this.tooltipPosition) {
            case 'top':
                top = hostRect.top - tooltipRect.height - gap;
                left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = hostRect.bottom + gap;
                left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                left = hostRect.left - tooltipRect.width - gap;
                break;
            case 'right':
                top = hostRect.top + (hostRect.height - tooltipRect.height) / 2;
                left = hostRect.right + gap;
                break;
        }
        this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    }
    removeTooltip() {
        if (this.tooltipElement) {
            this.tooltipElement.remove();
            this.tooltipElement = null;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTooltipDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.14", type: AthTooltipDirective, isStandalone: true, selector: "[athTooltip]", inputs: { text: ["athTooltip", "text"], tooltipPosition: "tooltipPosition" }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[athTooltip]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { text: [{
                type: Input,
                args: ['athTooltip']
            }], tooltipPosition: [{
                type: Input
            }] } });

/**
 * Page-level banner for system-wide notices (maintenance, trial-ending,
 * plan-limit, deprecation, etc.).
 *
 * Lives at the top of a layout — typically full-width. For inline alerts
 * within forms or cards use `<ath-alert>`.
 *
 * @example
 * <ath-banner tone="warning" title="Maintenance scheduled">
 *   Athene will be unavailable on Sat 22:00–22:30 CET.
 * </ath-banner>
 * <ath-banner tone="danger" title="Trial ends in 2 days" [dismissible]="true"
 *             (dismissed)="hide()">
 *   Add a payment method to keep your Pro features.
 * </ath-banner>
 */
class AthBannerComponent {
    constructor() {
        this.tone = 'info';
        this.title = null;
        this.dismissible = false;
        this.dismissed = new EventEmitter();
        this.closeIcon = X;
    }
    get hostTone() {
        return this.tone;
    }
    get hostRole() {
        return this.tone === 'danger' || this.tone === 'warning' ? 'alert' : 'status';
    }
    get icon() {
        switch (this.tone) {
            case 'warning': return AlertTriangle;
            case 'danger': return AlertOctagon;
            case 'success': return CheckCircle2;
            case 'info':
            default: return Info;
        }
    }
    onDismiss() {
        this.dismissed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBannerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthBannerComponent, isStandalone: true, selector: "ath-banner", inputs: { tone: "tone", title: "title", dismissible: "dismissible" }, outputs: { dismissed: "dismissed" }, host: { properties: { "attr.data-tone": "this.hostTone", "attr.role": "this.hostRole" } }, ngImport: i0, template: "<span class=\"ath-banner__icon\" aria-hidden=\"true\">\n  <lucide-icon [img]=\"icon\" [size]=\"16\" />\n</span>\n<div class=\"ath-banner__body\">\n  @if (title) {\n    <strong class=\"ath-banner__title\">{{ title }}</strong>\n  }\n  <span class=\"ath-banner__message\"><ng-content /></span>\n</div>\n<div class=\"ath-banner__actions\">\n  <ng-content select=\"[banner-action]\" />\n  @if (dismissible) {\n    <button\n      type=\"button\"\n      class=\"ath-banner__close\"\n      aria-label=\"Dismiss\"\n      (click)=\"onDismiss()\"\n    >\n      <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n    </button>\n  }\n</div>\n", styles: [":host{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-top:1px solid transparent;border-bottom:1px solid transparent;font-family:var(--font-sans);font-size:13px;line-height:1.5}.ath-banner__icon{flex-shrink:0;display:inline-flex;align-items:center;margin-top:1px}.ath-banner__body{flex:1;min-width:0}.ath-banner__title{display:inline;margin-right:6px;font-weight:600;letter-spacing:-.005em}.ath-banner__message{display:inline;color:inherit}.ath-banner__actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.ath-banner__close{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;background:transparent;border:0;border-radius:var(--r-sm);color:inherit;opacity:.7;cursor:pointer;transition:opacity var(--t-fast),background var(--t-fast)}.ath-banner__close:hover{opacity:1;background:var(--hover-strong)}:host([data-tone=info]){background:var(--blue-tint);color:var(--blue);border-color:var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent)}:host([data-tone=info]) .ath-banner__title{color:var(--fg)}:host([data-tone=info]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=warning]){background:var(--amber-tint);color:var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent)}:host([data-tone=warning]) .ath-banner__title{color:var(--fg)}:host([data-tone=warning]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=danger]){background:var(--red-tint);color:var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent)}:host([data-tone=danger]) .ath-banner__title{color:var(--fg)}:host([data-tone=danger]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=success]){background:var(--green-tint);color:var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-tone=success]) .ath-banner__title{color:var(--fg)}:host([data-tone=success]) .ath-banner__message{color:var(--fg-2)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-banner', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-banner__icon\" aria-hidden=\"true\">\n  <lucide-icon [img]=\"icon\" [size]=\"16\" />\n</span>\n<div class=\"ath-banner__body\">\n  @if (title) {\n    <strong class=\"ath-banner__title\">{{ title }}</strong>\n  }\n  <span class=\"ath-banner__message\"><ng-content /></span>\n</div>\n<div class=\"ath-banner__actions\">\n  <ng-content select=\"[banner-action]\" />\n  @if (dismissible) {\n    <button\n      type=\"button\"\n      class=\"ath-banner__close\"\n      aria-label=\"Dismiss\"\n      (click)=\"onDismiss()\"\n    >\n      <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n    </button>\n  }\n</div>\n", styles: [":host{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-top:1px solid transparent;border-bottom:1px solid transparent;font-family:var(--font-sans);font-size:13px;line-height:1.5}.ath-banner__icon{flex-shrink:0;display:inline-flex;align-items:center;margin-top:1px}.ath-banner__body{flex:1;min-width:0}.ath-banner__title{display:inline;margin-right:6px;font-weight:600;letter-spacing:-.005em}.ath-banner__message{display:inline;color:inherit}.ath-banner__actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.ath-banner__close{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;background:transparent;border:0;border-radius:var(--r-sm);color:inherit;opacity:.7;cursor:pointer;transition:opacity var(--t-fast),background var(--t-fast)}.ath-banner__close:hover{opacity:1;background:var(--hover-strong)}:host([data-tone=info]){background:var(--blue-tint);color:var(--blue);border-color:var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent)}:host([data-tone=info]) .ath-banner__title{color:var(--fg)}:host([data-tone=info]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=warning]){background:var(--amber-tint);color:var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent)}:host([data-tone=warning]) .ath-banner__title{color:var(--fg)}:host([data-tone=warning]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=danger]){background:var(--red-tint);color:var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent)}:host([data-tone=danger]) .ath-banner__title{color:var(--fg)}:host([data-tone=danger]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=success]){background:var(--green-tint);color:var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-tone=success]) .ath-banner__title{color:var(--fg)}:host([data-tone=success]) .ath-banner__message{color:var(--fg-2)}\n"] }]
        }], propDecorators: { tone: [{
                type: Input
            }], title: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], dismissed: [{
                type: Output
            }], hostTone: [{
                type: HostBinding,
                args: ['attr.data-tone']
            }], hostRole: [{
                type: HostBinding,
                args: ['attr.role']
            }] } });

/**
 * Athene Kbd (Keyboard) Component
 *
 * Displays keyboard shortcuts in a styled badge
 *
 * @example
 * <ath-kbd>Ctrl</ath-kbd>
 * <ath-kbd>⌘</ath-kbd>
 * <ath-kbd size="sm">K</ath-kbd>
 */
class AthKbdComponent {
    constructor() {
        /** Size variant */
        this.size = 'md';
    }
    get kbdClasses() {
        return `ath-kbd ath-kbd--${this.size}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthKbdComponent, isStandalone: true, selector: "ath-kbd", inputs: { size: "size" }, ngImport: i0, template: "<kbd [class]=\"kbdClasses\">\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;min-width:1.5em;padding:var(--ath-space-1);font-family:var(--ath-font-family);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);box-shadow:0 1px 0 var(--ath-border-color);white-space:nowrap}.ath-kbd--sm{font-size:var(--ath-font-size-xs);padding:1px var(--ath-space-1)}.ath-kbd--md{font-size:var(--ath-font-size-sm);padding:2px var(--ath-space-1)}.ath-kbd--lg{font-size:var(--ath-font-size-md);padding:var(--ath-space-1) var(--ath-space-2)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-kbd', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<kbd [class]=\"kbdClasses\">\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;min-width:1.5em;padding:var(--ath-space-1);font-family:var(--ath-font-family);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);box-shadow:0 1px 0 var(--ath-border-color);white-space:nowrap}.ath-kbd--sm{font-size:var(--ath-font-size-xs);padding:1px var(--ath-space-1)}.ath-kbd--md{font-size:var(--ath-font-size-sm);padding:2px var(--ath-space-1)}.ath-kbd--lg{font-size:var(--ath-font-size-md);padding:var(--ath-space-1) var(--ath-space-2)}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }] } });

/**
 * Athene Copy Button Component
 *
 * One-click copy-to-clipboard with success feedback.
 *
 * @example
 * <ath-copy-button [value]="apiKey" />
 * <ath-copy-button [value]="secretToken" label="Copy token" />
 */
class AthCopyButtonComponent {
    constructor(cdr) {
        this.cdr = cdr;
        /** Value to copy to clipboard */
        this.value = '';
        /** Optional tooltip/label */
        this.label = 'Copy';
        this.copied = false;
        this.copyIcon = Copy;
        this.checkIcon = Check;
        this.resetTimeout = null;
    }
    async copy() {
        try {
            await navigator.clipboard.writeText(this.value);
            this.copied = true;
            this.cdr.markForCheck();
            if (this.resetTimeout)
                clearTimeout(this.resetTimeout);
            this.resetTimeout = setTimeout(() => {
                this.copied = false;
                this.cdr.markForCheck();
            }, 2000);
        }
        catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = this.value;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.copied = true;
            this.cdr.markForCheck();
            if (this.resetTimeout)
                clearTimeout(this.resetTimeout);
            this.resetTimeout = setTimeout(() => {
                this.copied = false;
                this.cdr.markForCheck();
            }, 2000);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCopyButtonComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthCopyButtonComponent, isStandalone: true, selector: "ath-copy-button", inputs: { value: "value", label: "label" }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied\"\n  [attr.aria-label]=\"copied ? 'Copied' : label\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:all var(--ath-transition-fast)}.ath-copy-button:hover{color:var(--ath-text-primary);border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-copy-button--copied{color:var(--ath-color-success);border-color:var(--ath-color-success)}.ath-copy-button--copied:hover{color:var(--ath-color-success)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCopyButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-copy-button', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied\"\n  [attr.aria-label]=\"copied ? 'Copied' : label\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:all var(--ath-transition-fast)}.ath-copy-button:hover{color:var(--ath-text-primary);border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-copy-button--copied{color:var(--ath-color-success);border-color:var(--ath-color-success)}.ath-copy-button--copied:hover{color:var(--ath-color-success)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { value: [{
                type: Input,
                args: [{ required: true }]
            }], label: [{
                type: Input
            }] } });

/**
 * Live time-tracking pill for the topbar. **Stateless about ticking** —
 * the consumer (TimeTrackingService) feeds `seconds` and reacts to `toggled`.
 *
 * This keeps the component pure (testable) while letting the service stay
 * authoritative about the real running time.
 *
 * @example
 * <ath-timer-pill
 *   [active]="timer.running()"
 *   [seconds]="timer.elapsed()"
 *   [ticketKey]="timer.ticketKey()"
 *   (toggled)="timer.toggle()" />
 */
class AthTimerPillComponent {
    constructor() {
        this._seconds = signal(0);
        this.active = false;
        this.ticketKey = null;
        /** Tooltip override; otherwise auto-built from state. */
        this.tooltip = null;
        this.toggled = new EventEmitter();
        this.time = computed(() => {
            const total = this._seconds();
            const hours = Math.floor(total / 3600);
            const minutes = Math.floor((total % 3600) / 60);
            const seconds = total % 60;
            const mm = String(minutes).padStart(2, '0');
            const ss = String(seconds).padStart(2, '0');
            if (hours > 0) {
                return `${hours}:${mm}:${ss}`;
            }
            return `${mm}:${ss}`;
        });
    }
    set seconds(value) {
        this._seconds.set(Math.max(0, Math.floor(value)));
    }
    get seconds() {
        return this._seconds();
    }
    get hostActive() {
        return this.active ? 'true' : 'false';
    }
    get hostWarning() {
        // After 8h surfaces a warn color; after 24h, an alert color
        return this._seconds() >= 24 * 3600 ? 'alert'
            : this._seconds() >= 8 * 3600 ? 'warn'
                : null;
    }
    get effectiveTooltip() {
        if (this.tooltip)
            return this.tooltip;
        if (!this.active)
            return 'Click to resume timer';
        if (this.ticketKey)
            return `Tracking ${this.ticketKey} · click to pause`;
        return 'Click to pause timer';
    }
    onToggle() {
        this.toggled.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimerPillComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTimerPillComponent, isStandalone: true, selector: "ath-timer-pill", inputs: { active: "active", seconds: "seconds", ticketKey: "ticketKey", tooltip: "tooltip" }, outputs: { toggled: "toggled" }, host: { properties: { "attr.data-active": "this.hostActive", "attr.data-warning": "this.hostWarning" } }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-tpill\"\n  [title]=\"effectiveTooltip\"\n  (click)=\"onToggle()\"\n>\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">\u00B7</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey }}</span>\n  }\n</button>\n", styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:999px;font-family:var(--font-sans);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:7px;height:7px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill{background:var(--green-tint);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-active=true]) .ath-tpill__dot{background:var(--green);box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 18%,transparent);animation:ath-tpill-pulse 1.6s ease-in-out infinite}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-pulse{0%,to{box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 18%,transparent)}50%{box-shadow:0 0 0 5px color-mix(in srgb,var(--green) 10%,transparent)}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimerPillComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timer-pill', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-tpill\"\n  [title]=\"effectiveTooltip\"\n  (click)=\"onToggle()\"\n>\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">\u00B7</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey }}</span>\n  }\n</button>\n", styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:999px;font-family:var(--font-sans);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:7px;height:7px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill{background:var(--green-tint);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-active=true]) .ath-tpill__dot{background:var(--green);box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 18%,transparent);animation:ath-tpill-pulse 1.6s ease-in-out infinite}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-pulse{0%,to{box-shadow:0 0 0 3px color-mix(in srgb,var(--green) 18%,transparent)}50%{box-shadow:0 0 0 5px color-mix(in srgb,var(--green) 10%,transparent)}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"] }]
        }], propDecorators: { active: [{
                type: Input
            }], seconds: [{
                type: Input
            }], ticketKey: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], toggled: [{
                type: Output
            }], hostActive: [{
                type: HostBinding,
                args: ['attr.data-active']
            }], hostWarning: [{
                type: HostBinding,
                args: ['attr.data-warning']
            }] } });

/**
 * Pagination control. Two modes:
 *  - `numbered`: Prev / 1 / 2 / 3 / … / N / Next  (requires `totalPages`)
 *  - `cursor`:   ← Previous · "Showing X–Y of Z" · Next →  (use `hasPrev`/`hasNext`)
 *
 * Cursor mode is preferred for large datasets where `totalPages` is unknown
 * (e.g., Meilisearch results, infinite-scroll alternatives).
 *
 * @example
 * <ath-pagination [page]="page" [totalPages]="20" (pageChange)="page = $event" />
 * <ath-pagination mode="cursor" [hasPrev]="false" [hasNext]="true"
 *   summary="Showing 1–30 of 412" (previous)="loadPrev()" (next)="loadNext()" />
 */
class AthPaginationComponent {
    constructor() {
        this.mode = 'numbered';
        // --- Numbered mode ---
        this._page = signal(1);
        this.totalPages = 1;
        /** How many siblings of the current page to always show (default 1). */
        this.siblingCount = 1;
        this.pageChange = new EventEmitter();
        // --- Cursor mode ---
        this.hasPrev = false;
        this.hasNext = false;
        /** Caption shown between prev/next in cursor mode (e.g., "1–30 of 412"). */
        this.summary = '';
        this.previous = new EventEmitter();
        this.next = new EventEmitter();
        this.prevIcon = ChevronLeft;
        this.nextIcon = ChevronRight;
        this.firstIcon = ChevronsLeft;
        this.lastIcon = ChevronsRight;
        this.ellipsisIcon = MoreHorizontal;
        this.pages = computed(() => {
            const total = Math.max(1, this.totalPages);
            const current = this._page();
            const siblings = Math.max(0, this.siblingCount);
            // Always show first + last; show siblings around current; gaps → ellipsis
            if (total <= 5 + siblings * 2) {
                return range(1, total);
            }
            const leftSibling = Math.max(current - siblings, 2);
            const rightSibling = Math.min(current + siblings, total - 1);
            const showLeftEllipsis = leftSibling > 3;
            const showRightEllipsis = rightSibling < total - 2;
            const result = [1];
            if (showLeftEllipsis) {
                result.push('ellipsis');
            }
            else {
                for (let i = 2; i < leftSibling; i++)
                    result.push(i);
            }
            for (let i = leftSibling; i <= rightSibling; i++)
                result.push(i);
            if (showRightEllipsis) {
                result.push('ellipsis');
            }
            else {
                for (let i = rightSibling + 1; i < total; i++)
                    result.push(i);
            }
            result.push(total);
            return result;
        });
    }
    set page(v) {
        this._page.set(Math.max(1, v));
    }
    get page() {
        return this._page();
    }
    goTo(page) {
        if (page < 1 || page > this.totalPages || page === this._page())
            return;
        this.pageChange.emit(page);
    }
    goPrev() {
        if (this.mode === 'cursor') {
            if (this.hasPrev)
                this.previous.emit();
        }
        else {
            this.goTo(this._page() - 1);
        }
    }
    goNext() {
        if (this.mode === 'cursor') {
            if (this.hasNext)
                this.next.emit();
        }
        else {
            this.goTo(this._page() + 1);
        }
    }
    goFirst() {
        this.goTo(1);
    }
    goLast() {
        this.goTo(this.totalPages);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPaginationComponent, isStandalone: true, selector: "ath-pagination", inputs: { mode: "mode", page: "page", totalPages: "totalPages", siblingCount: "siblingCount", hasPrev: "hasPrev", hasNext: "hasNext", summary: "summary" }, outputs: { pageChange: "pageChange", previous: "previous", next: "next" }, ngImport: i0, template: "@if (mode === 'numbered') {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"'First page'\"\n    (click)=\"goFirst()\"\n  >\n    <lucide-icon [img]=\"firstIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"'Previous page'\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n  </button>\n\n  @for (item of pages(); track $index) {\n    @if (item === 'ellipsis') {\n      <span class=\"ath-page__ellipsis\" aria-hidden=\"true\">\n        <lucide-icon [img]=\"ellipsisIcon\" [size]=\"12\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        class=\"ath-page__btn\"\n        [class.ath-page__btn--active]=\"item === page\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"'Page ' + item\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"'Next page'\"\n    (click)=\"goNext()\"\n  >\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"'Last page'\"\n    (click)=\"goLast()\"\n  >\n    <lucide-icon [img]=\"lastIcon\" [size]=\"14\" />\n  </button>\n} @else {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasPrev\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n    <span>Previous</span>\n  </button>\n  @if (summary) {\n    <span class=\"ath-page__summary\">{{ summary }}</span>\n  }\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasNext\"\n    (click)=\"goNext()\"\n  >\n    <span>Next</span>\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans)}.ath-page__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:28px;height:28px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;font-feature-settings:\"tnum\";color:var(--fg-2);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast)}.ath-page__btn:hover:not(:disabled):not(.ath-page__btn--active){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-page__btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-page__btn:disabled{opacity:.4;cursor:not-allowed}.ath-page__btn--nav{padding:0;width:28px;color:var(--fg-3)}.ath-page__btn--cursor{padding:0 10px}.ath-page__btn--active{background:var(--accent);border-color:var(--accent);color:#fff;cursor:default}[data-theme=dark] .ath-page__btn--active{background:#e8e8ec;color:#111113;border-color:#e8e8ec}.ath-page__ellipsis{display:inline-flex;align-items:center;justify-content:center;width:20px;color:var(--fg-4)}.ath-page__summary{margin:0 8px;font-size:12px;color:var(--fg-3);font-feature-settings:\"tnum\"}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-pagination', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (mode === 'numbered') {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"'First page'\"\n    (click)=\"goFirst()\"\n  >\n    <lucide-icon [img]=\"firstIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"'Previous page'\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n  </button>\n\n  @for (item of pages(); track $index) {\n    @if (item === 'ellipsis') {\n      <span class=\"ath-page__ellipsis\" aria-hidden=\"true\">\n        <lucide-icon [img]=\"ellipsisIcon\" [size]=\"12\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        class=\"ath-page__btn\"\n        [class.ath-page__btn--active]=\"item === page\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"'Page ' + item\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"'Next page'\"\n    (click)=\"goNext()\"\n  >\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"'Last page'\"\n    (click)=\"goLast()\"\n  >\n    <lucide-icon [img]=\"lastIcon\" [size]=\"14\" />\n  </button>\n} @else {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasPrev\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n    <span>Previous</span>\n  </button>\n  @if (summary) {\n    <span class=\"ath-page__summary\">{{ summary }}</span>\n  }\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasNext\"\n    (click)=\"goNext()\"\n  >\n    <span>Next</span>\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans)}.ath-page__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:28px;height:28px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;font-feature-settings:\"tnum\";color:var(--fg-2);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast)}.ath-page__btn:hover:not(:disabled):not(.ath-page__btn--active){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-page__btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-page__btn:disabled{opacity:.4;cursor:not-allowed}.ath-page__btn--nav{padding:0;width:28px;color:var(--fg-3)}.ath-page__btn--cursor{padding:0 10px}.ath-page__btn--active{background:var(--accent);border-color:var(--accent);color:#fff;cursor:default}[data-theme=dark] .ath-page__btn--active{background:#e8e8ec;color:#111113;border-color:#e8e8ec}.ath-page__ellipsis{display:inline-flex;align-items:center;justify-content:center;width:20px;color:var(--fg-4)}.ath-page__summary{margin:0 8px;font-size:12px;color:var(--fg-3);font-feature-settings:\"tnum\"}\n"] }]
        }], propDecorators: { mode: [{
                type: Input
            }], page: [{
                type: Input
            }], totalPages: [{
                type: Input
            }], siblingCount: [{
                type: Input
            }], pageChange: [{
                type: Output
            }], hasPrev: [{
                type: Input
            }], hasNext: [{
                type: Input
            }], summary: [{
                type: Input
            }], previous: [{
                type: Output
            }], next: [{
                type: Output
            }] } });
function range(from, to) {
    const out = [];
    for (let i = from; i <= to; i++)
        out.push(i);
    return out;
}

// ===========================================
// ATHENE WEBCOMPONENTS - COMPONENT EXPORTS
// ===========================================
// Layout

// ===========================================
// ATHENE WEBCOMPONENTS - PUBLIC API
// ===========================================
// Components
// Note: Styles are imported via main.scss in consuming applications

/**
 * Generated bundle index. Do not edit.
 */

export { AthAlertComponent, AthAvatarComponent, AthAvatarStackComponent, AthBadgeComponent, AthBannerComponent, AthBreadcrumbComponent, AthButtonComponent, AthCardComponent, AthChipComponent, AthCodeBlockComponent, AthComboboxComponent, AthCopyButtonComponent, AthDialogComponent, AthDividerComponent, AthDropdownComponent, AthEmptyStateComponent, AthFileDropComponent, AthFilterChipComponent, AthInputComponent, AthKbdComponent, AthKpiTileComponent, AthMarkdownComponent, AthNavItemComponent, AthPageHeaderComponent, AthPaginationComponent, AthPriorityComponent, AthProgressComponent, AthProjectKeyBadgeComponent, AthSearchInputComponent, AthSectionComponent, AthSegmentComponent, AthSelectComponent, AthSidebarComponent, AthSkeletonCardComponent, AthSkeletonComponent, AthSkeletonTableComponent, AthSlaBarComponent, AthSparklineComponent, AthSpinnerComponent, AthStatCardComponent, AthStatusPillComponent, AthTableComponent, AthTabsComponent, AthTextareaComponent, AthTimelineComponent, AthTimelineEntryComponent, AthTimelineEventComponent, AthTimerPillComponent, AthToastContainerComponent, AthToastService, AthToggleComponent, AthTooltipDirective, AthUserPickerComponent };
//# sourceMappingURL=athene-webcomponents.mjs.map
