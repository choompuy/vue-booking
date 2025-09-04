import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/modules/firebase'

import HomeView from '@/components/HomeView.vue'
import BookingView from '@/components/booking/BookingView.vue'
import ProjectSettingsView from '@/components/project/ProjectSettings.vue'
import AuthView from '@/components/auth/AuthView.vue'

// Маршруты
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'booking',
                component: BookingView,
            },
            {
                path: 'settings',
                name: 'settings',
                component: ProjectSettingsView,
            },
        ],
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const user = await new Promise((resolve) => {
        const unsub = onAuthStateChanged(auth, (u) => {
            unsub()
            resolve(u)
        })
    })

    if (to.meta.requiresAuth) {
        if (to.name !== 'auth' && !user) return next({ name: 'auth' })
    } else {
        if (to.name === 'auth' && user) return next({ name: 'booking' })
    }

    next()
})

export default router
