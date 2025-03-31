<script lang="ts" setup>
import { computed, ref } from 'vue'
import { formatHours, formatOrders } from '@/shared/utils'
import type { Shift } from '@/shared/ShiftClass'

interface ShiftsTotal {
  orders: number
  hours: number
  tips: number
  totalEarnings: number
}
const { shifts } = defineProps<{ shifts: Shift[] }>()

const total = computed(() =>
  shifts.reduce(
    (acc, curr) => {
      acc.orders += curr.orders
      acc.hours += curr.hours
      acc.tips += curr.tips
      acc.totalEarnings += curr.totalEarnings

      return acc
    },
    { orders: 0, hours: 0, tips: 0, totalEarnings: 0 } as ShiftsTotal
  )
)
const rating = computed(() => {
  const rating = total.value.orders / total.value.hours || 0
  return Number(rating).toFixed(2)
})
</script>

<template>
  <div class="shifts-total">
    <p>Выполнил {{ formatOrders(total.orders) }}</p>
    <p>Отработал {{ formatHours(total.hours) }}</p>
    <p>Получил {{ total.tips }}₽ чаевых</p>
    <p>Заработал {{ total.totalEarnings }}₽</p>
    <p>Нагрузка {{ rating }}</p>
  </div>
</template>

<style lang="scss" scoped>
.shifts-total {
  margin-block-start: 10px;
}
</style>
