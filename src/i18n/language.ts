import { createContext, useContext } from 'react';
import { translations, type Strings } from '../data/locales';

export type Lang = 'en' | 'hi';

export interface LocalizedText<T = string> {
  en: T;
  hi?: T;
}

/** Picks the Hindi version when it exists, so a missing translation falls back to English. */
export const pickText = <T,>(text: LocalizedText<T>, lang: Lang): T =>
  lang === 'hi' && text.hi !== undefined ? text.hi : text.en;

/** Fills {placeholders} in a translated string. */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));

export const LANGUAGE_STORAGE_KEY = 'safeindia-language';

export interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Strings;
  pick: <T>(text: LocalizedText<T>) => T;
}

export const LanguageContext = createContext<LanguageValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  pick: (text) => text.en,
});

export const useLanguage = () => useContext(LanguageContext);
