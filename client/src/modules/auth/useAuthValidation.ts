import { string, object, ref as yupRef } from 'yup'
import { type ComposerTranslation } from 'vue-i18n'
import type { AuthMode } from '@/modules/auth/authTypes'

export function useAuthValidation(t: ComposerTranslation) {
    const getValidationSchema = (mode: AuthMode) => {
        const baseEmailSchema = string()
            .required(t('auth.validation.emailRequired'))
            .email(t('auth.validation.emailInvalid'))

        const basePasswordSchema = string().required(t('auth.validation.passwordRequired'))

        const strongPasswordSchema = basePasswordSchema
            .min(6, t('auth.validation.passwordMin'))
            .matches(/[a-z]/, t('auth.validation.mustHaveLowercase'))
            .matches(/[A-Z]/, t('auth.validation.mustHaveUppercase'))
            .matches(/[0-9]/, t('auth.validation.mustHaveNumber'))

        switch (mode) {
            case 'login':
                return object({
                    email: baseEmailSchema,
                    password: basePasswordSchema,
                })

            case 'register':
                return object({
                    email: baseEmailSchema,
                    password: strongPasswordSchema,
                    confirmPassword: string()
                        .required(t('auth.validation.confirmPasswordRequired'))
                        .oneOf([yupRef('password')], t('auth.error.passwordMismatch')),
                })

            case 'reset':
                return object({
                    email: baseEmailSchema,
                })

            default:
                return object({
                    email: baseEmailSchema,
                    password: basePasswordSchema,
                })
        }
    }

    return {
        getValidationSchema,
    }
}
