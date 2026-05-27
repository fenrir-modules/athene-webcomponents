import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
@Component({
  selector: 'ath-markdown',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.scss',
})
export class AthMarkdownComponent {
  private readonly sanitizer = inject(DomSanitizer);

  private readonly _html = signal('');
  private readonly _source = signal('');
  private readonly _parse = signal<((src: string) => string) | null>(null);

  @Input()
  set html(value: string) {
    this._html.set(value ?? '');
  }
  get html(): string {
    return this._html();
  }

  @Input()
  set source(value: string) {
    this._source.set(value ?? '');
  }
  get source(): string {
    return this._source();
  }

  @Input()
  set parse(fn: ((src: string) => string) | null) {
    this._parse.set(fn);
  }

  protected readonly renderedHtml = computed<SafeHtml>(() => {
    const direct = this._html();
    if (direct) {
      return this.sanitizer.bypassSecurityTrustHtml(direct);
    }
    const src = this._source();
    const parser = this._parse();
    if (src && parser) {
      try {
        return this.sanitizer.bypassSecurityTrustHtml(parser(src));
      } catch (err) {
        console.warn('[ath-markdown] parser threw, falling back to plain text', err);
        return this.escapeAsPre(src);
      }
    }
    if (src) {
      return this.escapeAsPre(src);
    }
    return '';
  });

  private escapeAsPre(src: string): SafeHtml {
    const escaped = src
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return this.sanitizer.bypassSecurityTrustHtml(`<pre>${escaped}</pre>`);
  }
}
