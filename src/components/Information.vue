<script lang="ts" setup>
import { computed } from 'vue'
import { Button } from 'primevue'
import { settings } from '@/shared/localData'
import { hoursData } from '@/shared/hoursData'
import { ordersData } from '@/shared/ordersData'
import { formattedDate } from '@/shared/date'

const ratingForDay = computed(() => {
  const rating = ordersData.value.orders / hoursData.value.hours
  return Number.isNaN(rating) || !Number.isFinite(rating) || !rating
    ? 0
    : Number(rating).toFixed(2)
})

const ratingColor = computed(() =>
  +ratingForDay.value < 4
    ? 'red'
    : +ratingForDay.value < 6
    ? 'lightgreen'
    : 'lightblue'
)
</script>

<template>
  <div class="calculator__information">
    <div class="date">
      <h3>{{ formattedDate() }}</h3>
    </div>

    <div class="statistic-btn">
      <Button
        icon="pi pi-chart-bar"
        severity="secondary"
        @click="settings.isOpenStatistic = true"
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
        @click="settings.isOpen = true"
        aria-label="settings"
      />
    </div>
    <div class="rating">
      <h3>
        Нагрузка:
        <span :style="{ color: ratingColor, fontWeight: 700 }">{{
          ratingForDay
        }}</span>
      </h3>
    </div>
  </div>
</template>
