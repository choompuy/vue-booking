export type AuthMode = 'login' | 'register' | 'reset'

export interface AuthFormData {
    email: string
    password?: string
    confirmPassword?: string
}
