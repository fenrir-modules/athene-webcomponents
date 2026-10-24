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
    protected readonly labels: import("dist/athene-webcomponents/core/labels").AthLabels;
    readonly code: import("@angular/core").InputSignal<string>;
    readonly language: import("@angular/core").InputSignal<string | null>;
    /** Optional filename to display next to the language label. */
    readonly filename: import("@angular/core").InputSignal<string | null>;
    /** Show line numbers down the left gutter. */
    readonly showLineNumbers: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Hide the copy button (e.g., for short read-only snippets). */
    readonly copyable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected readonly copyIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly checkIcon: import("node_modules/lucide-angular/icons/types").LucideIconData;
    protected readonly copied: import("@angular/core").WritableSignal<boolean>;
    private resetTimer;
    protected readonly lines: import("@angular/core").Signal<string[]>;
    constructor();
    copy(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthCodeBlockComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthCodeBlockComponent, "ath-code-block", never, { "code": { "alias": "code"; "required": true; "isSignal": true; }; "language": { "alias": "language"; "required": false; "isSignal": true; }; "filename": { "alias": "filename"; "required": false; "isSignal": true; }; "showLineNumbers": { "alias": "showLineNumbers"; "required": false; "isSignal": true; }; "copyable": { "alias": "copyable"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
