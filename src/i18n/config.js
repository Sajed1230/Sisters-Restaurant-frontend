import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from './locales/en.json'
import arTranslations from './locales/ar.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ar: {
        translation: arTranslations
      }
    },
    fallbackLng: 'ar',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    }
  })

// Update document direction and language when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr'
})

// Set initial direction
if (i18n.language) {
  document.documentElement.lang = i18n.language
  document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
}

export default i18n

