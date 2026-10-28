// @ts-check
// Shared ESLint flat config for the Athenos frontend (quality step 1.3).
//
// CANONICAL COPY: athenos-webcomponents/config/eslint.shared.mjs
// athenos-web keeps a byte-identical copy at the same path; `npm run lint:shared`
// (scripts/shared-config.mjs) fails when the two drift. Edit it here, in the
// lib, then copy it over: `node scripts/shared-config.mjs --copy-to ../athenos-web`.
//
// Each repo's eslint.config.mjs calls athenosEslint({...}) with its own prefix,
// boundary elements and restricted-syntax groups. Existing violations are
// frozen in eslint-suppressions.json (ESLint bulk suppressions); see
// artifacts/quality/phase1/LINT.md for the burn-down workflow.
import angular from 'angular-eslint';
import boundaries from 'eslint-plugin-boundaries';
import tseslint from 'typescript-eslint';

/**
 * Architecture rules expressed as AST selectors (no-restricted-syntax).
 * A repo picks the ones it needs per file group; see `restrictedSyntax` below.
 */
export const RESTRICTED_SYNTAX = {
  allowSignalWrites: {
    selector: "Property[key.name='allowSignalWrites']",
    message:
      'allowSignalWrites: no state writes inside effect(); derive with computed() or write in the event handler (Q-081).',
  },
  asUnknownAs: {
    selector:
      "TSAsExpression[expression.type='TSAsExpression'][expression.typeAnnotation.type='TSUnknownKeyword']",
    message:
      '`as unknown as T` hides a type mismatch; fix the type, narrow with a guard, or use a generated contract type.',
  },
  newApiClient: {
    selector: 'NewExpression[callee.name=/ApiClient$/]',
    message:
      'API clients are constructed in core/ data services only; inject the core service instead (FE-12, 1.9a).',
  },
  athSelector: {
    selector:
      "Decorator[expression.callee.name=/^(Component|Directive)$/] Property[key.name='selector'] > Literal[value=/(^|[\\s,(:\\[])ath-|\\[ath[A-Z]/]",
    message:
      'The `ath-` prefix belongs to @athenos/webcomponents; app selectors use `app-` (FE-13, codemod in 2.0).',
  },
};

/**
 * `athenos/no-instant-in-computed` (FE-08, ADR 1.9a rule 6): a `computed()`
 * that calls `translate.instant(…)` reads no signal for the language, so its
 * label stays in the old language after a switch. Use `t()` from
 * `injectT()` (@core/i18n), which tracks the loaded language.
 *
 * Reports `<x>.instant(…)` anywhere inside a `computed(…)` argument, and
 * calls to `this.<method>(…)` there when that method of the same class
 * calls `.instant(…)` itself (the `private t(key) { return
 * this.translate.instant(key) }` wrappers the pages use).
 */
const isComputedCall = (node) =>
  node.type === 'CallExpression' &&
  node.callee.type === 'Identifier' &&
  node.callee.name === 'computed';

const isInstantCall = (node) =>
  node.type === 'CallExpression' &&
  node.callee.type === 'MemberExpression' &&
  !node.callee.computed &&
  node.callee.property.type === 'Identifier' &&
  node.callee.property.name === 'instant';

/** Whether `.instant(` is called anywhere below `node` (own AST walk; `parent` links skipped). */
function callsInstant(node) {
  if (!node || typeof node.type !== 'string') return false;
  if (isInstantCall(node)) return true;
  for (const key of Object.keys(node)) {
    if (
      key === 'parent' ||
      key === 'loc' ||
      key === 'range' ||
      key === 'tokens' ||
      key === 'comments'
    )
      continue;
    const child = node[key];
    if (Array.isArray(child)) {
      if (child.some((c) => c && typeof c === 'object' && callsInstant(c))) return true;
    } else if (child && typeof child === 'object' && callsInstant(child)) {
      return true;
    }
  }
  return false;
}

