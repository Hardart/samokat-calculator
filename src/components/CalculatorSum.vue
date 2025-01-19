<script lang="ts" setup>
import { computed } from 'vue'
import { v4 as uuid } from 'uuid'
import { Button } from 'primevue'
import { today } from '@/shared/utils'
import { hoursData, hoursSum } from '@/shared/hoursData'
import { ordersData, ordersSum } from '@/shared/ordersData'
import { settings, shift, shifts } from '@/shared/localData'
import { isShiftSaved } from '@/shared/localData'
import { resetAllData } from '@/shared/generalData'

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

  resetAllData()
}
</script>

<template>
  <div class="sum">
    <p class="sum__title">Заработал сегодня</p>
    <h3 class="sum__value">{{ profitForDay }} ₽</h3>

    <Button
      label="Сохранить"
      class="save-btn"
      fluid
      :disabled="isShiftSaved || profitForDay === 0"
      @click="save"
    />
    <Button label="Сбросить" class="save-btn" fluid @click="resetAllData" />
  </div>
</template>
