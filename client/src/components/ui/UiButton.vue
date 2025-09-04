<script setup lang="ts">
import { Button } from 'primevue'

defineProps<{
    severity?: 'success'
    onclick: () => void
}>()
</script>

<template>
    <Button @click="onclick" :severity="severity ?? 'secondary'" style="flex-shrink: 0">
        <slot />
    </Button>
</template>
