import { signal, type Provider } from '@angular/core';
import { ATH_DEFAULT_LABELS, ATH_LABELS, type AthLabels } from '@athenos/webcomponents/core';

/**
 * `ATH_LABELS` for the catalogue: the toolbar's "Labels" global switches
 * between the English defaults and German, so a story shows that every word
 * the library puts on screen (or reads to assistive tech) comes from the
 * provider. A missing key here is a type error.
 */
const DE: AthLabels = {
  closeDialog: () => 'Dialog schließen',
  showPassword: () => 'Passwort anzeigen',
  hidePassword: () => 'Passwort verbergen',
  breadcrumb: () => 'Brotkrumen',
  breadcrumbMore: () => 'Ausgeblendete Schritte',
  unassigned: () => 'Nicht zugewiesen',
  dismiss: () => 'Schließen',
  retry: () => 'Erneut versuchen',
  loading: () => 'Wird geladen',
  removeItem: () => '{name} entfernen',
  moreCount: () => '{count} weitere',
  dueOverdue: () => '{count} T. überfällig',
  dueOverdueOne: () => '{count} T. überfällig',
  dueToday: () => 'Heute',
  dueTomorrow: () => 'Morgen',
  dueInDays: () => '{count} T.',
  dueOn: () => 'Fällig {date}',
  dueSprintEnd: () => 'Sprint-Ende',
  dueSprintTooltip: () => 'Fällig mit {sprint}',
  dueAfterSprint: () => 'Fällig nach dem Sprint-Ende',
  listboxSearch: () => 'Suchen',
  listboxNoMatches: () => 'Keine Treffer',
  listboxCreate: () => '„{query}“ anlegen',
  listboxOtherGroup: () => 'Weitere',
  pickerPlaceholder: () => 'Auswählen…',
  pickerClear: () => 'Auswahl löschen',
  pickerSelected: () => '{count} ausgewählt',
  clearSearch: () => 'Suche löschen',
  clearFilter: () => 'Filter {name} entfernen',
  sidebarExpand: () => 'Seitenleiste ausklappen',
  sidebarCollapse: () => 'Seitenleiste einklappen',
  pageFirst: () => 'Erste Seite',
  pagePrevious: () => 'Vorherige Seite',
  pageNext: () => 'Nächste Seite',
  pageLast: () => 'Letzte Seite',
  pageNumber: () => 'Seite {page}',
  previous: () => 'Zurück',
  next: () => 'Weiter',
  copy: () => 'Kopieren',
  copied: () => 'Kopiert',
  copyCode: () => 'Code kopieren',
  fileDropPrompt: () => 'Dateien ablegen oder zum Auswählen klicken',
  userPickerPlaceholder: () => 'Person wählen',
  userPickerSearch: () => 'Personen suchen',
  internal: () => 'intern',
  internalNote: () => 'Interne Notiz',
  triStateDeny: () => 'Verbieten',
  triStateInherit: () => 'Erben',
  triStateAllow: () => 'Erlauben',
  triStateInheritAllowed: () => 'Erben (aktuell erlaubt)',
  triStateInheritDenied: () => 'Erben (aktuell verboten)',
  saveBarMessage: () => 'Du hast ungespeicherte Änderungen',
  saveBarSave: () => 'Speichern',
  saveBarDiscard: () => 'Verwerfen',
  saveBarConfirmDiscard: () => 'Wirklich verwerfen?',
  colorPicker: () => 'Farbe',
  colorNeutral: () => 'Grau',
  colorBlue: () => 'Blau',
  colorGreen: () => 'Grün',
  colorAmber: () => 'Bernstein',
  colorRed: () => 'Rot',
  colorPurple: () => 'Lila',
  colorPink: () => 'Pink',
  roleLocked: () => 'Feste Rolle',
  selectPlaceholder: () => 'Option wählen',
  searchPlaceholder: () => 'Suchen…',
  toastDismiss: () => 'Benachrichtigung schließen: {message}',
  toastRegion: () => 'Benachrichtigungen',
};

export type LabelLocale = 'en' | 'de';

/** Set by the preview decorator from the `labels` global. */
export const labelLocale = signal<LabelLocale>('en');

const TABLES: Record<LabelLocale, AthLabels> = { en: ATH_DEFAULT_LABELS, de: DE };

/** Every member reads the signal, like an app provider that follows the UI language. */
export function provideStorybookLabels(): Provider {
  const labels = {} as Record<keyof AthLabels, () => string>;
  for (const key of Object.keys(ATH_DEFAULT_LABELS) as (keyof AthLabels)[]) {
    labels[key] = () => TABLES[labelLocale()][key]();
  }
  const value: AthLabels = labels;
  return { provide: ATH_LABELS, useValue: value };
}
