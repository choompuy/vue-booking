<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Image, Message, useToast } from 'primevue'
import router from '@/router'
import { login, register, resetPassword } from '@/modules/firebase/authService'
import { getErrorMessage } from '@/modules/auth/authErrors'
import type { AuthMode, AuthFormData } from '@/modules/auth/authTypes'
import AuthForm from './AuthForm.vue'
import AuthModeButtons from './AuthModeButtons.vue'
import ThemeButton from '@/components/features/ThemeButton.vue'
import LanguageButton from '@/components/features/LanguageButton.vue'

const { t } = useI18n()
const toast = useToast()
const loading = ref(false)
const mode = ref<AuthMode>('login')
const error = ref('')
const success = ref('')

const handleSubmit = async (formData: AuthFormData) => {
    loading.value = true
    error.value = ''
    success.value = ''

    console.log('Form Data:', formData)
    try {
        let result
        switch (mode.value) {
            case 'login':
                result = await login(formData.email, formData.password!)
                if (result) {
                    success.value = t('auth.success.login')
                    await nextTick()
                    router.push('/')
                }
                break

            case 'register':
                result = await register(formData.email, formData.password!)
                if (result) {
                    success.value = t('auth.success.register')
                    await nextTick()
                    router.push('/')
                }
                break

            case 'reset':
                await resetPassword(formData.email)
                success.value = t('auth.success.resetEmailSent')
                break
        }
        toast.add({
            severity: 'success',
            summary: t('status.success'),
            detail: success.value,
            life: 3000,
        })
    } catch (err: unknown) {
        error.value = getErrorMessage(err, t)
    } finally {
        loading.value = false
    }
}

const handleModeSwitch = (newMode: AuthMode) => {
    mode.value = newMode
    error.value = ''
    success.value = ''
}

const titleText = computed(() => {
    switch (mode.value) {
        case 'login':
            return t('auth.welcome')
        case 'register':
            return t('auth.register')
        case 'reset':
            return t('auth.resetPassword')
        default:
            return t('auth.welcome')
    }
})
</script>

<template>
    <div class="auth-container gap-l">
        <div class="header-content flex-row gap-m">
            <div class="logo comfortaa-700 text-l">VueBooking</div>

            <div class="flex-row gap-xs">
                <ThemeButton />
                <LanguageButton />
            </div>
        </div>

        <div class="main-content gap-l">
            <div class="auth-image-wrapper">
                <Image src="booking-background2.png" class="auth-image" width="100%" />
            </div>

            <div class="auth-card flex-column gap-m">
                <h2 class="auth-title comfortaa">
                    {{ titleText }}
                </h2>

                <AuthForm
                    :mode="mode"
                    :loading="loading"
                    @submit="handleSubmit"
                    @switch-mode="handleModeSwitch"
                />

                <Message
                    v-if="error"
                    severity="error"
                    :closable="true"
                    @close="error = ''"
                    class="auth-message"
                >
                    {{ error }}
                </Message>

                <AuthModeButtons :mode="mode" :loading="loading" @switch-mode="handleModeSwitch" />
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.auth-container
    display: grid
    grid-template-rows: auto 1fr
    min-height: 100vh

.main-content
    flex-direction: row

.auth-card
    flex: 1
    align-self: center

.auth-image-wrapper
    flex: 2
    align-self: center

    .auth-image
        width: 100%
        object-fit: cover


.auth-title
    margin-inline: auto
</style>
