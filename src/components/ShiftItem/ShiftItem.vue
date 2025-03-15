<script lang="ts" setup>
import { formattedDate } from '@/shared/date'
import type { Shift } from '@/shared/schemas/shift-schema'
import { formatHours, formatOrders } from '@/shared/utils'
import { Button } from 'primevue'

defineProps<{ shift: Shift }>()
</script>

<template>
  <li class="shift-item mt-s">
    <h3 class="shift-item__weekday">{{ formattedDate(true, shift.date) }}</h3>
    {{ shift }}
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
    <div class="period-controls">
      <Button
        rounded
        size="small"
        variant="text"
        severity="secondary"
        icon="pi pi-pen-to-square"
        @click="$router.push({ name: 'shiftItem', params: { id: shift.id } })"
      />
      <Button
        severity="danger"
        rounded
        variant="text"
        icon="pi pi-trash"
        size="small"
      />
      <RouterView />
    </div>
  </li>
</template>

<style lang="scss" scoped src="./ShiftItem.scss" />
