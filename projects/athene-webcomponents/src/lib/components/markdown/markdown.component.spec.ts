import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ATH_MARKDOWN_PARSER, AthMarkdownComponent, athPlainTextHtml } from './markdown.component';

/** A parser that trusts its input: the worst case the sanitizer must catch. */
const naive = (src: string) => src;

const PAYLOADS = [
  '<img src=x onerror="window.__xss = 1">',
  '<script>window.__xss = 1</script>',
  '<a href="javascript:window.__xss=1">x</a>',
  '<svg><script>window.__xss = 1</script></svg>',
  '<iframe src="javascript:window.__xss=1"></iframe>',
  '<div style="background:url(javascript:alert(1))" onclick="window.__xss=1">x</div>',
  '<form action="https://evil.example"><input name="q"></form>',
];

describe('AthMarkdownComponent', () => {
  let fixture: ComponentFixture<AthMarkdownComponent>;
  const root = () => (fixture.nativeElement as HTMLElement).querySelector('.ath-md')!;

  function create(providers: unknown[] = []): void {
    TestBed.configureTestingModule({
      imports: [AthMarkdownComponent],
      providers: providers as never[],
    });
    fixture = TestBed.createComponent(AthMarkdownComponent);
  }

  afterEach(() => delete (window as unknown as { __xss?: number }).__xss);

  it('sanitizes whatever a parser returns: no bypass (SEC-14)', () => {
    create();
    fixture.componentRef.setInput('parse', naive);
    for (const payload of PAYLOADS) {
      fixture.componentRef.setInput('text', payload);
      fixture.detectChanges();
      const html = root().innerHTML;
      expect(html)
        .withContext(payload)
        .not.toMatch(/<script|onerror|onclick|="javascript:|<iframe|<form|style=/i);
    }
    expect((window as unknown as { __xss?: number }).__xss).toBeUndefined();
  });

  it('sanitizes pre-rendered [html] too', () => {
    create();
    fixture.componentRef.setInput('html', '<p>ok</p><img src=x onerror="window.__xss=1">');
    fixture.detectChanges();
    expect(root().querySelector('p')!.textContent).toBe('ok');
    expect(root().innerHTML).not.toContain('onerror');
  });

  it('keeps the markup a safe parser produces (classes, links, tables, task boxes)', () => {
    create([{ provide: ATH_MARKDOWN_PARSER, useValue: naive }]);
    fixture.componentRef.setInput(
      'text',
      '<h3 class="ath-md__h1">Title</h3><p><a href="https://example.com">link</a> ' +
        '<span class="ath-md__mention">@Mira</span></p>' +
        '<ul class="ath-md__tasks"><li class="ath-md__task ath-md__task--done"><span class="ath-md__box"></span>' +
        '<span class="ath-md__task-body">done</span></li></ul>' +
        '<div class="ath-md__table"><table><thead><tr><th>A</th></tr></thead></table></div>'
    );
    fixture.detectChanges();
    expect(root().querySelector('h3.ath-md__h1')).not.toBeNull();
    expect(root().querySelector('a')!.getAttribute('href')).toBe('https://example.com');
    expect(root().querySelector('.ath-md__mention')).not.toBeNull();
    expect(root().querySelector('.ath-md__task--done .ath-md__box')).not.toBeNull();
    expect(root().querySelector('th')!.textContent).toBe('A');
  });

  it('styles the content from the shared mixin', () => {
    create([{ provide: ATH_MARKDOWN_PARSER, useValue: naive }]);
    fixture.componentRef.setInput('text', '<h3 class="ath-md__h1">Title</h3>');
    fixture.detectChanges();
    expect(getComputedStyle(root().querySelector('h3')!).fontSize).toBe('22px');
  });

  it('prefers the [parse] input over the provided parser', () => {
    create([{ provide: ATH_MARKDOWN_PARSER, useValue: () => '<p>root</p>' }]);
    fixture.componentRef.setInput('parse', () => '<p>local</p>');
    fixture.componentRef.setInput('text', 'x');
    fixture.detectChanges();
    expect(root().textContent).toBe('local');
  });

  it('shows escaped paragraphs without a parser, and when the parser throws', () => {
    create();
    fixture.componentRef.setInput('text', 'a <b>\nb\n\nc');
    fixture.detectChanges();
    expect(root().innerHTML).toBe('<p>a &lt;b&gt;<br>b</p><p>c</p>');
    fixture.componentRef.setInput('parse', () => {
      throw new Error('boom');
    });
    spyOn(console, 'warn');
    fixture.componentRef.setInput('text', 'z');
    fixture.detectChanges();
    expect(root().innerHTML).toBe('<p>z</p>');
  });

  it('renders nothing for empty text', () => {
    create();
    fixture.componentRef.setInput('text', '   ');
    fixture.detectChanges();
    expect(root().innerHTML).toBe('');
    expect(athPlainTextHtml('')).toBe('');
  });
});
