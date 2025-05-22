
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../translations/en.json';
import mkTranslation from '../translations/mk.json';

// Define available languages
export const languages = {
  en: { nativeName: 'English', flag: '🇬🇧' },
  mk: { nativeName: 'Македонски', flag: '🇲🇰' }
};

type LanguageContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    // Initialize i18n once when component mounts
    if (!i18n.isInitialized) {
      i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          resources: {
            en: {
              translation: enTranslation
            },
            mk: {
              translation: mkTranslation
            }
          },
          lng: language,
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false // React already escapes values
          }
        });
    }

    // Ensure the language is set correctly on initial load
    if (i18n.language !== language) {
      changeLanguage(language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
