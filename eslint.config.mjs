// @ts-check
// ESLint for @athenos/webcomponents. The rules live in config/eslint.shared.mjs
// (canonical copy; athenos-web holds a byte-identical one, drift-checked by
// `npm run lint:shared`). This file only says what is lib-specific.
// Baseline: eslint-suppressions.json — see artifacts/quality/phase1/LINT.md.
import { athenosEslint } from './config/eslint.shared.mjs';

const nonSpec = ['**/*.spec.ts', '**/*.stories.ts'];

/**
 * Signal APIs only (quality step 4.1, guideline A2), lib-only until the app
 * is migrated (4.1b/c). `@angular-eslint/prefer-signals` (angular-eslint 19,
 * step 4.2) reports decorator inputs and queries and signal fields that are
 * not `readonly`. The import ban below stays: it also covers `@Output`,
 * `EventEmitter`, `@HostBinding`, `@HostListener`, `NgZone` and
 * `ChangeDetectorRef`, which the rule does not see. A remaining `NgZone` or
 * `ChangeDetectorRef` needs an
 * `eslint-disable-next-line no-restricted-imports -- <reason>`.
 */
const SIGNAL_APIS = {
  Input:
    'input() / input.required() (with booleanAttribute or numberAttribute for bare attributes)',
  Output: 'output(), or model() for a two-way [(x)] pair',
  EventEmitter: 'output()',
  HostBinding: "host: { '[attr.x]': 'x()' } in the component metadata",
  HostListener: "host: { '(event)': 'onEvent($event)' } in the component metadata",
  ViewChild: 'viewChild() / viewChild.required()',
  ViewChildren: 'viewChildren()',
  ContentChild: 'contentChild()',
  ContentChildren: 'contentChildren()',
  ChangeDetectorRef:
    'signal state, which OnPush and zoneless views follow without markForCheck/detectChanges',
  NgZone: 'nothing (zoneless-ready): signals and listeners schedule change detection',
};

export default [
  ...athenosEslint({
    rootDir: import.meta.dirname,
    prefix: 'ath',
    selectorSeverity: 'error',
    files: ['projects/**/*.ts'],
    templates: ['projects/**/*.html'],
    restrictedSyntax: [
      { files: ['projects/**/*.ts'], ignores: nonSpec, use: ['allowSignalWrites', 'asUnknownAs'] },
      { files: nonSpec, use: ['allowSignalWrites'] },
    ],
    // The light `core` entry point is built on its own (ng-packagr secondary
    // entry): it must not reach into the main entry's sources.
    elements: [
      { type: 'core', pattern: 'projects/athenos-webcomponents/core' },
      { type: 'lib', pattern: 'projects/athenos-webcomponents/src' },
    ],
    policies: [
      {
        from: { element: { type: 'core' } },
        disallow: { to: { element: { type: 'lib' } } },
        message:
          '@athenos/webcomponents/core must not import from the main entry point (secondary entry builds alone).',
      },
    ],
  }),
  {
    files: ['projects/**/*.ts'],
    rules: {
      '@angular-eslint/prefer-output-readonly': 'error',
      '@angular-eslint/prefer-signals': 'error',
      '@angular-eslint/no-queries-metadata-property': 'error',
      '@angular-eslint/no-attribute-decorator': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: Object.entries(SIGNAL_APIS).map(([name, instead]) => ({
            name: '@angular/core',
            importNames: [name],
            message: `\`${name}\`: use ${instead} (A2, quality step 4.1).`,
          })),
        },
      ],
    },
  },
];
