<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useI18nStore } from './modules/i18n/i18nStore'
import { useThemeStore } from './modules/theme/themeStore'

import Header from './components/HeaderComponent.vue'

const i18nStore = useI18nStore()
const themeStore = useThemeStore()
const { t } = useI18n()

onMounted(() => {
    i18nStore.initLang()
    themeStore.initTheme()
})
</script>

<template>
    <Header />

    <h1>{{ t('booking.title') }}</h1>
    <p>{{ t('booking.guests', { count: 4 }) }}</p>
</template>

<style scoped></style>
