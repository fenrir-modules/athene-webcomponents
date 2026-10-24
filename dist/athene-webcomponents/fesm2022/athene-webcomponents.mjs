import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Input, inject, EventEmitter, Output, input, computed, signal, ElementRef, booleanAttribute, NgZone, Directive, Injectable, TemplateRef, model, output, contentChild, viewChild, InjectionToken, contentChildren, forwardRef, effect, DestroyRef, HostBinding, ViewEncapsulation, ErrorHandler, SecurityContext, ChangeDetectorRef, ViewChild, HostListener, LOCALE_ID } from '@angular/core';
import { CommonModule, DOCUMENT, NgTemplateOutlet } from '@angular/common';
import * as i1 from 'lucide-angular';
import { PanelLeftClose, PanelLeft, LucideAngularModule, Check, ChevronRight, User, X, Zap, Loader2, Copy, Eye, EyeOff, AlertCircle, ChevronDown, Search, Plus, Upload, Info, CheckCircle2, AlertOctagon, AlertTriangle, CheckCircle, ChevronLeft, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-angular';
import * as i1$2 from '@athene/webcomponents/core';
import { ATH_LABELS, ATH_DEFAULT_LABELS, ATH_STATUS_LABELS, ATH_PRIORITY_LABELS, ATH_MARKDOWN_PARSER, ATH_DATE_CONTEXT } from '@athene/webcomponents/core';
export { ATH_DATE_CONTEXT, ATH_DEFAULT_LABELS, ATH_LABELS, ATH_MARKDOWN_PARSER, ATH_PRIORITY_LABELS, ATH_STATUS_LABELS, AthToastService } from '@athene/webcomponents/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { isObservable, firstValueFrom, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import * as i1$1 from '@angular/forms';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

/**
 * The page head every app page uses: H1, one muted meta line, actions on
 * the right, a hairline underneath. The breadcrumb lives in the shell's
 * topbar, so this component starts at the page gutter like every other.
 *
 * - Meta: `subItems` strings render with `·` separators. Anything richer
 *   (a health pill, an avatar) goes in an `[athPageMeta]` child, which
 *   continues the same line.
 * - Leading: an `[athPageLeading]` child (e.g. a project key tile) sits
 *   left of the title block.
 * - Actions: default content. At most one primary; the topbar's "New" is
 *   already the view's primary on most pages.
 * - `divider`: the hairline. Turn it off only when the next element draws
 *   its own rule directly under the head (an underline tab bar).
 *
 * @example
 * <ath-page-header title="Tickets" [subItems]="['12 of 45', 'across 6 projects']">
 *   <ath-button variant="secondary" size="sm">Filter</ath-button>
 * </ath-page-header>
 */
class AthPageHeaderComponent {
    constructor() {
        /**
         * Small eyebrow above the title.
         * @deprecated App pages carry their location in the topbar breadcrumb;
         * kept only for the admin console.
         */
        this.eyebrow = '';
        /** Page title. */
        this.title = '';
        /** Multi-segment sub-row, rendered with bullet (•) separators. */
        this.subItems = [];
        /** Legacy free-form description (single paragraph). Falls back if subItems empty. */
        this.description = '';
        /** Hairline under the head. On by default: it is part of the contract. */
        this.divider = true;
        /**
         * Heading level of the title. 1 for a page; 2 for a section head inside a
         * page that already has its h1 (the settings sub-pages under "Settings").
         */
        this.level = 1;
    }
    /**
     * The sub-items worth separating.
     *
     * Callers build this array inline from conditionals, so a fact that
     * does not apply arrives as `''` rather than being left out — and a
     * blank segment still earned its bullet, leaving headers reading
     * "All open tickets ·" with nothing after the separator.
     */
    get visibleSubItems() {
        return this.subItems.filter((item) => item != null && item.trim() !== '');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageHeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPageHeaderComponent, isStandalone: true, selector: "ath-page-header", inputs: { eyebrow: "eyebrow", title: "title", subItems: "subItems", description: "description", divider: "divider", level: "level" }, ngImport: i0, template: "<header class=\"ath-page-header\" [class.ath-page-header--divided]=\"divider\">\n  <div class=\"ath-page-header__leading\">\n    <ng-content select=\"[athPageLeading]\" />\n  </div>\n  <div class=\"ath-page-header__text\">\n    @if (eyebrow) {\n      <div class=\"ath-page-header__eyebrow\">{{ eyebrow }}</div>\n    }\n    @if (level === 2) {\n      <h2 class=\"ath-page-header__title\">{{ title }}</h2>\n    } @else {\n      <h1 class=\"ath-page-header__title\">{{ title }}</h1>\n    }\n    <div class=\"ath-page-header__sub\">\n      <!-- Every item leads with its separator, and the row clips the first\n           separator-width of each line: a wrapped line neither ends nor\n           starts on a stray \"\u00B7\". -->\n      @for (item of visibleSubItems; track $index) {\n        <span class=\"ath-page-header__sub-item\">\n          <span class=\"ath-page-header__sub-sep\" aria-hidden=\"true\">\u00B7</span>\n          {{ item }}\n        </span>\n      }\n      <span class=\"ath-page-header__sub-slot\"><ng-content select=\"[athPageMeta]\" /></span>\n    </div>\n    @if (visibleSubItems.length === 0 && description) {\n      <p class=\"ath-page-header__description\">{{ description }}</p>\n    }\n  </div>\n  <div class=\"ath-page-header__actions\">\n    <ng-content />\n  </div>\n</header>\n", styles: [".ath-page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-6);padding-bottom:0}.ath-page-header--divided{padding-bottom:var(--page-head-pad-bottom);border-bottom:1px solid var(--page-head-rule)}.ath-page-header__leading{flex-shrink:0;margin-right:calc(var(--space-4) - var(--space-6))}.ath-page-header__leading:empty{display:none}.ath-page-header__text{flex:1;min-width:0}.ath-page-header__eyebrow{font-family:var(--font-sans);font-size:var(--text-xs);font-weight:var(--weight-medium);color:var(--fg-3);letter-spacing:.04em;margin-bottom:var(--space-1)}.ath-page-header__title{margin:0;font-size:var(--page-title-size);font-weight:var(--weight-semibold);color:var(--fg);line-height:var(--line-tight);letter-spacing:-.015em}.ath-page-header__sub{--sep-w: 16px;margin-top:var(--page-head-gap);margin-left:calc(-1 * var(--sep-w));clip-path:inset(0 0 0 var(--sep-w));display:flex;align-items:center;flex-wrap:wrap;row-gap:2px;font-size:var(--page-meta-size);color:var(--fg-3);line-height:var(--line-normal)}.ath-page-header__sub:not(:has(.ath-page-header__sub-item)):has(.ath-page-header__sub-slot:empty){display:none}.ath-page-header__sub-item{display:inline-flex;align-items:center;font-weight:var(--weight-normal)}.ath-page-header__sub-sep{display:inline-block;width:var(--sep-w);text-align:center;color:var(--fg-4)}.ath-page-header__sub-slot{display:inline-flex;align-items:center;padding-left:var(--sep-w)}.ath-page-header__sub-slot:empty{display:none}.ath-page-header__description{margin:var(--page-head-gap) 0 0;font-size:var(--page-meta-size);color:var(--fg-3);line-height:var(--line-normal);max-width:62ch}.ath-page-header__actions{display:flex;align-items:center;align-self:center;gap:var(--space-2);flex-shrink:0}@media (max-width: 640px){.ath-page-header{flex-wrap:wrap;gap:var(--space-4)}.ath-page-header__text{flex:1 1 0}.ath-page-header__actions{flex-basis:100%;justify-content:flex-start}.ath-page-header__actions:empty{display:none}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-page-header', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"ath-page-header\" [class.ath-page-header--divided]=\"divider\">\n  <div class=\"ath-page-header__leading\">\n    <ng-content select=\"[athPageLeading]\" />\n  </div>\n  <div class=\"ath-page-header__text\">\n    @if (eyebrow) {\n      <div class=\"ath-page-header__eyebrow\">{{ eyebrow }}</div>\n    }\n    @if (level === 2) {\n      <h2 class=\"ath-page-header__title\">{{ title }}</h2>\n    } @else {\n      <h1 class=\"ath-page-header__title\">{{ title }}</h1>\n    }\n    <div class=\"ath-page-header__sub\">\n      <!-- Every item leads with its separator, and the row clips the first\n           separator-width of each line: a wrapped line neither ends nor\n           starts on a stray \"\u00B7\". -->\n      @for (item of visibleSubItems; track $index) {\n        <span class=\"ath-page-header__sub-item\">\n          <span class=\"ath-page-header__sub-sep\" aria-hidden=\"true\">\u00B7</span>\n          {{ item }}\n        </span>\n      }\n      <span class=\"ath-page-header__sub-slot\"><ng-content select=\"[athPageMeta]\" /></span>\n    </div>\n    @if (visibleSubItems.length === 0 && description) {\n      <p class=\"ath-page-header__description\">{{ description }}</p>\n    }\n  </div>\n  <div class=\"ath-page-header__actions\">\n    <ng-content />\n  </div>\n</header>\n", styles: [".ath-page-header{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-6);padding-bottom:0}.ath-page-header--divided{padding-bottom:var(--page-head-pad-bottom);border-bottom:1px solid var(--page-head-rule)}.ath-page-header__leading{flex-shrink:0;margin-right:calc(var(--space-4) - var(--space-6))}.ath-page-header__leading:empty{display:none}.ath-page-header__text{flex:1;min-width:0}.ath-page-header__eyebrow{font-family:var(--font-sans);font-size:var(--text-xs);font-weight:var(--weight-medium);color:var(--fg-3);letter-spacing:.04em;margin-bottom:var(--space-1)}.ath-page-header__title{margin:0;font-size:var(--page-title-size);font-weight:var(--weight-semibold);color:var(--fg);line-height:var(--line-tight);letter-spacing:-.015em}.ath-page-header__sub{--sep-w: 16px;margin-top:var(--page-head-gap);margin-left:calc(-1 * var(--sep-w));clip-path:inset(0 0 0 var(--sep-w));display:flex;align-items:center;flex-wrap:wrap;row-gap:2px;font-size:var(--page-meta-size);color:var(--fg-3);line-height:var(--line-normal)}.ath-page-header__sub:not(:has(.ath-page-header__sub-item)):has(.ath-page-header__sub-slot:empty){display:none}.ath-page-header__sub-item{display:inline-flex;align-items:center;font-weight:var(--weight-normal)}.ath-page-header__sub-sep{display:inline-block;width:var(--sep-w);text-align:center;color:var(--fg-4)}.ath-page-header__sub-slot{display:inline-flex;align-items:center;padding-left:var(--sep-w)}.ath-page-header__sub-slot:empty{display:none}.ath-page-header__description{margin:var(--page-head-gap) 0 0;font-size:var(--page-meta-size);color:var(--fg-3);line-height:var(--line-normal);max-width:62ch}.ath-page-header__actions{display:flex;align-items:center;align-self:center;gap:var(--space-2);flex-shrink:0}@media (max-width: 640px){.ath-page-header{flex-wrap:wrap;gap:var(--space-4)}.ath-page-header__text{flex:1 1 0}.ath-page-header__actions{flex-basis:100%;justify-content:flex-start}.ath-page-header__actions:empty{display:none}}\n"] }]
        }], propDecorators: { eyebrow: [{
                type: Input
            }], title: [{
                type: Input,
                args: [{ required: true }]
            }], subItems: [{
                type: Input
            }], description: [{
                type: Input
            }], divider: [{
                type: Input
            }], level: [{
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
 * The labels a component reads: the app's `ATH_LABELS` where it provides
 * one, the English default otherwise. Call in an injection context; the
 * members stay functions, so a provider that reads a signal (the current
 * language) keeps a `computed` that calls them current.
 */
function injectAthLabels() {
    const provided = inject(ATH_LABELS, { optional: true }) ?? {};
    return { ...ATH_DEFAULT_LABELS, ...provided };
}
/** Fills `{name}` placeholders of a label; unknown ones stay as written. */
function formatAthLabel(template, params) {
    return template.replace(/\{(\w+)\}/g, (whole, key) => key in params ? String(params[key]) : whole);
}

// The labels live in the light `@athene/webcomponents/core` entry point so an
// app can provide them at its root without loading every component.

/**
 * Athene Sidebar Component
 *
 * Navigation sidebar for admin and app layouts.
 *
 * @example
 * <ath-sidebar [collapsed]="isCollapsed" (collapsedChange)="isCollapsed = $event">
 *   <div slot="header">Logo</div>
 *   <ath-nav-item [icon]="Home" label="Home" route="/home" [compact]="isCollapsed" />
 *   <div slot="footer">User info</div>
 * </ath-sidebar>
 */
class AthSidebarComponent {
    constructor() {
        this.labels = injectAthLabels();
        /** Collapsed state */
        this.collapsed = false;
        /** Collapsed change event */
        this.collapsedChange = new EventEmitter();
        this.collapseIcon = PanelLeftClose;
        this.expandIcon = PanelLeft;
    }
    get sidebarClasses() {
        return ['ath-sidebar', this.collapsed ? 'ath-sidebar--collapsed' : '']
            .filter(Boolean)
            .join(' ');
    }
    toggleCollapse() {
        this.collapsed = !this.collapsed;
        this.collapsedChange.emit(this.collapsed);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthSidebarComponent, isStandalone: true, selector: "ath-sidebar", inputs: { collapsed: "collapsed" }, outputs: { collapsedChange: "collapsedChange" }, ngImport: i0, template: "<aside [class]=\"sidebarClasses\">\n  <div class=\"ath-sidebar__header\">\n    <ng-content select=\"[slot=header]\" />\n  </div>\n\n  <nav class=\"ath-sidebar__nav\">\n    <ng-content />\n  </nav>\n\n  <div class=\"ath-sidebar__footer\">\n    <ng-content select=\"[slot=footer]\" />\n    <button\n      class=\"ath-sidebar__toggle\"\n      type=\"button\"\n      [attr.aria-label]=\"collapsed ? labels.sidebarExpand() : labels.sidebarCollapse()\"\n      (click)=\"toggleCollapse()\"\n    >\n      <lucide-icon [img]=\"collapsed ? expandIcon : collapseIcon\" [size]=\"18\" />\n    </button>\n  </div>\n</aside>\n", styles: [".ath-sidebar{display:flex;flex-direction:column;width:260px;height:100%;background-color:var(--ath-bg-secondary);border-right:1px solid var(--ath-border-color);transition:width var(--ath-transition-slow);overflow:hidden}.ath-sidebar--collapsed{width:64px}.ath-sidebar--collapsed .ath-sidebar__header,.ath-sidebar--collapsed .ath-sidebar__footer{padding:var(--ath-space-3)}.ath-sidebar__header{padding:var(--ath-space-4) var(--ath-space-5);border-bottom:1px solid var(--ath-border-color);flex-shrink:0}.ath-sidebar__nav{flex:1;display:flex;flex-direction:column;gap:var(--ath-space-1);padding:var(--ath-space-3);overflow-y:auto;overflow-x:hidden}.ath-sidebar__nav::-webkit-scrollbar{width:4px}.ath-sidebar__nav::-webkit-scrollbar-track{background:transparent}.ath-sidebar__nav::-webkit-scrollbar-thumb{background-color:var(--ath-border-color);border-radius:var(--ath-border-radius-full)}.ath-sidebar__footer{display:flex;flex-direction:column;gap:var(--ath-space-2);padding:var(--ath-space-4) var(--ath-space-5);border-top:1px solid var(--ath-border-color);flex-shrink:0}.ath-sidebar__toggle{display:flex;align-items:center;justify-content:center;width:100%;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-sidebar__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sidebar', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<aside [class]=\"sidebarClasses\">\n  <div class=\"ath-sidebar__header\">\n    <ng-content select=\"[slot=header]\" />\n  </div>\n\n  <nav class=\"ath-sidebar__nav\">\n    <ng-content />\n  </nav>\n\n  <div class=\"ath-sidebar__footer\">\n    <ng-content select=\"[slot=footer]\" />\n    <button\n      class=\"ath-sidebar__toggle\"\n      type=\"button\"\n      [attr.aria-label]=\"collapsed ? labels.sidebarExpand() : labels.sidebarCollapse()\"\n      (click)=\"toggleCollapse()\"\n    >\n      <lucide-icon [img]=\"collapsed ? expandIcon : collapseIcon\" [size]=\"18\" />\n    </button>\n  </div>\n</aside>\n", styles: [".ath-sidebar{display:flex;flex-direction:column;width:260px;height:100%;background-color:var(--ath-bg-secondary);border-right:1px solid var(--ath-border-color);transition:width var(--ath-transition-slow);overflow:hidden}.ath-sidebar--collapsed{width:64px}.ath-sidebar--collapsed .ath-sidebar__header,.ath-sidebar--collapsed .ath-sidebar__footer{padding:var(--ath-space-3)}.ath-sidebar__header{padding:var(--ath-space-4) var(--ath-space-5);border-bottom:1px solid var(--ath-border-color);flex-shrink:0}.ath-sidebar__nav{flex:1;display:flex;flex-direction:column;gap:var(--ath-space-1);padding:var(--ath-space-3);overflow-y:auto;overflow-x:hidden}.ath-sidebar__nav::-webkit-scrollbar{width:4px}.ath-sidebar__nav::-webkit-scrollbar-track{background:transparent}.ath-sidebar__nav::-webkit-scrollbar-thumb{background-color:var(--ath-border-color);border-radius:var(--ath-border-radius-full)}.ath-sidebar__footer{display:flex;flex-direction:column;gap:var(--ath-space-2);padding:var(--ath-space-4) var(--ath-space-5);border-top:1px solid var(--ath-border-color);flex-shrink:0}.ath-sidebar__toggle{display:flex;align-items:center;justify-content:center;width:100%;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-sidebar__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}\n"] }]
        }], propDecorators: { collapsed: [{
                type: Input
            }], collapsedChange: [{
                type: Output
            }] } });

/**
 * Athene Nav Item: one row of a navigation list (the app sidebar, the
 * settings rail, the admin console).
 *
 * - The single source for hit zone, hover, active, focus and tooltip; no
 *   layout reimplements them.
 * - An `icon` or a `chip` (a project key in the project's colour).
 * - `compact` (a collapsed rail): the label folds away and a CSS tooltip
 *   shows it to the right; an unread `badge` becomes a dot on the icon.
 * - Active: a tinted pill, the accent on the icon, and (with `indicator`)
 *   a 2-px bar at the left edge.
 *
 * Layout contract: the row stretches to its parent's width in both modes;
 * the icon sits in a fixed 40-px cell so it keeps its x position while a
 * rail opens, and only the tail (label, badge, dot) collapses.
 *
 * @example
 * <ath-nav-item [icon]="Inbox" label="Inbox" route="/app/inbox" [badge]="3" />
 * <ath-nav-item [chip]="{ text: 'ATL', color: 'var(--blue)' }" label="Atlas" [route]="['/p', id]" />
 */
class AthNavItemComponent {
    constructor() {
        /** Visible label; also the tooltip and accessible name when compact. */
        this.label = input.required();
        /** Router target: a path, or link parameters for a parameterised route. */
        this.route = input(null);
        /** @deprecated Use `route`. */
        this.link = input(null);
        /** Exact match for the active state (default: prefix match, like Angular). */
        this.exact = input(false);
        /** Either an icon or a chip. */
        this.icon = input(null);
        this.chip = input(null);
        /** A count (unread items); nothing below 1. */
        this.badge = input(null);
        /** @deprecated Use `badge`. */
        this.badgeCount = input(null);
        this.dot = input(null);
        /** A secondary row in a quieter tone ("… All projects"). */
        this.muted = input(false);
        /** Rail mode: the label folds away, a tooltip shows it. */
        this.compact = input(false);
        /** @deprecated Use `compact`. */
        this.collapsed = input(false);
        /** The 2-px bar at the left edge of the active row. */
        this.indicator = input(true);
        /** Tooltip text in compact mode; defaults to the label. */
        this.tooltip = input(null);
        /** Link parameters for `routerLink` (a copy: it takes a mutable array). */
        this.target = computed(() => {
            const route = this.route() ?? this.link() ?? '';
            return typeof route === 'string' ? [route] : [...route];
        });
        this.isCompact = computed(() => this.compact() || this.collapsed());
        this.count = computed(() => {
            const n = this.badge() ?? this.badgeCount();
            return n !== null && n > 0 ? n : null;
        });
        this.tooltipText = computed(() => {
            if (!this.isCompact())
                return null;
            const text = this.tooltip() ?? this.label();
            const n = this.count();
            return n !== null ? `${text} · ${n}` : text;
        });
        /** Pointer over the row or keyboard focus on it: shows the tooltip. */
        this.active = signal(false);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthNavItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthNavItemComponent, isStandalone: true, selector: "ath-nav-item", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, route: { classPropertyName: "route", publicName: "route", isSignal: true, isRequired: false, transformFunction: null }, link: { classPropertyName: "link", publicName: "link", isSignal: true, isRequired: false, transformFunction: null }, exact: { classPropertyName: "exact", publicName: "exact", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, chip: { classPropertyName: "chip", publicName: "chip", isSignal: true, isRequired: false, transformFunction: null }, badge: { classPropertyName: "badge", publicName: "badge", isSignal: true, isRequired: false, transformFunction: null }, badgeCount: { classPropertyName: "badgeCount", publicName: "badgeCount", isSignal: true, isRequired: false, transformFunction: null }, dot: { classPropertyName: "dot", publicName: "dot", isSignal: true, isRequired: false, transformFunction: null }, muted: { classPropertyName: "muted", publicName: "muted", isSignal: true, isRequired: false, transformFunction: null }, compact: { classPropertyName: "compact", publicName: "compact", isSignal: true, isRequired: false, transformFunction: null }, collapsed: { classPropertyName: "collapsed", publicName: "collapsed", isSignal: true, isRequired: false, transformFunction: null }, indicator: { classPropertyName: "indicator", publicName: "indicator", isSignal: true, isRequired: false, transformFunction: null }, tooltip: { classPropertyName: "tooltip", publicName: "tooltip", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<a\n  class=\"ath-nav-item\"\n  [class.ath-nav-item--compact]=\"isCompact()\"\n  [class.ath-nav-item--muted]=\"muted()\"\n  [routerLink]=\"target()\"\n  routerLinkActive=\"ath-nav-item--active\"\n  [routerLinkActiveOptions]=\"{ exact: exact() }\"\n  [attr.aria-label]=\"isCompact() ? label() : null\"\n  (mouseenter)=\"active.set(true)\"\n  (mouseleave)=\"active.set(false)\"\n  (focus)=\"active.set(true)\"\n  (blur)=\"active.set(false)\"\n>\n  @if (indicator()) {\n    <span class=\"ath-nav-item__indicator\" aria-hidden=\"true\"></span>\n  }\n\n  <span class=\"ath-nav-item__icon-cell\">\n    @if (icon(); as img) {\n      <lucide-icon [img]=\"img\" [size]=\"14\" />\n    }\n    <!-- Decorative: the label beside it names the row. -->\n    @if (chip(); as c) {\n      <span class=\"ath-nav-item__chip\" [style.--chip-color]=\"c.color\" aria-hidden=\"true\">{{\n        c.text\n      }}</span>\n    }\n    <!-- The rail has no room for a count: an unread item gets a dot on its\n         icon instead. The count returns with the label. -->\n    @if (isCompact() && count() !== null) {\n      <span class=\"ath-nav-item__icon-dot\" aria-hidden=\"true\"></span>\n    }\n  </span>\n\n  <span class=\"ath-nav-item__tail\">\n    <span class=\"ath-nav-item__label\">{{ label() }}</span>\n    @if (count(); as n) {\n      <span class=\"ath-nav-item__badge\">{{ n }}</span>\n    }\n    @if (dot(); as tone) {\n      <span class=\"ath-nav-item__dot\" [attr.data-tone]=\"tone\" aria-hidden=\"true\"></span>\n    }\n  </span>\n\n  @if (tooltipText(); as text) {\n    <span\n      class=\"ath-nav-item__tooltip\"\n      role=\"tooltip\"\n      [class.ath-nav-item__tooltip--visible]=\"active()\"\n    >\n      {{ text }}\n    </span>\n  }\n</a>\n", styles: [".ath-nav-item{position:relative;display:flex;align-items:center;width:auto;height:30px;margin:0 2px;padding:0;border-radius:var(--r-sm);color:var(--fg-2);text-decoration:none;font-family:var(--font-sans);font-size:13px;font-weight:500;white-space:nowrap;cursor:pointer;outline:none;overflow:hidden;transition:background .12s ease,color .12s ease}.ath-nav-item:hover{background:var(--hover);color:var(--fg)}.ath-nav-item:focus-visible{box-shadow:0 0 0 2px var(--focus-ring-color)}.ath-nav-item__indicator{position:absolute;left:0;top:50%;width:2px;height:16px;border-radius:0 2px 2px 0;background:transparent;transform:translateY(-50%);transition:background .12s ease}.ath-nav-item--active{background:var(--rail-active-bg);color:var(--nav-active-fg)}.ath-nav-item--active .ath-nav-item__indicator{background:var(--nav-active-indicator)}.ath-nav-item--active .ath-nav-item__icon-cell{color:var(--nav-active-icon)}.ath-nav-item__icon-cell{position:relative;flex:0 0 40px;display:flex;align-items:center;justify-content:center;color:var(--fg-4);transition:color .12s ease}.ath-nav-item:hover .ath-nav-item__icon-cell{color:var(--fg)}.ath-nav-item__chip{--chip-color: var(--fg-3);display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:18px;padding:0 4px;border:1px solid color-mix(in srgb,var(--chip-color) 22%,transparent);border-radius:var(--r-xs);background:transparent;color:color-mix(in srgb,var(--chip-color) var(--deco-mix),var(--bg-1));font-family:var(--font-mono);font-weight:500;font-size:9.5px;letter-spacing:.02em}.ath-nav-item__icon-dot{position:absolute;top:6px;left:calc(50% + 4px);width:6px;height:6px;border-radius:var(--r-full);background:var(--notify-dot);box-shadow:0 0 0 1.5px var(--bg-1)}.ath-nav-item--active .ath-nav-item__icon-dot{display:none}.ath-nav-item--muted:not(.ath-nav-item--active){color:var(--fg-3)}.ath-nav-item__tail{flex:1 1 auto;min-width:0;max-width:220px;display:flex;align-items:center;gap:6px;margin-left:2px;padding-right:10px;overflow:hidden;transition:max-width .18s cubic-bezier(.2,.9,.3,1),margin .18s cubic-bezier(.2,.9,.3,1),padding .18s cubic-bezier(.2,.9,.3,1),opacity .12s ease 40ms}.ath-nav-item__label{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis}.ath-nav-item__badge{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:18px;padding:0 5px;font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;font-weight:500;color:var(--nav-badge-fg);background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-xs)}.ath-nav-item__dot{flex-shrink:0;width:6px;height:6px;border-radius:var(--r-full);background:var(--fg-4)}.ath-nav-item__dot[data-tone=ok]{background:var(--green)}.ath-nav-item__dot[data-tone=warn]{background:var(--amber)}.ath-nav-item__dot[data-tone=error]{background:var(--red)}.ath-nav-item--compact .ath-nav-item__tail{max-width:0;margin-left:0;padding-right:0;opacity:0;pointer-events:none}.ath-nav-item--compact .ath-nav-item__indicator{display:none}.ath-nav-item--compact.ath-nav-item--active{background:var(--rail-active-bg)}.ath-nav-item__tooltip{position:absolute;left:100%;top:50%;margin-left:10px;transform:translateY(-50%) translate(-4px);padding:5px 10px;background:var(--fg);color:var(--bg-1);font-size:11.5px;font-weight:500;letter-spacing:.005em;border-radius:var(--r-sm);white-space:nowrap;opacity:0;pointer-events:none;box-shadow:var(--shadow-2);transition:opacity .1s ease 60ms,transform .12s cubic-bezier(.2,.9,.3,1) 60ms;z-index:var(--z-tooltip)}.ath-nav-item__tooltip:before{content:\"\";position:absolute;left:-3px;top:50%;transform:translateY(-50%) rotate(45deg);width:6px;height:6px;background:inherit;border-radius:1px}.ath-nav-item__tooltip--visible{opacity:1;transform:translateY(-50%) translate(0)}@media (prefers-reduced-motion: reduce){.ath-nav-item,.ath-nav-item__icon-cell,.ath-nav-item__indicator,.ath-nav-item__tail,.ath-nav-item__tooltip{transition:none}}\n"], dependencies: [{ kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthNavItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-nav-item', standalone: true, imports: [RouterLink, RouterLinkActive, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  class=\"ath-nav-item\"\n  [class.ath-nav-item--compact]=\"isCompact()\"\n  [class.ath-nav-item--muted]=\"muted()\"\n  [routerLink]=\"target()\"\n  routerLinkActive=\"ath-nav-item--active\"\n  [routerLinkActiveOptions]=\"{ exact: exact() }\"\n  [attr.aria-label]=\"isCompact() ? label() : null\"\n  (mouseenter)=\"active.set(true)\"\n  (mouseleave)=\"active.set(false)\"\n  (focus)=\"active.set(true)\"\n  (blur)=\"active.set(false)\"\n>\n  @if (indicator()) {\n    <span class=\"ath-nav-item__indicator\" aria-hidden=\"true\"></span>\n  }\n\n  <span class=\"ath-nav-item__icon-cell\">\n    @if (icon(); as img) {\n      <lucide-icon [img]=\"img\" [size]=\"14\" />\n    }\n    <!-- Decorative: the label beside it names the row. -->\n    @if (chip(); as c) {\n      <span class=\"ath-nav-item__chip\" [style.--chip-color]=\"c.color\" aria-hidden=\"true\">{{\n        c.text\n      }}</span>\n    }\n    <!-- The rail has no room for a count: an unread item gets a dot on its\n         icon instead. The count returns with the label. -->\n    @if (isCompact() && count() !== null) {\n      <span class=\"ath-nav-item__icon-dot\" aria-hidden=\"true\"></span>\n    }\n  </span>\n\n  <span class=\"ath-nav-item__tail\">\n    <span class=\"ath-nav-item__label\">{{ label() }}</span>\n    @if (count(); as n) {\n      <span class=\"ath-nav-item__badge\">{{ n }}</span>\n    }\n    @if (dot(); as tone) {\n      <span class=\"ath-nav-item__dot\" [attr.data-tone]=\"tone\" aria-hidden=\"true\"></span>\n    }\n  </span>\n\n  @if (tooltipText(); as text) {\n    <span\n      class=\"ath-nav-item__tooltip\"\n      role=\"tooltip\"\n      [class.ath-nav-item__tooltip--visible]=\"active()\"\n    >\n      {{ text }}\n    </span>\n  }\n</a>\n", styles: [".ath-nav-item{position:relative;display:flex;align-items:center;width:auto;height:30px;margin:0 2px;padding:0;border-radius:var(--r-sm);color:var(--fg-2);text-decoration:none;font-family:var(--font-sans);font-size:13px;font-weight:500;white-space:nowrap;cursor:pointer;outline:none;overflow:hidden;transition:background .12s ease,color .12s ease}.ath-nav-item:hover{background:var(--hover);color:var(--fg)}.ath-nav-item:focus-visible{box-shadow:0 0 0 2px var(--focus-ring-color)}.ath-nav-item__indicator{position:absolute;left:0;top:50%;width:2px;height:16px;border-radius:0 2px 2px 0;background:transparent;transform:translateY(-50%);transition:background .12s ease}.ath-nav-item--active{background:var(--rail-active-bg);color:var(--nav-active-fg)}.ath-nav-item--active .ath-nav-item__indicator{background:var(--nav-active-indicator)}.ath-nav-item--active .ath-nav-item__icon-cell{color:var(--nav-active-icon)}.ath-nav-item__icon-cell{position:relative;flex:0 0 40px;display:flex;align-items:center;justify-content:center;color:var(--fg-4);transition:color .12s ease}.ath-nav-item:hover .ath-nav-item__icon-cell{color:var(--fg)}.ath-nav-item__chip{--chip-color: var(--fg-3);display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:18px;padding:0 4px;border:1px solid color-mix(in srgb,var(--chip-color) 22%,transparent);border-radius:var(--r-xs);background:transparent;color:color-mix(in srgb,var(--chip-color) var(--deco-mix),var(--bg-1));font-family:var(--font-mono);font-weight:500;font-size:9.5px;letter-spacing:.02em}.ath-nav-item__icon-dot{position:absolute;top:6px;left:calc(50% + 4px);width:6px;height:6px;border-radius:var(--r-full);background:var(--notify-dot);box-shadow:0 0 0 1.5px var(--bg-1)}.ath-nav-item--active .ath-nav-item__icon-dot{display:none}.ath-nav-item--muted:not(.ath-nav-item--active){color:var(--fg-3)}.ath-nav-item__tail{flex:1 1 auto;min-width:0;max-width:220px;display:flex;align-items:center;gap:6px;margin-left:2px;padding-right:10px;overflow:hidden;transition:max-width .18s cubic-bezier(.2,.9,.3,1),margin .18s cubic-bezier(.2,.9,.3,1),padding .18s cubic-bezier(.2,.9,.3,1),opacity .12s ease 40ms}.ath-nav-item__label{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis}.ath-nav-item__badge{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:18px;padding:0 5px;font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11px;font-weight:500;color:var(--nav-badge-fg);background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-xs)}.ath-nav-item__dot{flex-shrink:0;width:6px;height:6px;border-radius:var(--r-full);background:var(--fg-4)}.ath-nav-item__dot[data-tone=ok]{background:var(--green)}.ath-nav-item__dot[data-tone=warn]{background:var(--amber)}.ath-nav-item__dot[data-tone=error]{background:var(--red)}.ath-nav-item--compact .ath-nav-item__tail{max-width:0;margin-left:0;padding-right:0;opacity:0;pointer-events:none}.ath-nav-item--compact .ath-nav-item__indicator{display:none}.ath-nav-item--compact.ath-nav-item--active{background:var(--rail-active-bg)}.ath-nav-item__tooltip{position:absolute;left:100%;top:50%;margin-left:10px;transform:translateY(-50%) translate(-4px);padding:5px 10px;background:var(--fg);color:var(--bg-1);font-size:11.5px;font-weight:500;letter-spacing:.005em;border-radius:var(--r-sm);white-space:nowrap;opacity:0;pointer-events:none;box-shadow:var(--shadow-2);transition:opacity .1s ease 60ms,transform .12s cubic-bezier(.2,.9,.3,1) 60ms;z-index:var(--z-tooltip)}.ath-nav-item__tooltip:before{content:\"\";position:absolute;left:-3px;top:50%;transform:translateY(-50%) rotate(45deg);width:6px;height:6px;background:inherit;border-radius:1px}.ath-nav-item__tooltip--visible{opacity:1;transform:translateY(-50%) translate(0)}@media (prefers-reduced-motion: reduce){.ath-nav-item,.ath-nav-item__icon-cell,.ath-nav-item__indicator,.ath-nav-item__tail,.ath-nav-item__tooltip{transition:none}}\n"] }]
        }] });

/** Whether `target` is a virtual anchor rather than an element. */
function isVirtualAnchor(target) {
    return (!!target &&
        typeof target === 'object' &&
        !(typeof Element !== 'undefined' && target instanceof Element) &&
        typeof target.getBoundingClientRect === 'function');
}
/** Space kept between a floating panel and the viewport's edges. */
const MARGIN = 8;
/** Below this much room a side is not worth capping to; the panel flips or overlaps. */
const MIN_ROOM = 120;
/** An arrow stays this far from the panel's corners. */
const ARROW_INSET = 12;
/**
 * The one positioning engine of the library (menus, listboxes, popovers,
 * pickers; the `athFloating` directive wraps it).
 *
 * Pins `panel` to `anchor` (an element, or a `FloatingVirtualAnchor` such as
 * a caret rectangle) and keeps it inside the viewport: on the preferred
 * side when it fits, on the other side when that has more room, shifted
 * sideways to stay on screen, height-capped (scrolling inside) when neither
 * side has room for all of it. Follows scrolls in any container, viewport
 * resizes, and size changes of the panel and the anchor.
 *
 * The panel stays where the template rendered it (focus order, event
 * bubbling and "click outside" checks keep working). It is promoted into the
 * top layer, or, without Popover API support, made `position: fixed` with a
 * correction for transformed ancestors that would otherwise move a fixed box.
 *
 * Writes `data-placement="bottom|top"` on the panel for side-dependent styles.
 */
function floatPanel(panel, anchor, options = {}) {
    // The element that stands for the anchor: itself, or a virtual anchor's context.
    const anchorEl = isVirtualAnchor(anchor)
        ? (anchor.contextElement ?? null)
        : anchor;
    const style = panel.style;
    style.position = 'fixed';
    style.top = '0';
    style.left = '0';
    style.right = 'auto';
    style.bottom = 'auto';
    style.margin = '0';
    style.zIndex = 'var(--z-popover)';
    // Measured before it is shown, so it never flashes at the wrong place.
    style.visibility = 'hidden';
    panel.setAttribute('data-ath-floating', '');
    const inTopLayer = (options.topLayer ?? true) && promote(panel);
    let frame = 0;
    const place = () => {
        if ((anchorEl && !anchorEl.isConnected) || !panel.isConnected)
            return;
        const a = anchor.getBoundingClientRect();
        const vw = document.documentElement.clientWidth;
        const vh = window.innerHeight;
        const gap = options.offset ?? 4;
        if (options.matchWidth)
            style.minWidth = `${Math.round(a.width)}px`;
        // Its natural height, without an earlier cap.
        style.maxHeight = '';
        style.overflowY = '';
        const width = Math.min(panel.offsetWidth, vw - MARGIN * 2);
        const natural = panel.offsetHeight;
        const below = vh - a.bottom - gap - MARGIN;
        const above = a.top - gap - MARGIN;
        const down = options.side === 'top'
            ? !(natural <= above || above >= below)
            : natural <= below || below >= above;
        let room = Math.max(down ? below : above, MIN_ROOM);
        if (options.maxHeight)
            room = Math.min(room, options.maxHeight);
        const height = Math.min(natural, room);
        if (natural > room) {
            style.maxHeight = `${Math.floor(room)}px`;
            style.overflowY = 'auto';
        }
        const rtl = getComputedStyle(anchorEl ?? panel).direction === 'rtl';
        const leftEdge = a.left;
        const rightEdge = a.right - width;
        const fromStart = rtl ? rightEdge : leftEdge;
        const fromEnd = rtl ? leftEdge : rightEdge;
        const fits = (x) => x >= MARGIN && x + width <= vw - MARGIN;
        const align = options.align ?? 'start';
        let left = align === 'center'
            ? a.left + a.width / 2 - width / 2
            : align === 'end'
                ? fromEnd
                : align === 'auto' && !fits(fromStart)
                    ? fromEnd
                    : fromStart;
        left = Math.max(MARGIN, Math.min(left, vw - width - MARGIN));
        const top = Math.max(MARGIN, down ? a.bottom + gap : a.top - gap - height);
        const origin = inTopLayer ? { x: 0, y: 0 } : fixedOrigin(panel);
        style.left = `${Math.round(left - origin.x)}px`;
        style.top = `${Math.round(top - origin.y)}px`;
        style.maxWidth = `${vw - MARGIN * 2}px`;
        style.visibility = '';
        panel.dataset['placement'] = down ? 'bottom' : 'top';
        if (options.arrow) {
            const x = a.left + a.width / 2 - left;
            const clamped = Math.max(ARROW_INSET, Math.min(x, width - ARROW_INSET));
            options.arrow.style.left = `${Math.round(clamped)}px`;
        }
    };
    const schedule = (event) => {
        // Scrolling inside the panel itself does not move it.
        if (event?.type === 'scroll' && event.target instanceof Node && panel.contains(event.target)) {
            return;
        }
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(place);
    };
    window.addEventListener('resize', schedule);
    // Capture: a scroll in any container moves the anchor.
    document.addEventListener('scroll', schedule, true);
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => schedule());
    resize?.observe(panel);
    if (anchorEl)
        resize?.observe(anchorEl);
    place();
    const stop = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', schedule);
        document.removeEventListener('scroll', schedule, true);
        resize?.disconnect();
        if (inTopLayer)
            demote(panel);
    };
    return Object.assign(stop, { update: place });
}
/** Whether this browser has the Popover API (top layer for non-modal panels). */
function supportsTopLayer() {
    return typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype;
}
function promote(panel) {
    if (!supportsTopLayer() || !panel.isConnected)
        return false;
    installTopLayerStyles();
    if (!panel.hasAttribute('popover'))
        panel.setAttribute('popover', 'manual');
    try {
        if (!panel.matches(':popover-open'))
            panel.showPopover();
        return true;
    }
    catch {
        panel.removeAttribute('popover');
        return false;
    }
}
function demote(panel) {
    try {
        if (panel.matches(':popover-open'))
            panel.hidePopover();
    }
    catch {
        // Already gone from the document.
    }
}
/**
 * `[popover]` brings UA styles (border, padding, canvas colours, centring).
 * This resets them at zero specificity, so any component style still wins.
 */
let baseStylesInstalled = false;
const BASE_STYLES = ':where([data-ath-floating][popover],[data-ath-top-layer][popover]){inset:auto;margin:0;' +
    'border:0;padding:0;' +
    'background:none;color:inherit;overflow:visible}';
/** @internal Installs the reset once; used by `floatPanel` and `AthOverlayStack`. */
function installTopLayerStyles() {
    if (baseStylesInstalled)
        return;
    baseStylesInstalled = true;
    try {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(BASE_STYLES);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    }
    catch {
        const el = document.createElement('style');
        el.textContent = BASE_STYLES;
        document.head.appendChild(el);
    }
}
/**
 * Where `position: fixed; left: 0; top: 0` lands for this element. Normally
 * the viewport's corner; inside a transformed ancestor (a centred dialog)
 * `fixed` is relative to that ancestor instead. Measured with a bare probe,
 * so the panel's own entry animation does not skew it.
 */
function fixedOrigin(el) {
    const parent = el.parentElement;
    if (!parent)
        return { x: 0, y: 0 };
    const probe = document.createElement('div');
    probe.style.cssText =
        'position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none';
    parent.appendChild(probe);
    const box = probe.getBoundingClientRect();
    probe.remove();
    return { x: box.left, y: box.top };
}

/**
 * The element behind an anchor: itself, or a virtual anchor's
 * `contextElement` (focus return, outside clicks, `aria-*`).
 */
function resolveAnchor(anchor) {
    if (!anchor)
        return null;
    if (anchor instanceof ElementRef)
        return anchor.nativeElement;
    if (isVirtualAnchor(anchor)) {
        const ctx = anchor.contextElement;
        return ctx instanceof HTMLElement ? ctx : null;
    }
    return anchor;
}
/** What a panel is placed against: the element, or the virtual anchor itself. */
function resolveFloatingTarget(anchor) {
    if (!anchor)
        return null;
    return anchor instanceof ElementRef ? anchor.nativeElement : anchor;
}
/**
 * Hangs the host element from an anchor with `floatPanel`: top layer (so no
 * `overflow`, `transform` or `z-index` of a container can clip or cover it),
 * kept inside the viewport (flip, shift, height cap), following scrolls,
 * resizes and size changes. The host stays where the template puts it.
 *
 * The only positioning logic of the library; `ath-popover`, `ath-menu` and
 * `ath-option-picker` use it, and app code that needs a bare floating panel
 * uses it instead of measuring rectangles itself.
 *
 * @example
 * @if (open()) {
 *   <div class="menu" [athFloating]="trigger" align="end">…</div>
 * }
 */
class AthFloatingDirective {
    constructor() {
        /** The element (or virtual anchor) the panel hangs from. */
        this.anchor = input.required({ alias: 'athFloating' });
        /**
         * `start`: start edges line up; `end`: end edges; `auto`: start unless it
         * overflows; `center`: centred on the anchor.
         */
        this.align = input('start');
        /** Preferred side; flips when the other side has more room. */
        this.side = input('bottom');
        /** Gap between anchor and panel, in px. */
        this.offset = input(4);
        /** At least as wide as the anchor (selects, comboboxes). */
        this.matchWidth = input(false, { transform: booleanAttribute });
        /** Upper bound for the height in px (the viewport caps it anyway). */
        this.maxHeight = input(null);
        /** Promote into the top layer (default). `false` keeps `position: fixed` + `--z-popover`. */
        this.topLayer = input(true, { transform: booleanAttribute });
        /** An arrow element inside the panel, kept pointing at the anchor's centre. */
        this.arrow = input(null);
        this.el = inject(ElementRef).nativeElement;
        this.zone = inject(NgZone);
        this.cleanup = null;
        this.viewReady = false;
    }
    ngAfterViewInit() {
        this.viewReady = true;
        this.attach();
    }
    ngOnChanges() {
        if (this.viewReady)
            this.attach();
    }
    ngOnDestroy() {
        this.cleanup?.();
        this.cleanup = null;
    }
    /** Re-measures now (after a content change the ResizeObserver cannot see). */
    update() {
        this.cleanup?.update();
    }
    attach() {
        this.cleanup?.();
        this.cleanup = null;
        const anchor = resolveFloatingTarget(this.anchor());
        if (!anchor)
            return;
        this.cleanup = this.zone.runOutsideAngular(() => floatPanel(this.el, anchor, {
            align: this.align(),
            side: this.side(),
            offset: this.offset(),
            matchWidth: this.matchWidth(),
            maxHeight: this.maxHeight(),
            topLayer: this.topLayer(),
            arrow: this.arrow(),
        }));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFloatingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.14", type: AthFloatingDirective, isStandalone: true, selector: "[athFloating]", inputs: { anchor: { classPropertyName: "anchor", publicName: "athFloating", isSignal: true, isRequired: true, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null }, side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null }, offset: { classPropertyName: "offset", publicName: "offset", isSignal: true, isRequired: false, transformFunction: null }, matchWidth: { classPropertyName: "matchWidth", publicName: "matchWidth", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, topLayer: { classPropertyName: "topLayer", publicName: "topLayer", isSignal: true, isRequired: false, transformFunction: null }, arrow: { classPropertyName: "arrow", publicName: "arrow", isSignal: true, isRequired: false, transformFunction: null } }, exportAs: ["athFloating"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFloatingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[athFloating]',
                    standalone: true,
                    exportAs: 'athFloating',
                }]
        }] });

/**
 * The open overlays (popovers, menus, pickers, dialogs) in opening order.
 * One document listener each for Escape and outside pointer-downs, so only
 * the topmost overlay reacts to Escape and a click inside a nested overlay
 * does not close its parent. Also owns the page scroll lock of modal dialogs.
 */
class AthOverlayStack {
    constructor() {
        this.doc = inject(DOCUMENT);
        this.zone = inject(NgZone);
        this.entries = [];
        this.listening = false;
        this.escapeTask = 0;
        this.locks = 0;
        this.savedScroll = null;
        this.onKeydown = (event) => {
            if (event.key !== 'Escape' || event.defaultPrevented)
                return;
            const top = this.entries[this.entries.length - 1];
            // A modal dialog handles Escape through its native `cancel` event.
            if (!top || top.modal)
                return;
            event.preventDefault();
            this.markEscape();
            if (top.closeOnEscape())
                this.zone.run(() => top.dismiss('escape'));
        };
        this.onPointerDown = (event) => {
            const path = event.composedPath();
            for (let i = this.entries.length - 1; i >= 0; i--) {
                const entry = this.entries[i];
                if (entry.modal)
                    return;
                const panel = entry.panel();
                const anchor = entry.anchor();
                if ((panel && path.includes(panel)) || (anchor && path.includes(anchor)))
                    return;
                if (!entry.closeOnOutsideClick())
                    return;
                this.zone.run(() => entry.dismiss('outside'));
            }
        };
    }
    /** Registers an overlay as the new topmost one. */
    open(entry) {
        this.remove(entry);
        this.entries.push(entry);
        this.listen();
    }
    /** Unregisters an overlay (idempotent). */
    close(entry) {
        this.remove(entry);
        if (this.entries.length === 0)
            this.unlisten();
    }
    isTop(entry) {
        return this.entries[this.entries.length - 1] === entry;
    }
    /** How many overlays are open. */
    get size() {
        return this.entries.length;
    }
    /**
     * True while the current Escape key press has already closed an overlay.
     * A native modal `<dialog>` checks this in its `cancel` event, which the
     * browser fires after the keydown, so one press closes one layer.
     */
    escapeConsumed() {
        return this.escapeTask !== 0;
    }
    /**
     * A modal dialog that opens goes on top of the top layer. Elements marked
     * `data-ath-top-layer` (the toast container) are moved back above it, so a
     * toast raised while a dialog is open is still seen.
     */
    raiseTopLayer() {
        if (!supportsTopLayer())
            return;
        installTopLayerStyles();
        for (const el of Array.from(this.doc.querySelectorAll('[data-ath-top-layer]'))) {
            try {
                if (!el.hasAttribute('popover'))
                    el.setAttribute('popover', 'manual');
                if (el.matches(':popover-open'))
                    el.hidePopover();
                el.showPopover();
            }
            catch {
                // Not connected; nothing to raise.
            }
        }
    }
    /** Locks page scrolling while at least one lock is held (modal dialogs). */
    lockScroll() {
        if (this.locks++ > 0)
            return;
        const root = this.doc.documentElement;
        const body = this.doc.body;
        const view = this.doc.defaultView;
        const scrollbar = view ? view.innerWidth - root.clientWidth : 0;
        this.savedScroll = { overflow: root.style.overflow, paddingRight: body.style.paddingRight };
        root.style.overflow = 'hidden';
        if (scrollbar > 0)
            body.style.paddingRight = `${scrollbar}px`;
    }
    unlockScroll() {
        if (this.locks === 0 || --this.locks > 0)
            return;
        if (this.savedScroll) {
            this.doc.documentElement.style.overflow = this.savedScroll.overflow;
            this.doc.body.style.paddingRight = this.savedScroll.paddingRight;
        }
        this.savedScroll = null;
    }
    remove(entry) {
        const i = this.entries.indexOf(entry);
        if (i >= 0)
            this.entries.splice(i, 1);
    }
    markEscape() {
        const view = this.doc.defaultView;
        if (!view)
            return;
        view.clearTimeout(this.escapeTask);
        this.escapeTask = view.setTimeout(() => (this.escapeTask = 0));
    }
    listen() {
        if (this.listening)
            return;
        this.listening = true;
        this.zone.runOutsideAngular(() => {
            this.doc.addEventListener('keydown', this.onKeydown);
            this.doc.addEventListener('pointerdown', this.onPointerDown, true);
        });
    }
    unlisten() {
        if (!this.listening)
            return;
        this.listening = false;
        this.doc.removeEventListener('keydown', this.onKeydown);
        this.doc.removeEventListener('pointerdown', this.onPointerDown, true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayStack, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayStack, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayStack, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

// Focus helpers shared by the overlay primitives (popover, menu, listbox, dialog).
const FOCUSABLE = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    '[contenteditable]:not([contenteditable="false"])',
    '[tabindex]',
].join(',');
/** Elements inside `root` reachable with Tab, in document order. */
function tabbables(root) {
    return Array.from(root.querySelectorAll(FOCUSABLE)).filter((el) => el.tabIndex >= 0 && !el.closest('[inert]') && el.getClientRects().length > 0);
}
/** The first focusable element of `root` (any tabindex), or `null`. */
function firstFocusable(root) {
    return root.querySelector(FOCUSABLE);
}
/**
 * Keeps Tab inside `root`: from the last tabbable to the first and back.
 * Returns true when it moved focus.
 */
function trapTab(event, root) {
    if (event.key !== 'Tab')
        return false;
    const items = tabbables(root);
    if (items.length === 0) {
        event.preventDefault();
        root.focus();
        return true;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = root.ownerDocument.activeElement;
    if (event.shiftKey && (active === first || active === root)) {
        event.preventDefault();
        last.focus();
        return true;
    }
    if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
        return true;
    }
    return false;
}
/** Focuses `el` if it is still in the document; never scrolls the page. */
function focusSafely(el) {
    if (!el || !el.isConnected)
        return false;
    el.focus({ preventScroll: true });
    return el.ownerDocument.activeElement === el;
}
/** A natively focusable control, or the first one inside a wrapper (e.g. `<ath-button>`). */
function focusTarget(host) {
    if (host.matches('button, a[href], input, select, textarea, [tabindex]'))
        return host;
    return host.querySelector('button, a[href], [tabindex]') ?? host;
}

let nextPopoverId = 0;
/**
 * Lazy panel content: rendered only while the popover is open.
 *
 * @example
 * <ath-popover>
 *   <ng-template athPopoverContent>…</ng-template>
 * </ath-popover>
 */
class AthPopoverContentDirective {
    constructor() {
        this.template = inject(TemplateRef);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverContentDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.14", type: AthPopoverContentDirective, isStandalone: true, selector: "ng-template[athPopoverContent]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverContentDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[athPopoverContent]',
                    standalone: true,
                }]
        }] });
/**
 * Athene Popover
 *
 * An anchored panel in the top layer: no container's overflow or z-index
 * clips it. Opens from `athPopoverTrigger`, `show()` or `[(open)]`; closes on
 * Escape (topmost overlay only), outside click and Tab-out, and returns focus
 * to the trigger. `role="dialog"` by default; `trapFocus` keeps Tab inside.
 *
 * @example
 * <ath-button [athPopoverTrigger]="info">Details</ath-button>
 * <ath-popover #info ariaLabel="Details" arrow>
 *   <p>Content</p>
 * </ath-popover>
 */
class AthPopoverComponent {
    constructor() {
        this.stack = inject(AthOverlayStack);
        /** Whether the panel is shown. Two-way: `[(open)]`. */
        this.open = model(false);
        /**
         * The element the panel hangs from (a trigger directive sets it on its
         * own), or a `FloatingVirtualAnchor` such as the spot the pointer rests on;
         * its `contextElement` then counts as the trigger.
         */
        this.anchor = input(null);
        this.size = input('md');
        this.padding = input('md');
        this.align = input('start');
        this.side = input('bottom');
        /** Gap to the anchor in px. */
        this.offset = input(6);
        this.matchWidth = input(false, { transform: booleanAttribute });
        /** Upper bound for the height in px (the viewport caps it anyway). */
        this.maxHeight = input(null);
        /** Show an arrow pointing at the anchor. */
        this.arrow = input(false, { transform: booleanAttribute });
        /** Keep Tab inside the panel (modal-like content); otherwise Tab out closes it. */
        this.trapFocus = input(false, { transform: booleanAttribute });
        this.autoFocus = input('first');
        /** Return focus to the trigger on Escape / selection / programmatic close. */
        this.restoreFocus = input(true, { transform: booleanAttribute });
        this.closeOnEscape = input(true, { transform: booleanAttribute });
        this.closeOnOutsideClick = input(true, { transform: booleanAttribute });
        this.panelRole = input('dialog');
        this.ariaLabel = input(null);
        this.ariaLabelledby = input(null);
        /** Extra classes on the panel (it lives in this component's view). */
        this.panelClass = input('');
        this.opened = output();
        this.closed = output();
        /** Id of the panel, for `aria-controls`. */
        this.panelId = input(`ath-popover-${++nextPopoverId}`);
        this.lazyContent = contentChild(AthPopoverContentDirective, {
            descendants: false,
        });
        this.panelRef = viewChild('panel');
        this.triggerAnchor = signal(null);
        /** The element the panel currently hangs from. */
        this.anchorElement = computed(() => resolveAnchor(this.anchor()) ?? this.triggerAnchor());
        /** What the panel is placed against: the anchor input (element or virtual) or the trigger. */
        this.floatTarget = computed(() => resolveFloatingTarget(this.anchor()) ?? this.triggerAnchor());
        this.panelClasses = computed(() => [
            `ath-popover__panel--${this.size()}`,
            `ath-popover__panel--pad-${this.padding()}`,
            this.panelClass(),
        ]
            .filter(Boolean)
            .join(' '));
        this.registered = false;
        this.returnFocus = null;
        this.entry = {
            panel: () => this.panel,
            anchor: () => this.anchorElement(),
            closeOnEscape: () => this.closeOnEscape(),
            closeOnOutsideClick: () => this.closeOnOutsideClick(),
            dismiss: (reason) => this.hide(reason),
        };
    }
    /** The panel element while open. */
    get panel() {
        return this.panelRef()?.nativeElement ?? null;
    }
    ngOnChanges(changes) {
        if (!changes['open'])
            return;
        if (this.open() && !this.registered)
            this.afterOpen();
        else if (!this.open() && this.registered)
            this.afterClose('programmatic');
    }
    ngOnDestroy() {
        clearTimeout(this.focusTimer);
        if (this.registered)
            this.stack.close(this.entry);
    }
    /** Opens the panel, optionally hanging it from `anchor`. */
    show(anchor) {
        if (anchor)
            this.triggerAnchor.set(anchor);
        if (this.open())
            return;
        this.open.set(true);
        this.afterOpen();
    }
    /**
     * Closes the panel. `restore` overrides whether focus goes back to the
     * trigger (default: yes when focus was inside or the user pressed Escape).
     */
    hide(reason = 'programmatic', restore) {
        if (!this.open())
            return;
        this.open.set(false);
        this.afterClose(reason, restore);
    }
    toggle(anchor) {
        if (this.open())
            this.hide();
        else
            this.show(anchor);
    }
    /** Moves focus into the panel according to `autoFocus` (or `mode`). */
    focusPanel(mode = this.autoFocus()) {
        const panel = this.panel;
        if (!panel || mode === 'none')
            return;
        const active = panel.ownerDocument.activeElement;
        if (active && panel.contains(active) && active !== panel)
            return;
        const target = mode === 'first' ? (tabbables(panel)[0] ?? panel) : panel;
        focusSafely(target);
    }
    onKeydown(event) {
        const panel = this.panel;
        if (panel && this.trapFocus())
            trapTab(event, panel);
    }
    onFocusOut(event) {
        if (this.trapFocus() || !this.open())
            return;
        const next = event.relatedTarget;
        const panel = this.panel;
        const anchor = this.anchorElement();
        if (!(next instanceof Node) || !panel)
            return;
        if (panel.contains(next) || anchor?.contains(next))
            return;
        this.hide('tab', false);
    }
    afterOpen() {
        this.registered = true;
        const doc = this.anchorElement()?.ownerDocument ?? document;
        const active = doc.activeElement;
        const anchor = this.anchorElement();
        this.returnFocus = anchor
            ? focusTarget(anchor)
            : active instanceof HTMLElement && active !== doc.body
                ? active
                : null;
        this.stack.open(this.entry);
        this.opened.emit();
        // After the panel has rendered and been positioned.
        clearTimeout(this.focusTimer);
        this.focusTimer = setTimeout(() => this.focusPanel());
    }
    afterClose(reason, restore) {
        this.registered = false;
        clearTimeout(this.focusTimer);
        this.stack.close(this.entry);
        const panel = this.panel;
        const doc = panel?.ownerDocument ?? document;
        const focusInside = !!panel && panel.contains(doc.activeElement);
        const back = this.returnFocus;
        this.returnFocus = null;
        const wanted = restore ??
            (this.restoreFocus() &&
                (reason === 'escape' || reason === 'select' || (reason !== 'tab' && focusInside)));
        if (wanted && reason !== 'outside') {
            focusSafely(back);
        }
        else if (reason === 'outside' && focusInside && this.restoreFocus()) {
            // The panel takes focus with it; if the click landed on nothing
            // focusable, put focus back on the trigger instead of the page.
            setTimeout(() => {
                if (doc.activeElement === doc.body || !doc.activeElement)
                    focusSafely(back);
            });
        }
        this.closed.emit(reason);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPopoverComponent, isStandalone: true, selector: "ath-popover", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, padding: { classPropertyName: "padding", publicName: "padding", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null }, side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null }, offset: { classPropertyName: "offset", publicName: "offset", isSignal: true, isRequired: false, transformFunction: null }, matchWidth: { classPropertyName: "matchWidth", publicName: "matchWidth", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, arrow: { classPropertyName: "arrow", publicName: "arrow", isSignal: true, isRequired: false, transformFunction: null }, trapFocus: { classPropertyName: "trapFocus", publicName: "trapFocus", isSignal: true, isRequired: false, transformFunction: null }, autoFocus: { classPropertyName: "autoFocus", publicName: "autoFocus", isSignal: true, isRequired: false, transformFunction: null }, restoreFocus: { classPropertyName: "restoreFocus", publicName: "restoreFocus", isSignal: true, isRequired: false, transformFunction: null }, closeOnEscape: { classPropertyName: "closeOnEscape", publicName: "closeOnEscape", isSignal: true, isRequired: false, transformFunction: null }, closeOnOutsideClick: { classPropertyName: "closeOnOutsideClick", publicName: "closeOnOutsideClick", isSignal: true, isRequired: false, transformFunction: null }, panelRole: { classPropertyName: "panelRole", publicName: "panelRole", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabelledby: { classPropertyName: "ariaLabelledby", publicName: "ariaLabelledby", isSignal: true, isRequired: false, transformFunction: null }, panelClass: { classPropertyName: "panelClass", publicName: "panelClass", isSignal: true, isRequired: false, transformFunction: null }, panelId: { classPropertyName: "panelId", publicName: "panelId", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", opened: "opened", closed: "closed" }, queries: [{ propertyName: "lazyContent", first: true, predicate: AthPopoverContentDirective, isSignal: true }], viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["panel"], descendants: true, isSignal: true }], exportAs: ["athPopover"], usesOnChanges: true, ngImport: i0, template: "@if (open()) {\n  <div\n    #panel\n    class=\"ath-popover__panel\"\n    [class]=\"panelClasses()\"\n    [id]=\"panelId()\"\n    [attr.role]=\"panelRole()\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    [attr.aria-modal]=\"trapFocus() && panelRole() === 'dialog' ? 'true' : null\"\n    tabindex=\"-1\"\n    [athFloating]=\"floatTarget()\"\n    [align]=\"align()\"\n    [side]=\"side()\"\n    [offset]=\"offset()\"\n    [matchWidth]=\"matchWidth()\"\n    [maxHeight]=\"maxHeight()\"\n    [arrow]=\"arrow() ? arrowEl : null\"\n    (keydown)=\"onKeydown($event)\"\n    (focusout)=\"onFocusOut($event)\"\n  >\n    <span #arrowEl class=\"ath-popover__arrow\" [hidden]=\"!arrow()\" aria-hidden=\"true\"></span>\n    @if (lazyContent(); as lazy) {\n      <ng-container [ngTemplateOutlet]=\"lazy.template\" />\n    } @else {\n      <ng-content />\n    }\n  </div>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:contents}.ath-popover__panel{box-sizing:border-box;max-width:calc(100vw - var(--space-4));font-family:var(--font-sans);font-size:var(--text-base);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);animation:ath-popover-in var(--t-base)}.ath-popover__panel:focus{outline:none}.ath-popover__panel:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-popover__panel--sm{width:220px}.ath-popover__panel--md{width:280px}.ath-popover__panel--lg{width:360px}.ath-popover__panel--auto{width:max-content;min-width:180px}.ath-popover__panel--pad-md{padding:var(--space-3)}.ath-popover__panel--pad-sm{padding:var(--space-1)}.ath-popover__panel--pad-none{padding:0}.ath-popover__panel[data-placement=top]{animation-name:ath-popover-in-up}.ath-popover__arrow{position:absolute;top:-6px;width:10px;height:10px;background:var(--surface);border-top:1px solid var(--border);border-left:1px solid var(--border);transform:translate(-50%) rotate(45deg);pointer-events:none}[data-placement=top]>.ath-popover__arrow{top:auto;bottom:-6px;transform:translate(-50%) rotate(225deg)}@keyframes ath-popover-in{0%{opacity:0;transform:translateY(-4px)}}@keyframes ath-popover-in-up{0%{opacity:0;transform:translateY(4px)}}\n"], dependencies: [{ kind: "directive", type: AthFloatingDirective, selector: "[athFloating]", inputs: ["athFloating", "align", "side", "offset", "matchWidth", "maxHeight", "topLayer", "arrow"], exportAs: ["athFloating"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-popover', standalone: true, imports: [AthFloatingDirective, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'athPopover', template: "@if (open()) {\n  <div\n    #panel\n    class=\"ath-popover__panel\"\n    [class]=\"panelClasses()\"\n    [id]=\"panelId()\"\n    [attr.role]=\"panelRole()\"\n    [attr.aria-label]=\"ariaLabel()\"\n    [attr.aria-labelledby]=\"ariaLabelledby()\"\n    [attr.aria-modal]=\"trapFocus() && panelRole() === 'dialog' ? 'true' : null\"\n    tabindex=\"-1\"\n    [athFloating]=\"floatTarget()\"\n    [align]=\"align()\"\n    [side]=\"side()\"\n    [offset]=\"offset()\"\n    [matchWidth]=\"matchWidth()\"\n    [maxHeight]=\"maxHeight()\"\n    [arrow]=\"arrow() ? arrowEl : null\"\n    (keydown)=\"onKeydown($event)\"\n    (focusout)=\"onFocusOut($event)\"\n  >\n    <span #arrowEl class=\"ath-popover__arrow\" [hidden]=\"!arrow()\" aria-hidden=\"true\"></span>\n    @if (lazyContent(); as lazy) {\n      <ng-container [ngTemplateOutlet]=\"lazy.template\" />\n    } @else {\n      <ng-content />\n    }\n  </div>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:contents}.ath-popover__panel{box-sizing:border-box;max-width:calc(100vw - var(--space-4));font-family:var(--font-sans);font-size:var(--text-base);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3);animation:ath-popover-in var(--t-base)}.ath-popover__panel:focus{outline:none}.ath-popover__panel:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-popover__panel--sm{width:220px}.ath-popover__panel--md{width:280px}.ath-popover__panel--lg{width:360px}.ath-popover__panel--auto{width:max-content;min-width:180px}.ath-popover__panel--pad-md{padding:var(--space-3)}.ath-popover__panel--pad-sm{padding:var(--space-1)}.ath-popover__panel--pad-none{padding:0}.ath-popover__panel[data-placement=top]{animation-name:ath-popover-in-up}.ath-popover__arrow{position:absolute;top:-6px;width:10px;height:10px;background:var(--surface);border-top:1px solid var(--border);border-left:1px solid var(--border);transform:translate(-50%) rotate(45deg);pointer-events:none}[data-placement=top]>.ath-popover__arrow{top:auto;bottom:-6px;transform:translate(-50%) rotate(225deg)}@keyframes ath-popover-in{0%{opacity:0;transform:translateY(-4px)}}@keyframes ath-popover-in-up{0%{opacity:0;transform:translateY(4px)}}\n"] }]
        }] });

// Keyboard helpers shared by `ath-menu` and `ath-listbox`.
/** A printable character without Ctrl/Meta/Alt, i.e. typeahead input. */
function isTypeaheadKey(event) {
    return event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
}
/**
 * Typeahead as in the WAI-ARIA menu and listbox patterns: characters typed
 * within `delay` ms form a prefix; repeating one character cycles through
 * the items that start with it.
 */
class Typeahead {
    constructor(delay = 500) {
        this.delay = delay;
        this.buffer = '';
        this.last = 0;
    }
    /**
     * The index of the next label (after `from`, wrapping) that starts with the
     * typed prefix, or -1.
     */
    next(char, labels, from) {
        const now = Date.now();
        if (now - this.last > this.delay)
            this.buffer = '';
        this.last = now;
        const c = char.toLocaleLowerCase();
        // "aaa" cycles through items starting with "a".
        const cycling = this.buffer.length > 0 && [...this.buffer].every((x) => x === c);
        this.buffer += c;
        const prefix = cycling ? c : this.buffer;
        const n = labels.length;
        const start = cycling || this.buffer.length === 1 ? from + 1 : from;
        for (let k = 0; k < n; k++) {
            const i = (((start + k) % n) + n) % n;
            if (labels[i].trim().toLocaleLowerCase().startsWith(prefix))
                return i;
        }
        return -1;
    }
    reset() {
        this.buffer = '';
    }
}
/**
 * The next index from `from` in direction `step` (±1) that `usable` accepts,
 * wrapping when `wrap` is set; `from` itself when there is none.
 */
function stepIndex(count, from, step, usable, wrap) {
    for (let k = 1; k <= count; k++) {
        let i = from + step * k;
        if (wrap)
            i = ((i % count) + count) % count;
        else if (i < 0 || i >= count)
            break;
        if (usable(i))
            return i;
    }
    return from;
}
/** The first (or last) index `usable` accepts, or -1. */
function edgeIndex(count, usable, last = false) {
    for (let k = 0; k < count; k++) {
        const i = last ? count - 1 - k : k;
        if (usable(i))
            return i;
    }
    return -1;
}

const ATH_MENU_PARENT = new InjectionToken('ATH_MENU_PARENT');

let nextReasonId = 0;
/**
 * One entry of an `ath-menu`: `<button athMenuItem>`, `<a athMenuItem>` or
 * `<ath-menu-item>`.
 *
 * Disabled items stay focusable (`aria-disabled`), so keyboard and screen
 * reader users can find them and hear `disabledReason`, which is also the
 * hover tooltip. Use `(triggered)` rather than `(click)`: it does not fire for
 * disabled items and closes the menu afterwards (unless `keepOpen`).
 *
 * @example
 * <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 * <button athMenuItem variant="danger" [disabled]="!canDelete" [disabledReason]="why"
 *         (triggered)="delete()">Delete</button>
 */
class AthMenuItemComponent {
    constructor() {
        this.menu = inject(ATH_MENU_PARENT, { optional: true });
        /** The item element (the `<button>` or `<a>`). */
        this.element = inject(ElementRef).nativeElement;
        this.isButton = this.element.tagName === 'BUTTON';
        this.checkIcon = Check;
        this.reasonId = `ath-menu-item-reason-${++nextReasonId}`;
        /** A Lucide icon before the label. */
        this.icon = input(null);
        /** Shortcut hint shown at the end, e.g. `⌘E`. */
        this.shortcut = input(null);
        /** `aria-keyshortcuts` value, e.g. `Meta+E` (the hint itself is hidden from AT). */
        this.keyshortcuts = input(null);
        this.variant = input('default');
        this.disabled = input(false, { transform: booleanAttribute });
        /** Why the item is disabled: tooltip and accessible description. */
        this.disabledReason = input(null);
        /** Hover tooltip (for a disabled item `disabledReason` takes its place). */
        this.tooltip = input(null);
        /** `true`/`false` makes it a `menuitemcheckbox` with a check mark. */
        this.checked = input(null);
        /** Leave the menu open after activation. */
        this.keepOpen = input(false, { transform: booleanAttribute });
        /** The item was chosen (click, Enter or Space) and is not disabled. */
        this.triggered = output();
    }
    /** The visible label, for typeahead. */
    label() {
        const el = this.element.querySelector('.ath-menu-item__label');
        return (el?.textContent ?? '').trim();
    }
    focus() {
        focusSafely(this.element);
    }
    onClick(event) {
        if (this.disabled()) {
            event.preventDefault();
            return;
        }
        this.triggered.emit();
        this.menu?.itemActivated(this);
    }
    onKeydown(event) {
        // Buttons click on Enter and Space natively, links only on Enter, and
        // an <ath-menu-item> element on neither.
        const isLink = this.element.tagName === 'A';
        if ((event.key === ' ' && !this.isButton) ||
            (event.key === 'Enter' && !this.isButton && !isLink)) {
            event.preventDefault();
            this.element.click();
        }
    }
    onHover() {
        if (this.menu?.isOpen())
            this.focus();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthMenuItemComponent, isStandalone: true, selector: "ath-menu-item, button[athMenuItem], a[athMenuItem]", inputs: { icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, shortcut: { classPropertyName: "shortcut", publicName: "shortcut", isSignal: true, isRequired: false, transformFunction: null }, keyshortcuts: { classPropertyName: "keyshortcuts", publicName: "keyshortcuts", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, disabledReason: { classPropertyName: "disabledReason", publicName: "disabledReason", isSignal: true, isRequired: false, transformFunction: null }, tooltip: { classPropertyName: "tooltip", publicName: "tooltip", isSignal: true, isRequired: false, transformFunction: null }, checked: { classPropertyName: "checked", publicName: "checked", isSignal: true, isRequired: false, transformFunction: null }, keepOpen: { classPropertyName: "keepOpen", publicName: "keepOpen", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { triggered: "triggered" }, host: { attributes: { "tabindex": "-1" }, listeners: { "click": "onClick($event)", "keydown": "onKeydown($event)", "mouseenter": "onHover()" }, properties: { "attr.disabled": "null", "attr.type": "isButton ? 'button' : null", "attr.role": "checked() === null ? 'menuitem' : 'menuitemcheckbox'", "attr.aria-checked": "checked() === null ? null : checked()", "attr.aria-disabled": "disabled() || null", "attr.aria-describedby": "disabled() && disabledReason() ? reasonId : null", "attr.aria-keyshortcuts": "keyshortcuts()", "attr.title": "(disabled() && disabledReason()) || tooltip() || null", "class.ath-menu-item--danger": "variant() === 'danger'", "class.ath-menu-item--disabled": "disabled()" }, classAttribute: "ath-menu-item" }, exportAs: ["athMenuItem"], ngImport: i0, template: `
    @if (icon(); as img) {
      <lucide-icon class="ath-menu-item__icon" [img]="img" [size]="16" aria-hidden="true" />
    } @else if (checked() !== null) {
      <span class="ath-menu-item__icon" aria-hidden="true">
        @if (checked()) {
          <lucide-icon [img]="checkIcon" [size]="16" />
        }
      </span>
    }
    <span class="ath-menu-item__label"><ng-content /></span>
    @if (shortcut()) {
      <kbd class="ath-menu-item__shortcut" aria-hidden="true">{{ shortcut() }}</kbd>
    }
    @if (disabled() && disabledReason()) {
      <span class="ath-menu-item__reason" [id]="reasonId" aria-hidden="true">{{
        disabledReason()
      }}</span>
    }
  `, isInline: true, styles: [":host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--hover-strong);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-faint)}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-menu-item, button[athMenuItem], a[athMenuItem]', standalone: true, imports: [LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'athMenuItem', template: `
    @if (icon(); as img) {
      <lucide-icon class="ath-menu-item__icon" [img]="img" [size]="16" aria-hidden="true" />
    } @else if (checked() !== null) {
      <span class="ath-menu-item__icon" aria-hidden="true">
        @if (checked()) {
          <lucide-icon [img]="checkIcon" [size]="16" />
        }
      </span>
    }
    <span class="ath-menu-item__label"><ng-content /></span>
    @if (shortcut()) {
      <kbd class="ath-menu-item__shortcut" aria-hidden="true">{{ shortcut() }}</kbd>
    }
    @if (disabled() && disabledReason()) {
      <span class="ath-menu-item__reason" [id]="reasonId" aria-hidden="true">{{
        disabledReason()
      }}</span>
    }
  `, host: {
                        class: 'ath-menu-item',
                        tabindex: '-1',
                        // A static `disabled` attribute would make the native button unfocusable;
                        // disabled items stay focusable (aria-disabled).
                        '[attr.disabled]': 'null',
                        '[attr.type]': "isButton ? 'button' : null",
                        '[attr.role]': "checked() === null ? 'menuitem' : 'menuitemcheckbox'",
                        '[attr.aria-checked]': 'checked() === null ? null : checked()',
                        '[attr.aria-disabled]': 'disabled() || null',
                        '[attr.aria-describedby]': 'disabled() && disabledReason() ? reasonId : null',
                        '[attr.aria-keyshortcuts]': 'keyshortcuts()',
                        '[attr.title]': '(disabled() && disabledReason()) || tooltip() || null',
                        '[class.ath-menu-item--danger]': "variant() === 'danger'",
                        '[class.ath-menu-item--disabled]': 'disabled()',
                        '(click)': 'onClick($event)',
                        '(keydown)': 'onKeydown($event)',
                        '(mouseenter)': 'onHover()',
                    }, styles: [":host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--hover-strong);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-faint)}\n"] }]
        }] });
/** A divider between groups of menu items. */
class AthMenuSeparatorComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuSeparatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthMenuSeparatorComponent, isStandalone: true, selector: "ath-menu-separator", host: { attributes: { "role": "separator" }, classAttribute: "ath-menu-separator" }, ngImport: i0, template: '', isInline: true, styles: [":host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--hover-strong);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-faint)}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuSeparatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-menu-separator', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: '', host: { class: 'ath-menu-separator', role: 'separator' }, styles: [":host(.ath-menu-item){box-sizing:border-box;display:flex;align-items:center;gap:var(--space-2);width:100%;min-height:var(--space-8);margin:0;padding:var(--space-1) var(--space-2);font:inherit;font-size:var(--text-base);color:var(--fg-2);text-align:start;text-decoration:none;background:none;border:0;border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;transition:background-color var(--t-fast)}:host(.ath-menu-item:hover),:host(.ath-menu-item:focus){color:var(--fg);background:var(--hover-strong);outline:none}:host(.ath-menu-item:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--focus-ring-color)}:host(.ath-menu-item--danger){color:var(--red-text)}:host(.ath-menu-item--danger:hover),:host(.ath-menu-item--danger:focus){color:var(--red-text);background:var(--red-tint)}:host(.ath-menu-item--disabled){color:var(--fg-4);cursor:not-allowed}:host(.ath-menu-item--disabled:hover),:host(.ath-menu-item--disabled:focus){color:var(--fg-4);background:var(--hover)}.ath-menu-item__icon{display:inline-flex;flex-shrink:0;width:16px;color:inherit}.ath-menu-item__label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-menu-item__shortcut{flex-shrink:0;margin-inline-start:var(--space-4);font-family:var(--font-sans);font-size:var(--text-xs);color:var(--fg-4)}.ath-menu-item__reason{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}:host(.ath-menu-separator){display:block;height:1px;margin:var(--space-1) calc(var(--space-1) * -1);background:var(--border-faint)}\n"] }]
        }] });

let nextMenuId = 0;
/**
 * Athene Menu: the WAI-ARIA menu button pattern for row actions, `⋯` menus
 * and toolbars.
 *
 * Keyboard: on the trigger Enter, Space and ArrowDown open on the first
 * item, ArrowUp on the last. In the menu: ArrowDown/ArrowUp (wrapping),
 * Home/End, typeahead, Enter/Space activate, Escape closes and returns
 * focus to the trigger, Tab closes and moves on.
 *
 * @example
 * <ath-button variant="ghost" [athMenuTrigger]="rowMenu" ariaLabel="Actions">⋯</ath-button>
 * <ath-menu #rowMenu>
 *   <button athMenuItem [icon]="Pencil" shortcut="E" (triggered)="edit()">Edit</button>
 *   <ath-menu-separator />
 *   <button athMenuItem variant="danger" (triggered)="remove()">Delete</button>
 * </ath-menu>
 */
class AthMenuComponent {
    constructor() {
        /** Whether the menu is shown. Two-way: `[(open)]`. */
        this.open = model(false);
        /** Anchor for programmatic use; `athMenuTrigger` sets it on its own. */
        this.anchor = input(null);
        this.align = input('start');
        this.side = input('bottom');
        this.maxHeight = input(null);
        /** Accessible name; by default the menu is labelled by its trigger. */
        this.ariaLabel = input(null);
        this.panelClass = input('');
        this.opened = output();
        this.closed = output();
        this.panelId = `ath-menu-${++nextMenuId}`;
        this.labelledBy = signal(null);
        this.popover = viewChild.required(AthPopoverComponent);
        this.items = contentChildren(AthMenuItemComponent, { descendants: true });
        this.typeahead = new Typeahead();
        this.pendingFocus = 'first';
    }
    isOpen() {
        return this.open();
    }
    /** Opens the menu from `anchor`, focusing the first or last item. */
    show(anchor, focus = 'first') {
        this.pendingFocus = focus;
        if (this.open()) {
            this.focusEdge(focus);
            return;
        }
        this.popover().show(resolveAnchor(anchor));
    }
    /** Closes the menu; focus returns to the trigger unless `restoreFocus` is false. */
    hide(restoreFocus = true) {
        this.popover().hide('programmatic', restoreFocus);
    }
    toggle(anchor, focus = 'first') {
        if (this.open())
            this.hide();
        else
            this.show(anchor, focus);
    }
    /** Called by `athMenuTrigger`: the trigger names the menu. */
    labelFrom(triggerId) {
        this.labelledBy.set(triggerId);
    }
    itemActivated(item) {
        if (!item.keepOpen())
            this.popover().hide('select', true);
    }
    onOpened() {
        this.typeahead.reset();
        this.opened.emit();
        const focus = this.pendingFocus;
        this.pendingFocus = 'first';
        // After the projected items are in the open panel.
        setTimeout(() => this.focusEdge(focus));
    }
    onKeydown(event) {
        if (!this.open())
            return;
        const items = this.items();
        const count = items.length;
        if (count === 0)
            return;
        const active = items.findIndex((i) => i.element === document.activeElement);
        const any = () => true;
        let next = -1;
        switch (event.key) {
            case 'ArrowDown':
                next = active < 0 ? 0 : stepIndex(count, active, 1, any, true);
                break;
            case 'ArrowUp':
                next = active < 0 ? count - 1 : stepIndex(count, active, -1, any, true);
                break;
            case 'Home':
            case 'PageUp':
                next = 0;
                break;
            case 'End':
            case 'PageDown':
                next = count - 1;
                break;
            case 'Tab':
                // Focus goes back to the trigger; the Tab itself then moves on from there.
                this.popover().hide('tab', true);
                return;
            default:
                if (isTypeaheadKey(event) && event.key !== ' ') {
                    next = this.typeahead.next(event.key, items.map((i) => i.label()), Math.max(active, 0));
                    if (next < 0)
                        return;
                }
                else {
                    return;
                }
        }
        event.preventDefault();
        items[next]?.focus();
    }
    focusEdge(focus) {
        if (focus === 'none' || !this.open())
            return;
        const items = this.items();
        const enabled = (i) => !items[i].disabled();
        let index = edgeIndex(items.length, enabled, focus === 'last');
        if (index < 0)
            index = focus === 'last' ? items.length - 1 : 0;
        if (items[index])
            items[index].focus();
        else
            this.popover().focusPanel('panel');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "18.2.14", type: AthMenuComponent, isStandalone: true, selector: "ath-menu", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null }, side: { classPropertyName: "side", publicName: "side", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, panelClass: { classPropertyName: "panelClass", publicName: "panelClass", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { open: "openChange", opened: "opened", closed: "closed" }, host: { listeners: { "keydown": "onKeydown($event)" } }, providers: [{ provide: ATH_MENU_PARENT, useExisting: forwardRef(() => AthMenuComponent) }], queries: [{ propertyName: "items", predicate: AthMenuItemComponent, descendants: true, isSignal: true }], viewQueries: [{ propertyName: "popover", first: true, predicate: AthPopoverComponent, descendants: true, isSignal: true }], exportAs: ["athMenu"], ngImport: i0, template: `
    <ath-popover
      [open]="open()"
      (openChange)="open.set($event)"
      [anchor]="anchor()"
      [panelId]="panelId"
      size="auto"
      padding="sm"
      panelRole="menu"
      autoFocus="none"
      [align]="align()"
      [side]="side()"
      [maxHeight]="maxHeight()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledby]="ariaLabel() ? null : labelledBy()"
      [panelClass]="panelClass()"
      (opened)="onOpened()"
      (closed)="closed.emit($event)"
    >
      <ng-content />
    </ath-popover>
  `, isInline: true, styles: [":host{display:contents}\n"], dependencies: [{ kind: "component", type: AthPopoverComponent, selector: "ath-popover", inputs: ["open", "anchor", "size", "padding", "align", "side", "offset", "matchWidth", "maxHeight", "arrow", "trapFocus", "autoFocus", "restoreFocus", "closeOnEscape", "closeOnOutsideClick", "panelRole", "ariaLabel", "ariaLabelledby", "panelClass", "panelId"], outputs: ["openChange", "opened", "closed"], exportAs: ["athPopover"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-menu', standalone: true, imports: [AthPopoverComponent], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'athMenu', providers: [{ provide: ATH_MENU_PARENT, useExisting: forwardRef(() => AthMenuComponent) }], template: `
    <ath-popover
      [open]="open()"
      (openChange)="open.set($event)"
      [anchor]="anchor()"
      [panelId]="panelId"
      size="auto"
      padding="sm"
      panelRole="menu"
      autoFocus="none"
      [align]="align()"
      [side]="side()"
      [maxHeight]="maxHeight()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledby]="ariaLabel() ? null : labelledBy()"
      [panelClass]="panelClass()"
      (opened)="onOpened()"
      (closed)="closed.emit($event)"
    >
      <ng-content />
    </ath-popover>
  `, host: {
                        '(keydown)': 'onKeydown($event)',
                    }, styles: [":host{display:contents}\n"] }]
        }] });

const ALIGN = { left: 'start', right: 'end', auto: 'auto' };
/** The controls a projected trigger may be (or contain). */
const CONTROL = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
/**
 * Athene Dropdown: an action menu from a flat `items` list. A preset on
 * `ath-menu` (keyboard, focus and ARIA come from there); for custom rows use
 * `ath-menu` + `athMenuItem` directly.
 *
 * The projected content is the trigger. When it is (or contains) a button,
 * that button is the menu button: one tab stop, with `aria-haspopup`,
 * `aria-expanded` and `aria-controls` on it. Plain content (text, an icon)
 * gets a `role="button"` wrapper instead.
 *
 * @example
 * <ath-dropdown [items]="menuItems" (itemClicked)="onAction($event)">
 *   <ath-button variant="ghost">Actions</ath-button>
 * </ath-dropdown>
 */
class AthDropdownComponent {
    constructor() {
        /** Menu items */
        this.items = input([]);
        /**
         * Horizontal alignment hint.
         * - `'left'`  – menu anchored to the left edge of trigger
         * - `'right'` – menu anchored to the right edge of trigger
         * - `'auto'`  – pick best side based on viewport space
         *
         * Vertical direction is always auto-detected.
         */
        this.align = input('auto');
        /** Item click event */
        this.itemClicked = output();
        /** Emits `true` when the menu opens, `false` when it closes. */
        this.openChange = output();
        this.menuAlign = () => ALIGN[this.align()];
        this.menu = viewChild.required(AthMenuComponent);
        this.triggerRef = viewChild.required('trigger');
        this.menuQuery = viewChild(AthMenuComponent);
        this.viewReady = false;
        effect(() => {
            const open = this.menuQuery()?.open() ?? false;
            if (this.viewReady)
                this.syncAria(open);
        });
    }
    ngAfterViewInit() {
        this.viewReady = true;
        this.syncAria(this.menu().open());
    }
    /** Opens or closes the menu (focus goes to the first item when opening). */
    toggle() {
        this.menu().toggle(this.triggerRef().nativeElement, 'first');
    }
    /** Emits the item's id, as a click on it does. */
    selectItem(item) {
        if (item.disabled || item.divider)
            return;
        this.itemClicked.emit(item.id);
        this.menu().hide();
    }
    onOpenChange(open) {
        this.openChange.emit(open);
    }
    onHostClick(event) {
        if (this.inTrigger(event))
            this.toggle();
    }
    onHostKeydown(event) {
        if (!this.inTrigger(event))
            return;
        const wrapperIsControl = this.control() === this.triggerRef().nativeElement;
        const key = event.key;
        if (key === 'ArrowDown' || key === 'ArrowUp') {
            event.preventDefault();
            this.menu().show(this.triggerRef().nativeElement, key === 'ArrowUp' ? 'last' : 'first');
        }
        else if (wrapperIsControl && (key === 'Enter' || key === ' ')) {
            // A real button clicks on its own; the role="button" wrapper does not.
            event.preventDefault();
            this.toggle();
        }
    }
    /** The trigger's real control, or the wrapper when there is none. */
    control() {
        const wrapper = this.triggerRef().nativeElement;
        return wrapper.querySelector(CONTROL) ?? wrapper;
    }
    inTrigger(event) {
        return event.target instanceof Node && this.triggerRef().nativeElement.contains(event.target);
    }
    syncAria(open) {
        const wrapper = this.triggerRef().nativeElement;
        const control = this.control();
        if (control === wrapper) {
            wrapper.setAttribute('role', 'button');
            wrapper.tabIndex = 0;
        }
        else {
            wrapper.removeAttribute('role');
            wrapper.removeAttribute('tabindex');
        }
        control.setAttribute('aria-haspopup', 'menu');
        control.setAttribute('aria-expanded', String(open));
        if (open)
            control.setAttribute('aria-controls', this.menu().panelId);
        else
            control.removeAttribute('aria-controls');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDropdownComponent, isStandalone: true, selector: "ath-dropdown", inputs: { items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { itemClicked: "itemClicked", openChange: "openChange" }, host: { listeners: { "click": "onHostClick($event)", "keydown": "onHostKeydown($event)" } }, viewQueries: [{ propertyName: "menu", first: true, predicate: AthMenuComponent, descendants: true, isSignal: true }, { propertyName: "triggerRef", first: true, predicate: ["trigger"], descendants: true, isSignal: true }, { propertyName: "menuQuery", first: true, predicate: AthMenuComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<span #trigger class=\"ath-dropdown__trigger\">\n  <ng-content />\n</span>\n\n<!-- ath-dropdown__menu: app code checks for an open dropdown by this class. -->\n<ath-menu\n  panelClass=\"ath-dropdown__menu\"\n  [anchor]=\"trigger\"\n  [align]=\"menuAlign()\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  @for (item of items(); track item.id) {\n    @if (item.divider) {\n      <ath-menu-separator />\n    } @else {\n      <button\n        athMenuItem\n        role=\"menuitem\"\n        class=\"ath-dropdown__item\"\n        [class.ath-dropdown__item--danger]=\"item.variant === 'danger'\"\n        [icon]=\"item.icon\"\n        [variant]=\"item.variant ?? 'default'\"\n        [disabled]=\"!!item.disabled\"\n        [disabledReason]=\"item.title\"\n        [tooltip]=\"item.title\"\n        [shortcut]=\"item.shortcut ?? null\"\n        (triggered)=\"itemClicked.emit(item.id)\"\n      >\n        {{ item.label }}\n      </button>\n    }\n  }\n</ath-menu>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-dropdown__trigger{display:inline-flex;cursor:pointer}.ath-dropdown__trigger[role=button]:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:var(--focus-ring-shadow)}\n"], dependencies: [{ kind: "component", type: AthMenuComponent, selector: "ath-menu", inputs: ["open", "anchor", "align", "side", "maxHeight", "ariaLabel", "panelClass"], outputs: ["openChange", "opened", "closed"], exportAs: ["athMenu"] }, { kind: "component", type: AthMenuItemComponent, selector: "ath-menu-item, button[athMenuItem], a[athMenuItem]", inputs: ["icon", "shortcut", "keyshortcuts", "variant", "disabled", "disabledReason", "tooltip", "checked", "keepOpen"], outputs: ["triggered"], exportAs: ["athMenuItem"] }, { kind: "component", type: AthMenuSeparatorComponent, selector: "ath-menu-separator" }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dropdown', standalone: true, imports: [AthMenuComponent, AthMenuItemComponent, AthMenuSeparatorComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(click)': 'onHostClick($event)',
                        '(keydown)': 'onHostKeydown($event)',
                    }, template: "<span #trigger class=\"ath-dropdown__trigger\">\n  <ng-content />\n</span>\n\n<!-- ath-dropdown__menu: app code checks for an open dropdown by this class. -->\n<ath-menu\n  panelClass=\"ath-dropdown__menu\"\n  [anchor]=\"trigger\"\n  [align]=\"menuAlign()\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  @for (item of items(); track item.id) {\n    @if (item.divider) {\n      <ath-menu-separator />\n    } @else {\n      <button\n        athMenuItem\n        role=\"menuitem\"\n        class=\"ath-dropdown__item\"\n        [class.ath-dropdown__item--danger]=\"item.variant === 'danger'\"\n        [icon]=\"item.icon\"\n        [variant]=\"item.variant ?? 'default'\"\n        [disabled]=\"!!item.disabled\"\n        [disabledReason]=\"item.title\"\n        [tooltip]=\"item.title\"\n        [shortcut]=\"item.shortcut ?? null\"\n        (triggered)=\"itemClicked.emit(item.id)\"\n      >\n        {{ item.label }}\n      </button>\n    }\n  }\n</ath-menu>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-flex}.ath-dropdown__trigger{display:inline-flex;cursor:pointer}.ath-dropdown__trigger[role=button]:focus-visible{border-radius:var(--r-sm);outline:none;box-shadow:var(--focus-ring-shadow)}\n"] }]
        }], ctorParameters: () => [] });

/** Below this width only the parent and the current page show. */
const NARROW_QUERY = '(max-width: 640px)';
/**
 * Athene Breadcrumb Component
 *
 * Ancestors are links (to `route` with `queryParams`), the last item is the
 * page (`aria-current`). A trail longer than `maxVisible` keeps its first
 * step and its last two and folds the rest into "…", a menu of the hidden
 * steps; on a phone only parent › current show. Long labels end in an
 * ellipsis with the full text as tooltip.
 *
 * @example
 * <ath-breadcrumb [items]="[{ label: 'Projects', route: '/projects' }, { label: 'Atlas', key: 'ATL' }]" />
 */
class AthBreadcrumbComponent {
    constructor() {
        this.labels = injectAthLabels();
        this.router = inject(Router);
        this.items = input([]);
        /** Accessible name of the landmark; defaults to `ATH_LABELS.breadcrumb`. */
        this.ariaLabel = input(null);
        /** More steps than this fold their middle into "…". */
        this.maxVisible = input(4);
        this.navLabel = computed(() => this.ariaLabel() ?? this.labels.breadcrumb());
        this.moreLabel = computed(() => this.labels.breadcrumbMore());
        this.separatorIcon = ChevronRight;
        this.narrow = signal(false);
        this.shown = computed(() => {
            const all = this.items();
            const lastIndex = all.length - 1;
            const asCrumb = (crumb, i) => ({
                kind: 'crumb',
                crumb,
                last: i === lastIndex,
            });
            if (this.narrow()) {
                return all.slice(-2).map((c, i, arr) => asCrumb(c, i === arr.length - 1 ? lastIndex : -1));
            }
            if (all.length <= this.maxVisible())
                return all.map(asCrumb);
            const hidden = all.slice(1, -2);
            return [
                asCrumb(all[0], 0),
                {
                    kind: 'more',
                    hidden,
                    items: hidden.map((c, i) => ({
                        id: String(i),
                        label: c.key ? `${c.key} · ${c.label}` : c.label,
                    })),
                },
                asCrumb(all[lastIndex - 1], lastIndex - 1),
                asCrumb(all[lastIndex], lastIndex),
            ];
        });
        if (typeof window === 'undefined' || !window.matchMedia)
            return;
        const query = window.matchMedia(NARROW_QUERY);
        this.narrow.set(query.matches);
        const onChange = (e) => this.narrow.set(e.matches);
        query.addEventListener('change', onChange);
        inject(DestroyRef).onDestroy(() => query.removeEventListener('change', onChange));
    }
    /** Where a step links to, if anywhere. */
    target(crumb) {
        return crumb.route ?? crumb.link ?? null;
    }
    openHidden(hidden, id) {
        const crumb = hidden[Number(id)];
        const route = crumb ? this.target(crumb) : null;
        if (route)
            void this.router.navigate([route], { queryParams: crumb?.queryParams ?? {} });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBreadcrumbComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthBreadcrumbComponent, isStandalone: true, selector: "ath-breadcrumb", inputs: { items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, maxVisible: { classPropertyName: "maxVisible", publicName: "maxVisible", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if (items().length > 0) {\n  <nav class=\"ath-breadcrumb\" [attr.aria-label]=\"navLabel()\">\n    <ol class=\"ath-breadcrumb__list\">\n      @for (s of shown(); track $index; let lastItem = $last) {\n        <li class=\"ath-breadcrumb__item\">\n          @if (s.kind === 'more') {\n            <ath-dropdown\n              [items]=\"s.items\"\n              align=\"left\"\n              (itemClicked)=\"openHidden(s.hidden, $event)\"\n            >\n              <span class=\"ath-breadcrumb__more\" [attr.title]=\"moreLabel()\">\u2026</span>\n            </ath-dropdown>\n          } @else if (s.last || !target(s.crumb)) {\n            <span\n              class=\"ath-breadcrumb__current\"\n              [class.ath-breadcrumb__current--quiet]=\"!s.last\"\n              [attr.aria-current]=\"s.last ? 'page' : null\"\n              [attr.title]=\"s.crumb.title ?? s.crumb.label\"\n            >\n              @if (s.crumb.key) {\n                <span class=\"ath-breadcrumb__key\">{{ s.crumb.key }}</span>\n              }\n              <span class=\"ath-breadcrumb__text\">{{ s.crumb.label }}</span>\n            </span>\n          } @else {\n            <a\n              class=\"ath-breadcrumb__link\"\n              [routerLink]=\"target(s.crumb)\"\n              [queryParams]=\"s.crumb.queryParams ?? null\"\n              [attr.title]=\"s.crumb.title ?? s.crumb.label\"\n            >\n              @if (s.crumb.key) {\n                <span class=\"ath-breadcrumb__key\">{{ s.crumb.key }}</span>\n              }\n              <span class=\"ath-breadcrumb__text\">{{ s.crumb.label }}</span>\n            </a>\n          }\n          @if (!lastItem) {\n            <lucide-icon\n              class=\"ath-breadcrumb__separator\"\n              [img]=\"separatorIcon\"\n              [size]=\"10\"\n              aria-hidden=\"true\"\n            />\n          }\n        </li>\n      }\n    </ol>\n  </nav>\n}\n", styles: [".ath-breadcrumb{display:inline-flex;align-items:center;min-width:0;font-family:var(--font-sans)}.ath-breadcrumb__list{display:flex;align-items:center;gap:4px;min-width:0;margin:0;padding:0;list-style:none}.ath-breadcrumb__item{display:inline-flex;align-items:center;gap:4px;min-width:0;flex:0 1 auto}.ath-breadcrumb__item:last-child{flex-shrink:.3}.ath-breadcrumb__text{min-width:0;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-breadcrumb__item:last-child .ath-breadcrumb__text{max-width:360px}.ath-breadcrumb__more{display:inline-grid;place-items:center;min-width:24px;height:22px;padding:0 4px;border-radius:var(--r-xs);color:var(--fg-3);font-size:13px;cursor:pointer}.ath-breadcrumb__more:hover{color:var(--fg);background:var(--bg-2)}.ath-breadcrumb__current--quiet{font-weight:500;color:var(--fg-3)}.ath-breadcrumb__link{display:inline-flex;align-items:center;gap:6px;min-width:0;font-size:13px;font-weight:500;color:var(--fg-3);padding:4px 6px;margin:0 -2px;border-radius:var(--r-xs);text-decoration:none;white-space:nowrap;transition:background .1s ease,color .1s ease}.ath-breadcrumb__link:hover{color:var(--fg);background:var(--bg-2)}.ath-breadcrumb__link:focus-visible{outline:none;box-shadow:0 0 0 2px var(--focus-ring-color)}.ath-breadcrumb__separator{color:var(--fg-4);flex-shrink:0}.ath-breadcrumb__current{display:inline-flex;align-items:center;gap:8px;min-width:0;font-size:13px;font-weight:600;letter-spacing:-.01em;color:var(--fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 4px}.ath-breadcrumb__key{flex-shrink:0;padding:1px 6px;border-radius:var(--r-xs);background:var(--bg-2);color:var(--fg-2);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.02em}\n"], dependencies: [{ kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }, { kind: "component", type: AthDropdownComponent, selector: "ath-dropdown", inputs: ["items", "align"], outputs: ["itemClicked", "openChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBreadcrumbComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-breadcrumb', standalone: true, imports: [RouterLink, LucideAngularModule, AthDropdownComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (items().length > 0) {\n  <nav class=\"ath-breadcrumb\" [attr.aria-label]=\"navLabel()\">\n    <ol class=\"ath-breadcrumb__list\">\n      @for (s of shown(); track $index; let lastItem = $last) {\n        <li class=\"ath-breadcrumb__item\">\n          @if (s.kind === 'more') {\n            <ath-dropdown\n              [items]=\"s.items\"\n              align=\"left\"\n              (itemClicked)=\"openHidden(s.hidden, $event)\"\n            >\n              <span class=\"ath-breadcrumb__more\" [attr.title]=\"moreLabel()\">\u2026</span>\n            </ath-dropdown>\n          } @else if (s.last || !target(s.crumb)) {\n            <span\n              class=\"ath-breadcrumb__current\"\n              [class.ath-breadcrumb__current--quiet]=\"!s.last\"\n              [attr.aria-current]=\"s.last ? 'page' : null\"\n              [attr.title]=\"s.crumb.title ?? s.crumb.label\"\n            >\n              @if (s.crumb.key) {\n                <span class=\"ath-breadcrumb__key\">{{ s.crumb.key }}</span>\n              }\n              <span class=\"ath-breadcrumb__text\">{{ s.crumb.label }}</span>\n            </span>\n          } @else {\n            <a\n              class=\"ath-breadcrumb__link\"\n              [routerLink]=\"target(s.crumb)\"\n              [queryParams]=\"s.crumb.queryParams ?? null\"\n              [attr.title]=\"s.crumb.title ?? s.crumb.label\"\n            >\n              @if (s.crumb.key) {\n                <span class=\"ath-breadcrumb__key\">{{ s.crumb.key }}</span>\n              }\n              <span class=\"ath-breadcrumb__text\">{{ s.crumb.label }}</span>\n            </a>\n          }\n          @if (!lastItem) {\n            <lucide-icon\n              class=\"ath-breadcrumb__separator\"\n              [img]=\"separatorIcon\"\n              [size]=\"10\"\n              aria-hidden=\"true\"\n            />\n          }\n        </li>\n      }\n    </ol>\n  </nav>\n}\n", styles: [".ath-breadcrumb{display:inline-flex;align-items:center;min-width:0;font-family:var(--font-sans)}.ath-breadcrumb__list{display:flex;align-items:center;gap:4px;min-width:0;margin:0;padding:0;list-style:none}.ath-breadcrumb__item{display:inline-flex;align-items:center;gap:4px;min-width:0;flex:0 1 auto}.ath-breadcrumb__item:last-child{flex-shrink:.3}.ath-breadcrumb__text{min-width:0;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-breadcrumb__item:last-child .ath-breadcrumb__text{max-width:360px}.ath-breadcrumb__more{display:inline-grid;place-items:center;min-width:24px;height:22px;padding:0 4px;border-radius:var(--r-xs);color:var(--fg-3);font-size:13px;cursor:pointer}.ath-breadcrumb__more:hover{color:var(--fg);background:var(--bg-2)}.ath-breadcrumb__current--quiet{font-weight:500;color:var(--fg-3)}.ath-breadcrumb__link{display:inline-flex;align-items:center;gap:6px;min-width:0;font-size:13px;font-weight:500;color:var(--fg-3);padding:4px 6px;margin:0 -2px;border-radius:var(--r-xs);text-decoration:none;white-space:nowrap;transition:background .1s ease,color .1s ease}.ath-breadcrumb__link:hover{color:var(--fg);background:var(--bg-2)}.ath-breadcrumb__link:focus-visible{outline:none;box-shadow:0 0 0 2px var(--focus-ring-color)}.ath-breadcrumb__separator{color:var(--fg-4);flex-shrink:0}.ath-breadcrumb__current{display:inline-flex;align-items:center;gap:8px;min-width:0;font-size:13px;font-weight:600;letter-spacing:-.01em;color:var(--fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 4px}.ath-breadcrumb__key{flex-shrink:0;padding:1px 6px;border-radius:var(--r-xs);background:var(--bg-2);color:var(--fg-2);font-family:var(--font-mono);font-size:11px;font-weight:600;letter-spacing:.02em}\n"] }]
        }], ctorParameters: () => [] });

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
        ]
            .filter(Boolean)
            .join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTabsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTabsComponent, isStandalone: true, selector: "ath-tabs", inputs: { tabs: "tabs", activeTab: "activeTab" }, outputs: { tabChanged: "tabChanged" }, ngImport: i0, template: "<div class=\"ath-tabs\" role=\"tablist\">\n  @for (tab of tabs; track tab.id) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n    >\n      <span class=\"ath-tabs__label\">{{ tab.label }}</span>\n      @if (tab.count != null && tab.count !== 0 && tab.count !== '') {\n        <span class=\"ath-tabs__count\">{{ tab.count }}</span>\n      }\n    </button>\n  }\n</div>\n", styles: [".ath-tabs{display:flex;gap:0;border-bottom:1px solid var(--ath-border-color)}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-tertiary);background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;cursor:pointer;transition:all var(--ath-transition-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--ath-text-primary)}.ath-tabs__tab--active{color:var(--tab-active-fg);border-bottom-color:var(--tab-active-indicator)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--tab-active-fg)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--ath-border-color-focus);border-radius:var(--ath-border-radius-sm) var(--ath-border-radius-sm) 0 0}.ath-tabs__label{display:inline-flex;align-items:center}.ath-tabs__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:16px;margin-left:6px;padding:0 5px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;line-height:1;color:var(--fg-3);background:var(--bg-2);border-radius:999px;transition:color var(--t-fast),background var(--t-fast)}.ath-tabs__tab--active .ath-tabs__count{color:var(--segment-count-active-fg);background:var(--segment-count-active-bg)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-tabs', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-tabs\" role=\"tablist\">\n  @for (tab of tabs; track tab.id) {\n    <button\n      type=\"button\"\n      role=\"tab\"\n      [class]=\"getTabClasses(tab)\"\n      [attr.aria-selected]=\"tab.id === activeTab\"\n      [disabled]=\"tab.disabled\"\n      (click)=\"selectTab(tab)\"\n    >\n      <span class=\"ath-tabs__label\">{{ tab.label }}</span>\n      @if (tab.count != null && tab.count !== 0 && tab.count !== '') {\n        <span class=\"ath-tabs__count\">{{ tab.count }}</span>\n      }\n    </button>\n  }\n</div>\n", styles: [".ath-tabs{display:flex;gap:0;border-bottom:1px solid var(--ath-border-color)}.ath-tabs__tab{position:relative;display:inline-flex;align-items:center;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-tertiary);background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;cursor:pointer;transition:all var(--ath-transition-fast);white-space:nowrap}.ath-tabs__tab:hover:not(:disabled){color:var(--ath-text-primary)}.ath-tabs__tab--active{color:var(--tab-active-fg);border-bottom-color:var(--tab-active-indicator)}.ath-tabs__tab--active:hover:not(:disabled){color:var(--tab-active-fg)}.ath-tabs__tab--disabled{opacity:.4;cursor:not-allowed}.ath-tabs__tab:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--ath-border-color-focus);border-radius:var(--ath-border-radius-sm) var(--ath-border-radius-sm) 0 0}.ath-tabs__label{display:inline-flex;align-items:center}.ath-tabs__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:16px;margin-left:6px;padding:0 5px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;line-height:1;color:var(--fg-3);background:var(--bg-2);border-radius:999px;transition:color var(--t-fast),background var(--t-fast)}.ath-tabs__tab--active .ath-tabs__count{color:var(--segment-count-active-fg);background:var(--segment-count-active-bg)}\n"] }]
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
 * Number of avatar colour tones defined in the design tokens
 * (`--avatar-1-bg` … `--avatar-8-bg`, per theme).
 */
const AVATAR_TONE_COUNT = 8;
/**
 * Initials for a display name: first + last word, or the first two letters
 * of a single word. Already-abbreviated input ("DU") passes through.
 */
function avatarInitials(name) {
    const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0)
        return '?';
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
}
/**
 * Deterministic colour tone (1…AVATAR_TONE_COUNT) for an arbitrary key.
 * FNV-1a with a murmur3 finaliser: tiny and stable across sessions.
 */
function toneOfKey(key) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < key.length; i++) {
        hash ^= key.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
    }
    // Final avalanche (murmur3 fmix32): plain FNV on two characters leaves
    // the low bits poorly mixed, which `% 8` would otherwise expose.
    hash ^= hash >>> 16;
    hash = Math.imul(hash, 0x85ebca6b);
    hash ^= hash >>> 13;
    hash = Math.imul(hash, 0xc2b2ae35);
    hash ^= hash >>> 16;
    return ((hash >>> 0) % AVATAR_TONE_COUNT) + 1;
}
/**
 * Colour tone keyed on the initials.
 *
 * @deprecated Two people with the same initials share a colour (DS-09).
 * Pass a stable id to `ath-avatar` (`[person]="{ id, name }"` or `[id]`)
 * so the tone comes from `avatarToneFor`. Kept as the fallback for call
 * sites that only know a name.
 */
function avatarTone(name) {
    return toneOfKey(avatarInitials(name));
}
/**
 * The tone of a person: keyed on their stable id when there is one, so two
 * people with the same initials still differ and one person keeps a colour
 * however a call site spells the name. Without an id it falls back to the
 * initials (the legacy key), and with neither it is `null` (neutral tone).
 */
function avatarToneFor(person) {
    const id = person.id?.trim();
    if (id)
        return toneOfKey(id);
    return person.name?.trim() ? avatarTone(person.name) : null;
}

const ICON_SIZE = { xs: 12, sm: 13, md: 18, lg: 22, xl: 28 };
/**
 * A person as an avatar (image, else initials on a per-person tone), or an
 * empty seat: the soft grey circle with a user glyph, the same size as a
 * person, titled "Unassigned". One symbol for "nobody" everywhere (DS-09).
 *
 * The tone is keyed on the person's stable id, so two people with the same
 * initials differ and one person keeps a colour wherever they appear.
 *
 * @example
 * <ath-avatar [person]="{ id: user.id, name: user.name, src: user.avatar_url }" size="sm" />
 * <ath-avatar [person]="assignee ?? null" size="sm" />   <!-- null → empty seat -->
 * <ath-avatar [unassigned]="true" size="sm" />
 * <ath-avatar name="Mira Voss" />                         <!-- legacy: tone from initials -->
 */
class AthAvatarComponent {
    constructor() {
        this.labels = injectAthLabels();
        /**
         * The person. `null` draws the empty seat; leave it unset to use the
         * separate `name` / `src` / `id` inputs.
         */
        this.person = input(undefined);
        /** Display name (initials and accessible name) when `person` is not used. */
        this.name = input('');
        /** Image URL when `person` is not used. */
        this.src = input('');
        /** Stable id for the tone when `person` is not used. */
        this.id = input(null);
        this.size = input('md');
        /** Draw the empty seat regardless of the other inputs. */
        this.unassigned = input(false);
        /** Accessible name and tooltip; defaults to the name or the "Unassigned" label. */
        this.label = input(null);
        this.userIcon = User;
        this.failedSrc = signal(null);
        this.who = computed(() => {
            const p = this.person();
            return p ?? { id: this.id(), name: this.name(), src: this.src() };
        });
        this.empty = computed(() => this.unassigned() || this.person() === null);
        this.initials = computed(() => avatarInitials(this.who().name));
        this.tone = computed(() => (this.empty() ? null : avatarToneFor(this.who())));
        this.image = computed(() => {
            const src = this.who().src;
            return src && src !== this.failedSrc() ? src : null;
        });
        this.iconSize = computed(() => ICON_SIZE[this.size()]);
        this.accessibleName = computed(() => {
            const explicit = this.label();
            if (explicit)
                return explicit;
            if (this.empty())
                return this.labels.unassigned();
            return this.who().name?.trim() || null;
        });
        /**
         * Tooltip: shown for the empty seat and whenever the avatar was given a
         * person or an explicit label; a bare `name` keeps the old behaviour of
         * no tooltip (the name usually sits next to it).
         */
        this.tooltip = computed(() => this.label() || this.empty() || this.person() ? this.accessibleName() : null);
    }
    onImageError() {
        this.failedSrc.set(this.who().src ?? null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAvatarComponent, isStandalone: true, selector: "ath-avatar", inputs: { person: { classPropertyName: "person", publicName: "person", isSignal: true, isRequired: false, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: false, transformFunction: null }, src: { classPropertyName: "src", publicName: "src", isSignal: true, isRequired: false, transformFunction: null }, id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, unassigned: { classPropertyName: "unassigned", publicName: "unassigned", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if (empty()) {\n  <span\n    class=\"ath-avatar ath-avatar--empty\"\n    [attr.data-size]=\"size()\"\n    role=\"img\"\n    [attr.aria-label]=\"accessibleName()\"\n    [attr.title]=\"tooltip()\"\n  >\n    <lucide-icon [img]=\"userIcon\" [size]=\"iconSize()\" aria-hidden=\"true\" />\n  </span>\n} @else {\n  <span\n    class=\"ath-avatar\"\n    [attr.data-size]=\"size()\"\n    [attr.data-tone]=\"tone()\"\n    role=\"img\"\n    [attr.aria-label]=\"accessibleName()\"\n    [attr.title]=\"tooltip()\"\n  >\n    @if (image(); as url) {\n      <img [src]=\"url\" alt=\"\" class=\"ath-avatar__image\" (error)=\"onImageError()\" />\n    }\n    <span class=\"ath-avatar__initials\" aria-hidden=\"true\">{{ initials() }}</span>\n  </span>\n}\n", styles: [":host{display:inline-flex;flex:none;vertical-align:middle}.ath-avatar{--_size: var(--avatar-md);--_font: var(--avatar-font-md);position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--_size);height:var(--_size);border-radius:var(--r-full);background:var(--avatar-neutral-bg);color:var(--avatar-neutral-fg);font-size:var(--_font);font-weight:var(--weight-semibold);overflow:hidden;-webkit-user-select:none;user-select:none}.ath-avatar[data-size=xs]{--_size: var(--avatar-xs);--_font: var(--avatar-font-xs)}.ath-avatar[data-size=sm]{--_size: var(--avatar-sm);--_font: var(--avatar-font-sm)}.ath-avatar[data-size=lg]{--_size: var(--avatar-lg);--_font: var(--avatar-font-lg)}.ath-avatar[data-size=xl]{--_size: var(--avatar-xl);--_font: var(--avatar-font-xl)}.ath-avatar[data-tone=\"1\"]{background:var(--avatar-1-bg);color:var(--avatar-1-fg)}.ath-avatar[data-tone=\"2\"]{background:var(--avatar-2-bg);color:var(--avatar-2-fg)}.ath-avatar[data-tone=\"3\"]{background:var(--avatar-3-bg);color:var(--avatar-3-fg)}.ath-avatar[data-tone=\"4\"]{background:var(--avatar-4-bg);color:var(--avatar-4-fg)}.ath-avatar[data-tone=\"5\"]{background:var(--avatar-5-bg);color:var(--avatar-5-fg)}.ath-avatar[data-tone=\"6\"]{background:var(--avatar-6-bg);color:var(--avatar-6-fg)}.ath-avatar[data-tone=\"7\"]{background:var(--avatar-7-bg);color:var(--avatar-7-fg)}.ath-avatar[data-tone=\"8\"]{background:var(--avatar-8-bg);color:var(--avatar-8-fg)}.ath-avatar--empty{background:var(--bg-2);color:var(--fg-3)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:var(--z-raised)}.ath-avatar__initials{position:relative;letter-spacing:.5px}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-avatar', standalone: true, imports: [LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (empty()) {\n  <span\n    class=\"ath-avatar ath-avatar--empty\"\n    [attr.data-size]=\"size()\"\n    role=\"img\"\n    [attr.aria-label]=\"accessibleName()\"\n    [attr.title]=\"tooltip()\"\n  >\n    <lucide-icon [img]=\"userIcon\" [size]=\"iconSize()\" aria-hidden=\"true\" />\n  </span>\n} @else {\n  <span\n    class=\"ath-avatar\"\n    [attr.data-size]=\"size()\"\n    [attr.data-tone]=\"tone()\"\n    role=\"img\"\n    [attr.aria-label]=\"accessibleName()\"\n    [attr.title]=\"tooltip()\"\n  >\n    @if (image(); as url) {\n      <img [src]=\"url\" alt=\"\" class=\"ath-avatar__image\" (error)=\"onImageError()\" />\n    }\n    <span class=\"ath-avatar__initials\" aria-hidden=\"true\">{{ initials() }}</span>\n  </span>\n}\n", styles: [":host{display:inline-flex;flex:none;vertical-align:middle}.ath-avatar{--_size: var(--avatar-md);--_font: var(--avatar-font-md);position:relative;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:var(--_size);height:var(--_size);border-radius:var(--r-full);background:var(--avatar-neutral-bg);color:var(--avatar-neutral-fg);font-size:var(--_font);font-weight:var(--weight-semibold);overflow:hidden;-webkit-user-select:none;user-select:none}.ath-avatar[data-size=xs]{--_size: var(--avatar-xs);--_font: var(--avatar-font-xs)}.ath-avatar[data-size=sm]{--_size: var(--avatar-sm);--_font: var(--avatar-font-sm)}.ath-avatar[data-size=lg]{--_size: var(--avatar-lg);--_font: var(--avatar-font-lg)}.ath-avatar[data-size=xl]{--_size: var(--avatar-xl);--_font: var(--avatar-font-xl)}.ath-avatar[data-tone=\"1\"]{background:var(--avatar-1-bg);color:var(--avatar-1-fg)}.ath-avatar[data-tone=\"2\"]{background:var(--avatar-2-bg);color:var(--avatar-2-fg)}.ath-avatar[data-tone=\"3\"]{background:var(--avatar-3-bg);color:var(--avatar-3-fg)}.ath-avatar[data-tone=\"4\"]{background:var(--avatar-4-bg);color:var(--avatar-4-fg)}.ath-avatar[data-tone=\"5\"]{background:var(--avatar-5-bg);color:var(--avatar-5-fg)}.ath-avatar[data-tone=\"6\"]{background:var(--avatar-6-bg);color:var(--avatar-6-fg)}.ath-avatar[data-tone=\"7\"]{background:var(--avatar-7-bg);color:var(--avatar-7-fg)}.ath-avatar[data-tone=\"8\"]{background:var(--avatar-8-bg);color:var(--avatar-8-fg)}.ath-avatar--empty{background:var(--bg-2);color:var(--fg-3)}.ath-avatar__image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:var(--z-raised)}.ath-avatar__initials{position:relative;letter-spacing:.5px}\n"] }]
        }] });

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
        this.labels = injectAthLabels();
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTimelineEntryComponent, isStandalone: true, selector: "ath-timeline-entry", inputs: { author: "author", avatarName: "avatarName", avatarSrc: "avatarSrc", timeLabel: "timeLabel", internal: "internal" }, host: { properties: { "attr.data-internal": "this.hostInternal" } }, ngImport: i0, template: "<div class=\"ath-tl-entry__avatar\">\n  <ath-avatar [name]=\"effectiveAvatarName\" [src]=\"avatarSrc\" size=\"sm\" />\n</div>\n<div class=\"ath-tl-entry__body\">\n  <div class=\"ath-tl-entry__meta\">\n    <b class=\"ath-tl-entry__author\">{{ author }}</b>\n    @if (internal) {\n      <span class=\"ath-tl-entry__internal\" [title]=\"labels.internalNote()\">{{\n        labels.internal()\n      }}</span>\n    }\n    @if (timeLabel) {\n      <span class=\"ath-tl-entry__when\">{{ timeLabel }}</span>\n    }\n  </div>\n  <div class=\"ath-tl-entry__content\">\n    <ng-content />\n  </div>\n</div>\n", styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;position:relative;padding:6px 0}.ath-tl-entry__avatar{position:relative;z-index:var(--z-raised)}.ath-tl-entry__avatar ath-avatar{box-shadow:0 0 0 2px var(--bg-0);border-radius:999px;display:inline-flex}.ath-tl-entry__body{min-width:0}.ath-tl-entry__meta{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;font-family:var(--font-sans);font-size:12.5px;line-height:1.4}.ath-tl-entry__author{color:var(--fg);font-weight:600}.ath-tl-entry__internal{display:inline-flex;align-items:center;padding:1px 6px;font-size:10.5px;font-weight:500;color:var(--amber-text);background:var(--amber-tint);border-radius:var(--r-xs);text-transform:lowercase;letter-spacing:.02em}.ath-tl-entry__when{color:var(--fg-3);font-family:var(--font-mono);font-size:11px}.ath-tl-entry__content{color:var(--fg-2);font-size:13px;line-height:1.55}.ath-tl-entry__content ::ng-deep p{margin:0 0 6px}.ath-tl-entry__content ::ng-deep p:last-child{margin-bottom:0}.ath-tl-entry__content ::ng-deep code{font-family:var(--font-mono);font-size:12px;padding:1px 5px;background:var(--surface-3);border-radius:var(--r-xs);color:var(--fg)}:host([data-internal=true]){padding:8px 10px;background:var(--amber-tint);border-radius:var(--r);margin-left:-10px;margin-right:-10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthAvatarComponent, selector: "ath-avatar", inputs: ["person", "name", "src", "id", "size", "unassigned", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineEntryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timeline-entry', standalone: true, imports: [CommonModule, AthAvatarComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-tl-entry__avatar\">\n  <ath-avatar [name]=\"effectiveAvatarName\" [src]=\"avatarSrc\" size=\"sm\" />\n</div>\n<div class=\"ath-tl-entry__body\">\n  <div class=\"ath-tl-entry__meta\">\n    <b class=\"ath-tl-entry__author\">{{ author }}</b>\n    @if (internal) {\n      <span class=\"ath-tl-entry__internal\" [title]=\"labels.internalNote()\">{{\n        labels.internal()\n      }}</span>\n    }\n    @if (timeLabel) {\n      <span class=\"ath-tl-entry__when\">{{ timeLabel }}</span>\n    }\n  </div>\n  <div class=\"ath-tl-entry__content\">\n    <ng-content />\n  </div>\n</div>\n", styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;position:relative;padding:6px 0}.ath-tl-entry__avatar{position:relative;z-index:var(--z-raised)}.ath-tl-entry__avatar ath-avatar{box-shadow:0 0 0 2px var(--bg-0);border-radius:999px;display:inline-flex}.ath-tl-entry__body{min-width:0}.ath-tl-entry__meta{display:flex;align-items:baseline;gap:8px;margin-bottom:4px;font-family:var(--font-sans);font-size:12.5px;line-height:1.4}.ath-tl-entry__author{color:var(--fg);font-weight:600}.ath-tl-entry__internal{display:inline-flex;align-items:center;padding:1px 6px;font-size:10.5px;font-weight:500;color:var(--amber-text);background:var(--amber-tint);border-radius:var(--r-xs);text-transform:lowercase;letter-spacing:.02em}.ath-tl-entry__when{color:var(--fg-3);font-family:var(--font-mono);font-size:11px}.ath-tl-entry__content{color:var(--fg-2);font-size:13px;line-height:1.55}.ath-tl-entry__content ::ng-deep p{margin:0 0 6px}.ath-tl-entry__content ::ng-deep p:last-child{margin-bottom:0}.ath-tl-entry__content ::ng-deep code{font-family:var(--font-mono);font-size:12px;padding:1px 5px;background:var(--surface-3);border-radius:var(--r-xs);color:var(--fg)}:host([data-internal=true]){padding:8px 10px;background:var(--amber-tint);border-radius:var(--r);margin-left:-10px;margin-right:-10px}\n"] }]
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthTimelineEventComponent, isStandalone: true, selector: "ath-timeline-event", inputs: { statusColor: "statusColor" }, ngImport: i0, template: "<div class=\"ath-tl-event__dot-wrap\">\n  <span class=\"ath-tl-event__dot\" [style.background]=\"statusColor\"></span>\n</div>\n<div class=\"ath-tl-event__text\">\n  <ng-content />\n</div>\n", styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;align-items:center;padding:4px 0;font-family:var(--font-sans);font-size:12.5px;color:var(--fg-3);line-height:1.4}.ath-tl-event__dot-wrap{display:flex;align-items:center;justify-content:center;position:relative;z-index:var(--z-raised)}.ath-tl-event__dot{width:8px;height:8px;border-radius:999px;box-shadow:0 0 0 3px var(--bg-0)}.ath-tl-event__text{min-width:0}.ath-tl-event__text ::ng-deep b{color:var(--fg);font-weight:600}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimelineEventComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timeline-event', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-tl-event__dot-wrap\">\n  <span class=\"ath-tl-event__dot\" [style.background]=\"statusColor\"></span>\n</div>\n<div class=\"ath-tl-event__text\">\n  <ng-content />\n</div>\n", styles: [":host{display:grid;grid-template-columns:24px 1fr;gap:10px;align-items:center;padding:4px 0;font-family:var(--font-sans);font-size:12.5px;color:var(--fg-3);line-height:1.4}.ath-tl-event__dot-wrap{display:flex;align-items:center;justify-content:center;position:relative;z-index:var(--z-raised)}.ath-tl-event__dot{width:8px;height:8px;border-radius:999px;box-shadow:0 0 0 3px var(--bg-0)}.ath-tl-event__text{min-width:0}.ath-tl-event__text ::ng-deep b{color:var(--fg);font-weight:600}\n"] }]
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
        ]
            .filter(Boolean)
            .join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthCardComponent, isStandalone: true, selector: "ath-card", inputs: { padding: "padding", bordered: "bordered", hoverable: "hoverable", header: "header", footer: "footer" }, ngImport: i0, template: "<div [class]=\"cardClasses\">\n  @if (header) {\n    <div class=\"ath-card__header\">\n      <ng-content select=\"[slot=header]\" />\n    </div>\n  }\n\n  <div class=\"ath-card__body\">\n    <ng-content />\n  </div>\n\n  @if (footer) {\n    <div class=\"ath-card__footer\">\n      <ng-content select=\"[slot=footer]\" />\n    </div>\n  }\n</div>\n", styles: [".ath-card{background-color:var(--ath-bg-panel);border-radius:var(--panel-radius);box-shadow:var(--ath-shadow-sm);transition:box-shadow var(--ath-transition-fast),transform var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-card--padding-none .ath-card__body{padding:0}.ath-card--padding-sm .ath-card__body{padding:var(--ath-space-3)}.ath-card--padding-md .ath-card__body{padding:var(--panel-pad-y) var(--panel-pad-x)}.ath-card--padding-lg .ath-card__body{padding:var(--ath-space-6)}.ath-card--bordered{border:1px solid var(--ath-border-color)}.ath-card--hoverable{cursor:pointer}.ath-card--hoverable:hover{box-shadow:var(--ath-shadow-md);transform:translateY(-2px);border-color:var(--ath-border-color-hover)}.ath-card__header{display:flex;align-items:center;min-height:var(--panel-head-h);padding:0 var(--panel-pad-x);font-size:var(--panel-title-size);border-bottom:1px solid var(--ath-border-color);font-weight:var(--ath-font-weight-semibold)}.ath-card__footer{padding:var(--panel-pad-y) var(--panel-pad-x);border-top:1px solid var(--ath-border-color);background-color:var(--ath-bg-tertiary);border-radius:0 0 var(--ath-border-radius-lg) var(--ath-border-radius-lg)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-card', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"cardClasses\">\n  @if (header) {\n    <div class=\"ath-card__header\">\n      <ng-content select=\"[slot=header]\" />\n    </div>\n  }\n\n  <div class=\"ath-card__body\">\n    <ng-content />\n  </div>\n\n  @if (footer) {\n    <div class=\"ath-card__footer\">\n      <ng-content select=\"[slot=footer]\" />\n    </div>\n  }\n</div>\n", styles: [".ath-card{background-color:var(--ath-bg-panel);border-radius:var(--panel-radius);box-shadow:var(--ath-shadow-sm);transition:box-shadow var(--ath-transition-fast),transform var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-card--padding-none .ath-card__body{padding:0}.ath-card--padding-sm .ath-card__body{padding:var(--ath-space-3)}.ath-card--padding-md .ath-card__body{padding:var(--panel-pad-y) var(--panel-pad-x)}.ath-card--padding-lg .ath-card__body{padding:var(--ath-space-6)}.ath-card--bordered{border:1px solid var(--ath-border-color)}.ath-card--hoverable{cursor:pointer}.ath-card--hoverable:hover{box-shadow:var(--ath-shadow-md);transform:translateY(-2px);border-color:var(--ath-border-color-hover)}.ath-card__header{display:flex;align-items:center;min-height:var(--panel-head-h);padding:0 var(--panel-pad-x);font-size:var(--panel-title-size);border-bottom:1px solid var(--ath-border-color);font-weight:var(--ath-font-weight-semibold)}.ath-card__footer{padding:var(--panel-pad-y) var(--panel-pad-x);border-top:1px solid var(--ath-border-color);background-color:var(--ath-bg-tertiary);border-radius:0 0 var(--ath-border-radius-lg) var(--ath-border-radius-lg)}\n"] }]
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
 * The line, area and last point for `values` in a `width` × `height` box
 * (1px inset, so the stroke is never clipped). Pure, for tests.
 */
function sparklineGeometry(values, width, height) {
    if (values.length < 2)
        return null;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const points = values.map((v, i) => {
        const x = (i / (values.length - 1)) * (width - 2) + 1;
        const y = height - 2 - ((v - min) / range) * (height - 4);
        return [x, y];
    });
    const linePath = points
        .map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1))
        .join(' ');
    const areaPath = `${linePath} L ${width - 1},${height - 1} L 1,${height - 1} Z`;
    const last = points[points.length - 1];
    return { linePath, areaPath, lastX: last[0], lastY: last[1] };
}
/**
 * Mini line chart: no axes, no labels, no charting library. A filled area
 * under a thin line and a dot on the latest value; nothing at all below
 * two samples (a cold-start dashboard has no trend yet). Decorative
 * (`aria-hidden`): the figure next to it carries the meaning.
 *
 * @example
 * <ath-sparkline [data]="[12, 14, 13, 18, 22, 20, 24]" color="var(--green)" />
 * <ath-sparkline [data]="trend" [width]="86" [height]="28" [showArea]="false" />
 */
class AthSparklineComponent {
    constructor() {
        /** Values to plot; fewer than two renders nothing. */
        this.data = input([]);
        /** Width in px (the KPI tile's footprint by default). */
        this.width = input(70);
        /** Height in px. */
        this.height = input(22);
        /** Any CSS colour, e.g. `var(--green)`. */
        this.color = input('var(--accent)');
        /** Dot on the most recent value. */
        this.showDot = input(true);
        /** Translucent area under the line. */
        this.showArea = input(true);
        /** Stroke width in px. */
        this.strokeWidth = input(1.2);
        this.geometry = computed(() => sparklineGeometry(this.data() ?? [], this.width(), this.height()));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSparklineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSparklineComponent, isStandalone: true, selector: "ath-sparkline", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, showDot: { classPropertyName: "showDot", publicName: "showDot", isSignal: true, isRequired: false, transformFunction: null }, showArea: { classPropertyName: "showArea", publicName: "showArea", isSignal: true, isRequired: false, transformFunction: null }, strokeWidth: { classPropertyName: "strokeWidth", publicName: "strokeWidth", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if (geometry(); as g) {\n  <svg\n    class=\"ath-sparkline\"\n    [attr.width]=\"width()\"\n    [attr.height]=\"height()\"\n    [attr.viewBox]=\"'0 0 ' + width() + ' ' + height()\"\n    aria-hidden=\"true\"\n    focusable=\"false\"\n  >\n    @if (showArea()) {\n      <path class=\"ath-sparkline__area\" [attr.d]=\"g.areaPath\" [attr.fill]=\"color()\" />\n    }\n    <path\n      class=\"ath-sparkline__line\"\n      [attr.d]=\"g.linePath\"\n      [attr.stroke]=\"color()\"\n      [attr.stroke-width]=\"strokeWidth()\"\n    />\n    @if (showDot()) {\n      <circle\n        class=\"ath-sparkline__dot\"\n        [attr.cx]=\"g.lastX\"\n        [attr.cy]=\"g.lastY\"\n        r=\"2\"\n        [attr.fill]=\"color()\"\n      />\n    }\n  </svg>\n}\n", styles: [":host{display:inline-flex;line-height:0}.ath-sparkline{display:block;overflow:visible}.ath-sparkline__area{opacity:.15;stroke:none}.ath-sparkline__line{fill:none;stroke-linecap:round;stroke-linejoin:round}.ath-sparkline__dot{opacity:.95}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSparklineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sparkline', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (geometry(); as g) {\n  <svg\n    class=\"ath-sparkline\"\n    [attr.width]=\"width()\"\n    [attr.height]=\"height()\"\n    [attr.viewBox]=\"'0 0 ' + width() + ' ' + height()\"\n    aria-hidden=\"true\"\n    focusable=\"false\"\n  >\n    @if (showArea()) {\n      <path class=\"ath-sparkline__area\" [attr.d]=\"g.areaPath\" [attr.fill]=\"color()\" />\n    }\n    <path\n      class=\"ath-sparkline__line\"\n      [attr.d]=\"g.linePath\"\n      [attr.stroke]=\"color()\"\n      [attr.stroke-width]=\"strokeWidth()\"\n    />\n    @if (showDot()) {\n      <circle\n        class=\"ath-sparkline__dot\"\n        [attr.cx]=\"g.lastX\"\n        [attr.cy]=\"g.lastY\"\n        r=\"2\"\n        [attr.fill]=\"color()\"\n      />\n    }\n  </svg>\n}\n", styles: [":host{display:inline-flex;line-height:0}.ath-sparkline{display:block;overflow:visible}.ath-sparkline__area{opacity:.15;stroke:none}.ath-sparkline__line{fill:none;stroke-linecap:round;stroke-linejoin:round}.ath-sparkline__dot{opacity:.95}\n"] }]
        }] });

const SPARK_COLOR = {
    neutral: 'var(--fg-3)',
    amber: 'var(--amber)',
    blue: 'var(--blue)',
    green: 'var(--green)',
    red: 'var(--red)',
};
/** A trend worth drawing: two samples or more, and not all zero. */
function hasKpiTrend(spark) {
    return !!spark && spark.length >= 2 && spark.some((n) => n !== 0);
}
/**
 * One cell of a KPI strip (`ath-kpi-strip`): label, figure, an optional
 * delta badge, and a trend or a quiet note bottom-right. The tile carries
 * no chrome of its own; the strip draws one card and hairlines between the
 * tiles, so the row reads as one instrument panel.
 *
 * With `link` the whole cell is the hit area (a stretched link on the
 * label), still drawn as part of the strip.
 *
 * Replaces the app's `metric-card`; `ath-stat-card` is a deprecated alias.
 *
 * @example
 * <ath-kpi-strip>
 *   <ath-kpi-tile label="Due today" [value]="1" [alert]="true" delta="+1" deltaDirection="down"
 *                 deltaTitle="1 overdue" />
 *   <ath-kpi-tile label="This week" [value]="3" tone="blue" [spark]="[1,2,2,3,2,4,3]" />
 *   <ath-kpi-tile label="Story points" [value]="24" note="3 done" />
 *   <ath-kpi-tile label="In review" [value]="2" link="/app/tickets" [linkParams]="{ status: 'review' }"
 *                 linkLabel="Show in-review tickets" />
 *   <ath-kpi-tile label="In progress" [value]="4" valueTone="amber" dot="var(--amber)" />
 *   <ath-kpi-tile label="Progress" value="62%"><my-progress-bar /></ath-kpi-tile>
 * </ath-kpi-strip>
 *
 * Projected content sits under the figure (a progress bar, a short line).
 */
class AthKpiTileComponent {
    constructor() {
        this.label = input.required();
        this.value = input(0);
        /** Pre-formatted delta ("+1", "−2"); `null` hides the badge. */
        this.delta = input(null);
        this.deltaDirection = input(null);
        /** Long form of a compact delta ("+1" → "1 overdue"): tooltip and accessible name. */
        this.deltaTitle = input(null);
        /** Tints the trend line. */
        this.tone = input('neutral');
        /** Trend samples; fewer than two, or all zero, draw nothing. */
        this.spark = input(null);
        /** @deprecated Use `spark`. */
        this.sparkData = input(null);
        /** Overrides the tone's trend colour. */
        this.sparkColor = input(null);
        /** A small quiet note bottom-right ("3 done"), drawn instead of a trend. */
        this.note = input(null);
        this.noteTitle = input(null);
        /** The figure in red: something needs attention now. */
        this.alert = input(false);
        /**
         * The figure in a status colour (`--amber-text`, `--blue-text` …), e.g. a
         * count of tickets in a status. `alert` and `muted` win over it.
         */
        this.valueTone = input(null);
        /** A small dot in this CSS colour before the label (a status key). */
        this.dot = input(null);
        /** Nothing to count: a quiet figure (pass "–" for a zero), no trend. */
        this.muted = input(false);
        /** Where the tile leads (router link). */
        this.link = input(null);
        this.linkParams = input(null);
        /** Accessible name of the link; defaults to the label. */
        this.linkLabel = input(null);
        this.samples = computed(() => this.spark() ?? this.sparkData() ?? null);
        this.showTrend = computed(() => !this.muted() && hasKpiTrend(this.samples()));
        this.trendColor = computed(() => this.sparkColor() ?? SPARK_COLOR[this.tone()]);
        this.routerLink = computed(() => this.link());
        /** `alert` and `muted` say more than a status colour, so they win. */
        this.figureTone = computed(() => this.alert() || this.muted() ? null : (this.valueTone() ?? null));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKpiTileComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthKpiTileComponent, isStandalone: true, selector: "ath-kpi-tile", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, delta: { classPropertyName: "delta", publicName: "delta", isSignal: true, isRequired: false, transformFunction: null }, deltaDirection: { classPropertyName: "deltaDirection", publicName: "deltaDirection", isSignal: true, isRequired: false, transformFunction: null }, deltaTitle: { classPropertyName: "deltaTitle", publicName: "deltaTitle", isSignal: true, isRequired: false, transformFunction: null }, tone: { classPropertyName: "tone", publicName: "tone", isSignal: true, isRequired: false, transformFunction: null }, spark: { classPropertyName: "spark", publicName: "spark", isSignal: true, isRequired: false, transformFunction: null }, sparkData: { classPropertyName: "sparkData", publicName: "sparkData", isSignal: true, isRequired: false, transformFunction: null }, sparkColor: { classPropertyName: "sparkColor", publicName: "sparkColor", isSignal: true, isRequired: false, transformFunction: null }, note: { classPropertyName: "note", publicName: "note", isSignal: true, isRequired: false, transformFunction: null }, noteTitle: { classPropertyName: "noteTitle", publicName: "noteTitle", isSignal: true, isRequired: false, transformFunction: null }, alert: { classPropertyName: "alert", publicName: "alert", isSignal: true, isRequired: false, transformFunction: null }, valueTone: { classPropertyName: "valueTone", publicName: "valueTone", isSignal: true, isRequired: false, transformFunction: null }, dot: { classPropertyName: "dot", publicName: "dot", isSignal: true, isRequired: false, transformFunction: null }, muted: { classPropertyName: "muted", publicName: "muted", isSignal: true, isRequired: false, transformFunction: null }, link: { classPropertyName: "link", publicName: "link", isSignal: true, isRequired: false, transformFunction: null }, linkParams: { classPropertyName: "linkParams", publicName: "linkParams", isSignal: true, isRequired: false, transformFunction: null }, linkLabel: { classPropertyName: "linkLabel", publicName: "linkLabel", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-tone": "tone()", "class.ath-kpi--link": "link() !== null" } }, ngImport: i0, template: "<div class=\"ath-kpi__row\">\n  @if (link() !== null) {\n    <a\n      class=\"ath-kpi__label ath-kpi__link\"\n      [routerLink]=\"routerLink()\"\n      [queryParams]=\"linkParams()\"\n      [attr.aria-label]=\"linkLabel() ?? label()\"\n    >\n      @if (dot()) {\n        <span class=\"ath-kpi__dot\" [style.background]=\"dot()\" aria-hidden=\"true\"></span>\n      }\n      {{ label() }}</a\n    >\n  } @else {\n    <span class=\"ath-kpi__label\">\n      @if (dot()) {\n        <span class=\"ath-kpi__dot\" [style.background]=\"dot()\" aria-hidden=\"true\"></span>\n      }\n      {{ label() }}</span\n    >\n  }\n  @if (delta() !== null && delta() !== undefined) {\n    <span\n      class=\"ath-kpi__delta\"\n      [attr.data-direction]=\"deltaDirection() ?? 'neutral'\"\n      [attr.title]=\"deltaTitle()\"\n      [attr.aria-label]=\"deltaTitle()\"\n      >{{ delta() }}</span\n    >\n  }\n</div>\n\n<div class=\"ath-kpi__bottom\">\n  <span\n    class=\"ath-kpi__value\"\n    [attr.data-tone]=\"figureTone()\"\n    [class.ath-kpi__value--alert]=\"alert()\"\n    [class.ath-kpi__value--muted]=\"muted()\"\n    >{{ value() }}</span\n  >\n  @if (note()) {\n    <span class=\"ath-kpi__note\" [attr.title]=\"noteTitle()\">{{ note() }}</span>\n  } @else if (showTrend()) {\n    <ath-sparkline [data]=\"samples()\" [color]=\"trendColor()\" />\n  } @else {\n    <!-- No trend: the slot keeps the sparkline's footprint so tiles line up. -->\n    <span class=\"ath-kpi__spark-slot\" aria-hidden=\"true\"></span>\n  }\n</div>\n\n<!-- Under the figure: a progress bar or a short line; nothing when empty. -->\n<div class=\"ath-kpi__extra\"><ng-content /></div>\n", styles: [":host{display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-width:0;padding:11px var(--space-4);border-left:1px solid var(--border-faint);background:var(--surface)}:host(:first-child){border-left:none}@container ath-kpi-strip (max-width: 920px){:host(:nth-child(odd)){border-left:none}:host(:nth-child(n+3)){border-top:1px solid var(--border-faint)}}.ath-kpi__row{display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)}.ath-kpi__label{overflow:hidden;color:var(--fg-3);font-size:var(--text-sm);font-weight:var(--weight-medium);letter-spacing:-.003em;text-overflow:ellipsis;white-space:nowrap}.ath-kpi__dot{display:inline-block;width:7px;height:7px;margin-inline-end:3px;border-radius:var(--r-full);vertical-align:.05em}.ath-kpi__delta{position:relative;z-index:var(--z-raised);padding:0 var(--space-1);border-radius:var(--r-xs);background:var(--bg-2);color:var(--fg-3);font-family:var(--font-mono);font-size:10.5px;font-feature-settings:\"tnum\";font-weight:var(--weight-medium);line-height:14px;white-space:nowrap}.ath-kpi__delta[data-direction=up]{background:color-mix(in srgb,var(--green) 14%,transparent);color:var(--green-text)}.ath-kpi__delta[data-direction=down]{background:color-mix(in srgb,var(--red) 14%,transparent);color:var(--red-text)}.ath-kpi__bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}.ath-kpi__value{color:var(--fg);font-family:var(--font-sans);font-size:var(--text-2xl);font-variant-numeric:tabular-nums;font-weight:var(--weight-semibold);letter-spacing:-.02em;line-height:1}.ath-kpi__value[data-tone=amber]{color:var(--amber-text)}.ath-kpi__value[data-tone=blue]{color:var(--blue-text)}.ath-kpi__value[data-tone=green]{color:var(--green-text)}.ath-kpi__value[data-tone=red]{color:var(--red-text)}.ath-kpi__value[data-tone=purple]{color:var(--purple-text)}.ath-kpi__value--alert{color:var(--red-text)}.ath-kpi__value--muted{color:var(--fg-4);font-weight:var(--weight-medium)}.ath-kpi__note{color:var(--fg-3);font-family:var(--font-mono);font-size:var(--text-xs);line-height:22px;white-space:nowrap}.ath-kpi__extra{margin-top:-4px}.ath-kpi__extra:empty{display:none}.ath-kpi__spark-slot{display:inline-block;width:70px;height:22px}:host(.ath-kpi--link){position:relative;transition:background var(--t-fast)}:host(.ath-kpi--link):hover{background:var(--bg-2)}:host(.ath-kpi--link):has(.ath-kpi__link:focus-visible){box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-kpi__link{text-decoration:none}.ath-kpi__link:after{content:\"\";position:absolute;inset:0}.ath-kpi__link:focus-visible{outline:none}:host(.ath-kpi--link:hover) .ath-kpi__link{color:var(--fg)}\n"], dependencies: [{ kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: AthSparklineComponent, selector: "ath-sparkline", inputs: ["data", "width", "height", "color", "showDot", "showArea", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKpiTileComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-kpi-tile', standalone: true, imports: [RouterLink, AthSparklineComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-tone]': 'tone()',
                        '[class.ath-kpi--link]': 'link() !== null',
                    }, template: "<div class=\"ath-kpi__row\">\n  @if (link() !== null) {\n    <a\n      class=\"ath-kpi__label ath-kpi__link\"\n      [routerLink]=\"routerLink()\"\n      [queryParams]=\"linkParams()\"\n      [attr.aria-label]=\"linkLabel() ?? label()\"\n    >\n      @if (dot()) {\n        <span class=\"ath-kpi__dot\" [style.background]=\"dot()\" aria-hidden=\"true\"></span>\n      }\n      {{ label() }}</a\n    >\n  } @else {\n    <span class=\"ath-kpi__label\">\n      @if (dot()) {\n        <span class=\"ath-kpi__dot\" [style.background]=\"dot()\" aria-hidden=\"true\"></span>\n      }\n      {{ label() }}</span\n    >\n  }\n  @if (delta() !== null && delta() !== undefined) {\n    <span\n      class=\"ath-kpi__delta\"\n      [attr.data-direction]=\"deltaDirection() ?? 'neutral'\"\n      [attr.title]=\"deltaTitle()\"\n      [attr.aria-label]=\"deltaTitle()\"\n      >{{ delta() }}</span\n    >\n  }\n</div>\n\n<div class=\"ath-kpi__bottom\">\n  <span\n    class=\"ath-kpi__value\"\n    [attr.data-tone]=\"figureTone()\"\n    [class.ath-kpi__value--alert]=\"alert()\"\n    [class.ath-kpi__value--muted]=\"muted()\"\n    >{{ value() }}</span\n  >\n  @if (note()) {\n    <span class=\"ath-kpi__note\" [attr.title]=\"noteTitle()\">{{ note() }}</span>\n  } @else if (showTrend()) {\n    <ath-sparkline [data]=\"samples()\" [color]=\"trendColor()\" />\n  } @else {\n    <!-- No trend: the slot keeps the sparkline's footprint so tiles line up. -->\n    <span class=\"ath-kpi__spark-slot\" aria-hidden=\"true\"></span>\n  }\n</div>\n\n<!-- Under the figure: a progress bar or a short line; nothing when empty. -->\n<div class=\"ath-kpi__extra\"><ng-content /></div>\n", styles: [":host{display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-width:0;padding:11px var(--space-4);border-left:1px solid var(--border-faint);background:var(--surface)}:host(:first-child){border-left:none}@container ath-kpi-strip (max-width: 920px){:host(:nth-child(odd)){border-left:none}:host(:nth-child(n+3)){border-top:1px solid var(--border-faint)}}.ath-kpi__row{display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)}.ath-kpi__label{overflow:hidden;color:var(--fg-3);font-size:var(--text-sm);font-weight:var(--weight-medium);letter-spacing:-.003em;text-overflow:ellipsis;white-space:nowrap}.ath-kpi__dot{display:inline-block;width:7px;height:7px;margin-inline-end:3px;border-radius:var(--r-full);vertical-align:.05em}.ath-kpi__delta{position:relative;z-index:var(--z-raised);padding:0 var(--space-1);border-radius:var(--r-xs);background:var(--bg-2);color:var(--fg-3);font-family:var(--font-mono);font-size:10.5px;font-feature-settings:\"tnum\";font-weight:var(--weight-medium);line-height:14px;white-space:nowrap}.ath-kpi__delta[data-direction=up]{background:color-mix(in srgb,var(--green) 14%,transparent);color:var(--green-text)}.ath-kpi__delta[data-direction=down]{background:color-mix(in srgb,var(--red) 14%,transparent);color:var(--red-text)}.ath-kpi__bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}.ath-kpi__value{color:var(--fg);font-family:var(--font-sans);font-size:var(--text-2xl);font-variant-numeric:tabular-nums;font-weight:var(--weight-semibold);letter-spacing:-.02em;line-height:1}.ath-kpi__value[data-tone=amber]{color:var(--amber-text)}.ath-kpi__value[data-tone=blue]{color:var(--blue-text)}.ath-kpi__value[data-tone=green]{color:var(--green-text)}.ath-kpi__value[data-tone=red]{color:var(--red-text)}.ath-kpi__value[data-tone=purple]{color:var(--purple-text)}.ath-kpi__value--alert{color:var(--red-text)}.ath-kpi__value--muted{color:var(--fg-4);font-weight:var(--weight-medium)}.ath-kpi__note{color:var(--fg-3);font-family:var(--font-mono);font-size:var(--text-xs);line-height:22px;white-space:nowrap}.ath-kpi__extra{margin-top:-4px}.ath-kpi__extra:empty{display:none}.ath-kpi__spark-slot{display:inline-block;width:70px;height:22px}:host(.ath-kpi--link){position:relative;transition:background var(--t-fast)}:host(.ath-kpi--link):hover{background:var(--bg-2)}:host(.ath-kpi--link):has(.ath-kpi__link:focus-visible){box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-kpi__link{text-decoration:none}.ath-kpi__link:after{content:\"\";position:absolute;inset:0}.ath-kpi__link:focus-visible{outline:none}:host(.ath-kpi--link:hover) .ath-kpi__link{color:var(--fg)}\n"] }]
        }] });
/**
 * The card around a row of `ath-kpi-tile`s: one border, radius and shadow,
 * hairlines between the tiles, `columns` equal columns (default: one per
 * tile up to 4); two columns when the strip is narrower than 920px.
 *
 * @example
 * <ath-kpi-strip [columns]="4"> <ath-kpi-tile … /> … </ath-kpi-strip>
 */
class AthKpiStripComponent {
    constructor() {
        /** Number of columns on wide screens. */
        this.columns = input(4);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKpiStripComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthKpiStripComponent, isStandalone: true, selector: "ath-kpi-strip", inputs: { columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "role": "group" } }, ngImport: i0, template: `<div class="ath-kpi-strip" [style.--_kpi-cols]="columns()"><ng-content /></div>`, isInline: true, styles: [":host{display:block;min-width:0;container:ath-kpi-strip/inline-size}.ath-kpi-strip{--_kpi-cols: 4;display:grid;grid-template-columns:repeat(var(--_kpi-cols),minmax(0,1fr));overflow:hidden;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface);box-shadow:var(--shadow-1)}@container ath-kpi-strip (max-width: 920px){.ath-kpi-strip{grid-template-columns:repeat(2,minmax(0,1fr))}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKpiStripComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-kpi-strip', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: { role: 'group' }, template: `<div class="ath-kpi-strip" [style.--_kpi-cols]="columns()"><ng-content /></div>`, styles: [":host{display:block;min-width:0;container:ath-kpi-strip/inline-size}.ath-kpi-strip{--_kpi-cols: 4;display:grid;grid-template-columns:repeat(var(--_kpi-cols),minmax(0,1fr));overflow:hidden;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface);box-shadow:var(--shadow-1)}@container ath-kpi-strip (max-width: 920px){.ath-kpi-strip{grid-template-columns:repeat(2,minmax(0,1fr))}}\n"] }]
        }] });

/**
 * A single label/value card.
 *
 * @deprecated One KPI API: use `ath-kpi-tile` inside `ath-kpi-strip`. This
 * renders exactly that (a strip of one tile) and maps the old inputs:
 * `subValue` → `note`, `sparkData` → `spark`, `trend` → a "↑"/"↓" delta.
 * Removed in quality step 2.7.
 *
 * @example
 * <ath-stat-card label="Open" value="42" delta="+5" deltaDirection="up" />
 */
class AthStatCardComponent {
    constructor() {
        this.label = input.required();
        this.value = input('');
        this.subValue = input('');
        this.trend = input(null);
        this.delta = input(null);
        this.deltaDirection = input(null);
        this.sparkData = input(null);
        this.sparkColor = input(null);
        this.shownDelta = computed(() => {
            const delta = this.delta();
            if (delta != null)
                return delta;
            const trend = this.trend();
            return trend ? (trend === 'up' ? '↑' : '↓') : null;
        });
        this.shownDirection = computed(() => this.deltaDirection() ?? this.trend() ?? null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthStatCardComponent, isStandalone: true, selector: "ath-stat-card", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, subValue: { classPropertyName: "subValue", publicName: "subValue", isSignal: true, isRequired: false, transformFunction: null }, trend: { classPropertyName: "trend", publicName: "trend", isSignal: true, isRequired: false, transformFunction: null }, delta: { classPropertyName: "delta", publicName: "delta", isSignal: true, isRequired: false, transformFunction: null }, deltaDirection: { classPropertyName: "deltaDirection", publicName: "deltaDirection", isSignal: true, isRequired: false, transformFunction: null }, sparkData: { classPropertyName: "sparkData", publicName: "sparkData", isSignal: true, isRequired: false, transformFunction: null }, sparkColor: { classPropertyName: "sparkColor", publicName: "sparkColor", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <ath-kpi-strip [columns]="1">
      <ath-kpi-tile
        [label]="label()"
        [value]="value()"
        [delta]="shownDelta()"
        [deltaDirection]="shownDirection()"
        [note]="subValue() || null"
        [spark]="sparkData()"
        [sparkColor]="sparkColor()"
      />
    </ath-kpi-strip>
  `, isInline: true, styles: [":host{display:block}\n"], dependencies: [{ kind: "component", type: AthKpiStripComponent, selector: "ath-kpi-strip", inputs: ["columns"] }, { kind: "component", type: AthKpiTileComponent, selector: "ath-kpi-tile", inputs: ["label", "value", "delta", "deltaDirection", "deltaTitle", "tone", "spark", "sparkData", "sparkColor", "note", "noteTitle", "alert", "valueTone", "dot", "muted", "link", "linkParams", "linkLabel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-stat-card', standalone: true, imports: [AthKpiStripComponent, AthKpiTileComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <ath-kpi-strip [columns]="1">
      <ath-kpi-tile
        [label]="label()"
        [value]="value()"
        [delta]="shownDelta()"
        [deltaDirection]="shownDirection()"
        [note]="subValue() || null"
        [spark]="sparkData()"
        [sparkColor]="sparkColor()"
      />
    </ath-kpi-strip>
  `, styles: [":host{display:block}\n"] }]
        }] });

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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthTableComponent, isStandalone: true, selector: "ath-table", ngImport: i0, template: "<div class=\"ath-table\">\n  <table class=\"ath-table__table\">\n    <ng-content />\n  </table>\n</div>\n", styles: [".ath-table{width:100%;overflow-x:auto;border:1px solid var(--ath-border-color);border-radius:var(--panel-radius);background:var(--surface)}.ath-table__table{width:100%;border-collapse:collapse;font-size:var(--text-base);table-layout:auto}.ath-table__table thead th{text-align:left;height:var(--table-head-h);padding:0 var(--panel-pad-x);color:var(--fg-3);font-weight:var(--weight-normal);font-size:var(--table-head-size);letter-spacing:0;border-bottom:1px solid var(--border-faint);white-space:nowrap;background:var(--table-head-bg)}.ath-table__table thead th:first-child{padding-left:var(--panel-pad-x)}.ath-table__table thead th:last-child{padding-right:var(--panel-pad-x);text-align:right}.ath-table__table tbody tr{border-bottom:1px solid var(--border-faint);transition:background-color .15s ease}.ath-table__table tbody tr:last-child{border-bottom:none}.ath-table__table tbody tr:hover{background-color:var(--hover)}.ath-table__table tbody td{height:var(--row-h);padding:0 var(--panel-pad-x);color:var(--ath-text-primary);vertical-align:middle;line-height:1.4}.ath-table__table tbody td:first-child{padding-left:var(--panel-pad-x)}.ath-table__table tbody td:last-child{padding-right:var(--panel-pad-x);text-align:right}.ath-table__table tbody td code{font-family:var(--ath-font-family-mono);font-size:var(--ath-font-size-xs);color:var(--ath-text-secondary)}.ath-table__table td .ath-toggle{width:auto;padding:0;border:none;background:transparent;gap:0}.ath-table__table td .ath-toggle:hover:not(.ath-toggle--disabled){background:transparent;border:none}.ath-table__table td .ath-toggle.ath-toggle--checked{background:transparent;border:none}.ath-table__table td .ath-toggle .ath-toggle__content{display:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-table', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ath-table\">\n  <table class=\"ath-table__table\">\n    <ng-content />\n  </table>\n</div>\n", styles: [".ath-table{width:100%;overflow-x:auto;border:1px solid var(--ath-border-color);border-radius:var(--panel-radius);background:var(--surface)}.ath-table__table{width:100%;border-collapse:collapse;font-size:var(--text-base);table-layout:auto}.ath-table__table thead th{text-align:left;height:var(--table-head-h);padding:0 var(--panel-pad-x);color:var(--fg-3);font-weight:var(--weight-normal);font-size:var(--table-head-size);letter-spacing:0;border-bottom:1px solid var(--border-faint);white-space:nowrap;background:var(--table-head-bg)}.ath-table__table thead th:first-child{padding-left:var(--panel-pad-x)}.ath-table__table thead th:last-child{padding-right:var(--panel-pad-x);text-align:right}.ath-table__table tbody tr{border-bottom:1px solid var(--border-faint);transition:background-color .15s ease}.ath-table__table tbody tr:last-child{border-bottom:none}.ath-table__table tbody tr:hover{background-color:var(--hover)}.ath-table__table tbody td{height:var(--row-h);padding:0 var(--panel-pad-x);color:var(--ath-text-primary);vertical-align:middle;line-height:1.4}.ath-table__table tbody td:first-child{padding-left:var(--panel-pad-x)}.ath-table__table tbody td:last-child{padding-right:var(--panel-pad-x);text-align:right}.ath-table__table tbody td code{font-family:var(--ath-font-family-mono);font-size:var(--ath-font-size-xs);color:var(--ath-text-secondary)}.ath-table__table td .ath-toggle{width:auto;padding:0;border:none;background:transparent;gap:0}.ath-table__table td .ath-toggle:hover:not(.ath-toggle--disabled){background:transparent;border:none}.ath-table__table td .ath-toggle.ath-toggle--checked{background:transparent;border:none}.ath-table__table td .ath-toggle .ath-toggle__content{display:none}\n"] }]
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
        return ['ath-badge', `ath-badge--${this.variant}`, this.dot ? 'ath-badge--dot' : '']
            .filter(Boolean)
            .join(' ');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthBadgeComponent, isStandalone: true, selector: "ath-badge", inputs: { variant: "variant", dot: "dot" }, ngImport: i0, template: "<span [class]=\"badgeClasses\">\n  @if (dot) {\n    <span class=\"ath-badge__dot\"></span>\n  }\n  <ng-content />\n</span>\n", styles: [".ath-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:var(--ath-font-weight-semibold);line-height:1;white-space:nowrap;padding:4px 10px;border-radius:var(--ath-border-radius-full);letter-spacing:.2px}.ath-badge__dot{width:6px;height:6px;border-radius:var(--ath-border-radius-full);flex-shrink:0}.ath-badge--default{color:var(--ath-text-secondary);background:var(--bg-2)}.ath-badge--default .ath-badge__dot{background:var(--ath-text-tertiary)}.ath-badge--success{color:var(--green-text);background:var(--green-tint)}.ath-badge--success .ath-badge__dot{background:var(--green)}.ath-badge--warning{color:var(--amber-text);background:var(--amber-tint)}.ath-badge--warning .ath-badge__dot{background:var(--amber)}.ath-badge--error{color:var(--red-text);background:var(--red-tint)}.ath-badge--error .ath-badge__dot{background:var(--red)}.ath-badge--info{color:var(--blue-text);background:var(--blue-tint)}.ath-badge--info .ath-badge__dot{background:var(--blue)}.ath-badge--muted{color:var(--ath-text-tertiary);background:var(--hover)}.ath-badge--muted .ath-badge__dot{background:var(--fg-4)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-badge', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span [class]=\"badgeClasses\">\n  @if (dot) {\n    <span class=\"ath-badge__dot\"></span>\n  }\n  <ng-content />\n</span>\n", styles: [".ath-badge{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:var(--ath-font-weight-semibold);line-height:1;white-space:nowrap;padding:4px 10px;border-radius:var(--ath-border-radius-full);letter-spacing:.2px}.ath-badge__dot{width:6px;height:6px;border-radius:var(--ath-border-radius-full);flex-shrink:0}.ath-badge--default{color:var(--ath-text-secondary);background:var(--bg-2)}.ath-badge--default .ath-badge__dot{background:var(--ath-text-tertiary)}.ath-badge--success{color:var(--green-text);background:var(--green-tint)}.ath-badge--success .ath-badge__dot{background:var(--green)}.ath-badge--warning{color:var(--amber-text);background:var(--amber-tint)}.ath-badge--warning .ath-badge__dot{background:var(--amber)}.ath-badge--error{color:var(--red-text);background:var(--red-tint)}.ath-badge--error .ath-badge__dot{background:var(--red)}.ath-badge--info{color:var(--blue-text);background:var(--blue-tint)}.ath-badge--info .ath-badge__dot{background:var(--blue)}.ath-badge--muted{color:var(--ath-text-tertiary);background:var(--hover)}.ath-badge--muted .ath-badge__dot{background:var(--fg-4)}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], dot: [{
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
 * Athene Chip
 *
 * The library takes colour and words; resolving a label's, epic's or
 * type's colour and name stays in the app.
 *
 * @example
 * <ath-chip>authentication</ath-chip>
 * <ath-chip shape="square">backend</ath-chip>
 * <ath-chip kind="label" [color]="label.color">{{ label.name }}</ath-chip>
 * <ath-chip kind="epic" [color]="'var(--purple)'" [tooltip]="epic.title">{{ epic.title }}</ath-chip>
 * <ath-chip kind="type" [icon]="bugIcon" color="var(--red)" [tooltip]="'Bug'" />
 * <ath-chip kind="status" variant="warning">In progress</ath-chip>
 * <ath-chip kind="count" [count]="3" tooltip="design, backend, api" />
 * <ath-chip kind="label" [color]="c" [removable]="true" (removed)="drop(l)">{{ l.name }}</ath-chip>
 */
class AthChipComponent {
    constructor() {
        this.labels = injectAthLabels();
        this.kind = input('tag');
        /** Tone of a `tag` or `status` chip. */
        this.variant = input('default');
        /** Outline of a `tag` chip; `square` is the plain grey tag of dense rows. */
        this.shape = input('pill');
        /** Any CSS colour: the label dot, the epic glyph, the type square, the status dot. */
        this.color = input(null);
        /** Glyph for `epic` (default bolt), `type` (required) and `status` (instead of the dot). */
        this.icon = input(null);
        /** N of a `count` chip. */
        this.count = input(null);
        /** Hover text, also the accessible description (names behind "+N", an epic's full title). */
        this.tooltip = input(null);
        /** `type` in dense lists: the glyph alone, in grey. */
        this.muted = input(false);
        this.removable = input(false);
        /** Accessible name of the remove button; default "Remove {name}". */
        this.removeLabel = input(null);
        /** The chip's text, for the default remove label (projected text is not readable here). */
        this.name = input(null);
        this.removed = output();
        this.removeIcon = X;
        this.glyph = computed(() => {
            const icon = this.icon();
            if (icon)
                return icon;
            return this.kind() === 'epic' ? Zap : null;
        });
        this.countText = computed(() => `+${Math.max(0, this.count() ?? 0)}`);
        /** "+3" is read as "3 more: a, b, c". */
        this.countLabel = computed(() => {
            const more = formatAthLabel(this.labels.moreCount(), { count: Math.max(0, this.count() ?? 0) });
            const names = this.tooltip();
            return names ? `${more}: ${names}` : more;
        });
        this.resolvedRemoveLabel = computed(() => this.removeLabel() ??
            formatAthLabel(this.labels.removeItem(), { name: this.name() ?? this.tooltip() ?? '' }).trim());
    }
    remove(event) {
        // Chips often sit inside something clickable (a row that opens the
        // ticket); removing a label is not opening it.
        event.stopPropagation();
        this.removed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthChipComponent, isStandalone: true, selector: "ath-chip", inputs: { kind: { classPropertyName: "kind", publicName: "kind", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, shape: { classPropertyName: "shape", publicName: "shape", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, count: { classPropertyName: "count", publicName: "count", isSignal: true, isRequired: false, transformFunction: null }, tooltip: { classPropertyName: "tooltip", publicName: "tooltip", isSignal: true, isRequired: false, transformFunction: null }, muted: { classPropertyName: "muted", publicName: "muted", isSignal: true, isRequired: false, transformFunction: null }, removable: { classPropertyName: "removable", publicName: "removable", isSignal: true, isRequired: false, transformFunction: null }, removeLabel: { classPropertyName: "removeLabel", publicName: "removeLabel", isSignal: true, isRequired: false, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { removed: "removed" }, ngImport: i0, template: "@switch (kind()) {\n  @case ('count') {\n    <span\n      class=\"ath-chip\"\n      data-kind=\"count\"\n      role=\"img\"\n      [attr.aria-label]=\"countLabel()\"\n      [athTooltip]=\"tooltip() ?? ''\"\n      >{{ countText() }}</span\n    >\n  }\n  @default {\n    <span\n      class=\"ath-chip\"\n      [attr.data-kind]=\"kind()\"\n      [attr.data-variant]=\"variant()\"\n      [attr.data-shape]=\"kind() === 'tag' && shape() === 'square' ? 'square' : null\"\n      [attr.data-muted]=\"muted() ? 'true' : null\"\n      [style.--_tint]=\"color() || null\"\n      [athTooltip]=\"tooltip() ?? ''\"\n    >\n      @if (kind() === 'type') {\n        <span class=\"ath-chip__square\" aria-hidden=\"true\">\n          @if (glyph()) {\n            <lucide-icon [img]=\"glyph()!\" [size]=\"11\" [strokeWidth]=\"2.4\" />\n          }\n        </span>\n        @if (tooltip()) {\n          <span class=\"ath-chip__sr\">{{ tooltip() }}</span>\n        }\n      } @else if (glyph()) {\n        <lucide-icon\n          class=\"ath-chip__glyph\"\n          [img]=\"glyph()!\"\n          [size]=\"11\"\n          [strokeWidth]=\"2.4\"\n          aria-hidden=\"true\"\n        />\n      } @else if (kind() === 'label' || kind() === 'status') {\n        <span class=\"ath-chip__dot\" aria-hidden=\"true\"></span>\n      }\n      <span class=\"ath-chip__text\"><ng-content /></span>\n      @if (removable()) {\n        <button\n          type=\"button\"\n          class=\"ath-chip__remove\"\n          [attr.aria-label]=\"resolvedRemoveLabel()\"\n          (click)=\"remove($event)\"\n        >\n          <lucide-icon [img]=\"removeIcon\" [size]=\"11\" aria-hidden=\"true\" />\n        </button>\n      }\n    </span>\n  }\n}\n", styles: [":host{display:inline-flex;max-width:100%;min-width:0;vertical-align:middle}.ath-chip{--_tint: var(--fg-3);display:inline-flex;align-items:center;gap:var(--space-1);box-sizing:border-box;height:var(--chip-h);min-width:0;padding:0 var(--space-2);border:1px solid var(--border);border-radius:var(--r-full);background:var(--surface-2);color:var(--fg-2);font-size:var(--chip-font);font-weight:var(--weight-normal);line-height:1;white-space:nowrap}.ath-chip[data-kind=tag]{font-weight:var(--weight-medium)}.ath-chip[data-kind=tag][data-variant=primary]{border-color:var(--chip-primary-border);background:var(--chip-primary-bg);color:var(--chip-primary-fg)}.ath-chip[data-kind=tag][data-shape=square]{border-color:var(--border-faint);border-radius:var(--r-xs);background:var(--bg-2)}.ath-chip[data-kind=tag][data-variant=success],.ath-chip[data-kind=status][data-variant=success]{--_tint: var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent);background:var(--green-tint);color:var(--green-text)}.ath-chip[data-kind=tag][data-variant=warning],.ath-chip[data-kind=status][data-variant=warning]{--_tint: var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent);background:var(--amber-tint);color:var(--amber-text)}.ath-chip[data-kind=tag][data-variant=error],.ath-chip[data-kind=status][data-variant=error]{--_tint: var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent);background:var(--red-tint);color:var(--red-text)}.ath-chip[data-kind=tag][data-variant=info],.ath-chip[data-kind=status][data-variant=info]{--_tint: var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent);background:var(--blue-tint);color:var(--blue-text)}.ath-chip[data-kind=epic]{--_tint: var(--purple);max-width:180px;border-radius:var(--r-sm);background:transparent;font-weight:var(--weight-medium)}.ath-chip[data-kind=type]{padding:0 var(--space-2) 0 2px;border-radius:var(--r-sm);background:transparent}.ath-chip[data-kind=type]:has(.ath-chip__text:empty){padding:0;border:0}.ath-chip[data-kind=count]{padding:0 6px;border-color:transparent;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-mono);font-variant-numeric:tabular-nums;cursor:default}.ath-chip__dot{flex-shrink:0;width:6px;height:6px;border-radius:var(--r-full);background:var(--_tint)}.ath-chip__glyph{flex-shrink:0;color:var(--_tint)}.ath-chip__square{display:inline-grid;flex-shrink:0;place-items:center;width:16px;height:16px;border-radius:var(--r-xs);background:var(--_tint);color:var(--chip-type-fg)}.ath-chip[data-muted=true] .ath-chip__square{background:transparent;color:var(--fg-4)}.ath-chip__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-chip__text:empty{display:none}.ath-chip__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.ath-chip__remove{display:inline-flex;align-items:center;justify-content:center;margin-right:-3px;padding:0;border:0;border-radius:var(--r-full);background:none;color:var(--fg-4);cursor:pointer;transition:color var(--t-fast)}.ath-chip__remove:hover,.ath-chip__remove:focus-visible{color:var(--red)}.ath-chip__remove:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }, { kind: "directive", type: AthTooltipDirective, selector: "[athTooltip]", inputs: ["athTooltip", "tooltipPosition"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthChipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-chip', standalone: true, imports: [LucideAngularModule, AthTooltipDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "@switch (kind()) {\n  @case ('count') {\n    <span\n      class=\"ath-chip\"\n      data-kind=\"count\"\n      role=\"img\"\n      [attr.aria-label]=\"countLabel()\"\n      [athTooltip]=\"tooltip() ?? ''\"\n      >{{ countText() }}</span\n    >\n  }\n  @default {\n    <span\n      class=\"ath-chip\"\n      [attr.data-kind]=\"kind()\"\n      [attr.data-variant]=\"variant()\"\n      [attr.data-shape]=\"kind() === 'tag' && shape() === 'square' ? 'square' : null\"\n      [attr.data-muted]=\"muted() ? 'true' : null\"\n      [style.--_tint]=\"color() || null\"\n      [athTooltip]=\"tooltip() ?? ''\"\n    >\n      @if (kind() === 'type') {\n        <span class=\"ath-chip__square\" aria-hidden=\"true\">\n          @if (glyph()) {\n            <lucide-icon [img]=\"glyph()!\" [size]=\"11\" [strokeWidth]=\"2.4\" />\n          }\n        </span>\n        @if (tooltip()) {\n          <span class=\"ath-chip__sr\">{{ tooltip() }}</span>\n        }\n      } @else if (glyph()) {\n        <lucide-icon\n          class=\"ath-chip__glyph\"\n          [img]=\"glyph()!\"\n          [size]=\"11\"\n          [strokeWidth]=\"2.4\"\n          aria-hidden=\"true\"\n        />\n      } @else if (kind() === 'label' || kind() === 'status') {\n        <span class=\"ath-chip__dot\" aria-hidden=\"true\"></span>\n      }\n      <span class=\"ath-chip__text\"><ng-content /></span>\n      @if (removable()) {\n        <button\n          type=\"button\"\n          class=\"ath-chip__remove\"\n          [attr.aria-label]=\"resolvedRemoveLabel()\"\n          (click)=\"remove($event)\"\n        >\n          <lucide-icon [img]=\"removeIcon\" [size]=\"11\" aria-hidden=\"true\" />\n        </button>\n      }\n    </span>\n  }\n}\n", styles: [":host{display:inline-flex;max-width:100%;min-width:0;vertical-align:middle}.ath-chip{--_tint: var(--fg-3);display:inline-flex;align-items:center;gap:var(--space-1);box-sizing:border-box;height:var(--chip-h);min-width:0;padding:0 var(--space-2);border:1px solid var(--border);border-radius:var(--r-full);background:var(--surface-2);color:var(--fg-2);font-size:var(--chip-font);font-weight:var(--weight-normal);line-height:1;white-space:nowrap}.ath-chip[data-kind=tag]{font-weight:var(--weight-medium)}.ath-chip[data-kind=tag][data-variant=primary]{border-color:var(--chip-primary-border);background:var(--chip-primary-bg);color:var(--chip-primary-fg)}.ath-chip[data-kind=tag][data-shape=square]{border-color:var(--border-faint);border-radius:var(--r-xs);background:var(--bg-2)}.ath-chip[data-kind=tag][data-variant=success],.ath-chip[data-kind=status][data-variant=success]{--_tint: var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent);background:var(--green-tint);color:var(--green-text)}.ath-chip[data-kind=tag][data-variant=warning],.ath-chip[data-kind=status][data-variant=warning]{--_tint: var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent);background:var(--amber-tint);color:var(--amber-text)}.ath-chip[data-kind=tag][data-variant=error],.ath-chip[data-kind=status][data-variant=error]{--_tint: var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent);background:var(--red-tint);color:var(--red-text)}.ath-chip[data-kind=tag][data-variant=info],.ath-chip[data-kind=status][data-variant=info]{--_tint: var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent);background:var(--blue-tint);color:var(--blue-text)}.ath-chip[data-kind=epic]{--_tint: var(--purple);max-width:180px;border-radius:var(--r-sm);background:transparent;font-weight:var(--weight-medium)}.ath-chip[data-kind=type]{padding:0 var(--space-2) 0 2px;border-radius:var(--r-sm);background:transparent}.ath-chip[data-kind=type]:has(.ath-chip__text:empty){padding:0;border:0}.ath-chip[data-kind=count]{padding:0 6px;border-color:transparent;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-mono);font-variant-numeric:tabular-nums;cursor:default}.ath-chip__dot{flex-shrink:0;width:6px;height:6px;border-radius:var(--r-full);background:var(--_tint)}.ath-chip__glyph{flex-shrink:0;color:var(--_tint)}.ath-chip__square{display:inline-grid;flex-shrink:0;place-items:center;width:16px;height:16px;border-radius:var(--r-xs);background:var(--_tint);color:var(--chip-type-fg)}.ath-chip[data-muted=true] .ath-chip__square{background:transparent;color:var(--fg-4)}.ath-chip__text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-chip__text:empty{display:none}.ath-chip__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.ath-chip__remove{display:inline-flex;align-items:center;justify-content:center;margin-right:-3px;padding:0;border:0;border-radius:var(--r-full);background:none;color:var(--fg-4);cursor:pointer;transition:color var(--t-fast)}.ath-chip__remove:hover,.ath-chip__remove:focus-visible{color:var(--red)}.ath-chip__remove:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}\n"] }]
        }] });

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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAvatarStackComponent, isStandalone: true, selector: "ath-avatar-stack", inputs: { users: "users", max: "max", size: "size" }, host: { properties: { "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@for (user of visible(); track trackByName($index, user)) {\n  <ath-avatar [name]=\"user.name\" [src]=\"user.src ?? ''\" [size]=\"size\" class=\"ath-stack__item\" />\n}\n@if (overflowCount() > 0) {\n  <span class=\"ath-stack__more\">+{{ overflowCount() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center}.ath-stack__item{display:inline-flex}.ath-stack__item+.ath-stack__item,.ath-stack__item+.ath-stack__more{margin-left:-6px}:host ath-avatar{border-radius:999px;box-shadow:0 0 0 1.5px var(--bg-1)}.ath-stack__more{display:inline-flex;align-items:center;justify-content:center;margin-left:-6px;border-radius:999px;background:var(--bg-2);color:var(--fg-3);font-family:var(--font-sans);font-weight:600;border:1.5px solid var(--bg-1);letter-spacing:0}:host([data-size=sm]) .ath-stack__more{width:20px;height:20px;font-size:9px}:host([data-size=md]) .ath-stack__more{width:24px;height:24px;font-size:10px}:host([data-size=lg]) .ath-stack__more{width:36px;height:36px;font-size:12px}:host([data-size=xl]) .ath-stack__more{width:48px;height:48px;font-size:14px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthAvatarComponent, selector: "ath-avatar", inputs: ["person", "name", "src", "id", "size", "unassigned", "label"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
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
 * Runs an action and settles when it does: a Promise when it resolves or
 * rejects, an Observable on its first value, completion or error (so a
 * long-lived stream does not keep the button busy), anything else at once.
 * A synchronous throw rejects.
 */
function runAthAction(action) {
    return new Promise((resolve) => {
        const result = action();
        resolve(isObservable(result) ? firstValueFrom(result, { defaultValue: undefined }) : result);
    });
}

/**
 * Athene Button Component
 *
 * `[action]` makes the button track its own work: pass a function that
 * returns a Promise or an Observable and the button is busy until it
 * settles: disabled, a spinner, `aria-busy`, and a second click (or a
 * double click) does nothing. No hand-kept `saving` signal (QA-13).
 *
 * @example
 * <ath-button variant="primary" (clicked)="handleClick()">Click me</ath-button>
 * <ath-button variant="primary" [action]="save">Save</ath-button>
 *   // in the component: protected readonly save = () => this.sprints.create(this.draft());
 * <ath-button variant="outline" size="sm" [loading]="true">Loading...</ath-button>
 */
class AthButtonComponent {
    constructor() {
        this.errorHandler = inject(ErrorHandler);
        this.variant = input('primary');
        this.size = input('md');
        /** Button type attribute. */
        this.type = input('button');
        this.disabled = input(false);
        /** Busy from outside (an action started elsewhere). `[action]` sets its own. */
        this.loading = input(false);
        this.fullWidth = input(false);
        /**
         * Toggle state. `null` (default) renders a plain button; `true`/`false`
         * make it a toggle button with `aria-pressed` and a sunken pressed look.
         */
        this.pressed = input(null);
        /**
         * Disclosure state for a button that opens a panel or menu. `null`
         * (default) omits `aria-expanded`. Set this instead of
         * `[attr.aria-expanded]` on the host: host attributes do not reach the
         * focusable inner `<button>`.
         */
        this.expanded = input(null);
        /** Id of the element this button controls (`aria-controls`). */
        this.controls = input(null);
        /** Optional aria-label for icon-only usage. */
        this.ariaLabel = input(null);
        /** Work to run on click; the button is busy until it settles. */
        this.action = input(null);
        /** Every accepted click (also with `[action]`, before it runs). */
        this.clicked = output();
        /** The action settled successfully. */
        this.done = output();
        /** The action failed; the error also goes to Angular's `ErrorHandler`. */
        this.failed = output();
        this.running = signal(false);
        /** Busy: an `[action]` is running or `[loading]` is set. */
        this.busy = computed(() => this.running() || this.loading());
        this.loaderIcon = Loader2;
        this.buttonClasses = computed(() => [
            'ath-button',
            `ath-button--${this.variant()}`,
            `ath-button--${this.size()}`,
            this.fullWidth() ? 'ath-button--full-width' : '',
            this.busy() ? 'ath-button--loading' : '',
            this.pressed() ? 'ath-button--pressed' : '',
        ]
            .filter(Boolean)
            .join(' '));
    }
    handleClick(event) {
        if (this.disabled() || this.busy()) {
            // A submit button must not submit its form while busy either.
            event.preventDefault();
            return;
        }
        this.clicked.emit(event);
        const action = this.action();
        if (!action)
            return;
        this.running.set(true);
        runAthAction(action).then((value) => {
            this.running.set(false);
            this.done.emit(value);
        }, (err) => {
            this.running.set(false);
            this.failed.emit(err);
            this.errorHandler.handleError(err);
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthButtonComponent, isStandalone: true, selector: "ath-button", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, fullWidth: { classPropertyName: "fullWidth", publicName: "fullWidth", isSignal: true, isRequired: false, transformFunction: null }, pressed: { classPropertyName: "pressed", publicName: "pressed", isSignal: true, isRequired: false, transformFunction: null }, expanded: { classPropertyName: "expanded", publicName: "expanded", isSignal: true, isRequired: false, transformFunction: null }, controls: { classPropertyName: "controls", publicName: "controls", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, action: { classPropertyName: "action", publicName: "action", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { clicked: "clicked", done: "done", failed: "failed" }, ngImport: i0, template: "<button\n  [type]=\"type()\"\n  [disabled]=\"disabled() || busy()\"\n  [class]=\"buttonClasses()\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-busy]=\"busy()\"\n  [attr.aria-pressed]=\"pressed()\"\n  [attr.aria-expanded]=\"expanded()\"\n  [attr.aria-controls]=\"controls()\"\n  (click)=\"handleClick($event)\"\n>\n  @if (busy()) {\n    <span class=\"ath-button__loader-wrap\">\n      <lucide-icon [img]=\"loaderIcon\" class=\"ath-button__loader\" [size]=\"18\" aria-hidden=\"true\" />\n    </span>\n  }\n  <span class=\"ath-button__content\" [class.ath-button__content--hidden]=\"busy()\">\n    <ng-content />\n  </span>\n</button>\n", styles: [".ath-button{display:inline-grid;place-items:center;position:relative;grid-template-columns:1fr;grid-template-rows:1fr;font-family:var(--ath-font-family);font-weight:var(--ath-font-weight-medium);border-radius:var(--ath-border-radius-md);border:1px solid transparent;cursor:pointer;white-space:nowrap;letter-spacing:0;transition:background-color .15s ease,border-color .15s ease,color .15s ease,box-shadow .15s ease,opacity .15s ease}.ath-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-bg-primary),0 0 0 4px var(--ath-color-primary)}.ath-button:disabled{opacity:.5;cursor:not-allowed}.ath-button--xs{height:var(--control-h-xs);padding:0 10px;font-size:var(--control-font);border-radius:var(--r-sm)}.ath-button--xs .ath-button__content{gap:5px}.ath-button--sm{height:var(--control-h-sm);padding:0 8px;font-size:var(--control-font);border-radius:var(--r-sm)}.ath-button--md{height:var(--control-h);padding:0 var(--ath-space-3);font-size:var(--control-font)}.ath-button--lg{height:var(--control-h-lg);padding:0 var(--ath-space-5);font-size:var(--ath-font-size-md)}.ath-button--primary{background:var(--action-primary-bg);color:var(--action-primary-fg);border-color:var(--action-primary-bg);font-weight:var(--ath-font-weight-medium)}.ath-button--primary:disabled:not(.ath-button--loading){background:var(--action-primary-disabled-bg);border-color:var(--action-primary-disabled-border);color:var(--action-primary-disabled-fg);opacity:var(--action-primary-disabled-opacity)}.ath-button--primary:hover:not(:disabled){background:var(--action-primary-bg-hover);border-color:var(--action-primary-bg-hover)}.ath-button--primary:active:not(:disabled){background:var(--action-primary-bg-active);border-color:var(--action-primary-bg-active)}.ath-button--primary .ath-button__loader-wrap{color:var(--action-primary-fg)}.ath-button--create{background:var(--action-create-bg);color:var(--action-create-fg);border-color:var(--action-create-border)}.ath-button--create:hover:not(:disabled){background:var(--action-create-bg-hover)}.ath-button--create:active:not(:disabled){background:var(--action-create-bg-active)}.ath-button--create .ath-button__loader-wrap{color:var(--action-create-fg)}.ath-button--secondary{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary);border-color:var(--action-outline-border)}.ath-button--secondary:hover:not(:disabled){border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-button--outline{background-color:transparent;border-color:var(--action-outline-border);color:var(--action-outline-fg)}.ath-button--outline:disabled{color:var(--fg-3);border-color:var(--border)}.ath-button--outline:hover:not(:disabled){background-color:var(--action-outline-hover-bg);border-color:var(--action-outline-hover-border)}.ath-button--ghost{background-color:transparent;color:var(--ath-text-primary)}.ath-button--ghost:hover:not(:disabled){background-color:var(--ath-hover-bg)}.ath-button--danger{background-color:var(--action-danger-bg);color:var(--action-danger-fg);border-color:var(--action-danger-bg)}.ath-button--danger:hover:not(:disabled){background-color:var(--action-danger-bg-hover);border-color:var(--action-danger-bg-hover)}.ath-button--danger-ghost{background-color:transparent;color:var(--fg-3);border-color:transparent}.ath-button--danger-ghost:hover:not(:disabled){background-color:var(--red-tint);color:var(--red-text)}.ath-button--danger-ghost:active:not(:disabled){background-color:color-mix(in srgb,var(--red) 16%,transparent)}.ath-button--danger-ghost:focus-visible{box-shadow:0 0 0 2px var(--ath-bg-primary),0 0 0 4px var(--red)}.ath-button--full-width{width:100%}.ath-button--pressed:not(.ath-button--primary):not(.ath-button--create){background-color:var(--hover-strong);border-color:var(--action-outline-hover-border)}.ath-button--loading{pointer-events:none}.ath-button__loader-wrap{display:inline-flex;align-items:center;justify-content:center;grid-area:1/1}.ath-button__loader{animation:ath-spin 1s linear infinite}.ath-button__content{display:inline-flex;grid-area:1/1;align-items:center;gap:6px}.ath-button__content--hidden{opacity:0}@keyframes ath-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-button', standalone: true, imports: [LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  [type]=\"type()\"\n  [disabled]=\"disabled() || busy()\"\n  [class]=\"buttonClasses()\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-busy]=\"busy()\"\n  [attr.aria-pressed]=\"pressed()\"\n  [attr.aria-expanded]=\"expanded()\"\n  [attr.aria-controls]=\"controls()\"\n  (click)=\"handleClick($event)\"\n>\n  @if (busy()) {\n    <span class=\"ath-button__loader-wrap\">\n      <lucide-icon [img]=\"loaderIcon\" class=\"ath-button__loader\" [size]=\"18\" aria-hidden=\"true\" />\n    </span>\n  }\n  <span class=\"ath-button__content\" [class.ath-button__content--hidden]=\"busy()\">\n    <ng-content />\n  </span>\n</button>\n", styles: [".ath-button{display:inline-grid;place-items:center;position:relative;grid-template-columns:1fr;grid-template-rows:1fr;font-family:var(--ath-font-family);font-weight:var(--ath-font-weight-medium);border-radius:var(--ath-border-radius-md);border:1px solid transparent;cursor:pointer;white-space:nowrap;letter-spacing:0;transition:background-color .15s ease,border-color .15s ease,color .15s ease,box-shadow .15s ease,opacity .15s ease}.ath-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-bg-primary),0 0 0 4px var(--ath-color-primary)}.ath-button:disabled{opacity:.5;cursor:not-allowed}.ath-button--xs{height:var(--control-h-xs);padding:0 10px;font-size:var(--control-font);border-radius:var(--r-sm)}.ath-button--xs .ath-button__content{gap:5px}.ath-button--sm{height:var(--control-h-sm);padding:0 8px;font-size:var(--control-font);border-radius:var(--r-sm)}.ath-button--md{height:var(--control-h);padding:0 var(--ath-space-3);font-size:var(--control-font)}.ath-button--lg{height:var(--control-h-lg);padding:0 var(--ath-space-5);font-size:var(--ath-font-size-md)}.ath-button--primary{background:var(--action-primary-bg);color:var(--action-primary-fg);border-color:var(--action-primary-bg);font-weight:var(--ath-font-weight-medium)}.ath-button--primary:disabled:not(.ath-button--loading){background:var(--action-primary-disabled-bg);border-color:var(--action-primary-disabled-border);color:var(--action-primary-disabled-fg);opacity:var(--action-primary-disabled-opacity)}.ath-button--primary:hover:not(:disabled){background:var(--action-primary-bg-hover);border-color:var(--action-primary-bg-hover)}.ath-button--primary:active:not(:disabled){background:var(--action-primary-bg-active);border-color:var(--action-primary-bg-active)}.ath-button--primary .ath-button__loader-wrap{color:var(--action-primary-fg)}.ath-button--create{background:var(--action-create-bg);color:var(--action-create-fg);border-color:var(--action-create-border)}.ath-button--create:hover:not(:disabled){background:var(--action-create-bg-hover)}.ath-button--create:active:not(:disabled){background:var(--action-create-bg-active)}.ath-button--create .ath-button__loader-wrap{color:var(--action-create-fg)}.ath-button--secondary{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary);border-color:var(--action-outline-border)}.ath-button--secondary:hover:not(:disabled){border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-button--outline{background-color:transparent;border-color:var(--action-outline-border);color:var(--action-outline-fg)}.ath-button--outline:disabled{color:var(--fg-3);border-color:var(--border)}.ath-button--outline:hover:not(:disabled){background-color:var(--action-outline-hover-bg);border-color:var(--action-outline-hover-border)}.ath-button--ghost{background-color:transparent;color:var(--ath-text-primary)}.ath-button--ghost:hover:not(:disabled){background-color:var(--ath-hover-bg)}.ath-button--danger{background-color:var(--action-danger-bg);color:var(--action-danger-fg);border-color:var(--action-danger-bg)}.ath-button--danger:hover:not(:disabled){background-color:var(--action-danger-bg-hover);border-color:var(--action-danger-bg-hover)}.ath-button--danger-ghost{background-color:transparent;color:var(--fg-3);border-color:transparent}.ath-button--danger-ghost:hover:not(:disabled){background-color:var(--red-tint);color:var(--red-text)}.ath-button--danger-ghost:active:not(:disabled){background-color:color-mix(in srgb,var(--red) 16%,transparent)}.ath-button--danger-ghost:focus-visible{box-shadow:0 0 0 2px var(--ath-bg-primary),0 0 0 4px var(--red)}.ath-button--full-width{width:100%}.ath-button--pressed:not(.ath-button--primary):not(.ath-button--create){background-color:var(--hover-strong);border-color:var(--action-outline-hover-border)}.ath-button--loading{pointer-events:none}.ath-button__loader-wrap{display:inline-flex;align-items:center;justify-content:center;grid-area:1/1}.ath-button__loader{animation:ath-spin 1s linear infinite}.ath-button__content{display:inline-flex;grid-area:1/1;align-items:center;gap:6px}.ath-button__content--hidden{opacity:0}@keyframes ath-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }] });

/**
 * Athene Empty State Component
 *
 * Display when lists or tables have no data.
 *
 * @example
 * <ath-empty-state message="No items found" />
 * <ath-empty-state [icon]="Inbox" message="Nothing here" subMessage="…" />
 *
 * Compact: content-sized, for a panel that should end with its content.
 * <ath-empty-state
 *   size="compact" bare
 *   [icon]="ic.inbox"
 *   message="You're all caught up"
 *   subMessage="Mentions, assignments and replies land here."
 *   actionLabel="Notification settings" (action)="openPrefs()"
 *   [hints]="[{ icon: ic.at, label: 'Mentions', sub: 'When someone @mentions you' }]"
 * />
 */
class AthEmptyStateComponent {
    constructor() {
        /** Empty state message */
        this.message = '';
        /** Optional sub-message */
        this.subMessage = '';
        /** Optional lucide icon shown above the message. */
        this.icon = null;
        /**
         * No frame of its own, for an empty state that already sits inside a
         * panel; the dashed box inside a white panel drew a card in a card.
         */
        this.bare = false;
        /** `compact`: icon tile left, auto height, optional hint rows. */
        this.size = 'default';
        /** 2–4 rows describing what will appear here (compact layout). */
        this.hints = [];
        /** Primary action label; emits `action` when clicked. */
        this.actionLabel = '';
        this.actionIcon = null;
        /** Secondary (outline) action label; emits `secondaryAction`. */
        this.secondaryActionLabel = '';
        this.action = new EventEmitter();
        this.secondaryAction = new EventEmitter();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthEmptyStateComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthEmptyStateComponent, isStandalone: true, selector: "ath-empty-state", inputs: { message: "message", subMessage: "subMessage", icon: "icon", bare: ["bare", "bare", booleanAttribute], size: "size", hints: "hints", actionLabel: "actionLabel", actionIcon: "actionIcon", secondaryActionLabel: "secondaryActionLabel" }, outputs: { action: "action", secondaryAction: "secondaryAction" }, ngImport: i0, template: "@if (size === 'compact') {\n  <div class=\"ath-empty-state ath-empty-state--compact\" [class.ath-empty-state--bare]=\"bare\">\n    <div class=\"ath-empty-state__lead\">\n      @if (icon) {\n        <span class=\"ath-empty-state__tile\" aria-hidden=\"true\">\n          <lucide-icon [img]=\"icon\" [size]=\"16\" />\n        </span>\n      }\n      <div class=\"ath-empty-state__text\">\n        <p class=\"ath-empty-state__message\">{{ message }}</p>\n        @if (subMessage) {\n          <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n        }\n      </div>\n      @if (actionLabel || secondaryActionLabel) {\n        <div class=\"ath-empty-state__actions\">\n          @if (secondaryActionLabel) {\n            <ath-button variant=\"secondary\" size=\"sm\" (clicked)=\"secondaryAction.emit()\">\n              {{ secondaryActionLabel }}\n            </ath-button>\n          }\n          @if (actionLabel) {\n            <ath-button variant=\"primary\" size=\"sm\" (clicked)=\"action.emit()\">\n              @if (actionIcon) {\n                <lucide-icon [img]=\"actionIcon\" [size]=\"13\" />\n              }\n              {{ actionLabel }}\n            </ath-button>\n          }\n        </div>\n      }\n    </div>\n    @if (hints.length > 0) {\n      <ul class=\"ath-empty-state__hints\">\n        @for (hint of hints; track hint.label) {\n          <li class=\"ath-empty-state__hint\">\n            <span class=\"ath-empty-state__hint-icon\" aria-hidden=\"true\">\n              @if (hint.icon) {\n                <lucide-icon [img]=\"hint.icon\" [size]=\"14\" />\n              }\n            </span>\n            <span class=\"ath-empty-state__hint-text\">\n              <span class=\"ath-empty-state__hint-label\">{{ hint.label }}</span>\n              @if (hint.sub) {\n                <span class=\"ath-empty-state__hint-sub\">{{ hint.sub }}</span>\n              }\n            </span>\n          </li>\n        }\n      </ul>\n    }\n    <ng-content />\n  </div>\n} @else {\n  <div class=\"ath-empty-state\" [class.ath-empty-state--bare]=\"bare\">\n    @if (icon) {\n      <span class=\"ath-empty-state__icon\">\n        <lucide-icon [img]=\"icon\" [size]=\"18\" />\n      </span>\n    }\n    <p class=\"ath-empty-state__message\">{{ message }}</p>\n    @if (subMessage) {\n      <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n    }\n    @if (actionLabel || secondaryActionLabel) {\n      <div class=\"ath-empty-state__actions ath-empty-state__actions--center\">\n        @if (secondaryActionLabel) {\n          <ath-button variant=\"secondary\" size=\"sm\" (clicked)=\"secondaryAction.emit()\">\n            {{ secondaryActionLabel }}\n          </ath-button>\n        }\n        @if (actionLabel) {\n          <ath-button variant=\"primary\" size=\"sm\" (clicked)=\"action.emit()\">\n            {{ actionLabel }}\n          </ath-button>\n        }\n      </div>\n    }\n    <ng-content />\n  </div>\n}\n", styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-10) var(--space-6);text-align:center;border:1px dashed var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-empty-state--bare{border:0;background:transparent}.ath-empty-state__icon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;margin-bottom:var(--space-1);border-radius:var(--r-full);background:var(--surface-3);color:var(--fg-3)}.ath-empty-state__message{margin:0;font-size:var(--text-md);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__sub{margin:0;max-width:44ch;font-size:var(--text-base);line-height:var(--line-normal);color:var(--fg-3)}.ath-empty-state--compact{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:var(--space-3);padding:var(--space-4);text-align:left}.ath-empty-state--compact .ath-empty-state__lead{display:flex;align-items:flex-start;gap:var(--space-3)}.ath-empty-state--compact .ath-empty-state__text{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}.ath-empty-state--compact .ath-empty-state__message{font-size:var(--panel-title-size);font-weight:var(--weight-semibold)}.ath-empty-state--compact .ath-empty-state__sub{max-width:64ch;font-size:var(--control-font)}.ath-empty-state__tile{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid var(--border-faint);border-radius:var(--r);background:var(--bg-2);color:var(--fg-3)}.ath-empty-state__actions{flex-shrink:0;display:flex;align-items:center;gap:var(--space-2)}.ath-empty-state__actions--center{justify-content:center;margin-top:var(--space-2)}.ath-empty-state__hints{display:flex;flex-direction:column;margin:0;padding:0;list-style:none;border-top:1px solid var(--border-faint)}.ath-empty-state__hint{display:flex;align-items:center;gap:var(--space-3);min-height:var(--row-h-compact);padding:var(--space-2) 0;border-bottom:1px solid var(--border-faint)}.ath-empty-state__hint:last-child{border-bottom:0;padding-bottom:0}.ath-empty-state__hint-icon{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;color:var(--fg-4)}.ath-empty-state__hint-text{display:flex;flex-direction:column;min-width:0;line-height:1.35}.ath-empty-state__hint-label{font-size:var(--control-font);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__hint-sub{font-size:var(--text-sm);color:var(--fg-3)}@media (max-width: 640px){.ath-empty-state--compact .ath-empty-state__lead{flex-wrap:wrap}.ath-empty-state--compact .ath-empty-state__actions{flex-basis:100%;padding-left:48px}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }, { kind: "component", type: AthButtonComponent, selector: "ath-button", inputs: ["variant", "size", "type", "disabled", "loading", "fullWidth", "pressed", "expanded", "controls", "ariaLabel", "action"], outputs: ["clicked", "done", "failed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthEmptyStateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-empty-state', standalone: true, imports: [CommonModule, LucideAngularModule, AthButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (size === 'compact') {\n  <div class=\"ath-empty-state ath-empty-state--compact\" [class.ath-empty-state--bare]=\"bare\">\n    <div class=\"ath-empty-state__lead\">\n      @if (icon) {\n        <span class=\"ath-empty-state__tile\" aria-hidden=\"true\">\n          <lucide-icon [img]=\"icon\" [size]=\"16\" />\n        </span>\n      }\n      <div class=\"ath-empty-state__text\">\n        <p class=\"ath-empty-state__message\">{{ message }}</p>\n        @if (subMessage) {\n          <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n        }\n      </div>\n      @if (actionLabel || secondaryActionLabel) {\n        <div class=\"ath-empty-state__actions\">\n          @if (secondaryActionLabel) {\n            <ath-button variant=\"secondary\" size=\"sm\" (clicked)=\"secondaryAction.emit()\">\n              {{ secondaryActionLabel }}\n            </ath-button>\n          }\n          @if (actionLabel) {\n            <ath-button variant=\"primary\" size=\"sm\" (clicked)=\"action.emit()\">\n              @if (actionIcon) {\n                <lucide-icon [img]=\"actionIcon\" [size]=\"13\" />\n              }\n              {{ actionLabel }}\n            </ath-button>\n          }\n        </div>\n      }\n    </div>\n    @if (hints.length > 0) {\n      <ul class=\"ath-empty-state__hints\">\n        @for (hint of hints; track hint.label) {\n          <li class=\"ath-empty-state__hint\">\n            <span class=\"ath-empty-state__hint-icon\" aria-hidden=\"true\">\n              @if (hint.icon) {\n                <lucide-icon [img]=\"hint.icon\" [size]=\"14\" />\n              }\n            </span>\n            <span class=\"ath-empty-state__hint-text\">\n              <span class=\"ath-empty-state__hint-label\">{{ hint.label }}</span>\n              @if (hint.sub) {\n                <span class=\"ath-empty-state__hint-sub\">{{ hint.sub }}</span>\n              }\n            </span>\n          </li>\n        }\n      </ul>\n    }\n    <ng-content />\n  </div>\n} @else {\n  <div class=\"ath-empty-state\" [class.ath-empty-state--bare]=\"bare\">\n    @if (icon) {\n      <span class=\"ath-empty-state__icon\">\n        <lucide-icon [img]=\"icon\" [size]=\"18\" />\n      </span>\n    }\n    <p class=\"ath-empty-state__message\">{{ message }}</p>\n    @if (subMessage) {\n      <p class=\"ath-empty-state__sub\">{{ subMessage }}</p>\n    }\n    @if (actionLabel || secondaryActionLabel) {\n      <div class=\"ath-empty-state__actions ath-empty-state__actions--center\">\n        @if (secondaryActionLabel) {\n          <ath-button variant=\"secondary\" size=\"sm\" (clicked)=\"secondaryAction.emit()\">\n            {{ secondaryActionLabel }}\n          </ath-button>\n        }\n        @if (actionLabel) {\n          <ath-button variant=\"primary\" size=\"sm\" (clicked)=\"action.emit()\">\n            {{ actionLabel }}\n          </ath-button>\n        }\n      </div>\n    }\n    <ng-content />\n  </div>\n}\n", styles: [".ath-empty-state{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-2);padding:var(--space-10) var(--space-6);text-align:center;border:1px dashed var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-empty-state--bare{border:0;background:transparent}.ath-empty-state__icon{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;margin-bottom:var(--space-1);border-radius:var(--r-full);background:var(--surface-3);color:var(--fg-3)}.ath-empty-state__message{margin:0;font-size:var(--text-md);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__sub{margin:0;max-width:44ch;font-size:var(--text-base);line-height:var(--line-normal);color:var(--fg-3)}.ath-empty-state--compact{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:var(--space-3);padding:var(--space-4);text-align:left}.ath-empty-state--compact .ath-empty-state__lead{display:flex;align-items:flex-start;gap:var(--space-3)}.ath-empty-state--compact .ath-empty-state__text{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}.ath-empty-state--compact .ath-empty-state__message{font-size:var(--panel-title-size);font-weight:var(--weight-semibold)}.ath-empty-state--compact .ath-empty-state__sub{max-width:64ch;font-size:var(--control-font)}.ath-empty-state__tile{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid var(--border-faint);border-radius:var(--r);background:var(--bg-2);color:var(--fg-3)}.ath-empty-state__actions{flex-shrink:0;display:flex;align-items:center;gap:var(--space-2)}.ath-empty-state__actions--center{justify-content:center;margin-top:var(--space-2)}.ath-empty-state__hints{display:flex;flex-direction:column;margin:0;padding:0;list-style:none;border-top:1px solid var(--border-faint)}.ath-empty-state__hint{display:flex;align-items:center;gap:var(--space-3);min-height:var(--row-h-compact);padding:var(--space-2) 0;border-bottom:1px solid var(--border-faint)}.ath-empty-state__hint:last-child{border-bottom:0;padding-bottom:0}.ath-empty-state__hint-icon{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:36px;color:var(--fg-4)}.ath-empty-state__hint-text{display:flex;flex-direction:column;min-width:0;line-height:1.35}.ath-empty-state__hint-label{font-size:var(--control-font);font-weight:var(--weight-medium);color:var(--fg)}.ath-empty-state__hint-sub{font-size:var(--text-sm);color:var(--fg-3)}@media (max-width: 640px){.ath-empty-state--compact .ath-empty-state__lead{flex-wrap:wrap}.ath-empty-state--compact .ath-empty-state__actions{flex-basis:100%;padding-left:48px}}\n"] }]
        }], propDecorators: { message: [{
                type: Input,
                args: [{ required: true }]
            }], subMessage: [{
                type: Input
            }], icon: [{
                type: Input
            }], bare: [{
                type: Input,
                args: [{ transform: booleanAttribute }]
            }], size: [{
                type: Input
            }], hints: [{
                type: Input
            }], actionLabel: [{
                type: Input
            }], actionIcon: [{
                type: Input
            }], secondaryActionLabel: [{
                type: Input
            }], action: [{
                type: Output
            }], secondaryAction: [{
                type: Output
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
        /** Optional override label (otherwise the app's resolver, then the English default). */
        this.label = null;
        this.resolveLabel = inject(ATH_STATUS_LABELS, { optional: true });
    }
    get hostStatus() {
        return this.status;
    }
    get hostSize() {
        return this.size;
    }
    get computedLabel() {
        return this.label ?? this.resolveLabel?.(this.status) ?? LABELS$1[this.status] ?? this.status;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatusPillComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthStatusPillComponent, isStandalone: true, selector: "ath-status-pill", inputs: { status: "status", showDot: "showDot", showLabel: "showLabel", size: "size", label: "label" }, host: { properties: { "attr.data-status": "this.hostStatus", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthStatusPillComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-status-pill', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (showDot) {\n  <i class=\"ath-status-pill__dot\" aria-hidden=\"true\"></i>\n}\n@if (showLabel) {\n  <span class=\"ath-status-pill__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--fg-2);white-space:nowrap;line-height:1;letter-spacing:0}:host([data-size=sm]){font-size:11.5px;gap:5px}:host([data-size=sm]) .ath-status-pill__dot{width:6px;height:6px}.ath-status-pill__dot{width:8px;height:8px;border-radius:999px;flex-shrink:0;background:var(--fg-4);box-shadow:inset 0 0 0 2px var(--bg-1),0 0 0 1px currentColor;color:var(--fg-4)}.ath-status-pill__label{font-family:var(--font-sans)}:host([data-status=open]) .ath-status-pill__dot{background:var(--red);color:var(--red)}:host([data-status=prog]) .ath-status-pill__dot{background:var(--amber);color:var(--amber)}:host([data-status=review]) .ath-status-pill__dot{background:var(--blue);color:var(--blue)}:host([data-status=done]) .ath-status-pill__dot{background:var(--green);color:var(--green)}:host([data-status=blocked]) .ath-status-pill__dot{background:var(--purple);color:var(--purple)}:host([data-status=closed]){color:var(--fg-3)}:host([data-status=closed]) .ath-status-pill__dot{background:var(--fg-4);color:var(--fg-4)}\n"] }]
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
        this.resolveLabel = inject(ATH_PRIORITY_LABELS, { optional: true });
        this.priority = 'medium';
        this.showLabel = true;
        /** Optional override label. */
        this.label = null;
    }
    get hostPriority() {
        return this.priority;
    }
    get computedLabel() {
        return (this.label ?? this.resolveLabel?.(this.priority) ?? LABELS[this.priority] ?? this.priority);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPriorityComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPriorityComponent, isStandalone: true, selector: "ath-priority", inputs: { priority: "priority", showLabel: "showLabel", label: "label" }, host: { properties: { "attr.data-priority": "this.hostPriority" } }, ngImport: i0, template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel) {\n  <span class=\"ath-priority__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red-text);font-weight:600}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPriorityComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-priority', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-priority__bars\" aria-hidden=\"true\">\n  <i></i>\n  <i></i>\n  <i></i>\n</span>\n@if (showLabel) {\n  <span class=\"ath-priority__label\">{{ computedLabel }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--fg-3);line-height:1}.ath-priority__bars{display:inline-flex;align-items:flex-end;gap:1.5px;height:11px}.ath-priority__bars i{display:block;width:2.5px;background:var(--fg-disabled);border-radius:1px}.ath-priority__bars i:nth-child(1){height:4px}.ath-priority__bars i:nth-child(2){height:7px}.ath-priority__bars i:nth-child(3){height:11px}.ath-priority__label{color:var(--fg-2);font-family:var(--font-sans)}:host([data-priority=low]) .ath-priority__bars i:nth-child(1){background:var(--fg-3)}:host([data-priority=medium]) .ath-priority__bars i:nth-child(-n+2){background:var(--fg-2)}:host([data-priority=high]) .ath-priority__bars i{background:var(--amber)}:host([data-priority=crit]) .ath-priority__bars i{background:var(--red)}:host([data-priority=crit]) .ath-priority__label{color:var(--red-text);font-weight:600}\n"] }]
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthProjectKeyBadgeComponent, isStandalone: true, selector: "ath-project-key-badge", inputs: { projectKey: "projectKey", color: "color", size: "size" }, host: { properties: { "attr.data-size": "this.hostSize", "style.--pkey-color": "this.cssColor", "style.--pkey-border": "this.cssBorder", "style.--pkey-bg": "this.cssBg" } }, ngImport: i0, template: "<span class=\"ath-pkey\">{{ projectKey }}</span>\n", styles: [":host{display:inline-flex;align-items:center;justify-content:center;--pkey-color: var(--fg-3);--pkey-border: var(--border);--pkey-bg: transparent}.ath-pkey{display:inline-flex;align-items:center;justify-content:center;padding:1px 6px;font-family:var(--font-mono);font-feature-settings:\"ss01\",\"zero\",\"tnum\";font-weight:600;letter-spacing:0;text-transform:uppercase;border-radius:var(--r-sm);color:color-mix(in srgb,var(--pkey-color) var(--tone-text-mix),var(--fg));background:var(--pkey-bg);border:1px solid var(--pkey-border);line-height:1.3;white-space:nowrap}:host([data-size=sm]) .ath-pkey{font-size:10px;padding:1px 5px;border-radius:4px}:host([data-size=md]) .ath-pkey{font-size:11.5px}:host([data-size=lg]) .ath-pkey{font-size:14px;padding:3px 8px;font-weight:700}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProjectKeyBadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-project-key-badge', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-pkey\">{{ projectKey }}</span>\n", styles: [":host{display:inline-flex;align-items:center;justify-content:center;--pkey-color: var(--fg-3);--pkey-border: var(--border);--pkey-bg: transparent}.ath-pkey{display:inline-flex;align-items:center;justify-content:center;padding:1px 6px;font-family:var(--font-mono);font-feature-settings:\"ss01\",\"zero\",\"tnum\";font-weight:600;letter-spacing:0;text-transform:uppercase;border-radius:var(--r-sm);color:color-mix(in srgb,var(--pkey-color) var(--tone-text-mix),var(--fg));background:var(--pkey-bg);border:1px solid var(--pkey-border);line-height:1.3;white-space:nowrap}:host([data-size=sm]) .ath-pkey{font-size:10px;padding:1px 5px;border-radius:4px}:host([data-size=md]) .ath-pkey{font-size:11.5px}:host([data-size=lg]) .ath-pkey{font-size:14px;padding:3px 8px;font-weight:700}\n"] }]
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
            case 'met':
                return 'var(--green-text)';
            case 'breached':
                return 'var(--red-text)';
            case 'pending':
            default:
                return 'var(--amber-text)';
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSlaBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSlaBarComponent, isStandalone: true, selector: "ath-sla-bar", inputs: { response: "response", resolution: "resolution", progressPct: "progressPct" }, host: { properties: { "attr.data-severity": "this.hostSeverity" } }, ngImport: i0, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{\n      response.text\n    }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{\n      resolution.text\n    }}</span>\n  </div>\n}\n<div\n  class=\"ath-sla__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"(resolution ?? response)?.label ?? null\"\n  [attr.aria-valuetext]=\"(resolution ?? response)?.text ?? null\"\n  [attr.aria-valuenow]=\"progressPct\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSlaBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-sla-bar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (response) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ response.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(response.status)\">{{\n      response.text\n    }}</span>\n  </div>\n}\n@if (resolution) {\n  <div class=\"ath-sla__row\">\n    <span class=\"ath-sla__name\">{{ resolution.label }}</span>\n    <span class=\"ath-sla__text\" [style.color]=\"statusColor(resolution.status)\">{{\n      resolution.text\n    }}</span>\n  </div>\n}\n<div\n  class=\"ath-sla__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"(resolution ?? response)?.label ?? null\"\n  [attr.aria-valuetext]=\"(resolution ?? response)?.text ?? null\"\n  [attr.aria-valuenow]=\"progressPct\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-sla__fill\" [style.width.%]=\"progressPct\"></div>\n</div>\n", styles: [":host{display:flex;flex-direction:column;gap:6px}.ath-sla__row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-family:var(--font-sans);font-size:12px}.ath-sla__name{color:var(--fg-3);font-weight:500}.ath-sla__text{font-family:var(--font-mono);font-size:11.5px;font-weight:500;letter-spacing:0;font-feature-settings:\"tnum\"}.ath-sla__track{margin-top:4px;height:4px;background:var(--bg-2);border-radius:999px;overflow:hidden}.ath-sla__fill{height:100%;border-radius:999px;background:var(--green);transition:width var(--t-slow),background-color var(--t-base)}:host([data-severity=met]) .ath-sla__fill{background:var(--green)}:host([data-severity=pending]) .ath-sla__fill{background:var(--amber)}:host([data-severity=breached]) .ath-sla__fill{background:var(--red)}\n"] }]
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthProgressComponent, isStandalone: true, selector: "ath-progress", inputs: { value: "value", total: "total", tone: "tone", size: "size", showLabel: "showLabel", ariaLabel: "ariaLabel" }, host: { properties: { "attr.data-tone": "this.hostTone", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "<div\n  class=\"ath-progress__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-valuenow]=\"pct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-progress__fill\" [style.width.%]=\"pct()\"></div>\n</div>\n@if (showLabel) {\n  <span class=\"ath-progress__label\">{{ label() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:8px;width:100%}.ath-progress__track{flex:1;background:var(--progress-track);border-radius:999px;overflow:hidden;min-width:40px}.ath-progress__fill{height:100%;border-radius:999px;background:var(--progress-fill);transition:width var(--t-slow),background-color var(--t-base)}.ath-progress__label{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg-3);white-space:nowrap;flex-shrink:0}:host([data-size=xs]) .ath-progress__track{height:3px}:host([data-size=sm]) .ath-progress__track{height:4px}:host([data-size=md]) .ath-progress__track{height:6px}:host([data-tone=accent]) .ath-progress__fill{background:var(--accent)}:host([data-tone=success]) .ath-progress__fill{background:var(--green)}:host([data-tone=warning]) .ath-progress__fill{background:var(--amber)}:host([data-tone=danger]) .ath-progress__fill{background:var(--red)}:host([data-tone=neutral]) .ath-progress__fill{background:var(--fg-3)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthProgressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-progress', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"ath-progress__track\"\n  role=\"progressbar\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-valuenow]=\"pct()\"\n  aria-valuemin=\"0\"\n  aria-valuemax=\"100\"\n>\n  <div class=\"ath-progress__fill\" [style.width.%]=\"pct()\"></div>\n</div>\n@if (showLabel) {\n  <span class=\"ath-progress__label\">{{ label() }}</span>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:8px;width:100%}.ath-progress__track{flex:1;background:var(--progress-track);border-radius:999px;overflow:hidden;min-width:40px}.ath-progress__fill{height:100%;border-radius:999px;background:var(--progress-fill);transition:width var(--t-slow),background-color var(--t-base)}.ath-progress__label{font-family:var(--font-mono);font-feature-settings:\"tnum\";font-size:11.5px;color:var(--fg-3);white-space:nowrap;flex-shrink:0}:host([data-size=xs]) .ath-progress__track{height:3px}:host([data-size=sm]) .ath-progress__track{height:4px}:host([data-size=md]) .ath-progress__track{height:6px}:host([data-tone=accent]) .ath-progress__fill{background:var(--accent)}:host([data-tone=success]) .ath-progress__fill{background:var(--green)}:host([data-tone=warning]) .ath-progress__fill{background:var(--amber)}:host([data-tone=danger]) .ath-progress__fill{background:var(--red)}:host([data-tone=neutral]) .ath-progress__fill{background:var(--fg-3)}\n"] }]
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
        this.labels = injectAthLabels();
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthCodeBlockComponent, isStandalone: true, selector: "ath-code-block", inputs: { code: "code", language: "language", filename: "filename", showLineNumbers: "showLineNumbers", copyable: "copyable" }, host: { properties: { "attr.data-language": "this.hostLang" } }, ngImport: i0, template: "@if (language || filename || copyable) {\n  <div class=\"ath-code__head\">\n    <div class=\"ath-code__meta\">\n      @if (language) {\n        <span class=\"ath-code__lang\">{{ language }}</span>\n      }\n      @if (filename) {\n        <span class=\"ath-code__filename\">{{ filename }}</span>\n      }\n    </div>\n    @if (copyable) {\n      <button\n        type=\"button\"\n        class=\"ath-code__copy\"\n        [class.ath-code__copy--copied]=\"copied()\"\n        [attr.aria-label]=\"copied() ? labels.copied() : labels.copyCode()\"\n        (click)=\"copy()\"\n      >\n        @if (copied()) {\n          <lucide-icon [img]=\"checkIcon\" [size]=\"12\" />\n          <span>{{ labels.copied() }}</span>\n        } @else {\n          <lucide-icon [img]=\"copyIcon\" [size]=\"12\" />\n          <span>{{ labels.copy() }}</span>\n        }\n      </button>\n    }\n  </div>\n}\n<pre class=\"ath-code__pre\" tabindex=\"0\"><code class=\"ath-code__code\"><!--\n  -->@if (showLineNumbers) {<!--\n    --><span class=\"ath-code__gutter\" aria-hidden=\"true\"><!--\n      -->@for (line of lines; track $index) {<!--\n        --><span class=\"ath-code__lineno\">{{ $index + 1 }}</span><!--\n      -->}<!--\n    --></span><!--\n  -->}<!--\n  --><span class=\"ath-code__body\">{{ code }}</span><!--\n--></code></pre>\n", styles: [":host{display:block;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;font-family:var(--font-mono)}.ath-code__head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px 6px 12px;background:var(--bg-2);border-bottom:1px solid var(--border);font-family:var(--font-sans)}.ath-code__meta{display:inline-flex;align-items:center;gap:8px;min-width:0}.ath-code__lang{font-size:11px;font-weight:500;color:var(--fg-3);text-transform:lowercase;letter-spacing:0}.ath-code__filename{font-family:var(--font-mono);font-size:11.5px;color:var(--fg-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-code__copy{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;background:transparent;border:0;border-radius:var(--r-xs);font-family:var(--font-sans);font-size:11.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-code__copy:hover{background:var(--hover);color:var(--fg)}.ath-code__copy--copied{color:var(--green-text)}.ath-code__pre{margin:0;padding:12px 14px;overflow-x:auto;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:var(--fg);background:var(--surface-2)}.ath-code__code{display:block;font-family:inherit;white-space:pre}.ath-code__gutter{display:inline-flex;flex-direction:column;-webkit-user-select:none;user-select:none;margin-right:14px;padding-right:10px;border-right:1px solid var(--border-faint);color:var(--fg-4);font-size:11.5px;text-align:right;vertical-align:top;float:left}.ath-code__lineno{display:block;line-height:1.6}.ath-code__body{display:inline}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCodeBlockComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-code-block', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (language || filename || copyable) {\n  <div class=\"ath-code__head\">\n    <div class=\"ath-code__meta\">\n      @if (language) {\n        <span class=\"ath-code__lang\">{{ language }}</span>\n      }\n      @if (filename) {\n        <span class=\"ath-code__filename\">{{ filename }}</span>\n      }\n    </div>\n    @if (copyable) {\n      <button\n        type=\"button\"\n        class=\"ath-code__copy\"\n        [class.ath-code__copy--copied]=\"copied()\"\n        [attr.aria-label]=\"copied() ? labels.copied() : labels.copyCode()\"\n        (click)=\"copy()\"\n      >\n        @if (copied()) {\n          <lucide-icon [img]=\"checkIcon\" [size]=\"12\" />\n          <span>{{ labels.copied() }}</span>\n        } @else {\n          <lucide-icon [img]=\"copyIcon\" [size]=\"12\" />\n          <span>{{ labels.copy() }}</span>\n        }\n      </button>\n    }\n  </div>\n}\n<pre class=\"ath-code__pre\" tabindex=\"0\"><code class=\"ath-code__code\"><!--\n  -->@if (showLineNumbers) {<!--\n    --><span class=\"ath-code__gutter\" aria-hidden=\"true\"><!--\n      -->@for (line of lines; track $index) {<!--\n        --><span class=\"ath-code__lineno\">{{ $index + 1 }}</span><!--\n      -->}<!--\n    --></span><!--\n  -->}<!--\n  --><span class=\"ath-code__body\">{{ code }}</span><!--\n--></code></pre>\n", styles: [":host{display:block;background:var(--surface-2);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;font-family:var(--font-mono)}.ath-code__head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:6px 10px 6px 12px;background:var(--bg-2);border-bottom:1px solid var(--border);font-family:var(--font-sans)}.ath-code__meta{display:inline-flex;align-items:center;gap:8px;min-width:0}.ath-code__lang{font-size:11px;font-weight:500;color:var(--fg-3);text-transform:lowercase;letter-spacing:0}.ath-code__filename{font-family:var(--font-mono);font-size:11.5px;color:var(--fg-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-code__copy{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;background:transparent;border:0;border-radius:var(--r-xs);font-family:var(--font-sans);font-size:11.5px;font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-code__copy:hover{background:var(--hover);color:var(--fg)}.ath-code__copy--copied{color:var(--green-text)}.ath-code__pre{margin:0;padding:12px 14px;overflow-x:auto;font-family:var(--font-mono);font-size:12.5px;line-height:1.6;color:var(--fg);background:var(--surface-2)}.ath-code__code{display:block;font-family:inherit;white-space:pre}.ath-code__gutter{display:inline-flex;flex-direction:column;-webkit-user-select:none;user-select:none;margin-right:14px;padding-right:10px;border-right:1px solid var(--border-faint);color:var(--fg-4);font-size:11.5px;text-align:right;vertical-align:top;float:left}.ath-code__lineno{display:block;line-height:1.6}.ath-code__body{display:inline}\n"] }]
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

/** Escapes text for HTML. */
function athEscapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
/** Plain text as paragraphs and line breaks: the fallback without a parser. */
function athPlainTextHtml(text) {
    return text
        .replace(/\r\n?/g, '\n')
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p>${athEscapeHtml(p).replace(/\n/g, '<br>')}</p>`)
        .join('');
}
/**
 * Rendered Markdown, styled.
 *
 * **Security (SEC-14):** every path ends in Angular's HTML sanitizer
 * (`DomSanitizer.sanitize(SecurityContext.HTML, …)`): script, event
 * handlers, `style`, `javascript:` URLs and unknown elements are removed.
 * There is no bypass: neither a parser nor `[html]` can put unsanitized
 * markup on the page. A parser that escapes its input first (the app's
 * `renderMarkdown`) is the first line; the sanitizer is the second.
 *
 * Sources, first match wins:
 *  1. `[html]`: HTML rendered elsewhere (e.g. the server); sanitized too.
 *  2. `[text]` (alias `[source]`): Markdown, parsed with `[parse]` or the
 *     `ATH_MARKDOWN_PARSER` the app provides; without a parser it shows as
 *     escaped paragraphs.
 *
 * The rendered elements are not part of this component's template, so the
 * styles are global, scoped under `.ath-markdown .ath-md` (the
 * `styles/_markdown.scss` mixin, shared with editors).
 *
 * @example
 * <ath-markdown [text]="ticket.description" />
 * <ath-markdown [text]="comment.body" [parse]="renderMarkdown" />
 * <ath-markdown [html]="serverRenderedHtml" />
 */
class AthMarkdownComponent {
    constructor() {
        this.sanitizer = inject(DomSanitizer);
        this.defaultParser = inject(ATH_MARKDOWN_PARSER, { optional: true });
        /** Markdown source. */
        this.text = input('');
        /** @deprecated Use `text`. Markdown source, read when `text` is empty. */
        this.source = input('');
        /** Parser for this instance; defaults to `ATH_MARKDOWN_PARSER`. */
        this.parse = input(null);
        /** Pre-rendered HTML (still sanitized). Wins over `text`. */
        this.html = input('');
        /** The sanitized HTML, as a string (Angular sanitizes `innerHTML` again on binding). */
        this.renderedHtml = computed(() => {
            const direct = this.html();
            if (direct)
                return this.clean(direct);
            const src = this.text() || this.source() || '';
            if (!src.trim())
                return '';
            const parser = this.parse() ?? this.defaultParser;
            if (!parser)
                return this.clean(athPlainTextHtml(src));
            try {
                return this.clean(parser(src));
            }
            catch (err) {
                console.warn('[ath-markdown] parser threw, showing plain text', err);
                return this.clean(athPlainTextHtml(src));
            }
        });
    }
    clean(html) {
        return this.sanitizer.sanitize(SecurityContext.HTML, html) ?? '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMarkdownComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthMarkdownComponent, isStandalone: true, selector: "ath-markdown", inputs: { text: { classPropertyName: "text", publicName: "text", isSignal: true, isRequired: false, transformFunction: null }, source: { classPropertyName: "source", publicName: "source", isSignal: true, isRequired: false, transformFunction: null }, parse: { classPropertyName: "parse", publicName: "parse", isSignal: true, isRequired: false, transformFunction: null }, html: { classPropertyName: "html", publicName: "html", isSignal: true, isRequired: false, transformFunction: null } }, host: { classAttribute: "ath-markdown" }, ngImport: i0, template: `<div class="ath-md" [innerHTML]="renderedHtml()"></div>`, isInline: true, styles: [".ath-markdown{display:block;min-width:0}.ath-markdown .ath-md{font-size:inherit;line-height:1.6;color:inherit;overflow-wrap:anywhere}.ath-markdown .ath-md>:first-child{margin-top:0}.ath-markdown .ath-md>:last-child{margin-bottom:0}.ath-markdown .ath-md p,.ath-markdown .ath-md ul,.ath-markdown .ath-md ol,.ath-markdown .ath-md blockquote,.ath-markdown .ath-md pre{margin:0 0 .7em}.ath-markdown .ath-md h1,.ath-markdown .ath-md h2,.ath-markdown .ath-md h3,.ath-markdown .ath-md h4,.ath-markdown .ath-md h5,.ath-markdown .ath-md h6{margin:1.1em 0 .35em;font-weight:600;line-height:1.3;letter-spacing:-.005em;color:var(--fg)}.ath-markdown .ath-md h1,.ath-markdown .ath-md .ath-md__h1{font-size:var(--text-2xl);letter-spacing:-.01em}.ath-markdown .ath-md h2,.ath-markdown .ath-md .ath-md__h2{font-size:var(--text-xl)}.ath-markdown .ath-md h3,.ath-markdown .ath-md h4,.ath-markdown .ath-md h5,.ath-markdown .ath-md h6,.ath-markdown .ath-md .ath-md__h3{font-size:15px}.ath-markdown .ath-md ul,.ath-markdown .ath-md ol{padding-left:1.4em}.ath-markdown .ath-md ul{list-style:disc}.ath-markdown .ath-md ol{list-style:decimal}.ath-markdown .ath-md li{display:list-item}.ath-markdown .ath-md li+li{margin-top:.2em}.ath-markdown .ath-md li>ul,.ath-markdown .ath-md li>ol{margin:.2em 0 0}.ath-markdown .ath-md li>p,.ath-markdown .ath-md li>div>p{margin:0}.ath-markdown .ath-md .ath-md__tasks{padding-left:0;list-style:none}.ath-markdown .ath-md .ath-md__task{display:flex;align-items:flex-start;gap:8px}.ath-markdown .ath-md .ath-md__box{flex:0 0 auto;width:15px;height:15px;margin-top:calc((1.6em - 15px)/2);border:1.5px solid var(--border-strong);border-radius:4px;background:var(--surface)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__box{border-color:var(--ink);position:relative;background:var(--ink)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__box:after{content:\"\";position:absolute;left:4px;top:1px;width:4px;height:8px;border:solid var(--surface);border-width:0 2px 2px 0;transform:rotate(45deg)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__task-body{color:var(--fg-3);text-decoration:line-through;text-decoration-color:var(--border-strong)}.ath-markdown .ath-md .ath-md__task-body{flex:1 1 auto;min-width:0}.ath-markdown .ath-md .ath-md__table{margin:0 0 .8em;overflow-x:auto}.ath-markdown .ath-md table{width:100%;border-collapse:collapse;font-size:.93em}.ath-markdown .ath-md th,.ath-markdown .ath-md td{min-width:60px;padding:6px 10px;border:1px solid var(--border);text-align:left;vertical-align:top}.ath-markdown .ath-md th>p,.ath-markdown .ath-md td>p{margin:0}.ath-markdown .ath-md th{background:var(--table-head-bg);color:var(--fg-2);font-weight:600}.ath-markdown .ath-md .ath-md__center{text-align:center}.ath-markdown .ath-md .ath-md__right{text-align:right}.ath-markdown .ath-md strong{font-weight:600;color:var(--fg)}.ath-markdown .ath-md del{color:var(--fg-3)}.ath-markdown .ath-md a{color:var(--accent-text);text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--accent) 40%,transparent);text-underline-offset:2px}.ath-markdown .ath-md a:hover{text-decoration-color:var(--accent)}.ath-markdown .ath-md code{padding:.1em .35em;border-radius:var(--r-xs);background:var(--surface-3);font-family:var(--font-mono);font-size:.88em}.ath-markdown .ath-md pre{padding:10px 12px;border:1px solid var(--border);border-radius:var(--r-sm);background:var(--bg-1);overflow-x:auto}.ath-markdown .ath-md pre code{padding:0;background:none;font-size:.85em;line-height:1.5}.ath-markdown .ath-md blockquote{padding:.1em 0 .1em .9em;border-left:3px solid var(--border-strong);color:var(--fg-2)}.ath-markdown .ath-md hr{height:1px;margin:1em 0;border:0;background:var(--border)}.ath-markdown .ath-md .ath-md__mention{padding:0 4px;border-radius:var(--r-xs);background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent-text);font-weight:500}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMarkdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-markdown', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: { class: 'ath-markdown' }, template: `<div class="ath-md" [innerHTML]="renderedHtml()"></div>`, styles: [".ath-markdown{display:block;min-width:0}.ath-markdown .ath-md{font-size:inherit;line-height:1.6;color:inherit;overflow-wrap:anywhere}.ath-markdown .ath-md>:first-child{margin-top:0}.ath-markdown .ath-md>:last-child{margin-bottom:0}.ath-markdown .ath-md p,.ath-markdown .ath-md ul,.ath-markdown .ath-md ol,.ath-markdown .ath-md blockquote,.ath-markdown .ath-md pre{margin:0 0 .7em}.ath-markdown .ath-md h1,.ath-markdown .ath-md h2,.ath-markdown .ath-md h3,.ath-markdown .ath-md h4,.ath-markdown .ath-md h5,.ath-markdown .ath-md h6{margin:1.1em 0 .35em;font-weight:600;line-height:1.3;letter-spacing:-.005em;color:var(--fg)}.ath-markdown .ath-md h1,.ath-markdown .ath-md .ath-md__h1{font-size:var(--text-2xl);letter-spacing:-.01em}.ath-markdown .ath-md h2,.ath-markdown .ath-md .ath-md__h2{font-size:var(--text-xl)}.ath-markdown .ath-md h3,.ath-markdown .ath-md h4,.ath-markdown .ath-md h5,.ath-markdown .ath-md h6,.ath-markdown .ath-md .ath-md__h3{font-size:15px}.ath-markdown .ath-md ul,.ath-markdown .ath-md ol{padding-left:1.4em}.ath-markdown .ath-md ul{list-style:disc}.ath-markdown .ath-md ol{list-style:decimal}.ath-markdown .ath-md li{display:list-item}.ath-markdown .ath-md li+li{margin-top:.2em}.ath-markdown .ath-md li>ul,.ath-markdown .ath-md li>ol{margin:.2em 0 0}.ath-markdown .ath-md li>p,.ath-markdown .ath-md li>div>p{margin:0}.ath-markdown .ath-md .ath-md__tasks{padding-left:0;list-style:none}.ath-markdown .ath-md .ath-md__task{display:flex;align-items:flex-start;gap:8px}.ath-markdown .ath-md .ath-md__box{flex:0 0 auto;width:15px;height:15px;margin-top:calc((1.6em - 15px)/2);border:1.5px solid var(--border-strong);border-radius:4px;background:var(--surface)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__box{border-color:var(--ink);position:relative;background:var(--ink)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__box:after{content:\"\";position:absolute;left:4px;top:1px;width:4px;height:8px;border:solid var(--surface);border-width:0 2px 2px 0;transform:rotate(45deg)}.ath-markdown .ath-md .ath-md__task--done>.ath-md__task-body{color:var(--fg-3);text-decoration:line-through;text-decoration-color:var(--border-strong)}.ath-markdown .ath-md .ath-md__task-body{flex:1 1 auto;min-width:0}.ath-markdown .ath-md .ath-md__table{margin:0 0 .8em;overflow-x:auto}.ath-markdown .ath-md table{width:100%;border-collapse:collapse;font-size:.93em}.ath-markdown .ath-md th,.ath-markdown .ath-md td{min-width:60px;padding:6px 10px;border:1px solid var(--border);text-align:left;vertical-align:top}.ath-markdown .ath-md th>p,.ath-markdown .ath-md td>p{margin:0}.ath-markdown .ath-md th{background:var(--table-head-bg);color:var(--fg-2);font-weight:600}.ath-markdown .ath-md .ath-md__center{text-align:center}.ath-markdown .ath-md .ath-md__right{text-align:right}.ath-markdown .ath-md strong{font-weight:600;color:var(--fg)}.ath-markdown .ath-md del{color:var(--fg-3)}.ath-markdown .ath-md a{color:var(--accent-text);text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--accent) 40%,transparent);text-underline-offset:2px}.ath-markdown .ath-md a:hover{text-decoration-color:var(--accent)}.ath-markdown .ath-md code{padding:.1em .35em;border-radius:var(--r-xs);background:var(--surface-3);font-family:var(--font-mono);font-size:.88em}.ath-markdown .ath-md pre{padding:10px 12px;border:1px solid var(--border);border-radius:var(--r-sm);background:var(--bg-1);overflow-x:auto}.ath-markdown .ath-md pre code{padding:0;background:none;font-size:.85em;line-height:1.5}.ath-markdown .ath-md blockquote{padding:.1em 0 .1em .9em;border-left:3px solid var(--border-strong);color:var(--fg-2)}.ath-markdown .ath-md hr{height:1px;margin:1em 0;border:0;background:var(--border)}.ath-markdown .ath-md .ath-md__mention{padding:0 4px;border-radius:var(--r-xs);background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--accent-text);font-weight:500}\n"] }]
        }] });

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
        /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
        this.size = 'md';
        this.labels = inject(ATH_LABELS, { optional: true });
        /** Accessible names of the password reveal toggle; default `ATH_LABELS`. */
        this.showPasswordLabel = null;
        this.hidePasswordLabel = null;
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
        // OnPush: values written by the forms API (e.g. a setValue after an async
        // lookup) arrive outside an input change, so the view must be told.
        this.cdr = inject(ChangeDetectorRef);
    }
    get showPasswordText() {
        return (this.showPasswordLabel ?? (this.labels?.showPassword ?? ATH_DEFAULT_LABELS.showPassword)());
    }
    get hidePasswordText() {
        return (this.hidePasswordLabel ?? (this.labels?.hidePassword ?? ATH_DEFAULT_LABELS.hidePassword)());
    }
    writeValue(value) {
        this.value = value ?? '';
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthInputComponent, isStandalone: true, selector: "ath-input", inputs: { size: "size", showPasswordLabel: "showPasswordLabel", hidePasswordLabel: "hidePasswordLabel", label: "label", type: "type", placeholder: "placeholder", error: "error", hint: "hint", disabled: "disabled", readonly: "readonly", required: "required", autocomplete: "autocomplete", inputId: "inputId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthInputComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div\n  class=\"ath-input\"\n  [class.ath-input--sm]=\"size === 'sm'\"\n  [class.ath-input--error]=\"error\"\n  [class.ath-input--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-input__label\" [for]=\"inputId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId\"\n      [type]=\"showPassword ? 'text' : type\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [readonly]=\"readonly\"\n      [autocomplete]=\"autocomplete\"\n      [value]=\"value\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword ? hidePasswordText : showPasswordText\"\n        [attr.aria-pressed]=\"showPassword\"\n        tabindex=\"-1\"\n      >\n        <lucide-icon [img]=\"showPassword ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error) {\n    <div class=\"ath-input__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-input__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-input{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-input__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-input__required{color:var(--red-text);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-input__toggle{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}.ath-input__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-input__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-input--error .ath-input__field{border-color:var(--ath-color-error)}.ath-input--error .ath-input__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-input--disabled .ath-input__label{opacity:.5}.ath-input--sm .ath-input__field{height:var(--field-h-sm);padding-left:10px;padding-right:10px;font-size:13.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-input', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthInputComponent),
                            multi: true,
                        },
                    ], template: "<div\n  class=\"ath-input\"\n  [class.ath-input--sm]=\"size === 'sm'\"\n  [class.ath-input--error]=\"error\"\n  [class.ath-input--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-input__label\" [for]=\"inputId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-input__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-input__wrapper\">\n    <input\n      [id]=\"inputId\"\n      [type]=\"showPassword ? 'text' : type\"\n      [placeholder]=\"placeholder\"\n      [disabled]=\"disabled\"\n      [readonly]=\"readonly\"\n      [autocomplete]=\"autocomplete\"\n      [value]=\"value\"\n      (input)=\"onInput($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-input__field\"\n    />\n\n    @if (type === 'password') {\n      <button\n        type=\"button\"\n        class=\"ath-input__toggle\"\n        (click)=\"togglePassword()\"\n        [attr.aria-label]=\"showPassword ? hidePasswordText : showPasswordText\"\n        [attr.aria-pressed]=\"showPassword\"\n        tabindex=\"-1\"\n      >\n        <lucide-icon [img]=\"showPassword ? eyeOffIcon : eyeIcon\" [size]=\"18\" />\n      </button>\n    }\n  </div>\n\n  @if (error) {\n    <div class=\"ath-input__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-input__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-input{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-input__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-input__required{color:var(--red-text);margin-left:2px}.ath-input__wrapper{position:relative;display:flex;align-items:center}.ath-input__field{width:100%;height:44px;padding:0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-input__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-input__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-input__toggle{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-input__toggle:hover{color:var(--ath-text-secondary);background-color:var(--ath-bg-tertiary)}.ath-input__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-input__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-input--error .ath-input__field{border-color:var(--ath-color-error)}.ath-input--error .ath-input__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-input--disabled .ath-input__label{opacity:.5}.ath-input--sm .ath-input__field{height:var(--field-h-sm);padding-left:10px;padding-right:10px;font-size:13.5px}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], showPasswordLabel: [{
                type: Input
            }], hidePasswordLabel: [{
                type: Input
            }], label: [{
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
        /** Field height: `md` 44px (default), `sm` 33px (compact settings rows). */
        this.size = 'md';
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
        // OnPush: values written by the forms API (e.g. a setValue after an async
        // lookup) arrive outside an input change, so the view must be told.
        this.cdr = inject(ChangeDetectorRef);
    }
    writeValue(value) {
        this.value = value ?? '';
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
    }
    onSelectionChange(event) {
        const target = event.target;
        this.value = target.value;
        this.onChange(this.value);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSelectComponent, isStandalone: true, selector: "ath-select", inputs: { size: "size", label: "label", placeholder: "placeholder", options: "options", error: "error", hint: "hint", disabled: "disabled", required: "required", selectId: "selectId" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => AthSelectComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<div\n  class=\"ath-select\"\n  [class.ath-select--sm]=\"size === 'sm'\"\n  [class.ath-select--error]=\"error\"\n  [class.ath-select--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <!-- [selected] as well as the select's [value]: options that arrive after\n             the value (loaded later) must still show it. -->\n        <option\n          [value]=\"option.value\"\n          [disabled]=\"option.disabled\"\n          [selected]=\"option.value === value\"\n        >\n          {{ option.label }}\n        </option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--red-text);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1$1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-select', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthSelectComponent),
                            multi: true,
                        },
                    ], template: "<div\n  class=\"ath-select\"\n  [class.ath-select--sm]=\"size === 'sm'\"\n  [class.ath-select--error]=\"error\"\n  [class.ath-select--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-select__label\" [for]=\"selectId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-select__required\">*</span>\n      }\n    </label>\n  }\n\n  <div class=\"ath-select__wrapper\">\n    <select\n      [id]=\"selectId\"\n      [disabled]=\"disabled\"\n      [value]=\"value\"\n      (change)=\"onSelectionChange($event)\"\n      (blur)=\"onTouched()\"\n      class=\"ath-select__field\"\n    >\n      @if (placeholder) {\n        <option value=\"\" disabled [selected]=\"!value\">{{ placeholder }}</option>\n      }\n      @for (option of options; track option.value) {\n        <!-- [selected] as well as the select's [value]: options that arrive after\n             the value (loaded later) must still show it. -->\n        <option\n          [value]=\"option.value\"\n          [disabled]=\"option.disabled\"\n          [selected]=\"option.value === value\"\n        >\n          {{ option.label }}\n        </option>\n      }\n    </select>\n    <lucide-icon [img]=\"chevronIcon\" [size]=\"16\" class=\"ath-select__chevron\" />\n  </div>\n\n  @if (error) {\n    <div class=\"ath-select__error\">\n      <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n      {{ error }}\n    </div>\n  }\n\n  @if (hint && !error) {\n    <div class=\"ath-select__hint\">{{ hint }}</div>\n  }\n</div>\n", styles: [".ath-select{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-select__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-select__required{color:var(--red-text);margin-left:2px}.ath-select__wrapper{position:relative;display:flex;align-items:center}.ath-select__field{width:100%;height:44px;padding:0 var(--ath-space-10) 0 var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);appearance:none;cursor:pointer;transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-select__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-select__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-select__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-select__field option{background-color:var(--ath-bg-secondary);color:var(--ath-text-primary)}.ath-select__chevron{position:absolute;right:var(--ath-space-3);color:var(--ath-text-tertiary);pointer-events:none}.ath-select__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-select__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-select--error .ath-select__field{border-color:var(--ath-color-error)}.ath-select--error .ath-select__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-select--disabled .ath-select__label{opacity:.5}.ath-select--sm .ath-select__field{height:var(--field-h-sm);padding-left:10px;padding-right:32px;font-size:13.5px}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], label: [{
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
        // OnPush: values written by the forms API (e.g. a setValue after an async
        // lookup) arrive outside an input change, so the view must be told.
        this.cdr = inject(ChangeDetectorRef);
    }
    get characterCount() {
        return this.value?.length ?? 0;
    }
    writeValue(value) {
        this.value = value ?? '';
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this.cdr.markForCheck();
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
        ], ngImport: i0, template: "<div\n  class=\"ath-textarea\"\n  [class.ath-textarea--error]=\"error\"\n  [class.ath-textarea--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div\n        class=\"ath-textarea__count\"\n        [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\"\n      >\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-textarea__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-textarea__required{color:var(--red-text);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);line-height:var(--ath-line-height-normal);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-textarea__field::placeholder{color:var(--ath-text-tertiary)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-textarea__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-textarea__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-textarea__count{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-textarea__count--near-limit{color:var(--amber-text)}.ath-textarea--error .ath-textarea__field{border-color:var(--ath-color-error)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-textarea', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AthTextareaComponent),
                            multi: true,
                        },
                    ], template: "<div\n  class=\"ath-textarea\"\n  [class.ath-textarea--error]=\"error\"\n  [class.ath-textarea--disabled]=\"disabled\"\n>\n  @if (label) {\n    <label class=\"ath-textarea__label\" [for]=\"textareaId\">\n      {{ label }}\n      @if (required) {\n        <span class=\"ath-textarea__required\">*</span>\n      }\n    </label>\n  }\n\n  <textarea\n    [id]=\"textareaId\"\n    [rows]=\"rows\"\n    [placeholder]=\"placeholder\"\n    [disabled]=\"disabled\"\n    [value]=\"value\"\n    [attr.maxlength]=\"maxLength\"\n    [style.resize]=\"resize\"\n    (input)=\"onInput($event)\"\n    (blur)=\"onTouched()\"\n    class=\"ath-textarea__field\"\n  ></textarea>\n\n  <div class=\"ath-textarea__meta\">\n    @if (error) {\n      <div class=\"ath-textarea__error\">\n        <lucide-icon [img]=\"alertIcon\" [size]=\"14\" />\n        {{ error }}\n      </div>\n    } @else if (hint) {\n      <div class=\"ath-textarea__hint\">{{ hint }}</div>\n    } @else {\n      <div></div>\n    }\n\n    @if (maxLength) {\n      <div\n        class=\"ath-textarea__count\"\n        [class.ath-textarea__count--near-limit]=\"characterCount > maxLength * 0.9\"\n      >\n        {{ characterCount }}/{{ maxLength }}\n      </div>\n    }\n  </div>\n</div>\n", styles: [".ath-textarea{display:flex;flex-direction:column;gap:var(--ath-space-1)}.ath-textarea__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-textarea__required{color:var(--red-text);margin-left:2px}.ath-textarea__field{width:100%;padding:var(--ath-space-3) var(--ath-space-4);font-family:var(--ath-font-family);font-size:var(--ath-font-size-md);color:var(--ath-text-primary);background-color:var(--ath-bg-input);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);line-height:var(--ath-line-height-normal);transition:border-color var(--ath-transition-fast),box-shadow var(--ath-transition-fast)}.ath-textarea__field::placeholder{color:var(--ath-text-tertiary)}.ath-textarea__field:hover:not(:disabled):not(:focus){border-color:var(--ath-border-color-hover)}.ath-textarea__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 3px var(--accent-ring)}.ath-textarea__field:disabled{opacity:.5;cursor:not-allowed;background-color:var(--ath-bg-tertiary)}.ath-textarea__meta{display:flex;align-items:center;justify-content:space-between;gap:var(--ath-space-2)}.ath-textarea__error{display:flex;align-items:center;gap:var(--ath-space-1);font-size:var(--ath-font-size-sm);color:var(--red-text)}.ath-textarea__hint{font-size:var(--ath-font-size-sm);color:var(--ath-text-tertiary)}.ath-textarea__count{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-textarea__count--near-limit{color:var(--amber-text)}.ath-textarea--error .ath-textarea__field{border-color:var(--ath-color-error)}.ath-textarea--error .ath-textarea__field:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 20%,transparent)}.ath-textarea--disabled .ath-textarea__label{opacity:.5}\n"] }]
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthToggleComponent, isStandalone: true, selector: "ath-toggle", inputs: { checked: "checked", disabled: "disabled", label: "label", description: "description" }, outputs: { toggled: "toggled" }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-toggle\"\n  [class.ath-toggle--boxed]=\"label || description\"\n  [class.ath-toggle--checked]=\"checked\"\n  [class.ath-toggle--disabled]=\"disabled\"\n  role=\"switch\"\n  [attr.aria-checked]=\"checked\"\n  [disabled]=\"disabled\"\n  (click)=\"toggle()\"\n>\n  <span class=\"ath-toggle__track\">\n    <span class=\"ath-toggle__thumb\"></span>\n  </span>\n  @if (label || description) {\n    <span class=\"ath-toggle__content\">\n      @if (label) {\n        <span class=\"ath-toggle__label\">{{ label }}</span>\n      }\n      @if (description) {\n        <span class=\"ath-toggle__description\">{{ description }}</span>\n      }\n    </span>\n  }\n</button>\n", styles: [".ath-toggle{display:inline-flex;align-items:center;gap:var(--ath-space-3);padding:0;border:0;background:none;color:var(--ath-text-primary);text-align:left;cursor:pointer;transition:border-color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-toggle:focus-visible{outline:none}.ath-toggle:focus-visible .ath-toggle__track{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-toggle--boxed{display:flex;width:100%;padding:var(--ath-space-3) var(--ath-space-4);border-radius:var(--ath-border-radius-md);border:1px solid var(--ath-border-color);background:var(--surface)}.ath-toggle--boxed:hover:not(.ath-toggle--disabled){border-color:var(--ath-border-color-hover);background:var(--hover)}.ath-toggle__track{position:relative;flex-shrink:0;width:36px;height:20px;border-radius:var(--ath-border-radius-full);background:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color);transition:background-color var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-toggle__thumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:var(--ath-border-radius-full);background:var(--ath-text-tertiary);transition:transform var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-toggle__content{display:flex;flex-direction:column;gap:2px}.ath-toggle__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-toggle__description{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-toggle--checked .ath-toggle__track{background:var(--action-primary-bg);border-color:var(--action-primary-bg)}.ath-toggle--checked .ath-toggle__thumb{transform:translate(16px);background:#fff}.ath-toggle--disabled{opacity:.5;cursor:not-allowed}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-toggle', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-toggle\"\n  [class.ath-toggle--boxed]=\"label || description\"\n  [class.ath-toggle--checked]=\"checked\"\n  [class.ath-toggle--disabled]=\"disabled\"\n  role=\"switch\"\n  [attr.aria-checked]=\"checked\"\n  [disabled]=\"disabled\"\n  (click)=\"toggle()\"\n>\n  <span class=\"ath-toggle__track\">\n    <span class=\"ath-toggle__thumb\"></span>\n  </span>\n  @if (label || description) {\n    <span class=\"ath-toggle__content\">\n      @if (label) {\n        <span class=\"ath-toggle__label\">{{ label }}</span>\n      }\n      @if (description) {\n        <span class=\"ath-toggle__description\">{{ description }}</span>\n      }\n    </span>\n  }\n</button>\n", styles: [".ath-toggle{display:inline-flex;align-items:center;gap:var(--ath-space-3);padding:0;border:0;background:none;color:var(--ath-text-primary);text-align:left;cursor:pointer;transition:border-color var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-toggle:focus-visible{outline:none}.ath-toggle:focus-visible .ath-toggle__track{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-ring)}.ath-toggle--boxed{display:flex;width:100%;padding:var(--ath-space-3) var(--ath-space-4);border-radius:var(--ath-border-radius-md);border:1px solid var(--ath-border-color);background:var(--surface)}.ath-toggle--boxed:hover:not(.ath-toggle--disabled){border-color:var(--ath-border-color-hover);background:var(--hover)}.ath-toggle__track{position:relative;flex-shrink:0;width:36px;height:20px;border-radius:var(--ath-border-radius-full);background:var(--ath-bg-tertiary);border:1px solid var(--ath-border-color);transition:background-color var(--ath-transition-fast),border-color var(--ath-transition-fast)}.ath-toggle__thumb{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:var(--ath-border-radius-full);background:var(--ath-text-tertiary);transition:transform var(--ath-transition-fast),background-color var(--ath-transition-fast)}.ath-toggle__content{display:flex;flex-direction:column;gap:2px}.ath-toggle__label{font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-medium);color:var(--ath-text-primary)}.ath-toggle__description{font-size:var(--ath-font-size-xs);color:var(--ath-text-tertiary)}.ath-toggle--checked .ath-toggle__track{background:var(--action-primary-bg);border-color:var(--action-primary-bg)}.ath-toggle--checked .ath-toggle__thumb{transform:translate(16px);background:#fff}.ath-toggle--disabled{opacity:.5;cursor:not-allowed}\n"] }]
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
        this.labels = injectAthLabels();
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
        this.searchSubject
            .pipe(debounceTime(this.debounce), distinctUntilChanged(), takeUntil(this.destroy$))
            .subscribe((value) => {
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSearchInputComponent, isStandalone: true, selector: "ath-search-input", inputs: { placeholder: "placeholder", debounce: "debounce" }, outputs: { searched: "searched" }, ngImport: i0, template: "<div class=\"ath-search-input\">\n  <lucide-icon [img]=\"searchIcon\" [size]=\"18\" class=\"ath-search-input__icon\" />\n  <input\n    type=\"text\"\n    class=\"ath-search-input__field\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    (input)=\"onInput($event)\"\n  />\n  @if (value) {\n    <button\n      type=\"button\"\n      class=\"ath-search-input__clear\"\n      [attr.aria-label]=\"labels.clearSearch()\"\n      (click)=\"clear()\"\n    >\n      <lucide-icon [img]=\"clearIcon\" [size]=\"16\" />\n    </button>\n  }\n</div>\n", styles: [".ath-search-input{position:relative;display:flex;align-items:center}.ath-search-input__icon{position:absolute;left:var(--ath-space-4);color:var(--ath-text-tertiary);pointer-events:none;transition:color .15s ease}.ath-search-input__field{width:100%;height:42px;padding:0 var(--ath-space-10) 0 42px;font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background-color:var(--ath-bg-secondary);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);transition:border-color .15s ease,box-shadow .15s ease,background-color .15s ease}.ath-search-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-search-input__field:hover:not(:focus){border-color:var(--ath-border-color-hover);background-color:#ffffff08}.ath-search-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus);background-color:var(--ath-bg-secondary)}.ath-search-input__field:focus~.ath-search-input__icon{color:var(--ath-color-primary)}.ath-search-input:focus-within .ath-search-input__icon{color:var(--ath-color-primary)}.ath-search-input__clear{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color .15s ease,background-color .15s ease}.ath-search-input__clear:hover{color:var(--ath-text-secondary);background-color:#ffffff0f}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSearchInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-search-input', standalone: true, imports: [CommonModule, FormsModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ath-search-input\">\n  <lucide-icon [img]=\"searchIcon\" [size]=\"18\" class=\"ath-search-input__icon\" />\n  <input\n    type=\"text\"\n    class=\"ath-search-input__field\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    (input)=\"onInput($event)\"\n  />\n  @if (value) {\n    <button\n      type=\"button\"\n      class=\"ath-search-input__clear\"\n      [attr.aria-label]=\"labels.clearSearch()\"\n      (click)=\"clear()\"\n    >\n      <lucide-icon [img]=\"clearIcon\" [size]=\"16\" />\n    </button>\n  }\n</div>\n", styles: [".ath-search-input{position:relative;display:flex;align-items:center}.ath-search-input__icon{position:absolute;left:var(--ath-space-4);color:var(--ath-text-tertiary);pointer-events:none;transition:color .15s ease}.ath-search-input__field{width:100%;height:42px;padding:0 var(--ath-space-10) 0 42px;font-family:var(--ath-font-family);font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);background-color:var(--ath-bg-secondary);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-lg);transition:border-color .15s ease,box-shadow .15s ease,background-color .15s ease}.ath-search-input__field::placeholder{color:var(--ath-text-tertiary)}.ath-search-input__field:hover:not(:focus){border-color:var(--ath-border-color-hover);background-color:#ffffff08}.ath-search-input__field:focus{outline:none;border-color:var(--ath-border-color-focus);box-shadow:0 0 0 1px var(--ath-border-color-focus);background-color:var(--ath-bg-secondary)}.ath-search-input__field:focus~.ath-search-input__icon{color:var(--ath-color-primary)}.ath-search-input:focus-within .ath-search-input__icon{color:var(--ath-color-primary)}.ath-search-input__clear{position:absolute;right:var(--ath-space-2);display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color .15s ease,background-color .15s ease}.ath-search-input__clear:hover{color:var(--ath-text-secondary);background-color:#ffffff0f}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { placeholder: [{
                type: Input
            }], debounce: [{
                type: Input
            }], searched: [{
                type: Output
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSegmentComponent, isStandalone: true, selector: "ath-segment", inputs: { options: "options", value: "value", size: "size", ariaLabel: "ariaLabel" }, outputs: { valueChange: "valueChange" }, host: { properties: { "attr.role": "this.role", "attr.aria-label": "this.hostAriaLabel", "attr.data-size": "this.hostSize" } }, ngImport: i0, template: "@for (option of options; track trackByValue($index, option)) {\n  <button\n    type=\"button\"\n    role=\"tab\"\n    class=\"ath-seg__item\"\n    [class.ath-seg__item--active]=\"isActive(option)\"\n    [class.ath-seg__item--disabled]=\"option.disabled\"\n    [attr.aria-selected]=\"isActive(option)\"\n    [attr.aria-disabled]=\"option.disabled || null\"\n    [disabled]=\"option.disabled\"\n    (click)=\"select(option)\"\n  >\n    <span class=\"ath-seg__label\">{{ option.label }}</span>\n    @if (option.count != null) {\n      <span class=\"ath-seg__count\">{{ option.count }}</span>\n    }\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:2px;padding:2px;background:var(--segment-track-bg);border-radius:var(--r);border:1px solid var(--border)}.ath-seg__item{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:calc(var(--control-h) - 6px);padding:0 10px;background:transparent;border:0;border-radius:var(--r-sm);font-family:var(--font-sans);font-size:var(--control-font);font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);white-space:nowrap;letter-spacing:-.005em}.ath-seg__item:hover:not(.ath-seg__item--active):not(.ath-seg__item--disabled){color:var(--fg);background:var(--hover)}.ath-seg__item:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-seg__item--active{background:var(--segment-active-bg);color:var(--segment-active-fg);box-shadow:var(--shadow-1)}.ath-seg__item--disabled{opacity:.5;cursor:not-allowed}.ath-seg__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;padding:0 5px;height:16px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;border-radius:999px;background:var(--bg-2);color:var(--fg-3);line-height:1}.ath-seg__item--active .ath-seg__count{background:var(--segment-count-active-bg);color:var(--segment-count-active-fg)}:host([data-size=sm]) .ath-seg__item,body.compact :host .ath-seg__item{height:calc(var(--control-h-sm) - 6px);padding:0 9px;font-size:12.5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSegmentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-segment', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (option of options; track trackByValue($index, option)) {\n  <button\n    type=\"button\"\n    role=\"tab\"\n    class=\"ath-seg__item\"\n    [class.ath-seg__item--active]=\"isActive(option)\"\n    [class.ath-seg__item--disabled]=\"option.disabled\"\n    [attr.aria-selected]=\"isActive(option)\"\n    [attr.aria-disabled]=\"option.disabled || null\"\n    [disabled]=\"option.disabled\"\n    (click)=\"select(option)\"\n  >\n    <span class=\"ath-seg__label\">{{ option.label }}</span>\n    @if (option.count != null) {\n      <span class=\"ath-seg__count\">{{ option.count }}</span>\n    }\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:2px;padding:2px;background:var(--segment-track-bg);border-radius:var(--r);border:1px solid var(--border)}.ath-seg__item{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:calc(var(--control-h) - 6px);padding:0 10px;background:transparent;border:0;border-radius:var(--r-sm);font-family:var(--font-sans);font-size:var(--control-font);font-weight:500;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);white-space:nowrap;letter-spacing:-.005em}.ath-seg__item:hover:not(.ath-seg__item--active):not(.ath-seg__item--disabled){color:var(--fg);background:var(--hover)}.ath-seg__item:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-seg__item--active{background:var(--segment-active-bg);color:var(--segment-active-fg);box-shadow:var(--shadow-1)}.ath-seg__item--disabled{opacity:.5;cursor:not-allowed}.ath-seg__count{display:inline-flex;align-items:center;justify-content:center;min-width:18px;padding:0 5px;height:16px;font-family:var(--font-mono);font-size:10.5px;font-weight:500;border-radius:999px;background:var(--bg-2);color:var(--fg-3);line-height:1}.ath-seg__item--active .ath-seg__count{background:var(--segment-count-active-bg);color:var(--segment-count-active-fg)}:host([data-size=sm]) .ath-seg__item,body.compact :host .ath-seg__item{height:calc(var(--control-h-sm) - 6px);padding:0 9px;font-size:12.5px}\n"] }]
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
 * Filter pill in the style `Label Value ▾`: quiet grey fill, muted label,
 * semibold value, no separator. Optional clearable.
 * Typically used in toolbars to compose query filters.
 *
 * @example
 * <ath-filter-chip label="Status" value="Any" (clicked)="openMenu()" />
 * <ath-filter-chip label="Assignee" value="Mira Voss" [active]="true" [clearable]="true"
 *                  (clicked)="open()" (cleared)="reset()" />
 */
class AthFilterChipComponent {
    constructor() {
        this.labels = injectAthLabels();
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
    clearLabel() {
        return formatAthLabel(this.labels.clearFilter(), { name: this.label });
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthFilterChipComponent, isStandalone: true, selector: "ath-filter-chip", inputs: { label: "label", value: "value", active: "active", clearable: "clearable", disabled: "disabled" }, outputs: { clicked: "clicked", cleared: "cleared" }, host: { properties: { "attr.data-active": "this.hostActive", "attr.data-disabled": "this.hostDisabled" } }, ngImport: i0, template: "<!-- The pill holds two sibling buttons (open, clear): a button inside a button is invalid and unreachable for AT. -->\n<span class=\"ath-fchip\">\n  <button type=\"button\" class=\"ath-fchip__main\" [disabled]=\"disabled\" (click)=\"onClick()\">\n    <span class=\"ath-fchip__label\">{{ label }}</span>\n    <span class=\"ath-fchip__value\">{{ value }}</span>\n    @if (!(clearable && active)) {\n      <lucide-icon [img]=\"chevronIcon\" [size]=\"11\" class=\"ath-fchip__chevron\" />\n    }\n  </button>\n\n  @if (clearable && active) {\n    <button\n      type=\"button\"\n      class=\"ath-fchip__clear\"\n      [disabled]=\"disabled\"\n      [attr.aria-label]=\"clearLabel()\"\n      (click)=\"onClear($event)\"\n    >\n      <lucide-icon [img]=\"clearIcon\" [size]=\"11\" />\n    </button>\n  }\n</span>\n", styles: [":host{display:inline-flex}.ath-fchip{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0;background:var(--bg-2);border:1px solid transparent;border-radius:var(--r);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-normal);color:var(--fg-2);cursor:pointer;white-space:nowrap;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);letter-spacing:-.005em}.ath-fchip:hover:not(:has(:disabled)){background:var(--hover-strong);color:var(--fg)}.ath-fchip:has(.ath-fchip__main:focus-visible){box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fchip:has(.ath-fchip__main:disabled){opacity:.5;cursor:not-allowed}.ath-fchip__main{display:inline-flex;align-items:center;gap:inherit;height:100%;padding:0 10px;margin:0;background:transparent;border:0;font:inherit;letter-spacing:inherit;color:inherit;cursor:inherit;white-space:inherit}.ath-fchip__main:focus-visible{outline:none}.ath-fchip__main:disabled{cursor:not-allowed}.ath-fchip__main:not(:last-child){padding-inline-end:0}.ath-fchip__label{color:var(--fg-3);font-weight:var(--weight-normal)}.ath-fchip__value{color:var(--fg);font-weight:var(--weight-semibold)}.ath-fchip__chevron{color:var(--fg-4);margin-left:2px}.ath-fchip__clear{display:inline-flex;align-items:center;justify-content:center;margin-inline:2px 8px;width:16px;height:16px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-fchip__clear:hover{background:var(--hover-strong);color:var(--fg)}:host([data-active=true]) .ath-fchip{border-color:var(--chip-active-border)}:host([data-active=true]) .ath-fchip .ath-fchip__label{color:var(--fg-2)}body.compact .ath-fchip{height:22px;font-size:11.5px}body.compact .ath-fchip__main{padding:0 7px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFilterChipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-filter-chip', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- The pill holds two sibling buttons (open, clear): a button inside a button is invalid and unreachable for AT. -->\n<span class=\"ath-fchip\">\n  <button type=\"button\" class=\"ath-fchip__main\" [disabled]=\"disabled\" (click)=\"onClick()\">\n    <span class=\"ath-fchip__label\">{{ label }}</span>\n    <span class=\"ath-fchip__value\">{{ value }}</span>\n    @if (!(clearable && active)) {\n      <lucide-icon [img]=\"chevronIcon\" [size]=\"11\" class=\"ath-fchip__chevron\" />\n    }\n  </button>\n\n  @if (clearable && active) {\n    <button\n      type=\"button\"\n      class=\"ath-fchip__clear\"\n      [disabled]=\"disabled\"\n      [attr.aria-label]=\"clearLabel()\"\n      (click)=\"onClear($event)\"\n    >\n      <lucide-icon [img]=\"clearIcon\" [size]=\"11\" />\n    </button>\n  }\n</span>\n", styles: [":host{display:inline-flex}.ath-fchip{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0;background:var(--bg-2);border:1px solid transparent;border-radius:var(--r);font-family:var(--font-sans);font-size:var(--text-sm);font-weight:var(--weight-normal);color:var(--fg-2);cursor:pointer;white-space:nowrap;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);letter-spacing:-.005em}.ath-fchip:hover:not(:has(:disabled)){background:var(--hover-strong);color:var(--fg)}.ath-fchip:has(.ath-fchip__main:focus-visible){box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fchip:has(.ath-fchip__main:disabled){opacity:.5;cursor:not-allowed}.ath-fchip__main{display:inline-flex;align-items:center;gap:inherit;height:100%;padding:0 10px;margin:0;background:transparent;border:0;font:inherit;letter-spacing:inherit;color:inherit;cursor:inherit;white-space:inherit}.ath-fchip__main:focus-visible{outline:none}.ath-fchip__main:disabled{cursor:not-allowed}.ath-fchip__main:not(:last-child){padding-inline-end:0}.ath-fchip__label{color:var(--fg-3);font-weight:var(--weight-normal)}.ath-fchip__value{color:var(--fg);font-weight:var(--weight-semibold)}.ath-fchip__chevron{color:var(--fg-4);margin-left:2px}.ath-fchip__clear{display:inline-flex;align-items:center;justify-content:center;margin-inline:2px 8px;width:16px;height:16px;padding:0;background:transparent;border:0;border-radius:999px;color:var(--fg-3);cursor:pointer;transition:background var(--t-fast),color var(--t-fast)}.ath-fchip__clear:hover{background:var(--hover-strong);color:var(--fg)}:host([data-active=true]) .ath-fchip{border-color:var(--chip-active-border)}:host([data-active=true]) .ath-fchip .ath-fchip__label{color:var(--fg-2)}body.compact .ath-fchip{height:22px;font-size:11.5px}body.compact .ath-fchip__main{padding:0 7px}\n"] }]
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

let nextTriggerId = 0;
/**
 * Shared part of `athPopoverTrigger` and `athMenuTrigger`: keeps
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control.
 * On a wrapper component such as `<ath-button>` that is its inner `<button>`,
 * so there is one tab stop and the state is announced where focus is.
 */
class AthOverlayTriggerBase {
    constructor() {
        this.host = inject(ElementRef).nativeElement;
        effect(() => this.syncAria(this.isOpen()));
    }
    /** The focusable control the attributes go on. */
    get control() {
        return focusTarget(this.host);
    }
    /** A stable id on the control, for `aria-labelledby` of the popup. */
    controlId() {
        const el = this.control;
        if (!el.id)
            el.id = `ath-trigger-${++nextTriggerId}`;
        return el.id;
    }
    syncAria(open) {
        const el = this.control;
        el.setAttribute('aria-haspopup', this.popupKind());
        el.setAttribute('aria-expanded', String(open));
        if (open)
            el.setAttribute('aria-controls', this.popupId());
        else
            el.removeAttribute('aria-controls');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayTriggerBase, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.14", type: AthOverlayTriggerBase, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOverlayTriggerBase, decorators: [{
            type: Directive
        }], ctorParameters: () => [] });

/**
 * Opens an `ath-popover` from a button and anchors it there. Sets
 * `aria-haspopup`, `aria-expanded` and `aria-controls` on the real control
 * (the inner `<button>` of an `<ath-button>`).
 *
 * @example
 * <button type="button" [athPopoverTrigger]="pop">Filter</button>
 * <ath-popover #pop ariaLabel="Filter">…</ath-popover>
 */
class AthPopoverTriggerDirective extends AthOverlayTriggerBase {
    constructor() {
        super(...arguments);
        this.popover = input.required({ alias: 'athPopoverTrigger' });
        /** `aria-haspopup` value; `listbox` for a picker without a search field. */
        this.popupType = input('dialog');
    }
    popupKind() {
        return this.popupType();
    }
    isOpen() {
        return this.popover().open();
    }
    popupId() {
        return this.popover().panelId();
    }
    onClick() {
        this.popover().toggle(this.host);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverTriggerDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.14", type: AthPopoverTriggerDirective, isStandalone: true, selector: "[athPopoverTrigger]", inputs: { popover: { classPropertyName: "popover", publicName: "athPopoverTrigger", isSignal: true, isRequired: true, transformFunction: null }, popupType: { classPropertyName: "popupType", publicName: "popupType", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "click": "onClick()" } }, exportAs: ["athPopoverTrigger"], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPopoverTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[athPopoverTrigger]',
                    standalone: true,
                    exportAs: 'athPopoverTrigger',
                    host: {
                        '(click)': 'onClick()',
                    },
                }]
        }] });

let nextListboxId = 0;
/** Case- and accent-insensitive text for matching ("Jürgen" ~ "jurgen"). */
function foldText(text) {
    return text
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLocaleLowerCase();
}
/**
 * Athene Listbox: the WAI-ARIA listbox pattern, single or multi-select.
 *
 * Optional search field (`role="combobox"` with `aria-activedescendant`;
 * focus stays in the field), groups, an optional "create" row, typeahead
 * when there is no search field. Rendering stays cheap for a few hundred
 * options: one element per option, filtering in a `computed`, the active row
 * marked by id, offscreen rows skipped by `content-visibility`.
 *
 * Keyboard: ArrowDown/ArrowUp, Home/End (without search field),
 * PageDown/PageUp, Enter chooses (toggles in multi-select), Space too
 * without search field, typeahead without search field.
 *
 * Driven from a field outside it (an @-mention in a textarea, a slash menu
 * in an editor): the field keeps focus, forwards its keys to
 * `handleKeydown()` and points `aria-activedescendant` at `activeId()`;
 * `autoActivate` keeps the first option ready for Enter.
 *
 * @example
 * <ath-listbox [options]="labels" multiple searchable [(values)]="selected"
 *              creatable (create)="addLabel($event)" ariaLabel="Labels" />
 */
class AthListboxComponent {
    constructor() {
        this.labels = injectAthLabels();
        this.options = input([]);
        this.multiple = input(false, { transform: booleanAttribute });
        /** The selected value (single-select). Two-way: `[(value)]`. */
        this.value = model(null);
        /** The selected values (multi-select). Two-way: `[(values)]`. */
        this.values = model([]);
        /** Show a search field above the options. */
        this.searchable = input(false, { transform: booleanAttribute });
        /** The search text. Two-way: `[(query)]`, e.g. for server-side search. */
        this.query = model('');
        /** Filter `options` by the query here; turn off when the server filters. */
        this.localFilter = input(true, { transform: booleanAttribute });
        /** Offer a "Create …" row for a query without an exact match. */
        this.creatable = input(false, { transform: booleanAttribute });
        this.loading = input(false, { transform: booleanAttribute });
        this.searchPlaceholder = input(null);
        /** Text when nothing matches; defaults to `ATH_LABELS.listboxNoMatches`. */
        this.emptyLabel = input(null);
        this.ariaLabel = input(null);
        this.ariaLabelledby = input(null);
        /** Custom option rendering; see `ListboxOptionContext`. */
        this.optionTemplate = input(null);
        /** Height of the option list before it scrolls, in px. */
        this.maxHeight = input(320);
        /** Equality of values; `Object.is` by default. */
        this.compareWith = input(null);
        /**
         * With no option highlighted, the first usable one counts as active (Enter
         * chooses it). For a list driven from an outside field (`handleKeydown`).
         */
        this.autoActivate = input(false, { transform: booleanAttribute });
        /** The user chose (single) or toggled (multi) an option. */
        this.picked = output();
        /** The user chose the "create" row; carries the trimmed query. */
        this.create = output();
        this.listId = `ath-listbox-${++nextListboxId}`;
        this.checkIcon = Check;
        this.plusIcon = Plus;
        this.searchIcon = Search;
        this.searchRef = viewChild('search');
        this.listRef = viewChild.required('list');
        this.activeRaw = signal(-1);
        this.typeahead = new Typeahead();
        this.searchText = computed(() => this.searchPlaceholder() ?? this.labels.listboxSearch());
        this.emptyText = computed(() => this.emptyLabel() ?? this.labels.listboxNoMatches());
        this.folded = computed(() => this.options().map((o) => foldText(`${o.label} ${o.sublabel ?? ''} ${o.keywords ?? ''}`)));
        this.filtered = computed(() => {
            const q = foldText(this.query().trim());
            const options = this.options();
            if (!q || !this.localFilter())
                return options;
            const folded = this.folded();
            return options.filter((_, i) => folded[i].includes(q));
        });
        this.showCreate = computed(() => {
            const q = this.query().trim();
            if (!this.creatable() || !q)
                return false;
            const fq = foldText(q);
            return !this.options().some((o) => foldText(o.label) === fq);
        });
        this.isSelected = computed(() => {
            const eq = this.compareWith();
            const chosen = this.multiple()
                ? this.values()
                : this.value() === null
                    ? []
                    : [this.value()];
            if (eq)
                return (v) => chosen.some((c) => eq(c, v));
            const set = new Set(chosen);
            return (v) => set.has(v);
        });
        /** Sections in display order; row indexes run across all of them. */
        this.sections = computed(() => {
            const items = this.filtered();
            const selected = this.isSelected();
            const groups = new Map();
            const loose = [];
            for (const o of items) {
                if (o.group) {
                    const list = groups.get(o.group);
                    if (list)
                        list.push(o);
                    else
                        groups.set(o.group, [o]);
                }
                else {
                    loose.push(o);
                }
            }
            const sections = [];
            let index = 0;
            const toRows = (list) => list.map((option) => {
                const i = index++;
                return {
                    kind: 'option',
                    option,
                    index: i,
                    id: `${this.listId}-opt-${i}`,
                    selected: selected(option.value),
                };
            });
            for (const [label, list] of groups) {
                sections.push({ key: `g:${label}`, label, labelId: '', rows: toRows(list) });
            }
            if (loose.length) {
                const label = groups.size > 0 ? this.labels.listboxOtherGroup() : null;
                sections.push({ key: 'g:', label, labelId: '', rows: toRows(loose) });
            }
            if (this.showCreate()) {
                const i = index++;
                sections.push({
                    key: 'create',
                    label: null,
                    labelId: '',
                    rows: [
                        {
                            kind: 'create',
                            index: i,
                            id: `${this.listId}-create`,
                            label: formatAthLabel(this.labels.listboxCreate(), { query: this.query().trim() }),
                        },
                    ],
                });
            }
            sections.forEach((s, k) => (s.labelId = `${this.listId}-group-${k}`));
            return sections;
        });
        this.rows = computed(() => this.sections().flatMap((s) => s.rows));
        /** Index of the highlighted row, -1 for none. */
        this.activeIndex = computed(() => {
            const i = this.activeRaw();
            const count = this.rows().length;
            if (i >= 0 && i < count)
                return i;
            return this.autoActivate() ? edgeIndex(count, this.usable) : -1;
        });
        /** Element id of the highlighted option, for an outside field's `aria-activedescendant`. */
        this.activeId = computed(() => this.rows()[this.activeIndex()]?.id ?? null);
        this.usable = (i) => {
            const row = this.rows()[i];
            return !!row && (row.kind === 'create' || !row.option.disabled);
        };
    }
    /** Focuses the search field, or the list itself. */
    focus() {
        focusSafely(this.searchRef()?.nativeElement ?? this.listRef().nativeElement);
    }
    /** Highlights the first selected option, else the first enabled one. */
    resetActive() {
        const rows = this.rows();
        const selected = rows.findIndex((r) => r.kind === 'option' && r.selected);
        this.activeRaw.set(selected >= 0 ? selected : edgeIndex(rows.length, this.usable));
        this.scrollToActive();
    }
    /** Chooses the row at `index` as if the user had clicked it. */
    choose(index) {
        const row = this.rows()[index];
        if (!row)
            return;
        this.activeRaw.set(index);
        if (row.kind === 'create') {
            this.create.emit(this.query().trim());
            return;
        }
        const { option } = row;
        if (option.disabled)
            return;
        if (this.multiple()) {
            const eq = this.compareWith() ?? Object.is;
            const current = this.values();
            this.values.set(row.selected ? current.filter((v) => !eq(v, option.value)) : [...current, option.value]);
        }
        else {
            this.value.set(option.value);
        }
        this.picked.emit(option);
    }
    optionIcon(option) {
        return typeof option.icon === 'object' ? option.icon : null;
    }
    onQueryInput(event) {
        this.query.set(event.target.value);
        // The best match is ready for Enter.
        this.activeRaw.set(edgeIndex(this.rows().length, this.usable));
        this.listRef().nativeElement.scrollTop = 0;
    }
    /**
     * The list's keyboard model, for keys that arrive elsewhere (a textarea
     * that keeps focus while it suggests). A key it uses has its default
     * prevented (`event.defaultPrevented`); others pass untouched. Without a
     * search field, Home/End, Space and typeahead are handled too.
     */
    handleKeydown(event) {
        const count = this.rows().length;
        const searchable = this.searchable();
        const active = this.activeIndex();
        let next;
        switch (event.key) {
            case 'ArrowDown':
                next =
                    active < 0
                        ? edgeIndex(count, this.usable)
                        : stepIndex(count, active, 1, this.usable, false);
                break;
            case 'ArrowUp':
                next =
                    active < 0
                        ? edgeIndex(count, this.usable, true)
                        : stepIndex(count, active, -1, this.usable, false);
                break;
            case 'PageDown':
                next = this.jump(active, 10);
                break;
            case 'PageUp':
                next = this.jump(active, -10);
                break;
            case 'Home':
            case 'End':
                // In the search field they move the caret.
                if (searchable)
                    return;
                next = edgeIndex(count, this.usable, event.key === 'End');
                break;
            case 'Enter':
                if (active < 0)
                    return;
                event.preventDefault();
                this.choose(active);
                return;
            case ' ':
                if (searchable || active < 0)
                    return;
                event.preventDefault();
                this.choose(active);
                return;
            default:
                if (searchable || !isTypeaheadKey(event))
                    return;
                next = this.typeahead.next(event.key, this.rowLabels(), Math.max(active, 0));
                if (next < 0)
                    return;
        }
        event.preventDefault();
        if (next >= 0) {
            this.activeRaw.set(next);
            this.scrollToActive();
        }
    }
    onListClick(event) {
        const index = this.rowIndexAt(event);
        if (index >= 0)
            this.choose(index);
    }
    onListMousedown(event) {
        // Keep focus (and the caret) in the search field.
        if (this.searchable() && this.rowIndexAt(event) >= 0)
            event.preventDefault();
    }
    onListHover(event) {
        const index = this.rowIndexAt(event);
        if (index >= 0 && index !== this.activeRaw() && this.usable(index))
            this.activeRaw.set(index);
    }
    jump(from, delta) {
        const count = this.rows().length;
        let i = Math.max(0, Math.min(count - 1, (from < 0 ? 0 : from) + delta));
        const step = delta > 0 ? -1 : 1;
        while (i >= 0 && i < count && !this.usable(i))
            i += step;
        return i >= 0 && i < count ? i : from;
    }
    rowLabels() {
        return this.rows().map((r) => (r.kind === 'option' ? r.option.label : r.label));
    }
    rowIndexAt(event) {
        const target = event.target instanceof Element ? event.target : null;
        const el = target?.closest('[data-index]');
        if (!el || !this.listRef().nativeElement.contains(el))
            return -1;
        return Number(el.dataset['index']);
    }
    scrollToActive() {
        const id = this.activeId();
        if (!id)
            return;
        const el = this.listRef().nativeElement.ownerDocument.getElementById(id);
        el?.scrollIntoView({ block: 'nearest' });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthListboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthListboxComponent, isStandalone: true, selector: "ath-listbox", inputs: { options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, multiple: { classPropertyName: "multiple", publicName: "multiple", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, values: { classPropertyName: "values", publicName: "values", isSignal: true, isRequired: false, transformFunction: null }, searchable: { classPropertyName: "searchable", publicName: "searchable", isSignal: true, isRequired: false, transformFunction: null }, query: { classPropertyName: "query", publicName: "query", isSignal: true, isRequired: false, transformFunction: null }, localFilter: { classPropertyName: "localFilter", publicName: "localFilter", isSignal: true, isRequired: false, transformFunction: null }, creatable: { classPropertyName: "creatable", publicName: "creatable", isSignal: true, isRequired: false, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, searchPlaceholder: { classPropertyName: "searchPlaceholder", publicName: "searchPlaceholder", isSignal: true, isRequired: false, transformFunction: null }, emptyLabel: { classPropertyName: "emptyLabel", publicName: "emptyLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabelledby: { classPropertyName: "ariaLabelledby", publicName: "ariaLabelledby", isSignal: true, isRequired: false, transformFunction: null }, optionTemplate: { classPropertyName: "optionTemplate", publicName: "optionTemplate", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, compareWith: { classPropertyName: "compareWith", publicName: "compareWith", isSignal: true, isRequired: false, transformFunction: null }, autoActivate: { classPropertyName: "autoActivate", publicName: "autoActivate", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange", values: "valuesChange", query: "queryChange", picked: "picked", create: "create" }, viewQueries: [{ propertyName: "searchRef", first: true, predicate: ["search"], descendants: true, isSignal: true }, { propertyName: "listRef", first: true, predicate: ["list"], descendants: true, isSignal: true }], exportAs: ["athListbox"], ngImport: i0, template: "@if (searchable()) {\n  <div class=\"ath-listbox__search\">\n    <lucide-icon\n      class=\"ath-listbox__search-icon\"\n      [img]=\"searchIcon\"\n      [size]=\"14\"\n      aria-hidden=\"true\"\n    />\n    <input\n      #search\n      class=\"ath-listbox__search-input\"\n      type=\"text\"\n      role=\"combobox\"\n      aria-autocomplete=\"list\"\n      aria-expanded=\"true\"\n      autocomplete=\"off\"\n      spellcheck=\"false\"\n      [attr.aria-controls]=\"listId\"\n      [attr.aria-activedescendant]=\"activeId()\"\n      [attr.aria-label]=\"searchText()\"\n      [placeholder]=\"searchText()\"\n      [value]=\"query()\"\n      (input)=\"onQueryInput($event)\"\n      (keydown)=\"handleKeydown($event)\"\n    />\n  </div>\n}\n\n@if (loading()) {\n  <div class=\"ath-listbox__status\" role=\"status\">{{ labels.loading() }}</div>\n} @else if (rows().length === 0) {\n  <div class=\"ath-listbox__status\" role=\"status\">{{ emptyText() }}</div>\n}\n\n<ul\n  #list\n  class=\"ath-listbox__list\"\n  role=\"listbox\"\n  [id]=\"listId\"\n  [attr.tabindex]=\"searchable() ? -1 : 0\"\n  [attr.aria-multiselectable]=\"multiple() || null\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-labelledby]=\"ariaLabelledby()\"\n  [attr.aria-busy]=\"loading() || null\"\n  [attr.aria-activedescendant]=\"searchable() ? null : activeId()\"\n  [style.max-height.px]=\"maxHeight()\"\n  (keydown)=\"handleKeydown($event)\"\n  (click)=\"onListClick($event)\"\n  (mousedown)=\"onListMousedown($event)\"\n  (mousemove)=\"onListHover($event)\"\n>\n  @for (section of sections(); track section.key) {\n    @if (section.label) {\n      <li class=\"ath-listbox__section\" role=\"presentation\">\n        <div class=\"ath-listbox__group-label\" [id]=\"section.labelId\">{{ section.label }}</div>\n        <ul class=\"ath-listbox__group\" role=\"group\" [attr.aria-labelledby]=\"section.labelId\">\n          @for (row of section.rows; track row.id) {\n            <ng-container\n              [ngTemplateOutlet]=\"rowTpl\"\n              [ngTemplateOutletContext]=\"{ $implicit: row }\"\n            />\n          }\n        </ul>\n      </li>\n    } @else {\n      @for (row of section.rows; track row.id) {\n        <ng-container [ngTemplateOutlet]=\"rowTpl\" [ngTemplateOutletContext]=\"{ $implicit: row }\" />\n      }\n    }\n  }\n</ul>\n\n<ng-template #rowTpl let-row>\n  @if (row.kind === 'option') {\n    <li\n      class=\"ath-listbox__option\"\n      role=\"option\"\n      [id]=\"row.id\"\n      [attr.data-index]=\"row.index\"\n      [attr.aria-selected]=\"row.selected\"\n      [attr.aria-disabled]=\"row.option.disabled || null\"\n      [class.ath-listbox__option--active]=\"row.index === activeIndex()\"\n      [class.ath-listbox__option--selected]=\"row.selected\"\n      [class.ath-listbox__option--disabled]=\"row.option.disabled\"\n    >\n      @if (multiple()) {\n        <span\n          class=\"ath-listbox__check\"\n          [class.ath-listbox__check--on]=\"row.selected\"\n          aria-hidden=\"true\"\n        >\n          @if (row.selected) {\n            <lucide-icon [img]=\"checkIcon\" [size]=\"12\" />\n          }\n        </span>\n      }\n      @if (optionTemplate(); as tpl) {\n        <ng-container\n          [ngTemplateOutlet]=\"tpl\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: row.option,\n            selected: row.selected,\n            active: row.index === activeIndex(),\n          }\"\n        />\n      } @else {\n        @if (optionIcon(row.option); as icon) {\n          <lucide-icon class=\"ath-listbox__icon\" [img]=\"icon\" [size]=\"14\" aria-hidden=\"true\" />\n        }\n        <span class=\"ath-listbox__text\">\n          <span class=\"ath-listbox__label\">{{ row.option.label }}</span>\n          @if (row.option.sublabel) {\n            <span class=\"ath-listbox__sub\">{{ row.option.sublabel }}</span>\n          }\n        </span>\n        @if (!multiple() && row.selected) {\n          <lucide-icon class=\"ath-listbox__tick\" [img]=\"checkIcon\" [size]=\"14\" aria-hidden=\"true\" />\n        }\n      }\n    </li>\n  } @else {\n    <li\n      class=\"ath-listbox__option ath-listbox__option--create\"\n      role=\"option\"\n      aria-selected=\"false\"\n      [id]=\"row.id\"\n      [attr.data-index]=\"row.index\"\n      [class.ath-listbox__option--active]=\"row.index === activeIndex()\"\n    >\n      <lucide-icon class=\"ath-listbox__icon\" [img]=\"plusIcon\" [size]=\"14\" aria-hidden=\"true\" />\n      <span class=\"ath-listbox__label\">{{ row.label }}</span>\n    </li>\n  }\n</ng-template>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:flex;flex-direction:column;min-width:0;font-family:var(--font-sans);font-size:var(--text-base);color:var(--fg-2)}.ath-listbox__search{display:flex;align-items:center;gap:var(--space-2);margin:0 0 var(--space-1);padding:0 var(--space-2);background:var(--surface-3);border:1px solid transparent;border-radius:var(--r)}.ath-listbox__search:focus-within{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-listbox__search-icon{flex-shrink:0;color:var(--fg-4)}.ath-listbox__search-input{flex:1;min-width:0;height:var(--space-8);padding:0;font:inherit;color:var(--fg);background:transparent;border:0}.ath-listbox__search-input:focus{outline:none}.ath-listbox__search-input::placeholder{color:var(--fg-4)}.ath-listbox__list{margin:0;padding:0;overflow-y:auto;list-style:none;overscroll-behavior:contain}.ath-listbox__list:focus{outline:none}.ath-listbox__list:focus-visible{border-radius:var(--r-sm);box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-listbox__section{display:block}.ath-listbox__group{margin:0;padding:0;list-style:none}.ath-listbox__group-label{padding:var(--space-2) var(--space-2) var(--space-1);font-size:var(--text-xs);font-weight:var(--weight-medium);letter-spacing:.04em;text-transform:uppercase;color:var(--fg-label)}.ath-listbox__option{display:flex;align-items:center;gap:var(--space-2);min-height:var(--space-8);padding:var(--space-1) var(--space-2);border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;content-visibility:auto;contain-intrinsic-size:auto var(--space-8)}.ath-listbox__option--active{color:var(--fg);background:var(--hover-strong)}.ath-listbox__option--selected{color:var(--fg);font-weight:var(--weight-medium)}.ath-listbox__option--disabled{color:var(--fg-4);cursor:not-allowed}.ath-listbox__option--create{color:var(--fg)}:host(:has(:focus-visible)) .ath-listbox__option--active{box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-listbox__check{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;width:16px;height:16px;color:var(--surface);border:1px solid var(--border-strong);border-radius:var(--r-sm)}.ath-listbox__check--on{background:var(--control-checked);border-color:var(--control-checked)}.ath-listbox__icon{flex-shrink:0;color:var(--fg-3)}.ath-listbox__text{display:flex;flex:1;flex-direction:column;min-width:0}.ath-listbox__label,.ath-listbox__sub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-listbox__label{flex:1;min-width:0}.ath-listbox__sub{font-size:var(--text-xs);color:var(--fg-3)}.ath-listbox__tick{flex-shrink:0;color:var(--accent)}.ath-listbox__status{padding:var(--space-3) var(--space-2);font-size:var(--text-sm);color:var(--fg-3);text-align:center}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthListboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-listbox', standalone: true, imports: [NgTemplateOutlet, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'athListbox', template: "@if (searchable()) {\n  <div class=\"ath-listbox__search\">\n    <lucide-icon\n      class=\"ath-listbox__search-icon\"\n      [img]=\"searchIcon\"\n      [size]=\"14\"\n      aria-hidden=\"true\"\n    />\n    <input\n      #search\n      class=\"ath-listbox__search-input\"\n      type=\"text\"\n      role=\"combobox\"\n      aria-autocomplete=\"list\"\n      aria-expanded=\"true\"\n      autocomplete=\"off\"\n      spellcheck=\"false\"\n      [attr.aria-controls]=\"listId\"\n      [attr.aria-activedescendant]=\"activeId()\"\n      [attr.aria-label]=\"searchText()\"\n      [placeholder]=\"searchText()\"\n      [value]=\"query()\"\n      (input)=\"onQueryInput($event)\"\n      (keydown)=\"handleKeydown($event)\"\n    />\n  </div>\n}\n\n@if (loading()) {\n  <div class=\"ath-listbox__status\" role=\"status\">{{ labels.loading() }}</div>\n} @else if (rows().length === 0) {\n  <div class=\"ath-listbox__status\" role=\"status\">{{ emptyText() }}</div>\n}\n\n<ul\n  #list\n  class=\"ath-listbox__list\"\n  role=\"listbox\"\n  [id]=\"listId\"\n  [attr.tabindex]=\"searchable() ? -1 : 0\"\n  [attr.aria-multiselectable]=\"multiple() || null\"\n  [attr.aria-label]=\"ariaLabel()\"\n  [attr.aria-labelledby]=\"ariaLabelledby()\"\n  [attr.aria-busy]=\"loading() || null\"\n  [attr.aria-activedescendant]=\"searchable() ? null : activeId()\"\n  [style.max-height.px]=\"maxHeight()\"\n  (keydown)=\"handleKeydown($event)\"\n  (click)=\"onListClick($event)\"\n  (mousedown)=\"onListMousedown($event)\"\n  (mousemove)=\"onListHover($event)\"\n>\n  @for (section of sections(); track section.key) {\n    @if (section.label) {\n      <li class=\"ath-listbox__section\" role=\"presentation\">\n        <div class=\"ath-listbox__group-label\" [id]=\"section.labelId\">{{ section.label }}</div>\n        <ul class=\"ath-listbox__group\" role=\"group\" [attr.aria-labelledby]=\"section.labelId\">\n          @for (row of section.rows; track row.id) {\n            <ng-container\n              [ngTemplateOutlet]=\"rowTpl\"\n              [ngTemplateOutletContext]=\"{ $implicit: row }\"\n            />\n          }\n        </ul>\n      </li>\n    } @else {\n      @for (row of section.rows; track row.id) {\n        <ng-container [ngTemplateOutlet]=\"rowTpl\" [ngTemplateOutletContext]=\"{ $implicit: row }\" />\n      }\n    }\n  }\n</ul>\n\n<ng-template #rowTpl let-row>\n  @if (row.kind === 'option') {\n    <li\n      class=\"ath-listbox__option\"\n      role=\"option\"\n      [id]=\"row.id\"\n      [attr.data-index]=\"row.index\"\n      [attr.aria-selected]=\"row.selected\"\n      [attr.aria-disabled]=\"row.option.disabled || null\"\n      [class.ath-listbox__option--active]=\"row.index === activeIndex()\"\n      [class.ath-listbox__option--selected]=\"row.selected\"\n      [class.ath-listbox__option--disabled]=\"row.option.disabled\"\n    >\n      @if (multiple()) {\n        <span\n          class=\"ath-listbox__check\"\n          [class.ath-listbox__check--on]=\"row.selected\"\n          aria-hidden=\"true\"\n        >\n          @if (row.selected) {\n            <lucide-icon [img]=\"checkIcon\" [size]=\"12\" />\n          }\n        </span>\n      }\n      @if (optionTemplate(); as tpl) {\n        <ng-container\n          [ngTemplateOutlet]=\"tpl\"\n          [ngTemplateOutletContext]=\"{\n            $implicit: row.option,\n            selected: row.selected,\n            active: row.index === activeIndex(),\n          }\"\n        />\n      } @else {\n        @if (optionIcon(row.option); as icon) {\n          <lucide-icon class=\"ath-listbox__icon\" [img]=\"icon\" [size]=\"14\" aria-hidden=\"true\" />\n        }\n        <span class=\"ath-listbox__text\">\n          <span class=\"ath-listbox__label\">{{ row.option.label }}</span>\n          @if (row.option.sublabel) {\n            <span class=\"ath-listbox__sub\">{{ row.option.sublabel }}</span>\n          }\n        </span>\n        @if (!multiple() && row.selected) {\n          <lucide-icon class=\"ath-listbox__tick\" [img]=\"checkIcon\" [size]=\"14\" aria-hidden=\"true\" />\n        }\n      }\n    </li>\n  } @else {\n    <li\n      class=\"ath-listbox__option ath-listbox__option--create\"\n      role=\"option\"\n      aria-selected=\"false\"\n      [id]=\"row.id\"\n      [attr.data-index]=\"row.index\"\n      [class.ath-listbox__option--active]=\"row.index === activeIndex()\"\n    >\n      <lucide-icon class=\"ath-listbox__icon\" [img]=\"plusIcon\" [size]=\"14\" aria-hidden=\"true\" />\n      <span class=\"ath-listbox__label\">{{ row.label }}</span>\n    </li>\n  }\n</ng-template>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:flex;flex-direction:column;min-width:0;font-family:var(--font-sans);font-size:var(--text-base);color:var(--fg-2)}.ath-listbox__search{display:flex;align-items:center;gap:var(--space-2);margin:0 0 var(--space-1);padding:0 var(--space-2);background:var(--surface-3);border:1px solid transparent;border-radius:var(--r)}.ath-listbox__search:focus-within{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-listbox__search-icon{flex-shrink:0;color:var(--fg-4)}.ath-listbox__search-input{flex:1;min-width:0;height:var(--space-8);padding:0;font:inherit;color:var(--fg);background:transparent;border:0}.ath-listbox__search-input:focus{outline:none}.ath-listbox__search-input::placeholder{color:var(--fg-4)}.ath-listbox__list{margin:0;padding:0;overflow-y:auto;list-style:none;overscroll-behavior:contain}.ath-listbox__list:focus{outline:none}.ath-listbox__list:focus-visible{border-radius:var(--r-sm);box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-listbox__section{display:block}.ath-listbox__group{margin:0;padding:0;list-style:none}.ath-listbox__group-label{padding:var(--space-2) var(--space-2) var(--space-1);font-size:var(--text-xs);font-weight:var(--weight-medium);letter-spacing:.04em;text-transform:uppercase;color:var(--fg-label)}.ath-listbox__option{display:flex;align-items:center;gap:var(--space-2);min-height:var(--space-8);padding:var(--space-1) var(--space-2);border-radius:var(--r-sm);cursor:pointer;-webkit-user-select:none;user-select:none;content-visibility:auto;contain-intrinsic-size:auto var(--space-8)}.ath-listbox__option--active{color:var(--fg);background:var(--hover-strong)}.ath-listbox__option--selected{color:var(--fg);font-weight:var(--weight-medium)}.ath-listbox__option--disabled{color:var(--fg-4);cursor:not-allowed}.ath-listbox__option--create{color:var(--fg)}:host(:has(:focus-visible)) .ath-listbox__option--active{box-shadow:inset 0 0 0 2px var(--focus-ring-color)}.ath-listbox__check{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;width:16px;height:16px;color:var(--surface);border:1px solid var(--border-strong);border-radius:var(--r-sm)}.ath-listbox__check--on{background:var(--control-checked);border-color:var(--control-checked)}.ath-listbox__icon{flex-shrink:0;color:var(--fg-3)}.ath-listbox__text{display:flex;flex:1;flex-direction:column;min-width:0}.ath-listbox__label,.ath-listbox__sub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ath-listbox__label{flex:1;min-width:0}.ath-listbox__sub{font-size:var(--text-xs);color:var(--fg-3)}.ath-listbox__tick{flex-shrink:0;color:var(--accent)}.ath-listbox__status{padding:var(--space-3) var(--space-2);font-size:var(--text-sm);color:var(--fg-3);text-align:center}\n"] }]
        }] });

let nextPickerId = 0;
/**
 * Athene Option Picker: `ath-popover` + `ath-listbox` behind a select-style
 * trigger. The base for person, label, filter and relation pickers.
 *
 * `trigger="none"` drops the built-in button: the panel hangs from `anchor`
 * (or the host) and opens through `[(open)]` or `show()`.
 *
 * @example
 * <ath-option-picker [options]="labels" multiple [(values)]="selected"
 *                    creatable (create)="addLabel($event)" ariaLabel="Labels" />
 */
class AthOptionPickerComponent {
    constructor() {
        this.labels = injectAthLabels();
        this.host = inject(ElementRef).nativeElement;
        // ----- Data (passed to the listbox) -----
        this.options = input([]);
        this.multiple = input(false, { transform: booleanAttribute });
        this.value = model(null);
        this.values = model([]);
        /** Search text; `(queryChange)` drives server-side search. */
        this.query = model('');
        this.searchable = input(true, { transform: booleanAttribute });
        this.localFilter = input(true, { transform: booleanAttribute });
        this.creatable = input(false, { transform: booleanAttribute });
        this.loading = input(false, { transform: booleanAttribute });
        this.searchPlaceholder = input(null);
        this.emptyLabel = input(null);
        this.optionTemplate = input(null);
        this.compareWith = input(null);
        this.maxHeight = input(320);
        // ----- Trigger -----
        /** `button`: built-in select-style trigger; `none`: you provide `anchor` and open it. */
        this.trigger = input('button');
        /** Trigger text without a selection; defaults to `ATH_LABELS.pickerPlaceholder`. */
        this.placeholder = input(null);
        this.disabled = input(false, { transform: booleanAttribute });
        /** A clear button next to the trigger while something is selected. */
        this.clearable = input(false, { transform: booleanAttribute });
        /** What is being picked ("Assignee"): names the trigger and the popup. */
        this.ariaLabel = input(null);
        // ----- Popup -----
        this.open = model(false);
        this.anchor = input(null);
        this.size = input('md');
        this.align = input('start');
        this.matchWidth = input(false, { transform: booleanAttribute });
        /** Close after a pick; default: single-select yes, multi-select no. */
        this.closeOnPick = input(null);
        /** Empty the search when the popup opens. */
        this.resetQueryOnOpen = input(true, { transform: booleanAttribute });
        this.picked = output();
        this.create = output();
        this.opened = output();
        this.closed = output();
        this.chevronIcon = ChevronDown;
        this.clearIcon = X;
        this.labelId = `ath-picker-label-${++nextPickerId}`;
        this.valueId = `ath-picker-value-${nextPickerId}`;
        this.popover = viewChild.required(AthPopoverComponent);
        this.triggerButton = viewChild('triggerBtn');
        this.listbox = viewChild.required(AthListboxComponent);
        this.popupAnchor = computed(() => resolveAnchor(this.anchor()) ??
            (this.trigger() === 'none' ? this.host : (this.triggerButton()?.nativeElement ?? null)));
        this.placeholderText = computed(() => this.placeholder() ?? this.labels.pickerPlaceholder());
        this.selectedOptions = computed(() => {
            const eq = this.compareWith() ?? Object.is;
            const options = this.options();
            if (this.multiple()) {
                return this.values()
                    .map((v) => options.find((o) => eq(o.value, v)))
                    .filter((o) => !!o);
            }
            const v = this.value();
            const hit = v === null ? undefined : options.find((o) => eq(o.value, v));
            return hit ? [hit] : [];
        });
        this.hasValue = computed(() => this.selectedOptions().length > 0);
        /** The trigger text: the selection, "N selected", or the placeholder. */
        this.summary = computed(() => {
            const selected = this.selectedOptions();
            if (selected.length === 0)
                return this.placeholderText();
            if (selected.length <= 2)
                return selected.map((o) => o.label).join(', ');
            return formatAthLabel(this.labels.pickerSelected(), { count: selected.length });
        });
    }
    show() {
        if (this.disabled())
            return;
        this.popover().show(this.popupAnchor());
    }
    hide() {
        this.popover().hide();
    }
    toggle() {
        if (this.open())
            this.hide();
        else
            this.show();
    }
    /** Empties the selection. */
    clear() {
        if (this.multiple())
            this.values.set([]);
        else
            this.value.set(null);
    }
    onOpened() {
        if (this.resetQueryOnOpen())
            this.query.set('');
        this.opened.emit();
        // Once the panel (and with it the listbox) is in the document.
        setTimeout(() => this.listbox().resetActive());
    }
    onPicked(option) {
        this.picked.emit(option);
        if (this.closeOnPick() ?? !this.multiple())
            this.popover().hide('select', true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOptionPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthOptionPickerComponent, isStandalone: true, selector: "ath-option-picker", inputs: { options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, multiple: { classPropertyName: "multiple", publicName: "multiple", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, values: { classPropertyName: "values", publicName: "values", isSignal: true, isRequired: false, transformFunction: null }, query: { classPropertyName: "query", publicName: "query", isSignal: true, isRequired: false, transformFunction: null }, searchable: { classPropertyName: "searchable", publicName: "searchable", isSignal: true, isRequired: false, transformFunction: null }, localFilter: { classPropertyName: "localFilter", publicName: "localFilter", isSignal: true, isRequired: false, transformFunction: null }, creatable: { classPropertyName: "creatable", publicName: "creatable", isSignal: true, isRequired: false, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, searchPlaceholder: { classPropertyName: "searchPlaceholder", publicName: "searchPlaceholder", isSignal: true, isRequired: false, transformFunction: null }, emptyLabel: { classPropertyName: "emptyLabel", publicName: "emptyLabel", isSignal: true, isRequired: false, transformFunction: null }, optionTemplate: { classPropertyName: "optionTemplate", publicName: "optionTemplate", isSignal: true, isRequired: false, transformFunction: null }, compareWith: { classPropertyName: "compareWith", publicName: "compareWith", isSignal: true, isRequired: false, transformFunction: null }, maxHeight: { classPropertyName: "maxHeight", publicName: "maxHeight", isSignal: true, isRequired: false, transformFunction: null }, trigger: { classPropertyName: "trigger", publicName: "trigger", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, clearable: { classPropertyName: "clearable", publicName: "clearable", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, anchor: { classPropertyName: "anchor", publicName: "anchor", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, align: { classPropertyName: "align", publicName: "align", isSignal: true, isRequired: false, transformFunction: null }, matchWidth: { classPropertyName: "matchWidth", publicName: "matchWidth", isSignal: true, isRequired: false, transformFunction: null }, closeOnPick: { classPropertyName: "closeOnPick", publicName: "closeOnPick", isSignal: true, isRequired: false, transformFunction: null }, resetQueryOnOpen: { classPropertyName: "resetQueryOnOpen", publicName: "resetQueryOnOpen", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange", values: "valuesChange", query: "queryChange", open: "openChange", picked: "picked", create: "create", opened: "opened", closed: "closed" }, viewQueries: [{ propertyName: "popover", first: true, predicate: AthPopoverComponent, descendants: true, isSignal: true }, { propertyName: "triggerButton", first: true, predicate: ["triggerBtn"], descendants: true, isSignal: true }, { propertyName: "listbox", first: true, predicate: AthListboxComponent, descendants: true, isSignal: true }], exportAs: ["athOptionPicker"], ngImport: i0, template: "@if (trigger() === 'button') {\n  <div\n    class=\"ath-picker__control\"\n    [class.ath-picker__control--open]=\"open()\"\n    [class.ath-picker__control--clearable]=\"clearable() && hasValue() && !disabled()\"\n  >\n    @if (ariaLabel()) {\n      <span class=\"ath-picker__label\" [id]=\"labelId\" hidden>{{ ariaLabel() }}</span>\n    }\n    <button\n      #triggerBtn\n      type=\"button\"\n      class=\"ath-picker__trigger\"\n      [disabled]=\"disabled()\"\n      [attr.aria-labelledby]=\"ariaLabel() ? labelId + ' ' + valueId : null\"\n      [athPopoverTrigger]=\"pop\"\n      [popupType]=\"searchable() ? 'dialog' : 'listbox'\"\n    >\n      <span\n        class=\"ath-picker__value\"\n        [id]=\"valueId\"\n        [class.ath-picker__value--placeholder]=\"!hasValue()\"\n        >{{ summary() }}</span\n      >\n      <lucide-icon class=\"ath-picker__chevron\" [img]=\"chevronIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    </button>\n    @if (clearable() && hasValue() && !disabled()) {\n      <button\n        type=\"button\"\n        class=\"ath-picker__clear\"\n        [attr.aria-label]=\"labels.pickerClear()\"\n        (click)=\"clear()\"\n      >\n        <lucide-icon [img]=\"clearIcon\" [size]=\"12\" aria-hidden=\"true\" />\n      </button>\n    }\n  </div>\n}\n\n<ath-popover\n  #pop\n  [(open)]=\"open\"\n  [anchor]=\"popupAnchor()\"\n  [size]=\"size()\"\n  padding=\"sm\"\n  [align]=\"align()\"\n  [matchWidth]=\"matchWidth()\"\n  [panelRole]=\"searchable() ? 'dialog' : null\"\n  [ariaLabel]=\"ariaLabel() ?? placeholderText()\"\n  (opened)=\"onOpened()\"\n  (closed)=\"closed.emit($event)\"\n>\n  <ath-listbox\n    [options]=\"options()\"\n    [multiple]=\"multiple()\"\n    [(value)]=\"value\"\n    [(values)]=\"values\"\n    [(query)]=\"query\"\n    [searchable]=\"searchable()\"\n    [localFilter]=\"localFilter()\"\n    [creatable]=\"creatable()\"\n    [loading]=\"loading()\"\n    [searchPlaceholder]=\"searchPlaceholder()\"\n    [emptyLabel]=\"emptyLabel()\"\n    [optionTemplate]=\"optionTemplate()\"\n    [compareWith]=\"compareWith()\"\n    [maxHeight]=\"maxHeight()\"\n    [ariaLabel]=\"ariaLabel() ?? placeholderText()\"\n    (picked)=\"onPicked($event)\"\n    (create)=\"create.emit($event)\"\n  />\n</ath-popover>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-block;max-width:100%;font-family:var(--font-sans)}.ath-picker__control{position:relative;display:flex}.ath-picker__trigger{display:inline-flex;flex:1;align-items:center;gap:var(--space-2);min-width:140px;height:var(--space-8);padding:0 var(--space-2) 0 var(--space-3);font:inherit;font-size:var(--text-base);font-weight:var(--weight-medium);color:var(--fg);background:var(--bg-1);border:1px solid var(--border-strong);border-radius:var(--r);cursor:pointer;transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-picker__trigger:hover:not(:disabled){border-color:var(--accent-dim)}.ath-picker__trigger:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-picker__trigger:disabled{cursor:not-allowed;opacity:.5}.ath-picker__control--open>.ath-picker__trigger{border-color:var(--accent)}.ath-picker__control--clearable>.ath-picker__trigger{padding-inline-end:calc(var(--space-8) + var(--space-2))}.ath-picker__value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:start}.ath-picker__value--placeholder{font-weight:var(--weight-normal);color:var(--fg-4)}.ath-picker__chevron{flex-shrink:0;color:var(--fg-3)}.ath-picker__clear{position:absolute;inset-block:0;inset-inline-end:calc(var(--space-6) + var(--space-1));display:inline-flex;align-items:center;justify-content:center;width:var(--space-5);height:var(--space-5);margin-block:auto;padding:0;color:var(--fg-3);background:transparent;border:0;border-radius:var(--r-sm);cursor:pointer}.ath-picker__clear:hover{color:var(--fg);background:var(--hover-strong)}.ath-picker__clear:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}\n"], dependencies: [{ kind: "component", type: AthPopoverComponent, selector: "ath-popover", inputs: ["open", "anchor", "size", "padding", "align", "side", "offset", "matchWidth", "maxHeight", "arrow", "trapFocus", "autoFocus", "restoreFocus", "closeOnEscape", "closeOnOutsideClick", "panelRole", "ariaLabel", "ariaLabelledby", "panelClass", "panelId"], outputs: ["openChange", "opened", "closed"], exportAs: ["athPopover"] }, { kind: "directive", type: AthPopoverTriggerDirective, selector: "[athPopoverTrigger]", inputs: ["athPopoverTrigger", "popupType"], exportAs: ["athPopoverTrigger"] }, { kind: "component", type: AthListboxComponent, selector: "ath-listbox", inputs: ["options", "multiple", "value", "values", "searchable", "query", "localFilter", "creatable", "loading", "searchPlaceholder", "emptyLabel", "ariaLabel", "ariaLabelledby", "optionTemplate", "maxHeight", "compareWith", "autoActivate"], outputs: ["valueChange", "valuesChange", "queryChange", "picked", "create"], exportAs: ["athListbox"] }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthOptionPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-option-picker', standalone: true, imports: [
                        AthPopoverComponent,
                        AthPopoverTriggerDirective,
                        AthListboxComponent,
                        LucideAngularModule,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'athOptionPicker', template: "@if (trigger() === 'button') {\n  <div\n    class=\"ath-picker__control\"\n    [class.ath-picker__control--open]=\"open()\"\n    [class.ath-picker__control--clearable]=\"clearable() && hasValue() && !disabled()\"\n  >\n    @if (ariaLabel()) {\n      <span class=\"ath-picker__label\" [id]=\"labelId\" hidden>{{ ariaLabel() }}</span>\n    }\n    <button\n      #triggerBtn\n      type=\"button\"\n      class=\"ath-picker__trigger\"\n      [disabled]=\"disabled()\"\n      [attr.aria-labelledby]=\"ariaLabel() ? labelId + ' ' + valueId : null\"\n      [athPopoverTrigger]=\"pop\"\n      [popupType]=\"searchable() ? 'dialog' : 'listbox'\"\n    >\n      <span\n        class=\"ath-picker__value\"\n        [id]=\"valueId\"\n        [class.ath-picker__value--placeholder]=\"!hasValue()\"\n        >{{ summary() }}</span\n      >\n      <lucide-icon class=\"ath-picker__chevron\" [img]=\"chevronIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    </button>\n    @if (clearable() && hasValue() && !disabled()) {\n      <button\n        type=\"button\"\n        class=\"ath-picker__clear\"\n        [attr.aria-label]=\"labels.pickerClear()\"\n        (click)=\"clear()\"\n      >\n        <lucide-icon [img]=\"clearIcon\" [size]=\"12\" aria-hidden=\"true\" />\n      </button>\n    }\n  </div>\n}\n\n<ath-popover\n  #pop\n  [(open)]=\"open\"\n  [anchor]=\"popupAnchor()\"\n  [size]=\"size()\"\n  padding=\"sm\"\n  [align]=\"align()\"\n  [matchWidth]=\"matchWidth()\"\n  [panelRole]=\"searchable() ? 'dialog' : null\"\n  [ariaLabel]=\"ariaLabel() ?? placeholderText()\"\n  (opened)=\"onOpened()\"\n  (closed)=\"closed.emit($event)\"\n>\n  <ath-listbox\n    [options]=\"options()\"\n    [multiple]=\"multiple()\"\n    [(value)]=\"value\"\n    [(values)]=\"values\"\n    [(query)]=\"query\"\n    [searchable]=\"searchable()\"\n    [localFilter]=\"localFilter()\"\n    [creatable]=\"creatable()\"\n    [loading]=\"loading()\"\n    [searchPlaceholder]=\"searchPlaceholder()\"\n    [emptyLabel]=\"emptyLabel()\"\n    [optionTemplate]=\"optionTemplate()\"\n    [compareWith]=\"compareWith()\"\n    [maxHeight]=\"maxHeight()\"\n    [ariaLabel]=\"ariaLabel() ?? placeholderText()\"\n    (picked)=\"onPicked($event)\"\n    (create)=\"create.emit($event)\"\n  />\n</ath-popover>\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}:host{display:inline-block;max-width:100%;font-family:var(--font-sans)}.ath-picker__control{position:relative;display:flex}.ath-picker__trigger{display:inline-flex;flex:1;align-items:center;gap:var(--space-2);min-width:140px;height:var(--space-8);padding:0 var(--space-2) 0 var(--space-3);font:inherit;font-size:var(--text-base);font-weight:var(--weight-medium);color:var(--fg);background:var(--bg-1);border:1px solid var(--border-strong);border-radius:var(--r);cursor:pointer;transition:border-color var(--t-fast),box-shadow var(--t-fast)}.ath-picker__trigger:hover:not(:disabled){border-color:var(--accent-dim)}.ath-picker__trigger:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-picker__trigger:disabled{cursor:not-allowed;opacity:.5}.ath-picker__control--open>.ath-picker__trigger{border-color:var(--accent)}.ath-picker__control--clearable>.ath-picker__trigger{padding-inline-end:calc(var(--space-8) + var(--space-2))}.ath-picker__value{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:start}.ath-picker__value--placeholder{font-weight:var(--weight-normal);color:var(--fg-4)}.ath-picker__chevron{flex-shrink:0;color:var(--fg-3)}.ath-picker__clear{position:absolute;inset-block:0;inset-inline-end:calc(var(--space-6) + var(--space-1));display:inline-flex;align-items:center;justify-content:center;width:var(--space-5);height:var(--space-5);margin-block:auto;padding:0;color:var(--fg-3);background:transparent;border:0;border-radius:var(--r-sm);cursor:pointer}.ath-picker__clear:hover{color:var(--fg);background:var(--hover-strong)}.ath-picker__clear:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}\n"] }]
        }] });

/**
 * Searchable single-select dropdown: a preset on `ath-option-picker`
 * (popover + listbox), kept for its established API. For multi-select,
 * "create" rows or a custom anchor use `ath-option-picker` directly.
 *
 * For custom rendering pass an `optionTpl` template (`let-option`).
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
        this.host = inject(ElementRef).nativeElement;
        this.options = input([]);
        /** The selected value. Two-way: `[(value)]`. */
        this.value = model(null);
        /** Trigger text without a value; defaults to `ATH_LABELS.pickerPlaceholder`. */
        this.placeholder = input(null);
        /** Search field placeholder; defaults to `ATH_LABELS.listboxSearch`. */
        this.searchPlaceholder = input(null);
        this.disabled = input(false, { transform: booleanAttribute });
        this.clearable = input(false, { transform: booleanAttribute });
        this.loading = input(false, { transform: booleanAttribute });
        /** Hide the trigger; render only the popup (controlled mode, see `openPanel()`). */
        this.bare = input(false, { transform: booleanAttribute });
        /** Optional custom template for each option (`<ng-template let-option>`). */
        this.optionTpl = input(null);
        /** Emits the search query when it changes (for async/server search). */
        this.queryChange = output();
        this.opened = output();
        this.closed = output();
        this.picker = viewChild.required(AthOptionPickerComponent);
    }
    toggle() {
        this.picker().toggle();
    }
    openPanel() {
        this.picker().show();
    }
    close() {
        this.picker().hide();
    }
    select(option) {
        if (option.disabled)
            return;
        this.value.set(option.value);
        this.close();
    }
    /** @deprecated The clear button is built in (`clearable`); call `value.set(null)`. */
    clearValue(event) {
        event?.stopPropagation();
        this.value.set(null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthComboboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "18.2.14", type: AthComboboxComponent, isStandalone: true, selector: "ath-combobox", inputs: { options: { classPropertyName: "options", publicName: "options", isSignal: true, isRequired: false, transformFunction: null }, value: { classPropertyName: "value", publicName: "value", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, searchPlaceholder: { classPropertyName: "searchPlaceholder", publicName: "searchPlaceholder", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, clearable: { classPropertyName: "clearable", publicName: "clearable", isSignal: true, isRequired: false, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, bare: { classPropertyName: "bare", publicName: "bare", isSignal: true, isRequired: false, transformFunction: null }, optionTpl: { classPropertyName: "optionTpl", publicName: "optionTpl", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { value: "valueChange", queryChange: "queryChange", opened: "opened", closed: "closed" }, viewQueries: [{ propertyName: "picker", first: true, predicate: AthOptionPickerComponent, descendants: true, isSignal: true }], ngImport: i0, template: "<ath-option-picker\n  [options]=\"options()\"\n  [(value)]=\"value\"\n  [placeholder]=\"placeholder()\"\n  [searchPlaceholder]=\"searchPlaceholder()\"\n  [disabled]=\"disabled()\"\n  [clearable]=\"clearable()\"\n  [loading]=\"loading()\"\n  [optionTemplate]=\"optionTpl()\"\n  [trigger]=\"bare() ? 'none' : 'button'\"\n  [anchor]=\"bare() ? host : null\"\n  [matchWidth]=\"!bare()\"\n  size=\"md\"\n  align=\"auto\"\n  (queryChange)=\"queryChange.emit($event)\"\n  (opened)=\"opened.emit()\"\n  (closed)=\"closed.emit()\"\n/>\n", styles: [":host{display:inline-block;position:relative;max-width:100%}:host>ath-option-picker{display:block}\n"], dependencies: [{ kind: "component", type: AthOptionPickerComponent, selector: "ath-option-picker", inputs: ["options", "multiple", "value", "values", "query", "searchable", "localFilter", "creatable", "loading", "searchPlaceholder", "emptyLabel", "optionTemplate", "compareWith", "maxHeight", "trigger", "placeholder", "disabled", "clearable", "ariaLabel", "open", "anchor", "size", "align", "matchWidth", "closeOnPick", "resetQueryOnOpen"], outputs: ["valueChange", "valuesChange", "queryChange", "openChange", "picked", "create", "opened", "closed"], exportAs: ["athOptionPicker"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthComboboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-combobox', standalone: true, imports: [AthOptionPickerComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ath-option-picker\n  [options]=\"options()\"\n  [(value)]=\"value\"\n  [placeholder]=\"placeholder()\"\n  [searchPlaceholder]=\"searchPlaceholder()\"\n  [disabled]=\"disabled()\"\n  [clearable]=\"clearable()\"\n  [loading]=\"loading()\"\n  [optionTemplate]=\"optionTpl()\"\n  [trigger]=\"bare() ? 'none' : 'button'\"\n  [anchor]=\"bare() ? host : null\"\n  [matchWidth]=\"!bare()\"\n  size=\"md\"\n  align=\"auto\"\n  (queryChange)=\"queryChange.emit($event)\"\n  (opened)=\"opened.emit()\"\n  (closed)=\"closed.emit()\"\n/>\n", styles: [":host{display:inline-block;position:relative;max-width:100%}:host>ath-option-picker{display:block}\n"] }]
        }] });

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
        this.labels = injectAthLabels();
        this._users = signal([]);
        this.value = null;
        this.placeholder = null;
        this.searchPlaceholder = null;
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
        return this.allowUnassigned ? (this.placeholder ?? this.labels.userPickerPlaceholder()) : '—';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthUserPickerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthUserPickerComponent, isStandalone: true, selector: "ath-user-picker", inputs: { users: "users", value: "value", placeholder: "placeholder", searchPlaceholder: "searchPlaceholder", disabled: "disabled", clearable: "clearable", allowUnassigned: "allowUnassigned", showEmail: "showEmail" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value\"\n  [placeholder]=\"placeholder ?? labels.userPickerPlaceholder()\"\n  [searchPlaceholder]=\"searchPlaceholder ?? labels.userPickerSearch()\"\n  [disabled]=\"disabled\"\n  [clearable]=\"clearable && allowUnassigned\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n", styles: [":host{display:inline-block}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: AthComboboxComponent, selector: "ath-combobox", inputs: ["options", "value", "placeholder", "searchPlaceholder", "disabled", "clearable", "loading", "bare", "optionTpl"], outputs: ["valueChange", "queryChange", "opened", "closed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthUserPickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-user-picker', standalone: true, imports: [CommonModule, AthAvatarComponent, AthComboboxComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ath-combobox\n  [options]=\"options()\"\n  [value]=\"value\"\n  [placeholder]=\"placeholder ?? labels.userPickerPlaceholder()\"\n  [searchPlaceholder]=\"searchPlaceholder ?? labels.userPickerSearch()\"\n  [disabled]=\"disabled\"\n  [clearable]=\"clearable && allowUnassigned\"\n  (valueChange)=\"onValueChange($event)\"\n/>\n", styles: [":host{display:inline-block}\n"] }]
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
        this.labels = injectAthLabels();
        /** Filter for the file picker (e.g., `image/*,.pdf`). */
        this.accept = null;
        this.multiple = true;
        /** Reject files larger than this (in MB). 0 = no limit. */
        this.maxSizeMb = 0;
        this.disabled = false;
        /** Custom prompt text. Defaults to "Drop files or click to browse". */
        this.prompt = null;
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthFileDropComponent, isStandalone: true, selector: "ath-file-drop", inputs: { accept: "accept", multiple: "multiple", maxSizeMb: "maxSizeMb", disabled: "disabled", prompt: "prompt" }, outputs: { filesPicked: "filesPicked", rejected: "rejected" }, host: { listeners: { "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)", "drop": "onDrop($event)" } }, viewQueries: [{ propertyName: "fileInput", first: true, predicate: ["fileInput"], descendants: true }], ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt ?? labels.fileDropPrompt() }}</ng-content>\n  </span>\n  @if (accept || maxSizeMb > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept) {\n        <span>{{ accept }}</span>\n      }\n      @if (accept && maxSizeMb > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb > 0) {\n        <span>max {{ maxSizeMb }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept ?? ''\"\n  [multiple]=\"multiple\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent-text)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthFileDropComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-file-drop', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-fdrop\"\n  [class.ath-fdrop--dragging]=\"dragging()\"\n  [disabled]=\"disabled\"\n  (click)=\"openPicker()\"\n>\n  <span class=\"ath-fdrop__icon\" aria-hidden=\"true\">\n    <lucide-icon [img]=\"uploadIcon\" [size]=\"20\" />\n  </span>\n  <span class=\"ath-fdrop__prompt\">\n    <ng-content>{{ prompt ?? labels.fileDropPrompt() }}</ng-content>\n  </span>\n  @if (accept || maxSizeMb > 0) {\n    <span class=\"ath-fdrop__hint\">\n      @if (accept) {\n        <span>{{ accept }}</span>\n      }\n      @if (accept && maxSizeMb > 0) {\n        <span aria-hidden=\"true\">\u00B7</span>\n      }\n      @if (maxSizeMb > 0) {\n        <span>max {{ maxSizeMb }} MB</span>\n      }\n    </span>\n  }\n</button>\n<input\n  #fileInput\n  type=\"file\"\n  class=\"ath-fdrop__input\"\n  [accept]=\"accept ?? ''\"\n  [multiple]=\"multiple\"\n  (change)=\"onPickerChange($event)\"\n  hidden\n/>\n", styles: [":host{display:block}.ath-fdrop{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;min-height:120px;padding:20px 16px;background:var(--bg-1);border:1.5px dashed var(--border-strong);border-radius:var(--r-lg);color:var(--fg-3);cursor:pointer;transition:background var(--t-base),border-color var(--t-base),color var(--t-base)}.ath-fdrop:hover:not(:disabled){background:var(--bg-2);border-color:var(--accent-dim);color:var(--fg-2)}.ath-fdrop--dragging{background:var(--accent-faint);border-color:var(--accent);border-style:solid;color:var(--accent-text)}.ath-fdrop:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-fdrop:disabled{opacity:.5;cursor:not-allowed}.ath-fdrop__icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:999px;background:var(--bg-2);color:inherit}.ath-fdrop--dragging .ath-fdrop__icon{background:var(--accent-faint);color:var(--accent)}.ath-fdrop__prompt{font-family:var(--font-sans);font-size:13px;font-weight:500;text-align:center}.ath-fdrop__hint{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--fg-4)}\n"] }]
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
 * Athene Alert
 *
 * Feedback in the page: info, warn, error or success, inline or as a
 * banner, with an optional retry. `[retry]` takes the work to repeat; the
 * retry button is an `ath-button [action]`, so it is busy while the retry
 * runs. With no `message` (and nothing projected) the alert takes no
 * space, so a page can keep `<ath-alert [message]="error()" …>` in its
 * template unconditionally.
 *
 * Replaces the app's `error-banner`.
 *
 * @example
 * <ath-alert variant="error" [message]="error()" [retry]="reload" />
 * <ath-alert variant="warn" appearance="banner" [message]="'Maintenance at 22:00'" />
 * <ath-alert variant="success" message="Saved" [dismissible]="true" (dismissed)="clear()" />
 */
class AthAlertComponent {
    constructor() {
        this.labels = injectAthLabels();
        this.variant = input('info');
        this.appearance = input('inline');
        /** The text; empty or `null` (with no projected content) hides the alert. */
        this.message = input('');
        /** Optional bold lead-in before the message. */
        this.title = input(null);
        /** Icon before the text; default on for banners, off inline. */
        this.icon = input(null);
        this.dismissible = input(false);
        /** Work to repeat; shows the retry button. */
        this.retry = input(null);
        /** Retry button text; default `ATH_LABELS.retry`. */
        this.retryLabel = input(null);
        /** Dismiss button's accessible name; default `ATH_LABELS.dismiss`. */
        this.dismissLabel = input(null);
        this.dismissed = output();
        this.closeIcon = X;
        this.tone = computed(() => {
            const v = this.variant();
            return v === 'warning' ? 'warn' : v;
        });
        /** Errors and warnings interrupt; info and success wait their turn. */
        this.role = computed(() => this.tone() === 'error' || this.tone() === 'warn' ? 'alert' : 'status');
        this.showIcon = computed(() => this.icon() ?? this.appearance() === 'banner');
        this.glyph = computed(() => {
            switch (this.tone()) {
                case 'warn':
                    return AlertTriangle;
                case 'error':
                    return AlertOctagon;
                case 'success':
                    return CheckCircle2;
                default:
                    return Info;
            }
        });
        this.retryText = computed(() => this.retryLabel() ?? this.labels.retry());
        this.dismissText = computed(() => this.dismissLabel() ?? this.labels.dismiss());
    }
    dismiss() {
        this.dismissed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAlertComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthAlertComponent, isStandalone: true, selector: "ath-alert", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, appearance: { classPropertyName: "appearance", publicName: "appearance", isSignal: true, isRequired: false, transformFunction: null }, message: { classPropertyName: "message", publicName: "message", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, dismissible: { classPropertyName: "dismissible", publicName: "dismissible", isSignal: true, isRequired: false, transformFunction: null }, retry: { classPropertyName: "retry", publicName: "retry", isSignal: true, isRequired: false, transformFunction: null }, retryLabel: { classPropertyName: "retryLabel", publicName: "retryLabel", isSignal: true, isRequired: false, transformFunction: null }, dismissLabel: { classPropertyName: "dismissLabel", publicName: "dismissLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { dismissed: "dismissed" }, host: { properties: { "class.ath-alert--empty": "!message() && !title()" } }, ngImport: i0, template: "<div\n  class=\"ath-alert\"\n  [attr.data-tone]=\"tone()\"\n  [attr.data-appearance]=\"appearance()\"\n  [attr.role]=\"role()\"\n>\n  @if (showIcon()) {\n    <lucide-icon class=\"ath-alert__icon\" [img]=\"glyph()\" [size]=\"16\" aria-hidden=\"true\" />\n  }\n  <span class=\"ath-alert__message\">\n    @if (title()) {\n      <strong class=\"ath-alert__title\">{{ title() }}</strong>\n    }\n    {{ message() }}\n    <span class=\"ath-alert__extra\"><ng-content /></span>\n  </span>\n  @if (retry(); as retryAction) {\n    <ath-button class=\"ath-alert__retry\" variant=\"secondary\" size=\"xs\" [action]=\"retryAction\">\n      {{ retryText() }}\n    </ath-button>\n  }\n  @if (dismissible()) {\n    <button\n      type=\"button\"\n      class=\"ath-alert__dismiss\"\n      [attr.aria-label]=\"dismissText()\"\n      (click)=\"dismiss()\"\n    >\n      <lucide-icon [img]=\"closeIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    </button>\n  }\n</div>\n", styles: [":host{display:block;min-width:0}:host(.ath-alert--empty):has(.ath-alert__extra:empty){display:none}.ath-alert{--_tone: var(--blue);--_text: var(--blue-text);--_tint: var(--blue-tint);display:flex;align-items:center;gap:var(--space-3);padding:10px 14px;border:1px solid color-mix(in srgb,var(--_tone) 30%,transparent);border-radius:var(--r);background:var(--_tint);color:var(--_text);font-size:var(--control-font);line-height:var(--line-normal)}.ath-alert[data-tone=success]{--_tone: var(--green);--_text: var(--green-text);--_tint: var(--green-tint)}.ath-alert[data-tone=warn]{--_tone: var(--amber);--_text: var(--amber-text);--_tint: var(--amber-tint)}.ath-alert[data-tone=error]{--_tone: var(--red);--_text: var(--red-text);--_tint: var(--red-tint)}.ath-alert[data-appearance=banner]{padding:var(--space-2) var(--content-pad-x);border-width:0 0 1px;border-radius:0}.ath-alert__icon{flex-shrink:0;color:var(--_tone)}.ath-alert__message{flex:1;min-width:0}.ath-alert__title{margin-right:var(--space-1);font-weight:var(--weight-semibold)}.ath-alert__retry{flex-shrink:0}.ath-alert__dismiss{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:none;border-radius:var(--r-sm);background:transparent;color:inherit;cursor:pointer;opacity:.7;transition:opacity var(--t-fast)}.ath-alert__dismiss:hover{opacity:1}.ath-alert__dismiss:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow);opacity:1}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }, { kind: "component", type: AthButtonComponent, selector: "ath-button", inputs: ["variant", "size", "type", "disabled", "loading", "fullWidth", "pressed", "expanded", "controls", "ariaLabel", "action"], outputs: ["clicked", "done", "failed"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthAlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-alert', standalone: true, imports: [LucideAngularModule, AthButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.ath-alert--empty]': '!message() && !title()',
                    }, template: "<div\n  class=\"ath-alert\"\n  [attr.data-tone]=\"tone()\"\n  [attr.data-appearance]=\"appearance()\"\n  [attr.role]=\"role()\"\n>\n  @if (showIcon()) {\n    <lucide-icon class=\"ath-alert__icon\" [img]=\"glyph()\" [size]=\"16\" aria-hidden=\"true\" />\n  }\n  <span class=\"ath-alert__message\">\n    @if (title()) {\n      <strong class=\"ath-alert__title\">{{ title() }}</strong>\n    }\n    {{ message() }}\n    <span class=\"ath-alert__extra\"><ng-content /></span>\n  </span>\n  @if (retry(); as retryAction) {\n    <ath-button class=\"ath-alert__retry\" variant=\"secondary\" size=\"xs\" [action]=\"retryAction\">\n      {{ retryText() }}\n    </ath-button>\n  }\n  @if (dismissible()) {\n    <button\n      type=\"button\"\n      class=\"ath-alert__dismiss\"\n      [attr.aria-label]=\"dismissText()\"\n      (click)=\"dismiss()\"\n    >\n      <lucide-icon [img]=\"closeIcon\" [size]=\"14\" aria-hidden=\"true\" />\n    </button>\n  }\n</div>\n", styles: [":host{display:block;min-width:0}:host(.ath-alert--empty):has(.ath-alert__extra:empty){display:none}.ath-alert{--_tone: var(--blue);--_text: var(--blue-text);--_tint: var(--blue-tint);display:flex;align-items:center;gap:var(--space-3);padding:10px 14px;border:1px solid color-mix(in srgb,var(--_tone) 30%,transparent);border-radius:var(--r);background:var(--_tint);color:var(--_text);font-size:var(--control-font);line-height:var(--line-normal)}.ath-alert[data-tone=success]{--_tone: var(--green);--_text: var(--green-text);--_tint: var(--green-tint)}.ath-alert[data-tone=warn]{--_tone: var(--amber);--_text: var(--amber-text);--_tint: var(--amber-tint)}.ath-alert[data-tone=error]{--_tone: var(--red);--_text: var(--red-text);--_tint: var(--red-tint)}.ath-alert[data-appearance=banner]{padding:var(--space-2) var(--content-pad-x);border-width:0 0 1px;border-radius:0}.ath-alert__icon{flex-shrink:0;color:var(--_tone)}.ath-alert__message{flex:1;min-width:0}.ath-alert__title{margin-right:var(--space-1);font-weight:var(--weight-semibold)}.ath-alert__retry{flex-shrink:0}.ath-alert__dismiss{display:inline-flex;flex-shrink:0;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:none;border-radius:var(--r-sm);background:transparent;color:inherit;cursor:pointer;opacity:.7;transition:opacity var(--t-fast)}.ath-alert__dismiss:hover{opacity:1}.ath-alert__dismiss:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow);opacity:1}\n"] }]
        }] });

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
 * `bare`: no header, footer, close button or surface. The dialog is a
 * transparent layer over the viewport and the content draws and places its
 * own surface (a palette at the top, a bottom sheet, a composer with its own
 * head); a click on the layer around it counts as a backdrop click. Top
 * layer, inert page, scrim, focus trap, Escape and focus return stay. Name it
 * with `ariaLabel`.
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
class AthDialogComponent {
    constructor() {
        this.stack = inject(AthOverlayStack);
        this.labels = injectAthLabels();
        /** Ids that name and describe the dialog (`aria-labelledby/-describedby`). */
        this.titleId = `ath-dialog-title-${++nextDialogId}`;
        this.descriptionId = `ath-dialog-desc-${nextDialogId}`;
        /** Whether the dialog is open. Two-way: `[(open)]`. */
        this.open = input(false, { transform: booleanAttribute });
        /** Dialog title (names the dialog). */
        this.title = input('');
        /** Dialog description (describes the dialog). */
        this.description = input('');
        this.size = input('md');
        /** Whether clicking the backdrop requests closing. */
        this.closeOnBackdrop = input(true, { transform: booleanAttribute });
        /** Whether Escape requests closing. */
        this.closeOnEscape = input(true, { transform: booleanAttribute });
        /** Show the ✕ button in the header. */
        this.showClose = input(true, { transform: booleanAttribute });
        /** Accessible name of the close button; defaults to `ATH_LABELS.closeDialog`. */
        this.closeLabel = input(null);
        /** Accessible name when there is no visible `title`. */
        this.ariaLabel = input(null);
        /** `alertdialog` for confirmations that interrupt. */
        this.role = input('dialog');
        /**
         * Only the content, on a transparent full-viewport layer: the content is
         * the surface and places itself (see the class comment). `title`,
         * `description`, `size` and `showClose` do not apply.
         */
        this.bare = input(false, { transform: booleanAttribute });
        /** The user asked to close (✕, Escape, backdrop). */
        this.closed = output();
        /** Two-way partner of `open`; emits `false` on a close request. */
        this.openChange = output();
        /** The dialog is shown (after `showModal()`). */
        this.opened = output();
        this.closeIcon = X;
        this.closeText = computed(() => this.closeLabel() ?? this.labels.closeDialog());
        this.dialogEl = null;
        this.returnFocus = null;
        this.pressedOnBackdrop = false;
        this.locked = false;
        this.entry = {
            modal: true,
            panel: () => this.dialogEl,
            anchor: () => null,
            closeOnEscape: () => this.closeOnEscape(),
            closeOnOutsideClick: () => false,
            dismiss: () => this.requestClose(),
        };
    }
    set dialogRef(ref) {
        const el = ref?.nativeElement ?? null;
        if (el === this.dialogEl)
            return;
        if (this.dialogEl)
            this.teardown();
        this.dialogEl = el;
        if (el)
            this.present(el);
    }
    ngOnChanges(changes) {
        // Remember the focus before the dialog renders and takes it.
        if (changes['open'] && this.open() && !this.dialogEl) {
            const active = document.activeElement;
            this.returnFocus = active instanceof HTMLElement && active !== document.body ? active : null;
        }
    }
    ngOnDestroy() {
        if (this.dialogEl)
            this.teardown();
    }
    /** Requests closing, as the ✕ button does. */
    close() {
        this.requestClose();
    }
    onKeydown(event) {
        if (this.dialogEl)
            trapTab(event, this.dialogEl);
    }
    /** Escape: the browser's close request. Always prevented; the parent decides. */
    onCancel(event) {
        event.preventDefault();
        if (!this.closeOnEscape() || this.stack.escapeConsumed() || !this.stack.isTop(this.entry)) {
            return;
        }
        this.requestClose();
    }
    /** The browser closed it anyway (e.g. a forced close request). */
    onNativeClose() {
        if (this.open() && this.dialogEl && !this.dialogEl.open)
            this.requestClose();
    }
    onPointerDown(event) {
        this.pressedOnBackdrop = this.isBackdropEvent(event);
    }
    onClick(event) {
        const onBackdrop = this.pressedOnBackdrop && this.isBackdropEvent(event);
        this.pressedOnBackdrop = false;
        if (onBackdrop && this.closeOnBackdrop() && this.stack.isTop(this.entry))
            this.requestClose();
    }
    requestClose() {
        this.closed.emit();
        this.openChange.emit(false);
    }
    /**
     * A press on the `::backdrop`: it targets the dialog, outside its box. In
     * `bare` mode the dialog is the transparent layer around the content, so
     * any press on the dialog element itself is one.
     */
    isBackdropEvent(event) {
        const el = this.dialogEl;
        if (!el || event.target !== el)
            return false;
        if (this.bare())
            return true;
        const r = el.getBoundingClientRect();
        return (event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom);
    }
    present(el) {
        this.stack.open(this.entry);
        this.stack.lockScroll();
        this.locked = true;
        try {
            if (!el.open)
                el.showModal();
        }
        catch {
            // Not connected (yet): show it non-modally rather than not at all.
            el.setAttribute('open', '');
        }
        this.stack.raiseTopLayer();
        this.focusInitial(el);
        this.opened.emit();
    }
    focusInitial(el) {
        const auto = el.querySelector('[autofocus]');
        if (auto && focusSafely(auto))
            return;
        const parts = el.querySelectorAll('.ath-dialog__bare, .ath-dialog__body, .ath-dialog__footer');
        for (const part of Array.from(parts)) {
            const first = tabbables(part)[0];
            if (first && focusSafely(first))
                return;
        }
        if (!focusSafely(tabbables(el)[0]))
            focusSafely(el);
    }
    teardown() {
        const el = this.dialogEl;
        this.dialogEl = null;
        this.stack.close(this.entry);
        if (this.locked)
            this.stack.unlockScroll();
        this.locked = false;
        try {
            if (el?.open)
                el.close();
        }
        catch {
            // Already removed.
        }
        const back = this.returnFocus;
        this.returnFocus = null;
        focusSafely(back);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDialogComponent, isStandalone: true, selector: "ath-dialog", inputs: { open: { classPropertyName: "open", publicName: "open", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, closeOnBackdrop: { classPropertyName: "closeOnBackdrop", publicName: "closeOnBackdrop", isSignal: true, isRequired: false, transformFunction: null }, closeOnEscape: { classPropertyName: "closeOnEscape", publicName: "closeOnEscape", isSignal: true, isRequired: false, transformFunction: null }, showClose: { classPropertyName: "showClose", publicName: "showClose", isSignal: true, isRequired: false, transformFunction: null }, closeLabel: { classPropertyName: "closeLabel", publicName: "closeLabel", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "ariaLabel", isSignal: true, isRequired: false, transformFunction: null }, role: { classPropertyName: "role", publicName: "role", isSignal: true, isRequired: false, transformFunction: null }, bare: { classPropertyName: "bare", publicName: "bare", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closed: "closed", openChange: "openChange", opened: "opened" }, host: { listeners: { "pointerdown": "onPointerDown($event)", "click": "onClick($event)" } }, viewQueries: [{ propertyName: "dialogRef", first: true, predicate: ["dialog"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<!-- One default slot, shown in the body or, when bare, on its own. -->\n<ng-template #content><ng-content /></ng-template>\n\n@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"bare() ? 'ath-dialog--bare' : 'ath-dialog--' + size()\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() && !bare() ? titleId : null\"\n    [attr.aria-label]=\"title() && !bare() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() && !bare() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    @if (bare()) {\n      <div class=\"ath-dialog__bare\">\n        <ng-container [ngTemplateOutlet]=\"content\" />\n      </div>\n    } @else {\n      <div class=\"ath-dialog__surface\">\n        <header class=\"ath-dialog__header\">\n          <div class=\"ath-dialog__header-text\">\n            @if (title()) {\n              <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n            }\n            @if (description()) {\n              <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n            }\n            <ng-content select=\"[slot=header],[athDialogHeader]\" />\n          </div>\n          @if (showClose()) {\n            <button\n              class=\"ath-dialog__close\"\n              type=\"button\"\n              [attr.aria-label]=\"closeText()\"\n              (click)=\"close()\"\n            >\n              <lucide-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n            </button>\n          }\n        </header>\n\n        <div class=\"ath-dialog__body\">\n          <ng-container [ngTemplateOutlet]=\"content\" />\n        </div>\n\n        <footer class=\"ath-dialog__footer\">\n          <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n        </footer>\n      </div>\n    }\n  </dialog>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog--bare{width:100%;height:100%;max-width:none;max-height:none;margin:0;overflow:hidden;background:transparent;border:0;border-radius:0;box-shadow:none}.ath-dialog--bare[open]{display:block;animation:none}.ath-dialog__bare{display:contents}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }, { kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-dialog', standalone: true, imports: [LucideAngularModule, NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '(pointerdown)': 'onPointerDown($event)',
                        '(click)': 'onClick($event)',
                    }, template: "<!-- One default slot, shown in the body or, when bare, on its own. -->\n<ng-template #content><ng-content /></ng-template>\n\n@if (open()) {\n  <dialog\n    #dialog\n    class=\"ath-dialog\"\n    tabindex=\"-1\"\n    [class]=\"bare() ? 'ath-dialog--bare' : 'ath-dialog--' + size()\"\n    [attr.role]=\"role() === 'alertdialog' ? 'alertdialog' : null\"\n    [attr.aria-labelledby]=\"title() && !bare() ? titleId : null\"\n    [attr.aria-label]=\"title() && !bare() ? null : ariaLabel()\"\n    [attr.aria-describedby]=\"description() && !bare() ? descriptionId : null\"\n    (keydown)=\"onKeydown($event)\"\n    (cancel)=\"onCancel($event)\"\n    (close)=\"onNativeClose()\"\n  >\n    @if (bare()) {\n      <div class=\"ath-dialog__bare\">\n        <ng-container [ngTemplateOutlet]=\"content\" />\n      </div>\n    } @else {\n      <div class=\"ath-dialog__surface\">\n        <header class=\"ath-dialog__header\">\n          <div class=\"ath-dialog__header-text\">\n            @if (title()) {\n              <h2 class=\"ath-dialog__title\" [id]=\"titleId\">{{ title() }}</h2>\n            }\n            @if (description()) {\n              <p class=\"ath-dialog__description\" [id]=\"descriptionId\">{{ description() }}</p>\n            }\n            <ng-content select=\"[slot=header],[athDialogHeader]\" />\n          </div>\n          @if (showClose()) {\n            <button\n              class=\"ath-dialog__close\"\n              type=\"button\"\n              [attr.aria-label]=\"closeText()\"\n              (click)=\"close()\"\n            >\n              <lucide-icon [img]=\"closeIcon\" [size]=\"18\" aria-hidden=\"true\" />\n            </button>\n          }\n        </header>\n\n        <div class=\"ath-dialog__body\">\n          <ng-container [ngTemplateOutlet]=\"content\" />\n        </div>\n\n        <footer class=\"ath-dialog__footer\">\n          <ng-content select=\"[slot=footer],[athDialogFooter]\" />\n        </footer>\n      </div>\n    }\n  </dialog>\n}\n", styles: ["@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.ath-dialog{box-sizing:border-box;width:calc(100vw - var(--space-8));max-height:calc(100dvh - var(--space-16));margin:auto;padding:0;overflow:hidden;font-family:var(--font-sans);font-style:normal;font-weight:var(--weight-normal);text-align:start;text-transform:none;white-space:normal;color:var(--fg);background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);box-shadow:var(--shadow-3)}.ath-dialog[open]{display:flex;animation:ath-dialog-in var(--t-slow)}.ath-dialog::backdrop{background:var(--scrim);animation:ath-dialog-backdrop-in var(--t-slow)}.ath-dialog:focus{outline:none}.ath-dialog--sm{max-width:400px}.ath-dialog--md{max-width:520px}.ath-dialog--lg{max-width:680px}.ath-dialog--xl{max-width:860px}.ath-dialog--full{max-width:none;height:calc(100dvh - var(--space-16))}.ath-dialog--bare{width:100%;height:100%;max-width:none;max-height:none;margin:0;overflow:hidden;background:transparent;border:0;border-radius:0;box-shadow:none}.ath-dialog--bare[open]{display:block;animation:none}.ath-dialog__bare{display:contents}.ath-dialog__surface{display:flex;flex:1;flex-direction:column;min-width:0;min-height:0}.ath-dialog__header{display:flex;flex-shrink:0;align-items:flex-start;justify-content:space-between;gap:var(--space-4);padding:var(--space-6) var(--space-6) 0}.ath-dialog__header-text{display:flex;flex:1;flex-direction:column;gap:var(--space-1);min-width:0}.ath-dialog__title{margin:0;font-size:var(--text-lg);font-weight:var(--weight-semibold);line-height:1.3;color:var(--fg)}.ath-dialog__description{margin:0;font-size:var(--text-sm);line-height:1.5;color:var(--fg-3)}.ath-dialog__close{display:flex;flex-shrink:0;align-items:center;justify-content:center;width:var(--space-8);height:var(--space-8);padding:0;color:var(--fg-3);background:none;border:0;border-radius:var(--r-sm);cursor:pointer;transition:color var(--t-fast),background-color var(--t-fast)}.ath-dialog__close:hover{color:var(--fg);background:var(--hover-strong)}.ath-dialog__close:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-dialog__body{flex:1;min-height:0;padding:var(--space-6);overflow-y:auto;overscroll-behavior:contain}.ath-dialog__footer{display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;gap:var(--space-3);padding:var(--space-4) var(--space-6);border-top:1px solid var(--border)}.ath-dialog__footer:empty{display:none}@keyframes ath-dialog-backdrop-in{0%{opacity:0}}@keyframes ath-dialog-in{0%{opacity:0;transform:scale(.96) translateY(8px)}}\n"] }]
        }], propDecorators: { dialogRef: [{
                type: ViewChild,
                args: ['dialog']
            }] } });

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
            case 'success':
                return this.successIcon;
            case 'error':
                return this.errorIcon;
            case 'warning':
                return this.warningIcon;
            case 'info':
                return this.infoIcon;
        }
    }
    dismiss(id) {
        this.toastService.remove(id);
    }
    runAction(id) {
        this.toastService.runAction(id);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastContainerComponent, deps: [{ token: i1$2.AthToastService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthToastContainerComponent, isStandalone: true, selector: "ath-toast-container", ngImport: i0, template: "<!-- data-ath-top-layer: kept above modal dialogs (AthOverlayStack.raiseTopLayer). -->\n<div class=\"ath-toast-container\" aria-live=\"polite\" data-ath-top-layer>\n  @for (toast of toasts; track toast.id) {\n    <div class=\"ath-toast\" [class]=\"'ath-toast ath-toast--' + toast.variant\">\n      <lucide-icon [img]=\"getIcon(toast.variant)\" [size]=\"18\" class=\"ath-toast__icon\" />\n      <span class=\"ath-toast__message\">{{ toast.message }}</span>\n      @if (toast.action; as action) {\n        <button type=\"button\" class=\"ath-toast__action\" (click)=\"runAction(toast.id)\">\n          {{ action.label }}\n        </button>\n      }\n      <button\n        type=\"button\"\n        class=\"ath-toast__close\"\n        [attr.aria-label]=\"'Dismiss notification: ' + toast.message\"\n        (click)=\"dismiss(toast.id)\"\n      >\n        <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n      </button>\n    </div>\n  }\n</div>\n", styles: [".ath-toast-container{position:fixed;top:var(--toast-offset-top);bottom:var(--toast-offset-bottom);right:var(--toast-offset-right);z-index:var(--z-toast);display:flex;flex-direction:column;gap:var(--ath-space-2);max-width:420px;width:100%;pointer-events:none}.ath-toast{display:flex;align-items:flex-start;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg);pointer-events:auto;animation:ath-toast-in .2s ease}.ath-toast--success{border-left:3px solid var(--ath-color-success)}.ath-toast--success .ath-toast__icon{color:var(--ath-color-success)}.ath-toast--error{border-left:3px solid var(--ath-color-error)}.ath-toast--error .ath-toast__icon{color:var(--ath-color-error)}.ath-toast--warning{border-left:3px solid var(--ath-color-warning)}.ath-toast--warning .ath-toast__icon{color:var(--ath-color-warning)}.ath-toast--info{border-left:3px solid var(--ath-color-info)}.ath-toast--info .ath-toast__icon{color:var(--ath-color-info)}.ath-toast__icon{flex-shrink:0;margin-top:1px}.ath-toast__message{flex:1;font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);line-height:var(--ath-line-height-normal)}.ath-toast__action{flex-shrink:0;align-self:center;padding:2px 6px;margin:-2px 0;background:none;border:none;border-radius:var(--r-xs);color:var(--fg);font-family:inherit;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-semibold);cursor:pointer}.ath-toast__action:hover{text-decoration:underline;text-underline-offset:2px}.ath-toast__action:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-toast__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast)}.ath-toast__close:hover{color:var(--ath-text-primary)}@keyframes ath-toast-in{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthToastContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-toast-container', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- data-ath-top-layer: kept above modal dialogs (AthOverlayStack.raiseTopLayer). -->\n<div class=\"ath-toast-container\" aria-live=\"polite\" data-ath-top-layer>\n  @for (toast of toasts; track toast.id) {\n    <div class=\"ath-toast\" [class]=\"'ath-toast ath-toast--' + toast.variant\">\n      <lucide-icon [img]=\"getIcon(toast.variant)\" [size]=\"18\" class=\"ath-toast__icon\" />\n      <span class=\"ath-toast__message\">{{ toast.message }}</span>\n      @if (toast.action; as action) {\n        <button type=\"button\" class=\"ath-toast__action\" (click)=\"runAction(toast.id)\">\n          {{ action.label }}\n        </button>\n      }\n      <button\n        type=\"button\"\n        class=\"ath-toast__close\"\n        [attr.aria-label]=\"'Dismiss notification: ' + toast.message\"\n        (click)=\"dismiss(toast.id)\"\n      >\n        <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n      </button>\n    </div>\n  }\n</div>\n", styles: [".ath-toast-container{position:fixed;top:var(--toast-offset-top);bottom:var(--toast-offset-bottom);right:var(--toast-offset-right);z-index:var(--z-toast);display:flex;flex-direction:column;gap:var(--ath-space-2);max-width:420px;width:100%;pointer-events:none}.ath-toast{display:flex;align-items:flex-start;gap:var(--ath-space-3);padding:var(--ath-space-3) var(--ath-space-4);background-color:var(--ath-bg-elevated);border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-md);box-shadow:var(--ath-shadow-lg);pointer-events:auto;animation:ath-toast-in .2s ease}.ath-toast--success{border-left:3px solid var(--ath-color-success)}.ath-toast--success .ath-toast__icon{color:var(--ath-color-success)}.ath-toast--error{border-left:3px solid var(--ath-color-error)}.ath-toast--error .ath-toast__icon{color:var(--ath-color-error)}.ath-toast--warning{border-left:3px solid var(--ath-color-warning)}.ath-toast--warning .ath-toast__icon{color:var(--ath-color-warning)}.ath-toast--info{border-left:3px solid var(--ath-color-info)}.ath-toast--info .ath-toast__icon{color:var(--ath-color-info)}.ath-toast__icon{flex-shrink:0;margin-top:1px}.ath-toast__message{flex:1;font-size:var(--ath-font-size-sm);color:var(--ath-text-primary);line-height:var(--ath-line-height-normal)}.ath-toast__action{flex-shrink:0;align-self:center;padding:2px 6px;margin:-2px 0;background:none;border:none;border-radius:var(--r-xs);color:var(--fg);font-family:inherit;font-size:var(--ath-font-size-sm);font-weight:var(--ath-font-weight-semibold);cursor:pointer}.ath-toast__action:hover{text-decoration:underline;text-underline-offset:2px}.ath-toast__action:focus-visible{outline:none;box-shadow:var(--focus-ring-shadow)}.ath-toast__close{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;color:var(--ath-text-tertiary);background:none;border:none;border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:color var(--ath-transition-fast)}.ath-toast__close:hover{color:var(--ath-text-primary)}@keyframes ath-toast-in{0%{opacity:0;transform:translate(20px)}to{opacity:1;transform:translate(0)}}\n"] }]
        }], ctorParameters: () => [{ type: i1$2.AthToastService }] });

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
        this.labels = injectAthLabels();
        /** Spinner size */
        this.size = 'md';
    }
    get spinnerClasses() {
        return `ath-spinner ath-spinner--${this.size}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthSpinnerComponent, isStandalone: true, selector: "ath-spinner", inputs: { size: "size" }, ngImport: i0, template: "<div [class]=\"spinnerClasses\" role=\"status\" [attr.aria-label]=\"labels.loading()\">\n  <svg viewBox=\"0 0 24 24\" fill=\"none\" class=\"ath-spinner__svg\">\n    <circle\n      cx=\"12\"\n      cy=\"12\"\n      r=\"10\"\n      stroke=\"currentColor\"\n      stroke-width=\"3\"\n      class=\"ath-spinner__track\"\n    />\n    <path\n      d=\"M12 2a10 10 0 0 1 10 10\"\n      stroke=\"currentColor\"\n      stroke-width=\"3\"\n      stroke-linecap=\"round\"\n      class=\"ath-spinner__arc\"\n    />\n  </svg>\n</div>\n", styles: [".ath-spinner{display:inline-flex;align-items:center;justify-content:center;color:var(--ath-color-primary)}.ath-spinner--sm{width:16px;height:16px}.ath-spinner--md{width:24px;height:24px}.ath-spinner--lg{width:36px;height:36px}.ath-spinner__svg{width:100%;height:100%;animation:ath-spinner-rotate 1s linear infinite}.ath-spinner__track{opacity:.15}.ath-spinner__arc{opacity:1}@keyframes ath-spinner-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-spinner', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"spinnerClasses\" role=\"status\" [attr.aria-label]=\"labels.loading()\">\n  <svg viewBox=\"0 0 24 24\" fill=\"none\" class=\"ath-spinner__svg\">\n    <circle\n      cx=\"12\"\n      cy=\"12\"\n      r=\"10\"\n      stroke=\"currentColor\"\n      stroke-width=\"3\"\n      class=\"ath-spinner__track\"\n    />\n    <path\n      d=\"M12 2a10 10 0 0 1 10 10\"\n      stroke=\"currentColor\"\n      stroke-width=\"3\"\n      stroke-linecap=\"round\"\n      class=\"ath-spinner__arc\"\n    />\n  </svg>\n</div>\n", styles: [".ath-spinner{display:inline-flex;align-items:center;justify-content:center;color:var(--ath-color-primary)}.ath-spinner--sm{width:16px;height:16px}.ath-spinner--md{width:24px;height:24px}.ath-spinner--lg{width:36px;height:36px}.ath-spinner__svg{width:100%;height:100%;animation:ath-spinner-rotate 1s linear infinite}.ath-spinner__track{opacity:.15}.ath-spinner__arc{opacity:1}@keyframes ath-spinner-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }] } });

/**
 * Athene Skeleton
 *
 * A loading placeholder shaped like the content it stands in for, so the
 * page does not jump when the data arrives. Pulses gently; still under
 * `prefers-reduced-motion`.
 *
 * @example
 * <ath-skeleton variant="line" width="60%" />
 * <ath-skeleton variant="row" />
 * <ath-skeleton variant="circular" width="22px" height="22px" />
 */
class AthSkeletonComponent {
    constructor() {
        this.variant = input('text');
        /** Width (CSS value). */
        this.width = input('100%');
        /** Height (CSS value); the variant's own height when empty. */
        this.height = input('');
        /** Pulse; off is also forced by `prefers-reduced-motion`. */
        this.animated = input(true);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthSkeletonComponent, isStandalone: true, selector: "ath-skeleton", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, width: { classPropertyName: "width", publicName: "width", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null }, animated: { classPropertyName: "animated", publicName: "animated", isSignal: true, isRequired: false, transformFunction: null } }, host: { attributes: { "aria-hidden": "true" }, properties: { "attr.data-variant": "variant()", "class.ath-skeleton--animated": "animated()", "style.width": "width()", "style.height": "height() || null" }, classAttribute: "ath-skeleton" }, ngImport: i0, template: '', isInline: true, styles: [":host{display:block;background:var(--bg-2);border-radius:var(--r-xs)}:host([data-variant=line]){height:.8em;margin-block:.35em}:host([data-variant=text]){height:1em}:host([data-variant=row]){height:var(--row-h);border-radius:0;border-bottom:1px solid var(--border)}:host([data-variant=card]){height:64px;border-radius:var(--r)}:host([data-variant=circular]){border-radius:var(--r-full)}:host([data-variant=rectangular]){border-radius:var(--r)}:host(.ath-skeleton--animated){animation:ath-skeleton-pulse 1.6s ease-in-out infinite}@keyframes ath-skeleton-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media (prefers-reduced-motion: reduce){:host(.ath-skeleton--animated){animation:none;opacity:.65}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-skeleton', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'aria-hidden': 'true',
                        class: 'ath-skeleton',
                        '[attr.data-variant]': 'variant()',
                        '[class.ath-skeleton--animated]': 'animated()',
                        '[style.width]': 'width()',
                        '[style.height]': 'height() || null',
                    }, template: '', styles: [":host{display:block;background:var(--bg-2);border-radius:var(--r-xs)}:host([data-variant=line]){height:.8em;margin-block:.35em}:host([data-variant=text]){height:1em}:host([data-variant=row]){height:var(--row-h);border-radius:0;border-bottom:1px solid var(--border)}:host([data-variant=card]){height:64px;border-radius:var(--r)}:host([data-variant=circular]){border-radius:var(--r-full)}:host([data-variant=rectangular]){border-radius:var(--r)}:host(.ath-skeleton--animated){animation:ath-skeleton-pulse 1.6s ease-in-out infinite}@keyframes ath-skeleton-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media (prefers-reduced-motion: reduce){:host(.ath-skeleton--animated){animation:none;opacity:.65}}\n"] }]
        }] });
/**
 * A list's or grid's loading state: `count` placeholders the size of real
 * rows (`--row-h`), cards (64px) or grid cards (168px), in a panel-like
 * frame. Announced once as "Loading" to assistive tech.
 *
 * @example
 * <ath-skeleton-list variant="row" [count]="8" />
 * <ath-skeleton-list variant="card-grid" [count]="6" />
 */
class AthSkeletonListComponent {
    constructor() {
        this.labels = injectAthLabels();
        this.variant = input('row');
        this.count = input(6);
        /** Accessible text; default `ATH_LABELS.loading`. */
        this.label = input(null);
        this.indexes = computed(() => Array.from({ length: Math.max(1, Math.floor(this.count() || 0)) }, (_, i) => i));
        this.loadingLabel = computed(() => this.label() ?? this.labels.loading());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthSkeletonListComponent, isStandalone: true, selector: "ath-skeleton-list", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, count: { classPropertyName: "count", publicName: "count", isSignal: true, isRequired: false, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: `
    <div class="ath-skeleton-list" [attr.data-variant]="variant()" role="status">
      <span class="ath-skeleton-list__sr">{{ loadingLabel() }}</span>
      @for (i of indexes(); track i) {
        <div class="ath-skeleton-list__cell" aria-hidden="true"></div>
      }
    </div>
  `, isInline: true, styles: [":host{display:block}.ath-skeleton-list{overflow:hidden;border:1px solid var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-skeleton-list__cell{background:var(--bg-2);animation:ath-skeleton-list-pulse 1.6s ease-in-out infinite}.ath-skeleton-list[data-variant=row]{display:flex;flex-direction:column}.ath-skeleton-list[data-variant=row] .ath-skeleton-list__cell{height:var(--row-h);border-bottom:1px solid var(--border)}.ath-skeleton-list[data-variant=row] .ath-skeleton-list__cell:last-child{border-bottom:none}.ath-skeleton-list[data-variant=card]{display:flex;flex-direction:column;gap:var(--space-2);padding:10px}.ath-skeleton-list[data-variant=card] .ath-skeleton-list__cell{height:64px;border-radius:var(--r)}.ath-skeleton-list[data-variant=card-grid]{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:var(--space-3);padding:var(--space-3);border:none;background:transparent}.ath-skeleton-list[data-variant=card-grid] .ath-skeleton-list__cell{height:168px;border:1px solid var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-skeleton-list__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}@keyframes ath-skeleton-list-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media (prefers-reduced-motion: reduce){.ath-skeleton-list__cell{animation:none;opacity:.65}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthSkeletonListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-skeleton-list', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: `
    <div class="ath-skeleton-list" [attr.data-variant]="variant()" role="status">
      <span class="ath-skeleton-list__sr">{{ loadingLabel() }}</span>
      @for (i of indexes(); track i) {
        <div class="ath-skeleton-list__cell" aria-hidden="true"></div>
      }
    </div>
  `, styles: [":host{display:block}.ath-skeleton-list{overflow:hidden;border:1px solid var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-skeleton-list__cell{background:var(--bg-2);animation:ath-skeleton-list-pulse 1.6s ease-in-out infinite}.ath-skeleton-list[data-variant=row]{display:flex;flex-direction:column}.ath-skeleton-list[data-variant=row] .ath-skeleton-list__cell{height:var(--row-h);border-bottom:1px solid var(--border)}.ath-skeleton-list[data-variant=row] .ath-skeleton-list__cell:last-child{border-bottom:none}.ath-skeleton-list[data-variant=card]{display:flex;flex-direction:column;gap:var(--space-2);padding:10px}.ath-skeleton-list[data-variant=card] .ath-skeleton-list__cell{height:64px;border-radius:var(--r)}.ath-skeleton-list[data-variant=card-grid]{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:var(--space-3);padding:var(--space-3);border:none;background:transparent}.ath-skeleton-list[data-variant=card-grid] .ath-skeleton-list__cell{height:168px;border:1px solid var(--border);border-radius:var(--r-lg);background:var(--surface)}.ath-skeleton-list__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}@keyframes ath-skeleton-list-pulse{0%,to{opacity:.45}50%{opacity:.85}}@media (prefers-reduced-motion: reduce){.ath-skeleton-list__cell{animation:none;opacity:.65}}\n"] }]
        }] });
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
        this.labels = injectAthLabels();
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
            case 'warning':
                return AlertTriangle;
            case 'danger':
                return AlertOctagon;
            case 'success':
                return CheckCircle2;
            case 'info':
            default:
                return Info;
        }
    }
    onDismiss() {
        this.dismissed.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBannerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthBannerComponent, isStandalone: true, selector: "ath-banner", inputs: { tone: "tone", title: "title", dismissible: "dismissible" }, outputs: { dismissed: "dismissed" }, host: { properties: { "attr.data-tone": "this.hostTone", "attr.role": "this.hostRole" } }, ngImport: i0, template: "<span class=\"ath-banner__icon\" aria-hidden=\"true\">\n  <lucide-icon [img]=\"icon\" [size]=\"16\" />\n</span>\n<div class=\"ath-banner__body\">\n  @if (title) {\n    <strong class=\"ath-banner__title\">{{ title }}</strong>\n  }\n  <span class=\"ath-banner__message\"><ng-content /></span>\n</div>\n<div class=\"ath-banner__actions\">\n  <ng-content select=\"[banner-action]\" />\n  @if (dismissible) {\n    <button\n      type=\"button\"\n      class=\"ath-banner__close\"\n      [attr.aria-label]=\"labels.dismiss()\"\n      (click)=\"onDismiss()\"\n    >\n      <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n    </button>\n  }\n</div>\n", styles: [":host{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-top:1px solid transparent;border-bottom:1px solid transparent;font-family:var(--font-sans);font-size:13px;line-height:1.5}.ath-banner__icon{flex-shrink:0;display:inline-flex;align-items:center;margin-top:1px}.ath-banner__body{flex:1;min-width:0}.ath-banner__title{display:inline;margin-right:6px;font-weight:600;letter-spacing:-.005em}.ath-banner__message{display:inline;color:inherit}.ath-banner__actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.ath-banner__close{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;background:transparent;border:0;border-radius:var(--r-sm);color:inherit;opacity:.7;cursor:pointer;transition:opacity var(--t-fast),background var(--t-fast)}.ath-banner__close:hover{opacity:1;background:var(--hover-strong)}:host([data-tone=info]){background:var(--blue-tint);color:var(--blue);border-color:var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent)}:host([data-tone=info]) .ath-banner__title{color:var(--fg)}:host([data-tone=info]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=warning]){background:var(--amber-tint);color:var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent)}:host([data-tone=warning]) .ath-banner__title{color:var(--fg)}:host([data-tone=warning]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=danger]){background:var(--red-tint);color:var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent)}:host([data-tone=danger]) .ath-banner__title{color:var(--fg)}:host([data-tone=danger]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=success]){background:var(--green-tint);color:var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-tone=success]) .ath-banner__title{color:var(--fg)}:host([data-tone=success]) .ath-banner__message{color:var(--fg-2)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthBannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-banner', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"ath-banner__icon\" aria-hidden=\"true\">\n  <lucide-icon [img]=\"icon\" [size]=\"16\" />\n</span>\n<div class=\"ath-banner__body\">\n  @if (title) {\n    <strong class=\"ath-banner__title\">{{ title }}</strong>\n  }\n  <span class=\"ath-banner__message\"><ng-content /></span>\n</div>\n<div class=\"ath-banner__actions\">\n  <ng-content select=\"[banner-action]\" />\n  @if (dismissible) {\n    <button\n      type=\"button\"\n      class=\"ath-banner__close\"\n      [attr.aria-label]=\"labels.dismiss()\"\n      (click)=\"onDismiss()\"\n    >\n      <lucide-icon [img]=\"closeIcon\" [size]=\"14\" />\n    </button>\n  }\n</div>\n", styles: [":host{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-top:1px solid transparent;border-bottom:1px solid transparent;font-family:var(--font-sans);font-size:13px;line-height:1.5}.ath-banner__icon{flex-shrink:0;display:inline-flex;align-items:center;margin-top:1px}.ath-banner__body{flex:1;min-width:0}.ath-banner__title{display:inline;margin-right:6px;font-weight:600;letter-spacing:-.005em}.ath-banner__message{display:inline;color:inherit}.ath-banner__actions{display:flex;align-items:center;gap:8px;flex-shrink:0}.ath-banner__close{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;padding:0;background:transparent;border:0;border-radius:var(--r-sm);color:inherit;opacity:.7;cursor:pointer;transition:opacity var(--t-fast),background var(--t-fast)}.ath-banner__close:hover{opacity:1;background:var(--hover-strong)}:host([data-tone=info]){background:var(--blue-tint);color:var(--blue);border-color:var(--blue);border-color:color-mix(in srgb,var(--blue) 30%,transparent)}:host([data-tone=info]) .ath-banner__title{color:var(--fg)}:host([data-tone=info]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=warning]){background:var(--amber-tint);color:var(--amber);border-color:color-mix(in srgb,var(--amber) 30%,transparent)}:host([data-tone=warning]) .ath-banner__title{color:var(--fg)}:host([data-tone=warning]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=danger]){background:var(--red-tint);color:var(--red);border-color:color-mix(in srgb,var(--red) 30%,transparent)}:host([data-tone=danger]) .ath-banner__title{color:var(--fg)}:host([data-tone=danger]) .ath-banner__message{color:var(--fg-2)}:host([data-tone=success]){background:var(--green-tint);color:var(--green);border-color:color-mix(in srgb,var(--green) 30%,transparent)}:host([data-tone=success]) .ath-banner__title{color:var(--fg)}:host([data-tone=success]) .ath-banner__message{color:var(--fg-2)}\n"] }]
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
 * <ath-kbd label="⌘K" size="sm" />
 */
class AthKbdComponent {
    constructor() {
        /** Size variant */
        this.size = 'md';
        /**
         * Keys as text, for a self-closing tag. Callers wrote `label="⌘K"`
         * before this input existed, which rendered an empty chip.
         */
        this.label = '';
    }
    get kbdClasses() {
        return `ath-kbd ath-kbd--${this.size}`;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthKbdComponent, isStandalone: true, selector: "ath-kbd", inputs: { size: "size", label: "label" }, ngImport: i0, template: "<kbd [class]=\"kbdClasses\">\n  @if (label) {\n    {{ label }}\n  }\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;gap:1px;min-width:1.5em;font-family:var(--font-mono);font-weight:var(--weight-medium);line-height:1;color:var(--fg-2);background-color:var(--surface);border:1px solid var(--border);border-radius:var(--r-xs);box-shadow:0 1px 0 var(--border);white-space:nowrap}.ath-kbd--sm{font-size:10.5px;height:18px;padding:0 5px}.ath-kbd--md{font-size:var(--text-xs);height:20px;padding:0 6px}.ath-kbd--lg{font-size:var(--text-sm);height:24px;padding:0 var(--space-2)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthKbdComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-kbd', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<kbd [class]=\"kbdClasses\">\n  @if (label) {\n    {{ label }}\n  }\n  <ng-content />\n</kbd>\n", styles: [".ath-kbd{display:inline-flex;align-items:center;justify-content:center;gap:1px;min-width:1.5em;font-family:var(--font-mono);font-weight:var(--weight-medium);line-height:1;color:var(--fg-2);background-color:var(--surface);border:1px solid var(--border);border-radius:var(--r-xs);box-shadow:0 1px 0 var(--border);white-space:nowrap}.ath-kbd--sm{font-size:10.5px;height:18px;padding:0 5px}.ath-kbd--md{font-size:var(--text-xs);height:20px;padding:0 6px}.ath-kbd--lg{font-size:var(--text-sm);height:24px;padding:0 var(--space-2)}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], label: [{
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
        this.labels = injectAthLabels();
        /** Value to copy to clipboard */
        this.value = '';
        /** Optional tooltip/label */
        this.label = null;
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: AthCopyButtonComponent, isStandalone: true, selector: "ath-copy-button", inputs: { value: "value", label: "label" }, ngImport: i0, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied\"\n  [attr.aria-label]=\"copied ? labels.copied() : (label ?? labels.copy())\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:all var(--ath-transition-fast)}.ath-copy-button:hover{color:var(--ath-text-primary);border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-copy-button--copied{color:var(--ath-color-success);border-color:var(--ath-color-success)}.ath-copy-button--copied:hover{color:var(--ath-color-success)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthCopyButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-copy-button', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  class=\"ath-copy-button\"\n  [class.ath-copy-button--copied]=\"copied\"\n  [attr.aria-label]=\"copied ? labels.copied() : (label ?? labels.copy())\"\n  (click)=\"copy()\"\n>\n  <lucide-icon [img]=\"copied ? checkIcon : copyIcon\" [size]=\"16\" />\n</button>\n", styles: [".ath-copy-button{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;padding:0;color:var(--ath-text-tertiary);background:none;border:1px solid var(--ath-border-color);border-radius:var(--ath-border-radius-sm);cursor:pointer;transition:all var(--ath-transition-fast)}.ath-copy-button:hover{color:var(--ath-text-primary);border-color:var(--ath-border-color-hover);background-color:var(--ath-bg-tertiary)}.ath-copy-button:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-border-color-focus)}.ath-copy-button--copied{color:var(--ath-color-success);border-color:var(--ath-color-success)}.ath-copy-button--copied:hover{color:var(--ath-color-success)}\n"] }]
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
        return this._seconds() >= 24 * 3600 ? 'alert' : this._seconds() >= 8 * 3600 ? 'warn' : null;
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthTimerPillComponent, isStandalone: true, selector: "ath-timer-pill", inputs: { active: "active", seconds: "seconds", ticketKey: "ticketKey", tooltip: "tooltip" }, outputs: { toggled: "toggled" }, host: { properties: { "attr.data-active": "this.hostActive", "attr.data-warning": "this.hostWarning" } }, ngImport: i0, template: "<button type=\"button\" class=\"ath-tpill\" [title]=\"effectiveTooltip\" (click)=\"onToggle()\">\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">\u00B7</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey }}</span>\n  }\n</button>\n", styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-mono);font-feature-settings:\"tnum\";cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:6px;height:6px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-size:12px;font-weight:400;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-size:11.5px;font-weight:400;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill__dot{background:var(--red);animation:ath-tpill-rec 2s ease-in-out infinite}@media (prefers-reduced-motion: reduce){:host([data-active=true]) .ath-tpill__dot{animation:none}}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-rec{0%,to{opacity:1}50%{opacity:.35}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthTimerPillComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-timer-pill', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button type=\"button\" class=\"ath-tpill\" [title]=\"effectiveTooltip\" (click)=\"onToggle()\">\n  <span class=\"ath-tpill__dot\" aria-hidden=\"true\"></span>\n  <span class=\"ath-tpill__time\">{{ time() }}</span>\n  @if (ticketKey) {\n    <span class=\"ath-tpill__sep\" aria-hidden=\"true\">\u00B7</span>\n    <span class=\"ath-tpill__key\">{{ ticketKey }}</span>\n  }\n</button>\n", styles: [":host{display:inline-block}.ath-tpill{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-mono);font-feature-settings:\"tnum\";cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast);color:var(--fg-2);font-size:12px;font-weight:500;letter-spacing:0}.ath-tpill:hover{background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-tpill:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-tpill__dot{width:6px;height:6px;border-radius:999px;background:var(--fg-4);flex-shrink:0}.ath-tpill__time{font-size:12px;font-weight:400;color:var(--fg);letter-spacing:0}.ath-tpill__sep{color:var(--fg-4);margin:0 -1px}.ath-tpill__key{font-size:11.5px;font-weight:400;color:var(--fg-3);letter-spacing:0}:host([data-active=true]) .ath-tpill__dot{background:var(--red);animation:ath-tpill-rec 2s ease-in-out infinite}@media (prefers-reduced-motion: reduce){:host([data-active=true]) .ath-tpill__dot{animation:none}}:host([data-warning=warn]) .ath-tpill{background:var(--amber-tint);border-color:color-mix(in srgb,var(--amber) 30%,transparent);color:var(--fg)}:host([data-warning=warn]) .ath-tpill__dot{background:var(--amber)}:host([data-warning=alert]) .ath-tpill{background:var(--red-tint);border-color:color-mix(in srgb,var(--red) 35%,transparent);color:var(--fg);animation:ath-tpill-alert 1.2s ease-in-out infinite}:host([data-warning=alert]) .ath-tpill__dot{background:var(--red)}@keyframes ath-tpill-rec{0%,to{opacity:1}50%{opacity:.35}}@keyframes ath-tpill-alert{0%,to{transform:scale(1)}50%{transform:scale(1.02)}}\n"] }]
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
        this.labels = injectAthLabels();
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
    pageLabel(page) {
        return formatAthLabel(this.labels.pageNumber(), { page });
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPaginationComponent, isStandalone: true, selector: "ath-pagination", inputs: { mode: "mode", page: "page", totalPages: "totalPages", siblingCount: "siblingCount", hasPrev: "hasPrev", hasNext: "hasNext", summary: "summary" }, outputs: { pageChange: "pageChange", previous: "previous", next: "next" }, ngImport: i0, template: "@if (mode === 'numbered') {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"labels.pageFirst()\"\n    (click)=\"goFirst()\"\n  >\n    <lucide-icon [img]=\"firstIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"labels.pagePrevious()\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n  </button>\n\n  @for (item of pages(); track $index) {\n    @if (item === 'ellipsis') {\n      <span class=\"ath-page__ellipsis\" aria-hidden=\"true\">\n        <lucide-icon [img]=\"ellipsisIcon\" [size]=\"12\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        class=\"ath-page__btn\"\n        [class.ath-page__btn--active]=\"item === page\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"pageLabel(item)\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"labels.pageNext()\"\n    (click)=\"goNext()\"\n  >\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"labels.pageLast()\"\n    (click)=\"goLast()\"\n  >\n    <lucide-icon [img]=\"lastIcon\" [size]=\"14\" />\n  </button>\n} @else {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasPrev\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n    <span>{{ labels.previous() }}</span>\n  </button>\n  @if (summary) {\n    <span class=\"ath-page__summary\">{{ summary }}</span>\n  }\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasNext\"\n    (click)=\"goNext()\"\n  >\n    <span>{{ labels.next() }}</span>\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans)}.ath-page__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:28px;height:28px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;font-feature-settings:\"tnum\";color:var(--fg-2);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast)}.ath-page__btn:hover:not(:disabled):not(.ath-page__btn--active){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-page__btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-page__btn:disabled{opacity:.4;cursor:not-allowed}.ath-page__btn--nav{padding:0;width:28px;color:var(--fg-3)}.ath-page__btn--cursor{padding:0 10px}.ath-page__btn--active{background:var(--action-primary-bg);border-color:var(--action-primary-bg);color:var(--action-primary-fg);cursor:default}.ath-page__ellipsis{display:inline-flex;align-items:center;justify-content:center;width:20px;color:var(--fg-4)}.ath-page__summary{margin:0 8px;font-size:12px;color:var(--fg-3);font-feature-settings:\"tnum\"}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-pagination', standalone: true, imports: [CommonModule, LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (mode === 'numbered') {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"labels.pageFirst()\"\n    (click)=\"goFirst()\"\n  >\n    <lucide-icon [img]=\"firstIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page <= 1\"\n    [attr.aria-label]=\"labels.pagePrevious()\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n  </button>\n\n  @for (item of pages(); track $index) {\n    @if (item === 'ellipsis') {\n      <span class=\"ath-page__ellipsis\" aria-hidden=\"true\">\n        <lucide-icon [img]=\"ellipsisIcon\" [size]=\"12\" />\n      </span>\n    } @else {\n      <button\n        type=\"button\"\n        class=\"ath-page__btn\"\n        [class.ath-page__btn--active]=\"item === page\"\n        [attr.aria-current]=\"item === page ? 'page' : null\"\n        [attr.aria-label]=\"pageLabel(item)\"\n        (click)=\"goTo(item)\"\n      >\n        {{ item }}\n      </button>\n    }\n  }\n\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"labels.pageNext()\"\n    (click)=\"goNext()\"\n  >\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--nav\"\n    [disabled]=\"page >= totalPages\"\n    [attr.aria-label]=\"labels.pageLast()\"\n    (click)=\"goLast()\"\n  >\n    <lucide-icon [img]=\"lastIcon\" [size]=\"14\" />\n  </button>\n} @else {\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasPrev\"\n    (click)=\"goPrev()\"\n  >\n    <lucide-icon [img]=\"prevIcon\" [size]=\"14\" />\n    <span>{{ labels.previous() }}</span>\n  </button>\n  @if (summary) {\n    <span class=\"ath-page__summary\">{{ summary }}</span>\n  }\n  <button\n    type=\"button\"\n    class=\"ath-page__btn ath-page__btn--cursor\"\n    [disabled]=\"!hasNext\"\n    (click)=\"goNext()\"\n  >\n    <span>{{ labels.next() }}</span>\n    <lucide-icon [img]=\"nextIcon\" [size]=\"14\" />\n  </button>\n}\n", styles: [":host{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans)}.ath-page__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-width:28px;height:28px;padding:0 8px;background:var(--bg-1);border:1px solid var(--border);border-radius:var(--r-sm);font-family:var(--font-sans);font-size:12.5px;font-weight:500;font-feature-settings:\"tnum\";color:var(--fg-2);cursor:pointer;transition:background var(--t-fast),border-color var(--t-fast),color var(--t-fast),box-shadow var(--t-fast)}.ath-page__btn:hover:not(:disabled):not(.ath-page__btn--active){background:var(--bg-2);border-color:var(--border-strong);color:var(--fg)}.ath-page__btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--accent-ring);border-color:var(--accent)}.ath-page__btn:disabled{opacity:.4;cursor:not-allowed}.ath-page__btn--nav{padding:0;width:28px;color:var(--fg-3)}.ath-page__btn--cursor{padding:0 10px}.ath-page__btn--active{background:var(--action-primary-bg);border-color:var(--action-primary-bg);color:var(--action-primary-fg);cursor:default}.ath-page__ellipsis{display:inline-flex;align-items:center;justify-content:center;width:20px;color:var(--fg-4)}.ath-page__summary{margin:0 8px;font-size:12px;color:var(--fg-3);font-feature-settings:\"tnum\"}\n"] }]
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

// The reader's date settings and their token live in the light core entry
// point, so an app provides them at its root without loading the components.
const DAY_MS = 86_400_000;
/**
 * `date` as wall-clock time in `timeZone`: a Date whose local fields read
 * what a clock in that zone shows. Only for day comparisons.
 */
function zonedWallClock(date, timeZone) {
    if (!timeZone)
        return new Date(date);
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone,
        hourCycle: 'h23',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).formatToParts(date);
    const get = (t) => Number(parts.find((p) => p.type === t)?.value ?? 0);
    return new Date(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
}
/**
 * The calendar day a due value names, as local midday; `null` when the
 * value is not a date.
 */
function calendarDayOf(value, timeZone) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
    if (!m)
        return null;
    const at = new Date(value);
    const dayOnly = value.length === 10 ||
        Number.isNaN(at.getTime()) ||
        (at.getUTCMinutes() === 0 &&
            at.getUTCSeconds() === 0 &&
            (at.getUTCHours() === 0 || at.getUTCHours() === 12));
    if (dayOnly)
        return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12);
    const wall = zonedWallClock(at, timeZone);
    return new Date(wall.getFullYear(), wall.getMonth(), wall.getDate(), 12);
}
/** Whole calendar days from `now` (in `timeZone`) to `day`; negative = past. */
function calendarDaysUntil(day, now, timeZone) {
    const today = zonedWallClock(now, timeZone);
    const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    return Math.round((midnight(day) - midnight(today)) / DAY_MS);
}
/**
 * The one colour rule: before today overdue, today today (both red), the
 * next two days soon (amber), later muted. Finished work is never urgent.
 */
function dueToneOf(days, done = false) {
    if (done)
        return 'done';
    if (days === null)
        return 'later';
    if (days < 0)
        return 'overdue';
    if (days === 0)
        return 'today';
    if (days <= 2)
        return 'soon';
    return 'later';
}
/** A calendar day in the chosen short format ("30 Oct", "30.10.", "10/30", "2026-10-30"). */
function shortDay(day, ctx = {}) {
    const y = day.getFullYear();
    const m = day.getMonth() + 1;
    const d = day.getDate();
    switch (ctx.dateFormat) {
        case 'dmy':
            return `${d}.${m}.`;
        case 'mdy':
            return `${m}/${d}`;
        case 'iso':
            return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        default:
            return day.toLocaleDateString(ctx.locale || undefined, { month: 'short', day: 'numeric' });
    }
}
function fill(template, count) {
    return template.replace(/\{count\}/g, String(count));
}
/**
 * The compact due text: "2d overdue", "Today", "Tomorrow", "3d" up to six
 * days ahead, then the short date.
 */
function compactDueText(days, day, labels, ctx = {}) {
    if (days < 0)
        return fill(labels.overdue, -days);
    if (days === 0)
        return labels.today;
    if (days === 1)
        return labels.tomorrow;
    if (days < 7)
        return fill(labels.inDays, days);
    return shortDay(day, ctx);
}
/** Everything `ath-due-label` draws, from a date; `null` without one. */
function describeDue(input, labels, ctx = {}) {
    if (!input.date)
        return null;
    const day = calendarDayOf(input.date, ctx.timeZone);
    if (!day)
        return null;
    const days = calendarDaysUntil(day, input.now ?? new Date(), ctx.timeZone);
    const done = !!input.done;
    const plain = done || input.source === 'sprint';
    const short = shortDay(day, ctx);
    return {
        tone: dueToneOf(days, done),
        text: plain ? short : compactDueText(days, day, labels, ctx),
        days,
        day: short,
    };
}

/**
 * The one way a due date is shown: text, never a pill.
 *
 * One colour rule (tokens `--due-*`): overdue and today red, the next two
 * days amber, later muted; finished work is always muted and shows its
 * plain date. Compact words: "2d overdue", "Today", "Tomorrow", "3d", then
 * the short date. A sprint-derived date reads "Sprint end · 31 Oct" with a
 * sprint icon; `afterSprintEnd` adds an amber warning.
 *
 * The app provides `ATH_DATE_CONTEXT` (locale, time zone, date format) and
 * the words through `ATH_LABELS`; resolving a ticket's effective date stays
 * in the app.
 *
 * @example
 * <ath-due-label [date]="t.due_date" [done]="closed" />
 * <ath-due-label [date]="sprint.end_date" source="sprint" [sprintName]="sprint.name" />
 * <ath-due-label [date]="t.due_date" [afterSprintEnd]="true" sprintName="Sprint 24" />
 * <ath-due-label [date]="null" placeholder="—" />
 */
class AthDueLabelComponent {
    constructor() {
        this.labels = injectAthLabels();
        this.localeId = inject(LOCALE_ID);
        this.dateContext = inject(ATH_DATE_CONTEXT, { optional: true });
        /** ISO date or timestamp; empty shows `placeholder` (or nothing). */
        this.date = input(null);
        /** Finished work: muted, never "overdue". */
        this.done = input(false);
        this.source = input('own');
        this.sprintName = input(null);
        /** The own date lies after the sprint's end: amber warning icon. */
        this.afterSprintEnd = input(false);
        /** Text without a date (e.g. "—"); default nothing. */
        this.placeholder = input(null);
        /** Narrow columns: the sprint icon only, "Sprint end" moves to the tooltip. */
        this.compact = input(false);
        /** Reference time, for stories and tests. */
        this.now = input(null);
        this.ic = { sprint: Zap, warn: AlertTriangle };
        this.ctx = computed(() => ({
            locale: this.localeId,
            ...(this.dateContext?.() ?? {}),
        }));
        this.view = computed(() => describeDue({
            date: this.date(),
            done: this.done(),
            source: this.source(),
            now: this.now() ?? undefined,
        }, {
            overdue: this.labels.dueOverdue(),
            today: this.labels.dueToday(),
            tomorrow: this.labels.dueTomorrow(),
            inDays: this.labels.dueInDays(),
        }, this.ctx()));
        this.isSprint = computed(() => this.source() === 'sprint');
        this.sprintEndText = computed(() => this.labels.dueSprintEnd());
        this.title = computed(() => {
            if (!this.isSprint())
                return null;
            const sprint = this.sprintName();
            return sprint
                ? formatAthLabel(this.labels.dueSprintTooltip(), { sprint })
                : this.sprintEndText();
        });
        this.showWarn = computed(() => this.afterSprintEnd() && !this.done());
        this.warnText = computed(() => this.labels.dueAfterSprint());
        this.warnTitle = computed(() => {
            const sprint = this.sprintName();
            return sprint ? `${this.warnText()} · ${sprint}` : this.warnText();
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDueLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthDueLabelComponent, isStandalone: true, selector: "ath-due-label", inputs: { date: { classPropertyName: "date", publicName: "date", isSignal: true, isRequired: false, transformFunction: null }, done: { classPropertyName: "done", publicName: "done", isSignal: true, isRequired: false, transformFunction: null }, source: { classPropertyName: "source", publicName: "source", isSignal: true, isRequired: false, transformFunction: null }, sprintName: { classPropertyName: "sprintName", publicName: "sprintName", isSignal: true, isRequired: false, transformFunction: null }, afterSprintEnd: { classPropertyName: "afterSprintEnd", publicName: "afterSprintEnd", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, compact: { classPropertyName: "compact", publicName: "compact", isSignal: true, isRequired: false, transformFunction: null }, now: { classPropertyName: "now", publicName: "now", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@if (view(); as v) {\n  <span class=\"ath-due\" [attr.data-tone]=\"v.tone\" [attr.title]=\"title()\">\n    @if (isSprint()) {\n      <lucide-icon class=\"ath-due__icon\" [img]=\"ic.sprint\" [size]=\"11\" aria-hidden=\"true\" />\n      @if (compact()) {\n        <span class=\"ath-due__sr\">{{ sprintEndText() }}</span>\n      } @else {\n        <span class=\"ath-due__source\">{{ sprintEndText() }} \u00B7 </span>\n      }\n    }\n    <span class=\"ath-due__text\">{{ v.text }}</span>\n    @if (showWarn()) {\n      <lucide-icon\n        class=\"ath-due__warn\"\n        [img]=\"ic.warn\"\n        [size]=\"11\"\n        role=\"img\"\n        [attr.aria-label]=\"warnText()\"\n        [attr.title]=\"warnTitle()\"\n      />\n    }\n  </span>\n} @else if (placeholder()) {\n  <span class=\"ath-due ath-due--none\">{{ placeholder() }}</span>\n}\n", styles: [":host{display:inline-flex;min-width:0}.ath-due{display:inline-flex;align-items:center;gap:var(--space-1);min-width:0;font-family:var(--font-sans);font-size:var(--text-sm);font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--due-later)}.ath-due[data-tone=overdue]{color:var(--due-overdue)}.ath-due[data-tone=today]{color:var(--due-today)}.ath-due[data-tone=soon]{color:var(--due-soon)}.ath-due--none{color:var(--due-none)}.ath-due__text{overflow:hidden;text-overflow:ellipsis}.ath-due__icon,.ath-due__source{flex:none;color:var(--fg-3)}.ath-due__warn{flex:none;color:var(--amber)}.ath-due__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n"], dependencies: [{ kind: "ngmodule", type: LucideAngularModule }, { kind: "component", type: i1.LucideAngularComponent, selector: "lucide-angular, lucide-icon, i-lucide, span-lucide", inputs: ["class", "name", "img", "color", "absoluteStrokeWidth", "size", "strokeWidth"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthDueLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-due-label', standalone: true, imports: [LucideAngularModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (view(); as v) {\n  <span class=\"ath-due\" [attr.data-tone]=\"v.tone\" [attr.title]=\"title()\">\n    @if (isSprint()) {\n      <lucide-icon class=\"ath-due__icon\" [img]=\"ic.sprint\" [size]=\"11\" aria-hidden=\"true\" />\n      @if (compact()) {\n        <span class=\"ath-due__sr\">{{ sprintEndText() }}</span>\n      } @else {\n        <span class=\"ath-due__source\">{{ sprintEndText() }} \u00B7 </span>\n      }\n    }\n    <span class=\"ath-due__text\">{{ v.text }}</span>\n    @if (showWarn()) {\n      <lucide-icon\n        class=\"ath-due__warn\"\n        [img]=\"ic.warn\"\n        [size]=\"11\"\n        role=\"img\"\n        [attr.aria-label]=\"warnText()\"\n        [attr.title]=\"warnTitle()\"\n      />\n    }\n  </span>\n} @else if (placeholder()) {\n  <span class=\"ath-due ath-due--none\">{{ placeholder() }}</span>\n}\n", styles: [":host{display:inline-flex;min-width:0}.ath-due{display:inline-flex;align-items:center;gap:var(--space-1);min-width:0;font-family:var(--font-sans);font-size:var(--text-sm);font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--due-later)}.ath-due[data-tone=overdue]{color:var(--due-overdue)}.ath-due[data-tone=today]{color:var(--due-today)}.ath-due[data-tone=soon]{color:var(--due-soon)}.ath-due--none{color:var(--due-none)}.ath-due__text{overflow:hidden;text-overflow:ellipsis}.ath-due__icon,.ath-due__source{flex:none;color:var(--fg-3)}.ath-due__warn{flex:none;color:var(--amber)}.ath-due__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\n"] }]
        }] });

/**
 * The shared page frame: the head slot (`ath-page-header` or
 * `[athPageHead]`), then a body column spaced by `--section-gap`.
 *
 * In the body, toolbars and alerts keep their height; the first
 * `ath-panel-grid`, `ath-panel` or `[athPageFill]` child takes the rest.
 *
 * **Contract with the app shell** (see the README, "Page frame"): the
 * scroll container that hosts routed pages carries the class `ath-stage`,
 * has a definite height (a flex item with `min-height: 0` in a full-height
 * column) and its bottom padding is `--content-pad-bottom`. `ath-page` is
 * the root element of the routed component's template. The lib's global
 * styles (`styles/_layout.scss`) turn the stage into a flex column and let
 * the route host grow.
 *
 * @example
 * <ath-page mode="fill">
 *   <ath-page-header title="Inbox" [subItems]="[unread + ' unread']" />
 *   <ath-alert variant="error" [message]="error()" [retry]="reload" />
 *   <ath-panel-grid columns="side-main">
 *     <ath-panel title="Filters">…</ath-panel>
 *     <ath-panel title="Activity" [count]="items().length">…</ath-panel>
 *   </ath-panel-grid>
 * </ath-page>
 */
class AthPageComponent {
    constructor() {
        this.mode = input('scroll');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthPageComponent, isStandalone: true, selector: "ath-page", inputs: { mode: { classPropertyName: "mode", publicName: "mode", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-mode": "mode()" } }, ngImport: i0, template: `
    <ng-content select="ath-page-header, [athPageHead]" />
    <div class="ath-page__body"><ng-content /></div>
  `, isInline: true, styles: ["ath-page{display:flex;flex-direction:column;gap:var(--section-gap);box-sizing:border-box;width:100%;min-width:0;max-width:var(--page-max-w);margin-inline:auto;flex:1 0 auto}ath-page[data-mode=fill]{flex:1 1 0;min-height:0}ath-page{margin-bottom:calc(var(--content-pad-top) - var(--content-pad-bottom))}ath-page>ath-page-header,ath-page>[athPageHead]{flex:none}.ath-page__body{display:flex;flex-direction:column;gap:var(--section-gap);flex:1 0 auto;min-width:0;min-height:0}.ath-page__body>*{flex:none;min-width:0}.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 1 0}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 1 0;min-height:0}@container ath-stage (max-width: 720px){ath-page[data-mode=fill]{flex:1 0 auto;min-height:auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto;min-height:auto}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-page', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[attr.data-mode]': 'mode()',
                    }, template: `
    <ng-content select="ath-page-header, [athPageHead]" />
    <div class="ath-page__body"><ng-content /></div>
  `, styles: ["ath-page{display:flex;flex-direction:column;gap:var(--section-gap);box-sizing:border-box;width:100%;min-width:0;max-width:var(--page-max-w);margin-inline:auto;flex:1 0 auto}ath-page[data-mode=fill]{flex:1 1 0;min-height:0}ath-page{margin-bottom:calc(var(--content-pad-top) - var(--content-pad-bottom))}ath-page>ath-page-header,ath-page>[athPageHead]{flex:none}.ath-page__body{display:flex;flex-direction:column;gap:var(--section-gap);flex:1 0 auto;min-width:0;min-height:0}.ath-page__body>*{flex:none;min-width:0}.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 1 0}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 1 0;min-height:0}@container ath-stage (max-width: 720px){ath-page[data-mode=fill]{flex:1 0 auto;min-height:auto}ath-page[data-mode=fill]>.ath-page__body{flex:1 0 auto}ath-page[data-mode=fill]>.ath-page__body>:is(ath-panel-grid,ath-panel,[athPageFill]){flex:1 0 auto;min-height:auto}}\n"] }]
        }] });

/**
 * A panel: surface, hairline border, `--panel-radius`, and an optional
 * head row (`--panel-head-h`) with title, projected head content, a count
 * and actions. The body takes the panel's height and scrolls inside it
 * when the panel is stretched by `ath-panel-grid` or a fill page.
 *
 * Slots: `[athPanelHead]` (after the title), `[athPanelActions]` (right),
 * default (body), `[athPanelFoot]` (under the body). The head row is drawn
 * only when it has something in it.
 *
 * @example
 * <ath-panel title="Active tickets" [count]="'5 open'">
 *   <ath-button athPanelActions variant="ghost" size="xs">Filter</ath-button>
 *   …rows…
 * </ath-panel>
 * <ath-panel title="Activity" [loading]="loading()" [padded]="true">…</ath-panel>
 */
class AthPanelComponent {
    constructor() {
        this.title = input(null);
        /** Heading level of the title (2 under a page's h1). */
        this.level = input(2);
        /** Quiet count at the head's right ("5 open", 12). */
        this.count = input(null);
        /** Pad the body with `--panel-pad-y` / `--panel-pad-x` (off for tables and lists). */
        this.padded = input(false);
        /** Let the body scroll when the panel is shorter than its content. */
        this.scroll = input(true);
        /** Rows placeholder instead of the content. */
        this.loading = input(false);
        this.skeletonRows = input(5);
        /** Columns / rows this panel spans in an `ath-panel-grid` (1–4). */
        this.colSpan = input(1);
        this.rowSpan = input(1);
        this.rows = computed(() => Array.from({ length: Math.max(1, Math.floor(this.skeletonRows())) }, (_, i) => i));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: AthPanelComponent, isStandalone: true, selector: "ath-panel", inputs: { title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, level: { classPropertyName: "level", publicName: "level", isSignal: true, isRequired: false, transformFunction: null }, count: { classPropertyName: "count", publicName: "count", isSignal: true, isRequired: false, transformFunction: null }, padded: { classPropertyName: "padded", publicName: "padded", isSignal: true, isRequired: false, transformFunction: null }, scroll: { classPropertyName: "scroll", publicName: "scroll", isSignal: true, isRequired: false, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, skeletonRows: { classPropertyName: "skeletonRows", publicName: "skeletonRows", isSignal: true, isRequired: false, transformFunction: null }, colSpan: { classPropertyName: "colSpan", publicName: "colSpan", isSignal: true, isRequired: false, transformFunction: null }, rowSpan: { classPropertyName: "rowSpan", publicName: "rowSpan", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-col-span": "colSpan() > 1 ? colSpan() : null", "attr.data-row-span": "rowSpan() > 1 ? rowSpan() : null", "attr.aria-busy": "loading() || null" } }, ngImport: i0, template: "<header class=\"ath-panel__head\">\n  @if (title()) {\n    @if (level() === 3) {\n      <h3 class=\"ath-panel__title\">{{ title() }}</h3>\n    } @else {\n      <h2 class=\"ath-panel__title\">{{ title() }}</h2>\n    }\n  }\n  <ng-content select=\"[athPanelHead]\" />\n  <span class=\"ath-panel__spring\"></span>\n  @if (count() !== null && count() !== undefined) {\n    <span class=\"ath-panel__count\">{{ count() }}</span>\n  }\n  <ng-content select=\"[athPanelActions]\" />\n</header>\n<div\n  class=\"ath-panel__body\"\n  [class.ath-panel__body--padded]=\"padded()\"\n  [class.ath-panel__body--scroll]=\"scroll()\"\n>\n  @if (loading()) {\n    @for (i of rows(); track i) {\n      <ath-skeleton variant=\"row\" />\n    }\n  } @else {\n    <ng-content />\n  }\n</div>\n<ng-content select=\"[athPanelFoot]\" />\n", styles: [":host{display:flex;flex-direction:column;box-sizing:border-box;min-width:0;min-height:0;overflow:hidden;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface)}.ath-panel__head{display:flex;flex:none;flex-wrap:wrap;align-items:center;gap:10px var(--space-4);box-sizing:border-box;min-height:var(--panel-head-h);padding:var(--space-1) 14px var(--space-1) var(--panel-pad-x);border-bottom:1px solid var(--border)}.ath-panel__head:has(>.ath-panel__spring:only-child){display:none}.ath-panel__title{margin:0;color:var(--fg);font-size:var(--panel-title-size);font-weight:var(--weight-semibold);line-height:var(--line-tight)}.ath-panel__spring{flex:1}.ath-panel__count{color:var(--fg-3);font-size:var(--control-font);font-variant-numeric:tabular-nums}.ath-panel__body{flex:1 1 auto;min-width:0;min-height:0}.ath-panel__body--scroll{overflow:auto;overscroll-behavior:contain}.ath-panel__body--padded{padding:var(--panel-pad-y) var(--panel-pad-x)}\n"], dependencies: [{ kind: "component", type: AthSkeletonComponent, selector: "ath-skeleton", inputs: ["variant", "width", "height", "animated"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-panel', standalone: true, imports: [AthSkeletonComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.data-col-span]': 'colSpan() > 1 ? colSpan() : null',
                        '[attr.data-row-span]': 'rowSpan() > 1 ? rowSpan() : null',
                        '[attr.aria-busy]': 'loading() || null',
                    }, template: "<header class=\"ath-panel__head\">\n  @if (title()) {\n    @if (level() === 3) {\n      <h3 class=\"ath-panel__title\">{{ title() }}</h3>\n    } @else {\n      <h2 class=\"ath-panel__title\">{{ title() }}</h2>\n    }\n  }\n  <ng-content select=\"[athPanelHead]\" />\n  <span class=\"ath-panel__spring\"></span>\n  @if (count() !== null && count() !== undefined) {\n    <span class=\"ath-panel__count\">{{ count() }}</span>\n  }\n  <ng-content select=\"[athPanelActions]\" />\n</header>\n<div\n  class=\"ath-panel__body\"\n  [class.ath-panel__body--padded]=\"padded()\"\n  [class.ath-panel__body--scroll]=\"scroll()\"\n>\n  @if (loading()) {\n    @for (i of rows(); track i) {\n      <ath-skeleton variant=\"row\" />\n    }\n  } @else {\n    <ng-content />\n  }\n</div>\n<ng-content select=\"[athPanelFoot]\" />\n", styles: [":host{display:flex;flex-direction:column;box-sizing:border-box;min-width:0;min-height:0;overflow:hidden;border:1px solid var(--border);border-radius:var(--panel-radius);background:var(--surface)}.ath-panel__head{display:flex;flex:none;flex-wrap:wrap;align-items:center;gap:10px var(--space-4);box-sizing:border-box;min-height:var(--panel-head-h);padding:var(--space-1) 14px var(--space-1) var(--panel-pad-x);border-bottom:1px solid var(--border)}.ath-panel__head:has(>.ath-panel__spring:only-child){display:none}.ath-panel__title{margin:0;color:var(--fg);font-size:var(--panel-title-size);font-weight:var(--weight-semibold);line-height:var(--line-tight)}.ath-panel__spring{flex:1}.ath-panel__count{color:var(--fg-3);font-size:var(--control-font);font-variant-numeric:tabular-nums}.ath-panel__body{flex:1 1 auto;min-width:0;min-height:0}.ath-panel__body--scroll{overflow:auto;overscroll-behavior:contain}.ath-panel__body--padded{padding:var(--panel-pad-y) var(--panel-pad-x)}\n"] }]
        }] });

const PRESETS = {
    '1': 'minmax(0, 1fr)',
    '2': 'repeat(2, minmax(0, 1fr))',
    '3': 'repeat(3, minmax(0, 1fr))',
    '4': 'repeat(4, minmax(0, 1fr))',
    'main-side': 'minmax(0, 1fr) minmax(280px, 360px)',
    'side-main': 'minmax(220px, 280px) minmax(0, 1fr)',
};
/** The `grid-template-columns` for a preset or a custom template. */
function panelGridColumns(columns) {
    return PRESETS[columns] ?? columns;
}
/**
 * Panels in rows that share their height: every panel in a row is as tall
 * as the row (no height mismatch between neighbours), the rows fill the
 * page body, and a panel's body scrolls inside it when the row is shorter.
 * Narrower than 720px (its own width, a container query) the grid stacks
 * into one column with natural heights, and the page scrolls.
 *
 * Panels span columns or rows with `ath-panel [colSpan]` / `[rowSpan]`.
 *
 * @example
 * <ath-panel-grid columns="main-side">
 *   <ath-panel title="Active tickets">…</ath-panel>
 *   <ath-panel title="Due this week">…</ath-panel>
 * </ath-panel-grid>
 * <ath-panel-grid columns="2" rows="auto minmax(0, 1fr)">…</ath-panel-grid>
 */
class AthPanelGridComponent {
    constructor() {
        this.columns = input('2');
        this.rows = input('fill');
        this.templateColumns = computed(() => panelGridColumns(this.columns()));
        this.rowsMode = computed(() => {
            const rows = this.rows();
            return rows === 'fill' || rows === 'auto' ? rows : 'custom';
        });
        this.templateRows = computed(() => this.rowsMode() === 'custom' ? this.rows() : null);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPanelGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "18.2.14", type: AthPanelGridComponent, isStandalone: true, selector: "ath-panel-grid", inputs: { columns: { classPropertyName: "columns", publicName: "columns", isSignal: true, isRequired: false, transformFunction: null }, rows: { classPropertyName: "rows", publicName: "rows", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.data-rows": "rowsMode()" } }, ngImport: i0, template: `
    <div
      class="ath-panel-grid__track"
      [style.--ath-panel-grid-cols]="templateColumns()"
      [style.grid-template-rows]="templateRows()"
    >
      <ng-content />
    </div>
  `, isInline: true, styles: ["ath-panel-grid{display:flex;flex-direction:column;min-width:0;min-height:0;container:ath-panel-grid/inline-size}.ath-panel-grid__track{--ath-panel-grid-cols: minmax(0, 1fr);display:grid;flex:1 1 auto;min-height:0;gap:var(--section-gap);grid-template-columns:var(--ath-panel-grid-cols);grid-auto-rows:auto;align-content:stretch;align-items:stretch}.ath-panel-grid__track>*{min-width:0;min-height:0}.ath-panel-grid__track>[data-col-span=\"2\"]{grid-column:span 2}.ath-panel-grid__track>[data-col-span=\"3\"]{grid-column:span 3}.ath-panel-grid__track>[data-col-span=\"4\"]{grid-column:span 4}.ath-panel-grid__track>[data-row-span=\"2\"]{grid-row:span 2}.ath-panel-grid__track>[data-row-span=\"3\"]{grid-row:span 3}ath-panel-grid[data-rows=auto]>.ath-panel-grid__track{align-content:start}ath-page[data-mode=fill]>.ath-page__body>ath-panel-grid[data-rows=fill]>.ath-panel-grid__track{grid-auto-rows:minmax(0,1fr)}@container ath-panel-grid (max-width: 720px){.ath-panel-grid__track{grid-template-columns:minmax(0,1fr);grid-template-rows:none!important;grid-auto-rows:auto!important;align-content:start}.ath-panel-grid__track>[data-col-span],.ath-panel-grid__track>[data-row-span]{grid-column:auto;grid-row:auto}}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthPanelGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ath-panel-grid', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[attr.data-rows]': 'rowsMode()',
                    }, template: `
    <div
      class="ath-panel-grid__track"
      [style.--ath-panel-grid-cols]="templateColumns()"
      [style.grid-template-rows]="templateRows()"
    >
      <ng-content />
    </div>
  `, styles: ["ath-panel-grid{display:flex;flex-direction:column;min-width:0;min-height:0;container:ath-panel-grid/inline-size}.ath-panel-grid__track{--ath-panel-grid-cols: minmax(0, 1fr);display:grid;flex:1 1 auto;min-height:0;gap:var(--section-gap);grid-template-columns:var(--ath-panel-grid-cols);grid-auto-rows:auto;align-content:stretch;align-items:stretch}.ath-panel-grid__track>*{min-width:0;min-height:0}.ath-panel-grid__track>[data-col-span=\"2\"]{grid-column:span 2}.ath-panel-grid__track>[data-col-span=\"3\"]{grid-column:span 3}.ath-panel-grid__track>[data-col-span=\"4\"]{grid-column:span 4}.ath-panel-grid__track>[data-row-span=\"2\"]{grid-row:span 2}.ath-panel-grid__track>[data-row-span=\"3\"]{grid-row:span 3}ath-panel-grid[data-rows=auto]>.ath-panel-grid__track{align-content:start}ath-page[data-mode=fill]>.ath-page__body>ath-panel-grid[data-rows=fill]>.ath-panel-grid__track{grid-auto-rows:minmax(0,1fr)}@container ath-panel-grid (max-width: 720px){.ath-panel-grid__track{grid-template-columns:minmax(0,1fr);grid-template-rows:none!important;grid-auto-rows:auto!important;align-content:start}.ath-panel-grid__track>[data-col-span],.ath-panel-grid__track>[data-row-span]{grid-column:auto;grid-row:auto}}\n"] }]
        }] });

/**
 * Makes a button the menu button of an `ath-menu`: click, Enter and Space
 * open it on the first item, ArrowDown on the first, ArrowUp on the last.
 * `aria-haspopup="menu"`, `aria-expanded` and `aria-controls` go on the real
 * control (the inner `<button>` of an `<ath-button>`), and the menu is
 * labelled by it.
 *
 * @example
 * <button type="button" [athMenuTrigger]="menu" aria-label="Actions">⋯</button>
 */
class AthMenuTriggerDirective extends AthOverlayTriggerBase {
    constructor() {
        super(...arguments);
        this.menu = input.required({ alias: 'athMenuTrigger' });
    }
    popupKind() {
        return 'menu';
    }
    isOpen() {
        return this.menu().open();
    }
    popupId() {
        return this.menu().panelId;
    }
    onClick() {
        const menu = this.menu();
        menu.labelFrom(this.controlId());
        menu.toggle(this.host, 'first');
    }
    onKeydown(event) {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')
            return;
        event.preventDefault();
        const menu = this.menu();
        menu.labelFrom(this.controlId());
        menu.show(this.host, event.key === 'ArrowUp' ? 'last' : 'first');
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuTriggerDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "18.2.14", type: AthMenuTriggerDirective, isStandalone: true, selector: "[athMenuTrigger]", inputs: { menu: { classPropertyName: "menu", publicName: "athMenuTrigger", isSignal: true, isRequired: true, transformFunction: null } }, host: { listeners: { "click": "onClick()", "keydown": "onKeydown($event)" } }, exportAs: ["athMenuTrigger"], usesInheritance: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: AthMenuTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[athMenuTrigger]',
                    standalone: true,
                    exportAs: 'athMenuTrigger',
                    host: {
                        '(click)': 'onClick()',
                        '(keydown)': 'onKeydown($event)',
                    },
                }]
        }] });

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

export { AVATAR_TONE_COUNT, AthAlertComponent, AthAvatarComponent, AthAvatarStackComponent, AthBadgeComponent, AthBannerComponent, AthBreadcrumbComponent, AthButtonComponent, AthCardComponent, AthChipComponent, AthCodeBlockComponent, AthComboboxComponent, AthCopyButtonComponent, AthDialogComponent, AthDividerComponent, AthDropdownComponent, AthDueLabelComponent, AthEmptyStateComponent, AthFileDropComponent, AthFilterChipComponent, AthFloatingDirective, AthInputComponent, AthKbdComponent, AthKpiStripComponent, AthKpiTileComponent, AthListboxComponent, AthMarkdownComponent, AthMenuComponent, AthMenuItemComponent, AthMenuSeparatorComponent, AthMenuTriggerDirective, AthNavItemComponent, AthOptionPickerComponent, AthOverlayStack, AthPageComponent, AthPageHeaderComponent, AthPaginationComponent, AthPanelComponent, AthPanelGridComponent, AthPopoverComponent, AthPopoverContentDirective, AthPopoverTriggerDirective, AthPriorityComponent, AthProgressComponent, AthProjectKeyBadgeComponent, AthSearchInputComponent, AthSectionComponent, AthSegmentComponent, AthSelectComponent, AthSidebarComponent, AthSkeletonCardComponent, AthSkeletonComponent, AthSkeletonListComponent, AthSkeletonTableComponent, AthSlaBarComponent, AthSparklineComponent, AthSpinnerComponent, AthStatCardComponent, AthStatusPillComponent, AthTableComponent, AthTabsComponent, AthTextareaComponent, AthTimelineComponent, AthTimelineEntryComponent, AthTimelineEventComponent, AthTimerPillComponent, AthToastContainerComponent, AthToggleComponent, AthTooltipDirective, AthUserPickerComponent, athEscapeHtml, athPlainTextHtml, avatarInitials, avatarTone, avatarToneFor, calendarDayOf, calendarDaysUntil, compactDueText, describeDue, dueToneOf, floatPanel, formatAthLabel, hasKpiTrend, injectAthLabels, installTopLayerStyles, isVirtualAnchor, panelGridColumns, resolveAnchor, resolveFloatingTarget, runAthAction, shortDay, sparklineGeometry, supportsTopLayer, toneOfKey, zonedWallClock };
//# sourceMappingURL=athene-webcomponents.mjs.map
