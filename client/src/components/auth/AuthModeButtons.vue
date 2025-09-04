<script setup lang="ts">
import { Button, Message } from 'primevue'
import { useI18n } from 'vue-i18n'
import type { AuthMode } from '@/modules/auth/authTypes'
import { computed } from 'vue'

interface Props {
    mode: AuthMode
    loading: boolean
}

interface Emits {
    (e: 'switch-mode', mode: AuthMode): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

const currentButton = computed(() =>
    props.mode === 'login'
        ? {
              label: t('auth.buttons.signup'),
              message: t('auth.noAccount'),
              onclick: () => emit('switch-mode', 'register'),
          }
        : {
              label: t('auth.buttons.signin'),
              message: t('auth.haveAccount'),
              onclick: () => emit('switch-mode', 'login'),
          },
)
</script>

<template>
    <div class="auth-mode flex-row nata-sans">
        <Message variant="simple" severity="secondary">
            {{ currentButton.message }}
        </Message>
        <Button
            type="button"
            variant="link"
            :label="currentButton.label"
            @click="currentButton.onclick"
            :disabled="loading"
            style="padding: 0.25rem"
        />
    </div>
</template>

<style lang="sass" scoped>
.auth-mode
    margin-inline: auto
</style>
