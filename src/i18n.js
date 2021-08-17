import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

import vn from './asset/translation/vn.json'
import en from './asset/translation/en.json'

i18n.use(Backend)
    .use(LanguageDetector) // passes i18n down to react-i18next
    .use(initReactI18next)
    .init({
        // resources,
        fallbackLng: 'vn',
        debug: false,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    })

i18n.addResourceBundle('vn', 'translation', vn, true, true)
i18n.addResourceBundle('en', 'translation', en, true, true)

export default i18n