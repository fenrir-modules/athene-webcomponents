import { type AthMarkdownParser } from '@athene/webcomponents/core';
import * as i0 from "@angular/core";
export { ATH_MARKDOWN_PARSER, type AthMarkdownParser } from '@athene/webcomponents/core';
/** Escapes text for HTML. */
export declare function athEscapeHtml(text: string): string;
/** Plain text as paragraphs and line breaks: the fallback without a parser. */
export declare function athPlainTextHtml(text: string): string;
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
export declare class AthMarkdownComponent {
    private readonly sanitizer;
    private readonly defaultParser;
    /** Markdown source. */
    readonly text: import("@angular/core").InputSignal<string | null | undefined>;
    /** Parser for this instance; defaults to `ATH_MARKDOWN_PARSER`. */
    readonly parse: import("@angular/core").InputSignal<AthMarkdownParser | null>;
    /** Pre-rendered HTML (still sanitized). Wins over `text`. */
    readonly html: import("@angular/core").InputSignal<string | null | undefined>;
    /** The sanitized HTML, as a string (Angular sanitizes `innerHTML` again on binding). */
    protected readonly renderedHtml: import("@angular/core").Signal<string>;
    private clean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthMarkdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthMarkdownComponent, "ath-markdown", never, { "text": { "alias": "text"; "required": false; "isSignal": true; }; "parse": { "alias": "parse"; "required": false; "isSignal": true; }; "html": { "alias": "html"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
