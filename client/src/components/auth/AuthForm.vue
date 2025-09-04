<script setup lang="ts">
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import { Button } from 'primevue'
import { useAuthValidation } from '@/modules/auth/useAuthValidation'
import type { AuthMode, AuthFormData } from '@/modules/auth/authTypes'
import UiInput from '@/components/ui/UiInput.vue'

interface Props {
    mode: AuthMode
    loading: boolean
}

interface Emits {
    (e: 'submit', data: AuthFormData): void
    (e: 'switch-mode', mode: AuthMode): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

const isRegisterMode = computed(() => props.mode === 'register')
const isResetMode = computed(() => props.mode === 'reset')

const { getValidationSchema } = useAuthValidation(t)
const currentSchema = computed(() => getValidationSchema(props.mode))

const getInitialValues = (mode: AuthMode) => {
    switch (mode) {
        case 'login':
            return { email: '', password: '' }
        case 'register':
            return { email: '', password: '', confirmPassword: '' }
        case 'reset':
            return { email: '' }
        default:
            return { email: '', password: '' }
    }
}

const { handleSubmit, resetForm } = useForm<AuthFormData>({
    validationSchema: currentSchema,
    initialValues: getInitialValues(props.mode),
})

const onSubmit = handleSubmit((values) => {
    emit('submit', values as AuthFormData)
})

watch(
    () => props.mode,
    (newMode) => {
        resetForm({
            values: getInitialValues(newMode),
        })
    },
)
</script>

<template>
    <form @submit="onSubmit" class="auth-form flex-column gap-m nata-sans">
        <div class="flex-column gap-sm">
            <UiInput
                :title="t('auth.inputLabel.email')"
                type="email"
                name="email"
                :disabled="loading"
                autocomplete="on"
            />

            <div v-if="!isResetMode" class="flex-column gap-xs">
                <Button
                    v-if="!isRegisterMode"
                    type="button"
                    variant="link"
                    :label="t('auth.forgotPassword')"
                    @click="$emit('switch-mode', 'reset')"
                    size="small"
                    :disabled="loading"
                    style="margin-left: auto; padding: 0"
                />
                <UiInput
                    :title="t('auth.inputLabel.password')"
                    type="password"
                    name="password"
                    :disabled="loading"
                    :help-text="mode === 'register' ? t('auth.validation.passwordStrength') : ''"
                />
            </div>

            <UiInput
                v-if="isRegisterMode"
                :title="t('auth.inputLabel.confirmPassword')"
                type="password"
                name="confirmPassword"
                :disabled="loading"
            />
        </div>

        <Button
            type="submit"
            :label="
                isResetMode
                    ? t('auth.buttons.sendPasswordReset')
                    : isRegisterMode
                      ? t('auth.buttons.signup')
                      : t('auth.buttons.signin')
            "
            :disabled="loading"
            :loading="loading"
        />
    </form>
</template>

<style lang="sass" scoped></style>
