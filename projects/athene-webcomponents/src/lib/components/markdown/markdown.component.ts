import {
  ChangeDetectionStrategy,
  Component,
  SecurityContext,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ATH_MARKDOWN_PARSER, type AthMarkdownParser } from '@athene/webcomponents/core';

// The parser token lives in the light core entry point, so an app provides
// it at its root without loading the components.
export { ATH_MARKDOWN_PARSER, type AthMarkdownParser } from '@athene/webcomponents/core';

/** Escapes text for HTML. */
export function athEscapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Plain text as paragraphs and line breaks: the fallback without a parser. */
export function athPlainTextHtml(text: string): string {
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
@Component({
  selector: 'ath-markdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ath-markdown' },
  template: `<div class="ath-md" [innerHTML]="renderedHtml()"></div>`,
  styleUrl: './markdown.component.scss',
})
export class AthMarkdownComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly defaultParser = inject(ATH_MARKDOWN_PARSER, { optional: true });

  /** Markdown source. */
  readonly text = input<string | null | undefined>('');
  /** Parser for this instance; defaults to `ATH_MARKDOWN_PARSER`. */
  readonly parse = input<AthMarkdownParser | null>(null);
  /** Pre-rendered HTML (still sanitized). Wins over `text`. */
  readonly html = input<string | null | undefined>('');

  /** The sanitized HTML, as a string (Angular sanitizes `innerHTML` again on binding). */
  protected readonly renderedHtml = computed<string>(() => {
    const direct = this.html();
    if (direct) return this.clean(direct);
    const src = this.text() || '';
    if (!src.trim()) return '';
    const parser = this.parse() ?? this.defaultParser;
    if (!parser) return this.clean(athPlainTextHtml(src));
    try {
      return this.clean(parser(src));
    } catch (err) {
      console.warn('[ath-markdown] parser threw, showing plain text', err);
      return this.clean(athPlainTextHtml(src));
    }
  });

  private clean(html: string): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, html) ?? '';
  }
}
