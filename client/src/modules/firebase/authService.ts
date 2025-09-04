import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from 'firebase/auth'
import { auth } from './index'

export async function register(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(auth, email, password)
    return user.user
}

export async function login(email: string, password: string) {
    const user = await signInWithEmailAndPassword(auth, email, password)
    return user.user
}

export async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email)
}

export async function logout() {
    await signOut(auth)
}
