import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './modules/i18n'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import { Noir } from './noir'

import './assets/styles/index.sass'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            darkModeSelector: '.dark-mode',
        },
    },
})

app.mount('#app')
