import { defineStore } from 'pinia'
import moment from 'moment'
import { i18n } from '.'
import type { Locale } from './i18nTypes'

const changeLang = (newLang: Locale) => {
    moment.locale(newLang)
    i18n.global.locale.value = newLang
    document.documentElement.setAttribute('lang', newLang)
}

export const useI18nStore = defineStore('i18n', {
    state: () => ({
        lang: (localStorage.getItem('lang') as Locale) || 'en',
    }),

    actions: {
        setLang(newLang: Locale) {
            this.lang = newLang
            localStorage.setItem('lang', newLang)
            changeLang(newLang)
        },

        initLang() {
            changeLang(this.lang)
        },
    },
})
