import { ChangeDetectionStrategy, Component, HostBinding, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check, Copy } from 'lucide-angular';

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
@Component({
  selector: 'ath-code-block',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class AthCodeBlockComponent {
  @Input({ required: true }) code = '';
  @Input() language: string | null = null;

  /** Optional filename to display next to the language label. */
  @Input() filename: string | null = null;

  /** Show line numbers down the left gutter. */
  @Input() showLineNumbers = false;

  /** Hide the copy button (e.g., for short read-only snippets). */
  @Input() copyable = true;

  protected readonly copyIcon = Copy;
  protected readonly checkIcon = Check;
  protected readonly copied = signal(false);

  @HostBinding('attr.data-language') get hostLang(): string | null {
    return this.language;
  }

  protected get lines(): string[] {
    return this.code.split('\n');
  }

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code);
      this.copied.set(true);
      window.setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // Fallback: select the text so the user can copy manually
    }
  }
}
