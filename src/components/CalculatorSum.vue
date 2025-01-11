<script lang="ts" setup>
import { computed } from 'vue'
import { v4 as uuid } from 'uuid'
import { Button } from 'primevue'
import { today } from '@/shared/utils'
import { hoursData, hoursSum } from '@/shared/hoursData'
import { ordersData, ordersSum } from '@/shared/ordersData'
import { settings, shift, shifts } from '@/shared/localData'
import { isShiftSaved, profitForPeriod } from '@/shared/localData'

const profitForDay = computed(
  () => hoursSum.value + ordersSum.value + ordersData.value.tips
)
if (!settings.value.userId) settings.value.userId = uuid()

const save = () => {
  shift.date = today
  shift.orders = ordersData.value.orders
  shift.hours = hoursData.value.hours
  shift.tips = ordersData.value.tips
  shift.isWeather = settings.value.isExtraWeatherMoney
  shift.profit = profitForDay.value
  shifts.value.push(shift)

  ordersData.value.orders = 0
  hoursData.value.hours = 0
  ordersData.value.tips = 0
  settings.value.isExtraWeatherMoney = false
}
</script>

<template>
  <div class="sum">
    <p class="sum__title">Заработал сегодня</p>
    <h3 class="sum__value">{{ profitForDay }} ₽</h3>
    <p class="sum__title">Заработал за неделю</p>
    <h3 class="sum__value">{{ profitForPeriod }} ₽</h3>

    <Button
      label="Сохранить"
      class="save-btn"
      fluid
      @click="save"
      :disabled="isShiftSaved || profitForDay === 0"
    />
  </div>
</template>
