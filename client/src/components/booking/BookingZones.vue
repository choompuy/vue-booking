<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import UiButton from '@/components/ui/UiButton.vue'

type Zone = {
    id: string
    name: string
}

const { t } = useI18n()
const zones = ref<Zone[]>([])
const selectedZone = ref<Zone[]>([])

onMounted(async () => {
    const response = await fetch('data.json')
        .then((res) => res.json())
        .then((data) => data.zones)

    zones.value = await response
})
</script>

<template>
    <div class="flex-column gap-s">
        <p class="nata-sans text-secondary text-xs">{{ t('booking.zone') }}</p>

        <div v-if="zones.length !== 0" class="dates flex-row gap-s">
            <UiButton
                v-for="(zone, index) in zones"
                :key="index"
                :onclick="
                    () =>
                        selectedZone.includes(zone)
                            ? (selectedZone = selectedZone.filter((z) => z.id !== zone.id))
                            : selectedZone.push(zone)
                "
                :severity="selectedZone.includes(zone) ? 'success' : undefined"
            >
                <div class="date flex-column text-s">
                    <p class="nata-sans-400">
                        {{ zone.name }}
                    </p>
                </div>
            </UiButton>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.date
    align-items: flex-start
</style>
