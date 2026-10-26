import * as i0 from "@angular/core";
/** Avatar sizes; each reads its `--avatar-<size>` token. */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** Who an avatar shows. `id` is the stable key of the colour tone. */
export interface AthPerson {
    id?: string | null;
    name?: string | null;
    src?: string | null;
}
/**
 * A person as an avatar (image, else initials on a per-person tone), or an
 * empty seat: the soft grey circle with a user glyph, the same size as a
 * person, titled "Unassigned". One symbol for "nobody" everywhere (DS-09).
 *
 * The tone is keyed on the person's stable id, so two people with the same
 * initials differ and one person keeps a colour wherever they appear.
 *
 * @example
 * <ath-avatar [person]="{ id: user.id, name: user.name, src: user.avatar_url }" size="sm" />
 * <ath-avatar [person]="assignee ?? null" size="sm" />   <!-- null → empty seat -->
 * <ath-avatar [unassigned]="true" size="sm" />
 * <ath-avatar name="Mira Voss" />                         <!-- legacy: tone from initials -->
 * <ath-avatar [person]="member" ring="blue" />            <!-- ring in the role's colour -->
 */
export declare class AthAvatarComponent {
    private readonly labels;
    /**
     * The person. `null` draws the empty seat; leave it unset to use the
     * separate `name` / `src` / `id` inputs.
     */
    readonly person: import("@angular/core").InputSignal<AthPerson | null | undefined>;
    /** Display name (initials and accessible name) when `person` is not used. */
    readonly name: import("@angular/core").InputSignal<string | null | undefined>;
    /** Image URL when `person` is not used. */
    readonly src: import("@angular/core").InputSignal<string | null | undefined>;
    /** Stable id for the tone when `person` is not used. */
    readonly id: import("@angular/core").InputSignal<string | null | undefined>;
    readonly size: import("@angular/core").InputSignal<AvatarSize>;
    /** Draw the empty seat regardless of the other inputs. */
    readonly unassigned: import("@angular/core").InputSignal<boolean>;
    /** Accessible name and tooltip; defaults to the name or the "Unassigned" label. */
    readonly label: import("@angular/core").InputSignal<string | null>;
    /**
     * A ring in a palette colour (`AthDecoColor`): the person's role colour
     * in member lists and pickers. Decorative; the role's name is shown or
     * read elsewhere. `null` (or an unknown token): no ring.
     */
    readonly ring: import("@angular/core").InputSignal<string | null | undefined>;
    protected readonly userIcon: import("lucide").IconNode;
    private readonly failedSrc;
    private readonly who;
    protected readonly empty: import("@angular/core").Signal<boolean>;
    protected readonly initials: import("@angular/core").Signal<string>;
    protected readonly tone: import("@angular/core").Signal<number | null>;
    protected readonly image: import("@angular/core").Signal<string | null>;
    protected readonly ringColor: import("@angular/core").Signal<import("../color-swatch/deco-color").AthDecoColor | null>;
    protected readonly iconSize: import("@angular/core").Signal<number>;
    protected readonly accessibleName: import("@angular/core").Signal<string | null>;
    /**
     * Tooltip: shown for the empty seat and whenever the avatar was given a
     * person or an explicit label; a bare `name` keeps the old behaviour of
     * no tooltip (the name usually sits next to it).
     */
    protected readonly tooltip: import("@angular/core").Signal<string | null>;
    protected onImageError(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AthAvatarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AthAvatarComponent, "ath-avatar", never, { "person": { "alias": "person"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; "src": { "alias": "src"; "required": false; "isSignal": true; }; "id": { "alias": "id"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "unassigned": { "alias": "unassigned"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "ring": { "alias": "ring"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
