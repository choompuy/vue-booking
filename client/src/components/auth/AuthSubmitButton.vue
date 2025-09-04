<script setup lang="ts">
import { computed } from 'vue'
import { Button } from 'primevue'
import { useI18n } from 'vue-i18n'
import type { AuthMode } from '@/modules/auth/authTypes'

interface Props {
    mode: AuthMode
    disabled: boolean
    loading: boolean
}

const props = defineProps<Props>()
const { t } = useI18n()

const buttonLabel = computed(() => {
    switch (props.mode) {
        case 'login':
            return t('auth.buttons.signin')
        case 'register':
            return t('auth.buttons.createAccount')
        case 'reset':
            return t('auth.buttons.resetPassword')
        default:
            return t('auth.buttons.signin')
    }
})
</script>

<template>
    <div class="field submit-field">
        <Button
            type="submit"
            :label="buttonLabel"
            :disabled="disabled"
            :loading="loading"
            class="w-full primary-button"
        />
    </div>
</template>

<style scoped>
.submit-field {
    margin-bottom: 2rem;
}

.primary-button {
    height: 3.5rem;
    font-weight: 600;
    font-size: 1rem;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    transition: all 0.3s ease;
}

.primary-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

@media (max-width: 480px) {
    .primary-button {
        height: 3rem;
        font-size: 0.95rem;
    }
}
</style>
