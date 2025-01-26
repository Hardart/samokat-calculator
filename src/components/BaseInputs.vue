<script lang="ts" setup>
import HdInput from '@/components/HdInput.vue'
import { ordersData } from '@/shared/ordersData'
import { hoursData } from '@/shared/hoursData'
</script>

<template>
  <div>
    <div class="input-group">
      <HdInput
        v-model.number="hoursData.hours"
        label="Количество часов"
        id="hours"
        :max="100"
      />
    </div>
    <div class="input-group mt-s">
      <HdInput
        v-model.number="ordersData.orders"
        label="Количество заказов"
        id="orders"
      />
    </div>
    <div class="input-group mt-s">
      <HdInput
        showButtons
        v-model.number="ordersData.tips"
        label="Чаевые"
        id="tips"
      />
    </div>
  </div>
</template>
