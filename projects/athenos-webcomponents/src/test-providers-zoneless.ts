// Providers of every TestBed in the zoneless run (quality step 4.1, W5-B):
// `npm run test:zoneless` (angular.json, test:zoneless → providersFile).
//
// The same specs as `npm test`, but without zone.js in the bundle (the
// `test-build:zoneless` configuration has no polyfills) and with
// `provideZonelessChangeDetection()` in every TestBed: change detection
// runs only when a signal, a listener, `markForCheck` or `setInput` asks
// for it, as in a zoneless app. A component that only updates because
// zone.js happened to tick fails here. `fakeAsync` needs zone.js and is
// not available in this run; use `async`/`await` with
// `fixture.whenStable()` or Vitest's fake timers (`vi.useFakeTimers()`).
import { provideZonelessChangeDetection } from '@angular/core';

export default [provideZonelessChangeDetection()];
