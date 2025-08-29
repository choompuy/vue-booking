import { defineStore } from 'pinia'

const switchTheme = (isLight: boolean) => {
    if (isLight) {
        document.documentElement.classList.add('dark-mode')
    } else {
        document.documentElement.classList.remove('dark-mode')
    }
}

export const useThemeStore = defineStore('theme', {
    state: () => ({
        darkMode: localStorage.getItem('darkMode') === 'true',
    }),

    actions: {
        toggleTheme() {
            this.darkMode = !this.darkMode
            localStorage.setItem('darkMode', String(this.darkMode))

            switchTheme(this.darkMode)
        },

        initTheme() {
            switchTheme(this.darkMode)
        },
    },
})
