<script lang="ts" setup>
import CustomInput from './CustomInput.vue'
import HdInput from '@/components/HdInput.vue'
import { ShiftManager } from '@/shared/ShiftManager'
import { ShiftCalculator } from '@/shared/ShiftCalculator'

const currentShift = ShiftManager.getComputedShift()
</script>

<template>
  <div>
    <div class="input-group">
      <CustomInput
        label="Количество часов"
        v-model.number="currentShift.hours"
        @increase="ShiftCalculator.incrementHours"
        @decrease="ShiftCalculator.decrementHours"
      />
    </div>
    <div class="input-group mt-s">
      <CustomInput
        label="Количество заказов"
        v-model.number="currentShift.orders"
        @increase="ShiftCalculator.incrementOrders"
        @decrease="ShiftCalculator.decrementOrders"
      />
    </div>
    <div class="input-group mt-s">
      <HdInput
        showButtons
        v-model.number="currentShift.tips"
        label="Чаевые"
        id="tips"
      />
    </div>
  </div>
</template>
