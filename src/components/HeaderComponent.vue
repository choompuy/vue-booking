<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button, Menu } from 'primevue'
import { useI18nStore } from '@/modules/i18n/i18nStore'
import { useThemeStore } from '@/modules/theme/themeStore'
import type { Locale } from '@/modules/i18n/i18nTypes'

import FlagEnIcon from './icons/FlagEnIcon.vue'
import FlagRuIcon from './icons/FlagRuIcon.vue'

const themeStore = useThemeStore()
const { t } = useI18n()
const i18nStore = useI18nStore()
const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
const menuRef = useTemplateRef('menu')
const menuItems = ref([
    {
        label: t('language.english'),
        iconComponent: FlagEnIcon,
        command: () => {
            setLanguage('en')
        },
    },
    {
        label: t('language.russian'),
        iconComponent: FlagRuIcon,
        command: () => {
            setLanguage('ru')
        },
    },
])

const toggleMenu = (event: MouseEvent) => {
    if (menuRef && menuRef.value) {
        menuRef.value.toggle(event)
    }
}

const setLanguage = (lang: Locale) => {
    i18nStore.setLang(lang)
}

function find() {
    console.log('Сохранено!')
}

function handleKeydown(e: KeyboardEvent) {
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
    <header class="flex-row gap-m">
        <div class="logo comfortaa-700" style="font-size: 1.25rem">VueBooking</div>

        <div class="actions flex-row gap-xs">
            <Button class="nata-sans" @click="find" severity="secondary" variant="outlined">
                <i class="pi pi-search"></i>
                <div class="flex-row gap-m">
                    <span>{{ t('buttons.search') }}</span>
                    <span>({{ isMac ? '⌘' : 'Ctrl' }}+K)</span>
                </div>
            </Button>

            <Button
                @click="themeStore.toggleTheme"
                severity="secondary"
                :icon="themeStore.darkMode ? 'pi pi-moon' : 'pi pi-sun'"
                :aria-label="t('buttons.changeTheme')"
            />

            <div>
                <Button
                    @click="toggleMenu"
                    severity="secondary"
                    icon="pi pi-language"
                    :aria-label="t('buttons.switchLanguage')"
                    aria-haspopup="true"
                    aria-controls="overlay_menu"
                />

                <Menu
                    ref="menu"
                    id="overlay_menu"
                    :model="menuItems"
                    class="nata-sans"
                    :popup="true"
                >
                    <template #item="{ item, props }">
                        <div v-bind="props.action" style="padding: 0.25rem">
                            <component :is="item.iconComponent" />
                            <span>{{ item.label }}</span>
                        </div>
                    </template>
                </Menu>
            </div>

            <Button
                class="nata-sans"
                severity="secondary"
                icon="pi pi-sign-out"
                :label="t('buttons.signout')"
            />
        </div>
    </header>
</template>

<style lang="sass" scoped>
header
    justify-content: space-between
    padding: .5rem 1.5rem
    border-bottom: 1px solid var(--surface-2)
    background-color: var(--surface-1)
</style>
