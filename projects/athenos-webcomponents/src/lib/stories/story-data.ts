// Shared sample data for the component catalogue (*.stories.ts only; not
// exported from the public API). Dates are relative to STORY_NOW, and stories
// pass it as the reference time (`ath-due-label [now]`), so due dates render
// the same today and in a year and the screenshots stay stable. (The
// catalogue checks do not fake the browser clock: Playwright's clock changes
// timer ordering, which made overlay focus flaky.)
import type { AthPerson } from '../components/avatar/avatar.component';
import type { ListboxOption } from '../components/listbox/listbox.component';

export const STORY_NOW = new Date('2026-10-14T09:30:00Z');

/** `YYYY-MM-DD`, `days` after STORY_NOW (negative = before). */
export function storyDay(days: number): string {
  const d = new Date(STORY_NOW.getTime() + days * 86_400_000);
  return d.toISOString().slice(0, 10);
}

export const STORY_PEOPLE: readonly AthPerson[] = [
  { id: 'u-ada', name: 'Ada Lovelace', src: null },
  { id: 'u-alan', name: 'Alan Turing', src: null },
  { id: 'u-grace', name: 'Grace Hopper', src: null },
  { id: 'u-jurgen', name: 'Jürgen Müller', src: null },
  { id: 'u-katherine', name: 'Katherine Johnson', src: null },
  { id: 'u-linus', name: 'Linus Torvalds', src: null },
  { id: 'u-margaret', name: 'Margaret Hamilton', src: null },
];

/** Assignee options: a group of shortcuts, sublabels, keywords, a disabled one. */
export const STORY_ASSIGNEES: readonly ListboxOption[] = [
  { value: 'me', label: 'Me', group: 'Shortcuts' },
  { value: 'none', label: 'Unassigned', group: 'Shortcuts' },
  { value: 'ada', label: 'Ada Lovelace', sublabel: 'ada@example.com' },
  { value: 'alan', label: 'Alan Turing', sublabel: 'alan@example.com' },
  { value: 'grace', label: 'Grace Hopper', sublabel: 'grace@example.com' },
  { value: 'jurgen', label: 'Jürgen Müller', sublabel: 'jm@example.com', keywords: 'juergen' },
  { value: 'linus', label: 'Linus Torvalds', disabled: true },
];

export const LONG_TEXT =
  'A deliberately long label that keeps going well past the width a designer had in mind, to show truncation and wrapping';

/** Arabic sample for right-to-left stories. */
export const RTL_TEXT = 'مرحبا بالعالم';

/**
 * A tiny markdown subset for stories (headings, emphasis, code, lists,
 * links, paragraphs). The app provides its real parser via
 * ATH_MARKDOWN_PARSER; this one deliberately passes raw HTML through, so the
 * XSS story shows that the component's sanitizer, not the parser, removes it.
 */
export function storyMarkdown(source: string): string {
  const inline = (s: string) =>
    s
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  const blocks = source.trim().split(/\n{2,}/);
  return blocks
    .map((block) => {
      const heading = /^(#{1,3}) (.*)$/.exec(block);
      if (heading) return `<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`;
      if (block.startsWith('```')) {
        const code = block.replace(/^```\w*\n?/, '').replace(/```$/, '');
        return `<pre><code>${code.replace(/</g, '&lt;')}</code></pre>`;
      }
      if (/^- /m.test(block)) {
        const items = block.split('\n').map((l) => `<li>${inline(l.replace(/^- /, ''))}</li>`);
        return `<ul>${items.join('')}</ul>`;
      }
      if (block.startsWith('> ')) return `<blockquote>${inline(block.slice(2))}</blockquote>`;
      return `<p>${inline(block)}</p>`;
    })
    .join('\n');
}
