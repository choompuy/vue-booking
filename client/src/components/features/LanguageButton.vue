<script setup lang="ts">
import { markRaw, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button, Menu } from 'primevue'
import { useI18nStore } from '@/modules/i18n/i18nStore'
import type { Locale } from '@/modules/i18n/i18nTypes'
import FlagEnIcon from '@/components/icons/FlagEnIcon.vue'
import FlagRuIcon from '@/components/icons/FlagRuIcon.vue'

const { t } = useI18n()
const i18nStore = useI18nStore()
const menuRef = useTemplateRef('menu')
const menuItems = [
    {
        label: t('language.english'),
        iconComponent: markRaw(FlagEnIcon),
        command: () => {
            setLanguage('en')
        },
    },
    {
        label: t('language.russian'),
        iconComponent: markRaw(FlagRuIcon),
        command: () => {
            setLanguage('ru')
        },
    },
]

const toggleMenu = (event: MouseEvent) => {
    if (menuRef && menuRef.value) {
        menuRef.value.toggle(event)
    }
}

const setLanguage = (lang: Locale) => {
    i18nStore.setLang(lang)
}
</script>

<template>
    <div class="language-button">
        <Button
            @click="toggleMenu"
            severity="secondary"
            icon="pi pi-language"
            :aria-label="t('buttons.switchLanguage')"
            aria-haspopup="true"
            aria-controls="language_menu"
        />

        <Menu ref="menu" id="language_menu" :model="menuItems" class="nata-sans" :popup="true">
            <template #item="{ item, props }">
                <div v-bind="props.action" style="padding: 0.25rem">
                    <component :is="item.iconComponent" />
                    <span>{{ item.label }}</span>
                </div>
            </template>
        </Menu>
    </div>
</template>
