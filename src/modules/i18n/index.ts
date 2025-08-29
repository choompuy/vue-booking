import { createI18n } from 'vue-i18n'
import type { Locale } from './i18nTypes'
import en from './locales/en.json'
import ru from './locales/ru.json'

export const i18n = createI18n({
    legacy: false,
    locale: (localStorage.getItem('lang') as Locale) || 'en',
    fallbackLocale: 'en',
    messages: { en, ru },
})
