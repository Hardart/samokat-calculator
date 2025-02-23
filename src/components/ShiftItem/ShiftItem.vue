<script lang="ts" setup>
import { formattedDate } from '@/shared/date'
import type { Shift } from '@/shared/schemas/shift-schema'
import { formatHours, formatOrders } from '@/shared/utils'

defineProps<{ shift: Shift }>()
</script>

<template>
  <li class="shift-item mt-s">
    <h3 class="shift-item__weekday">{{ formattedDate(true, shift.date) }}</h3>
    <p>
      {{ formatHours(shift.workHours) }},
      {{ formatOrders(shift.orders.total) }}
    </p>

    <p>
      Получил чаевых
      <span class="shift-item__cost-value"> {{ shift.tips }}₽</span>
    </p>
    <p>
      Заработал
      <span class="shift-item__cost-value">{{ shift.totalEarnings }}₽</span>
    </p>
  </li>
</template>

<style lang="scss" scoped src="./ShiftItem.scss" />
