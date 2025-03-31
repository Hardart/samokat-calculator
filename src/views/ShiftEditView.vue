<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { SelectButton, Button } from 'primevue'

import HdInput from '@/components/HdInput.vue'
import FormNumberInput from '@/components/FormNumberInput/FormNumberInput.vue'
import { useNewShiftStore } from '@/store/useNewShiftStore'
const route = useRoute()
const id = route.params.id
if (typeof id !== 'string') throw new Error('id not find')
const shiftStore = useNewShiftStore()
const shift = shiftStore.findShift(id)
</script>

<template>
  <main class="shift-item" v-if="shift">
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

      <HdInput v-model="shift.hours" label="Количество часов" id="hours" />

      <HdInput v-model="shift.orders" label="Количество заказов" id="orders" />

      <HdInput
        v-model="shift.morningOrders"
        label="Количество утренних заказов"
        id="morningOrders"
      />

      <HdInput
        v-model="shift.eveningOrders"
        label="Количество вечерних заказов"
        id="eveningOrders"
      />

      <HdInput
        v-model="shift.nightOrders"
        label="Количество ночных заказов"
        id="nightOrders"
      />

      <h3>{{ shift.totalEarnings }}</h3>
    </div>
  </main>
</template>

<style lang="scss">
.shift-item {
  display: grid;
}
</style>
