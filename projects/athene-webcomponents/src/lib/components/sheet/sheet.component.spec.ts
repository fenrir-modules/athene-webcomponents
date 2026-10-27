import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AthPopoverComponent } from '../popover/popover.component';
import { AthPopoverTriggerDirective } from '../popover/popover-trigger.directive';
import { AthOverlayStack } from '../floating/overlay-stack';
import { AthSheetComponent, type SheetAutoFocus } from './sheet.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AthSheetComponent, AthPopoverComponent, AthPopoverTriggerDirective],
  template: `
    <button type="button" class="opener" (click)="open.set(true)">Open</button>
    <button type="button" class="beside">On the page</button>
    <ath-sheet
      [open]="open()"
      ariaLabel="ATL-12 Export invoices"
      width="560px"
      top="48px"
      [autoFocus]="focus()"
      (closed)="closedCount = closedCount + 1"
      (openChange)="changes.push($event)"
    >
      <button type="button" class="inside">Assignee</button>
      <button type="button" class="pop-trigger" [athPopoverTrigger]="pop">More</button>
      <ath-popover #pop ariaLabel="More"
        ><button type="button" class="pop-btn">Delete</button></ath-popover
      >
    </ath-sheet>
  `,
})
class SheetHostComponent {
  readonly open = signal(false);
  readonly focus = signal<SheetAutoFocus>('panel');
  closedCount = 0;
  readonly changes: boolean[] = [];
}

const wait = (): Promise<void> => new Promise((r) => setTimeout(r));

describe('AthSheetComponent', () => {
  let fixture: ComponentFixture<SheetHostComponent>;
  let host: SheetHostComponent;
  let root: HTMLElement;
  const q = <T extends HTMLElement = HTMLElement>(sel: string): T | null =>
    root.querySelector<T>(sel);
  const panel = (): HTMLElement | null => q('.ath-sheet');

  function openSheet(): HTMLElement {
    const opener = q('.opener')!;
    opener.focus();
    opener.click();
    fixture.detectChanges();
    return panel()!;
  }

  function key(target: EventTarget, k: string): KeyboardEvent {
    const event = new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true });
    target.dispatchEvent(event);
    fixture.detectChanges();
    return event;
  }

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({ imports: [SheetHostComponent] }).createComponent(
      SheetHostComponent
    );
    host = fixture.componentInstance;
    root = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('renders nothing while closed', () => {
    expect(panel()).toBeNull();
    expect(TestBed.inject(AthOverlayStack).size).toBe(0);
  });

  it('opens as a named, non-modal dialog in the top layer at the inline end', () => {
    const el = openSheet();
    expect(el.getAttribute('role')).toBe('dialog');
    expect(el.getAttribute('aria-modal')).toBe('false');
    expect(el.getAttribute('aria-label')).toBe('ATL-12 Export invoices');
    expect(el.matches(':popover-open')).toBe(true);
    // Layout, not the box: the slide-in animation moves the box for 220ms.
    const cs = getComputedStyle(el);
    expect(cs.position).toBe('fixed');
    expect(cs.top).toBe('48px');
    expect(cs.right).toBe('0px');
    expect(cs.bottom).toBe('0px');
    expect(cs.width).toBe(`${Math.min(560, document.documentElement.clientWidth)}px`);
    expect(TestBed.inject(AthOverlayStack).size).toBe(1);
  });

  it('moves focus into the sheet on open and back to the opener on close', () => {
    const el = openSheet();
    expect(document.activeElement).toBe(el);
    q<HTMLButtonElement>('.inside')!.focus();
    host.open.set(false);
    fixture.detectChanges();
    expect(panel()).toBeNull();
    expect(document.activeElement).toBe(q('.opener'));
  });

  it('with autoFocus="first" focuses the first control', () => {
    host.focus.set('first');
    openSheet();
    expect(document.activeElement).toBe(q('.inside'));
  });

  it('leaves focus where the reader moved it on the page', () => {
    openSheet();
    q<HTMLButtonElement>('.beside')!.focus();
    host.open.set(false);
    fixture.detectChanges();
    expect(document.activeElement).toBe(q('.beside'));
  });

  it('asks to close on Escape and stays open until the parent agrees', () => {
    const el = openSheet();
    const event = key(el, 'Escape');
    expect(event.defaultPrevented).toBe(true);
    expect(host.closedCount).toBe(1);
    expect(host.changes).toEqual([false]);
    // Controlled: still open.
    expect(panel()).not.toBeNull();
    host.open.set(false);
    fixture.detectChanges();
    expect(panel()).toBeNull();
    expect(TestBed.inject(AthOverlayStack).size).toBe(0);
  });

  it('is not closed by a press on the page beside it (non-modal)', () => {
    openSheet();
    q('.beside')!.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
    fixture.detectChanges();
    expect(host.closedCount).toBe(0);
    expect(panel()).not.toBeNull();
  });

  it('lets a popover opened inside take Escape first', async () => {
    openSheet();
    q<HTMLButtonElement>('.pop-trigger')!.click();
    fixture.detectChanges();
    await wait();
    const popPanel = q('.ath-popover__panel')!;
    expect(popPanel).not.toBeNull();
    key(popPanel, 'Escape');
    expect(q('.ath-popover__panel')).toBeNull();
    expect(host.closedCount).toBe(0);
    key(panel()!, 'Escape');
    expect(host.closedCount).toBe(1);
  });
});
