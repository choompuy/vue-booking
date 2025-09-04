import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { ConfirmationService, ToastService } from 'primevue'
import PrimeVue from 'primevue/config'
import 'moment/dist/locale/ru'

import App from './App.vue'
import router from './router'
import { i18n } from './modules/i18n'
import { Noir } from './noir'

import './assets/styles/index.sass'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
    theme: {
        preset: Noir,
        options: {
            darkModeSelector: '.dark-mode',
        },
    },
})
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
