import { defineStore } from 'pinia'
import type { User } from 'firebase/auth'

interface UserState {
    uid: string | null
    email: string | null
    displayName: string | null
    photoURL: string | null
}

export const useUserStore = defineStore('user', {
    state: (): { user: UserState | null } => ({
        user: null,
    }),

    actions: {
        setUser(firebaseUser: User | null) {
            if (firebaseUser) {
                this.user = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                }
            } else {
                this.user = null
            }
        },

        logout() {
            this.user = null
        },
    },

    getters: {
        isAuthenticated: (state) => !!state.user,
    },
})
