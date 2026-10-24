import type { Meta, StoryObj } from '@storybook/angular';
import { storyMarkdown } from '../../stories/story-data';
import { AthMarkdownComponent } from './markdown.component';

const SAMPLE = `## Steps to reproduce

1. Open **Settings** and switch the theme to *dark*.

- The sidebar keeps the light \`--bg-1\`
- See [the token docs](https://example.com/tokens)

> Happens only after a reload.

\`\`\`ts
document.documentElement.dataset['theme'] = 'dark';
\`\`\``;

/** Raw HTML that a parser might let through; the component's sanitizer must strip it. */
const XSS = `Hello <img src="x" onerror="window.__xss = true"> world.

<script>window.__xss = true</script>

<a href="javascript:window.__xss = true">click me</a> and <b onclick="window.__xss = true">bold</b>

<iframe src="https://example.com"></iframe><span style="position:fixed;inset:0;background:red">overlay</span>`;

const meta: Meta<AthMarkdownComponent> = {
  title: 'Display/Markdown',
  component: AthMarkdownComponent,
  render: () => ({
    props: { text: SAMPLE, parse: storyMarkdown },
    template: `<div style="max-width:640px"><ath-markdown [text]="text" [parse]="parse" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<AthMarkdownComponent>;

export const Default: Story = {};

/** No parser provided: the text shows as escaped paragraphs. */
export const PlainText: Story = {
  render: () => ({
    props: { text: 'Line one\nline two\n\n<b>not bold</b>, just text.' },
    template: `<div style="max-width:640px"><ath-markdown [text]="text" /></div>`,
  }),
};

/**
 * XSS sample through a parser that passes HTML on. The sanitizer removes the
 * script, the event handlers, the `javascript:` URL, the iframe and inline
 * styles; the play function asserts it.
 */
export const SanitizedXss: Story = {
  // The sample's <img> (minus its onerror) is the attack payload, not page content.
  parameters: { a11y: { config: { rules: [{ id: 'image-alt', enabled: false }] } } },
  render: () => ({
    props: { text: XSS, parse: storyMarkdown },
    template: `<div style="max-width:640px"><ath-markdown [text]="text" [parse]="parse" /></div>`,
  }),
  play: ({ canvasElement }) => {
    const root = canvasElement.querySelector('.ath-md') ?? canvasElement;
    const html = root.innerHTML;
    // Angular neutralises a javascript: URL as "unsafe:javascript:…".
    const leaks = [
      '<script',
      'onerror',
      'onclick',
      'href="javascript:',
      '<iframe',
      'style=',
    ].filter((s) => html.includes(s));
    if (leaks.length) throw new Error(`sanitizer let through: ${leaks.join(', ')}`);
    if (Reflect.get(window, '__xss')) throw new Error('injected script ran');
  },
};

/** `[html]` from elsewhere (e.g. the server) is sanitized as well. */
export const TrustedHtmlInput: Story = {
  render: () => ({
    props: {
      html: '<p>Server rendered <em>HTML</em> <img src="x" onerror="alert(1)" alt="broken"></p>',
    },
    template: `<div style="max-width:640px"><ath-markdown [html]="html" /></div>`,
  }),
};
