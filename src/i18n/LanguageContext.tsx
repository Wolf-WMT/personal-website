import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Language, type Translation, isRTL } from './translations';

interface LanguageContextValue {
  lang: Language;
  t: Translation;
  setLang: (lang: Language) => void;
  rtl: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem('language');
    if (stored === 'en' || stored === 'fa' || stored === 'ru') return stored;
    return 'en';
  });

  const rtl = isRTL(lang);
  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [lang, rtl]);

  const setLang = (next: Language) => setLangState(next);

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, rtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
