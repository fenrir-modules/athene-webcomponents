import { type Observable, firstValueFrom, isObservable } from 'rxjs';

/**
 * Work a button (or an alert's retry) starts: a function returning a
 * Promise, an Observable or nothing. While it runs the button is busy:
 * disabled, a spinner, further clicks ignored (exhaust semantics).
 */
export type AthAction = () => Promise<unknown> | Observable<unknown> | void;

/**
 * Runs an action and settles when it does: a Promise when it resolves or
 * rejects, an Observable on its first value, completion or error (so a
 * long-lived stream does not keep the button busy), anything else at once.
 * A synchronous throw rejects.
 */
export function runAthAction(action: AthAction): Promise<unknown> {
  return new Promise<unknown>((resolve) => {
    const result = action();
    resolve(isObservable(result) ? firstValueFrom(result, { defaultValue: undefined }) : result);
  });
}
