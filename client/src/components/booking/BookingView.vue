<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BookingDates from './BookingDates.vue'
import BookingZones from './BookingZones.vue'

const { t } = useI18n()
</script>

<template>
    <div class="booking flex-column gap-m">
        <div class="booking-title">
            <h1 class="nata-sans-700 text-xl">{{ t('booking.title') }}</h1>
        </div>

        <BookingDates />
        <BookingZones />
    </div>
</template>
