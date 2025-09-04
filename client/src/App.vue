<script setup lang="ts">
import { onMounted } from 'vue'
import { Toast } from 'primevue'
import { useI18nStore } from '@/modules/i18n/i18nStore'
import { useThemeStore } from '@/modules/theme/themeStore'

const i18nStore = useI18nStore()
const themeStore = useThemeStore()

onMounted(() => {
    i18nStore.initLang()
    themeStore.initTheme()
})
</script>

<template>
    <Toast class="comfortaa" position="bottom-right" />
    <router-view />
</template>

<style scoped></style>
