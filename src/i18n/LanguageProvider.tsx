import React, { useEffect, useMemo, useState } from 'react';
import { translations } from '../data/locales';
import { LanguageContext, LANGUAGE_STORAGE_KEY, pickText, type Lang } from './language';

const readSavedLanguage = (): Lang => {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'hi' ? 'hi' : 'en';
  } catch {
    // Storage can be blocked (private mode); English is the safe default
    return 'en';
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(readSavedLanguage);

  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Not saved; the choice still applies for this visit
    }
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang], pick: <T,>(text: { en: T; hi?: T }) => pickText(text, lang) }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
