import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation } from '@angular/router';
import { applicationConfig, type Decorator, type Preview } from '@storybook/angular';
import { ATH_DATE_CONTEXT } from '@athene/webcomponents';
import { labelLocale, provideStorybookLabels, type LabelLocale } from './labels';

// Global styles (fonts, main.scss with the generated tokens) come from the
// `styles` option of the Storybook targets in angular.json.

const ACCENTS = ['default', 'violet', 'blue', 'green', 'orange', 'neutral'] as const;

/**
 * Theme, accent, writing direction and label language on <html>, the same
 * place the app's theme boot puts them. Set synchronously before the story
 * renders (addon-themes' decorator sets the attribute in an effect after the
 * first render, so axe could measure a half-switched page). Light sets
 * data-theme="light" explicitly; the tokens match it like :root. `default`
 * removes `data-accent` (the token default, violet).
 */
const withDocumentGlobals: Decorator = (storyFn, context) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', context.globals['theme'] === 'dark' ? 'dark' : 'light');
  const accent = String(context.globals['accent'] ?? 'default');
  if (accent === 'default') root.removeAttribute('data-accent');
  else root.setAttribute('data-accent', accent);
  root.setAttribute('dir', context.globals['dir'] === 'rtl' ? 'rtl' : 'ltr');
  const locale: LabelLocale = context.globals['labels'] === 'de' ? 'de' : 'en';
  root.setAttribute('lang', locale);
  labelLocale.set(locale);
  return storyFn();
};

const preview: Preview = {
  // 'visual': screenshot comparison in tests/storybook; a story opts out with tags: ['!visual'].
  tags: ['autodocs', 'visual'],
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        // ath-nav-item, ath-breadcrumb and linked KPI tiles use routerLink.
        provideRouter([], withHashLocation()),
        provideStorybookLabels(),
        {
          provide: ATH_DATE_CONTEXT,
          useValue: () => ({ locale: labelLocale() === 'de' ? 'de-DE' : 'en-GB', timeZone: 'UTC' }),
        },
      ],
    }),
    withDocumentGlobals,
  ],
  globalTypes: {
    theme: {
      description: 'Colour theme (data-theme)',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    accent: {
      description: 'Accent preset (data-accent)',
      toolbar: { title: 'Accent', icon: 'paintbrush', items: [...ACCENTS], dynamicTitle: true },
    },
    dir: {
      description: 'Writing direction',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
        dynamicTitle: true,
      },
    },
    labels: {
      description: 'ATH_LABELS language',
      toolbar: {
        title: 'Labels',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English (defaults)' },
          { value: 'de', title: 'Deutsch' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light', accent: 'default', dir: 'ltr', labels: 'en' },
  parameters: {
    layout: 'padded',
    // The page background is the token `--bg-0` via the theme, not a swatch.
    backgrounds: { disable: true },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // The Accessibility panel shows axe results while browsing; the same
    // rules fail `npm run test:storybook` (see tests/storybook). 'todo'
    // only warns, 'off' skips a story; give a reason next to either.
    a11y: { test: 'error' },
  },
};

export default preview;
