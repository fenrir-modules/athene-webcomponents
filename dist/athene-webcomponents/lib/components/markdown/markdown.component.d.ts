import { SafeHtml } from '@angular/platform-browser';
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
export declare class AthMarkdownComponent {
    private readonly sanitizer;
    private readonly _html;
    private readonly _source;
    private readonly _parse;
    set html(value: string);
    get html(): string;
    set source(value: string);
    get source(): string;
    set parse(fn: ((src: string) => string) | null);
    protected readonly renderedHtml: import("@angular/core").Signal<SafeHtml>;
    private escapeAsPre;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthMarkdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthMarkdownComponent, "ath-markdown", never, { "html": { "alias": "html"; "required": false; }; "source": { "alias": "source"; "required": false; }; "parse": { "alias": "parse"; "required": false; }; }, {}, never, never, true, never>;
}
