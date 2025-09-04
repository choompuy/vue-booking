<script setup lang="ts">
interface Props {
    error?: string
    success?: string
}

interface Emits {
    (e: 'clear-error'): void
    (e: 'clear-success'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
    <div v-if="error || success" class="messages"></div>
</template>

<style scoped>
.messages {
    margin-top: 1.5rem;
}

.auth-message {
    border-radius: 8px;
    margin-bottom: 1rem;
}

.auth-message:last-child {
    margin-bottom: 0;
}
</style>
