<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button } from 'primevue'
import { useThemeStore } from '@/modules/theme/themeStore'

const { t } = useI18n()
const themeStore = useThemeStore()
</script>

<template>
    <div class="theme-button">
        <Button
            @click="themeStore.toggleTheme"
            severity="secondary"
            :icon="themeStore.darkMode ? 'pi pi-moon' : 'pi pi-sun'"
            :aria-label="t('buttons.changeTheme')"
        />
    </div>
</template>
