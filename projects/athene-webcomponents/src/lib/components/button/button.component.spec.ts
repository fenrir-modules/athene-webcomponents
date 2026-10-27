import type { MockedObject } from 'vitest';
import { ErrorHandler } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { AthButtonComponent } from './button.component';
import { runAthAction } from './button.action';

/**
 * Lets pending promise callbacks run. A macrotask, not `fakeAsync`: the
 * zoneless run (`npm run test:zoneless`) has no zone.js.
 */
const settle = (): Promise<void> => new Promise((resolve) => setTimeout(resolve));

describe('AthButtonComponent', () => {
  let fixture: ComponentFixture<AthButtonComponent>;
  let errorHandler: Pick<MockedObject<ErrorHandler>, 'handleError'>;
  const inner = () => (fixture.nativeElement as HTMLElement).querySelector('button')!;

  beforeEach(async () => {
    errorHandler = {
      handleError: vi.fn().mockName('ErrorHandler.handleError'),
    };
    await TestBed.configureTestingModule({
      imports: [AthButtonComponent],
      providers: [{ provide: ErrorHandler, useValue: errorHandler }],
    }).compileComponents();
    fixture = TestBed.createComponent(AthButtonComponent);
    fixture.detectChanges();
  });

  it('omits aria-pressed / aria-expanded unless set', () => {
    expect(inner().hasAttribute('aria-pressed')).toBe(false);
    expect(inner().hasAttribute('aria-expanded')).toBe(false);
  });

  it('forwards pressed, expanded and controls to the inner button', () => {
    fixture.componentRef.setInput('pressed', true);
    fixture.componentRef.setInput('expanded', false);
    fixture.componentRef.setInput('controls', 'panel-1');
    fixture.detectChanges();
    expect(inner().getAttribute('aria-pressed')).toBe('true');
    expect(inner().getAttribute('aria-expanded')).toBe('false');
    expect(inner().getAttribute('aria-controls')).toBe('panel-1');
    expect(inner().classList).toContain('ath-button--pressed');
  });

  it('supports the xs size used by the topbar', () => {
    fixture.componentRef.setInput('size', 'xs');
    fixture.detectChanges();
    expect(inner().classList).toContain('ath-button--xs');
  });

  describe('[action]', () => {
    it('runs once per busy period: a double click does not submit twice (QA-13)', async () => {
      let resolve!: () => void;
      const action = vi
        .fn()
        .mockName('action')
        .mockImplementation(() => new Promise<void>((r) => (resolve = r)));
      fixture.componentRef.setInput('action', action);
      fixture.detectChanges();
      inner().click();
      inner().click();
      fixture.detectChanges();
      expect(action).toHaveBeenCalledTimes(1);
      expect(inner().disabled).toBe(true);
      expect(inner().getAttribute('aria-busy')).toBe('true');
      expect(inner().querySelector('.ath-button__loader')).not.toBeNull();
      resolve();
      await settle();
      fixture.detectChanges();
      expect(inner().disabled).toBe(false);
      expect(inner().querySelector('.ath-button__loader')).toBeNull();
      inner().click();
      expect(action).toHaveBeenCalledTimes(2);
    });

    it('stays busy until an Observable emits', async () => {
      const result = new Subject<number>();
      const done = vi.fn().mockName('done');
      fixture.componentInstance.done.subscribe(done);
      fixture.componentRef.setInput('action', () => result);
      fixture.detectChanges();
      inner().click();
      fixture.detectChanges();
      expect(fixture.componentInstance.busy()).toBe(true);
      result.next(7);
      await settle();
      fixture.detectChanges();
      expect(fixture.componentInstance.busy()).toBe(false);
      expect(done).toHaveBeenCalledWith(7);
      expect(result.observed).toBe(false);
    });

    it('reports a failure and becomes usable again', async () => {
      const failed = vi.fn().mockName('failed');
      fixture.componentInstance.failed.subscribe(failed);
      fixture.componentRef.setInput('action', () => throwError(() => new Error('nope')));
      fixture.detectChanges();
      inner().click();
      await settle();
      fixture.detectChanges();
      expect(failed).toHaveBeenCalled();
      expect(errorHandler.handleError).toHaveBeenCalledTimes(1);
      expect(inner().disabled).toBe(false);
    });

    // NG0953 (quality 2.5): an action that removes its own button (deleting
    // a doc navigates away; "Mark all read" hides the button) used to settle
    // after the destroy, and `done` was emitted on a destroyed component.
    it('emits nothing once destroyed while the action is pending (NG0953)', async () => {
      let resolve!: (value: number) => void;
      const done = vi.fn().mockName('done');
      fixture.componentInstance.done.subscribe(done);
      fixture.componentRef.setInput('action', () => new Promise<number>((r) => (resolve = r)));
      fixture.detectChanges();
      inner().click();
      fixture.destroy();
      resolve(1);
      await expect(settle()).resolves.toBeUndefined();
      expect(done).not.toHaveBeenCalled();
      expect(errorHandler.handleError).not.toHaveBeenCalled();
    });

    it('still reports a failure that settles after the destroy', async () => {
      let reject!: (err: unknown) => void;
      const failed = vi.fn().mockName('failed');
      fixture.componentInstance.failed.subscribe(failed);
      fixture.componentRef.setInput('action', () => new Promise<void>((_, r) => (reject = r)));
      fixture.detectChanges();
      inner().click();
      fixture.destroy();
      reject(new Error('late'));
      await expect(settle()).resolves.toBeUndefined();
      expect(failed).not.toHaveBeenCalled();
      expect(errorHandler.handleError).toHaveBeenCalledTimes(1);
    });

    it('blocks a busy submit button from submitting its form', () => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      const event = new MouseEvent('click', { cancelable: true });
      fixture.componentInstance.handleClick(event);
      expect(event.defaultPrevented).toBe(true);
    });
  });
});

describe('runAthAction', () => {
  it('settles for promises, observables and plain returns', async () => {
    await expect(runAthAction(() => Promise.resolve(1))).resolves.toEqual(1);
    await expect(runAthAction(() => of(2, 3))).resolves.toEqual(2);
    await expect(runAthAction(() => undefined)).resolves.toBeUndefined();
    await expect(
      runAthAction(() => {
        throw new Error('sync');
      })
    ).rejects.toThrow();
  });
});
