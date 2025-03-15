<script setup lang="ts">
import { computed, ref } from 'vue'
import { SelectButton, Button } from 'primevue'
import { useRoute } from 'vue-router'
import { useShiftStore } from '@/store/useShiftStore'
import FormNumberInput from '@/components/FormNumberInput/FormNumberInput.vue'
import HdInput from '@/components/HdInput.vue'
import { useCostInfo } from '@/composables/useCostInfo'
import { useStorageSettings } from '@/composables/useStorageSettings'
const route = useRoute()
const id = route.params.id
if (typeof id !== 'string') throw new Error('id not find')
const shiftStore = useShiftStore()
const shift = computed(() =>
  shiftStore.shifts.find((shiftItem) => shiftItem.id === id)
)
const storageSettings = useStorageSettings()

storageSettings.setStorageSettings({
  hours: 10,
  orders: 10,
  morningOrders: 10,
  eveningOrders: 10,
  nightOrders: 10,
  tips: 100,
  isExtraDay: true,
  isLastWeekHours: true,
  isWeatherSurcharge: false,
})

const { totalEarnings } = useCostInfo()
</script>

<template>
  <main class="shift-item" v-if="shift">
    {{ storageSettings.storage }}
    <div>
      <FormNumberInput
        v-model="shift.orderCost"
        id="order-cost"
        mode="currency"
        errorKey="orderCost"
        label="Стоимость заказа"
      />
      <FormNumberInput
        v-model="shift.hourCost"
        id="hour-cost"
        mode="currency"
        errorKey="hourCost"
        label="Стоимость часа"
      />
      <FormNumberInput
        v-model="shift.tips"
        id="tips"
        mode="currency"
        errorKey="tips"
        label="Чаевые"
      />

      <HdInput v-model="shift.workHours" label="Количество часов" id="hours" />

      <HdInput
        v-model="shift.orders.total"
        label="Количество заказов"
        id="orders"
      />

      <HdInput
        v-model="shift.orders.morning"
        label="Количество утренних заказов"
        id="morningOrders"
      />

      <HdInput
        v-model="shift.orders.evening"
        label="Количество вечерних заказов"
        id="eveningOrders"
      />

      <HdInput
        v-model="shift.orders.night"
        label="Количество ночных заказов"
        id="nightOrders"
      />

      <h3>{{ totalEarnings }}</h3>
    </div>
  </main>
</template>

<style lang="scss">
.shift-item {
  display: grid;
}
</style>
