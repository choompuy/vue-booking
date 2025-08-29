import { defineStore } from 'pinia'
import { i18n } from './index'
import type { Locale } from './i18nTypes'

export const useI18nStore = defineStore('i18n', {
    state: () => ({
        lang: (localStorage.getItem('lang') as Locale) || 'en',
    }),

    actions: {
        setLang(newLang: Locale) {
            this.lang = newLang
            localStorage.setItem('lang', newLang)
            i18n.global.locale.value = newLang
            document.documentElement.setAttribute('lang', newLang)
        },

        initLang() {
            i18n.global.locale.value = this.lang
            document.documentElement.setAttribute('lang', this.lang)
        },
    },
})
