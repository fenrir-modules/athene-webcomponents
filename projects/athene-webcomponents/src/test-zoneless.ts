// Test entry of the zoneless run (quality step 4.1): `npm run test:zoneless`.
//
// The same specs as `npm test`, but without zone.js in the bundle and with
// `provideExperimentalZonelessChangeDetection()` in every TestBed: change
// detection runs only when a signal, a listener, `markForCheck` or
// `setInput` asks for it, as in a zoneless app. A component that only
// updates because zone.js happened to tick fails here. `fakeAsync` needs
// zone.js and is not available in this run; use `async`/`await` with
// `fixture.whenStable()` or `jasmine.clock()` instead.
import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

@NgModule({ providers: [provideExperimentalZonelessChangeDetection()] })
class ZonelessTestingModule {}

getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, ZonelessTestingModule],
  platformBrowserDynamicTesting(),
  { errorOnUnknownElements: true, errorOnUnknownProperties: true }
);
