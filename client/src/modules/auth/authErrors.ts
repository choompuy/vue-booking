import { FirebaseError } from 'firebase/app'
import { type ComposerTranslation } from 'vue-i18n'

export function getErrorMessage(err: unknown, t: ComposerTranslation): string {
    if (err instanceof FirebaseError) {
        switch (err.code) {
            case 'auth/user-not-found':
                return t('auth.error.userNotFound')
            case 'auth/wrong-password':
                return t('auth.error.wrongPassword')
            case 'auth/email-already-in-use':
                return t('auth.error.emailInUse')
            case 'auth/weak-password':
                return t('auth.error.weakPassword')
            case 'auth/invalid-email':
                return t('auth.error.invalidEmail')
            case 'auth/too-many-requests':
                return t('auth.error.tooManyRequests')
            case 'auth/invalid-credential':
                return t('auth.error.invalidCredentials')
            case 'auth/user-disabled':
                return t('auth.error.userDisabled')
            case 'auth/operation-not-allowed':
                return t('auth.error.operationNotAllowed')
            case 'auth/network-request-failed':
                return t('auth.error.networkError')
            case 'auth/internal-error':
                return t('auth.error.internalError')
            default:
                return t('auth.error.unknownError')
        }
    }
    return t('auth.error.unknownError')
}
