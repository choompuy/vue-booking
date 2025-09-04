<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Button, ConfirmPopup, useConfirm, useToast } from 'primevue'
import router from '@/router'
import { logout } from '@/modules/firebase/authService'

const { t } = useI18n()
const toast = useToast()
const confirm = useConfirm()

const handleConfirm = (event: MouseEvent) => {
    confirm.require({
        target: event.currentTarget as HTMLElement,
        message: t('auth.signOutDanger'),
        icon: 'pi pi-exclamation-circle',
        rejectProps: {
            label: t('buttons.cancel'),
            severity: 'secondary',
            outlined: true,
        },
        acceptProps: {
            label: t('auth.buttons.signout'),
            severity: 'danger',
        },
        accept: () => {
            onSignOut()
        },
    })
}

const onSignOut = async () => {
    await logout()
    router.push('/auth')
    toast.add({
        severity: 'success',
        summary: t('status.success'),
        detail: t('auth.success.logout'),
        life: 3000,
    })
}
</script>

<template>
    <div class="sign-out-button">
        <ConfirmPopup class="nata-sans"></ConfirmPopup>
        <Button
            class="nata-sans"
            @click="handleConfirm($event)"
            severity="secondary"
            icon="pi pi-sign-out"
            :label="t('auth.buttons.signout')"
        />
    </div>
</template>
