import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, ViewEncapsulation, forwardRef, inject, ElementRef, ChangeDetectorRef, HostListener, signal, Injectable, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i1 from 'lucide-angular';
import { PanelLeftClose, PanelLeft, LucideAngularModule, ChevronRight, X, Loader2, Eye, EyeOff, AlertCircle, ChevronDown, Search, CheckCircle, AlertTriangle, Info, Copy, Check } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import * as i1$1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

/**
 * Athene Page Header Component
 *
 * Consistent page header with title, description and action slot.
 *
 * @example
 * <ath-page-header title="Settings" description="Manage your preferences">
 *   <ath-button variant="outline" size="sm">Refresh</ath-button>
 * </ath-page-header>
 */
class AthPageHeaderComponent {
    constructor() {
        /** Page title */
        this.title = '';
        /** Page description */
        this.description = '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPageHeaderComponent, isStandalone: true, selector: "ath-page-header", inputs: { title: "title", description: "description" }, ngImport: i0, template: "<header class=\"ath-page-header\">\n  <div class=\"ath-page-header__text\">\n    <h1 class=\"ath-page-header__title\">{{ title }}</h1>\n    @if (description) {\n      <p class=\"ath-page-header__description\">{{ description }}</p>\n    }\n  </div>\n  <div class=\"ath-page-header__actions\">\n    <ng-content />\n  </div>\n</header>\n", styles: [".ath-page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-6);padding-bottom:var(--ath-space-5)}.ath-page-header__text{flex:1;min-width:0}.ath-page-header__title{margin:0;font-size:var(--ath-font-size-xl);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight);letter-spacing:-.01em}.ath-page-header__description{margin:var(--ath-space-1) 0 0;font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);line-height:var(--ath-line-height-normal);max-width:560px}.ath-page-header__actions{display:flex;align-items:center;gap:var(--ath-space-2);flex-shrink:0}@media (max-width: 640px){.ath-page-header{flex-direction:column;align-items:stretch;gap:var(--ath-space-4)}.ath-page-header__actions{justify-content:flex-start}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-page-header', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"ath-page-header\">\n  <div class=\"ath-page-header__text\">\n    <h1 class=\"ath-page-header__title\">{{ title }}</h1>\n    @if (description) {\n      <p class=\"ath-page-header__description\">{{ description }}</p>\n    }\n  </div>\n  <div class=\"ath-page-header__actions\">\n    <ng-content />\n  </div>\n</header>\n", styles: [".ath-page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--ath-space-6);padding-bottom:var(--ath-space-5)}.ath-page-header__text{flex:1;min-width:0}.ath-page-header__title{margin:0;font-size:var(--ath-font-size-xl);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:var(--ath-line-height-tight);letter-spacing:-.01em}.ath-page-header__description{margin:var(--ath-space-1) 0 0;font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary);line-height:var(--ath-line-height-normal);max-width:560px}.ath-page-header__actions{display:flex;align-items:center;gap:var(--ath-space-2);flex-shrink:0}@media (max-width: 640px){.ath-page-header{flex-direction:column;align-items:stretch;gap:var(--ath-space-4)}.ath-page-header__actions{justify-content:flex-start}}\n"] }]
        }], propDecorators: { title: [{
                type: Input,
                args: [{ required: true }]
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTabsComponent, isStandalone: true, selector: "ath-tabs", inputs: { tabs: "tabs", activeTab: "activeTab" }, outputs: { tabChanged: "tabChanged" }, ngImport: i0, template: "<div class=\"ath-tabs\" role=\"tablist\">\n  @for (tab of tabs; track tab.id) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n    >\n      {{ tab.label }}\n    </button>\n  }\n</div>\n", styles: [".ath-tabs{display:flex;gap:0;border-bottom:1px solid var(--ath-border-color)}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-tertiary);background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;cursor:pointer;transition:all var(--ath-transition-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--ath-text-primary)}.ath-tabs__tab--active{color:var(--ath-color-primary);border-bottom-color:var(--ath-color-primary)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--ath-color-primary)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--ath-border-color-focus);border-radius:var(--ath-border-radius-sm) var(--ath-border-radius-sm) 0 0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-tabs', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-tabs\" role=\"tablist\">\n  @for (tab of tabs; track tab.id) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n    >\n      {{ tab.label }}\n    </button>\n  }\n</div>\n", styles: [".ath-tabs{display:flex;gap:0;border-bottom:1px solid var(--ath-border-color)}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-tertiary);background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;cursor:pointer;transition:all var(--ath-transition-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--ath-text-primary)}.ath-tabs__tab--active{color:var(--ath-color-primary);border-bottom-color:var(--ath-color-primary)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--ath-color-primary)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--ath-border-color-focus);border-radius:var(--ath-border-radius-sm) var(--ath-border-radius-sm) 0 0}\n"] }]
        }], propDecorators: { tabs: [{
                type: Input
            }], activeTab: [{
                type: Input
            }], tabChanged: [{
                type: Output
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
 * Athene Stat Card Component
 *
 * Display metrics and statistics with label and value.
 *
 * @example
 * <ath-stat-card label="Total Users" value="1,234" />
 * <ath-stat-card label="Active" value="89%" trend="up" />
 */
class AthStatCardComponent {
    constructor() {
        /** Stat label */
        this.label = '';
        /** Stat value */
        this.value = '';
        /** Optional sub-value or additional info */
        this.subValue = '';
        /** Trend direction */
        this.trend = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthStatCardComponent, isStandalone: true, selector: "ath-stat-card", inputs: { label: "label", value: "value", subValue: "subValue", trend: "trend" }, ngImport: i0, template: "<div class=\"ath-stat-card\">\n  <span class=\"ath-stat-card__label\">{{ label }}</span>\n  <div class=\"ath-stat-card__value-row\">\n    <span class=\"ath-stat-card__value\">{{ value }}</span>\n    @if (trend) {\n      <span\n        class=\"ath-stat-card__trend\"\n        [class.ath-stat-card__trend--up]=\"trend === 'up'\"\n        [class.ath-stat-card__trend--down]=\"trend === 'down'\"\n      >\n        {{ trend === 'up' ? '\u2191' : '\u2193' }}\n      </span>\n    }\n  </div>\n  @if (subValue) {\n    <span class=\"ath-stat-card__sub\">{{ subValue }}</span>\n  }\n</div>\n", styles: [".ath-stat-card{display:flex;flex-direction:column;gap:var(--ath-space-2);padding:var(--ath-space-4) var(--ath-space-5);background:var(--ath-bg-panel);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg)}.ath-stat-card__label{font-size:var(--ath-font-size-xs);font-weight:var(--ath-font-weight-medium);text-transform:uppercase;letter-spacing:.4px;color:var(--ath-text-tertiary)}.ath-stat-card__value-row{display:flex;align-items:baseline;gap:var(--ath-space-2)}.ath-stat-card__value{font-size:var(--ath-font-size-3xl);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:1;font-variant-numeric:tabular-nums}.ath-stat-card__trend{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium)}.ath-stat-card__trend--up{color:var(--ath-color-success)}.ath-stat-card__trend--down{color:var(--ath-color-error)}.ath-stat-card__sub{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-stat-card', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-stat-card\">\n  <span class=\"ath-stat-card__label\">{{ label }}</span>\n  <div class=\"ath-stat-card__value-row\">\n    <span class=\"ath-stat-card__value\">{{ value }}</span>\n    @if (trend) {\n      <span\n        class=\"ath-stat-card__trend\"\n        [class.ath-stat-card__trend--up]=\"trend === 'up'\"\n        [class.ath-stat-card__trend--down]=\"trend === 'down'\"\n      >\n        {{ trend === 'up' ? '\u2191' : '\u2193' }}\n      </span>\n    }\n  </div>\n  @if (subValue) {\n    <span class=\"ath-stat-card__sub\">{{ subValue }}</span>\n  }\n</div>\n", styles: [".ath-stat-card{display:flex;flex-direction:column;gap:var(--ath-space-2);padding:var(--ath-space-4) var(--ath-space-5);background:var(--ath-bg-panel);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg)}.ath-stat-card__label{font-size:var(--ath-font-size-xs);font-weight:var(--ath-font-weight-medium);text-transform:uppercase;letter-spacing:.4px;color:var(--ath-text-tertiary)}.ath-stat-card__value-row{display:flex;align-items:baseline;gap:var(--ath-space-2)}.ath-stat-card__value{font-size:var(--ath-font-size-3xl);font-weight:var(--ath-font-weight-semibold);color:var(--ath-text-primary);line-height:1;font-variant-numeric:tabular-nums}.ath-stat-card__trend{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium)}.ath-stat-card__trend--up{color:var(--ath-color-success)}.ath-stat-card__trend--down{color:var(--ath-color-error)}.ath-stat-card__sub{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}\n"] }]
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
        ], ngImport: i0, template: "<div class=\"ath-select\" [class.ath-select--error]=\"error\" [class.ath-select--disabled]=\"disabled\">\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <option [value]=\"option.value\" [disabled]=\"option.disabled\">{{ option.label }}</option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--ath-color-error);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus),0 0 12px #c9963a40}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--ath-color-error)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 1px var(--ath-color-error),0 0 12px #ef444433}.ath-select--disabled .ath-select__label{opacity:.5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
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

export { AthAlertComponent, AthAvatarComponent, AthBadgeComponent, AthBreadcrumbComponent, AthButtonComponent, AthCardComponent, AthChipComponent, AthCopyButtonComponent, AthDialogComponent, AthDividerComponent, AthDropdownComponent, AthEmptyStateComponent, AthInputComponent, AthKbdComponent, AthNavItemComponent, AthPageHeaderComponent, AthSearchInputComponent, AthSectionComponent, AthSelectComponent, AthSidebarComponent, AthSkeletonCardComponent, AthSkeletonComponent, AthSkeletonTableComponent, AthSpinnerComponent, AthStatCardComponent, AthTableComponent, AthTabsComponent, AthTextareaComponent, AthToastContainerComponent, AthToastService, AthToggleComponent, AthTooltipDirective };
//# sourceMappingURL=athene-webcomponents.mjs.map
