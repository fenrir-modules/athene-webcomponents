import type { StorybookConfig } from '@storybook/angular';

// Component catalogue (quality steps 1.8a/1.8b). The Angular builder targets
// `athenos-webcomponents:storybook` / `:build-storybook` in angular.json carry
// the global styles (fonts, main.scss with the tokens) and the tsconfig.
const config: StorybookConfig = {
  stories: ['../projects/athenos-webcomponents/src/**/*.stories.ts'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
