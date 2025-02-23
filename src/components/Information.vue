<script lang="ts" setup>
import { computed } from 'vue'
import { Button } from 'primevue'
import { settings } from '@/shared/localData'
import { hoursData } from '@/shared/hoursData'
import { ordersData } from '@/shared/ordersData'
import { formattedDate } from '@/shared/date'
import { useSettingsStore } from '@/store/useSettingStore'
import { storeToRefs } from 'pinia'
import { useCourierStore } from '@/store/useCourierStore'

const settingsStore = useSettingsStore()
const { localSettings } = storeToRefs(settingsStore)

function isRatingExist(rating: unknown): boolean {
  return Number.isNaN(rating) || !Number.isFinite(rating) || !rating
}

const ratingForDay = computed(() => {
  const rating = ordersData.value.orders / hoursData.value.hours
  return isRatingExist(rating) ? 0 : Number(rating).toFixed(2)
})

defineProps<{ isLogin: boolean }>()
</script>

<template>
  <div class="calculator__information">
    <div class="date">
      <h3>{{ formattedDate() }}</h3>
    </div>

    <div class="statistic-btn" v-if="isLogin">
      <Button
        icon="pi pi-chart-bar"
        severity="secondary"
        @click="localSettings.isShiftsOpen = true"
        aria-label="statistic"
      />
    </div>

    <div class="settings-btn">
      <Button
        icon="pi pi-wallet"
        severity="secondary"
        @click="settings.isOpenFeeds = true"
        aria-label="feeds"
      />

      <Button
        icon="pi pi-cog"
        severity="secondary"
        @click="localSettings.isSettingsOpen = true"
        aria-label="settings"
      />
    </div>
    <div class="rating">
      <h3>Нагрузка: {{ ratingForDay }}</h3>
    </div>
  </div>
</template>
