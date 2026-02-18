import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Copy, Check } from 'lucide-angular';

/**
 * Athene Copy Button Component
 *
 * One-click copy-to-clipboard with success feedback.
 *
 * @example
 * <ath-copy-button [value]="apiKey" />
 * <ath-copy-button [value]="secretToken" label="Copy token" />
 */
@Component({
  selector: 'ath-copy-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './copy-button.component.html',
  styleUrl: './copy-button.component.scss',
})
export class AthCopyButtonComponent {
  /** Value to copy to clipboard */
  @Input({ required: true }) value = '';

  /** Optional tooltip/label */
  @Input() label = 'Copy';

  protected copied = false;
  protected readonly copyIcon = Copy;
  protected readonly checkIcon = Check;

  private resetTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.value);
      this.copied = true;
      this.cdr.markForCheck();

      if (this.resetTimeout) clearTimeout(this.resetTimeout);
      this.resetTimeout = setTimeout(() => {
        this.copied = false;
        this.cdr.markForCheck();
      }, 2000);
    } catch {
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

      if (this.resetTimeout) clearTimeout(this.resetTimeout);
      this.resetTimeout = setTimeout(() => {
        this.copied = false;
        this.cdr.markForCheck();
      }, 2000);
    }
  }
}
