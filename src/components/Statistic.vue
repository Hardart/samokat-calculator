<script lang="ts" setup>
import { Dialog, Button } from 'primevue'
import PeriodItem from './PeriodItem.vue'
import PeriodRange from './PeriodRange.vue'
import { formatHours, formatOrders } from '@/shared/utils'
import { settings } from '@/shared/localData'
import {
  datesForPeriod,
  shiftsForPeriod,
  shiftsTotal,
  showMissedDates,
} from '@/shared/shiftData'
import { formattedDate } from '@/shared/date'
</script>

<template>
  <Dialog
    v-model:visible="settings.isOpenStatistic"
    modal
    :style="{ width: '22rem' }"
  >
    <template #header>
      <div class="p-dialog-header p-dialog-header--custom">
        <h3 class="p-dialog-title">Статистика</h3>
      </div>
    </template>
    <PeriodRange />
    <div class="period-modal">
      <ul class="period-list">
        <!-- <Button
          v-if="!showMissedDates"
          @click="showMissedDates = true"
          label="Добавить данные"
          severity="contrast"
          size="small"
        /> -->
        <Button
          v-if="showMissedDates"
          v-for="dateItem in datesForPeriod"
          :label="formattedDate(true, dateItem)"
          severity="contrast"
          variant="outlined"
          size="small"
        />
        <PeriodItem v-for="(shiftItem, id) in shiftsForPeriod" :shiftItem :id />
      </ul>
      <div class="period-total" v-if="shiftsForPeriod.length">
        <h3 class="period-total__title">За неделю</h3>
        <div>Отработал - {{ formatHours(shiftsTotal.hours) }}</div>
        <div>Выполнил - {{ formatOrders(shiftsTotal.orders) }}</div>
        <div>Получил чаевых - {{ shiftsTotal.tips }}₽</div>
        <div>Заработал - {{ shiftsTotal.profit }}₽</div>
      </div>
      <h3 v-else class="period-empty">
        За этот период пока нет сохраненных данных
      </h3>
    </div>
  </Dialog>
</template>
