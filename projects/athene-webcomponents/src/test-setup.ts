// Vitest setup for every spec (angular.json, test.options.setupFiles).
//
// Jasmine removed each `spyOn` spy after its test; Vitest keeps a
// `vi.spyOn` spy until it is restored. Without this, a spy would leak into
// the next test, in any file (the files share one page, as under Karma).
afterEach(() => {
  vi.restoreAllMocks();
});
