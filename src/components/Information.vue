<script lang="ts" setup>
import { Button } from 'primevue'
import { formattedDate } from '@/shared/date'
import { useUser } from '@/composables/useUser'
import { useAppSettings } from '@/composables/useAppSettings'
import { CostCalculator } from '@/shared/CostCalculator'

const { appSettings } = useAppSettings()
const { isLogin } = useUser()
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
        @click="$router.push({ name: 'shifts' })"
        aria-label="statistic"
      />
    </div>

    <div class="settings-btn">
      <Button
        icon="pi pi-wallet"
        severity="secondary"
        @click="appSettings.isFeedsOpen = true"
        aria-label="feeds"
      />

      <Button
        icon="pi pi-cog"
        severity="secondary"
        @click="appSettings.isSettingsOpen = true"
        aria-label="settings"
      />
    </div>
    <div class="rating">
      <h3>Нагрузка: {{ CostCalculator.rating }}</h3>
    </div>
  </div>
</template>
