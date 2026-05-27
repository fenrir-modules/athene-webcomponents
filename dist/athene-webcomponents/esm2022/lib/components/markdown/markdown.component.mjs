import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
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
export class AthMarkdownComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYXRoZW5lLXdlYmNvbXBvbmVudHMvc3JjL2xpYi9jb21wb25lbnRzL21hcmtkb3duL21hcmtkb3duLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2F0aGVuZS13ZWJjb21wb25lbnRzL3NyYy9saWIvY29tcG9uZW50cy9tYXJrZG93bi9tYXJrZG93bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLDJCQUEyQixDQUFDOztBQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQVNILE1BQU0sT0FBTyxvQkFBb0I7SUFSakM7UUFTbUIsY0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVqQyxVQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLFlBQU8sR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsV0FBTSxHQUFHLE1BQU0sQ0FBbUMsSUFBSSxDQUFDLENBQUM7UUF1QnRELGlCQUFZLEdBQUcsUUFBUSxDQUFXLEdBQUcsRUFBRTtZQUN4RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUIsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDN0IsSUFBSSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQztvQkFDSCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELENBQUM7Z0JBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztvQkFDYixPQUFPLENBQUMsSUFBSSxDQUFDLHlEQUF5RCxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUM3RSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDUixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0IsQ0FBQztZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7S0FTSjtJQWpEQyxJQUNJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQ0ksTUFBTSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFDSSxLQUFLLENBQUMsRUFBb0M7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQXVCTyxXQUFXLENBQUMsR0FBVztRQUM3QixNQUFNLE9BQU8sR0FBRyxHQUFHO2FBQ2hCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO2FBQ3RCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDLFFBQVEsT0FBTyxRQUFRLENBQUMsQ0FBQztJQUN6RSxDQUFDOytHQXZEVSxvQkFBb0I7bUdBQXBCLG9CQUFvQixvSUNuQ2pDLCtEQUNBLG1pR0Q2QlksWUFBWTs7NEZBS1gsb0JBQW9CO2tCQVJoQyxTQUFTOytCQUNFLGNBQWMsY0FDWixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsbUJBQ04sdUJBQXVCLENBQUMsTUFBTTs4QkFZM0MsSUFBSTtzQkFEUCxLQUFLO2dCQVNGLE1BQU07c0JBRFQsS0FBSztnQkFTRixLQUFLO3NCQURSLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgY29tcHV0ZWQsIGluamVjdCwgc2lnbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG4vKipcbiAqIFN0eWxlZCBjb250YWluZXIgZm9yIHJlbmRlcmVkIE1hcmtkb3duIGNvbnRlbnQuXG4gKlxuICogVGhlIGxpYnJhcnkgZGVsaWJlcmF0ZWx5IGRvZXMgTk9UIGJ1bmRsZSBhIE1hcmtkb3duIHBhcnNlciB0byBrZWVwIHRoZVxuICogZm9vdHByaW50IHNtYWxsLiBUd28gd2F5cyB0byB1c2UgaXQ6XG4gKlxuICogIDEuICoqU2VydmVyLXJlbmRlcmVkOioqIHBhcnNlICsgc2FuaXRpemUgTWFya2Rvd24gb24gdGhlIHNlcnZlciwgcGFzc1xuICogICAgIHRoZSBIVE1MIHZpYSBgW2h0bWxdYC4gVGhpcyBpcyB0aGUgcmVjb21tZW5kZWQgcGF0aCBmb3IgVjEgKHRoZVxuICogICAgIHdpa2ktc2VydmljZSB1c2VzIHB1bGxkb3duLWNtYXJrIGZvciB0aGlzKS5cbiAqXG4gKiAgMi4gKipDbGllbnQtcmVuZGVyZWQ6KiogcGFzcyByYXcgTWFya2Rvd24gdmlhIGBbc291cmNlXWA7IHRoZSBjb25zdW1pbmdcbiAqICAgICBhcHAgcHJvdmlkZXMgYSBgcGFyc2VgIGZ1bmN0aW9uIChlLmcuLCBtYXJrZWQsIG1hcmtkb3duLWl0KS4gVGhlXG4gKiAgICAgcmVzdWx0aW5nIEhUTUwgaXMgc2FuaXRpemVkIGJ5IEFuZ3VsYXIncyBgRG9tU2FuaXRpemVyYCBhbmQgc3R5bGVkLlxuICpcbiAqICoqU2VjdXJpdHk6KiogV2hlbiB1c2luZyBgW2h0bWxdYCwgdGhlIGNhbGxlciBpcyByZXNwb25zaWJsZSBmb3JcbiAqIHNhbml0aXphdGlvbiAob3IgZ3VhcmFudGVlcyB0aGUgSFRNTCBpcyB0cnVzdGVkKS4gV2hlbiB1c2luZyBgW3NvdXJjZV1gXG4gKiB3aXRoIGEgcGFyc2VyLCB0aGUgb3V0cHV0IGlzIGJ5cGFzc2VkIHZpYSBgYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWxgIOKAlCBzb1xuICogdGhlIHBhcnNlciBtdXN0IHByb2R1Y2Ugc2FmZSBIVE1MIChtb3N0IHBvcHVsYXIgcGFyc2VycyBkbywgYnV0IHZlcmlmeSkuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhdGgtbWFya2Rvd24gW2h0bWxdPVwic2VydmVyUmVuZGVyZWRIdG1sXCIgLz5cbiAqIDxhdGgtbWFya2Rvd24gW3NvdXJjZV09XCJyYXdNZFwiIFtwYXJzZV09XCJtYXJrZG93bkl0XCIgLz5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXRoLW1hcmtkb3duJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybDogJy4vbWFya2Rvd24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vbWFya2Rvd24uY29tcG9uZW50LnNjc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBBdGhNYXJrZG93bkNvbXBvbmVudCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2FuaXRpemVyID0gaW5qZWN0KERvbVNhbml0aXplcik7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfaHRtbCA9IHNpZ25hbCgnJyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NvdXJjZSA9IHNpZ25hbCgnJyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3BhcnNlID0gc2lnbmFsPCgoc3JjOiBzdHJpbmcpID0+IHN0cmluZykgfCBudWxsPihudWxsKTtcblxuICBASW5wdXQoKVxuICBzZXQgaHRtbCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faHRtbC5zZXQodmFsdWUgPz8gJycpO1xuICB9XG4gIGdldCBodG1sKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2h0bWwoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBzb3VyY2UodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3NvdXJjZS5zZXQodmFsdWUgPz8gJycpO1xuICB9XG4gIGdldCBzb3VyY2UoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlKCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgcGFyc2UoZm46ICgoc3JjOiBzdHJpbmcpID0+IHN0cmluZykgfCBudWxsKSB7XG4gICAgdGhpcy5fcGFyc2Uuc2V0KGZuKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWFkb25seSByZW5kZXJlZEh0bWwgPSBjb21wdXRlZDxTYWZlSHRtbD4oKCkgPT4ge1xuICAgIGNvbnN0IGRpcmVjdCA9IHRoaXMuX2h0bWwoKTtcbiAgICBpZiAoZGlyZWN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoZGlyZWN0KTtcbiAgICB9XG4gICAgY29uc3Qgc3JjID0gdGhpcy5fc291cmNlKCk7XG4gICAgY29uc3QgcGFyc2VyID0gdGhpcy5fcGFyc2UoKTtcbiAgICBpZiAoc3JjICYmIHBhcnNlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHBhcnNlcihzcmMpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1thdGgtbWFya2Rvd25dIHBhcnNlciB0aHJldywgZmFsbGluZyBiYWNrIHRvIHBsYWluIHRleHQnLCBlcnIpO1xuICAgICAgICByZXR1cm4gdGhpcy5lc2NhcGVBc1ByZShzcmMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3JjKSB7XG4gICAgICByZXR1cm4gdGhpcy5lc2NhcGVBc1ByZShzcmMpO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH0pO1xuXG4gIHByaXZhdGUgZXNjYXBlQXNQcmUoc3JjOiBzdHJpbmcpOiBTYWZlSHRtbCB7XG4gICAgY29uc3QgZXNjYXBlZCA9IHNyY1xuICAgICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGA8cHJlPiR7ZXNjYXBlZH08L3ByZT5gKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImF0aC1tZFwiIFtpbm5lckhUTUxdPVwicmVuZGVyZWRIdG1sKClcIj48L2Rpdj5cbiJdfQ==