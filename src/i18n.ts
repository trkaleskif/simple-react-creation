
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "./translations/en.json";
import mkTranslation from "./translations/mk.json";

// Initialize i18next
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
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;
