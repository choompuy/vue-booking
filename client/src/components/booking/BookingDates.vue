<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import moment from 'moment'
import UiButton from '@/components/ui/UiButton.vue'

const { t } = useI18n()
const dates = ref<[]>([])
const selectedDate = ref<null | string>(null)

const formatDate = (date: moment.MomentInput) => {
    const formattedDate = moment(date)
    return formattedDate.calendar(null, {
        lastDay: '[вчера]',
        sameDay: '[сегодня]',
        nextDay: '[завтра]',
        nextWeek: 'dddd',
        lastWeek: 'dddd',
        sameElse: 'dddd',
    })
}

onMounted(async () => {
    const response = await fetch('data.json')
        .then((res) => res.json())
        .then((data) => data.dates)

    dates.value = await response
})
</script>

<template>
    <div class="flex-column gap-s">
        <p class="nata-sans text-secondary text-xs">{{ t('booking.date') }}</p>

        <div class="dates flex-row gap-s">
            <UiButton
                v-for="(date, index) in dates"
                :key="index"
                :onclick="() => (selectedDate = date.date)"
                :severity="selectedDate === date.date ? 'success' : undefined"
            >
                <div class="date flex-column text-s">
                    <p class="nata-sans-700">
                        {{ moment(date.date).format('D MMMM') }}
                    </p>
                    <p class="nata-sans-400">
                        {{ formatDate(date.date) }}
                    </p>
                </div>
            </UiButton>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.dates
    overflow: auto

.date
    align-items: flex-start
</style>
