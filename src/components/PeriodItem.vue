<script lang="ts" setup>
import { Button } from 'primevue'
import Confirm from './Confirm.vue'
import { formatHours, formatOrders } from '@/shared/utils'

import {
  deleteShift,
  toggleEditShiftMode,
  type Shift,
} from '@/shared/shiftData'
import { formattedDate } from '@/shared/date'
import { useToggle } from '@vueuse/core'

defineProps<{
  shiftItem: Shift
}>()

const [isOpen, toggleOpen] = useToggle()
const onConfirm = (id: string) => {
  toggleOpen(false)
  deleteShift(id)
}
</script>

<template>
  <li class="period">
    <div class="period__weekday">
      {{ formattedDate(true, shiftItem.date) }}
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
    <div class="period-controls">
      <Button
        rounded
        size="small"
        variant="text"
        severity="secondary"
        icon="pi pi-pen-to-square"
        @click="toggleEditShiftMode(shiftItem)"
      />
      <Button
        severity="danger"
        rounded
        variant="text"
        icon="pi pi-trash"
        size="small"
        :disabled="isOpen"
        @click="toggleOpen(true)"
      />
    </div>
    <Confirm
      v-model="isOpen"
      @cancel="toggleOpen(false)"
      @confirm="onConfirm(shiftItem.id)"
    />
  </li>
</template>
