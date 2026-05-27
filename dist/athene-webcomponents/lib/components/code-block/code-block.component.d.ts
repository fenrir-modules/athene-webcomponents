import * as i0 from "@angular/core";
/**
 * Code block with optional language label + copy-to-clipboard button.
 *
 * Heavy syntax highlighting is **intentionally not bundled** to keep the
 * library small. Consumers can layer highlight.js or Prism on top by
 * targeting `pre code`. The default rendering is a clean monospace block.
 *
 * @example
 * <ath-code-block language="bash" code="curl https://api.athene.dev/v1/me" />
 * <ath-code-block language="rust" [code]="snippet" [filename]="'main.rs'" />
 */
export declare class AthCodeBlockComponent {
    code: string;
    language: string | null;
    /** Optional filename to display next to the language label. */
    filename: string | null;
    /** Show line numbers down the left gutter. */
    showLineNumbers: boolean;
    /** Hide the copy button (e.g., for short read-only snippets). */
    copyable: boolean;
    protected readonly copyIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly checkIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly copied: import("@angular/core").WritableSignal<boolean>;
    get hostLang(): string | null;
    protected get lines(): string[];
    copy(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthCodeBlockComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthCodeBlockComponent, "ath-code-block", never, { "code": { "alias": "code"; "required": true; }; "language": { "alias": "language"; "required": false; }; "filename": { "alias": "filename"; "required": false; }; "showLineNumbers": { "alias": "showLineNumbers"; "required": false; }; "copyable": { "alias": "copyable"; "required": false; }; }, {}, never, never, true, never>;
}
