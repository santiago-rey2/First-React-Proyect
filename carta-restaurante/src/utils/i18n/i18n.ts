import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from './locale/en/en.json'
import es from './locale/es/es.json'
import pt from './locale/pt/pt.json'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  },
  pt: {
    translation: pt
  }
};

i18n
    .use(LanguageDetector) // Detects user language
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "es",
        interpolation: {
        escapeValue: false // react already safes from xss
        },
        detection: { // Detects user language
            order: ["navigator", "htmlTag", "path", "subdomain"], // Order of detection
            caches: ["localStorage", "cookie"], // Caches
        },
    });

    export default i18n;