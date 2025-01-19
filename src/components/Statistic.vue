<script lang="ts" setup>
import { Dialog } from 'primevue'
import { settings, shifts, shiftsTotal } from '@/shared/localData'
import {
  formatHours,
  formatOrders,
  formattedDate,
  isInPeriod,
} from '@/shared/utils'
</script>

<template>
  <Dialog
    v-model:visible="settings.isOpenStatistic"
    modal
    header="Статистика"
    :style="{ width: '25rem' }"
  >
    <div class="period-modal">
      <ul class="period-list">
        <template v-for="shiftItem in shifts">
          <li class="period" v-if="isInPeriod(shiftItem.date)">
            <div class="period__weekday">
              {{ formattedDate(true, new Date(shiftItem.date)) }}
            </div>
            <div>
              {{ formatHours(shiftItem.hours) }},
              {{ formatOrders(shiftItem.orders) }}
            </div>

            <div class="period__weather-data">
              Надбавка за погоду -
              <span
                v-if="shiftItem.isWeather"
                class="period__weather period__weather--on"
              >
                Да
              </span>
              <span v-else class="period__weather">Нет</span>
            </div>
            <div>
              Получил чаевых
              <span class="periiod__tips-value">{{ shiftItem.tips }}₽</span>
            </div>
            <div>
              Заработал
              <span class="periiod__profit-value">{{ shiftItem.profit }}₽</span>
            </div>
          </li>
        </template>
      </ul>
      <div class="period-total" v-if="shiftsTotal.hours">
        <h3 class="period-total__title">За неделю</h3>
        <div>Отработал - {{ formatHours(shiftsTotal.hours) }}</div>
        <div>Выполнил - {{ formatOrders(shiftsTotal.orders) }}</div>
        <div>Получил чаевых - {{ shiftsTotal.tips }}₽</div>
        <div>Заработал - {{ shiftsTotal.profit }}₽</div>
      </div>
      <h3 v-else>За этот период пока нет сохраненных данных</h3>
    </div>
  </Dialog>
</template>
