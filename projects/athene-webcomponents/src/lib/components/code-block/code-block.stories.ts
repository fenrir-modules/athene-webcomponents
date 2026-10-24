import type { Meta, StoryObj } from '@storybook/angular';
import { AthCodeBlockComponent } from './code-block.component';

const CODE = `export function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));`;

const meta: Meta<AthCodeBlockComponent> = {
  title: 'Display/Code block',
  component: AthCodeBlockComponent,
  args: { code: CODE, language: 'ts', filename: 'math.ts', showLineNumbers: true, copyable: true },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:560px"><ath-code-block [code]="code" [language]="language"
      [filename]="filename" [showLineNumbers]="showLineNumbers" [copyable]="copyable" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<AthCodeBlockComponent>;

export const Default: Story = {};
export const Plain: Story = {
  args: { filename: null, language: null, showLineNumbers: false, copyable: false },
};
export const LongLines: Story = {
  args: {
    code: `const url = '${'https://example.com/a/very/long/path/'.repeat(4)}';`,
    filename: 'long.ts',
  },
};