const noInstantInComputed = {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow translate.instant inside computed(); use t() from injectT().' },
    schema: [],
    messages: {
      instant:
        '`instant()` in computed() does not follow a language switch; use `t()` from injectT() (@core/i18n, FE-08).',
      wrapper:
        '`this.{{name}}()` calls translate.instant, which computed() does not track; use `t()` from injectT() (@core/i18n, FE-08).',
    },
  },
  create(context) {
    /** Per class: the names of its methods that call `.instant(`. */
    const wrappers = [];
    let depth = 0;
    const methodName = (member) =>
      member.key && member.key.type === 'Identifier' && !member.computed ? member.key.name : null;
    return {
      ClassBody(node) {
        const names = new Set();
        for (const member of node.body) {
          const name = methodName(member);
          if (!name) continue;
          const fn =
            member.type === 'MethodDefinition'
              ? member.value
              : member.type === 'PropertyDefinition' &&
                  member.value &&
                  (member.value.type === 'ArrowFunctionExpression' ||
                    member.value.type === 'FunctionExpression')
                ? member.value
                : null;
          if (fn && callsInstant(fn.body)) names.add(name);
        }
        wrappers.push(names);
      },
      'ClassBody:exit'() {
        wrappers.pop();
      },
      CallExpression(node) {
        if (isComputedCall(node)) {
          depth++;
          return;
        }
        if (depth === 0) return;
        if (isInstantCall(node)) {
          context.report({ node: node.callee.property, messageId: 'instant' });
          return;
        }
        const callee = node.callee;
        const names = wrappers[wrappers.length - 1];
        if (
          names &&
          callee.type === 'MemberExpression' &&
          callee.object.type === 'ThisExpression' &&
          !callee.computed &&
          callee.property.type === 'Identifier' &&
          names.has(callee.property.name)
        ) {
          context.report({
            node: callee.property,
            messageId: 'wrapper',
            data: { name: callee.property.name },
          });
        }
      },
      'CallExpression:exit'(node) {
        if (isComputedCall(node)) depth--;
      },
    };
  },
};

/** Athenos's own lint rules. */
export const athenosPlugin = {
  meta: { name: 'athenos' },
  rules: { 'no-instant-in-computed': noInstantInComputed },
};

/**
 * @param {object} o
 * @param {string} o.rootDir           directory of the calling eslint.config.mjs (import.meta.dirname)
 * @param {string} o.prefix            component/directive selector prefix ('ath' | 'app')
 * @param {'error'|'warn'} [o.selectorSeverity]  severity of component-/directive-selector
 * @param {string[]} o.files           globs of the TS sources to lint
 * @param {string[]} o.templates       globs of the external templates
 * @param {string[]} [o.ignores]       global ignores
 * @param {Array<{files: string[], ignores?: string[], use: Array<keyof typeof RESTRICTED_SYNTAX>}>} o.restrictedSyntax
 *        no-restricted-syntax groups, applied in order (a later group replaces an earlier one
 *        for the files it matches, so list the most specific group last)
 * @param {object[]} [o.elements]      eslint-plugin-boundaries element types
 * @param {object[]} [o.fileCategories] eslint-plugin-boundaries file categories (boundaries/files)
 * @param {object[]} [o.policies]      eslint-plugin-boundaries policies (default: allow)
 */
export function athenosEslint({
  rootDir,
  prefix,
  selectorSeverity = 'error',
  files,
  templates,
  ignores = [],
  restrictedSyntax,
  elements = [],
  fileCategories = [],
  policies = [],
}) {
  return tseslint.config(
    {
      ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', '**/.angular/**', ...ignores],
    },
    {
      files,
      extends: [...tseslint.configs.recommendedTypeChecked, ...angular.configs.tsRecommended],
      processor: angular.processInlineTemplates,
      languageOptions: {
        parserOptions: { projectService: true, tsconfigRootDir: rootDir },
      },
      plugins: { boundaries, athenos: athenosPlugin },
      settings: {
        'import/resolver': {
          typescript: { alwaysTryTypes: true, project: `${rootDir}/tsconfig.json` },
        },
        'boundaries/elements': elements,
        'boundaries/files': fileCategories,
        'boundaries/include': files,
      },
      rules: {
        // Promises: the effect/void-promise patterns from QA-20.
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
        ],

        // Angular.
        '@angular-eslint/prefer-on-push-component-change-detection': 'error',
        '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component', 'Page'] }],
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/component-selector': [
          selectorSeverity,
          { type: 'element', prefix, style: 'kebab-case' },
        ],
        '@angular-eslint/directive-selector': [
          selectorSeverity,
          { type: 'attribute', prefix, style: 'camelCase' },
        ],

        // Import boundaries (FE-12). Default allow; the policies list what is forbidden.
        'boundaries/dependencies': ['error', { default: 'allow', policies }],

        // Translations in computed() follow the language (FE-08).
        'athenos/no-instant-in-computed': 'error',
      },
    },
    ...restrictedSyntax.map(({ files: groupFiles, ignores: groupIgnores, use }) => ({
      files: groupFiles,
      ...(groupIgnores ? { ignores: groupIgnores } : {}),
      rules: { 'no-restricted-syntax': ['error', ...use.map((k) => RESTRICTED_SYNTAX[k])] },
    })),
    {
      files: templates,
      extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
      rules: {},
    }
  );
}
