import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Upload } from 'lucide-angular';

/**
 * Drag-and-drop file upload zone with click-to-browse fallback.
 *
 * Emits raw `File[]` — actual uploading is the caller's job (typically
 * routed via `file-service`).
 *
 * @example
 * <ath-file-drop accept="image/*,.pdf" (filesPicked)="upload($event)" />
 * <ath-file-drop [multiple]="false" [maxSizeMb]="20" (rejected)="showError($event)"
 *                (filesPicked)="onPick($event)">
 *   Drop your avatar here
 * </ath-file-drop>
 */
@Component({
  selector: 'ath-file-drop',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './file-drop.component.html',
  styleUrl: './file-drop.component.scss',
})
export class AthFileDropComponent {
  /** Filter for the file picker (e.g., `image/*,.pdf`). */
  @Input() accept: string | null = null;

  @Input() multiple = true;

  /** Reject files larger than this (in MB). 0 = no limit. */
  @Input() maxSizeMb = 0;

  @Input() disabled = false;

  /** Custom prompt text. Defaults to "Drop files or click to browse". */
  @Input() prompt = 'Drop files or click to browse';

  @Output() filesPicked = new EventEmitter<File[]>();

  /** Emits when files are rejected (size limit, wrong type). */
  @Output() rejected = new EventEmitter<{ file: File; reason: 'size' | 'type' }[]>();

  protected readonly uploadIcon = Upload;
  protected readonly dragging = signal(false);

  @ViewChild('fileInput') private fileInput!: ElementRef<HTMLInputElement>;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
    this.dragging.set(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    // Only flip off if leaving the host, not a child element
    if (!(event.currentTarget as Node).contains(event.relatedTarget as Node)) {
      this.dragging.set(false);
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    if (this.disabled) return;
    event.preventDefault();
    event.stopPropagation();
    this.dragging.set(false);
    const files = Array.from(event.dataTransfer?.files ?? []);
    this.handle(files);
  }

  openPicker(): void {
    if (this.disabled) return;
    this.fileInput.nativeElement.click();
  }

  onPickerChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.handle(files);
    input.value = ''; // allow re-picking the same file
  }

  private handle(files: File[]): void {
    if (files.length === 0) return;

    const accepted: File[] = [];
    const rejected: { file: File; reason: 'size' | 'type' }[] = [];

    for (const file of files) {
      if (this.maxSizeMb > 0 && file.size > this.maxSizeMb * 1024 * 1024) {
        rejected.push({ file, reason: 'size' });
        continue;
      }
      if (this.accept && !this.matchesAccept(file)) {
        rejected.push({ file, reason: 'type' });
        continue;
      }
      accepted.push(file);
    }

    if (rejected.length > 0) {
      this.rejected.emit(rejected);
    }
    if (accepted.length > 0) {
      this.filesPicked.emit(this.multiple ? accepted : [accepted[0]]);
    }
  }

  private matchesAccept(file: File): boolean {
    if (!this.accept) return true;
    const patterns = this.accept.split(',').map((p) => p.trim().toLowerCase());
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    return patterns.some((p) => {
      if (p.startsWith('.')) return name.endsWith(p);
      if (p.endsWith('/*')) return type.startsWith(p.slice(0, -1));
      return type === p;
    });
  }
}
