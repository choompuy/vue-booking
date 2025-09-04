<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from 'primevue'

import router from '@/router'
import ThemeButton from './features/ThemeButton.vue'
import LanguageButton from './features/LanguageButton.vue'
import SignOutButton from './features/SignOutButton.vue'

const { t } = useI18n()
const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform)

const find = () => {
    console.log('Поиск!')
}

const handleKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        find()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
    <header>
        <div class="header-content flex-row gap-m">
            <div @click="router.push('/')" class="logo comfortaa-700 text-l">VueBooking</div>

            <div class="flex-row gap-xs">
                <Button class="nata-sans" @click="find" severity="secondary" variant="outlined">
                    <i class="pi pi-search"></i>
                    <div class="flex-row gap-m">
                        <span>{{ t('buttons.search') }}</span>
                        <span>({{ isMac ? '⌘' : 'Ctrl' }}+K)</span>
                    </div>
                </Button>

                <Button
                    @click="router.push('/settings')"
                    severity="secondary"
                    icon="pi pi-cog"
                    :aria-label="t('buttons.settings')"
                />

                <ThemeButton />
                <LanguageButton />
                <SignOutButton />
            </div>
        </div>
    </header>
</template>

<style lang="sass" scoped></style>
