import { ErrorHandler } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { AthButtonComponent } from './button.component';
import { runAthAction } from './button.action';

describe('AthButtonComponent', () => {
  let fixture: ComponentFixture<AthButtonComponent>;
  let errorHandler: jasmine.SpyObj<ErrorHandler>;
  const inner = () => (fixture.nativeElement as HTMLElement).querySelector('button')!;

  beforeEach(async () => {
    errorHandler = jasmine.createSpyObj<ErrorHandler>('ErrorHandler', ['handleError']);
    await TestBed.configureTestingModule({
      imports: [AthButtonComponent],
      providers: [{ provide: ErrorHandler, useValue: errorHandler }],
    }).compileComponents();
    fixture = TestBed.createComponent(AthButtonComponent);
    fixture.detectChanges();
  });

  it('omits aria-pressed / aria-expanded unless set', () => {
    expect(inner().hasAttribute('aria-pressed')).toBeFalse();
    expect(inner().hasAttribute('aria-expanded')).toBeFalse();
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
    it('runs once per busy period: a double click does not submit twice (QA-13)', fakeAsync(() => {
      let resolve!: () => void;
      const action = jasmine
        .createSpy('action')
        .and.callFake(() => new Promise<void>((r) => (resolve = r)));
      fixture.componentRef.setInput('action', action);
      fixture.detectChanges();
      inner().click();
      inner().click();
      fixture.detectChanges();
      expect(action).toHaveBeenCalledTimes(1);
      expect(inner().disabled).toBeTrue();
      expect(inner().getAttribute('aria-busy')).toBe('true');
      expect(inner().querySelector('.ath-button__loader')).not.toBeNull();
      resolve();
      flushMicrotasks();
      fixture.detectChanges();
      expect(inner().disabled).toBeFalse();
      expect(inner().querySelector('.ath-button__loader')).toBeNull();
      inner().click();
      expect(action).toHaveBeenCalledTimes(2);
    }));

    it('stays busy until an Observable emits', fakeAsync(() => {
      const result = new Subject<number>();
      const done = jasmine.createSpy('done');
      fixture.componentInstance.done.subscribe(done);
      fixture.componentRef.setInput('action', () => result);
      fixture.detectChanges();
      inner().click();
      fixture.detectChanges();
      expect(fixture.componentInstance.busy()).toBeTrue();
      result.next(7);
      flushMicrotasks();
      fixture.detectChanges();
      expect(fixture.componentInstance.busy()).toBeFalse();
      expect(done).toHaveBeenCalledWith(7);
      expect(result.observed).toBeFalse();
    }));

    it('reports a failure and becomes usable again', fakeAsync(() => {
      const failed = jasmine.createSpy('failed');
      fixture.componentInstance.failed.subscribe(failed);
      fixture.componentRef.setInput('action', () => throwError(() => new Error('nope')));
      fixture.detectChanges();
      inner().click();
      flushMicrotasks();
      fixture.detectChanges();
      expect(failed).toHaveBeenCalled();
      expect(errorHandler.handleError.calls.count()).toBe(1);
      expect(inner().disabled).toBeFalse();
    }));

    it('blocks a busy submit button from submitting its form', fakeAsync(() => {
      fixture.componentRef.setInput('type', 'submit');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();
      const event = new MouseEvent('click', { cancelable: true });
      fixture.componentInstance.handleClick(event);
      expect(event.defaultPrevented).toBeTrue();
    }));
  });
});

describe('runAthAction', () => {
  it('settles for promises, observables and plain returns', async () => {
    await expectAsync(runAthAction(() => Promise.resolve(1))).toBeResolvedTo(1);
    await expectAsync(runAthAction(() => of(2, 3))).toBeResolvedTo(2);
    await expectAsync(runAthAction(() => undefined)).toBeResolved();
    await expectAsync(
      runAthAction(() => {
        throw new Error('sync');
      })
    ).toBeRejected();
  });
});
